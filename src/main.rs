use tor_rtcompat::PreferredRuntime;
use std::env;
mod api;
mod cli;
mod core;
mod network;
mod storage;

use std::error::Error;

use clap::Parser;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let cli = cli::Cli::parse();

    match cli.command {
        Some(cli::Command::Init { path }) => {
            println!("Initializing repository at {:?}", path);
            let _repo = core::Repository::init(&path)?;
        }
        Some(cli::Command::Clone { url, path }) => {
            println!("Cloning repository from {} to {:?}", url, path);
            let _repo = core::Repository::clone(&url, &path)?;
        }
        Some(cli::Command::Push) => {
            println!("Pushing repository...");
            let mut net: network::NetworkManager<PreferredRuntime> = network::NetworkManager::new().await?;
            net.connect().await?;
            let storage = storage::StorageManager::new()?;
            let _cid = storage.store_object(b"sample data").await?;
            println!("Pushed data with CID: {}", _cid);
        }
        Some(cli::Command::Pull) => {
            println!("Pulling repository...");
            let mut net: network::NetworkManager<PreferredRuntime> = network::NetworkManager::new().await?;
            net.connect().await?;
            let storage = storage::StorageManager::new()?;
            let _data = storage.fetch_object("sample-cid").await?;
            println!("Pulled data: {:?}", _data);
        }
        None => {
            // No subcommand provided, clap will handle --help, --version, etc.
            // If no arguments are provided, clap will print help and exit.
        }
    }
    Ok(())
}
