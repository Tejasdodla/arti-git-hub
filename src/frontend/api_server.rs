use axum::{ // Removed async_trait, FromRef, State
    extract::Json, // Remove Request from extract
    http::{header, Method, Request, StatusCode}, // Import Request from http
    middleware::{self, Next},
    response::{IntoResponse, Response},
    routing::{get, post},
    Router,
};
use axum_csrf::{CsrfConfig, CsrfLayer, CsrfToken};
// Removed unused axum_extra::extract::cookie::SameSite
use serde::{Deserialize, Serialize};
use thiserror::Error;
// Removed tower_cookies as we're using tower-sessions for cookie management
use tower_sessions::Session;
use tower_http::{
    cors::{Any, CorsLayer},
    trace::TraceLayer,
};
use tower_sessions::{MemoryStore, SessionManagerLayer};
use tower::ServiceBuilder; // This might still be useful for other layer compositions if needed
use axum::error_handling::HandleErrorLayer; // Re-adding this
use tracing::info;
use std::error::Error as StdError; // For the boxed error type
use rand::{rngs::OsRng, RngCore};

// --- Configuration ---

#[derive(Clone, Debug)]
pub struct ApiServerConfig {
    // Placeholder for actual config fields
    // For now, it can be empty or have minimal fields if needed by existing logic
    // For example, if session_key or csrf_secret were to be part of this config:
    // pub session_key_hex: String,
    // pub csrf_secret_hex: String,
}

impl Default for ApiServerConfig {
    fn default() -> Self {
        ApiServerConfig {
            // Initialize with default values if any
            // session_key_hex: "".to_string(), // Example
            // csrf_secret_hex: "".to_string(), // Example
        }
    }
}

// TODO: Load secrets from config/env variables
#[allow(dead_code)] // TODO: Use for loading secrets from config/env variables
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
    // We might add ApiServerConfig here if it needs to be part of the state
    // config: ApiServerConfig,
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
    #[allow(dead_code)] // TODO: Use this variant when CSRF validation fails
    CsrfMismatch,
    #[error("Session error")]
    Session(String),
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
// Update signature for from_fn_with_state
async fn require_auth(
    axum::extract::State(_state): axum::extract::State<AppState>, // Mark state as unused
    session: Session,
    request: Request<axum::body::Body>, // Use http::Request<B>
    next: Next<axum::body::Body>, // Add body generic for Axum 0.6
) -> ApiResult<Response> {
    // State is available here if needed, even if unused for now
    // let _ = state; // Indicate state is intentionally unused for now
    // session.get is not async in tower-sessions 0.3
    let user_session: Option<UserSession> = session
        .get("user")
        .map_err(|_| ApiError::Session("Failed to get session".to_string()))?;

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

    session
        .insert("user", user_session)
        .map_err(|_| ApiError::Session("Failed to insert session".to_string()))?;
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

// --- Error Handler for Session Layer ---
// The error type from SessionManagerLayer's service is Box<dyn StdError + Send + Sync + 'static>
async fn handle_session_layer_error(err: Box<dyn StdError + Send + Sync + 'static>) -> (StatusCode, String) {
    tracing::error!("Session layer error: {:?}", err);
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        format!("An internal error occurred with the session layer: {}", err),
    )
}

// --- Server Setup ---

// Renamed and modified to return a Router
pub async fn create_api_router(_config: &ApiServerConfig) -> anyhow::Result<Router> {
    // Initialize tracing (if not already done globally in server.rs)
    // tracing_subscriber::fmt()
    //     .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
    //     .try_init().ok(); // Use try_init to avoid panic if already initialized

    // Generate secrets (replace with loading from secure storage or ApiServerConfig)
    // Session key will be automatically generated by tower-sessions
    // let csrf_secret = generate_secret(); // axum_csrf needs its own secret

    // Configure Sessions (tower-sessions)
    let session_store = MemoryStore::default();
    let session_layer = SessionManagerLayer::new(session_store)
        // Note: tower-sessions 0.6.0 requires different configuration
        // Use tower-sessions compatible configuration
        .with_secure(false); // Set to true in production with HTTPS

    // We'll use tower-sessions for cookie management instead of separate cookie layer

    // Configure CSRF protection
    let csrf_config = CsrfConfig::default()
        .with_secure(false); // Set to true in production with HTTPS
    
    let csrf_layer_protected = CsrfLayer::new(csrf_config.clone());
    let csrf_layer_main = CsrfLayer::new(csrf_config);

    // Configure CORS
    let cors_layer = CorsLayer::new()
        .allow_origin(Any) // TODO: Restrict in production!
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::PATCH, Method::DELETE])
        .allow_headers([header::ACCEPT, header::CONTENT_TYPE, header::AUTHORIZATION, header::HeaderName::from_static("x-csrf-token")]);

    // AppState might now include ApiServerConfig if needed by handlers/middleware
    let app_state = AppState { /* config: config.clone() */ };

    // Define protected routes, now prefixed with /auth
    let protected_routes = Router::new()
        .with_state(app_state.clone())
        .route("/user/settings", get(get_user_settings_handler)) // Will become /auth/user/settings
        .route("/user/settings/update", post(update_user_settings_handler)) // Will become /auth/user/settings/update
        .layer(csrf_layer_protected)
        .route_layer(middleware::from_fn_with_state(app_state.clone(), require_auth));

    // Define the main API router, all routes prefixed with /auth
    let api_router_content = Router::new()
        // Note: The root_handler for "/" within this router will be /auth/ if this router is mounted at /auth
        // If a specific /auth route is desired, it should be defined here.
        // .route("/", get(root_handler)) // This would be /auth/
        .route("/api/csrf-token", get(csrf_token_handler)) // Becomes /auth/api/csrf-token
        .route("/api/login", post(login_handler))       // Becomes /auth/api/login
        .merge(protected_routes) // Merges /user/* routes, which will be /auth/user/*
        .with_state(app_state);
        
    // Apply layers to this specific set of API routes
    let layered_api_content = api_router_content
        .layer(
            ServiceBuilder::new()
                // Order: HandleErrorLayer is outer, session_layer is inner.
                // Errors from session_layer's service are caught by HandleErrorLayer.
                .layer(HandleErrorLayer::new(handle_session_layer_error))
                .layer(session_layer)
        )
        .layer(csrf_layer_main)
        .layer(cors_layer)
        .layer(TraceLayer::new_for_http()); // Good to have trace layer

    // The final router to be returned, prefixed with /auth
    let auth_router = Router::new().nest("/auth", layered_api_content);
    // Add the root handler at the top level of this auth_router if needed
    // For example, if you want a response at /auth itself:
    let auth_router = auth_router.route("/auth", get(root_handler));


    info!("Auth API router created");
    Ok(auth_router)
}

// Example of how to potentially call this from main.rs
/*
mod frontend;
use frontend::api_server::ApiServerConfig; // Import the config

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // ... other setup ...

    let api_config = ApiServerConfig::default(); // Create a default config

    // This function is no longer run_api_server, but create_api_router
    // The router would then be merged into a main Axum server instance.
    // let auth_api_router = frontend::api_server::create_api_router(&api_config).await?;
    //
    // Example:
    // let app = Router::new()
    //     .merge(other_router)
    //     .merge(auth_api_router);
    //
    // axum::Server::bind(&addr)
    //     .serve(app.into_make_service())
    //     .await?;


    Ok(())
}
*/
