<template>
  <main class="min-h-screen bg-[#f9f8f6]">
    <!-- Hero -->
    <section class="pt-20 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 right-10 w-72 h-72 bg-[#d97759]/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-64 h-64 bg-[#d97759]/3 rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">Canvas Printing</h1>
            <p class="mt-6 text-lg text-neutral-600 leading-relaxed">Turn your generated or uploaded images into gallery‑quality canvas prints. Premium materials, crisp detail, and fast delivery.</p>
            <div class="mt-6 flex flex-wrap gap-3">
              <div class="flex items-center gap-2 rounded-lg bg-[#d97759]/10 px-3 py-2 text-sm text-[#d97759] border border-[#d97759]">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span>Premium canvas</span>
              </div>
              <div class="flex items-center gap-2 rounded-lg bg-[#d97759]/10 px-3 py-2 text-sm text-[#d97759] border border-[#d97759]">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span>Multiple sizes</span>
              </div>
              <div class="flex items-center gap-2 rounded-lg bg-[#d97759]/10 px-3 py-2 text-sm text-[#d97759] border border-[#d97759]">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span>Fast shipping</span>
              </div>
            </div>
            <div class="mt-8 flex flex-wrap items-center gap-4">
              <NuxtLink
                to="/dashboard"
                class="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
              >
                Print A Design
                <span>&rarr;</span>
              </NuxtLink>
            </div>
          </div>
          <div class="relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-100 aspect-[4/3] transform hover:scale-[1.02] transition-transform duration-300">
              <img :src="heroImg" alt="Canvas Print Example" class="w-full h-full object-cover" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent"></div>
            </div>
            <div class="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-neutral-200">
              <div class="text-center">
                <div class="text-2xl font-bold text-neutral-900">48hrs</div>
                <div class="text-xs text-neutral-600">Fast delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section class="py-16 md:py-20 bg-white border-y border-neutral-200">
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mx-auto mb-4">
              <svg class="h-6 w-6 text-[#d97759]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <h3 class="text-base font-semibold text-neutral-900 mb-1">Upload or Generate</h3>
            <p class="text-sm text-neutral-600">AI-generated or your own photos</p>
          </div>
          <div class="text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mx-auto mb-4">
              <svg class="h-6 w-6 text-[#d97759]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h3 class="text-base font-semibold text-neutral-900 mb-1">Choose Size</h3>
            <p class="text-sm text-neutral-600">From 8"×10" to 30"×40"</p>
          </div>
          <div class="text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mx-auto mb-4">
              <svg class="h-6 w-6 text-[#d97759]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 class="text-base font-semibold text-neutral-900 mb-1">Premium Quality</h3>
            <p class="text-sm text-neutral-600">Museum-grade materials</p>
          </div>
          <div class="text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mx-auto mb-4">
              <svg class="h-6 w-6 text-[#d97759]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
            </div>
            <h3 class="text-base font-semibold text-neutral-900 mb-1">Fast Delivery</h3>
            <p class="text-sm text-neutral-600">Ships within 2-4 days</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-[#fefbf3] border-y border-neutral-200/60">
      <div class="mx-auto max-w-5xl px-6 py-16">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div class="max-w-sm">
            <h2 class="text-2xl font-semibold tracking-tight text-neutral-900 mb-3">How it works</h2>
            <p class="text-neutral-700 text-sm md:text-base">
              Go from image to ready‑to‑hang canvas in a few simple steps.
            </p>
          </div>

          <ol class="flex-1 space-y-6">
            <li class="flex gap-4">
              <div class="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-[#d97759]/10 text-[#d97759] text-sm font-semibold">
                1
              </div>
              <div>
                <h3 class="text-sm font-semibold text-neutral-900">Upload or generate your image</h3>
                <p class="text-sm text-neutral-700 mt-1">
                  Use AI to generate artwork or upload your own photos, brand visuals, or illustrations.
                </p>
              </div>
            </li>
            <li class="flex gap-4">
              <div class="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-[#d97759]/10 text-[#d97759] text-sm font-semibold">
                2
              </div>
              <div>
                <h3 class="text-sm font-semibold text-neutral-900">Choose size and finish</h3>
                <p class="text-sm text-neutral-700 mt-1">
                  Pick from popular sizes and edge styles to match your home, office, or gallery wall.
                </p>
              </div>
            </li>
            <li class="flex gap-4">
              <div class="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-[#d97759]/10 text-[#d97759] text-sm font-semibold">
                3
              </div>
              <div>
                <h3 class="text-sm font-semibold text-neutral-900">We print and ship</h3>
                <p class="text-sm text-neutral-700 mt-1">
                  Your canvas is printed on premium materials, hand‑stretched, inspected, and shipped to your door.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div class="rounded-2xl bg-[#f0ebe3] p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-3">Sizes & options</h3>
          <div class="flex flex-wrap gap-2 mb-4 text-sm">
            <span class="px-3 py-1 rounded-lg bg-white border border-neutral-200">8" × 10"</span>
            <span class="px-3 py-1 rounded-lg bg-white border border-neutral-200">12" × 16"</span>
            <span class="px-3 py-1 rounded-lg bg-white border border-neutral-200">18" × 24"</span>
            <span class="px-3 py-1 rounded-lg bg-white border border-neutral-200">24" × 36"</span>
            <span class="px-3 py-1 rounded-lg bg-white border border-neutral-200">30" × 40"</span>
          </div>
          <div class="grid sm:grid-cols-2 gap-4 text-sm">
            <div class="rounded-xl bg-white border border-neutral-200 p-4">
              <div class="font-medium text-neutral-900 mb-1">Edge styles</div>
              <div class="text-neutral-700">Mirror wrap, black wrap, white wrap</div>
            </div>
            <div class="rounded-xl bg-white border border-neutral-200 p-4">
              <div class="font-medium text-neutral-900 mb-1">Hardware</div>
              <div class="text-neutral-700">Ready‑to‑hang sawtooth hanger</div>
            </div>
          </div>
        </div>
        <div class="rounded-2xl bg-[#f0ebe3] p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-3">Materials</h3>
          <ul class="space-y-2 text-sm text-neutral-700">
            <li>• Museum‑grade canvas with archival inks</li>
            <li>• Hand‑stretched over kiln‑dried wood frames</li>
            <li>• Rich color reproduction and crisp details</li>
            <li>• Protective finish for durability</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Showcase prints -->
    <section class="bg-white border-t border-neutral-200/70">
      <div class="mx-auto max-w-5xl px-6 py-16">
        <div class="flex items-start justify-between gap-6 mb-8">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight text-neutral-900 mb-2">Showcase prints</h2>
            <p class="text-sm text-neutral-700 max-w-xl">
              A glimpse of what your images can look like on canvas. Each piece is printed with the same process we use for customers.
            </p>
          </div>
          <div class="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
            <span class="inline-flex h-2 w-2 rounded-full bg-[#d97759]"></span>
            <span>Real layouts, curated for inspiration.</span>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <!-- Card 1 -->
          <div class="group rounded-2xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all">
            <div class="aspect-[4/5] bg-neutral-900 overflow-hidden">
              <img
                :src="heroImg"
                alt="Colorful abstract canvas print"
                class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <h3 class="text-sm font-semibold text-neutral-900">Abstract gallery wall</h3>
              <p class="mt-1 text-xs text-neutral-600">AI‑generated artwork printed on 18" × 24" canvas.</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="group rounded-2xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all">
            <div class="aspect-[4/5] bg-neutral-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80"
                alt="Family canvas print on wall"
                class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <h3 class="text-sm font-semibold text-neutral-900">Family & memories</h3>
              <p class="mt-1 text-xs text-neutral-600">Personal photos turned into a warm living‑room gallery.</p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="group rounded-2xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all">
            <div class="aspect-[4/5] bg-neutral-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80"
                alt="Brand artwork canvas in studio"
                class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <h3 class="text-sm font-semibold text-neutral-900">Brand & studio pieces</h3>
              <p class="mt-1 text-xs text-neutral-600">Logo marks, campaigns, and hero visuals for offices and studios.</p>
            </div>
          </div>
          
          <!-- Card 4 -->
          <div class="group rounded-2xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all">
            <div class="aspect-[4/5] bg-neutral-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=80"
                alt="Large statement canvas in living room"
                class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <h3 class="text-sm font-semibold text-neutral-900">Statement pieces</h3>
              <p class="mt-1 text-xs text-neutral-600">Bring any space to life with large‑format canvases.</p>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="group rounded-2xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all">
            <div class="aspect-[4/5] bg-neutral-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80"
                alt="Minimal canvas in a modern workspace"
                class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <h3 class="text-sm font-semibold text-neutral-900">Workspaces</h3>
              <p class="mt-1 text-xs text-neutral-600">Elevate offices, studios, and creative spaces.</p>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="group rounded-2xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all">
            <div class="aspect-[4/5] bg-neutral-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1000&q=80"
                alt="Canvas prints in a bedroom"
                class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <h3 class="text-sm font-semibold text-neutral-900">Home & lifestyle</h3>
              <p class="mt-1 text-xs text-neutral-600">Create cozy vibes with personal memories and art.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="bg-[#fefbf3] border-t border-neutral-200/70">
      <div class="mx-auto max-w-6xl px-6 py-16">
        <div class="grid md:grid-cols-3 gap-6">
          <div class="rounded-2xl bg-white border border-neutral-200 p-6">
            <div class="flex items-center gap-3 mb-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d97759]/10">
                <svg class="h-6 w-6 text-[#d97759]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div class="text-sm font-semibold text-neutral-900">Truly impressed</div>
            </div>
            <p class="text-sm text-neutral-700">“The colors pop and the texture feels premium. Setup was effortless. Will order again.”</p>
            <div class="mt-4 text-xs text-neutral-500">— Sarah D.</div>
          </div>
          <div class="rounded-2xl bg-white border border-neutral-200 p-6">
            <div class="flex items-center gap-3 mb-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d97759]/10">
                <svg class="h-6 w-6 text-[#d97759]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div class="text-sm font-semibold text-neutral-900">Great gift</div>
            </div>
            <p class="text-sm text-neutral-700">“I turned a favorite photo into a canvas for my parents. Quality exceeded expectations.”</p>
            <div class="mt-4 text-xs text-neutral-500">— Kevin M.</div>
          </div>
          <div class="rounded-2xl bg-white border border-neutral-200 p-6">
            <div class="flex items-center gap-3 mb-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d97759]/10">
                <svg class="h-6 w-6 text-[#d97759]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div class="text-sm font-semibold text-neutral-900">Fast turnaround</div>
            </div>
            <p class="text-sm text-neutral-700">“From upload to the wall in less than a week. Bright, sharp, and perfectly stretched.”</p>
            <div class="mt-4 text-xs text-neutral-500">— Maria P.</div>
          </div>
        </div>
      </div>
    </section>

    

    <section class="py-20 md:py-24 relative overflow-hidden bg-[#f0ebe3] rounded-3xl mx-6 lg:mx-8 mb-12">
      <div class="max-w-6xl mx-auto px-8 lg:px-12">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
              Ready to print your design?
            </h2>
            <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
              Create a stunning canvas from any image—generated or uploaded—and have it delivered to your door.
            </p>
            <NuxtLink 
              to="/dashboard"
              class="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              Print A Design
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-6">Perfect for any space</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="group relative overflow-hidden rounded-xl bg-white p-5 hover:shadow-lg transition-all border border-neutral-200 hover:border-[#d97759]">
                <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#d97759]/10 mb-3 group-hover:bg-[#d97759]/20 transition-colors">
                  <svg class="h-5 w-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z"/>
                  </svg>
                </div>
                <h4 class="text-sm font-semibold text-neutral-900 mb-1">Gallery walls</h4>
                <p class="text-xs text-neutral-600">Bold statements for living areas</p>
              </div>
              <div class="group relative overflow-hidden rounded-xl bg-white p-5 hover:shadow-lg transition-all border border-neutral-200 hover:border-[#d97759]">
                <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#d97759]/10 mb-3 group-hover:bg-[#d97759]/20 transition-colors">
                  <svg class="h-5 w-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </div>
                <h4 class="text-sm font-semibold text-neutral-900 mb-1">Workspaces</h4>
                <p class="text-xs text-neutral-600">Offices, studios, and lobbies</p>
              </div>
              <div class="group relative overflow-hidden rounded-xl bg-white p-5 hover:shadow-lg transition-all border border-neutral-200 hover:border-[#d97759]">
                <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#d97759]/10 mb-3 group-hover:bg-[#d97759]/20 transition-colors">
                  <svg class="h-5 w-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h4 class="text-sm font-semibold text-neutral-900 mb-1">Studios</h4>
                <p class="text-xs text-neutral-600">Brand & campaign visuals</p>
              </div>
              <div class="group relative overflow-hidden rounded-xl bg-white p-5 hover:shadow-lg transition-all border border-neutral-200 hover:border-[#d97759]">
                <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#d97759]/10 mb-3 group-hover:bg-[#d97759]/20 transition-colors">
                  <svg class="h-5 w-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </div>
                <h4 class="text-sm font-semibold text-neutral-900 mb-1">Gifts</h4>
                <p class="text-xs text-neutral-600">Memories made memorable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import heroImg from '~/assets/wps-canvas.png'
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
