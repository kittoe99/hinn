/**
 * Code Injector - Surgical Code Injection System
 * Injects generated code at precise locations without regenerating entire files
 */

import type { CodeLocation } from './codeAnalyzer'

export interface InjectionResult {
  success: boolean
  file: string
  originalContent: string
  modifiedContent: string
  linesChanged: number[]
  error?: string
}

export class CodeInjector {
  /**
   * Replace an element at a specific location with new code
   */
  static replaceElement(
    fileContent: string,
    location: CodeLocation,
    newCode: string
  ): InjectionResult {
    const lines = fileContent.split('\n')
    const { startLine, endLine, startChar, endChar } = location
    
    try {
      // Get the indentation of the original element
      const indentation = this.getIndentation(lines[startLine])
      
      // Apply indentation to new code
      const indentedNewCode = this.applyIndentation(newCode, indentation)
      
      // Handle single-line replacement
      if (startLine === endLine) {
        const line = lines[startLine]
        const before = line.substring(0, startChar)
        const after = line.substring(endChar)
        lines[startLine] = before + indentedNewCode + after
      } 
      // Handle multi-line replacement
      else {
        const firstLine = lines[startLine].substring(0, startChar) + indentedNewCode
        const lastLine = lines[endLine].substring(endChar)
        
        // Remove old lines and insert new content
        const newLines = [firstLine + lastLine]
        lines.splice(startLine, endLine - startLine + 1, ...newLines)
      }
      
      const modifiedContent = lines.join('\n')
      const linesChanged = Array.from(
        { length: endLine - startLine + 1 },
        (_, i) => startLine + i
      )
      
      return {
        success: true,
        file: location.file,
        originalContent: fileContent,
        modifiedContent,
        linesChanged
      }
    } catch (error: any) {
      return {
        success: false,
        file: location.file,
        originalContent: fileContent,
        modifiedContent: fileContent,
        linesChanged: [],
        error: error.message
      }
    }
  }
  
  /**
   * Insert code before an element
   */
  static insertBefore(
    fileContent: string,
    location: CodeLocation,
    newCode: string
  ): InjectionResult {
    const lines = fileContent.split('\n')
    const { startLine, startChar } = location
    
    try {
      const indentation = this.getIndentation(lines[startLine])
      const indentedNewCode = this.applyIndentation(newCode, indentation)
      
      // Insert on the same line before the element
      const line = lines[startLine]
      const before = line.substring(0, startChar)
      const after = line.substring(startChar)
      
      lines[startLine] = before + indentedNewCode + '\n' + indentation + after
      
      return {
        success: true,
        file: location.file,
        originalContent: fileContent,
        modifiedContent: lines.join('\n'),
        linesChanged: [startLine]
      }
    } catch (error: any) {
      return {
        success: false,
        file: location.file,
        originalContent: fileContent,
        modifiedContent: fileContent,
        linesChanged: [],
        error: error.message
      }
    }
  }
  
  /**
   * Insert code after an element
   */
  static insertAfter(
    fileContent: string,
    location: CodeLocation,
    newCode: string
  ): InjectionResult {
    const lines = fileContent.split('\n')
    const { endLine, endChar } = location
    
    try {
      const indentation = this.getIndentation(lines[endLine])
      const indentedNewCode = this.applyIndentation(newCode, indentation)
      
      // Insert after the element
      const line = lines[endLine]
      const before = line.substring(0, endChar)
      const after = line.substring(endChar)
      
      lines[endLine] = before + '\n' + indentation + indentedNewCode + after
      
      return {
        success: true,
        file: location.file,
        originalContent: fileContent,
        modifiedContent: lines.join('\n'),
        linesChanged: [endLine]
      }
    } catch (error: any) {
      return {
        success: false,
        file: location.file,
        originalContent: fileContent,
        modifiedContent: fileContent,
        linesChanged: [],
        error: error.message
      }
    }
  }
  
  /**
   * Modify specific attributes of an element
   */
  static modifyAttributes(
    fileContent: string,
    location: CodeLocation,
    attributes: Record<string, string | null> // null means remove attribute
  ): InjectionResult {
    const lines = fileContent.split('\n')
    const { startLine, endLine, startChar, endChar } = location
    
    try {
      let elementHtml = location.content
      
      // Modify each attribute
      for (const [attr, value] of Object.entries(attributes)) {
        if (value === null) {
          // Remove attribute
          const attrRegex = new RegExp(`\\s*${attr}=["'][^"']*["']`, 'g')
          elementHtml = elementHtml.replace(attrRegex, '')
        } else {
          // Check if attribute exists
          const attrRegex = new RegExp(`${attr}=["']([^"']*)["']`)
          if (attrRegex.test(elementHtml)) {
            // Update existing attribute
            elementHtml = elementHtml.replace(
              attrRegex,
              `${attr}="${value}"`
            )
          } else {
            // Add new attribute (insert before closing >)
            elementHtml = elementHtml.replace(
              /(\s*\/?>)/,
              ` ${attr}="${value}"$1`
            )
          }
        }
      }
      
      // Replace the element with modified version
      if (startLine === endLine) {
        const line = lines[startLine]
        const before = line.substring(0, startChar)
        const after = line.substring(endChar)
        lines[startLine] = before + elementHtml + after
      } else {
        const firstLine = lines[startLine].substring(0, startChar) + elementHtml
        const lastLine = lines[endLine].substring(endChar)
        lines.splice(startLine, endLine - startLine + 1, firstLine + lastLine)
      }
      
      return {
        success: true,
        file: location.file,
        originalContent: fileContent,
        modifiedContent: lines.join('\n'),
        linesChanged: Array.from(
          { length: endLine - startLine + 1 },
          (_, i) => startLine + i
        )
      }
    } catch (error: any) {
      return {
        success: false,
        file: location.file,
        originalContent: fileContent,
        modifiedContent: fileContent,
        linesChanged: [],
        error: error.message
      }
    }
  }
  
  /**
   * Modify classes of an element (add, remove, or replace)
   */
  static modifyClasses(
    fileContent: string,
    location: CodeLocation,
    operation: 'add' | 'remove' | 'replace',
    classes: string[]
  ): InjectionResult {
    const lines = fileContent.split('\n')
    const { startLine, endLine, startChar, endChar } = location
    
    try {
      let elementHtml = location.content
      const classRegex = /class=["']([^"']*)["']/
      const classMatch = elementHtml.match(classRegex)
      
      let newClasses: string[] = []
      
      if (operation === 'add') {
        const existingClasses = classMatch ? classMatch[1].split(/\s+/).filter(Boolean) : []
        newClasses = [...new Set([...existingClasses, ...classes])]
      } else if (operation === 'remove') {
        const existingClasses = classMatch ? classMatch[1].split(/\s+/).filter(Boolean) : []
        newClasses = existingClasses.filter(c => !classes.includes(c))
      } else if (operation === 'replace') {
        newClasses = classes
      }
      
      const newClassString = newClasses.join(' ')
      
      if (classMatch) {
        elementHtml = elementHtml.replace(classRegex, `class="${newClassString}"`)
      } else {
        elementHtml = elementHtml.replace(/(\s*\/?>)/, ` class="${newClassString}"$1`)
      }
      
      // Replace the element
      if (startLine === endLine) {
        const line = lines[startLine]
        const before = line.substring(0, startChar)
        const after = line.substring(endChar)
        lines[startLine] = before + elementHtml + after
      } else {
        const firstLine = lines[startLine].substring(0, startChar) + elementHtml
        const lastLine = lines[endLine].substring(endChar)
        lines.splice(startLine, endLine - startLine + 1, firstLine + lastLine)
      }
      
      return {
        success: true,
        file: location.file,
        originalContent: fileContent,
        modifiedContent: lines.join('\n'),
        linesChanged: Array.from(
          { length: endLine - startLine + 1 },
          (_, i) => startLine + i
        )
      }
    } catch (error: any) {
      return {
        success: false,
        file: location.file,
        originalContent: fileContent,
        modifiedContent: fileContent,
        linesChanged: [],
        error: error.message
      }
    }
  }
  
  /**
   * Get indentation from a line
   */
  private static getIndentation(line: string): string {
    const match = line.match(/^(\s*)/)
    return match ? match[1] : ''
  }
  
  /**
   * Apply indentation to multi-line code
   */
  private static applyIndentation(code: string, indentation: string): string {
    const lines = code.split('\n')
    return lines
      .map((line, index) => {
        // Don't indent the first line (it's already positioned)
        if (index === 0) return line
        // Apply indentation to other lines
        return indentation + line
      })
      .join('\n')
  }
  
  /**
   * Validate that the injection was successful
   */
  static validate(result: InjectionResult): boolean {
    if (!result.success) return false
    
    // Basic validation: check that content changed
    if (result.originalContent === result.modifiedContent) {
      return false
    }
    
    // Check that we didn't break HTML structure
    const openTags = (result.modifiedContent.match(/<[^/][^>]*>/g) || []).length
    const closeTags = (result.modifiedContent.match(/<\/[^>]+>/g) || []).length
    const selfClosing = (result.modifiedContent.match(/<[^>]+\/>/g) || []).length
    
    // Rough validation: open tags should match close tags (accounting for self-closing)
    // This is not perfect but catches major issues
    return Math.abs(openTags - closeTags - selfClosing) < 5
  }
}
