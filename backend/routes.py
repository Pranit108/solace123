from flask import Blueprint, jsonify

# Create a Blueprint for the API routes
api = Blueprint('api', __name__)

@api.route('/')
def home():
    return jsonify({"status": "success", "message": "Welcome to Campus Connect API"})

@api.route('/health')
def health_check():
    return jsonify({"status": "healthy"})
