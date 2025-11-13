<template>
  <main class="min-h-screen bg-[#fefefe]">
    <section class="mx-auto max-w-5xl px-6 py-16">
      <div class="flex flex-col items-start gap-6">
        <h1 class="text-3xl font-semibold tracking-tight text-neutral-900">Canvas Printing</h1>
        <p class="max-w-3xl text-neutral-700">
          Turn your generated or uploaded images into gallery‑quality canvas prints. Premium materials, crisp detail, and fast delivery.
        </p>
        <div class="mt-2 flex flex-wrap gap-3">
          <div class="rounded-lg bg-[#d97759]/10 px-3 py-1 text-sm text-[#d97759] border border-[#d97759]">Premium canvas</div>
          <div class="rounded-lg bg-[#d97759]/10 px-3 py-1 text-sm text-[#d97759] border border-[#d97759]">Multiple sizes</div>
          <div class="rounded-lg bg-[#d97759]/10 px-3 py-1 text-sm text-[#d97759] border border-[#d97759]">Fast shipping</div>
        </div>
        <div class="mt-6 flex items-center gap-4">
          <NuxtLink to="/signup" class="rounded-md bg-neutral-900 px-5 py-2.5 text-white hover:bg-neutral-800">Get started</NuxtLink>
          <NuxtLink to="/contact" class="rounded-md border border-neutral-200 px-5 py-2.5 text-neutral-900 hover:border-neutral-300">Talk to us</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Canvas Printing',
  meta: [
    {
      name: 'description',
      content:
        'Turn images into gallery‑quality canvas prints with WPS Canvas. Upload or generate images and print on premium canvas. Fast delivery.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Canvas Printing | WPS Canvas' },
    {
      property: 'og:description',
      content:
        'Turn images into gallery‑quality canvas prints with WPS Canvas. Upload or generate images and print on premium canvas. Fast delivery.'
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Canvas Printing | WPS Canvas' },
    {
      name: 'twitter:description',
      content:
        'Turn images into gallery‑quality canvas prints with WPS Canvas. Upload or generate images and print on premium canvas. Fast delivery.'
    }
  ]
})
</script>
