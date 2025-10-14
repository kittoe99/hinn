<template>
  <div>
    <!-- Floating Chat Button -->
    <button
      v-if="!isOpen"
      @click="toggleChat"
      class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
    >
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </button>

    <!-- Chat Window -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col rounded-2xl border border-neutral-200 bg-white shadow-2xl"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-neutral-200 bg-gradient-to-r from-accent-primary to-accent-focus px-4 py-3 rounded-t-2xl">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-white">Ask Anything</h3>
              <p class="text-xs text-white/80">Powered by AI</p>
            </div>
          </div>
          <button
            @click="toggleChat"
            class="rounded-full p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
          <!-- Welcome Message -->
          <div v-if="messages.length === 0" class="text-center py-8">
            <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-subtle mb-4">
              <svg class="h-8 w-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h4 class="text-sm font-semibold text-primary mb-2">Hi! How can I help?</h4>
            <p class="text-xs text-secondary mb-4">Ask me anything about this website</p>
            <div class="flex flex-wrap gap-2 justify-center">
              <button
                v-for="suggestion in suggestions"
                :key="suggestion"
                @click="askQuestion(suggestion)"
                class="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-secondary transition hover:border-accent-primary hover:text-accent-primary"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>

          <!-- Messages List -->
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="[
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
                message.role === 'user'
                  ? 'bg-accent-primary text-white'
                  : 'bg-neutral-100 text-primary'
              ]"
            >
              <p class="whitespace-pre-wrap">{{ message.content }}</p>
            </div>
          </div>

          <!-- Loading Indicator -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="max-w-[80%] rounded-2xl bg-neutral-100 px-4 py-2">
              <div class="flex items-center gap-2">
                <div class="flex gap-1">
                  <span class="h-2 w-2 animate-bounce rounded-full bg-accent-primary" style="animation-delay: 0ms"></span>
                  <span class="h-2 w-2 animate-bounce rounded-full bg-accent-primary" style="animation-delay: 150ms"></span>
                  <span class="h-2 w-2 animate-bounce rounded-full bg-accent-primary" style="animation-delay: 300ms"></span>
                </div>
                <span class="text-xs text-secondary">Thinking...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="border-t border-neutral-200 p-4">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input
              v-model="inputMessage"
              type="text"
              placeholder="Ask a question..."
              :disabled="isLoading"
              class="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm text-primary placeholder-secondary focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft disabled:opacity-50"
            />
            <button
              type="submit"
              :disabled="!inputMessage.trim() || isLoading"
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary text-white transition hover:bg-accent-focus disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const isOpen = ref(false)
const inputMessage = ref('')
const messages = ref([])
const isLoading = ref(false)
const messagesContainer = ref(null)

const suggestions = [
  'What services do you offer?',
  'How can I get started?',
  'What are your pricing plans?',
  'How do I contact support?'
]

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const askQuestion = (question) => {
  inputMessage.value = question
  sendMessage()
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage = inputMessage.value.trim()
  inputMessage.value = ''

  // Add user message
  messages.value.push({
    role: 'user',
    content: userMessage
  })

  scrollToBottom()
  isLoading.value = true

  try {
    console.log('[AMA Client] Sending question:', userMessage)
    console.log('[AMA Client] Site URL:', window.location.origin)
    
    const response = await fetch('/api/ama/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: userMessage,
        siteUrl: window.location.origin
      })
    })

    console.log('[AMA Client] Response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.statusMessage || errorData.message || 'Failed to get response'
      console.error('[AMA Client] API error:', errorMessage)
      console.error('[AMA Client] Error data:', errorData)
      throw new Error(errorMessage)
    }

    const data = await response.json()
    console.log('[AMA Client] Response data:', data)

    // Add AI response
    messages.value.push({
      role: 'assistant',
      content: data.answer || 'Sorry, I could not find an answer to that question.'
    })
    
    console.log('[AMA Client] Answer added to messages')
  } catch (error) {
    console.error('[AMA Client] Error caught:', error)
    console.error('[AMA Client] Error message:', error.message)
    
    // More helpful error message
    let errorMessage = 'Sorry, I encountered an error. '
    if (error.message.includes('FIRECRAWL_API_KEY')) {
      errorMessage += 'The AI service is not configured yet.'
    } else if (error.message.includes('DEEPSEEK_API_KEY')) {
      errorMessage += 'The AI service is not configured yet.'
    } else if (error.message.includes('crawl')) {
      errorMessage += 'I had trouble reading the website content.'
    } else {
      errorMessage += 'Please try again in a moment.'
    }
    
    messages.value.push({
      role: 'assistant',
      content: errorMessage
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>
