<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const prompt = ref('')
const messages = ref<Message[]>([])
const error = ref<string | null>(null)
const running = ref(false)
const chatContainer = ref<HTMLElement | null>(null)
const useCodexAgent = ref(false)
const repoUrl = ref('')
const branch = ref('main')

async function scrollToBottom() {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

async function sendMessage() {
  if (!prompt.value.trim() || running.value) return
  
  error.value = null
  const userMessage = prompt.value.trim()
  prompt.value = ''
  
  // Add user message
  messages.value.push({ role: 'user', content: userMessage })
  await scrollToBottom()
  
  // Add empty assistant message for streaming
  const assistantIndex = messages.value.length
  messages.value.push({ role: 'assistant', content: '' })
  running.value = true
  
  try {
    const endpoint = useCodexAgent.value ? '/api/codex/agent' : '/api/codex/test'
    const payload = useCodexAgent.value 
      ? { 
          messages: messages.value.slice(0, -1),
          repo_url: repoUrl.value || undefined,
          branch: branch.value || undefined
        }
      : { messages: messages.value.slice(0, -1) }
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    
    if (!res.ok) {
      throw new Error(`Request failed with ${res.status}`)
    }
    
    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    
    if (!reader) throw new Error('No response body')
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') break
          
          try {
            const parsed = JSON.parse(data)
            if (parsed.error) {
              error.value = parsed.error
              // Remove empty assistant message on error
              if (messages.value[assistantIndex]?.content === '') {
                messages.value.splice(assistantIndex, 1)
              }
              return
            }
            if (parsed.content) {
              messages.value[assistantIndex].content += parsed.content
              await scrollToBottom()
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  } catch (e: any) {
    error.value = e?.message || String(e)
    // Remove empty assistant message on error
    if (messages.value[assistantIndex]?.content === '') {
      messages.value.splice(assistantIndex, 1)
    }
  } finally {
    running.value = false
  }
}

function clearChat() {
  messages.value = []
  error.value = null
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 h-screen flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-semibold">AI Chat</h1>
      <div class="flex items-center gap-3">
        <label class="flex items-center gap-2 text-sm">
          <input
            v-model="useCodexAgent"
            type="checkbox"
            class="rounded border-neutral-300 text-[#d97759] focus:ring-[#d97759]"
          />
          <span>Use Codex Agent</span>
        </label>
        <button
          v-if="messages.length > 0"
          class="px-3 py-1 text-sm rounded-md border border-neutral-300 hover:bg-neutral-50"
          @click="clearChat"
        >
          Clear Chat
        </button>
      </div>
    </div>

    <div v-if="useCodexAgent" class="mb-4 p-4 border rounded-lg bg-neutral-50 space-y-3">
      <div class="text-sm font-medium text-neutral-700">Repository Configuration</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          v-model="repoUrl"
          type="text"
          class="p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#d97759]"
          placeholder="Repository URL (e.g., https://github.com/user/repo)"
        />
        <input
          v-model="branch"
          type="text"
          class="p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#d97759]"
          placeholder="Branch (default: main)"
        />
      </div>
      <div class="text-xs text-neutral-500">
        When enabled, Codex agent can read, write, and execute code in your repository
      </div>
    </div>

    <div
      ref="chatContainer"
      class="flex-1 overflow-y-auto space-y-4 mb-4 border rounded-lg p-4 bg-neutral-50"
    >
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[80%] rounded-lg px-4 py-2"
          :class="
            msg.role === 'user'
              ? 'bg-[#d97759] text-white'
              : 'bg-white border border-neutral-200'
          "
        >
          <div class="whitespace-pre-wrap">{{ msg.content }}</div>
        </div>
      </div>
      
      <div v-if="messages.length === 0" class="text-center text-neutral-400 py-12">
        Start a conversation by typing a message below
      </div>
    </div>

    <div v-if="error" class="text-red-600 text-sm mb-2">{{ error }}</div>

    <div class="flex gap-2">
      <input
        v-model="prompt"
        type="text"
        class="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#d97759]"
        placeholder="Type your message..."
        @keydown.enter="sendMessage"
        :disabled="running"
      />
      <button
        class="px-6 py-3 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
        :disabled="running || !prompt.trim()"
        @click="sendMessage"
      >
        {{ running ? 'Sending…' : 'Send' }}
      </button>
    </div>
  </div>
</template>
