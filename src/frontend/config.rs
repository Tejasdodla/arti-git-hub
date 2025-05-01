// filepath: /home/cid/Desktop/arti-git-hub/src/frontend/config.rs
// Frontend configuration module for ArtiGit-Hub

use std::fs;
use std::io;
use std::path::Path;
use std::default::Default;

/// Configuration for the ArtiGit-Hub frontend
#[derive(Debug, Clone)]
pub struct FrontendConfig {
    /// HTTP server port
    pub port: u16,
    /// HTTP server bind address
    pub bind_address: String,
    /// Base URL for the site
    pub base_url: String,
    /// Site name
    pub site_name: String,
    /// Path to UI files
    pub ui_path: String,
    /// Path to repository storage
    pub repo_base_path: String,
    /// Use HTTPS
    pub use_https: bool,
    /// Path to SSL certificate (if HTTPS is enabled)
    pub ssl_cert_path: Option<String>,
    /// Path to SSL key (if HTTPS is enabled)
    pub ssl_key_path: Option<String>,
    /// Session secret for cookie encryption
    pub session_secret: String,
}

impl Default for FrontendConfig {
    fn default() -> Self {
        Self {
            port: 3000,
            bind_address: "127.0.0.1".to_string(),
            base_url: "http://localhost:3000".to_string(),
            site_name: "ArtiGit-Hub".to_string(),
            ui_path: "/home/cid/Desktop/arti-git-hub/src/frontend/forgejo-ui".to_string(),
            repo_base_path: "/home/cid/Desktop/arti-git-hub/data/repositories".to_string(),
            use_https: false,
            ssl_cert_path: None,
            ssl_key_path: None,
            session_secret: "change-me-in-production".to_string(),
        }
    }
}

impl FrontendConfig {
    /// Load configuration from a TOML file
    pub fn load_from_file<P: AsRef<Path>>(path: P) -> Result<Self, io::Error> {
        let content = fs::read_to_string(path)?;
        Self::parse_toml(&content)
    }

    /// Parse configuration from TOML string
    fn parse_toml(content: &str) -> Result<Self, io::Error> {
        let parsed: toml::Value = content.parse()
            .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;
        
        // Start with defaults
        let mut config = Self::default();
        
        // Override with values from the TOML file
        if let Some(port) = parsed.get("port").and_then(|v| v.as_integer()) {
            config.port = port as u16;
        }
        
        if let Some(bind) = parsed.get("bind_address").and_then(|v| v.as_str()) {
            config.bind_address = bind.to_string();
        }
        
        if let Some(url) = parsed.get("base_url").and_then(|v| v.as_str()) {
            config.base_url = url.to_string();
        }
        
        if let Some(name) = parsed.get("site_name").and_then(|v| v.as_str()) {
            config.site_name = name.to_string();
        }
        
        if let Some(ui_path) = parsed.get("ui_path").and_then(|v| v.as_str()) {
            config.ui_path = ui_path.to_string();
        }
        
        if let Some(repo_path) = parsed.get("repo_base_path").and_then(|v| v.as_str()) {
            config.repo_base_path = repo_path.to_string();
        }
        
        if let Some(use_https) = parsed.get("use_https").and_then(|v| v.as_bool()) {
            config.use_https = use_https;
        }
        
        if let Some(cert_path) = parsed.get("ssl_cert_path").and_then(|v| v.as_str()) {
            config.ssl_cert_path = Some(cert_path.to_string());
        }
        
        if let Some(key_path) = parsed.get("ssl_key_path").and_then(|v| v.as_str()) {
            config.ssl_key_path = Some(key_path.to_string());
        }
        
        if let Some(secret) = parsed.get("session_secret").and_then(|v| v.as_str()) {
            config.session_secret = secret.to_string();
        }
        
        Ok(config)
    }
}
