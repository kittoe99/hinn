<template>
  <div class="space-y-4">
    <div class="rounded-2xl border border-neutral-200 bg-white p-4 shadow-inner">
      <div class="flex flex-wrap items-center gap-2">
        <div
          v-for="(area, index) in internalAreas"
          :key="area.placeId || area.name"
          class="flex items-center gap-2 rounded-full border border-accent-soft bg-accent-subtle px-3 py-1 text-xs text-primary"
        >
          <span class="font-semibold">{{ area.displayName || area.name }}</span>
          <button
            type="button"
            class="text-secondary transition hover:text-primary"
            @click="removeArea(index)"
            aria-label="Remove service area"
          >
            &times;
          </button>
        </div>
        <span v-if="!internalAreas.length" class="text-xs text-secondary">No locations added yet.</span>
      </div>

      <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label class="text-sm font-medium text-primary sm:w-40">Search locations</label>
        <div class="relative flex-1">
          <input
            v-model="query"
            type="search"
            class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
            placeholder="Start typing a city, neighborhood, or region"
            aria-label="Search for service areas"
          />
          <svg
            class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path d="m21 21-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
          </svg>
        </div>
      </div>

      <p v-if="error" class="mt-2 text-xs text-red-500">{{ error }}</p>
      <p v-else-if="query.length && query.length < 3" class="mt-2 text-xs text-secondary">
        Enter at least three characters to search.
      </p>
    </div>

    <transition name="fade">
      <div
        v-if="showResults"
        class="rounded-2xl border border-neutral-200 bg-white shadow-xl"
      >
        <div class="flex items-center justify-between border-b border-neutral-100 px-4 py-2 text-xs text-secondary">
          <span>Search results</span>
          <button type="button" class="text-accent-primary hover:underline" @click="clearResults">Close</button>
        </div>
        <ul class="max-h-60 overflow-y-auto">
          <li v-if="loading" class="px-4 py-3 text-sm text-secondary">Searching&hellip;</li>
          <li v-else-if="!results.length" class="px-4 py-3 text-sm text-secondary">No matches. Try a different phrase.</li>
          <li v-for="result in results" :key="result.place_id" class="border-t border-neutral-100 first:border-t-0">
            <button
              type="button"
              class="flex w-full items-start justify-between gap-3 px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
              @click="addArea(result)"
            >
              <span class="text-primary">{{ result.display_name }}</span>
              <span class="text-xs text-secondary">Add</span>
            </button>
          </li>
        </ul>
      </div>
    </transition>

    <div v-if="internalAreas.length" class="space-y-4">
      <div
        v-for="(area, index) in internalAreas"
        :key="`${area.placeId || area.name}-radius`"
        class="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
      >
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-semibold text-primary">{{ area.displayName || area.name }}</p>
            <p class="text-xs text-secondary">{{ formatCoordinates(area) }}</p>
          </div>
          <div class="flex items-center gap-3">
            <label class="text-xs font-semibold uppercase tracking-wide text-secondary">Radius</label>
            <input
              type="range"
              min="1"
              max="200"
              step="1"
              :value="area.radiusKm"
              class="h-1 w-40 cursor-pointer appearance-none rounded-full bg-neutral-200 accent-accent-primary"
              @input="updateRadius(index, $event.target.value)"
            />
            <span class="text-sm font-medium text-primary">{{ area.radiusKm }} km</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const internalAreas = ref([...props.modelValue])
const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')
const controller = ref(null)

watch(
  () => props.modelValue,
  newValue => {
    internalAreas.value = [...newValue]
  },
  { deep: true }
)

watch(
  internalAreas,
  newValue => {
    emit('update:modelValue', newValue)
  },
  { deep: true }
)

const showResults = computed(() => query.value.length >= 3 && (loading.value || results.value.length > 0))

watch(
  query,
  async newQuery => {
    error.value = ''
    if (newQuery.length < 3) {
      results.value = []
      if (controller.value) {
        controller.value.abort()
      }
      return
    }

    if (controller.value) {
      controller.value.abort()
    }

    controller.value = new AbortController()
    loading.value = true

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(newQuery)}`,
        {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'HinnOnboarding/1.0 (hello@hinn.studio)'
          },
          signal: controller.value.signal
        }
      )

      if (!response.ok) {
        throw new Error('Unable to fetch results right now.')
      }

      const data = await response.json()
      results.value = Array.isArray(data) ? data : []
    } catch (err) {
      if (err.name !== 'AbortError') {
        error.value = 'We could not reach the address service. Please try again.'
      }
    } finally {
      loading.value = false
    }
  }
)

const addArea = result => {
  if (!result) return

  const exists = internalAreas.value.some(area => area.placeId === result.place_id)
  if (exists) {
    query.value = ''
    results.value = []
    return
  }

  internalAreas.value = [
    ...internalAreas.value,
    {
      placeId: result.place_id,
      name: result.display_name,
      displayName: result.display_name,
      lat: Number.parseFloat(result.lat),
      lon: Number.parseFloat(result.lon),
      radiusKm: 10
    }
  ]

  query.value = ''
  results.value = []
}

const removeArea = index => {
  internalAreas.value = internalAreas.value.filter((_, idx) => idx !== index)
}

const updateRadius = (index, value) => {
  const radius = Number.parseInt(value, 10)
  internalAreas.value = internalAreas.value.map((area, idx) =>
    idx === index
      ? {
          ...area,
          radiusKm: Number.isNaN(radius) ? area.radiusKm : Math.min(Math.max(radius, 1), 200)
        }
      : area
  )
}

const clearResults = () => {
  results.value = []
  query.value = ''
}

const formatCoordinates = area => {
  if (!area || (!area.lat && !area.lon)) return 'No coordinates available'
  const lat = Number.parseFloat(area.lat).toFixed(4)
  const lon = Number.parseFloat(area.lon).toFixed(4)
  return `${lat}°, ${lon}°`
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

input[type='range']::-webkit-slider-thumb {
  appearance: none;
  height: 14px;
  width: 14px;
  border-radius: 9999px;
  background: #141518;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(20, 21, 24, 0.08);
}

input[type='range']::-moz-range-thumb {
  height: 14px;
  width: 14px;
  border-radius: 9999px;
  background: #141518;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(20, 21, 24, 0.08);
}
</style>
