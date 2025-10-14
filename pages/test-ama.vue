<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-2xl font-bold mb-4">AMA Test Page</h1>
      
      <!-- API Status -->
      <div class="bg-white rounded-lg shadow p-4 mb-4">
        <h2 class="font-semibold mb-2">API Status</h2>
        <button @click="checkStatus" class="bg-blue-500 text-white px-4 py-2 rounded">
          Check Status
        </button>
        <pre v-if="status" class="mt-2 bg-gray-100 p-2 rounded text-xs">{{ JSON.stringify(status, null, 2) }}</pre>
      </div>

      <!-- Test Question -->
      <div class="bg-white rounded-lg shadow p-4 mb-4">
        <h2 class="font-semibold mb-2">Test Question</h2>
        <input
          v-model="testQuestion"
          type="text"
          placeholder="Ask a question..."
          class="w-full border rounded px-3 py-2 mb-2"
        />
        <button
          @click="askQuestion"
          :disabled="loading"
          class="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {{ loading ? 'Loading...' : 'Ask' }}
        </button>
      </div>

      <!-- Response -->
      <div v-if="response" class="bg-white rounded-lg shadow p-4 mb-4">
        <h2 class="font-semibold mb-2">Response</h2>
        <div class="bg-green-50 p-3 rounded">{{ response }}</div>
      </div>

      <!-- Error -->
      <div v-if="error" class="bg-white rounded-lg shadow p-4 mb-4">
        <h2 class="font-semibold mb-2 text-red-600">Error</h2>
        <div class="bg-red-50 p-3 rounded text-red-800">{{ error }}</div>
      </div>

      <!-- Logs -->
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="font-semibold mb-2">Console Logs</h2>
        <div class="bg-gray-100 p-3 rounded text-xs space-y-1">
          <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const status = ref(null)
const testQuestion = ref('What is this website about?')
const response = ref(null)
const error = ref(null)
const loading = ref(false)
const logs = ref([])

const addLog = (message) => {
  logs.value.push(`[${new Date().toLocaleTimeString()}] ${message}`)
}

const checkStatus = async () => {
  addLog('Checking API status...')
  try {
    const res = await fetch('/api/ama/test')
    status.value = await res.json()
    addLog('Status check complete')
  } catch (e) {
    addLog(`Status check error: ${e.message}`)
    error.value = e.message
  }
}

const askQuestion = async () => {
  response.value = null
  error.value = null
  loading.value = true
  
  addLog(`Asking: ${testQuestion.value}`)
  
  try {
    const res = await fetch('/api/ama/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: testQuestion.value,
        siteUrl: window.location.origin
      })
    })
    
    addLog(`Response status: ${res.status}`)
    
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.statusMessage || 'Request failed')
    }
    
    const data = await res.json()
    response.value = data.answer
    addLog('Answer received')
  } catch (e) {
    addLog(`Error: ${e.message}`)
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
