use std::path::PathBuf;
use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Option<Command>,
}

#[derive(Subcommand)]
pub enum Command {
    /// Initializes a new repository
    Init {
        /// The path where the repository should be initialized
        path: PathBuf,
    },
    /// Clones a repository from a remote URL
    Clone {
        /// The URL of the repository to clone
        url: String,
        /// The path where the repository should be cloned
        path: PathBuf,
    },
    /// Pushes changes to the remote repository
    Push,
    /// Pulls changes from the remote repository
    Pull,
    /// Starts the web UI server with the backend
    Serve {
        /// Optional path to configuration file
        #[arg(short, long)]
        config: Option<PathBuf>,
    },
    // Extend with more commands as needed
}
