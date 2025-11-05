<template>
  <div class="relative overflow-hidden scroll-smooth bg-[#fdf6e6]">
    <!-- Hero Section -->
    <section class="relative pt-24 pb-32 md:pt-40 md:pb-48">
      <!-- Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 right-10 w-72 h-72 bg-[#d97759]/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-[#d97759]/3 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-neutral-200 mb-8 opacity-0 animate-fade-in" style="animation-delay: 0ms">
            <span class="inline-block w-2 h-2 rounded-full bg-[#d97759] animate-pulse"></span>
            <span class="text-sm font-medium text-neutral-700">Trusted by 500+ companies</span>
          </div>

          <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 leading-[1.05] opacity-0 animate-fade-in mb-8" style="animation-delay: 50ms">
            Build, launch, and
            <span class="block mt-2">
              <span :class="['typewriter-word text-[#d97759]', { 'flipping': isFlipping }]">{{ currentWord }}</span> faster
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in mb-12" style="animation-delay: 100ms">
            One subscription for AI-powered websites, intelligent agents, and marketing that drives real growth.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in mb-16" style="animation-delay: 150ms">
            <NuxtLink
              to="/dashboard"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Building
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-neutral-900 bg-white/60 backdrop-blur-sm border border-neutral-300 hover:bg-white hover:border-neutral-400 transition-all duration-300"
            >
              Book a Demo
            </NuxtLink>
          </div>

          <!-- Video Preview -->
          <div class="opacity-0 animate-fade-in" style="animation-delay: 200ms">
            <div class="relative aspect-video rounded-2xl overflow-hidden border border-neutral-300 shadow-2xl bg-neutral-900 group hover:border-neutral-400 transition-all duration-300">
              <div class="absolute inset-0 bg-gradient-to-br from-[#d97759]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <iframe
                class="absolute inset-0 h-full w-full"
                src="https://player.vimeo.com/video/970513558?title=0&byline=0&portrait=0"
                title="Hinn capabilities overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                loading="lazy"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 border-y border-neutral-200 bg-white/40 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">500+</div>
            <div class="text-sm text-neutral-600">Active Projects</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">98%</div>
            <div class="text-sm text-neutral-600">Client Satisfaction</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">10 Days</div>
            <div class="text-sm text-neutral-600">Average Launch</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">24/7</div>
            <div class="text-sm text-neutral-600">AI Support</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-24 md:py-32">
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-4">Everything you need</h2>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
            Three powerful products, one seamless subscription
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="(product, index) in subscriptionProducts"
            :key="product.title"
            :to="product.href"
            :ref="el => { if (el) productRefs[index] = el }"
            class="group relative bg-white/60 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8 hover:bg-white hover:border-neutral-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <!-- Accent Border -->
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d97759] to-[#d97759]/60 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="flex flex-col h-full">
              <!-- Icon -->
              <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-[#d97759]/10 mb-6 group-hover:bg-[#d97759]/20 transition-colors">
                <svg v-if="product.title === 'Websites'" :class="['h-7 w-7 transition-all duration-500 product-icon', { 'icon-active': productInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 2.25c-2.998 0-5.74 1.1-7.843 2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <svg v-else-if="product.title === 'AI Agents'" :class="['h-7 w-7 transition-all duration-500 product-icon', { 'icon-active': productInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                <svg v-else-if="product.title === 'Marketing & Branding'" :class="['h-7 w-7 transition-all duration-500 product-icon', { 'icon-active': productInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                </svg>
              </div>

              <!-- Content -->
              <h3 class="text-2xl font-bold text-neutral-900 mb-3">{{ product.title }}</h3>
              <p class="text-base text-neutral-600 leading-relaxed mb-6 flex-grow">
                {{ product.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tag in product.tags.slice(0, 2)" :key="tag" class="text-xs px-3 py-1 rounded-full bg-[#d97759]/10 text-[#d97759] font-medium">
                  {{ tag }}
                </span>
              </div>

              <!-- CTA -->
              <div class="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover:text-[#d97759] transition-colors">
                {{ product.cta }}
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 md:py-32 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800"></div>
      <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')"></div>
      
      <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Ready to transform your digital presence?</h2>
        <p class="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
          Join hundreds of companies building faster with AI-powered tools
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink
            to="/dashboard"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-neutral-900 bg-white hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Free
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
          >
            Talk to Sales
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

useHead({
  title: 'Professional Website Design & Development Services | Monthly Subscription | Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Custom web design, React/Vue.js development, SEO optimization, and AI chatbot integration on a monthly subscription. Launch your website in 10 days with ongoing support and optimization.'
    }
  ]
})

// Typewriter effect with flip transition
const words = ['scale', 'grow', 'innovate', 'succeed']
const currentWord = ref(words[0])
let wordIndex = 0
let charIndex = words[0].length
let isTyping = true
let typewriterTimeout = null
const isFlipping = ref(false)

// Scroll-based icon animation for mobile
const productRefs = ref([])
const productInView = ref([false, false, false])
let observer = null

const typeWriter = () => {
  const currentFullWord = words[wordIndex]
  
  if (isTyping) {
    currentWord.value = currentFullWord.substring(0, charIndex + 1)
    charIndex++
    
    if (charIndex === currentFullWord.length) {
      // Word complete, pause then flip to next word
      typewriterTimeout = setTimeout(() => {
        isFlipping.value = true
        setTimeout(() => {
          wordIndex = (wordIndex + 1) % words.length
          charIndex = 0
          currentWord.value = ''
          isFlipping.value = false
          typewriterTimeout = setTimeout(typeWriter, 100)
        }, 600) // Flip animation duration
      }, 2500) // Pause before flip
      return
    }
    
    typewriterTimeout = setTimeout(typeWriter, 120)
  }
}

onMounted(() => {
  // First word is already shown, wait then start the flip cycle
  setTimeout(() => {
    // Trigger flip to second word after pause
    isFlipping.value = true
    setTimeout(() => {
      wordIndex = 1
      charIndex = 0
      currentWord.value = ''
      isFlipping.value = false
      typewriterTimeout = setTimeout(typeWriter, 100)
    }, 600) // Flip animation duration
  }, 3500) // Pause on first word before starting animation

  // Set up Intersection Observer for scroll-based icon animation
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target
        const index = productRefs.value.findIndex(ref => {
          if (ref && ref.$el) return ref.$el === element
          return ref === element
        })
        
        if (index !== -1) {
          productInView.value[index] = entry.isIntersecting
        }
      })
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
      rootMargin: '-50px'
    }
  )

  // Observe all product cards after a slight delay to ensure refs are set
  setTimeout(() => {
    productRefs.value.forEach((ref) => {
      const element = ref && ref.$el ? ref.$el : ref
      if (element && element instanceof Element) {
        observer.observe(element)
      }
    })
  }, 200)
})

onUnmounted(() => {
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout)
  }
  
  // Clean up observer
  if (observer) {
    observer.disconnect()
  }
})

const subscriptionProducts = [
  {
    title: 'Websites',
    description: 'AI-powered websites that sell and book on autopilot. Built-in sales automation, lead qualification, and appointment booking—all working 24/7.',
    href: '/website',
    cta: 'Explore Websites',
    tags: ['AI site builder', 'Sales automation', 'Lead qualification', 'Auto-booking'],
    delay: 0
  },
  {
    title: 'AI Agents',
    description: 'Configure and launch intelligent, autonomous AI agents in minutes. From phone agents to hiring assistants—ready to work 24/7. No coding required.',
    href: '/agents',
    cta: 'Explore AI Agents',
    tags: ['Phone agents', 'Sales agents', 'Support agents', 'Hiring agents'],
    delay: 100
  },
  {
    title: 'Marketing & Branding',
    description: 'Generate custom brand assets, launch campaigns with a click, and improve your online presence—all powered by AI. Create, launch, optimize automatically.',
    href: '/marketing',
    cta: 'Explore Marketing',
    tags: ['Brand generator', 'Campaign launcher', 'Content creation', 'SEO automation'],
    delay: 200
  }
]
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.typewriter-word {
  display: inline;
  will-change: opacity;
  -webkit-font-smoothing: antialiased;
}

.typewriter-word.flipping {
  animation: fadeOut 0.4s ease-in-out;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

/* Product icon styles */
.product-icon {
  stroke: #a3a3a3;
  fill: none;
}

/* Desktop: hover effect */
@media (min-width: 768px) {
  .group:hover .product-icon {
    fill: #d97759;
    stroke: #d97759;
  }
}

/* Mobile: scroll-based fill */
@media (max-width: 767px) {
  .product-icon.icon-active {
    fill: #d97759;
    stroke: #d97759;
  }
}
</style>
