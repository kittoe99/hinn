<template>
  <div class="min-h-screen bg-page">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div class="flex h-16 items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <NuxtLink to="/dashboard" class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Dashboard
          </NuxtLink>
        </div>
        <div class="flex items-center gap-3">
          <button class="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-primary hover:bg-neutral-50 transition-colors">
            Edit
          </button>
          <button class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
            Deploy
          </button>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-24">
      <div class="text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent-primary border-r-transparent"></div>
        <p class="mt-4 text-sm text-secondary">Loading website details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="mx-auto max-w-4xl px-6 py-16">
      <div class="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <svg class="h-8 w-8 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 class="text-sm font-semibold text-red-900 mb-1">Failed to load website</h3>
        <p class="text-xs text-red-700 mb-4">{{ error }}</p>
        <NuxtLink to="/dashboard" class="inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
          Back to Dashboard
        </NuxtLink>
      </div>
    </div>

    <!-- Main Content -->
    <main v-else-if="website" class="mx-auto max-w-6xl px-6 py-8">
      <!-- Website Header -->
      <div class="mb-8">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-3xl font-bold text-primary">{{ website.name }}</h1>
            <div class="mt-2 flex items-center gap-3">
              <a v-if="website.custom_domain || website.domain" :href="`https://${website.custom_domain || website.domain}`" target="_blank" class="text-sm text-accent-primary hover:underline">
                {{ website.custom_domain || website.domain }}
              </a>
              <span :class="[
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                website.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-700'
              ]">
                <span :class="[
                  'h-1.5 w-1.5 rounded-full',
                  website.status === 'active' ? 'bg-emerald-500' : 'bg-neutral-500'
                ]"></span>
                {{ website.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Onboarding Data Sections -->
      <div v-if="onboarding" class="space-y-6">
        <!-- Business Information -->
        <section class="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 class="text-lg font-semibold text-primary mb-4">Business Information</h2>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Business Name</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.business_name || '—' }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Business Type</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.business_type || '—' }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Category</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.category || '—' }}</dd>
            </div>
            <div class="md:col-span-2">
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Description</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.description || '—' }}</dd>
            </div>
          </dl>
        </section>

        <!-- Contact Information -->
        <section class="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 class="text-lg font-semibold text-primary mb-4">Contact Information</h2>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Email</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.contact_info.email || '—' }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Phone</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.contact_info.phone || '—' }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Preferred Contact Method</dt>
              <dd class="mt-1 text-sm text-primary capitalize">{{ onboarding.contact_info.preferred_contact_method || '—' }}</dd>
            </div>
          </dl>
        </section>

        <!-- Services -->
        <section class="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 class="text-lg font-semibold text-primary mb-4">Services</h2>
          <div v-if="onboarding.services && onboarding.services.length > 0" class="flex flex-wrap gap-2">
            <span v-for="service in onboarding.services" :key="service" class="inline-flex items-center rounded-full bg-accent-subtle px-3 py-1 text-sm font-medium text-accent-primary">
              {{ service }}
            </span>
          </div>
          <p v-else class="text-sm text-secondary">No services specified</p>
        </section>

        <!-- Service Area -->
        <section class="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 class="text-lg font-semibold text-primary mb-4">Service Area</h2>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Primary Location</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.service_area.primary_location || '—' }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Coverage Type</dt>
              <dd class="mt-1 text-sm text-primary capitalize">{{ onboarding.service_area.coverage_type || '—' }}</dd>
            </div>
          </dl>
        </section>

        <!-- Operation Details -->
        <section class="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 class="text-lg font-semibold text-primary mb-4">Operation Details</h2>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">On-Site Mode</dt>
              <dd class="mt-1 text-sm text-primary capitalize">{{ onboarding.operation_details.on_site_mode || '—' }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Business Hours</dt>
              <dd class="mt-1 text-sm text-primary capitalize">{{ onboarding.operation_details.business_hours || '—' }}</dd>
            </div>
          </dl>
        </section>

        <!-- Website Info -->
        <section class="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 class="text-lg font-semibold text-primary mb-4">Website Information</h2>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Has Current Website</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.website_info.has_current_website ? 'Yes' : 'No' }}</dd>
            </div>
            <div v-if="onboarding.website_info.current_website_url">
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Current Website URL</dt>
              <dd class="mt-1 text-sm text-primary">
                <a :href="onboarding.website_info.current_website_url" target="_blank" class="text-accent-primary hover:underline">
                  {{ onboarding.website_info.current_website_url }}
                </a>
              </dd>
            </div>
            <div class="md:col-span-2">
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Primary Goal</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.website_info.primary_goal || '—' }}</dd>
            </div>
          </dl>
        </section>

        <!-- Design Preferences -->
        <section class="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 class="text-lg font-semibold text-primary mb-4">Design Preferences</h2>
          <div class="space-y-4">
            <div v-if="onboarding.design_preferences.styles && onboarding.design_preferences.styles.length > 0">
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide mb-2">Styles</dt>
              <div class="flex flex-wrap gap-2">
                <span v-for="style in onboarding.design_preferences.styles" :key="style" class="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                  {{ style }}
                </span>
              </div>
            </div>
            <div v-if="onboarding.design_preferences.emotional_impact && onboarding.design_preferences.emotional_impact.length > 0">
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide mb-2">Emotional Impact</dt>
              <div class="flex flex-wrap gap-2">
                <span v-for="emotion in onboarding.design_preferences.emotional_impact" :key="emotion" class="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                  {{ emotion }}
                </span>
              </div>
            </div>
            <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Color Theme</dt>
                <dd class="mt-1 text-sm text-primary capitalize">{{ onboarding.design_preferences.color_theme || '—' }}</dd>
              </div>
              <div v-if="onboarding.design_preferences.brand_colors">
                <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Brand Colors</dt>
                <dd class="mt-1 text-sm text-primary">{{ onboarding.design_preferences.brand_colors }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-secondary uppercase tracking-wide">High Contrast</dt>
                <dd class="mt-1 text-sm text-primary">{{ onboarding.design_preferences.high_contrast ? 'Yes' : 'No' }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Has Logo</dt>
                <dd class="mt-1 text-sm text-primary">{{ onboarding.design_preferences.has_logo ? 'Yes' : 'No' }}</dd>
              </div>
            </dl>
            <div v-if="onboarding.design_preferences.inspiration_sites">
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Inspiration Sites</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.design_preferences.inspiration_sites }}</dd>
            </div>
          </div>
        </section>

        <!-- Language & Additional Info -->
        <section class="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 class="text-lg font-semibold text-primary mb-4">Language & Additional Information</h2>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Primary Language</dt>
              <dd class="mt-1 text-sm text-primary capitalize">{{ onboarding.language || '—' }}</dd>
            </div>
            <div v-if="onboarding.languages && onboarding.languages.length > 0">
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">All Languages</dt>
              <dd class="mt-1 text-sm text-primary">{{ onboarding.languages.join(', ') }}</dd>
            </div>
            <div v-if="onboarding.envisioned_pages && onboarding.envisioned_pages.length > 0" class="md:col-span-2">
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide mb-2">Envisioned Pages</dt>
              <div class="flex flex-wrap gap-2">
                <span v-for="page in onboarding.envisioned_pages" :key="page" class="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                  {{ page }}
                </span>
              </div>
            </div>
            <div v-if="onboarding.additional_notes" class="md:col-span-2">
              <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Additional Notes</dt>
              <dd class="mt-1 text-sm text-primary whitespace-pre-wrap">{{ onboarding.additional_notes }}</dd>
            </div>
          </dl>
        </section>
      </div>

      <!-- No Onboarding Data -->
      <div v-else class="rounded-lg border border-neutral-200 bg-white p-8 text-center">
        <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3 class="text-base font-semibold text-primary mb-2">No onboarding data available</h3>
        <p class="text-sm text-secondary">This website was not created through the onboarding process.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSupabaseClient } from '~/lib/supabaseClient'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const websiteId = route.params.id

const website = ref(null)
const onboarding = ref(null)
const loading = ref(true)
const error = ref(null)

useHead(() => ({
  title: website.value ? `${website.value.name} - Hinn` : 'Website Details - Hinn',
  meta: [
    { name: 'description', content: 'View website details and onboarding information' }
  ]
}))

const fetchWebsite = async () => {
  try {
    loading.value = true
    error.value = null
    
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      error.value = 'Not authenticated'
      return
    }

    const response = await $fetch(`/api/websites/${websiteId}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })
    
    console.log('API Response:', response)
    console.log('Website data:', response.website)
    console.log('Onboarding data:', response.website?.onboarding_data)
    
    website.value = response.website
    onboarding.value = response.website.onboarding_data
    
    console.log('Onboarding ref value:', onboarding.value)
  } catch (err) {
    console.error('Failed to fetch website:', err)
    error.value = err.message || 'Failed to load website'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWebsite()
})
</script>
