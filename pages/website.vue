<template>
  <div>
    <!-- Hero Section -->
    <section class="pt-20 pb-24 md:pt-32 md:pb-40">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="max-w-4xl">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
            AI-powered websites that<br />
            sell and book on autopilot
          </h1>
          <p class="mt-8 text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed">
            Built by AI. Managed monthly. Your website handles sales conversations, qualifies leads, and books appointments automatically—24/7.
          </p>
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <NuxtLink
              to="/get-started"
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              Build with AI
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/showcase"
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              See examples
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Features -->
    <section class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Built by AI, powered by automation</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Every website comes with intelligent automation that works while you sleep.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(item, index) in aiFeatures" :key="item.title" class="border border-neutral-200 bg-white p-8">
            <h3 class="text-xl font-medium text-neutral-900 mb-3">{{ item.title }}</h3>
            <p class="text-base text-neutral-600 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Automation Features -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Sales automation that converts</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Your website doesn't just look good—it actively sells for you.
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="(feature, index) in automationFeatures" :key="feature.title" class="border border-neutral-200 bg-white p-8">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-xl font-medium text-neutral-900 mb-2">{{ feature.title }}</h3>
                <p class="text-base text-neutral-600 leading-relaxed">{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">How it works</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Simple process from start to launch.
          </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div v-for="(stage, index) in operatingStages" :key="stage.title" class="border-l-2 border-neutral-200 pl-6">
            <div class="text-sm font-medium text-neutral-500 mb-2">{{ stage.label }}</div>
            <h3 class="text-xl font-medium text-neutral-900 mb-2">{{ stage.title }}</h3>
            <p class="text-base text-neutral-600">{{ stage.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6">Ready to get started?</h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-10">
          Subscribe today and we'll start building this week.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
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
            to="/contact"
            class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
          >
            Contact us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Website Development Services | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Professional website development services. Modern, fast, and built to convert.'
    }
  ]
})

const aiFeatures = [
  {
    title: 'AI Site Builder',
    desc: 'Describe your business and our AI generates a complete, conversion-optimized website in minutes. No coding, no design skills needed.'
  },
  {
    title: 'Smart Content Generation',
    desc: 'AI writes compelling copy, product descriptions, and blog posts that match your brand voice and convert visitors into customers.'
  },
  {
    title: 'Intelligent Chat Agent',
    desc: 'Built-in AI chatbot answers questions, qualifies leads, and guides visitors through your sales funnel 24/7.'
  },
  {
    title: 'Automated SEO',
    desc: 'AI optimizes your content for search engines automatically. Meta tags, keywords, and structure handled for you.'
  }
]

const automationFeatures = [
  {
    title: 'Lead Qualification on Autopilot',
    desc: 'AI agent engages every visitor, asks qualifying questions, and routes hot leads directly to your calendar or CRM. No forms, no friction—just conversations that convert.'
  },
  {
    title: 'Automatic Appointment Booking',
    desc: 'Visitors book appointments instantly through AI-powered chat. Syncs with your calendar, sends confirmations, and handles rescheduling automatically.'
  },
  {
    title: 'Sales Follow-up Automation',
    desc: 'AI sends personalized follow-ups to leads who didn\'t book. Nurtures prospects with relevant content until they\'re ready to buy.'
  },
  {
    title: 'Smart Product Recommendations',
    desc: 'AI analyzes visitor behavior and recommends the right products or services. Increases average order value and conversion rates.'
  },
  {
    title: 'Automated Customer Support',
    desc: 'Handle common questions instantly with AI. Escalates complex issues to your team with full context and conversation history.'
  },
  {
    title: 'Real-time Analytics & Insights',
    desc: 'AI tracks visitor behavior, identifies conversion bottlenecks, and suggests improvements. Get actionable insights without digging through data.'
  }
]

 

const features = [
  {
    title: 'Responsive Design',
    desc: 'Works perfectly on all devices and screen sizes',
    icon: 'M4 7h16M4 12h12M4 17h8'
  },
  {
    title: 'Fast Performance',
    desc: 'Optimized for speed and user experience',
    icon: 'M12 6v12m6-6H6'
  },
  {
    title: 'Content Management',
    desc: 'Easy-to-use CMS for quick updates',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343'
  },
  {
    title: 'Lead Capture',
    desc: 'Contact forms and conversion tools',
    icon: 'M5 13l4 4L19 7'
  },
  {
    title: 'Analytics',
    desc: 'Track visitors and measure success',
    icon: 'M4 7v6a5 5 0 005 5h7m4-4V8a5 5 0 00-5-5H8'
  },
  {
    title: 'Security',
    desc: 'SSL certificates and regular updates',
    icon: 'M9 5v2a2 2 0 002 2h2a2 2 0 002-2V5m-2 6v7m-6-7v7'
  },
  {
    title: 'Backups',
    desc: 'Automatic daily backups included',
    icon: 'M12 6v12m6-6H6'
  },
  {
    title: 'Support',
    desc: '24/7 technical support and maintenance',
    icon: 'M9 12l2 2 4-4'
  },
  {
    title: 'SEO Ready',
    desc: 'Optimized for search engines',
    icon: 'M5 12h14M12 5l7 7-7 7'
  }
]

const operatingStages = [
  { phase: '01', label: 'Describe', title: 'Tell AI about your business', detail: 'Answer a few questions about your business, goals, and target customers.' },
  { phase: '02', label: 'Generate', title: 'AI builds your site', detail: 'Our AI creates your complete website with copy, design, and automation in minutes.' },
  { phase: '03', label: 'Customize', title: 'Review and refine', detail: 'Make any changes you want. AI adapts instantly to your feedback.' },
  { phase: '04', label: 'Launch', title: 'Go live with automation', detail: 'Your site launches with AI agents ready to qualify leads and book appointments.' }
]

// Add-ons cards
const addons = [
  { title: 'AI Agents', desc: 'Autonomous agents for customer support, lead qualification, and sales automation.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'Marketing', desc: 'Email campaigns, social media management, and content strategy.', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
  { title: 'Branding', desc: 'Logo design, brand guidelines, and complete visual identity system.', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' }
]

const process = [
  {
    title: 'Discovery',
    desc: 'We learn about your business, goals, and target audience to create the perfect strategy.'
  },
  {
    title: 'Design',
    desc: 'Create beautiful mockups and get your approval before we start building.'
  },
  {
    title: 'Development',
    desc: 'Build your website with modern technology, optimized for speed and conversions.'
  },
  {
    title: 'Launch',
    desc: 'Deploy your site and provide training on how to manage your content.'
  }
]
</script>
