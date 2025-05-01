# ArtiGit-Hub - User Guide

Welcome to ArtiGit-Hub, a Git repository hosting platform built entirely in Rust for enhanced security, performance, and reliability.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Web Interface](#web-interface)
5. [API Documentation](#api-documentation)
6. [Command Line Usage](#command-line-usage)
7. [Troubleshooting](#troubleshooting)

## Overview

ArtiGit-Hub is a fully-featured Git repository hosting platform with:

- Web-based UI for repository management
- Git protocol support (https, ssh, git)
- User management and authentication
- Issue tracking and pull requests
- Wikis and project boards
- API for integration with other tools

Key advantages of ArtiGit-Hub:

- Built entirely in Rust for safety and performance
- Memory-safe implementation with no C/C++ dependencies
- Modern, clean interface
- Lightweight deployment

## Installation

### Prerequisites

- 64-bit operating system (Linux, macOS, or Windows)
- 512 MB RAM minimum (2 GB recommended)
- 1 GB storage minimum

### From Binary Release

1. Download the latest release from [https://github.com/arti-git-hub/releases](https://github.com/arti-git-hub/releases)

2. Extract the archive:
   ```bash
   tar -xzf artigit-hub-v1.0.0-linux-amd64.tar.gz
   cd artigit-hub
   ```

3. Run the application:
   ```bash
   ./artigithub
   ```

### From Source

1. Clone the repository:
   ```bash
   git clone https://github.com/arti-git-hub/arti-git-hub.git
   cd arti-git-hub
   ```

2. Build the application:
   ```bash
   cargo build --release
   ```

3. Run the application:
   ```bash
   ./target/release/artigithub
   ```

## Configuration

ArtiGit-Hub uses TOML configuration files located in the `config` directory:

- `config/app.toml`: Main application configuration
- `config/frontend.toml`: Frontend and UI configuration
- `config/network.toml`: Network and Git protocol configuration
- `config/storage.toml`: Repository storage configuration

### Example Configuration

```toml
# app.toml - Main application configuration

# Server settings
[server]
listen_address = "127.0.0.1"
port = 3000
base_url = "http://localhost:3000"

# Database settings
[database]
type = "sqlite" # sqlite, postgres
path = "data/artigit-hub.db" # for sqlite
# connection_string = "postgres://user:password@localhost/artigit" # for postgres

# Authentication settings
[auth]
allow_registration = true
confirm_email = false
require_2fa = false

# Repositories settings
[repositories]
path = "data/repositories"
```

## Web Interface

ArtiGit-Hub's web interface is accessible at `http://localhost:3000` by default. The interface provides:

- User dashboard with activity feed
- Repository browser
- Code viewer with syntax highlighting
- Issue tracker
- Pull request management
- Wiki pages
- Admin panel (for administrators)

### User Management

- **Registration**: Create a new account (if enabled)
- **Login**: Sign in with username and password
- **Profile**: Edit your profile and settings
- **Organizations**: Create and manage organizations
- **SSH Keys**: Manage your SSH keys for Git access

### Repository Management

- **Create**: Create a new repository
- **Import**: Import a repository from URL
- **Settings**: Configure repository settings
- **Collaborators**: Manage access control
- **Branches**: View and manage branches
- **Tags**: View and manage tags
- **Releases**: Create and manage releases

## API Documentation

ArtiGit-Hub provides a comprehensive REST API for integration with other tools. The API is compatible with the Forgejo/Gitea API format.

API documentation is available at `http://localhost:3000/api/swagger`.

### Authentication

API authentication uses token-based authentication:

```bash
curl -H "Authorization: token YOUR_API_TOKEN" http://localhost:3000/api/v1/user
```

### Common API Endpoints

- `/api/v1/user`: Current user information
- `/api/v1/users/:username`: User information
- `/api/v1/users/:username/repos`: User repositories
- `/api/v1/repos/:owner/:repo`: Repository information
- `/api/v1/repos/:owner/:repo/issues`: Repository issues

## Command Line Usage

ArtiGit-Hub includes a command-line interface for management:

```bash
# Start the server
artigithub serve

# Create an admin user
artigithub admin create-user --username admin --password password --email admin@example.com --admin

# Import a repository
artigithub repo import --owner username --name repo-name --url https://github.com/user/repo.git

# Backup data
artigithub backup /path/to/backup

# Restore data
artigithub restore /path/to/backup
```

## Troubleshooting

### Common Issues

- **Cannot connect to server**: Check the configuration in `app.toml` and ensure the server is running.
- **Git push fails**: Check if SSH keys are correctly configured.
- **Slow performance**: Increase RAM allocation or optimize storage configuration.
- **Database errors**: Check database connection settings or file permissions.

### Logs

Logs are stored in the `logs` directory:

- `logs/app.log`: Main application logs
- `logs/http.log`: HTTP access logs
- `logs/git.log`: Git operation logs

### Getting Help

- Documentation: [https://artigit-hub.dev/docs](https://artigit-hub.dev/docs)
- Issues: [https://github.com/arti-git-hub/issues](https://github.com/arti-git-hub/issues)
- Community: [https://matrix.to/#/#artigit-hub:matrix.org](https://matrix.to/#/#artigit-hub:matrix.org)
