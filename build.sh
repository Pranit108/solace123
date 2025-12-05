#!/bin/bash

# Exit on error
set -e

echo "Building the frontend..."
cd frontend
npm install
npm run build

# Copy the build output to the backend's static files directory
cd ..
rm -rf backend/static
mkdir -p backend/static
cp -r frontend/build/* backend/static/

echo "Build completed successfully!"
echo "You can now run the backend server with: python wsgi.py"
