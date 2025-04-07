# ArtiGit Development Plan

## Project Vision
ArtiGit aims to be a fully decentralized, anonymous Git system that leverages:
- Pure Rust implementation
- Tor (via Arti) for anonymity and routing
- IPFS for decentralized storage
- Optional web UI via Forgejo
- Full control over the codebase through forking instead of using dependencies

## Phase 0: Final Vision Summary
- **Purpose**: Build a fully decentralized, anonymous Git system.
- **Core Git Logic**: Using gitoxide (gix) for Git operations
- **P2P Transport**: rust-ipfs (embedded in-process)
- **Anonymity Layer**: arti (embedded Tor client)
- **Optional UI**: Forked/minimal Forgejo or custom CLI/daemon

## Phase 1: Project Scaffolding

### 1. Create Main Repository
```bash
mkdir artigit
cd artigit
git init
cargo init
```

### 2. Clone Upstream Repositories
```bash
mkdir deps
cd deps

# Git backend
git clone https://github.com/Byron/gitoxide.git

# Tor client in Rust
git clone https://git.torproject.org/arti.git

# Rust-based IPFS
git clone https://github.com/rs-ipfs/rust-ipfs.git

# Optional UI frontend (for later)
git clone https://code.forgejo.org/forgejo/forgejo.git

# Optional P2P inspiration (for reference)
git clone https://github.com/radicle-dev/radicle-upstream.git
```

### 3. Create Local Source Structure
```bash
mkdir -p src/{core,network,storage,cli,api,frontend}
```

## Phase 2: Fork & Strip External Code

### Project Structure
| Folder | Purpose |
|--------|---------|
| src/core | Git logic (from gix) |
| src/network | SOCKS5-based routing via arti |
| src/storage | IPFS syncing blobstore |
| src/cli | Your custom CLI |
| src/api | Optional: for daemon, remote sync |
| src/frontend | Optional: for Forgejo UI later |

### Strategy for Each Component

#### 1. Git Core (from gitoxide)
- Fork stripped-down gix
- Remove HTTP/HTTPS transports
- Focus only on local Git object handling and custom transport
- Keep only essential code paths

#### 2. Network Layer (from arti)
- Extract minimal Arti SOCKS5 proxy functionality
- Focus on the Tor client implementation
- Create network isolation layer for all Git operations
- Hardcode proxy settings for simplicity

#### 3. Storage Layer (from rust-ipfs)
- Extract essential IPFS node functionality
- Create simple put_object/get_object API
- Replace Git object storage with IPFS content-addressed storage
- Implement custom Git-IPFS translation layer

#### 4. CLI Interface
- Build minimal command interface
- Implement basic operations: init, clone, push, pull
- Example commands:
  ```
  artigit init
  artigit push --via-ipfs --anon
  artigit pull --remote <tor.onion>
  artigit clone <repo-id>
  ```

## Phase 3: Integration & Implementation

### 1. Minimal Approach
- Start by hardcoding paths and configurations
- Copy only the necessary code from dependencies
- Strip unused features to reduce complexity
- Avoid cargo dependencies - treat forked code as internal libraries
- Aim for a single, stable binary without external dependencies

### 2. Core Git Implementation
- Implement basic Git object read/write via gix
- Create custom transport for Git objects
- Start with simple commands (init, clone)

### 3. IPFS Storage Integration
- Implement IPFS-based blob storage
- Handle Git objects via IPFS content-addressing
- Create translation layer between Git hashes and IPFS CIDs

### 4. Tor Network Integration
- Embed Arti client for SOCKS5 proxy
- Route Git operations through Tor
- Implement onion addressing for repositories

## Phase 4: Build System & Dependencies

### Minimal Cargo.toml
```toml
[package]
name = "artigit"
version = "0.1.0"
edition = "2021"

[workspace]

[dependencies]
# Minimized to only what's absolutely needed
# Eventually all dependencies will be embedded
```

### Dependency Strategy
- Copy necessary code from each upstream project into ArtiGit
- Remove unused functionality
- Hardcode configurations where possible
- Maintain only minimal necessary external dependencies

## Phase 5: License Compliance

### License Strategy
- ArtiGit will be open-source (MIT or GPL depending on components used)
- If using Forgejo/Radicle components, must be GPL v3+
- Include proper attribution for all components

### Attribution Files
- **LICENSE**: Main license file
- **CREDITS.md**: 
  ```markdown
  ArtiGit uses components from:
  - Gitoxide (MIT/Apache 2.0)
  - Arti (MIT/Apache 2.0)
  - Rust-IPFS (MIT/Apache 2.0)
  - Forgejo (GPL v3+)
  - Radicle (GPL v3+)
  ```

## Phase 6: Incremental Building & Testing

### Component-by-Component Implementation
1. Start with core Git functionality only
2. Add IPFS storage layer
3. Integrate Tor networking
4. Finally add CLI interface

### Testing Strategy
- Unit test each component
- Mock missing components during development
- Create simple test environments for Git operations
- Verify full operations end-to-end

## Phase 7: Frontend Integration (Optional)

### Options
1. Forgejo UI Integration
   - Implement API compatibility layer with Forgejo
   - Adapt Forgejo to use ArtiGit backend
   
2. Custom Minimal Frontend
   - Simple web UI focused on core operations
   - Built directly on ArtiGit API

## Phase 8: Launch & Documentation

### Documentation
- Create comprehensive user guides
- Document architecture and design
- Add installation instructions

### Distribution
- Create binary releases for major platforms
- Package for easy installation
- Set up mirrors on decentralized platforms

## Implementation Tips

### Start Small
- Begin with a single Git command working end-to-end
- Add functionality incrementally
- Focus on making one piece work well before expanding

### Prioritize Stability
- Focus on making components work reliably
- Handle edge cases and network failures
- Build with offline-first mentality

### Forking Benefits
| Benefit | Why It Matters for ArtiGit |
|---------|----------------------------|
| Total control | Rewrite internals to work better together |
| Patch bugs faster | No waiting for upstream fixes |
| Remove bloat | Strip features not needed |
| Unify everything | One tightly integrated binary |
| Zero external updates | No accidental upstream breaks |

## Comparison with Alternatives

### Why Not Just Use Radicle?
Radicle is pure P2P Git without:
- IPFS integration
- Tor anonymity
- Web UI
- Offline-first design

ArtiGit improves on Radicle by adding:
- Web UI (via Forgejo)
- True anonymity (via Arti/Tor)
- Better content storage (via IPFS)
- Custom transports and protocols

## Next Steps
1. Set up the base repository structure
2. Extract minimal working Git functionality from gix
3. Build simple object layer with IPFS storage
4. Integrate basic Tor routing
5. Create minimal CLI to test the system
6. Expand functionality once core system works