// Main entry point for the ArtiGit-Hub frontend server
// This file integrates the forked Forgejo UI with the ArtiGit backend

use std::sync::Arc;
use std::path::Path;

use crate::storage::StorageManager;
use crate::network::NetworkManager;
use crate::frontend::forgejo_ui::ForgejoUI;
use crate::frontend::config::FrontendConfig;
use crate::frontend::api_server::{self, ApiServerConfig}; // Import api_server and its config

/// Start the frontend UI server with the provided configuration
pub async fn start_frontend_with_config(
    storage_manager: Arc<StorageManager>,
    network_manager: Arc<NetworkManager>,
    config: &FrontendConfig,
) -> Result<(), String> {
    println!("Starting ArtiGit-Hub UI server on {}:{}...", config.bind_address, config.port);
    
    // Create the ForgejoBackend instance
    let backend = Arc::new(
        crate::frontend::forgejo_backend::ForgejoBackend::new(
            storage_manager,
            network_manager,
            &config.repo_base_path
        )
    );
    
    // Create the socket address
    let addr = std::net::SocketAddr::from((
        config.bind_address.parse::<std::net::IpAddr>()
            .map_err(|e| format!("Invalid IP address: {}", e))?,
        config.port
    ));

    // Create ApiServerConfig (using default for now)
    let api_server_config = ApiServerConfig::default();
    println!("API Server Config: {:?}", api_server_config); // For debugging

    // Create the auth API router
    let auth_api_router_result = api_server::create_api_router(&api_server_config).await;
    
    // Create and start the UI server
    let ui = ForgejoUI::new(backend, config.ui_path.clone())
        .map_err(|e| format!("Failed to create UI server: {}", e))?;
    
    // Pass the auth_api_router to start_server
    ui.start_server(addr, auth_api_router_result)
        .map_err(|e| format!("Failed to start UI server: {}", e))?
        .await // Await the JoinHandle
        .map_err(|e| format!("UI server execution failed: {}", e))?;
        
    // Return success
    Ok(())
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
