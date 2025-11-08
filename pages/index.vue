<template>
  <div class="relative overflow-hidden scroll-smooth bg-[#f5f3ef]">
    <!-- Hero Section -->
    <section class="relative pt-16 pb-20 md:pt-24 md:pb-24">
      <!-- Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 right-10 w-96 h-96 bg-[#d97759]/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-[#d97759]/3 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-5xl mx-auto px-6 lg:px-8 relative">
        <div class="text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-neutral-200 mb-6 opacity-0 animate-fade-in" style="animation-delay: 0ms">
            <span class="inline-block w-2 h-2 rounded-full bg-[#d97759] animate-pulse"></span>
            <span class="text-sm font-medium text-neutral-700">Trusted by 500+ companies</span>
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05] opacity-0 animate-fade-in mb-6" style="animation-delay: 50ms">
            Build, launch, and
            <span class="block mt-2">
              <span :class="['typewriter-word text-[#d97759]', { 'flipping': isFlipping }]">{{ currentWord }}</span> faster
            </span>
          </h1>
          
          <p class="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in mb-8" style="animation-delay: 100ms">
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
          </div>

          <!-- Website Showcase Grid -->
          <div class="opacity-0 animate-fade-in" style="animation-delay: 200ms">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-semibold text-neutral-900">From the Community</h3>
                <p class="text-sm text-neutral-600">Explore what the community is building</p>
              </div>
              <button class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Browse All →
              </button>
            </div>
            
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <!-- Card 1 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-50 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80" 
                    alt="SaaS Landing Page"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <!-- View Details Button -->
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">SaaS Landing Page</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Technology</span>
                    <span>•</span>
                    <span>Landing Page</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Nov 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" 
                    alt="Photography Portfolio"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">Photography Portfolio</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Creative</span>
                    <span>•</span>
                    <span>Portfolio</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Oct 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80" 
                    alt="AI Gateway Starter"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">AI Gateway Starter</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>AI & Tech</span>
                    <span>•</span>
                    <span>Dashboard</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Nov 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 4 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-800 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80" 
                    alt="AI Agents Dashboard"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">AI Agents Dashboard</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Enterprise</span>
                    <span>•</span>
                    <span>Analytics</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Oct 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 5 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" 
                    alt="Marketing Analytics"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">Marketing Analytics</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Marketing</span>
                    <span>•</span>
                    <span>Dashboard</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Sep 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 6 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80" 
                    alt="Brand Studio"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">Brand Studio</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Design</span>
                    <span>•</span>
                    <span>Branding</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Nov 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-20 md:py-32">
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-4">Everything you need</h2>
          <p class="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Three powerful products, one seamless subscription
          </p>
        </div>

        <!-- Product Grid -->
        <div class="grid md:grid-cols-3 gap-8 md:gap-12">
          <NuxtLink
            v-for="(product, index) in subscriptionProducts"
            :key="product.title"
            :to="product.href"
            :ref="el => { if (el) productRefs[index] = el }"
            class="group relative p-8 rounded-2xl bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all"
          >
            <!-- Icon -->
            <div class="mb-6">
              <div class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 group-hover:scale-110 transition-transform">
                <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path v-if="product.title === 'Websites'" stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  <path v-else-if="product.title === 'AI Agents'" stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                </svg>
              </div>
            </div>

            <!-- Content -->
            <h3 class="text-2xl font-semibold text-neutral-900 mb-3">{{ product.title }}</h3>
            <p class="text-base text-neutral-600 mb-6 leading-relaxed">{{ product.description }}</p>

            <!-- Arrow Link -->
            <div class="inline-flex items-center text-sm font-semibold text-neutral-900 group-hover:text-[#d97759] transition-colors">
              <span>{{ product.cta }}</span>
              <svg class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-24 relative overflow-hidden bg-[#e8e3d8] rounded-3xl mx-6 lg:mx-8 mb-12">
      <div class="max-w-6xl mx-auto px-8 lg:px-12">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <!-- Left Column: Heading and CTA -->
          <div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 leading-tight">
              Ready to transform your digital presence?
            </h2>
            <p class="text-lg text-neutral-700 mb-8 leading-relaxed">
              Join hundreds of companies building faster with AI-powered tools
            </p>
            <NuxtLink
              to="/dashboard"
              class="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-300"
            >
              Get Started Free
            </NuxtLink>
          </div>

          <!-- Right Column: Links -->
          <div class="space-y-1">
            <div class="text-sm font-medium text-neutral-600 mb-4">Learn more</div>
            <NuxtLink
              to="/website"
              class="group flex items-center justify-between py-4 border-b border-neutral-300 hover:border-neutral-400 transition-colors"
            >
              <span class="text-lg font-medium text-neutral-900">Build professional websites</span>
              <svg class="w-5 h-5 text-neutral-900 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/agents"
              class="group flex items-center justify-between py-4 border-b border-neutral-300 hover:border-neutral-400 transition-colors"
            >
              <span class="text-lg font-medium text-neutral-900">Deploy AI agents instantly</span>
              <svg class="w-5 h-5 text-neutral-900 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/marketing"
              class="group flex items-center justify-between py-4 border-b border-neutral-300 hover:border-neutral-400 transition-colors"
            >
              <span class="text-lg font-medium text-neutral-900">Grow with smart marketing</span>
              <svg class="w-5 h-5 text-neutral-900 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
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
    description: 'AI-powered websites that sell and book on autopilot. Built-in sales automation, lead qualification, and appointment bookingâ€"all working 24/7.',
    href: '/website',
    cta: 'Explore Websites',
    tags: ['AI site builder', 'Sales automation', 'Lead qualification', 'Auto-booking'],
    image: '/website-v2.png',
    delay: 0
  },
  {
    title: 'AI Agents',
    description: 'Configure and launch intelligent, autonomous AI agents in minutes. From phone agents to hiring assistantsâ€"ready to work 24/7. No coding required.',
    href: '/agents',
    cta: 'Explore AI Agents',
    tags: ['Phone agents', 'Sales agents', 'Support agents', 'Hiring agents'],
    image: '/agents-v2.png',
    delay: 100
  },
  {
    title: 'Marketing & Branding',
    description: 'Generate custom brand assets, launch campaigns with a click, and improve your online presenceâ€"all powered by AI. Create, launch, optimize automatically.',
    href: '/marketing',
    cta: 'Explore Marketing',
    tags: ['Brand generator', 'Campaign launcher', 'Content creation', 'SEO automation'],
    image: '/marketing-v2.png',
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
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

