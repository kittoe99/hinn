<template>
  <div class="min-h-screen flex flex-col bg-[#f9f8f6]">
    <!-- Header -->
    <header class="bg-white border-b border-neutral-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 sm:space-x-3">
            <div class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#d97759]/10">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
              </svg>
            </div>
            <div>
              <h1 class="text-base sm:text-lg font-semibold text-neutral-900">Website Builder</h1>
              <p class="text-[10px] sm:text-xs text-neutral-600 hidden sm:block">AI-powered design assistant</p>
            </div>
          </div>
          <div class="flex items-center space-x-1 sm:space-x-3">
            <NuxtLink 
              to="/dashboard"
              class="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200 flex items-center space-x-1 sm:space-x-2"
            >
              <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              <span class="hidden sm:inline">Dashboard</span>
            </NuxtLink>
            <button 
              @click="resetChat"
              class="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200 flex items-center space-x-1 sm:space-x-2"
            >
              <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span class="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Chat Area -->
    <main class="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-neutral-200 overflow-hidden h-full flex flex-col">
        <!-- AI Generated Code Section -->
        <div class="border-b border-neutral-200 p-3 sm:p-4 md:p-6 bg-neutral-50">
          <div v-if="generatedCode" class="space-y-3 sm:space-y-4">
            <!-- Save to Project Form -->
            <div class="p-3 sm:p-4 bg-gradient-to-br from-[#d97759]/5 to-[#d97759]/10 border border-[#d97759]/30 rounded-lg">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                </svg>
                <h4 class="text-xs sm:text-sm font-semibold text-neutral-900">Save to Website Project</h4>
              </div>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-medium text-neutral-700 mb-1">Business/Website Name *</label>
                  <input 
                    v-model="projectName"
                    type="text" 
                    placeholder="e.g., Coffee Shop, Portfolio, Blog"
                    class="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all text-xs sm:text-sm text-neutral-900 placeholder-neutral-500"
                  />
                </div>
                
                <div>
                  <label class="block text-xs font-medium text-neutral-700 mb-1">Description (Optional)</label>
                  <input 
                    v-model="projectDescription"
                    type="text" 
                    placeholder="Brief description of the website"
                    class="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all text-xs sm:text-sm text-neutral-900 placeholder-neutral-500"
                  />
                </div>

                <div>
                  <label class="block text-xs font-medium text-neutral-700 mb-1">Save As *</label>
                  <input 
                    v-model="saveFileName"
                    type="text" 
                    placeholder="e.g., index.html, styles.css"
                    class="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all text-xs sm:text-sm text-neutral-900 placeholder-neutral-500"
                  />
                  <p class="text-[10px] text-neutral-600 mt-1">Filename to save in the project folder</p>
                </div>

                <button 
                  @click="saveToProject"
                  :disabled="!projectName || !saveFileName || isSavingToProject"
                  class="w-full px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#d97759] hover:bg-[#c86648] rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg v-if="!isSavingToProject" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ isSavingToProject ? 'Saving...' : 'Save to Project' }}</span>
                </button>

                <div v-if="savedProject" class="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-medium text-green-900">Saved Successfully!</p>
                      <p class="text-[10px] text-green-700 mt-1">Project: {{ savedProject.name }}</p>
                      <p class="text-[10px] text-green-700">File: {{ savedProject.fileName }}</p>
                      <p class="text-[10px] text-green-700">ID: {{ savedProject.id }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Generated Code Info -->
            <div class="p-3 sm:p-4 bg-white border border-neutral-200 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                  <span class="text-xs sm:text-sm font-medium text-neutral-900">{{ generatedCode.fileName }}</span>
                  <span class="text-[10px] sm:text-xs text-neutral-500">({{ generatedCode.type }})</span>
                </div>
                <button 
                  @click="toggleCodePreview"
                  class="text-[10px] sm:text-xs text-[#d97759] hover:text-[#c86648] font-medium whitespace-nowrap ml-2"
                >
                  {{ showCodePreview ? 'Hide' : 'Show' }}
                </button>
              </div>
              <div v-if="showCodePreview" class="mt-2 sm:mt-3 max-h-48 sm:max-h-64 overflow-y-auto bg-neutral-900 rounded-lg p-2 sm:p-4">
                <pre class="text-[10px] sm:text-xs text-neutral-100 font-mono whitespace-pre-wrap break-all">{{ generatedCode.content }}</pre>
              </div>
            </div>

            <!-- Live Preview -->
            <div class="p-3 sm:p-4 bg-white border border-neutral-200 rounded-lg">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                <h4 class="text-xs sm:text-sm font-semibold text-neutral-900">Live Preview</h4>
                <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <select 
                    v-model="viewportSize"
                    class="text-[10px] sm:text-xs border border-neutral-300 rounded px-1.5 sm:px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-[#d97759]"
                  >
                    <option value="responsive">Responsive</option>
                    <option value="desktop">Desktop</option>
                    <option value="tablet">Tablet</option>
                    <option value="mobile">Mobile</option>
                  </select>
                  <label class="inline-flex items-center text-[10px] sm:text-xs text-neutral-600">
                    <input v-model="enableElementSelector" type="checkbox" class="mr-1" />
                    <span class="hidden sm:inline">Select Elements</span>
                    <span class="sm:hidden">Select</span>
                  </label>
                  <button 
                    @click="refreshPreview"
                    class="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium bg-neutral-200 hover:bg-neutral-300 rounded transition-all"
                  >
                    Refresh
                  </button>
                </div>
              </div>
              
              <div 
                class="relative border border-neutral-300 rounded-lg bg-white overflow-hidden mx-auto transition-all"
                :style="previewWrapperStyle"
              >
                <iframe 
                  ref="previewIframe"
                  class="w-full bg-white"
                  :style="{ height: previewHeight }"
                  sandbox="allow-scripts allow-forms allow-modals allow-pointer-lock allow-same-origin"
                ></iframe>
                <div 
                  v-if="enableElementSelector"
                  class="absolute bottom-2 right-2 bg-[#d97759] text-white text-[10px] px-1.5 py-0.5 rounded shadow-lg"
                >
                  Selection ON
                </div>
              </div>
              
              <!-- Selected Element Info -->
              <div v-if="selectedElement" class="mt-3 p-3 bg-gradient-to-br from-[#d97759]/10 to-[#d97759]/5 border-2 border-[#d97759] rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                    </svg>
                    <span class="text-xs font-semibold text-neutral-900">Element Selected</span>
                    <code class="text-xs bg-white px-2 py-0.5 rounded border border-[#d97759]/30 font-mono">{{ selectedElement.tag }}</code>
                  </div>
                  <button 
                    @click="clearSelection"
                    class="text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <div class="text-xs text-neutral-700 mb-2">
                  <strong>CSS Selector:</strong> <code class="bg-white px-1.5 py-0.5 rounded text-[10px] font-mono border border-neutral-200">{{ selectedElement.selector }}</code>
                </div>
                <div class="text-xs text-[#d97759] font-medium mb-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Ask AI to modify this element (e.g., "Change the color to blue" or "Add a hover effect")
                </div>
                <details class="text-xs">
                  <summary class="cursor-pointer text-[#d97759] hover:text-[#c86648] font-medium">View HTML Code</summary>
                  <pre class="mt-2 p-2 bg-neutral-900 text-neutral-100 rounded text-[10px] overflow-x-auto">{{ selectedElement.html }}</pre>
                </details>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Messages -->
        <div ref="chatContainer" class="flex-1 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 overflow-y-auto" style="min-height: 300px; max-height: calc(100vh - 500px);">
          <!-- Welcome Message -->
          <div class="flex items-start space-x-2 sm:space-x-3 animate-fade-in">
            <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#d97759]/10 flex items-center justify-center">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
              </svg>
            </div>
            <div class="flex-1 bg-[#f0ebe3] rounded-xl sm:rounded-2xl rounded-tl-none p-3 sm:p-4">
              <p class="text-neutral-800 text-xs sm:text-sm">Hello! I'm your AI-powered website builder assistant, powered by GPT-5-Codex. I can help you:</p>
              <ul class="text-neutral-800 text-xs sm:text-sm mt-2 space-y-1 ml-3 sm:ml-4 list-disc">
                <li>Generate complete HTML, CSS, and JavaScript files from scratch</li>
                <li>Preview generated code with live element selection</li>
                <li>Save generated files to your website projects</li>
                <li>Create landing pages, portfolios, forms, and more</li>
              </ul>
              <p class="text-neutral-800 text-xs sm:text-sm mt-2 sm:mt-3">Just describe what you want to build, and I'll generate the code for you!</p>
              <p class="text-neutral-800 text-[10px] sm:text-xs mt-2 italic">Example: "Create a landing page for a coffee shop with a hero section and contact form"</p>
            </div>
          </div>

          <!-- Chat Messages Loop -->
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            class="flex items-start space-x-3 animate-fade-in"
            :class="message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''"
          >
            <div 
              v-if="message.role === 'assistant'"
              class="flex-shrink-0 w-10 h-10 rounded-lg bg-[#d97759]/10 flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
              </svg>
            </div>
            <div 
              class="flex-1 rounded-2xl p-4"
              :class="message.role === 'user' ? 'bg-neutral-900 text-white rounded-tr-none' : 'bg-[#f0ebe3] text-neutral-800 rounded-tl-none'"
            >
              <p>{{ message.content }}</p>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex items-start space-x-3 animate-fade-in">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-[#d97759]/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
              </svg>
            </div>
            <div class="flex-1 bg-[#f0ebe3] rounded-2xl rounded-tl-none p-4">
              <div class="flex space-x-1">
                <span class="w-2 h-2 bg-[#d97759] rounded-full animate-bounce" style="animation-delay: 0s"></span>
                <span class="w-2 h-2 bg-[#d97759] rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                <span class="w-2 h-2 bg-[#d97759] rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-neutral-200 p-3 sm:p-4 md:p-6 bg-neutral-50">
          <!-- Uploaded Files Display -->
          <div v-if="uploadedFiles.length > 0" class="mb-3 sm:mb-4">
            <div class="text-xs sm:text-sm text-neutral-600 mb-2">Attached files:</div>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="(file, index) in uploadedFiles" 
                :key="index"
                class="flex items-center space-x-1.5 sm:space-x-2 bg-[#d97759]/5 border border-[#d97759] text-[#d97759] px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span class="truncate max-w-[100px] sm:max-w-none">{{ file.name }}</span>
                <button @click="removeFile(index)" class="text-[#d97759] hover:text-[#c86648]">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <form @submit.prevent="sendMessage" class="flex space-x-2 sm:space-x-4">
            <input 
              type="file" 
              ref="fileInput"
              @change="handleFileUpload"
              multiple
              class="hidden"
            />
            <button 
              type="button"
              @click="$refs.fileInput.click()"
              class="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 px-2 py-2 sm:px-4 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center"
              title="Upload files"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
              </svg>
            </button>
            <input 
              v-model="messageInput"
              type="text" 
              placeholder="Describe your request..." 
              class="flex-1 px-3 py-2 sm:px-6 sm:py-4 border border-neutral-300 rounded-lg sm:rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all text-xs sm:text-sm text-neutral-900 placeholder-neutral-500"
              autocomplete="off"
            />
            <button 
              type="submit" 
              :disabled="isTyping || (!messageInput.trim() && uploadedFiles.length === 0)"
              class="bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-2 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center space-x-1 sm:space-x-2 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="hidden sm:inline">Send</span>
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="text-center py-6 text-neutral-500 text-sm">
      <p>AI-powered website builder by Hinn</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'

definePageMeta({
  layout: false
})

useHead({
  title: 'AI Website Builder | Hinn',
  meta: [
    {
      name: 'description',
      content: 'AI-powered website builder with GPT-5 - Generate complete websites with code'
    },
    {
      'http-equiv': 'Cache-Control',
      content: 'no-cache, no-store, must-revalidate'
    },
    {
      'http-equiv': 'Pragma',
      content: 'no-cache'
    },
    {
      'http-equiv': 'Expires',
      content: '0'
    }
  ]
})

// State
const messages = ref([])
const messageInput = ref('')
const uploadedFiles = ref([])
const isTyping = ref(false)
const chatContainer = ref(null)
const fileInput = ref(null)

// Generated code state
const generatedCode = ref(null)
const showCodePreview = ref(true)

// Project save state
const projectName = ref('')
const projectDescription = ref('')
const saveFileName = ref('')
const isSavingToProject = ref(false)
const savedProject = ref(null)

// Preview state
const previewIframe = ref(null)
const viewportSize = ref('responsive')
const enableElementSelector = ref(true)
const selectedElement = ref(null)
const previewHeight = ref('550px')

// Supabase and storage (client-side only)
const supabase = ref(null)
const user = ref(null)
const storage = ref(null)

// Computed viewport style
const previewWrapperStyle = computed(() => {
  const sizes = {
    responsive: '100%',
    desktop: '1200px',
    tablet: '768px',
    mobile: '375px'
  }
  return {
    maxWidth: sizes[viewportSize.value]
  }
})

// Scroll to bottom of chat
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// Send message
const sendMessage = async () => {
  if (!messageInput.value.trim() && uploadedFiles.value.length === 0) return

  // Add user message
  const userMessage = {
    role: 'user',
    content: messageInput.value || `Uploaded ${uploadedFiles.value.length} file(s)`
  }
  messages.value.push(userMessage)
  
  const currentMessage = messageInput.value
  messageInput.value = ''
  uploadedFiles.value = []
  
  scrollToBottom()

  // Show typing indicator
  isTyping.value = true

  try {
    // Call OpenAI API with context
    const response = await $fetch('/api/builder/chat', {
      method: 'POST',
      body: {
        messages: messages.value,
        generatedCode: generatedCode.value,
        selectedElement: selectedElement.value
      }
    })
    
    const assistantMessage = {
      role: 'assistant',
      content: response.message
    }
    messages.value.push(assistantMessage)
    
    // Extract code blocks from AI response
    extractCodeFromResponse(response.message)
  } catch (error) {
    console.error('Error sending message:', error)
    const errorMessage = {
      role: 'assistant',
      content: `Sorry, there was an error: ${error?.message || 'Unknown error'}. Please try again.`
    }
    messages.value.push(errorMessage)
  } finally {
    isTyping.value = false
    scrollToBottom()
  }
}

// Handle file upload
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Remove file
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

// Reset chat
const resetChat = () => {
  if (confirm('Are you sure you want to reset the chat? This will clear all messages.')) {
    messages.value = []
    messageInput.value = ''
    uploadedFiles.value = []
  }
}

// Extract code from AI response
const extractCodeFromResponse = (message) => {
  // Match code blocks with language identifier
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g
  const matches = [...message.matchAll(codeBlockRegex)]
  
  if (matches.length > 0) {
    // Use the first code block found
    const [, language, code] = matches[0]
    
    // Determine file extension and type
    const extensions = {
      'html': { ext: 'html', type: 'HTML' },
      'css': { ext: 'css', type: 'CSS' },
      'javascript': { ext: 'js', type: 'JavaScript' },
      'js': { ext: 'js', type: 'JavaScript' },
      'json': { ext: 'json', type: 'JSON' },
      'typescript': { ext: 'ts', type: 'TypeScript' },
      'ts': { ext: 'ts', type: 'TypeScript' }
    }
    
    const fileInfo = extensions[language.toLowerCase()] || { ext: 'txt', type: 'Text' }
    
    generatedCode.value = {
      content: code.trim(),
      language: language,
      type: fileInfo.type,
      fileName: saveFileName.value || `generated.${fileInfo.ext}`
    }
    
    // Auto-populate filename if not set
    if (!saveFileName.value) {
      saveFileName.value = `generated.${fileInfo.ext}`
    }
  }
}

// Toggle code preview
const toggleCodePreview = () => {
  showCodePreview.value = !showCodePreview.value
}

// Clear generated code
const clearGeneratedCode = () => {
  generatedCode.value = null
  projectName.value = ''
  projectDescription.value = ''
  saveFileName.value = ''
  savedProject.value = null
}

// Save to project
const saveToProject = async () => {
  if (!user.value) {
    messages.value.push({
      role: 'assistant',
      content: 'Please sign in to save files to your projects.'
    })
    scrollToBottom()
    return
  }

  if (!storage.value) {
    messages.value.push({
      role: 'assistant',
      content: 'Storage not available. Please refresh the page.'
    })
    scrollToBottom()
    return
  }

  if (!projectName.value || !saveFileName.value || !generatedCode.value) return
  
  isSavingToProject.value = true
  savedProject.value = null
  
  try {
    // Step 1: Create or find website project in database
    const { data: existingWebsite, error: findError} = await supabase.value
      .from('websites')
      .select('id, name, storage_path')
      .eq('user_id', user.value.value.id)
      .eq('name', projectName.value)
      .single()
    
    let websiteId
    
    if (existingWebsite) {
      // Use existing website
      websiteId = existingWebsite.id
      console.log('Using existing website:', existingWebsite)
    } else {
      // Create new website project
      // Generate slug from project name
      const slug = projectName.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 50) // Limit length
      
      const { data: newWebsite, error: createError } = await supabase.value
        .from('websites')
        .insert({
          name: projectName.value,
          slug: slug,
          description: projectDescription.value || null,
          user_id: user.value.value.id,
          status: 'pending', // Valid status: pending, active, paused, archived
          plan_id: null // No plan required for builder projects
        })
        .select('id, name, storage_path')
        .single()
      
      if (createError) throw createError
      
      websiteId = newWebsite.id
      console.log('Created new website:', newWebsite)
    }
    
    // Step 2: Upload file to storage
    // Convert string content to Blob for proper file upload
    const contentType = getContentType(saveFileName.value)
    const blob = new Blob([generatedCode.value.content], { type: contentType })
    
    const { data: uploadData, error: uploadError } = await storage.value.uploadFile(
      websiteId,
      saveFileName.value,
      blob,
      {
        contentType: contentType,
        upsert: true
      }
    )
    
    if (uploadError) throw uploadError
    
    // Success!
    savedProject.value = {
      id: websiteId,
      name: projectName.value,
      fileName: saveFileName.value
    }
    
    // Add success message to chat
    messages.value.push({
      role: 'assistant',
      content: `✅ Successfully saved **${saveFileName.value}** to project "${projectName.value}"!
      
📁 Storage Path: \`website/${websiteId}/${saveFileName.value}\`
📝 File Type: ${contentType}
🆔 Project ID: ${websiteId}

The HTML file is now stored in Supabase Storage and ready to use!`
    })
    scrollToBottom()
    
  } catch (error) {
    console.error('Error saving to project:', error)
    
    // Add error message to chat
    messages.value.push({
      role: 'assistant',
      content: `❌ Failed to save file: ${error.message || 'Unknown error'}. Please try again.`
    })
    scrollToBottom()
  } finally {
    isSavingToProject.value = false
  }
}

// Helper function to determine content type from filename
const getContentType = (filename) => {
  const ext = filename.split('.').pop().toLowerCase()
  const types = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'otf': 'font/otf'
  }
  return types[ext] || 'text/plain'
}

// Toggle file preview
const toggleFilePreview = () => {
  showFilePreview.value = !showFilePreview.value
}

// Refresh preview
const refreshPreview = () => {
  if (!generatedCode.value || !previewIframe.value) return
  
  const iframe = previewIframe.value
  const doc = iframe.contentDocument || iframe.contentWindow.document
  
  doc.open()
  doc.write(generatedCode.value.content)
  doc.close()
  
  // Setup element selector after content loads
  iframe.onload = () => {
    if (enableElementSelector.value) {
      const loadedDoc = iframe.contentDocument || iframe.contentWindow.document
      if (loadedDoc && loadedDoc.body) {
        setupElementSelector(loadedDoc)
      }
    }
  }
}

// Setup element selector in iframe
const setupElementSelector = (doc) => {
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
      if (!enableElementSelector.value) return
      e.preventDefault()
      e.stopPropagation()
      
      const element = e.target
      selectedElement.value = {
        tag: element.tagName.toLowerCase(),
        selector: generateSelector(element, doc),
        html: element.outerHTML
      }
    })
    
    // Add hover effect
    doc.body.addEventListener('mouseover', (e) => {
      if (!enableElementSelector.value) return
      e.target.classList.add('builder-hover-highlight')
    })
    
    doc.body.addEventListener('mouseout', (e) => {
      if (!enableElementSelector.value) return
      e.target.classList.remove('builder-hover-highlight')
    })
  } catch (error) {
    console.error('Error setting up element selector:', error)
  }
}

// Generate CSS selector for element
const generateSelector = (element, doc) => {
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
  const path = []
  let current = element
  while (current && current.tagName) {
    let selector = current.tagName.toLowerCase()
    if (current.parentElement) {
      const siblings = Array.from(current.parentElement.children).filter(
        e => e.tagName === current.tagName
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

// Clear selection
const clearSelection = () => {
  selectedElement.value = null
}

// Watch for generated code changes and refresh preview
watch(generatedCode, (newCode) => {
  if (newCode && newCode.type === 'HTML') {
    nextTick(() => {
      refreshPreview()
    })
  }
})

// Auto-scroll on mount and initialize client-side composables
onMounted(async () => {
  scrollToBottom()
  
  // Initialize Supabase and storage on client side only
  if (process.client) {
    supabase.value = useSupabaseClient()
    user.value = useSupabaseUser()
    storage.value = useWebsiteStorage()
    
    // Load website context from URL
    const route = useRoute()
    const websiteId = route.query.website
    if (websiteId) {
      await loadWebsiteContext(websiteId)
    }
  }
})

// Load website context
const loadWebsiteContext = async (websiteId) => {
  if (!supabase.value) return
  
  try {
    const { data: website, error } = await supabase.value
      .from('websites')
      .select('id, name, description, storage_path')
      .eq('id', websiteId)
      .single()
    
    if (error) throw error
    
    if (website) {
      // Auto-populate project name
      projectName.value = website.name
      projectDescription.value = website.description || ''
      
      // Add welcome message with website context
      messages.value.push({
        role: 'assistant',
        content: `Welcome! I'm ready to help you build **${website.name}**. I can generate HTML, CSS, and JavaScript files for your website. What would you like to create?`
      })
      scrollToBottom()
    }
  } catch (error) {
    console.error('Error loading website context:', error)
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}
</style>
