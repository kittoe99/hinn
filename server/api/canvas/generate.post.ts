import { generateImages } from '~/lib/gemini'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { prompt, numberOfImages = 4, aspectRatio = '1:1', sourceImage } = body

    if (!prompt || typeof prompt !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Prompt is required and must be a string',
      })
    }

    // Validate prompt length
    if (prompt.length < 3) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Prompt must be at least 3 characters long',
      })
    }

    if (prompt.length > 1000) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Prompt must be less than 1000 characters',
      })
    }

    // Generate images using Gemini (with optional source image for editing)
    const images = await generateImages({
      prompt,
      numberOfImages: Math.min(numberOfImages, 10), // Max 10 images
      aspectRatio,
      sourceImage, // Pass source image for editing
    })

    return {
      success: true,
      images: images.map((img, index) => ({
        id: `img-${Date.now()}-${index}`,
        url: img.url,
        mimeType: img.mimeType,
        label: `Generated image ${index + 1}`,
      })),
      prompt,
      generatedAt: new Date().toISOString(),
    }
  } catch (error: any) {
    console.error('Error in canvas generate API:', error)

    // Handle specific error cases
    if (error.statusCode) {
      throw error
    }

    // Check if it's a Gemini API error
    if (error.message?.includes('API key')) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Image generation service is not configured. Please contact support.',
      })
    }

    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Rate limit exceeded. Please try again later.',
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to generate images. Please try again.',
    })
  }
})
