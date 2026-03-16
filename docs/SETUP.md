# StoryWeaver AI - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Git**: For cloning the repository
- **Docker Desktop**: For running the application in containers
- **Docker Compose**: Usually included with Docker Desktop
- **Google Gemini API Key**: Get one from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Alternative (Without Docker)

If you prefer to run without Docker:

**Backend**:
- Python 3.11 or higher
- pip (Python package manager)

**Frontend**:
- Node.js 18 or higher
- npm or yarn

## Quick Start with Docker (Recommended)

This is the fastest way to get StoryWeaver AI running.

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/storyweaver-ai.git
cd storyweaver-ai
```

### Step 2: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file
# On Windows: notepad .env
# On Mac/Linux: nano .env
```

Add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### Step 3: Start the Application

```bash
docker-compose up
```

The first time will take a few minutes to download images and install dependencies.

### Step 4: Access the Application

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Step 5: Test the Application

1. Open http://localhost:3000 in your browser
2. Enter a story prompt (e.g., "A robot learns to paint")
3. Adjust the number of scenes (2-8)
4. Click "Generate Story"
5. Wait 10-15 seconds for the story to generate
6. View your multimodal story!

## Local Development Setup (Without Docker)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

5. **Run the server**:
   ```bash
   # Method 1: Direct Python
   python main.py

   # Method 2: Uvicorn (recommended for development)
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Verify backend is running**:
   - Open http://localhost:8000/health
   - Should see: `{"status":"healthy","service":"StoryWeaver AI"}`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal):
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment** (optional):
   ```bash
   cp .env.example .env
   # Default VITE_API_URL is http://localhost:8000
   # Edit if your backend is on a different URL
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Open http://localhost:3000

## Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key
5. Add it to your `.env` file

**Important**: 
- Keep your API key secret
- Never commit it to version control
- Free tier has usage limits

## Troubleshooting

### Backend won't start

**Error**: `GEMINI_API_KEY environment variable is required`
- **Solution**: Make sure you've created `.env` file and added your API key

**Error**: `ModuleNotFoundError: No module named 'fastapi'`
- **Solution**: Activate virtual environment and run `pip install -r requirements.txt`

### Frontend won't connect to backend

**Error**: Network error or CORS error in browser console
- **Solution**: 
  1. Verify backend is running: `curl http://localhost:8000/health`
  2. Check VITE_API_URL in frontend/.env matches backend URL
  3. Ensure CORS is configured in backend/main.py

### Docker issues

**Error**: `Cannot connect to the Docker daemon`
- **Solution**: Make sure Docker Desktop is running

**Error**: `Port 3000 or 8000 already in use`
- **Solution**: Stop other services using those ports, or modify ports in docker-compose.yml

### Gemini API errors

**Error**: `API key not valid`
- **Solution**: Verify your API key at Google AI Studio

**Error**: `Rate limit exceeded` or `Quota exceeded`
- **Solution**: 
  - Wait a few minutes and try again
  - Upgrade your Google AI plan if needed
  - Reduce the number of scenes in your requests

### Stories not generating properly

**Error**: `Failed to parse Gemini response as JSON`
- **Solution**: This is usually temporary. Retry the request. Gemini occasionally returns malformed JSON.

## Development Tips

### Hot Reloading

- **Backend**: Use `uvicorn main:app --reload` for automatic restart on code changes
- **Frontend**: Vite automatically hot-reloads on file changes

### Viewing Logs

**Docker**:
```bash
# View all logs
docker-compose logs

# Follow logs
docker-compose logs -f

# View specific service
docker-compose logs backend
docker-compose logs frontend
```

**Local Development**:
- Backend logs appear in the terminal running uvicorn
- Frontend logs appear in browser console and Vite terminal

### Stopping the Application

**Docker**:
```bash
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

**Local Development**:
- Press `Ctrl+C` in each terminal

## Building for Production

### Frontend Production Build

```bash
cd frontend
npm run build
```

This creates optimized files in `frontend/dist/`

### Backend Production Deployment

For production, consider:
1. Using environment-specific settings
2. Implementing rate limiting
3. Configuring CORS for specific origins
4. Using a production ASGI server (uvicorn with workers)
5. Setting up logging and monitoring

Example production command:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Environment Variables Reference

### Backend (.env or backend/.env)

| Variable | Required | Description |
|----------|----------|-------------|
| GEMINI_API_KEY | Yes | Your Google Gemini API key |

### Frontend (.env or frontend/.env)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| VITE_API_URL | No | http://localhost:8000 | Backend API URL |

## Next Steps

Once you have the application running:

1. **Explore the API**: Visit http://localhost:8000/docs for interactive API documentation
2. **Read the Architecture**: Check out `docs/ARCHITECTURE.md` to understand the system design
3. **Customize Prompts**: Modify the system prompt in `backend/main.py` to change story style
4. **Extend Features**: Add image generation integration, user authentication, or story storage

## Need Help?

- Check existing GitHub issues
- Review the API documentation: `docs/API.md`
- Review the architecture documentation: `docs/ARCHITECTURE.md`
- Create a new issue with:
  - Your OS and version
  - Steps to reproduce the problem
  - Error messages and logs

## Updating the Application

To get the latest changes:

```bash
git pull origin main

# If using Docker
docker-compose down
docker-compose up --build

# If running locally
cd backend
pip install -r requirements.txt

cd ../frontend
npm install
```
