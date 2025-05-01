#!/bin/bash
# Script to build and run the entire ArtiGit-Hub application (UI + backend)

set -e

# Define constants
PROJECT_ROOT=$(realpath $(dirname $0)/..)
UI_DIR="$PROJECT_ROOT/src/frontend/forgejo-ui"
CONF_DIR="$PROJECT_ROOT/config"
CONFIG_FILE="$CONF_DIR/frontend.toml"

# Check if configuration exists, create if not
if [ ! -f "$CONFIG_FILE" ]; then
    echo "Configuration file not found, creating default..."
    mkdir -p "$CONF_DIR"
    cat > "$CONFIG_FILE" << EOL
# ArtiGit-Hub Frontend Configuration

# HTTP server settings
port = 3000
bind_address = "127.0.0.1"
base_url = "http://localhost:3000"

# Site configuration
site_name = "ArtiGit-Hub"

# Paths
ui_path = "$UI_DIR"
repo_base_path = "$PROJECT_ROOT/data/repositories"

# HTTPS settings (optional)
use_https = false
# ssl_cert_path = "/path/to/cert.pem"
# ssl_key_path = "/path/to/key.pem"

# Security
session_secret = "change-me-in-production"
EOL
    echo "Default configuration created at $CONFIG_FILE"
fi

# Parse command line arguments
REBUILD=0
DEBUG=0

for arg in "$@"; do
    case $arg in
        --rebuild|-r)
            REBUILD=1
            shift
            ;;
        --debug|-d)
            DEBUG=1
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [options]"
            echo "Options:"
            echo "  --rebuild, -r    Rebuild the frontend before starting"
            echo "  --debug, -d      Run in debug mode"
            echo "  --help, -h       Show this help message"
            exit 0
            ;;
    esac
done

# Check if we need to rebuild the UI
if [ $REBUILD -eq 1 ]; then
    echo "Rebuilding frontend..."
    
    if [ ! -d "$UI_DIR" ]; then
        echo "Error: UI directory not found at $UI_DIR"
        exit 1
    fi
    
    # Install dependencies
    cd "$UI_DIR"
    npm install
    
    # Build the frontend
    npm run build
fi

# Create the repository directory if it doesn't exist
REPO_DIR=$(grep "repo_base_path" "$CONFIG_FILE" | sed 's/.*= *"\(.*\)"/\1/')
if [ ! -d "$REPO_DIR" ]; then
    echo "Creating repository directory at $REPO_DIR"
    mkdir -p "$REPO_DIR"
fi

# Run the application
cd "$PROJECT_ROOT"
if [ $DEBUG -eq 1 ]; then
    echo "Starting ArtiGit-Hub in debug mode..."
    cargo run -- serve --config "$CONFIG_FILE"
else
    echo "Starting ArtiGit-Hub in release mode..."
    cargo run --release -- serve --config "$CONFIG_FILE"
fi
