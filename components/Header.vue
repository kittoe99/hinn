<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 shadow-sm">
    <nav class="max-w-6xl mx-auto px-4 lg:px-6">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary text-white font-bold text-sm transition-transform group-hover:scale-105">
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
          <a 
            href="#contact" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
          >
            Contact
          </a>
          <NuxtLink 
            to="/get-started" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            active-class="text-primary bg-neutral-50"
          >
            Plans
          </NuxtLink>
          <a 
            href="#showcase" 
            class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
          >
            Showcase
          </a>
        </div>

        <!-- CTA Button -->
        <div class="hidden lg:flex items-center gap-3">
          <NuxtLink 
            to="/get-started"
            class="px-5 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-900 transition-colors"
          >
            Get Started
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 -mr-2 text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
          aria-label="Toggle menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="lg:hidden py-4 space-y-1 border-t border-neutral-200">
          <NuxtLink 
            to="/" 
            class="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            @click="mobileMenuOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/website" 
            class="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            @click="mobileMenuOpen = false"
          >
            Website
          </NuxtLink>
          <NuxtLink 
            to="/agents" 
            class="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            @click="mobileMenuOpen = false"
          >
            Agents
          </NuxtLink>
          <NuxtLink 
            to="/marketing" 
            class="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            @click="mobileMenuOpen = false"
          >
            Marketing
          </NuxtLink>
          <a 
            href="#contact" 
            class="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            @click="mobileMenuOpen = false"
          >
            Contact
          </a>
          <NuxtLink 
            to="/get-started" 
            class="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            @click="mobileMenuOpen = false"
          >
            Plans
          </NuxtLink>
          <a 
            href="#showcase" 
            class="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            @click="mobileMenuOpen = false"
          >
            Showcase
          </a>
          <div class="pt-2">
            <NuxtLink 
              to="/get-started"
              class="block px-4 py-2.5 text-center rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-900 transition-colors"
              @click="mobileMenuOpen = false"
            >
              Get Started
            </NuxtLink>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>
