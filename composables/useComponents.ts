/**
 * Component System Composable
 * Manages HTML-to-Component conversion and component tree state
 */

import { ref, computed, watch } from 'vue'
import { HTMLToComponents, type ComponentDefinition } from '~/lib/htmlToComponents'

export function useComponents() {
  // Component tree state
  const components = ref<ComponentDefinition[]>([])
  const selectedComponentId = ref<string | null>(null)
  const hoveredComponentId = ref<string | null>(null)
  
  // Parser instance
  const parser = new HTMLToComponents({
    allowScripts: false,
    allowUnsafeAttr: false,
    keepEmptyTextNodes: false,
    generateIds: true
  })

  /**
   * Parse HTML into components
   */
  const parseHTML = (html: string) => {
    try {
      components.value = parser.parse(html)
      console.log('[Components] Parsed:', components.value.length, 'components')
      return components.value
    } catch (error) {
      console.error('[Components] Parse error:', error)
      return []
    }
  }

  /**
   * Convert components back to HTML
   */
  const toHTML = () => {
    try {
      return parser.toHTML(components.value)
    } catch (error) {
      console.error('[Components] toHTML error:', error)
      return ''
    }
  }

  /**
   * Get selected component
   */
  const selectedComponent = computed(() => {
    if (!selectedComponentId.value) return null
    return parser.findComponent(components.value, selectedComponentId.value)
  })

  /**
   * Get hovered component
   */
  const hoveredComponent = computed(() => {
    if (!hoveredComponentId.value) return null
    return parser.findComponent(components.value, hoveredComponentId.value)
  })

  /**
   * Select component
   */
  const selectComponent = (id: string | null) => {
    selectedComponentId.value = id
    
    if (id) {
      const component = parser.findComponent(components.value, id)
      console.log('[Components] Selected:', component)
    }
  }

  /**
   * Hover component
   */
  const hoverComponent = (id: string | null) => {
    hoveredComponentId.value = id
  }

  /**
   * Update component
   */
  const updateComponent = (id: string, updates: Partial<ComponentDefinition>) => {
    components.value = parser.updateComponent(components.value, id, updates)
    console.log('[Components] Updated:', id, updates)
  }

  /**
   * Remove component
   */
  const removeComponent = (id: string) => {
    components.value = parser.removeComponent(components.value, id)
    console.log('[Components] Removed:', id)
    
    // Clear selection if removed component was selected
    if (selectedComponentId.value === id) {
      selectedComponentId.value = null
    }
  }

  /**
   * Get component path (breadcrumb)
   */
  const getComponentPath = (id: string) => {
    return parser.getComponentPath(components.value, id)
  }

  /**
   * Get flattened component list
   */
  const flatComponents = computed(() => {
    return parser.flatten(components.value)
  })

  /**
   * Get only selectable components (semantic sections)
   */
  const selectableComponents = computed(() => {
    return parser.getSelectableComponents(components.value)
  })

  /**
   * Get component by line number
   */
  const getComponentByLine = (lineNumber: number): ComponentDefinition | null => {
    const flat = flatComponents.value
    
    for (const component of flat) {
      if (component.lineStart && component.lineEnd) {
        if (lineNumber >= component.lineStart && lineNumber <= component.lineEnd) {
          return component
        }
      }
    }
    
    return null
  }

  /**
   * Get component statistics
   */
  const stats = computed(() => {
    const flat = flatComponents.value
    const types: Record<string, number> = {}
    
    for (const component of flat) {
      types[component.type] = (types[component.type] || 0) + 1
    }
    
    return {
      total: flat.length,
      types,
      selected: selectedComponent.value?.type || null,
      hovered: hoveredComponent.value?.type || null
    }
  })

  /**
   * Find components by selector (class, tag, id)
   */
  const findBySelector = (selector: string): ComponentDefinition[] => {
    const flat = flatComponents.value
    const results: ComponentDefinition[] = []
    
    for (const component of flat) {
      // ID selector
      if (selector.startsWith('#')) {
        const id = selector.substring(1)
        if (component.attributes.id === id) {
          results.push(component)
        }
      }
      // Class selector
      else if (selector.startsWith('.')) {
        const className = selector.substring(1)
        if (component.classes.includes(className)) {
          results.push(component)
        }
      }
      // Tag selector
      else {
        if (component.tagName === selector.toLowerCase()) {
          results.push(component)
        }
      }
    }
    
    return results
  }

  /**
   * Find components by type
   */
  const findByType = (type: string): ComponentDefinition[] => {
    return flatComponents.value.filter(c => c.type === type)
  }

  /**
   * Get component children
   */
  const getChildren = (id: string): ComponentDefinition[] => {
    const component = parser.findComponent(components.value, id)
    return component?.components || []
  }

  /**
   * Get component parent
   */
  const getParent = (id: string): ComponentDefinition | null => {
    const path = getComponentPath(id)
    return path.length > 1 ? path[path.length - 2] : null
  }

  /**
   * Clone component
   */
  const cloneComponent = (id: string): ComponentDefinition | null => {
    const component = parser.findComponent(components.value, id)
    if (!component) return null
    
    // Deep clone and regenerate IDs
    const cloned = JSON.parse(JSON.stringify(component))
    const regenerateIds = (comp: ComponentDefinition) => {
      comp.id = `c${Date.now()}_${Math.random().toString(36).substring(7)}`
      comp.components.forEach(regenerateIds)
    }
    regenerateIds(cloned)
    
    return cloned
  }

  /**
   * Export component tree as JSON
   */
  const exportJSON = () => {
    return JSON.stringify(components.value, null, 2)
  }

  /**
   * Import component tree from JSON
   */
  const importJSON = (json: string) => {
    try {
      components.value = JSON.parse(json)
      console.log('[Components] Imported:', components.value.length, 'components')
    } catch (error) {
      console.error('[Components] Import error:', error)
    }
  }

  /**
   * Clear all components
   */
  const clear = () => {
    components.value = []
    selectedComponentId.value = null
    hoveredComponentId.value = null
  }

  return {
    // State
    components,
    selectedComponentId,
    hoveredComponentId,
    selectedComponent,
    hoveredComponent,
    flatComponents,
    selectableComponents,
    stats,
    
    // Methods
    parseHTML,
    toHTML,
    selectComponent,
    hoverComponent,
    updateComponent,
    removeComponent,
    getComponentPath,
    getComponentByLine,
    findBySelector,
    findByType,
    getChildren,
    getParent,
    cloneComponent,
    exportJSON,
    importJSON,
    clear
  }
}
