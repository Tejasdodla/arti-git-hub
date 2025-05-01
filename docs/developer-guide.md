# ArtiGit-Hub - Developer Guide

This guide is intended for developers who want to contribute to or customize ArtiGit-Hub.

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Development Environment Setup](#development-environment-setup)
3. [Code Structure](#code-structure)
4. [Building and Testing](#building-and-testing)
5. [Creating Extensions](#creating-extensions)
6. [API Documentation](#api-documentation)
7. [Contributing Guidelines](#contributing-guidelines)

## Project Architecture

ArtiGit-Hub follows a layered architecture:

```
┌───────────────────────────────────────────┐
│               Frontend UI                 │
│     (Forked from Forgejo, HTML/JS/CSS)    │
├───────────────────────────────────────────┤
│              REST API Layer               │
│         (Implements Forgejo API)          │
├───────────────────────────────────────────┤
│            Integration Layer              │
│      (Bridges UI with Core Services)      │
├───────────┬───────────────┬───────────────┤
│  Storage  │    Network    │    Security   │
│  Manager  │    Manager    │    Manager    │
├───────────┴───────────────┴───────────────┤
│               Core Library                │
│       (Git Operations, Repository)        │
└───────────────────────────────────────────┘
```

### Key Components

- **Frontend UI**: Web interface for user interaction
- **REST API**: API endpoints compatible with Forgejo/Gitea
- **Integration Layer**: Connects the UI with backend services
- **Storage Manager**: Handles repository storage and data persistence
- **Network Manager**: Manages Git protocol operations
- **Security Manager**: Handles authentication and access control
- **Core Library**: Implements Git operations using Rust

## Development Environment Setup

### Prerequisites

- Rust 1.72 or later
- Node.js 18 or later
- Git 2.25 or later
- SQLite or PostgreSQL

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arti-git-hub/arti-git-hub.git
   cd arti-git-hub
   ```

2. **Install Rust dependencies**:
   ```bash
   cargo build
   ```

3. **Install Node.js dependencies** (for UI development):
   ```bash
   cd src/frontend/forgejo-ui
   npm install
   ```

4. **Build the frontend**:
   ```bash
   npm run build
   ```

5. **Run the development server**:
   ```bash
   cargo run -- serve --dev
   ```

## Code Structure

The project is organized into several key directories:

- **src/**: Main source code
  - **main.rs**: Entry point
  - **api/**: API implementations
  - **cli/**: Command line interface
  - **core/**: Core library functionality
  - **frontend/**: Frontend UI integration
  - **network/**: Network and Git protocol handling
  - **storage/**: Storage management
  
- **tests/**: Test suites
  - **e2e/**: End-to-end tests
  - **integration/**: Integration tests
  - **unit/**: Unit tests

- **docs/**: Documentation
  
- **config/**: Configuration examples

- **deps/**: Dependencies and external code

## Building and Testing

### Building

```bash
# Development build
cargo build

# Release build
cargo build --release
```

### Running Tests

```bash
# Run all tests
cargo test

# Run specific test category
cargo test --package arti-git-hub --test integration

# Run with logging
RUST_LOG=debug cargo test
```

### Code Formatting

```bash
# Format code
cargo fmt

# Check formatting
cargo fmt -- --check
```

### Linting

```bash
# Run clippy
cargo clippy
```

## Creating Extensions

ArtiGit-Hub supports extensions through a plugin system:

1. Create a new Rust crate
2. Implement the `ArtiGitPlugin` trait
3. Register extension points
4. Build as a dynamic library
5. Place in the plugins directory

Example plugin:

```rust
use arti_git_hub_plugin::*;

#[derive(Default)]
pub struct MyPlugin;

impl ArtiGitPlugin for MyPlugin {
    fn name(&self) -> &'static str {
        "my-plugin"
    }
    
    fn version(&self) -> &'static str {
        "1.0.0"
    }
    
    fn register(&self, registry: &mut PluginRegistry) {
        registry.register_hook(
            HookType::PreReceive,
            Box::new(|ctx| {
                println!("Pre-receive hook called!");
                Ok(())
            }),
        );
    }
}

// Register plugin
plugin_register!(MyPlugin::default());
```

## API Documentation

The REST API follows the Forgejo/Gitea API format. Full documentation is available in `docs/api/`.

Key API resources:

- **User**: `/api/v1/user`, `/api/v1/users/:username`
- **Repository**: `/api/v1/repos/:owner/:repo`
- **Organization**: `/api/v1/orgs/:org`
- **Issues**: `/api/v1/repos/:owner/:repo/issues`
- **Pull Requests**: `/api/v1/repos/:owner/:repo/pulls`

## Contributing Guidelines

1. **Fork the repository**: Create your own fork of the project.

2. **Create a branch**: Make your changes in a new branch:
   ```bash
   git checkout -b feature/my-feature
   ```

3. **Follow code style**: Use `cargo fmt` and `cargo clippy` to ensure code quality.

4. **Write tests**: Add tests for new functionality.

5. **Update documentation**: Ensure documentation is up-to-date.

6. **Submit a pull request**: Push your branch and create a pull request.

7. **Code review**: Address review comments and make necessary changes.

### Commit Message Format

Follow conventional commits:

```
type(scope): description

[body]

[footer]
```

Types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Performance improvements
- **test**: Adding or modifying tests
- **chore**: Changes to the build process or tools

Example:
```
feat(api): add user repositories endpoint

- Add GET /api/v1/users/:username/repos endpoint
- Add pagination support
- Add filtering by type

Closes #123
```
