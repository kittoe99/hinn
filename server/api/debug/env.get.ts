import { defineEventHandler, createError, sendError } from 'h3'
import { useRuntimeConfig } from '#imports'
import fs from 'node:fs'
import path from 'node:path'

function mask(v?: string | null) {
  if (!v) return null
  const s = String(v)
  if (s.length <= 8) return '****'
  return `${s.slice(0, 4)}...${s.slice(-4)}`
}

export default defineEventHandler((event) => {
  try {
    const config = useRuntimeConfig() as any
    const fromRuntime = config?.openaiApiKey as string | undefined
    const fromProcess = process.env.OPENAI_API_KEY
    const fromNuxtEnv = process.env.NUXT_OPENAI_API_KEY
    const cwd = process.cwd()
    const envPath = path.resolve(cwd, '.env')
    const envExists = fs.existsSync(envPath)
    return {
      env: { cwd, envPath, envExists },
      openai: {
        hasRuntimeConfig: !!fromRuntime,
        hasProcessEnv: !!fromProcess,
        hasNuxtOpenaiEnv: !!fromNuxtEnv,
        runtimeMasked: mask(fromRuntime),
        processMasked: mask(fromProcess),
        nuxtEnvMasked: mask(fromNuxtEnv),
      },
    }
  } catch (e: any) {
    return sendError(event, createError({ statusCode: 500, statusMessage: e?.message || String(e) }))
  }
})
