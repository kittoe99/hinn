# Image Generation Integration

This document describes the image generation system for AI-powered canvas print generation.

## Overview

The canvas printing page generates high-quality images from text prompts. Users can describe their vision and receive multiple image variations suitable for canvas printing.

## Current Implementation

The system uses **Google's Gemini 2.5 Flash Image model** (`gemini-2.5-flash-image`) for real AI-powered image generation.

### Real AI Generation

The system:
- Uses the `@google/genai` package (v1.30.0)
- Generates images in parallel for faster results
- Returns base64-encoded images
- Supports up to 10 concurrent generations
- Handles partial failures gracefully

## Setup

### 1. Get a Google API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

Add your API key to `.env`:

```bash
GOOGLE_API_KEY=your_actual_api_key_here
```

### 3. Verify Installation

The required package `@google/generative-ai` is already installed. If you need to reinstall:

```bash
npm install @google/generative-ai
```

## Architecture

### Files

- **`lib/gemini.ts`** - Core Gemini API integration
  - `generateImages()` - Generate multiple images from a prompt
  - `generateImage()` - Generate a single image
  - `isGeminiConfigured()` - Check if API key is set

- **`server/api/canvas/generate.post.ts`** - API endpoint for image generation
  - Validates prompts
  - Calls Gemini API
  - Returns formatted image data

- **`pages/canvas-printing.vue`** - Frontend UI
  - Prompt input and quick ideas
  - Loading states with animations
  - Image grid with selection
  - Error handling

## API Usage

### Endpoint

```
POST /api/canvas/generate
```

### Request Body

```json
{
  "prompt": "A serene mountain landscape at sunset",
  "numberOfImages": 10,
  "aspectRatio": "1:1"
}
```

### Response

```json
{
  "success": true,
  "images": [
    {
      "id": "img-1234567890-0",
      "url": "data:image/png;base64,...",
      "mimeType": "image/png",
      "label": "Generated image 1"
    }
  ],
  "prompt": "A serene mountain landscape at sunset",
  "generatedAt": "2025-01-15T12:00:00.000Z"
}
```

## Features

### Image Generation Options

- **Number of Images**: Generate 1-10 variations per prompt (default: 4)
- **Aspect Ratios**: 
  - `1:1` - Square (default, ideal for canvas)
  - `16:9` - Landscape
  - `9:16` - Portrait
  - `4:3` - Standard
  - `3:4` - Portrait standard
- **Negative Prompts**: Specify what to avoid in generated images

### Frontend Features

1. **Quick Start Ideas** - Pre-made prompts with preview images
2. **Loading Animation** - Spinner with progress indicators
3. **Staggered Reveal** - Images appear one by one (100ms delay)
4. **Image Selection** - Click to select/deselect images
5. **Error Handling** - User-friendly error messages
6. **Responsive Design** - Works on all screen sizes

## Model Information

### Gemini 2.5 Flash Image

- **Model ID**: `gemini-2.5-flash-image`
- **Provider**: Google AI
- **Package**: `@google/genai` (v1.30.0)
- **Capabilities**:
  - High-quality AI-generated images
  - Fast generation (typically 3-8 seconds per image)
  - Excellent prompt understanding
  - Parallel generation support
  - Built-in safety filters
  - Base64 output format

### Pricing

Check [Google AI Pricing](https://ai.google.dev/pricing) for current rates. Typically:
- Free tier: Limited requests per day

## Error Handling

The integration handles various error scenarios:

1. **Missing API Key** - Returns 500 with configuration error
2. **Invalid Prompt** - Returns 400 with validation message
3. **Rate Limiting** - Returns 429 with retry message
4. **API Errors** - Returns 500 with user-friendly message

## Usage Example

```typescript
// In your component
const generateImage = async () => {
  try {
    const response = await $fetch('/api/canvas/generate', {
      method: 'POST',
      body: {
        prompt: 'Abstract geometric patterns in warm colors',
        numberOfImages: 4,
        aspectRatio: '1:1',
      },
    })
    
    console.log('Generated images:', response.images)
  } catch (error) {
    console.error('Generation failed:', error)
  }
}
```

## Best Practices

### Prompt Writing

1. **Be Specific** - "A serene mountain landscape at sunset with vibrant orange and pink clouds"
2. **Include Style** - "...in the style of impressionist painting"
3. **Mention Details** - "...with snow-capped peaks and a calm lake in the foreground"
4. **Avoid Negatives** - Use the `negativePrompt` parameter instead

### Performance

1. **Batch Generation** - Generate multiple variations at once
2. **Caching** - Store generated images in Supabase Storage
3. **Lazy Loading** - Use the staggered reveal for better UX
4. **Error Recovery** - Always handle API failures gracefully

## Troubleshooting

### "Image generation service is not configured"

- Check that `GOOGLE_API_KEY` is set in `.env`
- Restart the dev server after adding the key

### "Rate limit exceeded"

- You've hit the API quota
- Wait a few minutes or upgrade your plan
- Consider implementing request queuing

### "Failed to generate images"

- Check your internet connection
- Verify the API key is valid
- Check Google AI Studio for service status

## Future Enhancements

- [ ] Save generated images to Supabase Storage
- [ ] User gallery of generated canvases
- [ ] Advanced options (style, mood, color palette)
- [ ] Image editing and refinement
- [ ] Batch download of selected images
- [ ] Integration with canvas printing checkout

## Resources

- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Imagen 3 Model Card](https://deepmind.google/technologies/imagen-3/)
