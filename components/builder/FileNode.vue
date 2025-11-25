<template>
  <div>
    <div 
      @click="handleClick"
      :class="[
        'flex items-center gap-1.5 py-1 px-2 cursor-pointer transition-colors text-sm select-none',
        isActive ? 'bg-blue-600/20 text-blue-200' : 'hover:bg-zinc-800 text-zinc-300'
      ]"
      :style="{ paddingLeft: `${level * 12 + 8}px` }"
    >
      <span class="opacity-70">
        <svg v-if="type === 'folder' && isOpen" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <svg v-else-if="type === 'folder'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span v-else class="w-3 inline-block" />
      </span>
      
      <!-- Folder Icon -->
      <svg v-if="type === 'folder'" class="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      
      <!-- File Icon -->
      <BuilderFileIcon v-else :name="name" />
      
      <span class="truncate">{{ name }}</span>
    </div>

    <div v-if="type === 'folder' && isOpen">
      <BuilderFileNode
        v-for="child in children"
        :key="child.path"
        :name="child.name"
        :path="child.path"
        :type="child.type"
        :level="level + 1"
        :files="files"
        :activeFile="activeFile"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileMap, ProjectFile } from '~/types/builder'

interface Props {
  name: string
  path: string
  type: 'file' | 'folder'
  level: number
  files: FileMap
  activeFile: string | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  select: [path: string]
}>()

const isOpen = ref(true)

const children = computed(() => {
  return (Object.values(props.files) as ProjectFile[]).filter(f => {
    const parentPath = f.path.substring(0, f.path.lastIndexOf('/'))
    return parentPath === props.path && f.path !== props.path
  })
})

const isActive = computed(() => props.activeFile === props.path)

const handleClick = () => {
  if (props.type === 'folder') {
    isOpen.value = !isOpen.value
  } else {
    emit('select', props.path)
  }
}
</script>
