# StoryWeaver AI - Architecture Documentation

**Google Gemini Live Agent Challenge 2026**

This document provides comprehensive visual architecture diagrams for the StoryWeaver AI platform, showcasing the complete technology stack, system design, and data flow.

---

## Table of Contents

1. [Technology Stack Architecture](#1-technology-stack-architecture)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Simplified 3-Tier Architecture](#3-simplified-3-tier-architecture)
4. [Complete Technology Stack Overview](#4-complete-technology-stack-overview)
5. [Technology Stack](#5-technology-stack)
6. [Technology Dependencies Map](#6-technology-dependencies-map)
7. [Network Communication & Ports](#7-network-communication--ports)
8. [Component Architecture](#8-component-architecture)
9. [Detailed Data Flow](#9-detailed-data-flow)
10. [State Management Flow](#10-state-management-flow)
11. [Backend API Architecture](#11-backend-api-architecture)
12. [Deployment Architecture](#12-deployment-architecture)
13. [Security & Error Handling](#13-security--error-handling)
14. [Feature Flow Map](#14-feature-flow-map)

---

## 1. Technology Stack Architecture

**Overview**: Complete visualization of all technologies used in StoryWeaver AI, from client browser to cloud AI services.

![Technology Stack Architecture](./Technology%20Stack%20Architecture%20(High-Level).png)

**Key Components**:
- **Client Layer**: Web Browser (Chrome, Firefox, Edge, Safari)
- **Frontend Framework**: React 18.2.0, Vite 5.0.11, TailwindCSS 3.4.1
- **HTTP Communication**: Axios 1.6.5
- **Backend Framework**: FastAPI with Uvicorn ASGI server
- **AI Integration**: Google Gemini 2.5 Flash via Python SDK
- **Storage**: Browser localStorage API

---

## 2. High-Level Architecture

**Overview**: Complete system architecture showing all major components and their interactions.

![High-Level Architecture](./High-Level%20Architecture.png)

**Architecture Highlights**:
- **User Layer**: Judges and users interact via web browser
- **Frontend Layer**: React 18.2 + Vite with 10 components
- **Backend Layer**: FastAPI (Python) with 7 core modules
- **AI Layer**: Google Gemini 2.5 Flash (16,384 tokens, JSON mode)
- **Documentation**: 16 comprehensive documentation files
- **Storage**: localStorage for persistent history

**Component Categories**:
- **Input Components**: StoryInput, ShowcaseMode
- **Display Components**: SceneViewer, CharacterCard, Storyboard
- **Utility Components**: ExportStory, StoryHistory, ErrorBoundary

---

## 3. Simplified 3-Tier Architecture

**Overview**: Clean three-layer architectural view for quick understanding.

![Simplified 3-Tier Architecture](./Simplified%203-Tier%20Architecture.png)

**Tiers**:
1. **Presentation Tier**: React Frontend (Port 3002) with TailwindCSS styling, Vite dev server
2. **Application Tier**: FastAPI Backend (Port 8000) with Pydantic models and business logic
3. **AI/Data Tier**: Google Gemini API and localStorage for persistence

**Data Flow**:
- Frontend → Backend: Axios HTTP requests
- Frontend → Storage: Save/load story history
- Backend → AI: SDK calls to Gemini API

---

## 4. Complete Technology Stack Overview

**Overview**: Seven-layer architecture showing the complete technology stack from browser to cloud.

![Complete Technology Stack Overview](./Complete%20Technology%20Stack%20Overview.png)

**7 Layers**:
1. **Client Interface**: Web Browser (HTML5, CSS3, ES6+)
2. **Frontend Framework**: React 18.2, Vite 5.0, TailwindCSS 3.4
3. **State & Data Management**: React Hooks, localStorage, Axios
4. **API Gateway**: FastAPI
5. **Backend Services**: Uvicorn, Pydantic, Python Business Logic
6. **AI Integration**: Google Generative AI SDK
7. **Cloud AI Services**: Gemini 2.5 Flash LLM

---

## 5. Technology Stack

**Overview**: Detailed technology stack diagram showing all frameworks and libraries.

![Technology Stack](./Technology%20Stack.png)

**Frontend Stack**:
- React 18.2.0 (UI Framework)
- Vite 5.0.11 (Build Tool & HMR)
- TailwindCSS 3.4.1 (Utility-First CSS)
- Lucide React 0.294.0 (Icon Library)
- Axios 1.6.5 (HTTP Client)

**Backend Stack**:
- FastAPI (Modern Web Framework)
- Pydantic (Data Validation)
- Uvicorn (ASGI Server)
- google-generativeai (Gemini SDK)
- python-dotenv (Environment Config)

**AI Services**:
- Google Gemini 2.5 Flash (LLM)

---

## 6. Technology Dependencies Map

**Overview**: Package dependency relationships and version numbers.

![Technology Dependencies Map](./Technology%20Dependencies%20Map.png)

**Frontend Dependencies** (via npm):
- react: ^18.2.0
- react-dom: ^18.2.0
- vite: ^5.0.11
- tailwindcss: ^3.4.1
- lucide-react: ^0.294.0
- axios: ^1.6.5

**Backend Dependencies** (via pip):
- fastapi
- uvicorn
- pydantic
- google-generativeai
- python-dotenv

**Dependency Relationships**:
- React depends on react-dom
- Vite serves as build tool for React
- FastAPI uses Pydantic for validation
- FastAPI runs on Uvicorn ASGI server

---

## 7. Network Communication & Ports

**Overview**: Network architecture showing ports and communication protocols.

![Network Communication & Ports](./Network%20Communication%20&%20Ports.png)

**Network Configuration**:
- **Frontend Server**: localhost:3002 (HTTP) - Vite Dev Server
- **Backend Server**: localhost:8000 (HTTP) - FastAPI Server
- **Cloud API**: generativelanguage.googleapis.com (HTTPS/443) - Gemini API

**Communication Flow**:
1. User → Frontend: HTTP GET (serves React app)
2. Frontend → Backend: HTTP POST/GET (Axios requests, JSON data)
3. Backend → Gemini: HTTPS POST (API key authentication, JSON payload)
4. Gemini → Backend: JSON response (story data)
5. Backend → Frontend: JSON response (complete story)

---

## 8. Component Architecture

**Overview**: React component tree and data flow through props.

![Component Architecture](./Component%20Architecture.png)

**Component Hierarchy**:
```
main.jsx
└── ErrorBoundary
    └── App.jsx
        ├── SplashScreen
        ├── StoryHistory
        ├── StoryInput
        ├── ShowcaseMode
        ├── SceneViewer
        ├── CharacterCard
        ├── Storyboard
        └── ExportStory
```

**Props Flow**:
- `StoryInput` → `onGenerate` → App.jsx
- `ShowcaseMode` → `story, onGenerate` → App.jsx
- `StoryHistory` → `onLoadStory` → App.jsx
- `SceneViewer` ← `scenes` ← App.jsx
- `CharacterCard` ← `characters` ← App.jsx
- `Storyboard` ← `storyboard` ← App.jsx
- `ExportStory` ← `story` ← App.jsx

---

## 9. Detailed Data Flow

**Overview**: Complete user journey from splash screen to story export.

![Detailed Data Flow](./Detailed%20Data%20Flow.png)

**Sequence Flow**:
1. **User Opens Application** → SplashScreen renders with animations (15s)
2. **Click "Start Creating Stories"** → Main app loads
3. **Enter Story Concept** → StoryInput form
4. **Select Quick Start Template** → Auto-fills form, scrolls to top
5. **Click "Generate Story"** → POST request to `/generate-story`
6. **6-Stage AI Pipeline**:
   - Stage 1: Analyze concept → Narrative ideas
   - Stage 2: Story structure → Title, logline, themes
   - Stage 3: Characters → Character profiles
   - Stage 4: Scenes → Scene descriptions with dialogue
   - Stage 5: Storyboard → Camera specs, shots
   - Stage 6: Visuals → Illustration prompts
7. **Backend Returns JSON** → Complete story data
8. **Save to localStorage** → History persistence
9. **Render Components** → SceneViewer, Characters, Storyboard
10. **Export Story** → Download JSON/Markdown/Text

---

## 10. State Management Flow

**Overview**: Application state transitions and user navigation flows.

![State Management Flow](./State%20Management%20Flow.png)

**State Diagram**:
- **Initial State**: SplashScreen
- **Main States**:
  - InputMode (default)
  - Loading (generation in progress)
  - StoryDisplay (story rendered)
  - ShowcasePresentation (auto-play mode)
  - ErrorState (API failure)
  - HistoryPanel (view past stories)
  - ExportState (download story)

**Transitions**:
- SplashScreen → MainApp (click Start or 15s timeout)
- InputMode → Loading (submit request)
- Loading → StoryDisplay (success) or ErrorState (failure)
- StoryDisplay ↔ ShowcasePresentation (toggle mode)
- MainApp ↔ HistoryPanel (open/close history)
- ErrorState → InputMode (retry)

---

## 11. Backend API Architecture

**Overview**: FastAPI application structure and service layers.

![Backend API Architecture](./Backend%20API%20Architecture.png)

**API Endpoints**:
- `GET /health` - Health check endpoint
- `POST /generate-story` - Story generation endpoint

**Services Layer**:
- **GeminiAgent** (gemini_agent.py) - Gemini API integration
- **PromptEngine** (prompts.py) - Prompt engineering and templates
- **CinematicProcessor** (cinematic_features.py) - Film processing logic
- **ImageGenerator** (image_generator.py) - Image prompt generation

**Data Models** (Pydantic):
- StoryRequest - Input validation model
- StoryResponse - Output data model
- Character - Character data structure
- Scene - Scene data structure
- StoryboardEntry - Storyboard shot structure

**External Integration**:
- Google Gemini API (gemini-2.5-flash) via SDK

---

## 12. Deployment Architecture

**Overview**: Development and production deployment configurations.

![Deployment Architecture](./Deployment%20Architecture.png)

**Development Environment**:
- **Frontend**: `npm run dev` - Vite dev server on Port 3002
- **Backend**: `python main.py` - Uvicorn on Port 8000

**Production Ready**:
- **Frontend Build**: `npm run build` → Optimized bundle → `dist/` static files
- **Backend Deploy**: FastAPI on Uvicorn/Gunicorn
- **Static Hosting**: Nginx or CDN serves frontend
- **Backend Hosting**: Cloud server or container

**External Services**:
- **Google Cloud**: Gemini API via HTTPS

---

## 13. Security & Error Handling

**Overview**: Security layers and error recovery mechanisms.

![Security & Error Handling](./Security%20&%20Error%20Handling.png)

**Frontend Protection**:
- **ErrorBoundary**: React error boundary wraps entire app
- **Form Validation**: Required fields, input sanitization
- **Input Sanitization**: Trim and escape user input

**Backend Protection**:
- **CORS Middleware**: Cross-origin request handling
- **Pydantic Validation**: Type safety and data validation
- **Rate Limiting**: (Future implementation)

**API Protection**:
- **Environment Variables**: API keys stored securely
- **Token Limits**: 16,384 token max output
- **Authentication**: API key authentication for Gemini

**Error Recovery**:
- **Retry Logic**: User-initiated retry on failure
- **Graceful Degradation**: Show user-friendly error messages
- **Error Logging**: Console logging (dev) / Service logging (prod)

**Error Flow**:
- Frontend validation → Backend validation → API protection
- Error caught → Fallback UI → Retry option → Logged

---

## 14. Feature Flow Map

**Overview**: User journeys mapped to core platform features.

![Feature Flow Map](./Feature%20Flow%20Map.png)

**User Journeys**:
1. **Quick Demo** (🏆 Award-Winning) → One-click generation
2. **Custom Story** (✍️ User Input) → Manual story creation
3. **Template** (📝 Quick Start) → Pre-filled templates
4. **History** (📚 Previous Stories) → Load saved stories
5. **Showcase** (🎬 Presentation) → Auto-play presentation mode

**Core Features**:
- **Story Input**: Form and templates
- **AI Generation**: Gemini 2.5 Flash processing
- **Display Results**: Characters, Scenes, Storyboard
- **Export Data**: JSON/Markdown/Text downloads
- **Save History**: localStorage persistence

**Feature Connections**:
- All journeys lead to appropriate features
- Features interconnect for complete workflow
- Export and Showcase extend Display Results
- History connects back to Display

---

## Architecture Summary

### Key Strengths

✅ **Separation of Concerns**
- Frontend: React components isolated
- Backend: API, services, models separated
- Clear data flow through props and state

✅ **Error Resilience**
- ErrorBoundary wraps entire application
- API error handling with user feedback
- Graceful degradation on failures

✅ **Performance**
- Vite for fast HMR and optimized builds
- React 18 concurrent features
- Efficient bundle size

✅ **Scalability**
- Modular component design
- RESTful API architecture
- Environment-based configuration

✅ **User Experience**
- 6-stage loading feedback
- localStorage persistence
- Smooth animations
- Responsive design

### Technology Highlights

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend** | React 18.2 | Component-based UI |
| **Build** | Vite 5.0 | Fast development & builds |
| **Styling** | TailwindCSS 3.4 | Utility-first CSS |
| **HTTP** | Axios 1.6 | API communication |
| **Backend** | FastAPI | Modern Python web framework |
| **Server** | Uvicorn | ASGI server |
| **Validation** | Pydantic | Type safety |
| **AI** | Gemini 2.5 Flash | Story generation |
| **Storage** | localStorage | Browser persistence |

---

**Production Ready for Google Gemini Live Agent Challenge 2026** 🚀

For interactive mermaid diagrams, see [ARCHITECTURE_DIAGRAM.md](../ARCHITECTURE_DIAGRAM.md)
