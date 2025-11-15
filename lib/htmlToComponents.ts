/**
 * HTML to Components Converter
 * Inspired by GrapesJS architecture - converts HTML into selectable, editable component tree
 */

export interface ComponentDefinition {
  id: string
  type: string
  tagName: string
  content?: string
  attributes: Record<string, any>
  classes: string[]
  style: Record<string, string>
  components: ComponentDefinition[]
  parent?: string
  editable: boolean
  selectable: boolean
  draggable: boolean
  droppable: boolean
  removable: boolean
  copyable: boolean
  // Line information for code mapping
  lineStart?: number
  lineEnd?: number
  // Original HTML for reference
  originalHtml?: string
}

export interface ParseOptions {
  allowScripts?: boolean
  allowUnsafeAttr?: boolean
  keepEmptyTextNodes?: boolean
  generateIds?: boolean
}

export class HTMLToComponents {
  private componentCounter = 0
  private options: ParseOptions

  constructor(options: ParseOptions = {}) {
    this.options = {
      allowScripts: false,
      allowUnsafeAttr: false,
      keepEmptyTextNodes: false,
      generateIds: true,
      ...options
    }
  }

  /**
   * Parse HTML string into component tree
   */
  parse(html: string): ComponentDefinition[] {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // Parse body contents
    const components: ComponentDefinition[] = []
    const bodyChildren = Array.from(doc.body.childNodes)
    
    for (const node of bodyChildren) {
      const component = this.parseNode(node as HTMLElement, html)
      if (component) {
        components.push(component)
      }
    }
    
    return components
  }

  /**
   * Parse a single DOM node into a component definition
   */
  private parseNode(node: HTMLElement, fullHtml: string, parentId?: string): ComponentDefinition | null {
    // Skip empty text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      const content = node.textContent?.trim()
      if (!content && !this.options.keepEmptyTextNodes) {
        return null
      }
      
      return {
        id: this.generateId(),
        type: 'textnode',
        tagName: 'text',
        content: node.textContent || '',
        attributes: {},
        classes: [],
        style: {},
        components: [],
        parent: parentId,
        editable: true,
        selectable: true,
        draggable: false,
        droppable: false,
        removable: true,
        copyable: true
      }
    }

    // Skip comment nodes
    if (node.nodeType === Node.COMMENT_NODE) {
      return null
    }

    // Skip script tags unless allowed
    if (!this.options.allowScripts && node.tagName?.toLowerCase() === 'script') {
      return null
    }

    const tagName = node.tagName?.toLowerCase() || 'div'
    const type = this.detectComponentType(node)
    const id = this.generateId()

    // Parse attributes
    const attributes: Record<string, any> = {}
    if (node.attributes) {
      for (const attr of Array.from(node.attributes)) {
        const name = attr.name
        const value = attr.value

        // Skip unsafe attributes
        if (!this.options.allowUnsafeAttr && (name.startsWith('on') || value.startsWith('javascript:'))) {
          continue
        }

        // Skip style and class (handled separately)
        if (name === 'style' || name === 'class') {
          continue
        }

        attributes[name] = value
      }
    }

    // Parse classes
    const classes = node.className ? node.className.split(' ').filter(c => c.trim()) : []

    // Parse inline styles
    const style: Record<string, string> = {}
    if (node.style && node.style.length > 0) {
      for (let i = 0; i < node.style.length; i++) {
        const prop = node.style[i]
        style[prop] = node.style.getPropertyValue(prop)
      }
    }

    // Find line numbers in original HTML
    const { lineStart, lineEnd } = this.findLineNumbers(node, fullHtml)

    // Parse child components
    const components: ComponentDefinition[] = []
    const childNodes = Array.from(node.childNodes)

    // Special case: if only one text node child, make it content
    if (childNodes.length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
      const textContent = childNodes[0].textContent?.trim()
      
      return {
        id,
        type: type || 'text',
        tagName,
        content: textContent,
        attributes,
        classes,
        style,
        components: [],
        parent: parentId,
        editable: true,
        selectable: true,
        draggable: true,
        droppable: true,
        removable: true,
        copyable: true,
        lineStart,
        lineEnd,
        originalHtml: node.outerHTML
      }
    }

    // Parse all children
    for (const childNode of childNodes) {
      const childComponent = this.parseNode(childNode as HTMLElement, fullHtml, id)
      if (childComponent) {
        components.push(childComponent)
      }
    }

    return {
      id,
      type: type || 'default',
      tagName,
      attributes,
      classes,
      style,
      components,
      parent: parentId,
      editable: true,
      selectable: true,
      draggable: true,
      droppable: true,
      removable: true,
      copyable: true,
      lineStart,
      lineEnd,
      originalHtml: node.outerHTML
    }
  }

  /**
   * Detect component type based on tag and attributes
   * Focuses on semantic sections, not individual elements
   */
  private detectComponentType(node: HTMLElement): string {
    const tagName = node.tagName?.toLowerCase()
    const classes = node.className?.toLowerCase() || ''
    const id = node.id?.toLowerCase() || ''

    // Check for semantic section markers (class names, IDs, tags)
    const sectionMarkers = {
      'hero': ['hero', 'banner', 'jumbotron', 'masthead'],
      'navbar': ['nav', 'navbar', 'navigation', 'menu', 'header-menu'],
      'header': ['header', 'site-header', 'page-header', 'top-bar'],
      'footer': ['footer', 'site-footer', 'page-footer', 'bottom-bar'],
      'cta': ['cta', 'call-to-action', 'action-section'],
      'features': ['features', 'feature-section', 'services', 'benefits'],
      'about': ['about', 'about-us', 'about-section'],
      'contact': ['contact', 'contact-us', 'contact-section', 'contact-form'],
      'testimonials': ['testimonials', 'reviews', 'testimonial-section'],
      'pricing': ['pricing', 'plans', 'pricing-section', 'pricing-table'],
      'team': ['team', 'our-team', 'team-section'],
      'gallery': ['gallery', 'portfolio', 'showcase'],
      'faq': ['faq', 'faqs', 'questions'],
      'blog': ['blog', 'articles', 'posts', 'news'],
      'stats': ['stats', 'statistics', 'numbers', 'metrics'],
      'form': ['form', 'signup', 'subscribe', 'newsletter']
    }

    // Check if this is a semantic section
    for (const [type, markers] of Object.entries(sectionMarkers)) {
      for (const marker of markers) {
        if (classes.includes(marker) || id.includes(marker)) {
          return type
        }
      }
    }

    // Semantic HTML5 tags get priority
    const semanticTags: Record<string, string> = {
      'nav': 'navbar',
      'header': 'header',
      'footer': 'footer',
      'section': 'section',
      'article': 'article',
      'aside': 'sidebar',
      'main': 'main'
    }

    if (semanticTags[tagName]) {
      return semanticTags[tagName]
    }

    // Only mark specific interactive elements as selectable
    const interactiveTags: Record<string, string> = {
      'button': 'button',
      'a': 'link',
      'form': 'form',
      'img': 'image',
      'video': 'video'
    }

    if (interactiveTags[tagName]) {
      return interactiveTags[tagName]
    }

    // Default: not selectable (will be filtered out)
    return 'default'
  }

  /**
   * Find line numbers for a node in the original HTML
   */
  private findLineNumbers(node: HTMLElement, fullHtml: string): { lineStart?: number; lineEnd?: number } {
    try {
      const outerHTML = node.outerHTML
      if (!outerHTML) return {}

      const lines = fullHtml.split('\n')
      const normalizedSearch = this.normalizeHtml(outerHTML.split('\n')[0])

      for (let i = 0; i < lines.length; i++) {
        const normalizedLine = this.normalizeHtml(lines[i])
        if (normalizedLine.includes(normalizedSearch.substring(0, 50))) {
          // Found start line
          const elementLines = outerHTML.split('\n')
          const lineStart = i + 1
          const lineEnd = i + elementLines.length

          return { lineStart, lineEnd }
        }
      }

      return {}
    } catch (error) {
      console.warn('[HTMLToComponents] Line number detection failed:', error)
      return {}
    }
  }

  /**
   * Normalize HTML for comparison
   */
  private normalizeHtml(html: string): string {
    return html
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim()
  }

  /**
   * Generate unique component ID
   */
  private generateId(): string {
    if (!this.options.generateIds) {
      return ''
    }
    return `c${++this.componentCounter}`
  }

  /**
   * Convert component tree back to HTML
   */
  toHTML(components: ComponentDefinition[]): string {
    return components.map(comp => this.componentToHTML(comp)).join('\n')
  }

  /**
   * Convert single component to HTML
   */
  private componentToHTML(component: ComponentDefinition): string {
    // Text nodes
    if (component.type === 'textnode') {
      return component.content || ''
    }

    // Build opening tag
    const attrs: string[] = []
    
    // Add classes
    if (component.classes.length > 0) {
      attrs.push(`class="${component.classes.join(' ')}"`)
    }

    // Add styles
    if (Object.keys(component.style).length > 0) {
      const styleStr = Object.entries(component.style)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ')
      attrs.push(`style="${styleStr}"`)
    }

    // Add other attributes
    for (const [key, value] of Object.entries(component.attributes)) {
      if (typeof value === 'boolean') {
        if (value) attrs.push(key)
      } else {
        attrs.push(`${key}="${value}"`)
      }
    }

    const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : ''
    const openTag = `<${component.tagName}${attrStr}>`

    // Self-closing tags
    const voidElements = ['img', 'br', 'hr', 'input', 'meta', 'link']
    if (voidElements.includes(component.tagName)) {
      return `<${component.tagName}${attrStr} />`
    }

    // Build content
    let content = ''
    if (component.content) {
      content = component.content
    } else if (component.components.length > 0) {
      content = component.components.map(c => this.componentToHTML(c)).join('\n')
    }

    const closeTag = `</${component.tagName}>`

    return `${openTag}${content}${closeTag}`
  }

  /**
   * Find component by ID
   */
  findComponent(components: ComponentDefinition[], id: string): ComponentDefinition | null {
    for (const component of components) {
      if (component.id === id) {
        return component
      }
      
      const found = this.findComponent(component.components, id)
      if (found) {
        return found
      }
    }
    
    return null
  }

  /**
   * Update component by ID
   */
  updateComponent(
    components: ComponentDefinition[], 
    id: string, 
    updates: Partial<ComponentDefinition>
  ): ComponentDefinition[] {
    return components.map(component => {
      if (component.id === id) {
        return { ...component, ...updates }
      }
      
      return {
        ...component,
        components: this.updateComponent(component.components, id, updates)
      }
    })
  }

  /**
   * Remove component by ID
   */
  removeComponent(components: ComponentDefinition[], id: string): ComponentDefinition[] {
    return components
      .filter(component => component.id !== id)
      .map(component => ({
        ...component,
        components: this.removeComponent(component.components, id)
      }))
  }

  /**
   * Get component path (breadcrumb)
   */
  getComponentPath(components: ComponentDefinition[], id: string): ComponentDefinition[] {
    const path: ComponentDefinition[] = []
    
    const findPath = (comps: ComponentDefinition[], targetId: string): boolean => {
      for (const comp of comps) {
        path.push(comp)
        
        if (comp.id === targetId) {
          return true
        }
        
        if (findPath(comp.components, targetId)) {
          return true
        }
        
        path.pop()
      }
      
      return false
    }
    
    findPath(components, id)
    return path
  }

  /**
   * Flatten component tree
   */
  flatten(components: ComponentDefinition[]): ComponentDefinition[] {
    const result: ComponentDefinition[] = []
    
    const traverse = (comps: ComponentDefinition[]) => {
      for (const comp of comps) {
        result.push(comp)
        traverse(comp.components)
      }
    }
    
    traverse(components)
    return result
  }

  /**
   * Get only selectable components (semantic sections)
   * Filters out generic divs, spans, paragraphs
   */
  getSelectableComponents(components: ComponentDefinition[]): ComponentDefinition[] {
    const selectableTypes = [
      'hero', 'navbar', 'header', 'footer', 'cta', 'features', 'about',
      'contact', 'testimonials', 'pricing', 'team', 'gallery', 'faq',
      'blog', 'stats', 'form', 'section', 'article', 'main', 'sidebar',
      'button', 'link', 'image', 'video'
    ]

    const flat = this.flatten(components)
    return flat.filter(comp => selectableTypes.includes(comp.type))
  }
}

// Export singleton instance
export const htmlToComponents = new HTMLToComponents()
