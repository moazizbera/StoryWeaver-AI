import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoryInput from './components/StoryInput';
import SceneViewer from './components/SceneViewer';
import CharacterCard from './components/CharacterCard';
import Storyboard from './components/Storyboard';
import ExportStory from './components/ExportStory';
import ShowcaseMode from './components/ShowcaseMode';
import StoryHistory, { saveStoryToHistory } from './components/StoryHistory';
import SplashScreen, { shouldShowSplash } from './components/SplashScreen';
import { Book, AlertCircle, Sparkles, Film, Users, Clapperboard, Palette, Presentation, Edit3, Zap } from 'lucide-react';
import INSTANT_DEMO_STORY from './data/demoStory';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingStage, setLoadingStage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);
  const [showcaseMode, setShowcaseMode] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  // Scroll to section helper
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Load story from history
  const handleLoadStoryFromHistory = (storyData) => {
    setStory(storyData);
    setError(null);
    setPresentationMode(false);
    setShowcaseMode(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ⚡ INSTANT DEMO - Load pre-generated story (no API call)
  const handleLoadInstantDemo = async () => {
    setLoading(true);
    setError(null);
    setStory(null);

    // Simulate quick loading animation for UX
    setLoadingStage('⚡ Loading instant demo story...');
    setLoadingProgress(30);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setLoadingProgress(70);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setLoadingProgress(100);
    setLoadingStage('✨ Demo story loaded!');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Load the pre-generated story
    setStory(INSTANT_DEMO_STORY);
    
    // Save to history
    saveStoryToHistory(INSTANT_DEMO_STORY);
    
    setLoadingStage('');
    setLoading(false);
    
    // Scroll to top after loading
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleGenerateStory = async (requestData) => {
    setLoading(true);
    setError(null);
    setStory(null);

    try {
      // Stage 1: Analyzing concept with Gemini
      setLoadingStage('🧠 Gemini analyzing your concept and expanding narrative ideas...');
      setLoadingProgress(10);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Stage 2: Building narrative structure
      setLoadingStage('📖 Gemini crafting story structure, themes, and emotional arcs...');
      setLoadingProgress(25);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Stage 3: Creating characters
      setLoadingStage('👥 Gemini developing characters with depth and visual descriptions...');
      setLoadingProgress(40);
      
      const response = await axios.post(`${API_URL}/generate-story`, requestData);
      
      // Stage 4: Generating scenes
      setLoadingStage('🎬 Gemini scripting cinematic scenes with dialogue and camera work...');
      setLoadingProgress(70);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Stage 5: Rendering visuals
      setLoadingStage('🎨 Gemini generating AI-ready illustration prompts and storyboard...');
      setLoadingProgress(85);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Stage 6: Finalizing
      setLoadingStage('✨ Gemini finalizing production-ready multimodal story package...');
      setLoadingProgress(95);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setStory(response.data);
      
      // Save to history
      saveStoryToHistory(response.data);
      
      setLoadingProgress(100);
      setLoadingStage('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate story. Please try again.');
      console.error('Story generation error:', err);
      setLoadingStage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onEnter={() => setShowSplash(false)} />
      )}

      {/* Main App */}
      {!showSplash && (
        <div className="min-h-screen p-4 md:p-8">
          {/* Story History */}
          <StoryHistory 
            onLoadStory={handleLoadStoryFromHistory}
            currentStory={story}
          />

          <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <header className="text-center mb-8 animate-fade-in relative">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Book className="w-10 h-10 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              StoryWeaver AI
            </h1>
          </div>
          <p className="text-purple-200 text-lg">
            Cinematic Multimodal Storytelling with Gemini 2.5 Flash
          </p>
          <p className="text-purple-300 text-sm mt-2">
            Google Gemini Live Agent Challenge 2026
          </p>
          
          {/* Quick Start Guide for Judges */}
          {showQuickStart && !story && !showcaseMode && (
            <div className="mt-6 max-w-3xl mx-auto glass-card p-5 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/50 animate-fade-in">
              <div className="flex items-start gap-3 text-left">
                <Zap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-blue-200">🎯 Quick Demo Guide for Judges</h3>
                    <button
                      onClick={() => setShowQuickStart(false)}
                      className="text-blue-300 hover:text-blue-100 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="bg-cyan-600/20 rounded-lg p-3 border border-cyan-500/30">
                      <div className="font-bold text-cyan-200 mb-1">⚡ Instant Demo (0.5s)</div>
                      <div className="text-cyan-300 text-xs">Pre-loaded story, zero wait - works offline! Perfect for quick demos.</div>
                    </div>
                    <div className="bg-amber-600/20 rounded-lg p-3 border border-amber-500/30">
                      <div className="font-bold text-amber-200 mb-1">🏆 AI Demo (30s)</div>
                      <div className="text-amber-300 text-xs">Live Gemini generation - shows real AI magic in action!</div>
                    </div>
                    <div className="bg-blue-600/20 rounded-lg p-3">
                      <div className="font-bold text-blue-200 mb-1">🎬 Showcase Mode</div>
                      <div className="text-blue-300 text-xs">Auto-play presentation with 6 demo stories</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Mode Toggles */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => {
                setShowcaseMode(!showcaseMode);
                setPresentationMode(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                showcaseMode
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                  : 'bg-white/10 text-purple-300 hover:bg-white/20'
              }`}
            >
              {showcaseMode ? (
                <>
                  <Zap className="w-4 h-4" />
                  Showcase Mode
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Enable Showcase
                </>
              )}
            </button>
            
            {story && !showcaseMode && (
              <>
                <button
                  onClick={() => setPresentationMode(!presentationMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    presentationMode
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/10 text-purple-300 hover:bg-white/20'
                  }`}
                >
                  {presentationMode ? (
                    <>
                      <Presentation className="w-4 h-4" />
                      Presentation Mode
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      Edit Mode
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setStory(null);
                    setPresentationMode(false);
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-purple-300 rounded-lg font-medium transition-all"
                >
                  New Story
                </button>
              </>
            )}
          </div>
        </header>

        {/* Showcase Mode or Normal Mode */}
        {showcaseMode ? (
          <ShowcaseMode 
            story={story}
            onGenerate={handleGenerateStory}
            onReset={() => {
              setStory(null);
              setPresentationMode(false);
            }}
            loading={loading}
          />
        ) : (
          /* Normal Mode Layout */
          <>
            {/* Adaptive Layout - Single column when story displayed */}
            <div className={`grid gap-6 ${!story || presentationMode ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
          {/* Input Column - Hide in presentation mode */}
          {(!presentationMode || !story) && (
            <div className={story && !presentationMode ? 'lg:col-span-1' : 'lg:col-span-1 max-w-2xl mx-auto w-full'}>
              <StoryInput onGenerate={handleGenerateStory} onLoadInstantDemo={handleLoadInstantDemo} loading={loading} />
            </div>
          )}

          {/* Story Output Column - Adaptive width */}
          <div className={story && !presentationMode ? 'lg:col-span-2 space-y-6' : 'lg:col-span-1 space-y-6'}>
            {/* Cinematic Loading State */}
            {loading && (
              <div className="glass-card p-12 text-center animate-fade-in overflow-hidden relative">
                {/* Animated Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-gradient-x" />
                
                <div className="relative z-10 flex flex-col items-center gap-8">
                  {/* Central Spinner */}
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-purple-500/20 border-t-purple-500 border-r-pink-500 rounded-full animate-spin" />
                    <div className="w-24 h-24 border-4 border-pink-500/20 border-b-pink-500 border-l-purple-500 rounded-full animate-spin-reverse absolute top-0 left-0" style={{ animationDuration: '2s' }} />
                    <Sparkles className="w-10 h-10 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  
                  {/* Title and Stage */}
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                      Creating Your Cinematic Story
                    </h3>
                    <p className="text-purple-300 font-medium text-lg animate-pulse">
                      {loadingStage}
                    </p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-md">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500 ease-out rounded-full animate-shimmer"
                        style={{ width: `${loadingProgress}%` }}
                      />
                    </div>
                    <p className="text-center text-sm text-purple-300 mt-2">{loadingProgress}%</p>
                  </div>
                  
                  {/* Enhanced Progress Indicators */}
                  <div className="grid grid-cols-3 gap-6 w-full max-w-lg mt-4">
                    <div className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-500 ${
                      loadingProgress >= 40 
                        ? 'bg-purple-600/20 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                        : 'bg-white/5 border-white/10'
                    }`}>
                      <Users className={`w-8 h-8 transition-all duration-500 ${
                        loadingProgress >= 40 ? 'text-purple-400 scale-110 animate-bounce' : 'text-purple-400/50'
                      }`} />
                      <span className={`text-xs font-medium ${
                        loadingProgress >= 40 ? 'text-purple-200' : 'text-purple-300/50'
                      }`}>Characters</span>
                      {loadingProgress >= 40 && (
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" />
                      )}
                    </div>
                    
                    <div className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-500 ${
                      loadingProgress >= 70 
                        ? 'bg-pink-600/20 border-pink-500/50 shadow-lg shadow-pink-500/20' 
                        : 'bg-white/5 border-white/10'
                    }`}>
                      <Film className={`w-8 h-8 transition-all duration-500 ${
                        loadingProgress >= 70 ? 'text-pink-400 scale-110 animate-bounce' : 'text-pink-400/50'
                      }`} style={{ animationDelay: '100ms' }} />
                      <span className={`text-xs font-medium ${
                        loadingProgress >= 70 ? 'text-pink-200' : 'text-pink-300/50'
                      }`}>Scenes</span>
                      {loadingProgress >= 70 && (
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '100ms' }} />
                      )}
                    </div>
                    
                    <div className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-500 ${
                      loadingProgress >= 85 
                        ? 'bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/20' 
                        : 'bg-white/5 border-white/10'
                    }`}>
                      <Clapperboard className={`w-8 h-8 transition-all duration-500 ${
                        loadingProgress >= 85 ? 'text-blue-400 scale-110 animate-bounce' : 'text-blue-400/50'
                      }`} style={{ animationDelay: '200ms' }} />
                      <span className={`text-xs font-medium ${
                        loadingProgress >= 85 ? 'text-blue-200' : 'text-blue-300/50'
                      }`}>Storyboard</span>
                      {loadingProgress >= 85 && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '200ms' }} />
                      )}
                    </div>
                  </div>
                  
                  {/* Fun Facts */}
                  <div className="mt-4 text-xs text-purple-300/70 italic">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Powered by Gemini 2.5 Flash - Generating your unique story...
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="glass-card p-6 border-red-500/50 bg-red-900/20 animate-fade-in">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-red-200 mb-1">Generation Failed</h3>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Story Content */}
            {story && !loading && (
              <>
                {/* Cinematic Story Header */}
                <div className="glass-card p-8 animate-scale-in bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/30 border-purple-500/30">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Film className="w-8 h-8 text-purple-400 animate-pulse" />
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                          {story.title}
                        </h2>
                      </div>
                      <p className="text-purple-100 italic text-xl leading-relaxed mb-4 pl-11">
                        "{story.logline}"
                      </p>
                    </div>
                  </div>
                  
                  {/* Tags and Metadata */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-bold text-white shadow-lg border border-purple-400/30">
                      🎬 {story.genre}
                    </span>
                    {story.themes?.map((theme, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-pink-600/40 backdrop-blur-sm rounded-full text-sm font-medium text-pink-100 border border-pink-400/30"
                      >
                        {theme}
                      </span>
                    ))}
                    {story.estimated_runtime && (
                      <span className="px-3 py-2 bg-blue-600/40 backdrop-blur-sm rounded-full text-sm font-medium text-blue-100 border border-blue-400/30 flex items-center gap-1">
                        <Film className="w-4 h-4" />
                        {story.estimated_runtime}
                      </span>
                    )}
                    {story.visual_style?.aspect_ratio && (
                      <span className="px-3 py-2 bg-purple-600/40 backdrop-blur-sm rounded-full text-sm font-medium text-purple-100 border border-purple-400/30">
                        📐 {story.visual_style.aspect_ratio}
                      </span>
                    )}
                  </div>
                  
                  {/* Enhanced Visual Style Showcase */}
                  {story.visual_style && (
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/20">
                      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette className="w-5 h-5 text-purple-400" />
                          <h4 className="text-sm font-bold text-purple-200">Art Style</h4>
                        </div>
                        <p className="text-white font-medium">{story.visual_style.art_style}</p>
                        {story.visual_style.color_grading && (
                          <p className="text-xs text-purple-200 mt-1">
                            🎨 {story.visual_style.color_grading}
                          </p>
                        )}
                      </div>
                      
                      {story.visual_style.cinematic_references && (
                        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
                          <div className="flex items-center gap-2 mb-2">
                            <Film className="w-5 h-5 text-blue-400" />
                            <h4 className="text-sm font-bold text-blue-200">Cinematic Reference</h4>
                          </div>
                          <p className="text-white font-medium">{story.visual_style.cinematic_references}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Section Navigation - Quick Jump for Demos */}
                <div id="story-top" className="glass-card p-4 animate-fade-in sticky top-4 z-40 bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-purple-900/80 backdrop-blur-lg border-purple-500/50">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-purple-200">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">Jump to:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => scrollToSection('characters-section')}
                        className="px-3 py-1.5 bg-purple-600/50 hover:bg-purple-600 text-white text-xs rounded-lg font-medium transition-all flex items-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5" />
                        Characters
                      </button>
                      <button
                        onClick={() => scrollToSection('scenes-section')}
                        className="px-3 py-1.5 bg-pink-600/50 hover:bg-pink-600 text-white text-xs rounded-lg font-medium transition-all flex items-center gap-1.5"
                      >
                        <Film className="w-3.5 h-3.5" />
                        Scenes
                      </button>
                      <button
                        onClick={() => scrollToSection('storyboard-section')}
                        className="px-3 py-1.5 bg-blue-600/50 hover:bg-blue-600 text-white text-xs rounded-lg font-medium transition-all flex items-center gap-1.5"
                      >
                        <Clapperboard className="w-3.5 h-3.5" />
                        Storyboard
                      </button>
                    </div>
                  </div>
                </div>

                {/* Demo Tips */}
                <div className="glass-card p-4 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border border-amber-500/30 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
                    <div className="text-sm">
                      <span className="font-bold text-amber-200">🎬 Pro Demo Tip:</span>
                      <span className="text-amber-300 ml-2">Use keyboard shortcuts: ←→ to navigate scenes, click character cards to expand, and scroll to explore the full cinematic package</span>
                    </div>
                  </div>
                </div>

                {/* Characters */}
                <div id="characters-section">
                  <CharacterCard characters={story.characters} />
                </div>

                {/* Scenes */}
                <div id="scenes-section">
                  <SceneViewer scenes={story.scenes} />
                </div>

                {/* Storyboard */}
                <div id="storyboard-section">
                  <Storyboard storyboard={story.storyboard} narration={story.narration} />
                </div>
                
                {/* Export */}
                <ExportStory story={story} />
              </>
            )}

            {/* Empty State */}
            {!story && !loading && !error && (
              <div className="glass-card p-12 text-center animate-fade-in">
                <Book className="w-16 h-16 text-purple-400/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Ready to Create Magic
                </h3>
                <p className="text-purple-300 mb-4">
                  Enter a story concept or choose a template to begin your cinematic journey
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-300">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>AI-Powered Narration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4" />
                    <span>Cinematic Scenes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clapperboard className="w-4 h-4" />
                    <span>Production Ready</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-purple-300 text-sm">
          <p>
            Powered by <span className="font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">Gemini 2.5 Flash</span> •
            Built for Google Gemini Live Agent Challenge
          </p>
        </footer>
          </>
        )}
      </div>
    </div>
    )}
    </>
  );
}

export default App;
