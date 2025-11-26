/**
 * Code Analyzer - RAG System for Code Understanding
 * Analyzes code structure, identifies elements, and locates exact positions
 */

export interface CodeLocation {
  file: string
  startLine: number
  endLine: number
  startChar: number
  endChar: number
  content: string
  context: string // Surrounding code for context
}

export interface ElementMatch {
  location: CodeLocation
  confidence: number
  elementType: string // 'tag', 'class', 'id', 'text'
  matchedBy: string
}

export class CodeAnalyzer {
  /**
   * Find the exact location of an HTML element in the codebase
   */
  static findElementLocation(
    files: Record<string, { content: string }>,
    elementHtml: string,
    elementText?: string
  ): ElementMatch[] {
    const matches: ElementMatch[] = []
    
    // Extract key identifiers from the element
    const identifiers = this.extractIdentifiers(elementHtml)
    
    // Search through all files
    for (const [filePath, file] of Object.entries(files)) {
      if (!this.isHtmlFile(filePath)) continue
      
      const fileMatches = this.searchInFile(
        filePath,
        file.content,
        identifiers,
        elementHtml,
        elementText
      )
      
      matches.push(...fileMatches)
    }
    
    // Sort by confidence (highest first)
    return matches.sort((a, b) => b.confidence - a.confidence)
  }
  
  /**
   * Extract identifiers from HTML element (tags, classes, ids, attributes)
   */
  private static extractIdentifiers(html: string): {
    tag?: string
    classes: string[]
    id?: string
    attributes: Record<string, string>
    text?: string
  } {
    const identifiers: any = {
      classes: [],
      attributes: {}
    }
    
    // Extract tag name
    const tagMatch = html.match(/<(\w+)/)
    if (tagMatch) identifiers.tag = tagMatch[1]
    
    // Extract classes
    const classMatch = html.match(/class=["']([^"']+)["']/)
    if (classMatch) {
      identifiers.classes = classMatch[1].split(/\s+/).filter(Boolean)
    }
    
    // Extract id
    const idMatch = html.match(/id=["']([^"']+)["']/)
    if (idMatch) identifiers.id = idMatch[1]
    
    // Extract other attributes
    const attrRegex = /(\w+)=["']([^"']+)["']/g
    let attrMatch
    while ((attrMatch = attrRegex.exec(html)) !== null) {
      const [, key, value] = attrMatch
      if (key !== 'class' && key !== 'id') {
        identifiers.attributes[key] = value
      }
    }
    
    // Extract text content
    const textMatch = html.match(/>([^<]+)</)
    if (textMatch) identifiers.text = textMatch[1].trim()
    
    return identifiers
  }
  
  /**
   * Search for element in a specific file
   */
  private static searchInFile(
    filePath: string,
    content: string,
    identifiers: any,
    originalHtml: string,
    elementText?: string
  ): ElementMatch[] {
    const matches: ElementMatch[] = []
    const lines = content.split('\n')
    
    // Strategy 1: Exact HTML match
    const exactMatch = this.findExactMatch(content, originalHtml, lines, filePath)
    if (exactMatch) {
      matches.push(exactMatch)
      return matches // Exact match is best, return immediately
    }
    
    // Strategy 2: ID match (very high confidence)
    if (identifiers.id) {
      const idMatches = this.findById(content, identifiers.id, lines, filePath)
      matches.push(...idMatches)
    }
    
    // Strategy 3: Class + Tag match (high confidence)
    if (identifiers.tag && identifiers.classes.length > 0) {
      const classMatches = this.findByClassAndTag(
        content,
        identifiers.tag,
        identifiers.classes,
        lines,
        filePath
      )
      matches.push(...classMatches)
    }
    
    // Strategy 4: Text content match (medium confidence)
    if (identifiers.text || elementText) {
      const textMatches = this.findByText(
        content,
        identifiers.text || elementText || '',
        identifiers.tag,
        lines,
        filePath
      )
      matches.push(...textMatches)
    }
    
    return matches
  }
  
  /**
   * Find exact HTML match
   */
  private static findExactMatch(
    content: string,
    html: string,
    lines: string[],
    filePath: string
  ): ElementMatch | null {
    // Normalize whitespace for comparison
    const normalizedContent = content.replace(/\s+/g, ' ')
    const normalizedHtml = html.replace(/\s+/g, ' ')
    
    const index = normalizedContent.indexOf(normalizedHtml)
    if (index === -1) return null
    
    const location = this.getLocationFromIndex(content, index, html.length, lines, filePath)
    
    return {
      location,
      confidence: 1.0,
      elementType: 'exact',
      matchedBy: 'exact_html_match'
    }
  }
  
  /**
   * Find by ID attribute
   */
  private static findById(
    content: string,
    id: string,
    lines: string[],
    filePath: string
  ): ElementMatch[] {
    const matches: ElementMatch[] = []
    const regex = new RegExp(`id=["']${id}["']`, 'gi')
    
    let match
    while ((match = regex.exec(content)) !== null) {
      const location = this.getElementLocationFromMatch(content, match.index, lines, filePath)
      matches.push({
        location,
        confidence: 0.95,
        elementType: 'id',
        matchedBy: `id="${id}"`
      })
    }
    
    return matches
  }
  
  /**
   * Find by class and tag combination
   */
  private static findByClassAndTag(
    content: string,
    tag: string,
    classes: string[],
    lines: string[],
    filePath: string
  ): ElementMatch[] {
    const matches: ElementMatch[] = []
    
    // Build regex to find tag with all classes
    const classPattern = classes.map(c => `(?=.*\\b${c}\\b)`).join('')
    const regex = new RegExp(`<${tag}[^>]*class=["'][^"']*${classPattern}[^"']*["'][^>]*>`, 'gi')
    
    let match
    while ((match = regex.exec(content)) !== null) {
      const location = this.getElementLocationFromMatch(content, match.index, lines, filePath)
      matches.push({
        location,
        confidence: 0.85,
        elementType: 'class',
        matchedBy: `${tag}.${classes.join('.')}`
      })
    }
    
    return matches
  }
  
  /**
   * Find by text content
   */
  private static findByText(
    content: string,
    text: string,
    tag: string | undefined,
    lines: string[],
    filePath: string
  ): ElementMatch[] {
    const matches: ElementMatch[] = []
    const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    
    const tagPattern = tag ? tag : '\\w+'
    const regex = new RegExp(`<${tagPattern}[^>]*>\\s*${escapedText}\\s*</${tagPattern}>`, 'gi')
    
    let match
    while ((match = regex.exec(content)) !== null) {
      const location = this.getElementLocationFromMatch(content, match.index, lines, filePath)
      matches.push({
        location,
        confidence: 0.7,
        elementType: 'text',
        matchedBy: `text="${text}"`
      })
    }
    
    return matches
  }
  
  /**
   * Get element location from match index (finds the complete element)
   */
  private static getElementLocationFromMatch(
    content: string,
    matchIndex: number,
    lines: string[],
    filePath: string
  ): CodeLocation {
    // Find the opening tag
    let start = matchIndex
    while (start > 0 && content[start] !== '<') start--
    
    // Find the closing tag
    const openTagEnd = content.indexOf('>', matchIndex)
    const tagMatch = content.slice(start, openTagEnd).match(/<(\w+)/)
    const tagName = tagMatch ? tagMatch[1] : ''
    
    let end = openTagEnd
    let depth = 1
    const closingTag = `</${tagName}>`
    
    // Handle self-closing tags
    if (content.slice(start, openTagEnd + 1).includes('/>')) {
      end = content.indexOf('/>', matchIndex) + 2
    } else {
      // Find matching closing tag
      let pos = openTagEnd + 1
      while (depth > 0 && pos < content.length) {
        if (content.slice(pos, pos + tagName.length + 2) === `<${tagName}`) {
          depth++
          pos += tagName.length + 2
        } else if (content.slice(pos, pos + closingTag.length) === closingTag) {
          depth--
          if (depth === 0) {
            end = pos + closingTag.length
            break
          }
          pos += closingTag.length
        } else {
          pos++
        }
      }
    }
    
    return this.getLocationFromIndex(content, start, end - start, lines, filePath)
  }
  
  /**
   * Convert character index to line/column location
   */
  private static getLocationFromIndex(
    content: string,
    index: number,
    length: number,
    lines: string[],
    filePath: string
  ): CodeLocation {
    let currentIndex = 0
    let startLine = 0
    let startChar = 0
    let endLine = 0
    let endChar = 0
    
    // Find start position
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1 // +1 for newline
      if (currentIndex + lineLength > index) {
        startLine = i
        startChar = index - currentIndex
        break
      }
      currentIndex += lineLength
    }
    
    // Find end position
    const endIndex = index + length
    currentIndex = 0
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1
      if (currentIndex + lineLength >= endIndex) {
        endLine = i
        endChar = endIndex - currentIndex
        break
      }
      currentIndex += lineLength
    }
    
    // Get context (3 lines before and after)
    const contextStart = Math.max(0, startLine - 3)
    const contextEnd = Math.min(lines.length, endLine + 4)
    const context = lines.slice(contextStart, contextEnd).join('\n')
    
    return {
      file: filePath,
      startLine,
      endLine,
      startChar,
      endChar,
      content: content.slice(index, index + length),
      context
    }
  }
  
  /**
   * Check if file is HTML
   */
  private static isHtmlFile(filePath: string): boolean {
    return filePath.endsWith('.html') || filePath.endsWith('.htm')
  }
}
