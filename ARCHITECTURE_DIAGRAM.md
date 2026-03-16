# StoryWeaver AI - System Architecture Diagram

## Technology Stack Architecture (High-Level)

```mermaid
graph TB
    subgraph "Client Layer - Browser"
        BROWSER[🌐 Web Browser<br/>Chrome/Firefox/Edge/Safari]
    end
    
    subgraph "Frontend Layer - JavaScript/React Ecosystem"
        subgraph "UI Framework"
            REACT[⚛️ React 18.2.0<br/>Component-Based UI]
            HOOKS[React Hooks<br/>useState, useEffect, useRef]
        end
        
        subgraph "Build Tools"
            VITE[⚡ Vite 5.0.11<br/>Fast Build & HMR]
            NPM[📦 npm<br/>Package Manager]
        end
        
        subgraph "Styling & UI"
            TAILWIND[🎨 TailwindCSS 3.4.1<br/>Utility-First CSS]
            LUCIDE[🎭 Lucide React 0.294.0<br/>Icon Library]
        end
        
        subgraph "HTTP Communication"
            AXIOS[📡 Axios 1.6.5<br/>HTTP Client]
        end
        
        subgraph "Browser APIs"
            LOCALSTORAGE[💾 localStorage API<br/>Client-Side Storage]
        end
    end
    
    subgraph "Backend Layer - Python Ecosystem"
        subgraph "Web Framework"
            FASTAPI[⚡ FastAPI<br/>Modern Python Web Framework]
            UVICORN[🦄 Uvicorn<br/>ASGI Server]
        end
        
        subgraph "Data Validation"
            PYDANTIC[✅ Pydantic<br/>Data Validation & Serialization]
        end
        
        subgraph "AI Integration"
            GOOGLE_SDK[🤖 google-generativeai<br/>Python SDK for Gemini]
        end
        
        subgraph "Environment"
            PYTHON[🐍 Python 3.9+<br/>Runtime Environment]
            DOTENV[🔐 python-dotenv<br/>Environment Variables]
        end
    end
    
    subgraph "AI Services - Google Cloud"
        GEMINI[🧠 Google Gemini 2.5 Flash<br/>Large Language Model<br/>16,384 Token Output<br/>JSON Mode Support]
    end
    
    subgraph "Development Tools"
        VSCODE[💻 VS Code<br/>IDE]
        GIT[📚 Git<br/>Version Control]
    end
    
    %% Connections
    BROWSER -->|HTTP/HTTPS| REACT
    REACT --> HOOKS
    REACT --> TAILWIND
    REACT --> LUCIDE
    REACT --> AXIOS
    
    VITE -->|Builds & Serves| REACT
    NPM -->|Manages| REACT
    
    REACT <-->|Read/Write| LOCALSTORAGE
    
    AXIOS -->|REST API Calls<br/>Port 3002 → 8000| FASTAPI
    
    FASTAPI --> UVICORN
    FASTAPI --> PYDANTIC
    FASTAPI --> GOOGLE_SDK
    
    PYTHON -->|Runtime| FASTAPI
    DOTENV -->|Config| FASTAPI
    
    GOOGLE_SDK <-->|HTTPS API Calls| GEMINI
    
    VSCODE -.->|Development| REACT
    VSCODE -.->|Development| FASTAPI
    GIT -.->|Version Control| VSCODE
    
    %% Styling
    style BROWSER fill:#3b82f6,stroke:#1e40af
    style REACT fill:#61dafb,stroke:#0088cc,color:#000
    style VITE fill:#646cff,stroke:#4338ca
    style TAILWIND fill:#06b6d4,stroke:#0891b2
    style FASTAPI fill:#009688,stroke:#00695c
    style PYTHON fill:#3776ab,stroke:#1e3a8a
    style GEMINI fill:#10b981,stroke:#059669
    style LOCALSTORAGE fill:#f59e0b,stroke:#d97706
```

## Simplified 3-Tier Architecture

```mermaid
graph LR
    subgraph "Presentation Tier"
        A1[React Frontend<br/>Port 3002]
        A2[TailwindCSS Styling]
        A3[Vite Dev Server]
    end
    
    subgraph "Application Tier"
        B1[FastAPI Backend<br/>Port 8000]
        B2[Pydantic Models]
        B3[Business Logic]
    end
    
    subgraph "AI/Data Tier"
        C1[Google Gemini API]
        C2[localStorage]
    end
    
    A1 -->|Axios HTTP| B1
    A1 -->|Save/Load| C2
    B1 -->|SDK Calls| C1
    
    A2 -.->|Styles| A1
    A3 -.->|Serves| A1
    B2 -.->|Validates| B1
    B3 -.->|Processes| B1
```

## Complete Technology Stack Overview

```mermaid
graph TB
    subgraph "Layer 1: Client Interface"
        L1[Web Browser<br/>HTML5 + CSS3 + JavaScript ES6+]
    end
    
    subgraph "Layer 2: Frontend Framework"
        L2A[React 18.2]
        L2B[Vite 5.0]
        L2C[TailwindCSS 3.4]
    end
    
    subgraph "Layer 3: State & Data Management"
        L3A[React Hooks<br/>useState/useEffect/useRef]
        L3B[localStorage API]
        L3C[Axios HTTP Client]
    end
    
    subgraph "Layer 4: API Gateway"
        L4[FastAPI<br/>Python Web Framework]
    end
    
    subgraph "Layer 5: Backend Services"
        L5A[Uvicorn ASGI Server]
        L5B[Pydantic Validation]
        L5C[Python Business Logic]
    end
    
    subgraph "Layer 6: AI Integration"
        L6[Google Generative AI SDK<br/>Python Client Library]
    end
    
    subgraph "Layer 7: Cloud AI Services"
        L7[Google Gemini 2.5 Flash<br/>LLM API Service]
    end
    
    L1 --> L2A & L2B & L2C
    L2A & L2B & L2C --> L3A & L3B & L3C
    L3C -->|REST API| L4
    L4 --> L5A & L5B & L5C
    L5A & L5B & L5C --> L6
    L6 -->|HTTPS| L7
    
    style L1 fill:#3b82f6
    style L2A fill:#61dafb,color:#000
    style L2B fill:#646cff
    style L2C fill:#06b6d4
    style L4 fill:#009688
    style L7 fill:#10b981
    
    classDef frontend fill:#e0f2fe
    classDef backend fill:#fef3c7
    classDef ai fill:#d1fae5
    
    class L1,L2A,L2B,L2C,L3A,L3B,L3C frontend
    class L4,L5A,L5B,L5C,L6 backend
    class L7 ai
```

## Technology Dependencies Map

```mermaid
graph TB
    subgraph "Frontend Dependencies"
        REACT_PKG["react: ^18.2.0"]
        REACTDOM["react-dom: ^18.2.0"]
        VITE_PKG["vite: ^5.0.11"]
        TAIL_PKG["tailwindcss: ^3.4.1"]
        LUCIDE_PKG["lucide-react: ^0.294.0"]
        AXIOS_PKG["axios: ^1.6.5"]
    end
    
    subgraph "Backend Dependencies"
        FASTAPI_PKG["fastapi"]
        UVICORN_PKG["uvicorn"]
        PYDANTIC_PKG["pydantic"]
        GOOGLE_PKG["google-generativeai"]
        DOTENV_PKG["python-dotenv"]
    end
    
    subgraph "Package Managers"
        NPM_MGR["npm (Frontend)"]
        PIP_MGR["pip (Backend)"]
    end
    
    NPM_MGR --> REACT_PKG
    NPM_MGR --> REACTDOM
    NPM_MGR --> VITE_PKG
    NPM_MGR --> TAIL_PKG
    NPM_MGR --> LUCIDE_PKG
    NPM_MGR --> AXIOS_PKG
    
    PIP_MGR --> FASTAPI_PKG
    PIP_MGR --> UVICORN_PKG
    PIP_MGR --> PYDANTIC_PKG
    PIP_MGR --> GOOGLE_PKG
    PIP_MGR --> DOTENV_PKG
    
    REACT_PKG -.->|Depends on| REACTDOM
    VITE_PKG -.->|Build Tool for| REACT_PKG
    FASTAPI_PKG -.->|Uses| PYDANTIC_PKG
    FASTAPI_PKG -.->|Runs on| UVICORN_PKG
```

## Network Communication & Ports

```mermaid
graph LR
    subgraph "Development Environment"
        USER[👤 Developer/User<br/>Browser]
        
        subgraph "Frontend Server"
            FE[Vite Dev Server<br/>localhost:3002<br/>HTTP]
        end
        
        subgraph "Backend Server"
            BE[FastAPI Server<br/>localhost:8000<br/>HTTP]
        end
        
        subgraph "External Cloud"
            CLOUD[Google Gemini API<br/>generativelanguage.googleapis.com<br/>HTTPS/443]
        end
    end
    
    USER -->|HTTP GET| FE
    FE -->|Serves React App| USER
    
    USER -->|HTTP POST/GET<br/>Axios Requests| BE
    BE -->|JSON Response| USER
    
    BE -->|HTTPS POST<br/>API Key Auth<br/>JSON Payload| CLOUD
    CLOUD -->|JSON Response<br/>Story Data| BE
    
    style USER fill:#8b5cf6
    style FE fill:#3b82f6
    style BE fill:#f59e0b
    style CLOUD fill:#10b981
```

## Technology Feature Matrix

| Technology | Purpose | Version | Key Features Used |
|------------|---------|---------|-------------------|
| **React** | UI Framework | 18.2.0 | Hooks, Virtual DOM, Component Lifecycle |
| **Vite** | Build Tool | 5.0.11 | HMR, Fast Builds, ES Modules |
| **TailwindCSS** | Styling | 3.4.1 | Utility Classes, Custom Animations |
| **Lucide React** | Icons | 0.294.0 | Tree-shakable Icons, Customizable |
| **Axios** | HTTP Client | 1.6.5 | Promise-based, Interceptors, Error Handling |
| **FastAPI** | Web Framework | Latest | Auto Docs, Async, Type Hints |
| **Uvicorn** | ASGI Server | Latest | Fast, ASGI3 Compatible |
| **Pydantic** | Validation | Latest | Type Validation, JSON Schema |
| **google-generativeai** | AI SDK | Latest | Gemini Integration, Streaming |
| **Gemini 2.5 Flash** | LLM | Latest | 16K Tokens, JSON Mode, Fast |

## High-Level Architecture

```mermaid
graph TB
    subgraph "User Layer"
        USER[👤 User/Judge]
    end
    
    subgraph "Frontend - React 18.2 + Vite"
        SPLASH[🎬 SplashScreen<br/>Cinematic Welcome]
        APP[⚛️ App.jsx<br/>Main Controller]
        
        subgraph "Input Components"
            INPUT[📝 StoryInput<br/>Form & Templates]
            SHOWCASE[🎯 ShowcaseMode<br/>Demo & Presentation]
        end
        
        subgraph "Display Components"
            SCENES[🎬 SceneViewer<br/>Cinematic Scenes]
            CHARS[👥 CharacterCard<br/>Character Profiles]
            STORY[🎞️ Storyboard<br/>Production Board]
        end
        
        subgraph "Utility Components"
            EXPORT[💾 ExportStory<br/>JSON/MD/TXT]
            HISTORY[📚 StoryHistory<br/>localStorage]
            ERROR[🛡️ ErrorBoundary<br/>Error Handler]
        end
        
        STORAGE[(🗄️ localStorage<br/>Browser Storage)]
    end
    
    subgraph "Backend - FastAPI (Python)"
        API[🔌 FastAPI Server<br/>Port 8000]
        
        subgraph "Core Modules"
            MAIN[main.py<br/>API Routes]
            MODELS[models.py<br/>Pydantic Models]
        end
        
        subgraph "AI Processing"
            AGENT[gemini_agent.py<br/>Gemini Integration]
            PROMPTS[prompts.py<br/>Prompt Engineering]
            CINE[cinematic_features.py<br/>Film Processing]
            IMG[image_generator.py<br/>Image Prompts]
        end
    end
    
    subgraph "Google AI"
        GEMINI[🤖 Gemini 2.5 Flash<br/>16,384 Tokens<br/>JSON Mode]
    end
    
    subgraph "Documentation"
        DOCS[📚 16 Documentation Files<br/>docs/ folder]
    end
    
    USER -->|Visits| SPLASH
    SPLASH -->|Start| APP
    
    APP --> INPUT
    APP --> SHOWCASE
    APP --> SCENES
    APP --> CHARS
    APP --> STORY
    APP --> EXPORT
    APP --> HISTORY
    ERROR -.->|Wraps| APP
    
    INPUT -->|Generate Request| API
    SHOWCASE -->|Demo Request| API
    
    HISTORY <-->|Save/Load| STORAGE
    EXPORT -->|Download| USER
    
    API --> MAIN
    MAIN --> AGENT
    AGENT --> PROMPTS
    AGENT --> CINE
    AGENT --> IMG
    MAIN --> MODELS
    
    AGENT <-->|API Call| GEMINI
    
    GEMINI -->|Story JSON| AGENT
    AGENT -->|Response| API
    API -->|Story Data| APP
    
    APP -->|Display| SCENES
    APP -->|Display| CHARS
    APP -->|Display| STORY
    
    DOCS -.->|Reference| USER
    
    style USER fill:#8b5cf6
    style SPLASH fill:#ec4899
    style APP fill:#3b82f6
    style GEMINI fill:#10b981
    style API fill:#f59e0b
    style STORAGE fill:#6366f1
    style ERROR fill:#ef4444
```

## Detailed Data Flow

```mermaid
sequenceDiagram
    actor User
    participant Splash as SplashScreen
    participant App as App.jsx
    participant Input as StoryInput
    participant API as FastAPI
    participant Gemini as Gemini 2.5 Flash
    participant Storage as localStorage
    participant Display as SceneViewer/Characters/Storyboard
    
    User->>Splash: Opens Application
    Splash->>Splash: Show animations (15s)
    Splash->>App: Click "Start Creating Stories"
    
    App->>Input: Render Input Form
    User->>Input: Enter story concept
    User->>Input: Select Quick Start Template
    Input->>Input: Load template + scroll to top
    User->>Input: Click "Generate Story"
    
    Input->>App: Submit request data
    App->>App: Set loading state
    App->>API: POST /generate-story
    
    Note over API,Gemini: 6-Stage Generation Pipeline
    
    API->>Gemini: Stage 1: Analyze concept
    Gemini-->>API: Narrative ideas
    
    API->>Gemini: Stage 2: Story structure
    Gemini-->>API: Title, logline, themes
    
    API->>Gemini: Stage 3: Characters
    Gemini-->>API: Character profiles
    
    API->>Gemini: Stage 4: Scenes
    Gemini-->>API: Scene descriptions
    
    API->>Gemini: Stage 5: Storyboard
    Gemini-->>API: Camera specs, shots
    
    API->>Gemini: Stage 6: Visuals
    Gemini-->>API: Illustration prompts
    
    API-->>App: Complete story JSON
    
    App->>Storage: Save to history
    App->>Display: Render story
    
    Display->>User: Show Characters
    Display->>User: Show Scenes
    Display->>User: Show Storyboard
    
    User->>Display: Explore content
    User->>App: Click Export
    App->>User: Download JSON/MD/TXT
```

## Component Architecture

```mermaid
graph LR
    subgraph "React Component Tree"
        MAIN[main.jsx]
        EB[ErrorBoundary]
        APP[App.jsx]
        
        subgraph "Core Features"
            SPLASH[SplashScreen]
            HIST[StoryHistory]
            INPUT[StoryInput]
            SHOW[ShowcaseMode]
        end
        
        subgraph "Display Layer"
            SCENE[SceneViewer]
            CHAR[CharacterCard]
            BOARD[Storyboard]
            EXP[ExportStory]
        end
    end
    
    MAIN --> EB
    EB --> APP
    
    APP --> SPLASH
    APP --> HIST
    APP --> INPUT
    APP --> SHOW
    APP --> SCENE
    APP --> CHAR
    APP --> BOARD
    APP --> EXP
    
    INPUT -.->|Props: onGenerate| APP
    SHOW -.->|Props: story, onGenerate| APP
    HIST -.->|Props: onLoadStory| APP
    SCENE -.->|Props: scenes| APP
    CHAR -.->|Props: characters| APP
    BOARD -.->|Props: storyboard| APP
    EXP -.->|Props: story| APP
```

## Backend API Architecture

```mermaid
graph TB
    subgraph "FastAPI Application"
        FAST[FastAPI App<br/>main.py]
        
        subgraph "Endpoints"
            HEALTH[GET /health]
            GEN[POST /generate-story]
        end
        
        subgraph "Services"
            GEMINI_SVC[GeminiAgent<br/>gemini_agent.py]
            PROMPT_SVC[PromptEngine<br/>prompts.py]
            CINE_SVC[CinematicProcessor<br/>cinematic_features.py]
            IMG_SVC[ImageGenerator<br/>image_generator.py]
        end
        
        subgraph "Models"
            REQ[StoryRequest]
            RES[StoryResponse]
            CHAR_M[Character]
            SCENE_M[Scene]
            BOARD_M[StoryboardEntry]
        end
    end
    
    subgraph "External APIs"
        GEMINI_API[Google Gemini API<br/>gemini-2.5-flash]
    end
    
    FAST --> HEALTH
    FAST --> GEN
    
    GEN --> REQ
    GEN --> GEMINI_SVC
    
    GEMINI_SVC --> PROMPT_SVC
    GEMINI_SVC --> CINE_SVC
    GEMINI_SVC --> IMG_SVC
    GEMINI_SVC --> GEMINI_API
    
    GEMINI_SVC --> CHAR_M
    GEMINI_SVC --> SCENE_M
    GEMINI_SVC --> BOARD_M
    
    GEMINI_SVC --> RES
    RES --> GEN
```

## State Management Flow

```mermaid
stateDiagram-v2
    [*] --> SplashScreen
    SplashScreen --> MainApp: Click Start / 15s timeout
    
    MainApp --> InputMode: Default
    InputMode --> Loading: Submit Story Request
    Loading --> StoryDisplay: API Success
    Loading --> ErrorState: API Failure
    
    StoryDisplay --> ShowcasePresentation: Enable Showcase
    ShowcasePresentation --> StoryDisplay: Disable Showcase
    
    StoryDisplay --> EditMode: New Story
    EditMode --> InputMode: Clear
    
    StoryDisplay --> ExportState: Export
    ExportState --> StoryDisplay: Complete
    
    MainApp --> HistoryPanel: Open History
    HistoryPanel --> StoryDisplay: Load Story
    HistoryPanel --> MainApp: Close
    
    ErrorState --> InputMode: Retry
    ErrorState --> MainApp: Go Home
```

## Technology Stack

```mermaid
graph TB
    subgraph "Frontend Stack"
        REACT[React 18.2.0<br/>UI Framework]
        VITE[Vite 5.0.11<br/>Build Tool]
        TAIL[TailwindCSS 3.4.1<br/>Styling]
        LUCIDE[Lucide React 0.294.0<br/>Icons]
        AXIOS[Axios 1.6.5<br/>HTTP Client]
    end
    
    subgraph "Backend Stack"
        FASTAPI[FastAPI<br/>Web Framework]
        PYDANTIC[Pydantic<br/>Validation]
        UVICORN[Uvicorn<br/>ASGI Server]
        GOOGLE[google-generativeai<br/>Gemini SDK]
    end
    
    subgraph "AI Services"
        GEMINI25[Gemini 2.5 Flash<br/>LLM Model]
    end
    
    subgraph "Storage"
        LOCAL[localStorage<br/>Browser Storage]
    end
    
    REACT --> VITE
    REACT --> TAIL
    REACT --> LUCIDE
    REACT --> AXIOS
    
    AXIOS -->|HTTP| FASTAPI
    
    FASTAPI --> PYDANTIC
    FASTAPI --> UVICORN
    FASTAPI --> GOOGLE
    
    GOOGLE -->|API| GEMINI25
    
    REACT -->|Save/Load| LOCAL
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        DEV_FE[Frontend<br/>npm run dev<br/>Port 3002]
        DEV_BE[Backend<br/>python main.py<br/>Port 8000]
    end
    
    subgraph "Production Ready"
        BUILD[npm run build<br/>Optimized Bundle]
        STATIC[Static Files<br/>dist/]
        DEPLOY_BE[FastAPI Server<br/>Uvicorn/Gunicorn]
    end
    
    subgraph "External Services"
        GEMINI_CLOUD[Google Cloud<br/>Gemini API]
    end
    
    DEV_FE -->|Build| BUILD
    BUILD --> STATIC
    
    DEV_BE --> DEPLOY_BE
    
    DEPLOY_BE <-->|HTTPS| GEMINI_CLOUD
    
    STATIC -.->|Serve| NGINX[Nginx/CDN]
```

## Security & Error Handling

```mermaid
graph TB
    subgraph "Frontend Protection"
        EB[ErrorBoundary<br/>React Error Boundary]
        VAL[Form Validation<br/>Required Fields]
        SANITIZE[Input Sanitization<br/>Trim/Escape]
    end
    
    subgraph "Backend Protection"
        CORS[CORS Middleware<br/>Cross-Origin]
        VALID[Pydantic Validation<br/>Type Safety]
        RATELIMIT[Rate Limiting<br/>Future]
    end
    
    subgraph "API Protection"
        ENV[Environment Variables<br/>API Keys]
        QUOTA[Token Limits<br/>16,384 max]
    end
    
    subgraph "Error Recovery"
        RETRY[Retry Logic<br/>User Action]
        FALLBACK[Graceful Degradation<br/>Show Errors]
        LOG[Error Logging<br/>Console/Service]
    end
    
    EB --> FALLBACK
    VAL --> SANITIZE
    SANITIZE --> VALID
    
    CORS --> VALID
    VALID --> ENV
    
    ENV --> QUOTA
    
    FALLBACK --> RETRY
    RETRY --> LOG
```

## Feature Flow Map

```mermaid
graph LR
    subgraph "User Journeys"
        J1[Quick Demo<br/>🏆 Award-Winning]
        J2[Custom Story<br/>✍️ User Input]
        J3[Template<br/>📝 Quick Start]
        J4[History<br/>📚 Previous Stories]
        J5[Showcase<br/>🎬 Presentation]
    end
    
    subgraph "Core Features"
        INPUT[Story Input]
        GEN[AI Generation]
        DISPLAY[Display Results]
        EXPORT[Export Data]
        SAVE[Save History]
    end
    
    J1 -->|One Click| GEN
    J2 --> INPUT
    J3 --> INPUT
    J4 --> SAVE
    J5 --> DISPLAY
    
    INPUT --> GEN
    GEN --> DISPLAY
    GEN --> SAVE
    DISPLAY --> EXPORT
    DISPLAY --> J5
    
    SAVE --> J4
```

---

## Key Architecture Highlights

### ✅ Strengths

1. **Separation of Concerns**
   - Frontend: React components isolated
   - Backend: API, services, models separated
   - Clear data flow through props/state

2. **Error Resilience**
   - ErrorBoundary wraps entire app
   - API error handling with user feedback
   - Graceful degradation

3. **Performance**
   - Vite for fast HMR
   - React 18 concurrent features
   - Optimized bundle size

4. **Scalability**
   - Modular component design
   - RESTful API architecture
   - Environment-based configuration

5. **User Experience**
   - 6-stage loading feedback
   - localStorage persistence
   - Smooth animations
   - Responsive design

### 🎯 Data Flow Summary

```
User Input → StoryInput → App.jsx → FastAPI → Gemini 2.5 Flash
                                                    ↓
User Display ← SceneViewer ← App.jsx ← FastAPI ← JSON Response
         ↓
   localStorage (History)
```

---

**Ready for Google Gemini Live Agent Challenge 2026** 🚀
