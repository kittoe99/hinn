<template>
  <div>
    <!-- Hero -->
    <section class="pt-20 pb-24 md:pt-32 md:pb-40">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 class="text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
          Get in touch
        </h1>
        <p class="mt-8 text-lg md:text-xl text-neutral-600 leading-relaxed">
          Have questions? Want to discuss a project? Send us a message and we'll respond within 24 hours.
        </p>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="pb-20 md:pb-32 bg-neutral-50">
      <div class="max-w-2xl mx-auto px-6 lg:px-8 py-20">
        <!-- Success Message -->
        <div v-if="submitted" class="border border-neutral-200 bg-white p-8 text-center">
          <h3 class="text-2xl font-medium text-neutral-900">Message sent</h3>
          <p class="mt-4 text-base text-neutral-600">We'll get back to you within 24 hours.</p>
          <button
            @click="submitted = false"
            class="mt-6 inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
          >
            Send another message
          </button>
        </div>

        <!-- Error Message -->
        <div v-else-if="submitError" class="border border-red-200 bg-red-50 p-6 mb-6">
          <p class="text-sm font-medium text-red-900">{{ submitError }}</p>
          <button
            @click="submitError = null"
            class="mt-2 text-sm font-medium text-red-600 hover:text-red-700 underline"
          >
            Dismiss
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" v-if="!submitted" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Name</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-900 mb-2">Company</label>
            <input
              v-model="form.company"
              type="text"
              class="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              placeholder="Your company"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-900 mb-2">Message</label>
            <textarea
              v-model="form.message"
              rows="6"
              required
              class="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Sending...' : 'Send message' }}
          </button>

          <p class="text-sm text-center text-neutral-600">
            Or email us directly at <a href="mailto:hello@hinn.studio" class="underline hover:text-neutral-900">hello@hinn.studio</a>
          </p>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'Contact | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with Hinn. We respond within 24 hours.'
    }
  ]
})

const form = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const submitting = ref(false)
const submitted = ref(false)
const submitError = ref(null)

const handleSubmit = async () => {
  submitting.value = true
  submitError.value = null

  try {
    const response = await fetch('/api/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.statusMessage || 'Failed to submit form')
    }

    submitted.value = true
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      company: '',
      message: ''
    }
  } catch (error) {
    console.error('[contact] Submission error:', error)
    submitError.value = error.message
  } finally {
    submitting.value = false
  }
}
</script>
