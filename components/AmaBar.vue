<template>
  <div>
    <!-- Sticky minimal bar shown at the bottom only when section scrolled away -->
    <div
      v-if="showSticky"
      class="fixed inset-x-0 z-50 flex justify-center touch-pan-y pointer-events-none"
      :style="{ bottom: 'calc(env(safe-area-inset-bottom) + 16px)' }"
    >
      <div class="pointer-events-auto">
        <form @submit.prevent="handleStickySubmit">
          <div class="flex items-center gap-2 rounded-2xl border-2 border-neutral-200 bg-white/95 backdrop-blur px-3 py-2 shadow-xl">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle text-accent-primary" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12c0 3.866-3.582 7-8 7-1.168 0-2.272-.22-3.254-.615L4 20l1.748-3.059C5.27 16.02 5 14.997 5 14c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
              </svg>
            </div>
            <input
              v-model="stickyInput"
              type="text"
              placeholder="Ask me anything…"
              aria-label="Ask Me Anything"
              class="w-[56vw] max-w-[28rem] min-w-[220px] rounded-lg border-0 bg-transparent px-2 py-2 text-sm text-primary placeholder:text-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-primary/30 transition-all hover:bg-accent-focus hover:shadow-xl hover:shadow-accent-primary/40"
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

    <!-- Full section in-flow -->
    <section ref="sectionRef" class="relative overflow-hidden py-12 md:py-16">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-subtle/20 via-white to-white" aria-hidden="true" />
      <div class="relative mx-auto max-w-4xl px-4 lg:px-6">
        <div class="text-center">
          <div class="inline-flex items-center gap-2 rounded-full bg-white border border-accent-subtle/60 px-4 py-1.5 text-xs font-semibold text-accent-primary shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12c0 3.866-3.582 7-8 7-1.168 0-2.272-.22-3.254-.615L4 20l1.748-3.059C5.27 16.02 5 14.997 5 14c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
            </svg>
            AI Assistant
          </div>
          <h2 class="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Ask Me Anything
          </h2>
          <p class="mt-3 text-base md:text-lg text-secondary max-w-2xl mx-auto">
            Get instant answers about pricing, features, timelines, or your website needs.
          </p>
        </div>
        
        <form @submit.prevent="handleMainSubmit" class="mt-8">
          <div class="relative max-w-2xl mx-auto">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="mainInput"
              type="text"
              placeholder="Ask about pricing, features, timelines..."
              aria-label="Ask Me Anything"
              class="w-full rounded-2xl border-2 border-neutral-200 bg-white pl-12 pr-32 py-4 text-base text-primary placeholder:text-neutral-400 shadow-sm focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all"
            />
            <button
              type="submit"
              class="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-primary/30 transition-all hover:bg-accent-focus hover:shadow-xl hover:shadow-accent-primary/40"
            >
              <span>Ask</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
        
        <div class="mt-6">
          <p class="text-center text-xs text-tertiary mb-3">Popular questions:</p>
          <div class="hide-scrollbar overflow-x-auto touch-pan-x" aria-label="Suggested questions">
            <div class="flex flex-nowrap items-center gap-2 whitespace-nowrap justify-center">
              <button
                v-for="suggestion in suggestions"
                :key="suggestion"
                type="button"
                @click="handleSuggestion(suggestion)"
                class="shrink-0 snap-start rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-primary transition-all hover:border-accent-primary hover:bg-accent-subtle/20 hover:text-accent-primary"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

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
            'absolute left-1/2 -translate-x-1/2 w-[min(92vw,44rem)] h-[70vh] bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 ease-out',
            expandFrom === 'top' ? 'top-4 translate-y-0' : 'bottom-4 translate-y-0'
          ]"
          role="dialog"
          aria-modal="true"
          aria-label="AI Chat"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <div class="flex items-center gap-2 font-semibold text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-accent-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12c0 3.866-3.582 7-8 7-1.168 0-2.272-.22-3.254-.615L4 20l1.748-3.059C5.27 16.02 5 14.997 5 14c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
              </svg>
              <span>Assistant</span>
            </div>
            <button @click="modalOpen = false" class="rounded-full p-1.5 hover:bg-neutral-100" aria-label="Close">
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
                'max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-soft',
                message.role === 'user' ? 'ml-auto bg-[color:var(--accent-subtle)] text-primary' : 'mr-auto bg-neutral-100 text-primary'
              ]"
            >
              {{ message.content }}
            </div>
            <!-- Thinking indicator -->
            <div v-if="isThinking && !typedText" class="mr-auto inline-flex max-w-[85%] items-center gap-1 rounded-2xl bg-neutral-100 px-3 py-2 text-sm leading-relaxed text-primary shadow-soft">
              <span class="dot h-1.5 w-1.5 rounded-full bg-neutral-500" />
              <span class="dot h-1.5 w-1.5 rounded-full bg-neutral-500" />
              <span class="dot h-1.5 w-1.5 rounded-full bg-neutral-500" />
            </div>
            <!-- Streaming typed text with caret -->
            <div v-if="typedText" class="mr-auto max-w-[85%] rounded-2xl bg-neutral-100 px-3 py-2 text-sm leading-relaxed text-primary shadow-soft">
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
                class="w-full rounded-full border border-neutral-200 bg-white px-4 py-2 pr-24 text-sm text-primary shadow-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-soft)]"
              />
              <button type="submit" class="absolute right-1 top-1 inline-flex items-center justify-center rounded-full bg-accent-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(217,119,89,0.18)] hover:brightness-95">
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

// Intersection observer for sticky bar
onMounted(() => {
  if (!sectionRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      showSticky.value = entry.intersectionRatio < 0.2
    },
    { root: null, threshold: [0, 0.2, 1] }
  )
  observer.observe(sectionRef.value)

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
    observer.disconnect()
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
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
