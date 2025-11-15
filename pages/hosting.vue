<template>
  <div class="min-h-screen bg-[#f9f8f6]">
    <div class="mx-auto max-w-5xl px-6 py-10">
      <!-- Page Header -->
      <header class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-900">Hosting</h1>
          <p class="mt-1 text-sm text-neutral-600">
            Upload static site files or use the AI generator (coming soon) to deploy websites from your account.
          </p>
        </div>
      </header>

      <div class="max-w-4xl mx-auto">
        <!-- Unified Hosting Card -->
        <section class="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4 mb-6">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d97759]/10">
                <svg class="h-4 w-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-base font-medium text-neutral-900">Deploy Website</h2>
                <p class="text-xs text-neutral-600 mt-0.5">
                  Upload files or generate with AI. All versions are stored in the <span class="font-mono">websites</span> bucket.
                </p>
              </div>
            </div>
          </div>

          <!-- Mode Tabs -->
          <div class="flex gap-2 mb-6 border-b border-neutral-200">
            <button
              type="button"
              @click="deployMode = 'upload'"
              :class="[
                'px-4 py-2 text-sm font-medium transition-colors relative',
                deployMode === 'upload'
                  ? 'text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              ]"
            >
              Upload Files
              <span
                v-if="deployMode === 'upload'"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"
              ></span>
            </button>
            <button
              type="button"
              @click="deployMode = 'generate'"
              :class="[
                'px-4 py-2 text-sm font-medium transition-colors relative',
                deployMode === 'generate'
                  ? 'text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              ]"
            >
              AI Generator
              <span
                v-if="deployMode === 'generate'"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"
              ></span>
            </button>
          </div>

          <!-- Upload Mode -->
          <div v-if="deployMode === 'upload'" class="space-y-4">
            <!-- Website selector -->
            <div>
            <label class="block text-xs font-medium text-neutral-700 mb-1">Website</label>
            <div class="relative">
              <select
                v-model="selectedWebsiteId"
                class="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-[#d97759]"
              >
                <option value="" disabled>Select a website</option>
                <option
                  v-for="site in websites"
                  :key="site.id"
                  :value="site.id"
                >
                  {{ site.name || site.slug || site.id }}
                </option>
              </select>
            </div>
              <p v-if="websitesLoading" class="mt-1 text-[11px] text-neutral-500">Loading websites...</p>
              <p v-if="websitesError" class="mt-1 text-[11px] text-red-600">{{ websitesError }}</p>
            </div>

            <!-- File Input -->
            <div>
            <label class="block text-xs font-medium text-neutral-700 mb-2">Site files</label>
            <div
              class="flex flex-col items-start gap-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50/60 px-4 py-6"
            >
              <input
                id="hosting-file-input"
                type="file"
                class="text-xs"
                @change="onFileChange"
                accept=".zip,.html,.htm,.css,.js"
              />

              <p class="text-[11px] leading-relaxed text-neutral-500">
                Recommended: upload a single ZIP containing your site (including <span class="font-mono">index.html</span>,
                assets, and CSS). Max recommended size: 25 MB.
              </p>

              <p v-if="selectedFile" class="text-[11px] text-neutral-700 flex items-center gap-2">
                <svg class="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Selected: <span class="font-medium truncate max-w-[220px]" :title="selectedFile.name">{{ selectedFile.name }}</span>
              </p>
            </div>
          </div>

            <!-- Upload Button & Status -->
            <div class="flex flex-col gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
              :disabled="!selectedFile || uploading || !supabase"
              @click="handleUpload"
            >
              <svg
                v-if="uploading"
                class="h-4 w-4 mr-2 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>{{ uploading ? 'Uploading...' : 'Upload to websites bucket' }}</span>
            </button>

            <p v-if="!supabase" class="text-[11px] text-red-600">
              Supabase client is not configured. Check your <span class="font-mono">NUXT_PUBLIC_SUPABASE_URL</span> and
              <span class="font-mono">NUXT_PUBLIC_SUPABASE_ANON_KEY</span>.
            </p>

            <p v-if="uploadError" class="text-[11px] text-red-600">
              {{ uploadError }}
            </p>

            <p v-if="uploadSuccess" class="text-[11px] text-emerald-600 break-all">
              Uploaded successfully. Storage path:
              <span class="font-mono">{{ uploadSuccess }}</span>
            </p>
            </div>
          </div>

          <!-- Generate Mode -->
          <div v-if="deployMode === 'generate'" class="space-y-4">
            <!-- HTML Editor -->
            <div class="mb-4">
              <label class="block text-xs font-medium text-neutral-700 mb-2">HTML Editor</label>
              <textarea
                v-model="aiHtml"
                rows="16"
                placeholder="Generated HTML will appear here..."
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all text-xs font-mono text-neutral-900 placeholder-neutral-500"
              ></textarea>
              <p class="text-[10px] text-neutral-600 mt-1">
                {{ aiHtml.length }} characters
              </p>
            </div>

            <!-- Live Preview with Element Selection -->
            <div v-if="aiHtml" class="mb-4 p-4 bg-gradient-to-br from-[#fefbf3] to-white border border-neutral-200 rounded-xl shadow-sm">
              <!-- Preview Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-200">
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d97759]/10">
                    <svg class="w-4 h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-neutral-900">Live Preview</h4>
                    <p class="text-[10px] text-neutral-600">Interactive element selection enabled</p>
                  </div>
                </div>
                
                <!-- Preview Controls -->
                <div class="flex flex-wrap items-center gap-2">
                  <!-- Viewport Selector -->
                  <div class="flex items-center gap-1 bg-white border border-neutral-200 rounded-lg p-1">
                    <button
                      v-for="size in viewportSizes"
                      :key="size.value"
                      @click="viewportSize = size.value"
                      :class="[
                        'px-2 py-1 text-[10px] font-medium rounded transition-all',
                        viewportSize === size.value
                          ? 'bg-[#d97759] text-white'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      ]"
                      :title="size.label"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" :d="size.icon"/>
                      </svg>
                    </button>
                  </div>
                  
                  <!-- Element Selector Toggle -->
                  <label class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 rounded-lg cursor-pointer hover:border-[#d97759] transition-colors">
                    <input 
                      v-model="enableElementSelector" 
                      type="checkbox" 
                      class="w-3 h-3 text-[#d97759] border-neutral-300 rounded focus:ring-[#d97759] focus:ring-offset-0"
                    />
                    <span class="text-[10px] font-medium text-neutral-700">Select Mode</span>
                  </label>
                  
                  <!-- Refresh Button -->
                  <button 
                    @click="refreshPreview"
                    class="px-3 py-1.5 text-[10px] font-medium bg-white border border-neutral-200 hover:border-[#d97759] hover:text-[#d97759] rounded-lg transition-all flex items-center gap-1"
                    title="Refresh preview"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    <span class="hidden sm:inline">Refresh</span>
                  </button>
                </div>
              </div>
              
              <!-- Preview Container -->
              <div 
                class="relative border-2 border-neutral-200 rounded-lg bg-neutral-50 overflow-hidden mx-auto transition-all shadow-inner"
                :style="previewWrapperStyle"
              >
                <!-- Loading State -->
                <div v-if="previewLoading" class="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-8 h-8 border-3 border-[#d97759] border-t-transparent rounded-full animate-spin"></div>
                    <span class="text-xs text-neutral-600">Loading preview...</span>
                  </div>
                </div>
                
                <!-- Error State -->
                <div v-if="previewError" class="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
                  <div class="text-center p-4">
                    <svg class="w-8 h-8 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="text-xs font-medium text-red-900">Preview Error</p>
                    <p class="text-[10px] text-red-700 mt-1">{{ previewError }}</p>
                    <button @click="refreshPreview" class="mt-2 text-[10px] text-red-600 underline">Try Again</button>
                  </div>
                </div>
                
                <!-- Iframe -->
                <iframe 
                  ref="previewIframe"
                  class="w-full bg-white transition-opacity"
                  :class="{ 'opacity-50': previewLoading }"
                  :style="{ height: previewHeight }"
                  sandbox="allow-scripts allow-forms allow-modals allow-pointer-lock allow-same-origin"
                  @load="handlePreviewLoad"
                ></iframe>
                
                <!-- Selection Mode Indicator -->
                <div 
                  v-if="enableElementSelector"
                  class="absolute bottom-3 right-3 flex flex-col gap-1"
                >
                  <div class="flex items-center gap-1.5 bg-[#d97759] text-white text-[10px] font-medium px-2 py-1 rounded-lg shadow-lg animate-pulse">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/>
                    </svg>
                    <span>Click to Select</span>
                  </div>
                  <!-- Component System Status -->
                  <div class="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded shadow-lg">
                    {{ selectableComponents.length }} sections
                  </div>
                </div>
              </div>
              
              <!-- Selected Component Info Card (Component System) -->
              <div v-if="selectedComponent" class="mb-4 p-3 bg-gradient-to-br from-[#fefbf3] to-white rounded-xl border border-[#d97759]/30 shadow-sm">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d97759]/20">
                      <svg class="w-4 h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                      </svg>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-neutral-900">Component Selected</span>
                        <code class="text-[10px] bg-white px-2 py-0.5 rounded-md border border-[#d97759]/30 font-mono text-[#d97759] font-semibold">{{ selectedComponent.type }}</code>
                      </div>
                      <p class="text-[9px] text-neutral-600 mt-0.5">&lt;{{ selectedComponent.tagName }}&gt; • {{ selectedComponent.id }}</p>
                    </div>
                  </div>
                  <button 
                    @click="selectComponent(null)"
                    class="flex-shrink-0 p-1 text-neutral-500 hover:text-neutral-900 hover:bg-white rounded transition-colors"
                    title="Clear selection"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                
                <!-- Component Info -->
                <div class="mb-3 p-2 bg-white/70 rounded-lg border border-neutral-200">
                  <div v-if="selectedComponent.classes.length > 0" class="flex items-start gap-2 mb-2">
                    <span class="text-[10px] font-semibold text-neutral-700 whitespace-nowrap">Classes:</span>
                    <div class="flex flex-wrap gap-1">
                      <code 
                        v-for="cls in selectedComponent.classes" 
                        :key="cls"
                        class="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono"
                      >
                        .{{ cls }}
                      </code>
                    </div>
                  </div>
                  
                  <div v-if="selectedComponent.lineStart && selectedComponent.lineEnd" class="flex items-center gap-2 pt-2 border-t border-neutral-200">
                    <span class="text-[10px] font-semibold text-neutral-700">Lines:</span>
                    <code class="text-[10px] font-mono text-[#d97759]">{{ selectedComponent.lineStart }}-{{ selectedComponent.lineEnd }}</code>
                  </div>
                  
                  <div v-if="selectedComponent.content" class="mt-2 pt-2 border-t border-neutral-200">
                    <span class="text-[10px] font-semibold text-neutral-700 block mb-1">Content:</span>
                    <p class="text-[9px] text-neutral-800 bg-neutral-50 p-2 rounded">{{ selectedComponent.content.substring(0, 100) }}{{ selectedComponent.content.length > 100 ? '...' : '' }}</p>
                  </div>
                  
                  <div v-if="selectedComponent.components.length > 0" class="mt-2 pt-2 border-t border-neutral-200">
                    <span class="text-[10px] font-semibold text-neutral-700">Children:</span>
                    <span class="text-[10px] text-neutral-600 ml-2">{{ selectedComponent.components.length }} component(s)</span>
                  </div>
                </div>
                
                <!-- HTML Code Viewer -->
                <details class="group" open>
                  <summary class="cursor-pointer text-[10px] font-medium text-[#d97759] hover:text-[#c86648] flex items-center gap-1 select-none mb-2">
                    <svg class="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                    View Component Code
                  </summary>
                  <pre class="p-3 bg-neutral-900 text-neutral-100 rounded-lg text-[9px] overflow-x-auto leading-relaxed border border-neutral-700 max-h-60 overflow-y-auto">{{ selectedComponent.originalHtml || 'Code not available' }}</pre>
                </details>
                
                <!-- AI Prompt Suggestions -->
                <div class="mt-3 p-3 bg-gradient-to-r from-[#d97759]/10 to-transparent rounded-lg border-l-2 border-[#d97759]">
                  <div class="flex items-start gap-2">
                    <svg class="w-3 h-3 text-[#d97759] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="flex-1">
                      <p class="text-[10px] font-semibold text-neutral-900 mb-1">Try asking AI:</p>
                      <div class="space-y-1">
                        <p class="text-[9px] text-neutral-700">• "Change the background color to blue"</p>
                        <p class="text-[9px] text-neutral-700">• "Add a smooth hover animation"</p>
                        <p class="text-[9px] text-neutral-700">• "Make this section responsive"</p>
                        <p class="text-[9px] text-neutral-700">• "Increase padding and spacing"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Fallback: Selected Element Info Card (Old System) -->
              <div v-else-if="selectedElement" class="mb-4 p-3 bg-gradient-to-br from-[#fefbf3] to-white rounded-xl border border-[#d97759]/30 shadow-sm">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d97759]/20">
                      <svg class="w-4 h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                      </svg>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-neutral-900">Element Selected</span>
                        <code class="text-[10px] bg-white px-2 py-0.5 rounded-md border border-[#d97759]/30 font-mono text-[#d97759] font-semibold">&lt;{{ selectedElement.tag }}&gt;</code>
                      </div>
                      <p class="text-[9px] text-neutral-600 mt-0.5">Ready for AI modifications</p>
                    </div>
                  </div>
                  <button 
                    @click="clearSelection"
                    class="flex-shrink-0 p-1 text-neutral-500 hover:text-neutral-900 hover:bg-white rounded transition-colors"
                    title="Clear selection"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                
                <!-- Selector Info -->
                <div class="mb-3 p-2 bg-white/70 rounded-lg border border-neutral-200">
                  <div class="flex items-start gap-2">
                    <span class="text-[10px] font-semibold text-neutral-700 whitespace-nowrap">CSS Selector:</span>
                    <code class="text-[10px] font-mono text-neutral-900 break-all">{{ selectedElement.selector }}</code>
                  </div>
                  <div v-if="selectedElement.lineRange" class="flex items-center gap-2 mt-1 pt-1 border-t border-neutral-200">
                    <span class="text-[10px] font-semibold text-neutral-700">Lines:</span>
                    <code class="text-[10px] font-mono text-[#d97759]">{{ selectedElement.lineRange.start }}-{{ selectedElement.lineRange.end }}</code>
                    <span v-if="selectedElement.lineRange.confidence" class="ml-auto">
                      <span 
                        :class="[
                          'text-[9px] px-1.5 py-0.5 rounded font-medium',
                          selectedElement.lineRange.confidence >= 0.9 ? 'bg-green-100 text-green-800' :
                          selectedElement.lineRange.confidence >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        ]"
                      >
                        {{ Math.round(selectedElement.lineRange.confidence * 100) }}% match
                      </span>
                    </span>
                  </div>
                  <div v-else-if="selectedElement.lineNumber" class="flex items-center gap-2 mt-1 pt-1 border-t border-neutral-200">
                    <span class="text-[10px] font-semibold text-neutral-700">Line:</span>
                    <code class="text-[10px] font-mono text-[#d97759]">{{ selectedElement.lineNumber }}</code>
                  </div>
                  
                  <!-- Context Info -->
                  <div v-if="selectedElement.context" class="mt-2 pt-2 border-t border-neutral-200 space-y-1">
                    <div v-if="selectedElement.context.parent" class="flex items-center gap-2 text-[9px]">
                      <span class="text-neutral-600">Parent:</span>
                      <code class="bg-neutral-100 px-1 py-0.5 rounded font-mono text-neutral-800">&lt;{{ selectedElement.context.parent }}&gt;</code>
                    </div>
                    <div v-if="selectedElement.context.index !== undefined" class="flex items-center gap-2 text-[9px]">
                      <span class="text-neutral-600">Position:</span>
                      <span class="text-neutral-800">{{ selectedElement.context.index + 1 }} of {{ (selectedElement.context.index || 0) + 1 }}</span>
                    </div>
                    <div v-if="selectedElement.context.attributes && Object.keys(selectedElement.context.attributes).length > 0" class="text-[9px]">
                      <span class="text-neutral-600">Attributes:</span>
                      <div class="mt-1 flex flex-wrap gap-1">
                        <code 
                          v-for="(value, key) in selectedElement.context.attributes" 
                          :key="key"
                          class="bg-neutral-100 px-1 py-0.5 rounded font-mono text-neutral-800"
                        >
                          {{ key }}="{{ value.length > 20 ? value.substring(0, 20) + '...' : value }}"
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- AI Prompt Suggestions -->
                <div class="mb-3 p-3 bg-gradient-to-r from-[#d97759]/10 to-transparent rounded-lg border-l-2 border-[#d97759]">
                  <div class="flex items-start gap-2 mb-2">
                    <svg class="w-3 h-3 text-[#d97759] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="flex-1">
                      <p class="text-[10px] font-semibold text-neutral-900 mb-1">Try asking AI:</p>
                      <div class="space-y-1">
                        <p class="text-[9px] text-neutral-700">• "Change the background color to blue"</p>
                        <p class="text-[9px] text-neutral-700">• "Add a smooth hover animation"</p>
                        <p class="text-[9px] text-neutral-700">• "Make this responsive for mobile"</p>
                        <p class="text-[9px] text-neutral-700">• "Increase font size to 18px"</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- HTML Code Viewer -->
                <details class="group">
                  <summary class="cursor-pointer text-[10px] font-medium text-[#d97759] hover:text-[#c86648] flex items-center gap-1 select-none">
                    <svg class="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                    View Element HTML
                  </summary>
                  <pre class="mt-2 p-3 bg-neutral-900 text-neutral-100 rounded-lg text-[9px] overflow-x-auto leading-relaxed border border-neutral-700">{{ selectedElement.html }}</pre>
                </details>
              </div>
            </div>

            <!-- Website selector -->
            <div>
              <label class="block text-xs font-medium text-neutral-700 mb-1">Website</label>
              <div class="relative">
                <select
                  v-model="aiWebsiteId"
                  class="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-[#d97759]"
                >
                  <option value="" disabled>Select a website</option>
                  <option
                    v-for="site in websites"
                    :key="site.id + '-ai'"
                    :value="site.id"
                  >
                    {{ site.name || site.slug || site.id }}
                  </option>
                </select>
              </div>
              <p v-if="websitesLoading" class="mt-1 text-[11px] text-neutral-500">Loading websites...</p>
              <p v-if="websitesError" class="mt-1 text-[11px] text-red-600">{{ websitesError }}</p>
            </div>

            <!-- Load from Bucket or Local File -->
            <div>
              <label class="block text-xs font-medium text-neutral-700 mb-1">Load HTML file</label>
              
              <!-- Tab selector for bucket vs local -->
              <div class="flex gap-2 mb-2 border-b border-neutral-200">
                <button
                  type="button"
                  @click="fileLoadMode = 'bucket'"
                  :class="[
                    'px-3 py-1.5 text-xs font-medium transition-colors relative',
                    fileLoadMode === 'bucket'
                      ? 'text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-700'
                  ]"
                >
                  From Bucket
                  <span
                    v-if="fileLoadMode === 'bucket'"
                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"
                  ></span>
                </button>
                <button
                  type="button"
                  @click="fileLoadMode = 'local'"
                  :class="[
                    'px-3 py-1.5 text-xs font-medium transition-colors relative',
                    fileLoadMode === 'local'
                      ? 'text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-700'
                  ]"
                >
                  From Computer
                  <span
                    v-if="fileLoadMode === 'local'"
                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"
                  ></span>
                </button>
              </div>

              <!-- From Bucket -->
              <div v-if="fileLoadMode === 'bucket'" class="space-y-2">
                <button
                  type="button"
                  @click="loadBucketFiles"
                  :disabled="!aiWebsiteId || loadingBucketFiles"
                  class="w-full px-3 py-2 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ loadingBucketFiles ? 'Loading...' : 'Browse Bucket Files' }}
                </button>
                
                <div v-if="bucketFiles.length > 0" class="max-h-32 overflow-y-auto border border-neutral-200 rounded-lg">
                  <button
                    v-for="file in bucketFiles"
                    :key="file.versionId + '-' + file.path"
                    type="button"
                    @click="loadFileFromBucket(file)"
                    class="w-full px-3 py-2 text-left text-xs hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-b-0"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-neutral-800 truncate">{{ file.name }}</p>
                        <p class="text-[10px] text-neutral-500">{{ file.versionLabel }} · {{ file.path }}</p>
                      </div>
                      <svg class="w-4 h-4 text-neutral-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-6-4l-4-4m0 0l-4 4m4-4v12" />
                      </svg>
                    </div>
                  </button>
                </div>
                
                <p v-if="bucketFilesError" class="text-[10px] text-red-600">{{ bucketFilesError }}</p>
                <p v-if="!aiWebsiteId" class="text-[10px] text-neutral-500">Select a website first to browse its files</p>
              </div>

              <!-- From Computer -->
              <div v-if="fileLoadMode === 'local'" class="flex items-center gap-2">
                <input
                  id="ai-file-input"
                  type="file"
                  class="text-xs flex-1"
                  @change="onAiFileChange"
                  accept=".html,.htm"
                />
              </div>
              
              <!-- Loaded file indicator -->
              <div v-if="aiLoadedFile" class="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p class="text-[10px] font-medium text-emerald-900">File loaded: {{ aiLoadedFile }}</p>
                      <p v-if="aiLoadedFrom" class="text-[9px] text-emerald-700">Source: {{ aiLoadedFrom }}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="text-[11px] text-emerald-700 hover:text-emerald-900 underline"
                    @click="clearAiFile"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <!-- HTML Editor -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="block text-xs font-medium text-neutral-700">HTML Editor</label>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-neutral-500">{{ aiHtml.length }} characters</span>
                  <button
                    v-if="aiHtml"
                    type="button"
                    @click="aiHtml = ''"
                    class="text-[10px] text-neutral-500 hover:text-neutral-800 underline"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                v-model="aiHtml"
                rows="16"
                class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-[#d97759] resize-y font-mono"
                placeholder="<!doctype html>\n<html>\n  <head>...</head>\n  <body>...</body>\n</html>"
              ></textarea>
              <p class="mt-1 text-[10px] text-neutral-500">
                💡 Load a file above, edit manually, or ask AI below for targeted changes.
              </p>
              <p class="mt-1 text-[9px] text-neutral-400 italic">
                The AI will provide specific code snippets and instructions on where to place them.
              </p>
            </div>

            <!-- AI Chat Interface (Bottom) -->
            <div class="border border-neutral-200 rounded-lg p-4 bg-gradient-to-br from-[#d97759]/5 to-[#d97759]/10">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h4 class="text-xs font-semibold text-neutral-800">AI Assistant</h4>
                
                <!-- Chat History Selector -->
                <select
                  v-if="savedChats.length > 0"
                  v-model="currentChatId"
                  @change="loadChat"
                  class="ml-2 px-2 py-1 text-[10px] border border-neutral-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#d97759]"
                >
                  <option value="">New Chat</option>
                  <option v-for="chat in savedChats" :key="chat.id" :value="chat.id">
                    {{ chat.title || `Chat ${formatDate(chat.created_at)}` }}
                  </option>
                </select>
                
                <button
                  type="button"
                  @click="startNewChat"
                  class="ml-auto px-2 py-1 text-[10px] bg-white border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
                  title="Start new chat"
                >
                  New
                </button>
                <button
                  v-if="currentChatId"
                  type="button"
                  @click="deleteCurrentChat"
                  class="text-[10px] text-red-600 hover:text-red-800 underline"
                >
                  Delete
                </button>
              </div>
              
              <!-- Chat Messages -->
              <div v-if="chatMessages.length > 0" ref="chatContainer" class="space-y-2 max-h-64 overflow-y-auto mb-3 p-2 bg-white/50 rounded-lg">
                <div v-for="(msg, i) in chatMessages" :key="i"
                     class="flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
                  <div :class="msg.role === 'user' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-800'"
                       class="inline-block rounded-lg px-3 py-2 text-xs max-w-[85%] shadow-sm">
                    <div v-if="msg.content.includes('```')" class="space-y-1">
                      <div v-html="formatMessageWithCode(msg.content)" class="prose prose-xs max-w-none"></div>
                    </div>
                    <span v-else>{{ msg.content }}</span>
                  </div>
                </div>
                <div v-if="isAiTyping" class="flex justify-start">
                  <div class="inline-block bg-white rounded-lg px-3 py-2 shadow-sm">
                    <div class="flex space-x-1">
                      <span class="w-1.5 h-1.5 bg-[#d97759] rounded-full animate-bounce" style="animation-delay: 0s"></span>
                      <span class="w-1.5 h-1.5 bg-[#d97759] rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                      <span class="w-1.5 h-1.5 bg-[#d97759] rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Chat Input -->
              <div class="flex gap-2">
                <input v-model="chatInput" 
                       @keyup.enter="sendAiMessage"
                       placeholder="Ask AI to generate, edit, or improve the HTML above..."
                       class="flex-1 px-3 py-2.5 border border-neutral-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-[#d97759]" />
                <button @click="sendAiMessage"
                        :disabled="!chatInput.trim() || isAiTyping"
                        class="px-5 py-2.5 bg-[#d97759] text-white rounded-lg text-xs font-medium hover:bg-[#c86648] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
                  <span v-if="!isAiTyping">Send</span>
                  <span v-else>...</span>
                </button>
              </div>
              
              <div v-if="aiHtml" class="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div class="flex items-center gap-1.5">
                  <svg class="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-[9px] text-emerald-800 font-medium">
                    AI can read your file ({{ aiHtml.length }} characters loaded)
                  </p>
                </div>
              </div>
              
              <p class="mt-2 text-[10px] text-neutral-600">
                💬 Examples: "Add a contact form after the hero", "Change the header background to blue", "Add hover effects to buttons", "Make the footer responsive"
              </p>
              <p class="mt-1 text-[9px] text-neutral-500 italic">
                💡 Tip: Be specific about where to make changes. The AI will provide targeted edits instead of regenerating everything.
              </p>
            </div>

            <!-- Generate Button & Status -->
            <div class="flex flex-col gap-2">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
                :disabled="!aiWebsiteId || !aiHtml.trim() || generating || !supabase"
                @click="handleGenerate"
              >
                <svg
                  v-if="generating"
                  class="h-4 w-4 mr-2 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>{{ generating ? 'Creating version...' : 'Create generated version' }}</span>
              </button>

              <p v-if="generateError" class="text-[11px] text-red-600">{{ generateError }}</p>
              <p v-if="generateSuccess" class="text-[11px] text-emerald-600 break-all">
                Generated version {{ generateSuccess.versionId }} at
                <span class="font-mono">{{ generateSuccess.storageRoot }}/index.html</span>
              </p>
            </div>
          </div>

          <!-- Existing Versions / Previews -->
          <div class="mt-6 border-t border-neutral-100 pt-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xs font-semibold text-neutral-800">Versions for this website</h3>
              <button
                v-if="currentWebsiteId"
                type="button"
                class="text-[11px] text-neutral-500 hover:text-neutral-800 underline-offset-2 hover:underline"
                @click="refreshVersions"
              >
                Refresh
              </button>
            </div>

            <p v-if="!currentWebsiteId" class="text-[11px] text-neutral-500">
              Select a website to view its hosted versions.
            </p>

            <p v-else-if="versionsLoading" class="text-[11px] text-neutral-500">Loading versions...</p>
            <p v-else-if="versionsError" class="text-[11px] text-red-600">{{ versionsError }}</p>

            <div v-else-if="versions.length === 0" class="text-[11px] text-neutral-500">
              No versions yet. Upload files or generate HTML to create a hosted version.
            </div>

            <ul v-else class="mt-1 space-y-1 max-h-40 overflow-auto pr-1">
              <li
                v-for="version in versions"
                :key="version.id"
                class="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2"
              >
                <div class="min-w-0">
                  <p class="text-[11px] font-medium text-neutral-800 truncate">
                    {{ version.label || (version.source_type === 'generated' ? 'Generated' : 'Upload') }}
                  </p>
                  <p class="text-[10px] text-neutral-500 truncate">
                    {{ formatDate(version.created_at) }} · {{ version.source_type }}
                  </p>
                </div>
                <NuxtLink
                  :to="`/site/${version.website_id}/${version.id}/index.html`"
                  target="_blank"
                  class="ml-3 inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-2 py-1 text-[10px] font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  Preview
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6h8m0 0v8m0-8L9 15" />
                  </svg>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useSupabaseClient } from '~/composables/useSupabase.js'

const supabase = useSupabaseClient()

const websites = ref<any[]>([])
const websitesLoading = ref(false)
const websitesError = ref<string | null>(null)
const deployMode = ref<'upload' | 'generate'>('upload')
const selectedWebsiteId = ref<string>('')

const selectedFile = ref<File | null>(null)
const uploading = ref(false)
const uploadError = ref<string | null>(null)
const uploadSuccess = ref<string | null>(null)

const versions = ref<any[]>([])
const versionsLoading = ref(false)
const versionsError = ref<string | null>(null)

const aiWebsiteId = ref<string>('')
const aiHtml = ref<string>('')
const aiLoadedFile = ref<string>('')
const aiLoadedFrom = ref<string>('')
const generating = ref(false)
const generateError = ref<string | null>(null)
const generateSuccess = ref<{ versionId: string; storageRoot: string } | null>(null)

const fileLoadMode = ref<'bucket' | 'local'>('bucket')
const bucketFiles = ref<Array<{ name: string; path: string; versionId: string; versionLabel: string }>>([])
const loadingBucketFiles = ref(false)
const bucketFilesError = ref<string | null>(null)

const chatMessages = ref<Array<{ role: string; content: string }>>([])
const chatInput = ref<string>('')

// Component system integration
const { 
  components,
  selectedComponentId,
  selectedComponent,
  hoveredComponentId,
  parseHTML,
  toHTML,
  selectComponent,
  hoverComponent,
  updateComponent,
  getComponentPath,
  flatComponents,
  selectableComponents,
  stats: componentStats
} = useComponents()
const isAiTyping = ref(false)
const currentChatId = ref<string>('')
const savedChats = ref<Array<any>>([])
const loadingChats = ref(false)

const currentWebsiteId = computed(() => {
  return deployMode.value === 'upload' ? selectedWebsiteId.value : aiWebsiteId.value
})

// Preview and element selection state
const previewIframe = ref<HTMLIFrameElement | null>(null)
const viewportSize = ref<string>('responsive')
const enableElementSelector = ref(false)
const selectedElement = ref<{ 
  tag: string
  selector: string
  html: string
  lineNumber?: number
  lineRange?: { start: number; end: number }
  context?: {
    parent?: string
    siblings?: { before?: string; after?: string }
    attributes?: Record<string, string>
    textContent?: string
    index?: number
  }
} | null>(null)
const previewHeight = ref('600px')
const previewLoading = ref(false)
const previewError = ref<string | null>(null)

const viewportSizes = [
  { 
    value: 'responsive', 
    label: 'Responsive', 
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
  },
  { 
    value: 'desktop', 
    label: 'Desktop (1200px)', 
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
  },
  { 
    value: 'tablet', 
    label: 'Tablet (768px)', 
    icon: 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' 
  },
  { 
    value: 'mobile', 
    label: 'Mobile (375px)', 
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' 
  }
]

const previewWrapperStyle = computed(() => {
  const sizes: Record<string, string> = {
    responsive: 'max-width: 100%',
    desktop: 'max-width: 1200px',
    tablet: 'max-width: 768px',
    mobile: 'max-width: 375px'
  }
  return sizes[viewportSize.value] || sizes.responsive
})

const formatDate = (value: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  selectedFile.value = file || null
  uploadError.value = null
  uploadSuccess.value = null
}

const onAiFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) {
    aiLoadedFile.value = ''
    return
  }

  try {
    const text = await file.text()
    aiHtml.value = text
    aiLoadedFile.value = file.name
    aiLoadedFrom.value = 'Local computer'
  } catch (err: any) {
    console.error('[AI] File read error', err)
    aiLoadedFile.value = ''
  }
}

const clearAiFile = () => {
  aiHtml.value = ''
  aiLoadedFile.value = ''
  aiLoadedFrom.value = ''
  const input = document.getElementById('ai-file-input') as HTMLInputElement | null
  if (input) input.value = ''
}

const loadBucketFiles = async () => {
  if (!aiWebsiteId.value) return
  
  loadingBucketFiles.value = true
  bucketFilesError.value = null
  bucketFiles.value = []
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    
    if (!token) {
      bucketFilesError.value = 'Please sign in to browse files.'
      return
    }
    
    // Get all versions for this website
    const versionsRes = await $fetch<{ success: boolean; versions: any[] }>('/api/hosting/versions', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        websiteId: aiWebsiteId.value
      }
    })
    
    if (!versionsRes.success) {
      bucketFilesError.value = 'Failed to load versions.'
      return
    }
    
    // For each version, list files in that version's folder
    const filePromises = versionsRes.versions.map(async (version) => {
      const path = `${aiWebsiteId.value}/${version.id}`
      
      const { data: files, error } = await supabase.storage
        .from('websites')
        .list(path)
      
      if (error || !files) return []
      
      return files
        .filter(f => f.name.endsWith('.html') || f.name.endsWith('.htm'))
        .map(f => ({
          name: f.name,
          path: `${path}/${f.name}`,
          versionId: version.id,
          versionLabel: version.label || (version.source_type === 'generated' ? 'Generated' : 'Upload')
        }))
    })
    
    const allFiles = await Promise.all(filePromises)
    bucketFiles.value = allFiles.flat()
    
    if (bucketFiles.value.length === 0) {
      bucketFilesError.value = 'No HTML files found in bucket for this website.'
    }
    
  } catch (err: any) {
    console.error('[Bucket] Load files error', err)
    bucketFilesError.value = err?.message || 'Failed to load bucket files.'
  } finally {
    loadingBucketFiles.value = false
  }
}

const loadFileFromBucket = async (file: { name: string; path: string; versionId: string; versionLabel: string }) => {
  try {
    const { data, error } = await supabase.storage
      .from('websites')
      .download(file.path)
    
    if (error) throw error
    
    const text = await data.text()
    aiHtml.value = text
    aiLoadedFile.value = file.name
    aiLoadedFrom.value = `Bucket: ${file.versionLabel}`
    
  } catch (err: any) {
    console.error('[Bucket] Download file error', err)
    bucketFilesError.value = `Failed to load ${file.name}: ${err.message}`
  }
}

const sendAiMessage = async () => {
  if (!chatInput.value.trim() || !aiWebsiteId.value) return
  
  chatMessages.value.push({
    role: 'user',
    content: chatInput.value
  })
  
  const userMsg = chatInput.value
  chatInput.value = ''
  isAiTyping.value = true
  
  // Scroll chat to bottom
  nextTick(() => {
    const container = document.querySelector('[ref="chatContainer"]')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    
    if (!token) {
      chatMessages.value.push({
        role: 'assistant',
        content: 'Please sign in to use the AI assistant.'
      })
      return
    }
    
    const res = await $fetch<{ success: boolean; message: string }>('/api/hosting/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: {
        messages: chatMessages.value,
        generatedCode: aiHtml.value ? {
          content: aiHtml.value, // Send full HTML content so AI can read it
          fileName: aiLoadedFile.value || 'index.html',
          type: 'HTML'
        } : null,
        selectedElement: selectedElement.value // Send selected element for targeted edits
      }
    })
    
    chatMessages.value.push({
      role: 'assistant',
      content: res.message
    })
    
    // Extract and write code to editor
    extractCodeFromResponse(res.message)
    
    // Save chat to database
    await saveChatToDatabase()
    
    // Scroll chat to bottom
    nextTick(() => {
      const container = document.querySelector('[ref="chatContainer"]')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    })
    
  } catch (err: any) {
    console.error('[AI] Chat error', err)
    chatMessages.value.push({
      role: 'assistant',
      content: `Error: ${err?.data?.message || err?.message || 'Failed to get AI response'}`
    })
  } finally {
    isAiTyping.value = false
  }
}

const saveChatToDatabase = async () => {
  if (!aiWebsiteId.value || chatMessages.value.length === 0) return
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) return
    
    // Generate title from first user message
    const title = currentChatId.value ? undefined : chatMessages.value[0]?.content.substring(0, 50)
    
    const res = await $fetch<{ success: boolean; chat: any }>('/api/hosting/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: {
        websiteId: aiWebsiteId.value,
        messages: chatMessages.value,
        title: title,
        chatId: currentChatId.value || undefined
      }
    })
    
    if (res.success && res.chat) {
      // Update current chat ID if this was a new chat
      if (!currentChatId.value) {
        currentChatId.value = res.chat.id
      }
      // Reload chat list
      await loadSavedChats()
    }
  } catch (err: any) {
    console.error('[Chat] Save error', err)
  }
}

const loadSavedChats = async () => {
  if (!aiWebsiteId.value) return
  
  loadingChats.value = true
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) return
    
    const res = await $fetch<{ success: boolean; chats: any[] }>('/api/hosting/chats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        websiteId: aiWebsiteId.value
      }
    })
    
    if (res.success) {
      savedChats.value = res.chats || []
    }
  } catch (err: any) {
    console.error('[Chat] Load chats error', err)
  } finally {
    loadingChats.value = false
  }
}

const loadChat = () => {
  if (!currentChatId.value) {
    startNewChat()
    return
  }
  
  const chat = savedChats.value.find(c => c.id === currentChatId.value)
  if (chat && chat.messages) {
    chatMessages.value = chat.messages
    
    // Scroll to bottom
    nextTick(() => {
      const container = document.querySelector('[ref="chatContainer"]')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    })
  }
}

const startNewChat = () => {
  currentChatId.value = ''
  chatMessages.value = []
}

const formatMessageWithCode = (content: string) => {
  // First, protect code blocks from other replacements
  const codeBlocks: string[] = []
  let formatted = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`
    codeBlocks.push(`<pre class="bg-neutral-900 text-neutral-100 p-3 rounded text-[10px] overflow-x-auto mt-2 mb-2 font-mono"><code>${escapeHtml(code.trim())}</code></pre>`)
    return placeholder
  })
  
  // Format markdown
  formatted = formatted
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>') // Bold
    .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic
    .replace(/`([^`]+)`/g, '<code class="bg-neutral-100 px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-800">$1</code>') // Inline code
  
  // Handle line breaks
  formatted = formatted.replace(/\n/g, '<br>')
  
  // Restore code blocks
  codeBlocks.forEach((block, index) => {
    formatted = formatted.replace(`__CODE_BLOCK_${index}__`, block)
  })
  
  return formatted
}

const escapeHtml = (text: string) => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

const deleteCurrentChat = async () => {
  if (!currentChatId.value) return
  
  if (!confirm('Delete this chat conversation?')) return
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) return
    
    await $fetch(`/api/hosting/chats/${currentChatId.value}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    // Start new chat and reload list
    startNewChat()
    await loadSavedChats()
  } catch (err: any) {
    console.error('[Chat] Delete error', err)
  }
}

// Preview and element selection functions
const handlePreviewLoad = () => {
  previewLoading.value = false
  previewError.value = null
}

// Helper functions - MUST be defined before setupElementSelector

// Helper: Normalize HTML for comparison
const normalizeHtml = (html: string): string => {
  return html
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/>\s+</g, '><') // Remove whitespace between tags
    .trim()
}

// Helper: Escape regex special characters
const escapeRegex = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Helper: Find closing tag for an element
const findClosingTag = (lines: string[], startLine: number, tagName: string): number => {
  // Check if self-closing
  if (lines[startLine].includes('/>')) {
    return startLine
  }
  
  let depth = 0
  const openPattern = new RegExp(`<${tagName}[\\s>]`, 'i')
  const closePattern = new RegExp(`</${tagName}>`, 'i')
  
  for (let i = startLine; i < lines.length; i++) {
    const line = lines[i]
    
    // Count opening tags
    const opens = (line.match(openPattern) || []).length
    depth += opens
    
    // Count closing tags
    const closes = (line.match(closePattern) || []).length
    depth -= closes
    
    if (depth === 0 && closes > 0) {
      return i
    }
  }
  
  return startLine // Fallback to start line
}

// Helper: Get confidence score for strategy
const getStrategyConfidence = (strategyName: string): number => {
  const scores: Record<string, number> = {
    'id-attribute': 0.98,      // Unique ID - highest confidence
    'tag-signature': 0.95,     // Tag + attributes match
    'any-class-tag': 0.85,     // Any class + tag match
    'text-content': 0.70,      // Text content match
    'partial-html': 0.65,      // Partial HTML match
    'tag-position': 0.50,      // Position in parent
    'fuzzy-tag': 0.30          // Last resort - just tag name
  }
  return scores[strategyName] || 0.5
}

// Find element line range using multiple matching strategies
const findElementLineRange = (
  element: HTMLElement, 
  elementHtml: string, 
  fullHtml: string
): { start: number; end: number; confidence: number } | undefined => {
  try {
    const lines = fullHtml.split('\n')
    const strategies: Array<{ name: string; match: () => { start: number; end: number } | null }> = []
    
    // Strategy 1: ID attribute match (highest confidence - unique identifiers)
    if (element.id) {
      strategies.push({
        name: 'id-attribute',
        match: () => {
          const idPattern = new RegExp(`id=["'\`]${escapeRegex(element.id)}["'\`]`, 'i')
          for (let i = 0; i < lines.length; i++) {
            if (idPattern.test(lines[i])) {
              const endLine = findClosingTag(lines, i, element.tagName.toLowerCase())
              return { start: i + 1, end: endLine + 1 }
            }
          }
          return null
        }
      })
    }
    
    // Strategy 2: Opening tag signature match (very reliable)
    strategies.push({
      name: 'tag-signature',
      match: () => {
        const tag = element.tagName.toLowerCase()
        // Extract key attributes for matching
        const attrs: string[] = []
        if (element.id) attrs.push(`id="${element.id}"`)
        if (element.className) {
          const classes = element.className.split(' ').filter(c => c.trim())
          if (classes.length > 0) attrs.push(`class="${classes.join(' ')}"`)
        }
        
        // Build a flexible pattern that matches the opening tag with key attributes
        const attrPatterns = attrs.map(attr => {
          const [key, value] = attr.split('=')
          const cleanValue = value.replace(/['"]/g, '')
          return `${key}=["'\`][^"'\`]*${escapeRegex(cleanValue)}[^"'\`]*["'\`]`
        })
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          // Check if line contains opening tag
          if (line.includes(`<${tag}`) && !line.includes(`</${tag}`)) {
            // If we have attributes, verify they match
            if (attrPatterns.length === 0 || attrPatterns.every(pattern => new RegExp(pattern, 'i').test(line))) {
              const endLine = findClosingTag(lines, i, tag)
              return { start: i + 1, end: endLine + 1 }
            }
          }
        }
        return null
      }
    })
    
    // Strategy 3: Any class match + tag (more flexible)
    if (element.className) {
      const classes = element.className.split(' ').filter(c => c.trim())
      if (classes.length > 0) {
        strategies.push({
          name: 'any-class-tag',
          match: () => {
            const tag = element.tagName.toLowerCase()
            // Try to match any of the classes
            for (const cls of classes) {
              const classPattern = new RegExp(`<${tag}[^>]*class=["'\`][^"'\`]*\\b${escapeRegex(cls)}\\b[^"'\`]*["'\`]`, 'i')
              for (let i = 0; i < lines.length; i++) {
                if (classPattern.test(lines[i])) {
                  const endLine = findClosingTag(lines, i, tag)
                  return { start: i + 1, end: endLine + 1 }
                }
              }
            }
            return null
          }
        })
      }
    }
    
    // Strategy 4: Text content match (improved - more flexible)
    const textContent = element.textContent?.trim()
    if (textContent && textContent.length > 3) { // Lowered from 10 to 3
      strategies.push({
        name: 'text-content',
        match: () => {
          const tag = element.tagName.toLowerCase()
          // Use first 30 chars or full text if shorter
          const searchText = textContent.substring(0, Math.min(30, textContent.length))
          
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(searchText)) {
              // Search backwards up to 20 lines for opening tag
              for (let j = i; j >= Math.max(0, i - 20); j--) {
                if (lines[j].includes(`<${tag}`) && !lines[j].includes(`</${tag}>`)) {
                  const endLine = findClosingTag(lines, j, tag)
                  return { start: j + 1, end: endLine + 1 }
                }
              }
              // Also search forward in case text is on opening tag line
              if (lines[i].includes(`<${tag}`)) {
                const endLine = findClosingTag(lines, i, tag)
                return { start: i + 1, end: endLine + 1 }
              }
            }
          }
          return null
        }
      })
    }
    
    // Strategy 5: Partial HTML match (more flexible than exact match)
    strategies.push({
      name: 'partial-html',
      match: () => {
        const tag = element.tagName.toLowerCase()
        const normalizedElement = normalizeHtml(elementHtml)
        const firstLine = normalizedElement.split('\n')[0]
        
        // Extract just the opening tag portion
        const openTagMatch = firstLine.match(new RegExp(`<${tag}[^>]*>`, 'i'))
        if (openTagMatch) {
          const openTag = normalizeHtml(openTagMatch[0])
          
          for (let i = 0; i < lines.length; i++) {
            const normalizedLine = normalizeHtml(lines[i])
            if (normalizedLine.includes(openTag.substring(0, Math.min(20, openTag.length)))) {
              const endLine = findClosingTag(lines, i, tag)
              return { start: i + 1, end: endLine + 1 }
            }
          }
        }
        return null
      }
    })
    
    // Strategy 6: Tag + position in parent (improved fallback)
    strategies.push({
      name: 'tag-position',
      match: () => {
        const parentTag = element.parentElement?.tagName.toLowerCase()
        if (!parentTag) return null
        
        const tag = element.tagName.toLowerCase()
        const siblings = Array.from(element.parentElement?.children || [])
        const sameTagSiblings = siblings.filter(s => s.tagName.toLowerCase() === tag)
        const targetIndex = sameTagSiblings.indexOf(element)
        
        if (targetIndex === -1) return null
        
        // Find parent opening tag first
        let parentLine = -1
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(`<${parentTag}`) && !lines[i].includes(`</${parentTag}>`)) {
            parentLine = i
            break
          }
        }
        
        if (parentLine === -1) return null
        
        // Count matching tags after parent
        const tagPattern = new RegExp(`<${tag}[\\s>]`, 'i')
        let matches = 0
        
        for (let i = parentLine; i < lines.length; i++) {
          if (tagPattern.test(lines[i])) {
            if (matches === targetIndex) {
              const endLine = findClosingTag(lines, i, tag)
              return { start: i + 1, end: endLine + 1 }
            }
            matches++
          }
        }
        return null
      }
    })
    
    // Strategy 7: Fuzzy tag match (last resort - just find any matching tag)
    strategies.push({
      name: 'fuzzy-tag',
      match: () => {
        const tag = element.tagName.toLowerCase()
        const tagPattern = new RegExp(`<${tag}[\\s>]`, 'i')
        
        // Find first occurrence of this tag
        for (let i = 0; i < lines.length; i++) {
          if (tagPattern.test(lines[i])) {
            const endLine = findClosingTag(lines, i, tag)
            return { start: i + 1, end: endLine + 1 }
          }
        }
        return null
      }
    })
    
    // Try each strategy in order
    for (const strategy of strategies) {
      try {
        const result = strategy.match()
        if (result) {
          console.log(`[Line Detection] ✓ Strategy "${strategy.name}" succeeded:`, result)
          return {
            ...result,
            confidence: getStrategyConfidence(strategy.name)
          }
        }
      } catch (err) {
        console.warn(`[Line Detection] Strategy "${strategy.name}" error:`, err)
      }
    }
    
    console.warn('[Line Detection] ✗ All strategies failed for element:', {
      tag: element.tagName,
      id: element.id,
      classes: element.className,
      textLength: element.textContent?.length || 0
    })
    return undefined
    
  } catch (error) {
    console.error('[Line Detection] Error:', error)
    return undefined
  }
}

// Capture comprehensive element data for precise matching
const captureElementData = (element: HTMLElement, doc: Document) => {
  const tag = element.tagName.toLowerCase()
  const selector = generateSelector(element, doc)
  const html = element.outerHTML
  
  // Capture element context
  const context = {
    parent: element.parentElement?.tagName.toLowerCase(),
    siblings: {
      before: element.previousElementSibling?.tagName.toLowerCase(),
      after: element.nextElementSibling?.tagName.toLowerCase()
    },
    attributes: {} as Record<string, string>,
    textContent: element.textContent?.trim().substring(0, 100), // First 100 chars
    index: Array.from(element.parentElement?.children || []).indexOf(element)
  }
  
  // Capture all attributes
  Array.from(element.attributes).forEach(attr => {
    context.attributes[attr.name] = attr.value
  })
  
  // Find line range using multiple strategies
  const lineRange = findElementLineRange(element, html, aiHtml.value)
  
  return {
    tag,
    selector,
    html,
    lineNumber: lineRange?.start,
    lineRange,
    context
  }
}

const generateSelector = (element: HTMLElement, doc: Document): string => {
  if (element.id) {
    return `#${element.id}`
  }
  
  if (element.className) {
    const classes = element.className.split(' ').filter(c => c).join('.')
    if (classes) {
      const selector = `${element.tagName.toLowerCase()}.${classes}`
      if (doc.querySelectorAll(selector).length === 1) {
        return selector
      }
    }
  }
  
  // Generate path-based selector
  const path: string[] = []
  let current: HTMLElement | null = element
  while (current && current.tagName) {
    let selector = current.tagName.toLowerCase()
    if (current.parentElement) {
      const siblings = Array.from(current.parentElement.children).filter(
        e => e.tagName === current!.tagName
      )
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1
        selector += `:nth-of-type(${index})`
      }
    }
    path.unshift(selector)
    current = current.parentElement
    if (path.length > 5) break // Limit depth
  }
  return path.join(' > ')
}

const clearSelection = () => {
  selectedElement.value = null
}

// Inject component IDs into HTML for selection
// Only inject IDs for selectable semantic sections
const injectComponentIds = (html: string): string => {
  if (!components.value || components.value.length === 0) {
    return html
  }
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const selectable = selectableComponents.value
  
  console.log('[Preview] Injecting IDs for', selectable.length, 'selectable components')
  
  // Create a map of components by their characteristics for matching
  const componentMap = new Map<string, typeof selectable[0]>()
  
  for (const component of selectable) {
    // Create a unique key based on tag, classes, and position
    const key = `${component.tagName}-${component.classes.join('-')}-${component.lineStart}`
    componentMap.set(key, component)
  }
  
  // Find and mark elements in the parsed document
  const markElement = (element: Element, component: typeof selectable[0]) => {
    element.setAttribute('data-component-id', component.id)
    element.setAttribute('data-component-type', component.type)
    console.log('[Preview] Injected ID for', component.type, ':', component.id, 'on', element.tagName)
  }
  
  // Traverse and mark selectable elements
  for (const component of selectable) {
    const tagName = component.tagName.toUpperCase()
    const elements = doc.querySelectorAll(tagName)
    
    for (const element of Array.from(elements)) {
      // Check if this element matches the component
      const elementClasses = Array.from(element.classList)
      const matchesClasses = component.classes.length === 0 || 
        component.classes.some(cls => elementClasses.includes(cls))
      
      // Check if element already has an ID
      if (!element.hasAttribute('data-component-id') && matchesClasses) {
        markElement(element, component)
        break // Only mark first match
      }
    }
  }
  
  // Return the modified HTML
  const result = doc.documentElement.outerHTML
  console.log('[Preview] Injection complete')
  return result
}

const refreshPreview = () => {
  if (!aiHtml.value || !previewIframe.value) return
  
  try {
    previewLoading.value = true
    previewError.value = null
    
    const iframe = previewIframe.value
    const doc = iframe.contentDocument || iframe.contentWindow?.document
    
    if (!doc) {
      previewError.value = 'Unable to access iframe document'
      previewLoading.value = false
      return
    }
    
    // Inject component IDs into HTML before rendering
    const htmlWithIds = injectComponentIds(aiHtml.value)
    
    doc.open()
    doc.write(htmlWithIds)
    doc.close()
    
    // Setup element selector after content loads
    iframe.onload = () => {
      previewLoading.value = false
      if (enableElementSelector.value) {
        const loadedDoc = iframe.contentDocument || iframe.contentWindow?.document
        if (loadedDoc && loadedDoc.body) {
          setupElementSelector(loadedDoc)
        }
      }
    }
  } catch (error: any) {
    previewError.value = error.message || 'Failed to load preview'
    previewLoading.value = false
    console.error('[Preview] Error:', error)
  }
}

const setupElementSelector = (doc: Document) => {
  if (!doc || !doc.body || !doc.head) return
  
  try {
    // Add hover styles
    const style = doc.createElement('style')
    style.textContent = `
      .builder-hover-highlight {
        outline: 2px solid #d97759 !important;
        outline-offset: 2px !important;
        cursor: pointer !important;
      }
    `
    doc.head.appendChild(style)
    
    // Add click handler to all elements
    doc.body.addEventListener('click', (e) => {
      try {
        if (!enableElementSelector.value) return
        e.preventDefault()
        e.stopPropagation()
        
        const element = e.target as HTMLElement
        
        // Try to get component ID from data attribute
        const componentId = element.dataset.componentId
        
        if (componentId) {
          // Select component using component system
          selectComponent(componentId)
          
          console.log('[Component Selection] Selected component:', {
            id: componentId,
            component: selectedComponent.value
          })
        } else {
          // Fallback to old element selection
          const elementData = captureElementData(element, doc)
          selectedElement.value = elementData
          
          console.log('[Element Selection] Fallback - no component ID:', {
            tag: elementData.tag,
            selector: elementData.selector
          })
        }
      } catch (err) {
        console.error('[Element Selection] Click handler error:', err)
      }
    })
    
    // Add hover effect
    doc.body.addEventListener('mouseover', (e) => {
      try {
        if (!enableElementSelector.value) return
        const element = e.target as HTMLElement
        element.classList.add('builder-hover-highlight')
        
        // Update hover state in component system
        const componentId = element.dataset.componentId
        if (componentId) {
          hoverComponent(componentId)
        }
      } catch (err) {
        // Silently ignore hover errors
      }
    })
    
    doc.body.addEventListener('mouseout', (e) => {
      try {
        if (!enableElementSelector.value) return
        const element = e.target as HTMLElement
        element.classList.remove('builder-hover-highlight')
        
        // Clear hover state
        hoverComponent(null)
      } catch (err) {
        // Silently ignore hover errors
      }
    })
  } catch (error) {
    console.error('[Element Selector] Setup error:', error instanceof Error ? error.message : String(error))
  }
}

// Apply code changes with diff-based approach
const applyCodeChanges = (originalCode: string, changes: Array<{ lineStart: number; lineEnd: number; newCode: string }>): string => {
  try {
    const lines = originalCode.split('\n')
    
    // Sort changes by line number (descending) to apply from bottom to top
    const sortedChanges = [...changes].sort((a, b) => b.lineStart - a.lineStart)
    
    for (const change of sortedChanges) {
      const { lineStart, lineEnd, newCode } = change
      
      // Validate line numbers
      if (lineStart < 1 || lineStart > lines.length) {
        console.warn(`[Code Apply] Invalid line start: ${lineStart}`)
        continue
      }
      
      // Remove old lines and insert new code
      const newLines = newCode.split('\n')
      lines.splice(lineStart - 1, lineEnd - lineStart + 1, ...newLines)
    }
    
    return lines.join('\n')
  } catch (error: any) {
    console.error('[Code Apply] Error:', error)
    throw new Error(`Failed to apply code changes: ${error.message}`)
  }
}

// Validate HTML before storage
const validateHtml = (html: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  try {
    // Check for basic HTML structure
    if (!html.includes('<!DOCTYPE') && !html.includes('<html')) {
      errors.push('Missing DOCTYPE or html tag')
    }
    
    // Check for unclosed tags
    const openTags = html.match(/<([a-z][a-z0-9]*)\b[^>]*>/gi) || []
    const closeTags = html.match(/<\/([a-z][a-z0-9]*)>/gi) || []
    
    const openTagNames = openTags.map(tag => {
      const match = tag.match(/<([a-z][a-z0-9]*)/i)
      return match ? match[1].toLowerCase() : ''
    }).filter(tag => !['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tag))
    
    const closeTagNames = closeTags.map(tag => {
      const match = tag.match(/<\/([a-z][a-z0-9]*)/i)
      return match ? match[1].toLowerCase() : ''
    })
    
    // Simple validation: count should match
    if (openTagNames.length !== closeTagNames.length) {
      errors.push('Potential unclosed tags detected')
    }
    
    // Check for minimum content
    if (html.length < 100) {
      errors.push('HTML content seems too short')
    }
    
  } catch (error: any) {
    errors.push(`Validation error: ${error.message}`)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// Watch for HTML changes and refresh preview
watch(aiHtml, () => {
  if (aiHtml.value) {
    nextTick(() => {
      refreshPreview()
    })
  }
})

// Watch for element selector toggle
watch(enableElementSelector, () => {
  if (enableElementSelector.value && aiHtml.value) {
    nextTick(() => {
      refreshPreview()
    })
  }
})

const extractCodeFromResponse = (message: string) => {
  // Match code blocks with language identifier
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  const matches = [...message.matchAll(codeBlockRegex)]
  
  if (matches.length > 0) {
    // Use the first code block found
    const [, language, code] = matches[0]
    
    // Determine file extension and type
    const extensions: Record<string, { ext: string; type: string }> = {
      'html': { ext: 'html', type: 'HTML' },
      'css': { ext: 'css', type: 'CSS' },
      'javascript': { ext: 'js', type: 'JavaScript' },
      'js': { ext: 'js', type: 'JavaScript' },
      'json': { ext: 'json', type: 'JSON' },
      'typescript': { ext: 'ts', type: 'TypeScript' },
      'ts': { ext: 'ts', type: 'TypeScript' }
    }
    
    const fileInfo = extensions[language?.toLowerCase() || ''] || { ext: 'txt', type: 'Text' }
    
    // Check if this is HTML code
    if (fileInfo.type === 'HTML' || code.trim().startsWith('<!DOCTYPE') || code.trim().startsWith('<html')) {
      // Auto-apply HTML code to editor
      aiHtml.value = code.trim()
      
      // Update loaded file indicator
      aiLoadedFile.value = `AI Generated (${fileInfo.type})`
      aiLoadedFrom.value = 'AI Assistant'
      
      console.log('[AI] Code extracted and applied to editor:', {
        type: fileInfo.type,
        length: code.trim().length
      })
      
      // Refresh preview after code is applied
      nextTick(() => {
        refreshPreview()
      })
    } else {
      // For non-HTML code (CSS, JS), log but don't auto-apply
      console.log('[AI] Non-HTML code detected:', fileInfo.type)
    }
  }
}

const loadWebsites = async () => {
  try {
    websitesLoading.value = true
    websitesError.value = null

    const token = (await supabase.auth.getSession()).data.session?.access_token

    if (!token) {
      websitesError.value = 'You must be signed in to load websites.'
      return
    }

    const res = await $fetch<{ success: boolean; websites: any[] }>('/api/websites', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.success) {
      websitesError.value = 'Failed to load websites.'
      return
    }

    websites.value = res.websites || []
  } catch (err: any) {
    console.error('[Hosting] Failed to load websites', err)
    websitesError.value = err?.message || 'Failed to load websites.'
  } finally {
    websitesLoading.value = false
  }
}

const loadVersions = async () => {
  if (!currentWebsiteId.value) {
    versions.value = []
    versionsError.value = null
    return
  }

  try {
    versionsLoading.value = true
    versionsError.value = null

    const token = (await supabase.auth.getSession()).data.session?.access_token

    if (!token) {
      versionsError.value = 'You must be signed in to load versions.'
      return
    }

    const res = await $fetch<{ success: boolean; versions: any[] }>('/api/hosting/versions', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        websiteId: currentWebsiteId.value
      }
    })

    if (!res.success) {
      versionsError.value = 'Failed to load versions.'
      return
    }

    versions.value = res.versions || []
  } catch (err: any) {
    console.error('[Hosting] Failed to load versions', err)
    versionsError.value = err?.message || 'Failed to load versions.'
  } finally {
    versionsLoading.value = false
  }
}

const refreshVersions = () => {
  loadVersions()
}

const handleUpload = async () => {
  if (!selectedWebsiteId.value) {
    uploadError.value = 'Please select a website.'
    return
  }

  if (!selectedFile.value) {
    uploadError.value = 'Please select a file to upload.'
    return
  }

  uploading.value = true
  uploadError.value = null
  uploadSuccess.value = null

  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token

    if (!token) {
      uploadError.value = 'You must be signed in to upload.'
      return
    }

    const form = new FormData()
    form.append('websiteId', selectedWebsiteId.value)
    form.append('file', selectedFile.value)

    const res = await $fetch<{ success: boolean; websiteId: string; versionId: string; storageRoot: string }>(
      '/api/hosting/upload',
      {
        method: 'POST',
        body: form,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!res?.success) {
      uploadError.value = 'Upload failed.'
      return
    }

    uploadSuccess.value = `${res.storageRoot}`

    // Refresh versions list so the new upload appears in the UI
    await loadVersions()
  } catch (err: any) {
    console.error('Unexpected upload error', err)
    uploadError.value = err?.data?.statusMessage || err?.message || 'Unexpected error during upload.'
  } finally {
    uploading.value = false
  }
}

const handleGenerate = async () => {
  if (!aiWebsiteId.value || !aiHtml.value.trim()) {
    generateError.value = 'Please select a website and ensure HTML content is present.'
    return
  }

  try {
    generating.value = true
    generateError.value = null
    generateSuccess.value = null

    // Validate HTML before sending
    const validation = validateHtml(aiHtml.value)
    if (!validation.valid) {
      console.warn('[Generate] HTML validation warnings:', validation.errors)
      // Show warnings but allow generation
      const proceed = confirm(
        `HTML validation found potential issues:\n${validation.errors.join('\n')}\n\nDo you want to proceed anyway?`
      )
      if (!proceed) {
        generating.value = false
        return
      }
    }

    const token = (await supabase.auth.getSession()).data.session?.access_token

    if (!token) {
      generateError.value = 'You must be signed in to generate a version.'
      return
    }

    const res = await $fetch<{ success: boolean; versionId: string; storageRoot: string }>(
      '/api/hosting/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: {
          websiteId: aiWebsiteId.value,
          html: aiHtml.value,
          label: `Generated ${new Date().toLocaleString()}`
        }
      }
    )

    if (!res.success) {
      generateError.value = 'Failed to generate version.'
      return
    }

    generateSuccess.value = {
      versionId: res.versionId,
      storageRoot: res.storageRoot
    }

    console.log('[Generate] Success - HTML validated and stored:', {
      versionId: res.versionId,
      htmlLength: aiHtml.value.length,
      validationPassed: validation.valid
    })

    // Reload versions list
    await loadVersions()
  } catch (err: any) {
    console.error('[Hosting] Generate error', err)
    generateError.value = err?.message || 'Failed to generate version.'
  } finally {
    generating.value = false
  }
}

onMounted(() => {
  loadWebsites()
})

watch(currentWebsiteId, () => {
  loadVersions()
})

watch(aiWebsiteId, () => {
  // Load saved chats when website changes
  loadSavedChats()
  // Start fresh chat
  startNewChat()
})

// Parse HTML into components when it changes
watch(aiHtml, (newHtml) => {
  if (newHtml && newHtml.trim()) {
    try {
      parseHTML(newHtml)
      console.log('[Components] Parsed:', components.value.length, 'root components')
      console.log('[Components] Total components:', flatComponents.value.length)
      console.log('[Components] Selectable sections:', selectableComponents.value.length)
      console.log('[Components] Selectable types:', selectableComponents.value.map(c => c.type))
      console.log('[Components] Stats:', componentStats.value)
    } catch (error) {
      console.error('[Components] Parse error:', error)
    }
  }
})

if (process.client) {
  definePageMeta({
    middleware: 'auth'
  })
}
</script>
