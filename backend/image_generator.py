"""
AI Image Generation Service for StoryWeaver AI - v2.0
Handles generating visual content from scene illustration prompts

Supports multiple AI image generation providers:
- Imagen 3 (Google's image generation model) - PRIMARY
- DALL-E 3 (OpenAI) - FALLBACK
- Stable Diffusion (Via Stability AI API) - FALLBACK
- Placeholder (Development/Demo)

Features:
- Consistent 16:9 cinematic format (1024x576)
- Visual style consistency across scenes
- Graceful fallbacks on failure
- Caching for cost optimization
- Rate limiting protection
"""

import logging
import os
import time
import hashlib
from typing import Optional, Dict, Any, List
from urllib.parse import quote
from enum import Enum

logger = logging.getLogger(__name__)


class ImageProvider(str, Enum):
    """Supported image generation providers"""
    IMAGEN = "imagen"           # Google Imagen 3 (Primary)
    DALLE = "dalle"             # OpenAI DALL-E 3 (Fallback)
    STABILITY = "stability"     # Stability AI (Fallback)
    PLACEHOLDER = "placeholder" # Development mode


class ImageGenerationError(Exception):
    """Custom exception for image generation failures"""
    pass


class ImageCache:
    """Simple in-memory cache for generated images"""
    
    def __init__(self, max_size: int = 100):
        self._cache: Dict[str, str] = {}
        self.max_size = max_size
    
    def _hash_prompt(self, prompt: str, width: int, height: int) -> str:
        """Create cache key from prompt and dimensions"""
        key = f"{prompt}_{width}x{height}"
        return hashlib.md5(key.encode()).hexdigest()
    
    def get(self, prompt: str, width: int, height: int) -> Optional[str]:
        """Get cached image URL if available"""
        key = self._hash_prompt(prompt, width, height)
        return self._cache.get(key)
    
    def set(self, prompt: str, width: int, height: int, url: str):
        """Cache an image URL"""
        if len(self._cache) >= self.max_size:
            # Simple LRU: remove first item
            self._cache.pop(next(iter(self._cache)))
        key = self._hash_prompt(prompt, width, height)
        self._cache[key] = url
    
    def clear(self):
        """Clear the cache"""
        self._cache.clear()


class ImageGenerator:
    """
    Service for generating scene illustrations with multiple provider support
    
    Features:
    - Multi-provider fallback system
    - Consistent cinematic 16:9 format
    - Visual style preservation
    - Caching for performance
    - Rate limiting protection
    """
    
    def __init__(
        self, 
        primary_provider: str = "placeholder",
        fallback_providers: Optional[List[str]] = None,
        enable_cache: bool = True
    ):
        """
        Initialize the image generator with provider chain
        
        Args:
            primary_provider: Primary image generation service
            fallback_providers: List of fallback providers in order
            enable_cache: Enable caching of generated images
        """
        self.primary_provider = primary_provider
        self.fallback_providers = fallback_providers or ["placeholder"]
        self.enable_cache = enable_cache
        self.cache = ImageCache() if enable_cache else None
        
        # Load API keys from environment
        self.imagen_api_key = os.getenv("IMAGEN_API_KEY")
        self.dalle_api_key = os.getenv("OPENAI_API_KEY")
        self.stability_api_key = os.getenv("STABILITY_API_KEY")
        
        # Track rate limits
        self.rate_limit_tracker: Dict[str, List[float]] = {}
        
        logger.info(f"Image Generator initialized")
        logger.info(f"  Primary: {self.primary_provider}")
        logger.info(f"  Fallbacks: {', '.join(self.fallback_providers)}")
        logger.info(f"  Cache: {'enabled' if enable_cache else 'disabled'}")
        
        self._validate_provider_availability()
    
    def _validate_provider_availability(self):
        """Check which providers are properly configured"""
        if self.primary_provider == "imagen" and not self.imagen_api_key:
            logger.warning("⚠️  Imagen selected but IMAGEN_API_KEY not configured")
        if self.primary_provider == "dalle" and not self.dalle_api_key:
            logger.warning("⚠️  DALL-E selected but OPENAI_API_KEY not configured")
        if self.primary_provider == "stability" and not self.stability_api_key:
            logger.warning("⚠️  Stability AI selected but STABILITY_API_KEY not configured")
    
    def _check_rate_limit(self, provider: str, max_per_minute: int = 10) -> bool:
        """
        Check if we're within rate limits for a provider
        
        Args:
            provider: Provider name
            max_per_minute: Maximum requests per minute
            
        Returns:
            True if within limits, False if rate limited
        """
        now = time.time()
        if provider not in self.rate_limit_tracker:
            self.rate_limit_tracker[provider] = []
        
        # Remove timestamps older than 1 minute
        self.rate_limit_tracker[provider] = [
            ts for ts in self.rate_limit_tracker[provider] 
            if now - ts < 60
        ]
        
        # Check if we're at the limit
        if len(self.rate_limit_tracker[provider]) >= max_per_minute:
            logger.warning(f"Rate limit reached for {provider}")
            return False
        
        # Add current request
        self.rate_limit_tracker[provider].append(now)
        return True
    
    def generate_scene_image(
        self, 
        prompt: str, 
        scene_number: int,
        width: int = 1024,
        height: int = 576,  # 16:9 aspect ratio
        style: str = "cinematic",
        aspect_ratio: str = "16:9"
    ) -> str:
        """
        Generate an image for a scene with automatic fallback
        
        Args:
            prompt: Detailed illustration prompt
            scene_number: Scene number for tracking
            width: Image width in pixels (default 1024 for 16:9)
            height: Image height in pixels (default 576 for 16:9)
            style: Visual style hint
            aspect_ratio: Aspect ratio string (e.g., "16:9", "2.39:1")
            
        Returns:
            URL to the generated image
        """
        # Adjust dimensions based on aspect ratio
        width, height = self._get_dimensions_for_aspect_ratio(aspect_ratio)
        
        # Check cache first
        if self.enable_cache and self.cache:
            cached_url = self.cache.get(prompt, width, height)
            if cached_url:
                logger.info(f"Using cached image for scene {scene_number}")
                return cached_url
        
        # Try primary provider first
        providers_to_try = [self.primary_provider] + self.fallback_providers
        
        for provider in providers_to_try:
            try:
                # Check rate limits
                if not self._check_rate_limit(provider):
                    logger.warning(f"Skipping {provider} due to rate limit")
                    continue
                
                logger.info(f"Attempting image generation with {provider} for scene {scene_number}")
                
                if provider == "imagen":
                    url = self._generate_imagen(prompt, width, height, style)
                elif provider == "dalle":
                    url = self._generate_dalle(prompt, width, height)
                elif provider == "stability":
                    url = self._generate_stability(prompt, width, height, style)
                elif provider == "placeholder":
                    url = self._generate_placeholder(prompt, scene_number, width, height)
                else:
                    logger.warning(f"Unknown provider: {provider}, trying next")
                    continue
                
                # Cache successful generation
                if self.enable_cache and self.cache and url:
                    self.cache.set(prompt, width, height, url)
                
                logger.info(f"✓ Image generated successfully with {provider}")
                return url
                
            except Exception as e:
                logger.error(f"Failed to generate image with {provider}: {e}")
                continue
        
        # All providers failed, return placeholder as last resort
        logger.error("All image providers failed, using final fallback")
        return self._generate_placeholder(prompt, scene_number, width, height)
    
    def _get_dimensions_for_aspect_ratio(self, aspect_ratio: str) -> tuple[int, int]:
        """
        Get appropriate dimensions for aspect ratio
        
        Args:
            aspect_ratio: Aspect ratio string (e.g., "16:9", "2.39:1", "4:3", "1:1")
            
        Returns:
            Tuple of (width, height)
        """
        # Map aspect ratios to dimensions (optimized for AI generation)
        aspect_map = {
            "16:9": (1024, 576),     # Standard widescreen
            "2.39:1": (1024, 428),   # Cinematic widescreen
            "4:3": (1024, 768),      # Classic/Academy
            "1:1": (1024, 1024),     # Square
            "9:16": (576, 1024),     # Vertical (social media)
        }
        
        return aspect_map.get(aspect_ratio, (1024, 576))  # Default to 16:9
    
    # ========================================================================
    # IMAGEN 3 (Google) Implementation
    # ========================================================================
    
    def _generate_imagen(self, prompt: str, width: int, height: int, style: str) -> str:
        """
        Generate image using Google Imagen 3
        
        Args:
            prompt: Image generation prompt
            width: Image width
            height: Image height
            style: Visual style hint
            
        Returns:
            Image URL or raises ImageGenerationError
        """
        if not self.imagen_api_key:
            raise ImageGenerationError("Imagen API key not configured")
        
        try:
            import google.generativeai as genai
            from google.generativeai import types
            
            # Configure Imagen
            genai.configure(api_key=self.imagen_api_key)
            
            # Enhance prompt for cinematic quality
            enhanced_prompt = self._enhance_prompt_for_imagen(prompt, style)
            
            # Generate image using Imagen 3
            # Note: This uses the ImageGenerationModel API
            model = genai.ImageGenerationModel("imagen-3.0-generate-001")
            
            result = model.generate_images(
                prompt=enhanced_prompt,
                number_of_images=1,
                aspect_ratio=f"{width}:{height}",
                safety_filter_level="block_some",
                person_generation="allow_adult",
            )
            
            if result.images:
                # Save to temporary storage or cloud storage
                # For now, return base64 data URL
                image_data = result.images[0]._pil_image
                import io
                import base64
                buffered = io.BytesIO()
                image_data.save(buffered, format="PNG")
                img_str = base64.b64encode(buffered.getvalue()).decode()
                
                return f"data:image/png;base64,{img_str}"
            else:
                raise ImageGenerationError("No image generated by Imagen")
                
        except Exception as e:
            logger.error(f"Imagen generation failed: {e}")
            raise ImageGenerationError(f"Imagen error: {e}")
    
    def _enhance_prompt_for_imagen(self, prompt: str, style: str) -> str:
        """Enhance prompt specifically for Imagen 3"""
        # Imagen works best with clear, descriptive prompts
        enhancements = []
        
        if "cinematic" in style.lower():
            enhancements.append("cinematic photography")
        if "photorealistic" in prompt.lower() or "photorealistic" in style.lower():
            enhancements.append("highly detailed")
            enhancements.append("professional photography")
        
        # Ensure quality keywords
        quality_keywords = ["high quality", "detailed", "sharp focus"]
        has_quality = any(kw in prompt.lower() for kw in quality_keywords)
        if not has_quality:
            enhancements.append("high quality")
        
        if enhancements:
            return f"{prompt}, {', '.join(enhancements)}"
        return prompt
    
    # ========================================================================
    # DALL-E 3 (OpenAI) Implementation
    # ========================================================================
    
    def _generate_dalle(self, prompt: str, width: int, height: int) -> str:
        """
        Generate image using OpenAI DALL-E 3
        
        Args:
            prompt: Image generation prompt
            width: Image width (DALL-E supports 1024x1024, 1792x1024, 1024x1792)
            height: Image height
            
        Returns:
            Image URL or raises ImageGenerationError
        """
        if not self.dalle_api_key:
            raise ImageGenerationError("OpenAI API key not configured")
        
        try:
            from openai import OpenAI
            
            client = OpenAI(api_key=self.dalle_api_key)
            
            # DALL-E 3 size constraints
            size = self._get_dalle_size(width, height)
            
            # Enhance prompt for DALL-E
            enhanced_prompt = self._enhance_prompt_for_dalle(prompt)
            
            # Generate image
            response = client.images.generate(
                model="dall-e-3",
                prompt=enhanced_prompt,
                size=size,
                quality="hd",  # HD quality for better results
                n=1,
            )
            
            if response.data:
                return response.data[0].url
            else:
                raise ImageGenerationError("No image generated by DALL-E")
                
        except Exception as e:
            logger.error(f"DALL-E generation failed: {e}")
            raise ImageGenerationError(f"DALL-E error: {e}")
    
    def _get_dalle_size(self, width: int, height: int) -> str:
        """Map dimensions to DALL-E 3 supported sizes"""
        ratio = width / height
        
        if ratio > 1.5:  # Wide
            return "1792x1024"
        elif ratio < 0.8:  # Tall
            return "1024x1792"
        else:  # Square-ish
            return "1024x1024"
    
    def _enhance_prompt_for_dalle(self, prompt: str) -> str:
        """
        Enhance prompt for DALL-E 3
        DALL-E automatically enhances prompts, but we can guide it
        """
        # Truncate if too long (DALL-E has 4000 char limit)
        if len(prompt) > 3500:
            prompt = prompt[:3500] + "..."
        
        # DALL-E works best with natural language
        return prompt
    
    # ========================================================================
    # Stability AI (Stable Diffusion) Implementation
    # ========================================================================
    
    def _generate_stability(self, prompt: str, width: int, height: int, style: str) -> str:
        """
        Generate image using Stability AI (Stable Diffusion)
        
        Args:
            prompt: Image generation prompt
            width: Image width
            height: Image height
            style: Visual style hint
            
        Returns:
            Image URL or raises ImageGenerationError
        """
        if not self.stability_api_key:
            raise ImageGenerationError("Stability API key not configured")
        
        try:
            import requests
            
            # Stability AI API endpoint
            url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
            
            # Enhance prompt for Stable Diffusion
            enhanced_prompt = self._enhance_prompt_for_stability(prompt, style)
            
            headers = {
                "Authorization": f"Bearer {self.stability_api_key}",
                "Content-Type": "application/json",
            }
            
            body = {
                "text_prompts": [
                    {
                        "text": enhanced_prompt,
                        "weight": 1
                    },
                    {
                        "text": "blurry, bad quality, distorted, ugly, amateur",
                        "weight": -1  # Negative prompt
                    }
                ],
                "cfg_scale": 7,
                "height": height,
                "width": width,
                "samples": 1,
                "steps": 30,
            }
            
            response = requests.post(url, headers=headers, json=body, timeout=60)
            
            if response.status_code == 200:
                data = response.json()
                # Return base64 encoded image
                image_b64 = data["artifacts"][0]["base64"]
                return f"data:image/png;base64,{image_b64}"
            else:
                raise ImageGenerationError(f"Stability API error: {response.status_code}")
                
        except Exception as e:
            logger.error(f"Stability AI generation failed: {e}")
            raise ImageGenerationError(f"Stability error: {e}")
    
    def _enhance_prompt_for_stability(self, prompt: str, style: str) -> str:
        """Enhance prompt for Stable Diffusion"""
        enhancements = []
        
        # Add quality boosters
        enhancements.append("masterpiece")
        enhancements.append("best quality")
        
        if "cinematic" in style.lower():
            enhancements.append("cinematic lighting")
            enhancements.append("film grain")
        
        return f"{prompt}, {', '.join(enhancements)}"
    
    # ========================================================================
    # Placeholder Implementation
    # ========================================================================
    
    def _generate_placeholder(
        self, 
        prompt: str, 
        scene_number: int,
        width: int,
        height: int
    ) -> str:
        """
        Generate a placeholder image URL for development/demo
        
        Args:
            prompt: Illustration prompt (used for seed)
            scene_number: Scene number
            width: Image width
            height: Image height
            
        Returns:
            Placeholder image URL
        """
        # Curated list of cinematic Unsplash photo IDs (high quality, verified working)
        # These cover various cinematic styles: landscapes, urban, abstract, portraits, etc.
        cinematic_photos = [
            "1507003211169-0a1dd7228f2d",  # Portrait/person (lighthouse keeper style)
            "1419242902214-272b3f66ee7a",  # Night/ocean/mysterious
            "1559827260-dc66d52bef19",     # Ocean/water/seascape
            "1518837695005-2083093ee35b",  # Lighthouse/coastal
            "1682687982501-1e58ab814714",  # Underwater/abstract
            "1579546929518-9e396f3cc809",  # Urban/city night
            "1451187580459-43490c3f84b88", # Dramatic landscape
            "1506905925346-21bda4d32df4",  # Abstract/artistic
            "1472214103451-9374bd1c798e",  # Nature/forest
            "1506905925346-21bda4d32df4",  # Cinematic lighting
        ]
        
        # Select photo based on scene number (cycles through list)
        photo_id = cinematic_photos[scene_number % len(cinematic_photos)]
        
        # Use Unsplash's CDN with proper parameters
        url = f"https://images.unsplash.com/photo-{photo_id}?w={width}&h={height}&fit=crop&q=80"
        
        logger.info(f"Generated placeholder image URL for scene {scene_number}: {url}")
        return url


# ============================================================================
# Singleton Instance
# ============================================================================

_image_generator_instance: Optional[ImageGenerator] = None


def get_image_generator() -> ImageGenerator:
    """
    Get singleton instance of ImageGenerator
    
    Configuration is read from environment variables:
    - IMAGE_PROVIDER: Primary provider (default: "placeholder")
    - IMAGE_FALLBACK_PROVIDERS: Comma-separated list of fallback providers
    - IMAGE_CACHE_ENABLED: Enable caching (default: "true")
    
    Returns:
        ImageGenerator instance
    """
    global _image_generator_instance
    
    if _image_generator_instance is None:
        # Read configuration from environment
        primary = os.getenv("IMAGE_PROVIDER", "placeholder")
        fallbacks_str = os.getenv("IMAGE_FALLBACK_PROVIDERS", "placeholder")
        fallbacks = [f.strip() for f in fallbacks_str.split(",")]
        cache_enabled = os.getenv("IMAGE_CACHE_ENABLED", "true").lower() == "true"
        
        _image_generator_instance = ImageGenerator(
            primary_provider=primary,
            fallback_providers=fallbacks,
            enable_cache=cache_enabled
        )
    
    return _image_generator_instance


def reset_image_generator():
    """Reset the singleton instance (useful for testing)"""
    global _image_generator_instance
    _image_generator_instance = None
