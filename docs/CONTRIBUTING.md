# Contributing to StoryWeaver AI

Thank you for your interest in contributing to StoryWeaver AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Docker/local setup)

### Suggesting Features

Feature suggestions are welcome! Please create an issue describing:
- The feature and its benefits
- Use cases
- Potential implementation approach (optional)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed
4. **Test your changes**:
   - Ensure backend tests pass
   - Test frontend functionality
   - Test Docker setup
5. **Commit your changes**:
   ```bash
   git commit -m "Add: description of your changes"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**:
   - Provide a clear description
   - Reference any related issues
   - Include screenshots for UI changes

## Development Guidelines

### Backend (Python)

- Follow PEP 8 style guidelines
- Use type hints
- Add docstrings for functions
- Handle errors gracefully
- Use Pydantic for data validation

**Example**:
```python
async def generate_story(request: StoryRequest) -> StoryResponse:
    """
    Generate a multimodal story using Gemini.
    
    Args:
        request: StoryRequest with prompt and scene count
        
    Returns:
        StoryResponse with title and scenes
        
    Raises:
        HTTPException: If generation fails
    """
    # Implementation
```

### Frontend (React)

- Use functional components
- Follow React hooks best practices
- Keep components focused and reusable
- Use meaningful variable names
- Add PropTypes or TypeScript for type safety

**Example**:
```jsx
function SceneCard({ scene }) {
  return (
    <div className="scene">
      <h3>Scene {scene.scene_number}</h3>
      <p>{scene.narrative_text}</p>
    </div>
  );
}
```

### Documentation

- Update README.md for major changes
- Update API.md for endpoint changes
- Update ARCHITECTURE.md for structural changes
- Add comments for non-obvious code

## Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Integration Tests

```bash
docker-compose up
# Run manual tests or automated E2E tests
```

## Project Structure

```
storyweaver-ai/
├── backend/          # Python FastAPI backend
├── frontend/         # React frontend
├── docs/             # Documentation
└── docker-compose.yml
```

## Areas for Contribution

### High Priority

- [ ] Image generation integration (Imagen 3, DALL-E, Stable Diffusion)
- [ ] Unit tests for backend and frontend
- [ ] Error handling improvements
- [ ] Rate limiting implementation
- [ ] User authentication

### Medium Priority

- [ ] Story export (PDF, EPUB)
- [ ] Database integration for story storage
- [ ] Real-time streaming of story generation
- [ ] Character consistency across scenes
- [ ] Story editing interface

### Low Priority

- [ ] Multi-language support
- [ ] Audio narration
- [ ] Story branching (choose your adventure)
- [ ] Social sharing features
- [ ] Story templates

## Questions?

If you have questions about contributing:
- Check existing issues and discussions
- Create a new issue with the "question" label
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in the project README. Thank you for helping make StoryWeaver AI better!
