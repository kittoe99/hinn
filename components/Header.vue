<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
    <nav class="max-w-6xl mx-auto px-4 lg:px-6">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="flex h-9 w-9 items-center justify-center rounded bg-neutral-900 text-white font-bold text-base transition-transform group-hover:scale-105">
            H
          </div>
          <span class="text-xl font-bold text-neutral-900">Hinn</span>
        </NuxtLink>
        
        <!-- Desktop Navigation - Centered -->
        <div class="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <NuxtLink 
            to="/" 
            class="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
            active-class="text-neutral-900 bg-neutral-50"
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
            class="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
          >
            Sign in
          </NuxtLink>
          <NuxtLink 
            to="/get-started"
            class="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-all"
          >
            Get Started
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
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
              <div class="flex h-8 w-8 items-center justify-center rounded bg-neutral-900 text-white font-bold text-sm">
                H
              </div>
              <span class="text-lg font-bold text-neutral-900">Menu</span>
            </div>
            <button 
              @click="mobileMenuOpen = false"
              class="p-2 -mr-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
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
              class="block px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
              active-class="text-neutral-900 bg-neutral-50"
              @click="mobileMenuOpen = false"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/website" 
              class="block px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
              active-class="text-neutral-900 bg-neutral-50"
              @click="mobileMenuOpen = false"
            >
              Website
            </NuxtLink>
            <NuxtLink 
              to="/agents" 
              class="block px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
              active-class="text-neutral-900 bg-neutral-50"
              @click="mobileMenuOpen = false"
            >
              AI Agents
            </NuxtLink>
            <NuxtLink 
              to="/marketing" 
              class="block px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
              active-class="text-neutral-900 bg-neutral-50"
              @click="mobileMenuOpen = false"
            >
              Marketing
            </NuxtLink>
            <NuxtLink 
              to="/get-started" 
              class="block px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
              active-class="text-neutral-900 bg-neutral-50"
              @click="mobileMenuOpen = false"
            >
              Plans
            </NuxtLink>
            <NuxtLink 
              to="/showcase" 
              class="block px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
              active-class="text-neutral-900 bg-neutral-50"
              @click="mobileMenuOpen = false"
            >
              Showcase
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="block px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
              active-class="text-neutral-900 bg-neutral-50"
              @click="mobileMenuOpen = false"
            >
              Contact
            </NuxtLink>
          </nav>

          <!-- CTA Buttons -->
          <div class="mt-8 pt-6 border-t border-neutral-200 space-y-3">
            <NuxtLink 
              to="/login"
              class="flex items-center justify-center w-full px-6 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-900 text-base font-semibold hover:bg-neutral-50 transition-all"
              @click="mobileMenuOpen = false"
            >
              Sign in
            </NuxtLink>
            <NuxtLink 
              to="/get-started"
              class="flex items-center justify-center w-full px-6 py-3 rounded-lg bg-neutral-900 text-white text-base font-semibold hover:bg-neutral-800 transition-all"
              @click="mobileMenuOpen = false"
            >
              Get Started
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
