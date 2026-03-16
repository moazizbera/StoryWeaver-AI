#!/bin/bash

# StoryWeaver AI - Local Development Startup Script

echo "🎭 Starting StoryWeaver AI Development Environment..."
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo ""
    echo "❗ Please edit .env and add your GEMINI_API_KEY"
    echo "   Get your key from: https://aistudio.google.com/app/apikey"
    echo ""
    read -p "Press enter once you've added your API key..."
fi

# Start backend
echo "🚀 Starting Backend (FastAPI)..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -q -r requirements.txt

# Copy .env if it doesn't exist in backend
if [ ! -f .env ]; then
    cp ../.env .env
fi

echo "Starting FastAPI server..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

cd ..

# Start frontend
echo ""
echo "🎨 Starting Frontend (React + Vite)..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Copy .env if it doesn't exist in frontend
if [ ! -f .env ]; then
    cp .env.example .env
fi

echo "Starting Vite development server..."
npm run dev &
FRONTEND_PID=$!

cd ..

echo ""
echo "✅ StoryWeaver AI is running!"
echo ""
echo "📍 Access points:"
echo "   Frontend:     http://localhost:3000"
echo "   Backend API:  http://localhost:8000"
echo "   API Docs:     http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for Ctrl+C
trap 'kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait
