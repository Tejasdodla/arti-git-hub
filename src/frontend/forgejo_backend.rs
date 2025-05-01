use std::sync::Arc;
use crate::storage::StorageManager;
use crate::network::NetworkManager;
// ArtiGit Backend Adapter for Forgejo UI
// This module provides the necessary integration between ArtiGit's core functionality
// and Forgejo's UI expectations.

// use std::sync::{Arc, Mutex}; // Unused
// use std::collections::HashMap; // Unused

// Import ArtiGit Core components
// use crate::storage::StorageManager; // Unused
// use crate::network::NetworkManager; // Unused

/// ForgejoBackend is the main integration point for the Forgejo UI
pub struct ForgejoBackend {
    // storage_manager: Arc<StorageManager>, // Removed unused field
    // network_manager: Arc<NetworkManager<R>>, // Removed unused field
    // repositories: Mutex<HashMap<String, Arc<Repository>>>, // Removed unused field
    repo_base_path: String,
}

impl ForgejoBackend {
    /// Create a new ForgejoBackend instance
    pub fn new(_storage_manager: Arc<StorageManager>, _network_manager: Arc<NetworkManager>, repo_base_path: &str) -> Self {
        Self {
            // storage_manager, // Removed unused field initialization
            // network_manager, // Removed unused field initialization
            // repositories: Mutex::new(HashMap::new()), // Removed unused field initialization
            repo_base_path: repo_base_path.to_string(),
        }
    }
    
    // Removed unused method `get_repo_path`
    // fn get_repo_path(&self, owner: &str, repo_name: &str) -> String {
    //     format!("{}/{}/{}", self.repo_base_path, owner, repo_name)
    // }
    
    /// Get the base path for repositories
    pub fn get_repo_base_path(&self) -> &str {
        &self.repo_base_path
    }

    // Removed unused method `get_repository`
    // pub fn get_repository(&self, owner: &str, repo_name: &str) -> Result<Arc<Repository>, &'static str> { ... }

    // Removed unused method `create_repository`
    // pub fn create_repository(&self, owner: &str, repo_name: &str, _description: &str) -> Result<Arc<Repository>, &'static str> { ... }
    
    // Removed unused method `list_repositories`
    // pub fn list_repositories(&self, owner: &str) -> Result<Vec<RepoInfo>, &'static str> { ... }
    
    // Removed unused method `clone_repository`
    // pub fn clone_repository(&self, url: &str, owner: &str, repo_name: &str) -> Result<Arc<Repository>, &'static str> { ... }
    
    // Removed unused method `get_branches`
    // pub fn get_branches(&self, owner: &str, repo_name: &str) -> Result<Vec<String>, &'static str> { ... }
    
    // Removed unused method `get_commits`
    // pub fn get_commits(&self, owner: &str, repo_name: &str, branch: &str, page: usize, limit: usize) -> Result<Vec<CommitInfo>, &'static str> { ... }
    
    // Removed unused method `get_file_content`
    // pub fn get_file_content(&self, owner: &str, repo_name: &str, branch: &str, path: &str) -> Result<Vec<u8>, &'static str> { ... }
    
    // Removed unused method `get_directory_listing`
    // pub fn get_directory_listing(&self, owner: &str, repo_name: &str, branch: &str, path: &str) -> Result<Vec<FileEntry>, &'static str> { ... }
}

// Removed unused struct `RepoInfo`
// pub struct RepoInfo { ... }

// Removed unused struct `CommitInfo`
// pub struct CommitInfo { ... }

// Removed unused struct `FileEntry`
// pub struct FileEntry { ... }
