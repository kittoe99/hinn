import React, { useEffect, useRef, useMemo } from 'react';

interface PreviewFrameProps {
  htmlContent: string;
  isSelectionMode: boolean;
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({ htmlContent, isSelectionMode }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Inject script and styles for selection mode and navigation
  const enhancedHtml = useMemo(() => {
    if (!htmlContent) return '';

    console.log('PreviewFrame received HTML length:', htmlContent.length);

    // Inject styles/scripts for selection mode
    const injectionScript = `
      <style>
        .nebula-select-hover {
          outline: 2px solid #3b82f6 !important;
          cursor: pointer !important;
          background-color: rgba(59, 130, 246, 0.1) !important;
          transition: all 0.1s ease;
        }
        /* Ensure scrollbar looks good in dark mode */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #18181b; 
        }
        ::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 4px;
        }
      </style>
      <script>
        (function() {
          const isSelectionMode = ${isSelectionMode};
          
          // Wait for DOM to be ready
          function initializePreview() {
            // Selection Mode Logic
            if (isSelectionMode) {
              document.body.addEventListener('mouseover', (e) => {
                e.stopPropagation();
                // Remove previous highlights
                document.querySelectorAll('.nebula-select-hover').forEach(el => el.classList.remove('nebula-select-hover'));
                // Add new highlight
                if (e.target) e.target.classList.add('nebula-select-hover');
              });

              document.body.addEventListener('mouseout', (e) => {
                if (e.target) e.target.classList.remove('nebula-select-hover');
              });

              document.body.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const element = e.target;
                // Send message to parent
                window.parent.postMessage({
                  type: 'NEBULA_ELEMENT_SELECTED',
                  payload: {
                    tagName: element.tagName.toLowerCase(),
                    html: element.outerHTML,
                    text: element.innerText ? element.innerText.substring(0, 30) + '...' : ''
                  }
                }, '*');
              });
            }

            // Navigation Interception Logic
            // We must capture clicks on 'a' tags to prevent iframe from navigating to a blob: URL directly (which breaks history)
            // or to relative paths that don't exist in the iframe context.
            document.body.addEventListener('click', (e) => {
              if (isSelectionMode) return;
              
              // Find closest anchor tag
              const link = e.target.closest('a');
              if (link) {
                const href = link.getAttribute('href');
                // If it's an internal link (not http/mailto/hash)
                if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('#') && !href.startsWith('data:')) {
                  e.preventDefault();
                  window.parent.postMessage({
                    type: 'NEBULA_NAVIGATE',
                    payload: { path: href }
                  }, '*');
                }
              }
            });
          }

          // Initialize when DOM is ready
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializePreview);
          } else {
            initializePreview();
          }
        })();
      </script>
    `;

    // Inject before closing body tag, or append to end if no body tag
    if (htmlContent.includes('</body>')) {
      return htmlContent.replace('</body>', `${injectionScript}</body>`);
    } else if (htmlContent.includes('</html>')) {
      return htmlContent.replace('</html>', `${injectionScript}</html>`);
    } else {
      return htmlContent + injectionScript;
    }
  }, [htmlContent, isSelectionMode]);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = enhancedHtml;
    }
  }, [enhancedHtml]);

  if (!htmlContent) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-lg border-dashed">
        <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
           <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
           </svg>
        </div>
        <p className="text-lg font-medium">No Preview Available</p>
        <p className="text-sm">Generate a website to see it here.</p>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title="Website Preview"
      className={`w-full h-full bg-zinc-950 rounded-lg shadow-xl border-0 transition-all duration-200 ${isSelectionMode ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-900 cursor-crosshair' : ''}`}
      sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
    />
  );
};