//! Multi-hop paths over the Tor network.
//!
//! Right now, we only implement "client circuits" -- also sometimes
//! called "origin circuits".  A client circuit is one that is
//! constructed by this Tor instance, and used in its own behalf to
//! send data over the Tor network.
//!
//! Each circuit has multiple hops over the Tor network: each hop
//! knows only the hop before and the hop after.  The client shares a
//! separate set of keys with each hop.
//!
//! To build a circuit, first create a [crate::channel::Channel], then
//! call its [crate::channel::Channel::new_circ] method.  This yields
//! a [PendingClientCirc] object that won't become live until you call
//! one of the methods that extends it to its first hop.  After you've
//! done that, you can call [ClientCirc::extend_ntor] on the circuit to
//! build it into a multi-hop circuit.  Finally, you can use
//! [ClientCirc::begin_stream] to get a Stream object that can be used
//! for anonymized data.
//!
//! # Implementation
//!
//! Each open circuit has a corresponding Reactor object that runs in
//! an asynchronous task, and manages incoming cells from the
//! circuit's upstream channel.  These cells are either RELAY cells or
//! DESTROY cells.  DESTROY cells are handled immediately.
//! RELAY cells are either for a particular stream, in which case they
//! get forwarded to a RawCellStream object, or for no particular stream,
//! in which case they are considered "meta" cells (like EXTENDED2)
//! that should only get accepted if something is waiting for them.
//!
//! # Limitations
//!
//! This is client-only.

use std::time::Duration;

pub(crate) mod celltypes;
pub(crate) mod halfcirc;

#[cfg(feature = "hs-common")]
pub mod handshake;
#[cfg(not(feature = "hs-common"))]
pub(crate) mod handshake;

pub(super) mod path;
pub(crate) mod unique_id;

use crate::channel::Channel;
use crate::congestion::params::CongestionControlParams;
use crate::crypto::cell::HopNum;
use crate::crypto::handshake::ntor_v3::NtorV3PublicKey;
use crate::memquota::{CircuitAccount, SpecificAccount as _};
use crate::stream::{
    AnyCmdChecker, DataCmdChecker, DataStream, ResolveCmdChecker, ResolveStream, StreamParameters,
    StreamReader,
};
use crate::tunnel::circuit::celltypes::*;
use crate::tunnel::reactor::CtrlCmd;
use crate::tunnel::reactor::{
    CircuitHandshake, CtrlMsg, Reactor, RECV_WINDOW_INIT, STREAM_READER_BUFFER,
};
use crate::tunnel::{HopLocation, LegId, StreamTarget, TargetHop};
use crate::util::skew::ClockSkew;
use crate::{Error, ResolveError, Result};
use educe::Educe;
use tor_cell::{
    chancell::CircId,
    relaycell::msg::{AnyRelayMsg, Begin, Resolve, Resolved, ResolvedVal},
};

use tor_error::{internal, into_internal};
use tor_linkspec::{CircTarget, LinkSpecType, OwnedChanTarget, RelayIdType};

pub use crate::crypto::binding::CircuitBinding;
pub use crate::memquota::StreamAccount;
pub use crate::tunnel::circuit::unique_id::UniqId;

#[cfg(feature = "hs-service")]
use {
    crate::stream::{IncomingCmdChecker, IncomingStream},
    crate::tunnel::reactor::StreamReqInfo,
};

use futures::channel::mpsc;
use oneshot_fused_workaround as oneshot;

use crate::congestion::sendme::StreamRecvWindow;
use crate::DynTimeProvider;
use futures::FutureExt as _;
use std::net::IpAddr;
use std::sync::{Arc, Mutex};
use tor_memquota::mq_queue::{self, ChannelSpec as _, MpscSpec};
use rand::SeedableRng;

use crate::crypto::handshake::ntor::NtorPublicKey;

pub use path::{Path, PathEntry};

/// The size of the buffer for communication between `ClientCirc` and its reactor.
pub const CIRCUIT_BUFFER_SIZE: usize = 128;

#[cfg(feature = "send-control-msg")]
use {crate::tunnel::msghandler::UserMsgHandler, crate::tunnel::reactor::MetaCellHandler};

pub use crate::tunnel::reactor::syncview::ClientCircSyncView;
#[cfg(feature = "send-control-msg")]
#[cfg_attr(docsrs, doc(cfg(feature = "send-control-msg")))]
pub use {crate::tunnel::msghandler::MsgHandler, crate::tunnel::reactor::MetaCellDisposition};

/// MPSC queue relating to a stream (either inbound or outbound), sender
pub(crate) type StreamMpscSender<T> = mq_queue::Sender<T, MpscSpec>;
/// MPSC queue relating to a stream (either inbound or outbound), receiver
pub(crate) type StreamMpscReceiver<T> = mq_queue::Receiver<T, MpscSpec>;

/// MPSC queue for inbound data on its way from channel to circuit, sender
pub(crate) type CircuitRxSender = mq_queue::Sender<ClientCircChanMsg, MpscSpec>;
/// MPSC queue for inbound data on its way from channel to circuit, receiver
pub(crate) type CircuitRxReceiver = mq_queue::Receiver<ClientCircChanMsg, MpscSpec>;

#[derive(Debug)]
/// A circuit that we have constructed over the Tor network.
///
/// # Circuit life cycle
///
/// `ClientCirc`s are created in an initially unusable state using [`Channel::new_circ`],
/// which returns a [`PendingClientCirc`].  To get a real (one-hop) circuit from
/// one of these, you invoke one of its `create_firsthop` methods (currently
/// [`create_firsthop_fast()`](PendingClientCirc::create_firsthop_fast) or
/// [`create_firsthop_ntor()`](PendingClientCirc::create_firsthop_ntor)).
/// Then, to add more hops to the circuit, you can call
/// [`extend_ntor()`](ClientCirc::extend_ntor) on it.
///
/// For higher-level APIs, see the `tor-circmgr` crate: the ones here in
/// `tor-proto` are probably not what you need.
///
/// After a circuit is created, it will persist until it is closed in one of
/// five ways:
///    1. A remote error occurs.
///    2. Some hop on the circuit sends a `DESTROY` message to tear down the
///       circuit.
///    3. The circuit's channel is closed.
///    4. Someone calls [`ClientCirc::terminate`] on the circuit.
///    5. The last reference to the `ClientCirc` is dropped. (Note that every stream
///       on a `ClientCirc` keeps a reference to it, which will in turn keep the
///       circuit from closing until all those streams have gone away.)
///
/// Note that in cases 1-4 the [`ClientCirc`] object itself will still exist: it
/// will just be unusable for most purposes.  Most operations on it will fail
/// with an error.
//
// Effectively, this struct contains two Arcs: one for `path` and one for
// `control` (which surely has something Arc-like in it).  We cannot unify
// these by putting a single Arc around the whole struct, and passing
// an Arc strong reference to the `Reactor`, because then `control` would
// not be dropped when the last user of the circuit goes away.  We could
// make the reactor have a weak reference but weak references are more
// expensive to dereference.
//
// Because of the above, cloning this struct is always going to involve
// two atomic refcount changes/checks.  Wrapping it in another Arc would
// be overkill.
//
pub struct ClientCirc {
    /// Mutable state shared with the `Reactor`.
    mutable: Arc<Mutex<MutableState>>,
    /// A unique identifier for this circuit.
    unique_id: UniqId,
    /// Channel to send control messages to the reactor.
    pub(super) control: mpsc::UnboundedSender<CtrlMsg>,
    /// Channel to send commands to the reactor.
    pub(super) command: mpsc::UnboundedSender<CtrlCmd>,
    /// A future that resolves to Cancelled once the reactor is shut down,
    /// meaning that the circuit is closed.
    #[cfg_attr(not(feature = "experimental-api"), allow(dead_code))]
    reactor_closed_rx: futures::future::Shared<oneshot::Receiver<void::Void>>,
    /// For testing purposes: the CircId, for use in peek_circid().
    #[cfg(test)]
    circid: CircId,
    /// Memory quota account
    memquota: CircuitAccount,
    /// Time provider
    time_provider: DynTimeProvider,
}

/// Mutable state shared by [`ClientCirc`] and [`Reactor`].
#[derive(Educe, Default)]
#[educe(Debug)]
pub(super) struct MutableState {
    /// Information about this circuit's path.
    ///
    /// This is stored in an Arc so that we can cheaply give a copy of it to
    /// client code; when we need to add a hop (which is less frequent) we use
    /// [`Arc::make_mut()`].
    pub(super) path: Arc<path::Path>,

    /// Circuit binding keys [q.v.][`CircuitBinding`] information for each hop
    /// in the circuit's path.
    ///
    /// NOTE: Right now, there is a `CircuitBinding` for every hop.  There's a
    /// fair chance that this will change in the future, and I don't want other
    /// code to assume that a `CircuitBinding` _must_ exist, so I'm making this
    /// an `Option`.
    #[educe(Debug(ignore))]
    pub(super) binding: Vec<Option<CircuitBinding>>,
}

/// A ClientCirc that needs to send a create cell and receive a created* cell.
///
/// To use one of these, call create_firsthop_fast() or create_firsthop_ntor()
/// to negotiate the cryptographic handshake with the first hop.
pub struct PendingClientCirc {
    /// A oneshot receiver on which we'll receive a CREATED* cell,
    /// or a DESTROY cell.
    recvcreated: oneshot::Receiver<CreateResponse>,
    /// The ClientCirc object that we can expose on success.
    circ: Arc<ClientCirc>,
}

/// Description of the network's current rules for building circuits.
#[non_exhaustive]
#[derive(Clone, Debug)]
pub struct CircParameters {
    /// Whether we should include ed25519 identities when we send
    /// EXTEND2 cells.
    pub extend_by_ed25519_id: bool,
    /// Congestion control parameters for this circuit.
    pub ccontrol: CongestionControlParams,
}

#[cfg(test)]
impl std::default::Default for CircParameters {
    fn default() -> Self {
        Self {
            extend_by_ed25519_id: true,
            ccontrol: crate::congestion::test_utils::params::build_cc_fixed_params(Duration::from_secs(0)),
        }
    }
}

impl CircParameters {
    /// Constructor
    pub fn new(extend_by_ed25519_id: bool, ccontrol: CongestionControlParams) -> Self {
        Self {
            extend_by_ed25519_id,
            ccontrol,
        }
    }
}

impl ClientCirc {
    /// Return a description of the first hop of this circuit.
    ///
    /// # Panics
    ///
    /// Panics if there is no first hop.  (This should be impossible outside of
    /// the tor-proto crate, but within the crate it's possible to have a
    /// circuit with no hops.)
    pub fn first_hop(&self) -> OwnedChanTarget {
        let first_hop = self
            .mutable
            .lock()
            .expect("poisoned lock")
            .path
            .first_hop()
            .expect("called first_hop on an un-constructed circuit");
        match first_hop {
            path::HopDetail::Relay(r) => r,
            #[cfg(feature = "hs-common")]
            path::HopDetail::Virtual => {
                panic!("somehow made a circuit with a virtual first hop.")
            }
        }
    }

    /// Return the [`HopNum`] of the last hop of this circuit.
    ///
    /// Returns an error if there is no last hop.  (This should be impossible outside of the
    /// tor-proto crate, but within the crate it's possible to have a circuit with no hops.)
    pub fn last_hop_num(&self) -> Result<HopNum> {
        Ok(self
            .mutable
            .lock()
            .expect("poisoned lock")
            .path
            .last_hop_num()
            .ok_or_else(|| internal!("no last hop index"))?)
    }

    /// Return a description of all the hops in this circuit.
    ///
    /// This method is **deprecated** for several reasons:
    ///   * It performs a deep copy.
    ///   * It ignores virtual hops.
    ///   * It's not so extensible.
    ///
    /// Use [`ClientCirc::path_ref()`] instead.
    #[deprecated(since = "0.11.1", note = "Use path_ref() instead.")]
    pub fn path(&self) -> Vec<OwnedChanTarget> {
        #[allow(clippy::unnecessary_filter_map)] // clippy is blind to the cfg
        self.mutable
            .lock()
            .expect("poisoned lock")
            .path
            .all_hops()
            .into_iter()
            .filter_map(|hop| match hop {
                path::HopDetail::Relay(r) => Some(r),
                #[cfg(feature = "hs-common")]
                path::HopDetail::Virtual => None,
            })
            .collect()
    }

    /// Return a [`Path`] object describing all the hops in this circuit.
    ///
    /// Note that this `Path` is not automatically updated if the circuit is
    /// extended.
    pub fn path_ref(&self) -> Arc<Path> {
        self.mutable.lock().expect("poisoned_lock").path.clone()
    }

    /// Get the [`LegId`] and [`Path`] of each leg of the tunnel.
    // TODO(conflux): We probably want to replace uses of `path_ref` with
    // this method and remove `path_ref`.
    async fn legs(&self) -> Result<Vec<(LegId, Arc<Path>)>> {
        let (tx, rx) = oneshot::channel();

        self.command
            .unbounded_send(CtrlCmd::QueryLegs { done: tx })
            .map_err(|_| Error::CircuitClosed)?;

        rx.await.map_err(|_| Error::CircuitClosed)?
    }

    /// Get the clock skew claimed by the first hop of the circuit.
    ///
    /// See [`Channel::clock_skew()`].
    pub async fn first_hop_clock_skew(&self) -> Result<ClockSkew> {
        let (tx, rx) = oneshot::channel();

        self.control
            .unbounded_send(CtrlMsg::FirstHopClockSkew { answer: tx })
            .map_err(|_| Error::CircuitClosed)?;

        Ok(rx.await.map_err(|_| Error::CircuitClosed)??)
    }

    /// Return a reference to this circuit's memory quota account
    pub fn mq_account(&self) -> &CircuitAccount {
        &self.memquota
    }

    /// Return the cryptographic material used to prove knowledge of a shared
    /// secret with with `hop`.
    ///
    /// See [`CircuitBinding`] for more information on how this is used.
    ///
    /// Return None if we have no circuit binding information for the hop, or if
    /// the hop does not exist.
    pub fn binding_key(&self, hop: HopNum) -> Option<CircuitBinding> {
        self.mutable
            .lock()
            .expect("poisoned lock")
            .binding
            .get::<usize>(hop.into())
            .cloned()
            .flatten()
        // NOTE: I'm not thrilled to have to copy this information, but we use
        // it very rarely, so it's not _that_ bad IMO.
    }

    /// Start an ad-hoc protocol exchange to the specified hop on this circuit
    ///
    /// To use this:
    ///
    ///  0. Create an inter-task channel you'll use to receive
    ///     the outcome of your conversation,
    ///     and bundle it into a [`MsgHandler`].
    ///
    ///  1. Call `start_conversation`.
    ///     This will install a your handler, for incoming messages,
    ///     and send the outgoing message (if you provided one).
    ///     After that, each message on the circuit
    ///     that isn't handled by the core machinery
    ///     is passed to your provided `reply_handler`.
    ///
    ///  2. Possibly call `send_msg` on the [`Conversation`],
    ///     from the call site of `start_conversation`,
    ///     possibly multiple times, from time to time,
    ///     to send further desired messages to the peer.
    ///
    ///  3. In your [`MsgHandler`], process the incoming messages.
    ///     You may respond by
    ///     sending additional messages
    ///     When the protocol exchange is finished,
    ///     `MsgHandler::handle_msg` should return
    ///     [`ConversationFinished`](MetaCellDisposition::ConversationFinished).
    ///
    /// If you don't need the `Conversation` to send followup messages,
    /// you may simply drop it,
    /// and rely on the responses you get from your handler,
    /// on the channel from step 0 above.
    /// Your handler will remain installed and able to process incoming messages
    /// until it returns `ConversationFinished`.
    ///
    /// (If you don't want to accept any replies at all, it may be
    /// simpler to use [`ClientCirc::send_raw_msg`].)
    ///
    /// Note that it is quite possible to use this function to violate the tor
    /// protocol; most users of this API will not need to call it.  It is used
    /// to implement most of the onion service handshake.
    ///
    /// # Limitations
    ///
    /// Only one conversation may be active at any one time,
    /// for any one circuit.
    /// This generally means that this function should not be called
    /// on a circuit which might be shared with anyone else.
    ///
    /// Likewise, it is forbidden to try to extend the circuit,
    /// while the conversation is in progress.
    ///
    /// After the conversation has finished, the circuit may be extended.
    /// Or, `start_conversation` may be called again;
    /// but, in that case there will be a gap between the two conversations,
    /// during which no `MsgHandler` is installed,
    /// and unexpected incoming messages would close the circuit.
    ///
    /// If these restrictions are violated, the circuit will be closed with an error.
    ///
    /// ## Precise definition of the lifetime of a conversation
    ///
    /// A conversation is in progress from entry to `start_conversation`,
    /// until entry to the body of the [`MsgHandler::handle_msg`]
    /// call which returns [`ConversationFinished`](MetaCellDisposition::ConversationFinished).
    /// (*Entry* since `handle_msg` is synchronously embedded
    /// into the incoming message processing.)
    /// So you may start a new conversation as soon as you have the final response
    /// via your inter-task channel from (0) above.
    ///
    /// The lifetime relationship of the [`Conversation`],
    /// vs the handler returning `ConversationFinished`
    /// is not enforced by the type system.
    // Doing so without still leaving plenty of scope for runtime errors doesn't seem possible,
    // at least while allowing sending followup messages from outside the handler.
    //
    // TODO hs: it might be nice to avoid exposing tor-cell APIs in the
    //   tor-proto interface.
    #[cfg(feature = "send-control-msg")]
    pub async fn start_conversation(
        &self,
        msg: Option<tor_cell::relaycell::msg::AnyRelayMsg>,
        reply_handler: impl MsgHandler + Send + 'static,
        hop_num: HopNum,
    ) -> Result<Conversation<'_>> {
        let handler = Box::new(UserMsgHandler::new(hop_num, reply_handler));
        let conversation = Conversation(self);
        conversation.send_internal(msg, Some(handler)).await?;
        Ok(conversation)
    }

    /// Start an ad-hoc protocol exchange to the final hop on this circuit
    ///
    /// See the [`ClientCirc::start_conversation`] docs for more information.
    #[cfg(feature = "send-control-msg")]
    #[deprecated(since = "0.13.0", note = "Use start_conversation instead.")]
    pub async fn start_conversation_last_hop(
        &self,
        msg: Option<tor_cell::relaycell::msg::AnyRelayMsg>,
        reply_handler: impl MsgHandler + Send + 'static,
    ) -> Result<Conversation<'_>> {
        let last_hop = self
            .mutable
            .lock()
            .expect("poisoned lock")
            .path
            .last_hop_num()
            .ok_or_else(|| internal!("no last hop index"))?;

        self.start_conversation(msg, reply_handler, last_hop).await
    }

    /// Send an ad-hoc message to a given hop on the circuit, without expecting
    /// a reply.
    ///
    /// (If you want to handle one or more possible replies, see
    /// [`ClientCirc::start_conversation`].)
    #[cfg(feature = "send-control-msg")]
    pub async fn send_raw_msg(
        &self,
        msg: tor_cell::relaycell::msg::AnyRelayMsg,
        hop_num: HopNum,
    ) -> Result<()> {
        let (sender, receiver) = oneshot::channel();
        let ctrl_msg = CtrlMsg::SendMsg {
            hop_num,
            msg,
            sender,
        };
        self.control
            .unbounded_send(ctrl_msg)
            .map_err(|_| Error::CircuitClosed)?;

        receiver.await.map_err(|_| Error::CircuitClosed)?
    }

    /// Tell this circuit to begin allowing the final hop of the circuit to try
    /// to create new Tor streams, and to return those pending requests in an
    /// asynchronous stream.
    ///
    /// Ordinarily, these requests are rejected.
    ///
    /// There can only be one [`Stream`](futures::Stream) of this type created on a given circuit.
    /// If a such a [`Stream`](futures::Stream) already exists, this method will return
    /// an error.
    ///
    /// After this method has been called on a circuit, the circuit is expected
    /// to receive requests of this type indefinitely, until it is finally closed.
    /// If the `Stream` is dropped, the next request on this circuit will cause it to close.
    ///
    /// Only onion services (and eventually) exit relays should call this
    /// method.
    //
    // TODO: Someday, we might want to allow a stream request handler to be
    // un-registered.  However, nothing in the Tor protocol requires it.
    #[cfg(feature = "hs-service")]
    pub async fn allow_stream_requests(
        self: &Arc<ClientCirc>,
        allow_commands: &[tor_cell::relaycell::RelayCmd],
        hop_num: HopNum,
        filter: impl crate::stream::IncomingStreamRequestFilter,
    ) -> Result<impl futures::Stream<Item = IncomingStream>> {
        use futures::stream::StreamExt;

        /// The size of the channel receiving IncomingStreamRequestContexts.
        const INCOMING_BUFFER: usize = STREAM_READER_BUFFER;

        // TODO(conflux): Support tunnels with more than one leg. This requires a different approach
        // to `CellHandlers`, as they can't be shared between the tunnel reactor and the circuits.
        let legs = self.legs().await?;
        if legs.len() != 1 {
            return Err(internal!(
                "Cannot allow stream requests on tunnel with {} legs",
                legs.len()
            )
            .into());
        }
        let (leg_id, _path) = &legs[0];
        let leg_id = *leg_id;

        let time_prov = self.time_provider.clone();
        let cmd_checker = IncomingCmdChecker::new_any(allow_commands);
        let (incoming_sender, incoming_receiver) =
            MpscSpec::new(INCOMING_BUFFER).new_mq(time_prov, self.memquota.as_raw_account())?;
        let (tx, rx) = oneshot::channel();

        self.command
            .unbounded_send(CtrlCmd::AwaitStreamRequest {
                cmd_checker,
                incoming_sender,
                hop_num,
                done: tx,
                filter: Box::new(filter),
            })
            .map_err(|_| Error::CircuitClosed)?;

        // Check whether the AwaitStreamRequest was processed successfully.
        rx.await.map_err(|_| Error::CircuitClosed)??;

        let allowed_hop_num = hop_num;

        let circ = Arc::clone(self);
        Ok(incoming_receiver.map(move |req_ctx| {
            let StreamReqInfo {
                req,
                stream_id,
                hop_num,
                receiver,
                msg_tx,
                memquota,
                relay_cell_format,
            } = req_ctx;

            // We already enforce this in handle_incoming_stream_request; this
            // assertion is just here to make sure that we don't ever
            // accidentally remove or fail to enforce that check, since it is
            // security-critical.
            assert_eq!(allowed_hop_num, hop_num);

            let target = StreamTarget {
                circ: Arc::clone(&circ),
                tx: msg_tx,
                hop: HopLocation::Hop((leg_id, hop_num)),
                stream_id,
                relay_cell_format,
            };

            let reader = StreamReader {
                target: target.clone(),
                receiver,
                recv_window: StreamRecvWindow::new(RECV_WINDOW_INIT),
                ended: false,
            };

            IncomingStream::new(req, target, reader, memquota)
        }))
    }

    /// Extend the circuit via the ntor handshake to a new target last
    /// hop.
    pub async fn extend_ntor<Tg>(&self, target: &Tg, params: CircParameters) -> Result<()>
    where
        Tg: CircTarget,
    {
        let key = NtorPublicKey {
            id: *target
                .rsa_identity()
                .ok_or(Error::MissingId(RelayIdType::Rsa))?,
            pk: *target.ntor_onion_key(),
        };
        let mut linkspecs = target
            .linkspecs()
            .map_err(into_internal!("Could not encode linkspecs for extend_ntor"))?;
        if !params.extend_by_ed25519_id {
            linkspecs.retain(|ls| ls.lstype() != LinkSpecType::ED25519ID);
        }

        let (tx, rx) = oneshot::channel();

        let peer_id = OwnedChanTarget::from_chan_target(target);
        self.control
            .unbounded_send(CtrlMsg::ExtendNtor {
                peer_id,
                public_key: key,
                linkspecs,
                params,
                done: tx,
            })
            .map_err(|_| Error::CircuitClosed)?;

        rx.await.map_err(|_| Error::CircuitClosed)??;

        Ok(())
    }

    /// Extend the circuit via the ntor handshake to a new target last
    /// hop.
    pub async fn extend_ntor_v3<Tg>(&self, target: &Tg, params: CircParameters) -> Result<()>
    where
        Tg: CircTarget,
    {
        let key = NtorV3PublicKey {
            id: *target
                .ed_identity()
                .ok_or(Error::MissingId(RelayIdType::Ed25519))?,
            pk: *target.ntor_onion_key(),
        };
        let mut linkspecs = target
            .linkspecs()
            .map_err(into_internal!("Could not encode linkspecs for extend_ntor"))?;
        if !params.extend_by_ed25519_id {
            linkspecs.retain(|ls| ls.lstype() != LinkSpecType::ED25519ID);
        }

        let (tx, rx) = oneshot::channel();

        let peer_id = OwnedChanTarget::from_chan_target(target);
        self.control
            .unbounded_send(CtrlMsg::ExtendNtorV3 {
                peer_id,
                public_key: key,
                linkspecs,
                params,
                done: tx,
            })
            .map_err(|_| Error::CircuitClosed)?;

        rx.await.map_err(|_| Error::CircuitClosed)??;

        Ok(())
    }

    /// Extend this circuit by a single, "virtual" hop.
    ///
    /// A virtual hop is one for which we do not add an actual network connection
    /// between separate hosts (such as Relays).  We only add a layer of
    /// cryptography.
    ///
    /// This is used to implement onion services: the client and the service
    /// both build a circuit to a single rendezvous point, and tell the
    /// rendezvous point to relay traffic between their two circuits.  Having
    /// completed a [`handshake`] out of band[^1], the parties each extend their
    /// circuits by a single "virtual" encryption hop that represents their
    /// shared cryptographic context.
    ///
    /// Once a circuit has been extended in this way, it is an error to try to
    /// extend it in any other way.
    ///
    /// [^1]: Technically, the handshake is only _mostly_ out of band: the
    ///     client sends their half of the handshake in an ` message, and the
    ///     service's response is inline in its `RENDEZVOUS2` message.
    //
    // TODO hs: let's try to enforce the "you can't extend a circuit again once
    // it has been extended this way" property.  We could do that with internal
    // state, or some kind of a type state pattern.
    //
    // TODO hs: possibly we should take a set of Protovers, and not just `Params`.
    #[cfg(feature = "hs-common")]
    pub async fn extend_virtual(
        &self,
        protocol: handshake::RelayProtocol,
        role: handshake::HandshakeRole,
        seed: impl handshake::KeyGenerator,
        params: CircParameters,
    ) -> Result<()> {
        use self::handshake::BoxedClientLayer;

        let protocol = handshake::RelayCryptLayerProtocol::from(protocol);
        let relay_cell_format = protocol.relay_cell_format();

        let BoxedClientLayer { fwd, back, binding } = protocol.construct_layers(role, seed)?;

        let (tx, rx) = oneshot::channel();
        let message = CtrlCmd::ExtendVirtual {
            relay_cell_format,
            cell_crypto: (fwd, back, binding),
            params,
            done: tx,
        };

        self.command
            .unbounded_send(message)
            .map_err(|_| Error::CircuitClosed)?;

        rx.await.map_err(|_| Error::CircuitClosed)?
    }

    /// Helper, used to begin a stream.
    ///
    /// This function allocates a stream ID, and sends the message
    /// (like a BEGIN or RESOLVE), but doesn't wait for a response.
    ///
    /// The caller will typically want to see the first cell in response,
    /// to see whether it is e.g. an END or a CONNECTED.
    async fn begin_stream_impl(
        self: &Arc<ClientCirc>,
        begin_msg: AnyRelayMsg,
        cmd_checker: AnyCmdChecker,
    ) -> Result<(StreamReader, StreamTarget, StreamAccount)> {
        // TODO: Possibly this should take a hop, rather than just
        // assuming it's the last hop.
        let hop = TargetHop::LastHop;

        let time_prov = self.time_provider.clone();

        let memquota = StreamAccount::new(self.mq_account())?;
        let (sender, receiver) = MpscSpec::new(STREAM_READER_BUFFER)
            .new_mq(time_prov.clone(), memquota.as_raw_account())?;
        let (tx, rx) = oneshot::channel();
        let (msg_tx, msg_rx) =
            MpscSpec::new(CIRCUIT_BUFFER_SIZE).new_mq(time_prov, memquota.as_raw_account())?;

        self.control
            .unbounded_send(CtrlMsg::BeginStream {
                hop,
                message: begin_msg,
                sender,
                rx: msg_rx,
                done: tx,
                cmd_checker,
            })
            .map_err(|_| Error::CircuitClosed)?;

        let (stream_id, hop, relay_cell_format) = rx.await.map_err(|_| Error::CircuitClosed)??;

        let target = StreamTarget {
            circ: self.clone(),
            tx: msg_tx,
            hop,
            stream_id,
            relay_cell_format,
        };

        let reader = StreamReader {
            target: target.clone(),
            receiver,
            recv_window: StreamRecvWindow::new(RECV_WINDOW_INIT),
            ended: false,
        };

        Ok((reader, target, memquota))
    }

    /// Start a DataStream (anonymized connection) to the given
    /// address and port, using a BEGIN cell.
    async fn begin_data_stream(
        self: &Arc<ClientCirc>,
        msg: AnyRelayMsg,
        optimistic: bool,
    ) -> Result<DataStream> {
        let (reader, target, memquota) = self
            .begin_stream_impl(msg, DataCmdChecker::new_any())
            .await?;
        let mut stream = DataStream::new(reader, target, memquota);
        if !optimistic {
            stream.wait_for_connection().await?;
        }
        Ok(stream)
    }

    /// Start a stream to the given address and port, using a BEGIN
    /// cell.
    ///
    /// The use of a string for the address is intentional: you should let
    /// the remote Tor relay do the hostname lookup for you.
    pub async fn begin_stream(
        self: &Arc<ClientCirc>,
        target: &str,
        port: u16,
        parameters: Option<StreamParameters>,
    ) -> Result<DataStream> {
        let parameters = parameters.unwrap_or_default();
        let begin_flags = parameters.begin_flags();
        let optimistic = parameters.is_optimistic();
        let target = if parameters.suppressing_hostname() {
            ""
        } else {
            target
        };
        let beginmsg = Begin::new(target, port, begin_flags)
            .map_err(|e| Error::from_cell_enc(e, "begin message"))?;
        self.begin_data_stream(beginmsg.into(), optimistic).await
    }

    /// Start a new stream to the last relay in the circuit, using
    /// a BEGIN_DIR cell.
    pub async fn begin_dir_stream(self: Arc<ClientCirc>) -> Result<DataStream> {
        // Note that we always open begindir connections optimistically.
        // Since they are local to a relay that we've already authenticated
        // with and built a circuit to, there should be no additional checks
        // we need to perform to see whether the BEGINDIR will succeed.
        self.begin_data_stream(AnyRelayMsg::BeginDir(Default::default()), true)
            .await
    }

    /// Perform a DNS lookup, using a RESOLVE cell with the last relay
    /// in this circuit.
    ///
    /// Note that this function does not check for timeouts; that's
    /// the caller's responsibility.
    pub async fn resolve(self: &Arc<ClientCirc>, hostname: &str) -> Result<Vec<IpAddr>> {
        let resolve_msg = Resolve::new(hostname);

        let resolved_msg = self.try_resolve(resolve_msg).await?;

        resolved_msg
            .into_answers()
            .into_iter()
            .filter_map(|(val, _)| match resolvedval_to_result(val) {
                Ok(ResolvedVal::Ip(ip)) => Some(Ok(ip)),
                Ok(_) => None,
                Err(e) => Some(Err(e)),
            })
            .collect()
    }

    /// Perform a reverse DNS lookup, by sending a RESOLVE cell with
    /// the last relay on this circuit.
    ///
    /// Note that this function does not check for timeouts; that's
    /// the caller's responsibility.
    pub async fn resolve_ptr(self: &Arc<ClientCirc>, addr: IpAddr) -> Result<Vec<String>> {
        let resolve_ptr_msg = Resolve::new_reverse(&addr);

        let resolved_msg = self.try_resolve(resolve_ptr_msg).await?;

        resolved_msg
            .into_answers()
            .into_iter()
            .filter_map(|(val, _)| match resolvedval_to_result(val) {
                Ok(ResolvedVal::Hostname(v)) => Some(
                    String::from_utf8(v)
                        .map_err(|_| Error::StreamProto("Resolved Hostname was not utf-8".into())),
                ),
                Ok(_) => None,
                Err(e) => Some(Err(e)),
            })
            .collect()
    }

    /// Helper: Send the resolve message, and read resolved message from
    /// resolve stream.
    async fn try_resolve(self: &Arc<ClientCirc>, msg: Resolve) -> Result<Resolved> {
        let (reader, _target, memquota) = self
            .begin_stream_impl(msg.into(), ResolveCmdChecker::new_any())
            .await?;
        let mut resolve_stream = ResolveStream::new(reader, memquota);
        resolve_stream.read_msg().await
    }

    /// Shut down this circuit, along with all streams that are using it.
    /// Happens asynchronously (i.e. the circuit won't necessarily be done shutting down
    /// immediately after this function returns!).
    ///
    /// Note that other references to this circuit may exist.  If they
    /// do, they will stop working after you call this function.
    ///
    /// It's not necessary to call this method if you're just done
    /// with a circuit: the circuit should close on its own once nothing
    /// is using it any more.
    pub fn terminate(&self) {
        let _ = self.command.unbounded_send(CtrlCmd::Shutdown);
    }

    /// Called when a circuit-level protocol error has occurred and the
    /// circuit needs to shut down.
    ///
    /// This is a separate function because we may eventually want to have
    /// it do more than just shut down.
    ///
    /// As with `terminate`, this function is asynchronous.
    pub(crate) fn protocol_error(&self) {
        self.terminate();
    }

    /// Return true if this circuit is closed and therefore unusable.
    pub fn is_closing(&self) -> bool {
        self.control.is_closed()
    }

    /// Return a process-unique identifier for this circuit.
    pub fn unique_id(&self) -> UniqId {
        self.unique_id
    }

    /// Return the number of hops in this circuit.
    ///
    /// NOTE: This function will currently return only the number of hops
    /// _currently_ in the circuit. If there is an extend operation in progress,
    /// the currently pending hop may or may not be counted, depending on whether
    /// the extend operation finishes before this call is done.
    pub fn n_hops(&self) -> usize {
        self.mutable.lock().expect("poisoned lock").path.n_hops()
    }

    /// Return a future that will resolve once this circuit has closed.
    ///
    /// Note that this method does not itself cause the circuit to shut down.
    ///
    /// TODO: Perhaps this should return some kind of status indication instead
    /// of just ()
    #[cfg(feature = "experimental-api")]
    pub fn wait_for_close(&self) -> impl futures::Future<Output = ()> + Send + Sync + 'static {
        self.reactor_closed_rx.clone().map(|_| ())
    }
}

/// Handle to use during an ongoing protocol exchange with a circuit's last hop
///
/// This is obtained from [`ClientCirc::start_conversation`],
/// and used to send messages to the last hop relay.
//
// TODO(conflux): this should use ClientTunnel, and it should be moved into
// the tunnel module.
#[cfg(feature = "send-control-msg")]
#[cfg_attr(docsrs, doc(cfg(feature = "send-control-msg")))]
pub struct Conversation<'r>(&'r ClientCirc);

#[cfg(feature = "send-control-msg")]
#[cfg_attr(docsrs, doc(cfg(feature = "send-control-msg")))]
impl Conversation<'_> {
    /// Send a protocol message as part of an ad-hoc exchange
    ///
    /// Responses are handled by the `MsgHandler` set up
    /// when the `Conversation` was created.
    pub async fn send_message(&self, msg: tor_cell::relaycell::msg::AnyRelayMsg) -> Result<()> {
        self.send_internal(Some(msg), None).await
    }

    /// Send a `SendMsgAndInstallHandler` to the reactor and wait for the outcome
    ///
    /// The guts of `start_conversation` and `Conversation::send_msg`
    pub(crate) async fn send_internal(
        &self,
        msg: Option<tor_cell::relaycell::msg::AnyRelayMsg>,
        handler: Option<Box<dyn MetaCellHandler + Send + 'static>>,
    ) -> Result<()> {
        let msg = msg.map(|msg| tor_cell::relaycell::AnyRelayMsgOuter::new(None, msg));
        let (sender, receiver) = oneshot::channel();

        let ctrl_msg = CtrlMsg::SendMsgAndInstallHandler {
            msg,
            handler,
            sender,
        };
        self.0
            .control
            .unbounded_send(ctrl_msg)
            .map_err(|_| Error::CircuitClosed)?;

        receiver.await.map_err(|_| Error::CircuitClosed)?
    }
}

impl PendingClientCirc {
    /// Instantiate a new circuit object: used from Channel::new_circ().
    ///
    /// Does not send a CREATE* cell on its own.
    ///
    ///
    pub(crate) fn new(
        id: CircId,
        channel: Arc<Channel>,
        createdreceiver: oneshot::Receiver<CreateResponse>,
        input: CircuitRxReceiver,
        unique_id: UniqId,
        memquota: CircuitAccount,
    ) -> (PendingClientCirc, crate::tunnel::reactor::Reactor) {
        let time_provider = channel.time_provider().clone();
        let (reactor, control_tx, command_tx, reactor_closed_rx, mutable) =
            Reactor::new(channel, id, unique_id, input, memquota.clone());

        let circuit = ClientCirc {
            mutable,
            unique_id,
            control: control_tx,
            command: command_tx,
            reactor_closed_rx: reactor_closed_rx.shared(),
            #[cfg(test)]
            circid: id,
            memquota,
            time_provider,
        };

        let pending = PendingClientCirc {
            recvcreated: createdreceiver,
            circ: Arc::new(circuit),
        };
        (pending, reactor)
    }

    /// Extract the process-unique identifier for this pending circuit.
    pub fn peek_unique_id(&self) -> UniqId {
        self.circ.unique_id
    }

    /// Use the (questionable!) CREATE_FAST handshake to connect to the
    /// first hop of this circuit.
    ///
    /// There's no authentication in CRATE_FAST,
    /// so we don't need to know whom we're connecting to: we're just
    /// connecting to whichever relay the channel is for.
    pub async fn create_firsthop_fast(self, params: CircParameters) -> Result<Arc<ClientCirc>> {
        let (tx, rx) = oneshot::channel();
        self.circ
            .control
            .unbounded_send(CtrlMsg::Create {
                recv_created: self.recvcreated,
                handshake: CircuitHandshake::CreateFast,
                params,
                done: tx,
            })
            .map_err(|_| Error::CircuitClosed)?;

        rx.await.map_err(|_| Error::CircuitClosed)??;

        Ok(self.circ)
    }

    /// Use the ntor handshake to connect to the first hop of this circuit.
    ///
    /// Note that the provided 'target' must match the channel's target,
    /// or the handshake will fail.
    pub async fn create_firsthop_ntor<Tg>(
        self,
        target: &Tg,
        params: CircParameters,
    ) -> Result<Arc<ClientCirc>>
    where
        Tg: tor_linkspec::CircTarget,
    {
        let (tx, rx) = oneshot::channel();

        self.circ
            .control
            .unbounded_send(CtrlMsg::Create {
                recv_created: self.recvcreated,
                handshake: CircuitHandshake::Ntor {
                    public_key: NtorPublicKey {
                        id: *target
                            .rsa_identity()
                            .ok_or(Error::MissingId(RelayIdType::Rsa))?,
                        pk: *target.ntor_onion_key(),
                    },
                    ed_identity: *target
                        .ed_identity()
                        .ok_or(Error::MissingId(RelayIdType::Ed25519))?,
                },
                params,
                done: tx,
            })
            .map_err(|_| Error::CircuitClosed)?;

        rx.await.map_err(|_| Error::CircuitClosed)??;

        Ok(self.circ)
    }

    /// Use the ntor_v3 handshake to connect to the first hop of this circuit.
    ///
    /// Assumes that the target supports ntor_v3. The caller should verify
    /// this before calling this function, e.g. by validating that the target
    /// has advertised ["Relay=4"](https://spec.torproject.org/tor-spec/subprotocol-versioning.html#relay).
    ///
    /// Note that the provided 'target' must match the channel's target,
    /// or the handshake will fail.
    pub async fn create_firsthop_ntor_v3<Tg>(
        self,
        target: &Tg,
        params: CircParameters,
    ) -> Result<Arc<ClientCirc>>
    where
        Tg: tor_linkspec::CircTarget,
    {
        let (tx, rx) = oneshot::channel();

        self.circ
            .control
            .unbounded_send(CtrlMsg::Create {
                recv_created: self.recvcreated,
                handshake: CircuitHandshake::NtorV3 {
                    public_key: NtorV3PublicKey {
                        id: *target
                            .ed_identity()
                            .ok_or(Error::MissingId(RelayIdType::Ed25519))?,
                        pk: *target.ntor_onion_key(),
                    },
                },
                params,
                done: tx,
            })
            .map_err(|_| Error::CircuitClosed)?;

        rx.await.map_err(|_| Error::CircuitClosed)??;

        Ok(self.circ)
    }
}

/// Convert a [`ResolvedVal`] into a Result, based on whether or not
/// it represents an error.
fn resolvedval_to_result(val: ResolvedVal) -> Result<ResolvedVal> {
    match val {
        ResolvedVal::TransientError => Err(Error::ResolveError(ResolveError::Transient)),
        ResolvedVal::NontransientError => Err(Error::ResolveError(ResolveError::Nontransient)),
        ResolvedVal::Unrecognized(_, _) => Err(Error::ResolveError(ResolveError::Unrecognized)),
        _ => Ok(val),
    }
}

#[cfg(test)]
pub(crate) mod test {
    // @@ begin test lint list maintained by maint/add_warning @@
    #![allow(clippy::bool_assert_comparison)]
    #![allow(clippy::clone_on_copy)]
    #![allow(clippy::dbg_macro)]
    #![allow(clippy::mixed_attributes_style)]
    #![allow(clippy::print_stderr)]
    #![allow(clippy::print_stdout)]
    #![allow(clippy::single_char_pattern)]
    #![allow(clippy::unwrap_used)]
    #![allow(clippy::unchecked_duration_subtraction)]
    #![allow(clippy::useless_vec)]
    #![allow(clippy::needless_pass_by_value)]
    //! <!-- @@ end test lint list maintained by maint/add_warning @@ -->

    use super::*;
    use crate::channel::OpenChanCellS2C;
    use crate::channel::{test::new_reactor, CodecError};
    use crate::congestion::sendme;
    use crate::congestion::test_utils::params::build_cc_vegas_params;
    use crate::crypto::cell::RelayCellBody;
    use crate::crypto::handshake::ntor_v3::NtorV3Server;
    #[cfg(feature = "hs-service")]
    use crate::stream::IncomingStreamRequestFilter;
    use chanmsg::{AnyChanMsg, Created2, CreatedFast};
    use futures::channel::mpsc::{Receiver, Sender};
    use futures::io::{AsyncReadExt, AsyncWriteExt};
    use futures::sink::SinkExt;
    use futures::stream::StreamExt;
    use futures::task::SpawnExt;
    use hex_literal::hex;
    use std::collections::{HashMap, VecDeque};
    use std::fmt::Debug;
    use std::time::Duration;
    use rand::SeedableRng;
    use tor_cell::chancell::{msg as chanmsg, AnyChanCell, BoxedCellBody, ChanCmd};
    use tor_cell::relaycell::extend::NtorV3Extension;
    use tor_cell::relaycell::{
        msg as relaymsg, AnyRelayMsgOuter, RelayCellFormat, RelayCmd, RelayMsg as _, StreamId,
    };
    use tor_linkspec::OwnedCircTarget;
    use tor_memquota::HasMemoryCost;
    use tor_rtcompat::Runtime;
    use tracing::trace;
    use tracing_test::traced_test;

    impl PendingClientCirc {
        /// Testing only: Extract the circuit ID for this pending circuit.
        pub(crate) fn peek_circid(&self) -> CircId {
            self.circ.circid
        }
    }

    impl ClientCirc {
        /// Testing only: Extract the circuit ID of this circuit.
        pub(crate) fn peek_circid(&self) -> CircId {
            self.circid
        }
    }

    fn rmsg_to_ccmsg(id: Option<StreamId>, msg: relaymsg::AnyRelayMsg) -> ClientCircChanMsg {
        // TODO #1947: test other formats.
        let rfmt = RelayCellFormat::V0;
        let body: BoxedCellBody = AnyRelayMsgOuter::new(id, msg)
            .encode(rfmt, &mut rand::rngs::StdRng::seed_from_u64(0))
            .unwrap();
        let chanmsg = chanmsg::Relay::from(body);
        ClientCircChanMsg::Relay(chanmsg)
    }

    // Example relay IDs and keys
    const EXAMPLE_SK: [u8; 32] =
        hex!("7789d92a89711a7e2874c61ea495452cfd48627b3ca2ea9546aafa5bf7b55803");
    const EXAMPLE_PK: [u8; 32] =
        hex!("395cb26b83b3cd4b91dba9913e562ae87d21ecdd56843da7ca939a6a69001253");
    const EXAMPLE_ED_ID: [u8; 32] = [6; 32];
    const EXAMPLE_RSA_ID: [u8; 20] = [10; 20];

    /// Make an MPSC queue, of the type we use in Channels, but a fake one for testing
    #[cfg(test)]
    pub(crate) fn fake_mpsc<T: HasMemoryCost + Debug + Send>(
        buffer: usize,
    ) -> (StreamMpscSender<T>, StreamMpscReceiver<T>) {
        crate::fake_mpsc(buffer)
    }

    /// return an example OwnedCircTarget that can get used for an ntor handshake.
    fn example_target() -> OwnedCircTarget {
        let mut builder = OwnedCircTarget::builder();
        builder
            .chan_target()
            .ed_identity(EXAMPLE_ED_ID.into())
            .rsa_identity(EXAMPLE_RSA_ID.into());
        builder
            .ntor_onion_key(EXAMPLE_PK.into())
            .protocols("FlowCtrl=1".parse().unwrap())
            .build()
            .unwrap()
    }
    fn example_ntor_key() -> crate::crypto::handshake::ntor::NtorSecretKey {
        crate::crypto::handshake::ntor::NtorSecretKey::new(
            EXAMPLE_SK.into(),
            EXAMPLE_PK.into(),
            EXAMPLE_RSA_ID.into(),
        )
    }
    fn example_ntor_v3_key() -> crate::crypto::handshake::ntor_v3::NtorV3SecretKey {
        crate::crypto::handshake::ntor_v3::NtorV3SecretKey::new(
            EXAMPLE_SK.into(),
            EXAMPLE_PK.into(),
            EXAMPLE_ED_ID.into(),
        )
    }

    fn working_fake_channel<R: Runtime>(
        rt: &R,
    ) -> (
        Arc<Channel>,
        Receiver<AnyChanCell>,
        Sender<std::result::Result<OpenChanCellS2C, CodecError>>,
    ) {
        let (channel, chan_reactor, rx, tx) = new_reactor(rt.clone());
        rt.spawn(async {
            let _ignore = chan_reactor.run().await;
        })
        .unwrap();
        (channel, rx, tx)
    }

    /// Which handshake type to use.
    #[derive(Copy, Clone)]
    enum HandshakeType {
        Fast,
        Ntor,
        NtorV3,
    }

    async fn test_create<R: Runtime>(rt: &R, handshake_type: HandshakeType, with_cc: bool) {
        // We want to try progressing from a pending circuit to a circuit
        // via a crate_fast handshake.

        use crate::crypto::handshake::{fast::CreateFastServer, ntor::NtorServer, ServerHandshake};

        let (chan, mut rx, _sink) = working_fake_channel(rt);
        let circid = CircId::new(128).unwrap();
        let (created_send, created_recv) = oneshot::channel();
        let (_circmsg_send, circmsg_recv) = fake_mpsc(64);
        let unique_id = UniqId::new(23, 17);

        let (pending, reactor) = PendingClientCirc::new(
            circid,
            chan,
            created_recv,
            circmsg_recv,
            unique_id,
            CircuitAccount::new_noop(),
        );

        rt.spawn(async {
            let _ignore = reactor.run().await;
        })
        .unwrap();

        // Future to pretend to be a relay on the other end of the circuit.
        let simulate_relay_fut = async move {
            let mut rng = rand::rngs::StdRng::seed_from_u64(0);
            let create_cell = rx.next().await.unwrap();
            assert_eq!(create_cell.circid(), Some(circid));
            let reply = match handshake_type {
                HandshakeType::Fast => {
                    let cf = match create_cell.msg() {
                        AnyChanMsg::CreateFast(cf) => cf,
                        other => panic!("{:?}", other),
                    };
                    let (_, rep) = CreateFastServer::server(
                        &mut rng,
                        &mut |_: &()| Some(()),
                        &[()],
                        cf.handshake(),
                    )
                    .unwrap();
                    CreateResponse::CreatedFast(CreatedFast::new(rep))
                }
                HandshakeType::Ntor => {
                    let c2 = match create_cell.msg() {
                        AnyChanMsg::Create2(c2) => c2,
                        other => panic!("{:?}", other),
                    };
                    let (_, rep) = NtorServer::server(
                        &mut rng,
                        &mut |_: &()| Some(()),
                        &[example_ntor_key()],
                        c2.body(),
                    )
                    .unwrap();
                    CreateResponse::Created2(Created2::new(rep))
                }
                HandshakeType::NtorV3 => {
                    let c2 = match create_cell.msg() {
                        AnyChanMsg::Create2(c2) => c2,
                        other => panic!("{:?}", other),
                    };
                    let mut reply_fn = if with_cc {
                        |client_exts: &[NtorV3Extension]| {
                            let _ = client_exts
                                .iter()
                                .find(|e| matches!(e, NtorV3Extension::RequestCongestionControl))
                                .expect("Client failed to request CC");
                            Some(vec![NtorV3Extension::AckCongestionControl {
                                // This needs to be aligned to test_utils params
                                // value due to validation that needs it in range.
                                sendme_inc: 31,
                            }])
                        }
                    } else {
                        |_: &_| Some(vec![])
                    };
                    let (_, rep) = NtorV3Server::server(
                        &mut rng,
                        &mut reply_fn,
                        &[example_ntor_v3_key()],
                        c2.body(),
                    )
                    .unwrap();
                    CreateResponse::Created2(Created2::new(rep))
                }
            };
            created_send.send(reply).unwrap();
        };
        // Future to pretend to be a client.
        let client_fut = async move {
            let target = example_target();
            let params = CircParameters::default();
            let ret = match handshake_type {
                HandshakeType::Fast => {
                    trace!("doing fast create");
                    pending.create_firsthop_fast(params).await
                }
                HandshakeType::Ntor => {
                    trace!("doing ntor create");
                    pending.create_firsthop_ntor(&target, params).await
                }
                HandshakeType::NtorV3 => {
                    let params = if with_cc {
                        // Setup CC vegas parameters.
                        CircParameters::new(true, build_cc_vegas_params())
                    } else {
                        params
                    };
                    trace!("doing ntor_v3 create");
                    pending.create_firsthop_ntor_v3(&target, params).await
                }
            };
            trace!("create done: result {:?}", ret);
            ret
        };

        let (circ, _) = futures::join!(client_fut, simulate_relay_fut);

        let _circ = circ.unwrap();

        // pfew!  We've build a circuit!  Let's make sure it has one hop.
        assert_eq!(_circ.n_hops(), 1);
    }

    #[traced_test]
    #[test]
    fn test_create_fast() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            test_create(&rt, HandshakeType::Fast, false).await;
        });
    }
    #[traced_test]
    #[test]
    fn test_create_ntor() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            test_create(&rt, HandshakeType::Ntor, false).await;
        });
    }
    #[traced_test]
    #[test]
    fn test_create_ntor_v3() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            test_create(&rt, HandshakeType::NtorV3, false).await;
        });
    }
    #[traced_test]
    #[test]
    #[cfg(feature = "flowctl-cc")]
    fn test_create_ntor_v3_with_cc() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            test_create(&rt, HandshakeType::NtorV3, true).await;
        });
    }

    // An encryption layer that doesn't do any crypto.   Can be used
    // as inbound or outbound, but not both at once.
    pub(crate) struct DummyCrypto {
        counter_tag: [u8; 20],
        counter: u32,
        lasthop: bool,
    }
    impl DummyCrypto {
        fn next_tag(&mut self) -> &[u8; 20] {
            #![allow(clippy::identity_op)]
            self.counter_tag[0] = ((self.counter >> 0) & 255) as u8;
            self.counter_tag[1] = ((self.counter >> 8) & 255) as u8;
            self.counter_tag[2] = ((self.counter >> 16) & 255) as u8;
            self.counter_tag[3] = ((self.counter >> 24) & 255) as u8;
            self.counter += 1;
            &self.counter_tag
        }
    }

    impl crate::crypto::cell::OutboundClientLayer for DummyCrypto {
        fn originate_for(&mut self, _cmd: ChanCmd, _cell: &mut RelayCellBody) -> &[u8] {
            self.next_tag()
        }
        fn encrypt_outbound(&mut self, _cmd: ChanCmd, _cell: &mut RelayCellBody) {}
    }
    impl crate::crypto::cell::InboundClientLayer for DummyCrypto {
        fn decrypt_inbound(&mut self, _cmd: ChanCmd, _cell: &mut RelayCellBody) -> Option<&[u8]> {
            if self.lasthop {
                Some(self.next_tag())
            } else {
                None
            }
        }
    }
    impl DummyCrypto {
        pub(crate) fn new(lasthop: bool) -> Self {
            DummyCrypto {
                counter_tag: [0; 20],
                counter: 0,
                lasthop,
            }
        }
    }

    // Helper: set up a 3-hop circuit with no encryption, where the
    // next inbound message seems to come from hop next_msg_from
    async fn newcirc_ext<R: Runtime>(
        rt: &R,
        chan: Arc<Channel>,
        next_msg_from: HopNum,
    ) -> (Arc<ClientCirc>, CircuitRxSender) {
        let circid = CircId::new(128).unwrap();
        let (_created_send, created_recv) = oneshot::channel();
        let (circmsg_send, circmsg_recv) = fake_mpsc(64);
        let unique_id = UniqId::new(23, 17);

        let (pending, reactor) = PendingClientCirc::new(
            circid,
            chan,
            created_recv,
            circmsg_recv,
            unique_id,
            CircuitAccount::new_noop(),
        );

        rt.spawn(async {
            let _ignore = reactor.run().await;
        })
        .unwrap();

        let PendingClientCirc {
            circ,
            recvcreated: _,
        } = pending;

        // TODO #1067: Support other formats
        let relay_cell_format = RelayCellFormat::V0;
        for idx in 0_u8..3 {
            let params = CircParameters::default();
            let (tx, rx) = oneshot::channel();
            circ.command
                .unbounded_send(CtrlCmd::AddFakeHop {
                    relay_cell_format,
                    fwd_lasthop: idx == 2,
                    rev_lasthop: idx == u8::from(next_msg_from),
                    params,
                    done: tx,
                })
                .unwrap();
            rx.await.unwrap().unwrap();
        }

        (circ, circmsg_send)
    }

    // Helper: set up a 3-hop circuit with no encryption, where the
    // next inbound message seems to come from hop next_msg_from
    async fn newcirc<R: Runtime>(rt: &R, chan: Arc<Channel>) -> (Arc<ClientCirc>, CircuitRxSender) {
        newcirc_ext(rt, chan, 2.into()).await
    }

    async fn test_extend<R: Runtime>(rt: &R, handshake_type: HandshakeType) {
        use crate::crypto::handshake::{ntor::NtorServer, ServerHandshake};

        let (chan, mut rx, _sink) = working_fake_channel(rt);
        let (circ, mut sink) = newcirc(rt, chan).await;
        let circid = circ.peek_circid();
        let params = CircParameters::default();

        let extend_fut = async move {
            let target = example_target();
            match handshake_type {
                HandshakeType::Fast => panic!("Can't extend with Fast handshake"),
                HandshakeType::Ntor => circ.extend_ntor(&target, params).await.unwrap(),
                HandshakeType::NtorV3 => circ.extend_ntor_v3(&target, params).await.unwrap(),
            };
            circ // gotta keep the circ alive, or the reactor would exit.
        };
        let reply_fut = async move {
            // We've disabled encryption on this circuit, so we can just
            // read the extend2 cell.
            let (id, chmsg) = rx.next().await.unwrap().into_circid_and_msg();
            assert_eq!(id, Some(circid));
            let rmsg = match chmsg {
                AnyChanMsg::RelayEarly(r) => {
                    AnyRelayMsgOuter::decode_singleton(RelayCellFormat::V0, r.into_relay_body())
                        .unwrap()
                }
                other => panic!("{:?}", other),
            };
            let e2 = match rmsg.msg() {
                AnyRelayMsg::Extend2(e2) => e2,
                other => panic!("{:?}", other),
            };
            let mut rng = rand::rngs::StdRng::seed_from_u64(0);
            let reply = match handshake_type {
                HandshakeType::Fast => panic!("Can't extend with Fast handshake"),
                HandshakeType::Ntor => {
                    let (_keygen, reply) = NtorServer::server(
                        &mut rng,
                        &mut |_: &()| Some(()),
                        &[example_ntor_key()],
                        e2.handshake(),
                    )
                    .unwrap();
                    reply
                }
                HandshakeType::NtorV3 => {
                    let (_keygen, reply) = NtorV3Server::server(
                        &mut rng,
                        &mut |_: &[NtorV3Extension]| Some(vec![]),
                        &[example_ntor_v3_key()],
                        e2.handshake(),
                    )
                    .unwrap();
                    reply
                }
            };

            let extended2 = relaymsg::Extended2::new(reply).into();
            sink.send(rmsg_to_ccmsg(None, extended2)).await.unwrap();
            (sink, rx) // gotta keep the sink and receiver alive, or the reactor will exit.
        };

        let (circ, _) = futures::join!(extend_fut, reply_fut);

        // Did we really add another hop?
        assert_eq!(circ.n_hops(), 4);

        // Do the path accessors report a reasonable outcome?
        #[allow(deprecated)]
        {
            let path = circ.path();
            assert_eq!(path.len(), 4);
            use tor_linkspec::HasRelayIds;
            assert_eq!(path[3].ed_identity(), example_target().ed_identity());
            assert_ne!(path[0].ed_identity(), example_target().ed_identity());
        }
        {
            let path = circ.path_ref();
            assert_eq!(path.n_hops(), 4);
            use tor_linkspec::HasRelayIds;
            assert_eq!(
                path.hops()[3].as_chan_target().unwrap().ed_identity(),
                example_target().ed_identity()
            );
            assert_ne!(
                path.hops()[0].as_chan_target().unwrap().ed_identity(),
                example_target().ed_identity()
            );
        }
    }

    #[traced_test]
    #[test]
    fn test_extend_ntor() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            test_extend(&rt, HandshakeType::Ntor).await;
        });
    }

    #[traced_test]
    #[test]
    fn test_extend_ntor_v3() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            test_extend(&rt, HandshakeType::NtorV3).await;
        });
    }

    async fn bad_extend_test_impl<R: Runtime>(
        rt: &R,
        reply_hop: HopNum,
        bad_reply: ClientCircChanMsg,
    ) -> Error {
        let (chan, _rx, _sink) = working_fake_channel(rt);
        let (circ, mut sink) = newcirc_ext(rt, chan, reply_hop).await;
        let params = CircParameters::default();

        let target = example_target();
        #[allow(clippy::clone_on_copy)]
        let rtc = rt.clone();
        let sink_handle = rt
            .spawn_with_handle(async move {
                rtc.sleep(Duration::from_millis(100)).await;
                sink.send(bad_reply).await.unwrap();
                sink
            })
            .unwrap();
        let outcome = circ.extend_ntor(&target, params).await;
        let _sink = sink_handle.await;

        assert_eq!(circ.n_hops(), 3);
        assert!(outcome.is_err());
        outcome.unwrap_err()
    }

    #[traced_test]
    #[test]
    fn bad_extend_wronghop() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let extended2 = relaymsg::Extended2::new(vec![]).into();
            let cc = rmsg_to_ccmsg(None, extended2);

            let error = bad_extend_test_impl(&rt, 1.into(), cc).await;
            // This case shows up as a CircDestroy, since a message sent
            // from the wrong hop won't even be delivered to the extend
            // code's meta-handler.  Instead the unexpected message will cause
            // the circuit to get torn down.
            match error {
                Error::CircuitClosed => {}
                x => panic!("got other error: {}", x),
            }
        });
    }

    #[traced_test]
    #[test]
    fn bad_extend_wrongtype() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let extended = relaymsg::Extended::new(vec![7; 200]).into();
            let cc = rmsg_to_ccmsg(None, extended);

            let error = bad_extend_test_impl(&rt, 2.into(), cc).await;
            match error {
                Error::BytesErr {
                    err: tor_bytes::Error::InvalidMessage(_),
                    object: "extended2 message",
                } => {}
                other => panic!("{:?}", other),
            }
        });
    }

    #[traced_test]
    #[test]
    fn bad_extend_destroy() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let cc = ClientCircChanMsg::Destroy(chanmsg::Destroy::new(4.into()));
            let error = bad_extend_test_impl(&rt, 2.into(), cc).await;
            match error {
                Error::CircuitClosed => {}
                other => panic!("{:?}", other),
            }
        });
    }

    #[traced_test]
    #[test]
    fn bad_extend_crypto() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let extended2 = relaymsg::Extended2::new(vec![99; 256]).into();
            let cc = rmsg_to_ccmsg(None, extended2);
            let error = bad_extend_test_impl(&rt, 2.into(), cc).await;
            assert!(matches!(error, Error::BadCircHandshakeAuth));
        });
    }

    #[traced_test]
    #[test]
    fn begindir() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let (chan, mut rx, _sink) = working_fake_channel(&rt);
            let (circ, mut sink) = newcirc(&rt, chan).await;
            let circid = circ.peek_circid();

            let begin_and_send_fut = async move {
                // Here we'll say we've got a circuit, and we want to
                // make a simple BEGINDIR request with it.
                let mut stream = circ.begin_dir_stream().await.unwrap();
                stream.write_all(b"HTTP/1.0 GET /\r\n").await.unwrap();
                stream.flush().await.unwrap();
                let mut buf = [0_u8; 1024];
                let n = stream.read(&mut buf).await.unwrap();
                assert_eq!(&buf[..n], b"HTTP/1.0 404 Not found\r\n");
                let n = stream.read(&mut buf).await.unwrap();
                assert_eq!(n, 0);
                stream
            };
            let reply_fut = async move {
                // We've disabled encryption on this circuit, so we can just
                // read the begindir cell.
                let (id, chmsg) = rx.next().await.unwrap().into_circid_and_msg();
                assert_eq!(id, Some(circid));
                let rmsg = match chmsg {
                    AnyChanMsg::Relay(r) => {
                        AnyRelayMsgOuter::decode_singleton(RelayCellFormat::V0, r.into_relay_body())
                            .unwrap()
                    }
                    other => panic!("{:?}", other),
                };
                let (streamid, rmsg) = rmsg.into_streamid_and_msg();
                assert!(matches!(rmsg, AnyRelayMsg::BeginDir(_)));

                // Reply with a Connected cell to indicate success.
                let connected = relaymsg::Connected::new_empty().into();
                sink.send(rmsg_to_ccmsg(streamid, connected)).await.unwrap();

                // Now read a DATA cell...
                let (id, chmsg) = rx.next().await.unwrap().into_circid_and_msg();
                assert_eq!(id, Some(circid));
                let rmsg = match chmsg {
                    AnyChanMsg::Relay(r) => {
                        AnyRelayMsgOuter::decode_singleton(RelayCellFormat::V0, r.into_relay_body())
                            .unwrap()
                    }
                    other => panic!("{:?}", other),
                };
                let (streamid_2, rmsg) = rmsg.into_streamid_and_msg();
                assert_eq!(streamid_2, streamid);
                if let AnyRelayMsg::Data(d) = rmsg {
                    assert_eq!(d.as_ref(), &b"HTTP/1.0 GET /\r\n"[..]);
                } else {
                    panic!();
                }

                // Write another data cell in reply!
                let data = relaymsg::Data::new(b"HTTP/1.0 404 Not found\r\n")
                    .unwrap()
                    .into();
                sink.send(rmsg_to_ccmsg(streamid, data)).await.unwrap();

                // Send an END cell to say that the conversation is over.
                let end = relaymsg::End::new_with_reason(relaymsg::EndReason::DONE).into();
                sink.send(rmsg_to_ccmsg(streamid, end)).await.unwrap();

                (rx, sink) // gotta keep these alive, or the reactor will exit.
            };

            let (_stream, (_rx, _sink)) = futures::join!(begin_and_send_fut, reply_fut);
        });
    }

    // Test: close a stream, either by dropping it or by calling AsyncWriteExt::close.
    fn close_stream_helper(by_drop: bool) {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let (chan, mut rx, _sink) = working_fake_channel(&rt);
            let (circ, mut sink) = newcirc(&rt, chan).await;

            let stream_fut = async move {
                let stream = circ
                    .begin_stream("www.example.com", 80, None)
                    .await
                    .unwrap();

                let (r, mut w) = stream.split();
                if by_drop {
                    // Drop the writer and the reader, which should close the stream.
                    drop(r);
                    drop(w);
                    (None, circ) // make sure to keep the circuit alive
                } else {
                    // Call close on the writer, while keeping the reader alive.
                    w.close().await.unwrap();
                    (Some(r), circ)
                }
            };
            let handler_fut = async {
                // Read the BEGIN message.
                let (_, msg) = rx.next().await.unwrap().into_circid_and_msg();
                let rmsg = match msg {
                    AnyChanMsg::Relay(r) => {
                        AnyRelayMsgOuter::decode_singleton(RelayCellFormat::V0, r.into_relay_body())
                            .unwrap()
                    }
                    other => panic!("{:?}", other),
                };
                let (streamid, rmsg) = rmsg.into_streamid_and_msg();
                assert_eq!(rmsg.cmd(), RelayCmd::BEGIN);

                // Reply with a CONNECTED.
                let connected =
                    relaymsg::Connected::new_with_addr("10.0.0.1".parse().unwrap(), 1234).into();
                sink.send(rmsg_to_ccmsg(streamid, connected)).await.unwrap();

                // Expect an END.
                let (_, msg) = rx.next().await.unwrap().into_circid_and_msg();
                let rmsg = match msg {
                    AnyChanMsg::Relay(r) => {
                        AnyRelayMsgOuter::decode_singleton(RelayCellFormat::V0, r.into_relay_body())
                            .unwrap()
                    }
                    other => panic!("{:?}", other),
                };
                let (_, rmsg) = rmsg.into_streamid_and_msg();
                assert_eq!(rmsg.cmd(), RelayCmd::END);

                (rx, sink) // keep these alive or the reactor will exit.
            };

            let ((_opt_reader, _circ), (_rx, _sink)) = futures::join!(stream_fut, handler_fut);
        });
    }

    #[traced_test]
    #[test]
    fn drop_stream() {
        close_stream_helper(true);
    }

    #[traced_test]
    #[test]
    fn close_stream() {
        close_stream_helper(false);
    }

    // Set up a circuit and stream that expects some incoming SENDMEs.
    async fn setup_incoming_sendme_case<R: Runtime>(
        rt: &R,
        n_to_send: usize,
    ) -> (
        Arc<ClientCirc>,
        DataStream,
        CircuitRxSender,
        Option<StreamId>,
        usize,
        Receiver<AnyChanCell>,
        Sender<std::result::Result<OpenChanCellS2C, CodecError>>,
    ) {
        let (chan, mut rx, sink2) = working_fake_channel(rt);
        let (circ, mut sink) = newcirc(rt, chan).await;
        let circid = circ.peek_circid();

        let begin_and_send_fut = {
            let circ = circ.clone();
            async move {
                // Take our circuit and make a stream on it.
                let mut stream = circ
                    .begin_stream("www.example.com", 443, None)
                    .await
                    .unwrap();
                let junk = [0_u8; 1024];
                let mut remaining = n_to_send;
                while remaining > 0 {
                    let n = std::cmp::min(remaining, junk.len());
                    stream.write_all(&junk[..n]).await.unwrap();
                    remaining -= n;
                }
                stream.flush().await.unwrap();
                stream
            }
        };

        let receive_fut = async move {
            // Read the begin cell.
            let (_id, chmsg) = rx.next().await.unwrap().into_circid_and_msg();
            let rmsg = match chmsg {
                AnyChanMsg::Relay(r) => {
                    AnyRelayMsgOuter::decode_singleton(RelayCellFormat::V0, r.into_relay_body())
                        .unwrap()
                }
                other => panic!("{:?}", other),
            };
            let (streamid, rmsg) = rmsg.into_streamid_and_msg();
            assert!(matches!(rmsg, AnyRelayMsg::Begin(_)));
            // Reply with a connected cell...
            let connected = relaymsg::Connected::new_empty().into();
            sink.send(rmsg_to_ccmsg(streamid, connected)).await.unwrap();
            // Now read bytes from the stream until we have them all.
            let mut bytes_received = 0_usize;
            let mut cells_received = 0_usize;
            while bytes_received < n_to_send {
                // Read a data cell, and remember how much we got.
                let (id, chmsg) = rx.next().await.unwrap().into_circid_and_msg();
                assert_eq!(id, Some(circid));

                let rmsg = match chmsg {
                    AnyChanMsg::Relay(r) => {
                        AnyRelayMsgOuter::decode_singleton(RelayCellFormat::V0, r.into_relay_body())
                            .unwrap()
                    }
                    other => panic!("{:?}", other),
                };
                let (streamid2, rmsg) = rmsg.into_streamid_and_msg();
                assert_eq!(streamid2, streamid);
                if let AnyRelayMsg::Data(dat) = rmsg {
                    cells_received += 1;
                    bytes_received += dat.as_ref().len();
                } else {
                    panic!();
                }
            }

            (sink, streamid, cells_received, rx)
        };

        let (stream, (sink, streamid, cells_received, rx)) =
            futures::join!(begin_and_send_fut, receive_fut);

        (circ, stream, sink, streamid, cells_received, rx, sink2)
    }

    #[traced_test]
    #[test]
    fn accept_valid_sendme() {
        tor_rtmock::MockRuntime::test_with_various(|rt| async move {
            let (circ, _stream, mut sink, streamid, cells_received, _rx, _sink2) =
                setup_incoming_sendme_case(&rt, 300 * 498 + 3).await;

            assert_eq!(cells_received, 301);

            // Make sure that the circuit is indeed expecting the right sendmes
            {
                let (tx, rx) = oneshot::channel();
                circ.command
                    .unbounded_send(CtrlCmd::QuerySendWindow {
                        hop: 2.into(),
                        done: tx,
                    })
                    .unwrap();
                let (window, tags) = rx.await.unwrap().unwrap();
                assert_eq!(window, 1000 - 301);
                assert_eq!(tags.len(), 3);
                // 100
                assert_eq!(
                    tags[0],
                    sendme::CircTag::from(hex!("6400000000000000000000000000000000000000"))
                );
                // 200
                assert_eq!(
                    tags[1],
                    sendme::CircTag::from(hex!("c800000000000000000000000000000000000000"))
                );
                // 300
                assert_eq!(
                    tags[2],
                    sendme::CircTag::from(hex!("2c01000000000000000000000000000000000000"))
                );
            }

            let reply_with_sendme_fut = async move {
                // make and send a circuit-level sendme.
                let c_sendme =
                    relaymsg::Sendme::new_tag(hex!("6400000000000000000000000000000000000000"))
                        .into();
                sink.send(rmsg_to_ccmsg(None, c_sendme)).await.unwrap();

                // Make and send a stream-level sendme.
                let s_sendme = relaymsg::Sendme::new_empty().into();
                sink.send(rmsg_to_ccmsg(streamid, s_sendme)).await.unwrap();

                sink
            };

            let _sink = reply_with_sendme_fut.await;

            rt.advance_until_stalled().await;

            // Now make sure that the circuit is still happy, and its
            // window is updated.
            {
                let (tx, rx) = oneshot::channel();
                circ.command
                    .unbounded_send(CtrlCmd::QuerySendWindow {
                        hop: 2.into(),
                        done: tx,
                    })
                    .unwrap();
                let (window, _tags) = rx.await.unwrap().unwrap();
                assert_eq!(window, 1000 - 201);
            }
        });
    }

    #[traced_test]
    #[test]
    fn invalid_circ_sendme() {
        tor_rtmock::MockRuntime::test_with_various(|rt| async move {
            // Same setup as accept_valid_sendme() test above but try giving
            // a sendme with the wrong tag.

            let (circ, _stream, mut sink, _streamid, _cells_received, _rx, _sink2) =
                setup_incoming_sendme_case(&rt, 300 * 498 + 3).await;

            let reply_with_sendme_fut = async move {
                // make and send a circuit-level sendme with a bad tag.
                let c_sendme =
                    relaymsg::Sendme::new_tag(hex!("FFFF0000000000000000000000000000000000FF"))
                        .into();
                sink.send(rmsg_to_ccmsg(None, c_sendme)).await.unwrap();
                sink
            };

            let _sink = reply_with_sendme_fut.await;

            // Check whether the reactor dies as a result of receiving invalid data.
            rt.advance_until_stalled().await;
            assert!(circ.is_closing());
        });
    }

    #[traced_test]
    #[test]
    fn test_busy_stream_fairness() {
        // Number of streams to use.
        const N_STREAMS: usize = 3;
        // Number of cells (roughly) for each stream to send.
        const N_CELLS: usize = 20;
        // Number of bytes that *each* stream will send, and that we'll read
        // from the channel.
        const N_BYTES: usize = relaymsg::Data::MAXLEN_V0 * N_CELLS;
        // Ignoring cell granularity, with perfect fairness we'd expect
        // `N_BYTES/N_STREAMS` bytes from each stream.
        //
        // We currently allow for up to a full cell less than that.  This is
        // somewhat arbitrary and can be changed as needed, since we don't
        // provide any specific fairness guarantees.
        const MIN_EXPECTED_BYTES_PER_STREAM: usize =
            N_BYTES / N_STREAMS - relaymsg::Data::MAXLEN_V0;

        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let (chan, mut rx, _sink) = working_fake_channel(&rt);
            let (circ, mut sink) = newcirc(&rt, chan).await;

            // Run clients in a single task, doing our own round-robin
            // scheduling of writes to the reactor. Conversely, if we were to
            // put each client in its own task, we would be at the the mercy of
            // how fairly the runtime schedules the client tasks, which is outside
            // the scope of this test.
            rt.spawn({
                // Clone the circuit to keep it alive after writers have
                // finished with it.
                let circ = circ.clone();
                async move {
                    let mut clients = VecDeque::new();
                    struct Client {
                        stream: DataStream,
                        to_write: &'static [u8],
                    }
                    for _ in 0..N_STREAMS {
                        clients.push_back(Client {
                            stream: circ
                                .begin_stream("www.example.com", 80, None)
                                .await
                                .unwrap(),
                            to_write: &[0_u8; N_BYTES][..],
                        });
                    }
                    while let Some(mut client) = clients.pop_front() {
                        if client.to_write.is_empty() {
                            // Client is done. Don't put back in queue.
                            continue;
                        }
                        let written = client.stream.write(client.to_write).await.unwrap();
                        client.to_write = &client.to_write[written..];
                        clients.push_back(client);
                    }
                }
            })
            .unwrap();

            let channel_handler_fut = async {
                let mut stream_bytes_received = HashMap::<StreamId, usize>::new();
                let mut total_bytes_received = 0;

                loop {
                    let (_, msg) = rx.next().await.unwrap().into_circid_and_msg();
                    let rmsg = match msg {
                        AnyChanMsg::Relay(r) => AnyRelayMsgOuter::decode_singleton(
                            RelayCellFormat::V0,
                            r.into_relay_body(),
                        )
                        .unwrap(),
                        other => panic!("Unexpected chanmsg: {other:?}"),
                    };
                    let (streamid, rmsg) = rmsg.into_streamid_and_msg();
                    match rmsg.cmd() {
                        RelayCmd::BEGIN => {
                            // Add an entry for this stream.
                            let prev = stream_bytes_received.insert(streamid.unwrap(), 0);
                            assert_eq!(prev, None);
                            // Reply with a CONNECTED.
                            let connected = relaymsg::Connected::new_with_addr(
                                "10.0.0.1".parse().unwrap(),
                                1234,
                            )
                            .into();
                            sink.send(rmsg_to_ccmsg(streamid, connected)).await.unwrap();
                        }
                        RelayCmd::DATA => {
                            let data_msg = relaymsg::Data::try_from(rmsg).unwrap();
                            let nbytes = data_msg.as_ref().len();
                            total_bytes_received += nbytes;
                            let streamid = streamid.unwrap();
                            let stream_bytes = stream_bytes_received.get_mut(&streamid).unwrap();
                            *stream_bytes += nbytes;
                            if total_bytes_received >= N_BYTES {
                                break;
                            }
                        }
                        RelayCmd::END => {
                            // Stream is done. If fair scheduling is working as
                            // expected we *probably* shouldn't get here, but we
                            // can ignore it and save the failure until we
                            // actually have the final stats.
                            continue;
                        }
                        other => {
                            panic!("Unexpected command {other:?}");
                        }
                    }
                }

                // Return our stats, along with the `rx` and `sink` to keep the
                // reactor alive (since clients could still be writing).
                (total_bytes_received, stream_bytes_received, rx, sink)
            };

            let (total_bytes_received, stream_bytes_received, _rx, _sink) =
                channel_handler_fut.await;
            assert_eq!(stream_bytes_received.len(), N_STREAMS);
            for (sid, stream_bytes) in stream_bytes_received {
                assert!(
                    stream_bytes >= MIN_EXPECTED_BYTES_PER_STREAM,
                    "Only {stream_bytes} of {total_bytes_received} bytes received from {N_STREAMS} came from {sid:?}; expected at least {MIN_EXPECTED_BYTES_PER_STREAM}"
                );
            }
        });
    }

    #[test]
    fn basic_params() {
        use super::CircParameters;
        let mut p = CircParameters::default();
        assert!(p.extend_by_ed25519_id);

        p.extend_by_ed25519_id = false;
        assert!(!p.extend_by_ed25519_id);
    }

    #[cfg(feature = "hs-service")]
    struct AllowAllStreamsFilter;
    #[cfg(feature = "hs-service")]
    impl IncomingStreamRequestFilter for AllowAllStreamsFilter {
        fn disposition(
            &mut self,
            _ctx: &crate::stream::IncomingStreamRequestContext<'_>,
            _circ: &crate::tunnel::reactor::syncview::ClientCircSyncView<'_>,
        ) -> Result<crate::stream::IncomingStreamRequestDisposition> {
            Ok(crate::stream::IncomingStreamRequestDisposition::Accept)
        }
    }

    #[traced_test]
    #[test]
    #[cfg(feature = "hs-service")]
    fn allow_stream_requests_twice() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let (chan, _rx, _sink) = working_fake_channel(&rt);
            let (circ, _send) = newcirc(&rt, chan).await;

            let _incoming = circ
                .allow_stream_requests(
                    &[tor_cell::relaycell::RelayCmd::BEGIN],
                    circ.last_hop_num().unwrap(),
                    AllowAllStreamsFilter,
                )
                .await
                .unwrap();

            let incoming = circ
                .allow_stream_requests(
                    &[tor_cell::relaycell::RelayCmd::BEGIN],
                    circ.last_hop_num().unwrap(),
                    AllowAllStreamsFilter,
                )
                .await;

            // There can only be one IncomingStream at a time on any given circuit.
            assert!(incoming.is_err());
        });
    }

    #[traced_test]
    #[test]
    #[cfg(feature = "hs-service")]
    fn allow_stream_requests() {
        use tor_cell::relaycell::msg::BeginFlags;

        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            const TEST_DATA: &[u8] = b"ping";

            let (chan, _rx, _sink) = working_fake_channel(&rt);
            let (circ, mut send) = newcirc(&rt, chan).await;

            let rfmt = RelayCellFormat::V0;

            // A helper channel for coordinating the "client"/"service" interaction
            let (tx, rx) = oneshot::channel();
            let mut incoming = circ
                .allow_stream_requests(
                    &[tor_cell::relaycell::RelayCmd::BEGIN],
                    circ.last_hop_num().unwrap(),
                    AllowAllStreamsFilter,
                )
                .await
                .unwrap();

            let simulate_service = async move {
                let stream = incoming.next().await.unwrap();
                let mut data_stream = stream
                    .accept_data(relaymsg::Connected::new_empty())
                    .await
                    .unwrap();
                // Notify the client task we're ready to accept DATA cells
                tx.send(()).unwrap();

                // Read the data the client sent us
                let mut buf = [0_u8; TEST_DATA.len()];
                data_stream.read_exact(&mut buf).await.unwrap();
                assert_eq!(&buf, TEST_DATA);

                circ
            };

            let simulate_client = async move {
                let begin = Begin::new("localhost", 80, BeginFlags::IPV6_OKAY).unwrap();
                let body: BoxedCellBody =
                    AnyRelayMsgOuter::new(StreamId::new(12), AnyRelayMsg::Begin(begin))
                        .encode(rfmt, &mut rand::rngs::StdRng::seed_from_u64(0))
                        .unwrap();
                let begin_msg = chanmsg::Relay::from(body);

                // Pretend to be a client at the other end of the circuit sending a begin cell
                send.send(ClientCircChanMsg::Relay(begin_msg))
                    .await
                    .unwrap();

                // Wait until the service is ready to accept data
                // TODO: we shouldn't need to wait! This is needed because the service will reject
                // any DATA cells that aren't associated with a known stream. We need to wait until
                // the service receives our BEGIN cell (and the reactor updates hop.map with the
                // new stream).
                rx.await.unwrap();
                // Now send some data along the newly established circuit..
                let data = relaymsg::Data::new(TEST_DATA).unwrap();
                let body: BoxedCellBody =
                    AnyRelayMsgOuter::new(StreamId::new(12), AnyRelayMsg::Data(data))
                        .encode(rfmt, &mut rand::rngs::StdRng::seed_from_u64(0))
                        .unwrap();
                let data_msg = chanmsg::Relay::from(body);

                send.send(ClientCircChanMsg::Relay(data_msg)).await.unwrap();
                send
            };

            let (_circ, _send) = futures::join!(simulate_service, simulate_client);
        });
    }

    #[traced_test]
    #[test]
    #[cfg(feature = "hs-service")]
    fn accept_stream_after_reject() {
        use tor_cell::relaycell::msg::BeginFlags;
        use tor_cell::relaycell::msg::EndReason;

        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            const TEST_DATA: &[u8] = b"ping";
            const STREAM_COUNT: usize = 2;
            let rfmt = RelayCellFormat::V0;

            let (chan, _rx, _sink) = working_fake_channel(&rt);
            let (circ, mut send) = newcirc(&rt, chan).await;

            // A helper channel for coordinating the "client"/"service" interaction
            let (mut tx, mut rx) = mpsc::channel(STREAM_COUNT);

            let mut incoming = circ
                .allow_stream_requests(
                    &[tor_cell::relaycell::RelayCmd::BEGIN],
                    circ.last_hop_num().unwrap(),
                    AllowAllStreamsFilter,
                )
                .await
                .unwrap();

            let simulate_service = async move {
                // Process 2 incoming streams
                for i in 0..STREAM_COUNT {
                    let stream = incoming.next().await.unwrap();

                    // Reject the first one
                    if i == 0 {
                        stream
                            .reject(relaymsg::End::new_with_reason(EndReason::INTERNAL))
                            .await
                            .unwrap();
                        // Notify the client
                        tx.send(()).await.unwrap();
                        continue;
                    }

                    let mut data_stream = stream
                        .accept_data(relaymsg::Connected::new_empty())
                        .await
                        .unwrap();
                    // Notify the client task we're ready to accept DATA cells
                    tx.send(()).await.unwrap();

                    // Read the data the client sent us
                    let mut buf = [0_u8; TEST_DATA.len()];
                    data_stream.read_exact(&mut buf).await.unwrap();
                    assert_eq!(&buf, TEST_DATA);
                }

                circ
            };

            let simulate_client = async move {
                let begin = Begin::new("localhost", 80, BeginFlags::IPV6_OKAY).unwrap();
                let body: BoxedCellBody =
                    AnyRelayMsgOuter::new(StreamId::new(12), AnyRelayMsg::Begin(begin))
                        .encode(rfmt, &mut rand::rngs::StdRng::seed_from_u64(0))
                        .unwrap();
                let begin_msg = chanmsg::Relay::from(body);

                // Pretend to be a client at the other end of the circuit sending 2 identical begin
                // cells (the first one will be rejected by the test service).
                for _ in 0..STREAM_COUNT {
                    send.send(ClientCircChanMsg::Relay(begin_msg.clone()))
                        .await
                        .unwrap();

                    // Wait until the service rejects our request
                    rx.next().await.unwrap();
                }

                // Now send some data along the newly established circuit..
                let data = relaymsg::Data::new(TEST_DATA).unwrap();
                let body: BoxedCellBody =
                    AnyRelayMsgOuter::new(StreamId::new(12), AnyRelayMsg::Data(data))
                        .encode(rfmt, &mut rand::rngs::StdRng::seed_from_u64(0))
                        .unwrap();
                let data_msg = chanmsg::Relay::from(body);

                send.send(ClientCircChanMsg::Relay(data_msg)).await.unwrap();
                send
            };

            let (_circ, _send) = futures::join!(simulate_service, simulate_client);
        });
    }

    #[traced_test]
    #[test]
    #[cfg(feature = "hs-service")]
    fn incoming_stream_bad_hop() {
        use tor_cell::relaycell::msg::BeginFlags;

        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            /// Expect the originator of the BEGIN cell to be hop 1.
            const EXPECTED_HOP: u8 = 1;
            let rfmt = RelayCellFormat::V0;

            let (chan, _rx, _sink) = working_fake_channel(&rt);
            let (circ, mut send) = newcirc(&rt, chan).await;

            // Expect to receive incoming streams from hop EXPECTED_HOP
            let mut incoming = circ
                .allow_stream_requests(
                    &[tor_cell::relaycell::RelayCmd::BEGIN],
                    EXPECTED_HOP.into(),
                    AllowAllStreamsFilter,
                )
                .await
                .unwrap();

            let simulate_service = async move {
                // The originator of the cell is actually the last hop on the circuit, not hop 1,
                // so we expect the reactor to shut down.
                assert!(incoming.next().await.is_none());
                circ
            };

            let simulate_client = async move {
                let begin = Begin::new("localhost", 80, BeginFlags::IPV6_OKAY).unwrap();
                let body: BoxedCellBody =
                    AnyRelayMsgOuter::new(StreamId::new(12), AnyRelayMsg::Begin(begin))
                        .encode(rfmt, &mut rand::rngs::StdRng::seed_from_u64(0))
                        .unwrap();
                let begin_msg = chanmsg::Relay::from(body);

                // Pretend to be a client at the other end of the circuit sending a begin cell
                send.send(ClientCircChanMsg::Relay(begin_msg))
                    .await
                    .unwrap();

                send
            };

            let (_circ, _send) = futures::join!(simulate_service, simulate_client);
        });
    }
}
