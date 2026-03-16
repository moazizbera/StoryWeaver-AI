# StoryWeaver AI - Architecture Documentation

## System Overview

StoryWeaver AI is a sophisticated multimedia storytelling system that leverages Google's Gemini 2.5 Flash to generate professional-grade cinematic content. The architecture is designed for scalability, maintainability, and production readiness.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Presentation Layer                           │
│                  (React + Vite + TailwindCSS)                   │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │ StoryInput   │  │ SceneViewer  │  │ CharacterCard        │ │
│  │ - Prompt     │  │ - Navigation │  │ - Profile Display    │ │
│  │ - Settings   │  │ - Scene Data │  │ - Visual Details     │ │
│  │ - Validation │  │ - Multi-tab  │  │ - Character Arc      │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Storyboard Component                                      │  │
│  │ - Production breakdown                                    │  │
│  │ - Narration scripts                                       │  │
│  │ - Shot types & timing                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP REST API (Axios)
                          │ JSON Request/Response
┌─────────────────────────▼───────────────────────────────────────┐
│                      Application Layer                           │
│                        (FastAPI)                                 │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ main.py - API Gateway                                     │  │
│  │ - Route handling (/generate-story, /health)              │  │
│  │ - CORS configuration                                      │  │
│  │ - Request validation (Pydantic)                           │  │
│  │ - Response formatting                                     │  │
│  │ - Error handling & HTTP status codes                     │  │
│  │ - Logging & monitoring                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Service Layer Call
┌─────────────────────────▼───────────────────────────────────────┐
│                      Service Layer                               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ gemini_agent.py - AI Service                              │  │
│  │                                                           │  │
│  │ GeminiAgent Class:                                        │  │
│  │ - Singleton instance management                           │  │
│  │ - API configuration (temp, top_p, max_tokens)            │  │
│  │ - generate_story() - Main generation logic               │  │
│  │ - _clean_json_response() - Parse & extract JSON          │  │
│  │ - _validate_story_structure() - Data validation          │  │
│  │ - refine_character() - Character enhancement             │  │
│  │ - expand_scene() - Scene expansion                        │  │
│  │                                                           │  │
│  │ Configuration:                                            │  │
│  │ - Model: gemini-2.5-flash                                │  │
│  │ - Temperature: 0.9 (high creativity)                     │  │
│  │ - Max tokens: 8192 (detailed stories)                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ prompts.py - Prompt Engineering                           │  │
│  │                                                           │  │
│  │ Functions:                                                │  │
│  │ - build_story_generation_prompt()                        │  │
│  │   * Role definition (storyteller + director)             │  │
│  │   * Parameters (scenes, genre, tone)                     │  │
│  │   * Output structure (JSON schema)                       │  │
│  │   * Creative constraints                                  │  │
│  │   * Quality requirements                                  │  │
│  │                                                           │  │
│  │ - build_character_refinement_prompt()                    │  │
│  │ - build_scene_expansion_prompt()                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ models.py - Data Models (Pydantic)                        │  │
│  │                                                           │  │
│  │ Request Models:                                           │  │
│  │ - StoryRequest (prompt, num_scenes, genre, tone)         │  │
│  │                                                           │  │
│  │ Response Models:                                          │  │
│  │ - Character (name, role, personality, visual, arc)       │  │
│  │ - Scene (narrative, illustration, camera, mood, etc.)    │  │
│  │ - StoryboardEntry (shot type, duration, notes)           │  │
│  │ - NarrationScript (text, emotion, pacing)                │  │
│  │ - StoryResponse (title, logline, all components)         │  │
│  │                                                           │  │
│  │ Features:                                                 │  │
│  │ - Type validation                                         │  │
│  │ - Field constraints (min/max values)                     │  │
│  │ - Optional fields                                         │  │
│  │ - Automatic serialization                                │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Google GenAI SDK
┌─────────────────────────▼───────────────────────────────────────┐
│                      External Service                            │
│                   Gemini 2.5 Flash API                           │
│                                                                  │
│  Capabilities:                                                   │
│  - Natural language understanding                               │
│  - Creative text generation                                     │
│  - Structured output (JSON)                                     │
│  - Multimodal content creation                                  │
│  - Contextual coherence                                         │
│  - Domain-specific knowledge (cinematography, storytelling)     │
└─────────────────────────────────────────────────────────────────┘
```

## Modular Backend Architecture

### Separation of Concerns

1. **main.py** - API Layer
   - HTTP endpoint handling
   - Request/response management
   - CORS and middleware
   - Error handling

2. **gemini_agent.py** - Service Layer
   - Gemini API integration
   - Business logic
   - Data processing
   - Response validation

3. **prompts.py** - Prompt Engineering
   - Sophisticated prompt construction
   - Template management
   - Context building

4. **models.py** - Data Layer
   - Type definitions
   - Validation rules
   - Schema enforcement

This separation ensures:
- **Testability**: Each module can be tested independently
- **Maintainability**: Changes are localized
- **Scalability**: Easy to extend with new features
- **Clarity**: Clear responsibilities for each module

## Data Flow

### Complete Story Generation Flow

```
User Input
↓
Frontend Validation
↓
HTTP POST Request (JSON)
↓
FastAPI: Pydantic Validation
↓
GeminiAgent: Prompt Construction
↓
Gemini API: Content Generation
↓
GeminiAgent: JSON Parsing & Validation
↓
FastAPI: Response Formatting
↓
Frontend: State Update & Rendering
↓
User Views Complete Story Package
```

## Frontend Component Architecture

### Component Hierarchy

```
App.jsx
├── StoryInput.jsx (Input panel)
│   ├── Prompt textarea
│   ├── Scene slider
│   └── Advanced settings (Genre, Tone)
│
└── Story Display (Conditional)
    ├── Story Header (Title, Logline, Themes)
    ├── CharacterCard.jsx (Character profiles)
    ├── SceneViewer.jsx (Scene navigation)
    │   ├── Scene Navigator (Tabs)
    │   ├── Narrative Display
    │   ├── Dialogue Display
    │   ├── Visual Details
    │   └── Image Placeholder
    └── Storyboard.jsx (Production breakdown)
        ├── Storyboard Entries
        └── Narration Scripts
```

### State Management

- **Local State**: React hooks in each component
- **Props**: Parent → Child data flow
- **Callbacks**: Child → Parent event communication
- **Future**: Consider Redux/Zustand for complex state

## Gemini Integration Details

### Generation Configuration

```python
generation_config = {
    "temperature": 0.9,        # High creativity
    "top_p": 0.95,             # Diverse sampling
    "top_k": 40,               # Controlled randomness
    "max_output_tokens": 8192  # Detailed stories
}
```

### Prompt Engineering Strategy

The prompt is structured in multiple sections:

1. **Role Definition**: Sets AI persona as storyteller + director
2. **User Context**: Story concept, genre, tone
3. **Output Schema**: Exact JSON structure with examples
4. **Quality Requirements**: Professional terminology, coherence
5. **Format Enforcement**: JSON only, no markdown

This ensures consistent, high-quality structured outputs.

## Security & Performance

### Security Measures
- API key in environment variables
- Pydantic validation prevents injection
- CORS configuration (restrict in production)
- Error messages don't expose internals

### Performance Optimizations
- Singleton pattern for Gemini agent
- Efficient JSON parsing
- Streaming responses (future)
- Caching (future for common prompts)

## Deployment

### Docker Compose (Development)
- Backend: FastAPI with hot reload
- Frontend: Vite dev server
- Shared network
- Environment variable injection

### Production (Recommended)
- Frontend: Vercel/Netlify (static hosting)
- Backend: Google Cloud Run / AWS ECS
- Secrets: Secret Manager
- Monitoring: Cloud logging

## Future Enhancements

1. **Image Generation**: Integrate actual image generation APIs
2. **Database**: Store user stories and history
3. **Authentication**: User accounts and permissions
4. **Real-time**: WebSocket for streaming generation
5. **Analytics**: Track usage and optimize prompts

---

**For detailed API documentation, see [API.md](API.md)**
**For judges' evaluation guide, see [JUDGES.md](JUDGES.md)**
