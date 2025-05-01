# ArtiGit-Hub

A fully Rust-powered Git repository hosting platform with a focus on security, performance, and ease of use.

![ArtiGit-Hub Logo](assets/logo.svg)

## Features

- **Secure by Design**: Built entirely in Rust for memory safety
- **High Performance**: Optimized Git operations
- **Modern UI**: Clean, responsive web interface
- **API Compatible**: Compatible with Forgejo/Gitea API
- **Lightweight**: Minimal resource requirements
- **Self-Hosted**: Easy to deploy and maintain

## Status

ArtiGit-Hub is currently in beta and ready for testing. Core functionality is implemented with a focus on Git repository operations, user management, and web interface.

## Quick Start

### Installation

```bash
# Download the latest release
curl -L https://github.com/arti-git-hub/releases/download/v1.0.0/artigit-hub-v1.0.0-linux-amd64.tar.gz -o artigit-hub.tar.gz

# Extract the archive
tar -xzf artigit-hub.tar.gz
cd artigit-hub

# Run ArtiGit-Hub
./artigithub serve
```

Visit `http://localhost:3000` in your browser and follow the setup instructions.

## Development Setup

### Prerequisites

- Rust 1.72 or later
- Node.js 18 or later
- Git 2.25 or later

### Building from Source

```bash
# Clone the repository
git clone https://github.com/arti-git-hub/arti-git-hub.git
cd arti-git-hub

# Build the project
cargo build --release

# Run ArtiGit-Hub
./target/release/artigithub serve
```

## Documentation

- [User Guide](docs/user-guide.md): Guide for users
- [Administration Guide](docs/admin-guide.md): Guide for administrators
- [Developer Guide](docs/developer-guide.md): Guide for developers
- [API Reference](docs/api/README.md): API documentation
- [Frontend Integration](docs/frontend-integration.md): Frontend architecture

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest features.

## License

ArtiGit-Hub is dual-licensed under either:

- MIT License ([LICENSE-MIT](LICENSE-MIT))
- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE))

at your option.

## Acknowledgments

ArtiGit-Hub builds upon several amazing projects:

- [Arti](https://gitlab.torproject.org/tpo/core/arti): For secure networking components
- [Gitoxide](https://github.com/Byron/gitoxide): For core Git implementation
- [Forgejo](https://forgejo.org): For UI inspiration and API compatibility
- The Rust community for providing excellent tools and libraries
