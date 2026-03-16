"""
Data models for StoryWeaver AI
Pydantic models for request/response validation
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict


class StoryRequest(BaseModel):
    """Request model for story generation with advanced cinematic options"""
    prompt: str = Field(..., min_length=10, description="Story concept or theme")
    num_scenes: int = Field(default=4, ge=2, le=8, description="Number of scenes")
    genre: Optional[str] = Field(default=None, description="Story genre")
    tone: Optional[str] = Field(default="dramatic", description="Story tone")
    director_style: Optional[str] = Field(default="none", description="Director visual style preset")
    aspect_ratio: Optional[str] = Field(default="16:9", description="Aspect ratio (16:9, 2.39:1, 4:3)")
    enable_enhanced_storyboard: bool = Field(default=False, description="Generate detailed shot-by-shot storyboard")


class Character(BaseModel):
    """Character profile model"""
    name: str
    role: str
    personality: str
    visual_description: str
    arc: Optional[str] = None


class Scene(BaseModel):
    """Scene model with enhanced cinematic details"""
    scene_number: int
    title: str
    narrative_text: str
    illustration_prompt: str
    image_url: Optional[str] = None  # Generated image URL
    
    # Camera work
    camera_direction: str
    camera_angle: Optional[str] = None  # low angle, high angle, eye level, dutch, etc.
    shot_composition: Optional[str] = None  # rule of thirds, symmetry, leading lines
    shot_type: Optional[str] = None  # WS, MS, CU, XCU, etc.
    lens: Optional[str] = None  # "50mm", "24mm wide angle", "85mm portrait"
    camera_movement: Optional[str] = None  # dolly, pan, steadicam, etc.
    frame_rate: Optional[str] = "24fps"
    
    # Lighting
    lighting: Optional[str] = None  # detailed lighting description
    lighting_ratio: Optional[str] = None  # "2:1", "8:1" (key to fill)
    color_temperature: Optional[str] = None  # "3200K", "5600K", "mixed"
    
    # Visual style
    mood: str
    color_palette: str
    visual_continuity_notes: Optional[str] = None  # How this scene maintains visual consistency
    
    # Audio
    dialogue: Optional[str] = None
    sound_design: Optional[str] = None  # ambient sounds for the scene
    music_cue: Optional[str] = None  # Music suggestion
    
    # Transitions
    transition_in: Optional[str] = None  # How scene begins (cut, fade, dissolve)
    transition_out: Optional[str] = None  # How scene ends


class StoryboardEntry(BaseModel):
    """Enhanced storyboard entry for production planning"""
    scene_number: int
    shot_number: Optional[str] = None  # "1A", "1B", "2A", etc.
    shot_type: str  # Reference to shot library (WS, MS, CU, etc.)
    shot_size: Optional[str] = None  # Additional descriptor
    duration: str  # Expected duration of shot
    
    # Technical details
    camera_movement: Optional[str] = None  # static, dolly, pan, etc.
    lens: Optional[str] = None  # "50mm", "24mm"
    aperture: Optional[str] = None  # "f/2.8", "f/5.6"
    
    # Composition
    composition_notes: Optional[str] = None  # Framing, balance, rule of thirds
    depth_of_field: Optional[str] = None  # "shallow", "deep"
    
    # Production notes
    visual_notes: str
    audio_notes: str
    performance_notes: Optional[str] = None  # Acting direction
    equipment_needed: Optional[str] = None  # Special gear
    vfx_notes: Optional[str] = None  # Visual effects requirements


class NarrationScript(BaseModel):
    """Narration script model"""
    scene_number: int
    narration_text: str
    emotion: str
    pacing: str


class VisualStyle(BaseModel):
    """Enhanced visual style guide for the story"""
    art_style: str  # cinematic realism, animation, noir, etc.
    color_grading: str  # warm tones, cool blues, desaturated, etc.
    visual_references: Optional[List[str]] = None  # reference films/artists
    aspect_ratio: str = "16:9"  # cinematic aspect ratio
    director_style: Optional[str] = None  # Applied director influence
    
    # Visual continuity
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    accent_color: Optional[str] = None
    overall_color_temperature: Optional[str] = None  # warm, neutral, cool
    lighting_approach: Optional[str] = None  # Overall lighting philosophy


class VisualContinuity(BaseModel):
    """Tracks visual consistency across scenes"""
    color_palette_consistency: Dict[str, str]  # Character or element colors
    lighting_continuity: Optional[str] = None  # How lighting evolves
    time_of_day_progression: Optional[List[str]] = None  # Dawn, morning, afternoon, etc.
    costume_tracking: Optional[Dict[str, str]] = None  # Character outfit notes


class StoryResponse(BaseModel):
    """Complete story response model with enhanced cinematic features"""
    title: str
    logline: str
    genre: str
    characters: List[Character]
    scenes: List[Scene]
    storyboard: List[StoryboardEntry]
    narration: List[NarrationScript]
    themes: List[str]
    visual_style: Optional[VisualStyle] = None
    visual_continuity: Optional[VisualContinuity] = None
    estimated_runtime: Optional[str] = None  # total runtime estimate
    director_style_applied: Optional[str] = None  # Which director style was used
