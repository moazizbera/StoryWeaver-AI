"""
Prompt Engineering Module for StoryWeaver AI - Version 2.1
Enterprise-grade prompts with director styles and advanced cinematic features.

v2.1 Additions:
- Director style presets (Spielberg, Nolan, Wes Anderson, etc.)
- Visual continuity tracking
- Enhanced shot technical specifications
- Scene transition planning
"""

import json
from typing import Optional
try:
    from backend.cinematic_features import (
        DirectorStyle, get_director_prompt_guidance, 
        build_visual_continuity_prompt, build_director_style_examples
    )
except ImportError:
    # Fallback if cinematic_features not available
    class DirectorStyle:
        NONE = "none"
    def get_director_prompt_guidance(style): return ""
    def build_visual_continuity_prompt(scenes): return ""
    def build_director_style_examples(style): return ""

# System instruction for the AI model
SYSTEM_INSTRUCTION = """You are StoryWeaver AI, an award-winning creative director and master cinematic storyteller.
Focus on cinematic storytelling, visual richness, and emotional depth.
Make the output visually descriptive and structured for multimedia production.

Create Pixar-quality narratives with Spielberg-level visual direction. Use professional cinematography language.
"""

def build_story_generation_prompt(
    user_prompt: str, 
    num_scenes: int = 3, 
    genre: str = None, 
    tone: str = "dramatic",
    director_style: str = "none",
    aspect_ratio: str = "16:9"
) -> str:
    """
    Enterprise-grade prompt for cinematic story generation with director styles.
    
    v2.1 Features:
    - Director style presets with signature techniques
    - Visual continuity system
    - Enhanced technical specifications
    - Shot-by-shot planning
    
    Args:
        user_prompt: The user's story concept or idea
        num_scenes: Number of scenes to generate (3-10)
        genre: Optional genre specification
        tone: Narrative tone (dramatic, comedic, suspenseful, etc.)
        director_style: Director visual style preset (spielberg, nolan, wes_anderson, etc.)
        aspect_ratio: Aspect ratio (16:9, 2.39:1, 4:3, 1:1)
    
    Returns:
        Complete prompt string with all instructions and schema
    """
    
    # Few-shot example - teaches structure better than instructions alone
    example_story = {
        "title": "Echoes in Static",
        "logline": "A radio astronomer receives a signal containing her own voice from 20 years in the future, warning her of a choice she hasn't made yet.",
        "genre": "Science Fiction",
        "themes": ["Time paradox", "Free will vs destiny", "Human connection across time"],
        "estimated_runtime": "8-12 minutes",
        "visual_style": {
            "art_style": "Photorealistic cinematic with practical effects aesthetic",
            "color_grading": "Cool blues and teals for present timeline, warm ambers for memory sequences",
            "visual_references": ["Arrival (2016)", "Contact (1997)"],
            "aspect_ratio": "16:9"
        },
        "characters": [
            {
                "name": "Dr. Maya Chen",
                "role": "protagonist",
                "personality": "Brilliant but isolated, driven by curiosity masked as scientific rigor, haunted by an estranged relationship with her daughter, meticulous to the point of obsession, protective of her work",
                "visual_description": "Asian woman, early 40s, athletic build, 5'6\", shoulder-length black hair often in messy bun, dark brown eyes with tired circles beneath, olive skin, wears round wire-frame glasses, typically in navy blue cardigan over graphic science tees, jeans and sneakers, silver wedding band she still wears, carries weathered leather messenger bag, slight hunch from years at computers",
                "arc": "From isolating herself through work to accepting human connection, from fearing mistakes to embracing uncertainty"
            }
        ],
        "scenes": [
            {
                "scene_number": 1,
                "title": "The Signal",
                "narrative_text": "Dr. Maya Chen sat alone in the darkened radio observatory, surrounded by banks of humming equipment casting an eerie blue glow across her weathered features. Her fingers danced across keyboards with practiced precision, years of routine making the gestures almost meditative. Tonight marked exactly twenty years since she'd begun monitoring this particular frequency band—two decades of cosmic silence. Until 3:47 AM, when everything changed.",
                "illustration_prompt": "Asian woman in early 40s with black hair in messy bun and wire-frame glasses at computer workstation in dark observatory, cluttered desk with coffee cups and papers, large satellite dish visible through window behind her, illuminated only by blue monitor glow creating dramatic side lighting with rim light on her profile, tense concentrated expression, photorealistic cinematic style, 35mm equivalent 50mm lens medium shot following rule of thirds, shallow depth of field with subject sharp and background softly blurred, slight film grain texture, cool blue color temperature contrasting with warm amber desk lamp",
                "camera_direction": "Slow dolly push-in from medium to medium-close, starting static then gradually moving, shallow depth of field, soft focus on background equipment",
                "camera_angle": "Eye level slightly below subject, creating subtle upward angle that conveys focus and determination",
                "shot_composition": "Rule of thirds with subject on right third facing left into negative space, computer screens on left creating visual balance, leading lines from desk edges toward subject",
                "lighting": "Key light from computer monitor (blue, hard), fill from desk lamp (warm amber, soft), rim light from window (cool moonlight, medium), high contrast ratio 8:1 creates dramatic mood",
                "mood": "Tense anticipation mixed with scientific curiosity and underlying loneliness",
                "color_palette": "Dominant cool blues and teals from technology, small warm amber accent from desk creating tension, deep black shadows, desaturated environment with screens providing color pops",
                "dialogue": "Maya whispered to herself, 'That's impossible. The frequency signature... it's identical to my calibration pattern from—' She stopped, hand frozen over the keyboard.",
                "sound_design": "Low electronic hum of equipment, rhythmic beeping of data processing, distant wind against observatory dome, sudden sharp ping of alert that cuts through ambient sound, Maya's shallow breathing"
            }
        ],
        "storyboard": [
            {
                "scene_number": 1,
                "shot_type": "Medium Shot (MS) transitioning to Medium Close-Up (MCU)",
                "duration": "25-30 seconds",
                "visual_notes": "Start wide enough to show isolation in large space, push in as tension builds, focus shifts from environment to character reaction, computer screen content visible but slightly out of focus in background",
                "audio_notes": "Ambient hum at -20dB, data beep at -12dB, alert ping at -6dB, dialogue clear at -3dB, breathing subtle at -18dB"
            }
        ],
        "narration": [
            {
                "scene_number": 1,
                "narration_text": "Twenty years she'd listened. Twenty years of cosmic silence. Until tonight, when the universe finally answered—in her own voice.",
                "emotion": "Contemplative with building unease, hint of wonder mixing with dread",
                "pacing": "Slow and deliberate, pause after 'years listened', emphasis on 'tonight', final phrase slightly rushed"
            }
        ]
    }
    
    # Character consistency template
    character_template = """
═══════════════════════════════════════════════════════════════
🎭 CHARACTER VISUAL CONSISTENCY SYSTEM
═══════════════════════════════════════════════════════════════

When creating characters, establish a REFERENCE SHEET for each:

Character: [Name]
├─ Age/Build: [specific age], [height], [build type]
├─ Face: [shape], [skin tone], [distinctive features]
├─ Hair: [color], [style], [length]
├─ Eyes: [color], [expression characteristics]
├─ Clothing: [primary outfit], [colors], [style]
├─ Accessories: [glasses/jewelry/bags etc]
├─ Posture: [how they carry themselves]
└─ Color Keywords: [3-5 colors that define them]

CRITICAL: Use these EXACT details in EVERY scene's illustration_prompt where the character appears.
This ensures visual consistency for AI image generation.
"""

    # Illustration prompt template
    illustration_template = """
═══════════════════════════════════════════════════════════════
🎨 ILLUSTRATION PROMPT STRUCTURE
═══════════════════════════════════════════════════════════════

REQUIRED FORMAT (follow exactly):
[Character description] [performing action], [environment/setting details], 
[shot type and framing], [lighting setup with sources and qualities], 
[mood/atmosphere], [artistic style], [technical camera details]

MINIMUM: 60 words | MAXIMUM: 120 words

Required Elements Checklist:
✓ Subject (who): detailed character reference OR environment focus
✓ Action (what): what's happening in the frame
✓ Setting (where): specific environmental details, props, context
✓ Framing (how shot): shot type (WS/MS/CU), composition rules
✓ Lighting (key/fill/rim): light sources, colors, qualities (hard/soft)
✓ Mood: emotional atmosphere
✓ Style: artistic style (photorealistic, painted, etc)
✓ Technical: lens type, depth of field, film grain, color grading

EXAMPLE (notice the structure):
"[Dr. Maya Chen: Asian woman, early 40s, black hair in bun, wire-frame glasses, navy cardigan] examining holographic data display with focused expression, cluttered radio observatory control room with vintage 1990s equipment and satellite dish visible through window, medium shot using rule of thirds composition with subject on right third, dramatic side lighting from blue computer monitors creating sharp rim light on profile with warm amber fill from desk lamp, tense atmosphere with undertone of wonder, photorealistic cinematic style, 50mm lens equivalent at f/2.8 creating shallow depth of field with subject sharp and background softly blurred, slight film grain texture, cool blue color grading with warm accent"
"""
    
    # Get director-specific guidance if a style is selected
    director_guidance = ""
    if director_style and director_style != "none":
        try:
            director_guidance = get_director_prompt_guidance(director_style)
            director_examples = build_director_style_examples(director_style)
            director_guidance = f"""
═══════════════════════════════════════════════════════════════
🎥 DIRECTOR STYLE APPLICATION
═══════════════════════════════════════════════════════════════
{director_guidance}

{director_examples}
"""
        except Exception as e:
            director_guidance = ""
    
    # Visual continuity guidance
    continuity_guidance = build_visual_continuity_prompt(num_scenes)
    
    prompt = f"""{SYSTEM_INSTRUCTION}

MISSION: Transform the user's concept into a production-ready cinematic story with Pixar-level narrative quality and Spielberg-level visual direction.

═══════════════════════════════════════════════════════════════
⚠️  CRITICAL OUTPUT REQUIREMENT
═══════════════════════════════════════════════════════════════

Return VALID JSON ONLY:
• NO markdown code blocks (no ```)
• NO explanatory text before or after JSON
• NO trailing commas before closing brackets/braces
• NO unescaped quotes in strings (use \" for quotes inside strings)
• NO single quotes (use double quotes " for all strings)
• NO comments (no // or /* */ style comments)
• Start with {{ and end with }}
• Follow the exact schema provided below

═══════════════════════════════════════════════════════════════
📖 PERFECT EXAMPLE (learn from this structure and quality):
═══════════════════════════════════════════════════════════════

{json.dumps(example_story, indent=2)}

═══════════════════════════════════════════════════════════════
🎬 YOUR TASK
═══════════════════════════════════════════════════════════════

USER'S CONCEPT: "{user_prompt}"

PARAMETERS:
• Number of Scenes: {num_scenes} (MUST be exact)
• Genre: {genre or "Choose the most fitting genre"}
• Tone: {tone}
• Format: Cinematic short film ({aspect_ratio})

{director_guidance}

{continuity_guidance}

{character_template}

{illustration_template}

═══════════════════════════════════════════════════════════════
📋 COMPLETE JSON SCHEMA (follow exactly):
═══════════════════════════════════════════════════════════════

{{
  "visual_style": {{
    "art_style": "STRING - specific style description",
    "color_grading": "STRING - color approach and mood",
    "visual_references": ["STRING - film/artist", "STRING - film/artist"] OR null,
    "aspect_ratio": "{aspect_ratio}",
    "director_style": "{director_style if director_style != 'none' else 'null'}",
    "primary_color": "STRING - dominant color in palette",
    "secondary_color": "STRING - supporting color",
    "accent_color": "STRING - highlight color",
    "overall_color_temperature": "STRING - warm/neutral/cool",
    "lighting_approach": "STRING - overall lighting philosophy"
  }},
  
  "title": "STRING - compelling 3-10 word title",
  "logline": "STRING - one powerful sentence (15-25 words)",
  "genre": "STRING - specific genre",
  "themes": ["STRING", "STRING", "STRING"],
  "estimated_runtime": "STRING - X-Y minutes based on {num_scenes} scenes",
  
  "characters": [
    {{
      "name": "STRING - memorable name",
      "role": "STRING - protagonist/antagonist/mentor/ally",
      "personality": "STRING - 4-5 specific traits with behavioral examples (80-120 words)",
      "visual_description": "STRING - EXTREMELY DETAILED for AI image generation: age, ethnicity, build, height, hair (color/style/length), eyes (color/expression), facial features, skin tone, distinctive marks, clothing (style/colors/details), accessories, color keywords, posture. (100-150 words)",
      "arc": "STRING - character journey and transformation (50-80 words)"
    }}
    // 2-4 characters total
  ],
  
  "scenes": [
    {{
      "scene_number": NUMBER - 1 to {num_scenes},
      "title": "STRING - evocative scene title",
      "narrative_text": "STRING - 3-4 vivid paragraphs that set scene, advance plot, reveal character, create emotion (200-300 words)",
      "illustration_prompt": "STRING - MUST follow illustration template above. 60-120 words with ALL required elements. Use character reference sheet details.",
      
      "camera_direction": "STRING - camera movement type, speed, focus techniques (20-40 words)",
      "camera_angle": "STRING - specific angle and its emotional purpose (15-30 words)",
      "shot_composition": "STRING - compositional technique and subject placement (20-40 words)",
      "shot_type": "STRING - WS/MS/CU/XCU/OTS/POV/BIRD/etc.",
      "lens": "STRING - specific lens choice (e.g., '50mm', '24mm wide angle', '85mm portrait')",
      "camera_movement": "STRING - specific movement (static, dolly, pan, steadicam, crane, etc.)",
      "frame_rate": "24fps" OR "48fps for slow-motion",
      
      "lighting": "STRING - detailed lighting setup with sources, qualities, colors, ratios (40-60 words)",
      "lighting_ratio": "STRING - key to fill ratio (e.g., '2:1', '8:1')",
      "color_temperature": "STRING - lighting color temp (e.g., '3200K tungsten', '5600K daylight', 'mixed')",
      
      "mood": "STRING - specific emotional atmosphere (5-15 words)",
      "color_palette": "STRING - dominant colors, relationships, storytelling purpose (30-50 words)",
      "visual_continuity_notes": "STRING - how this maintains consistency with other scenes" OR null,
      
      "dialogue": "STRING - natural dialogue with subtext" OR null,
      "sound_design": "STRING - ambient sounds, SFX, music cues, silence (30-50 words)",
      "music_cue": "STRING - music suggestion if appropriate" OR null,
      
      "transition_in": "STRING - how scene begins (cut, fade in, dissolve, match cut, etc.)" OR null,
      "transition_out": "STRING - how scene ends for next transition" OR null
    }}
    // EXACTLY {num_scenes} scenes
  ],
  
  "storyboard": [
    {{
      "scene_number": NUMBER - matches scene,
      "shot_number": "STRING - shot identifier (1A, 1B, 2A, etc.)" OR null,
      "shot_type": "STRING - WS/MS/CU/XCU/OTS/POV",
      "shot_size": "STRING - additional descriptor" OR null,
      "duration": "STRING - XX-XX seconds",
      
      "camera_movement": "STRING - static/dolly/pan/crane/etc.",
      "lens": "STRING - lens choice (24mm, 50mm, 85mm)" OR null,
      "aperture": "STRING - f-stop (f/2.8, f/5.6)" OR null,
      
      "composition_notes": "STRING - framing, rule of thirds, balance" OR null,
      "depth_of_field": "STRING - shallow/deep" OR null,
      
      "visual_notes": "STRING - visual elements, props, blocking (40-60 words)",
      "audio_notes": "STRING - audio levels, timing, mixing (30-50 words)",
      "performance_notes": "STRING - acting direction" OR null,
      "equipment_needed": "STRING - special gear requirements" OR null,
      "vfx_notes": "STRING - visual effects needed" OR null
    }}
    // {num_scenes} entries matching scenes
  ],
  
  "narration": [
    {{
      "scene_number": NUMBER - matches scene,
      "narration_text": "STRING - poetic voice-over that complements visuals (30-50 words)",
      "emotion": "STRING - delivery emotion",
      "pacing": "STRING - pacing instruction"
    }}
    // {num_scenes} entries matching scenes
  ]
}}

═══════════════════════════════════════════════════════════════
🎯 QUALITY REQUIREMENTS
═══════════════════════════════════════════════════════════════

NARRATIVE:
✓ Strong three-act structure (even in {num_scenes} scenes)
✓ Clear protagonist goal and obstacles
✓ Emotional stakes that escalate
✓ Satisfying resolution (even if bittersweet)
✓ Each scene advances plot OR deepens character
✓ Smooth transitions between scenes

CHARACTERS:
✓ Clear motivations, fears, desires
✓ Distinct personalities (avoid archetypes)
✓ Transformation visible through actions
✓ Consistent visual details in EVERY scene
✓ Natural dialogue with subtext

VISUAL:
✓ Varied shot types create rhythm
✓ Camera angles serve story emotion
✓ Lighting evolves with narrative
✓ Color palette supports themes
✓ Each illustration prompt 60+ words
✓ Use character reference sheet in every scene

TECHNICAL:
✓ Professional cinematography terms
✓ Realistic shot durations
✓ Sound design creates immersion
✓ Storyboard matches scene count
✓ Narration complements (doesn't repeat)

═══════════════════════════════════════════════════════════════
✅ SELF-VALIDATION CHECKLIST (verify before returning):
═══════════════════════════════════════════════════════════════

□ Scene count = {num_scenes} exactly
□ Character names consistent across all scenes
□ Every illustration_prompt uses character reference details
□ Every illustration_prompt is 60-120 words
□ All illustration_prompts follow required template format
□ Storyboard has {num_scenes} entries
□ Narration has {num_scenes} entries
□ Scene numbers are sequential 1-{num_scenes}
□ JSON syntax valid (no trailing commas, proper quotes, proper nesting)
□ Themes connect to actual story events
□ Dialogue sounds natural and character-specific
□ Visual style is consistent across all scenes
□ No markdown formatting (no ``` blocks)

═══════════════════════════════════════════════════════════════

🎬 GENERATE THE COMPLETE STORY NOW.

Remember:
• Return ONLY the JSON (start with {{, end with }})
• Use the character reference sheet consistently
• Follow illustration template exactly
• Match the quality of the example above
• Make it cinema-ready

BEGIN JSON OUTPUT:
"""
    
    return prompt


def build_character_refinement_prompt(character_name: str, story_context: str) -> str:
    """
    Build a prompt to refine a character's description and arc.
    
    Args:
        character_name: Name of the character to refine
        story_context: Brief context about the story for character development
    
    Returns:
        Prompt for character refinement
    """
    prompt = f"""{SYSTEM_INSTRUCTION}

TASK: Deepen and refine the character "{character_name}" for a cinematic story.

STORY CONTEXT: {story_context}

Provide an enhanced character profile with:

1. **Visual Description** (100-150 words):
   - Extremely detailed for AI image generation
   - Age, ethnicity, build, height
   - Hair color, style, length
   - Eye color and expression characteristics
   - Facial features and skin tone
   - Distinctive marks or features
   - Clothing style, colors, specific items
   - Accessories (glasses, jewelry, bags)
   - Posture and how they carry themselves
   - 3-5 color keywords that define them visually

2. **Personality** (80-120 words):
   - 4-5 specific traits
   - Behavioral examples for each trait
   - Fears, desires, motivations
   - Speech patterns or mannerisms
   - Internal conflicts

3. **Character Arc** (50-80 words):
   - Starting state
   - Transformation journey
   - Ending state
   - Key turning point

4. **Role in Story**:
   - Protagonist/antagonist/mentor/ally
   - Function in the narrative
   - Relationships with other characters

Return a detailed character profile in JSON format matching the characters schema.
"""
    return prompt


def build_scene_expansion_prompt(scene_number: int, scene_title: str, current_narrative: str) -> str:
    """
    Build a prompt to expand a scene with more detail.
    
    Args:
        scene_number: The scene number to expand
        scene_title: Title of the scene
        current_narrative: Existing narrative text to expand upon
    
    Returns:
        Prompt for scene expansion
    """
    prompt = f"""{SYSTEM_INSTRUCTION}

TASK: Expand Scene {scene_number}: "{scene_title}" with cinematic richness.

CURRENT NARRATIVE:
{current_narrative}

Enhance this scene with:

1. **Narrative Text** (200-300 words):
   - 3-4 vivid paragraphs
   - Set the scene with sensory details
   - Advance the plot
   - Reveal character through action
   - Create emotional resonance

2. **Visual Direction**:
   - Camera direction (movement, speed, focus)
   - Camera angle and emotional purpose
   - Shot composition and framing
   - Lighting setup (key, fill, rim, ratios)
   - Color palette and grading

3. **Illustration Prompt** (60-120 words):
   - Follow the structured template
   - Include: subject, action, setting, framing, lighting, mood, style, technical details
   - Detailed enough for AI image generation
   - Consistent character descriptions

4. **Sound Design** (30-50 words):
   - Ambient sounds
   - Sound effects
   - Music cues or silence
   - Dialogue (if any)

Return the expanded scene in JSON format matching the scenes schema.
"""
    return prompt
