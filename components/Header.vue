<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
    <nav class="max-w-6xl mx-auto px-4 lg:px-6">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-focus text-white font-bold text-base shadow-sm transition-transform group-hover:scale-105">
            H
          </div>
          <span class="text-xl font-bold text-primary">Hinn</span>
        </NuxtLink>
        
        <!-- Desktop Navigation - Centered -->
        <div class="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <NuxtLink 
            to="/" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            active-class="text-primary bg-neutral-50"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/website" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            active-class="text-primary bg-neutral-50"
          >
            Website
          </NuxtLink>
          <NuxtLink 
            to="/agents" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            active-class="text-primary bg-neutral-50"
          >
            Agents
          </NuxtLink>
          <NuxtLink 
            to="/marketing" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            active-class="text-primary bg-neutral-50"
          >
            Marketing
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            active-class="text-primary bg-neutral-50"
          >
            Contact
          </NuxtLink>
          <NuxtLink 
            to="/get-started" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            active-class="text-primary bg-neutral-50"
          >
            Plans
          </NuxtLink>
          <NuxtLink 
            to="/showcase" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            active-class="text-primary bg-neutral-50"
          >
            Showcase
          </NuxtLink>
        </div>

        <!-- CTA Button -->
        <div class="hidden lg:flex items-center gap-3">
          <NuxtLink 
            to="/login"
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
          >
            Sign in
          </NuxtLink>
          <NuxtLink 
            to="/get-started"
            class="px-6 py-2.5 rounded-full bg-accent-primary text-white text-sm font-semibold shadow-sm hover:bg-accent-focus transition-all"
          >
            Get Started
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 text-secondary hover:text-primary hover:bg-neutral-50 rounded-xl transition-all"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile/Tablet Navigation Overlay -->
    <transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="mobileMenuOpen" 
        class="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm lg:hidden"
        @click="mobileMenuOpen = false"
      />
    </transition>

    <!-- Mobile/Tablet Navigation Panel -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div 
        v-if="mobileMenuOpen" 
        class="fixed top-0 right-0 h-screen z-[70] w-80 bg-white shadow-2xl lg:hidden overflow-y-auto"
        style="max-width: 85vw;"
      >
        <div class="p-4">
          <!-- Close Button -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-focus text-white font-bold text-sm">
                H
              </div>
              <span class="text-lg font-bold text-primary">Menu</span>
            </div>
            <button 
              @click="mobileMenuOpen = false"
              class="p-2 -mr-2 text-secondary hover:text-primary hover:bg-neutral-50 rounded-xl transition-all"
              aria-label="Close menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-1" style="display: block !important; visibility: visible !important;">
            <NuxtLink 
              to="/" 
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-xl transition-all group"
              active-class="text-primary bg-accent-subtle"
              @click="mobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </NuxtLink>
            <NuxtLink 
              to="/website" 
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-xl transition-all group"
              active-class="text-primary bg-accent-subtle"
              @click="mobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>Website</span>
            </NuxtLink>
            <NuxtLink 
              to="/agents" 
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-xl transition-all group"
              active-class="text-primary bg-accent-subtle"
              @click="mobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>AI Agents</span>
            </NuxtLink>
            <NuxtLink 
              to="/marketing" 
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-xl transition-all group"
              active-class="text-primary bg-accent-subtle"
              @click="mobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <span>Marketing</span>
            </NuxtLink>
            <NuxtLink 
              to="/get-started" 
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-xl transition-all group"
              active-class="text-primary bg-accent-subtle"
              @click="mobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Plans</span>
            </NuxtLink>
            <NuxtLink 
              to="/showcase" 
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-xl transition-all group"
              active-class="text-primary bg-accent-subtle"
              @click="mobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Showcase</span>
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-xl transition-all group"
              active-class="text-primary bg-accent-subtle"
              @click="mobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact</span>
            </NuxtLink>
          </nav>

          <!-- CTA Buttons -->
          <div class="mt-8 pt-6 border-t border-neutral-200 space-y-3">
            <NuxtLink 
              to="/login"
              class="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl border border-neutral-300 bg-white text-primary text-base font-semibold hover:bg-neutral-50 transition-all"
              @click="mobileMenuOpen = false"
            >
              <span>Sign in</span>
            </NuxtLink>
            <NuxtLink 
              to="/get-started"
              class="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-accent-primary text-white text-base font-semibold shadow-lg shadow-accent-primary/30 hover:bg-accent-focus transition-all"
              @click="mobileMenuOpen = false"
            >
              <span>Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>
