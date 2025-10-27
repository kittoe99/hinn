<template>
  <div v-if="shouldShow">
    <!-- Sticky minimal bar shown at the bottom only when section scrolled away -->
    <div
      v-if="showSticky"
      :class="[
        'fixed inset-x-0 z-50 flex justify-center touch-pan-y pointer-events-none transition-transform duration-300 ease-out',
        scrollDir === 'down' ? 'translate-y-32' : 'translate-y-0'
      ]"
      :style="{ bottom: 'calc(env(safe-area-inset-bottom) + 16px)' }"
    >
      <div class="pointer-events-auto">
        <form @submit.prevent="handleStickySubmit">
          <div class="flex items-center gap-2 rounded-full border border-neutral-900 bg-white/95 backdrop-blur px-4 py-2 shadow-lg">
            <div class="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-900 bg-neutral-100 text-neutral-900" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12c0 3.866-3.582 7-8 7-1.168 0-2.272-.22-3.254-.615L4 20l1.748-3.059C5.27 16.02 5 14.997 5 14c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
              </svg>
            </div>
            <input
              v-model="stickyInput"
              type="text"
              placeholder="Ask me anything…"
              aria-label="Ask Me Anything"
              class="w-[56vw] max-w-[28rem] min-w-[220px] border-0 bg-transparent px-2 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800"
            >
              <span>Ask</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Hidden section for intersection observer -->
    <section ref="sectionRef" class="h-0" aria-hidden="true"></section>

    <!-- Chat Modal -->
    <Teleport to="body">
      <div v-if="modalOpen" class="fixed inset-0 z-[60]">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-100 transition-opacity"
          @click="modalOpen = false"
        />
        <!-- Panel -->
        <div
          :class="[
            'absolute left-1/2 -translate-x-1/2 w-[min(92vw,44rem)] h-[70vh] bg-white border border-neutral-900 rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 ease-out',
            expandFrom === 'top' ? 'top-4 translate-y-0' : 'bottom-4 translate-y-0'
          ]"
          role="dialog"
          aria-modal="true"
          aria-label="AI Chat"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-4">
            <div class="flex items-center gap-2 font-semibold text-neutral-900">
              <span class="inline-flex items-center justify-center w-6 h-6 rounded-md border border-neutral-900 bg-neutral-100 text-neutral-900">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12c0 3.866-3.582 7-8 7-1.168 0-2.272-.22-3.254-.615L4 20l1.748-3.059C5.27 16.02 5 14.997 5 14c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                </svg>
              </span>
              <span>AI Assistant</span>
            </div>
            <button @click="modalOpen = false" class="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <!-- Messages -->
          <div ref="messagesBoxRef" class="h-[calc(70vh-128px)] space-y-3 overflow-y-auto bg-white p-4">
            <div
              v-for="(message, idx) in messages"
              :key="idx"
              :class="[
                'max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed',
                message.role === 'user' ? 'ml-auto bg-neutral-900 text-white' : 'mr-auto bg-neutral-50 text-neutral-900 border border-neutral-200'
              ]"
            >
              {{ message.content }}
            </div>
            <!-- Thinking indicator -->
            <div v-if="isThinking && !typedText" class="mr-auto inline-flex max-w-[85%] items-center gap-1 rounded-lg bg-neutral-50 px-4 py-2.5 text-sm leading-relaxed text-neutral-900 border border-neutral-200">
              <span class="dot h-1.5 w-1.5 rounded-full bg-neutral-900" />
              <span class="dot h-1.5 w-1.5 rounded-full bg-neutral-900" />
              <span class="dot h-1.5 w-1.5 rounded-full bg-neutral-900" />
            </div>
            <!-- Streaming typed text with caret -->
            <div v-if="typedText" class="mr-auto max-w-[85%] rounded-lg bg-neutral-50 px-4 py-2.5 text-sm leading-relaxed text-neutral-900 border border-neutral-200">
              <span>{{ typedText }}</span>
              <span class="typing-caret" />
            </div>
          </div>
          <!-- Composer -->
          <form @submit.prevent="handleModalSubmit" class="border-t border-neutral-200 p-3">
            <div class="relative">
              <input
                v-model="pending"
                placeholder="Type your message..."
                class="w-full rounded-full border border-neutral-200 bg-white px-4 py-2 pr-24 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />
              <button type="submit" class="absolute right-1 top-1 inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
const route = useRoute()
const sectionRef = ref(null)
const messagesBoxRef = ref(null)
const showSticky = ref(false)
const scrollDir = ref('down')
const nearBottom = ref(false)
const modalOpen = ref(false)
const expandFrom = ref('top')
const messages = ref([])
const pending = ref('')
const isThinking = ref(false)
const typedText = ref('')
const mainInput = ref('')
const stickyInput = ref('')

// Only show on homepage and product pages (website, agents, marketing)
const shouldShow = computed(() => {
  const path = route.path
  return path === '/' || 
         path.startsWith('/website') || 
         path.startsWith('/agents') || 
         path.startsWith('/marketing')
})

const suggestions = [
  "What's included in the plan?",
  'How fast can you launch?',
  'Can you use my domain?',
  'Do you handle updates?',
  'How much does it cost?'
]

const sampleResponses = [
  'Great question! Our plan includes design, hosting, SSL, analytics, on-page SEO, and monthly content updates.',
  'We can typically launch an initial version within 3–5 business days, followed by quick iterations.',
  'Yes — you can use your existing domain. We handle DNS and SSL setup so it\'s secure from day one.',
  'We manage ongoing updates each month. Send content or requests anytime and we\'ll ship it.',
  'Pricing is simple: a flat monthly rate with everything included. No hidden fees.'
]

let typeInterval = null
let thinkTimeout = null
let lastY = 0
let lastDirChangeTs = 0
let nearBottomState = false

// Always show sticky bar
onMounted(() => {
  // Always show the sticky bar on all pages
  showSticky.value = true

  // Scroll tracking
  const MIN_DELTA = 24
  const COOLDOWN_MS = 150
  const ENTER_NEAR_BOTTOM = 240
  const EXIT_NEAR_BOTTOM = 320

  let ticking = false

  const process = () => {
    ticking = false
    const y = window.scrollY || window.pageYOffset
    const now = performance.now()
    const dy = y - lastY

    if (Math.abs(dy) >= MIN_DELTA && now - lastDirChangeTs >= COOLDOWN_MS) {
      if (dy < 0) scrollDir.value = 'up'
      else if (dy > 0) scrollDir.value = 'down'
      lastDirChangeTs = now
      lastY = y
    }

    const doc = document.documentElement
    const scrollHeight = doc.scrollHeight
    const viewport = window.innerHeight
    const dist = scrollHeight - (y + viewport)

    if (!nearBottomState && dist <= ENTER_NEAR_BOTTOM) {
      nearBottomState = true
      nearBottom.value = true
    } else if (nearBottomState && dist > EXIT_NEAR_BOTTOM) {
      nearBottomState = false
      nearBottom.value = false
    }
  }

  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(process)
    }
  }

  lastY = window.scrollY || window.pageYOffset
  window.addEventListener('scroll', onScroll, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    if (typeInterval) clearInterval(typeInterval)
    if (thinkTimeout) clearTimeout(thinkTimeout)
  })
})

// Auto-scroll chat to bottom
watch([messages, typedText, isThinking], () => {
  nextTick(() => {
    if (messagesBoxRef.value) {
      messagesBoxRef.value.scrollTo({ top: messagesBoxRef.value.scrollHeight, behavior: 'smooth' })
    }
  })
})

const openModal = (question, preferFrom = 'top') => {
  messages.value = [{ role: 'user', content: question }]
  pending.value = ''
  expandFrom.value = preferFrom
  modalOpen.value = true
  demoRespond(question)
}

const handleMainSubmit = () => {
  const q = mainInput.value.trim()
  if (!q) return

  const preferFrom = nearBottom.value || scrollDir.value === 'up' ? 'bottom' : 'top'
  openModal(q, preferFrom)
  mainInput.value = ''
}

const handleStickySubmit = () => {
  const q = stickyInput.value.trim()
  if (!q) return

  const preferFrom = nearBottom.value || scrollDir.value === 'up' ? 'bottom' : 'top'
  openModal(q, preferFrom)
  stickyInput.value = ''
}

const handleSuggestion = (prompt) => {
  const preferFrom = nearBottom.value || scrollDir.value === 'up' ? 'bottom' : 'top'
  openModal(prompt, preferFrom)
}

const handleModalSubmit = () => {
  const text = pending.value.trim()
  if (!text) return

  messages.value.push({ role: 'user', content: text })
  pending.value = ''
  demoRespond(text)
}

const demoRespond = async (userPrompt) => {
  if (isThinking.value || typedText.value) return

  isThinking.value = true
  typedText.value = ''

  try {
    console.log('[AmaBar] Sending question:', userPrompt)
    
    // Call the actual API
    const response = await fetch('/api/ama/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: userPrompt,
        siteUrl: window.location.origin
      })
    })

    console.log('[AmaBar] Response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.statusMessage || 'Failed to get response')
    }

    const data = await response.json()
    console.log('[AmaBar] Got answer, length:', data.answer?.length)

    const full = data.answer || 'Sorry, I could not find an answer to that question.'

    // Type out the response
    let i = 0
    typeInterval = setInterval(() => {
      i += 1
      typedText.value = full.slice(0, i)

      if (i >= full.length) {
        clearInterval(typeInterval)
        messages.value.push({ role: 'assistant', content: full })
        typedText.value = ''
        isThinking.value = false
      }
    }, 18)
  } catch (error) {
    console.error('[AmaBar] Error:', error)
    console.error('[AmaBar] Error message:', error.message)
    console.error('[AmaBar] Error stack:', error.stack)
    
    // Show detailed error message
    let errorMessage = 'Sorry, I encountered an error. '
    if (error.message.includes('FIRECRAWL_API_KEY')) {
      errorMessage = 'The AI service is not configured. Please add FIRECRAWL_API_KEY to your .env file.'
    } else if (error.message.includes('DEEPSEEK_API_KEY')) {
      errorMessage = 'The AI service is not configured. Please add DEEPSEEK_API_KEY to your .env file.'
    } else if (error.message) {
      errorMessage += `Details: ${error.message}`
    } else {
      errorMessage += 'Please try again.'
    }
    
    messages.value.push({ role: 'assistant', content: errorMessage })
    typedText.value = ''
    isThinking.value = false
  }
}
</script>

<style scoped>
/* Hide scrollbar for chips slider */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Typing caret animation */
@keyframes caretBlink {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.typing-caret {
  display: inline-block;
  width: 1px;
  height: 1em;
  background: currentColor;
  margin-left: 2px;
  animation: caretBlink 1s step-end infinite;
  vertical-align: -2px;
}

/* Thinking dots animation */
.dot {
  animation: dotPulse 1.2s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.15s;
}

.dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes dotPulse {
  0%, 80%, 100% {
    transform: scale(0.7);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
