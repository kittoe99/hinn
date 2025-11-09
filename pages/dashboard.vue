<template>
  <div class="min-h-screen bg-[#f9f8f6]">
    <!-- Header with Profile and Navigation -->
    <header class="bg-[#f9f8f6] border-b border-neutral-200">
      <!-- Top Bar with Logo, Navigation (Desktop), Search, and Logout -->
      <div class="flex h-16 items-center px-6">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 flex-shrink-0 mr-12">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
            <span class="text-lg font-bold text-white">H</span>
          </div>
          <span class="hidden sm:block text-lg font-semibold text-neutral-900">Hinn</span>
        </NuxtLink>

        <!-- Desktop Navigation Tabs (hidden on mobile) -->
        <nav class="hidden lg:flex items-center gap-0.5 mr-auto">
          <a
            v-for="tab in navigationTabs"
            :key="tab.id"
            @click="!showOnboardingRequired && (activeTab = tab.id)"
            :class="[
              'relative whitespace-nowrap px-4 h-16 flex items-center text-sm font-medium transition-colors',
              showOnboardingRequired ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              activeTab === tab.id ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
            ]"
          >
            {{ tab.label }}
            <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"></span>
          </a>
        </nav>

        <!-- Search Bar -->
        <div class="flex flex-1 lg:flex-initial lg:w-[480px] lg:ml-4">
          <div class="relative w-full">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="h-9 w-full rounded-lg border-0 bg-white pl-9 pr-4 text-sm text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-[#d97759] focus:outline-none transition-all"
            />
          </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-2 flex-shrink-0 ml-8">
          <!-- Desktop: Show logout button -->
          <button 
            @click="handleLogout"
            class="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Logout
          </button>

          <!-- Mobile: Show menu button -->
          <div class="lg:hidden relative" @click.stop>
            <button 
              @click.stop="showMobileMenu = !showMobileMenu"
              class="p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <!-- Mobile Menu Dropdown -->
            <div 
              v-if="showMobileMenu"
              class="absolute right-0 mt-2 w-48 rounded-lg border border-neutral-200 bg-white shadow-xl overflow-hidden z-50"
            >
              <button 
                @click="handleLogout; showMobileMenu = false"
                class="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
      
    <!-- Navigation Tabs -->
    <div class="bg-[#f9f8f6] border-t border-neutral-100">
        <!-- Mobile: Expandable Navigation -->
        <div class="md:hidden px-4 py-3 relative">
          <button
            @click="mobileNavExpanded = !mobileNavExpanded"
            :class="[
              'w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all',
              mobileNavExpanded ? 'border-[#d97759] bg-[#d97759]/5' : 'border-neutral-200 bg-white'
            ]"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d97759]/10">
                <svg class="h-4 w-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="activeTab === 'overview'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  <path v-else-if="activeTab === 'websites'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  <path v-else-if="activeTab === 'domains'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  <path v-else-if="activeTab === 'branding'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  <path v-else-if="activeTab === 'marketing'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                  <path v-else-if="activeTab === 'ai-agents'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  <path v-else-if="activeTab === 'support'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span class="text-sm font-semibold text-neutral-900">
                {{ navigationTabs.find(t => t.id === activeTab)?.label }}
              </span>
            </div>
            <svg 
              :class="['h-5 w-5 text-neutral-500 transition-transform', mobileNavExpanded ? 'rotate-180' : '']"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Expandable Menu -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="mobileNavExpanded" class="absolute top-full left-4 right-4 mt-2 rounded-lg border border-neutral-200 bg-white shadow-lg overflow-hidden z-50">
              <button
                v-for="tab in navigationTabs"
                :key="tab.id"
                @click="!showOnboardingRequired && (activeTab = tab.id, mobileNavExpanded = false)"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-b border-neutral-100 last:border-b-0',
                  showOnboardingRequired ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                  activeTab === tab.id
                    ? 'bg-[#d97759]/5 text-[#d97759]'
                    : 'text-neutral-700 hover:bg-white'
                ]"
              >
                <div :class="['flex h-8 w-8 items-center justify-center rounded-lg', activeTab === tab.id ? 'bg-[#d97759]/10' : 'bg-neutral-100']">
                  <svg :class="['h-4 w-4', activeTab === tab.id ? 'text-[#d97759]' : 'text-neutral-600']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="tab.id === 'overview'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    <path v-else-if="tab.id === 'websites'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    <path v-else-if="tab.id === 'domains'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    <path v-else-if="tab.id === 'branding'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                    <path v-else-if="tab.id === 'marketing'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                    <path v-else-if="tab.id === 'ai-agents'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    <path v-else-if="tab.id === 'support'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span>{{ tab.label }}</span>
                <svg v-if="activeTab === tab.id" class="h-5 w-5 ml-auto text-[#d97759]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </button>
            </div>
          </Transition>
        </div>
    </div>

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
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-600 border-r-transparent"></div>
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
          <button @click="closeWebsiteDetails" class="bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
            Back to Dashboard
          </button>
        </div>

        <!-- Website Content -->
        <div v-else-if="selectedWebsite">
          <div class="mx-auto max-w-5xl">
            <!-- Header Card -->
            <div class="relative overflow-hidden bg-white border border-neutral-200 rounded-2xl mb-8">
              <!-- Accent Bar -->
              <!-- Accent bar removed per design update -->
              
              <div class="p-8">
                <div class="flex flex-col md:flex-row items-start gap-8">
                  <!-- Site Preview Image -->
                  <div class="w-full md:w-80 flex-shrink-0">
                    <div class="relative aspect-[4/3] rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden group">
                      <!-- Preview Image or Placeholder -->
                      <div v-if="selectedWebsite.preview_image" class="w-full h-full">
                        <img 
                          :src="selectedWebsite.preview_image" 
                          :alt="`${selectedWebsite.name} preview`"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <div v-else class="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <div class="h-16 w-16 rounded-xl border border-neutral-200 bg-[#d97759]/10 flex items-center justify-center mb-4">
                          <svg class="h-8 w-8 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                        </div>
                        <p class="text-sm text-neutral-500">No preview available</p>
                      </div>
                      <!-- Overlay on hover -->
                      <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors"></div>
                    </div>
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <h1 class="text-3xl font-medium text-neutral-900 mb-3">{{ selectedWebsite.name }}</h1>
                    <a 
                      v-if="selectedWebsite.custom_domain || selectedWebsite.domain" 
                      :href="`https://${selectedWebsite.custom_domain || selectedWebsite.domain || selectedWebsite.slug + '.vercel.app'}`"
                      target="_blank"
                      class="text-base text-neutral-600 hover:text-[#d97759] inline-flex items-center gap-2 transition-colors mb-4"
                    >
                      {{ selectedWebsite.custom_domain || selectedWebsite.domain || selectedWebsite.slug + '.vercel.app' }}
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                    
                    <!-- Meta Info -->
                    <div class="flex items-center gap-4 flex-wrap mb-6">
                      <div class="flex items-center gap-2">
                        <span :class="[
                          'h-2 w-2 rounded-full',
                          selectedWebsite.status === 'active' ? 'bg-emerald-500' : 'bg-neutral-400'
                        ]"></span>
                        <span class="text-sm font-medium text-neutral-900">{{ selectedWebsite.status === 'active' ? 'Ready' : selectedWebsite.status }}</span>
                      </div>
                      <span class="text-neutral-300">·</span>
                      <div class="flex items-center gap-2 text-sm text-neutral-600">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>{{ formatDate(selectedWebsite.created_at) }}</span>
                      </div>
                      <span v-if="selectedWebsiteOnboarding?.category" class="inline-flex items-center px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-700">
                        {{ selectedWebsiteOnboarding.category }}
                      </span>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3 flex-nowrap overflow-x-auto scrollbar-hide whitespace-nowrap -mx-1 px-1">
                      <button class="inline-flex items-center gap-2 shrink-0 border border-neutral-200 bg-white px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-white hover:border-neutral-300 transition-colors">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9"/>
                        </svg>
                        Add Domain
                      </button>
                      <button @click="showChangeRequestForm = true" class="inline-flex items-center gap-2 shrink-0 bg-neutral-900 px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Request Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Onboarding Sections (if available) -->
            <div v-if="selectedWebsiteOnboarding" class="space-y-3">
              <!-- Business Information -->
              <section class="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
                <button @click="toggleWebsiteSection('business')" class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 transition-colors group">
                  <h2 class="text-base font-medium text-neutral-900">Business Information</h2>
                  <svg :class="['h-4 w-4 text-neutral-400 transition-transform group-hover:text-neutral-700', websiteExpandedSections.business ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.business" class="px-5 pb-5 border-t border-neutral-100">
                  <dl class="space-y-3 mt-4">
                    <div>
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Business Name</dt>
                      <dd class="text-sm text-neutral-900">{{ selectedWebsiteOnboarding.business_name || '—' }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Category</dt>
                      <dd class="text-sm text-neutral-900">{{ selectedWebsiteOnboarding.category || '—' }}</dd>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.description">
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Description</dt>
                      <dd class="text-sm text-neutral-900 leading-relaxed">{{ selectedWebsiteOnboarding.description }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Contact Information -->
              <section v-if="selectedWebsiteOnboarding.contact_info" class="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
                <button @click="toggleWebsiteSection('contact')" class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 transition-colors group">
                  <h2 class="text-base font-medium text-neutral-900">Contact Information</h2>
                  <svg :class="['h-4 w-4 text-neutral-400 transition-transform group-hover:text-neutral-700', websiteExpandedSections.contact ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.contact" class="px-5 pb-5 border-t border-neutral-100">
                  <dl class="space-y-3 mt-4">
                    <div>
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Email</dt>
                      <dd class="text-sm text-neutral-900">{{ selectedWebsiteOnboarding.contact_info.email || '—' }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Phone</dt>
                      <dd class="text-sm text-neutral-900">{{ selectedWebsiteOnboarding.contact_info.phone || '—' }}</dd>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.contact_info.preferred_contact_method">
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Preferred Contact</dt>
                      <dd class="text-sm text-neutral-900 capitalize">{{ selectedWebsiteOnboarding.contact_info.preferred_contact_method }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Services -->
              <section v-if="selectedWebsiteOnboarding.services" class="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
                <button @click="toggleWebsiteSection('services')" class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 transition-colors group">
                  <h2 class="text-base font-medium text-neutral-900">Services</h2>
                  <svg :class="['h-4 w-4 text-neutral-400 transition-transform group-hover:text-neutral-700', websiteExpandedSections.services ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.services" class="px-5 pb-5 border-t border-neutral-100">
                  <div v-if="selectedWebsiteOnboarding.services && selectedWebsiteOnboarding.services.length > 0" class="mt-4">
                    <div class="flex flex-wrap gap-2">
                      <span v-for="service in selectedWebsiteOnboarding.services" :key="service" class="inline-block px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded">
                        {{ service }}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Service Area -->
              <section v-if="selectedWebsiteOnboarding.service_area" class="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
                <button @click="toggleWebsiteSection('serviceArea')" class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 transition-colors group">
                  <h2 class="text-base font-medium text-neutral-900">Service Area</h2>
                  <svg :class="['h-4 w-4 text-neutral-400 transition-transform group-hover:text-neutral-700', websiteExpandedSections.serviceArea ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.serviceArea" class="px-5 pb-5 border-t border-neutral-100">
                  <dl class="space-y-3 mt-4">
                    <div>
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Primary Location</dt>
                      <dd class="text-sm text-neutral-900">{{ selectedWebsiteOnboarding.service_area.primary_location || '—' }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Coverage Type</dt>
                      <dd class="text-sm text-neutral-900 capitalize">{{ selectedWebsiteOnboarding.service_area.coverage_type || '—' }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Operation Details -->
              <section v-if="selectedWebsiteOnboarding.operation_details" class="rounded-2xl bg-[#e8e3d8] overflow-hidden">
                <button @click="toggleWebsiteSection('operations')" class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#ded9cc] transition-colors group">
                  <h2 class="text-base font-medium text-neutral-900">Operation Details</h2>
                  <svg :class="['h-4 w-4 text-neutral-400 transition-transform group-hover:text-neutral-700', websiteExpandedSections.operations ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.operations" class="px-5 pb-5 border-t border-neutral-100">
                  <dl class="space-y-3 mt-4">
                    <div>
                      <dt class="text-xs font-medium text-neutral-500 mb-1">On-Site Mode</dt>
                      <dd class="text-sm text-neutral-900 capitalize">{{ selectedWebsiteOnboarding.operation_details.on_site_mode || '—' }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Business Hours</dt>
                      <dd class="text-sm text-neutral-900 capitalize">{{ selectedWebsiteOnboarding.operation_details.business_hours || '—' }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Website Information -->
              <section v-if="selectedWebsiteOnboarding.website_info" class="rounded-2xl bg-[#e8e3d8] overflow-hidden">
                <button @click="toggleWebsiteSection('websiteInfo')" class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#ded9cc] transition-colors group">
                  <h2 class="text-base font-medium text-neutral-900">Website Information</h2>
                  <svg :class="['h-4 w-4 text-neutral-400 transition-transform group-hover:text-neutral-700', websiteExpandedSections.websiteInfo ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.websiteInfo" class="px-5 pb-5 border-t border-neutral-100">
                  <dl class="space-y-3 mt-4">
                    <div>
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Primary Goal</dt>
                      <dd class="text-sm text-neutral-900">{{ selectedWebsiteOnboarding.website_info.primary_goal || '—' }}</dd>
                    </div>
                    <div v-if="selectedWebsiteOnboarding.website_info.has_current_website !== undefined">
                      <dt class="text-xs font-medium text-neutral-500 mb-1">Has Current Website</dt>
                      <dd class="text-sm text-neutral-900">{{ selectedWebsiteOnboarding.website_info.has_current_website ? 'Yes' : 'No' }}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <!-- Logo & Assets -->
              <section class="rounded-2xl bg-[#e8e3d8] overflow-hidden">
                <button @click="toggleWebsiteSection('logoAssets')" class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#ded9cc] transition-colors group">
                  <h2 class="text-base font-medium text-neutral-900">Logo & Assets</h2>
                  <svg :class="['h-4 w-4 text-neutral-400 transition-transform group-hover:text-neutral-700', websiteExpandedSections.logoAssets ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-show="websiteExpandedSections.logoAssets" class="px-5 pb-5 border-t border-neutral-100">
                  <!-- Logo Section -->
                  <div class="mt-4 mb-4">
                    <h3 class="text-xs font-medium text-neutral-500 mb-2">Logo</h3>
                    <div v-if="selectedWebsite?.uploaded_logo" class="border border-neutral-200 bg-neutral-50 p-3">
                      <div class="flex items-center gap-3">
                        <div class="flex-shrink-0 h-16 w-16 border border-neutral-200 bg-white p-1.5 flex items-center justify-center overflow-hidden">
                          <img :src="selectedWebsite.uploaded_logo" alt="Logo" class="max-h-full max-w-full object-contain" />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-xs font-medium text-neutral-900">Current Logo</p>
                          <a :href="selectedWebsite.uploaded_logo" target="_blank" class="text-xs text-neutral-600 hover:text-neutral-900 underline">View</a>
                        </div>
                        <button @click="deleteLogo" :disabled="deletingLogo" class="px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors disabled:opacity-50">
                          {{ deletingLogo ? 'Deleting...' : 'Delete' }}
                        </button>
                      </div>
                    </div>
                    <div v-else class="border-2 border-dashed border-neutral-300 bg-neutral-50 p-4">
                      <input ref="logoInput" type="file" accept="image/*" @change="handleLogoUpload" class="hidden" />
                      <div class="text-center">
                        <svg class="h-8 w-8 text-neutral-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <p class="text-xs text-neutral-600 mb-2">No logo uploaded</p>
                        <button @click="$refs.logoInput.click()" :disabled="uploadingLogo" class="bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors disabled:opacity-50">
                          {{ uploadingLogo ? 'Uploading...' : 'Upload Logo' }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Assets Section -->
                  <div>
                    <h3 class="text-xs font-medium text-neutral-500 mb-2">Additional Assets</h3>
                    <div v-if="selectedWebsite?.uploaded_assets?.length" class="space-y-2 mb-3">
                      <div v-for="(asset, index) in selectedWebsite.uploaded_assets" :key="index" class="border border-neutral-200 bg-neutral-50 p-2 flex items-center gap-2">
                        <svg class="h-4 w-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        <div class="flex-1 min-w-0">
                          <p class="text-xs font-medium text-neutral-900 truncate">{{ asset.name }}</p>
                          <p class="text-xs text-neutral-600">{{ formatFileSize(asset.size) }}</p>
                        </div>
                        <a :href="asset.url" target="_blank" class="px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 border border-neutral-200 transition-colors">
                          Download
                        </a>
                        <button @click="deleteAsset(index)" :disabled="deletingAsset === index" class="px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors disabled:opacity-50">
                          {{ deletingAsset === index ? 'Deleting...' : 'Delete' }}
                        </button>
                      </div>
                    </div>
                    <div class="border-2 border-dashed border-neutral-300 bg-neutral-50 p-4">
                      <input ref="assetsInput" type="file" multiple accept="image/*,.pdf,.doc,.docx" @change="handleAssetsUpload" class="hidden" />
                      <div class="text-center">
                        <svg class="h-8 w-8 text-neutral-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                        <p class="text-xs text-neutral-600 mb-2">Upload assets (images, PDFs, documents)</p>
                        <button @click="$refs.assetsInput.click()" :disabled="uploadingAssets" class="bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors disabled:opacity-50">
                          {{ uploadingAssets ? 'Uploading...' : 'Upload Assets' }}
                        </button>
                      </div>
                    </div>
                  </div>
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

      <!-- Onboarding Required Banner (shows on all tabs) -->
      <div v-if="!selectedWebsiteId && showOnboardingRequired && pendingPlan && !isOnboardingPage" class="mb-6 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div class="flex flex-col md:flex-row items-start justify-between gap-6">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <div class="h-14 w-14 rounded-xl border border-[#d97759]/20 bg-[#d97759]/10 flex items-center justify-center">
                <svg class="h-7 w-7 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-medium text-neutral-900 mb-2">Complete Onboarding for Your New {{ pendingPlan.product_type === 'website' ? 'Website' : pendingPlan.product_type === 'marketing' ? 'Marketing' : 'AI Agent' }}</h3>
              <p class="text-base text-neutral-600 max-w-2xl mb-4">
                You've selected the <span class="font-medium text-neutral-900 capitalize">{{ pendingPlan.plan_tier }}</span> plan 
                (<span class="font-medium">${{ pendingPlan.price_monthly }}/month</span>). 
                Complete the onboarding process to provide us with your business details and preferences so we can get started.
              </p>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-700">
                <svg class="h-4 w-4 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Takes about 10 minutes
              </div>
            </div>
          </div>
          <NuxtLink
            to="/onboarding"
            class="flex-shrink-0 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-8 py-3 text-base font-medium text-white hover:bg-neutral-800 transition-all shadow-sm"
          >
            Start Onboarding
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Overview Tab -->
      <div v-else-if="!selectedWebsiteId && activeTab === 'overview'" class="space-y-6">
        <!-- Welcome Section -->
        <div class="mb-12">
          <h1 class="text-4xl font-medium text-neutral-900 mb-2">Welcome back</h1>
          <p class="text-base text-neutral-600">Manage your websites, domains, and grow your online presence</p>
        </div>

        <!-- Summary Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Websites Stats Card -->
          <NuxtLink 
            to="/dashboard?tab=websites"
            @click="activeTab = 'websites'"
            class="group relative overflow-hidden bg-white border border-neutral-200 rounded-xl p-6 hover:border-neutral-300 hover:shadow-md transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10">
                <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="text-3xl font-semibold text-neutral-900 mb-1">{{ filteredProjects.length }}</div>
            <div class="text-sm font-medium text-neutral-600">Active Websites</div>
          </NuxtLink>

          <!-- Domains Stats Card -->
          <NuxtLink 
            to="/dashboard?tab=domains"
            @click="activeTab = 'domains'"
            class="group relative overflow-hidden bg-white border border-neutral-200 rounded-xl p-6 hover:border-neutral-300 hover:shadow-md transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10">
                <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9"/>
                </svg>
              </div>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="text-3xl font-semibold text-neutral-900 mb-1">0</div>
            <div class="text-sm font-medium text-neutral-600">Registered Domains</div>
          </NuxtLink>

          <!-- Leads Stats Card -->
          <div class="group relative overflow-hidden bg-white border border-neutral-200 rounded-xl p-6 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer">
            <div class="flex items-center justify-between mb-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10">
                <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="text-3xl font-semibold text-neutral-900 mb-1">{{ filteredLeads.length }}</div>
            <div class="text-sm font-medium text-neutral-600">Total Leads</div>
          </div>
        </div>

        <!-- Leads Section -->
        <div class="mt-12">
          <h2 class="text-xl font-semibold text-neutral-900 mb-6">Leads</h2>

          <!-- Filters and Actions -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <div class="relative">
              <select v-model="leadsFilter" class="h-10 w-full sm:w-auto min-w-[140px] rounded-lg border border-neutral-200 bg-white px-3 pr-9 text-sm text-neutral-700 focus:border-neutral-300 focus:ring-1 focus:ring-[#d97759] focus:outline-none transition-all appearance-none">
                <option value="all">All Leads</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
              </select>
              <svg class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>

            <div class="relative">
              <select v-model="leadsSource" class="h-10 w-full sm:w-auto min-w-[140px] rounded-lg border border-neutral-200 bg-white px-3 pr-9 text-sm text-neutral-700 focus:border-neutral-300 focus:ring-1 focus:ring-[#d97759] focus:outline-none transition-all appearance-none">
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social</option>
                <option value="email">Email</option>
              </select>
              <svg class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>

            <div class="relative flex-1">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                v-model="leadsSearch"
                type="text"
                placeholder="Search leads..."
                class="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-neutral-300 focus:ring-1 focus:ring-[#d97759] focus:outline-none transition-all"
              />
            </div>

            <button class="inline-flex items-center justify-center gap-2 rounded-lg px-4 h-10 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors flex-shrink-0">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Add Lead
            </button>
          </div>

          <!-- Leads Table -->
          <div class="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-white border-b border-neutral-200">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Email</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Source</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Status</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Date</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-200">
                  <tr v-if="filteredLeads.length === 0">
                    <td colspan="6" class="px-4 py-12 text-center text-sm text-neutral-500">
                      No leads found
                    </td>
                  </tr>
                  <tr v-for="lead in filteredLeads" :key="lead.id" class="hover:bg-white transition-colors">
                    <td class="px-4 py-3 text-sm font-medium text-neutral-900">{{ lead.name }}</td>
                    <td class="px-4 py-3 text-sm text-neutral-600">{{ lead.email }}</td>
                    <td class="px-4 py-3 text-sm text-neutral-600 capitalize">{{ lead.source }}</td>
                    <td class="px-4 py-3">
                      <span :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'qualified' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      ]">
                        {{ lead.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm text-neutral-600">{{ lead.date }}</td>
                    <td class="px-4 py-3 text-right">
                      <button class="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Websites Tab -->
      <div v-else-if="!selectedWebsiteId && activeTab === 'websites'" class="space-y-6">
        <!-- Search and Actions Bar -->
        <div class="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div class="relative flex-1">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search websites..."
              :disabled="showOnboardingRequired"
              :class="[
                'h-11 w-full rounded-lg border border-neutral-200 pl-11 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#d97759] focus:outline-none transition-all',
                showOnboardingRequired ? 'bg-neutral-100 cursor-not-allowed opacity-60' : 'bg-white'
              ]"
            />
          </div>

          <div class="flex items-center gap-3">
            <!-- View Toggle -->
            <div class="inline-flex items-center rounded-lg border border-neutral-200 bg-white p-1">
              <button
                @click="!showOnboardingRequired && (viewMode = 'grid')"
                :disabled="showOnboardingRequired"
                :class="[
                  'p-2 rounded-md transition-all',
                  showOnboardingRequired ? 'opacity-50 cursor-not-allowed' : '',
                  viewMode === 'grid'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                ]"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>

              <button
                @click="!showOnboardingRequired && (viewMode = 'list')"
                :disabled="showOnboardingRequired"
                :class="[
                  'p-2 rounded-md transition-all',
                  showOnboardingRequired ? 'opacity-50 cursor-not-allowed' : '',
                  viewMode === 'list'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                ]"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>

            <!-- Add New Button -->
            <button 
              @click="showAddNewModal = true"
              :disabled="showOnboardingRequired"
              :class="[
                'inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all',
                showOnboardingRequired 
                  ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed' 
                  : 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 shadow-sm hover:shadow'
              ]"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Add New
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-16">
          <div class="text-center">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-600 border-r-transparent"></div>
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
          <button @click="fetchWebsites" class="bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
            Try Again
          </button>
        </div>

        <!-- Projects Grid/List -->
        <div v-else-if="viewMode === 'grid'" :class="['grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', showOnboardingRequired ? 'relative' : '']">
          <!-- Disabled Overlay -->
          <div v-if="showOnboardingRequired" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10"></div>
          
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            @click="!showOnboardingRequired && openWebsiteDetails(project.id)"
            :class="[
              'group relative overflow-hidden bg-white rounded-2xl border border-neutral-300 transition-all',
              showOnboardingRequired 
                ? 'cursor-not-allowed opacity-60' 
                : 'hover:bg-[#f9f8f6] cursor-pointer'
            ]"
          >
            
            <div class="p-6">
              <!-- Header -->
              <div class="flex items-start gap-3 mb-4">
                <div class="h-10 w-10 rounded-lg bg-[#d97759]/10 flex items-center justify-center flex-shrink-0">
                  <svg class="h-5 w-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-base font-semibold text-neutral-900 mb-0.5">{{ project.name }}</h3>
                  <p class="text-xs text-neutral-500 mb-2">{{ project.domain }}</p>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="flex items-center gap-1.5">
                      <span :class="[
                        'h-2 w-2 rounded-full',
                        project.status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-500'
                      ]"></span>
                      <span class="text-xs text-neutral-600">{{ project.status }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Footer Info -->
              <div class="flex items-center justify-between pt-3 border-t border-neutral-200">
                <div class="flex items-center gap-1.5 text-xs text-neutral-500">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ project.lastDeployed }}</span>
                </div>
                <div class="text-xs font-medium text-neutral-600 group-hover:text-[#d97759] transition-colors">
                  View details
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else-if="viewMode === 'list'" :class="['relative']">
          <div v-if="showOnboardingRequired" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10"></div>
          <div class="overflow-hidden  border border-neutral-200 bg-white">
            <div class="hidden md:grid grid-cols-[1.5fr,1.2fr,0.9fr,0.8fr,0.8fr] gap-4 px-5 py-3 text-xs font-medium text-neutral-500 border-b border-neutral-200">
              <div>Project</div>
              <div>Domain</div>
              <div>Plan</div>
              <div>Status</div>
              <div>Updated</div>
            </div>

            <div
              v-for="project in filteredProjects"
              :key="project.id"
              @click="!showOnboardingRequired && openWebsiteDetails(project.id)"
              :class="[
                'grid grid-cols-1 md:grid-cols-[1.5fr,1.2fr,0.9fr,0.8fr,0.8fr] gap-4 px-5 py-4 border-b border-neutral-100 last:border-0 transition-colors',
                showOnboardingRequired
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:bg-white cursor-pointer'
              ]"
            >
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-lg border border-neutral-200 flex items-center justify-center flex-shrink-0">
                  <svg class="h-4 w-4 text-neutral-900/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-neutral-900">{{ project.name }}</div>
                  <div class="mt-0.5 text-xs text-neutral-500 md:hidden truncate">{{ project.domain }}</div>
                </div>
              </div>

              <div class="hidden md:block self-center text-sm text-neutral-700 truncate">{{ project.domain }}</div>

              <div class="hidden md:flex self-center">
                <span v-if="project.plan_tier" class="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-700 capitalize">
                  {{ project.plan_tier }}
                </span>
                <span v-else class="text-sm text-neutral-400">—</span>
              </div>

              <div class="hidden md:flex items-center gap-2 self-center">
                <span :class="[
                  'h-1.5 w-1.5 rounded-full',
                  project.status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-500'
                ]"></span>
                <span :class="[
                  'text-sm font-medium',
                  project.status === 'Ready' ? 'text-emerald-600' : 'text-amber-600'
                ]">{{ project.status }}</span>
              </div>

              <div class="hidden md:block self-center text-sm text-neutral-700">{{ project.lastDeployed }}</div>
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
          <NuxtLink v-if="!searchQuery" to="/onboarding" class="border border-neutral-200 bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
            Create Website
          </NuxtLink>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-if="!selectedWebsiteId && activeTab === 'settings'">
        <!-- Mobile View -->
        <div class="md:hidden">
          <!-- Menu List (when no tab selected) -->
          <div v-if="!settingsMobileContentOpen" class="space-y-6">
            <div>
              <h1 class="text-3xl font-medium text-neutral-900 mb-6">Settings</h1>
              
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
                  class="w-full border border-neutral-200 bg-white pl-11 pr-4 py-3 text-base text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none "
                />
              </div>

              <!-- Menu Items -->
              <div class="space-y-2 border-t border-neutral-200 pt-4">
                <a
                  v-for="subTab in settingsTabs"
                  :key="subTab.id"
                  href="#"
                  @click.prevent="settingsActiveTab = subTab.id; settingsMobileContentOpen = true"
                  class="block rounded-xl border px-4 py-3 text-base font-medium transition-all shadow-sm"
                  :class="[
                    settingsActiveTab === subTab.id
                      ? 'bg-[#d97759]/5 text-[#d97759] border-[#d97759]/30'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300'
                  ]"
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
                  <h2 class="text-2xl font-medium text-neutral-900">Profile Settings</h2>
                  <p class="mt-1 text-sm text-neutral-600">Manage your personal information and account preferences</p>
                </div>

                <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="space-y-5">
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Company</label>
                      <input
                        type="text"
                        placeholder="Your Company"
                        class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                      />
                    </div>

                    <div class="pt-4 border-t border-neutral-200">
                      <button class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Billing Section -->
              <div v-if="settingsActiveTab === 'billing'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-medium text-neutral-900">Billing Settings</h2>
                  <p class="mt-1 text-sm text-neutral-600">Manage your subscription and payment methods</p>
                </div>

                <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-base font-semibold text-neutral-900 mb-4">Current Plan</h3>
                      <div class="flex items-center justify-between p-4 border border-neutral-200 bg-neutral-50">
                        <div>
                          <div class="text-sm font-semibold text-neutral-900">Hobby Plan</div>
                          <div class="text-xs text-neutral-600 mt-1">Free forever</div>
                        </div>
                        <button class=" border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors">
                          Upgrade
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 class="text-base font-semibold text-neutral-900 mb-4">Payment Method</h3>
                      <div class="p-4  border border-neutral-200">
                        <p class="text-sm text-neutral-600">No payment method on file</p>
                        <button class="mt-3 text-sm font-medium text-neutral-900 hover:text-neutral-700">
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
                  <h2 class="text-2xl font-medium text-neutral-900">Invoices</h2>
                  <p class="mt-1 text-sm text-neutral-600">View and download your billing invoices</p>
                </div>

                <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-neutral-900 mb-2">No invoices yet</h3>
                    <p class="text-sm text-neutral-600">Your invoices will appear here once you upgrade to a paid plan</p>
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
            <nav class="space-y-2">
              <a
                v-for="subTab in settingsTabs"
                :key="subTab.id"
                href="#"
                @click.prevent="settingsActiveTab = subTab.id"
                class="block pl-3 py-2 text-sm font-medium transition-colors border-l-2"
                :class="[
                  settingsActiveTab === subTab.id
                    ? 'text-neutral-900 border-[#d97759]'
                    : 'text-neutral-500 hover:text-neutral-700 border-transparent'
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
                <h2 class="text-2xl font-medium text-neutral-900">Profile Settings</h2>
                <p class="mt-1 text-sm text-neutral-600">Manage your personal information and account preferences</p>
              </div>

              <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Company</label>
                    <input
                      type="text"
                      placeholder="Your Company"
                      class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>

                  <div class="pt-4 border-t border-neutral-200">
                    <button class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-sm">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              <p class="text-sm text-secondary">Your invoices will appear here once you upgrade to a paid plan</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Support Tab -->
      <div v-if="!selectedWebsiteId && activeTab === 'support'">
        <!-- Mobile View -->
        <div class="md:hidden">
          <!-- Menu List (when no tab selected) -->
          <div v-if="!supportMobileContentOpen" class="space-y-6">
            <div>
              <h1 class="text-3xl font-medium text-neutral-900 mb-6">Support</h1>
              
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
                  class="w-full border border-neutral-200 bg-white pl-11 pr-4 py-3 text-base text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none "
                />
              </div>

              <!-- Menu Items -->
              <div class="space-y-2 border-t border-neutral-200 pt-4">
                <a
                  v-for="subTab in supportTabs"
                  :key="subTab.id"
                  href="#"
                  @click.prevent="supportActiveTab = subTab.id; supportMobileContentOpen = true"
                  class="block rounded-xl border px-4 py-3 text-base font-medium transition-all shadow-sm"
                  :class="[
                    supportActiveTab === subTab.id
                      ? 'bg-[#d97759]/5 text-[#d97759] border-[#d97759]/30'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300'
                  ]"
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
                  <h2 class="text-2xl font-medium text-neutral-900">Chat Support</h2>
                  <p class="mt-1 text-sm text-neutral-600">Get instant help from our support team</p>
                </div>

                <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-neutral-900 mb-2">Chat support coming soon</h3>
                    <p class="text-sm text-neutral-600">We're working on bringing you real-time chat support</p>
                  </div>
                </div>
              </div>

              <!-- Helpful Docs Section -->
              <div v-if="supportActiveTab === 'docs'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-medium text-neutral-900">Helpful Docs</h2>
                  <p class="mt-1 text-sm text-neutral-600">Browse our documentation and guides</p>
                </div>

                <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <h3 class="text-base font-semibold text-neutral-900 mb-2">Documentation coming soon</h3>
                    <p class="text-sm text-neutral-600">We're preparing comprehensive guides for you</p>
                  </div>
                </div>
              </div>

              <!-- Technical/Bugs Section -->
              <div v-if="supportActiveTab === 'bugs'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-medium text-neutral-900">Technical/Bugs</h2>
                  <p class="mt-1 text-sm text-neutral-600">Report technical issues and bugs</p>
                </div>

                <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-neutral-900 mb-2">Bug reporting coming soon</h3>
                    <p class="text-sm text-neutral-600">We're setting up our bug tracking system</p>
                  </div>
                </div>
              </div>

              <!-- Contact Us Section -->
              <div v-if="supportActiveTab === 'contact'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-medium text-neutral-900">Contact Us</h2>
                  <p class="mt-1 text-sm text-neutral-600">Get in touch with our team</p>
                </div>

                <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="space-y-5">
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Subject</label>
                      <input
                        type="text"
                        placeholder="How can we help?"
                        class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Message</label>
                      <textarea
                        rows="5"
                        placeholder="Tell us more..."
                        class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                      ></textarea>
                    </div>

                    <div class="pt-4 border-t border-neutral-200">
                      <button class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-sm">
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
            <nav class="space-y-2">
              <a
                v-for="subTab in supportTabs"
                :key="subTab.id"
                href="#"
                @click.prevent="supportActiveTab = subTab.id"
                class="block pl-3 py-2 text-sm font-medium transition-colors border-l-2"
                :class="[
                  supportActiveTab === subTab.id
                    ? 'text-neutral-900 border-[#d97759]'
                    : 'text-neutral-500 hover:text-neutral-700 border-transparent'
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
                <h2 class="text-2xl font-medium text-neutral-900">Chat Support</h2>
                <p class="mt-1 text-sm text-neutral-600">Get instant help from our support team</p>
              </div>

              <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
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
                <h2 class="text-2xl font-medium text-neutral-900">Helpful Docs</h2>
                <p class="mt-1 text-sm text-neutral-600">Browse our documentation and guides</p>
              </div>

              <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
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
                <h2 class="text-2xl font-medium text-neutral-900">Technical/Bugs</h2>
                <p class="mt-1 text-sm text-neutral-600">Report technical issues and bugs</p>
              </div>

              <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
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
                <h2 class="text-2xl font-medium text-neutral-900">Contact Us</h2>
                <p class="mt-1 text-sm text-neutral-600">Get in touch with our team</p>
              </div>

              <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Message</label>
                    <textarea
                      rows="5"
                      placeholder="Tell us more..."
                      class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    ></textarea>
                  </div>

                  <div class="pt-4 border-t border-neutral-200">
                    <button class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-sm">
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
      <div v-if="!selectedWebsiteId && activeTab === 'domains'">
        <!-- Mobile View -->
        <div class="md:hidden">
          <!-- Menu List (when no tab selected) -->
          <div v-if="!domainsMobileContentOpen" class="space-y-6">
            <div>
              <h1 class="text-3xl font-medium text-neutral-900 mb-6">Domains</h1>
              
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
                  class="w-full rounded-lg border border-neutral-200 bg-white pl-11 pr-4 py-3 text-base text-neutral-900 placeholder-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#d97759] focus:outline-none transition-all"
                />
              </div>

              <!-- Menu Items -->
              <div class="space-y-2 border-t border-neutral-200 pt-4">
                <a
                  v-for="subTab in domainsTabs"
                  :key="subTab.id"
                  href="#"
                  @click.prevent="domainsActiveTab = subTab.id; domainsMobileContentOpen = true"
                  class="block rounded-xl border px-4 py-3 text-base font-medium transition-all shadow-sm"
                  :class="[
                    domainsActiveTab === subTab.id
                      ? 'bg-[#d97759]/5 text-[#d97759] border-[#d97759]/30'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300'
                  ]"
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
                <div class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <h2 class="text-2xl font-medium text-neutral-900">Purchased Domains</h2>
                      <p class="mt-2 text-base text-neutral-600">Manage your registered domain names</p>
                    </div>
                    <button 
                      @click="loadMyDomains" 
                      class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      Refresh
                    </button>
                  </div>
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
                      class="rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-sm"
                    >
                      Buy Your First Domain
                    </button>
                  </div>
                  <div v-else class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead class="bg-neutral-50 text-neutral-700">
                        <tr>
                          <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Domain</th>
                          <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Status</th>
                          <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Price</th>
                          <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Purchased</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-neutral-200">
                        <tr v-for="domain in myDomains" :key="domain.id" class="hover:bg-white transition-colors">
                          <td class="px-4 py-3 text-neutral-900 font-medium">{{ domain.domain }}</td>
                          <td class="px-4 py-3">
                            <span v-if="domain.status" :class="[
                              'inline-flex items-center px-2.5 py-0.5 text-xs border',
                              domain.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              domain.status === 'failed' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                              'bg-neutral-100 text-neutral-700 border-neutral-200'
                            ]">
                              {{ domain.status }}
                            </span>
                            <span v-else class="inline-flex items-center px-2.5 py-0.5 text-xs border border-neutral-200 bg-neutral-100 text-neutral-700">—</span>
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
                  <h2 class="text-2xl font-medium text-neutral-900 mb-2">Buy New Domain</h2>
                  <p class="text-sm text-neutral-600">Search and register a new domain name</p>
                </div>

                <!-- Search Domain -->
                <div class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="pl-6">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-neutral-900 mb-2">Keyword / Brand</label>
                      <div class="flex flex-col sm:flex-row gap-2">
                        <input
                          v-model="domainSearchQuery"
                          type="text"
                          placeholder="acme, mybrand, etc"
                          class="w-full sm:flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
                          @keyup.enter="handleDomainSearch"
                        />
                        <button 
                          @click="handleDomainSearch" 
                          :disabled="domainSearchLoading"
                          class="w-full sm:w-auto rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors shadow-sm"
                          :class="domainSearchLoading ? 'bg-neutral-300 cursor-not-allowed' : 'bg-neutral-900 hover:bg-neutral-800 hover:shadow'"
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
                          <thead class="bg-neutral-50/50 text-neutral-700">
                            <tr>
                              <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Domain</th>
                              <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Status</th>
                              <th class="px-4 py-3"></th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-neutral-200">
                            <tr 
                              v-for="suggestion in domainSuggestions" 
                              :key="suggestion.name"
                              class="hover:bg-neutral-50"
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
                              <td class="px-4 py-3 text-right">
                                <button 
                                  @click="selectDomain(suggestion.name)"
                                  class="inline-flex items-center gap-2 border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                                >
                                  Select
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                    <div v-if="!purchaseMode" class="pt-2 border-t border-neutral-200">
                      <p class="text-xs text-secondary">Popular extensions: .com, .net, .org, .io, .app</p>
                    </div>
                  </div>
                </div>

                <!-- Selected Domain -->
                <div v-if="purchaseMode" class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="pl-6">
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
                </div>

                <!-- Registrant Information -->
                <div v-if="purchaseMode" class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="pl-6">
                  <h3 class="text-lg font-medium text-neutral-900 mb-4">Registrant information</h3>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Country</label>
                      <input v-model="registrant.country" type="text" placeholder="US" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Organization (optional)</label>
                      <input v-model="registrant.organization" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">First name</label>
                      <input v-model="registrant.firstName" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Last name</label>
                      <input v-model="registrant.lastName" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Address line 1</label>
                      <input v-model="registrant.address1" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Address line 2 (optional)</label>
                      <input v-model="registrant.address2" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">City</label>
                      <input v-model="registrant.city" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">State / Province</label>
                      <input v-model="registrant.state" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Postal code</label>
                      <input v-model="registrant.postalCode" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Phone</label>
                      <input v-model="registrant.phone" type="tel" placeholder="+1.4158551452" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-800 mb-2">Email</label>
                      <input v-model="registrant.email" type="email" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                    </div>
                    <div class="sm:col-span-2">
                      <label class="inline-flex items-center gap-2 text-sm text-neutral-800 cursor-pointer">
                        <input v-model="registrant.autoRenew" type="checkbox" class="border-neutral-300 text-neutral-600 focus:ring-0" />
                        Auto-renew
                      </label>
                    </div>
                  </div>

                  <div class="mt-6 flex flex-col gap-3">
                    <button 
                      @click="handleDomainPurchase" 
                      :disabled="purchaseLoading"
                      class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-all shadow-sm"
                      :class="purchaseLoading ? 'bg-neutral-300 cursor-not-allowed' : 'bg-neutral-900 hover:bg-neutral-800 hover:shadow'"
                    >
                      {{ purchaseLoading ? 'Purchasing...' : formatPriceLabel(domainPrice) }}
                    </button>
                    <span v-if="purchaseError" class="text-sm text-red-600 text-center">{{ purchaseError }}</span>
                    <span v-if="purchaseSuccess" class="text-sm text-emerald-700 text-center">{{ purchaseSuccess }}</span>
                  </div>
                  </div>
                </div>
              </div>

              <!-- DNS & Configurations Section -->
              <div v-if="domainsActiveTab === 'dns'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-medium text-neutral-900 mb-2">DNS & Configurations</h2>
                  <p class="text-sm text-neutral-600">Manage DNS records and domain settings</p>
                </div>

                <div class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div class="pl-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-neutral-900 mb-2">No domains to configure</h3>
                    <p class="text-sm text-secondary">Purchase a domain to manage DNS settings</p>
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
          <aside class="md:w-56 shrink-0">
            <nav class="space-y-2">
              <a
                v-for="subTab in domainsTabs"
                :key="subTab.id"
                href="#"
                @click.prevent="domainsActiveTab = subTab.id"
                class="block pl-3 py-2 text-sm font-medium transition-colors border-l-2"
                :class="[
                  domainsActiveTab === subTab.id
                    ? 'text-neutral-900 border-[#d97759]'
                    : 'text-neutral-500 hover:text-neutral-700 border-transparent'
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
                  <h2 class="text-2xl font-medium text-neutral-900">Purchased Domains</h2>
                  <p class="mt-1 text-sm text-neutral-600">Manage your registered domain names</p>
                </div>
                <button 
                  @click="loadMyDomains" 
                  class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Refresh
                </button>
              </div>

              <div class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div v-if="myDomainsLoading" class="text-sm text-neutral-600">Loading...</div>
                <div v-else-if="myDomainsError" class="text-sm text-red-600">{{ myDomainsError }}</div>
                <div v-else-if="myDomains.length === 0" class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                  <h3 class="text-base font-semibold text-neutral-900 mb-2">No domains yet</h3>
                  <p class="text-sm text-neutral-600 mb-4">You haven't purchased any domains yet</p>
                  <button 
                    @click="domainsActiveTab = 'buy'" 
                    class="rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    Buy Your First Domain
                  </button>
                </div>
                <div v-else class="overflow-hidden rounded-lg border border-neutral-200">
                  <table class="w-full text-sm">
                    <thead class="bg-white text-neutral-700">
                      <tr>
                        <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Domain</th>
                        <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Status</th>
                        <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Price</th>
                        <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Purchased</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-200">
                      <tr v-for="domain in myDomains" :key="domain.id" class="hover:bg-white transition-colors">
                        <td class="px-4 py-3 text-neutral-900 font-medium">{{ domain.domain }}</td>
                        <td class="px-4 py-3">
                          <span v-if="domain.status" :class="[
                            'inline-flex items-center px-2.5 py-0.5 text-xs border',
                            domain.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            domain.status === 'failed' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            'bg-neutral-100 text-neutral-700 border-neutral-200'
                          ]">
                            {{ domain.status }}
                          </span>
                          <span v-else class="inline-flex items-center border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-700">—</span>
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
                <h2 class="text-2xl font-bold text-neutral-900">Buy New Domain</h2>
                <div class="pl-6 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-neutral-900 mb-2">Keyword / Brand</label>
                    <div class="flex flex-col sm:flex-row gap-2">
                      <input
                        v-model="domainSearchQuery"
                        type="text"
                        placeholder="acme, mybrand, etc"
                        class="w-full sm:flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
                        @keyup.enter="handleDomainSearch"
                      />
                      <button 
                        @click="handleDomainSearch" 
                        :disabled="domainSearchLoading"
                        class="w-full sm:w-auto rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors shadow-sm"
                        :class="domainSearchLoading ? 'bg-neutral-300 cursor-not-allowed' : 'bg-neutral-900 hover:bg-neutral-800 hover:shadow'"
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
                        <thead class="bg-neutral-50/50 text-neutral-700">
                          <tr>
                            <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Domain</th>
                            <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Availability</th>
                            <th class="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">Price</th>
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
                              <span v-if="suggestion.available === null" class="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-700">Unknown</span>
                              <span v-else-if="suggestion.available" class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700">Available</span>
                              <span v-else class="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs text-rose-700">Taken</span>
                            </td>
                            <td class="px-4 py-3 text-neutral-800">{{ suggestion.price != null ? `$${suggestion.price}` : '—' }}</td>
                            <td class="px-4 py-3 text-right">
                              <button
                                @click.stop="selectDomain(suggestion.name)"
                                class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- Popular extensions chips -->
                  <div v-if="!purchaseMode" class="pt-2 border-t border-neutral-200">
                    <div class="flex flex-wrap gap-2 items-center text-xs">
                      <span class="text-neutral-500 mr-1">Popular extensions:</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700">.com</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700">.net</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700">.org</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700">.io</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700">.app</span>
                    </div>
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
                    <input v-model="registrant.country" type="text" placeholder="US" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Organization (optional)</label>
                    <input v-model="registrant.organization" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">First name</label>
                    <input v-model="registrant.firstName" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Last name</label>
                    <input v-model="registrant.lastName" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Address line 1</label>
                    <input v-model="registrant.address1" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Address line 2 (optional)</label>
                    <input v-model="registrant.address2" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">City</label>
                    <input v-model="registrant.city" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">State / Province</label>
                    <input v-model="registrant.state" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Postal code</label>
                    <input v-model="registrant.postalCode" type="text" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Phone</label>
                    <input v-model="registrant.phone" type="tel" placeholder="+1.4158551452" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-800 mb-2">Email</label>
                    <input v-model="registrant.email" type="email" class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="inline-flex items-center gap-2 text-sm text-neutral-800 cursor-pointer">
                      <input v-model="registrant.autoRenew" type="checkbox" class="rounded border-neutral-300 text-neutral-600 focus:ring-0" />
                      Auto-renew
                    </label>
                  </div>
                </div>

                <div class="mt-6 flex items-center gap-4">
                  <button 
                    @click="handleDomainPurchase" 
                    :disabled="purchaseLoading"
                    class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-colors"
                    :class="purchaseLoading ? 'bg-neutral-300 cursor-not-allowed' : 'bg-neutral-900 hover:bg-neutral-800'"
                  >
                    {{ purchaseLoading ? 'Purchasing...' : formatPriceLabel(domainPrice) }}
                  </button>
                  <span v-if="purchaseError" class="text-sm text-red-600">{{ purchaseError }}</span>
                  <span v-if="purchaseSuccess" class="text-sm text-emerald-700">{{ purchaseSuccess }}</span>
                </div>
              </div>
            </div>

            <!-- DNS & Configurations Section -->
            <div v-if="domainsActiveTab === 'dns'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-medium text-neutral-900 mb-2">DNS & Configurations</h2>
                <p class="text-sm text-neutral-600">Manage DNS records and domain settings</p>
              </div>

              <div class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div class="pl-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-neutral-900 mb-2">No domains to configure</h3>
                    <p class="text-sm text-neutral-600 mb-4">Purchase a domain to manage DNS settings</p>
                    <button @click="domainsActiveTab = 'buy'" class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-sm">
                      Buy a domain
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Coming Soon Tabs (Branding, Marketing, AI Agents) -->
      <div v-if="activeTab === 'branding' || activeTab === 'marketing' || activeTab === 'ai-agents'" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center max-w-md px-4">
          <!-- Icon Container -->
          <div class="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#d97759]/10 border border-[#d97759]/20">
            <svg v-if="activeTab === 'branding'" class="h-8 w-8 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
            </svg>
            <svg v-else-if="activeTab === 'marketing'" class="h-8 w-8 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
            </svg>
            <svg v-else class="h-8 w-8 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
            </svg>
          </div>
          
          <!-- Title & Description -->
          <h2 class="text-3xl font-semibold text-neutral-900 mb-3">Coming Soon</h2>
          <p class="text-base text-neutral-600 mb-6">
            We're building {{ activeTab === 'ai-agents' ? 'AI Agents' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }}. Get notified when we launch!
          </p>
          
          <!-- Email Notification Form -->
          <div class="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2 text-left">Email address</label>
                <input
                  v-model="notifyEmail"
                  type="email"
                  placeholder="your@email.com"
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#d97759] focus:ring-2 focus:ring-[#d97759]/20 focus:outline-none transition-all"
                />
              </div>
              <button
                @click="handleNotifyMe"
                :disabled="notifyLoading"
                class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="!notifyLoading" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                {{ notifyLoading ? 'Submitting...' : 'Notify Me' }}
              </button>
              <p v-if="notifySuccess" class="text-sm text-green-600 text-center">{{ notifySuccess }}</p>
              <p v-if="notifyError" class="text-sm text-red-600 text-center">{{ notifyError }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Floating Action Button -->
    <button
      v-if="!selectedWebsiteId"
      @click="showAddNewModal = true"
      class="fixed bottom-6 right-6 z-40 group flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <!-- Collapsed state (icon only) -->
      <div class="flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
        <svg class="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
      </div>
      
      <!-- Expanded text (shows on hover on desktop) -->
      <span class="hidden md:block max-w-0 group-hover:max-w-xs opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden transition-all duration-300 text-sm font-medium pr-0 group-hover:pr-5">
        Add New Service
      </span>
    </button>

      <!-- Add New Modal -->
      <div v-if="showAddNewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" @click.self="hasProduct && (showAddNewModal = false)">
        <div class="bg-[#fefbf3] rounded-2xl border border-neutral-200 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <!-- Header -->
          <div class="sticky top-0 bg-[#fefbf3] border-b border-neutral-100 px-8 py-6 flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-semibold text-neutral-900">Create Your Website</h2>
              <p class="text-base text-neutral-600 mt-1">Choose the perfect plan to get started</p>
            </div>
            <button v-if="hasProduct" @click="showAddNewModal = false" class="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <svg class="h-5 w-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Plan Selection -->
          <div class="p-8">
            <div class="mb-8 text-center">
              <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d97759]/10 mb-4">
                <svg class="h-8 w-8 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <p class="text-sm text-neutral-600 max-w-2xl mx-auto">Professional websites with custom design, hosting, and ongoing support included</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-[#e8e3d8] hover:bg-[#ded9cc] rounded-2xl p-8 transition-all">
                <h4 class="text-xl font-medium text-neutral-900 mb-4">Starter</h4>
                <div class="mb-6"><span class="text-4xl font-medium text-neutral-900">$29</span><span class="text-lg text-neutral-600">/month</span></div>
                <ul class="space-y-3 mb-8 text-sm text-neutral-600">
                  <li class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-[#d97759] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    Up to 5 pages
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-[#d97759] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    Custom domain
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-[#d97759] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    SSL certificate
                  </li>
                </ul>
                <button @click="selectPlan('starter')" class="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">Select Starter</button>
              </div>
              <div class="relative bg-neutral-900 rounded-2xl p-8">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span class="px-3 py-1.5 rounded-full bg-[#d97759] text-white text-xs font-medium">Popular</span>
                </div>
                <h4 class="text-xl font-medium text-white mb-4">Professional</h4>
                <div class="mb-6"><span class="text-4xl font-medium text-white">$79</span><span class="text-lg text-neutral-300">/month</span></div>
                <ul class="space-y-3 mb-8 text-sm text-neutral-300">
                  <li class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-[#d97759] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    Up to 15 pages
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-[#d97759] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    Advanced SEO
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-[#d97759] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    E-commerce ready
                  </li>
                </ul>
                <button @click="selectPlan('professional')" class="w-full rounded-lg bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition-colors">Select Professional</button>
              </div>
              <div class="bg-[#e8e3d8] hover:bg-[#ded9cc] rounded-2xl p-8 transition-all">
                <h4 class="text-xl font-medium text-neutral-900 mb-4">Enterprise</h4>
                <div class="mb-6"><span class="text-4xl font-medium text-neutral-900">$199</span><span class="text-lg text-neutral-600">/month</span></div>
                <ul class="space-y-3 mb-8 text-sm text-neutral-600">
                  <li class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-[#d97759] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    Unlimited pages
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-[#d97759] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    Advanced analytics
                  </li>
                </ul>
                <button @click="selectPlan('enterprise')" class="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">Select Enterprise</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>

  <!-- Change Request Modal -->
  <Teleport to="body">
    <div v-if="showChangeRequestForm" class="fixed inset-0 z-[1000] overflow-y-auto">
      <div class="flex min-h-screen items-start md:items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 z-[1000] bg-neutral-900/50 backdrop-blur-sm transition-opacity" @click="showChangeRequestForm = false"></div>
        
        <!-- Modal -->
        <div class="relative z-[1001] w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-neutral-200 transform transition-all max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <div>
              <h2 class="text-xl font-bold text-neutral-900">Request Site Changes</h2>
              <p class="text-sm text-neutral-600 mt-1">Submit a change request for your website</p>
            </div>
            <button @click="showChangeRequestForm = false" class="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmitChangeRequest" class="p-6 space-y-5">
            <div>
              <label for="cr_title" class="block text-sm font-semibold text-neutral-900 mb-2">Request Title <span class="text-red-500">*</span></label>
              <input id="cr_title" v-model="changeRequestForm.title" type="text" required placeholder="e.g., Update homepage hero section" class="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all"/>
            </div>
            <div>
              <label for="cr_description" class="block text-sm font-semibold text-neutral-900 mb-2">Description <span class="text-red-500">*</span></label>
              <textarea id="cr_description" v-model="changeRequestForm.description" required rows="5" placeholder="Describe the changes you'd like to make..." class="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all resize-none"></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="relative">
                <label class="block text-sm font-semibold text-neutral-900 mb-2">Priority <span class="text-red-500">*</span></label>
                <button type="button" @click.stop="showPriorityMenu = !showPriorityMenu" :aria-expanded="showPriorityMenu ? 'true' : 'false'" class="w-full flex items-center justify-between rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 transition-all">
                  <span class="inline-flex items-center gap-2">
                    <span :class="['h-2.5 w-2.5 rounded-full', priorityDotClass(changeRequestForm.priority)]"></span>
                    <span class="capitalize">{{ changeRequestForm.priority }}</span>
                  </span>
                  <svg class="h-4 w-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div v-if="showPriorityMenu" @click.stop class="absolute z-50 top-full left-0 right-0 mt-1 rounded-lg border border-neutral-200 bg-white shadow-lg overflow-hidden">
                  <button v-for="opt in priorityOptions" :key="opt.value" type="button" @click.stop="selectPriority(opt.value)" :class="['w-full flex items-center justify-between px-4 py-2.5 text-sm text-neutral-900 hover:bg-neutral-50', changeRequestForm.priority === opt.value ? 'bg-neutral-50' : '']">
                    <span class="inline-flex items-center gap-2">
                      <span :class="['h-2.5 w-2.5 rounded-full', priorityDotClass(opt.value)]"></span>
                      <span class="capitalize">{{ opt.label }}</span>
                    </span>
                    <svg v-if="changeRequestForm.priority === opt.value" class="h-4 w-4 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label for="cr_screenshot" class="block text-sm font-semibold text-neutral-900 mb-2">Screenshot (Optional)</label>
                <input id="cr_screenshot" type="file" accept="image/*" @change="handleScreenshotChange" class="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all"/>
                <p v-if="screenshotFile" class="text-xs text-neutral-600 mt-1">Selected: {{ screenshotFile.name }} ({{ formatFileSize(screenshotFile.size) }})</p>
              </div>
            </div>
            <div class="rounded-lg bg-neutral-50 border border-neutral-200 p-4">
              <div class="flex items-start gap-3">
                <svg class="h-5 w-5 text-neutral-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-neutral-700">You can attach a screenshot image (optional).</p>
                  <p class="text-xs text-neutral-500 mt-1">Multiple file attachments coming soon. Include any extra URLs in the description.</p>
                </div>
              </div>
            </div>
            <div v-if="changeRequestError" class="rounded-lg bg-red-50 border border-red-200 p-4">
              <p class="text-sm text-red-700">{{ changeRequestError }}</p>
            </div>
            <div v-if="changeRequestSuccess" class="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
              <p class="text-sm text-emerald-700">{{ changeRequestSuccess }}</p>
            </div>
            <div class="flex items-center justify-end gap-3 pt-2">
              <button type="button" @click="showChangeRequestForm = false" class="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors" :disabled="submittingChangeRequest">Cancel</button>
              <button type="submit" class="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" :disabled="submittingChangeRequest">
                <svg v-if="submittingChangeRequest" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ submittingChangeRequest ? 'Submitting...' : 'Submit Request' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Dropdown Menu (Teleported to body) -->
  <Teleport to="body">
    <div 
      v-if="moreMenuOpen"
      ref="dropdownMenu"
      @mouseenter="openDropdown"
      @mouseleave="closeDropdown"
      :style="dropdownStyle"
      class="fixed bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-[99999]"
      style="width: 160px;"
    >
      <button 
        @click="activeTab = 'support'; moreMenuOpen = false"
        class="w-full text-left px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
      >
        Support
      </button>
      <button 
        @click="activeTab = 'settings'; moreMenuOpen = false"
        class="w-full text-left px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
      >
        Settings
      </button>
    </div>
  </Teleport>

  </template>

  <script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
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
  { id: 'support', label: 'Support' },
  { id: 'settings', label: 'Settings' }
]

const activeTab = ref('overview')
const mobileNavExpanded = ref(false)
const moreMenuOpen = ref(false)
const dropdownTrigger = ref(null)
const dropdownMenu = ref(null)
const dropdownStyle = ref({})
const dropdownCloseTimer = ref(null)
const viewMode = ref('grid')
const searchQuery = ref('')

// Dropdown functions
const openDropdown = () => {
  // Clear any pending close timer
  if (dropdownCloseTimer.value) {
    clearTimeout(dropdownCloseTimer.value)
    dropdownCloseTimer.value = null
  }
  
  moreMenuOpen.value = true
  if (dropdownTrigger.value) {
    const rect = dropdownTrigger.value.getBoundingClientRect()
    dropdownStyle.value = {
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`
    }
  }
}

const closeDropdown = () => {
  // Add delay before closing
  dropdownCloseTimer.value = setTimeout(() => {
    moreMenuOpen.value = false
  }, 150)
}

// Leads filters
const leadsFilter = ref('all')
const leadsSource = ref('all')
const leadsSearch = ref('')

// Coming Soon notification
const notifyEmail = ref('')
const notifyLoading = ref(false)
const notifySuccess = ref('')
const notifyError = ref('')

// Sample leads data
const leads = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', source: 'website', status: 'new', date: '2024-11-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', source: 'referral', status: 'contacted', date: '2024-10-30' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', source: 'social', status: 'qualified', date: '2024-10-28' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', source: 'email', status: 'converted', date: '2024-10-25' },
])

// Filtered leads computed property
const filteredLeads = computed(() => {
  return leads.value.filter(lead => {
    const matchesStatus = leadsFilter.value === 'all' || lead.status === leadsFilter.value
    const matchesSource = leadsSource.value === 'all' || lead.source === leadsSource.value
    const matchesSearch = leadsSearch.value === '' || 
      lead.name.toLowerCase().includes(leadsSearch.value.toLowerCase()) ||
      lead.email.toLowerCase().includes(leadsSearch.value.toLowerCase())
    
    return matchesStatus && matchesSource && matchesSearch
  })
})

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

const formatPriceLabel = (price) => {
  if (!price) return 'Purchase'
  const amount = Number(price.price)
  const currency = price.currency || 'USD'
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(isNaN(amount) ? Number(price.price) : amount)
  const period = price.period
  const periodStr = period ? ` / ${period} ${Number(period) === 1 ? 'yr' : 'yrs'}` : ''
  return `Purchase for ${formatted}${periodStr}`
}

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

// Change Request Modal state
const showChangeRequestForm = ref(false)
const changeRequestForm = ref({
  title: '',
  description: '',
  priority: 'medium'
})
const submittingChangeRequest = ref(false)
const changeRequestError = ref('')
const changeRequestSuccess = ref('')
const screenshotFile = ref(null)

const handleScreenshotChange = (event) => {
  const file = event?.target?.files?.[0]
  screenshotFile.value = file || null
}

// Priority dropdown state & helpers
const showPriorityMenu = ref(false)
const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
]
const priorityDotClass = (val) => {
  switch (val) {
    case 'low': return 'bg-neutral-300'
    case 'medium': return 'bg-amber-400'
    case 'high': return 'bg-orange-500'
    case 'urgent': return 'bg-red-600'
    default: return 'bg-neutral-300'
  }
}
const selectPriority = (val) => {
  changeRequestForm.value.priority = val
  showPriorityMenu.value = false
}

// Website expanded sections
const websiteExpandedSections = ref({
  business: false,
  contact: false,
  services: false,
  serviceArea: false,
  operations: false,
  websiteInfo: false,
  logoAssets: false
})

// File upload state
const logoInput = ref(null)
const assetsInput = ref(null)
const uploadingLogo = ref(false)
const uploadingAssets = ref(false)
const deletingLogo = ref(false)
const deletingAsset = ref(null)

// Onboarding state
const showOnboardingRequired = ref(false)
const checkingOnboarding = ref(true)
const pendingPlan = ref(null)

// Add New Modal state
const showAddNewModal = ref(false)
const addNewStep = ref('select') // 'select' or 'plan'
const selectedProduct = ref(null)
const selectedPlan = ref(null)

// Onboarding gate: require at least one product/website record
const hasProduct = computed(() => (websites.value?.length || 0) > 0)

// When data finishes loading and user has no products, force open the Add New modal
watch([loading, websites], ([isLoading]) => {
  if (!isLoading && !hasProduct.value) {
    showAddNewModal.value = true
    addNewStep.value = 'select'
  }
})

// Keep modal open until a product exists
watch(hasProduct, (val) => {
  if (!val) {
    showAddNewModal.value = true
    addNewStep.value = 'select'
  }
})

// Profile menu state
const showProfileMenu = ref(false)
const showMobileMenu = ref(false)
const userEmail = ref('')
const userInitial = computed(() => userEmail.value ? userEmail.value.charAt(0).toUpperCase() : 'U')

// Get user email
const loadUserEmail = async () => {
  const supabase = getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    userEmail.value = user.email || ''
  }
}

// Handle logout
const handleLogout = async () => {
  const supabase = getSupabaseClient()
  await supabase.auth.signOut()
  navigateTo('/login')
}

// Handle notify me for coming soon features
const handleNotifyMe = async () => {
  notifyError.value = ''
  notifySuccess.value = ''
  
  if (!notifyEmail.value) {
    notifyError.value = 'Please enter your email address'
    return
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(notifyEmail.value)) {
    notifyError.value = 'Please enter a valid email address'
    return
  }
  
  notifyLoading.value = true
  
  try {
    // TODO: Implement API call to save notification email
    // For now, just simulate success
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    notifySuccess.value = 'Thanks! We\'ll notify you when we launch.'
    notifyEmail.value = ''
  } catch (error) {
    notifyError.value = 'Something went wrong. Please try again.'
  } finally {
    notifyLoading.value = false
  }
}

// Close menus when clicking outside
if (process.client) {
  document.addEventListener('click', () => {
    showProfileMenu.value = false
    showMobileMenu.value = false
    showPriorityMenu.value = false
  })
}

// Check if on onboarding page
const route = useRoute()
const isOnboardingPage = computed(() => route.path === '/dashboard/onboarding')

// Watch for route changes back to dashboard
watch(() => route.path, (newPath, oldPath) => {
  if (newPath === '/dashboard' && oldPath === '/onboarding') {
    console.log('[Dashboard] Returned from onboarding, refreshing status')
    setTimeout(() => {
      checkOnboardingStatus()
      fetchWebsites()
    }, 500)
  }
})

// Fetch websites from API
const fetchWebsites = async () => {
  console.log('[Dashboard] fetchWebsites called')
  try {
    loading.value = true
    error.value = null
    
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    console.log('[Dashboard] Session:', session ? 'exists' : 'null')
    
    if (!session) {
      console.error('[Dashboard] No session found')
      error.value = 'Not authenticated'
      return
    }

    const response = await $fetch('/api/websites', {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })
    
    console.log('[Dashboard] API response:', response)
    console.log('[Dashboard] Websites received:', response.websites?.length || 0)
    
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
    lastDeployed: formatRelativeTime(w.updated_at || w.created_at),
    plan_tier: w.plans?.plan_tier || null
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
    // Find the website from the existing websites list
    const website = websites.value.find(w => w.id === websiteId)
    
    if (!website) {
      throw new Error('Website not found')
    }
    
    console.log('Website data:', website)
    
    // Transform onboarding data from flat structure to nested
    const onboardingData = {
      business_name: website.business_name,
      category: website.category,
      description: website.description,
      contact_info: {
        email: website.business_email,
        phone: website.business_phone,
        preferred_contact_method: website.contact_method
      },
      services: website.selected_services,
      service_area: website.service_areas ? {
        primary_location: website.service_areas[0],
        coverage_type: website.coverage_type
      } : null,
      operation_details: {
        on_site_mode: website.on_site_mode,
        business_hours: website.business_hours_mode
      },
      website_info: {
        primary_goal: website.primary_goal,
        has_current_website: website.has_current_website,
        current_website_url: website.current_website_url
      },
      design_preferences: {
        color_theme: website.color_theme,
        has_logo: website.has_logo,
        design_styles: website.design_styles
      },
      language: website.primary_language
    }
    
    selectedWebsite.value = website
    selectedWebsiteOnboarding.value = onboardingData
    
    console.log('Selected website:', selectedWebsite.value)
    console.log('Selected onboarding:', selectedWebsiteOnboarding.value)
  } catch (err) {
    console.error('Failed to load website details:', err)
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
      .select('has_completed_onboarding')
      .eq('user_id', user.id)
      .maybeSingle()

    if (profileError) {
      console.error('[Dashboard] Profile fetch error:', profileError)
      return
    }

    console.log('[Dashboard] User profile:', profile)

    // Check for pending plans that need onboarding
    const { data: pendingPlans, error: plansError } = await supabase
      .from('plans')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'pending_onboarding')
      .order('created_at', { ascending: false })

    if (plansError) {
      console.error('[Dashboard] Plans fetch error:', plansError)
    }

    console.log('[Dashboard] Pending plans:', pendingPlans)

    // More robust check: verify if onboarding was actually completed
    if (pendingPlans && pendingPlans.length > 0) {
      const plan = pendingPlans[0]
      
      // Check if this specific plan has an onboarding_submission_id
      if (plan.onboarding_submission_id) {
        console.log('[Dashboard] Plan has onboarding_submission_id, checking if it exists...')
        
        // Verify the submission exists
        const { data: submission, error: submissionError } = await supabase
          .from('onboarding_submissions')
          .select('id, status')
          .eq('id', plan.onboarding_submission_id)
          .single()

        if (!submissionError && submission) {
          console.log('[Dashboard] Onboarding submission found, auto-fixing plan status...')
          
          // Update the plan status to onboarding_completed
          const { error: updateError } = await supabase
            .from('plans')
            .update({ status: 'onboarding_completed' })
            .eq('id', plan.id)

          if (updateError) {
            console.error('[Dashboard] Failed to auto-fix plan status:', updateError)
            pendingPlan.value = plan
            showOnboardingRequired.value = true
          } else {
            console.log('[Dashboard] Successfully auto-fixed plan status')
            showOnboardingRequired.value = false
            pendingPlan.value = null
            // Refresh websites to show the new one
            await fetchWebsites()
          }
        } else {
          // Submission doesn't exist, show banner
          pendingPlan.value = plan
          showOnboardingRequired.value = true
          console.log('[Dashboard] Showing onboarding requirement for plan:', plan)
        }
      } else {
        // No onboarding submission linked yet, legitimately needs onboarding
        pendingPlan.value = plan
        showOnboardingRequired.value = true
        console.log('[Dashboard] Showing onboarding requirement for plan:', plan)
      }
    } else {
      showOnboardingRequired.value = false
      pendingPlan.value = null
      console.log('[Dashboard] No pending plans')
    }
  } catch (error) {
    console.error('[Dashboard] Check onboarding error:', error)
  } finally {
    checkingOnboarding.value = false
  }
}

// Watch for tab changes to load domains
watch(activeTab, (newTab) => {
  // Close website details if user navigates away from Websites tab
  if (selectedWebsiteId.value && newTab !== 'websites') {
    closeWebsiteDetails()
  }

  // Lazy-load domains data when entering Domains tab
  if (newTab === 'domains') {
    loadMyDomains()
  }
})

// Handle product selection in Add New modal
const selectProduct = (product) => {
  console.log('[Dashboard] selectProduct called with:', product)
  selectedProduct.value = product
  console.log('[Dashboard] selectedProduct set to:', selectedProduct.value)
  if (product === 'website') {
    addNewStep.value = 'plan'
    console.log('[Dashboard] addNewStep changed to:', addNewStep.value)
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

    // Create plan entry
    const { data: planData, error: planError } = await supabase
      .from('plans')
      .insert({
        user_id: user.id,
        product_type: 'website',
        plan_tier: plan,
        status: 'pending_onboarding',
        is_active: false,
        price_monthly: prices[plan]
      })
      .select()
      .single()

    if (planError) {
      console.error('[Dashboard] Error creating plan:', planError)
      return
    }

    console.log('[Dashboard] Plan created:', planData)
    
    // Create placeholder website record linked to the plan
    const { data: websiteData, error: websiteError } = await supabase
      .from('websites')
      .insert({
        user_id: user.id,
        plan_id: planData.id,
        name: 'New Website',
        slug: `website-${Date.now()}`,
        status: 'pending'
      })
      .select()
      .single()

    if (websiteError) {
      console.error('[Dashboard] Error creating placeholder website:', websiteError)
      // Don't return - plan is created, just log the error
    } else {
      console.log('[Dashboard] Placeholder website created:', websiteData)
      
      // Update plan with website_id for bidirectional link
      const { error: updateError } = await supabase
        .from('plans')
        .update({ website_id: websiteData.id })
        .eq('id', planData.id)
      
      if (updateError) {
        console.error('[Dashboard] Error linking plan to website:', updateError)
      } else {
        console.log('[Dashboard] Plan linked to website:', websiteData.id)
      }
    }
    
    // Close modal
    showAddNewModal.value = false
    
    // Reset modal state
    addNewStep.value = 'select'
    selectedProduct.value = null
    selectedPlan.value = null
    
    // Set the pending plan and show onboarding banner
    pendingPlan.value = planData
    showOnboardingRequired.value = true
    activeTab.value = 'overview'
    
    // Refresh onboarding status to show the banner
    await checkOnboardingStatus()
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
  console.log('[Dashboard] Component mounted')
  console.log('[Dashboard] Initial state - loading:', loading.value, 'error:', error.value, 'checkingOnboarding:', checkingOnboarding.value)
  loadUserEmail()
  checkOnboardingStatus()
  fetchWebsites()
  
  // Debug: Log state after a delay
  setTimeout(() => {
    console.log('[Dashboard] After mount - loading:', loading.value, 'error:', error.value, 'websites:', websites.value.length)
  }, 2000)
  
  // Re-check onboarding status when page becomes visible (e.g., after returning from onboarding)
  if (process.client) {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        console.log('[Dashboard] Page visible, re-checking onboarding status')
        checkOnboardingStatus()
        fetchWebsites()
      }
    })
  }
})

// File upload handlers
const handleLogoUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file || !selectedWebsite.value) return

  uploadingLogo.value = true
  try {
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileType', 'logo')
    formData.append('websiteId', selectedWebsite.value.id)

    const uploadResponse = await fetch('/api/upload/website-assets', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session.access_token}` },
      body: formData
    })

    if (!uploadResponse.ok) throw new Error('Upload failed')

    const uploadData = await uploadResponse.json()
    const logoUrl = uploadData.files[0]?.url

    // Update website record
    const { error: updateError } = await supabase
      .from('websites')
      .update({ uploaded_logo: logoUrl })
      .eq('id', selectedWebsite.value.id)

    if (updateError) throw updateError

    // Update both selectedWebsite and the websites list
    selectedWebsite.value.uploaded_logo = logoUrl
    const websiteIndex = websites.value.findIndex(w => w.id === selectedWebsite.value.id)
    if (websiteIndex !== -1) {
      websites.value[websiteIndex].uploaded_logo = logoUrl
    }
    event.target.value = ''
  } catch (err) {
    console.error('Logo upload failed:', err)
    alert('Failed to upload logo')
  } finally {
    uploadingLogo.value = false
  }
}

const handleAssetsUpload = async (event) => {
  const files = Array.from(event.target.files || [])
  if (files.length === 0 || !selectedWebsite.value) return

  uploadingAssets.value = true
  try {
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    const uploadedUrls = []

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileType', 'asset')
      formData.append('websiteId', selectedWebsite.value.id)

      const uploadResponse = await fetch('/api/upload/website-assets', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session.access_token}` },
        body: formData
      })

      if (uploadResponse.ok) {
        const uploadData = await uploadResponse.json()
        if (uploadData.files[0]) {
          uploadedUrls.push({
            name: file.name,
            url: uploadData.files[0].url,
            size: file.size
          })
        }
      }
    }

    // Update website record
    const currentAssets = selectedWebsite.value.uploaded_assets || []
    const updatedAssets = [...currentAssets, ...uploadedUrls]

    const { error: updateError } = await supabase
      .from('websites')
      .update({ uploaded_assets: updatedAssets })
      .eq('id', selectedWebsite.value.id)

    if (updateError) throw updateError

    // Update both selectedWebsite and the websites list
    selectedWebsite.value.uploaded_assets = updatedAssets
    const websiteIndex = websites.value.findIndex(w => w.id === selectedWebsite.value.id)
    if (websiteIndex !== -1) {
      websites.value[websiteIndex].uploaded_assets = updatedAssets
    }
    event.target.value = ''
  } catch (err) {
    console.error('Assets upload failed:', err)
    alert('Failed to upload assets')
  } finally {
    uploadingAssets.value = false
  }
}

const deleteLogo = async () => {
  if (!confirm('Are you sure you want to delete the logo?') || !selectedWebsite.value) return

  deletingLogo.value = true
  try {
    const supabase = getSupabaseClient()
    const { error: updateError } = await supabase
      .from('websites')
      .update({ uploaded_logo: null })
      .eq('id', selectedWebsite.value.id)

    if (updateError) throw updateError

    // Update both selectedWebsite and the websites list
    selectedWebsite.value.uploaded_logo = null
    const websiteIndex = websites.value.findIndex(w => w.id === selectedWebsite.value.id)
    if (websiteIndex !== -1) {
      websites.value[websiteIndex].uploaded_logo = null
    }
  } catch (err) {
    console.error('Logo deletion failed:', err)
    alert('Failed to delete logo')
  } finally {
    deletingLogo.value = false
  }
}

const deleteAsset = async (index) => {
  if (!confirm('Are you sure you want to delete this asset?') || !selectedWebsite.value) return

  deletingAsset.value = index
  try {
    const supabase = getSupabaseClient()
    const currentAssets = [...(selectedWebsite.value.uploaded_assets || [])]
    currentAssets.splice(index, 1)

    const { error: updateError } = await supabase
      .from('websites')
      .update({ uploaded_assets: currentAssets })
      .eq('id', selectedWebsite.value.id)

    if (updateError) throw updateError

    // Update both selectedWebsite and the websites list
    selectedWebsite.value.uploaded_assets = currentAssets
    const websiteIndex = websites.value.findIndex(w => w.id === selectedWebsite.value.id)
    if (websiteIndex !== -1) {
      websites.value[websiteIndex].uploaded_assets = currentAssets
    }
  } catch (err) {
    console.error('Asset deletion failed:', err)
    alert('Failed to delete asset')
  } finally {
    deletingAsset.value = null
  }
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Submit change request (placeholder - wire to API later)
const handleSubmitChangeRequest = async () => {
  try {
    submittingChangeRequest.value = true
    changeRequestError.value = ''
    changeRequestSuccess.value = ''

    // Build FormData for multipart
    const fd = new FormData()
    fd.append('title', changeRequestForm.value.title)
    fd.append('description', changeRequestForm.value.description)
    fd.append('priority', changeRequestForm.value.priority)
    if (selectedWebsite.value?.id) fd.append('websiteId', selectedWebsite.value.id)
    if (screenshotFile.value) fd.append('screenshot', screenshotFile.value)

    // Auth header
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')

    const resp = await fetch('/api/change-requests', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session.access_token}` },
      body: fd
    })

    if (!resp.ok) {
      const errText = await resp.text().catch(() => '')
      throw new Error(errText || 'Failed to submit')
    }

    changeRequestSuccess.value = 'Change request submitted successfully!'
    changeRequestForm.value = { title: '', description: '', priority: 'medium' }
    screenshotFile.value = null

    setTimeout(() => {
      showChangeRequestForm.value = false
      changeRequestSuccess.value = ''
    }, 1500)
  } catch (err) {
    console.error(err)
    changeRequestError.value = err?.message || 'Failed to submit request.'
  } finally {
    submittingChangeRequest.value = false
  }
}
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

/* Dashboard card icon - always accent color */
.dashboard-card-icon {
  stroke: #d97759;
  fill: none;
}

/* Add product modal icons */
.add-product-icon {
  stroke: #d97759;
  fill: none;
}

.add-product-icon-disabled {
  stroke: #d97759;
  fill: none;
}
</style>

