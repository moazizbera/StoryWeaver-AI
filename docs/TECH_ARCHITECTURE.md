# StoryWeaver AI - Technical Architecture

## System Overview

StoryWeaver AI is built on a modern, scalable architecture that separates concerns between presentation, application logic, and AI processing. The system follows RESTful API principles and leverages cutting-edge AI capabilities from Google Gemini 2.5 Flash.

**Architecture Pattern**: Client-Server with AI Integration  
**Communication Protocol**: HTTP/REST with JSON payloads  
**Deployment**: Containerizable microservices

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE LAYER                     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         React 18 Single-Page Application            │   │
│  │  - Vite build toolchain                             │   │
│  │  - TailwindCSS styling                              │   │
│  │  - Component-based architecture                     │   │
│  │  - State management with hooks                      │   │
│  └─────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    HTTP/REST (JSON)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    APPLICATION LAYER                         │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           FastAPI Python Backend                    │   │
│  │  - API routing and middleware                       │   │
│  │  - Request validation (Pydantic)                    │   │
│  │  - Response serialization                           │   │
│  │  - CORS configuration                               │   │
│  └─────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    API Calls (JSON)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      AI PROCESSING LAYER                     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Google Gemini 2.5 Flash API                 │   │
│  │  - Structured story generation                      │   │
│  │  - Character development                            │   │
│  │  - Scene scripting                                  │   │
│  │  - Visual prompt creation                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        Image Generation Service (Optional)          │   │
│  │  - Imagen 3 / DALL-E 3 / Stable Diffusion           │   │
│  │  - Multi-provider architecture                      │   │
│  │  - Fallback chain                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Technology Stack

**Core Framework**: React 18.2.0
- **Why React**: Component reusability, virtual DOM performance, extensive ecosystem
- **Hooks**: useState, useEffect for state management without Redux complexity
- **Functional Components**: Modern, cleaner code patterns

**Build Tool**: Vite 5.0.11
- **Why Vite**: Lightning-fast HMR (Hot Module Replacement)
- **Benefits**: Near-instant dev server startup, optimized production builds
- **ESM-first**: Native ES modules support

**Styling**: TailwindCSS 3.4.1
- **Utility-First**: Rapid UI development with utility classes
- **JIT Mode**: Only generates CSS for used classes
- **Custom Configuration**: Extended with project-specific animations and themes
- **Glass-morphism**: Custom backdrop-blur and transparency effects

**Icons**: Lucide React 0.294.0
- **Lightweight**: Tree-shakeable icon library
- **Consistency**: 40+ icons used across the UI
- **Customizable**: Easy color and size modifications

**HTTP Client**: Axios 1.6.5
- **Promise-based**: Clean async/await syntax
- **Interceptors**: Request/response transformation
- **Error Handling**: Centralized error management

### Component Architecture

```
src/
├── App.jsx                      # Root component, routing, mode management
├── components/
│   ├── StoryInput.jsx          # Input form with templates and settings
│   ├── ShowcaseMode.jsx        # 6-step pipeline demonstration
│   ├── SceneViewer.jsx         # Scene navigation with thumbnails
│   ├── CharacterCard.jsx       # Interactive character profiles
│   ├── Storyboard.jsx          # Production specifications
│   └── ExportStory.jsx         # Export functionality
├── index.css                    # Global styles, animations, utilities
└── main.jsx                     # App entry point, React DOM mounting
```

### Component Responsibilities

**App.jsx** (250+ lines)
- **State Management**:
  - `story`: Generated story data
  - `loading`: Generation status
  - `error`: Error messages
  - `loadingStage`: Current generation stage
  - `loadingProgress`: Percentage (0-100)
  - `presentationMode`: UI mode toggle
  - `showcaseMode`: Pipeline demo toggle
  - `showQuickStart`: Guide visibility

- **Core Functions**:
  - `handleGenerateStory()`: API communication
  - `scrollToSection()`: Section navigation
  - Multi-stage loading with progress tracking

- **Layout Modes**:
  - Normal: 3-column grid (input + results)
  - Presentation: Full-width results only
  - Showcase: Guided pipeline demonstration

**StoryInput.jsx** (400+ lines)
- Form state management (prompt, scenes, genre, tone, style, ratio)
- Template system (5 quick-start demos)
- One-click award-winning demo
- Advanced settings expansion
- Director style presets (9 options)
- Aspect ratio selection (5 formats)
- Form validation and submission

**ShowcaseMode.jsx** (600+ lines)
- 6-step pipeline visualization
- Auto-play mode (8s per step)
- Manual navigation with step tracking
- 6 curated showcase prompts
- Gemini role highlighting per step
- Quick demo button
- Progress indicators with checkmarks

**SceneViewer.jsx** (350+ lines)
- Thumbnail preview strip
- Keyboard navigation (← → Esc)
- Fullscreen image viewer
- Directional slide animations
- Scene metadata display
- Production details grid

**CharacterCard.jsx** (200+ lines)
- 2-column grid layout
- Click-to-expand functionality
- Role-based gradient colors
- Character arc visualization
- Personality and motivation display

**Storyboard.jsx** (150+ lines)
- Production card list
- Shot type badges
- Visual and audio notes
- Duration estimates
- Narration integration

**ExportStory.jsx** (400+ lines)
- Presentation HTML export
- JSON download
- Markdown export
- Copy to clipboard
- Export button states

### State Flow

```
User Input → Form State → API Request → Loading States → Response → Display State
     ↓                                       ↓
  Validation                          Progress Updates (6 stages)
```

### Animation System

**Custom CSS Animations** (index.css):
- `fadeIn`: Entrance effect (0.5s)
- `slideUp`: Bottom-to-top entrance (0.4s)
- `slideInRight`: Left-to-right entrance (0.5s)
- `slideInLeft`: Right-to-left entrance (0.5s)
- `scaleIn`: Grow entrance (0.3s)
- `spinReverse`: Counter-clockwise rotation (1.5s infinite)
- `gradientX`: Horizontal gradient animation (3s infinite)
- `shimmer`: Shimmering effect for highlights

**Utility Classes**:
- `glass-card`: Glassmorphism effect with blur
- `btn-primary`: Gradient button with hover effects
- `input-field`: Form input styling
- `section-title`: Gradient text headers

---

## Backend Architecture

### Technology Stack

**Framework**: FastAPI
- **Async Support**: Non-blocking I/O for concurrent requests
- **Type Safety**: Automatic validation with Pydantic
- **Auto Docs**: Swagger UI at `/docs`, ReDoc at `/redoc`
- **Performance**: One of the fastest Python frameworks

**Runtime**: Python 3.10+
- **Type Hints**: Enhanced code quality and IDE support
- **Modern Syntax**: F-strings, dataclasses, async/await

**Validation**: Pydantic
- **Data Models**: Type-safe request/response schemas
- **Automatic Validation**: Parse and validate incoming data
- **Serialization**: Convert complex objects to JSON

### File Structure

```
backend/
├── main.py                  # FastAPI app, routes, middleware
├── gemini_agent.py         # Gemini API integration
├── prompts.py              # Prompt engineering
├── models.py               # Pydantic data models
├── image_generator.py      # Multi-provider image service
├── requirements.txt        # Python dependencies
└── .env                    # Environment variables (API keys)
```

### Module Responsibilities

**main.py** (~150 lines)
- **FastAPI Application**:
  ```python
  app = FastAPI(
      title="StoryWeaver AI",
      description="Cinematic AI Storytelling API",
      version="1.0.0"
  )
  ```

- **CORS Middleware**:
  - Allows frontend on different port to make requests
  - Configurable origins for production security
  - Currently: `["*"]` for development (should be restricted for production)

- **Endpoints**:
  - `GET /`: Welcome message with API info
  - `GET /health`: Health check endpoint
  - `POST /generate-story`: Main story generation endpoint
  - `POST /generate-initial-story`: Initial story creation (legacy)

- **Error Handling**:
  - Try-catch wrapping
  - HTTP exception raising
  - Detailed error logging

**gemini_agent.py** (~400 lines)
- **Singleton Pattern**:
  ```python
  _gemini_agent = None
  
  def get_gemini_agent(api_key: str = None) -> GeminiAgent:
      global _gemini_agent
      if _gemini_agent is None:
          _gemini_agent = GeminiAgent(api_key=api_key)
      return _gemini_agent
  ```

- **GeminiAgent Class**:
  - `__init__()`: Initialize Gemini client with API key
  - `generate_story()`: Main story generation method
  - `_clean_json_response()`: Parse and extract JSON from response
  - `_validate_story_structure()`: Ensure response completeness
  - `_generate_scene_images()`: Optional image generation

- **Configuration**:
  ```python
  generation_config = {
      "temperature": 0.9,      # Creativity level
      "top_p": 0.95,          # Nucleus sampling
      "top_k": 40,            # Token selection limit
      "max_output_tokens": 8192  # Response length
  }
  ```

**prompts.py** (~500 lines)
- **Primary Function**: `build_story_generation_prompt()`
  - Inputs: user_prompt, num_scenes, genre, tone, director_style, aspect_ratio
  - Output: Comprehensive prompt string for Gemini

- **Prompt Structure**:
  ```
  System Instruction
  ↓
  Role Definition (StoryWeaver AI)
  ↓
  User Story Concept
  ↓
  Production Parameters
  ↓
  Output Schema Specification (JSON structure)
  ↓
  Quality Guidelines
  ↓
  Director Style Application (if selected)
  ↓
  Technical Requirements
  ```

- **Director Style Prompts**: 9 cinematic presets with specific guidance
- **Shot Library**: 11 shot types with definitions
- **Camera Movements**: 11 movement types with descriptions

**models.py** (~300 lines)
- **Request Models**:
  ```python
  class StoryRequest(BaseModel):
      prompt: str = Field(..., min_length=1, max_length=2000)
      num_scenes: int = Field(default=4, ge=2, le=8)
      genre: Optional[str] = None
      tone: str = "dramatic"
      director_style: Optional[str] = None
      aspect_ratio: str = "16:9"
  ```

- **Response Models**:
  - `Character`: Name, role, personality, visual_description, arc
  - `Scene`: 23 fields including narrative, dialogue, technical specs
  - `StoryboardEntry`: Shot type, duration, visual/audio notes
  - `NarrationEntry`: Voice-over scripts with emotion
  - `VisualStyle`: Art style, color grading, references
  - `StoryResponse`: Complete story package

- **Validation**:
  - Field constraints (min/max lengths, value ranges)
  - Optional vs required fields
  - Type checking with Python type hints

**image_generator.py** (~200 lines)
- **Multi-Provider Architecture**:
  - Google Imagen 3 (primary)
  - OpenAI DALL-E 3 (fallback)
  - Stability AI (fallback)
  - Placeholder mode (demo)

- **Features**:
  - Graceful fallback chain
  - In-memory caching (MD5-based)
  - Provider-specific optimizations
  - Aspect ratio handling
  - Error handling with fallbacks

- **ImageGenerator Class**:
  - `generate_image()`: Main generation method
  - `_generate_with_imagen()`: Imagen 3 integration
  - `_generate_with_dalle()`: DALL-E 3 integration
  - `_generate_with_stability()`: Stable Diffusion integration
  - `_generate_placeholder()`: Unsplash placeholder

---

## API Communication Flow

### Request Flow

```
1. User submits story idea
   ↓
2. Frontend validates input
   ↓
3. Frontend sends POST to /generate-story
   {
     "prompt": "A lonely robot...",
     "num_scenes": 5,
     "genre": "Science Fiction",
     "tone": "inspirational",
     "director_style": "spielberg",
     "aspect_ratio": "2.39:1"
   }
   ↓
4. Backend receives request
   ↓
5. Pydantic validates request data
   ↓
6. GeminiAgent builds prompt
   ↓
7. Gemini API called with structured prompt
   ↓
8. Gemini generates story (10-25 seconds)
   ↓
9. Backend parses JSON response
   ↓
10. Backend validates story structure
    ↓
11. Backend generates images (optional)
    ↓
12. Backend returns StoryResponse
    ↓
13. Frontend updates state
    ↓
14. UI renders story sections
```

### Response Structure

```json
{
  "title": "The Last Signal",
  "logline": "A lonely robot on Mars...",
  "genre": "Science Fiction",
  "themes": ["hope", "humanity", "technology"],
  "estimated_runtime": "15-20 minutes",
  "visual_style": {
    "art_style": "Cinematic realism",
    "color_grading": "Cool blues, warm earth tones",
    "cinematic_references": "Spielbergian wonder",
    "aspect_ratio": "2.39:1"
  },
  "characters": [
    {
      "name": "ARCH-7",
      "role": "protagonist",
      "personality": "Curious, lonely, hopeful",
      "visual_description": "Weathered rover bot...",
      "arc": "From isolation to purpose"
    }
  ],
  "scenes": [
    {
      "scene_number": 1,
      "title": "The Martian Dawn",
      "narrative_text": "ARCH-7 rolls across...",
      "dialogue": "Day 1,825. Still alone.",
      "mood": "Lonely yet hopeful",
      "camera_angle": "Wide shot",
      "shot_type": "Establishing shot",
      "lighting": "Golden hour Mars sunset",
      "color_palette": "Rust oranges, dusty reds",
      "illustration_prompt": "A small weathered robot...",
      "image_url": "generated_image.jpg"
    }
  ],
  "storyboard": [
    {
      "scene_number": 1,
      "shot_type": "Wide Establishing Shot",
      "duration": "5 seconds",
      "visual_notes": "Vast Martian landscape...",
      "audio_notes": "Ambient wind, robot servos"
    }
  ],
  "narration": [
    {
      "scene_number": 1,
      "narration_text": "For years, ARCH-7 had been alone...",
      "emotion": "Contemplative",
      "pacing": "Slow"
    }
  ]
}
```

---

## Gemini Integration Architecture

### API Configuration

**Model**: `gemini-2.5-flash`
- Latest multimodal model from Google
- Optimized for structured output
- Fast inference time
- Cost-effective pricing

**Generation Parameters**:
- **Temperature (0.9)**: High creativity for storytelling
- **Top-P (0.95)**: Nucleus sampling for coherent output
- **Top-K (40)**: Token diversity
- **Max Tokens (8192)**: Sufficient for complete stories

### Prompt Engineering Strategy

**Three-Layer Prompt Architecture**:

1. **System Context Layer**:
   - Role definition: "You are StoryWeaver AI..."
   - Quality expectations
   - Output format requirements

2. **User Input Layer**:
   - User's story concept
   - Production parameters (scenes, genre, tone)
   - Director style influence (optional)

3. **Schema Specification Layer**:
   - Exact JSON structure required
   - Field descriptions and constraints
   - Examples of good outputs
   - Technical requirements

### Response Parsing

**Multi-Step Process**:
1. **Extract JSON**: Remove markdown code blocks (```json)
2. **Parse JSON**: Convert string to Python dict
3. **Validate Structure**: Check required fields exist
4. **Type Validation**: Pydantic model validation
5. **Scene Count Check**: Warn if mismatched
6. **Return**: Validated story object

### Error Handling

**Graceful Degradation**:
- JSON parse errors: Log and raise exception
- Missing fields: Use defaults where possible
- API failures: Retry logic (future enhancement)
- Timeout handling: 60-second timeout (future)

---

## Image Generation Architecture

### Multi-Provider Strategy

**Priority Chain**:
1. **Imagen 3** (Google Cloud)
   - Best integration with Gemini ecosystem
   - High-quality, consistent results
   - Aspect ratio support

2. **DALL-E 3** (OpenAI)
   - Excellent prompt understanding
   - Artistic quality
   - Reliable fallback

3. **Stable Diffusion** (Stability AI)
   - Open-source option
   - Customizable
   - Cost-effective

4. **Placeholder** (Unsplash)
   - Demo mode when no API configured
   - Quick testing without API costs

### Caching System

**In-Memory Cache**:
```python
_image_cache = {}  # MD5(prompt) -> URL mapping
```

**Benefits**:
- Avoid duplicate API calls for identical prompts
- Reduce costs in demo scenarios
- Faster response for repeated requests

**Limitations**:
- Not persistent (cleared on restart)
- Memory usage scales with cache size
- No TTL (time-to-live) expiration

---

## Security Architecture

### API Key Management

**Environment Variables**:
```
GEMINI_API_KEY=your_key_here
IMAGEN_API_KEY=your_key_here
DALLE_API_KEY=your_key_here
STABILITY_API_KEY=your_key_here
```

**Best Practices**:
- Never commit .env to version control
- Use .env.example as template
- Rotate keys regularly
- Restrict key permissions

### CORS Configuration

**Development**:
```python
allow_origins=["*"]  # All origins allowed
```

**Production (Recommended)**:
```python
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "https://yourapp.com").split(",")
allow_origins=ALLOWED_ORIGINS
```

### Input Validation

**Pydantic Models**:
- Type checking
- Length constraints
- Value ranges
- Required vs optional fields

**Sanitization**:
- Trim whitespace
- Remove potential injection attempts
- Validate prompt length (1-2000 characters)

---

## Deployment Architecture

### Containerization

**Docker Support**:
```dockerfile
# Backend Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
```

### Environment-Based Configuration

**Development**:
- Hot reload enabled
- Verbose logging
- All origins allowed (CORS)
- Placeholder image mode

**Production**:
- Optimized builds
- Error logging only
- Restricted CORS
- Real image generation
- HTTPS enforcement

---

## Performance Characteristics

### Frontend Performance

- **Initial Load**: < 2s (Vite optimized bundle)
- **Component Render**: < 50ms (React virtual DOM)
- **Animation FPS**: 60fps (CSS hardware acceleration)
- **Bundle Size**: ~150KB gzipped

### Backend Performance

- **API Response Time**: 10-30s (Gemini latency)
- **Validation Overhead**: < 10ms (Pydantic)
- **Memory Usage**: ~200MB per instance
- **Concurrent Requests**: 1-2 (limited by Gemini API)

### AI Performance

- **Gemini Call**: 10-25s average
- **Image Generation**: 5-15s per image (if enabled)
- **Total Story Generation**: 20-40s

---

## Scalability Considerations

### Current Limitations

- Sequential image generation (blocking)
- No response caching
- Single worker process
- In-memory cache only

### Future Improvements

- Async image generation (parallel)
- Redis caching for responses
- Horizontal scaling with load balancer
- Database for story persistence
- Queue system for high load (Celery/RabbitMQ)

---

## Monitoring & Observability

### Logging

**Current**:
- Console logging with levels (INFO, WARNING, ERROR)
- Request/response logging
- Error stack traces

**Future**:
- Structured logging (JSON format)
- Centralized log aggregation (ELK stack)
- Performance metrics
- User analytics

### Health Checks

**Endpoint**: `GET /health`
**Response**:
```json
{
  "status": "healthy",
  "service": "StoryWeaver AI",
  "version": "1.0.0"
}
```

### Error Tracking

**Future Integration**:
- Sentry for error monitoring
- Performance tracking
- User session replay
- Alert notifications
