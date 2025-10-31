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
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\''))) {
      val = val.slice(1, -1)
    }
    if (key) env[key] = val
  }
  return env
}

function loadEnvOnce() {
  if ((process.env as any).__ENV_LOADED) return
  try {
    const cwd = process.cwd()
    const envPath = path.resolve(cwd, '.env')
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8')
      const vars = parseEnv(content)
      for (const [k, v] of Object.entries(vars)) {
        if (process.env[k] === undefined) {
          process.env[k] = v
        }
      }
      ;(process.env as any).__ENV_LOADED = '1'
    }
  } catch {
    // noop: diagnostics can be checked via /api/debug/env
  }
}

export default () => {
  loadEnvOnce()
}
