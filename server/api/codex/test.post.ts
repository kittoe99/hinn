import { Codex } from '@openai/codex-sdk'
import { defineEventHandler, readBody, createError, sendError } from 'h3'
import { useRuntimeConfig } from '#imports'
import fs from 'node:fs'
import path from 'node:path'

function parseEnv(content: string): Record<string, string> {
  const env: Record<string, string> = {}
  const lines = content.split(/\r?\n/)
  for (const raw of lines) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const idx = line.indexOf('=')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (key) env[key] = val
  }
  return env
}

function loadEnvKeyIfMissing(keys: string[]) {
  const hasAll = keys.every((k) => !!process.env[k])
  if (hasAll) return
  try {
    const envPath = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const vars = parseEnv(fs.readFileSync(envPath, 'utf8'))
      for (const k of keys) {
        if (!process.env[k] && vars[k] !== undefined) {
          process.env[k] = vars[k]
        }
      }
    }
  } catch {
    // ignore; detailed diagnostics available at /api/debug/env
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ prompt?: string }>(event)
    const prompt = body?.prompt || 'Say hello'
    const config = useRuntimeConfig()
    // Ensure env is present even if Nuxt hasn't loaded .env yet
    loadEnvKeyIfMissing(['OPENAI_API_KEY', 'NUXT_OPENAI_API_KEY', 'V0_API_KEY'])
    const apiKey =
      (config as any).openaiApiKey ||
      process.env.OPENAI_API_KEY ||
      process.env.NUXT_OPENAI_API_KEY ||
      process.env.V0_API_KEY
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY. Add it to your .env and restart the server.')
    }
    process.env.OPENAI_API_KEY = apiKey

    const codex = new Codex()
    const thread = codex.startThread({
      skipGitRepoCheck: true,
    })

    const withTimeout = async <T>(p: Promise<T>, ms: number) => {
      return await Promise.race<Promise<T> | Promise<T>>([
        p,
        new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)),
      ])
    }

    const TIMEOUT_MS = 30000
    const start = Date.now()
    const result = await withTimeout(thread.run(prompt), TIMEOUT_MS)
    const elapsed = Date.now() - start
    console.log(`[codex] run completed in ${elapsed}ms`)

    return { ok: true, result }
  } catch (e: any) {
    return sendError(event, createError({ statusCode: 500, statusMessage: e?.message || String(e) }))
  }
})
