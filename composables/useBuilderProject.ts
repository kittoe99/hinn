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
        let selectionOverlay = null;

        function createOverlay() {
          if (selectionOverlay) return;
          selectionOverlay = document.createElement('div');
          selectionOverlay.id = 'nebula-selection-overlay';
          selectionOverlay.style.position = 'fixed';
          selectionOverlay.style.inset = '0';
          selectionOverlay.style.zIndex = '999999';
          selectionOverlay.style.cursor = 'crosshair';
          selectionOverlay.style.background = 'rgba(59, 130, 246, 0.1)'; // Slight blue tint
          selectionOverlay.style.touchAction = 'none'; // Prevent scrolling while selecting
          
          // Handle clicks on the overlay
          selectionOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectElementAt(e.clientX, e.clientY);
          });

          // Handle touch on the overlay
          selectionOverlay.addEventListener('touchstart', (e) => {
             e.preventDefault(); // Prevent scroll
             const touch = e.touches[0];
             selectElementAt(touch.clientX, touch.clientY);
          }, { passive: false });

          // Hover effect (desktop only)
          selectionOverlay.addEventListener('mousemove', (e) => {
            highlightElementAt(e.clientX, e.clientY);
          });

          document.body.appendChild(selectionOverlay);
        }

        function removeOverlay() {
          if (selectionOverlay) {
            selectionOverlay.remove();
            selectionOverlay = null;
          }
          if (lastHighlighted) {
            lastHighlighted.style.outline = '';
            lastHighlighted = null;
          }
        }

        let lastHighlighted = null;

        function highlightElementAt(x, y) {
          // Hide overlay momentarily to check element underneath
          selectionOverlay.style.pointerEvents = 'none';
          const target = document.elementFromPoint(x, y);
          selectionOverlay.style.pointerEvents = 'auto';

          if (target && target !== document.body && target !== document.documentElement) {
            if (lastHighlighted && lastHighlighted !== target) {
              lastHighlighted.style.outline = '';
            }
            target.style.outline = '2px solid #3b82f6';
            lastHighlighted = target;
          }
        }

        function selectElementAt(x, y) {
          selectionOverlay.style.pointerEvents = 'none';
          const target = document.elementFromPoint(x, y);
          selectionOverlay.style.pointerEvents = 'auto';

          if (target) {
             const html = target.outerHTML;
             const tagName = target.tagName.toLowerCase();
             const text = target.innerText.substring(0, 50) + (target.innerText.length > 50 ? '...' : '');

             window.parent.postMessage({
               type: 'NEBULA_ELEMENT_SELECTED',
               payload: { tagName, html, text }
             }, '*');
          }
        }

        window.addEventListener('message', (event) => {
          if (event.data.type === 'TOGGLE_SELECTION_MODE') {
            if (event.data.enabled) {
              createOverlay();
            } else {
              removeOverlay();
            }
          }
        });

        // Scroll detection for mobile floating UI

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
