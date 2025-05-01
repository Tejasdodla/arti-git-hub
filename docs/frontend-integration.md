# ArtiGit-Hub Frontend Integration

This documentation covers the frontend integration of ArtiGit-Hub, which is a fork of the Forgejo UI customized to work with the ArtiGit backend.

## Architecture Overview

The ArtiGit-Hub frontend integration consists of the following components:

1. **Forgejo UI Fork**: A customized version of the Forgejo web interface, rebranded as ArtiGit-Hub.

2. **Backend Adapter**: A Rust module that bridges between the ArtiGit core functionality and the frontend requirements.

3. **API Server**: Implements the REST API endpoints needed by the UI, compatible with Forgejo's API structure.

4. **Web Server**: Serves the UI files and handles requests.

## Directory Structure

```
src/frontend/
├── api_server.rs       # API endpoints implementation
├── forgejo_backend.rs  # Backend adapter for ArtiGit core
├── forgejo_ui.rs       # UI server implementation
├── mod.rs             # Module exports
├── server.rs          # Main frontend server
└── forgejo-ui/        # Forked UI files from Forgejo
    ├── public/        # Static assets
    ├── templates/     # HTML templates
    └── web_src/       # JavaScript/TypeScript source
```

## Starting the Frontend

To start the frontend server:

```rust
use arti_git_hub::frontend;
use arti_git_hub::storage::manager::StorageManager;
use arti_git_hub::network::manager::NetworkManager;
use std::sync::Arc;

fn main() {
    // Initialize components
    let storage_manager = Arc::new(StorageManager::new("/path/to/storage"));
    let network_manager = Arc::new(NetworkManager::new());
    
    // Initialize the frontend
    frontend::init_frontend().expect("Failed to initialize frontend");
    
    // Start the frontend server
    frontend::start_frontend(
        storage_manager,
        network_manager,
        "/path/to/repositories",
        "/path/to/ui/files",
        3000 // Port
    ).expect("Failed to start frontend");
}
```

## API Integration

The API server implements endpoints compatible with the Forgejo API structure, making it possible to use the Forgejo UI with minimal changes. The `ApiServer` class handles routing requests to the appropriate handlers, which in turn call the ArtiGit backend functionality.

## Customization

The UI has been customized to replace Forgejo branding with ArtiGit-Hub:

1. Changed logos and favicons
2. Updated page titles and metadata
3. Modified footer text
4. Updated home page content

## Future Improvements

1. Implement complete API compatibility with Forgejo
2. Add custom features specific to ArtiGit
3. Enhance the UI with Rust-specific branding and features
