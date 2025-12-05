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

# Explicitly install psycopg2-binary
pip install psycopg2-binary==2.9.9

# Verify psycopg2 installation
python -c "import psycopg2; print('psycopg2 version:', psycopg2.__version__)"

echo "Backend setup complete!"
