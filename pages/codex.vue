<script setup lang="ts">
import { ref } from 'vue'

const prompt = ref('')
const output = ref<string | null>(null)
const error = ref<string | null>(null)
const running = ref(false)
const controller = ref<AbortController | null>(null)

async function runCodex() {
  error.value = null
  output.value = null
  running.value = true
  try {
    const TIMEOUT_MS = 30000
    controller.value = new AbortController()
    let timer: ReturnType<typeof setTimeout> | null = null
    timer = setTimeout(() => {
      try { controller.value?.abort() } catch {}
    }, TIMEOUT_MS)
    const res = await fetch('/api/codex/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.value || 'Say hello' }),
      signal: controller.value.signal,
    })
    if (!res.ok) {
      const txt = await res.text()
      throw new Error(txt || `Request failed with ${res.status}`)
    }
    const data = await res.json()
    if (!data?.ok) {
      throw new Error(data?.message || 'Unknown error')
    }
    const result = data.result
    output.value = typeof result === 'string' ? result : JSON.stringify(result, null, 2)
  } catch (e: any) {
    if (e?.name === 'AbortError') {
      error.value = 'Request cancelled or timed out'
    } else {
      error.value = e?.message || String(e)
    }
  } finally {
    controller.value = null
    try {
      // clear request timeout if set
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof timer !== 'undefined' && timer) clearTimeout(timer)
    } catch {}
    running.value = false
  }
}

function cancel() {
  try { controller.value?.abort() } catch {}
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4">Codex Test</h1>

    <div class="space-y-4">
      <textarea
        v-model="prompt"
        class="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#d97759]"
        placeholder="Enter a prompt to send to Codex"
      />

      <button
        class="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
        :disabled="running || !prompt"
        @click="runCodex"
      >
        {{ running ? 'Running…' : 'Run Codex' }}
      </button>
      <button
        v-if="running"
        class="ml-2 px-4 py-2 rounded-md border border-neutral-300 hover:bg-neutral-50"
        @click="cancel"
      >
        Cancel
      </button>

      <div v-if="error" class="text-red-600 whitespace-pre-wrap">{{ error }}</div>

      <pre v-if="output" class="bg-neutral-50 border rounded-md p-3 overflow-auto whitespace-pre-wrap">{{ output }}</pre>
    </div>
  </div>
</template>
