use axum::{ // Removed async_trait, FromRef, State
    extract::{Json, Request},
    http::{header, Method, StatusCode},
    middleware::{self, Next}, // Next is now concrete in Axum 0.7
    response::{IntoResponse, Response},
    routing::{get, post},
    Router,
};
use axum_csrf::{CsrfConfig, CsrfLayer, CsrfToken};
// Removed unused axum_extra::extract::cookie::SameSite
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use thiserror::Error;
use tower_cookies::Key as CookieKey; // Only need Key
use tower_sessions::cookie::SameSite as SessionSameSite;
use tower_http::{
    cors::{Any, CorsLayer},
    trace::TraceLayer,
};
use tower_sessions::{MemoryStore, Session, SessionManagerLayer}; // Use tower-sessions
use tracing::info;
use rand::{rngs::OsRng, RngCore}; // For secret generation

// --- Configuration ---

// TODO: Load secrets from config/env variables
fn generate_secret() -> Vec<u8> {
    let mut secret = vec![0u8; 64]; // tower-sessions key needs Vec<u8>
    OsRng.fill_bytes(&mut secret);
    secret
}

// --- State ---

#[derive(Clone)]
struct AppState {
    // tower-sessions doesn't require state for the MemoryStore itself
    // axum_csrf config is passed directly to the layer now
}

// --- Session Data ---

#[derive(Default, Deserialize, Serialize, Debug, Clone)]
struct UserSession {
    user_id: Option<String>, // Store user identifier after login
    // Add other session data as needed
}

// --- Error Handling ---

#[derive(Debug, Error)]
enum ApiError {
    #[error("Authentication required")]
    Unauthorized,
    #[error("CSRF token mismatch")]
    CsrfMismatch,
    #[error("Session error: {0}")]
    Session(#[from] tower_sessions::session::Error), // Keep session::Error
    #[error("Internal server error: {0}")]
    Internal(#[from] anyhow::Error),
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            ApiError::Unauthorized => (StatusCode::UNAUTHORIZED, self.to_string()),
            ApiError::CsrfMismatch => (StatusCode::FORBIDDEN, self.to_string()), // Keep for clarity if needed
            ApiError::Session(e) => {
                tracing::error!("Session error: {:?}", e);
                (StatusCode::INTERNAL_SERVER_ERROR, "Session error".to_string())
            }
            ApiError::Internal(e) => {
                tracing::error!("Internal server error: {:?}", e);
                (StatusCode::INTERNAL_SERVER_ERROR, "Internal server error".to_string())
            }
        };
        (status, Json(serde_json::json!({ "error": message }))).into_response()
    }
}

type ApiResult<T> = Result<T, ApiError>;

// --- Authentication Middleware ---

// Middleware signature for Axum 0.7
async fn require_auth( // Removed generic <B>
    session: Session,
    request: Request, // Request defaults to Body in Axum 0.7 handlers/middleware
    next: Next, // Next is concrete, no <B> needed
) -> ApiResult<Response> {
    // session.get is not async in tower-sessions 0.3
    let user_session: Option<UserSession> = session.get("user")?; // Remove .await

    if user_session.as_ref().and_then(|us| us.user_id.as_ref()).is_none() {
        info!("Unauthorized access attempt");
        return Err(ApiError::Unauthorized);
    }

    // Store user info in request extensions
    // Need to make request mutable again
    let mut req_mut = request;
    req_mut.extensions_mut().insert(user_session.unwrap());

    Ok(next.run(req_mut).await) // Pass mutable request
}

// --- Handlers ---

// GET /
async fn root_handler() -> &'static str {
    "ArtiGit API Server (Axum 0.7 / tower-sessions)"
}

// GET /api/csrf-token
// Provides the CSRF token to the frontend
// Add debug_handler attribute
#[axum::debug_handler]
async fn csrf_token_handler(token: CsrfToken) -> ApiResult<impl IntoResponse> {
    // Handle the Result from authenticity_token() before serializing
    let token_string = token.authenticity_token().map_err(|e| { // authenticity_token returns Result<String, CsrfError>
        tracing::error!("Failed to get authenticity token: {:?}", e);
        // Map CSRF error to our ApiError::Internal or a specific CSRF error if defined
        ApiError::Internal(anyhow::anyhow!("CSRF token generation error"))
    })?;
    Ok((StatusCode::OK, Json(serde_json::json!({ "csrf_token": token_string }))))
}


// Stub Login Handler (for testing session creation)
// POST /api/login
#[axum::debug_handler] // Add debug_handler
async fn login_handler(session: Session) -> ApiResult<impl IntoResponse> {
    // In a real app: validate credentials, fetch user ID
    let user_id = "test_user_123_towers".to_string();

    let user_session = UserSession {
        user_id: Some(user_id),
    };

    session.insert("user", user_session)?; // Remove .await
    info!("User logged in");
    Ok((StatusCode::OK, Json(serde_json::json!({ "message": "Login successful" }))))
}

// GET /user/settings (Protected)
async fn get_user_settings_handler(
    // Extension extractor is correct for data inserted by middleware
    axum::extract::Extension(user_session): axum::extract::Extension<UserSession>,
) -> ApiResult<impl IntoResponse> {
    info!("Accessing settings for user: {:?}", user_session.user_id);
    // In a real app: fetch settings based on user_session.user_id
    Ok(Json(serde_json::json!({
        "user_id": user_session.user_id,
        "setting1": "value1_new",
        "theme": "light"
    })))
}

// POST /user/settings/update (Protected + CSRF)
async fn update_user_settings_handler(
    axum::extract::Extension(user_session): axum::extract::Extension<UserSession>,
    Json(payload): Json<serde_json::Value>, // Example: Accept arbitrary JSON
) -> ApiResult<impl IntoResponse> {
    info!("Updating settings for user: {:?} with payload: {:?}", user_session.user_id, payload);
    // In a real app: validate payload, update settings in DB
    Ok(Json(serde_json::json!({ "message": "Settings updated successfully" })))
}

// --- Server Setup ---

pub async fn run_api_server(addr: SocketAddr) -> anyhow::Result<()> {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    // Generate secrets (replace with loading from secure storage)
    // tower-sessions uses a single key for signing/encryption
    let session_key = generate_secret();
    let csrf_secret = generate_secret(); // axum_csrf needs its own secret

    // Configure Sessions (tower-sessions)
    let session_store = MemoryStore::default(); // Use default() for MemoryStore
    // Configure session key
    let cookie_key = CookieKey::from(&session_key);
    let session_layer = SessionManagerLayer::new(session_store)
        .with_secure(false) // TODO: Set true if using HTTPS
        .with_same_site(SessionSameSite::Lax)
        // Configure signing key directly on session layer
        .with_private_cookies(cookie_key);

    // Configure CSRF (axum-csrf 0.8) - Pass secret to layer constructor
    let csrf_config = CsrfConfig::default(); // Keep other defaults if needed
    let csrf_layer = CsrfLayer::new(csrf_config, csrf_secret); // Pass secret here

    // Remove explicit CookieManagerLayer - tower-sessions handles its cookies

    // Configure CORS
    let cors_layer = CorsLayer::new()
        .allow_origin(Any) // TODO: Restrict in production!
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::PATCH, Method::DELETE])
        .allow_headers([header::ACCEPT, header::CONTENT_TYPE, header::AUTHORIZATION, header::HeaderName::from_static("x-csrf-token")]);


    // Reintroduce AppState, even if empty, for .with_state()
    let app_state = AppState {};

    let protected_routes = Router::new()
        // Add .with_state() here as well, as middleware might need it
        .with_state(app_state.clone())
        .route("/user/settings", get(get_user_settings_handler))
        .route("/user/settings/update", post(update_user_settings_handler))
        // Apply CSRF protection layer TO THIS ROUTER
        .layer(csrf_layer)
        // Apply auth middleware TO THIS ROUTER
        .route_layer(middleware::from_fn(require_auth));


    let app = Router::new()
        .route("/", get(root_handler))
        // Public routes
        .route("/api/csrf-token", get(csrf_token_handler))
        .route("/api/login", post(login_handler))
        // Mount protected routes
        .merge(protected_routes)
        // Layers applied to *all* routes in order:
        .layer(TraceLayer::new_for_http()) // 1. Trace
        .layer(cors_layer)                 // 2. CORS
        // SessionManagerLayer implicitly handles cookies now
        .layer(session_layer)              // 3. Session (provides Session extractor context)
        // Note: CsrfLayer is applied only to protected_routes where needed
        // Add .with_state() to the main router
        .with_state(app_state);
        // No .with_state needed if AppState is empty

    info!("Starting API server on {}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await?;
    // Use axum::serve for Axum 0.7
    axum::serve(listener, app.into_make_service()).await?;

    Ok(())
}

// Example of how to potentially call this from main.rs
/*
mod frontend;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // ... other setup ...

    // Ensure the frontend module and api_server submodule exist
    if let Err(e) = frontend::api_server::run_api_server(([127, 0, 0, 1], 3001).into()).await {
         eprintln!("API Server error: {}", e);
    }

    Ok(())
}
*/
