#!/bin/bash
# Script to build and run the ArtiGit-Hub frontend

set -e

# Define constants
PROJECT_ROOT=$(realpath $(dirname $0)/..)
UI_DIR="$PROJECT_ROOT/src/frontend/forgejo-ui"
CONF_DIR="$PROJECT_ROOT/config"

# Check for required tools
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm is required but not installed. Aborting." >&2; exit 1; }

# Parse command line arguments
ACTION="build"
if [ "$1" == "build" ] || [ "$1" == "run" ] || [ "$1" == "dev" ]; then
  ACTION="$1"
fi

# Function to build the frontend
build_frontend() {
  echo "Building ArtiGit-Hub frontend..."
  
  if [ ! -d "$UI_DIR" ]; then
    echo "Error: UI directory not found at $UI_DIR"
    exit 1
  fi
  
  # Install dependencies
  cd "$UI_DIR"
  npm install
  
  # Build the frontend
  npm run build
  
  echo "Frontend build complete!"
}

# Function to run the frontend in development mode
run_dev_mode() {
  echo "Starting ArtiGit-Hub frontend in development mode..."
  
  if [ ! -d "$UI_DIR" ]; then
    echo "Error: UI directory not found at $UI_DIR"
    exit 1
  fi
  
  # Start development server
  cd "$UI_DIR"
  npm run dev
}

# Function to run the frontend with the Rust backend
run_with_backend() {
  echo "Starting ArtiGit-Hub with Rust backend..."
  
  # Build the Rust project
  cd "$PROJECT_ROOT"
  cargo build
  
  # Run ArtiGit-Hub
  cargo run -- serve --config "$CONF_DIR/frontend.toml"
}

# Execute the selected action
case "$ACTION" in
  "build")
    build_frontend
    ;;
  "run")
    build_frontend
    run_with_backend
    ;;
  "dev")
    run_dev_mode
    ;;
  *)
    echo "Usage: $0 [build|run|dev]"
    echo "  build: Build the frontend"
    echo "  run: Build and run with the Rust backend"
    echo "  dev: Run the frontend in development mode"
    exit 1
    ;;
esac
