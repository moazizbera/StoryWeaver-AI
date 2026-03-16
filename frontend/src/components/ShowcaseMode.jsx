import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ChevronRight, ChevronLeft, Play, Pause, RotateCcw, 
  Lightbulb, BookOpen, Users, Film, Clapperboard, Image, 
  Zap, CheckCircle, ArrowRight, Maximize2, Trophy, Rocket
} from 'lucide-react';

export default function ShowcaseMode({ story, onGenerate, onReset, loading }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Demo pipeline steps
  const steps = [
    {
      id: 'idea',
      title: 'Story Idea',
      icon: Lightbulb,
      color: 'text-amber-400',
      bgColor: 'from-amber-900/20 to-yellow-900/20',
      borderColor: 'border-amber-500/30',
      description: 'Where it all begins - a creative concept',
      geminiRole: 'Gemini 2.5 Flash analyzes your idea and expands it into a rich narrative framework'
    },
    {
      id: 'story',
      title: 'Story Structure',
      icon: BookOpen,
      color: 'text-purple-400',
      bgColor: 'from-purple-900/20 to-pink-900/20',
      borderColor: 'border-purple-500/30',
      description: 'Complete narrative with title, logline, and themes',
      geminiRole: 'Gemini generates compelling story structure, genre, tone, and estimated runtime'
    },
    {
      id: 'characters',
      title: 'Characters',
      icon: Users,
      color: 'text-pink-400',
      bgColor: 'from-pink-900/20 to-purple-900/20',
      borderColor: 'border-pink-500/30',
      description: 'Fully-developed characters with personalities and arcs',
      geminiRole: 'Gemini creates detailed characters with visual descriptions, personalities, and narrative arcs'
    },
    {
      id: 'scenes',
      title: 'Cinematic Scenes',
      icon: Film,
      color: 'text-blue-400',
      bgColor: 'from-blue-900/20 to-cyan-900/20',
      borderColor: 'border-blue-500/30',
      description: 'Scene-by-scene breakdown with narrative and dialogue',
      geminiRole: 'Gemini scripts each scene with narrative text, dialogue, mood, and camera direction'
    },
    {
      id: 'storyboard',
      title: 'Production Storyboard',
      icon: Clapperboard,
      color: 'text-cyan-400',
      bgColor: 'from-cyan-900/20 to-blue-900/20',
      borderColor: 'border-cyan-500/30',
      description: 'Shot types, camera angles, and technical specs',
      geminiRole: 'Gemini defines shot composition, camera movements, lighting, and audio design'
    },
    {
      id: 'visuals',
      title: 'AI-Generated Visuals',
      icon: Image,
      color: 'text-green-400',
      bgColor: 'from-green-900/20 to-emerald-900/20',
      borderColor: 'border-green-500/30',
      description: 'Scene illustrations and visual descriptions',
      geminiRole: 'Gemini creates detailed illustration prompts for AI image generation'
    }
  ];

  // Curated showcase prompts optimized for impressive results
  const showcasePrompts = [
    {
      title: "🏆 Award-Winning Demo",
      prompt: "A lonely robot on Mars discovers a forgotten message from Earth that changes the fate of humanity. The message is a child's birthday wish recorded 50 years ago, before the Great Silence. As the robot races against time to decode the transmission, it uncovers a secret that could reunite the scattered human colonies - but only if it can learn what hope truly means.",
      genre: "Science Fiction",
      tone: "inspirational",
      scenes: 5,
      directorStyle: "spielberg",
      aspectRatio: "2.39:1",
      why: "Emotional Spielbergian sci-fi - guaranteed to impress judges",
      icon: "🏆",
      featured: true
    },
    {
      title: "The Last Memory Keeper",
      prompt: "In a world where memories can be extracted and stored, a memory keeper discovers the last remaining memory of Earth before the Great Silence - a child's laughter in a sunlit garden - and must decide whether to preserve it or let humanity finally forget",
      genre: "Science Fiction",
      tone: "dramatic",
      scenes: 5,
      directorStyle: "villeneuve",
      aspectRatio: "2.39:1",
      why: "Emotional sci-fi with strong visual potential and philosophical depth",
      icon: "🧠"
    },
    {
      title: "Neon Shrine",
      prompt: "A cyber-monk tends to an ancient temple in Neo-Tokyo where digital souls seek enlightenment, but when a rogue AI begins corrupting the sacred algorithms, they must venture into the corrupted code to restore balance between the physical and digital realms",
      genre: "Science Fiction",
      tone: "mysterious",
      scenes: 6,
      directorStyle: "nolan",
      aspectRatio: "16:9",
      why: "Cyberpunk meets spirituality - stunning visual contrast",
      icon: "🏮"
    },
    {
      title: "The Painter's Curse",
      prompt: "A Renaissance artist discovers their paintings predict future tragedies, and when they paint a scene of their city burning, they have only three days to change fate while wrestling with the question: is free will real if the future is already painted?",
      genre: "Fantasy",
      tone: "dark",
      scenes: 5,
      directorStyle: "fincher",
      aspectRatio: "4:3",
      why: "Historical + supernatural with moral complexity",
      icon: "🖼️"
    },
    {
      title: "Symphony of the Deep",
      prompt: "A marine biologist discovers that whale songs are actually an ancient language communicating with something massive sleeping at the bottom of the Mariana Trench, and the songs are growing louder - it's waking up",
      genre: "Thriller",
      tone: "mysterious",
      scenes: 5,
      directorStyle: "spielberg",
      aspectRatio: "2.39:1",
      why: "Spielbergian wonder meets cosmic horror",
      icon: "🐋"
    },
    {
      title: "Clockwork Heart",
      prompt: "In a steampunk Victorian London, a clockmaker builds an artificial heart to save their dying child, but the heart requires a daily wind-up, and each turn steals one memory - forcing impossible choices about what matters most",
      genre: "Drama",
      tone: "inspirational",
      scenes: 6,
      directorStyle: "wes_anderson",
      aspectRatio: "4:3",
      why: "Emotional stakes + unique steampunk aesthetic",
      icon: "⚙️"
    }
  ];

  const [selectedPrompt, setSelectedPrompt] = useState(showcasePrompts[0]);

  // Auto-advance through steps
  useEffect(() => {
    if (isAutoPlaying && story && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      }, 8000); // 8 seconds per step for 3-minute demo
      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, currentStep, story, steps.length]);

  // Mark steps as completed
  useEffect(() => {
    if (story) {
      setCompletedSteps([0, 1, 2, 3, 4, 5]);
    }
  }, [story]);

  const handleGenerate = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    onGenerate({
      prompt: selectedPrompt.prompt,
      num_scenes: selectedPrompt.scenes,
      genre: selectedPrompt.genre,
      tone: selectedPrompt.tone,
      director_style: selectedPrompt.directorStyle,
      aspect_ratio: selectedPrompt.aspectRatio
    });
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsAutoPlaying(false);
    if (onReset) {
      onReset(); // Clear the story in parent component
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Showcase Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-900/30 border-2 border-purple-500/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                🎬 Showcase Mode
              </h2>
              <p className="text-sm text-purple-300">
                Guided demo: Idea → Story → Characters → Scenes → Storyboard → Visuals
              </p>
            </div>
          </div>
          
          {/* Demo Controls */}
          <div className="flex gap-2">
            {story && (
              <>
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isAutoPlaying ? 'Pause' : 'Auto-Play'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-purple-200 rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Back to Quick Start
                </button>
              </>
            )}
          </div>
        </div>

        {/* Pipeline Progress */}
        <div className="relative">
          <div className="flex justify-between items-center">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStep;
              const isCompleted = completedSteps.includes(idx) || (story && idx <= currentStep);
              
              return (
                <div key={step.id} className="flex-1 relative">
                  <button
                    onClick={() => story && setCurrentStep(idx)}
                    disabled={!story}
                    className={`w-full flex flex-col items-center gap-2 transition-all ${
                      story ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                  >
                    {/* Step Circle */}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive 
                        ? `${step.color} bg-white/20 border-current shadow-lg scale-110` 
                        : isCompleted
                        ? `${step.color} bg-white/10 border-current`
                        : 'text-gray-500 bg-white/5 border-gray-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    
                    {/* Step Label */}
                    <div className="text-center">
                      <div className={`text-xs font-bold ${
                        isActive ? step.color : isCompleted ? 'text-white' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </button>
                  
                  {/* Connector Line */}
                  {idx < steps.length - 1 && (
                    <div className={`absolute top-7 left-1/2 w-full h-0.5 transition-all ${
                      isCompleted ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'
                    }`} style={{ zIndex: -1 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      {!story ? (
        /* Prompt Selection */
        <div className="space-y-4">
          {/* 🏆 QUICK DEMO BUTTON */}
          <div className="glass-card p-5 bg-gradient-to-r from-amber-900/30 via-yellow-900/20 to-amber-900/30 border-2 border-amber-500/50 shadow-lg shadow-amber-500/20">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-400 animate-pulse" />
                <div>
                  <h4 className="text-lg font-bold text-amber-200">Quick Demo</h4>
                  <p className="text-xs text-amber-300/80">Start with award-winning story instantly</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedPrompt(showcasePrompts[0]);
                  setTimeout(() => handleGenerate(), 100);
                }}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Generate Now
              </button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Choose Your Showcase Story
            </h3>
            <p className="text-sm text-purple-300 mb-6">
              These prompts are optimized for impressive visual results and compelling narratives
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
            {showcasePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPrompt(prompt)}
                className={`text-left p-5 rounded-xl border-2 transition-all group ${
                  prompt.featured 
                    ? 'bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-500 shadow-xl shadow-amber-500/30' 
                    : selectedPrompt === prompt
                    ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500 shadow-lg shadow-purple-500/30'
                    : 'bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-purple-500/50'
                }`}
              >
                {prompt.featured && (
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Recommended for Demos
                    </span>
                    <Trophy className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {prompt.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">{prompt.title}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3 line-clamp-3">
                      {prompt.prompt}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-purple-600/40 text-purple-100 rounded-full font-medium">
                        {prompt.genre}
                      </span>
                      <span className="px-2 py-1 bg-pink-600/40 text-pink-100 rounded-full font-medium">
                        {prompt.scenes} scenes
                      </span>
                      <span className="px-2 py-1 bg-blue-600/40 text-blue-100 rounded-full font-medium">
                        {prompt.aspectRatio}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-xs text-purple-300 italic">
                        ✨ {prompt.why}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary w-full mt-6 flex items-center justify-center gap-2 text-lg py-4"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Story...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Start Showcase Demo
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
          </div>
        </div>
      ) : (
        /* Step-by-Step Content Display */
        <div className="glass-card p-6 animate-slide-up">
          <div className={`bg-gradient-to-r ${currentStepData.bgColor} rounded-xl p-6 border ${currentStepData.borderColor}`}>
            {/* Step Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center ${currentStepData.color}`}>
                  <currentStepData.icon className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentStepData.title}</h3>
                  <p className="text-sm text-gray-300">{currentStepData.description}</p>
                </div>
              </div>
              <div className="text-sm text-purple-300 font-medium">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>

            {/* Gemini's Role */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 mb-6 border border-purple-500/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">
                    Gemini 2.5 Flash at Work
                  </div>
                  <p className="text-sm text-purple-100">{currentStepData.geminiRole}</p>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-4">
              {currentStep === 0 && (
                <div className="bg-black/30 rounded-lg p-5 backdrop-blur-sm">
                  <h4 className="text-lg font-bold text-amber-300 mb-3">Selected Story Concept</h4>
                  <p className="text-gray-200 leading-relaxed">{selectedPrompt.prompt}</p>
                  <div className="flex gap-3 mt-4 text-sm">
                    <span className="px-3 py-1 bg-amber-600/40 text-amber-100 rounded-full font-medium">
                      Genre: {selectedPrompt.genre}
                    </span>
                    <span className="px-3 py-1 bg-amber-600/40 text-amber-100 rounded-full font-medium">
                      Tone: {selectedPrompt.tone}
                    </span>
                    <span className="px-3 py-1 bg-amber-600/40 text-amber-100 rounded-full font-medium">
                      {selectedPrompt.scenes} Scenes
                    </span>
                  </div>
                </div>
              )}

              {currentStep === 1 && story && (
                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-5 backdrop-blur-sm">
                    <h4 className="text-2xl font-bold text-white mb-2">{story.title}</h4>
                    <p className="text-lg text-purple-200 italic mb-4">"{story.logline}"</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-bold text-purple-300 uppercase mb-2">Genre</div>
                        <div className="text-white font-medium">{story.genre}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-purple-300 uppercase mb-2">Runtime</div>
                        <div className="text-white font-medium">{story.estimated_runtime || 'N/A'}</div>
                      </div>
                      {story.themes && (
                        <div className="md:col-span-2">
                          <div className="text-xs font-bold text-purple-300 uppercase mb-2">Themes</div>
                          <div className="flex flex-wrap gap-2">
                            {story.themes.map((theme, idx) => (
                              <span key={idx} className="px-3 py-1 bg-purple-600/40 text-purple-100 rounded-full text-sm">
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && story?.characters && (
                <div className="space-y-3">
                  {story.characters.map((char, idx) => (
                    <div key={idx} className="bg-black/30 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-lg font-bold text-white mb-1">{char.name}</h5>
                          <span className="px-2 py-1 bg-pink-600/50 text-pink-100 rounded-full text-xs font-medium">
                            {char.role}
                          </span>
                          <p className="text-sm text-gray-300 mt-2">{char.personality}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 3 && story?.scenes && (
                <div className="space-y-3">
                  {story.scenes.map((scene, idx) => (
                    <div key={idx} className="bg-black/30 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white">
                          {scene.scene_number}
                        </div>
                        <h5 className="text-lg font-bold text-white">{scene.title}</h5>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{scene.narrative_text}</p>
                      {scene.dialogue && (
                        <p className="text-sm text-blue-200 italic mt-2">"{scene.dialogue}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 4 && story?.storyboard && (
                <div className="space-y-3">
                  {story.storyboard.map((board, idx) => (
                    <div key={idx} className="bg-black/30 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clapperboard className="w-5 h-5 text-cyan-400" />
                          <span className="font-bold text-white">Scene {board.scene_number}</span>
                        </div>
                        <span className="px-3 py-1 bg-cyan-600/50 text-cyan-100 rounded-full text-xs font-medium">
                          {board.shot_type}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-xs font-bold text-cyan-300 uppercase mb-1">Visual</div>
                          <p className="text-gray-300">{board.visual_notes}</p>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-cyan-300 uppercase mb-1">Audio</div>
                          <p className="text-gray-300">{board.audio_notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 5 && story?.scenes && (
                <div className="grid md:grid-cols-2 gap-4">
                  {story.scenes.map((scene, idx) => (
                    <div key={idx} className="bg-black/30 rounded-lg overflow-hidden backdrop-blur-sm">
                      {scene.image_url ? (
                        <div className="relative group">
                          <img 
                            src={scene.image_url} 
                            alt={scene.title}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <p className="text-white font-bold">Scene {scene.scene_number}</p>
                              <p className="text-gray-300 text-sm">{scene.title}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-green-900/30 to-emerald-900/30 flex items-center justify-center">
                          <Image className="w-12 h-12 text-green-400/50" />
                        </div>
                      )}
                      <div className="p-3">
                        <p className="text-xs text-gray-400 line-clamp-2">{scene.illustration_prompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/20">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              
              <div className="text-center">
                <div className="text-sm text-purple-300">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                </div>
              </div>
              
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips for Demo */}
      <div className="glass-card p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <Maximize2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-blue-300 mb-1">3-Minute Demo Tips</div>
            <ul className="text-xs text-blue-200 space-y-1">
              <li>• Use Auto-Play to navigate through all 6 pipeline steps automatically</li>
              <li>• Showcase prompts are optimized for impressive visual and narrative results</li>
              <li>• Each step highlights Gemini 2.5 Flash's role in the creative pipeline</li>
              <li>• Click any step indicator to jump directly to that part of the pipeline</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
