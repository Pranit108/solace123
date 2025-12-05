#!/bin/bash
set -e

echo "Setting up backend..."
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Explicitly install required packages
pip install psycopg2-binary==2.9.9
pip install waitress==2.1.2

# Verify installations
python -c "import psycopg2; print('psycopg2 version:', psycopg2.__version__)"
python -c "from waitress import serve; print('Waitress import successful')"

echo "Backend setup complete!"
