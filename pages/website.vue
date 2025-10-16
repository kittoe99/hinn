<template>
  <div class="pb-12 md:pb-16">
    <section class="pt-12 md:pt-16">
      <div class="max-w-5xl mx-auto px-4 lg:px-6">
        <div class="grid gap-8 md:grid-cols-2 md:items-center">
          <header class="max-w-3xl">
            <p class="text-xs font-semibold uppercase tracking-wider text-accent-primary">Website design & development</p>
            <h1 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-primary">
              Custom website design that aligns your brand, content, and growth goals
            </h1>
            <p class="mt-4 text-base md:text-lg text-secondary leading-relaxed">
              A focused service for teams who need a polished marketing website or product site—without the overhead of hiring and managing multiple freelancers. We handle UX, development, launch, and ongoing support in one streamlined engagement.
            </p>
          </header>
          <div class="flex justify-center md:justify-end">
            <img src="/website-hero.svg" alt="Website Design Illustration" class="w-full max-w-md" />
          </div>
        </div>
        <div class="relative mt-10 grid gap-6 rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-lg shadow-accent-subtle/20 backdrop-blur md:grid-cols-[0.95fr_1fr] md:p-8">
          <div class="absolute inset-0 pointer-events-none rounded-3xl bg-white" aria-hidden="true" />
          <dl class="relative grid gap-4 text-sm text-neutral-700 md:grid-cols-2">
            <div>
              <dt class="text-xs uppercase tracking-wide text-neutral-500">Project fit</dt>
              <dd class="mt-1 text-base font-semibold text-primary">Marketing sites, product sites, startup launches</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wide text-neutral-500">Typical scope</dt>
              <dd class="mt-1 text-base font-semibold text-primary">5–12 page builds, CMS setup, analytics & SEO</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wide text-neutral-500">Engagement length</dt>
              <dd class="mt-1 text-base font-semibold text-primary">3–5 weeks from kickoff to launch</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wide text-neutral-500">Availability</dt>
              <dd class="mt-1 text-base font-semibold text-primary">Next kickoff opening: October 28</dd>
            </div>
          </dl>
          <div class="relative rounded-2xl border border-neutral-200 bg-neutral-50/90 p-6 shadow-inner shadow-white/60">
            <div class="absolute inset-x-6 -top-4 flex justify-center">
              <span class="inline-flex items-center rounded-full bg-accent-primary/10 px-3 py-1 text-xs font-semibold text-accent-primary">
                Guided collaboration
              </span>
            </div>
            <h2 class="text-base font-semibold text-primary">What you can expect</h2>
            <ul class="mt-5 space-y-4 text-sm text-neutral-700">
              <li class="flex items-start gap-2">
                <span class="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-subtle text-xs font-semibold text-accent-primary">1</span>
                <span>Weekly working sessions with design, development, and growth strategists.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-subtle text-xs font-semibold text-accent-primary">2</span>
                <span>Dedicated Slack channel, project tracker, and async updates.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-subtle text-xs font-semibold text-accent-primary">3</span>
                <span>Final delivery package with documentation, training, and 30 days of support.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-16 md:mt-20" id="deliverables">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div class="max-w-2xl">
            <p class="text-xs uppercase tracking-wider text-tertiary">Project deliverables</p>
            <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Everything needed for a high-converting website</h2>
            <p class="mt-3 text-base text-secondary">
              We combine strategy, design, development, and optimization workstreams into a single engagement. Each pillar expands with detailed feature checklists.
            </p>
          </div>
          <a href="#plans" class="inline-flex items-center text-sm font-semibold text-accent-primary hover:text-accent-focus">Skip to pricing →</a>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="pillar in outcomePillars"
            :key="pillar.title"
            class="group rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-sm shadow-neutral-200 transition-all hover:-translate-y-1.5 hover:border-accent-primary hover:shadow-2xl"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-subtle text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" :d="pillar.icon" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold text-primary">{{ pillar.title }}</h3>
            <p class="mt-2 text-sm text-secondary leading-relaxed">{{ pillar.desc }}</p>
            <ul v-if="pillar.features" class="mt-4 space-y-2">
              <li v-for="feature in pillar.features" :key="feature" class="flex items-start gap-2 text-sm text-neutral-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 mt-0.5 flex-shrink-0 text-accent-primary">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="mt-16 md:mt-20 bg-neutral-50 py-14 md:py-18">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="mb-12 max-w-3xl">
          <p class="text-xs uppercase tracking-wider text-tertiary">Technology</p>
          <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Modern stack and infrastructure baked in</h2>
          <p class="mt-3 text-base text-secondary">
            Our preferred technology stack keeps your team productive: component-based front ends, headless content, automated deployments, analytics, and compliance handled from day one.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="rounded-2xl border border-neutral-200 bg-white/90 p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-accent-primary hover:shadow-xl"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle/80 text-accent-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6 text-accent-primary">
                <path stroke-linecap="round" stroke-linejoin="round" :d="tech.icon" />
              </svg>
            </div>
            <h3 class="mt-4 text-sm font-semibold text-primary">{{ tech.name }}</h3>
            <p class="mt-1 text-xs text-secondary">{{ tech.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="mt-16 md:mt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="mb-12 max-w-3xl">
          <p class="text-xs uppercase tracking-wider text-tertiary">Experience enhancements</p>
          <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Built-in capabilities that improve conversion and retention</h2>
          <p class="mt-3 text-base text-secondary">
            From lead capture to live chat, every feature is configured to deliver measurable impact and easy maintenance for your team.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="feature in additionalFeatures"
            :key="feature.title"
            class="rounded-2xl border border-neutral-200 bg-white/95 p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-primary hover:shadow-xl"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-subtle/80 text-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-semibold text-primary">{{ feature.title }}</h3>
                <p class="mt-1 text-sm text-secondary">{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section class="mt-16 md:mt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="mb-12 max-w-3xl">
          <p class="text-xs uppercase tracking-wider text-tertiary">Process</p>
          <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Collaborative timeline with clear milestones</h2>
          <p class="mt-3 text-base text-secondary">
            We run the project in structured phases so you always know what we’re working on, what’s needed from your team, and when each deliverable goes live.
          </p>
        </div>
        <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div
            v-for="(phase, index) in launchTimeline"
            :key="phase.title"
            class="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:border-accent-primary hover:shadow-2xl"
          >
            <div class="flex items-center gap-4">
              <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-subtle/80 text-xl font-semibold text-accent-primary">
                {{ index + 1 }}
              </span>
              <div>
                <h3 class="text-lg font-semibold text-primary">{{ phase.title }}</h3>
                <p class="mt-1 text-sm text-secondary">{{ phase.detail }}</p>
              </div>
            </div>
            <div class="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-1.5 text-xs font-medium text-neutral-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ phase.duration }}
            </div>
          </div>
        </div>
      </div>
    </section>


    <section id="plans" class="mt-16 md:mt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="max-w-2xl">
            <p class="text-xs uppercase tracking-wider text-tertiary">Pricing</p>
            <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Engagement options based on team stage</h2>
            <p class="mt-3 text-base text-secondary">
              Pick the plan that matches where you are today. Each package can expand with add-on deliverables, content retainers, or product integrations.
            </p>
          </div>
          <button class="self-start rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-accent-primary hover:text-accent-primary">
            Compare scope details
          </button>
        </div>
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="tier in pricingTiers"
            :key="tier.name"
            class="flex flex-col rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:border-accent-primary hover:shadow-2xl"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-widest text-accent-primary">{{ tier.segment }}</span>
              <span class="text-2xl font-bold text-primary">{{ tier.price }}</span>
            </div>
            <h3 class="mt-4 text-xl font-semibold text-primary">{{ tier.name }}</h3>
            <p class="mt-2 text-sm text-secondary">{{ tier.desc }}</p>
            <ul class="mt-6 flex-1 space-y-3 text-sm text-neutral-700">
              <li
                v-for="benefit in tier.features"
                :key="benefit"
                class="flex items-start gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 flex-shrink-0 text-accent-primary">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ benefit }}</span>
              </li>
            </ul>
            <button class="mt-8 w-full rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-focus">
              Start with {{ tier.name.toLowerCase() }}
            </button>
          </div>
        </div>
      </div>
    </section>


    <!-- CTA -->
    <section class="mt-16 md:mt-20 bg-neutral-900 py-16 text-white">
      <div class="max-w-5xl mx-auto px-4">
        <div class="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
              Next steps
            </span>
            <h2 class="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">Book a working session to scope your website project</h2>
            <p class="mt-3 text-sm md:text-base text-neutral-200">
              Share your goals, audience, and timelines—we’ll walk you through our approach, forecast timelines, and highlight quick wins for your launch.
            </p>
          </div>
          <div class="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
            <button class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100">
              Schedule a discovery call
            </button>
            <button class="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Download our implementation checklist
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Custom Website Development Services | Responsive Web Design | Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Professional web design and development with React/Vue.js, headless CMS, SEO optimization, and managed hosting. Launch your custom website in 21 days with ongoing support.'
    }
  ]
})

const outcomePillars = [
  {
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    title: 'Design & UX',
    desc: 'Beautiful, conversion-focused designs that work seamlessly across all devices.',
    features: ['Custom design system', 'Mobile-first approach', 'User experience optimization']
  },
  {
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    title: 'Development',
    desc: 'Fast, modern websites built with React, Vue.js, and optimized for performance.',
    features: ['Clean, maintainable code', 'Lightning-fast load times', 'Cross-browser compatible']
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'SEO & Analytics',
    desc: 'Technical SEO, keyword optimization, and analytics to drive organic traffic.',
    features: ['On-page SEO optimization', 'Google Analytics setup', 'Performance monitoring']
  },
  {
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    title: 'Hosting & Support',
    desc: 'Managed cloud hosting with 99.9% uptime, security, and ongoing support.',
    features: ['SSL certificates included', 'Daily backups', '24/7 technical support']
  },
  {
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    title: 'Content Management',
    desc: 'Easy-to-use CMS that lets you update content without touching code.',
    features: ['Intuitive admin panel', 'Media library', 'Content scheduling']
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Security & Compliance',
    desc: 'Enterprise-grade security to protect your website and customer data.',
    features: ['HTTPS encryption', 'Regular security updates', 'GDPR compliant']
  }
]

const techStack = [
  { name: 'React / Vue.js', desc: 'Modern JavaScript frameworks', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { name: 'Tailwind CSS', desc: 'Utility-first CSS framework', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
  { name: 'Headless CMS', desc: 'Flexible content management', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' },
  { name: 'Vercel / AWS', desc: 'Cloud hosting platforms', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' }
]

const additionalFeatures = [
  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Contact Forms', desc: 'Custom forms with spam protection and email notifications.' },
  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Blog Integration', desc: 'Built-in blog functionality for content marketing and SEO.' },
  { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title: 'E-commerce Ready', desc: 'Integrate payment gateways and start selling online.' },
  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', title: 'Video Integration', desc: 'Embed videos from YouTube, Vimeo, or custom hosting.' },
  { icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', title: 'Live Chat', desc: 'Real-time customer support with chat widget integration.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Performance Optimization', desc: 'Lightning-fast load times with image optimization and caching.' }
]

const launchTimeline = [
  { title: 'Discovery', detail: 'We learn about your business, goals, and target audience.', duration: '2-3 days' },
  { title: 'Design', detail: 'Create beautiful mockups and get your approval before development.', duration: '3-5 days' },
  { title: 'Development', detail: 'Build your website with modern tech, optimized for speed and SEO.', duration: '5-7 days' },
  { title: 'Launch', detail: 'Deploy your site and provide training on managing your content.', duration: '1-2 days' }
]

const pricingTiers = [
  {
    segment: 'Starter',
    name: 'Basic',
    price: '$995',
    desc: 'Perfect for small businesses and startups.',
    features: ['Up to 5 pages', 'Mobile responsive', 'Basic SEO setup', 'Contact form', '30 days support']
  },
  {
    segment: 'Most Popular',
    name: 'Professional',
    price: '$1,995',
    desc: 'Best for growing businesses that need more features.',
    features: ['Up to 10 pages', 'CMS integration', 'Advanced SEO', 'Analytics setup', 'Blog functionality', '90 days support']
  },
  {
    segment: 'Enterprise',
    name: 'Custom',
    price: 'Custom',
    desc: 'For complex projects with custom requirements.',
    features: ['Unlimited pages', 'Custom features', 'E-commerce ready', 'API integrations', 'Priority support', 'Ongoing maintenance']
  }
]
</script>
