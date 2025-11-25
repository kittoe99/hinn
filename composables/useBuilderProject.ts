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
        const SELECTION_STYLE_ID = 'nebula-selection-style';

        function enableSelectionMode() {
          // 1. Inject global styles to show interactivity
          if (!document.getElementById(SELECTION_STYLE_ID)) {
            const style = document.createElement('style');
            style.id = SELECTION_STYLE_ID;
            style.innerHTML = \`
              * { 
                cursor: crosshair !important; 
                user-select: none !important;
                -webkit-user-select: none !important;
                touch-action: manipulation !important;
              }
              body {
                touch-action: none !important; /* Prevent scroll only on body to help selection */
              }
              *:hover {
                outline: 2px solid #3b82f6 !important;
                outline-offset: -2px !important;
                box-shadow: inset 0 0 0 2px rgba(59, 130, 246, 0.3) !important;
              }
            \`;
            document.head.appendChild(style);
          }

          // 2. Add Capture Phase Listeners to intercept EVERYTHING
          window.addEventListener('click', handleCapture, { capture: true, passive: false });
          window.addEventListener('touchstart', handleTouch, { capture: true, passive: false });
          // Disable normal mouseover to prevent conflict with CSS hover
          // but we can use it for detailed highlighting if needed. 
          // CSS :hover is usually enough for visual feedback on desktop.
        }

        function disableSelectionMode() {
          const style = document.getElementById(SELECTION_STYLE_ID);
          if (style) style.remove();

          window.removeEventListener('click', handleCapture, { capture: true });
          window.removeEventListener('touchstart', handleTouch, { capture: true });
        }

        function handleCapture(e) {
          // Stop the event from reaching the element's normal handlers
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          selectElement(e.target);
          return false;
        }

        function handleTouch(e) {
           // For touch, we want to select on TAP, not scroll.
           // But blocking all touchstart prevents scroll. 
           // Let's rely on 'click' which fires after a tap on mobile.
           // EXCEPT some elements don't fire click if they are not interactive.
           // So we'll do a hybrid: prevent default to stop scroll/zoom, select target.
           
           e.preventDefault();
           e.stopPropagation();
           e.stopImmediatePropagation();
           
           const touch = e.touches[0];
           const target = document.elementFromPoint(touch.clientX, touch.clientY);
           if (target) {
             selectElement(target);
           }
        }

        function selectElement(target) {
          if (!target || target === document.documentElement) return;

          const html = target.outerHTML;
          const tagName = target.tagName.toLowerCase();
          const text = target.innerText.substring(0, 50) + (target.innerText.length > 50 ? '...' : '');

          window.parent.postMessage({
            type: 'NEBULA_ELEMENT_SELECTED',
            payload: { tagName, html, text }
          }, '*');
        }

        window.addEventListener('message', (event) => {
          if (event.data.type === 'TOGGLE_SELECTION_MODE') {
            if (event.data.enabled) {
              enableSelectionMode();
            } else {
              disableSelectionMode();
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
