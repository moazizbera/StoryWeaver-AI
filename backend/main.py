"""
StoryWeaver AI - Backend API
FastAPI server for generating cinematic multimodal stories using Gemini 2.5 Flash

This modular architecture demonstrates:
- Clean separation of concerns
- Professional API design
- Advanced Gemini integration
- Production-ready error handling
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
from models import StoryRequest, StoryResponse
from gemini_agent import get_gemini_agent

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="StoryWeaver AI API",
    description="Cinematic multimodal storytelling with Gemini 2.5 Flash",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("🚀 StoryWeaver AI API starting up...")
    try:
        # Initialize Gemini agent
        get_gemini_agent()
        logger.info("✅ Gemini agent initialized successfully")
    except Exception as e:
        logger.error(f"❌ Failed to initialize Gemini agent: {e}")
        raise


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "StoryWeaver AI",
        "version": "1.0.0",
        "model": "gemini-2.5-flash"
    }


@app.post("/generate-story", response_model=StoryResponse)
async def generate_story(request: StoryRequest):
    """
    Generate a complete cinematic story with multimodal outputs
    
    This endpoint demonstrates Gemini's structured output capabilities by generating:
    - Character profiles
    - Detailed scenes with cinematography
    - Production storyboard
    - Narration scripts
    
    Args:
        request: StoryRequest with prompt, scene count, genre, and tone
        
    Returns:
        StoryResponse with complete story package
    """
    try:
        logger.info(f"📝 Story generation request: '{request.prompt}'")
        
        # Get Gemini agent
        agent = get_gemini_agent()
        
        # Generate story with cinematic features
        story_data = agent.generate_story(
            user_prompt=request.prompt,
            num_scenes=request.num_scenes,
            genre=request.genre,
            tone=request.tone,
            director_style=request.director_style,
            aspect_ratio=request.aspect_ratio
        )
        
        # Validate and return
        response = StoryResponse(**story_data)
        
        logger.info(f"✅ Story generated: '{response.title}' ({len(response.scenes)} scenes)")
        return response
        
    except Exception as e:
        logger.error(f"❌ Story generation failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error generating story: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
