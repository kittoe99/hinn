import { vercelFetch } from '~/server/utils/vercel'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const limit = query.limit ? Number(query.limit) : 20
    const from = typeof query.from === 'string' ? query.from : undefined

    const qs = new URLSearchParams()
    if (!Number.isNaN(limit)) qs.set('limit', String(Math.min(Math.max(limit, 1), 100)))
    if (from) qs.set('from', from)

    const res = await vercelFetch(`/v9/projects?${qs.toString()}`)
    if (!res.ok) {
      throw createError({ statusCode: 502, message: `Vercel API error: ${res.error}` })
    }

    return { success: true, data: res.data }
  } catch (err: any) {
    throw createError({ statusCode: err.statusCode || 500, message: err.message || 'Failed to list Vercel projects' })
  }
})
