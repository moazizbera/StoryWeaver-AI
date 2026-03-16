@echo off
REM StoryWeaver AI - Local Development Startup Script for Windows

echo.
echo 🎭 Starting StoryWeaver AI Development Environment...
echo.

REM Check if .env file exists
if not exist .env (
    echo ⚠️  Warning: .env file not found!
    echo Creating .env from .env.example...
    copy .env.example .env
    echo.
    echo ❗ Please edit .env and add your GEMINI_API_KEY
    echo    Get your key from: https://aistudio.google.com/app/apikey
    echo.
    pause
)

REM Start backend
echo 🚀 Starting Backend (FastAPI)...
cd backend

if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -q -r requirements.txt

REM Copy .env if it doesn't exist in backend
if not exist .env (
    copy ..\.env .env
)

echo Starting FastAPI server...
start "StoryWeaver Backend" cmd /k "venv\Scripts\activate.bat && uvicorn main:app --reload --host 0.0.0.0 --port 8000"

cd ..

REM Start frontend
echo.
echo 🎨 Starting Frontend (React + Vite)...
cd frontend

if not exist node_modules (
    echo Installing npm dependencies...
    call npm install
)

REM Copy .env if it doesn't exist in frontend
if not exist .env (
    copy .env.example .env
)

echo Starting Vite development server...
start "StoryWeaver Frontend" cmd /k "npm run dev"

cd ..

echo.
echo ✅ StoryWeaver AI is running!
echo.
echo 📍 Access points:
echo    Frontend:     http://localhost:3000
echo    Backend API:  http://localhost:8000
echo    API Docs:     http://localhost:8000/docs
echo.
echo Close the terminal windows to stop the services
echo.
pause
