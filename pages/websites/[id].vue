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
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
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
    <main v-else-if="website" class="min-h-screen bg-white">
      <div class="mx-auto max-w-5xl px-6 py-6">
        <!-- Two Column Layout: Preview Left, Details Right -->
        <div class="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-8 mb-8">
          
          <!-- Left Column: Website Preview -->
          <div>
            <div class="rounded-xl border border-neutral-200 overflow-hidden bg-white shadow-lg">
              <div v-if="websiteUrl" class="relative bg-white">
                <!-- Browser Chrome -->
                <div class="bg-neutral-100 border-b border-neutral-200 px-4 py-3">
                  <div class="flex items-center gap-3">
                    <!-- Browser Dots -->
                    <div class="flex items-center gap-1.5">
                      <div class="w-3 h-3 rounded-full bg-red-400"></div>
                      <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div class="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    
                    <!-- Address Bar -->
                    <div class="flex-1 flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-neutral-200">
                      <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      <span class="text-sm text-neutral-600 truncate">{{ websiteUrl }}</span>
                    </div>
                    
                    <!-- Open in New Tab Button -->
                    <a 
                      :href="websiteUrl" 
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2 px-3 py-2 bg-[#d97759] text-white rounded-lg text-xs font-medium hover:bg-[#c86648] transition-colors"
                    >
                      <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Open
                    </a>
                  </div>
                </div>
                
                <!-- Live Website Preview in iframe -->
                <div class="aspect-video relative bg-white">
                  <iframe
                    :src="websiteUrl"
                    class="w-full h-full border-0"
                    title="Website Preview"
                    @load="handleIframeLoad"
                  ></iframe>
                  
                  <!-- Info Message (shows after load) -->
                  <div v-if="showIframeWarning" class="absolute top-4 left-4 right-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-xs shadow-md">
                    <p>Note: Some websites prevent themselves from being loaded in an iframe for security reasons. If the preview remains blank, this is likely why.</p>
                  </div>
                </div>
              </div>
              <div v-else class="aspect-video flex items-center justify-center p-8 bg-neutral-50">
                <div class="text-center">
                  <svg class="h-16 w-16 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <p class="text-sm text-neutral-500">No domain configured</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Website Details -->
          <div class="space-y-4">
            <!-- Title Section -->
            <div>
              <h1 class="text-2xl font-bold text-neutral-900 mb-1">{{ website.name }}</h1>
              <a 
                v-if="website.custom_domain || website.domain" 
                :href="`https://${website.custom_domain || website.domain || website.slug + '.vercel.app'}`"
                target="_blank"
                class="text-sm text-neutral-500 hover:text-neutral-700 inline-flex items-center gap-1 transition-colors"
              >
                {{ website.custom_domain || website.domain || website.slug + '.vercel.app' }}
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>

            <!-- Domains Section -->
            <div class="py-3 border-y border-neutral-200">
              <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Domains</h3>
              <a 
                v-if="website.custom_domain || website.domain" 
                :href="`https://${website.custom_domain || website.domain || website.slug + '.vercel.app'}`"
                target="_blank"
                class="text-sm text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-1 transition-colors"
              >
                {{ website.custom_domain || website.domain || website.slug + '.vercel.app' }}
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>

            <!-- Status & Created Grid -->
            <div class="grid grid-cols-2 gap-4 py-3 border-b border-neutral-200">
              <!-- Status -->
              <div>
                <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Status</h3>
                <div class="flex items-center gap-2">
                  <span :class="[
                    'h-2 w-2 rounded-full',
                    website.status === 'active' ? 'bg-emerald-500' : 'bg-neutral-400'
                  ]"></span>
                  <span class="text-sm font-medium text-neutral-900 capitalize">{{ website.status === 'active' ? 'Ready' : website.status }}</span>
                </div>
              </div>

              <!-- Created -->
              <div>
                <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Created</h3>
                <p class="text-sm font-medium text-neutral-900">{{ formatDate(website.created_at) }}</p>
              </div>
            </div>

            <!-- Source/Category Section -->
            <div v-if="onboarding?.category" class="py-3 border-b border-neutral-200">
              <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Category</h3>
              <p class="text-sm font-medium text-neutral-900">{{ onboarding.category }}</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-2 pt-1">
              <button class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
                Add Domain
              </button>
              <button @click="showChangeRequestForm = true" class="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Request Changes
              </button>
            </div>
          </div>
        </div>

      <!-- Onboarding Data Sections -->
      <div v-if="onboarding" class="space-y-4">
        <!-- Section 1: Business & Contact Details -->
        <section class="group rounded-2xl border border-neutral-200/60 bg-white shadow-sm hover:shadow-lg hover:border-accent-primary/30 transition-all overflow-hidden backdrop-blur-sm">
          <button @click="toggleSection('businessContact')" class="w-full flex items-center justify-between p-6 text-left hover:bg-gradient-to-r hover:from-accent-primary/5 hover:to-transparent transition-all">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-focus/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="h-5 w-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h2 class="text-base font-bold text-primary mb-0.5">Business & Contact Details</h2>
                <p v-if="!expandedSections.businessContact && onboarding?.business_name" class="hidden md:block text-sm text-secondary truncate">
                  {{ onboarding.business_name }} • {{ onboarding.contact_info?.email }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2 ml-4">
              <span v-if="expandedSections.businessContact" class="text-xs font-medium text-accent-primary px-2 py-1 rounded-md bg-accent-primary/10">
                Expanded
              </span>
              <svg :class="['h-5 w-5 text-neutral-400 transition-all', expandedSections.businessContact ? 'rotate-180 text-accent-primary' : 'group-hover:text-accent-primary']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>
          <div v-show="expandedSections.businessContact" class="px-6 pb-6 pt-2">
            <div class="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-6"></div>
            <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Business Name
                </dt>
                <dd class="text-base font-semibold text-primary">{{ onboarding.business_name || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Business Type
                </dt>
                <dd class="text-base font-semibold text-primary">{{ onboarding.business_type || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Category
                </dt>
                <dd class="text-base font-semibold text-primary">{{ onboarding.category || '—' }}</dd>
              </div>
              <div class="md:col-span-2 group rounded-xl bg-gradient-to-br from-accent-primary/5 to-white p-5 border border-accent-primary/10 hover:border-accent-primary/30 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  Description
                </dt>
                <dd class="text-sm leading-relaxed text-primary/90">{{ onboarding.description || '—' }}</dd>
              </div>
              
              <!-- Contact Information (merged into this section) -->
              <div class="md:col-span-2"><div class="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent my-4"></div></div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Email
                </dt>
                <dd class="text-base font-semibold text-primary">{{ onboarding.contact_info?.email || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Phone
                </dt>
                <dd class="text-base font-semibold text-primary">{{ onboarding.contact_info?.phone || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Preferred Contact
                </dt>
                <dd class="text-base font-semibold text-primary capitalize">{{ onboarding.contact_info?.preferred_contact_method || '—' }}</dd>
              </div>
            </dl>
          </div>
        </section>

        <!-- Section 2: Services & Operations -->
        <section class="group rounded-2xl border border-neutral-200/60 bg-white shadow-sm hover:shadow-lg hover:border-accent-primary/30 transition-all overflow-hidden backdrop-blur-sm">
          <button @click="toggleSection('servicesOperations')" class="w-full flex items-center justify-between p-6 text-left hover:bg-gradient-to-r hover:from-accent-primary/5 hover:to-transparent transition-all">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-focus/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="h-5 w-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h2 class="text-base font-bold text-primary mb-0.5">Services & Operations</h2>
                <p v-if="!expandedSections.servicesOperations && onboarding?.services?.length" class="hidden md:block text-sm text-secondary truncate">
                  {{ onboarding.services.length }} service{{ onboarding.services.length !== 1 ? 's' : '' }} • {{ onboarding.service_area?.primary_location }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2 ml-4">
              <span v-if="expandedSections.servicesOperations" class="text-xs font-medium text-accent-primary px-2 py-1 rounded-md bg-accent-primary/10">
                Expanded
              </span>
              <svg :class="['h-5 w-5 text-neutral-400 transition-all', expandedSections.servicesOperations ? 'rotate-180 text-accent-primary' : 'group-hover:text-accent-primary']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>
          <div v-show="expandedSections.servicesOperations" class="px-6 pb-6 pt-2">
            <div class="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-6"></div>
            <div v-if="onboarding.services && onboarding.services.length > 0" class="flex flex-wrap gap-3">
              <span v-for="service in onboarding.services" :key="service" class="group/tag inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-accent-primary/10 via-accent-primary/5 to-transparent px-5 py-3 text-sm font-bold text-accent-primary border border-accent-primary/20 hover:border-accent-primary hover:shadow-md hover:scale-105 transition-all cursor-default">
                <svg class="h-4 w-4 group-hover/tag:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                {{ service }}
              </span>
            </div>
            <div v-else class="rounded-xl bg-neutral-50 p-8 text-center border border-neutral-100">
              <svg class="h-12 w-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
              <p class="text-sm font-medium text-secondary">No services specified</p>
            </div>
            
            <!-- Service Area, Operations, Website Info, Design, Language (all merged here) -->
            <div class="mt-6"><div class="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-6"></div></div>
            <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">Primary Location</dt>
                <dd class="text-base font-semibold text-primary">{{ onboarding.service_area?.primary_location || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">Coverage Type</dt>
                <dd class="text-base font-semibold text-primary capitalize">{{ onboarding.service_area?.coverage_type || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">On-Site Mode</dt>
                <dd class="text-base font-semibold text-primary capitalize">{{ onboarding.operation_details?.on_site_mode || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">Business Hours</dt>
                <dd class="text-base font-semibold text-primary capitalize">{{ onboarding.operation_details?.business_hours || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">Primary Goal</dt>
                <dd class="text-base font-semibold text-primary">{{ onboarding.website_info?.primary_goal || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">Color Theme</dt>
                <dd class="text-base font-semibold text-primary capitalize">{{ onboarding.design_preferences?.color_theme || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">Primary Language</dt>
                <dd class="text-base font-semibold text-primary capitalize">{{ onboarding.language || '—' }}</dd>
              </div>
              <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">Has Logo</dt>
                <dd class="text-base font-semibold text-primary">{{ onboarding.design_preferences?.has_logo ? 'Yes' : 'No' }}</dd>
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
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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
const showIframeWarning = ref(false)

// Compute website URL for preview
const websiteUrl = computed(() => {
  if (!website.value) return null
  
  let domain = website.value.custom_domain || website.value.domain
  if (!domain) return null
  
  // Remove trailing slash and protocol
  domain = domain.replace(/\/$/, '').replace(/^https?:\/\//, '')
  
  return `https://${domain}`
})

// Handle iframe load event
const handleIframeLoad = () => {
  showIframeWarning.value = true
  // Hide warning after 7 seconds
  setTimeout(() => {
    showIframeWarning.value = false
  }, 7000)
}

// Expandable sections state - consolidated to 2 sections
const expandedSections = ref({
  businessContact: false,
  servicesOperations: false
})

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

useHead(() => ({
  title: website.value ? `${website.value.name} - WPS Canvas` : 'Website Details - WPS Canvas',
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
