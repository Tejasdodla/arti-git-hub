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

## Current Project Status (April 2025)
- Basic project structure created
- Core modules scaffolded (core, network, storage, CLI)
- IPFS storage implementation started
- Gitoxide components integrated locally
- Arti/Tor components integrated locally
- CLI commands defined: init, clone, push, pull
- All major dependencies forked and locally embedded

## Phase 1: Project Scaffolding ✓

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

### 3. Create Local Source Structure ✓
```bash
mkdir -p src/{core,network,storage,cli,api,frontend}
```

## Phase 2: Fork & Strip External Code ✓

### Project Structure
| Folder | Purpose | Status |
|--------|---------|--------|
| src/core | Git logic (from gix) | Basic implementation ✓ |
| src/network | SOCKS5-based routing via arti | Basic implementation ✓ |
| src/storage | IPFS syncing blobstore | Basic implementation ✓ |
| src/cli | Custom CLI | Basic commands implemented ✓ |
| src/api | Optional: for daemon, remote sync | Placeholder created ✓ |
| src/frontend | Optional: for Forgejo UI later | Not started |

### Strategy for Each Component

#### 1. Git Core (from gitoxide) ✓
- Fork stripped-down gix ✓
- Remove HTTP/HTTPS transports ✓
- Focus only on local Git object handling and custom transport ✓
- Keep only essential code paths ✓
- **Next steps:** Implement full object manipulation functionality

#### 2. Network Layer (from arti) ✓
- Extract minimal Arti SOCKS5 proxy functionality ✓
- Focus on the Tor client implementation ✓
- Create network isolation layer for all Git operations ✓
- Hardcode proxy settings for simplicity ✓
- **Next steps:** Implement actual Tor connection and configuration

#### 3. Storage Layer (from rust-ipfs) ✓
- Extract essential IPFS node functionality ✓
- Create simple put_object/get_object API ✓
- Replace Git object storage with IPFS content-addressed storage ✓
- **Next steps:** Implement custom Git-IPFS translation layer

#### 4. CLI Interface ✓
- Build minimal command interface ✓
- Implement basic operations: init, clone, push, pull ✓
- Example commands:
  ```
  artigit init <path>
  artigit push
  artigit pull
  artigit clone <url> <path>
  ```
- **Next steps:** Add options for IPFS and Tor configuration

## Phase 3: Integration & Implementation (In Progress)

### 1. Minimal Approach ✓
- Start by hardcoding paths and configurations ✓
- Copy only the necessary code from dependencies ✓
- Strip unused features to reduce complexity ✓
- Avoid cargo dependencies - treat forked code as internal libraries ✓
- Aim for a single, stable binary without external dependencies ✓
- **Status:** Basic structure implemented, needs feature completeness

### 2. Core Git Implementation (In Progress)
- Implement basic Git object read/write via gix ✓
- Create custom transport for Git objects (In Progress)
- Start with simple commands (init, clone) ✓
- **Next steps:**
  - Complete the Repository implementation
  - Implement actual Git object manipulation
  - Add commit, branch, and tag functionality

### 3. IPFS Storage Integration (In Progress)
- Implement IPFS-based blob storage ✓
- Handle Git objects via IPFS content-addressing (In Progress)
- Create translation layer between Git hashes and IPFS CIDs (Pending)
- **Next steps:**
  - Complete StorageManager implementation
  - Implement bidirectional Git-IPFS hash mapping
  - Add caching mechanism for better performance

### 4. Tor Network Integration (In Progress)
- Embed Arti client for SOCKS5 proxy ✓
- Route Git operations through Tor (In Progress)
- Implement onion addressing for repositories (Pending)
- **Next steps:**
  - Complete NetworkManager implementation
  - Configure Tor client with proper settings
  - Add configuration options for network security

## Phase 4: Build System & Dependencies (In Progress)

### Cargo Structure ✓
```toml
[package]
name = "artigit"
version = "0.1.0"
edition = "2021"

[workspace]
members = [
    "src/storage/ipfs",
]
exclude = [
    "src/network/oneshot-fused-workaround",
    "src/network/fs-mistrust",
    "deps/arti"
]

[dependencies]
# Minimized to only what's absolutely needed
# Local gitoxide and arti crates
ipfs-storage = { path = "src/storage/ipfs" }
gix-object = { path = "src/core/gix-object" }
# ...and many more local dependencies
```

### Dependency Strategy ✓
- Copy necessary code from each upstream project into ArtiGit ✓
- Remove unused functionality ✓
- Hardcode configurations where possible ✓
- Maintain only minimal necessary external dependencies ✓
- **Status:** All major components embedded locally, minimal external dependencies

## Phase 5: License Compliance (In Progress)

### License Strategy ✓
- ArtiGit will be open-source (MIT or GPL depending on components used) ✓
- If using Forgejo/Radicle components, must be GPL v3+ ✓
- Include proper attribution for all components (In Progress)

### Attribution Files (Pending)
- **LICENSE**: Main license file (To be completed)
- **CREDITS.md**: To be created
  ```markdown
  ArtiGit uses components from:
  - Gitoxide (MIT/Apache 2.0)
  - Arti (MIT/Apache 2.0)
  - Rust-IPFS (MIT/Apache 2.0)
  - Forgejo (GPL v3+)
  - Radicle (GPL v3+)
  ```
- **Next steps:** Create proper LICENSE and CREDITS.md files

## Phase 6: Incremental Building & Testing (In Progress)

### Component-by-Component Implementation (In Progress)
1. Start with core Git functionality only ✓
2. Add IPFS storage layer ✓
3. Integrate Tor networking ✓
4. Finally add CLI interface ✓
- **Status:** All components scaffolded, implementation in progress

### Testing Strategy (In Progress)
- Unit test each component (Basic tests ✓)
- Mock missing components during development ✓
- Create simple test environments for Git operations (In Progress)
- Verify full operations end-to-end (Pending)
- **Status:** Basic test structure created, needs comprehensive tests
- **Next steps:** Add proper unit tests for each module, expand integration tests

## Phase 7: Frontend Integration (Optional - Not Started)

### UI
1. Forgejo UI Integration
   - Implement API compatibility layer with Forgejo
   - Adapt Forgejo to use ArtiGit backend

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

### Start Small (Current Phase)
- Begin with a single Git command working end-to-end ✓
- Add functionality incrementally ✓
- Focus on making one piece work well before expanding ✓
- **Status:** Basic commands implemented, needs functionality completeness

### Prioritize Stability (Next Focus)
- Focus on making components work reliably (In Progress)
- Handle edge cases and network failures (Pending)
- Build with offline-first mentality (Pending)
- **Next steps:** Add error handling and recovery mechanisms

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

## Next Steps (April 2025)
1. ✓ Set up the base repository structure
2. ✓ Extract minimal working Git functionality from gix
3. ✓ Build simple object layer with IPFS storage
4. ✓ Integrate basic Tor routing
5. ✓ Create minimal CLI to test the system
6. 🔄 Complete implementation of core modules:
   - Implement actual Git object storage/retrieval in Repository (core)
   - Complete IPFS content addressing for Git objects (storage)
   - Finish Tor connectivity implementation (network)
   - Enhance CLI with more options and better error handling
7. 🔄 Add comprehensive testing:
   - Unit tests for each module
   - Integration tests for cross-module functionality
   - End-to-end tests for key user workflows
8. 🆕 Implement advanced features:
   - Branch and tag management
   - Push/pull conflict resolution
   - P2P discovery mechanism
   - Offline-first operation
9. 🆕 Security enhancements:
   - Encryption for sensitive metadata
   - Better anonymity guarantees
   - Proper error handling for security issues
10. 🆕 Documentation and usability:
    - Create user guides
    - Add --help command details
    - Create example workflows