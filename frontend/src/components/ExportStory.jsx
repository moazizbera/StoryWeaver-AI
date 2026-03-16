import React from 'react';
import { Download, FileText, Share2, Copy, Check, Presentation, FileCode } from 'lucide-react';

export default function ExportStory({ story }) {
  const [copied, setCopied] = React.useState(false);

  if (!story) return null;

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(story, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${story.title.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsMarkdown = () => {
    let markdown = `# ${story.title}\n\n`;
    markdown += `> ${story.logline}\n\n`;
    markdown += `**Genre:** ${story.genre} | **Themes:** ${story.themes.join(', ')}\n\n`;
    
    if (story.estimated_runtime) {
      markdown += `**Estimated Runtime:** ${story.estimated_runtime}\n\n`;
    }

    // Characters
    markdown += `## Characters\n\n`;
    story.characters.forEach(char => {
      markdown += `### ${char.name} (${char.role})\n`;
      markdown += `- **Personality:** ${char.personality}\n`;
      markdown += `- **Visual:** ${char.visual_description}\n`;
      markdown += `- **Arc:** ${char.arc}\n\n`;
    });

    // Scenes
    markdown += `## Story\n\n`;
    story.scenes.forEach(scene => {
      markdown += `### Scene ${scene.scene_number}: ${scene.title}\n\n`;
      markdown += `**Mood:** ${scene.mood} | **Color Palette:** ${scene.color_palette}\n\n`;
      markdown += `${scene.narrative_text}\n\n`;
      
      if (scene.dialogue) {
        markdown += `**Dialogue:** "${scene.dialogue}"\n\n`;
      }
      
      markdown += `---\n\n`;
    });

    // Storyboard
    markdown += `## Production Storyboard\n\n`;
    story.storyboard.forEach(entry => {
      markdown += `**Scene ${entry.scene_number}:** ${entry.shot_type} | ${entry.duration}\n`;
      markdown += `- Visual: ${entry.visual_notes}\n`;
      markdown += `- Audio: ${entry.audio_notes}\n\n`;
    });

    const dataBlob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${story.title.replace(/\s+/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsText = () => {
    let text = `${story.title}\n${'='.repeat(story.title.length)}\n\n`;
    text += `${story.logline}\n\n`;
    text += `Genre: ${story.genre}\n`;
    text += `Themes: ${story.themes.join(', ')}\n\n`;

    // Characters
    text += `\nCHARACTERS\n${'─'.repeat(50)}\n\n`;
    story.characters.forEach(char => {
      text += `${char.name} - ${char.role}\n`;
      text += `${char.personality}\n`;
      text += `${char.arc}\n\n`;
    });

    // Scenes
    text += `\nSTORY\n${'─'.repeat(50)}\n\n`;
    story.scenes.forEach(scene => {
      text += `SCENE ${scene.scene_number}: ${scene.title.toUpperCase()}\n`;
      text += `${scene.mood}\n\n`;
      text += `${scene.narrative_text}\n\n`;
      
      if (scene.dialogue) {
        text += `"${scene.dialogue}"\n\n`;
      }
      
      text += `${'-'.repeat(50)}\n\n`;
    });

    const dataBlob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${story.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    const text = story.scenes.map((scene, idx) => 
      `Scene ${idx + 1}: ${scene.title}\n\n${scene.narrative_text}`
    ).join('\n\n---\n\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareStory = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: story.logline,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  const exportAsPresentation = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${story.title} - StoryWeaver AI Presentation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%);
      color: #e0e7ff;
      line-height: 1.6;
      padding: 2rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      margin-bottom: 3rem;
      padding: 3rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .title {
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(to right, #c084fc, #ec4899, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    
    .logline {
      font-size: 1.5rem;
      font-style: italic;
      color: #ddd6fe;
      margin-bottom: 1.5rem;
    }
    
    .metadata {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .badge {
      padding: 0.5rem 1rem;
      background: linear-gradient(to right, #7c3aed, #db2777);
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }
    
    .section {
      margin-bottom: 2rem;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .section-title {
      font-size: 2rem;
      font-weight: 700;
      background: linear-gradient(to right, #a78bfa, #f472b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .character {
      background: rgba(236, 72, 153, 0.1);
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid rgba(236, 72, 153, 0.3);
      margin-bottom: 1rem;
    }
    
    .character-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #fbbf24;
      margin-bottom: 0.5rem;
    }
    
    .character-role {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: rgba(168, 85, 247, 0.3);
      border-radius: 12px;
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }
    
    .scene {
      background: rgba(59, 130, 246, 0.1);
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid rgba(59, 130, 246, 0.3);
      margin-bottom: 1.5rem;
      page-break-inside: avoid;
    }
    
    .scene-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .scene-number {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, #3b82f6, #06b6d4);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.2rem;
    }
    
    .scene-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #93c5fd;
    }
    
    .scene-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    
    .tag {
      padding: 0.25rem 0.75rem;
      background: rgba(96, 165, 250, 0.2);
      border-radius: 12px;
      font-size: 0.75rem;
      color: #bfdbfe;
    }
    
    .narrative {
      background: rgba(0, 0, 0, 0.3);
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 1.05rem;
      line-height: 1.7;
    }
    
    .dialogue {
      background: rgba(168, 85, 247, 0.1);
      border-left: 3px solid #a855f7;
      padding: 1rem;
      border-radius: 8px;
      font-style: italic;
      color: #ddd6fe;
    }
    
    .storyboard-entry {
      background: rgba(6, 182, 212, 0.1);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid rgba(6, 182, 212, 0.3);
      margin-bottom: 1rem;
    }
    
    .storyboard-header {
      font-weight: 700;
      color: #67e8f9;
      margin-bottom: 0.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .shot-type {
      padding: 0.25rem 0.75rem;
      background: rgba(6, 182, 212, 0.3);
      border-radius: 12px;
      font-size: 0.8rem;
    }
    
    .detail {
      margin-bottom: 0.5rem;
    }
    
    .detail-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #67e8f9;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .footer {
      text-align: center;
      padding: 2rem;
      margin-top: 3rem;
      color: #a78bfa;
      font-size: 0.9rem;
    }
    
    .gemini-badge {
      display: inline-block;
      background: linear-gradient(to right, #7c3aed, #db2777);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 700;
      margin: 0 0.25rem;
    }
    
    @media print {
      body { background: white; color: black; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">${story.title}</h1>
      <p class="logline">"${story.logline}"</p>
      <div class="metadata">
        <span class="badge">🎬 ${story.genre}</span>
        ${story.themes?.map(theme => `<span class="badge">${theme}</span>`).join('') || ''}
        ${story.estimated_runtime ? `<span class="badge">⏱ ${story.estimated_runtime}</span>` : ''}
        ${story.visual_style?.aspect_ratio ? `<span class="badge">📐 ${story.visual_style.aspect_ratio}</span>` : ''}
      </div>
    </div>

    ${story.visual_style ? `
    <div class="section">
      <h2 class="section-title">🎨 Visual Style</h2>
      <div class="narrative">
        <strong>Art Style:</strong> ${story.visual_style.art_style}<br>
        ${story.visual_style.color_grading ? `<strong>Color Grading:</strong> ${story.visual_style.color_grading}<br>` : ''}
        ${story.visual_style.cinematic_references ? `<strong>Cinematic Reference:</strong> ${story.visual_style.cinematic_references}` : ''}
      </div>
    </div>
    ` : ''}

    <div class="section">
      <h2 class="section-title">👥 Characters</h2>
      ${story.characters.map(char => `
        <div class="character">
          <div class="character-name">${char.name}</div>
          <span class="character-role">${char.role}</span>
          <p style="margin-top: 1rem;"><strong>Personality:</strong> ${char.personality}</p>
          <p style="margin-top: 0.5rem;"><strong>Visual:</strong> ${char.visual_description}</p>
          ${char.arc ? `<p style="margin-top: 0.5rem;"><strong>Arc:</strong> ${char.arc}</p>` : ''}
        </div>
      `).join('')}
    </div>

    <div class="section">
      <h2 class="section-title">🎬 Scenes</h2>
      ${story.scenes.map(scene => `
        <div class="scene">
          <div class="scene-header">
            <div class="scene-number">${scene.scene_number}</div>
            <div class="scene-title">${scene.title}</div>
          </div>
          <div class="scene-tags">
            ${scene.mood ? `<span class="tag">${scene.mood}</span>` : ''}
            ${scene.camera_angle ? `<span class="tag">📹 ${scene.camera_angle}</span>` : ''}
            ${scene.shot_type ? `<span class="tag">🎬 ${scene.shot_type}</span>` : ''}
          </div>
          <div class="narrative">${scene.narrative_text}</div>
          ${scene.dialogue ? `<div class="dialogue">"${scene.dialogue}"</div>` : ''}
          ${scene.image_url ? `
            <img src="${scene.image_url}" alt="${scene.title}" style="width: 100%; border-radius: 8px; margin-top: 1rem;">
          ` : ''}
        </div>
      `).join('')}
    </div>

    <div class="section">
      <h2 class="section-title">📋 Production Storyboard</h2>
      ${story.storyboard.map(board => `
        <div class="storyboard-entry">
          <div class="storyboard-header">
            <span>Scene ${board.scene_number}</span>
            <span class="shot-type">${board.shot_type}</span>
          </div>
          <div class="detail">
            <div class="detail-label">Visual Notes</div>
            <div>${board.visual_notes}</div>
          </div>
          <div class="detail">
            <div class="detail-label">Audio Notes</div>
            <div>${board.audio_notes}</div>
          </div>
          ${board.duration ? `
            <div class="detail">
              <div class="detail-label">Duration</div>
              <div>${board.duration}</div>
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>

    <div class="footer">
      <p>Generated by StoryWeaver AI</p>
      <p style="margin-top: 0.5rem;">Powered by <span class="gemini-badge">Gemini 2.5 Flash</span></p>
      <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #9ca3af;">
        Built for Google Gemini Live Agent Challenge 2026
      </p>
    </div>
  </div>
</body>
</html>`;

    const dataBlob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${story.title.replace(/\s+/g, '_')}_Presentation.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="section-title">Export & Share</h3>
      
      {/* Presentation Export - Featured */}
      <button
        onClick={exportAsPresentation}
        className="w-full mb-4 flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all group"
      >
        <Presentation className="w-6 h-6 group-hover:scale-110 transition-transform" />
        Export Presentation-Ready HTML
        <FileCode className="w-5 h-5" />
      </button>
      <p className="text-xs text-amber-300 text-center mb-4 -mt-2">
        ✨ Beautiful standalone HTML file perfect for demos and presentations
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={exportAsJSON}
          className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/30 hover:border-purple-500/60 hover:from-purple-900/30 hover:to-pink-900/30 transition-all group"
        >
          <FileText className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-purple-200">JSON</span>
        </button>

        <button
          onClick={exportAsMarkdown}
          className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30 hover:border-blue-500/60 hover:from-blue-900/30 hover:to-purple-900/30 transition-all group"
        >
          <Download className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-blue-200">Markdown</span>
        </button>

        <button
          onClick={exportAsText}
          className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 hover:border-green-500/60 hover:from-green-900/30 hover:to-blue-900/30 transition-all group"
        >
          <FileText className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-green-200">Text</span>
        </button>

        <button
          onClick={copyToClipboard}
          className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-lg border border-amber-500/30 hover:border-amber-500/60 hover:from-amber-900/30 hover:to-orange-900/30 transition-all group"
        >
          {copied ? (
            <>
              <Check className="w-6 h-6 text-green-400 animate-scale-in" />
              <span className="text-sm font-medium text-green-200">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-amber-200">Copy</span>
            </>
          )}
        </button>
      </div>

      {navigator.share && (
        <button
          onClick={shareStory}
          className="mt-3 w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Share2 className="w-5 h-5" />
          Share Story
        </button>
      )}

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-purple-300 space-y-1">
          <div className="flex justify-between">
            <span>Scenes:</span>
            <span className="font-medium">{story.scenes.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Characters:</span>
            <span className="font-medium">{story.characters.length}</span>
          </div>
          {story.estimated_runtime && (
            <div className="flex justify-between">
              <span>Runtime:</span>
              <span className="font-medium">{story.estimated_runtime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
