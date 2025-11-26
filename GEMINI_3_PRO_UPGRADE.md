# Gemini 3 Pro Model Upgrade

## Summary
Upgraded all AI model references from `gemini-2.0-flash-exp` to `gemini-3-pro-preview` across the builder system.

## Model Names Verified

### Official Google Gemini 3 Models:
- ✅ **`gemini-3-pro-preview`** - For text/reasoning/code generation
- ✅ **`gemini-3-pro-image-preview`** - For image generation

Source: https://ai.google.dev/gemini-api/docs/gemini-3

## Files Updated

### 1. **Image Generation** (Already Correct)
- ✅ `lib/gemini.ts` - Uses `gemini-3-pro-image-preview` for canvas image generation

### 2. **Builder API Endpoints** (Updated)
All builder endpoints now use `gemini-3-pro-preview`:

- ✅ `server/api/builder/smart-generate.post.ts`
  - Targeted edit mode: `gemini-3-pro-preview`
  - Full generation mode: `gemini-3-pro-preview`

- ✅ `server/api/builder/generate.post.ts`
  - Website generation: `gemini-3-pro-preview`

- ✅ `server/api/builder/edit-element.post.ts`
  - Element editing: `gemini-3-pro-preview`

- ✅ `server/api/builder/precise-edit.post.ts`
  - Precise edits: `gemini-3-pro-preview`

- ✅ `server/api/builder/agent-edit.post.ts`
  - Agentic editing: `gemini-3-pro-preview`

## Benefits of Gemini 3 Pro

### **Improved Capabilities:**
1. **Better Reasoning** - State-of-the-art reasoning for complex tasks
2. **Agentic Workflows** - Enhanced autonomous coding capabilities
3. **Multimodal Tasks** - Better handling of complex multimodal operations
4. **Dynamic Thinking** - Adjustable thinking depth for quality vs. speed

### **New Features:**
- **Thinking Level** - Control internal reasoning depth (low/high)
- **Media Resolution** - Better image/video understanding
- **Structured Outputs** - Improved JSON schema support
- **Google Search Integration** - Real-time grounding

## Temperature Settings

Different temperatures for different tasks:

```typescript
// Targeted edits - Very precise
temperature: 0.1

// Element editing - Balanced
temperature: 0.3

// Full generation - Creative
temperature: 0.7

// Image generation - Very creative
temperature: 1.2
```

## Configuration

All endpoints use the same API key from environment:
```bash
GEMINI_API_KEY=your_key_here
# or
NUXT_GEMINI_API_KEY=your_key_here
```

## Testing

### Test Builder Generation:
1. Go to `/builder` page
2. Enter a prompt like "Create a landing page for a coffee shop"
3. Verify it generates using Gemini 3 Pro

### Test Image Generation:
1. Go to `/canvas-printing` page
2. Generate images
3. Verify diverse, high-quality outputs

## Model Comparison

| Feature | Gemini 2.0 Flash | Gemini 3 Pro |
|---------|------------------|--------------|
| Reasoning | Good | State-of-the-art |
| Speed | Fast | Balanced |
| Quality | High | Highest |
| Thinking | Fixed | Dynamic/Adjustable |
| Agentic | Basic | Advanced |
| Multimodal | Good | Excellent |

## Notes

- **Backward Compatible** - API interface remains the same
- **No Breaking Changes** - All existing code works as-is
- **Better Results** - Expect higher quality outputs
- **Same Pricing Tier** - Both are preview models

## Future Considerations

When Gemini 3 Pro becomes GA (Generally Available):
- Model name may change from `-preview` to stable version
- Update all references to the GA model name
- Check for new features and capabilities

## Rollback

If needed, revert by changing all instances of:
```typescript
model: 'gemini-3-pro-preview'
```
Back to:
```typescript
model: 'gemini-2.0-flash-exp'
```

## Resources

- [Gemini 3 Developer Guide](https://ai.google.dev/gemini-api/docs/gemini-3)
- [Gemini 3 Pro Documentation](https://deepmind.google/models/gemini/pro/)
- [Image Generation Guide](https://ai.google.dev/gemini-api/docs/image-generation)
