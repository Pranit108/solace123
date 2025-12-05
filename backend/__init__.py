from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
import os

# Initialize extensions
db_session = None
engine = None
SessionLocal = None

def create_app(config_name=None):
    global db_session, engine, SessionLocal
    
    # Initialize Flask app
    app = Flask(__name__)
    
    # Load configuration
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    # Configure the app
    app.config.from_pyfile('config.py')
    
    # Initialize database
    database_uri = os.getenv('DATABASE_URL', 'sqlite:///campus_connect.db')
    engine = create_engine(database_uri, echo=False, future=True)
    SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    db_session = scoped_session(SessionLocal)
    
    # Enable CORS for all routes
    CORS(app, resources={
        r"/*": {
            "origins": ["*"],  # Temporarily allow all origins for testing
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })
    
    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            response = make_response()
            response.headers.add("Access-Control-Allow-Origin", "https://solace123.onrender.com")
            response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
            response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            response.headers.add("Access-Control-Allow-Credentials", "true")
            return response
    
    # Import and register blueprints
    from . import routes
    app.register_blueprint(routes.api)
    
    @app.teardown_appcontext
    def shutdown_session(exception=None):
        if db_session:
            db_session.remove()
    
    return app
