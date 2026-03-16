import React from 'react';
import { User, Heart, Sparkles, TrendingUp, Zap } from 'lucide-react';

export default function CharacterCard({ characters }) {
  const [expandedCharacter, setExpandedCharacter] = React.useState(null);

  if (!characters || characters.length === 0) return null;

  const roleColors = {
    'protagonist': 'from-purple-500 to-pink-500',
    'antagonist': 'from-red-500 to-orange-500',
    'supporting': 'from-blue-500 to-cyan-500',
    'mentor': 'from-amber-500 to-yellow-500',
  };

  const getRoleColor = (role) => {
    const roleLower = role?.toLowerCase() || '';
    for (const [key, color] of Object.entries(roleColors)) {
      if (roleLower.includes(key)) return color;
    }
    return 'from-purple-500 to-pink-500';
  };

  return (
    <div className="glass-card p-6 animate-fade-in border-2 border-purple-500/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          1️⃣ Characters
        </h3>
        <span className="text-sm text-purple-300 bg-purple-600/20 px-3 py-1 rounded-full">
          {characters.length} {characters.length === 1 ? 'character' : 'characters'}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {characters.map((character, idx) => {
          const isExpanded = expandedCharacter === idx;
          const roleGradient = getRoleColor(character.role);

          return (
            <div
              key={idx}
              className={`bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer ${
                isExpanded ? 'md:col-span-2 shadow-xl shadow-purple-500/20' : ''
              }`}
              onClick={() => setExpandedCharacter(isExpanded ? null : idx)}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Character Avatar */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${roleGradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden group`}>
                    <User className="w-8 h-8 text-white z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Character Header Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-white mb-1 truncate">{character.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${roleGradient} rounded-full text-xs font-bold text-white shadow-md`}>
                        {character.role}
                      </span>
                      {isExpanded && character.archetype && (
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-purple-200 border border-white/20">
                          {character.archetype}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand Indicator */}
                  <div className="text-purple-400 opacity-50 text-sm">
                    {isExpanded ? '▼' : '▶'}
                  </div>
                </div>

                {/* Character Details */}
                <div className={`mt-4 space-y-3 overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-24 opacity-100'
                }`}>
                  {/* Personality */}
                  <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-lg p-3 border border-pink-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">Personality</span>
                    </div>
                    <p className={`text-gray-200 text-sm leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
                      {character.personality}
                    </p>
                  </div>

                  {isExpanded && (
                    <>
                      {/* Visual Description */}
                      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-3 border border-purple-500/20 animate-slide-up">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Visual Description</span>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {character.visual_description}
                        </p>
                      </div>

                      {/* Character Arc */}
                      {character.arc && (
                        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg p-3 border border-blue-500/20 animate-slide-up" style={{ animationDelay: '50ms' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Character Arc</span>
                          </div>
                          <p className="text-gray-200 text-sm leading-relaxed">
                            {character.arc}
                          </p>
                        </div>
                      )}

                      {/* Motivation (if present) */}
                      {character.motivation && (
                        <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-lg p-3 border border-amber-500/20 animate-slide-up" style={{ animationDelay: '100ms' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Motivation</span>
                          </div>
                          <p className="text-gray-200 text-sm leading-relaxed">
                            {character.motivation}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Click to expand hint */}
                {!isExpanded && (
                  <div className="text-center text-xs text-purple-300/60 italic mt-3 pt-3 border-t border-white/10">
                    Click to see more details
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
