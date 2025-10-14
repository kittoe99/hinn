<template>
  <footer class="bg-white border-t border-neutral-200 mt-4 md:mt-6">
    <div class="max-w-6xl mx-auto px-4 lg:px-6">
      <!-- Main Footer Content -->
      <div class="py-8 sm:py-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
        <!-- Brand -->
        <div class="col-span-2 lg:col-span-4">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary text-white font-bold text-sm">
              H
            </div>
            <span class="text-xl font-bold text-primary">Hinn</span>
          </div>
          <p class="text-sm text-secondary max-w-xs leading-relaxed">
            One subscription for design, development, hosting, and continuous improvements.
          </p>
          <div class="mt-4 sm:mt-6 flex items-center gap-3">
            <a href="#" class="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-secondary hover:bg-neutral-200 hover:text-primary transition-all" aria-label="Twitter">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" class="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-secondary hover:bg-neutral-200 hover:text-primary transition-all" aria-label="LinkedIn">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" class="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-secondary hover:bg-neutral-200 hover:text-primary transition-all" aria-label="GitHub">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Services -->
        <div class="lg:col-span-2">
          <h4 class="text-sm font-semibold text-primary mb-3">Services</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/website" class="text-sm text-secondary hover:text-primary transition-colors">
                Websites
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/agents" class="text-sm text-secondary hover:text-primary transition-colors">
                AI Agents
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/marketing" class="text-sm text-secondary hover:text-primary transition-colors">
                Marketing
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div class="lg:col-span-2">
          <h4 class="text-sm font-semibold text-primary mb-3">Company</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-sm text-secondary hover:text-primary transition-colors">
                About
              </a>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-sm text-secondary hover:text-primary transition-colors">
                Contact
              </NuxtLink>
            </li>
            <li>
              <a href="#" class="text-sm text-secondary hover:text-primary transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-secondary hover:text-primary transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="lg:col-span-2">
          <h4 class="text-sm font-semibold text-primary mb-3">Resources</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/get-started" class="text-sm text-secondary hover:text-primary transition-colors">
                Pricing
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/onboarding" class="text-sm text-secondary hover:text-primary transition-colors">
                Onboarding
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/login" class="text-sm text-secondary hover:text-primary transition-colors">
                Sign in
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/signup" class="text-sm text-secondary hover:text-primary transition-colors">
                Sign up
              </NuxtLink>
            </li>
            <li>
              <a href="#" class="text-sm text-secondary hover:text-primary transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-secondary hover:text-primary transition-colors">
                Support
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="lg:col-span-2">
          <h4 class="text-sm font-semibold text-primary mb-3">Legal</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-sm text-secondary hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-secondary hover:text-primary transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-secondary hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="py-6 border-t border-neutral-200">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-tertiary">
            © {{ new Date().getFullYear() }} Hinn. All rights reserved.
          </p>
          <div class="flex items-center gap-6 text-sm text-tertiary">
            <a href="#" class="hover:text-primary transition-colors">Status</a>
            <a href="#" class="hover:text-primary transition-colors">Sitemap</a>
            <a href="mailto:hello@hinn.studio" class="hover:text-primary transition-colors">hello@hinn.studio</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
