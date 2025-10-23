<template>
  <div class="min-h-screen bg-page">
    <!-- Top Header Bar -->
    <header class="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div class="flex h-16 items-center justify-between px-6">
        <!-- Left: Logo and Project Selector -->
        <div class="flex items-center gap-4">
          <button class="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-neutral-100 transition-colors">
            <div class="flex h-6 w-6 items-center justify-center rounded-full bg-accent-primary">
              <span class="text-xs font-bold text-white">H</span>
            </div>
            <span class="text-sm font-semibold text-neutral-900">Hinn</span>
            <span class="rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-medium text-neutral-600">Hobby</span>
            <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <!-- Center: Quick Links -->
        <div class="hidden md:flex items-center gap-2">
          <a href="#" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors">
            Next.js <span class="rounded bg-neutral-900 px-1.5 py-0.5 text-xs font-medium text-white">v15</span> tickets
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <!-- Right: Search, Feedback, Notifications, Profile -->
        <div class="flex items-center gap-3">
          <button class="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-500 hover:border-neutral-300 transition-colors">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span class="hidden sm:inline">Find...</span>
            <kbd class="hidden sm:inline-flex h-5 items-center rounded border border-neutral-200 bg-neutral-50 px-1.5 text-xs font-medium text-neutral-500">F</kbd>
          </button>

          <button class="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors">
            Feedback
          </button>

          <button class="relative rounded-lg p-2 hover:bg-neutral-100 transition-colors">
            <svg class="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
          </button>

          <button class="flex items-center gap-2 rounded-lg p-1 hover:bg-neutral-100 transition-colors">
            <svg class="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <button class="h-8 w-8 rounded-full bg-accent-primary"></button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="border-t border-neutral-100">
        <nav class="flex gap-1 overflow-x-auto scrollbar-hide md:justify-center">
          <a
            v-for="tab in navigationTabs"
            :key="tab.id"
            @click="!showOnboardingRequired && (activeTab = tab.id)"
            :class="[
              'relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors',
              showOnboardingRequired ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              activeTab === tab.id
                ? 'text-primary'
                : 'text-secondary hover:text-primary'
            ]"
          >
            {{ tab.label }}
            <span
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
            ></span>
          </a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-6 py-8">
      <!-- Website Details View -->
      <div v-if="selectedWebsiteId">
        <!-- Back Button -->
        <button @click="closeWebsiteDetails" class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-6">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </button>

        <!-- Loading State -->
        <div v-if="websiteDetailsLoading" class="flex items-center justify-center py-24">
          <div class="text-center">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent-primary border-r-transparent"></div>
            <p class="mt-4 text-sm text-secondary">Loading website details...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="websiteDetailsError" class="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <svg class="h-8 w-8 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-sm font-semibold text-red-900 mb-1">Failed to load website</h3>
          <p class="text-xs text-red-700 mb-4">{{ websiteDetailsError }}</p>
          <button @click="closeWebsiteDetails" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
            Back to Dashboard
          </button>
        </div>

        <!-- Website Content -->
        <div v-else-if="selectedWebsite" class="bg-white">
          <div class="mx-auto max-w-5xl">
            <!-- Two Column Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-8 mb-8">
              <!-- Left: Preview -->
              <div>
                <div class="rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50 shadow-sm">
                  <div class="aspect-video flex items-center justify-center p-8">
                    <div class="text-center">
                      <svg class="h-16 w-16 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <p class="text-sm text-neutral-500">Website preview</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Details -->
              <div class="space-y-4">
                <div>
                  <h1 class="text-2xl font-bold text-neutral-900 mb-1">{{ selectedWebsite.name }}</h1>
                  <a 
                    v-if="selectedWebsite.custom_domain || selectedWebsite.domain" 
                    :href="`https://${selectedWebsite.custom_domain || selectedWebsite.domain || selectedWebsite.slug + '.vercel.app'}`"
                    target="_blank"
                    class="text-sm text-neutral-500 hover:text-neutral-700 inline-flex items-center gap-1 transition-colors"
                  >
                    {{ selectedWebsite.custom_domain || selectedWebsite.domain || selectedWebsite.slug + '.vercel.app' }}
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>

                <!-- Status & Created -->
                <div class="grid grid-cols-2 gap-4 py-3 border-y border-neutral-200">
                  <div>
                    <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Status</h3>
                    <div class="flex items-center gap-2">
                      <span :class="[
                        'h-2 w-2 rounded-full',
                        selectedWebsite.status === 'active' ? 'bg-emerald-500' : 'bg-neutral-400'
                      ]"></span>
                      <span class="text-sm font-medium text-neutral-900 capitalize">{{ selectedWebsite.status === 'active' ? 'Ready' : selectedWebsite.status }}</span>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Created</h3>
                    <p class="text-sm font-medium text-neutral-900">{{ formatDate(selectedWebsite.created_at) }}</p>
                  </div>
                </div>

                <!-- Category -->
                <div v-if="selectedWebsiteOnboarding?.category" class="py-3 border-b border-neutral-200">
                  <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Category</h3>
                  <p class="text-sm font-medium text-neutral-900">{{ selectedWebsiteOnboarding.category }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-2 pt-1">
                  <button class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                    Add Domain
                  </button>
                  <button class="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Request Changes
                  </button>
                </div>
              </div>
            </div>

            <!-- Onboarding Sections (if available) -->
            <div v-if="selectedWebsiteOnboarding" class="space-y-3">
              <!-- Business Information -->
              <section class="group rounded-2xl border border-neutral-200/60 bg-white shadow-sm hover:shadow-lg hover:border-accent-primary/30 transition-all overflow-hidden">
                <button @click="toggleWebsiteSection('business')" class="w-full flex items-center justify-between p-6 text-left hover:bg-gradient-to-r hover:from-accent-primary/5 hover:to-transparent transition-all">
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-focus/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg class="h-5 w-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h2 class="text-base font-bold text-primary mb-0.5">Business Information</h2>
                      <p v-if="!websiteExpandedSections.business && selectedWebsiteOnboarding?.business_name" class="hidden md:block text-sm text-secondary truncate">
                        {{ selectedWebsiteOnboarding.business_name }}
                      </p>
                    </div>
                  </div>
                  <svg :class="['h-5 w-5 text-neutral-400 transition-all', websiteExpandedSections.business ? 'rotate-180 text-accent-primary' : 'group-hover:text-accent-primary']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.business" class="px-6 pb-6 pt-2">
                  <div class="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-6"></div>
                  <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                      <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">Business Name</dt>
                      <dd class="text-base font-semibold text-primary">{{ selectedWebsiteOnboarding.business_name || '—' }}</dd>
                    </div>
                    <div class="group rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 border border-neutral-100 hover:border-accent-primary/20 hover:shadow-sm transition-all">
                      <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">Category</dt>
                      <dd class="text-base font-semibold text-primary">{{ selectedWebsiteOnboarding.category || '—' }}</dd>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.description" class="md:col-span-2 group rounded-xl bg-gradient-to-br from-accent-primary/5 to-white p-5 border border-accent-primary/10 hover:border-accent-primary/30 hover:shadow-sm transition-all">
                      <dt class="text-xs font-bold text-accent-primary uppercase tracking-wider mb-3">Description</dt>
                      <dd class="text-sm leading-relaxed text-primary/90">{{ selectedWebsiteOnboarding.description }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Contact Information -->
              <section v-if="selectedWebsiteOnboarding.contact_info" class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <button @click="toggleWebsiteSection('contact')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
                  <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                      <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-primary">Contact Information</h2>
                  </div>
                  <svg :class="['h-5 w-5 text-neutral-400 transition-transform', websiteExpandedSections.contact ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.contact" class="px-6 pb-6">
                  <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Email</dt>
                      <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.contact_info.email || '—' }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Phone</dt>
                      <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.contact_info.phone || '—' }}</dd>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.contact_info.preferred_contact_method">
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Preferred Contact Method</dt>
                      <dd class="mt-1 text-sm text-primary capitalize">{{ selectedWebsiteOnboarding.contact_info.preferred_contact_method }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Services -->
              <section v-if="selectedWebsiteOnboarding.services" class="group rounded-2xl border border-neutral-200/60 bg-white shadow-sm hover:shadow-lg hover:border-accent-primary/30 transition-all overflow-hidden">
                <button @click="toggleWebsiteSection('services')" class="w-full flex items-center justify-between p-6 text-left hover:bg-gradient-to-r hover:from-accent-primary/5 hover:to-transparent transition-all">
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-focus/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg class="h-5 w-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h2 class="text-base font-bold text-primary mb-0.5">Services</h2>
                      <p v-if="!websiteExpandedSections.services && selectedWebsiteOnboarding?.services?.length" class="hidden md:block text-sm text-secondary truncate">
                        {{ selectedWebsiteOnboarding.services.length }} service{{ selectedWebsiteOnboarding.services.length !== 1 ? 's' : '' }}
                      </p>
                    </div>
                  </div>
                  <svg :class="['h-5 w-5 text-neutral-400 transition-all', websiteExpandedSections.services ? 'rotate-180 text-accent-primary' : 'group-hover:text-accent-primary']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.services" class="px-6 pb-6 pt-2">
                  <div class="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-6"></div>
                  <div v-if="selectedWebsiteOnboarding.services && selectedWebsiteOnboarding.services.length > 0" class="flex flex-wrap gap-3">
                    <span v-for="service in selectedWebsiteOnboarding.services" :key="service" class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-accent-primary/10 via-accent-primary/5 to-transparent px-5 py-3 text-sm font-bold text-accent-primary border border-accent-primary/20 hover:border-accent-primary hover:shadow-md transition-all">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      {{ service }}
                    </span>
                  </div>
                </div>
              </section>

              <!-- Service Area -->
              <section v-if="selectedWebsiteOnboarding.service_area" class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <button @click="toggleWebsiteSection('serviceArea')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
                  <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                      <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-primary">Service Area</h2>
                  </div>
                  <svg :class="['h-5 w-5 text-neutral-400 transition-transform', websiteExpandedSections.serviceArea ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.serviceArea" class="px-6 pb-6">
                  <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Primary Location</dt>
                      <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.service_area.primary_location || '—' }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Coverage Type</dt>
                      <dd class="mt-1 text-sm text-primary capitalize">{{ selectedWebsiteOnboarding.service_area.coverage_type || '—' }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Operation Details -->
              <section v-if="selectedWebsiteOnboarding.operation_details" class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <button @click="toggleWebsiteSection('operations')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
                  <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                      <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-primary">Operation Details</h2>
                  </div>
                  <svg :class="['h-5 w-5 text-neutral-400 transition-transform', websiteExpandedSections.operations ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.operations" class="px-6 pb-6">
                  <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">On-Site Mode</dt>
                      <dd class="mt-1 text-sm text-primary capitalize">{{ selectedWebsiteOnboarding.operation_details.on_site_mode || '—' }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Business Hours</dt>
                      <dd class="mt-1 text-sm text-primary capitalize">{{ selectedWebsiteOnboarding.operation_details.business_hours || '—' }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Website Info -->
              <section v-if="selectedWebsiteOnboarding.website_info" class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <button @click="toggleWebsiteSection('websiteInfo')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
                  <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                      <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                      </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-primary">Website Information</h2>
                  </div>
                  <svg :class="['h-5 w-5 text-neutral-400 transition-transform', websiteExpandedSections.websiteInfo ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.websiteInfo" class="px-6 pb-6">
                  <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Has Current Website</dt>
                      <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.website_info.has_current_website ? 'Yes' : 'No' }}</dd>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.website_info.current_website_url">
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Current Website URL</dt>
                      <dd class="mt-1 text-sm text-primary">
                        <a :href="selectedWebsiteOnboarding.website_info.current_website_url" target="_blank" class="text-accent-primary hover:underline">
                          {{ selectedWebsiteOnboarding.website_info.current_website_url }}
                        </a>
                      </dd>
                    </div>
                    <div class="md:col-span-2">
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Primary Goal</dt>
                      <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.website_info.primary_goal || '—' }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Design Preferences -->
              <section v-if="selectedWebsiteOnboarding.design_preferences" class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <button @click="toggleWebsiteSection('design')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
                  <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                      <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                      </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-primary">Design Preferences</h2>
                  </div>
                  <svg :class="['h-5 w-5 text-neutral-400 transition-transform', websiteExpandedSections.design ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.design" class="px-6 pb-6">
                  <div class="space-y-4">
                    <div v-if="selectedWebsiteOnboarding.design_preferences.styles && selectedWebsiteOnboarding.design_preferences.styles.length > 0">
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide mb-2">Styles</dt>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="style in selectedWebsiteOnboarding.design_preferences.styles" :key="style" class="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                          {{ style }}
                        </span>
                      </div>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.design_preferences.emotional_impact && selectedWebsiteOnboarding.design_preferences.emotional_impact.length > 0">
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide mb-2">Emotional Impact</dt>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="emotion in selectedWebsiteOnboarding.design_preferences.emotional_impact" :key="emotion" class="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                          {{ emotion }}
                        </span>
                      </div>
                    </div>
                    <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div v-if="selectedWebsiteOnboarding.design_preferences.color_theme">
                        <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Color Theme</dt>
                        <dd class="mt-1 text-sm text-primary capitalize">{{ selectedWebsiteOnboarding.design_preferences.color_theme }}</dd>
                      </div>
                      <div v-if="selectedWebsiteOnboarding.design_preferences.brand_colors">
                        <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Brand Colors</dt>
                        <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.design_preferences.brand_colors }}</dd>
                      </div>
                      <div>
                        <dt class="text-xs font-medium text-secondary uppercase tracking-wide">High Contrast</dt>
                        <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.design_preferences.high_contrast ? 'Yes' : 'No' }}</dd>
                      </div>
                      <div>
                        <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Has Logo</dt>
                        <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.design_preferences.has_logo ? 'Yes' : 'No' }}</dd>
                      </div>
                    </dl>
                    <div v-if="selectedWebsiteOnboarding.design_preferences.inspiration_sites">
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Inspiration Sites</dt>
                      <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.design_preferences.inspiration_sites }}</dd>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Language & Additional Info -->
              <section v-if="selectedWebsiteOnboarding.language" class="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <button @click="toggleWebsiteSection('language')" class="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
                  <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                      <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                      </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-primary">Language & Additional Information</h2>
                  </div>
                  <svg :class="['h-5 w-5 text-neutral-400 transition-transform', websiteExpandedSections.language ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.language" class="px-6 pb-6">
                  <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Primary Language</dt>
                      <dd class="mt-1 text-sm text-primary capitalize">{{ selectedWebsiteOnboarding.language || '—' }}</dd>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.languages && selectedWebsiteOnboarding.languages.length > 0">
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">All Languages</dt>
                      <dd class="mt-1 text-sm text-primary">{{ selectedWebsiteOnboarding.languages.join(', ') }}</dd>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.envisioned_pages && selectedWebsiteOnboarding.envisioned_pages.length > 0" class="md:col-span-2">
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide mb-2">Envisioned Pages</dt>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="page in selectedWebsiteOnboarding.envisioned_pages" :key="page" class="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                          {{ page }}
                        </span>
                      </div>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.additional_notes" class="md:col-span-2">
                      <dt class="text-xs font-medium text-secondary uppercase tracking-wide">Additional Notes</dt>
                      <dd class="mt-1 text-sm text-primary whitespace-pre-wrap">{{ selectedWebsiteOnboarding.additional_notes }}</dd>
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
        </div>
      </div>

      <!-- Overview Tab -->
      <div v-else-if="activeTab === 'overview'" class="space-y-6">
        <!-- Search and Actions Bar -->
        <div class="mb-6 flex items-center justify-between gap-4">
          <div class="relative flex-1">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Projects..."
              :disabled="showOnboardingRequired"
              :class="[
                'h-9 w-full rounded-md border border-neutral-200 pl-9 pr-3 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary',
                showOnboardingRequired ? 'bg-neutral-100 cursor-not-allowed opacity-60' : 'bg-white'
              ]"
            />
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="!showOnboardingRequired && (viewMode = 'grid')"
              :disabled="showOnboardingRequired"
              :class="[
                'rounded-lg p-2 transition-colors',
                showOnboardingRequired ? 'opacity-50 cursor-not-allowed' : '',
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              ]"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>

            <button
              @click="!showOnboardingRequired && (viewMode = 'list')"
              :disabled="showOnboardingRequired"
              :class="[
                'rounded-lg p-2 transition-colors',
                showOnboardingRequired ? 'opacity-50 cursor-not-allowed' : '',
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              ]"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <div class="h-6 w-px bg-neutral-200"></div>

            <button 
              @click="showAddNewModal = true"
              :disabled="showOnboardingRequired"
              :class="[
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors',
                showOnboardingRequired 
                  ? 'bg-neutral-300 cursor-not-allowed' 
                  : 'bg-accent-primary hover:bg-accent-focus'
              ]"
            >
              Add New...
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Onboarding Required Banner -->
        <div v-if="showOnboardingRequired && pendingWebsiteProduct" class="mb-6 rounded-xl border-2 border-accent-primary bg-gradient-to-r from-accent-primary/10 to-accent-focus/5 p-6 shadow-lg">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-accent-primary flex items-center justify-center">
                  <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-2">Complete Onboarding for Your New Website</h3>
                <p class="text-sm text-secondary max-w-2xl mb-3">
                  You've selected the <span class="font-semibold text-primary capitalize">{{ pendingWebsiteProduct.plan }}</span> plan 
                  (<span class="font-semibold">${{ pendingWebsiteProduct.price_monthly }}/month</span>). 
                  Complete the onboarding process to provide us with your business details and preferences so we can start building your website.
                </p>
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 text-xs font-medium text-secondary">
                  <svg class="h-4 w-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Takes about 10 minutes
                </div>
              </div>
            </div>
            <button
              @click="activeTab = 'onboarding'"
              class="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-accent-primary px-8 py-3 text-sm font-semibold text-white hover:bg-accent-focus transition-all shadow-md hover:shadow-lg"
            >
              Start Onboarding
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-16">
          <div class="text-center">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent-primary border-r-transparent"></div>
            <p class="mt-4 text-sm text-secondary">Loading websites...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <svg class="h-8 w-8 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-sm font-semibold text-red-900 mb-1">Failed to load websites</h3>
          <p class="text-xs text-red-700 mb-4">{{ error }}</p>
          <button @click="fetchWebsites" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
            Try Again
          </button>
        </div>

        <!-- Projects Grid/List -->
        <div v-else-if="viewMode === 'grid'" :class="['grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', showOnboardingRequired ? 'relative' : '']">
          <!-- Disabled Overlay -->
          <div v-if="showOnboardingRequired" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 rounded-lg"></div>
          
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            @click="!showOnboardingRequired && openWebsiteDetails(project.id)"
            :class="[
              'group rounded-lg border border-neutral-200 bg-white p-6 transition-all',
              showOnboardingRequired 
                ? 'cursor-not-allowed opacity-60' 
                : 'hover:border-neutral-300 hover:shadow-md cursor-pointer'
            ]"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-lg bg-accent-primary flex items-center justify-center">
                  <span class="text-sm font-bold text-white">{{ project.name.charAt(0) }}</span>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-primary">{{ project.name }}</h3>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mt-1">
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                    Website
                  </span>
                </div>
              </div>
              <button class="opacity-0 group-hover:opacity-100 rounded p-1 hover:bg-neutral-100 transition-all">
                <svg class="h-4 w-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
              </button>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2 text-xs text-neutral-600">
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ project.lastDeployed }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span :class="[
                  'inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium',
                  project.status === 'Ready' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                ]">
                  <span :class="[
                    'h-1.5 w-1.5 rounded-full',
                    project.status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-500'
                  ]"></span>
                  {{ project.status }}
                </span>
                <span class="text-xs text-neutral-500">{{ project.framework }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!loading && !error && filteredProjects.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <div class="mb-4 rounded-full bg-neutral-100 p-4">
            <svg class="h-8 w-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-primary mb-2">{{ searchQuery ? 'No websites match your search' : 'No websites yet' }}</h3>
          <p class="text-sm text-secondary mb-6">{{ searchQuery ? 'Try a different search term' : 'Get started by creating your first website' }}</p>
          <NuxtLink v-if="!searchQuery" to="/onboarding" class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
            Create Website
          </NuxtLink>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'">
        <!-- Mobile View -->
        <div class="md:hidden">
          <!-- Menu List (when no tab selected) -->
          <div v-if="!settingsMobileContentOpen" class="space-y-6">
            <div>
              <h1 class="text-3xl font-bold text-primary mb-6">Settings</h1>
              
              <!-- Search Bar -->
              <div class="relative mb-6">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  v-model="settingsSearchQuery"
                  type="text"
                  placeholder="Search..."
                  class="w-full rounded-lg border border-neutral-200 bg-white pl-11 pr-4 py-3 text-base text-primary placeholder-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>

              <!-- Menu Items -->
              <div class="space-y-0 border-t border-neutral-200">
                <a
                  v-for="subTab in settingsTabs"
                  :key="subTab.id"
                  href="#"
                  @click.prevent="settingsActiveTab = subTab.id; settingsMobileContentOpen = true"
                  class="block px-0 py-4 text-base font-normal text-primary border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  {{ subTab.label }}
                </a>
              </div>
            </div>
          </div>

          <!-- Content View (when tab selected) -->
          <div v-if="settingsMobileContentOpen" class="space-y-6">
            <!-- Back Button -->
            <button
              @click="settingsMobileContentOpen = false"
              class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Settings
            </button>

            <!-- Content Sections -->
            <div>
              <!-- Profile Section -->
              <div v-if="settingsActiveTab === 'profile'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Profile Settings</h2>
                  <p class="mt-1 text-sm text-secondary">Manage your personal information and account preferences</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="space-y-5">
                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Company</label>
                      <input
                        type="text"
                        placeholder="Your Company"
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      />
                    </div>

                    <div class="pt-4 border-t border-neutral-200">
                      <button class="rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Billing Section -->
              <div v-if="settingsActiveTab === 'billing'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Billing Settings</h2>
                  <p class="mt-1 text-sm text-secondary">Manage your subscription and payment methods</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-base font-semibold text-primary mb-4">Current Plan</h3>
                      <div class="flex items-center justify-between p-4 rounded-lg bg-accent-subtle border border-accent-primary/20">
                        <div>
                          <div class="text-sm font-semibold text-primary">Hobby Plan</div>
                          <div class="text-xs text-secondary mt-1">Free forever</div>
                        </div>
                        <button class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                          Upgrade
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 class="text-base font-semibold text-primary mb-4">Payment Method</h3>
                      <div class="p-4 rounded-lg border border-neutral-200">
                        <p class="text-sm text-secondary">No payment method on file</p>
                        <button class="mt-3 text-sm font-medium text-accent-primary hover:text-accent-focus">
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Invoices Section -->
              <div v-if="settingsActiveTab === 'invoices'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Invoices</h2>
                  <p class="mt-1 text-sm text-secondary">View and download your billing invoices</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">No invoices yet</h3>
                    <p class="text-sm text-secondary">Your invoices will appear here once you upgrade to a paid plan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop/Tablet View -->
        <div class="hidden md:flex md:flex-row gap-6">
          <!-- Sidebar Navigation -->
          <aside class="md:w-48 shrink-0">
            <nav class="space-y-0.5">
              <a
                v-for="subTab in settingsTabs"
                :key="subTab.id"
                href="#"
                @click.prevent="settingsActiveTab = subTab.id"
                :class="[
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  settingsActiveTab === subTab.id
                    ? 'bg-neutral-100 text-primary'
                    : 'text-secondary hover:bg-neutral-50 hover:text-primary'
                ]"
              >
                {{ subTab.label }}
              </a>
            </nav>
          </aside>

          <!-- Content Area (Desktop/Tablet only) -->
          <div class="hidden md:block flex-1 min-w-0">
            <!-- Profile Section -->
            <div v-if="settingsActiveTab === 'profile'" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-primary">Profile Settings</h2>
            <p class="mt-1 text-sm text-secondary">Manage your personal information and account preferences</p>
          </div>

          <div class="rounded-lg border border-neutral-200 bg-white p-6">
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-primary mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-2">Company</label>
                <input
                  type="text"
                  placeholder="Your Company"
                  class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>

              <div class="pt-4 border-t border-neutral-200">
                <button class="rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Section -->
        <div v-if="settingsActiveTab === 'billing'" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-primary">Billing Settings</h2>
            <p class="mt-1 text-sm text-secondary">Manage your subscription and payment methods</p>
          </div>

          <div class="rounded-lg border border-neutral-200 bg-white p-6">
            <div class="space-y-6">
              <div>
                <h3 class="text-base font-semibold text-primary mb-4">Current Plan</h3>
                <div class="flex items-center justify-between p-4 rounded-lg bg-accent-subtle border border-accent-primary/20">
                  <div>
                    <div class="text-sm font-semibold text-primary">Hobby Plan</div>
                    <div class="text-xs text-secondary mt-1">Free forever</div>
                  </div>
                  <button class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                    Upgrade
                  </button>
                </div>
              </div>

              <div>
                <h3 class="text-base font-semibold text-primary mb-4">Payment Method</h3>
                <div class="p-4 rounded-lg border border-neutral-200">
                  <p class="text-sm text-secondary">No payment method on file</p>
                  <button class="mt-3 text-sm font-medium text-accent-primary hover:text-accent-focus">
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Invoices Section -->
        <div v-if="settingsActiveTab === 'invoices'" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-primary">Invoices</h2>
            <p class="mt-1 text-sm text-secondary">View and download your billing invoices</p>
          </div>

          <div class="rounded-lg border border-neutral-200 bg-white p-6">
            <div class="text-center py-12">
              <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 class="text-base font-semibold text-primary mb-2">No invoices yet</h3>
              <p class="text-sm text-secondary">Your invoices will appear here once you upgrade to a paid plan</p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Support Tab -->
      <div v-if="activeTab === 'support'">
        <!-- Mobile View -->
        <div class="md:hidden">
          <!-- Menu List (when no tab selected) -->
          <div v-if="!supportMobileContentOpen" class="space-y-6">
            <div>
              <h1 class="text-3xl font-bold text-primary mb-6">Support</h1>
              
              <!-- Search Bar -->
              <div class="relative mb-6">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  v-model="supportSearchQuery"
                  type="text"
                  placeholder="Search..."
                  class="w-full rounded-lg border border-neutral-200 bg-white pl-11 pr-4 py-3 text-base text-primary placeholder-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>

              <!-- Menu Items -->
              <div class="space-y-0 border-t border-neutral-200">
                <a
                  v-for="subTab in supportTabs"
                  :key="subTab.id"
                  href="#"
                  @click.prevent="supportActiveTab = subTab.id; supportMobileContentOpen = true"
                  class="block px-0 py-4 text-base font-normal text-primary border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  {{ subTab.label }}
                </a>
              </div>
            </div>
          </div>

          <!-- Content View (when tab selected) -->
          <div v-if="supportMobileContentOpen" class="space-y-6">
            <!-- Back Button -->
            <button
              @click="supportMobileContentOpen = false"
              class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Support
            </button>

            <!-- Content Sections -->
            <div>
              <!-- Chat Support Section -->
              <div v-if="supportActiveTab === 'chat'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Chat Support</h2>
                  <p class="mt-1 text-sm text-secondary">Get instant help from our support team</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">Chat support coming soon</h3>
                    <p class="text-sm text-secondary">We're working on bringing you real-time chat support</p>
                  </div>
                </div>
              </div>

              <!-- Helpful Docs Section -->
              <div v-if="supportActiveTab === 'docs'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Helpful Docs</h2>
                  <p class="mt-1 text-sm text-secondary">Browse our documentation and guides</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">Documentation coming soon</h3>
                    <p class="text-sm text-secondary">We're preparing comprehensive guides for you</p>
                  </div>
                </div>
              </div>

              <!-- Technical/Bugs Section -->
              <div v-if="supportActiveTab === 'bugs'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Technical/Bugs</h2>
                  <p class="mt-1 text-sm text-secondary">Report technical issues and bugs</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">Bug reporting coming soon</h3>
                    <p class="text-sm text-secondary">We're setting up our bug tracking system</p>
                  </div>
                </div>
              </div>

              <!-- Contact Us Section -->
              <div v-if="supportActiveTab === 'contact'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Contact Us</h2>
                  <p class="mt-1 text-sm text-secondary">Get in touch with our team</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="space-y-5">
                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Subject</label>
                      <input
                        type="text"
                        placeholder="How can we help?"
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Message</label>
                      <textarea
                        rows="5"
                        placeholder="Tell us more..."
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      ></textarea>
                    </div>

                    <div class="pt-4 border-t border-neutral-200">
                      <button class="rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop/Tablet View -->
        <div class="hidden md:flex md:flex-row gap-6">
          <!-- Sidebar Navigation -->
          <aside class="md:w-48 shrink-0">
            <nav class="space-y-0.5">
              <a
                v-for="subTab in supportTabs"
                :key="subTab.id"
                href="#"
                @click.prevent="supportActiveTab = subTab.id"
                :class="[
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  supportActiveTab === subTab.id
                    ? 'bg-neutral-100 text-primary'
                    : 'text-secondary hover:bg-neutral-50 hover:text-primary'
                ]"
              >
                {{ subTab.label }}
              </a>
            </nav>
          </aside>

          <!-- Content Area -->
          <div class="flex-1 min-w-0">
            <!-- Chat Support Section -->
            <div v-if="supportActiveTab === 'chat'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Chat Support</h2>
                <p class="mt-1 text-sm text-secondary">Get instant help from our support team</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">Chat support coming soon</h3>
                  <p class="text-sm text-secondary">We're working on bringing you real-time chat support</p>
                </div>
              </div>
            </div>

            <!-- Helpful Docs Section -->
            <div v-if="supportActiveTab === 'docs'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Helpful Docs</h2>
                <p class="mt-1 text-sm text-secondary">Browse our documentation and guides</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">Documentation coming soon</h3>
                  <p class="text-sm text-secondary">We're preparing comprehensive guides for you</p>
                </div>
              </div>
            </div>

            <!-- Technical/Bugs Section -->
            <div v-if="supportActiveTab === 'bugs'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Technical/Bugs</h2>
                <p class="mt-1 text-sm text-secondary">Report technical issues and bugs</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">Bug reporting coming soon</h3>
                  <p class="text-sm text-secondary">We're setting up our bug tracking system</p>
                </div>
              </div>
            </div>

            <!-- Contact Us Section -->
            <div v-if="supportActiveTab === 'contact'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Contact Us</h2>
                <p class="mt-1 text-sm text-secondary">Get in touch with our team</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-primary mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-primary mb-2">Message</label>
                    <textarea
                      rows="5"
                      placeholder="Tell us more..."
                      class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                    ></textarea>
                  </div>

                  <div class="pt-4 border-t border-neutral-200">
                    <button class="rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Domains Tab -->
      <div v-if="activeTab === 'domains'">
        <!-- Mobile View -->
        <div class="md:hidden">
          <!-- Menu List (when no tab selected) -->
          <div v-if="!domainsMobileContentOpen" class="space-y-6">
            <div>
              <h1 class="text-3xl font-bold text-primary mb-6">Domains</h1>
              
              <!-- Search Bar -->
              <div class="relative mb-6">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  v-model="domainsSearchQuery"
                  type="text"
                  placeholder="Search..."
                  class="w-full rounded-lg border border-neutral-200 bg-white pl-11 pr-4 py-3 text-base text-primary placeholder-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>

              <!-- Menu Items -->
              <div class="space-y-0 border-t border-neutral-200">
                <a
                  v-for="subTab in domainsTabs"
                  :key="subTab.id"
                  href="#"
                  @click.prevent="domainsActiveTab = subTab.id; domainsMobileContentOpen = true"
                  class="block px-0 py-4 text-base font-normal text-primary border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  {{ subTab.label }}
                </a>
              </div>
            </div>
          </div>

          <!-- Content View (when tab selected) -->
          <div v-if="domainsMobileContentOpen" class="space-y-6">
            <!-- Back Button -->
            <button
              @click="domainsMobileContentOpen = false"
              class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Domains
            </button>

            <!-- Content Sections -->
            <div>
              <!-- Purchased Domains Section -->
              <div v-if="domainsActiveTab === 'purchased'" class="space-y-6">
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="text-2xl font-bold text-primary">Purchased Domains</h2>
                    <p class="mt-1 text-sm text-secondary">Manage your registered domain names</p>
                  </div>
                  <button 
                    @click="loadMyDomains" 
                    class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Refresh
                  </button>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div v-if="myDomainsLoading" class="text-sm text-neutral-600">Loading...</div>
                  <div v-else-if="myDomainsError" class="text-sm text-red-600">{{ myDomainsError }}</div>
                  <div v-else-if="myDomains.length === 0" class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">No domains yet</h3>
                    <p class="text-sm text-secondary mb-4">You haven't purchased any domains yet</p>
                    <button 
                      @click="domainsActiveTab = 'buy'; domainsMobileContentOpen = true" 
                      class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors"
                    >
                      Buy Your First Domain
                    </button>
                  </div>
                  <div v-else class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead class="bg-neutral-50 text-neutral-700">
                        <tr>
                          <th class="text-left px-4 py-3 font-semibold">Domain</th>
                          <th class="text-left px-4 py-3 font-semibold">Status</th>
                          <th class="text-left px-4 py-3 font-semibold hidden sm:table-cell">Price</th>
                          <th class="text-left px-4 py-3 font-semibold hidden sm:table-cell">Purchased</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-neutral-200">
                        <tr v-for="domain in myDomains" :key="domain.id">
                          <td class="px-4 py-3 text-neutral-900 font-medium">{{ domain.domain }}</td>
                          <td class="px-4 py-3">
                            <span v-if="domain.status" :class="[
                              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border',
                              domain.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              domain.status === 'failed' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                              'bg-neutral-100 text-neutral-700 border-neutral-200'
                            ]">
                              {{ domain.status }}
                            </span>
                            <span v-else class="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-700">—</span>
                          </td>
                          <td class="px-4 py-3 text-neutral-800 hidden sm:table-cell">
                            {{ domain.price ? `${domain.currency || 'USD'} $${domain.price}${domain.period ? ` / ${domain.period} yr` : ''}` : '—' }}
                          </td>
                          <td class="px-4 py-3 text-neutral-700 hidden sm:table-cell">{{ formatDate(domain.created_at) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Buy New Domain Section -->
              <div v-if="domainsActiveTab === 'buy'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Buy New Domain</h2>
                  <p class="mt-1 text-sm text-secondary">Search and register a new domain name</p>
                </div>

                <!-- Search Domain -->
                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Keyword / Brand</label>
                      <div class="flex gap-2">
                        <input
                          v-model="domainSearchQuery"
                          type="text"
                          placeholder="acme, mybrand, etc"
                          class="flex-1 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                          @keyup.enter="handleDomainSearch"
                        />
                        <button 
                          @click="handleDomainSearch" 
                          :disabled="domainSearchLoading"
                          class="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors"
                          :class="domainSearchLoading ? 'bg-neutral-300 cursor-not-allowed' : 'bg-accent-primary hover:bg-accent-focus'"
                        >
                          {{ domainSearchLoading ? 'Searching...' : 'Search' }}
                        </button>
                      </div>
                    </div>

                    <div v-if="domainSearchError" class="text-sm text-red-600">{{ domainSearchError }}</div>

                    <!-- Search Results -->
                    <div v-if="domainSuggestions.length > 0 && !purchaseMode" class="pt-4">
                      <div class="overflow-hidden rounded-lg border border-neutral-200">
                        <table class="w-full text-sm">
                          <thead class="bg-neutral-50 text-neutral-700">
                            <tr>
                              <th class="text-left px-4 py-3 font-semibold">Domain</th>
                              <th class="text-left px-4 py-3 font-semibold">Status</th>
                              <th class="px-4 py-3"></th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-neutral-200">
                            <tr 
                              v-for="suggestion in domainSuggestions" 
                              :key="suggestion.name"
                              class="hover:bg-neutral-50"
                            >
                              <td class="px-4 py-3 text-neutral-900 font-medium text-xs">{{ suggestion.name }}</td>
                              <td class="px-4 py-3">
                                <span v-if="suggestion.available === null" class="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                                  Unknown
                                </span>
                                <span v-else-if="suggestion.available" class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                                  Available
                                </span>
                                <span v-else class="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs text-rose-700">
                                  Taken
                                </span>
                              </td>
                              <td class="px-4 py-3 text-right">
                                <button 
                                  @click="selectDomain(suggestion.name)"
                                  class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                                >
                                  Select
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div v-if="!purchaseMode" class="pt-2 border-t border-neutral-200">
                      <p class="text-xs text-secondary">Popular extensions: .com, .net, .org, .io, .app</p>
                    </div>
                  </div>
                </div>

                <!-- Selected Domain -->
                <div v-if="purchaseMode" class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="text-sm font-semibold text-neutral-900">Selected domain</h3>
                      <p class="mt-2 text-lg font-bold text-primary">{{ selectedDomain }}</p>
                      <div class="mt-2 flex items-center gap-2">
                        <span v-if="checkingAvailability" class="inline-flex items-center gap-2 text-sm text-neutral-700">
                          <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12"/>
                          </svg>
                          Checking...
                        </span>
                        <span v-else-if="domainAvailable !== null">
                          <span v-if="domainAvailable" class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700">
                            Available
                          </span>
                          <span v-else class="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs text-rose-700">
                            Taken
                          </span>
                        </span>
                        <span v-if="domainPrice" class="inline-flex items-center rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs text-neutral-800">
                          ${{ domainPrice.price }} / {{ domainPrice.period }} yr
                        </span>
                      </div>
                    </div>
                    <button 
                      @click="cancelPurchase" 
                      class="text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <!-- Registrant Information -->
                <div v-if="purchaseMode" class="rounded-lg border border-neutral-200 bg-white p-6">
                  <h3 class="text-lg font-semibold text-primary mb-4">Registrant information</h3>
                  
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Country</label>
                      <input v-model="registrant.country" type="text" placeholder="US" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Organization (optional)</label>
                      <input v-model="registrant.organization" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">First name</label>
                      <input v-model="registrant.firstName" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Last name</label>
                      <input v-model="registrant.lastName" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Address line 1</label>
                      <input v-model="registrant.address1" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Address line 2 (optional)</label>
                      <input v-model="registrant.address2" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">City</label>
                      <input v-model="registrant.city" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">State / Province</label>
                      <input v-model="registrant.state" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Postal code</label>
                      <input v-model="registrant.postalCode" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Phone</label>
                      <input v-model="registrant.phone" type="tel" placeholder="+1.4158551452" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Email</label>
                      <input v-model="registrant.email" type="email" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                    </div>
                    <div>
                      <label class="inline-flex items-center gap-2 text-sm text-neutral-800 cursor-pointer">
                        <input v-model="registrant.autoRenew" type="checkbox" class="rounded border-neutral-300 text-accent-primary focus:ring-accent-primary" />
                        Auto-renew
                      </label>
                    </div>
                  </div>

                  <div class="mt-6 flex flex-col gap-3">
                    <button 
                      @click="handleDomainPurchase" 
                      :disabled="purchaseLoading"
                      class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors"
                      :class="purchaseLoading ? 'bg-neutral-300 cursor-not-allowed' : 'bg-neutral-900 hover:bg-neutral-800'"
                    >
                      {{ purchaseLoading ? 'Purchasing...' : domainPrice ? `Purchase for $${domainPrice.price}` : 'Purchase' }}
                    </button>
                    <span v-if="purchaseError" class="text-sm text-red-600 text-center">{{ purchaseError }}</span>
                    <span v-if="purchaseSuccess" class="text-sm text-emerald-700 text-center">{{ purchaseSuccess }}</span>
                  </div>
                </div>
              </div>

              <!-- DNS & Configurations Section -->
              <div v-if="domainsActiveTab === 'dns'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">DNS & Configurations</h2>
                  <p class="mt-1 text-sm text-secondary">Manage DNS records and domain settings</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">No domains to configure</h3>
                    <p class="text-sm text-secondary">Purchase a domain to manage DNS settings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop/Tablet View -->
        <div class="hidden md:flex md:flex-row gap-6">
          <!-- Sidebar Navigation -->
          <aside class="md:w-48 shrink-0">
            <nav class="space-y-0.5">
              <a
                v-for="subTab in domainsTabs"
                :key="subTab.id"
                href="#"
                @click.prevent="domainsActiveTab = subTab.id"
                :class="[
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  domainsActiveTab === subTab.id
                    ? 'bg-neutral-100 text-primary'
                    : 'text-secondary hover:bg-neutral-50 hover:text-primary'
                ]"
              >
                {{ subTab.label }}
              </a>
            </nav>
          </aside>

          <!-- Content Area -->
          <div class="flex-1 min-w-0">
            <!-- Purchased Domains Section -->
            <div v-if="domainsActiveTab === 'purchased'" class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Purchased Domains</h2>
                  <p class="mt-1 text-sm text-secondary">Manage your registered domain names</p>
                </div>
                <button 
                  @click="loadMyDomains" 
                  class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Refresh
                </button>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div v-if="myDomainsLoading" class="text-sm text-neutral-600">Loading...</div>
                <div v-else-if="myDomainsError" class="text-sm text-red-600">{{ myDomainsError }}</div>
                <div v-else-if="myDomains.length === 0" class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">No domains yet</h3>
                  <p class="text-sm text-secondary mb-4">You haven't purchased any domains yet</p>
                  <button 
                    @click="domainsActiveTab = 'buy'" 
                    class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors"
                  >
                    Buy Your First Domain
                  </button>
                </div>
                <div v-else class="overflow-hidden rounded-lg border border-neutral-200">
                  <table class="w-full text-sm">
                    <thead class="bg-neutral-50 text-neutral-700">
                      <tr>
                        <th class="text-left px-4 py-3 font-semibold">Domain</th>
                        <th class="text-left px-4 py-3 font-semibold">Status</th>
                        <th class="text-left px-4 py-3 font-semibold">Price</th>
                        <th class="text-left px-4 py-3 font-semibold">Purchased</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-200">
                      <tr v-for="domain in myDomains" :key="domain.id">
                        <td class="px-4 py-3 text-neutral-900 font-medium">{{ domain.domain }}</td>
                        <td class="px-4 py-3">
                          <span v-if="domain.status" :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border',
                            domain.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            domain.status === 'failed' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            'bg-neutral-100 text-neutral-700 border-neutral-200'
                          ]">
                            {{ domain.status }}
                          </span>
                          <span v-else class="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-700">—</span>
                        </td>
                        <td class="px-4 py-3 text-neutral-800">
                          {{ domain.price ? `${domain.currency || 'USD'} $${domain.price}${domain.period ? ` / ${domain.period} yr` : ''}` : '—' }}
                        </td>
                        <td class="px-4 py-3 text-neutral-700">{{ formatDate(domain.created_at) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Buy New Domain Section -->
            <div v-if="domainsActiveTab === 'buy'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Buy New Domain</h2>
                <p class="mt-1 text-sm text-secondary">Search and register a new domain name</p>
              </div>

              <!-- Search Domain -->
              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-primary mb-2">Keyword / Brand</label>
                    <div class="flex gap-2">
                      <input
                        v-model="domainSearchQuery"
                        type="text"
                        placeholder="acme, mybrand, etc"
                        class="flex-1 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                        @keyup.enter="handleDomainSearch"
                      />
                      <button 
                        @click="handleDomainSearch" 
                        :disabled="domainSearchLoading"
                        class="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors"
                        :class="domainSearchLoading ? 'bg-neutral-300 cursor-not-allowed' : 'bg-accent-primary hover:bg-accent-focus'"
                      >
                        {{ domainSearchLoading ? 'Searching...' : 'Search' }}
                      </button>
                    </div>
                  </div>

                  <div v-if="domainSearchError" class="text-sm text-red-600">{{ domainSearchError }}</div>

                  <!-- Search Results -->
                  <div v-if="domainSuggestions.length > 0 && !purchaseMode" class="pt-4">
                    <div class="overflow-hidden rounded-lg border border-neutral-200">
                      <table class="w-full text-sm">
                        <thead class="bg-neutral-50 text-neutral-700">
                          <tr>
                            <th class="text-left px-4 py-3 font-semibold">Domain</th>
                            <th class="text-left px-4 py-3 font-semibold">Availability</th>
                            <th class="text-left px-4 py-3 font-semibold">Price</th>
                            <th class="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-neutral-200">
                          <tr 
                            v-for="suggestion in domainSuggestions" 
                            :key="suggestion.name"
                            class="hover:bg-neutral-50 cursor-pointer transition-colors"
                            @click="selectDomain(suggestion.name)"
                          >
                            <td class="px-4 py-3 text-neutral-900 font-medium">{{ suggestion.name }}</td>
                            <td class="px-4 py-3">
                              <span v-if="suggestion.available === null" class="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-700">
                                Unknown
                              </span>
                              <span v-else-if="suggestion.available" class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700">
                                Available
                              </span>
                              <span v-else class="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs text-rose-700">
                                Taken
                              </span>
                            </td>
                            <td class="px-4 py-3 text-neutral-800">
                              {{ suggestion.price != null ? `$${suggestion.price}` : '—' }}
                            </td>
                            <td class="px-4 py-3 text-right">
                              <button 
                                @click.stop="selectDomain(suggestion.name)"
                                class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div v-if="!purchaseMode" class="pt-2 border-t border-neutral-200">
                    <p class="text-xs text-secondary">Popular extensions: .com, .net, .org, .io, .app</p>
                  </div>
                </div>
              </div>

              <!-- Selected Domain -->
              <div v-if="purchaseMode" class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="text-sm font-semibold text-neutral-900">Selected domain</h3>
                    <p class="mt-2 text-lg font-bold text-primary">{{ selectedDomain }}</p>
                    <div class="mt-2 flex items-center gap-2">
                      <span v-if="checkingAvailability" class="inline-flex items-center gap-2 text-sm text-neutral-700">
                        <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12"/>
                        </svg>
                        Checking...
                      </span>
                      <span v-else-if="domainAvailable !== null">
                        <span v-if="domainAvailable" class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700">
                          Available
                        </span>
                        <span v-else class="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs text-rose-700">
                          Taken
                        </span>
                      </span>
                      <span v-if="domainPrice" class="inline-flex items-center rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs text-neutral-800">
                        ${{ domainPrice.price }} / {{ domainPrice.period }} yr
                      </span>
                    </div>
                  </div>
                  <button 
                    @click="cancelPurchase" 
                    class="text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    Change
                  </button>
                </div>
              </div>

              <!-- Registrant Information -->
              <div v-if="purchaseMode" class="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 class="text-lg font-semibold text-primary mb-4">Registrant information</h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Country</label>
                    <input v-model="registrant.country" type="text" placeholder="US" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Organization (optional)</label>
                    <input v-model="registrant.organization" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">First name</label>
                    <input v-model="registrant.firstName" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Last name</label>
                    <input v-model="registrant.lastName" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Address line 1</label>
                    <input v-model="registrant.address1" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Address line 2 (optional)</label>
                    <input v-model="registrant.address2" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">City</label>
                    <input v-model="registrant.city" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">State / Province</label>
                    <input v-model="registrant.state" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Postal code</label>
                    <input v-model="registrant.postalCode" type="text" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Phone</label>
                    <input v-model="registrant.phone" type="tel" placeholder="+1.4158551452" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Email</label>
                    <input v-model="registrant.email" type="email" class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="inline-flex items-center gap-2 text-sm text-neutral-800 cursor-pointer">
                      <input v-model="registrant.autoRenew" type="checkbox" class="rounded border-neutral-300 text-accent-primary focus:ring-accent-primary" />
                      Auto-renew
                    </label>
                  </div>
                </div>

                <div class="mt-6 flex items-center gap-4">
                  <button 
                    @click="handleDomainPurchase" 
                    :disabled="purchaseLoading"
                    class="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors"
                    :class="purchaseLoading ? 'bg-neutral-300 cursor-not-allowed' : 'bg-neutral-900 hover:bg-neutral-800'"
                  >
                    {{ purchaseLoading ? 'Purchasing...' : domainPrice ? `Purchase for $${domainPrice.price}` : 'Purchase' }}
                  </button>
                  <span v-if="purchaseError" class="text-sm text-red-600">{{ purchaseError }}</span>
                  <span v-if="purchaseSuccess" class="text-sm text-emerald-700">{{ purchaseSuccess }}</span>
                </div>
              </div>
            </div>

            <!-- DNS & Configurations Section -->
            <div v-if="domainsActiveTab === 'dns'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">DNS & Configurations</h2>
                <p class="mt-1 text-sm text-secondary">Manage DNS records and domain settings</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">No domains to configure</h3>
                  <p class="text-sm text-secondary">Purchase a domain to manage DNS settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Onboarding Tab -->
      <div v-if="activeTab === 'onboarding'">
        <iframe 
          src="/onboarding" 
          class="w-full border-0 rounded-lg"
          style="height: calc(100vh - 200px); min-height: 800px;"
          @load="onOnboardingLoad"
        ></iframe>
      </div>

      <!-- Coming Soon Tabs (Branding, Marketing, AI Agents) -->
      <div v-if="activeTab === 'branding' || activeTab === 'marketing' || activeTab === 'ai-agents'" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center max-w-md">
          <div class="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-subtle">
            <svg class="h-10 w-10 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-primary mb-3">Coming Soon</h2>
          <p class="text-base text-secondary mb-6">
            We're working hard to bring you {{ activeTab === 'ai-agents' ? 'AI Agents' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }}. 
            Stay tuned for updates!
          </p>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 text-sm text-secondary">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            This feature is under development
          </div>
        </div>
      </div>

      <!-- Other Tabs Content -->
      <div v-if="activeTab !== 'overview' && activeTab !== 'settings' && activeTab !== 'support' && activeTab !== 'domains' && activeTab !== 'branding' && activeTab !== 'marketing' && activeTab !== 'ai-agents' && activeTab !== 'onboarding'" class="rounded-lg border border-neutral-200 bg-white p-8 text-center">
        <p class="text-sm text-secondary">{{ activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }} content goes here</p>
      </div>
    </main>

    <!-- Add New Modal -->
    <div v-if="showAddNewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" @click.self="showAddNewModal = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-primary">Add New Product</h2>
            <p class="text-sm text-secondary mt-1">Choose what you'd like to create</p>
          </div>
          <button @click="showAddNewModal = false" class="rounded-lg p-2 hover:bg-neutral-100 transition-colors">
            <svg class="h-5 w-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Product Selection (Step 1) -->
        <div v-if="addNewStep === 'select'" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Website Product -->
            <button
              @click="selectProduct('website')"
              class="group relative rounded-xl border-2 border-neutral-200 bg-white p-6 text-left hover:border-accent-primary hover:shadow-lg transition-all"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="h-12 w-12 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                </div>
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Available
                </span>
              </div>
              <h3 class="text-lg font-bold text-primary mb-2">Website</h3>
              <p class="text-sm text-secondary mb-4">Create a professional website with custom design and features</p>
              <div class="flex items-center gap-2 text-sm text-accent-primary font-medium">
                Get Started
                <svg class="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </button>

            <!-- Marketing Product -->
            <div class="relative rounded-xl border-2 border-neutral-200 bg-neutral-50 p-6 text-left opacity-60">
              <div class="flex items-start justify-between mb-4">
                <div class="h-12 w-12 rounded-lg bg-neutral-200 flex items-center justify-center">
                  <svg class="h-6 w-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                  </svg>
                </div>
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                  Coming Soon
                </span>
              </div>
              <h3 class="text-lg font-bold text-neutral-600 mb-2">Marketing</h3>
              <p class="text-sm text-neutral-500 mb-4">Boost your reach with targeted marketing campaigns</p>
            </div>

            <!-- AI Agent Product -->
            <div class="relative rounded-xl border-2 border-neutral-200 bg-neutral-50 p-6 text-left opacity-60">
              <div class="flex items-start justify-between mb-4">
                <div class="h-12 w-12 rounded-lg bg-neutral-200 flex items-center justify-center">
                  <svg class="h-6 w-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                  Coming Soon
                </span>
              </div>
              <h3 class="text-lg font-bold text-neutral-600 mb-2">AI Agent</h3>
              <p class="text-sm text-neutral-500 mb-4">Deploy intelligent AI agents to automate tasks</p>
            </div>
          </div>
        </div>

        <!-- Website Plan Selection (Step 2) -->
        <div v-if="addNewStep === 'plan'" class="p-6">
          <button @click="addNewStep = 'select'" class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-6">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Products
          </button>

          <div class="mb-6">
            <h3 class="text-lg font-bold text-primary mb-2">Choose Your Website Plan</h3>
            <p class="text-sm text-secondary">Select the plan that best fits your needs</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Starter Plan -->
            <div class="rounded-xl border-2 border-neutral-200 bg-white p-6 hover:border-accent-primary hover:shadow-lg transition-all">
              <div class="mb-4">
                <h4 class="text-lg font-bold text-primary mb-1">Starter</h4>
                <p class="text-sm text-secondary">Perfect for small businesses</p>
              </div>
              <div class="mb-6">
                <div class="flex items-baseline gap-1">
                  <span class="text-3xl font-bold text-primary">$29</span>
                  <span class="text-sm text-secondary">/month</span>
                </div>
              </div>
              <ul class="space-y-3 mb-6">
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Up to 5 pages</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Custom domain</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">SSL certificate</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Basic SEO</span>
                </li>
              </ul>
              <button @click="selectPlan('starter')" class="w-full rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-neutral-200 transition-colors">
                Select Starter
              </button>
            </div>

            <!-- Professional Plan (Popular) -->
            <div class="relative rounded-xl border-2 border-accent-primary bg-white p-6 shadow-lg">
              <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-primary text-white text-xs font-semibold">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Popular
                </span>
              </div>
              <div class="mb-4">
                <h4 class="text-lg font-bold text-primary mb-1">Professional</h4>
                <p class="text-sm text-secondary">For growing businesses</p>
              </div>
              <div class="mb-6">
                <div class="flex items-baseline gap-1">
                  <span class="text-3xl font-bold text-primary">$79</span>
                  <span class="text-sm text-secondary">/month</span>
                </div>
              </div>
              <ul class="space-y-3 mb-6">
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Up to 15 pages</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Custom domain</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Advanced SEO</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">E-commerce ready</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Priority support</span>
                </li>
              </ul>
              <button @click="selectPlan('professional')" class="w-full rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-focus transition-colors">
                Select Professional
              </button>
            </div>

            <!-- Enterprise Plan -->
            <div class="rounded-xl border-2 border-neutral-200 bg-white p-6 hover:border-accent-primary hover:shadow-lg transition-all">
              <div class="mb-4">
                <h4 class="text-lg font-bold text-primary mb-1">Enterprise</h4>
                <p class="text-sm text-secondary">For large organizations</p>
              </div>
              <div class="mb-6">
                <div class="flex items-baseline gap-1">
                  <span class="text-3xl font-bold text-primary">$199</span>
                  <span class="text-sm text-secondary">/month</span>
                </div>
              </div>
              <ul class="space-y-3 mb-6">
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Unlimited pages</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Multiple domains</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Advanced analytics</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Dedicated support</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-secondary">Custom integrations</span>
                </li>
              </ul>
              <button @click="selectPlan('enterprise')" class="w-full rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-neutral-200 transition-colors">
                Select Enterprise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getSupabaseClient } from '~/lib/supabaseClient'

// Disable default layout (removes navigation and footer)
definePageMeta({
  layout: false,
  middleware: ['auth']
})

useHead({
  title: 'Dashboard - Hinn',
  meta: [
    { name: 'description', content: 'Manage your projects and deployments' }
  ]
})

// Navigation
const navigationTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'websites', label: 'Websites' },
  { id: 'domains', label: 'Domains' },
  { id: 'branding', label: 'Branding' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'ai-agents', label: 'AI Agents' },
  { id: 'support', label: 'Support' },
  { id: 'settings', label: 'Settings' }
]

const activeTab = ref('overview')
const viewMode = ref('grid')
const searchQuery = ref('')

// Settings sub-navigation
const settingsTabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'billing', label: 'Billing' },
  { id: 'invoices', label: 'Invoices' }
]
const settingsActiveTab = ref('profile')
const settingsMobileMenuOpen = ref(false)
const settingsMobileContentOpen = ref(false)
const settingsSearchQuery = ref('')

// Support sub-navigation
const supportTabs = [
  { id: 'chat', label: 'Chat Support' },
  { id: 'docs', label: 'Helpful Docs' },
  { id: 'bugs', label: 'Technical/Bugs' },
  { id: 'contact', label: 'Contact Us' }
]
const supportActiveTab = ref('chat')
const supportMobileContentOpen = ref(false)
const supportSearchQuery = ref('')

// Domains sub-navigation
const domainsTabs = [
  { id: 'purchased', label: 'Purchased Domains' },
  { id: 'buy', label: 'Buy New Domain' },
  { id: 'dns', label: 'DNS & Configurations' }
]
const domainsActiveTab = ref('purchased')
const domainsMobileContentOpen = ref(false)
const domainsSearchQuery = ref('')

// Domain search and purchase
const domainSearchQuery = ref('')
const domainSearchLoading = ref(false)
const domainSearchError = ref(null)
const domainSuggestions = ref([])
const purchaseMode = ref(false)
const selectedDomain = ref('')
const checkingAvailability = ref(false)
const domainAvailable = ref(null)
const domainPrice = ref(null)
const purchaseLoading = ref(false)
const purchaseError = ref(null)
const purchaseSuccess = ref(null)

// Registrant information
const registrant = ref({
  country: 'US',
  organization: '',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  email: '',
  autoRenew: true
})

// My domains
const myDomains = ref([])
const myDomainsLoading = ref(false)
const myDomainsError = ref(null)

// Real websites data from Supabase
const websites = ref([])
const loading = ref(true)
const error = ref(null)

// Website details modal
const selectedWebsiteId = ref(null)
const selectedWebsite = ref(null)
const selectedWebsiteOnboarding = ref(null)
const websiteDetailsLoading = ref(false)
const websiteDetailsError = ref(null)

// Website expanded sections
const websiteExpandedSections = ref({
  business: false,
  contact: false,
  services: false,
  serviceArea: false,
  operations: false,
  websiteInfo: false,
  design: false,
  language: false
})

// Onboarding state
const showOnboardingRequired = ref(false)
const checkingOnboarding = ref(true)
const pendingWebsiteProduct = ref(null)

// Add New Modal state
const showAddNewModal = ref(false)
const addNewStep = ref('select') // 'select' or 'plan'
const selectedProduct = ref(null)
const selectedPlan = ref(null)

// Fetch websites from API
const fetchWebsites = async () => {
  try {
    loading.value = true
    error.value = null
    
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      error.value = 'Not authenticated'
      return
    }

    const response = await $fetch('/api/websites', {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })
    
    websites.value = response.websites || []
  } catch (err) {
    console.error('Failed to fetch websites:', err)
    error.value = err.message || 'Failed to load websites'
  } finally {
    loading.value = false
  }
}

// Domain functions
const handleDomainSearch = async () => {
  if (!domainSearchQuery.value.trim()) return
  
  domainSearchLoading.value = true
  domainSearchError.value = null
  
  try {
    // TODO: Implement domain search API
    // Mock results for now
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const query = domainSearchQuery.value.trim().toLowerCase()
    domainSuggestions.value = [
      { name: `${query}.com`, available: true, price: 12.99, period: 1 },
      { name: `${query}.net`, available: true, price: 14.99, period: 1 },
      { name: `${query}.io`, available: false, price: null, period: null },
      { name: `${query}.co`, available: true, price: 24.99, period: 1 },
      { name: `get${query}.com`, available: true, price: 12.99, period: 1 },
    ]
  } catch (err) {
    domainSearchError.value = err.message || 'Failed to search domains'
  } finally {
    domainSearchLoading.value = false
  }
}

const selectDomain = async (domainName) => {
  selectedDomain.value = domainName
  purchaseMode.value = true
  checkingAvailability.value = true
  domainAvailable.value = null
  domainPrice.value = null
  
  try {
    // TODO: Implement domain availability check API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const suggestion = domainSuggestions.value.find(s => s.name === domainName)
    domainAvailable.value = suggestion?.available ?? true
    domainPrice.value = suggestion?.price ? { price: suggestion.price, period: suggestion.period } : null
  } catch (err) {
    console.error('Failed to check domain availability:', err)
  } finally {
    checkingAvailability.value = false
  }
}

const cancelPurchase = () => {
  purchaseMode.value = false
  selectedDomain.value = ''
  domainAvailable.value = null
  domainPrice.value = null
  purchaseError.value = null
  purchaseSuccess.value = null
}

const handleDomainPurchase = async () => {
  purchaseLoading.value = true
  purchaseError.value = null
  purchaseSuccess.value = null
  
  try {
    // TODO: Implement domain purchase API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    purchaseSuccess.value = 'Domain purchased successfully!'
    
    // Reload domains list
    await loadMyDomains()
    
    // Reset form after success
    setTimeout(() => {
      cancelPurchase()
      domainSuggestions.value = []
      domainSearchQuery.value = ''
      domainsActiveTab.value = 'purchased'
    }, 2000)
  } catch (err) {
    purchaseError.value = err.message || 'Failed to purchase domain'
  } finally {
    purchaseLoading.value = false
  }
}

const loadMyDomains = async () => {
  myDomainsLoading.value = true
  myDomainsError.value = null
  
  try {
    const supabase = getSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Not authenticated')
    
    const { data, error } = await supabase
      .from('domain_purchases')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    myDomains.value = data || []
  } catch (err) {
    myDomainsError.value = err.message || 'Failed to load your domains'
  } finally {
    myDomainsLoading.value = false
  }
}

// Map websites to project card format
const projects = computed(() => {
  return websites.value.map(w => ({
    id: w.id,
    name: w.name || 'Unnamed Website',
    domain: w.custom_domain || w.domain || w.slug + '.vercel.app',
    status: w.status === 'active' ? 'Ready' : w.status === 'paused' ? 'Paused' : 'Building',
    framework: 'Nuxt.js',
    lastDeployed: formatRelativeTime(w.updated_at || w.created_at)
  }))
})

const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value
  return projects.value.filter(project =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    project.domain.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Helper to format relative time
const formatRelativeTime = (dateString) => {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
}

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Website details modal functions
const openWebsiteDetails = async (websiteId) => {
  selectedWebsiteId.value = websiteId
  websiteDetailsLoading.value = true
  websiteDetailsError.value = null
  selectedWebsite.value = null
  selectedWebsiteOnboarding.value = null
  
  try {
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      throw new Error('Not authenticated')
    }

    const response = await $fetch(`/api/websites/${websiteId}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })
    
    console.log('API Response:', response)
    console.log('Website data:', response.website)
    console.log('Onboarding data:', response.website?.onboarding_data)
    
    selectedWebsite.value = response.website
    selectedWebsiteOnboarding.value = response.website.onboarding_data
    
    console.log('Selected onboarding:', selectedWebsiteOnboarding.value)
  } catch (err) {
    console.error('Failed to fetch website details:', err)
    websiteDetailsError.value = err.message || 'Failed to load website details'
  } finally {
    websiteDetailsLoading.value = false
  }
}

const closeWebsiteDetails = () => {
  selectedWebsiteId.value = null
  selectedWebsite.value = null
  selectedWebsiteOnboarding.value = null
  websiteDetailsError.value = null
  // Reset expanded sections
  websiteExpandedSections.value = {
    business: false,
    contact: false,
    services: false,
    serviceArea: false,
    operations: false,
    websiteInfo: false,
    design: false,
    language: false
  }
}

const toggleWebsiteSection = (section) => {
  websiteExpandedSections.value[section] = !websiteExpandedSections.value[section]
}

// Check if user needs to complete onboarding
const checkOnboardingStatus = async () => {
  try {
    const supabase = getSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.log('[Dashboard] No user found')
      return
    }

    console.log('[Dashboard] Checking onboarding status for user:', user.id)

    // Check user profile for onboarding completion
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('has_completed_get_started, has_completed_onboarding')
      .eq('user_id', user.id)
      .maybeSingle()

    if (profileError) {
      console.error('[Dashboard] Profile fetch error:', profileError)
      return
    }

    console.log('[Dashboard] User profile:', profile)

    // If user hasn't completed get-started, redirect them there first
    if (!profile?.has_completed_get_started) {
      console.log('[Dashboard] User has not completed get-started, redirecting...')
      await navigateTo('/get-started')
      return
    }

    // Check for pending website products that need onboarding
    const { data: pendingProducts, error: productsError } = await supabase
      .from('website_products')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'pending_onboarding')
      .order('created_at', { ascending: false })

    if (productsError) {
      console.error('[Dashboard] Products fetch error:', productsError)
    }

    console.log('[Dashboard] Pending products:', pendingProducts)

    // If there's a pending website product, show onboarding requirement
    if (pendingProducts && pendingProducts.length > 0) {
      pendingWebsiteProduct.value = pendingProducts[0]
      showOnboardingRequired.value = true
      console.log('[Dashboard] Showing onboarding requirement for website product:', pendingProducts[0])
    } else {
      showOnboardingRequired.value = false
      pendingWebsiteProduct.value = null
      console.log('[Dashboard] No pending website products')
    }
  } catch (error) {
    console.error('[Dashboard] Check onboarding error:', error)
  } finally {
    checkingOnboarding.value = false
  }
}

// Watch for tab changes to load domains
watch(activeTab, (newTab) => {
  if (newTab === 'domains') {
    loadMyDomains()
  }
})

// Handle product selection in Add New modal
const selectProduct = (product) => {
  selectedProduct.value = product
  if (product === 'website') {
    addNewStep.value = 'plan'
  }
}

// Handle plan selection
const selectPlan = async (plan) => {
  selectedPlan.value = plan
  console.log('[Dashboard] Selected plan:', plan)
  
  try {
    const supabase = getSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error('[Dashboard] No user found')
      return
    }

    // Determine price based on plan
    const prices = {
      starter: 29,
      professional: 79,
      enterprise: 199
    }

    // Create website product entry
    const { data: product, error: productError } = await supabase
      .from('website_products')
      .insert({
        user_id: user.id,
        plan: plan,
        status: 'pending_onboarding',
        price_monthly: prices[plan]
      })
      .select()
      .single()

    if (productError) {
      console.error('[Dashboard] Error creating website product:', productError)
      return
    }

    console.log('[Dashboard] Website product created:', product)
    
    // Close modal and redirect to onboarding
    showAddNewModal.value = false
    activeTab.value = 'onboarding'
    
    // Refresh to show onboarding requirement
    await checkOnboardingStatus()
    
    // Reset modal state
    setTimeout(() => {
      addNewStep.value = 'select'
      selectedProduct.value = null
      selectedPlan.value = null
    }, 300)
  } catch (error) {
    console.error('[Dashboard] Error in selectPlan:', error)
  }
}

// Handle onboarding completion from iframe
const onOnboardingLoad = () => {
  console.log('[Dashboard] Onboarding iframe loaded')
}

// Listen for messages from onboarding iframe
if (process.client) {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'onboarding-complete') {
      console.log('[Dashboard] Onboarding completed, refreshing status')
      showOnboardingRequired.value = false
      activeTab.value = 'overview'
      checkOnboardingStatus()
    }
  })
}

// Fetch on mount
onMounted(() => {
  checkOnboardingStatus()
  fetchWebsites()
})
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
