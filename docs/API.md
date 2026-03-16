# StoryWeaver AI - API Documentation

## Base URL

- Development: `http://localhost:8000`
- Production: Your deployed URL

## Interactive Documentation

FastAPI automatically generates interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Authentication

Currently, the API does not require authentication. In production, consider implementing:
- API key authentication
- JWT tokens
- Rate limiting per user/IP

## Endpoints

### Health Check

Check if the API is running and healthy.

**Endpoint**: `GET /health`

**Response**:
```json
{
  "status": "healthy",
  "service": "StoryWeaver AI"
}
```

**Status Codes**:
- `200 OK`: Service is healthy

**Example**:
```bash
curl http://localhost:8000/health
```

---

### Generate Story

Generate a multimodal story with narrative text and image prompts.

**Endpoint**: `POST /generate-story`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:

| Field | Type | Required | Description | Default |
|-------|------|----------|-------------|---------|
| prompt | string | Yes | The story idea or theme | - |
| num_scenes | integer | No | Number of scenes (2-8) | 4 |

**Request Schema**:
```json
{
  "prompt": "string",
  "num_scenes": 4
}
```

**Example Request**:
```json
{
  "prompt": "A lone astronaut discovers a mysterious signal on Mars",
  "num_scenes": 4
}
```

**Response Schema**:
```json
{
  "title": "string",
  "scenes": [
    {
      "scene_number": 1,
      "narrative_text": "string",
      "image_prompt": "string"
    }
  ]
}
```

**Example Response**:
```json
{
  "title": "The Signal from Mars",
  "scenes": [
    {
      "scene_number": 1,
      "narrative_text": "Commander Sarah Chen stood alone in the observation dome of the Mars Outpost Alpha, her breath fogging the reinforced glassteel as she gazed across the rust-red dunes stretching to the horizon. Three months into her solo mission, the isolation had become a comfortable companion—until now. The rhythmic pulse emanating from her communications array had started exactly 47 minutes ago, a pattern too deliberate to be natural interference.\n\nShe pulled up the spectrograph analysis on her tablet, her fingers trembling slightly. The signal repeated every 3.14159 seconds—pi. Someone, or something, was using mathematics as a universal language. Sarah's heart raced as she cross-referenced every known satellite, probe, and human transmission in the solar system. None matched. This was coming from Mars itself.",
      "image_prompt": "A lone astronaut in an orange spacesuit standing in a transparent dome observatory on Mars, looking out at vast rust-colored dunes under a pink sky. Futuristic holographic displays float around her showing waveform patterns and data. The lighting is dramatic with the setting sun casting long shadows across the Martian landscape. Cinematic sci-fi aesthetic, photorealistic, detailed textures."
    },
    {
      "scene_number": 2,
      "narrative_text": "Sarah's rover kicked up plumes of fine Martian dust as she raced toward the signal's source, forty kilometers northeast in the Valles Marineris canyon system. The coordinates led to an area marked as 'unexplored' on her maps—a deep crevasse that scanner satellites had somehow missed. As she approached the canyon edge, her equipment registered electromagnetic anomalies that made the readings spike wildly.\n\nThe sun was setting, painting the canyon walls in deep oranges and purples. Sarah carefully maneuvered the rover down a natural ramp into the crevasse, her headlights cutting through the gathering darkness. That's when she saw it—a subtle geometric pattern in the canyon wall, too perfect to be natural erosion. Her gloved hand reached out, fingers tracing symbols that seemed to shimmer with an internal light.",
      "image_prompt": "A Mars rover with bright headlights descending into a massive canyon at sunset. The canyon walls show mysterious geometric patterns and symbols that glow faintly with blue-green bioluminescence. An astronaut in an orange suit stands beside the rover, touching the luminous wall patterns. Dramatic lighting with pink-purple sunset sky above and dark shadows in the canyon. Ultra-detailed, cinematic composition, 8k quality."
    },
    {
      "scene_number": 3,
      "narrative_text": "The moment Sarah's hand made contact, the symbols flared to life, cascading across the rock face like liquid light. A section of the wall began to shift, ancient mechanisms grinding to life after millennia of silence. Dust and small rocks tumbled as a doorway—perfectly circular and seamless—revealed itself in the canyon wall. Beyond the threshold, soft blue light emanated from within, and the signal that had drawn her here intensified, now almost musical in its pattern.\n\nSarah's rational mind screamed at her to report this immediately, to wait for protocols and backup teams. But her explorer's heart knew that some discoveries demanded boldness. She checked her suit's oxygen levels—six hours remaining—and stepped through the ancient doorway into the unknown. The temperature readings inside showed an impossible 22 degrees Celsius, and her atmospheric sensor detected breathable air. This was not a natural cave.",
      "image_prompt": "Inside an alien structure on Mars: vast chambers with smooth walls covered in glowing blue hieroglyphic-like symbols. An astronaut stands at the entrance, silhouetted against the doorway opening to the red Martian landscape behind. The interior has advanced geometric architecture with floating crystalline structures that emit soft light. Ancient yet technologically advanced aesthetic blending organic and synthetic forms. Mysterious, awe-inspiring atmosphere, highly detailed."
    },
    {
      "scene_number": 4,
      "narrative_text": "Sarah walked through halls that defied human understanding of architecture, where walls curved in impossible angles and gravity seemed to be a mere suggestion in certain chambers. At the heart of the structure, she found it—a chamber dominated by a crystalline sphere three meters in diameter, suspended in the air and pulsing with the signal that had called to her. As she approached, the sphere's surface rippled like liquid mercury, and images began to form.\n\nShe witnessed the rise and fall of a Martian civilization, their achievements and their desperate final message. They had known their world was dying and had built this beacon as a testament, a warning, and an invitation. The signal wasn't just mathematics—it was a test of curiosity, of courage, of worthiness to receive their legacy. As the last vision faded, the sphere split open, revealing a data core of technology beyond human comprehension. Sarah smiled, realizing that humanity's future among the stars had just begun. She reached out, and history changed forever.",
      "image_prompt": "A massive crystalline sphere floating in the center of an ancient alien chamber, glowing with internal light and displaying holographic projections of Martian history—cities, beings, planetary transformation. An astronaut stands before it with arms outstretched toward an opening sphere revealing advanced technology inside. The chamber has bioluminescent walls with flowing energy patterns. Epic scale, otherworldly beauty, photorealistic sci-fi art, dramatic lighting, sense of discovery and wonder."
    }
  ]
}
```

**Status Codes**:
- `200 OK`: Story generated successfully
- `422 Unprocessable Entity`: Invalid request body
- `500 Internal Server Error`: Error during generation

**Error Response**:
```json
{
  "detail": "Error message describing what went wrong"
}
```

**Example using cURL**:
```bash
curl -X POST "http://localhost:8000/generate-story" \
     -H "Content-Type: application/json" \
     -d '{
       "prompt": "A detective cat solves mysteries in a steampunk city",
       "num_scenes": 3
     }'
```

**Example using Python**:
```python
import requests

response = requests.post(
    "http://localhost:8000/generate-story",
    json={
        "prompt": "A detective cat solves mysteries in a steampunk city",
        "num_scenes": 3
    }
)

if response.status_code == 200:
    story = response.json()
    print(f"Title: {story['title']}")
    for scene in story['scenes']:
        print(f"\nScene {scene['scene_number']}:")
        print(scene['narrative_text'])
else:
    print(f"Error: {response.json()['detail']}")
```

**Example using JavaScript/Fetch**:
```javascript
const response = await fetch('http://localhost:8000/generate-story', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'A detective cat solves mysteries in a steampunk city',
    num_scenes: 3
  })
});

if (response.ok) {
  const story = await response.json();
  console.log('Title:', story.title);
  story.scenes.forEach(scene => {
    console.log(`Scene ${scene.scene_number}:`, scene.narrative_text);
  });
} else {
  const error = await response.json();
  console.error('Error:', error.detail);
}
```

## Response Field Descriptions

### StoryResponse

| Field | Type | Description |
|-------|------|-------------|
| title | string | The generated title of the story |
| scenes | Scene[] | Array of scene objects |

### Scene

| Field | Type | Description |
|-------|------|-------------|
| scene_number | integer | Sequential number (1-based) |
| narrative_text | string | 2-3 paragraphs of story narrative |
| image_prompt | string | Detailed description for image generation |

## Rate Limits

Currently no rate limiting is enforced. For production:
- Recommended: 10 requests per minute per IP
- Consider implementing API key-based quotas

## Best Practices

1. **Prompt Quality**: Provide detailed, specific prompts for better results
2. **Scene Count**: 3-5 scenes work best for coherent stories
3. **Error Handling**: Always handle potential 500 errors gracefully
4. **Timeout**: Set client timeouts to at least 30 seconds (Gemini can be slow)

## Common Error Scenarios

### Invalid JSON from Gemini

**Status**: 500
**Cause**: Gemini returned non-JSON or malformed JSON
**Solution**: The API will retry or return an error. Retry your request.

### Missing API Key

**Status**: 500 (on startup)
**Cause**: GEMINI_API_KEY environment variable not set
**Solution**: Configure environment variable before starting server

### Rate Limit (Gemini API)

**Status**: 500
**Cause**: Exceeded Gemini API quota
**Solution**: Wait and retry, or upgrade Gemini API plan

## Testing the API

### Using the Interactive Docs

1. Navigate to http://localhost:8000/docs
2. Click on the POST /generate-story endpoint
3. Click "Try it out"
4. Enter your request body
5. Click "Execute"

### Using Postman

1. Create a new POST request
2. URL: `http://localhost:8000/generate-story`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "prompt": "Your story idea here",
     "num_scenes": 4
   }
   ```
5. Send request

## CORS Configuration

The API currently allows all origins (`*`) for development. In production, update the CORS middleware in `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Specific origins
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## Versioning

Current API Version: **v1** (implicit)

Future versions may include explicit versioning in the URL:
- `/v1/generate-story`
- `/v2/generate-story`

## Support

For issues or questions:
- Check the health endpoint first
- Review server logs for detailed error messages
- Verify GEMINI_API_KEY is valid
- Ensure Gemini API quota is available
