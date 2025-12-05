from flask import Flask, jsonify
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
            "origins": [
                "http://localhost:3000",
                "https://solace123.onrender.com"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })
    
    # Import and register blueprints
    from . import routes
    app.register_blueprint(routes.api)
    
    @app.teardown_appcontext
    def shutdown_session(exception=None):
        if db_session:
            db_session.remove()
    
    return app
