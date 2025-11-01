import { VERCEL_API_TOKEN, VERCEL_TEAM_ID, vercelFetch } from '~/server/utils/vercel'

export default defineEventHandler(async () => {
  const env = {
    VERCEL_API_TOKEN: VERCEL_API_TOKEN ? 'SET' : 'NOT SET',
    VERCEL_TEAM_ID: VERCEL_TEAM_ID ? 'SET' : 'NOT SET'
  }

  // Light probe to confirm token works: get account or teams
  // We try /v2/teams?limit=1 since it’s safe and should return 200 if token is valid.
  const probe = await vercelFetch('/v2/teams?limit=1')

  return {
    env,
    probe: probe.ok ? 'OK' : `ERROR: ${probe.error}`
  }
})
