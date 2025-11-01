export type VercelFetchResult<T> = {
  ok: true
  data: T
} | {
  ok: false
  status: number
  error: string
}

const API_BASE = 'https://api.vercel.com'

function env(name: string) {
  const v = process.env[name]
  return v && !/^your_/.test(v) ? v : undefined
}

export const VERCEL_API_TOKEN = env('VERCEL_API_TOKEN')
export const VERCEL_TEAM_ID = env('VERCEL_TEAM_ID')

function withTeam(url: URL) {
  if (VERCEL_TEAM_ID) url.searchParams.set('teamId', VERCEL_TEAM_ID)
  return url
}

export async function vercelFetch<T = any>(path: string, init?: RequestInit): Promise<VercelFetchResult<T>> {
  if (!VERCEL_API_TOKEN) {
    return { ok: false, status: 0, error: 'Missing VERCEL_API_TOKEN' }
  }
  const url = withTeam(new URL(path.startsWith('http') ? path : API_BASE + path))
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    return { ok: false, status: res.status, error: text || `HTTP ${res.status}` }
  }
  const json = await res.json().catch(async () => ({} as T)) as T
  return { ok: true, data: json }
}
