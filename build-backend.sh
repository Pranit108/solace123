#!/bin/bash
set -e

echo "Setting up backend..."
cd backend
pip install --upgrade pip
pip install -r requirements.txt
pip install waitress
