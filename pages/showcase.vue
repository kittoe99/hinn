<template>
  <div class="pb-12 md:pb-16">
    <!-- Hero Section -->
    <section class="pt-12 md:pt-16">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-600"></span>
            Portfolio
          </div>
          <h1 class="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
            Real sites we've built & launched
          </h1>
          <p class="mt-4 text-base md:text-lg text-neutral-600">
            From idea to live site in weeks. See what we've shipped for businesses just like yours—all done for you, start to finish.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="mt-10 flex flex-wrap justify-center gap-3">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectedCategory = category.value"
            :class="[
              'rounded-full px-5 py-2 text-sm font-semibold transition-all',
              selectedCategory === category.value
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-blue-600 hover:text-blue-700'
            ]"
          >
            {{ category.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <a
            v-for="project in filteredProjects"
            :key="project.title"
            href="#"
            class="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-2 hover:border-blue-600 hover:shadow-2xl"
          >
            <!-- Project Image -->
            <div class="relative aspect-[4/3] overflow-hidden bg-neutral-100">
              <img
                loading="lazy"
                :src="project.image"
                :alt="project.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <!-- Tags -->
              <div class="absolute top-3 left-3 flex flex-wrap gap-2">
                <span class="rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm">
                  {{ project.category }}
                </span>
                <span v-if="project.featured" class="rounded-full bg-blue-600/95 backdrop-blur px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  Featured
                </span>
              </div>

              <!-- View Project Overlay -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-xl">
                  View Project →
                </div>
              </div>
            </div>

            <!-- Project Info -->
            <div class="p-6">
              <h3 class="text-xl font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                {{ project.title }}
              </h3>
              <p class="mt-2 text-sm text-neutral-600 line-clamp-2">
                {{ project.description }}
              </p>
              
              <!-- Stats/Metrics -->
              <div v-if="project.metrics" class="mt-4 flex items-center gap-4 text-xs text-neutral-500">
                <div v-for="metric in project.metrics" :key="metric.label" class="flex items-center gap-1">
                  <span class="font-semibold text-blue-700">{{ metric.value }}</span>
                  <span>{{ metric.label }}</span>
                </div>
              </div>

              <!-- Tech Stack -->
              <div v-if="project.tech" class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </a>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-16 w-16 mx-auto text-neutral-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-4 text-base text-neutral-600">No projects found in this category.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="mt-20 md:mt-24">
      <div class="max-w-4xl mx-auto px-4 lg:px-6">
        <div class="rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-8 md:p-12 text-center shadow-xl">
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900">Ready to get your site built?</h2>
          <p class="mt-3 text-base text-neutral-600 max-w-2xl mx-auto">
            Subscribe today and we'll start building this week. No contracts, no setup fees—just professional work that gets results.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <NuxtLink
              to="/get-started"
              class="w-full sm:w-auto rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-800 hover:shadow-xl"
            >
              Get Started
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="w-full sm:w-auto rounded-full border-2 border-blue-200 bg-blue-50 px-8 py-4 text-base font-semibold text-blue-700 transition hover:bg-blue-100 hover:border-blue-300"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Showcase | Our Work & Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Explore our portfolio of high-converting websites, AI agents, and marketing campaigns. See real results from our client projects.'
    }
  ]
})

const selectedCategory = ref('all')

const categories = [
  { label: 'All Projects', value: 'all' },
  { label: 'Websites', value: 'website' },
  { label: 'AI Agents', value: 'agents' },
  { label: 'Marketing', value: 'marketing' }
]

const projects = [
  {
    title: 'E-Commerce Platform Redesign',
    description: 'Complete redesign and development of a high-converting e-commerce platform with custom checkout flow and inventory management.',
    category: 'Websites',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    featured: true,
    metrics: [
      { label: 'conversion', value: '+45%' },
      { label: 'page speed', value: '95/100' }
    ],
    tech: ['Next.js', 'Stripe', 'Tailwind']
  },
  {
    title: 'AI Customer Support Agent',
    description: 'Intelligent chatbot trained on company knowledge base, handling 80% of customer inquiries automatically with human handoff.',
    category: 'AI Agents',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
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
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    metrics: [
      { label: 'leads', value: '2,400+' },
      { label: 'ROI', value: '340%' }
    ],
    tech: ['Google Ads', 'HubSpot', 'Analytics']
  },
  {
    title: 'Real Estate Listing Platform',
    description: 'Modern property listing website with advanced search, map integration, and virtual tour capabilities.',
    category: 'Websites',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    metrics: [
      { label: 'listings', value: '5,000+' },
      { label: 'uptime', value: '99.9%' }
    ],
    tech: ['Vue.js', 'Mapbox', 'Firebase']
  },
  {
    title: 'Sales Qualification Bot',
    description: 'AI agent that qualifies leads through conversational interface, integrates with CRM, and schedules demos automatically.',
    category: 'AI Agents',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    metrics: [
      { label: 'qualified leads', value: '+120%' },
      { label: 'time saved', value: '15hrs/wk' }
    ],
    tech: ['GPT-4', 'Salesforce', 'Calendly']
  },
  {
    title: 'Content Marketing Strategy',
    description: 'SEO-focused content strategy with blog posts, case studies, and whitepapers driving organic traffic growth.',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    metrics: [
      { label: 'organic traffic', value: '+280%' },
      { label: 'keywords ranked', value: '450+' }
    ],
    tech: ['Ahrefs', 'WordPress', 'GA4']
  },
  {
    title: 'Healthcare Portal',
    description: 'HIPAA-compliant patient portal with appointment scheduling, secure messaging, and medical records access.',
    category: 'Websites',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    featured: true,
    metrics: [
      { label: 'security', value: 'HIPAA' },
      { label: 'satisfaction', value: '4.8/5' }
    ],
    tech: ['React', 'Node.js', 'PostgreSQL']
  },
  {
    title: 'Email Automation Campaign',
    description: 'Lifecycle email automation with personalized sequences, A/B testing, and advanced segmentation.',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    metrics: [
      { label: 'open rate', value: '42%' },
      { label: 'conversions', value: '+65%' }
    ],
    tech: ['Mailchimp', 'Segment', 'Zapier']
  },
  {
    title: 'Restaurant Ordering System',
    description: 'Online ordering platform with real-time inventory, delivery tracking, and loyalty program integration.',
    category: 'Websites',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    metrics: [
      { label: 'orders/day', value: '500+' },
      { label: 'avg order', value: '+35%' }
    ],
    tech: ['Nuxt.js', 'Stripe', 'Twilio']
  }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects
  }
  return projects.filter(p => p.category.toLowerCase() === selectedCategory.value)
})
</script>
