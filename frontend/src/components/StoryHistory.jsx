import React, { useState, useEffect } from 'react';
import { History, Trash2, Clock, X, BookOpen, Film, Users } from 'lucide-react';

export default function StoryHistory({ onLoadStory, currentStory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stories, setStories] = useState([]);

  // Load stories from localStorage
  useEffect(() => {
    loadStoriesFromStorage();
  }, []);

  const loadStoriesFromStorage = () => {
    try {
      const stored = localStorage.getItem('storyweaver_history');
      if (stored) {
        const parsed = JSON.parse(stored);
        setStories(parsed.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error('Error loading story history:', error);
      setStories([]);
    }
  };

  const deleteStory = (id, e) => {
    e.stopPropagation();
    try {
      const filtered = stories.filter(s => s.id !== id);
      setStories(filtered);
      localStorage.setItem('storyweaver_history', JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  const clearAllHistory = () => {
    if (confirm('Are you sure you want to delete all story history?')) {
      setStories([]);
      localStorage.removeItem('storyweaver_history');
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const handleLoadStory = (story) => {
    onLoadStory(story.data);
    setIsOpen(false);
  };

  const isCurrentStory = (story) => {
    return currentStory && story.data.title === currentStory.title;
  };

  return (
    <>
      {/* Floating History Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 group"
        title="Story History"
      >
        <History className="w-6 h-6" />
        {stories.length > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
            {stories.length}
          </span>
        )}
      </button>

      {/* Sidebar Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-l border-purple-500/30 shadow-2xl z-50 animate-slide-in-right overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-500/30 bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <History className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Story History</h2>
                  <p className="text-xs text-purple-300">
                    {stories.length} {stories.length === 1 ? 'story' : 'stories'} saved
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Story List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {stories.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <BookOpen className="w-16 h-16 text-purple-400/30 mb-4" />
                  <p className="text-gray-400 text-sm">No stories yet</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Generated stories will appear here
                  </p>
                </div>
              ) : (
                <>
                  {stories.map((story) => (
                    <button
                      key={story.id}
                      onClick={() => handleLoadStory(story)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all group ${
                        isCurrentStory(story)
                          ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500 shadow-lg shadow-purple-500/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {isCurrentStory(story) && (
                              <span className="px-2 py-0.5 bg-purple-500/30 text-purple-200 text-xs font-bold rounded-full border border-purple-500/50">
                                Current
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-white mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors">
                            {story.data.title}
                          </h3>
                          <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                            {story.data.logline}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-purple-300">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {story.data.characters?.length || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Film className="w-3 h-3" />
                              {story.data.scenes?.length || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(story.timestamp)}
                            </span>
                          </div>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteStory(story.id, e);
                          }}
                          className="w-8 h-8 rounded-lg hover:bg-red-500/20 flex items-center justify-center transition-all text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Delete story"
                        >
                          <Trash2 className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {stories.length > 0 && (
              <div className="p-4 border-t border-purple-500/30 bg-black/20">
                <button
                  onClick={clearAllHistory}
                  className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500/50"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All History
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

// Export helper function to save stories
export const saveStoryToHistory = (story) => {
  try {
    const stored = localStorage.getItem('storyweaver_history');
    const history = stored ? JSON.parse(stored) : [];
    
    // Create story entry
    const storyEntry = {
      id: `story_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      data: {
        title: story.title,
        logline: story.logline,
        genre: story.genre,
        themes: story.themes,
        characters: story.characters,
        scenes: story.scenes,
        storyboard: story.storyboard,
        narration: story.narration,
        visual_style: story.visual_style,
        estimated_runtime: story.estimated_runtime
      }
    };

    // Add to beginning of array (most recent first)
    history.unshift(storyEntry);

    // Keep only last 20 stories
    const trimmed = history.slice(0, 20);

    // Save to localStorage
    localStorage.setItem('storyweaver_history', JSON.stringify(trimmed));
    
    return true;
  } catch (error) {
    console.error('Error saving story to history:', error);
    return false;
  }
};
