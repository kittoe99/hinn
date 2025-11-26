/**
 * Intelligent Router - Decides between full generation vs targeted editing
 */

export interface EditDecision {
  mode: 'full_generation' | 'targeted_edit'
  confidence: number
  reasoning: string
  targetFiles?: string[]
  targetLines?: { file: string, start: number, end: number }[]
}

export class IntelligentRouter {
  /**
   * Analyze the request and decide whether to do full generation or targeted edit
   */
  static analyzeRequest(
    userRequest: string,
    hasExistingFiles: boolean,
    hasSelectedElement: boolean,
    fileCount: number
  ): EditDecision {
    const request = userRequest.toLowerCase()
    
    // RULE 1: No existing files = always full generation
    if (!hasExistingFiles || fileCount === 0) {
      return {
        mode: 'full_generation',
        confidence: 1.0,
        reasoning: 'No existing files - creating new project'
      }
    }
    
    // RULE 2: Element selected = always targeted edit
    if (hasSelectedElement) {
      return {
        mode: 'targeted_edit',
        confidence: 1.0,
        reasoning: 'User selected specific element for editing'
      }
    }
    
    // RULE 3: Detect full regeneration keywords
    const fullRegenKeywords = [
      'rebuild', 'recreate', 'start over', 'from scratch',
      'redesign everything', 'complete redesign', 'new design',
      'completely different', 'totally different'
    ]
    
    if (fullRegenKeywords.some(keyword => request.includes(keyword))) {
      return {
        mode: 'full_generation',
        confidence: 0.95,
        reasoning: `Request contains full regeneration keyword: "${fullRegenKeywords.find(k => request.includes(k))}"`
      }
    }
    
    // RULE 4: Detect targeted edit keywords
    const targetedEditKeywords = [
      'change', 'update', 'modify', 'edit', 'fix',
      'make', 'add', 'remove', 'delete',
      'adjust', 'tweak', 'improve',
      'color', 'size', 'position', 'style',
      'button', 'header', 'footer', 'nav', 'menu',
      'text', 'image', 'link', 'form'
    ]
    
    const matchedKeywords = targetedEditKeywords.filter(k => request.includes(k))
    
    if (matchedKeywords.length > 0) {
      return {
        mode: 'targeted_edit',
        confidence: 0.9,
        reasoning: `Request contains targeted edit keywords: ${matchedKeywords.join(', ')}`
      }
    }
    
    // RULE 5: Detect scope indicators
    if (this.detectsSpecificScope(request)) {
      return {
        mode: 'targeted_edit',
        confidence: 0.85,
        reasoning: 'Request targets specific component or section'
      }
    }
    
    // RULE 6: Detect new feature additions (might need full generation)
    const newFeatureKeywords = [
      'add a new page', 'create a new section', 'add new feature',
      'implement', 'build a', 'create a'
    ]
    
    if (newFeatureKeywords.some(keyword => request.includes(keyword))) {
      // New features can be targeted edits if they're additions
      if (request.includes('add') || request.includes('create')) {
        return {
          mode: 'targeted_edit',
          confidence: 0.75,
          reasoning: 'Adding new feature - can be done with targeted insertion'
        }
      }
      return {
        mode: 'full_generation',
        confidence: 0.7,
        reasoning: 'Major new feature - may require full regeneration'
      }
    }
    
    // RULE 7: Default to targeted edit for existing projects
    return {
      mode: 'targeted_edit',
      confidence: 0.6,
      reasoning: 'Default to targeted edit for existing project with ambiguous request'
    }
  }
  
  /**
   * Detect if request targets a specific scope
   */
  private static detectsSpecificScope(request: string): boolean {
    const scopeIndicators = [
      'the header', 'the footer', 'the nav', 'the menu',
      'the button', 'the form', 'the card', 'the section',
      'this', 'that', 'these', 'those'
    ]
    
    return scopeIndicators.some(indicator => request.includes(indicator))
  }
  
  /**
   * Extract which files should be targeted for editing
   */
  static identifyTargetFiles(
    userRequest: string,
    availableFiles: string[]
  ): string[] {
    const request = userRequest.toLowerCase()
    const targets: string[] = []
    
    // Check if specific files are mentioned
    for (const file of availableFiles) {
      if (request.includes(file.toLowerCase())) {
        targets.push(file)
      }
    }
    
    // If no specific files mentioned, use heuristics
    if (targets.length === 0) {
      // Look for HTML files for most UI changes
      if (request.includes('page') || request.includes('html') || 
          request.includes('button') || request.includes('text') ||
          request.includes('header') || request.includes('footer')) {
        targets.push(...availableFiles.filter(f => f.endsWith('.html')))
      }
      
      // Look for CSS files for style changes
      if (request.includes('style') || request.includes('color') || 
          request.includes('size') || request.includes('layout')) {
        targets.push(...availableFiles.filter(f => f.endsWith('.css')))
      }
      
      // Look for JS files for functionality changes
      if (request.includes('function') || request.includes('click') || 
          request.includes('event') || request.includes('interactive')) {
        targets.push(...availableFiles.filter(f => f.endsWith('.js')))
      }
      
      // Default to index.html if nothing specific
      if (targets.length === 0) {
        const indexFile = availableFiles.find(f => f.includes('index.html'))
        if (indexFile) targets.push(indexFile)
      }
    }
    
    return [...new Set(targets)] // Remove duplicates
  }
}
