<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-24 md:pt-32 md:pb-40">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="max-w-4xl">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 leading-[1.1] opacity-0 animate-fade-in" style="animation-delay: 0ms">
            Websites, marketing &<br />
            <span :class="['typewriter-word text-neutral-900', { 'flipping': isFlipping }]">{{ currentWord }}</span><br />
            that put growth at the frontier
          </h1>
          <p class="mt-8 text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed opacity-0 animate-fade-in" style="animation-delay: 100ms">
            We build reliable, scalable digital products. One monthly subscription for websites, AI agents, and marketing that actually work.
          </p>
          <div class="mt-10 flex flex-wrap items-center gap-4 opacity-0 animate-fade-in" style="animation-delay: 200ms">
            <NuxtLink
              to="/get-started"
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/showcase"
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              View our work
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">What we build</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Monthly subscriptions for websites, AI agents, and marketing that actually work.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="(product, index) in subscriptionProducts"
            :key="product.title"
            :to="product.href"
            class="group relative bg-white border border-neutral-200 p-8 hover:border-neutral-900 transition-all duration-200 opacity-0 animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <h3 class="text-2xl font-medium text-neutral-900 mb-3">{{ product.title }}</h3>
            <p class="text-base text-neutral-600 leading-relaxed mb-6">{{ product.description }}</p>
            <div class="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 group-hover:gap-3 transition-all">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Featured work</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Real projects we've built and launched for businesses.
          </p>
        </div>
        
        <div class="space-y-4">
          <a
            v-for="(project, index) in showcaseProjects.slice(0, 6)"
            :key="project.title"
            href="#"
            class="group block border border-neutral-200 bg-white p-6 hover:border-neutral-900 transition-all duration-200 opacity-0 animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-xl font-medium text-neutral-900">{{ project.title }}</h3>
                  <span class="text-xs font-medium text-neutral-500 uppercase tracking-wide">{{ project.tag }}</span>
                </div>
                <p class="text-base text-neutral-600 leading-relaxed">{{ project.description }}</p>
              </div>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </div>
        
        <div class="mt-10">
          <NuxtLink 
            to="/showcase" 
            class="inline-flex items-center gap-2 text-base font-medium text-neutral-900 hover:gap-3 transition-all underline underline-offset-4"
          >
            View all projects
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
const words = ['AI agents', 'automation', 'chatbots', 'workflows']
const currentWord = ref(words[0])
let wordIndex = 0
let charIndex = words[0].length
let isTyping = true
let typewriterTimeout = null
const isFlipping = ref(false)

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
})

onUnmounted(() => {
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout)
  }
})

// Subtle color palette for chips ("stickers")
const chipColorClasses = [
  'border border-blue-200 bg-blue-50 text-blue-700',
  'border border-amber-200 bg-amber-50 text-amber-700',
  'border border-emerald-200 bg-emerald-50 text-emerald-700',
  'border border-purple-200 bg-purple-50 text-purple-700'
]

// Marker/badge color by tag label
const projectTagColor = (tag) => {
  const key = String(tag || '').toLowerCase()
  if (key.includes('brand')) return 'border border-purple-200 bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white'
  if (key.includes('case')) return 'border border-amber-200 bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white'
  if (key.includes('cms')) return 'border border-emerald-200 bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
  if (key.includes('web')) return 'border border-blue-200 bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
  return 'border border-neutral-200 bg-neutral-100 text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white'
}


const heroBenefits = [
  {
    title: 'Fractional product pod',
    description: 'Partner with a strategist, designer, and engineer who launch together every sprint.',
    icon: 'M5 13l4 4L19 7'
  },
  {
    title: 'Iterate without limits',
    description: 'Drop in new pages, experiments, and UX tune-ups whenever you need momentum.',
    icon: 'M4 7v6a5 5 0 005 5h7m4-4V8a5 5 0 00-5-5H8'
  },
  {
    title: 'Ops handled for you',
    description: 'Hosting, monitoring, analytics, and SEO upkeep are bundled so nothing slips.',
    icon: 'M12 6v12m6-6H6'
  },
  {
    title: 'Connect your stack',
    description: 'Integrations with your CRM, marketing tools, and data sources come standard.',
    icon: 'M4 7h16M4 12h12M4 17h8'
  }
]


const subscriptionHighlights = [
  {
    title: 'Launch-ready in weeks',
    description: 'We run design sprints, QA, and launch support so your team can focus on storytelling and distribution.',
    icon: 'M9 5l7 7-7 7'
  },
  {
    title: 'Continuous optimization',
    description: 'Proactive experiments, UX updates, and growth playbooks based on analytics and user interviews.',
    icon: 'M5 12h14M12 5l7 7-7 7'
  },
  {
    title: 'Deep integrations',
    description: 'Connect to HubSpot, Airtable, Zapier, and internal tools to keep your marketing stack humming.',
    icon: 'M12 6v12m6-6H6'
  }
]

const featureHighlights = [
  {
    title: 'Websites',
    description: 'We design, build, and launch your site—then keep it fast, secure, and converting.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    title: 'Branding',
    description: 'Complete visual identity—logo, colors, fonts—delivered ready to use everywhere.',
    icon: 'M3 5h18M8 5v14m8-14v14M4 19h16'
  },
  {
    title: 'AI Agents',
    description: 'Autonomous agents handle support, qualify leads, and work 24/7—no training required.',
    icon: 'M9 5v2a2 2 0 002 2h2a2 2 0 002-2V5m-2 6v7m-6-7v7m-4 0h12'
  },
  {
    title: 'Fully Managed',
    description: 'Hosting, security, backups, analytics\u2014we handle it all so you don\'t have to.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  }
]

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

const testimonials = [
  {
    name: 'Melissa Ward',
    role: 'Head of Marketing, Northwind SaaS',
    quote: 'Hinn shipped a new site in 12 days and continues to deliver fresh campaign pages every sprint without needing to brief multiple vendors.',
    initials: 'MW'
  },
  {
    name: 'Sujay Patel',
    role: 'Founder, Summit Outdoors',
    quote: 'Our subscription gives us product design, copy, and technical help in one place. Conversions are up 28% and we finally have momentum.',
    initials: 'SP'
  },
  {
    name: 'Alexis Romero',
    role: 'Director of Growth, Evergreen Nonprofit',
    quote: 'The team handles updates, analytics, and donor journeys weekly. We just drop ideas in Slack and they’re live within days.',
    initials: 'AR'
  },
  {
    name: 'Tyler Chan',
    role: 'COO, Bluegrain Coffee',
    quote: 'It feels like having a full product squad on retainer. They iterate quickly and give us clarity on what’s driving results.',
    initials: 'TC'
  }
]

const faqs = [
  {
    question: 'What does the monthly subscription include?',
    answer:
      'Every plan includes a dedicated cross-functional team, design and development hours, hosting and maintenance, analytics reporting, and weekly strategy reviews. You can request new pages, experiments, and enhancements anytime.'
  },
  {
    question: 'How quickly can we launch?',
    answer:
      'Most clients launch in around ten days. We begin with discovery and design sprints, then develop, QA, and deploy. We handle DNS, CMS migration, and on-call support for the first weeks after launch.'
  },
  {
    question: 'Can you work with our existing tools?',
    answer:
      'Yes. We regularly integrate with HubSpot, Salesforce, Airtable, Webflow, Supabase, and proprietary APIs. We coordinate with your team to ensure security and compliance requirements are met.'
  },
  {
    question: 'What if we need to pause or cancel?',
    answer:
      'Subscriptions are billed monthly. You can pause or cancel with 30 days notice. When you return, we pick up where we left off with the same context, assets, and roadmap.'
  }
]

const brandFeatures = [
  {
    title: 'Logo & Identity',
    description: 'Complete logo system with typography and color guidelines.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    title: 'Brand Assets',
    description: 'Templates for social media, presentations, and marketing.',
    icon: 'M3 5h18M8 5v14m8-14v14M4 19h16'
  },
  {
    title: 'Style Guide',
    description: 'Documentation to keep your brand consistent everywhere.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  }
]

const selectedShowcaseCategory = ref('all')

const showcaseCategories = [
  { label: 'All Projects', value: 'all' },
  { label: 'Websites', value: 'websites' },
  { label: 'AI Agents', value: 'agents' },
  { label: 'Marketing', value: 'marketing' }
]

const showcaseProjects = [
  {
    title: 'E-Commerce Platform Redesign',
    description: 'Complete redesign and development of a high-converting e-commerce platform with custom checkout flow.',
    tag: 'Websites',
    featured: true,
    metrics: [
      { label: 'conversion', value: '+45%' },
      { label: 'page speed', value: '95/100' }
    ],
    tech: ['Next.js', 'Stripe', 'Tailwind']
  },
  {
    title: 'AI Customer Support Agent',
    description: 'Intelligent chatbot trained on company knowledge base, handling 80% of customer inquiries automatically.',
    tag: 'AI Agents',
    featured: true,
    metrics: [
      { label: 'automation', value: '80%' },
      { label: 'response time', value: '<2s' }
    ],
    tech: ['OpenAI', 'LangChain', 'Supabase']
  },
  {
    title: 'SaaS Product Launch Campaign',
    description: 'Multi-channel marketing campaign for B2B SaaS product launch, including SEO, paid ads, and email automation.',
    tag: 'Marketing',
    metrics: [
      { label: 'leads', value: '2,400+' },
      { label: 'ROI', value: '340%' }
    ],
    tech: ['Google Ads', 'HubSpot', 'Analytics']
  },
  {
    title: 'Real Estate Listing Platform',
    description: 'Modern property listing website with advanced search, map integration, and virtual tour capabilities.',
    tag: 'Websites',
    metrics: [
      { label: 'listings', value: '5,000+' },
      { label: 'uptime', value: '99.9%' }
    ],
    tech: ['Vue.js', 'Mapbox', 'Firebase']
  },
  {
    title: 'Sales Qualification Bot',
    description: 'AI agent that qualifies leads through conversational interface and schedules demos automatically.',
    tag: 'AI Agents',
    metrics: [
      { label: 'qualified leads', value: '+120%' },
      { label: 'time saved', value: '15hrs/wk' }
    ],
    tech: ['GPT-4', 'Salesforce', 'Calendly']
  },
  {
    title: 'Content Marketing Strategy',
    description: 'SEO-focused content strategy with blog posts, case studies, and whitepapers driving organic traffic growth.',
    tag: 'Marketing',
    metrics: [
      { label: 'organic traffic', value: '+280%' },
      { label: 'keywords ranked', value: '450+' }
    ],
    tech: ['Ahrefs', 'WordPress', 'GA4']
  }
]

const filteredShowcaseProjects = computed(() => {
  if (selectedShowcaseCategory.value === 'all') {
    return showcaseProjects
  }
  return showcaseProjects.filter(p => p.tag.toLowerCase() === selectedShowcaseCategory.value)
})
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

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
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
</style>
