<template>
  <div class="py-12 md:py-16">
    <!-- Hero Section -->
    <section>
      <div class="max-w-5xl mx-auto px-3 sm:px-4 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div class="text-center md:text-left">
          <h1 class="mt-1 text-3xl md:text-4xl font-semibold tracking-tight text-primary">
            AI Agents That Get The Work Done!
          </h1>
          <p class="mt-3 text-sm md:text-base text-secondary">
            Always-on AI Agents for support, sales, and operations—trained exclusively on your business. Automate conversations and capture every opportunity, day or night.
          </p>
          <p class="mt-2 text-sm md:text-base text-secondary">
            Deploy a team of specialized AI Agents that work tirelessly across your business. They are not generic chatbots; they are trained experts on your content, policies, and workflows.
          </p>
          <div class="mt-5 flex items-center gap-3 justify-center md:justify-start">
            <button class="px-5 py-3 rounded-full bg-accent-primary text-white border border-accent-primary text-sm md:text-base transition-colors hover:bg-accent-focus">
              Get started
            </button>
            <a href="#agents" class="px-5 py-3 rounded-full border border-neutral-300 bg-white text-sm text-neutral-800 hover:bg-neutral-50">
              See agents
            </a>
          </div>
        </div>
        <div class="relative h-48 md:h-64 rounded-3xl border border-soft overflow-hidden bg-gradient-to-br from-accent-subtle to-white flex items-center justify-center">
          <div class="text-6xl text-accent-primary/20">🤖</div>
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

    <!-- Agents List -->
    <section id="agents" class="mt-10 md:mt-14">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <header class="mb-6 text-center">
          <h2 class="text-base font-semibold tracking-tight text-primary">
            Specialized Agents for Every Business Function
          </h2>
        </header>
        <div class="grid md:grid-cols-2 gap-5 md:gap-6">
          <div 
            v-for="agent in agents" 
            :key="agent.title"
            class="flex items-start gap-3 rounded-2xl border border-soft bg-white p-4"
          >
            <div class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-subtle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6 text-accent-primary">
                <path stroke-linecap="round" stroke-linejoin="round" :d="agent.icon" />
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-sm font-semibold tracking-tight text-primary">{{ agent.title }}</h3>
              <p class="mt-1 text-sm text-secondary">{{ agent.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Deep Understanding Section -->
    <section class="mt-12 md:mt-16 bg-neutral-50 py-8 md:py-10">
      <div class="max-w-5xl mx-auto px-3 md:px-4">
        <header class="mb-6 md:mb-8 text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">
            Powered by Deep Understanding, Not Just Simple Scripts
          </h2>
        </header>
        <div class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="feature in deepFeatures" 
            :key="feature.title"
            class="flex items-start gap-3"
          >
            <div class="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white ring-1 ring-neutral-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-accent-primary">
                <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-medium text-primary">{{ feature.title }}</div>
              <p class="mt-1 text-sm text-secondary">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases Timeline -->
    <section class="mt-10 md:mt-14">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <header class="mb-4 text-center">
          <h2 class="text-base font-semibold tracking-tight text-primary">
            Transforming Industries, One Conversation at a Time
          </h2>
        </header>
        <div class="max-w-3xl mx-auto relative pl-6 before:content-[''] before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-neutral-200">
          <div 
            v-for="useCase in useCases" 
            :key="useCase.title"
            class="relative mb-6 last:mb-0"
          >
            <span class="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-accent-primary ring-2 ring-white" />
            <div class="rounded-2xl border border-soft bg-white p-4">
              <div class="text-sm font-semibold text-primary">{{ useCase.title }}</div>
              <dl class="mt-2 space-y-1 text-sm text-secondary">
                <div><span class="font-medium text-primary">Challenge:</span> {{ useCase.challenge }}</div>
                <div><span class="font-medium text-primary">Solution:</span> {{ useCase.solution }}</div>
                <div><span class="font-medium text-primary">Result:</span> {{ useCase.result }}</div>
              </dl>
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
            Frequently Asked Questions
          </h2>
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
          Stop Automating Tasks. Start Automating Expertise.
        </h2>
        <p class="mt-2 text-sm md:text-base text-secondary">
          Deploy a team that works while you sleep. Capture more leads, deliver better support, and streamline your operations.
        </p>
        <div class="mt-4 flex items-center justify-center gap-3">
          <button class="px-5 py-3 rounded-full bg-accent-primary text-white border border-accent-primary text-sm md:text-base transition-colors hover:bg-accent-focus">
            Get started
          </button>
          <button class="px-5 py-3 rounded-full border border-neutral-300 bg-white text-sm text-neutral-800 hover:bg-neutral-50">
            Talk to us
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'AI Agents - Hinn',
  meta: [
    { name: 'description', content: 'Always-on AI Agents for support, sales, and operations—trained exclusively on your business.' }
  ]
})

const keyBenefits = [
  'Trained on Your Business',
  'Always Available',
  'Seamless Handoff',
  'Actionable Insights'
]

const agents = [
  { 
    title: 'Customer Support Agent', 
    desc: 'Your 24/7 support hero. Instantly resolves common queries, processes returns, books appointments, and frees your team to handle complex cases.', 
    icon: 'M7 8h10M7 12h7M5 20l2.5-2H19a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14z' 
  },
  { 
    title: 'Phone Call Agent', 
    desc: 'An AI that actually answers the phone. Handles inbound calls for bookings, FAQs, and lead qualification using a natural, human-like voice.', 
    icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.09 4.1 2 2 0 014.11 2h3a2 2 0 012 1.72' 
  },
  { 
    title: 'Sales Development Agent', 
    desc: 'Your ultimate lead capture machine. Engages website visitors, qualifies their interest, books demos directly into your calendar.', 
    icon: 'M12 19l9-7-9-7-9 7 9 7zm0 0v-7' 
  },
  { 
    title: 'Business Operations Agent', 
    desc: 'Your internal efficiency expert. Helps onboard new employees by answering HR questions, manages internal IT support tickets.', 
    icon: 'M4 7h6v6H4V7zm0 10h6v-2H4v2zm10 0h6v-6h-6v6zm0-10h6V5h-6v2z' 
  },
  { 
    title: 'Custom Role Agent', 
    desc: 'Need something specific? We\'ll build a bespoke AI Agent tailored for a unique workflow in your legal, healthcare, or manufacturing business.', 
    icon: 'M12 8v8m-4-4h8' 
  }
]

const deepFeatures = [
  { 
    title: 'Trained on Your Content', 
    desc: 'Unlike generic chatbots, our agents deeply understand your specific business from the knowledge you provide.', 
    icon: 'M12 6v6l4 2M5 12a7 7 0 1114 0 7 7 0 01-14 0z' 
  },
  { 
    title: 'Multi-Platform Deployment', 
    desc: 'Meet your customers where they are: on your Website, Facebook Messenger, WhatsApp, SMS, or even as a Voice Agent.', 
    icon: 'M3 12h18M12 3v18' 
  },
  { 
    title: 'Smart Human Handoff', 
    desc: 'The agent intelligently recognizes when a conversation requires a human touch and seamlessly transfers the chat/call.', 
    icon: 'M12 8v8m-4-4h8' 
  },
  { 
    title: 'Real-Time Analytics Dashboard', 
    desc: 'Gain insights into customer intent, common questions, lead quality, and agent performance.', 
    icon: 'M4 19h16M4 15h10M4 11h7M4 7h13' 
  },
  { 
    title: 'Data Security & Privacy', 
    desc: 'Your data is yours. We employ enterprise-grade security and do not train our core models on your confidential information.', 
    icon: 'M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z' 
  }
]

const useCases = [
  {
    title: 'E‑commerce Store',
    challenge: 'High volume of "Where\'s my order?" questions drowning support team.',
    solution: 'Deployed a Customer Support Agent.',
    result: '40% reduction in support tickets; team focuses on retention.'
  },
  {
    title: 'Local Service Business',
    challenge: 'Missing potential clients who call after business hours.',
    solution: 'Deployed a Phone Call Agent.',
    result: '15 new jobs/month booked after hours with full details.'
  },
  {
    title: 'B2B SaaS Company',
    challenge: 'Visitors leaving without signing up for a demo.',
    solution: 'Deployed a Sales Development Agent.',
    result: '3x more qualified demos and 20% shorter sales cycle.'
  }
]

const faqs = [
  {
    q: 'How is this different from a standard website chatbot?',
    a: 'Standard chatbots are rule-based and can only answer questions they are explicitly programmed for. Our AI Agents understand intent and context, drawing from a deep knowledge base of your content to provide accurate, conversational answers.'
  },
  {
    q: "What if the AI doesn't know the answer to a question?",
    a: "It's trained to gracefully admit when it's unsure and can immediately escalate the conversation to a human team member. It also learns from these interactions, and you can easily add the new information to its knowledge base."
  },
  {
    q: 'Can I connect the AI Agent to my other tools (e.g., Calendar, CRM)?',
    a: 'Absolutely. Our Growth and Enterprise plans include integrations with popular tools like Google Calendar, Salesforce, Slack, and Zapier, allowing your AI Agent to book meetings, create CRM entries, and more.'
  },
  {
    q: 'How long does it take to train and deploy an agent?',
    a: 'For most businesses, you can have a fully functional AI Agent trained and live on your website within a few days. The initial setup and training are incredibly fast.'
  }
]
</script>
