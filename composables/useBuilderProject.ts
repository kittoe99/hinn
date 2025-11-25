import type { FileMap } from '~/types/builder'

export const useBuilderProject = () => {
  /**
   * Finds the entry point (index.html) in the file map
   */
  const findEntryPoint = (files: FileMap): string | null => {
    const paths = Object.keys(files);
    if (files['index.html']) return 'index.html';
    
    const htmlFile = paths.find(p => p.endsWith('.html'));
    if (htmlFile) return htmlFile;
    
    return null;
  }

  /**
   * Resolves a relative path from a base path
   */
  const resolvePath = (from: string, to: string): string => {
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('data:')) {
      return to;
    }

    if (to.startsWith('/')) {
      return to.slice(1);
    }

    const fromParts = from.split('/').slice(0, -1);
    const toParts = to.split('/');

    for (const part of toParts) {
      if (part === '..') {
        fromParts.pop();
      } else if (part !== '.') {
        fromParts.push(part);
      }
    }

    return fromParts.join('/');
  }

  /**
   * Bundles the project files into a single HTML string for preview
   */
  const bundleProjectForPreview = (files: FileMap): string => {
    const entryPoint = findEntryPoint(files);
    if (!entryPoint) {
      return '<html><body><h1>No index.html found</h1></body></html>';
    }

    const entryFile = files[entryPoint];
    if (!entryFile || entryFile.type !== 'file') {
      return '<html><body><h1>Entry point is not a file</h1></body></html>';
    }

    let html = entryFile.content;

    // Auto-close tags for partial content rendering
    if (!html.includes('</body>') && html.includes('<body')) {
      html += '</body></html>';
    } else if (!html.includes('</html>') && html.includes('<html')) {
      html += '</html>';
    }

    // Inject default styles to prevent white flash
    if (!html.includes('<style id="anti-flash">')) {
      const antiFlash = `
        <style id="anti-flash">
          body { background-color: #09090b; color: #e4e4e7; }
        </style>
      `;
      html = html.replace('<head>', '<head>' + antiFlash);
    }

    // Inline CSS files
    html = html.replace(/<link\s+[^>]*href=["']([^"']+\.css)["'][^>]*>/gi, (match, href) => {
      const resolvedPath = resolvePath(entryPoint, href);
      const cssFile = files[resolvedPath];
      
      if (cssFile && cssFile.type === 'file') {
        return `<style>${cssFile.content}</style>`;
      }
      return match;
    });

    // Inline JS files
    html = html.replace(/<script\s+[^>]*src=["']([^"']+\.js)["'][^>]*><\/script>/gi, (match, src) => {
      const resolvedPath = resolvePath(entryPoint, src);
      const jsFile = files[resolvedPath];
      
      if (jsFile && jsFile.type === 'file') {
        return `<script>${jsFile.content}</script>`;
      }
      return match;
    });

    // Inject Selection Script
    const selectionScript = `
      <script>
        window.addEventListener('message', (event) => {
          if (event.data.type === 'TOGGLE_SELECTION_MODE') {
            if (event.data.enabled) {
              document.body.style.cursor = 'crosshair';
              // Mouse events
              document.addEventListener('click', handleSelection, true);
              document.addEventListener('mouseover', handleHover, true);
              document.addEventListener('mouseout', handleHoverOut, true);
              // Touch events for mobile
              document.addEventListener('touchstart', handleTouchStart, { capture: true, passive: false });
            } else {
              document.body.style.cursor = 'default';
              document.removeEventListener('click', handleSelection, true);
              document.removeEventListener('mouseover', handleHover, true);
              document.removeEventListener('mouseout', handleHoverOut, true);
              document.removeEventListener('touchstart', handleTouchStart, true);
              if (lastHighlighted) {
                lastHighlighted.style.outline = '';
                lastHighlighted = null;
              }
            }
          }
        });

        let lastHighlighted = null;

        function handleHover(e) {
          e.stopPropagation();
          if (lastHighlighted) lastHighlighted.style.outline = '';
          e.target.style.outline = '2px solid #3b82f6';
          lastHighlighted = e.target;
        }

        function handleHoverOut(e) {
          e.target.style.outline = '';
        }

        function handleTouchStart(e) {
           // Identify the element being touched
           const touch = e.touches[0];
           const target = document.elementFromPoint(touch.clientX, touch.clientY);
           if (target) {
             // Trigger selection logic for this element
             // Create a synthetic event object
             handleSelection({
               target: target,
               preventDefault: () => e.preventDefault(),
               stopPropagation: () => e.stopPropagation()
             });
           }
        }

        function handleSelection(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const target = e.target;
          const html = target.outerHTML;
          const tagName = target.tagName.toLowerCase();
          const text = target.innerText.substring(0, 50) + (target.innerText.length > 50 ? '...' : '');

          window.parent.postMessage({
            type: 'NEBULA_ELEMENT_SELECTED',
            payload: { tagName, html, text }
          }, '*');
        }

        // Scroll detection for mobile floating UI
        let lastScrollY = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const currentScrollY = window.scrollY;
              const direction = currentScrollY > lastScrollY ? 'down' : 'up';
              const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
              
              window.parent.postMessage({
                type: 'PREVIEW_SCROLL',
                direction: direction,
                scrollY: currentScrollY,
                atBottom: atBottom
              }, '*');
              
              lastScrollY = currentScrollY;
              ticking = false;
            });
            ticking = true;
          }
        });
      </script>
    `;

    return html + selectionScript;
  }

  return {
    findEntryPoint,
    resolvePath,
    bundleProjectForPreview
  }
}
