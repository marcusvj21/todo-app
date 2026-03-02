#!/bin/bash

# Ensure dev dependencies are installed
echo "Checking dependencies..."
npm install --include=dev

echo ""
echo "Starting Todo API Server in development mode..."
echo "Server will be available at http://localhost:3000"
echo "Health check: http://localhost:3000/health"
echo ""

# Start the development server
npm run dev
