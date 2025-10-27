<template>
  <div>
    <!-- Hero -->
    <section class="pt-20 pb-24 md:pt-32 md:pb-40">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="max-w-4xl">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
            Generate brand assets,<br />
            launch campaigns with a click
          </h1>
          <p class="mt-8 text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed">
            AI-powered marketing tools that generate custom brand assets, create campaign content, and improve your online presence—automatically.
          </p>
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <NuxtLink
              to="/get-started"
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              Start Creating
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <a
              href="#tools"
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              See tools
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Marketing Tools -->
    <section id="tools" class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">AI-powered marketing tools</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Everything you need to create, launch, and optimize your marketing—powered by AI.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="tool in marketingTools" :key="tool.title" class="border border-neutral-200 bg-white p-8">
            <h3 class="text-xl font-medium text-neutral-900 mb-3">{{ tool.title }}</h3>
            <p class="text-base text-neutral-600 leading-relaxed mb-6">{{ tool.desc }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="feature in tool.features" :key="feature" class="text-xs font-medium text-neutral-600 px-2 py-1 border border-neutral-200">
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Campaign Launch -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Launch campaigns with a click</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Pre-built campaign templates that deploy across all channels instantly.
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="campaign in campaignTypes" :key="campaign.title" class="border border-neutral-200 bg-white p-8">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-xl font-medium text-neutral-900 mb-2">{{ campaign.title }}</h3>
                <p class="text-base text-neutral-600 leading-relaxed">{{ campaign.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Online Presence -->
    <section class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Improve your online presence</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Automated tools that boost your visibility and engagement across all platforms.
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="feature in presenceFeatures" :key="feature.title" class="border border-neutral-200 bg-white p-8">
            <h3 class="text-xl font-medium text-neutral-900 mb-2">{{ feature.title }}</h3>
            <p class="text-base text-neutral-600 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6">Ready to transform your marketing?</h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-10">
          Start generating assets and launching campaigns today.
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
  title: 'Marketing & Branding | Hinn',
  meta: [
    {
      name: 'description',
      content: 'AI-powered marketing tools. Generate brand assets, launch campaigns, improve online presence.'
    }
  ]
})

const marketingTools = [
  {
    title: 'Brand Asset Generator',
    desc: 'AI creates logos, color palettes, typography, and complete brand guidelines in minutes. Export in all formats.',
    features: ['Logo variations', 'Color systems', 'Typography', 'Brand guidelines']
  },
  {
    title: 'Content Creation Suite',
    desc: 'Generate blog posts, social media content, email copy, and ad creative. AI matches your brand voice automatically.',
    features: ['Blog posts', 'Social content', 'Email campaigns', 'Ad copy']
  },
  {
    title: 'Social Media Manager',
    desc: 'Schedule posts, generate captions, create graphics, and respond to comments—all automated across platforms.',
    features: ['Auto-scheduling', 'Caption generation', 'Graphics creation', 'Comment replies']
  },
  {
    title: 'Email Campaign Builder',
    desc: 'Design emails, write copy, segment audiences, and optimize send times. A/B testing built-in.',
    features: ['Email design', 'List segmentation', 'A/B testing', 'Analytics']
  },
  {
    title: 'SEO Optimizer',
    desc: 'Keyword research, content optimization, and technical SEO handled automatically. Track rankings in real-time.',
    features: ['Keyword research', 'Content optimization', 'Technical SEO', 'Rank tracking']
  },
  {
    title: 'Ad Campaign Manager',
    desc: 'Create, launch, and optimize ads across Google, Facebook, and Instagram. AI adjusts bids and targeting automatically.',
    features: ['Multi-platform ads', 'Auto-bidding', 'Audience targeting', 'Performance optimization']
  }
]

const campaignTypes = [
  {
    title: 'Product Launch Campaign',
    desc: 'Complete campaign across email, social, ads, and PR. AI generates all assets, schedules posts, and tracks performance. Launch in one click.'
  },
  {
    title: 'Lead Generation Campaign',
    desc: 'Landing pages, lead magnets, email sequences, and retargeting ads. AI optimizes for conversions automatically.'
  },
  {
    title: 'Brand Awareness Campaign',
    desc: 'Multi-channel content strategy with blog posts, social media, and display ads. AI maintains consistent messaging across all channels.'
  },
  {
    title: 'Event Promotion Campaign',
    desc: 'Email invitations, social posts, reminder sequences, and post-event follow-ups. Fully automated from start to finish.'
  },
  {
    title: 'Seasonal Campaign',
    desc: 'Holiday and seasonal promotions with themed content, special offers, and time-limited messaging. Deploy instantly.'
  }
]

const presenceFeatures = [
  {
    title: 'Automated Content Distribution',
    desc: 'Publish once, distribute everywhere. AI adapts your content for each platform and schedules optimal posting times.'
  },
  {
    title: 'Review & Reputation Management',
    desc: 'Monitor reviews across all platforms. AI generates responses and alerts you to issues requiring attention.'
  },
  {
    title: 'Social Listening & Engagement',
    desc: 'Track brand mentions, respond to comments, and engage with your audience automatically. Never miss an opportunity.'
  },
  {
    title: 'Analytics & Insights',
    desc: 'Real-time dashboards showing what\'s working. AI identifies trends and suggests improvements automatically.'
  },
  {
    title: 'Competitor Monitoring',
    desc: 'Track competitor campaigns, content, and performance. AI highlights opportunities and threats in your market.'
  },
  {
    title: 'Brand Consistency Checker',
    desc: 'Ensures all content matches your brand guidelines. AI flags inconsistencies and suggests corrections.'
  }
]
</script>
