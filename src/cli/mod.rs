use std::path::PathBuf;

pub enum Command {
    Init {
        path: PathBuf,
    },
    Clone {
        url: String,
        path: PathBuf,
    },
    Push,
    Pull,
    // Extend with more commands as needed
}

pub fn parse_args() -> Option<Command> {
    // TODO: Implement argument parsing
    None
}