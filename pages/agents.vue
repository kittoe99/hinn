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
          <div v-for="agent in agentCatalog" :key="agent.title" class="border border-neutral-200 bg-white p-8">
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
          <div v-for="feature in autonomyFeatures" :key="feature.title" class="border border-neutral-200 bg-white p-8">
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
useHead({
  title: 'AI Agents | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Launch intelligent, autonomous AI agents in minutes.'
    }
  ]
})

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
</script>
