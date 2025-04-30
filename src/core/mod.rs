use gix_hash::ObjectId;
use gix_odb::pack::cache::object;
use gix_pack;
use gix_ref;
use gix_revision;

pub struct Repository {
    pub path: std::path::PathBuf,
}

impl Repository {
    pub fn init(path: &std::path::Path) -> Result<Self, Box<dyn std::error::Error>> {
        // TODO: Initialize repository using gitoxide
        Ok(Self { path: path.to_owned() })
    }

    pub fn clone(_url: &str, path: &std::path::Path) -> Result<Self, Box<dyn std::error::Error>> {
        // TODO: Clone repository using gitoxide
        Ok(Self { path: path.to_owned() })
    }
}