"""
Advanced Cinematic Features for StoryWeaver-AI
Director styles, shot libraries, and visual continuity systems
"""

from enum import Enum
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


# ============================================================================
# DIRECTOR STYLE PRESETS
# ============================================================================

class DirectorStyle(str, Enum):
    """Famous director visual styles and techniques"""
    SPIELBERG = "spielberg"
    NOLAN = "nolan"
    TARANTINO = "tarantino"
    WES_ANDERSON = "wes_anderson"
    KUBRICK = "kubrick"
    FINCHER = "fincher"
    VILLENEUVE = "villeneuve"
    MIYAZAKI = "miyazaki"
    EDGAR_WRIGHT = "edgar_wright"
    NONE = "none"


DIRECTOR_SIGNATURES = {
    DirectorStyle.SPIELBERG: {
        "name": "Steven Spielberg",
        "description": "Emotional storytelling with dynamic camera movement",
        "visual_techniques": [
            "Low-angle hero shots with backlit subjects",
            "Lens flares and golden hour lighting",
            "Wide establishing shots showing scale",
            "Dolly zoom (vertigo effect) for emotional moments",
            "Warm, optimistic color palette with amber tones"
        ],
        "camera_movement": "Dynamic tracking shots, cranes, dollies",
        "lighting_style": "Naturalistic with strong backlighting, golden hour warmth",
        "color_grading": "Warm amber tones, high contrast between light and shadow",
        "composition": "Symmetrical framing, subjects often centered or in thirds",
        "emotional_tone": "Wonder, hope, human connection",
        "typical_shots": ["Wide establishing shot", "Low angle hero shot", "Dolly zoom", "Crane shot"]
    },
    DirectorStyle.NOLAN: {
        "name": "Christopher Nolan",
        "description": "Complex narratives with IMAX-scale practical cinematography",
        "visual_techniques": [
            "Ultra-wide IMAX compositions",
            "Practical effects over CGI",
            "Time manipulation visual metaphors",
            "Intercutting parallel timelines",
            "Cool blue/steel color palette"
        ],
        "camera_movement": "Steady, deliberate movements, handheld for action",
        "lighting_style": "High contrast, dramatic shadows, cool color temperature",
        "color_grading": "Desaturated with blue/teal dominance, pops of warm orange",
        "composition": "Wide aspect ratios, geometric precision, architectural framing",
        "emotional_tone": "Intellectual tension, moral complexity, epic scale",
        "typical_shots": ["IMAX wide shot", "Dutch angle", "Extreme close-up on details", "Rotating corridor shot"]
    },
    DirectorStyle.TARANTINO: {
        "name": "Quentin Tarantino",
        "description": "Stylized violence with pop culture aesthetics",
        "visual_techniques": [
            "Trunk shot (camera inside car trunk looking up)",
            "Extreme close-ups of faces and objects",
            "Retro 70s film aesthetic",
            "Deliberate chapter structure with title cards",
            "Saturated colors, especially reds and yellows"
        ],
        "camera_movement": "Crash zooms, whip pans, smooth steadicam tracking",
        "lighting_style": "High-key lighting, vibrant and saturated",
        "color_grading": "Hyper-saturated primaries, vintage film look",
        "composition": "Unconventional angles, symmetrical character confrontations",
        "emotional_tone": "Cool confidence, tension punctuated by violence, dark humor",
        "typical_shots": ["Trunk shot", "Extreme close-up", "Low angle power shot", "Crash zoom"]
    },
    DirectorStyle.WES_ANDERSON: {
        "name": "Wes Anderson",
        "description": "Whimsical symmetry with meticulous production design",
        "visual_techniques": [
            "Perfect centered symmetrical compositions",
            "Flat space, perpendicular camera angles",
            "Pastel and vintage color palettes",
            "Whip pans between characters",
            "Planimetric framing (camera perpendicular to walls)"
        ],
        "camera_movement": "Precise lateral tracking, whip pans, slow zooms",
        "lighting_style": "Flat, even lighting, minimal shadows",
        "color_grading": "Pastel colors, vintage film stock look, carefully curated palettes",
        "composition": "Perfect symmetry, centered subjects, flat space",
        "emotional_tone": "Whimsical melancholy, nostalgic, quirky",
        "typical_shots": ["Centered symmetrical shot", "Overhead flat lay", "Slow motion walk", "Planimetric frame"]
    },
    DirectorStyle.KUBRICK: {
        "name": "Stanley Kubrick",
        "description": "Methodical perfectionism with one-point perspective",
        "visual_techniques": [
            "One-point perspective compositions",
            "Symmetrical framing with centered subjects",
            "Slow, deliberate zoom-ins",
            "Wide-angle lenses creating distortion",
            "Long takes with minimal cuts"
        ],
        "camera_movement": "Slow, hypnotic zooms and tracking shots, Steadicam mastery",
        "lighting_style": "High contrast with practical light sources, often cool tones",
        "color_grading": "Varies by film - stark whites, deep reds, clinical blues",
        "composition": "Perfect symmetry, one-point perspective, subjects often centered",
        "emotional_tone": "Unsettling perfection, existential dread, cold beauty",
        "typical_shots": ["One-point perspective", "Symmetrical tracking shot", "Slow zoom", "Wide angle distortion"]
    },
    DirectorStyle.FINCHER: {
        "name": "David Fincher",
        "description": "Dark, precise digital cinematography",
        "visual_techniques": [
            "Low light with deep shadows",
            "CGI camera movements (impossible shots)",
            "Cool, desaturated color palette",
            "Extreme attention to detail",
            "Rain and reflective surfaces"
        ],
        "camera_movement": "Invisible CGI-assisted movements, smooth dolly work",
        "lighting_style": "Low-key, chiaroscuro, pools of light in darkness",
        "color_grading": "Desaturated with green/blue tints, crushing blacks",
        "composition": "Precise framing, rule of thirds, leading lines into shadow",
        "emotional_tone": "Paranoia, darkness, meticulous control",
        "typical_shots": ["CGI impossible camera move", "Low-key chiaroscuro", "Rain-slicked streets", "Extreme detail"]
    },
    DirectorStyle.VILLENEUVE: {
        "name": "Denis Villeneuve",
        "description": "Contemplative sci-fi with immersive soundscapes",
        "visual_techniques": [
            "God's eye view overhead shots",
            "Extreme wide shots emphasizing scale",
            "Silhouettes against vast landscapes",
            "Minimal dialogue, visual storytelling",
            "Monochromatic or limited color palettes"
        ],
        "camera_movement": "Slow, meditative movements, floating aerials",
        "lighting_style": "Naturalistic with emphasis on silhouettes, hazy atmosphere",
        "color_grading": "Muted earth tones, orange/teal, monochromatic sequences",
        "composition": "Extreme scale contrast (tiny humans vs vast environments)",
        "emotional_tone": "Contemplative, awe, isolation, cosmic perspective",
        "typical_shots": ["God's eye overhead", "Extreme wide landscape", "Silhouette against sky", "Slow approach"]
    },
    DirectorStyle.MIYAZAKI: {
        "name": "Hayao Miyazaki",
        "description": "Hand-drawn animation with environmental wonder",
        "visual_techniques": [
            "Detailed backgrounds with depth",
            "Character animation with subtle realism",
            "Flying/floating sequences",
            "Nature as character",
            "Quiet contemplative moments"
        ],
        "camera_movement": "Smooth pans across detailed backgrounds, following flight",
        "lighting_style": "Soft, diffused natural light, magical glows",
        "color_grading": "Vibrant but natural colors, lush greens and blues",
        "composition": "Characters integrated into detailed environments",
        "emotional_tone": "Wonder, environmentalism, compassion, bittersweet nostalgia",
        "typical_shots": ["Sweeping landscape pan", "Flight sequence", "Quiet domestic moment", "Nature detail"]
    },
    DirectorStyle.EDGAR_WRIGHT: {
        "name": "Edgar Wright",
        "description": "Kinetic editing with visual comedy",
        "visual_techniques": [
            "Whip pans and snap zooms",
            "Match cuts on action",
            "Visual comedy through framing",
            "Exaggerated sound design synced to visuals",
            "Rapid-fire montages"
        ],
        "camera_movement": "Energetic whip pans, crash zooms, snap focus pulls",
        "lighting_style": "Bright, high-key lighting for comedy",
        "color_grading": "Vibrant, saturated, comic book colors",
        "composition": "Dynamic, often breaking rules for comedic effect",
        "emotional_tone": "Energetic, comedic, self-aware, rhythmic",
        "typical_shots": ["Whip pan transition", "Crash zoom", "Match cut", "Montage sequence"]
    },
    DirectorStyle.NONE: {
        "name": "Custom Style",
        "description": "No preset - custom cinematic approach",
        "visual_techniques": ["Custom techniques based on story needs"],
        "camera_movement": "Varies based on narrative",
        "lighting_style": "Adaptive to scene mood",
        "color_grading": "Story-appropriate palette",
        "composition": "Standard cinematic principles",
        "emotional_tone": "Driven by narrative",
        "typical_shots": ["Standard coverage"]
    }
}


# ============================================================================
# SHOT LIBRARY
# ============================================================================

class ShotType(BaseModel):
    """Detailed shot type with technical specifications"""
    name: str
    abbreviation: str
    description: str
    typical_lens: str  # e.g., "24mm wide angle", "50mm normal", "85mm portrait"
    typical_distance: str  # e.g., "25 feet", "3-6 feet", "6 inches"
    emotional_purpose: str
    movement_allowed: List[str]  # e.g., ["static", "pan", "dolly"]
    example_usage: str


SHOT_LIBRARY = {
    "XWS": ShotType(
        name="Extreme Wide Shot",
        abbreviation="XWS",
        description="Subject is very small in frame, emphasizes environment and scale",
        typical_lens="14-24mm ultra-wide angle",
        typical_distance="100+ feet",
        emotional_purpose="Establish location, show isolation, demonstrate scale",
        movement_allowed=["static", "slow pan", "aerial drone"],
        example_usage="Opening shot of vast landscape with tiny figure"
    ),
    "WS": ShotType(
        name="Wide Shot",
        abbreviation="WS",
        description="Full body of subject visible with surrounding context",
        typical_lens="24-35mm wide angle",
        typical_distance="15-50 feet",
        emotional_purpose="Establish spatial relationships, show character in environment",
        movement_allowed=["static", "pan", "dolly", "truck"],
        example_usage="Character enters room, showing full space"
    ),
    "MS": ShotType(
        name="Medium Shot",
        abbreviation="MS",
        description="Character from waist up, balances character and environment",
        typical_lens="35-50mm normal",
        typical_distance="6-12 feet",
        emotional_purpose="Standard coverage, natural perspective, conversation",
        movement_allowed=["static", "pan", "dolly", "handheld"],
        example_usage="Two people talking, waist up"
    ),
    "MCU": ShotType(
        name="Medium Close-Up",
        abbreviation="MCU",
        description="Character from chest up, emphasizes face and upper body",
        typical_lens="50-85mm portrait",
        typical_distance="3-6 feet",
        emotional_purpose="Focus on emotion, intimate conversation",
        movement_allowed=["static", "slow push-in", "handheld"],
        example_usage="Character reacting emotionally to news"
    ),
    "CU": ShotType(
        name="Close-Up",
        abbreviation="CU",
        description="Face fills the frame, eyes to chin visible",
        typical_lens="85-135mm telephoto",
        typical_distance="2-4 feet",
        emotional_purpose="Intense emotion, important dialogue, reveal character state",
        movement_allowed=["static", "very slow push", "breathing handheld"],
        example_usage="Character's face as they realize truth"
    ),
    "XCU": ShotType(
        name="Extreme Close-Up",
        abbreviation="XCU",
        description="Isolates specific detail (eyes, hands, object)",
        typical_lens="100mm+ macro or telephoto",
        typical_distance="6 inches - 2 feet",
        emotional_purpose="Emphasize crucial detail, build tension, show craftsmanship",
        movement_allowed=["static", "macro focus"],
        example_usage="Eyes widening in realization, hand gripping weapon"
    ),
    "OTS": ShotType(
        name="Over-the-Shoulder",
        abbreviation="OTS",
        description="Shot over one character's shoulder toward another",
        typical_lens="50-85mm",
        typical_distance="4-8 feet",
        emotional_purpose="Establish spatial relationship in conversation, POV without being first-person",
        movement_allowed=["static", "slight adjustment", "rack focus"],
        example_usage="Conversation between two characters, cutting between OTS angles"
    ),
    "POV": ShotType(
        name="Point of View",
        abbreviation="POV",
        description="Camera shows exactly what character sees",
        typical_lens="Varies (match character's perspective)",
        typical_distance="Varies",
        emotional_purpose="Subjective experience, empathy, suspense",
        movement_allowed=["handheld", "shaky cam", "Steadicam"],
        example_usage="Character looking through keyhole, opening door"
    ),
    "BIRD": ShotType(
        name="Bird's Eye View",
        abbreviation="BIRD",
        description="Straight down from directly above",
        typical_lens="24-35mm wide",
        typical_distance="10-50 feet above",
        emotional_purpose="God's perspective, pattern revelation, vulnerability",
        movement_allowed=["static", "slow descent/ascent", "drift"],
        example_usage="Character lying in bed, overhead view of maze"
    ),
    "DUTCH": ShotType(
        name="Dutch Angle",
        abbreviation="DUTCH",
        description="Camera tilted on axis, horizon not level",
        typical_lens="Varies",
        typical_distance="Varies",
        emotional_purpose="Unease, disorientation, psychological instability",
        movement_allowed=["static", "rotating level", "all movements tilted"],
        example_usage="Villain appears, character experiencing vertigo"
    ),
    "TWO": ShotType(
        name="Two-Shot",
        abbreviation="TWO",
        description="Two characters in frame together",
        typical_lens="35-50mm",
        typical_distance="6-10 feet",
        emotional_purpose="Relationship dynamics, balanced conversation coverage",
        movement_allowed=["static", "slight reframing", "dolly"],
        example_usage="Couple sitting together, partners discussing case"
    )
}


# ============================================================================
# CAMERA MOVEMENTS
# ============================================================================

class CameraMovement(BaseModel):
    """Detailed camera movement with technical specs"""
    name: str
    description: str
    equipment_needed: str
    speed_options: List[str]
    emotional_effects: List[str]
    difficulty: str  # "easy", "moderate", "complex"
    example_usage: str


CAMERA_MOVEMENTS = {
    "static": CameraMovement(
        name="Static",
        description="Camera does not move, locked off on tripod",
        equipment_needed="Tripod with fluid head",
        speed_options=["N/A"],
        emotional_effects=["Stability", "Observation", "Formality", "Tension through stillness"],
        difficulty="easy",
        example_usage="Formal interrogation, observing scene unfold"
    ),
    "pan": CameraMovement(
        name="Pan",
        description="Horizontal rotation on fixed axis (left/right)",
        equipment_needed="Tripod with fluid head",
        speed_options=["Slow reveal", "Medium follow", "Whip pan"],
        emotional_effects=["Discovery", "Following action", "Sudden reveal"],
        difficulty="easy",
        example_usage="Reveal landscape, follow character walking"
    ),
    "tilt": CameraMovement(
        name="Tilt",
        description="Vertical rotation on fixed axis (up/down)",
        equipment_needed="Tripod with fluid head",
        speed_options=["Slow", "Medium", "Fast"],
        emotional_effects=["Scale reveal", "Power dynamics", "Heaven/hell metaphor"],
        difficulty="easy",
        example_usage="Tilt up to reveal building height, tilt down to character below"
    ),
    "dolly": CameraMovement(
        name="Dolly",
        description="Camera moves toward or away from subject on wheeled platform",
        equipment_needed="Dolly tracks or wheeled platform",
        speed_options=["Slow push", "Steady pull", "Crash dolly"],
        emotional_effects=["Intimacy (push-in)", "Isolation (pull-out)", "Building tension"],
        difficulty="moderate",
        example_usage="Push in on character's realization, pull back from wide to wider"
    ),
    "truck": CameraMovement(
        name="Truck/Track",
        description="Camera moves left or right parallel to subject",
        equipment_needed="Dolly tracks or Steadicam",
        speed_options=["Slow drift", "Medium tracking", "Fast parallel"],
        emotional_effects=["Reveal environment", "Following action", "Smoothness"],
        difficulty="moderate",
        example_usage="Track alongside character walking down hallway"
    ),
    "pedestal": CameraMovement(
        name="Pedestal",
        description="Camera moves straight up or down",
        equipment_needed="Pedestal mount or jib arm",
        speed_options=["Slow rise", "Fast rise", "Descend"],
        emotional_effects=["Reveal height", "Changing perspective", "Grand reveal"],
        difficulty="moderate",
        example_usage="Rise up to see over wall, descend to ground level"
    ),
    "crane": CameraMovement(
        name="Crane/Jib",
        description="Camera on extended arm allowing complex arcing movements",
        equipment_needed="Crane or jib arm",
        speed_options=["Slow arc", "Sweeping rise", "Descending arc"],
        emotional_effects=["Epic scale", "God's eye transition", "Grandeur"],
        difficulty="complex",
        example_usage="Rise up and over obstacle, sweeping entrance shot"
    ),
    "steadicam": CameraMovement(
        name="Steadicam",
        description="Stabilized handheld allowing fluid movement through space",
        equipment_needed="Steadicam or gimbal",
        speed_options=["Slow float", "Walking speed", "Running"],
        emotional_effects=["Immersion", "Following organic movement", "Dreamlike"],
        difficulty="complex",
        example_usage="Following character through crowd, floating through rooms"
    ),
    "handheld": CameraMovement(
        name="Handheld",
        description="Camera held by operator, allows shake and imperfection",
        equipment_needed="Camera with shoulder mount or handles",
        speed_options=["Gentle sway", "Moderate shake", "Intense shake"],
        emotional_effects=["Realism", "Urgency", "Chaos", "Documentary feel"],
        difficulty="easy",
        example_usage="Action sequences, documentary-style realism, panic"
    ),
    "zoom": CameraMovement(
        name="Zoom",
        description="Lens focal length changes, making subject appear closer/farther",
        equipment_needed="Zoom lens",
        speed_options=["Slow zoom", "Crash zoom", "Dolly zoom (vertigo)"],
        emotional_effects=["Disorientation (dolly zoom)", "Sudden emphasis", "Discovery"],
        difficulty="easy",
        example_usage="Dolly zoom for realization moment, crash zoom for comedy"
    ),
    "aerial": CameraMovement(
        name="Aerial/Drone",
        description="Camera moves through air, typically via drone",
        equipment_needed="Drone with stabilized gimbal",
        speed_options=["Slow drift", "Sweeping arc", "Fast flyby"],
        emotional_effects=["Epic scale", "Freedom", "God's perspective", "Establishing"],
        difficulty="complex",
        example_usage="Opening establishing shot, reveal location from above"
    )
}


# ============================================================================
# VISUAL CONTINUITY SYSTEM
# ============================================================================

class VisualContinuity(BaseModel):
    """Tracks visual elements that should remain consistent across scenes"""
    primary_color: str = Field(..., description="Dominant color in the story's palette")
    secondary_color: str = Field(..., description="Supporting color")
    accent_color: str = Field(..., description="Highlight/contrast color")
    color_temperature: str = Field(..., description="Overall warmth: warm, neutral, cool")
    lighting_motivation: str = Field(..., description="Primary light source logic across scenes")
    time_of_day_progression: Optional[List[str]] = Field(None, description="How time evolves through story")
    weather_continuity: Optional[str] = Field(None, description="Weather conditions and changes")
    costume_continuity: Dict[str, str] = Field(default_factory=dict, description="Character outfit tracking")


class SceneTransition(BaseModel):
    """How one scene flows into the next"""
    from_scene: int
    to_scene: int
    transition_type: str  # "cut", "dissolve", "fade", "match_cut", "wipe", "iris"
    transition_duration: str  # "instant", "0.5s", "2s", etc.
    visual_link: Optional[str] = Field(None, description="What visually connects the scenes")
    audio_link: Optional[str] = Field(None, description="Sound bridge or music connection")


# ============================================================================
# ENHANCED STORYBOARD
# ============================================================================

class ShotDetail(BaseModel):
    """Comprehensive shot specification for production"""
    shot_number: str  # e.g., "1A", "2B"
    scene_number: int
    shot_type: str  # Reference to SHOT_LIBRARY
    shot_size: str  # "XWS", "WS", "MS", "CU", etc.
    camera_movement: str  # Reference to CAMERA_MOVEMENTS
    lens: str  # "24mm", "50mm", "85mm"
    aperture: str  # "f/2.8", "f/5.6"
    frame_rate: str = "24fps"  # Standard cinema is 24fps, can be 48/60 for slow-mo
    duration: str  # "3-5 seconds", "10 seconds"
    
    # Composition
    composition_technique: str  # "Rule of thirds", "Symmetry", "Leading lines"
    subject_placement: str  # "Center", "Left third", "Right third"
    depth_of_field: str  # "Shallow (f/1.4)", "Deep (f/11)"
    
    # Lighting
    lighting_setup: str  # Detailed description of key, fill, rim, practical lights
    color_temperature: str  # "3200K tungsten", "5600K daylight"
    lighting_ratio: str  # "2:1", "8:1" (key to fill ratio)
    
    # Action
    action_description: str  # What happens in the shot
    dialogue: Optional[str] = None
    performance_notes: Optional[str] = None  # Acting direction
    
    # Technical
    equipment_notes: Optional[str] = None  # Special gear needed
    vfx_notes: Optional[str] = None  # VFX requirements
    continuity_notes: Optional[str] = None  # Props, costume checks


class EnhancedStoryboard(BaseModel):
    """Complete production storyboard with shot-by-shot breakdown"""
    story_title: str
    director_style: Optional[DirectorStyle] = DirectorStyle.NONE
    total_estimated_runtime: str
    aspect_ratio: str = "16:9"
    
    visual_continuity: VisualContinuity
    scene_transitions: List[SceneTransition]
    shots: List[ShotDetail]
    
    production_notes: Optional[str] = None  # Overall production considerations
    budget_tier: Optional[str] = Field(None, description="indie, mid-budget, blockbuster")


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_director_prompt_guidance(director: DirectorStyle) -> str:
    """Generate prompt guidance based on selected director style"""
    if director == DirectorStyle.NONE:
        return ""
    
    style = DIRECTOR_SIGNATURES[director]
    
    guidance = f"""
DIRECTOR STYLE: {style['name']}
{style['description']}

Visual Techniques to Incorporate:
{chr(10).join(f"• {technique}" for technique in style['visual_techniques'])}

Camera Movement: {style['camera_movement']}
Lighting Style: {style['lighting_style']}
Color Grading: {style['color_grading']}
Composition Approach: {style['composition']}
Emotional Tone: {style['emotional_tone']}

Prioritize these shot types:
{', '.join(style['typical_shots'])}

Apply this director's signature style throughout all scenes while adapting to the story's specific needs.
"""
    return guidance


def get_shot_technical_specs(shot_abbreviation: str) -> ShotType:
    """Get detailed technical specifications for a shot type"""
    return SHOT_LIBRARY.get(shot_abbreviation, SHOT_LIBRARY["MS"])


def get_movement_specs(movement_name: str) -> CameraMovement:
    """Get detailed specifications for a camera movement"""
    return CAMERA_MOVEMENTS.get(movement_name, CAMERA_MOVEMENTS["static"])


def build_visual_continuity_prompt(scenes: int) -> str:
    """Generate prompt section for maintaining visual continuity"""
    return f"""
VISUAL CONTINUITY REQUIREMENTS:

Establish a consistent visual language across all {scenes} scenes:

1. COLOR PALETTE (consistent throughout):
   - Primary Color: [Choose one dominant color]
   - Secondary Color: [Supporting color that complements]
   - Accent Color: [Contrast color for key moments]
   - Color Temperature: [Overall warm/neutral/cool feel]

2. LIGHTING CONTINUITY:
   - Define lighting motivation (time of day, specific sources)
   - Maintain consistent light quality across scenes
   - Track time-of-day progression logically

3. CHARACTER CONTINUITY:
   - Keep costume descriptions identical unless story demands change
   - Maintain character's visual signature (colors, accessories)

4. SCENE TRANSITIONS:
   - Note visual or audio elements that link scenes
   - Suggest transition types (cut, dissolve, match-cut)

These elements create cohesive visual storytelling and production feasibility.
"""


def build_director_style_examples(director: DirectorStyle) -> str:
    """Provide specific shot examples in director's style"""
    if director == DirectorStyle.NONE:
        return ""
    
    style = DIRECTOR_SIGNATURES[director]
    examples = "\n".join([
        "EXAMPLE SHOT DESCRIPTIONS IN THIS STYLE:",
        ""
    ])
    
    # Generate style-specific shot examples
    if director == DirectorStyle.SPIELBERG:
        examples += """
Scene 1 opening: "XWS - Aerial view of vast desert at golden hour, warm amber light streaming through dust particles. Camera cranes down from bird's eye to reveal small figure casting long shadow. Lens flare from setting sun. 35mm anamorphic, f/2.8, slow crane descent."

Character introduction: "MS - Low angle shot looking up at protagonist backlit by setting sun, creating silhouette with glowing rim light. Camera dollies in slightly as character turns to face us, lens flare streaking across frame. 50mm, f/2.0, dolly forward."
"""
    elif director == DirectorStyle.WES_ANDERSON:
        examples += """
Scene 1 opening: "WS - Perfectly centered symmetrical shot of character in pastel pink and mint green room. Camera perpendicular to back wall. Character centered exactly in frame. Flat, even lighting. 40mm, f/5.6, static."

Character movement: "MS - Character walks from left to right across frame in perfect center. Camera whip pans to follow, ending in symmetrically balanced composition. Pastel color palette. 50mm, f/4.0, whip pan."
"""
    elif director == DirectorStyle.NOLAN:
        examples += """
Scene 1 opening: "XWS - IMAX format ultra-wide shot of geometric cityscape, cool blue tones, high contrast. Architectural lines create symmetrical perspective. 24mm IMAX, f/8, static, desaturated with teal/orange grading."

Tension moment: "CU - Extreme close-up of eyes with sharp focus, cool blue light from screen reflected. Shallow depth of field isolating face from dark background. High contrast, desaturated. 85mm, f/1.4, static."
"""
    
    return examples
