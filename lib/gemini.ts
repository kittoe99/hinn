/**
 * Gemini Image Generation Module
 * Uses Google's gemini-2.5-flash-image model for AI-powered image generation
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

// The model that supports image generation
const MODEL_NAME = 'gemini-2.5-flash-image'

export interface GenerateImageOptions {
  prompt: string
  numberOfImages?: number
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
  negativePrompt?: string
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
/**
 * Generate a single image using Gemini
 */
async function generateSingleImage(prompt: string): Promise<GeneratedImage> {
  try {
    const ai = getGenAI()
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        // Image generation config (optional)
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
  } = options

  console.log(`Generating ${numberOfImages} images for prompt: "${prompt}"`)
  
  // Run requests in parallel
  const promises = Array.from({ length: numberOfImages }).map(() => 
    generateSingleImage(prompt)
  )
  
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
