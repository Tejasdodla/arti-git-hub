// Main entry point for the ArtiGit-Hub frontend server
// This file integrates the forked Forgejo UI with the ArtiGit backend

use std::sync::Arc;
use std::path::Path;

use crate::storage::StorageManager;
use crate::network::NetworkManager;
use crate::frontend::forgejo_ui::ForgejoUI;
use crate::frontend::config::FrontendConfig;

/// Start the frontend UI server with the provided configuration
pub fn start_frontend_with_config(
    storage_manager: Arc<StorageManager>,
    network_manager: Arc<NetworkManager>,
    config: &FrontendConfig,
) -> Result<(), String> {
    println!("Starting ArtiGit-Hub UI server on {}:{}...", config.bind_address, config.port);
    
    // Create and start the UI server
    let ui = ForgejoUI::new(
        storage_manager,
        network_manager,
        &config.repo_base_path,
        &config.ui_path,
        config.port
    );
    
    ui.start_server()
        .map_err(|e| format!("Failed to start UI server: {}", e))
}

// Removed unused function `start_frontend`
// Removed unused function `init_frontend`

/// Initialize the frontend with a specific configuration
pub fn init_frontend_with_config(config: &FrontendConfig) -> Result<(), String> {
    println!("Initializing ArtiGit-Hub UI with custom configuration...");
    
    // Check if the UI directory exists
    let ui_path = Path::new(&config.ui_path);
    if !ui_path.exists() {
        return Err(format!("UI directory not found: {}", config.ui_path));
    }
    
    // Check if repository directory exists, create if not
    let repo_path = Path::new(&config.repo_base_path);
    if !repo_path.exists() {
        std::fs::create_dir_all(repo_path)
            .map_err(|e| format!("Failed to create repository directory: {}", e))?;
    }
    
    Ok(())
}
