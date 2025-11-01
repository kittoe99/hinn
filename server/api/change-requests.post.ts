import { getSupabaseServer } from '~/lib/supabaseServer'
import { getSupabaseClient } from '~/lib/supabaseClient'
import { readMultipartFormData, getHeader } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization') || ''
    const token = authHeader.replace('Bearer ', '').trim()
    if (!token) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const client = getSupabaseClient()
    const { data: { user }, error: authError } = await client.auth.getUser(token)
    if (authError || !user) {
      throw createError({ statusCode: 401, message: 'Invalid or expired token' })
    }

    let title = ''
    let description = ''
    let priority = ''
    let websiteId = ''
    let screenshot: { filename: string, type: string, data: Buffer } | null = null

    const contentType = getHeader(event, 'content-type') || ''
    if (contentType.includes('multipart/form-data')) {
      const parts = await readMultipartFormData(event)
      if (!parts) {
        throw createError({ statusCode: 400, message: 'Invalid form data' })
      }
      for (const p of parts) {
        if (p.type) {
          if (p.name === 'screenshot' && p.filename && p.data) {
            screenshot = { filename: p.filename, type: p.type, data: p.data as Buffer }
          }
        } else {
          const v = (p.data?.toString('utf-8') || '').trim()
          if (p.name === 'title') title = v
          if (p.name === 'description') description = v
          if (p.name === 'priority') priority = v
          if (p.name === 'websiteId') websiteId = v
        }
      }
    } else {
      const body = await readBody(event)
      title = (body?.title || '').trim()
      description = (body?.description || '').trim()
      priority = (body?.priority || '').trim()
      websiteId = (body?.websiteId || '').trim()
    }

    if (!title || !description || !priority || !websiteId) {
      throw createError({ statusCode: 400, message: 'Missing required fields' })
    }

    const allowed = ['low', 'medium', 'high', 'urgent']
    if (!allowed.includes(priority)) {
      throw createError({ statusCode: 400, message: 'Invalid priority' })
    }

    const supabase = getSupabaseServer()

    const attachments: any[] = []
    if (screenshot) {
      const bucket = 'website-assets'
      const safeName = screenshot.filename.replace(/[^a-zA-Z0-9_.-]/g, '_')
      const path = `${user.id}/${websiteId}/change-requests/${Date.now()}-${safeName}`
      const { error: upErr } = await (supabase.storage.from(bucket).upload(path, screenshot.data, { contentType: screenshot.type, upsert: true }))
      if (upErr) {
        throw createError({ statusCode: 500, message: `Upload failed: ${upErr.message}` })
      }
      const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path)
      attachments.push({ name: screenshot.filename, url: pub.publicUrl, size: screenshot.data.length, type: screenshot.type, path })
    }

    const { data: insertData, error: insertError } = await supabase
      .from('site_change_request')
      .insert({
        user_id: user.id,
        website_id: websiteId,
        title,
        description,
        priority,
        attachments
      })
      .select('*')
      .single()

    if (insertError) {
      throw createError({ statusCode: 500, message: insertError.message })
    }

    return { success: true, data: insertData }
  } catch (err: any) {
    throw createError({ statusCode: err.statusCode || 500, message: err.message || 'Failed to create change request' })
  }
})
