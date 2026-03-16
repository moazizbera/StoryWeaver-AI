import React from 'react';
import { Sparkles, Settings, Zap, Lightbulb, Film, Video, Trophy, Rocket } from 'lucide-react';

export default function StoryInput({ onGenerate, onLoadInstantDemo, loading }) {
  const [prompt, setPrompt] = React.useState('');
  const [numScenes, setNumScenes] = React.useState(4);
  const [genre, setGenre] = React.useState('');
  const [tone, setTone] = React.useState('dramatic');
  const [directorStyle, setDirectorStyle] = React.useState('none');
  const [aspectRatio, setAspectRatio] = React.useState('16:9');
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const textareaRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate({
        prompt: prompt.trim(),
        num_scenes: numScenes,
        genre: genre || null,
        tone: tone,
        director_style: directorStyle,
        aspect_ratio: aspectRatio
      });
    }
  };

  // Enhanced demo story templates for hackathon presentation
  const demoStories = [
    {
      prompt: "A robot discovers emotions while exploring an abandoned city filled with memories of humanity",
      genre: "Science Fiction",
      tone: "inspirational",
      scenes: 4,
      icon: "🤖",
      highlight: "AI meets Humanity"
    },
    {
      prompt: "A young artist finds a paintbrush that brings paintings to life, but each creation demands a piece of their soul",
      genre: "Fantasy",
      tone: "dark",
      scenes: 5,
      icon: "🎨",
      highlight: "Dark Fantasy"
    },
    {
      prompt: "The last lighthouse keeper receives mysterious signals from the deep ocean on the eve of retirement",
      genre: "Mystery",
      tone: "mysterious",
      scenes: 4,
      icon: "🌊",
      highlight: "Ocean Mystery"
    },
    {
      prompt: "Two strangers keep meeting across different timelines, slowly realizing they're the same person",
      genre: "Science Fiction",
      tone: "dramatic",
      scenes: 6,
      icon: "⏰",
      highlight: "Time Travel"
    },
    {
      prompt: "A struggling musician makes a deal with a mysterious street performer who can manipulate sound itself",
      genre: "Drama",
      tone: "mysterious",
      scenes: 4,
      icon: "🎵",
      highlight: "Musical Magic"
    }
  ];

  const loadDemoStory = (demo) => {
    setPrompt(demo.prompt);
    setGenre(demo.genre);
    setTone(demo.tone);
    setNumScenes(demo.scenes);
    setShowAdvanced(true);
    
    // Scroll to top and focus on textarea
    setTimeout(() => {
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      textareaRef.current?.focus();
    }, 100);
  };

  const genres = [
    'Science Fiction', 'Fantasy', 'Mystery', 'Horror', 'Romance',
    'Adventure', 'Drama', 'Comedy', 'Thriller', 'Historical'
  ];

  const tones = ['dramatic', 'lighthearted', 'dark', 'inspirational', 'mysterious'];

  // 🏆 AWARD-WINNING ONE-CLICK DEMO STORY
  const generateAwardWinningDemo = () => {
    const awardWinningPrompt = "A lonely robot on Mars discovers a forgotten message from Earth that changes the fate of humanity. The message is a child's birthday wish recorded 50 years ago, before the Great Silence. As the robot races against time to decode the transmission, it uncovers a secret that could reunite the scattered human colonies - but only if it can learn what hope truly means.";
    
    setPrompt(awardWinningPrompt);
    setGenre('Science Fiction');
    setTone('inspirational');
    setNumScenes(5);
    setDirectorStyle('spielberg');
    setAspectRatio('2.39:1');
    setShowAdvanced(true);
    
    // Scroll to top and show the loaded prompt
    setTimeout(() => {
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    
    // Auto-generate immediately
    setTimeout(() => {
      onGenerate({
        prompt: awardWinningPrompt,
        num_scenes: 5,
        genre: 'Science Fiction',
        tone: 'inspirational',
        director_style: 'spielberg',
        aspect_ratio: '2.39:1'
      });
    }, 100);
  };

  return (
    <div className="space-y-4">
      {/* ⚡ INSTANT DEMO - Zero Wait Time */}
      {onLoadInstantDemo && (
        <div className="glass-card p-6 animate-fade-in bg-gradient-to-br from-cyan-900/30 via-blue-900/20 to-cyan-900/30 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Rocket className="w-8 h-8 text-cyan-400 animate-pulse" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                ⚡ Instant Demo Story
              </h3>
              <Rocket className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-sm text-cyan-200 mb-4">
              Load a complete pre-generated story instantly - <strong>no API call required!</strong> Perfect for offline demos.
            </p>
            <button
              onClick={onLoadInstantDemo}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 hover:from-cyan-600 hover:via-blue-600 hover:to-cyan-600 text-black font-bold text-lg py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 animate-shimmer"
              style={{ backgroundSize: '200% 100%' }}
            >
              <Rocket className="w-6 h-6" />
              ⚡ Load Instant Demo (0.5s) ⚡
              <Zap className="w-6 h-6" />
            </button>
            <div className="mt-3 text-xs text-cyan-300/70 italic">
              🌊 "The Last Lighthouse" - A lighthouse keeper discovers a forgotten ocean civilization
            </div>
          </div>
        </div>
      )}

      {/* 🏆 ONE-CLICK AWARD-WINNING DEMO */}
      <div className="glass-card p-6 animate-fade-in bg-gradient-to-br from-amber-900/30 via-yellow-900/20 to-amber-900/30 border-2 border-amber-500/50 shadow-lg shadow-amber-500/20">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="w-8 h-8 text-amber-400 animate-pulse" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
              🤖 AI-Generated Demo
            </h3>
            <Trophy className="w-8 h-8 text-amber-400 animate-pulse" />
          </div>
          <p className="text-sm text-amber-200 mb-4">
            Watch Gemini 2.5 Flash generate a complete story in real-time (~30 seconds) - see the AI magic live!
          </p>
          <button
            onClick={generateAwardWinningDemo}
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 text-black font-bold text-lg py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 animate-shimmer"
            style={{ backgroundSize: '200% 100%' }}
          >
            <Rocket className="w-6 h-6" />
            ✨ Generate with Gemini AI (~30s) ✨
            <Sparkles className="w-6 h-6" />
          </button>
          <div className="mt-3 text-xs text-amber-300/70 italic">
            🤖 "A lonely robot on Mars discovers a message that changes humanity's fate..."
          </div>
        </div>
      </div>

      <div className="glass-card p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Your Story
            </h2>
            <p className="text-xs text-purple-300">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-purple-200">
              Story Concept
            </label>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your story idea... Be creative! The more vivid your concept, the better the story."
              className="input-field min-h-[120px] resize-none"
              disabled={loading}
              required
            />
            <div className="text-xs text-purple-300 mt-1">
              Tip: Include characters, setting, and a central conflict for best results
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-purple-200">
                Number of Scenes: <span className="text-purple-400 font-bold">{numScenes}</span>
              </label>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1 text-sm text-purple-300 hover:text-purple-200 transition-colors"
              >
                <Settings className="w-4 h-4" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </button>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              value={numScenes}
              onChange={(e) => setNumScenes(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
              disabled={loading}
            />
            <div className="flex justify-between text-xs text-purple-300 mt-1">
              <span>Quick (2)</span>
              <span>Epic (8)</span>
            </div>
          </div>

          {showAdvanced && (
            <div className="space-y-4 animate-slide-up">
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">
                  Genre (Optional)
                </label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="input-field"
                  disabled={loading}
                >
                  <option value="" className="bg-slate-800 text-white">Auto-detect from concept</option>
                  {genres.map(g => (
                    <option key={g} value={g} className="bg-slate-800 text-white">{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">
                  Tone
                </label>
                <div className="flex flex-wrap gap-2">
                  {tones.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                        tone === t
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                          : 'bg-white/5 text-purple-300 hover:bg-white/10 hover:scale-102'
                      }`}
                      disabled={loading}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex text-sm font-medium mb-2 text-purple-200 items-center gap-2">
                  <Film className="w-4 h-4" />
                  Director Style (Cinematic Presets)
                </label>
                <select
                  value={directorStyle}
                  onChange={(e) => setDirectorStyle(e.target.value)}
                  className="input-field"
                  disabled={loading}
                >
                  <option value="none" className="bg-slate-800 text-white">Custom Style (No Preset)</option>
                  <option value="spielberg" className="bg-slate-800 text-white">🎬 Spielberg - Emotional Wonder & Epic Scale</option>
                  <option value="nolan" className="bg-slate-800 text-white">🌀 Nolan - Complex Narratives & IMAX Scale</option>
                  <option value="tarantino" className="bg-slate-800 text-white">🔫 Tarantino - Stylized Pop Culture</option>
                  <option value="wes_anderson" className="bg-slate-800 text-white">🎨 Wes Anderson - Whimsical Symmetry</option>
                  <option value="kubrick" className="bg-slate-800 text-white">👁️ Kubrick - Methodical Perfection</option>
                  <option value="fincher" className="bg-slate-800 text-white">🌑 Fincher - Dark Digital Precision</option>
                  <option value="villeneuve" className="bg-slate-800 text-white">🌌 Villeneuve - Contemplative Sci-Fi</option>
                  <option value="miyazaki" className="bg-slate-800 text-white">🌿 Miyazaki - Environmental Wonder</option>
                  <option value="edgar_wright" className="bg-slate-800 text-white">⚡ Edgar Wright - Kinetic Comedy</option>
                </select>
                {directorStyle !== 'none' && (
                  <div className="text-xs text-purple-300 mt-2 p-2 bg-purple-500/10 rounded">
                    ✨ Applied style will influence camera work, lighting, color grading, and composition throughout your story
                  </div>
                )}
              </div>

              <div>
                <label className="flex text-sm font-medium mb-2 text-purple-200 items-center gap-2">
                  <Video className="w-4 h-4" />
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: '16:9', label: '16:9', desc: 'Standard' },
                    { value: '2.39:1', label: '2.39:1', desc: 'Cinematic' },
                    { value: '4:3', label: '4:3', desc: 'Classic' },
                    { value: '1:1', label: '1:1', desc: 'Square' }
                  ].map(ratio => (
                    <button
                      key={ratio.value}
                      type="button"
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        aspectRatio === ratio.value
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'bg-white/5 text-purple-300 hover:bg-white/10'
                      }`}
                      disabled={loading}
                    >
                      <div className="font-bold">{ratio.label}</div>
                      <div className="text-[10px] opacity-70">{ratio.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Crafting Your Cinematic Story...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Story
              </>
            )}
          </button>
        </form>
      </div>

      {/* Enhanced Demo Story Templates */}
      {!loading && (
        <div className="glass-card p-6 animate-fade-in border-purple-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              🚀 Quick Start Templates
            </h3>
          </div>
          <p className="text-xs text-purple-300 mb-4">
            Click any template to load it - you can switch templates anytime before generating
          </p>
          <div className="grid gap-3">
            {demoStories.map((demo, idx) => {
              const isSelected = prompt === demo.prompt;
              return (
                <button
                  key={idx}
                  onClick={() => loadDemoStory(demo)}
                  className={`text-left p-4 rounded-xl border transition-all group shadow-lg hover:scale-[1.02] ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900/50 via-pink-900/40 to-purple-900/50 border-purple-500 shadow-purple-500/30'
                      : 'bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20 border-purple-500/20 hover:border-purple-500/60 hover:from-purple-900/30 hover:to-pink-900/30 hover:shadow-purple-500/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform">
                      {demo.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          isSelected ? 'text-purple-300' : 'text-purple-400'
                        }`}>
                          {demo.highlight} {isSelected && '✓'}
                        </span>
                        <Zap className={`w-4 h-4 text-amber-400 transition-opacity ${
                          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                      </div>
                      <p className={`text-sm leading-relaxed transition-colors ${
                        isSelected ? 'text-white font-medium' : 'text-gray-200 group-hover:text-white'
                      }`}>
                        {demo.prompt}
                      </p>
                      <div className="flex gap-2 mt-3 text-xs">
                        <span className="px-2 py-1 bg-purple-600/40 text-purple-100 rounded-full font-medium border border-purple-500/30">
                          {demo.genre}
                        </span>
                        <span className="px-2 py-1 bg-pink-600/40 text-pink-100 rounded-full font-medium capitalize border border-pink-500/30">
                          {demo.tone}
                        </span>
                        <span className="px-2 py-1 bg-blue-600/40 text-blue-100 rounded-full font-medium border border-blue-500/30">
                          {demo.scenes} scenes
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-purple-300/70 italic">
              💡 Or write your own story concept above for a completely unique narrative
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
