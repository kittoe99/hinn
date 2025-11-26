/**
 * Gemini Image Generation Module
 * Uses Google's Gemini 3 Pro Image Preview model for AI-powered image generation
 */

import { GoogleGenAI } from '@google/genai'

/**
 * Get the Google API key from environment
 */
function getApiKey(): string {
  return process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || process.env.NUXT_GEMINI_API_KEY || ''
}

/**
 * Get GoogleGenAI client instance
 */
function getGenAI(): GoogleGenAI {
  const apiKey = getApiKey()
  
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is not set. Please add it to your .env file.')
  }
  
  return new GoogleGenAI({ apiKey })
}

// The model that supports native image generation
const MODEL_NAME = 'gemini-3-pro-image-preview'

export interface GenerateImageOptions {
  prompt: string
  numberOfImages?: number
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
  negativePrompt?: string
  sourceImage?: string // Base64 data URL for image editing
}

export interface GeneratedImage {
  url: string
  mimeType: string
  base64Data?: string
}

/**
 * Generate images using Google's Imagen 3 model via Gemini API
 * @param options - Image generation options
 * @returns Array of generated images with URLs
 */
// Helper to strip data URL prefix if present
const getBase64String = (dataUrl: string): string => {
  const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  if (matches && matches.length === 3) {
    return matches[2]
  }
  return dataUrl
}

/**
 * Generate a single image using Gemini (with optional source image for editing)
 */
async function generateSingleImage(prompt: string, sourceImage?: string, styleModifier?: string): Promise<GeneratedImage> {
  try {
    const ai = getGenAI()
    
    // Enhance prompt to prevent canvas-on-wall generations and ensure artwork focus
    let enhancedPrompt = prompt
    
    // Add negative prompt instructions to prevent unwanted elements
    const negativeInstructions = "DO NOT include: canvas on wall, framed picture, gallery wall, hanging artwork, room interior, wall mockup. "
    const focusInstructions = "Generate ONLY the artwork itself, the actual image content, not a photo of a canvas. "
    
    // Apply style modifier if provided (for diversity)
    if (styleModifier) {
      enhancedPrompt = `${focusInstructions}${negativeInstructions}Create: ${prompt}. Style: ${styleModifier}`
    } else {
      enhancedPrompt = `${focusInstructions}${negativeInstructions}${prompt}`
    }
    
    // Build parts array - add source image if provided (for editing mode)
    const parts: any[] = [{ text: enhancedPrompt }]
    
    if (sourceImage) {
      const cleanBase64 = getBase64String(sourceImage)
      parts.push({
        inlineData: {
          mimeType: 'image/png',
          data: cleanBase64
        }
      })
    }
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts,
      },
      config: {
        temperature: 1.2, // Higher temperature for more creative diversity
      }
    })

    return processResponse(response, prompt)
  } catch (error: any) {
    console.error('Gemini Generation Error:', error)
    throw new Error(error.message || 'Failed to generate image')
  }
}

/**
 * Generate multiple images in parallel
 */
export async function generateImages(
  options: GenerateImageOptions
): Promise<GeneratedImage[]> {
  const {
    prompt,
    numberOfImages = 4,
    sourceImage,
  } = options

  console.log(`Generating ${numberOfImages} images for prompt: "${prompt}"${sourceImage ? ' (editing mode)' : ''}`)
  
  // If editing mode (sourceImage provided), generate variations with subtle style differences
  if (sourceImage) {
    const editStyleVariations = [
      'enhanced details, improved quality',
      'slightly different composition, refined',
      'alternative color grading, professional',
      'adjusted lighting, optimized',
      'refined details, polished look',
    ]
    
    const promises = Array.from({ length: numberOfImages }).map((_, index) => {
      const styleModifier = editStyleVariations[index % editStyleVariations.length]
      return generateSingleImage(prompt, sourceImage, styleModifier)
    })
    
    const results = await Promise.allSettled(promises)
    
    const successfulImages: GeneratedImage[] = results
      .filter((result): result is PromiseFulfilledResult<GeneratedImage> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value)

    if (successfulImages.length === 0 && numberOfImages > 0) {
      const firstFailure = results.find(r => r.status === 'rejected') as PromiseRejectedResult
      throw firstFailure?.reason || new Error('Failed to generate images. Please try again.')
    }

    return successfulImages
  }
  
  // For initial generation, create diverse unique images with distinct style variations
  const styleVariations = [
    'photorealistic, ultra detailed, 8K resolution, professional photography',
    'oil painting, impressionist style, visible brush strokes, artistic masterpiece',
    'digital art, concept art style, trending on ArtStation, highly detailed',
    'watercolor painting, soft edges, flowing colors, artistic illustration',
    'minimalist vector art, clean lines, flat design, modern aesthetic',
    'cinematic lighting, dramatic shadows, movie poster quality, epic composition',
    '3D render, octane render, volumetric lighting, CGI quality',
    'anime style, Studio Ghibli inspired, vibrant colors, detailed illustration',
    'abstract expressionism, bold colors, dynamic composition, modern art',
    'vintage retro aesthetic, 1970s style, nostalgic color palette, film grain',
  ]
  
  // Create diverse prompts by adding different style modifiers
  const promises = Array.from({ length: numberOfImages }).map((_, index) => {
    const styleModifier = styleVariations[index % styleVariations.length]
    return generateSingleImage(prompt, sourceImage, styleModifier)
  })
  
  // Use allSettled so one failure doesn't stop the whole batch
  const results = await Promise.allSettled(promises)

  const successfulImages: GeneratedImage[] = results
    .filter((result): result is PromiseFulfilledResult<GeneratedImage> => 
      result.status === 'fulfilled'
    )
    .map(result => result.value)

  // If we requested images but got none, throw the first error we encountered
  if (successfulImages.length === 0 && numberOfImages > 0) {
    const firstFailure = results.find(r => r.status === 'rejected') as PromiseRejectedResult
    throw firstFailure?.reason || new Error('Failed to generate images. Please try again.')
  }

  return successfulImages
}

/**
 * Process the API response and extract image data
 */
function processResponse(response: any, prompt: string): GeneratedImage {
  const candidate = response.candidates?.[0]
  
  if (!candidate?.content?.parts) {
    throw new Error('No content returned from model.')
  }

  let imagePart = null
  let textPart = null

  for (const part of candidate.content.parts) {
    if (part.inlineData) {
      imagePart = part
      break
    } else if (part.text) {
      textPart = part.text
    }
  }

  if (imagePart) {
    const base64 = imagePart.inlineData.data
    const mimeType = imagePart.inlineData.mimeType || 'image/png'
    
    return {
      url: `data:${mimeType};base64,${base64}`,
      mimeType: mimeType,
      base64Data: base64,
    }
  }

  // If no image found, throw error with the text reason if available
  throw new Error(textPart || 'Model returned no image data.')
}

/**
 * Generate a single image using Gemini
 * @param prompt - The text prompt for image generation
 * @returns A single generated image
 */
export async function generateImage(prompt: string): Promise<GeneratedImage> {
  const images = await generateImages({ prompt, numberOfImages: 1 })
  if (images.length === 0) {
    throw new Error('No images were generated')
  }
  return images[0]
}

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured(): boolean {
  return !!getApiKey()
}
