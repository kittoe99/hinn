<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <AmaBar />
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
