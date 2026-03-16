"""
Gemini Agent Service for StoryWeaver AI
Handles all interactions with Google Gemini 2.5 Flash API
"""

import google.generativeai as genai
import json
import os
import time
from typing import Dict, Any
import logging
from dotenv import load_dotenv
from models import StoryResponse
from prompts import build_story_generation_prompt
from image_generator import get_image_generator

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class GeminiAgent:
    """
    Service class for interacting with Gemini 2.5 Flash
    Handles story generation with structured multimodal outputs
    """
    
    def __init__(self, api_key: str = None):
        """
        Initialize the Gemini agent
        
        Args:
            api_key: Google Gemini API key (falls back to env var)
        """
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key or self.api_key == "your_api_key_here":
            logger.warning("⚠️  GEMINI_API_KEY not configured - API calls will fail")
            logger.warning("Get your key from: https://aistudio.google.com/app/apikey")
            self.api_key = None
            self.model = None
            return
        
        genai.configure(api_key=self.api_key)
        
        # Configure generation settings
        self.generation_config = {
            "temperature": 0.9,  # Higher for creativity
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 16384,  # Increased to prevent truncation
            "response_mime_type": "application/json",  # Force JSON mode
        }
        
        # Initialize model
        self.model = genai.GenerativeModel(
            "gemini-2.5-flash",
            generation_config=self.generation_config
        )
        
        logger.info("✅ Gemini Agent initialized with model: gemini-2.5-flash (JSON mode enabled)")
    
    
    def generate_story(
        self, 
        user_prompt: str, 
        num_scenes: int = 4,
        genre: str = None,
        tone: str = "dramatic",
        director_style: str = "none",
        aspect_ratio: str = "16:9"
    ) -> Dict[str, Any]:
        """
        Generate a complete multimodal story using Gemini with cinematic features
        
        Args:
            user_prompt: User's story concept
            num_scenes: Number of scenes to generate
            genre: Optional genre specification
            tone: Story tone/mood
            director_style: Director visual style preset (spielberg, nolan, etc.)
            aspect_ratio: Aspect ratio (16:9, 2.39:1, 4:3, 1:1)
            
        Returns:
            Parsed story data as dictionary
            
        Raises:
            Exception: If generation or parsing fails
        """
        # Check if API key is configured
        if not self.api_key:
            raise Exception("GEMINI_API_KEY not configured. Get your key from: https://aistudio.google.com/app/apikey")
        
        try:
            logger.info(f"Generating story: '{user_prompt}' ({num_scenes} scenes)")
            
            # Build sophisticated prompt with cinematic features
            prompt = build_story_generation_prompt(
                user_prompt=user_prompt,
                num_scenes=num_scenes,
                genre=genre,
                tone=tone,
                director_style=director_style,
                aspect_ratio=aspect_ratio
            )
            
            # Call Gemini API with retry logic for 504 timeouts
            logger.info("Calling Gemini 2.5 Flash API...")
            max_retries = 3
            retry_delay = 2  # seconds
            
            for attempt in range(max_retries):
                try:
                    response = self.model.generate_content(prompt)
                    break  # Success, exit retry loop
                except Exception as api_error:
                    error_msg = str(api_error)
                    if '504' in error_msg or 'Deadline Exceeded' in error_msg:
                        if attempt < max_retries - 1:
                            wait_time = retry_delay * (2 ** attempt)  # Exponential backoff
                            logger.warning(f"⚠️ Gemini API timeout (attempt {attempt + 1}/{max_retries}). Retrying in {wait_time}s...")
                            time.sleep(wait_time)
                        else:
                            logger.error(f"❌ Gemini API failed after {max_retries} attempts")
                            raise Exception("Gemini API timeout. Please try again - the API is under heavy load.")
                    else:
                        # Not a timeout error, raise immediately
                        raise
            
            # Check if response was truncated
            if hasattr(response, 'candidates') and response.candidates:
                finish_reason = response.candidates[0].finish_reason
                if finish_reason and 'MAX_TOKENS' in str(finish_reason):
                    logger.warning("⚠️ Response was truncated due to max tokens. Reducing prompt complexity...")
                    raise Exception("Response truncated - try reducing the number of scenes or simplifying the prompt")
            
            # Extract and parse response
            response_text = response.text.strip()
            logger.info(f"Received response ({len(response_text)} chars)")
            
            # Clean response (remove markdown code blocks if present)
            cleaned_response = self._clean_json_response(response_text)
            
            # Quick validation: check if response ends with closing brace
            if not cleaned_response.rstrip().endswith('}'):
                logger.warning("⚠️ Response appears truncated (doesn't end with })")
            
            # Parse JSON
            try:
                story_data = json.loads(cleaned_response)
            except json.JSONDecodeError as json_err:
                # Save failed response for debugging
                import datetime
                timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
                error_file = f"failed_response_{timestamp}.txt"
                
                try:
                    with open(error_file, 'w', encoding='utf-8') as f:
                        f.write("=== RAW RESPONSE ===\n")
                        f.write(response_text)
                        f.write("\n\n=== CLEANED RESPONSE ===\n")
                        f.write(cleaned_response)
                        f.write(f"\n\n=== ERROR ===\n{str(json_err)}")
                    logger.error(f"Failed response saved to: {error_file}")
                except Exception as save_err:
                    logger.error(f"Could not save failed response: {save_err}")
                
                # Try one more time with more aggressive cleaning
                try:
                    logger.info("Attempting aggressive JSON repair...")
                    repaired = self._repair_json(cleaned_response)
                    story_data = json.loads(repaired)
                    logger.info("✅ JSON repair successful!")
                except Exception as repair_err:
                    logger.error(f"JSON repair failed: {repair_err}")
                    raise json_err  # Raise original error
            
            # Validate structure
            self._validate_story_structure(story_data, num_scenes)
            
            # Generate images for scenes
            self._generate_scene_images(story_data)
            
            logger.info("Story generated successfully")
            return story_data
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing error: {e}")
            logger.error(f"Error at line {e.lineno}, column {e.colno}")
            logger.error(f"Response preview: {response_text[:500]}...")
            raise Exception(f"Failed to parse Gemini response as JSON: {str(e)}")
        
        except Exception as e:
            logger.error(f"Story generation error: {e}")
            raise Exception(f"Error generating story: {str(e)}")
    
    
    def _clean_json_response(self, response_text: str) -> str:
        """
        Clean the response text to extract pure JSON
        Handles common LLM response formatting issues
        
        Args:
            response_text: Raw response from Gemini
            
        Returns:
            Cleaned JSON string
        """
        import re
        
        # Log first 500 chars for debugging
        logger.debug(f"Raw response start: {response_text[:500]}")
        
        # Remove markdown code blocks
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()
        
        # Find JSON object boundaries (start with { and end with })
        # Look for the first { and last }
        first_brace = response_text.find('{')
        last_brace = response_text.rfind('}')
        
        if first_brace != -1 and last_brace != -1 and last_brace > first_brace:
            response_text = response_text[first_brace:last_brace + 1]
        
        # Remove any trailing commas before closing braces/brackets
        # This is a common LLM formatting error
        response_text = re.sub(r',(\s*[}\]])', r'\1', response_text)
        
        # Remove any line comments (// style)
        response_text = re.sub(r'//[^\n]*\n', '\n', response_text)
        
        # Remove any block comments (/* */ style)
        response_text = re.sub(r'/\*.*?\*/', '', response_text, flags=re.DOTALL)
        
        cleaned = response_text.strip()
        
        # Log length for validation
        logger.debug(f"Cleaned JSON length: {len(cleaned)} chars")
        
        return cleaned
    
    
    def _repair_json(self, json_text: str) -> str:
        """
        Attempt to repair malformed JSON with aggressive fixes
        
        Args:
            json_text: Potentially malformed JSON string
            
        Returns:
            Repaired JSON string
        """
        import re
        
        # Fix unescaped quotes in strings (common LLM issue)
        # This is tricky - we need to not break already-escaped quotes
        # Match strings and fix quotes inside them
        def fix_quotes_in_string(match):
            content = match.group(1)
            # Replace unescaped quotes with escaped quotes
            # But don't double-escape already escaped quotes
            fixed = content.replace('\\"', '<<<ESCAPED_QUOTE>>>') \
                          .replace('"', '\\"') \
                          .replace('<<<ESCAPED_QUOTE>>>', '\\"')
            return f'"{fixed}"'
        
        # Try to fix common issues
        repaired = json_text
        
        # Fix single quotes (should be double quotes in JSON)
        repaired = repaired.replace("'", '"')
        
        # Fix missing commas between array elements (heuristic)
        repaired = re.sub(r'}\s*{', '},{', repaired)
        repaired = re.sub(r']\s*\[', '],[', repaired)
        
        # Fix extra commas
        repaired = re.sub(r',(\s*[}\]])', r'\1', repaired)
        
        # Remove any control characters that might break JSON
        repaired = ''.join(char for char in repaired if ord(char) >= 32 or char in '\n\r\t')
        
        logger.debug("Applied aggressive JSON repairs")
        return repaired
    
    
    def _validate_story_structure(self, story_data: Dict[str, Any], expected_scenes: int) -> None:
        """
        Validate that the story data has the expected structure
        
        Args:
            story_data: Parsed story dictionary
            expected_scenes: Expected number of scenes
            
        Raises:
            ValueError: If structure is invalid
        """
        required_keys = ["title", "logline", "genre", "characters", "scenes", "storyboard", "narration", "themes"]
        
        for key in required_keys:
            if key not in story_data:
                raise ValueError(f"Missing required key: {key}")
        
        if len(story_data["scenes"]) != expected_scenes:
            logger.warning(
                f"Expected {expected_scenes} scenes, got {len(story_data['scenes'])}"
            )
        
        # Validate characters
        if not story_data["characters"]:
            raise ValueError("Story must have at least one character")
        
        # Validate scenes match storyboard and narration
        scene_count = len(story_data["scenes"])
        if len(story_data["storyboard"]) != scene_count:
            logger.warning("Storyboard count doesn't match scene count")
        
        if len(story_data["narration"]) != scene_count:
            logger.warning("Narration count doesn't match scene count")
        
        logger.info(f"Story structure validated: {scene_count} scenes, {len(story_data['characters'])} characters")
    
    
    def _generate_scene_images(self, story_data: Dict[str, Any]) -> None:
        """
        Generate images for each scene using the illustration prompts
        
        Args:
            story_data: Story dictionary with scenes
        """
        try:
            image_gen = get_image_generator()
            
            # Get visual style info if available
            visual_style = story_data.get("visual_style", {})
            style = visual_style.get("art_style", "cinematic")
            aspect_ratio = visual_style.get("aspect_ratio", "16:9")
            
            logger.info(f"Generating images for {len(story_data['scenes'])} scenes...")
            logger.info(f"  Visual style: {style}")
            logger.info(f"  Aspect ratio: {aspect_ratio}")
            
            for scene in story_data["scenes"]:
                scene_num = scene.get("scene_number", 0)
                prompt = scene.get("illustration_prompt", "")
                
                if prompt:
                    try:
                        # Generate image URL with aspect ratio support
                        image_url = image_gen.generate_scene_image(
                            prompt=prompt,
                            scene_number=scene_num,
                            style=style,
                            aspect_ratio=aspect_ratio
                        )
                        scene["image_url"] = image_url
                        logger.info(f"✓ Generated image for scene {scene_num}")
                    except Exception as img_error:
                        logger.error(f"Failed to generate image for scene {scene_num}: {img_error}")
                        scene["image_url"] = None
                else:
                    logger.warning(f"No illustration prompt for scene {scene_num}")
                    scene["image_url"] = None
            
            logger.info("Scene image generation complete")
            
        except Exception as e:
            logger.error(f"Error in image generation process: {e}")
            # Don't fail the whole story generation if images fail
            for scene in story_data["scenes"]:
                if "image_url" not in scene:
                    scene["image_url"] = None
    
    
    def refine_character(self, character_name: str, story_context: str) -> Dict[str, Any]:
        """
        Refine a character's details (future enhancement)
        
        Args:
            character_name: Character to refine
            story_context: Story context
            
        Returns:
            Refined character data
        """
        from prompts import build_character_refinement_prompt
        
        prompt = build_character_refinement_prompt(character_name, story_context)
        response = self.model.generate_content(prompt)
        
        cleaned = self._clean_json_response(response.text.strip())
        return json.loads(cleaned)
    
    
    def expand_scene(self, scene_number: int, scene_title: str, current_narrative: str) -> Dict[str, Any]:
        """
        Expand a specific scene with more detail (future enhancement)
        
        Args:
            scene_number: Scene to expand
            scene_title: Scene title
            current_narrative: Current narrative
            
        Returns:
            Expanded scene data
        """
        from prompts import build_scene_expansion_prompt
        
        prompt = build_scene_expansion_prompt(scene_number, scene_title, current_narrative)
        response = self.model.generate_content(prompt)
        
        cleaned = self._clean_json_response(response.text.strip())
        return json.loads(cleaned)


# Singleton instance
_gemini_agent = None

def get_gemini_agent() -> GeminiAgent:
    """
    Get or create the Gemini agent singleton
    
    Returns:
        GeminiAgent instance
    """
    global _gemini_agent
    if _gemini_agent is None:
        _gemini_agent = GeminiAgent()
    return _gemini_agent
