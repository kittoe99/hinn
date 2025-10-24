<template>
  <div class="pb-16 md:pb-24">
    <!-- Hero Section -->
    <section class="pt-16 md:pt-24 pb-12 border-b border-neutral-200">
      <div class="max-w-4xl mx-auto px-4 lg:px-6">
        <div class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-neutral-900"></span>
          Website Development
        </div>
        <h1 class="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 max-w-3xl">
          Professional websites built for growth
        </h1>
        <p class="mt-6 text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl">
          Modern, high-performing websites designed to convert visitors into customers. We handle everything from design to deployment.
        </p>
      </div>
    </section>

    <!-- What's Included -->
    <section class="pt-16 md:pt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900">What's included</h2>
          <p class="mt-4 text-lg text-neutral-600">
            Everything you need for a professional web presence.
          </p>
        </div>

        <div class="mt-12 grid md:grid-cols-2 gap-6">
          <div v-for="item in included" :key="item.title" class="group rounded-lg border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900">
                <span class="h-2 w-2 rounded-full bg-white"></span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-neutral-900">{{ item.title }}</h3>
                <p class="mt-2 text-base text-neutral-600 leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="pt-16 md:pt-20 bg-neutral-50">
      <div class="max-w-6xl mx-auto px-4 lg:px-6 py-16">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900">Everything you need</h2>
          <p class="mt-4 text-lg text-neutral-600">
            Powerful features to help your business grow online.
          </p>
        </div>
        
        <div class="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="feature in features" :key="feature.title" class="rounded-lg border border-neutral-200 bg-white p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div class="flex items-start gap-3">
              <span class="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-neutral-900 flex-shrink-0"></span>
              <div>
                <h3 class="text-base font-semibold text-neutral-900">{{ feature.title }}</h3>
                <p class="mt-1 text-sm text-neutral-600">{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Showcase -->
    <section class="pt-16 md:pt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900">Recent work</h2>
          <p class="mt-4 text-lg text-neutral-600">
            Examples of websites we've built for our clients.
          </p>
        </div>

        <div class="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="project in showcase" :key="project.title" class="group rounded-lg border border-neutral-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="aspect-[16/10] bg-neutral-100 overflow-hidden">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="p-5">
              <h3 class="text-lg font-semibold text-neutral-900">{{ project.title }}</h3>
              <p class="mt-2 text-sm text-neutral-600">{{ project.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="pt-16 md:pt-20">
      <div class="max-w-4xl mx-auto px-4 lg:px-6">
        <div class="max-w-2xl">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900">How it works</h2>
          <p class="mt-4 text-lg text-neutral-600">
            Simple, straightforward process from start to finish.
          </p>
        </div>

        <div class="mt-12 grid md:grid-cols-2 gap-6">
          <div v-for="(step, index) in process" :key="step.title" class="rounded-lg border border-neutral-200 bg-white p-6">
            <div class="flex items-start gap-4">
              <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-neutral-900 bg-white text-sm font-bold text-neutral-900">
                {{ index + 1 }}
              </span>
              <div>
                <h3 class="text-lg font-semibold text-neutral-900">{{ step.title }}</h3>
                <p class="mt-2 text-base text-neutral-600 leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="pt-16 md:pt-20">
      <div class="max-w-4xl mx-auto px-4 lg:px-6">
        <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-8 md:p-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900">Ready to get started?</h2>
          <p class="mt-4 text-lg text-neutral-600 max-w-2xl">
            Let's build something great together.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink 
              to="/get-started"
              class="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3 text-base font-semibold text-white transition hover:bg-neutral-800"
            >
              Get Started
            </NuxtLink>
            <NuxtLink 
              to="/contact"
              class="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-8 py-3 text-base font-semibold text-neutral-900 transition hover:bg-neutral-50"
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
  title: 'Website Development Services | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Professional website development services. Modern, fast, and built to convert.'
    }
  ]
})

const included = [
  {
    title: 'Custom Design',
    desc: 'Unique designs tailored to your brand and business goals. Mobile-first approach ensures your site looks great on all devices.'
  },
  {
    title: 'Modern Development',
    desc: 'Built with the latest technologies for speed and performance. Clean, maintainable code that scales with your business.'
  },
  {
    title: 'SEO Optimization',
    desc: 'Technical SEO best practices built in from day one. Get found by your customers on search engines.'
  },
  {
    title: 'Ongoing Support',
    desc: 'Managed hosting, security updates, and technical support included. We keep your site running smoothly.'
  }
]

const showcase = [
  {
    title: 'E-commerce Store',
    desc: 'Modern online store with seamless checkout',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop'
  },
  {
    title: 'Restaurant Website',
    desc: 'Beautiful menu showcase and online ordering',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop'
  },
  {
    title: 'Portfolio Site',
    desc: 'Clean design highlighting creative work',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop'
  },
  {
    title: 'Business Landing',
    desc: 'High-converting landing page for services',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop'
  },
  {
    title: 'SaaS Platform',
    desc: 'Feature-rich product showcase',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop'
  },
  {
    title: 'Agency Website',
    desc: 'Professional services presentation',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop'
  }
]

const features = [
  {
    title: 'Responsive Design',
    desc: 'Works perfectly on all devices and screen sizes'
  },
  {
    title: 'Fast Performance',
    desc: 'Optimized for speed and user experience'
  },
  {
    title: 'Content Management',
    desc: 'Easy-to-use CMS for quick updates'
  },
  {
    title: 'Lead Capture',
    desc: 'Contact forms and conversion tools'
  },
  {
    title: 'Analytics',
    desc: 'Track visitors and measure success'
  },
  {
    title: 'Security',
    desc: 'SSL certificates and regular updates'
  },
  {
    title: 'Backups',
    desc: 'Automatic daily backups included'
  },
  {
    title: 'Support',
    desc: '24/7 technical support and maintenance'
  },
  {
    title: 'SEO Ready',
    desc: 'Optimized for search engines'
  }
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
