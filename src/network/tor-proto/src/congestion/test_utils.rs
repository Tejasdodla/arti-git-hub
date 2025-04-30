// src/network/tor-proto/src/congestion/test_utils.rs
#![allow(dead_code, unused_variables)] // Allow unused items/vars for now
use crate::congestion::rtt::RoundtripTimeEstimator;
use std::time::Duration;

pub mod params {
    //! Stub implementation of the parameters module for testing purposes.
    use std::time::Duration;
    use crate::congestion::params::CongestionControlParams;

    /// Stub implementation of `build_cc_vegas_params`
    pub fn build_cc_vegas_params() -> CongestionControlParams {
        unimplemented!("Stub for test utility build_cc_vegas_params")
    }

    /// Stub implementation of `build_cc_fixed_params`
    pub fn build_cc_fixed_params(_: Duration) -> CongestionControlParams {
        unimplemented!("Stub for test utility build_cc_fixed_params")
    }
}

/// Stub implementation of `new_cwnd`
pub fn new_cwnd() -> crate::congestion::CongestionWindow {
    unimplemented!("Stub for test utility new_cwnd")
}

/// Stub implementation of `new_rtt_estimator`
pub fn new_rtt_estimator() -> RoundtripTimeEstimator {
    unimplemented!("Stub for test utility new_rtt_estimator")
}