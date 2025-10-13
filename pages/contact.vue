<template>
  <div class="pb-8 md:pb-12">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-accent-subtle via-white to-white pt-4 md:pt-6">
      <div class="max-w-5xl mx-auto px-4 lg:px-6 py-16 md:py-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-primary">
            Let's Build Something Great Together
          </h1>
          <p class="mt-5 mx-auto max-w-2xl text-base md:text-lg text-secondary">
            Ready to launch your website, deploy AI agents, or scale your marketing? Get in touch and we'll respond within 24 hours.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <!-- Contact Info -->
          <div>
            <h2 class="text-2xl font-semibold tracking-tight text-primary">Get in Touch</h2>
            <p class="mt-3 text-sm md:text-base text-secondary">
              Whether you're ready to start a project or just want to learn more about our services, we're here to help.
            </p>

            <div class="mt-8 space-y-6">
              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold text-primary">Email</h3>
                  <a href="mailto:hello@hinn.studio" class="mt-1 text-sm text-secondary hover:text-accent-primary transition-colors">
                    hello@hinn.studio
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold text-primary">Schedule a Call</h3>
                  <p class="mt-1 text-sm text-secondary">
                    Book a 30-minute discovery call to discuss your project
                  </p>
                  <a href="#" class="mt-2 inline-flex items-center text-sm font-medium text-accent-primary hover:underline">
                    View availability →
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold text-primary">Location</h3>
                  <p class="mt-1 text-sm text-secondary">
                    Remote-first team<br />
                    Serving clients worldwide
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-10 rounded-3xl border border-dashed border-accent-subtle bg-accent-subtle/40 p-6">
              <h3 class="text-base font-semibold text-primary">Response Time</h3>
              <p class="mt-2 text-sm text-secondary leading-relaxed">
                We typically respond to all inquiries within 24 hours during business days. For urgent matters, please mention it in your message.
              </p>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="rounded-3xl border border-soft bg-white p-6 md:p-8 shadow-sm">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-primary mb-2">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-primary placeholder-neutral-400 transition-colors focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-primary mb-2">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-primary placeholder-neutral-400 transition-colors focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-primary mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-primary placeholder-neutral-400 transition-colors focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label for="company" class="block text-sm font-medium text-primary mb-2">
                  Company
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-primary placeholder-neutral-400 transition-colors focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label for="service" class="block text-sm font-medium text-primary mb-2">
                  Service Interest *
                </label>
                <select
                  id="service"
                  v-model="form.service"
                  required
                  class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-primary transition-colors focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                >
                  <option value="">Select a service</option>
                  <option value="website">Website Development</option>
                  <option value="agents">AI Agents</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-primary mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-primary placeholder-neutral-400 transition-colors focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full rounded-full bg-black px-6 py-3.5 text-sm md:text-base font-semibold text-white transition-colors hover:bg-neutral-900"
              >
                Send Message
              </button>

              <p class="text-xs text-center text-tertiary">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mt-16 md:mt-24 pb-16">
      <div class="max-w-5xl mx-auto px-4 lg:px-6">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-primary">Common Questions</h2>
          <p class="mt-3 text-base text-secondary">
            Quick answers to questions you might have before reaching out
          </p>
        </div>
        <div class="mt-10 space-y-4">
          <details
            v-for="faq in faqs"
            :key="faq.question"
            class="group rounded-3xl border border-soft bg-white p-5 transition-colors open:border-accent-subtle open:bg-accent-subtle/20"
          >
            <summary class="flex cursor-pointer items-center justify-between text-left text-base font-semibold text-primary marker:hidden">
              <span>{{ faq.question }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4 text-neutral-500 transition-transform group-open:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-3 text-sm text-secondary">{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us | Get Started with Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Contact Hinn for custom website development, AI agent deployment, or digital marketing services. Get a response within 24 hours.'
    }
  ]
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  service: '',
  message: ''
})

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
  // Add your form submission logic here
}

const faqs = [
  {
    question: 'How quickly can we get started?',
    answer: 'After our initial discovery call, we can typically begin work within 3-5 business days. For website projects, we aim to launch within 21 days. AI agents and marketing campaigns have similar timelines depending on scope.'
  },
  {
    question: 'What information do you need to provide a quote?',
    answer: 'We need to understand your goals, target audience, current challenges, and desired outcomes. For websites, knowing your content needs and integrations helps. For AI agents, understanding your workflows and data sources is key.'
  },
  {
    question: 'Do you work with startups or only established businesses?',
    answer: 'We work with both! We have flexible plans for early-stage startups as well as comprehensive solutions for established businesses. Our subscription model makes professional services accessible at any stage.'
  },
  {
    question: 'Can we schedule a demo before committing?',
    answer: 'Absolutely! We offer free 30-minute discovery calls where we can show you relevant examples, discuss your needs, and outline a potential approach. No commitment required.'
  }
]
</script>
