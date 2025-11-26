<template>
  <div class="flex h-[100dvh] w-full bg-[#f9f8f6] text-neutral-900 overflow-hidden selection:bg-[#d97759]/30 relative">
    
    <!-- Mobile Menu Backdrop -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-neutral-900/40 z-40 md:hidden backdrop-blur-sm" @click="isMobileMenuOpen = false" />

    <!-- SIDEBAR - Chat Interface -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-full md:w-80 lg:w-96 flex flex-col border-r border-neutral-200 bg-white md:bg-white/80 backdrop-blur-sm shadow-2xl md:shadow-none transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Header -->
      <div class="p-4 md:p-6 border-b border-neutral-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg
            class="w-7 h-7 text-[#d97759] -mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="4" width="5" height="16" rx="1" fill="currentColor" transform="rotate(-15 12 12)" />
            <rect x="10" y="4" width="5" height="16" rx="1" fill="currentColor" transform="rotate(-15 12 12)" />
          </svg>
          <h1 class="text-lg font-semibold tracking-tight text-neutral-900">WPS<span class="text-neutral-600">canvas</span></h1>
        </div>
        <button @click="isMobileMenuOpen = false" class="md:hidden text-neutral-600 hover:text-neutral-900 p-1">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Chat Content -->
      <div class="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
        <div class="flex flex-col h-full">
          <!-- Chat History -->
          <div v-if="chatHistory.length > 0" ref="chatContainer" class="flex-1 min-h-0 overflow-y-auto space-y-3 mb-3 pr-2">
            <div v-for="(message, index) in chatHistory" :key="index" :class="['flex', message.role === 'user' ? 'justify-end' : 'justify-start']">
              <div :class="[
                'max-w-[85%] rounded-xl px-4 py-3',
                message.role === 'user' 
                  ? 'bg-[#d97759] text-white' 
                  : 'bg-neutral-100 text-neutral-900 border border-neutral-200'
              ]">
                <p class="text-sm leading-relaxed whitespace-pre-wrap break-words">{{ message.content }}</p>
                <span class="text-[10px] opacity-60 mt-1 block">
                  {{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                </span>
              </div>
            </div>

            <!-- Real-time AI Streaming Output -->
            <div v-if="status === GenerationStatus.STREAMING" class="flex justify-start">
              <div class="bg-white border border-neutral-200 rounded-xl px-5 py-4 max-w-2xl w-full shadow-sm">
                <!-- Header with Thinking/Generating Status -->
                <div class="flex items-center gap-2 mb-3 pb-3 border-b border-neutral-100">
                  <svg class="w-4 h-4 text-neutral-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span class="text-sm text-neutral-600">{{ streamingProgress.isThinking ? 'Thinking' : 'Generating' }}</span>
                </div>

                <!-- Streaming AI Output -->
                <div class="relative">
                  <div ref="streamingOutputRef" class="max-h-96 overflow-y-auto pr-2 scroll-smooth">
                    <pre class="text-xs text-neutral-700 font-mono whitespace-pre-wrap break-words leading-relaxed">{{ streamingText || 'Initializing...' }}</pre>
                    <!-- Blinking cursor -->
                    <span v-if="isStreamingText" class="inline-block w-2 h-4 bg-neutral-900 ml-0.5 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="space-y-2 flex-shrink-0">
            <button
              v-if="chatHistory.length > 0"
              @click="chatHistory = []"
              class="text-xs text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear conversation
            </button>

            <div v-if="selectedElement" class="flex items-center gap-1 text-xs text-[#d97759] bg-[#d97759]/10 px-3 py-1.5 rounded-md border border-[#d97759]/20 w-fit">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Target: &lt;{{ selectedElement.tagName }}&gt;</span>
              <button @click="selectedElement = null" class="hover:text-white ml-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="relative">
              <textarea
                ref="mainInput"
                v-model="prompt"
                @input="autoResize"
                :placeholder="isEditing ? 'Ask a follow-up...' : 'Describe your website...'"
                :disabled="isBusy"
                :class="[
                  'w-full min-h-[7rem] max-h-[20rem] bg-neutral-50 border rounded-xl pt-4 px-4 pb-12 text-sm text-neutral-900 placeholder-neutral-500 focus:ring-1 focus:border-transparent resize-none transition-all',
                  selectedElement ? 'border-[#d97759]/50 ring-1 ring-[#d97759]/20' : 'border-neutral-200 focus:ring-[#d97759]',
                  isBusy ? 'opacity-50' : ''
                ]"
                rows="3"
              />
              <div class="absolute bottom-3 left-3 flex gap-1.5">
                <label class="flex items-center gap-1 text-xs text-neutral-600 cursor-pointer hover:text-neutral-900 transition-colors select-none bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1.5 rounded-lg border border-neutral-200" title="Web search">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <input type="checkbox" class="hidden" v-model="useSearch" :disabled="isBusy" />
                </label>
              </div>
              <button
                @click="handleGenerate"
                :disabled="isBusy || !prompt.trim()"
                class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="isBusy" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            <!-- Error Message -->
            <div v-if="errorMsg" class="p-2 bg-red-100 border border-red-300 rounded-lg text-red-700 text-xs">
              {{ errorMsg }}
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- RIGHT PANEL -->
    <main class="flex-1 flex flex-col min-w-0 bg-white relative">
      <!-- Header Toolbar -->
      <header class="h-16 border-b border-neutral-200 flex items-center justify-between px-4 md:px-6 bg-white/80 backdrop-blur sticky top-0 z-30">
        <div class="flex items-center gap-3 md:gap-4">
          <!-- Mobile Menu Button -->
          <button @click="isMobileMenuOpen = true" class="md:hidden text-neutral-600 hover:text-neutral-900 p-1 -ml-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- View Mode Toggle -->
          <div class="flex bg-neutral-100 p-1 rounded-lg">
            <button
              @click="viewMode = 'preview'"
              :class="[
                'flex items-center px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all',
                viewMode === 'preview' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              ]"
            >
              <svg class="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>
            <button
              @click="viewMode = 'code'"
              :class="[
                'flex items-center px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all',
                viewMode === 'code' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              ]"
            >
              <svg class="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Code
            </button>
          </div>

          <!-- Status Indicators -->
          <div v-if="status === GenerationStatus.THINKING" class="hidden sm:flex items-center gap-2 text-[#d97759] text-xs animate-pulse">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Thinking...
          </div>
          <div v-if="status === GenerationStatus.STREAMING" class="hidden sm:flex items-center gap-2 text-[#d97759] text-xs">
            <svg class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Coding...
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <button 
            v-if="Object.keys(files).length > 0"
            @click="showFileExplorer = true"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-white text-neutral-600 border border-neutral-200 hover:text-neutral-900 hover:border-neutral-300"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Files
          </button>
          <button
            v-if="viewMode === 'preview' && !isBusy && previewHtml"
            @click="toggleSelectionMode"
            :class="[
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all border',
              isSelectionMode ? 'bg-[#d97759] text-white border-[#d97759]' : 'bg-white text-neutral-600 border-neutral-200 hover:text-neutral-900'
            ]"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span class="hidden sm:inline">Select</span>
          </button>
          <button 
            @click="handleNewProject"
            :disabled="isBusy"
            class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-white text-neutral-600 border border-neutral-200 hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-50"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            New
          </button>
        </div>
      </header>

      <!-- File Explorer Modal -->
      <div v-if="showFileExplorer" class="fixed inset-0 bg-neutral-900/40 z-40 backdrop-blur-sm" @click="showFileExplorer = false" />
      <div v-if="showFileExplorer" class="fixed top-20 right-6 bottom-6 w-96 bg-white border border-neutral-200 rounded-xl shadow-2xl z-50 flex flex-col">
        <div class="p-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-neutral-900 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Files
          </h2>
          <button @click="showFileExplorer = false" class="text-neutral-600 hover:text-neutral-900">
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <BuilderFileExplorer 
            :files="files" 
            :activeFile="activeFile"
            @fileSelect="handleFileSelect"
          />
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-hidden relative">
        <!-- Loading Overlay (Initial Generation) -->
        <div v-if="status === GenerationStatus.THINKING && Object.keys(files).length === 0" class="absolute inset-0 z-20 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-opacity duration-500">
          <div class="text-center">
            <div class="relative w-24 h-24 mx-auto mb-6">
              <div class="absolute inset-0 border-4 border-[#d97759]/30 rounded-full animate-ping"></div>
              <div class="absolute inset-0 border-4 border-t-[#d97759] rounded-full animate-spin"></div>
              <div class="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-10 h-10 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">Building your website...</h3>
            <p class="text-neutral-600 text-sm animate-pulse">Architecting layout & design</p>
          </div>
        </div>

        <!-- Live Update Indicator -->
        <div v-if="status === GenerationStatus.STREAMING" class="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur border border-neutral-200 px-3 py-1.5 rounded-full shadow-xl transition-all duration-300">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d97759] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d97759]"></span>
          </span>
          <span class="text-xs font-medium text-neutral-900">Live Updating</span>
        </div>

        <div v-if="viewMode === 'preview'" class="h-full bg-white transition-opacity duration-500">
          <div v-if="previewHtml" class="h-full relative group">
            <iframe
              :srcdoc="previewHtml"
              class="w-full h-full border-0 transition-opacity duration-300"
              sandbox="allow-scripts"
            />
          </div>
          <div v-else class="h-full flex items-center justify-center text-neutral-600 bg-neutral-50">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-4 opacity-30 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-lg mb-2 font-medium text-neutral-900">Ready to Create</p>
              <p class="text-sm text-neutral-600">Describe your dream website to get started</p>
            </div>
          </div>
        </div>

        <div v-else class="h-full bg-neutral-50 flex flex-col">
          <div v-if="activeFile && files[activeFile]" class="flex-1 flex flex-col overflow-hidden">
            <!-- File Header -->
            <div class="px-4 py-2 border-b border-neutral-200 flex items-center justify-between bg-white">
              <div class="flex items-center gap-2 text-xs text-neutral-600">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ activeFile }}
              </div>
            </div>
            <!-- File Content -->
            <div class="flex-1 overflow-auto p-4">
              <pre class="text-xs text-neutral-900 font-mono leading-relaxed">{{ files[activeFile].content }}</pre>
            </div>
          </div>
          <div v-else class="h-full flex items-center justify-center text-neutral-600">
            <div class="text-center">
              <p class="text-lg mb-2 text-neutral-900">{{ Object.keys(files).length > 0 ? 'Select a file' : 'No code yet' }}</p>
              <p class="text-sm text-neutral-600">{{ Object.keys(files).length > 0 ? 'Click the Files button to browse' : 'Generate a website to see the code' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Floating Input -->
      <div 
        v-if="!isMobileMenuOpen && Object.keys(files).length > 0" 
        :class="[
          'fixed bottom-8 left-4 right-4 z-50 md:hidden transition-all duration-300 transform',
          showMobileQuickInput ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 pointer-events-none'
        ]"
        style="padding-bottom: env(safe-area-inset-bottom);"
      >
        <div class="bg-white/95 backdrop-blur-md border border-neutral-200 rounded-2xl shadow-2xl p-2 flex gap-2 items-center">
          <div class="flex-1 relative">
            <input
              ref="mobileInput"
              v-model="prompt"
              @keydown.enter="handleGenerate"
              type="text"
              placeholder="Ask a follow-up..."
              :disabled="isBusy"
              class="w-full bg-transparent border-0 text-base text-neutral-900 placeholder-neutral-500 focus:ring-0 px-4 py-2"
            />
          </div>
          <button
            @click="handleGenerate"
            :disabled="isBusy || !prompt.trim()"
            class="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white rounded-xl p-3 flex-shrink-0 transition-colors"
          >
            <svg v-if="isBusy" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { FileMap } from '~/types/builder'
import { GenerationStatus } from '~/types/builder'

definePageMeta({
  layout: false
})

// Composables
const { generateProjectStream } = useBuilderGeneration()
const { bundleProjectForPreview } = useBuilderProject()

// State
const viewMode = ref<'preview' | 'code'>('preview')
const prompt = ref("A modern landing page for an AI startup called 'Nebula'. Dark theme, glowing gradients, hero section, features grid, and a newsletter signup.")
const status = ref<GenerationStatus>(GenerationStatus.IDLE)
const files = ref<FileMap>({})
const previewHtml = ref('')
const errorMsg = ref<string | null>(null)
const useSearch = ref(false)
const chatHistory = ref<Array<{role: 'user' | 'assistant', content: string, timestamp: number}>>([])
const chatContainer = ref<HTMLDivElement | null>(null)
const activeFile = ref<string | null>(null)
const showFileExplorer = ref(false)
const isSelectionMode = ref(false)
const selectedElement = ref<{tagName: string, html: string, text: string} | null>(null)
const isMobileMenuOpen = ref(true) // Start with chat open on mobile
const showMobileQuickInput = ref(true) // Toggle for scroll
const mainInput = ref<HTMLTextAreaElement | null>(null)
const mobileInput = ref<HTMLInputElement | null>(null)

// Streaming progress state
const streamingProgress = ref<{
  currentFile: string | null
  filesGenerated: string[]
  totalFiles: number
  isThinking: boolean
}>({
  currentFile: null,
  filesGenerated: [],
  totalFiles: 0,
  isThinking: false
})

// Real-time AI output streaming
const streamingText = ref('')
const isStreamingText = ref(false)
const streamingOutputRef = ref<HTMLDivElement | null>(null)

// Computed
const isEditing = computed(() => Object.keys(files.value).length > 0)
const isBusy = computed(() => 
  status.value === GenerationStatus.THINKING || 
  status.value === GenerationStatus.STREAMING
)
const isGenerating = computed(() => isBusy.value)

// Methods
const handleGenerate = async () => {
  if (!prompt.value.trim() || isGenerating.value) return
  
  // Check if we should use RAG-based element editing
  if (selectedElement.value && Object.keys(files.value).length > 0) {
    await handleElementEdit()
    return
  }
  
  // Add user message to chat
  chatHistory.value.push({
    role: 'user',
    content: prompt.value,
    timestamp: Date.now()
  })
  
  const userPrompt = prompt.value
  prompt.value = '' // Clear input
  
  status.value = GenerationStatus.STREAMING
  errorMsg.value = null
  
  // Reset streaming progress
  streamingProgress.value = {
    currentFile: null,
    filesGenerated: [],
    totalFiles: 0,
    isThinking: true
  }
  
  // Reset streaming text
  streamingText.value = ''
  isStreamingText.value = true
  
  try {
    console.log('🚀 Starting generation with prompt:', userPrompt)
    
    const stream = generateProjectStream(
      userPrompt,
      files.value,
      undefined,
      undefined,
      useSearch.value
    )

    let previousFileCount = 0
    
    for await (const update of stream) {
      console.log('📦 Received update:', Object.keys(update.files).length, 'files')
      
      // Update streaming text in real-time
      if (update.streamingText) {
        streamingText.value = update.streamingText
      }
      
      // Update thinking state
      streamingProgress.value.isThinking = update.isThinking
      
      // Track new files
      const currentFileKeys = Object.keys(update.files)
      const newFiles = currentFileKeys.filter(key => !Object.keys(files.value).includes(key))
      
      if (newFiles.length > 0) {
        streamingProgress.value.currentFile = newFiles[newFiles.length - 1]
        streamingProgress.value.filesGenerated = [...new Set([...streamingProgress.value.filesGenerated, ...newFiles])]
      }
      
      streamingProgress.value.totalFiles = currentFileKeys.length
      
      files.value = update.files
      previousFileCount = currentFileKeys.length
      // Preview update handled by throttled watcher
    }
    
    isStreamingText.value = false

    status.value = GenerationStatus.COMPLETE
    console.log('✅ Generation complete!')
    
    // Force final update
    previewHtml.value = bundleProjectForPreview(files.value)
    
    // Add assistant response to chat
    chatHistory.value.push({
      role: 'assistant',
      content: `Generated ${Object.keys(files.value).length} files successfully!`,
      timestamp: Date.now()
    })

    // Switch to preview on mobile
    isMobileMenuOpen.value = false
    
  } catch (error: any) {
    console.error('❌ Generation error:', error)
    errorMsg.value = error.message || 'Failed to generate project'
    status.value = GenerationStatus.ERROR
    
    // Add error to chat
    chatHistory.value.push({
      role: 'assistant',
      content: `Error: ${error.message || 'Failed to generate project'}`,
      timestamp: Date.now()
    })
  }
}

const handleNewProject = () => {
  if (confirm('Start a new project? This will clear your current work.')) {
    files.value = {}
    previewHtml.value = ''
    chatHistory.value = []
    activeFile.value = null
    prompt.value = "A modern landing page for an AI startup called 'Nebula'. Dark theme, glowing gradients, hero section, features grid, and a newsletter signup."
    status.value = GenerationStatus.IDLE
    errorMsg.value = null
  }
}

const handleFileSelect = (path: string) => {
  activeFile.value = path
  viewMode.value = 'code'
  showFileExplorer.value = false
}

const toggleSelectionMode = () => {
  isSelectionMode.value = !isSelectionMode.value
  const iframe = document.querySelector('iframe')
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage({
      type: 'TOGGLE_SELECTION_MODE',
      enabled: isSelectionMode.value
    }, '*')
  }
}

const autoResize = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

const handleElementEdit = async () => {
  if (!selectedElement.value || !prompt.value.trim()) return
  
  const userPrompt = prompt.value
  prompt.value = ''
  
  // Add user message to chat
  chatHistory.value.push({
    role: 'user',
    content: `[Editing selected element] ${userPrompt}`,
    timestamp: Date.now()
  })
  
  status.value = GenerationStatus.STREAMING
  errorMsg.value = null
  
  try {
    console.log('🎯 Using precise editing...')
    
    // Call the precise edit API (two-step replacement)
    const response: any = await $fetch('/api/builder/precise-edit', {
      method: 'POST',
      body: {
        currentFiles: files.value,
        prompt: userPrompt
      }
    })
    
    if (response.success) {
      // CRITICAL: Only update the ONE modified file, keep all others intact
      const updatedFiles = { ...files.value }
      
      // Update only the modified file
      updatedFiles[response.file] = {
        name: response.file.split('/').pop() || response.file,
        path: response.file,
        content: response.content,
        type: 'file'
      }
      
      // Replace files.value with the merged result
      files.value = updatedFiles
      
      // Update preview
      previewHtml.value = bundleProjectForPreview(files.value)
      
      // Add success message to chat
      const replacementInfo = response.replaced ? `\n\nReplaced: "${response.replaced.old}" → "${response.replaced.new}"` : ''
      chatHistory.value.push({
        role: 'assistant',
        content: `✅ Successfully edited ${response.file}${replacementInfo}`,
        timestamp: Date.now()
      })
      
      // Clear selected element
      selectedElement.value = null
      
      console.log('✅ Element edit complete - only modified file updated')
      console.log('📊 Total files in project:', Object.keys(files.value).length)
    }
    
    status.value = GenerationStatus.COMPLETE
    
  } catch (error: any) {
    console.error('❌ Element edit error:', error)
    errorMsg.value = error.message || 'Failed to edit element'
    status.value = GenerationStatus.ERROR
    
    chatHistory.value.push({
      role: 'assistant',
      content: `❌ Error: ${error.message || 'Failed to edit element'}`,
      timestamp: Date.now()
    })
  }
}

onMounted(() => {
  // Check if there's a prompt from the website page
  if (process.client) {
    const websitePrompt = sessionStorage.getItem('websitePrompt')
    const uploadedFilesJson = sessionStorage.getItem('uploadedFiles')
    const loadProjectOnly = sessionStorage.getItem('loadProjectOnly')
    
    // Handle uploaded files (load as project)
    if (uploadedFilesJson) {
      try {
        const uploadedFiles = JSON.parse(uploadedFilesJson)
        
        // Convert uploaded files to FileMap format
        const convertedFiles: FileMap = {}
        for (const [path, content] of Object.entries(uploadedFiles)) {
          // Normalize path (remove leading slashes, ensure proper format)
          const normalizedPath = path.replace(/^\/+/, '')
          const pathParts = normalizedPath.split('/')
          const fileName = pathParts[pathParts.length - 1]
          
          convertedFiles[normalizedPath] = {
            name: fileName,
            path: normalizedPath,
            content: content as string,
            type: 'file'
          }
        }
        
        // Load the files into the project
        files.value = convertedFiles
        
        // Update preview
        previewHtml.value = bundleProjectForPreview(convertedFiles)
        
        // Add a system message to chat
        chatHistory.value.push({
          role: 'assistant',
          content: `Loaded ${Object.keys(convertedFiles).length} files from your upload. You can now make changes or improvements to your website.`,
          timestamp: Date.now()
        })
        
        // Clear the default prompt
        prompt.value = ''
        
        sessionStorage.removeItem('uploadedFiles')
        sessionStorage.removeItem('loadProjectOnly')
      } catch (error) {
        console.error('Failed to parse uploaded files:', error)
      }
    }
    // Handle website prompt (auto-generate)
    else if (websitePrompt) {
      prompt.value = websitePrompt
      sessionStorage.removeItem('websitePrompt')
      
      // Auto-trigger generation after a short delay
      setTimeout(() => {
        handleGenerate()
      }, 500)
    }
  }
  
  window.addEventListener('message', (event) => {
    if (event.data.type === 'NEBULA_ELEMENT_SELECTED') {
      selectedElement.value = event.data.payload
      isSelectionMode.value = false
      
      // Disable selection mode in iframe
      const iframe = document.querySelector('iframe')
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'TOGGLE_SELECTION_MODE',
          enabled: false
        }, '*')
      }
    } else if (event.data.type === 'PREVIEW_SCROLL') {
      // Hide on scroll down, show on scroll up (or at bottom)
      if (event.data.direction === 'down' && event.data.scrollY > 50) {
        showMobileQuickInput.value = false
      } else {
        showMobileQuickInput.value = true
      }
    }
  })
})

// Auto-focus input when element is selected
watch(selectedElement, (newVal) => {
  if (newVal) {
    nextTick(() => {
      // Check if mobile menu is closed (Preview mode) -> Focus mobile input
      // Check if desktop or mobile menu open -> Focus main input
      if (window.innerWidth < 768 && !isMobileMenuOpen.value) {
        mobileInput.value?.focus()
      } else {
        mainInput.value?.focus()
      }
    })
  }
})

// Auto-scroll chat container as text is generated
watch(streamingText, () => {
  if (isStreamingText.value && chatContainer.value) {
    nextTick(() => {
      chatContainer.value?.scrollTo({
        top: chatContainer.value.scrollHeight,
        behavior: 'smooth'
      })
    })
  }
})

// Update preview when files change
let lastUpdate = 0
watch(files, (newFiles) => {
  const now = Date.now()
  // Throttle updates (100ms) - fast enough for live feel, slow enough to prevent browser lag
  if (now - lastUpdate > 100 || status.value !== GenerationStatus.STREAMING) {
    if (Object.keys(newFiles).length > 0) {
      previewHtml.value = bundleProjectForPreview(newFiles)
      lastUpdate = now
    }
  }
}, { deep: true })

// Auto-scroll chat to bottom
watch(chatHistory, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}, { deep: true })
</script>
