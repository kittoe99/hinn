<template>
  <div class="min-h-screen bg-white">
    <!-- Hero -->
    <section class="pt-20 pb-16 md:pt-32 md:pb-24">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
          Get in touch
        </h1>
        <p class="mt-6 text-lg text-neutral-600 leading-relaxed">
          Ready to start your project? Send us a message and we'll respond within 24 hours.
        </p>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="pb-20 md:pb-32">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div>
            <h2 class="text-2xl font-medium tracking-tight text-neutral-900 mb-6">Contact Info</h2>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-[#d97759]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-[#d97759]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-neutral-900">Email</h3>
                  <a href="mailto:hello@hinn.studio" class="mt-1 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                    hello@hinn.studio
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-[#d97759]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-[#d97759]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-neutral-900">Location</h3>
                  <p class="mt-1 text-sm text-neutral-600">
                    Remote-first team<br />
                    Serving clients worldwide
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-8 border border-neutral-200 bg-neutral-50 p-6 rounded-xl">
              <h3 class="text-sm font-semibold text-neutral-900">Response Time</h3>
              <p class="mt-2 text-sm text-neutral-600 leading-relaxed">
                We respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="border border-neutral-200 bg-white rounded-xl p-8">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-neutral-900 mb-2">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-neutral-900 mb-2">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-neutral-900 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label for="service" class="block text-sm font-medium text-neutral-900 mb-2">
                  Service Interest *
                </label>
                <select
                  id="service"
                  v-model="form.service"
                  required
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="website">Website Development</option>
                  <option value="agents">AI Agents</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-neutral-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="4"
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent resize-none transition-all"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full rounded-lg bg-neutral-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Send Message
              </button>

              <p class="text-xs text-center text-neutral-500">
                By submitting, you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with Hinn for website development, AI agents, or digital marketing.'
    }
  ]
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  service: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form.value)
  // Add your form submission logic here
}
</script>
