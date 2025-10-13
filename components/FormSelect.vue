<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left text-sm text-primary shadow-inner transition focus:outline-none focus:ring-2 focus:ring-accent-soft"
      :class="{ 'border-accent-primary ring-2 ring-accent-soft': open }"
      @click="toggle"
    >
      <span :class="selectedLabel ? 'text-primary' : 'text-secondary'">
        {{ selectedLabel || placeholder }}
      </span>
      <svg
        class="ml-3 h-4 w-4 text-secondary transition-transform"
        :class="{ 'rotate-180': open }"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <transition name="fade">
      <ul
        v-if="open"
        class="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 text-sm shadow-xl"
      >
        <li v-if="!options.length" class="px-4 py-2 text-secondary">No options</li>
        <li v-for="option in options" :key="getValue(option)">
          <button
            type="button"
            class="flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-neutral-50"
            :class="{
              'bg-accent-subtle text-primary': getValue(option) === modelValue,
              'text-primary': getValue(option) !== modelValue
            }"
            @click="select(option)"
          >
            <span>{{ getLabel(option) }}</span>
            <svg
              v-if="getValue(option) === modelValue"
              class="ml-2 h-4 w-4 text-accent-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  optionLabelKey: {
    type: String,
    default: 'label'
  },
  optionValueKey: {
    type: String,
    default: 'value'
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  }
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const root = ref(null)

const getLabel = option => (typeof option === 'object' ? option[props.optionLabelKey] : option)
const getValue = option => (typeof option === 'object' ? option[props.optionValueKey] : option)

const isEmptyValue = value => value === '' || value === null || value === undefined

const selectedLabel = computed(() => {
  if (isEmptyValue(props.modelValue)) {
    return ''
  }

  const match = props.options.find(option => getValue(option) === props.modelValue)
  return match ? getLabel(match) : ''
})

const close = () => {
  open.value = false
}

const toggle = () => {
  open.value = !open.value
}

const select = option => {
  emit('update:modelValue', getValue(option))
  close()
}

const handleClickOutside = event => {
  if (!root.value) return
  if (!root.value.contains(event.target)) {
    close()
  }
}

const handleEscape = event => {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
