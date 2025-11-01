import { vercelFetch } from '~/server/utils/vercel'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, message: 'Project idOrName is required' })
    }

    const res = await vercelFetch(`/v9/projects/${encodeURIComponent(id)}`)
    if (!res.ok) {
      throw createError({ statusCode: 502, message: `Vercel API error: ${res.error}` })
    }

    return { success: true, data: res.data }
  } catch (err: any) {
    throw createError({ statusCode: err.statusCode || 500, message: err.message || 'Failed to fetch Vercel project' })
  }
})
