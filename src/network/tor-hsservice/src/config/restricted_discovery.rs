//! Configuration for hidden service restricted discovery mode.
//!
//! By default, hidden services are accessible by anyone that knows their `.onion` address,
//! this exposure making them vulnerable to DoS attacks.
//! For added DoS resistance, services can hide their discovery information
//! (the list of introduction points, recognized handshake types, etc.)
//! from unauthorized clients by enabling restricted discovery mode.
//!
//! Services running in this mode are only discoverable
//! by the clients configured in the [`RestrictedDiscoveryConfig`].
//! Everyone else will be unable to reach the service,
//! as the discovery information from the service's descriptor
//! is encrypted with the keys of the authorized clients.
//!
//! Each authorized client must generate a service discovery keypair ([KS_hsc_desc_enc])
//! and share the public part of the keypair with the service.
//! The service can then authorize the client by adding its public key
//! to the `static_keys` list, or as an entry in one of the `key_dirs` specified
//! in its [`RestrictedDiscoveryConfig`].
//!
//! Restricted discovery mode is only suitable for services that have a known set
//! of no more than [`MAX_RESTRICTED_DISCOVERY_CLIENTS`] users.
//! Hidden services that do not have a fixed, well-defined set of users,
//! or that have more than [`MAX_RESTRICTED_DISCOVERY_CLIENTS`] users,
//! should use other DoS resistance measures instead.
//!
//! # Live reloading
//!
//! The restricted discovery configuration is automatically reloaded
//! if `watch_configuration` is `true`.
//!
//! This means that any changes to `static_keys` or to the `.auth` files
//! from the configured `key_dirs` will be automatically detected,
//! so you don't need to restart your service in order for them to take effect.
//!
//! ## Best practices
//!
//! Each change you make to the authorized clients can result in a new descriptor
//! being published. If you make multiple changes to your restricted discovery configuration
//! (or to the other parts of the onion service configuration
//! that trigger the publishing of a new descriptor, such as `anonymity`),
//! those changes may not take effect immediately due to the descriptor publishing rate limiting.
//!
//! To avoid generating unnecessary traffic, you should try to batch
//! your changes as much as possible, or, alternatively, disable `watch_configuration`
//! until you are satisfied with your configured authorized clients.
//!
//! ## Caveats
//!
//! ### Unauthorizing previously authorized clients
//!
//! Removing a previously authorized client from `static_keys` or `key_dirs`
//! does **not** guarantee its access will be revoked.
//! This is because the client might still be able to reach your service via
//! its current introduction points (the introduction points are not rotated
//! when the authorized clients change). Moreover, even if the introduction points
//! are rotated by chance, your changes are not guaranteed to take effect immediately,
//! so it is possible for the service to publish its new introduction points
//! in a descriptor that is readable by the recently unauthorized client.
//!
//! **Restricted discovery mode is a DoS resistance mechanism,
//! _not_ a substitute for conventional access control.**
//!
//! ### Moving `key_dir`s
//!
//! If you move a `key_dir` (i.e. rename it), all of the authorized clients contained
//! within it are removed (the descriptor is rebuilt and republished,
//! without being encrypted for those clients).
//! Any further changes to the moved directory will be ignored,
//! unless the directory is moved back or a `key_dir` entry for its new location is added.
//!
//! Moving the directory back to its original location (configured in `key_dirs`),
//! will cause those clients to be added back and a new descriptor to be generated.
//!
//! # Key providers
//!
//! The [`RestrictedDiscoveryConfig`] supports two key providers:
//!   * [`StaticKeyProvider`], where keys are specified as a static mapping from nicknames to keys
//!   * [`DirectoryKeyProvider`], which represents a directory of client keys.
//!
//! # Limitations
//!
//! Hidden service descriptors are not allowed to exceed
//! the maximum size specified in the [`HSV3MaxDescriptorSize`] consensus parameter,
//! so there is an implicit upper limit for the number of clients you can authorize
//! (the `encrypted` section of the descriptor is encrypted
//! for each authorized client, so the more clients there are, the larger the descriptor will be).
//! While we recommend configuring no more than [`MAX_RESTRICTED_DISCOVERY_CLIENTS`] clients,
//! the *actual* limit for your service depends on the rest of its configuration
//! (such as the number of introduction points).
//!
//! [KS_hsc_desc_enc]: https://spec.torproject.org/rend-spec/protocol-overview.html#CLIENT-AUTH
//! [`HSV3MaxDescriptorSize`]: https://spec.torproject.org/param-spec.html?highlight=maximum%20descriptor#onion-service

mod key_provider;

pub use key_provider::{
    DirectoryKeyProvider, DirectoryKeyProviderBuilder, DirectoryKeyProviderList,
    DirectoryKeyProviderListBuilder, StaticKeyProvider, StaticKeyProviderBuilder,
};

use crate::internal_prelude::*;

use std::collections::btree_map::Entry;
use std::collections::BTreeMap;

use amplify::Getters;
use derive_more::{Display, Into};

use tor_config_path::CfgPathResolver;
use tor_error::warn_report;
use tor_persist::slug::BadSlug;

/// The recommended maximum number of restricted mode clients.
///
/// See the [module-level documentation](self) for an explanation of this limitation.
///
/// Note: this is an approximate, one-size-fits-all figure.
/// In practice, the maximum number of clients depends on the rest of the service's configuration,
/// and may in fact be higher, or lower, than this value.
//
// TODO: we should come up with a more accurate upper limit. The actual limit might be even lower,
// depending on the service's configuration (i.e. number of intro points).
//
// This figure is an approximation. It was obtained by filling a descriptor
// with as much information as possible. The descriptor was built with
//   * `single-onion-service` set
//   * 20 intro points (which is the current upper limit), where each intro point had a
//   single link specifier (I'm not sure if there's a limit for the number of link specifiers)
//   * 165 authorized clients
// and had a size of 42157 bytes. Adding one more client tipped it over the limit (with 166
// authorized clients, the size of the descriptor was 56027 bytes).
//
// See also tor#29134
pub const MAX_RESTRICTED_DISCOVERY_CLIENTS: usize = 160;

/// Nickname (local identifier) for a hidden service client.
///
/// An `HsClientNickname` must be a valid [`Slug`].
/// See [slug](tor_persist::slug) for the syntactic requirements.
//
// TODO: when we implement the arti hsc CLI for managing the configured client keys,
// we will use the nicknames to identify individual clients.
#[derive(Clone, Debug, Hash, Eq, PartialEq, Ord, PartialOrd)] //
#[derive(Display, From, Into, Serialize, Deserialize)]
#[serde(transparent)]
pub struct HsClientNickname(Slug);

/// A list of client discovery keys.
pub(crate) type RestrictedDiscoveryKeys = BTreeMap<HsClientNickname, HsClientDescEncKey>;

impl FromStr for HsClientNickname {
    type Err = BadSlug;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let slug = Slug::try_from(s.to_string())?;

        Ok(Self(slug))
    }
}

/// Configuration for enabling restricted discovery mode.
///
/// # Client nickname uniqueness
///
/// The client nicknames specified in `key_dirs` and `static_keys`
/// **must** be unique. Any nickname occurring in `static_keys` must not
/// already have an entry in any of the configured `key_dirs`,
/// and any one nickname must not occur in more than one of the `key_dirs`.
///
/// Violating this rule will cause the additional keys to be ignored.
/// If there are multiple entries for the same nickname,
/// the entry with the highest precedence will be used, and all the others will be ignored.
/// The precedence rules are as follows:
///   * the `static_keys` take precedence over the keys from `key_dirs`
///   * the ordering of the directories in `key_dirs` represents the order of precedence
///
/// # Reloading the configuration
///
/// Currently, the `static_keys` and `key_dirs` directories will *not* be monitored for updates,
/// even when automatic config reload is enabled. We hope to change that in the future.
/// In the meantime, you will need to restart your service every time you update
/// its restricted discovery settings in order for the changes to be applied.
///
/// See the [module-level documentation](self) for more details.
#[derive(Debug, Clone, Builder, Eq, PartialEq, Getters)]
#[builder(build_fn(error = "ConfigBuildError", name = "build_unvalidated"))]
#[builder(derive(Serialize, Deserialize, Debug, Deftly))]
#[non_exhaustive]
pub struct RestrictedDiscoveryConfig {
    /// Whether to enable restricted discovery mode.
    ///
    /// Services running in restricted discovery mode are only discoverable
    /// by the configured clients.
    ///
    /// Can only be enabled if the `restricted-discovery` feature is enabled.
    ///
    /// If you enable this, you must also specify the authorized clients (via `static_keys`),
    /// or the directories where the authorized client keys should be read from (via `key_dirs`).
    ///
    /// Restricted discovery mode is disabled by default.
    #[builder(default)]
    pub(crate) enabled: bool,

    /// If true, the provided `key_dirs` will be watched for changes.
    #[builder(default)]
    #[builder_field_attr(serde(skip))]
    #[getter(as_mut, as_copy)]
    watch_configuration: bool,

    /// Directories containing the client keys, each in the
    /// `descriptor:x25519:<base32-encoded-x25519-public-key>` format.
    ///
    /// Each file in this directory must have a file name of the form `<nickname>.auth`,
    /// where `<nickname>` is a valid [`HsClientNickname`].
    #[builder(default, sub_builder(fn_name = "build"))]
    #[builder_field_attr(serde(default))]
    key_dirs: DirectoryKeyProviderList,

    /// A static mapping from client nicknames to keys.
    ///
    /// Each client key must be in the `descriptor:x25519:<base32-encoded-x25519-public-key>`
    /// format.
    #[builder(default, sub_builder(fn_name = "build"))]
    #[builder_field_attr(serde(default))]
    static_keys: StaticKeyProvider,
}

impl RestrictedDiscoveryConfig {
    /// Read the client keys from all the configured key providers.
    ///
    /// Returns `None` if restricted mode is disabled.
    ///
    // TODO: this is not currently implemented (reconfigure() doesn't call read_keys)
    /// When reconfiguring a [`RunningOnionService`](crate::RunningOnionService),
    /// call this function to obtain an up-to-date view of the authorized clients.
    ///
    // TODO: this is a footgun. We might want to rethink this before we make
    // the restricted-discovery feature non-experimental:
    /// Note: if there are multiple entries for the same [`HsClientNickname`],
    /// only one of them will be used (the others are ignored).
    /// The deduplication logic is as follows:
    ///   * the `static_keys` take precedence over the keys from `key_dirs`
    ///   * the ordering of the directories in `key_dirs` represents the order of precedence
    pub(crate) fn read_keys(
        &self,
        path_resolver: &CfgPathResolver,
    ) -> Option<RestrictedDiscoveryKeys> {
        if !self.enabled {
            return None;
        }

        let mut authorized_clients = BTreeMap::new();

        // The static_keys are inserted first, so they have precedence over
        // the keys from key_dirs.
        extend_key_map(
            &mut authorized_clients,
            RestrictedDiscoveryKeys::from(self.static_keys.clone()),
        );

        // The key_dirs are read in order of appearance,
        // which is also the order of precedence.
        for dir in &self.key_dirs {
            match dir.read_keys(path_resolver) {
                Ok(keys) => extend_key_map(&mut authorized_clients, keys),
                Err(e) => {
                    warn_report!(e, "Failed to read keys at {}", dir.path());
                }
            }
        }

        if authorized_clients.len() > MAX_RESTRICTED_DISCOVERY_CLIENTS {
            warn!(
                "You have configured over {} restricted discovery clients. Your service's descriptor is likely to exceed the 50kB limit",
                MAX_RESTRICTED_DISCOVERY_CLIENTS
            );
        }

        Some(authorized_clients)
    }
}

/// Helper for extending a key map with additional keys.
///
/// Logs a warning if any of the keys are already present in the map.
fn extend_key_map(
    key_map: &mut RestrictedDiscoveryKeys,
    keys: impl IntoIterator<Item = (HsClientNickname, HsClientDescEncKey)>,
) {
    for (nickname, key) in keys.into_iter() {
        match key_map.entry(nickname.clone()) {
            Entry::Vacant(v) => {
                let _: &mut HsClientDescEncKey = v.insert(key);
            }
            Entry::Occupied(_) => {
                warn!(
                    client_nickname=%nickname,
                    "Ignoring duplicate client key"
                );
            }
        }
    }
}

impl RestrictedDiscoveryConfigBuilder {
    /// Build the [`RestrictedDiscoveryConfig`].
    ///
    /// Returns an error if:
    ///   - restricted mode is enabled but the `restricted-discovery` feature is not enabled
    ///   - restricted mode is enabled but no client key providers are configured
    ///   - restricted mode is disabled, but some client key providers are configured
    pub fn build(&self) -> Result<RestrictedDiscoveryConfig, ConfigBuildError> {
        let RestrictedDiscoveryConfig {
            enabled,
            key_dirs,
            static_keys,
            watch_configuration,
        } = self.build_unvalidated()?;
        let key_list = static_keys.as_ref().iter().collect_vec();

        cfg_if::cfg_if! {
            if #[cfg(feature = "restricted-discovery")] {
                match (enabled, key_dirs.as_slice(), key_list.as_slice()) {
                    (true, &[], &[]) => {
                        return Err(ConfigBuildError::Inconsistent {
                            fields: vec!["key_dirs".into(), "static_keys".into(), "enabled".into()],
                            problem: "restricted_discovery not configured, but enabled is true"
                                .into(),
                        });
                    },
                    (false, &[_, ..], _) => {
                        return Err(ConfigBuildError::Inconsistent {
                            fields: vec!["key_dirs".into(), "enabled".into()],
                            problem: "restricted_discovery.key_dirs configured, but enabled is false"
                                .into(),
                        });

                    },
                    (false, _, &[_, ..])=> {
                        return Err(ConfigBuildError::Inconsistent {
                            fields: vec!["static_keys".into(), "enabled".into()],
                            problem: "restricted_discovery.static_keys configured, but enabled is false"
                                .into(),
                        });
                    }
                    (true, &[_, ..], _) | (true, _, &[_, ..]) | (false, &[], &[]) => {
                        // The config is valid.
                    }
                }
            } else {
                // Restricted mode can only be enabled if the `experimental` feature is enabled.
                if enabled {
                    return Err(ConfigBuildError::NoCompileTimeSupport {
                        field: "enabled".into(),
                        problem:
                            "restricted_discovery.enabled=true, but restricted-discovery feature not enabled"
                                .into(),
                    });
                }

                match (key_dirs.as_slice(), key_list.as_slice()) {
                    (&[_, ..], _) => {
                        return Err(ConfigBuildError::NoCompileTimeSupport {
                            field: "key_dirs".into(),
                            problem:
                                "restricted_discovery.key_dirs set, but restricted-discovery feature not enabled"
                                    .into(),
                        });
                    },
                    (_, &[_, ..]) => {
                        return Err(ConfigBuildError::NoCompileTimeSupport {
                            field: "static_keys".into(),
                            problem:
                                "restricted_discovery.static_keys set, but restricted-discovery feature not enabled"
                                    .into(),
                        });
                    },
                    (&[], &[]) => {
                        // The config is valid.
                    }
                };
            }
        }

        Ok(RestrictedDiscoveryConfig {
            enabled,
            key_dirs,
            static_keys,
            watch_configuration,
        })
    }
}

#[cfg(test)]
mod test {
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

use rand::SeedableRng;
use rand::rngs::StdRng;
    use std::ops::Index;

    use tor_config::assert_config_error;
    use tor_config_path::CfgPath;
    use tor_hscrypto::pk::HsClientDescEncKeypair;

    /// A helper for creating a test (`HsClientNickname`, `HsClientDescEncKey`) pair.
    fn make_authorized_client(nickname: &str) -> (HsClientNickname, HsClientDescEncKey) {
        let mut rng = StdRng::seed_from_u64(0);
        let nickname: HsClientNickname = nickname.parse().unwrap();
        let keypair = HsClientDescEncKeypair::generate(&mut rng);
        let pk = keypair.public();

        (nickname, pk.clone())
    }

    fn write_key_to_file(dir: &Path, nickname: &HsClientNickname, key: impl fmt::Display) {
        let path = dir.join(nickname.to_string()).with_extension("auth");
        fs::write(path, key.to_string()).unwrap();
    }

    #[test]
    #[cfg(feature = "restricted-discovery")]
    fn invalid_config() {
        let err = RestrictedDiscoveryConfigBuilder::default()
            .enabled(true)
            .build()
            .unwrap_err();

        assert_config_error!(
            err,
            Inconsistent,
            "restricted_discovery not configured, but enabled is true"
        );

        let mut builder = RestrictedDiscoveryConfigBuilder::default();
        builder.static_keys().access().push((
            HsClientNickname::from_str("alice").unwrap(),
            HsClientDescEncKey::from_str(
                "descriptor:x25519:zprrmiv6dv6sjfl7sfbsvlj5vunpgcdfevz7m23ltlvtccxjqbka",
            )
            .unwrap(),
        ));

        let err = builder.build().unwrap_err();

        assert_config_error!(
            err,
            Inconsistent,
            "restricted_discovery.static_keys configured, but enabled is false"
        );

        let mut dir_provider = DirectoryKeyProviderBuilder::default();
        dir_provider.path(CfgPath::new("/foo".to_string()));
        let mut builder = RestrictedDiscoveryConfigBuilder::default();
        builder.key_dirs().access().push(dir_provider);

        let err = builder.build().unwrap_err();

        assert_config_error!(
            err,
            Inconsistent,
            "restricted_discovery.key_dirs configured, but enabled is false"
        );
    }

    #[test]
    #[cfg(feature = "restricted-discovery")]
    fn empty_providers() {
        // It's not a configuration error to enable restricted mode is enabled
        // without configuring any keys, but this would make the service unreachable
        // (a different part of the code will issue a warning about this).
        let mut builder = RestrictedDiscoveryConfigBuilder::default();
        let dir = tempfile::TempDir::new().unwrap();
        let mut dir_prov_builder = DirectoryKeyProviderBuilder::default();
        dir_prov_builder
            .path(CfgPath::new_literal(dir.path()))
            .permissions()
            .dangerously_trust_everyone();
        builder
            .enabled(true)
            .key_dirs()
            .access()
            // Push a directory provider that has no keys
            .push(dir_prov_builder);

        let restricted_config = builder.build().unwrap();
        let path_resolver = CfgPathResolver::default();
        assert!(restricted_config
            .read_keys(&path_resolver)
            .unwrap()
            .is_empty());
    }

    #[test]
    #[cfg(not(feature = "restricted-discovery"))]
    fn invalid_config() {
        let mut builder = RestrictedDiscoveryConfigBuilder::default();
        let err = builder.enabled(true).build().unwrap_err();

        assert_config_error!(
            err,
            NoCompileTimeSupport,
            "restricted_discovery.enabled=true, but restricted-discovery feature not enabled"
        );

        let mut builder = RestrictedDiscoveryConfigBuilder::default();
        builder.static_keys().access().push((
            HsClientNickname::from_str("alice").unwrap(),
            HsClientDescEncKey::from_str(
                "descriptor:x25519:zprrmiv6dv6sjfl7sfbsvlj5vunpgcdfevz7m23ltlvtccxjqbka",
            )
            .unwrap(),
        ));

        let err = builder.build().unwrap_err();

        assert_config_error!(
            err,
            NoCompileTimeSupport,
            "restricted_discovery.static_keys set, but restricted-discovery feature not enabled"
        );
    }

    #[test]
    #[cfg(feature = "restricted-discovery")]
    fn valid_config() {
        /// The total number of clients.
        const CLIENT_COUNT: usize = 10;
        /// The number of client keys configured using a static provider.
        const STATIC_CLIENT_COUNT: usize = 5;

        let mut all_keys = vec![];
        let dir = tempfile::TempDir::new().unwrap();

        // A builder that only has static keys.
        let mut builder_static_keys = RestrictedDiscoveryConfigBuilder::default();
        builder_static_keys.enabled(true);

        // A builder that only a key dir.
        let mut builder_key_dir = RestrictedDiscoveryConfigBuilder::default();
        builder_key_dir.enabled(true);

        // A builder that has both static keys and a key dir
        let mut builder_static_and_key_dir = RestrictedDiscoveryConfigBuilder::default();
        builder_static_and_key_dir.enabled(true);

        for i in 0..CLIENT_COUNT {
            let (nickname, key) = make_authorized_client(&format!("client-{i}"));
            all_keys.push((nickname.clone(), key.clone()));

            if i < STATIC_CLIENT_COUNT {
                builder_static_keys
                    .static_keys()
                    .access()
                    .push((nickname.clone(), key.clone()));
                builder_static_and_key_dir
                    .static_keys()
                    .access()
                    .push((nickname, key.clone()));
            } else {
                let path = dir.path().join(nickname.to_string()).with_extension("auth");
                fs::write(path, key.to_string()).unwrap();
            }
        }

        let mut dir_builder = DirectoryKeyProviderBuilder::default();
        dir_builder
            .path(CfgPath::new_literal(dir.path()))
            .permissions()
            .dangerously_trust_everyone();

        for b in &mut [&mut builder_key_dir, &mut builder_static_and_key_dir] {
            b.key_dirs().access().push(dir_builder.clone());
        }

        let test_cases = [
            (0..STATIC_CLIENT_COUNT, builder_static_keys),
            (STATIC_CLIENT_COUNT..CLIENT_COUNT, builder_key_dir),
            (0..CLIENT_COUNT, builder_static_and_key_dir),
        ];

        for (range, builder) in test_cases {
            let config = builder.build().unwrap();
            let path_resolver = CfgPathResolver::default();

            let mut authorized_clients = config
                .read_keys(&path_resolver)
                .unwrap()
                .into_iter()
                .collect_vec();
            authorized_clients.sort_by(|k1, k2| k1.0.cmp(&k2.0));

            assert_eq!(authorized_clients.as_slice(), all_keys.index(range));
        }
    }

    #[test]
    #[cfg(feature = "restricted-discovery")]
    fn key_precedence() {
        // A builder with static keys, and two key dirs.
        let mut builder = RestrictedDiscoveryConfigBuilder::default();
        builder.enabled(true);
        let (foo_nick, foo_key1) = make_authorized_client("foo");
        builder
            .static_keys()
            .access()
            .push((foo_nick.clone(), foo_key1.clone()));

        // Make another client key with the same nickname
        let (_foo_nick, foo_key2) = make_authorized_client("foo");

        let dir1 = tempfile::TempDir::new().unwrap();
        let dir2 = tempfile::TempDir::new().unwrap();

        // Write a different key with the same nickname to dir1
        // (we will check that the entry from static_keys takes precedence over it)
        write_key_to_file(dir1.path(), &foo_nick, foo_key2);

        // Write two keys sharing the same nickname to dir1 and dir2
        // (we will check that the first dir_keys entry takes precedence over the second)
        let (bar_nick, bar_key1) = make_authorized_client("bar");
        write_key_to_file(dir1.path(), &bar_nick, &bar_key1);

        let (_bar_nick, bar_key2) = make_authorized_client("bar");
        write_key_to_file(dir2.path(), &bar_nick, bar_key2);

        let mut key_dir1 = DirectoryKeyProviderBuilder::default();
        key_dir1
            .path(CfgPath::new_literal(dir1.path()))
            .permissions()
            .dangerously_trust_everyone();

        let mut key_dir2 = DirectoryKeyProviderBuilder::default();
        key_dir2
            .path(CfgPath::new_literal(dir2.path()))
            .permissions()
            .dangerously_trust_everyone();

        builder.key_dirs().access().extend([key_dir1, key_dir2]);
        let config = builder.build().unwrap();
        let path_resolver = CfgPathResolver::default();
        let keys = config.read_keys(&path_resolver).unwrap();

        // Check that foo is the entry we inserted into static_keys:
        let foo_key_found = keys.get(&foo_nick).unwrap();
        assert_eq!(foo_key_found, &foo_key1);

        // Check that bar is the entry from key_dir1
        // (dir1 takes precedence over dir2)
        let bar_key_found = keys.get(&bar_nick).unwrap();
        assert_eq!(bar_key_found, &bar_key1);
    }

    #[test]
    #[cfg(feature = "restricted-discovery")]
    fn ignore_invalid() {
        /// The number of valid keys.
        const VALID_COUNT: usize = 5;

        let dir = tempfile::TempDir::new().unwrap();
        for i in 0..VALID_COUNT {
            let (nickname, key) = make_authorized_client(&format!("client-{i}"));
            write_key_to_file(dir.path(), &nickname, &key);
        }

        // Add some malformed keys
        let nickname: HsClientNickname = "foo".parse().unwrap();

        write_key_to_file(dir.path(), &nickname, "descriptor:x25519:foobar");

        let (nickname, key) = make_authorized_client("bar");
        let path = dir
            .path()
            .join(nickname.to_string())
            .with_extension("not_auth");
        fs::write(path, key.to_string()).unwrap();

        let mut dir_prov_builder = DirectoryKeyProviderBuilder::default();
        dir_prov_builder
            .path(CfgPath::new_literal(dir.path()))
            .permissions()
            .dangerously_trust_everyone();

        let mut builder = RestrictedDiscoveryConfigBuilder::default();
        builder
            .enabled(true)
            .key_dirs()
            .access()
            .push(dir_prov_builder);
        let config = builder.build().unwrap();

        let path_resolver = CfgPathResolver::default();
        assert_eq!(config.read_keys(&path_resolver).unwrap().len(), VALID_COUNT);
    }
}
