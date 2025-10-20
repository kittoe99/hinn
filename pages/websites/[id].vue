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
    <main v-else-if="website" class="mx-auto max-w-7xl px-6 py-8">
      <!-- Website Header -->
      <div class="mb-8 rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-8 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="h-14 w-14 rounded-xl bg-gradient-to-br from-accent-primary to-accent-focus flex items-center justify-center shadow-lg">
                <span class="text-xl font-bold text-white">{{ website.name.charAt(0) }}</span>
              </div>
              <div>
                <h1 class="text-3xl font-bold text-primary">{{ website.name }}</h1>
                <p v-if="onboarding?.category" class="text-sm text-secondary mt-0.5">{{ onboarding.category }}</p>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-3 mt-4">
              <a v-if="website.custom_domain || website.domain" :href="`https://${website.custom_domain || website.domain}`" target="_blank" class="inline-flex items-center gap-1.5 text-sm text-accent-primary hover:text-accent-focus transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                {{ website.custom_domain || website.domain }}
              </a>
              <span :class="[
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm',
                website.status === 'active' ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/20' : 'bg-neutral-100 text-neutral-700 ring-1 ring-neutral-600/20'
              ]">
                <span :class="[
                  'h-2 w-2 rounded-full',
                  website.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-500'
                ]"></span>
                {{ website.status === 'active' ? 'Active' : website.status }}
              </span>
              <span v-if="website.slug" class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-neutral-100 text-neutral-600">
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
                {{ website.slug }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Onboarding Data Sections -->
      <div v-if="onboarding" class="space-y-6">
        <!-- Business Information -->
        <section class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <button @click="toggleSection('business')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-primary">Business Information</h2>
              <span v-if="!expandedSections.business && onboarding?.business_name" class="text-sm text-secondary ml-2">
                {{ onboarding.business_name }}
              </span>
            </div>
            <svg :class="['h-5 w-5 text-neutral-400 transition-transform', expandedSections.business ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="expandedSections.business" class="px-6 pb-6">
            <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="rounded-lg bg-neutral-50 p-4">
              <dt class="text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">Business Name</dt>
              <dd class="text-base font-medium text-primary">{{ onboarding.business_name || '—' }}</dd>
            </div>
            <div class="rounded-lg bg-neutral-50 p-4">
              <dt class="text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">Business Type</dt>
              <dd class="text-base font-medium text-primary">{{ onboarding.business_type || '—' }}</dd>
            </div>
            <div class="rounded-lg bg-neutral-50 p-4">
              <dt class="text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">Category</dt>
              <dd class="text-base font-medium text-primary">{{ onboarding.category || '—' }}</dd>
            </div>
            <div class="md:col-span-2 rounded-lg bg-neutral-50 p-4">
              <dt class="text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">Description</dt>
              <dd class="text-sm leading-relaxed text-primary">{{ onboarding.description || '—' }}</dd>
            </div>
            </dl>
          </div>
        </section>

        <!-- Contact Information -->
        <section class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <button @click="toggleSection('contact')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-primary">Contact Information</h2>
              <span v-if="!expandedSections.contact && onboarding?.contact_info?.email" class="text-sm text-secondary ml-2 truncate max-w-xs">
                {{ onboarding.contact_info.email }}
              </span>
            </div>
            <svg :class="['h-5 w-5 text-neutral-400 transition-transform', expandedSections.contact ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="expandedSections.contact" class="px-6 pb-6">
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
          </div>
        </section>

        <!-- Services -->
        <section class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <button @click="toggleSection('services')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-primary">Services</h2>
              <span v-if="!expandedSections.services && onboarding?.services?.length" class="text-sm text-secondary ml-2">
                {{ onboarding.services.length }} service{{ onboarding.services.length !== 1 ? 's' : '' }}
              </span>
            </div>
            <svg :class="['h-5 w-5 text-neutral-400 transition-transform', expandedSections.services ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="expandedSections.services" class="px-6 pb-6">
            <div v-if="onboarding.services && onboarding.services.length > 0" class="flex flex-wrap gap-2.5">
              <span v-for="service in onboarding.services" :key="service" class="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-accent-subtle to-accent-subtle/50 px-4 py-2 text-sm font-semibold text-accent-primary ring-1 ring-accent-primary/10 hover:ring-accent-primary/30 transition-all">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                {{ service }}
              </span>
            </div>
            <div v-else class="rounded-lg bg-neutral-50 p-4 text-center">
              <p class="text-sm text-secondary">No services specified</p>
            </div>
          </div>
        </section>

        <!-- Service Area -->
        <section class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <button @click="toggleSection('serviceArea')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-primary">Service Area</h2>
              <span v-if="!expandedSections.serviceArea && onboarding?.service_area?.primary_location" class="text-sm text-secondary ml-2 truncate max-w-xs">
                {{ onboarding.service_area.primary_location }}
              </span>
            </div>
            <svg :class="['h-5 w-5 text-neutral-400 transition-transform', expandedSections.serviceArea ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="expandedSections.serviceArea" class="px-6 pb-6">
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
          </div>
        </section>

        <!-- Operation Details -->
        <section class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <button @click="toggleSection('operations')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-primary">Operation Details</h2>
              <span v-if="!expandedSections.operations && onboarding?.operation_details?.on_site_mode" class="text-sm text-secondary ml-2 capitalize">
                {{ onboarding.operation_details.on_site_mode }}
              </span>
            </div>
            <svg :class="['h-5 w-5 text-neutral-400 transition-transform', expandedSections.operations ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="expandedSections.operations" class="px-6 pb-6">
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
          </div>
        </section>

        <!-- Website Info -->
        <section class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <button @click="toggleSection('websiteInfo')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-primary">Website Information</h2>
              <span v-if="!expandedSections.websiteInfo && onboarding?.website_info?.primary_goal" class="text-sm text-secondary ml-2 truncate max-w-xs">
                {{ onboarding.website_info.primary_goal }}
              </span>
            </div>
            <svg :class="['h-5 w-5 text-neutral-400 transition-transform', expandedSections.websiteInfo ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="expandedSections.websiteInfo" class="px-6 pb-6">
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
          </div>
        </section>

        <!-- Design Preferences -->
        <section class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <button @click="toggleSection('design')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-primary">Design Preferences</h2>
              <span v-if="!expandedSections.design && onboarding?.design_preferences?.color_theme" class="text-sm text-secondary ml-2 capitalize">
                {{ onboarding.design_preferences.color_theme }}
              </span>
            </div>
            <svg :class="['h-5 w-5 text-neutral-400 transition-transform', expandedSections.design ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="expandedSections.design" class="px-6 pb-6">
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
          </div>
        </section>

        <!-- Language & Additional Info -->
        <section class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <button @click="toggleSection('language')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-primary">Language & Additional Information</h2>
              <span v-if="!expandedSections.language && onboarding?.language" class="text-sm text-secondary ml-2 capitalize">
                {{ onboarding.language }}
              </span>
            </div>
            <svg :class="['h-5 w-5 text-neutral-400 transition-transform', expandedSections.language ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="expandedSections.language" class="px-6 pb-6">
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
          </div>
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

// Expandable sections state
const expandedSections = ref({
  business: true, // Start with business info expanded
  contact: false,
  services: false,
  serviceArea: false,
  operations: false,
  websiteInfo: false,
  design: false,
  language: false
})

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

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
