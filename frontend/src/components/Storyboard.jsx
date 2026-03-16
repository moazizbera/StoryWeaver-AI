import React from 'react';
import { Clapperboard, Clock, Eye, Volume2 } from 'lucide-react';

export default function Storyboard({ storyboard, narration }) {
  if (!storyboard || storyboard.length === 0) return null;

  return (
    <div className="glass-card p-6 animate-fade-in border-2 border-blue-500/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Clapperboard className="w-6 h-6 text-white" />
          </div>
          3️⃣ Production Storyboard
        </h3>
        <span className="text-sm text-blue-300 bg-blue-600/20 px-3 py-1 rounded-full">
          {storyboard.length} shots
        </span>
      </div>

      <div className="space-y-4">
        {storyboard.map((entry, idx) => {
          // Handle both array format and object format for narration
          const narrationEntry = Array.isArray(narration) 
            ? narration?.find(n => n.scene_number === entry.scene_number)
            : null;

          return (
            <div
              key={idx}
              className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clapperboard className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-white">Scene {entry.scene_number}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <Clock className="w-4 h-4" />
                  <span>{entry.duration}</span>
                </div>
              </div>

              {/* Shot Type */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-purple-600/50 rounded-full text-sm font-medium text-purple-200">
                  {entry.shot_type}
                </span>
              </div>

              {/* Production Details */}
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-blue-300">Visual Notes</span>
                  </div>
                  <p className="text-gray-300 pl-6">{entry.visual_notes}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Volume2 className="w-4 h-4 text-pink-400" />
                    <span className="font-medium text-pink-300">Audio Notes</span>
                  </div>
                  <p className="text-gray-300 pl-6">{entry.audio_notes}</p>
                </div>

                {/* Narration Script */}
                {narrationEntry && (
                  <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20 mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="w-4 h-4 text-purple-400" />
                      <span className="font-medium text-purple-300">Narration Script</span>
                    </div>
                    <p className="text-purple-100 mb-2 pl-6">
                      {narrationEntry.narration_text}
                    </p>
                    <div className="flex gap-3 text-xs text-purple-300 pl-6">
                      <span>Emotion: {narrationEntry.emotion}</span>
                      <span>•</span>
                      <span>Pacing: {narrationEntry.pacing}</span>
                    </div>
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
