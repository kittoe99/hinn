<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-soft">
    <nav class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-primary hover:text-accent-primary transition-colors">
          Hinn
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink 
            to="/" 
            class="text-sm font-medium text-secondary hover:text-accent-primary transition-colors"
            active-class="text-accent-primary"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/website" 
            class="text-sm font-medium text-secondary hover:text-accent-primary transition-colors"
            active-class="text-accent-primary"
          >
            Website
          </NuxtLink>
          <NuxtLink 
            to="/agents" 
            class="text-sm font-medium text-secondary hover:text-accent-primary transition-colors"
            active-class="text-accent-primary"
          >
            Agents
          </NuxtLink>
          <NuxtLink 
            to="/marketing" 
            class="text-sm font-medium text-secondary hover:text-accent-primary transition-colors"
            active-class="text-accent-primary"
          >
            Marketing
          </NuxtLink>
          <button 
            class="px-4 py-2 rounded-full bg-accent-primary text-white text-sm font-medium hover:bg-accent-focus transition-colors"
          >
            Get Started
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-secondary hover:text-accent-primary transition-colors"
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
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 space-y-3 border-t border-soft pt-4">
        <NuxtLink 
          to="/" 
          class="block text-sm font-medium text-secondary hover:text-accent-primary transition-colors"
          @click="mobileMenuOpen = false"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/website" 
          class="block text-sm font-medium text-secondary hover:text-accent-primary transition-colors"
          @click="mobileMenuOpen = false"
        >
          Website
        </NuxtLink>
        <NuxtLink 
          to="/agents" 
          class="block text-sm font-medium text-secondary hover:text-accent-primary transition-colors"
          @click="mobileMenuOpen = false"
        >
          Agents
        </NuxtLink>
        <NuxtLink 
          to="/marketing" 
          class="block text-sm font-medium text-secondary hover:text-accent-primary transition-colors"
          @click="mobileMenuOpen = false"
        >
          Marketing
        </NuxtLink>
        <button 
          class="w-full px-4 py-2 rounded-full bg-accent-primary text-white text-sm font-medium hover:bg-accent-focus transition-colors"
        >
          Get Started
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>
