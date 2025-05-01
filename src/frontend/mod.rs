// Frontend module organization
// This module provides the UI components for ArtiGit-Hub

pub mod forgejo_backend;
pub mod forgejo_ui;
pub mod server;
pub mod api_server;
pub mod config;

// Re-export the main components for easier access
pub use server::{start_frontend_with_config, init_frontend_with_config};
