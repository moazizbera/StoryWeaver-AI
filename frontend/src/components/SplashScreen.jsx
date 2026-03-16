import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Film, Users, Clapperboard, Rocket, ChevronRight, Zap, Book, Star } from 'lucide-react';

export default function SplashScreen({ onEnter }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [particles, setParticles] = useState([]);
  const scrollRef = useRef(null);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('storyweaver_splash_seen', 'true');
      onEnter();
    }, 600);
  };

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Auto-enter after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isVisible && !isExiting) {
        handleEnter();
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [isVisible, isExiting]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-y-auto overflow-x-hidden ${isExiting ? 'animate-fade-out' : 'animate-fade-in'}`}>
      {/* Animated Background with Moving Gradients */}
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl animate-float" 
          style={{ animationDuration: '20s' }} 
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-pink-500/25 rounded-full blur-3xl animate-float-reverse" 
          style={{ animationDuration: '25s', animationDelay: '2s' }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-float" 
          style={{ animationDuration: '18s', animationDelay: '1s' }} 
        />
        <div 
          className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-3xl animate-float-reverse" 
          style={{ animationDuration: '22s', animationDelay: '3s' }} 
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white/40 rounded-full animate-float-up"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Scrollable Content Container */}
      <div ref={scrollRef} className="relative z-10 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8 md:space-y-10">
          
          {/* Logo/Icon with Advanced Animation */}
          <div className="flex justify-center mb-6 sm:mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75 animate-pulse-glow"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                <Book className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white animate-float" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 text-amber-400 animate-spin-slow" />
              <Star className="absolute -bottom-1 -left-1 w-5 h-5 sm:w-6 sm:h-6 text-pink-400 animate-pulse" />
            </div>
          </div>

          {/* Title with Dynamic Gradient */}
          <div className="space-y-3 sm:space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-shimmer leading-tight" style={{ backgroundSize: '200% 100%' }}>
              StoryWeaver AI
            </h1>
            <div className="flex items-center justify-center gap-2 text-purple-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <p className="text-base sm:text-lg md:text-xl font-medium">
                Powered by Google Gemini 2.5 Flash
              </p>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="space-y-3 sm:space-y-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold max-w-4xl mx-auto leading-tight px-2">
              From Story Idea to Production-Ready Package in{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 blur-lg opacity-50 animate-shimmer" style={{ backgroundSize: '200% 100%' }}></span>
                <span className="relative text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text animate-shimmer" style={{ backgroundSize: '200% 100%' }}>30 Seconds</span>
              </span>
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              The first AI platform that generates complete cinematic story packages: <span className="text-purple-400 font-semibold">characters</span>, <span className="text-pink-400 font-semibold">scenes</span>, <span className="text-blue-400 font-semibold">storyboards</span>, and <span className="text-green-400 font-semibold">illustration prompts</span>—ready for production.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
              <span className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-lg shadow-amber-500/20 animate-pulse-glow">
                🏆 Google Gemini Live Agent Challenge 2026
              </span>
            </div>
          </div>

          {/* Features Grid with Staggered Animation */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto pt-6 sm:pt-8 px-2">
            {[
              {
                icon: Users,
                title: 'Character Development',
                desc: 'Fully-realized characters with personalities, visual consistency specs, and emotional arcs',
                color: 'from-purple-500 to-pink-500',
                badge: 'AI-Powered',
                delay: '1.2s'
              },
              {
                icon: Film,
                title: 'Cinematic Scenes',
                desc: 'Professional camera work, lighting design, color palettes, and dialogue—film-ready',
                color: 'from-pink-500 to-purple-500',
                badge: 'Production-Grade',
                delay: '1.4s'
              },
              {
                icon: Clapperboard,
                title: 'Shot-by-Shot Storyboard',
                desc: 'Complete visual breakdown with technical specs for directors and cinematographers',
                color: 'from-purple-500 to-blue-500',
                badge: 'Industry Standard',
                delay: '1.6s'
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-slide-up cursor-pointer"
                style={{ animationDelay: feature.delay }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] px-2 py-1 bg-white/10 rounded-full text-purple-300 font-medium border border-white/20 group-hover:bg-white/20 transition-colors">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Key Differentiators */}
          <div className="pt-4 sm:pt-6 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto px-2 animate-fade-in" style={{ animationDelay: '1.8s' }}>
            {[
              { text: '✨ Multimodal AI Generation', delay: '2s' },
              { text: '🎬 Structured JSON Output', delay: '2.1s' },
              { text: '🚀 30-Second Turnaround', delay: '2.2s' },
              { text: '🎨 Image Prompt Ready', delay: '2.3s' },
              { text: '💾 Auto-Save History', delay: '2.4s' },
              { text: '📦 Exportable Packages', delay: '2.5s' }
            ].map((item, idx) => (
              <span 
                key={idx}
                className="px-2 sm:px-3 py-1.5 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-200 backdrop-blur-sm hover:border-purple-400/60 hover:bg-purple-800/40 hover:scale-105 transition-all duration-300 cursor-default animate-fade-in"
                style={{ animationDelay: item.delay }}
              >
                {item.text}
              </span>
            ))}
          </div>

          {/* CTA Button with Intense Animation */}
          <div className="pt-6 sm:pt-8 md:pt-10 space-y-4 animate-scale-in" style={{ animationDelay: '2.6s' }}>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-xl animate-pulse-glow opacity-75"></div>
              <button
                onClick={handleEnter}
                className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-3 mx-auto animate-shimmer"
                style={{ backgroundSize: '200% 100%' }}
              >
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300" />
                <span className="relative">
                  Start Creating Stories
                </span>
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 px-4 animate-fade-in" style={{ animationDelay: '2.8s' }}>
              <span className="font-semibold text-purple-300">Instant Demo Available</span> • No signup required • Powered by Gemini 2.5 Flash
            </p>

            {/* Use Cases */}
            <div className="pt-3 sm:pt-4 text-xs sm:text-sm text-gray-500 space-y-1 px-4 animate-fade-in" style={{ animationDelay: '3s' }}>
              <p className="font-medium text-gray-400">Perfect for:</p>
              <p className="text-xs sm:text-sm">🎬 Filmmakers • 📺 Content Creators • 🎮 Game Developers • ✍️ Writers • 🎓 Educators</p>
            </div>
          </div>

          {/* Auto-enter indicator */}
          <div className="pt-4 sm:pt-6 pb-6 sm:pb-8 animate-bounce-subtle" style={{ animationDelay: '3.2s' }}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-[10px] sm:text-xs text-gray-400">
                Auto-entering in 15 seconds... or click above to start now
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}

// Helper function to check if splash should be shown
export const shouldShowSplash = () => {
  return !localStorage.getItem('storyweaver_splash_seen');
};
