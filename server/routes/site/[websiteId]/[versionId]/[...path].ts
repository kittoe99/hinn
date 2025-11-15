import { createClient } from '@supabase/supabase-js'

const MIME_TYPES: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  htm: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  mjs: 'application/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  svg: 'image/svg+xml; charset=utf-8',
  ico: 'image/x-icon',
  txt: 'text/plain; charset=utf-8'
}

export default defineEventHandler(async (event) => {
  const websiteId = getRouterParam(event, 'websiteId')
  const versionId = getRouterParam(event, 'versionId')
  const rawPath = getRouterParam(event, 'path') || ''

  if (!websiteId || !versionId) {
    throw createError({ statusCode: 400, statusMessage: 'websiteId and versionId are required' })
  }

  // Default to index.html when no path is provided
  const relativePath = rawPath === '' ? 'index.html' : rawPath
  const storagePath = `${websiteId}/${versionId}/${relativePath}`

  const config = useRuntimeConfig(event)
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.supabaseServiceRoleKey || config.public.supabaseAnonKey

  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase configuration missing' })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  // Try to download the requested file
  const { data, error } = await supabase.storage.from('websites').download(storagePath)

  if (error || !data) {
    console.error('[Hosting] Failed to download file from storage:', storagePath, error)
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }

  // Infer mime type from extension
  const extMatch = storagePath.split('.').pop()?.toLowerCase() || 'html'
  const contentType = MIME_TYPES[extMatch] || 'application/octet-stream'

  const arrayBuffer = await data.arrayBuffer()

  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=60'
    }
  })
})
