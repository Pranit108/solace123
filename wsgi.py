"""
WSGI config for Campus Connect.

This module contains the WSGI application used by the production server.
"""
import os
from waitress import serve
from backend import create_app

app = create_app(config_name=os.getenv('FLASK_ENV', 'production'))

if __name__ == "__main__":
    # This is used when running locally with `python wsgi.py`
    port = int(os.environ.get('PORT', 5000))
    # Use Waitress server in production
    serve(app, host='0.0.0.0', port=port, threads=4)
