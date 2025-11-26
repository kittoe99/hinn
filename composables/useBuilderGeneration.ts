import type { FileMap, SearchSource } from '~/types/builder'

interface GenerateStreamUpdate {
  files: FileMap;
  sources: SearchSource[];
  isThinking: boolean;
  streamingText?: string;
  chunkText?: string;
}

export const useBuilderGeneration = () => {
  async function* generateProjectStream(
    prompt: string,
    currentFiles: FileMap,
    imageBase64?: string,
    focusedElementHtml?: string,
    useSearch: boolean = false
  ): AsyncGenerator<GenerateStreamUpdate, void, unknown> {
    try {
      // Use smart generation endpoint that decides between full gen and targeted edit
      const response = await fetch('/api/builder/smart-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          currentFiles,
          imageBase64,
          elementHtml: focusedElementHtml,
          useSearch
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let accumulatedText = '';
      let accumulatedSources: SearchSource[] = [];
      
      let workingFiles: FileMap = JSON.parse(JSON.stringify(currentFiles));

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              return;
            }

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.error) {
                throw new Error(parsed.error);
              }

              const chunkText = parsed.text || '';
              accumulatedText += chunkText;

              if (parsed.sources && Array.isArray(parsed.sources)) {
                parsed.sources.forEach((source: SearchSource) => {
                  if (!accumulatedSources.some(s => s.uri === source.uri)) {
                    accumulatedSources.push(source);
                  }
                });
              }
              
              // Yield chunk text for real-time streaming display
              if (chunkText) {
                yield {
                  files: workingFiles,
                  sources: accumulatedSources,
                  isThinking: false,
                  streamingText: accumulatedText,
                  chunkText: chunkText
                };
              }
            } catch (e) {
              continue;
            }
          }
        }

        // Parse files from accumulated text
        const fileRegex = /<file\s+path=["']([^"']+)["']>([\s\S]*?)(?:<\/file>|$)/g;
        let match;
        
        fileRegex.lastIndex = 0;
        
        while ((match = fileRegex.exec(accumulatedText)) !== null) {
          const [fullMatch, rawPath, content] = match;
          
          const path = rawPath.trim().replace(/^\.?\//, '');
          
          let cleanContent = content;

          if (/^\s*```/.test(cleanContent)) {
            cleanContent = cleanContent.replace(/^\s*```[a-z]*\s*\n?/i, '');
          }

          cleanContent = cleanContent.replace(/```\s*$/, '');
          
          const pathParts = path.split('/');
          const fileName = pathParts.pop() || 'unknown';
          
          let currentPath = '';
          pathParts.forEach(part => {
            currentPath = currentPath ? `${currentPath}/${part}` : part;
            if (!workingFiles[currentPath]) {
              workingFiles[currentPath] = {
                name: part,
                path: currentPath,
                type: 'folder',
                content: ''
              };
            }
          });

          workingFiles[path] = {
            name: fileName,
            path: path,
            type: 'file',
            content: cleanContent
          };
        }

        yield {
          files: workingFiles,
          sources: accumulatedSources,
          isThinking: false
        };
      }

    } catch (error) {
      console.error("Generation error:", error);
      throw new Error("Failed to generate project. Please try again.");
    }
  }

  return {
    generateProjectStream
  }
}
