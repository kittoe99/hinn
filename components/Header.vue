<template>
  <header class="border-b border-neutral-200 bg-white">
    <nav class="max-w-5xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="text-lg font-medium text-neutral-900">
          Hinn
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink 
            to="/website" 
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Products
          </NuxtLink>
          <NuxtLink 
            to="/showcase" 
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Work
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Company
          </NuxtLink>
        </div>

        <!-- CTA -->
        <div class="hidden md:flex items-center gap-4">
          <NuxtLink 
            to="/login"
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Sign in
          </NuxtLink>
          <NuxtLink 
            to="/dashboard"
            class="px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          aria-label="Toggle menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden border-t border-neutral-200 bg-white"
    >
      <nav class="max-w-5xl mx-auto px-6 py-6 space-y-4">
        <NuxtLink 
          to="/website" 
          class="block text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          @click="mobileMenuOpen = false"
        >
          Products
        </NuxtLink>
        <NuxtLink 
          to="/showcase" 
          class="block text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          @click="mobileMenuOpen = false"
        >
          Work
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          class="block text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          @click="mobileMenuOpen = false"
        >
          Company
        </NuxtLink>
        <div class="pt-4 border-t border-neutral-200 space-y-4">
          <NuxtLink 
            to="/login"
            class="block text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            @click="mobileMenuOpen = false"
          >
            Sign in
          </NuxtLink>
          <NuxtLink 
            to="/dashboard"
            class="block px-4 py-2 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors text-center"
            @click="mobileMenuOpen = false"
          >
            Get Started
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>
