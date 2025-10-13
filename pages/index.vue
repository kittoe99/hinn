<template>
  <div class="py-12 md:py-16">
    <!-- Hero Section -->
    <section class="bg-transparent mb-12 md:mb-16">
      <div class="max-w-3xl mx-auto text-center px-3 sm:px-4">
        <div class="inline-flex items-center gap-2 rounded-full ring-1 ring-neutral-200 bg-white/70 px-3 py-1 text-xs text-neutral-600 backdrop-blur">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-accent-primary" />
          No setup fees • Cancel anytime
        </div>
        <h1 class="mt-4 text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-primary">
          Pay‑by‑month websites
          <span class="block text-accent-primary">design, hosting, updates</span>
        </h1>
        <p class="mt-4 text-secondary text-base md:text-lg max-w-xl mx-auto">
          Launch a professional site without large upfront costs. One simple monthly plan covers design, hosting, updates, and support—so you can focus on your business.
        </p>
        <div class="mt-6 flex flex-row flex-wrap gap-3 justify-center items-center">
          <button class="inline-flex items-center justify-center px-5 py-3 rounded-full font-semibold bg-black text-white border border-black text-sm md:text-base transition-colors hover:bg-neutral-900">
            Get started
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-2 h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <a href="#products" class="inline-flex items-center justify-center px-5 py-3 rounded-full font-semibold bg-white text-black border border-black text-sm md:text-base gap-2 transition-colors hover:bg-neutral-50">
            See what's included
          </a>
        </div>
      </div>
    </section>

    <!-- Ask Me Anything -->
    <AmaBar />

    <!-- Products Section -->
    <section id="products" class="mt-12 md:mt-20">
      <div class="max-w-5xl mx-auto px-2.5 md:px-4">
        <header class="mb-6 md:mb-8 text-center">
          <div class="text-xs uppercase tracking-wider text-tertiary">Products</div>
          <h2 class="mt-1 text-2xl md:text-4xl font-semibold tracking-tight text-primary">What we build</h2>
        </header>
        <div class="space-y-6 md:space-y-8">
          <!-- Websites -->
          <NuxtLink 
            to="/website" 
            class="group block rounded-3xl border border-soft bg-white p-5 sm:p-6 ring-1 ring-transparent hover:ring-accent-subtle transition-all"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="md:min-w-[14rem]">
                <h3 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Websites</h3>
              </div>
              <div class="flex-1 md:pl-4">
                <p class="text-sm md:text-base text-secondary">
                  Modern, fast, and SEO‑ready sites designed, hosted, and maintained for you—no upfront fees.
                </p>
                <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-tertiary">
                  <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">Design system</span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">CMS & updates</span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">Analytics</span>
                </div>
              </div>
              <div class="md:pl-4">
                <span class="inline-flex items-center rounded-full bg-accent-subtle text-accent-primary px-3 py-1 text-xs font-medium">
                  Explore →
                </span>
              </div>
            </div>
          </NuxtLink>

          <!-- AI Agents -->
          <NuxtLink 
            to="/agents" 
            class="group block rounded-3xl border border-soft bg-white p-5 sm:p-6 ring-1 ring-transparent hover:ring-accent-subtle transition-all"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="md:min-w-[14rem]">
                <h3 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">AI Agents</h3>
              </div>
              <div class="flex-1 md:pl-4">
                <p class="text-sm md:text-base text-secondary">
                  Automate support, lead‑qualifying, and ops with reliable agents integrated into your stack.
                </p>
                <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-tertiary">
                  <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">RAG & tools</span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">Workflows</span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">Observability</span>
                </div>
              </div>
              <div class="md:pl-4">
                <span class="inline-flex items-center rounded-full bg-accent-subtle text-accent-primary px-3 py-1 text-xs font-medium">
                  See details →
                </span>
              </div>
            </div>
          </NuxtLink>

          <!-- Marketing & Branding -->
          <NuxtLink 
            to="/marketing" 
            class="group block rounded-3xl border border-soft bg-white p-5 sm:p-6 ring-1 ring-transparent hover:ring-accent-subtle transition-all"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="md:min-w-[14rem]">
                <h3 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Marketing & Branding</h3>
              </div>
              <div class="flex-1 md:pl-4">
                <p class="text-sm md:text-base text-secondary">
                  Positioning, visual identity, and campaigns that match your goals and amplify your reach.
                </p>
                <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-tertiary">
                  <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">Brand identity</span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">Content</span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">Campaigns</span>
                </div>
              </div>
              <div class="md:pl-4">
                <span class="inline-flex items-center rounded-full bg-accent-subtle text-accent-primary px-3 py-1 text-xs font-medium">
                  See details →
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section id="showcase" class="mt-12 md:mt-20">
      <div class="max-w-5xl mx-auto px-2.5 md:px-4">
        <header class="mb-6 md:mb-8 text-center">
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">Showcase</h2>
          <p class="mt-2 text-sm text-secondary">Recent work and case studies</p>
        </header>
        <div class="overflow-x-auto">
          <div class="flex gap-3 md:gap-4 w-max px-1">
            <a 
              v-for="project in showcaseProjects" 
              :key="project.title"
              href="#" 
              class="group snap-start w-56 sm:w-64 flex-none rounded-lg border border-soft bg-white hover:border-accent-soft transition-all overflow-hidden"
            >
              <div class="relative">
                <img 
                  loading="lazy" 
                  :src="project.image" 
                  :alt="project.title" 
                  class="h-28 w-full object-cover" 
                />
                <span v-if="project.tag" class="absolute top-2 left-2 rounded-full bg-white/90 text-[11px] px-2 py-0.5 ring-1 ring-neutral-200">
                  {{ project.tag }}
                </span>
              </div>
              <div class="p-3">
                <h3 class="text-sm font-semibold text-primary group-hover:underline">{{ project.title }}</h3>
                <p class="mt-1 text-xs text-secondary line-clamp-2">{{ project.description }}</p>
                <span class="mt-2 inline-flex items-center text-xs font-medium text-accent-primary">view project →</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Hinn - Pay-by-month websites, design, hosting, updates',
  meta: [
    { name: 'description', content: 'Launch a professional site without large upfront costs. One simple monthly plan covers design, hosting, updates, and support.' }
  ]
})

const showcaseProjects = [
  {
    title: 'Aurora Fitness',
    description: 'Sleek site with schedules, trainer bios, and conversion pages.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',
    tag: 'Website'
  },
  {
    title: 'Summit Outdoors',
    description: 'Catalog layout with product stories and lightweight ecommerce.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    tag: 'CMS'
  },
  {
    title: 'Bluegrain Coffee Co.',
    description: 'Editorial design, storytelling pages, newsletter growth.',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop',
    tag: 'Brand'
  },
  {
    title: 'Northstar Consulting',
    description: 'Professional presence with case study templates.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    tag: 'Case study'
  },
  {
    title: 'Evergreen Nonprofit',
    description: 'Accessible site with donation flows and impact highlights.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
    tag: null
  }
]
</script>
