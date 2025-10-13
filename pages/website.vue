<template>
  <div class="py-12 md:py-16">
    <!-- Hero Section -->
    <section>
      <div class="max-w-5xl mx-auto px-3 sm:px-4 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div class="text-center md:text-left">
          <h1 class="mt-1 text-3xl md:text-4xl font-semibold tracking-tight text-primary">
            Custom High End Websites
          </h1>
          <p class="mt-3 text-sm md:text-base text-secondary">
            Professional, pay-by-month websites with stunning design, secure hosting, and ongoing updates included. Get back to what you do best—running your business.
          </p>
          <p class="mt-2 text-sm md:text-base text-secondary">
            We handle it all. One flat monthly fee covers everything you need for a powerful, professional online presence.
          </p>
          <div class="mt-5 flex items-center gap-3 justify-center md:justify-start">
            <button class="px-5 py-3 rounded-full bg-accent-primary text-white border border-accent-primary text-sm md:text-base transition-colors hover:bg-accent-focus">
              Get started
            </button>
            <a href="#features" class="px-5 py-3 rounded-full border border-neutral-300 bg-white text-sm text-neutral-800 hover:bg-neutral-50">
              See features
            </a>
          </div>
        </div>
        <div class="relative h-48 md:h-64 rounded-3xl border border-soft overflow-hidden bg-gradient-to-br from-accent-subtle to-white flex items-center justify-center">
          <div class="text-6xl text-accent-primary/20">🌐</div>
        </div>
      </div>
    </section>

    <!-- Key Benefits -->
    <section class="mt-8 md:mt-12">
      <div class="max-w-4xl mx-auto px-3 sm:px-4">
        <div class="flex flex-wrap items-center gap-2">
          <span 
            v-for="benefit in keyBenefits" 
            :key="benefit"
            class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-800 ring-1 ring-neutral-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-accent-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ benefit }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="mt-10 md:mt-14">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <div class="grid md:grid-cols-2 gap-5 md:gap-6">
          <div 
            v-for="(feature, index) in displayedFeatures" 
            :key="feature.title"
            class="flex items-start gap-3 rounded-2xl border border-soft bg-white p-4"
          >
            <div class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-subtle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6 text-accent-primary">
                <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-sm font-semibold tracking-tight text-primary">{{ feature.title }}</h3>
              <p class="mt-1 text-sm text-secondary">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
        <div class="mt-5 flex justify-center">
          <button
            @click="showAllFeatures = !showAllFeatures"
            class="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-50"
          >
            {{ showAllFeatures ? 'Show fewer' : 'Show all features' }}
          </button>
        </div>
      </div>
    </section>

    <!-- AI-Powered Section -->
    <section class="mt-12 md:mt-16 bg-neutral-50 py-8 md:py-10">
      <div class="max-w-5xl mx-auto px-3 md:px-4">
        <header class="mb-6 md:mb-8 text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">
            Not Just a Website. A Growth Partner Powered by AI.
          </h2>
        </header>
        <div class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="item in aiFeatures" 
            :key="item.title"
            class="flex items-start gap-3"
          >
            <div class="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white ring-1 ring-neutral-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-accent-primary">
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-medium text-primary">{{ item.title }}</div>
              <p class="mt-1 text-sm text-secondary">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <header class="mb-6 md:mb-8 text-center">
          <h2 class="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-primary">
            Simple monthly pricing
          </h2>
          <p class="mt-2 text-sm md:text-base text-secondary max-w-2xl mx-auto">
            One flat monthly fee covers design, hosting, updates, and support.
          </p>
        </header>
        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <div 
            v-for="tier in pricingTiers" 
            :key="tier.name"
            class="rounded-3xl border border-soft bg-white p-5 sm:p-6 ring-1 ring-transparent hover:ring-accent-subtle transition-all"
          >
            <div class="flex items-baseline justify-between">
              <div class="text-base font-semibold text-primary">{{ tier.name }}</div>
              <div class="text-primary font-semibold">{{ tier.price }}</div>
            </div>
            <ul class="mt-3 space-y-2 text-sm text-secondary">
              <li 
                v-for="feature in tier.features" 
                :key="feature"
                class="flex items-start gap-2"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-accent-primary mt-0.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
            <div class="mt-4">
              <button class="w-full px-5 py-3 rounded-full bg-accent-primary text-white border border-accent-primary text-sm transition-colors hover:bg-accent-focus">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <header class="mb-6 md:mb-8 text-center">
          <h2 class="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-primary">
            Frequently asked questions
          </h2>
          <p class="mt-2 text-sm md:text-base text-secondary max-w-2xl mx-auto">
            If you have other questions, reach out—we're happy to help.
          </p>
        </header>
        <div class="grid md:grid-cols-2 gap-4">
          <details 
            v-for="(faq, index) in faqs" 
            :key="faq.q"
            :open="index === 0"
            class="group rounded-2xl border border-soft bg-white p-4"
          >
            <summary class="flex items-start justify-between cursor-pointer select-none">
              <div class="flex items-start gap-3 pr-4">
                <span class="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent-subtle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5 text-accent-primary">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 9h.01M15 9h.01M8 13a6 6 0 108 0" />
                  </svg>
                </span>
                <span class="text-sm font-medium text-primary">{{ faq.q }}</span>
              </div>
              <span class="ml-3 mt-1 text-neutral-400 transition-transform group-open:rotate-180">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p class="mt-2 text-sm text-secondary pl-9">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="mt-12 md:mt-16 bg-neutral-50 py-8 md:py-10">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-xl md:text-2xl font-semibold tracking-tight text-primary">
          Ready to get started?
        </h2>
        <p class="mt-2 text-sm md:text-base text-secondary">
          Talk to us about your goals—we'll recommend the right plan and next steps.
        </p>
        <div class="mt-4 flex items-center justify-center gap-3">
          <button class="px-5 py-3 rounded-full bg-accent-primary text-white border border-accent-primary text-sm md:text-base transition-colors hover:bg-accent-focus">
            Start now
          </button>
          <button class="px-5 py-3 rounded-full border border-neutral-300 bg-white text-sm text-neutral-800 hover:bg-neutral-50">
            Contact us
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Custom High End Websites - Hinn',
  meta: [
    { name: 'description', content: 'Professional, pay-by-month websites with stunning design, secure hosting, and ongoing updates included.' }
  ]
})

const showAllFeatures = ref(false)

const keyBenefits = [
  'No Hefty Upfront Cost',
  'Managed Hosting & SSL',
  'Always Up-to-date',
  'All-in-one Monthly Plan'
]

const allFeatures = [
  { title: 'AI-Powered Strategy', desc: 'We use AI to analyze your competitors and market to inform a data-driven site structure and content strategy that attracts your ideal customers.', icon: 'M12 6v6l4 2' },
  { title: '100% Custom Design', desc: 'Your brand is unique. Your website should be too. No cookie-cutter templates. Just stunning, original design that makes you stand out.', icon: 'M4 6h16v12H4z' },
  { title: 'Expert Copywriting', desc: 'Compelling, SEO-friendly content that tells your story and persuades visitors to act, crafted by our team (with an AI assist for efficiency).', icon: 'M5 12h14M5 16h10M5 8h10' },
  { title: 'Mobile-First Development', desc: 'A flawless experience on every device—phone, tablet, and desktop. It\'s not an extra; it\'s our standard.', icon: 'M7 4h10M5 8h14M4 12h16M6 16h12' },
  { title: 'Blazing-Fast Hosting', desc: 'Your site lives on our secure, high-speed hosting platform. No slow loading times, no downtime worries.', icon: 'M3 7h18M5 11h14M7 15h10M9 19h6' },
  { title: 'Ongoing Maintenance', desc: 'We handle all technical updates, security patches, and backups so your site is always safe and running smoothly.', icon: 'M12 8v8M8 12h8' },
  { title: 'Basic SEO Setup', desc: 'We optimize your site to rank higher on Google from day one, including on-page elements and technical SEO.', icon: 'M3 12h18M12 3v18' },
  { title: 'Monthly Updates', desc: 'Need to change text, add a blog post, or update a photo? We include a set number of changes every month.', icon: 'M12 6v6l4 2' },
  { title: 'Dedicated Support', desc: 'Have a question? Get help from a real person who knows your site inside and out.', icon: 'M4 6h16v12H4z' }
]

const displayedFeatures = computed(() => {
  return showAllFeatures.value ? allFeatures : allFeatures.slice(0, 3)
})

const aiFeatures = [
  { title: 'Content Intelligence', desc: 'AI helps us craft headlines and page copy that are proven to convert.', icon: 'M5 13l4 4L19 7' },
  { title: 'Competitor Analysis', desc: 'We use AI to scan your industry and identify opportunities to outperform your competition.', icon: 'M12 6v6l4 2' },
  { title: 'SEO Insight Generation', desc: 'Get data-driven keyword and topic suggestions to attract more organic traffic.', icon: 'M3 12h18M12 3v18' },
  { title: 'User Behavior Prediction', desc: 'Our designs are informed by AI-driven UX principles for maximum engagement.', icon: 'M12 8v8M8 12h8' }
]

const pricingTiers = [
  { 
    name: 'Small Businesses', 
    price: '$59/mo', 
    features: ['4 pages', 'Managed hosting & SSL', 'Monthly updates'] 
  },
  { 
    name: 'Ecommerce / Large Businesses', 
    price: '$99/mo', 
    features: ['Up to 10 pages', 'Priority updates', 'On-page SEO'] 
  },
  { 
    name: 'Large Businesses/Startups', 
    price: '$169/mo', 
    features: ['Unlimited pages', 'Custom components', 'Priority support'] 
  }
]

const faqs = [
  {
    q: "How quickly can you launch my website?",
    a: "Most small business sites launch in 2–4 weeks depending on scope and assets. We'll align on a timeline at kickoff."
  },
  {
    q: "What's included in monthly updates?",
    a: "Content edits, image swaps, adding new sections/pages within plan limits, and iterative improvements to design and UX."
  },
  {
    q: "Can I use my existing domain and email?",
    a: "Yes. We connect and manage your DNS and SSL. Your email stays where it is; we'll help make sure it keeps working."
  },
  {
    q: "Do you migrate content from my old site?",
    a: "We can migrate key pages and assets as part of setup. Larger migrations can be scoped as an add‑on."
  },
  {
    q: "Who owns the content and domain?",
    a: "You do. Your brand assets, copy, media, and domain remain yours. We manage hosting and updates for you."
  },
  {
    q: "Do you support ecommerce?",
    a: "Yes. Our Ecommerce / Large Businesses plan is designed for stores and growing operations. We'll recommend the right stack."
  }
]
</script>
