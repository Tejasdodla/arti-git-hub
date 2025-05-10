use std::sync::Arc;
use std::error::Error;
use std::path::PathBuf;
use std::net::SocketAddr; // Added for SocketAddr

use clap::Parser;

mod api;
mod cli;
mod core;
mod network;
mod storage;
mod frontend;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let cli = cli::Cli::parse();

    match cli.command {
        Some(cli::Command::Init { path }) => {
            println!("Initializing repository at {:?}", path);
            let _repo = core::Repository::init(&path)?;
        }
        Some(cli::Command::Clone { url, path }) => {
            println!("Cloning repository from {} to {:?}", url, path);
            let _repo = core::Repository::clone(&url, &path)?;
        }
        Some(cli::Command::Push) => {
            println!("Pushing repository...");
            let mut net: network::NetworkManager = network::NetworkManager::new().await?;
            net.connect().await?;
            let storage = storage::StorageManager::new()?;
            let _cid = storage.store_object(b"sample data").await?;
            println!("Pushed data with CID: {}", _cid);
        }
        Some(cli::Command::Pull) => {
            println!("Pulling repository...");
            let mut net: network::NetworkManager = network::NetworkManager::new().await?;
            net.connect().await?;
            let storage = storage::StorageManager::new()?;
            let _data = storage.fetch_object("sample-cid").await?;
            println!("Pulled data: {:?}", _data);
        }
        Some(cli::Command::Serve { config }) => {
            println!("Starting ArtiGit-Hub with integrated UI...");
            
            // Initialize network and storage components
            let net: network::NetworkManager = network::NetworkManager::new().await?;
            let network_arc = Arc::new(net);
            
            let storage = storage::StorageManager::new()?;
            let storage_arc = Arc::new(storage);
            
            // Load configuration
            let frontend_config = match config {
                Some(config_path) => {
                    frontend::config::FrontendConfig::load_from_file(&config_path)
                        .map_err(|e| format!("Failed to load configuration: {}", e))?
                },
                None => {
                    let default_config_path = PathBuf::from("config/frontend.toml");
                    if default_config_path.exists() {
                        frontend::config::FrontendConfig::load_from_file(&default_config_path)
                            .map_err(|e| format!("Failed to load configuration: {}", e))?
                    } else {
                        frontend::config::FrontendConfig::default()
                    }
                }
            };
            
            // Initialize the frontend
            frontend::init_frontend_with_config(&frontend_config)
                .map_err(|e| format!("Failed to initialize frontend: {}", e))?;
                
            // Start the frontend server
            frontend::start_frontend_with_config(
                storage_arc,
                network_arc,
                &frontend_config
            ).await.map_err(|e| format!("Failed to start frontend: {}", e))?;

            // Start the API server in a separate task
            let api_addr = SocketAddr::from(([127, 0, 0, 1], 3001)); // TODO: Make configurable
            tokio::spawn(async move {
                match frontend::api_server::create_api_router(&frontend::api_server::ApiServerConfig::default()).await {
                    Ok(api_router) => {
                        if let Err(e) = axum::Server::bind(&api_addr)
                            .serve(api_router.into_make_service())
                            .await {
                            eprintln!("API server failed: {}", e);
                        }
                    },
                    Err(e) => eprintln!("Failed to create API router: {}", e)
                }
            });
            println!("ArtiGit-Hub API server started on http://{}", api_addr);

            // Keep the main thread alive
            // This is a simple approach; in production we'd use signals or other means
            // to handle shutdown gracefully
            println!("ArtiGit-Hub UI server started on http://{}:{}",
                frontend_config.bind_address, frontend_config.port);
            println!("Press Ctrl+C to stop the server");
            
            // Wait indefinitely (this would be replaced by proper signal handling in production)
            tokio::signal::ctrl_c().await?;
            println!("Shutting down...");
        }
        None => {
            // No subcommand provided, default to starting the server
            println!("Starting ArtiGit-Hub with integrated UI (default action)...");
            
            // Initialize network and storage components
            let net: network::NetworkManager = network::NetworkManager::new().await?;
            let network_arc = Arc::new(net);
            
            let storage = storage::StorageManager::new()?;
            let storage_arc = Arc::new(storage);
            
            // Load configuration (use default path if it exists, otherwise use defaults)
            let frontend_config = {
                let default_config_path = PathBuf::from("config/frontend.toml");
                if default_config_path.exists() {
                    frontend::config::FrontendConfig::load_from_file(&default_config_path)
                        .map_err(|e| format!("Failed to load default configuration: {}", e))?
                } else {
                    frontend::config::FrontendConfig::default()
                }
            };
            
            // Initialize the frontend
            frontend::init_frontend_with_config(&frontend_config)
                .map_err(|e| format!("Failed to initialize frontend: {}", e))?;
                
            // Start the frontend server
            frontend::start_frontend_with_config(
                storage_arc,
                network_arc,
                &frontend_config
            ).await.map_err(|e| format!("Failed to start frontend: {}", e))?;

            // Start the API server in a separate task
            let api_addr = SocketAddr::from(([127, 0, 0, 1], 3001)); // TODO: Make configurable
            tokio::spawn(async move {
                match frontend::api_server::create_api_router(&frontend::api_server::ApiServerConfig::default()).await {
                    Ok(api_router) => {
                        if let Err(e) = axum::Server::bind(&api_addr)
                            .serve(api_router.into_make_service())
                            .await {
                            eprintln!("API server failed: {}", e);
                        }
                    },
                    Err(e) => eprintln!("Failed to create API router: {}", e)
                }
            });
            println!("ArtiGit-Hub API server started on http://{}", api_addr);

            // Keep the main thread alive
            println!("ArtiGit-Hub UI server started on http://{}:{}",
                frontend_config.bind_address, frontend_config.port);
            println!("Press Ctrl+C to stop the server");
            
            // Wait indefinitely
            tokio::signal::ctrl_c().await?;
            println!("Shutting down...");
        }
    }
    Ok(())
}
