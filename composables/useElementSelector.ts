/**
 * Element Selector Composable
 * Provides precise CSS selector generation and element selection functionality
 * Migrated from Kubernetes agent-app project
 */

export interface SelectedElementData {
  element: Element | null
  html: string
  selector: string
  tagName: string
}

export const useElementSelector = () => {
  const selectedElement = ref<SelectedElementData>({
    element: null,
    html: '',
    selector: '',
    tagName: ''
  })

  /**
   * Minimal CSS escape for class/ID names
   */
  function cssEscape(ident: string): string {
    return String(ident).replace(/([\0-\x1F\x7F-\x9F\s!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1')
  }

  /**
   * Generate all combinations of an array up to max length
   */
  function combos(arr: string[], max = 3): string[][] {
    const out: string[][] = []
    const n = Math.min(arr.length, max)
    
    for (let r = 1; r <= n; r++) {
      const rec = (start: number, acc: string[]) => {
        if (acc.length === r) {
          out.push(acc.slice())
          return
        }
        for (let i = start; i < arr.length; i++) {
          rec(i + 1, acc.concat(arr[i]))
        }
      }
      rec(0, [])
    }
    
    return out
  }

  /**
   * Get absolute path selector as fallback
   */
  function getAbsolutePath(el: Element): string {
    const segments: string[] = []
    let node: Element | null = el
    
    while (node && node.nodeType === 1 && node.tagName.toLowerCase() !== 'html') {
      const parent: Element | null = node.parentElement
      const tag = node.tagName.toLowerCase()
      let seg = tag
      
      if (parent) {
        const sameType = Array.from(parent.children).filter((n: Element) => n.tagName === node!.tagName)
        const idx = sameType.indexOf(node)
        if (idx !== -1) {
          seg += `:nth-of-type(${idx + 1})`
        }
      }
      
      segments.unshift(seg)
      node = parent
    }
    
    return segments.length ? segments.join(' > ') : ''
  }

  /**
   * Compute a unique CSS selector for an element
   * This is the core function that makes element selection precise
   */
  function computeUniqueSelector(el: Element, rootDoc?: Document): string {
    const doc = rootDoc || document
    if (!el || el.nodeType !== 1) return ''

    // Helper to count matches
    const q = (s: string) => doc.querySelectorAll(s).length

    // 1. Try ID first (highest priority)
    if (el.id) {
      const s = `#${cssEscape(el.id)}`
      if (q(s) === 1) return s
    }

    // Helper to get clean classes (filter out GrapesJS classes)
    const getClasses = (node: Element) => 
      Array.from(node.classList || []).filter(c => c && !c.startsWith('gjs-'))

    const tag = el.tagName.toLowerCase()
    const cls = getClasses(el)
    
    // 2. Try class combinations
    const classCombos = combos(cls, 3).map(cs => cs.map(c => `.${cssEscape(c)}`).join(''))
    const candidates: string[] = []
    
    classCombos.forEach(cn => {
      candidates.push(`${tag}${cn}`)
      candidates.push(cn)
    })
    candidates.push(tag)
    
    for (const c of candidates) {
      if (q(c) === 1) return c
    }

    // 3. Try with parent context (ID-based anchor)
    let anchor: Element | null = el.parentElement
    let depth = 0
    
    while (anchor && depth < 5) {
      if (anchor.id && q(`#${cssEscape(anchor.id)}`) === 1) {
        const base = `#${cssEscape(anchor.id)}`
        const steps: string[] = []
        let node: Element | null = el
        
        while (node && node !== anchor) {
          const t = node.tagName.toLowerCase()
          const nodeCls = getClasses(node).slice(0, 2).map(c => `.${cssEscape(c)}`).join('')
          let step = t + nodeCls
          
          const p = node.parentElement
          if (p) {
            const same = Array.from(p.children).filter(n => n.tagName === node!.tagName)
            const idx = same.indexOf(node)
            if (idx !== -1 && same.length > 1) {
              step += `:nth-of-type(${idx + 1})`
            }
          }
          
          steps.unshift(step)
          node = node.parentElement
        }
        
        const sel = `${base} > ${steps.join(' > ')}`.trim()
        if (q(sel) === 1) return sel
      }
      
      anchor = anchor.parentElement
      depth++
    }

    // 4. Build path from element up to root
    const maxDepth = 6
    const path: string[] = []
    let node: Element | null = el
    
    for (let d = 0; node && node.nodeType === 1 && d < maxDepth; d++, node = node.parentElement) {
      const t = node.tagName.toLowerCase()
      const nodeCls = getClasses(node).slice(0, 2).map(c => `.${cssEscape(c)}`).join('')
      let step = t + nodeCls
      
      const p = node.parentElement
      if (p) {
        const same = Array.from(p.children).filter(n => n.tagName === node!.tagName)
        const idx = same.indexOf(node)
        if (idx !== -1 && same.length > 1) {
          step += `:nth-of-type(${idx + 1})`
        }
      }
      
      path.unshift(step)
      const sel = path.join(' > ')
      if (q(sel) === 1) return sel
    }

    // 5. Fallback to absolute path
    const absolute = getAbsolutePath(el)
    if (absolute && q(absolute) === 1) return absolute
    
    return absolute || ''
  }

  /**
   * Select an element and store its data
   */
  function selectElement(el: Element, rootDoc?: Document): void {
    if (!el) return

    const selector = computeUniqueSelector(el, rootDoc)
    const html = el.outerHTML
    const tagName = el.tagName.toLowerCase()

    selectedElement.value = {
      element: el,
      html,
      selector,
      tagName
    }

    console.log('[Element Selector] Selected:', {
      tagName,
      selector,
      htmlLength: html.length
    })
  }

  /**
   * Clear selection
   */
  function clearSelection(): void {
    selectedElement.value = {
      element: null,
      html: '',
      selector: '',
      tagName: ''
    }
  }

  /**
   * Find element HTML in content by selector
   */
  function findElementHTMLInContentBySelector(content: string, selector: string): string | null {
    try {
      if (!selector) return null
      
      const doc = new DOMParser().parseFromString(buildPreviewHTML(content || ''), 'text/html')
      const el = doc.querySelector(selector)
      
      return el ? el.outerHTML : null
    } catch (e) {
      return null
    }
  }

  /**
   * Build full HTML document for parsing
   */
  function buildPreviewHTML(content: string): string {
    try {
      if (typeof content !== 'string') return ''
      if (/<html[\s>]/i.test(content)) return content
      return `<!doctype html><html><head><meta charset="utf-8"></head><body>${content}</body></html>`
    } catch {
      return String(content || '')
    }
  }

  /**
   * Escape string for regex
   */
  function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  /**
   * Replace old HTML with new HTML using multiple strategies
   * This is the robust replacement function that handles formatting differences
   */
  function replaceOldWithNewRobust(
    currentContent: string,
    oldHTML: string,
    newHTML: string,
    selector: string
  ): string | null {
    // Strategy 1: Direct string replace
    if (currentContent.includes(oldHTML)) {
      return currentContent.replace(oldHTML, newHTML)
    }

    // Strategy 2: Whitespace-flexible regex
    const parsedOld = findElementHTMLInContentBySelector(currentContent, selector) || oldHTML
    
    if (parsedOld) {
      // 2a: Whitespace-flexible regex
      try {
        const pattern = escapeRegex(parsedOld).replace(/\s+/g, '\\s+')
        const re = new RegExp(pattern)
        if (re.test(currentContent)) {
          return currentContent.replace(re, newHTML)
        }
      } catch (e) {
        // Ignore regex errors
      }

      // 2b: Whitespace-normalized substring replacement
      try {
        const hay = currentContent
        const needle = parsedOld
        const hayNoWS = hay.replace(/\s+/g, '')
        const needleNoWS = needle.replace(/\s+/g, '')
        const idx = hayNoWS.indexOf(needleNoWS)
        
        if (idx !== -1) {
          // Map normalized index back to original indices
          let start = -1
          let end = -1
          let seen = 0
          
          for (let i = 0; i < hay.length; i++) {
            if (!/\s/.test(hay[i])) {
              if (seen === idx) start = i
              if (seen === idx + needleNoWS.length - 1) {
                end = i + 1
                break
              }
              seen++
            }
          }
          
          if (start !== -1 && end !== -1 && end > start) {
            return hay.slice(0, start) + newHTML + hay.slice(end)
          }
        }
      } catch (e) {
        // Ignore errors
      }
    }

    // Strategy 3: DOM-based replacement
    return replaceElementBySelectorDOM(currentContent, selector, newHTML)
  }

  /**
   * Replace element by selector using DOM parsing
   */
  function replaceElementBySelectorDOM(
    currentContent: string,
    selector: string,
    newHTML: string
  ): string | null {
    try {
      if (!selector || !newHTML) return null
      
      const isFullDoc = /<html[\s>]/i.test(currentContent || '')
      const doc = new DOMParser().parseFromString(buildPreviewHTML(currentContent || ''), 'text/html')
      const el = doc.querySelector(selector)
      
      if (!el) return null
      
      const tmp = doc.createElement('div')
      tmp.innerHTML = newHTML.trim()
      const replacement = tmp.firstElementChild
      
      if (!replacement) return null
      
      el.replaceWith(replacement)
      
      return isFullDoc 
        ? doc.documentElement.outerHTML 
        : (doc.body ? doc.body.innerHTML : doc.documentElement.outerHTML)
    } catch (e) {
      return null
    }
  }

  return {
    selectedElement: readonly(selectedElement),
    selectElement,
    clearSelection,
    computeUniqueSelector,
    replaceOldWithNewRobust,
    findElementHTMLInContentBySelector
  }
}
