<template>
  <div>
    <!-- Hero -->
    <section class="pt-20 pb-24 md:pt-32 md:pb-40">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="max-w-4xl">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
            Highly intelligent,<br />
            autonomous AI agents
          </h1>
          <p class="mt-8 text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed">
            Configure and launch AI agents in minutes. From phone agents to hiring assistants—ready to work 24/7. No coding required.
          </p>
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <NuxtLink
              to="/dashboard"
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              Launch an Agent
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <a
              href="#agents"
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              Browse agents
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Agent Catalog -->
    <section id="agents" class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Ready-to-launch agents</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Configure and deploy specialized AI agents for any task. Each agent is pre-trained and ready to work.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(agent, index) in agentCatalog" :key="agent.title" :ref="el => { if (el) agentRefs[index] = el }" class="group border border-neutral-200 bg-white p-8">
            <div class="mb-4">
              <svg v-if="index === 0" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': agentInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <svg v-else-if="index === 1" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': agentInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              <svg v-else-if="index === 2" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': agentInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              <svg v-else-if="index === 3" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': agentInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
              <svg v-else-if="index === 4" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': agentInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <svg v-else :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': agentInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-medium text-neutral-900">{{ agent.title }}</h3>
              <span class="text-sm font-medium text-neutral-500">{{ agent.category }}</span>
            </div>
            <p class="text-base text-neutral-600 leading-relaxed mb-6">{{ agent.desc }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="capability in agent.capabilities" :key="capability" class="text-xs font-medium text-neutral-600 px-2 py-1 border border-neutral-200">
                {{ capability }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">How it works</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Launch your AI agent in three simple steps.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(step, index) in launchSteps" :key="step.title" class="border-l-2 border-neutral-200 pl-6">
            <div class="text-sm font-medium text-neutral-500 mb-2">Step {{ index + 1 }}</div>
            <h3 class="text-xl font-medium text-neutral-900 mb-2">{{ step.title }}</h3>
            <p class="text-base text-neutral-600">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Built for autonomy</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Every agent is designed to work independently with minimal oversight.
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="(feature, index) in autonomyFeatures" :key="feature.title" :ref="el => { if (el) autonomyRefs[index] = el }" class="group border border-neutral-200 bg-white p-8">
            <div class="mb-3">
              <svg v-if="index === 0" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autonomyInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
              <svg v-else-if="index === 1" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autonomyInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              <svg v-else-if="index === 2" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autonomyInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <svg v-else-if="index === 3" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autonomyInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <svg v-else-if="index === 4" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autonomyInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <svg v-else :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': autonomyInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-neutral-900 mb-2">{{ feature.title }}</h3>
            <p class="text-base text-neutral-600 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6">Ready to launch your agent?</h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-10">
          Configure and deploy in minutes. Start automating today.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink 
            to="/dashboard"
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
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
  title: 'AI Agents | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Launch intelligent, autonomous AI agents in minutes.'
    }
  ]
})

// Scroll-based icon animation for mobile
const agentRefs = ref([])
const agentInView = ref([false, false, false, false, false, false])
const autonomyRefs = ref([])
const autonomyInView = ref([false, false, false, false, false, false])
let agentObserver = null
let autonomyObserver = null

const agentCatalog = [
  {
    title: 'Phone Agent',
    category: 'Voice',
    desc: 'Handles inbound and outbound calls. Books appointments, answers questions, and qualifies leads over the phone with natural conversation.',
    capabilities: ['Voice calls', 'Appointment booking', 'Lead qualification', 'CRM integration']
  },
  {
    title: 'Sales Agent',
    category: 'Sales',
    desc: 'Engages website visitors, qualifies leads, handles objections, and closes deals. Works across chat, email, and phone.',
    capabilities: ['Lead scoring', 'Objection handling', 'Deal closing', 'Follow-up automation']
  },
  {
    title: 'Support Agent',
    category: 'Support',
    desc: 'Provides instant customer support 24/7. Resolves common issues, escalates complex cases, and learns from every interaction.',
    capabilities: ['Ticket management', 'Knowledge base', 'Escalation routing', 'Multi-language']
  },
  {
    title: 'Hiring Agent',
    category: 'HR',
    desc: 'Screens candidates, schedules interviews, and manages the hiring pipeline. Reduces time-to-hire by 70%.',
    capabilities: ['Resume screening', 'Interview scheduling', 'Candidate communication', 'ATS integration']
  },
  {
    title: 'Booking Agent',
    category: 'Operations',
    desc: 'Manages appointments, handles cancellations, and optimizes your calendar. Integrates with all major scheduling tools.',
    capabilities: ['Calendar sync', 'Automated reminders', 'Rescheduling', 'Payment collection']
  },
  {
    title: 'Research Agent',
    category: 'Intelligence',
    desc: 'Gathers market intelligence, monitors competitors, and delivers insights. Runs continuously in the background.',
    capabilities: ['Web scraping', 'Data analysis', 'Report generation', 'Trend detection']
  }
]

const launchSteps = [
  {
    title: 'Choose your agent',
    desc: 'Select from our catalog of pre-trained agents or describe what you need.'
  },
  {
    title: 'Configure settings',
    desc: 'Set your agent\'s personality, rules, and integrations. Takes 5 minutes.'
  },
  {
    title: 'Deploy and monitor',
    desc: 'Launch your agent and watch it work. Adjust behavior anytime from your dashboard.'
  }
]

const autonomyFeatures = [
  {
    title: 'Self-learning',
    desc: 'Agents improve automatically from every interaction. No manual training required—they get smarter over time.'
  },
  {
    title: 'Multi-channel',
    desc: 'Work across phone, chat, email, and SMS. One agent, every channel, consistent experience.'
  },
  {
    title: 'Tool integration',
    desc: 'Connect to your CRM, calendar, payment processor, and any API. Agents access the tools they need automatically.'
  },
  {
    title: 'Human handoff',
    desc: 'Agents know when to escalate. Seamless handoff to your team with full context and conversation history.'
  },
  {
    title: 'Real-time analytics',
    desc: 'Track performance, conversion rates, and customer satisfaction. See exactly what your agents are doing.'
  },
  {
    title: 'Compliance built-in',
    desc: 'GDPR, CCPA, and industry-specific compliance handled automatically. Audit logs for every interaction.'
  }
]

onMounted(() => {
  // Set up Intersection Observer for agent catalog
  agentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target
        const index = agentRefs.value.findIndex(ref => {
          if (ref && ref.$el) return ref.$el === element
          return ref === element
        })
        
        if (index !== -1) {
          agentInView.value[index] = entry.isIntersecting
        }
      })
    },
    {
      threshold: 0.5,
      rootMargin: '-50px'
    }
  )

  // Set up Intersection Observer for autonomy features
  autonomyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target
        const index = autonomyRefs.value.findIndex(ref => {
          if (ref && ref.$el) return ref.$el === element
          return ref === element
        })
        
        if (index !== -1) {
          autonomyInView.value[index] = entry.isIntersecting
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
    agentRefs.value.forEach((ref) => {
      const element = ref && ref.$el ? ref.$el : ref
      if (element && element instanceof Element) {
        agentObserver.observe(element)
      }
    })

    autonomyRefs.value.forEach((ref) => {
      const element = ref && ref.$el ? ref.$el : ref
      if (element && element instanceof Element) {
        autonomyObserver.observe(element)
      }
    })
  }, 200)
})

onUnmounted(() => {
  if (agentObserver) {
    agentObserver.disconnect()
  }
  if (autonomyObserver) {
    autonomyObserver.disconnect()
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
