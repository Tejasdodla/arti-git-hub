// Forgejo UI Integration Module
// This module integrates the forked Forgejo UI with ArtiGit's backend

use std::sync::Arc;
use std::net::SocketAddr;
use tokio::task::JoinHandle;
use std::path::PathBuf;
use axum::{
    Router,
    routing::{get, get_service},
    response::{IntoResponse},
};
use tower_http::services::ServeDir;
use tracing::{info, error, warn};
use anyhow::{Result, anyhow};

use crate::frontend::forgejo_backend::ForgejoBackend;

// Forgejo UI implementation serving static files and handling API calls
pub struct ForgejoUI {
    backend: Arc<ForgejoBackend>,
    ui_path: String, // Path to the forgejo-ui directory
}

impl ForgejoUI {
    /// Create a new ForgejoUI instance
    pub fn new(backend: Arc<ForgejoBackend>, ui_path: String) -> Result<Self> {
        Ok(Self {
            backend,
            ui_path,
        })
    }
    
    /// Start the Forgejo UI server
    pub fn start_server(&self, addr: SocketAddr, auth_api_router_result: Result<Router>) -> Result<JoinHandle<()>> {
        let ui_public_path = PathBuf::from(&self.ui_path).join("public");
        
        // Print debug information
        info!("Starting ArtiGit-Hub UI (forked Forgejo) on {}", addr);
        info!("Serving UI static files from: {}", ui_public_path.display());
        info!("Repository path: {}", self.backend.get_repo_base_path());
        
        // Check if UI public path exists
        if !ui_public_path.exists() {
            error!("UI public directory does not exist: {}", ui_public_path.display());
            error!("Did you forget to build the frontend? Run: ./scripts/frontend.sh build");
            return Err(anyhow!("UI public directory not found at {}", ui_public_path.display()));
        }

        let auth_api_router = auth_api_router_result.map_err(|e| {
            error!("Failed to create auth_api_router: {:?}", e);
            anyhow!("Auth API router creation failed: {}", e)
        })?;
        
        // Start the server
        self.start_server_internal(addr, ui_public_path, auth_api_router)
    }
    
    fn start_server_internal(&self, addr: SocketAddr, ui_public_path: PathBuf, auth_api_router: Router) -> Result<JoinHandle<()>> {
        let backend = self.backend.clone();
        
        let handle = tokio::spawn(async move {
            // Define Forgejo-specific API routes
            let forgejo_api_router = Router::new()
                // Example API route - replace with actual backend calls
                .route("/health", get(|| async { "OK" })) // This will be /api/health
                .route("/repos", get(list_repos_handler))   // This will be /api/repos
                // Add more API routes here, calling backend methods
                .with_state(backend); // Pass backend to handlers

            // Define the main application router
            let app_router = Router::new()
                .nest("/api", forgejo_api_router) // Mount Forgejo API routes under /api
                .merge(auth_api_router) // Merge the /auth prefixed routes
                .fallback_service(get_service(ServeDir::new(ui_public_path.clone()).append_index_html_on_directories(true)))
                .with_state(()); // Add state if needed for fallback service

            info!("UI server listening on {}", addr);
            
            // Start the Axum server
            if let Err(e) = axum::Server::bind(&addr)
                .serve(app_router.into_make_service())
                .await
            {
                error!("UI server error: {}", e);
            }
        });

        Ok(handle)
    }
}

use axum::Json;
use serde::Serialize;

#[derive(Serialize)]
#[allow(dead_code)] // TODO: Use this for standardized API error responses
struct ApiError {
    error: String,
}

// API response types
#[derive(Serialize)]
struct RepoInfo {
    name: String,
    description: String,
    updated_at: String,
}

// List repositories handler
async fn list_repos_handler(
    axum::extract::State(_backend): axum::extract::State<Arc<ForgejoBackend>>,
) -> impl IntoResponse {
    warn!("list_repos_handler is not fully implemented yet - using mock data");
    
    // TODO: Replace with actual backend.list_repositories() call
    // For now return mock data to test UI integration
    let mock_repos = vec![
        RepoInfo {
            name: "test-repo".to_string(),
            description: "Test repository".to_string(),
            updated_at: "2025-05-01T00:00:00Z".to_string(),
        }
    ];
    
    Json(mock_repos)
}

// Add more API handlers here following the same pattern:
// 1. Define response type (implement Serialize)
// 2. Create handler function that uses backend methods
// 3. Add route in api_router
