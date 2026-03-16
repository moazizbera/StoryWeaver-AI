import React from 'react';
import { Film, Palette, Camera, Image as ImageIcon, Sparkles, Volume2, ChevronLeft, ChevronRight, Maximize2, Play } from 'lucide-react';

export default function SceneViewer({ scenes }) {
  const [activeScene, setActiveScene] = React.useState(0);
  const [imageLoading, setImageLoading] = React.useState(true);
  const [transitionDirection, setTransitionDirection] = React.useState('right');
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  if (!scenes || scenes.length === 0) return null;

  const scene = scenes[activeScene];

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && activeScene > 0) {
        navigateScene(activeScene - 1, 'left');
      } else if (e.key === 'ArrowRight' && activeScene < scenes.length - 1) {
        navigateScene(activeScene + 1, 'right');
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeScene, scenes.length]);

  const navigateScene = (index, direction) => {
    setTransitionDirection(direction);
    setActiveScene(index);
    setImageLoading(true);
  };

  return (
    <div className="glass-card p-6 animate-fade-in border-2 border-pink-500/30">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Film className="w-6 h-6 text-white" />
          </div>
          2️⃣ Cinematic Scenes
        </h3>
        <div className="text-sm text-pink-300 bg-pink-600/20 px-3 py-1 rounded-full font-medium">
          Scene {activeScene + 1} of {scenes.length}
        </div>
      </div>

      {/* Enhanced Scene Navigation with Thumbnails */}
      <div className="relative mb-6">
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin">
          {scenes.map((s, idx) => (
            <button
              key={idx}
              onClick={() => navigateScene(idx, idx > activeScene ? 'right' : 'left')}
              className={`relative flex-shrink-0 transition-all duration-300 group ${
                activeScene === idx
                  ? 'scale-105'
                  : 'scale-95 opacity-60 hover:opacity-100 hover:scale-100'
              }`}
            >
              <div className={`w-32 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                activeScene === idx
                  ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                  : 'border-white/20 hover:border-purple-400/50'
              }`}>
                {s.image_url ? (
                  /* Show actual image thumbnail */
                  <img
                    src={s.image_url}
                    alt={`Scene ${s.scene_number}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient if image fails
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Gradient fallback (shows if no image or image fails) */}
                <div className={`w-full h-full bg-gradient-to-br from-purple-900/60 via-pink-900/60 to-indigo-900/60 flex items-center justify-center relative overflow-hidden ${s.image_url ? 'hidden' : ''}`}>
                  {/* Animated background */}
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]"></div>
                  <ImageIcon className="w-6 h-6 text-purple-300 relative z-10" />
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 px-2 py-1 text-xs font-bold text-center transition-all ${
                activeScene === idx
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-black/60 text-purple-200'
              }`}>
                Scene {s.scene_number}
              </div>
            </button>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => navigateScene(Math.max(0, activeScene - 1), 'left')}
          disabled={activeScene === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-purple-600/90 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-2 shadow-lg transition-all z-10"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={() => navigateScene(Math.min(scenes.length - 1, activeScene + 1), 'right')}
          disabled={activeScene === scenes.length - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-purple-600/90 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-2 shadow-lg transition-all z-10"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Active Scene Content with Cinematic Transition */}
      <div 
        key={activeScene}
        className={`space-y-6 ${
          transitionDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
        }`}
      >
        {/* Scene Image or Illustration Prompt */}
        {scene.image_url ? (
          /* Display actual generated image */
          <div className="relative overflow-hidden rounded-xl border-2 border-purple-500/30 shadow-2xl group">
            <img
              src={scene.image_url}
              alt={scene.title}
              className="w-full aspect-video object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
              onClick={() => setIsFullscreen(true)}
              onError={(e) => {
                console.error('Image failed to load:', scene.image_url);
                e.target.style.display = 'none';
              }}
            />
            
            {/* Image Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <ImageIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Click to view fullscreen</span>
                  </div>
                  {scene.illustration_prompt && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(scene.illustration_prompt);
                        alert('✅ Illustration prompt copied to clipboard!');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-all shadow-lg"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-white font-medium">Copy Prompt</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : scene.illustration_prompt ? (
          /* Fallback: Show illustration prompt if no image */
          <div className="relative overflow-hidden rounded-xl border-2 border-purple-500/30 shadow-2xl group">
            {/* Beautiful Gradient Placeholder */}
            <div className="w-full aspect-video bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative flex items-center justify-center p-8">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)]"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center max-w-3xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
                  <ImageIcon className="w-12 h-12 text-pink-300" />
                  <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
                </div>
                <h5 className="text-white font-bold text-xl mb-3">🎨 AI-Ready Illustration Prompt</h5>
                <p className="text-purple-100 text-sm leading-relaxed italic">
                  "{scene.illustration_prompt}"
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-purple-300">
                  <span className="px-3 py-1 bg-white/10 rounded-full">DALL-E 3</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full">Midjourney</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full">Stable Diffusion</span>
                </div>
              </div>
            </div>
            
            {/* Hover Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <ImageIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Copy prompt to generate image with AI</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(scene.illustration_prompt);
                      alert('✅ Illustration prompt copied to clipboard!');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-all shadow-lg"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-white font-medium">Copy Prompt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Scene Title and Metadata */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                  {scene.scene_number}
                </div>
                <h4 className="text-2xl font-bold text-white">
                  {scene.title}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2 ml-13">
                {scene.mood && (
                  <span className="px-3 py-1 bg-purple-600/50 text-purple-100 rounded-full text-sm font-medium border border-purple-400/30">
                    {scene.mood}
                  </span>
                )}
                {scene.camera_angle && (
                  <span className="px-3 py-1 bg-blue-600/50 text-blue-100 rounded-full text-sm font-medium border border-blue-400/30">
                    📹 {scene.camera_angle}
                  </span>
                )}
                {scene.shot_type && (
                  <span className="px-3 py-1 bg-pink-600/50 text-pink-100 rounded-full text-sm font-medium border border-pink-400/30">
                    🎬 {scene.shot_type}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-gray-100 leading-relaxed whitespace-pre-wrap text-lg">
              {scene.narrative_text}
            </p>
          </div>
        </div>

        {/* Dialogue (if present) */}
        {scene.dialogue && (
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-5 border border-purple-500/40 shadow-lg animate-slide-up">
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">Dialogue</span>
            </div>
            <p className="text-purple-100 text-lg italic leading-relaxed pl-7">"{scene.dialogue}"</p>
          </div>
        )}

        {/* Sound Design (if present) */}
        {scene.sound_design && (
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-5 border border-blue-500/40 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-bold text-blue-300 uppercase tracking-wider">Sound Design</span>
            </div>
            <p className="text-gray-200 pl-7">{scene.sound_design}</p>
          </div>
        )}

        {/* Production Details Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Illustration Prompt */}
          <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-xl p-5 border border-pink-500/30 hover:border-pink-500/50 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-bold text-pink-300 uppercase tracking-wider">Visual Description</span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              {scene.illustration_prompt}
            </p>
          </div>

          {/* Camera Direction */}
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-5 border border-blue-500/30 hover:border-blue-500/50 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-bold text-blue-300 uppercase tracking-wider">Camera Direction</span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              {scene.camera_direction}
            </p>
            {scene.shot_composition && (
              <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-blue-500/20">
                <span className="font-medium text-blue-300">Composition:</span> {scene.shot_composition}
              </p>
            )}
          </div>
        </div>

        {/* Additional Details Row */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Lighting (if present) */}
          {scene.lighting && (
            <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-xl p-5 border border-amber-500/30 hover:border-amber-500/50 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">Lighting Setup</span>
              </div>
              <p className="text-gray-200 text-sm">{scene.lighting}</p>
            </div>
          )}

          {/* Color Palette */}
          {scene.color_palette && (
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-5 border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded animate-pulse" />
                <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">Color Palette</span>
              </div>
              <p className="text-gray-200 text-sm">{scene.color_palette}</p>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="text-center text-xs text-purple-300/60 italic pt-4 border-t border-white/10">
          💡 Use ← → arrow keys to navigate scenes
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && scene.image_url && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fade-in"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold"
            onClick={() => setIsFullscreen(false)}
          >
            ✕
          </button>
          <img
            src={scene.image_url}
            alt={scene.title}
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h4 className="text-white text-2xl font-bold mb-2">{scene.title}</h4>
            <p className="text-purple-200">Scene {scene.scene_number}</p>
          </div>
        </div>
      )}
    </div>
  );
}
