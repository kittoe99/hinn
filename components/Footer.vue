<template>
  <footer class="bg-neutral-50 border-t border-soft mt-16">
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-1">
          <h3 class="text-lg font-bold text-primary mb-3">Hinn</h3>
          <p class="text-sm text-secondary">Professional web services for modern businesses.</p>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-sm font-semibold text-primary mb-3">Services</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/website" class="text-sm text-secondary hover:text-accent-primary transition-colors">
                Websites
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/agents" class="text-sm text-secondary hover:text-accent-primary transition-colors">
                AI Agents
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/marketing" class="text-sm text-secondary hover:text-accent-primary transition-colors">
                Marketing
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-sm font-semibold text-primary mb-3">Company</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-sm text-secondary hover:text-accent-primary transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-secondary hover:text-accent-primary transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-secondary hover:text-accent-primary transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-sm font-semibold text-primary mb-3">Legal</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-sm text-secondary hover:text-accent-primary transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-secondary hover:text-accent-primary transition-colors">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-soft">
        <p class="text-sm text-tertiary text-center">
          © {{ new Date().getFullYear() }} Hinn. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
