<template>
  <div class="flex flex-col w-full">
    <div class="px-4 py-3 text-xs font-semibold text-zinc-500 tracking-wider uppercase flex items-center gap-2">
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      Explorer
    </div>
    <div class="flex-1 overflow-y-auto">
      <BuilderFileNode
        v-for="item in rootItems"
        :key="item.path"
        :name="item.name"
        :path="item.path"
        :type="item.type"
        :level="0"
        :files="files"
        :activeFile="activeFile"
        @select="$emit('fileSelect', $event)"
      />
      <div v-if="rootItems.length === 0" class="p-4 text-zinc-600 text-xs text-center italic">
        No files generated yet.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileMap, ProjectFile } from '~/types/builder'

interface Props {
  files: FileMap
  activeFile: string | null
}

const props = defineProps<Props>()
defineEmits<{
  fileSelect: [path: string]
}>()

const rootItems = computed(() => {
  return (Object.values(props.files) as ProjectFile[]).filter(f => !f.path.includes('/'))
})
</script>
