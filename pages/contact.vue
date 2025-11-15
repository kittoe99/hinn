<template>
  <div class="min-h-screen bg-[#f9f8f6]">
    <!-- Hero -->
    <section class="pt-20 pb-12 md:pt-28 md:pb-16">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
          Tell us what you want to build.
        </h1>
        <p class="mt-5 text-lg text-neutral-600 leading-relaxed">
          Share a bit about your website or canvas printing needs and we’ll reply within one business day.
        </p>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="pb-20 md:pb-28">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <!-- Contact Form -->
          <div class="bg-[#f0ebe3] rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
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
                  <option value="">Select a topic...</option>
                  <option value="website">AI Website Builder</option>
                  <option value="canvas">Canvas Printing</option>
                  <option value="both">Website + Canvas</option>
                  <option value="other">Other / Not sure yet</option>
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
          <!-- Contact Info -->
          <div class="space-y-6">
            <div class="rounded-2xl bg-white border border-neutral-200 p-6">
              <h2 class="text-base font-semibold text-neutral-900 mb-4">Contact details</h2>
              <div class="space-y-4 text-sm text-neutral-700">
                <div class="flex items-start gap-3">
                  <div class="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#d97759]/10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-[#d97759]">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-neutral-900">Email</p>
                    <p class="mt-1">
                      <span class="font-medium">Sales & projects:</span>
                      <a href="mailto:hello@wpscanvas.com" class="text-neutral-700 hover:text-neutral-900 underline-offset-2 hover:underline"> hello@wpscanvas.com</a>
                    </p>
                    <p class="mt-1">
                      <span class="font-medium">Support:</span>
                      <a href="mailto:support@wpscanvas.com" class="text-neutral-700 hover:text-neutral-900 underline-offset-2 hover:underline"> support@wpscanvas.com</a>
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#d97759]/10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-[#d97759]">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-neutral-900">Availability</p>
                    <p class="mt-1 text-neutral-700">Mon–Fri, 9am–7pm (Pacific)</p>
                    <p class="mt-1 text-neutral-700">Remote-first team serving clients worldwide.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-2xl bg-white border border-neutral-200 p-6 text-xs text-neutral-500">
              We typically respond within one business day. For faster replies, include any timelines, links to existing sites, or examples you like.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us | WPS Canvas',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with WPS Canvas to discuss AI-built websites, canvas printing, or both. Share a brief and we will get back to you within one business day.'
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

