//! Code related to tracking what activities a circuit can be used for.

use rand::Rng;
use std::fmt::{self, Display};
use std::sync::Arc;
use std::time::SystemTime;
use tracing::trace;
#[cfg(not(feature = "geoip"))]
use void::Void;

use crate::path::{dirpath::DirPathBuilder, exitpath::ExitPathBuilder, TorPath};
use tor_chanmgr::ChannelUsage;
#[cfg(feature = "geoip")]
use tor_error::internal;
use tor_guardmgr::{GuardMgr, GuardMonitor, GuardUsable};
use tor_netdir::Relay;
use tor_netdoc::types::policy::PortPolicy;
use tor_rtcompat::Runtime;
#[cfg(feature = "hs-common")]
use {crate::path::hspath::HsPathBuilder, crate::HsCircStemKind};

#[cfg(feature = "specific-relay")]
use tor_linkspec::{HasChanMethod, HasRelayIds};

#[cfg(feature = "geoip")]
use tor_geoip::CountryCode;
/// A non-existent country code type, used as a placeholder for the real `tor_geoip::CountryCode`
/// when the `geoip` crate feature is not present.
///
/// This type exists to simplify conditional compilation: without it, we'd have to duplicate a lot
/// of match patterns and things would suck a lot.
// TODO GEOIP: propagate this refactor down through the stack (i.e. all the way down to the
//            `tor-geoip` crate)
//             We can also get rid of a lot of #[cfg] then.
#[cfg(not(feature = "geoip"))]
pub(crate) type CountryCode = Void;

#[cfg(any(feature = "specific-relay", feature = "hs-common"))]
use tor_linkspec::OwnedChanTarget;

#[cfg(all(feature = "vanguards", feature = "hs-common"))]
use tor_guardmgr::vanguards::VanguardMgr;

use crate::isolation::{IsolationHelper, StreamIsolation};
use crate::mgr::{AbstractCirc, OpenEntry, RestrictionFailed};
use crate::Result;

pub use tor_relay_selection::TargetPort;

/// An exit policy, as supported by the last hop of a circuit.
#[derive(Clone, Debug, PartialEq, Eq)]
pub(crate) struct ExitPolicy {
    /// Permitted IPv4 ports.
    v4: Arc<PortPolicy>,
    /// Permitted IPv6 ports.
    v6: Arc<PortPolicy>,
}

/// Set of requested target ports, mostly for use in error reporting
///
/// Displays nicely.
#[derive(Debug, Clone, Default)]
pub struct TargetPorts(Vec<TargetPort>);

impl From<&'_ [TargetPort]> for TargetPorts {
    fn from(ports: &'_ [TargetPort]) -> Self {
        TargetPorts(ports.into())
    }
}

impl Display for TargetPorts {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let brackets = self.0.len() != 1;
        if brackets {
            write!(f, "[")?;
        }
        for (i, port) in self.0.iter().enumerate() {
            if i > 0 {
                write!(f, ",")?;
            }
            write!(f, "{}", port)?;
        }
        if brackets {
            write!(f, "]")?;
        }
        Ok(())
    }
}

impl ExitPolicy {
    /// Make a new exit policy from a given Relay.
    pub(crate) fn from_relay(relay: &Relay<'_>) -> Self {
        // TODO #504: it might be a good idea to lower this whole type into
        // tor-netdir or tor-relay-selection.  That way we wouldn't need to
        // invoke these Relay-specific methods in tor-circmgr.
        Self {
            v4: relay.low_level_details().ipv4_policy(),
            v6: relay.low_level_details().ipv6_policy(),
        }
    }

    /// Make a exit policy based on the allowed ports in TargetPorts.
    #[cfg(test)]
    pub(crate) fn from_target_ports(target_ports: &TargetPorts) -> Self {
        let (v6_ports, v4_ports) = target_ports
            .0
            .iter()
            .partition::<Vec<TargetPort>, _>(|port| port.ipv6);

        Self {
            v4: PortPolicy::from_allowed_port_list(v4_ports.iter().map(|port| port.port).collect())
                .intern(),
            v6: PortPolicy::from_allowed_port_list(v6_ports.iter().map(|port| port.port).collect())
                .intern(),
        }
    }

    /// Return true if a given port is contained in this ExitPolicy.
    fn allows_port(&self, p: TargetPort) -> bool {
        let policy = if p.ipv6 { &self.v6 } else { &self.v4 };
        policy.allows_port(p.port)
    }

    /// Returns true if this policy allows any ports at all.
    fn allows_some_port(&self) -> bool {
        self.v4.allows_some_port() || self.v6.allows_some_port()
    }
}

/// The purpose for which a circuit is being created.
///
/// This type should stay internal to the circmgr crate for now: we'll probably
/// want to refactor it a lot.
#[derive(Clone, Debug)]
pub(crate) enum TargetCircUsage {
    /// Use for BEGINDIR-based non-anonymous directory connections
    Dir,
    /// Use to exit to one or more ports.
    Exit {
        /// List of ports the circuit has to allow.
        ///
        /// If this list of ports is empty, then the circuit doesn't need
        /// to support any particular port, but it still needs to be an exit.
        ports: Vec<TargetPort>,
        /// Isolation group the circuit shall be part of
        isolation: StreamIsolation,
        /// Restrict the circuit to only exits in the provided country code.
        country_code: Option<CountryCode>,
        /// If true, all relays on this circuit need to have the Stable flag.
        //
        // TODO #504: It would be good to remove this field, if we can.
        require_stability: bool,
    },
    /// For a circuit is only used for the purpose of building it.
    TimeoutTesting,
    /// For internal usage only: build a circuit preemptively, to reduce wait times.
    ///
    /// # Warning
    ///
    /// This **MUST NOT** be used by code outside of the preemptive circuit predictor. In
    /// particular, this usage doesn't support stream isolation, so using it to ask for
    /// circuits (for example, by passing it to `get_or_launch`) could be unsafe!
    Preemptive {
        /// A port the circuit has to allow, if specified.
        ///
        /// If this is `None`, we just want a circuit capable of doing DNS resolution.
        port: Option<TargetPort>,
        /// The number of exit circuits needed for a port
        circs: usize,
        /// If true, all relays on this circuit need to have the Stable flag.
        // TODO #504: It would be good to remove this field, if we can.
        require_stability: bool,
    },
    /// Use for BEGINDIR-based non-anonymous directory connections to a particular target,
    /// and therefore to a specific relay (which need not be in any netdir).
    #[cfg(feature = "specific-relay")]
    DirSpecificTarget(OwnedChanTarget),

    /// Used to build a circuit (currently always 3 hops) to serve as the basis of some
    /// onion-serivice-related operation.
    #[cfg(feature = "hs-common")]
    HsCircBase {
        /// A target to avoid when constructing this circuit.
        ///
        /// This target is not appended to the end of the circuit; rather, the
        /// circuit is built so that its relays are all allowed to share a
        /// circuit with this target (without, for example, violating any
        /// family restrictions).
        compatible_with_target: Option<OwnedChanTarget>,
        /// The kind of circuit stem to build.
        kind: HsCircStemKind,
    },
}

/// The purposes for which a circuit is usable.
///
/// This type should stay internal to the circmgr crate for now: we'll probably
/// want to refactor it a lot.
#[derive(Clone, Debug)]
pub(crate) enum SupportedCircUsage {
    /// Usable for BEGINDIR-based non-anonymous directory connections
    Dir,
    /// Usable to exit to a set of ports.
    Exit {
        /// Exit policy of the circuit
        policy: ExitPolicy,
        /// Isolation group the circuit is part of. None when the circuit is not yet assigned to an
        /// isolation group.
        isolation: Option<StreamIsolation>,
        /// Country code the exit is in, or `None` if no country could be determined.
        country_code: Option<CountryCode>,
        /// Whether every relay in this circuit has the "Stable" flag.
        //
        // TODO #504: It would be good to remove this field, if we can.
        all_relays_stable: bool,
    },
    /// This circuit is not suitable for any usage.
    NoUsage,
    /// This circuit is for some hs-related usage.
    /// (It should never be given to the circuit manager; the
    /// `HsPool` code will handle it instead.)
    #[cfg(feature = "hs-common")]
    HsOnly,
    /// Use only for BEGINDIR-based non-anonymous directory connections
    /// to a particular target (which may not be in the netdir).
    #[cfg(feature = "specific-relay")]
    DirSpecificTarget(OwnedChanTarget),
}

impl TargetCircUsage {
    /// Construct path for a given circuit purpose; return it and the
    /// usage that it _actually_ supports.
    pub(crate) fn build_path<'a, R: Rng, RT: Runtime>(
        &self,
        rng: &mut R,
        netdir: crate::DirInfo<'a>,
        guards: &GuardMgr<RT>,
        #[cfg(all(feature = "vanguards", feature = "hs-common"))] vanguards: &VanguardMgr<RT>,
        config: &crate::PathConfig,
        now: SystemTime,
    ) -> Result<(
        TorPath<'a>,
        SupportedCircUsage,
        Option<GuardMonitor>,
        Option<GuardUsable>,
    )> {
        match self {
            TargetCircUsage::Dir => {
                let (path, mon, usable) = DirPathBuilder::new().pick_path(guards)?;
                Ok((path, SupportedCircUsage::Dir, Some(mon), Some(usable)))
            }
            TargetCircUsage::Preemptive {
                port,
                require_stability,
                ..
            } => {
                // FIXME(eta): this is copypasta from `TargetCircUsage::Exit`.
                let (path, mon, usable) = ExitPathBuilder::from_target_ports(port.iter().copied())
                    .require_stability(*require_stability)
                    .pick_path(rng, netdir, guards, config, now)?;
                let policy = path
                    .exit_policy()
                    .expect("ExitPathBuilder gave us a one-hop circuit?");
                #[cfg(feature = "geoip")]
                let country_code = path.country_code();
                #[cfg(not(feature = "geoip"))]
                let country_code = None;
                let all_relays_stable = path.appears_stable();
                Ok((
                    path,
                    SupportedCircUsage::Exit {
                        policy,
                        isolation: None,
                        country_code,
                        all_relays_stable,
                    },
                    Some(mon),
                    Some(usable),
                ))
            }
            TargetCircUsage::Exit {
                ports: p,
                isolation,
                country_code,
                require_stability,
            } => {
                #[cfg(feature = "geoip")]
                let mut builder = if let Some(cc) = country_code {
                    ExitPathBuilder::in_given_country(*cc, p.clone())
                } else {
                    ExitPathBuilder::from_target_ports(p.clone())
                };
                #[cfg(not(feature = "geoip"))]
                let mut builder = ExitPathBuilder::from_target_ports(p.clone());

                builder.require_stability(*require_stability);

                let (path, mon, usable) = builder.pick_path(rng, netdir, guards, config, now)?;
                let policy = path
                    .exit_policy()
                    .expect("ExitPathBuilder gave us a one-hop circuit?");

                #[cfg(feature = "geoip")]
                let resulting_cc = path.country_code();
                #[cfg(feature = "geoip")]
                if resulting_cc != *country_code {
                    internal!(
                        "asked for a country code of {:?}, got {:?}",
                        country_code,
                        resulting_cc
                    );
                }
                let all_relays_stable = path.appears_stable();

                #[cfg(not(feature = "geoip"))]
                let resulting_cc = *country_code; // avoid unused var warning
                Ok((
                    path,
                    SupportedCircUsage::Exit {
                        policy,
                        isolation: Some(isolation.clone()),
                        country_code: resulting_cc,
                        all_relays_stable,
                    },
                    Some(mon),
                    Some(usable),
                ))
            }
            TargetCircUsage::TimeoutTesting => {
                let (path, mon, usable) = ExitPathBuilder::for_timeout_testing()
                    .require_stability(false)
                    .pick_path(rng, netdir, guards, config, now)?;
                let policy = path.exit_policy();
                #[cfg(feature = "geoip")]
                let country_code = path.country_code();
                #[cfg(not(feature = "geoip"))]
                let country_code = None;
                let usage = match policy {
                    Some(policy) if policy.allows_some_port() => SupportedCircUsage::Exit {
                        policy,
                        isolation: None,
                        country_code,
                        all_relays_stable: path.appears_stable(),
                    },
                    _ => SupportedCircUsage::NoUsage,
                };

                Ok((path, usage, Some(mon), Some(usable)))
            }
            #[cfg(feature = "specific-relay")]
            TargetCircUsage::DirSpecificTarget(target) => {
                let path = TorPath::new_one_hop_owned(target);
                let usage = SupportedCircUsage::DirSpecificTarget(target.clone());
                Ok((path, usage, None, None))
            }
            #[cfg(feature = "hs-common")]
            TargetCircUsage::HsCircBase {
                compatible_with_target,
                kind,
            } => {
                let path_builder = HsPathBuilder::new(compatible_with_target.clone(), *kind);
                cfg_if::cfg_if! {
                    if #[cfg(all(feature = "vanguards", feature = "hs-common"))] {
                        let (path, mon, usable) = path_builder
                            .pick_path_with_vanguards::<_, RT>(rng, netdir, guards, vanguards, config, now)?;
                    } else {
                        let (path, mon, usable) = path_builder
                            .pick_path::<_, RT>(rng, netdir, guards, config, now)?;
                    }
                };
                let usage = SupportedCircUsage::HsOnly;
                Ok((path, usage, Some(mon), Some(usable)))
            }
        }
    }

    /// Create a TargetCircUsage::Exit for a given set of IPv4 ports, with no stream isolation, for
    /// use in tests.
    #[cfg(test)]
    pub(crate) fn new_from_ipv4_ports(ports: &[u16]) -> Self {
        TargetCircUsage::Exit {
            ports: ports.iter().map(|p| TargetPort::ipv4(*p)).collect(),
            isolation: StreamIsolation::no_isolation(),
            country_code: None,
            require_stability: false,
        }
    }
}

/// Return true if `a` and `b` count as the same target for the purpose of
/// comparing `DirSpecificTarget` values.
#[cfg(feature = "specific-relay")]
fn owned_targets_equivalent(a: &OwnedChanTarget, b: &OwnedChanTarget) -> bool {
    // We ignore `addresses` here, since they can be different if one of our
    // arguments comes from only a bridge line, and the other comes from a
    // bridge line and a descriptor.
    a.same_relay_ids(b) && a.chan_method() == b.chan_method()
}

impl SupportedCircUsage {
    /// Return true if this spec permits the usage described by `other`.
    ///
    /// If this function returns `true`, then it is okay to use a circuit
    /// with this spec for the target usage described by `other`.
    pub(crate) fn supports(&self, target: &TargetCircUsage) -> bool {
        use SupportedCircUsage::*;
        match (self, target) {
            (Dir, TargetCircUsage::Dir) => true,
            (
                Exit {
                    policy: p1,
                    isolation: i1,
                    country_code: cc1,
                    all_relays_stable,
                },
                TargetCircUsage::Exit {
                    ports: p2,
                    isolation: i2,
                    country_code: cc2,
                    require_stability,
                },
            ) => {
                // TODO #504: These calculations don't touch Relays, but they
                // seem like they should be done using the types of tor-relay-selection.
                i1.as_ref()
                    .map(|i1| i1.compatible_same_type(i2))
                    .unwrap_or(true)
                    && (!require_stability || *all_relays_stable)
                    && p2.iter().all(|port| p1.allows_port(*port))
                    && (cc2.is_none() || cc1 == cc2)
            }
            (
                Exit {
                    policy,
                    isolation,
                    all_relays_stable,
                    ..
                },
                TargetCircUsage::Preemptive {
                    port,
                    require_stability,
                    ..
                },
            ) => {
                // TODO #504: It would be good to simply remove stability
                // calculation from tor-circmgr.
                if *require_stability && !all_relays_stable {
                    return false;
                }
                if isolation.is_some() {
                    // If the circuit has a stream isolation, we might not be able to use it
                    // for new streams that don't share it.
                    return false;
                }
                // TODO #504: Similarly, it would be good to have exit port
                // calculation done elsewhere.
                if let Some(p) = port {
                    policy.allows_port(*p)
                } else {
                    true
                }
            }
            (Exit { .. } | NoUsage, TargetCircUsage::TimeoutTesting) => true,
            #[cfg(feature = "specific-relay")]
            (DirSpecificTarget(a), TargetCircUsage::DirSpecificTarget(b)) => {
                owned_targets_equivalent(a, b)
            }
            (_, _) => false,
        }
    }

    /// Change the value of this spec based on the circuit having been used for `usage`.
    ///
    /// Returns an error and makes no changes to `self` if `usage` was not supported by this spec.
    ///
    /// If this function returns Ok, the resulting spec will be contained by the original spec, and
    /// will support `usage`.
    pub(crate) fn restrict_mut(
        &mut self,
        usage: &TargetCircUsage,
    ) -> std::result::Result<(), RestrictionFailed> {
        use SupportedCircUsage::*;
        match (self, usage) {
            (Dir, TargetCircUsage::Dir) => Ok(()),
            // This usage is only used to create circuits preemptively, and doesn't actually
            // correspond to any streams; accordingly, we don't need to modify the circuit's
            // acceptable usage at all.
            (Exit { .. }, TargetCircUsage::Preemptive { .. }) => Ok(()),
            (
                Exit {
                    isolation: ref mut isol1,
                    ..
                },
                TargetCircUsage::Exit { isolation: i2, .. },
            ) => {
                if let Some(i1) = isol1 {
                    if let Some(new_isolation) = i1.join_same_type(i2) {
                        // there was some isolation, and the requested usage is compatible, saving
                        // the new isolation into self
                        *isol1 = Some(new_isolation);
                        Ok(())
                    } else {
                        Err(RestrictionFailed::NotSupported)
                    }
                } else {
                    // there was no isolation yet on self, applying the restriction from usage
                    *isol1 = Some(i2.clone());
                    Ok(())
                }
            }
            (Exit { .. } | NoUsage, TargetCircUsage::TimeoutTesting) => Ok(()),
            #[cfg(feature = "specific-relay")]
            (DirSpecificTarget(a), TargetCircUsage::DirSpecificTarget(b))
                if owned_targets_equivalent(a, b) =>
            {
                Ok(())
            }
            (_, _) => Err(RestrictionFailed::NotSupported),
        }
    }

    /// Find all open circuits in `list` whose specifications permit `usage`.
    pub(crate) fn find_supported<'a, 'b, C: AbstractCirc>(
        list: impl Iterator<Item = &'b mut OpenEntry<C>>,
        usage: &TargetCircUsage,
    ) -> Vec<&'b mut OpenEntry<C>> {
        /// Returns all circuits in `list` for which `circuit.spec.supports(usage)` returns `true`.
        fn find_supported_internal<'a, 'b, C: AbstractCirc>(
            list: impl Iterator<Item = &'b mut OpenEntry<C>>,
            usage: &TargetCircUsage,
        ) -> Vec<&'b mut OpenEntry<C>> {
            list.filter(|circ| circ.supports(usage)).collect()
        }

        match usage {
            TargetCircUsage::Preemptive { circs, .. } => {
                let supported = find_supported_internal(list, usage);
                // We need to have at least two circuits that support `port` in order
                // to reuse them; otherwise, we must create a new circuit, so
                // that we get closer to having two circuits.
                trace!(
                    "preemptive usage {:?} matches {} active circuits",
                    usage,
                    supported.len()
                );
                if supported.len() >= *circs {
                    supported
                } else {
                    vec![]
                }
            }
            _ => find_supported_internal(list, usage),
        }
    }

    /// How the circuit will be used, for use by the channel
    pub(crate) fn channel_usage(&self) -> ChannelUsage {
        use ChannelUsage as CU;
        use SupportedCircUsage as SCU;
        match self {
            SCU::Dir => CU::Dir,
            #[cfg(feature = "specific-relay")]
            SCU::DirSpecificTarget(_) => CU::Dir,
            SCU::Exit { .. } => CU::UserTraffic,
            SCU::NoUsage => CU::UselessCircuit,
            #[cfg(feature = "hs-common")]
            SCU::HsOnly => CU::UserTraffic,
        }
    }
}

#[cfg(test)]
pub(crate) mod test {
    #![allow(clippy::unwrap_used)]
    use super::*;
    use crate::isolation::test::{assert_isoleq, IsolationTokenEq};
    use crate::isolation::{IsolationToken, StreamIsolationBuilder};
    use crate::path::OwnedPath;
    use tor_guardmgr::TestConfig;
    use tor_llcrypto::pk::ed25519::Ed25519Identity;
    use tor_netdir::testnet;
    use tor_persist::TestingStateMgr;

    impl IsolationTokenEq for TargetCircUsage {
        fn isol_eq(&self, other: &Self) -> bool {
            use TargetCircUsage::*;
            match (self, other) {
                (Dir, Dir) => true,
                (
                    Exit {
                        ports: p1,
                        isolation: is1,
                        country_code: cc1,
                        ..
                    },
                    Exit {
                        ports: p2,
                        isolation: is2,
                        country_code: cc2,
                        ..
                    },
                ) => p1 == p2 && cc1 == cc2 && is1.isol_eq(is2),
                (TimeoutTesting, TimeoutTesting) => true,
                (
                    Preemptive {
                        port: p1,
                        circs: c1,
                        ..
                    },
                    Preemptive {
                        port: p2,
                        circs: c2,
                        ..
                    },
                ) => p1 == p2 && c1 == c2,
                _ => false,
            }
        }
    }

    impl IsolationTokenEq for SupportedCircUsage {
        fn isol_eq(&self, other: &Self) -> bool {
            use SupportedCircUsage::*;
            match (self, other) {
                (Dir, Dir) => true,
                (
                    Exit {
                        policy: p1,
                        isolation: is1,
                        country_code: cc1,
                        ..
                    },
                    Exit {
                        policy: p2,
                        isolation: is2,
                        country_code: cc2,
                        ..
                    },
                ) => p1 == p2 && is1.isol_eq(is2) && cc1 == cc2,
                (NoUsage, NoUsage) => true,
                _ => false,
            }
        }
    }

    #[test]
    fn exit_policy() {
        use tor_netdir::testnet::construct_custom_netdir;
        use tor_netdoc::doc::netstatus::RelayFlags;

        let network = construct_custom_netdir(|idx, nb, _| {
            if (0x21..0x27).contains(&idx) {
                nb.rs.add_flags(RelayFlags::BAD_EXIT);
            }
        })
        .unwrap()
        .unwrap_if_sufficient()
        .unwrap();

        // Nodes with ID 0x0a through 0x13 and 0x1e through 0x27 are
        // exits.  Odd-numbered ones allow only ports 80 and 443;
        // even-numbered ones allow all ports.  Nodes with ID 0x21
        // through 0x27 are bad exits.
        let id_noexit: Ed25519Identity = [0x05; 32].into();
        let id_webexit: Ed25519Identity = [0x11; 32].into();
        let id_fullexit: Ed25519Identity = [0x20; 32].into();
        let id_badexit: Ed25519Identity = [0x25; 32].into();

        let not_exit = network.by_id(&id_noexit).unwrap();
        let web_exit = network.by_id(&id_webexit).unwrap();
        let full_exit = network.by_id(&id_fullexit).unwrap();
        let bad_exit = network.by_id(&id_badexit).unwrap();

        let ep_none = ExitPolicy::from_relay(&not_exit);
        let ep_web = ExitPolicy::from_relay(&web_exit);
        let ep_full = ExitPolicy::from_relay(&full_exit);
        let ep_bad = ExitPolicy::from_relay(&bad_exit);

        assert!(!ep_none.allows_port(TargetPort::ipv4(80)));
        assert!(!ep_none.allows_port(TargetPort::ipv4(9999)));

        assert!(ep_web.allows_port(TargetPort::ipv4(80)));
        assert!(ep_web.allows_port(TargetPort::ipv4(443)));
        assert!(!ep_web.allows_port(TargetPort::ipv4(9999)));

        assert!(ep_full.allows_port(TargetPort::ipv4(80)));
        assert!(ep_full.allows_port(TargetPort::ipv4(443)));
        assert!(ep_full.allows_port(TargetPort::ipv4(9999)));

        assert!(!ep_bad.allows_port(TargetPort::ipv4(80)));

        // Note that nobody in the testdir::network allows ipv6.
        assert!(!ep_none.allows_port(TargetPort::ipv6(80)));
        assert!(!ep_web.allows_port(TargetPort::ipv6(80)));
        assert!(!ep_full.allows_port(TargetPort::ipv6(80)));
        assert!(!ep_bad.allows_port(TargetPort::ipv6(80)));

        // Check is_supported_by while we're here.
        assert!(TargetPort::ipv4(80).is_supported_by(&web_exit.low_level_details()));
        assert!(!TargetPort::ipv6(80).is_supported_by(&web_exit.low_level_details()));
        assert!(!TargetPort::ipv6(80).is_supported_by(&bad_exit.low_level_details()));
    }

    #[test]
    fn usage_ops() {
        // Make an exit-policy object that allows web on IPv4 and
        // smtp on IPv6.
        let policy = ExitPolicy {
            v4: Arc::new("accept 80,443".parse().unwrap()),
            v6: Arc::new("accept 23".parse().unwrap()),
        };
        let tok1 = IsolationToken::new();
        let tok2 = IsolationToken::new();
        let isolation = StreamIsolationBuilder::new()
            .owner_token(tok1)
            .build()
            .unwrap();
        let isolation2 = StreamIsolationBuilder::new()
            .owner_token(tok2)
            .build()
            .unwrap();

        let supp_dir = SupportedCircUsage::Dir;
        let targ_dir = TargetCircUsage::Dir;
        let supp_exit = SupportedCircUsage::Exit {
            policy: policy.clone(),
            isolation: Some(isolation.clone()),
            country_code: None,
            all_relays_stable: true,
        };
        let supp_exit_iso2 = SupportedCircUsage::Exit {
            policy: policy.clone(),
            isolation: Some(isolation2.clone()),
            country_code: None,
            all_relays_stable: true,
        };
        let supp_exit_no_iso = SupportedCircUsage::Exit {
            policy,
            isolation: None,
            country_code: None,
            all_relays_stable: true,
        };
        let supp_none = SupportedCircUsage::NoUsage;

        let targ_80_v4 = TargetCircUsage::Exit {
            ports: vec![TargetPort::ipv4(80)],
            isolation: isolation.clone(),
            country_code: None,
            require_stability: false,
        };
        let targ_80_v4_iso2 = TargetCircUsage::Exit {
            ports: vec![TargetPort::ipv4(80)],
            isolation: isolation2,
            country_code: None,
            require_stability: false,
        };
        let targ_80_23_v4 = TargetCircUsage::Exit {
            ports: vec![TargetPort::ipv4(80), TargetPort::ipv4(23)],
            isolation: isolation.clone(),
            country_code: None,
            require_stability: false,
        };

        let targ_80_23_mixed = TargetCircUsage::Exit {
            ports: vec![TargetPort::ipv4(80), TargetPort::ipv6(23)],
            isolation: isolation.clone(),
            country_code: None,
            require_stability: false,
        };
        let targ_999_v6 = TargetCircUsage::Exit {
            ports: vec![TargetPort::ipv6(999)],
            isolation,
            country_code: None,
            require_stability: false,
        };
        let targ_testing = TargetCircUsage::TimeoutTesting;

        assert!(supp_dir.supports(&targ_dir));
        assert!(!supp_dir.supports(&targ_80_v4));
        assert!(!supp_exit.supports(&targ_dir));
        assert!(supp_exit.supports(&targ_80_v4));
        assert!(!supp_exit.supports(&targ_80_v4_iso2));
        assert!(supp_exit.supports(&targ_80_23_mixed));
        assert!(!supp_exit.supports(&targ_80_23_v4));
        assert!(!supp_exit.supports(&targ_999_v6));
        assert!(!supp_exit_iso2.supports(&targ_80_v4));
        assert!(supp_exit_iso2.supports(&targ_80_v4_iso2));
        assert!(supp_exit_no_iso.supports(&targ_80_v4));
        assert!(supp_exit_no_iso.supports(&targ_80_v4_iso2));
        assert!(!supp_exit_no_iso.supports(&targ_80_23_v4));
        assert!(!supp_none.supports(&targ_dir));
        assert!(!supp_none.supports(&targ_80_23_v4));
        assert!(!supp_none.supports(&targ_80_v4_iso2));
        assert!(!supp_dir.supports(&targ_testing));
        assert!(supp_exit.supports(&targ_testing));
        assert!(supp_exit_no_iso.supports(&targ_testing));
        assert!(supp_exit_iso2.supports(&targ_testing));
        assert!(supp_none.supports(&targ_testing));
    }

    #[test]
    fn restrict_mut() {
        let policy = ExitPolicy {
            v4: Arc::new("accept 80,443".parse().unwrap()),
            v6: Arc::new("accept 23".parse().unwrap()),
        };

        let tok1 = IsolationToken::new();
        let tok2 = IsolationToken::new();
        let isolation = StreamIsolationBuilder::new()
            .owner_token(tok1)
            .build()
            .unwrap();
        let isolation2 = StreamIsolationBuilder::new()
            .owner_token(tok2)
            .build()
            .unwrap();

        let supp_dir = SupportedCircUsage::Dir;
        let targ_dir = TargetCircUsage::Dir;
        let supp_exit = SupportedCircUsage::Exit {
            policy: policy.clone(),
            isolation: Some(isolation.clone()),
            country_code: None,
            all_relays_stable: true,
        };
        let supp_exit_iso2 = SupportedCircUsage::Exit {
            policy: policy.clone(),
            isolation: Some(isolation2.clone()),
            country_code: None,
            all_relays_stable: true,
        };
        let supp_exit_no_iso = SupportedCircUsage::Exit {
            policy,
            isolation: None,
            country_code: None,
            all_relays_stable: true,
        };
        let supp_none = SupportedCircUsage::NoUsage;
        let targ_exit = TargetCircUsage::Exit {
            ports: vec![TargetPort::ipv4(80)],
            isolation,
            country_code: None,
            require_stability: false,
        };
        let targ_exit_iso2 = TargetCircUsage::Exit {
            ports: vec![TargetPort::ipv4(80)],
            isolation: isolation2,
            country_code: None,
            require_stability: false,
        };
        let targ_testing = TargetCircUsage::TimeoutTesting;

        // not allowed, do nothing
        let mut supp_dir_c = supp_dir.clone();
        assert!(supp_dir_c.restrict_mut(&targ_exit).is_err());
        assert!(supp_dir_c.restrict_mut(&targ_testing).is_err());
        assert_isoleq!(supp_dir, supp_dir_c);

        let mut supp_exit_c = supp_exit.clone();
        assert!(supp_exit_c.restrict_mut(&targ_dir).is_err());
        assert_isoleq!(supp_exit, supp_exit_c);

        let mut supp_exit_c = supp_exit.clone();
        assert!(supp_exit_c.restrict_mut(&targ_exit_iso2).is_err());
        assert_isoleq!(supp_exit, supp_exit_c);

        let mut supp_exit_iso2_c = supp_exit_iso2.clone();
        assert!(supp_exit_iso2_c.restrict_mut(&targ_exit).is_err());
        assert_isoleq!(supp_exit_iso2, supp_exit_iso2_c);

        let mut supp_none_c = supp_none.clone();
        assert!(supp_none_c.restrict_mut(&targ_exit).is_err());
        assert!(supp_none_c.restrict_mut(&targ_dir).is_err());
        assert_isoleq!(supp_none_c, supp_none);

        // allowed but nothing to do
        let mut supp_dir_c = supp_dir.clone();
        supp_dir_c.restrict_mut(&targ_dir).unwrap();
        assert_isoleq!(supp_dir, supp_dir_c);

        let mut supp_exit_c = supp_exit.clone();
        supp_exit_c.restrict_mut(&targ_exit).unwrap();
        assert_isoleq!(supp_exit, supp_exit_c);

        let mut supp_exit_iso2_c = supp_exit_iso2.clone();
        supp_exit_iso2_c.restrict_mut(&targ_exit_iso2).unwrap();
        supp_none_c.restrict_mut(&targ_testing).unwrap();
        assert_isoleq!(supp_exit_iso2, supp_exit_iso2_c);

        let mut supp_none_c = supp_none.clone();
        supp_none_c.restrict_mut(&targ_testing).unwrap();
        assert_isoleq!(supp_none_c, supp_none);

        // allowed, do something
        let mut supp_exit_no_iso_c = supp_exit_no_iso.clone();
        supp_exit_no_iso_c.restrict_mut(&targ_exit).unwrap();
        assert!(supp_exit_no_iso_c.supports(&targ_exit));
        assert!(!supp_exit_no_iso_c.supports(&targ_exit_iso2));

        let mut supp_exit_no_iso_c = supp_exit_no_iso;
        supp_exit_no_iso_c.restrict_mut(&targ_exit_iso2).unwrap();
        assert!(!supp_exit_no_iso_c.supports(&targ_exit));
        assert!(supp_exit_no_iso_c.supports(&targ_exit_iso2));
    }

    #[test]
    fn buildpath() {
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let mut rng = rand::rngs::StdRng::seed_from_u64(0);
            let netdir = testnet::construct_netdir().unwrap_if_sufficient().unwrap();
            let di = (&netdir).into();
            let config = crate::PathConfig::default();
            let statemgr = TestingStateMgr::new();
            let guards =
                tor_guardmgr::GuardMgr::new(rt.clone(), statemgr.clone(), &TestConfig::default())
                    .unwrap();
            guards.install_test_netdir(&netdir);
            let now = SystemTime::now();

            // Only doing basic tests for now.  We'll test the path
            // building code a lot more closely in the tests for TorPath
            // and friends.

            #[cfg(all(feature = "vanguards", feature = "hs-common"))]
            let vanguards =
                VanguardMgr::new(&Default::default(), rt.clone(), statemgr, false).unwrap();

            // First, a one-hop directory circuit
            let (p_dir, u_dir, _, _) = TargetCircUsage::Dir
                .build_path(
                    &mut rng,
                    di,
                    &guards,
                    #[cfg(all(feature = "vanguards", feature = "hs-common"))]
                    &vanguards,
                    &config,
                    now,
                )
                .unwrap();
            assert!(matches!(u_dir, SupportedCircUsage::Dir));
            assert_eq!(p_dir.len(), 1);

            // Now an exit circuit, to port 995.
            let tok1 = IsolationToken::new();
            let isolation = StreamIsolationBuilder::new()
                .owner_token(tok1)
                .build()
                .unwrap();

            let exit_usage = TargetCircUsage::Exit {
                ports: vec![TargetPort::ipv4(995)],
                isolation: isolation.clone(),
                country_code: None,
                require_stability: false,
            };
            let (p_exit, u_exit, _, _) = exit_usage
                .build_path(
                    &mut rng,
                    di,
                    &guards,
                    #[cfg(all(feature = "vanguards", feature = "hs-common"))]
                    &vanguards,
                    &config,
                    now,
                )
                .unwrap();
            assert!(matches!(
                u_exit,
                SupportedCircUsage::Exit {
                    isolation: ref iso,
                    ..
                } if iso.isol_eq(&Some(isolation))
            ));
            assert!(u_exit.supports(&exit_usage));
            assert_eq!(p_exit.len(), 3);

            // Now try testing circuits.
            let (path, usage, _, _) = TargetCircUsage::TimeoutTesting
                .build_path(
                    &mut rng,
                    di,
                    &guards,
                    #[cfg(all(feature = "vanguards", feature = "hs-common"))]
                    &vanguards,
                    &config,
                    now,
                )
                .unwrap();
            let path = match OwnedPath::try_from(&path).unwrap() {
                OwnedPath::ChannelOnly(_) => panic!("Impossible path type."),
                OwnedPath::Normal(p) => p,
            };
            assert_eq!(path.len(), 3);

            // Make sure that the usage is correct.
            let last_relay = netdir.by_ids(&path[2]).unwrap();
            let policy = ExitPolicy::from_relay(&last_relay);
            // We'll always get exits for these, since we try to build
            // paths with an exit if there are any exits.
            assert!(policy.allows_some_port());
            assert!(last_relay.low_level_details().policies_allow_some_port());
            assert_isoleq!(
                usage,
                SupportedCircUsage::Exit {
                    policy,
                    isolation: None,
                    country_code: None,
                    all_relays_stable: true
                }
            );
        });
    }

    #[test]
    fn build_testing_noexit() {
        // Here we'll try to build paths for testing circuits on a network
        // with no exits.
        tor_rtcompat::test_with_all_runtimes!(|rt| async move {
            let mut rng = rand::rngs::StdRng::seed_from_u64(0);
            let netdir = testnet::construct_custom_netdir(|_idx, bld, _| {
                bld.md.parse_ipv4_policy("reject 1-65535").unwrap();
            })
            .unwrap()
            .unwrap_if_sufficient()
            .unwrap();
            let di = (&netdir).into();
            let config = crate::PathConfig::default();
            let statemgr = TestingStateMgr::new();
            let guards =
                tor_guardmgr::GuardMgr::new(rt.clone(), statemgr.clone(), &TestConfig::default())
                    .unwrap();
            guards.install_test_netdir(&netdir);
            let now = SystemTime::now();

            #[cfg(all(feature = "vanguards", feature = "hs-common"))]
            let vanguards =
                VanguardMgr::new(&Default::default(), rt.clone(), statemgr, false).unwrap();

            let (path, usage, _, _) = TargetCircUsage::TimeoutTesting
                .build_path(
                    &mut rng,
                    di,
                    &guards,
                    #[cfg(all(feature = "vanguards", feature = "hs-common"))]
                    &vanguards,
                    &config,
                    now,
                )
                .unwrap();
            assert_eq!(path.len(), 3);
            assert_isoleq!(usage, SupportedCircUsage::NoUsage);
        });
    }

    #[test]
    fn display_target_ports() {
        let ports = [];
        assert_eq!(TargetPorts::from(&ports[..]).to_string(), "[]");

        let ports = [TargetPort::ipv4(80)];
        assert_eq!(TargetPorts::from(&ports[..]).to_string(), "80v4");
        let ports = [TargetPort::ipv4(80), TargetPort::ipv6(443)];
        assert_eq!(TargetPorts::from(&ports[..]).to_string(), "[80v4,443v6]");
    }
}
