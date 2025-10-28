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
              to="/dashboard"
              class="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm hover:shadow"
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
          <div v-for="(item, index) in aiFeatures" :key="item.title" :ref="el => { if (el) aiFeatureRefs[index] = el }" class="group relative overflow-hidden border border-neutral-200 bg-white rounded-xl p-8 hover:border-neutral-300 hover:shadow-lg transition-all shadow-sm">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d97759] to-[#d97759]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <div class="mb-4">
              <svg v-if="index === 0" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': aiFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 2.25c-2.998 0-5.74 1.1-7.843 2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <svg v-else-if="index === 1" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': aiFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              <svg v-else-if="index === 2" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': aiFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              <svg v-else :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': aiFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
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

        <div class="space-y-4">
          <div v-for="(feature, index) in automationFeatures" :key="feature.title" :ref="el => { if (el) autoFeatureRefs[index] = el }" class="group relative overflow-hidden border border-neutral-200 bg-white rounded-xl p-8 hover:border-neutral-300 hover:shadow-lg transition-all shadow-sm">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d97759] to-[#d97759]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="mb-3">
                  <svg v-if="index === 0" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autoFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  <svg v-else-if="index === 1" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autoFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>
                  <svg v-else-if="index === 2" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autoFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <svg v-else-if="index === 3" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autoFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                  <svg v-else-if="index === 4" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autoFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                  <svg v-else :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autoFeatureInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
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

        <div class="grid md:grid-cols-4 gap-6">
          <div v-for="(stage, index) in operatingStages" :key="stage.title" class="relative overflow-hidden border border-neutral-200 bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d97759] to-[#d97759]/60"></div>
            <div class="text-sm font-medium text-[#d97759] mb-2">{{ stage.label }}</div>
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
            to="/dashboard"
            class="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm hover:shadow"
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
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
  title: 'Website Development Services | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Professional website development services. Modern, fast, and built to convert.'
    }
  ]
})

// Scroll-based icon animation for mobile
const aiFeatureRefs = ref([])
const aiFeatureInView = ref([false, false, false, false])
const autoFeatureRefs = ref([])
const autoFeatureInView = ref([false, false, false, false, false, false])
let aiObserver = null
let autoObserver = null

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

onMounted(() => {
  // Set up Intersection Observer for AI features
  aiObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target
        const index = aiFeatureRefs.value.findIndex(ref => {
          if (ref && ref.$el) return ref.$el === element
          return ref === element
        })
        
        if (index !== -1) {
          aiFeatureInView.value[index] = entry.isIntersecting
        }
      })
    },
    {
      threshold: 0.5,
      rootMargin: '-50px'
    }
  )

  // Set up Intersection Observer for automation features
  autoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target
        const index = autoFeatureRefs.value.findIndex(ref => {
          if (ref && ref.$el) return ref.$el === element
          return ref === element
        })
        
        if (index !== -1) {
          autoFeatureInView.value[index] = entry.isIntersecting
        }
      })
    },
    {
      threshold: 0.5,
      rootMargin: '-50px'
    }
  )

  // Observe all feature cards after a slight delay
  setTimeout(() => {
    aiFeatureRefs.value.forEach((ref) => {
      const element = ref && ref.$el ? ref.$el : ref
      if (element && element instanceof Element) {
        aiObserver.observe(element)
      }
    })

    autoFeatureRefs.value.forEach((ref) => {
      const element = ref && ref.$el ? ref.$el : ref
      if (element && element instanceof Element) {
        autoObserver.observe(element)
      }
    })
  }, 200)
})

onUnmounted(() => {
  if (aiObserver) {
    aiObserver.disconnect()
  }
  if (autoObserver) {
    autoObserver.disconnect()
  }
})
</script>

<style scoped>
.feature-icon {
  stroke: #a3a3a3;
  fill: none;
  transition: fill 500ms ease, stroke 500ms ease;
}

/* Desktop: hover effect */
@media (min-width: 768px) {
  .group:hover .feature-icon {
    fill: #d97759;
    stroke: #d97759;
  }
}

/* Mobile: scroll-based fill */
@media (max-width: 767px) {
  .feature-icon.icon-active {
    fill: #d97759;
    stroke: #d97759;
  }
}
</style>
