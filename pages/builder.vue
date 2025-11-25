<template>
  <div class="h-screen w-full">
    <iframe 
      :src="builderUrl" 
      class="w-full h-full border-0"
      title="Website Builder"
    />
  </div>
</template>

<script setup lang="ts">
// Full-screen iframe wrapper for the React builder app
definePageMeta({
  layout: false
})

// In development, use Vite dev server; in production, use built files
const config = useRuntimeConfig()
const isDev = process.env.NODE_ENV === 'development'
const builderUrl = isDev ? 'http://localhost:3001' : '/builder-app/index.html'
</script>
