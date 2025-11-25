import JSZip from 'jszip';
import type { FileMap, ProjectFile } from '../types.js';

/**
 * Parses a FileMap to find the entry point (index.html)
 */
export const findEntryPoint = (files: FileMap): string | null => {
  const paths = Object.keys(files);
  // Priority 1: Exact match index.html
  if (files['index.html']) return 'index.html';
  
  // Priority 2: Any .html file
  const htmlFile = paths.find(p => p.endsWith('.html'));
  return htmlFile || null;
};

/**
 * Resolves a relative path to an absolute path within the project structure
 * Handles ./, ../ and absolute paths.
 */
export const resolvePath = (currentFilePath: string, relativePath: string): string => {
  // Normalize current file path (remove leading /)
  const currentDir = currentFilePath.split('/').slice(0, -1).join('/');
  
  // Normalize relative path
  let target = relativePath.trim();
  if (target.startsWith('/')) target = target.slice(1);
  if (target.startsWith('./')) target = target.slice(2);

  // Simple cases
  if (!target.includes('/') && !target.includes('..')) {
    // It's a file in the current directory
    return currentDir ? `${currentDir}/${target}` : target;
  }

  // Complex relative path handling
  const currentParts = currentDir ? currentDir.split('/') : [];
  const targetParts = target.split('/');
  
  const resultParts = [...currentParts];
  
  for (const part of targetParts) {
    if (part === '.') continue;
    if (part === '..') {
      if (resultParts.length > 0) resultParts.pop();
    } else {
      resultParts.push(part);
    }
  }
  
  return resultParts.join('/');
};

function getMimeType(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'html': return 'text/html';
    case 'css': return 'text/css';
    case 'js': return 'application/javascript';
    case 'json': return 'application/json';
    case 'svg': return 'image/svg+xml';
    case 'png': return 'image/png';
    case 'jpg': case 'jpeg': return 'image/jpeg';
    case 'gif': return 'image/gif';
    case 'webp': return 'image/webp';
    default: return 'text/plain';
  }
}

/**
 * Creates a "Bundled" version of the project for previewing.
 * Uses DOMParser and Fuzzy Path Matching to ensure assets load even if paths are slightly off.
 */
export const bundleProjectForPreview = (files: FileMap, entryPointPath?: string): { html: string, urls: string[] } => {
  const entryPoint = entryPointPath || findEntryPoint(files);
  if (!entryPoint || !files[entryPoint]) return { html: '', urls: [] };

  const createdUrls: string[] = [];
  const pathBlobMap: Record<string, string> = {};
  const fileNameBlobMap: Record<string, string> = {}; // For fuzzy matching

  const createBlobUrl = (content: BlobPart, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    createdUrls.push(url);
    return url;
  };

  // 1. Create Blobs for all non-HTML files first (CSS, JS, Images)
  Object.values(files).forEach(file => {
    if (file.type !== 'file') return;
    if (file.path === entryPoint) return; // Skip entry point

    // Basic MIME type detection
    const mime = getMimeType(file.path);
    const url = createBlobUrl(file.content, mime);
    
    pathBlobMap[file.path] = url;
    
    // Populate fuzzy map (filename -> url)
    const fileName = file.path.split('/').pop();
    if (fileName) {
      fileNameBlobMap[fileName] = url;
    }
  });

  // 2. Process CSS files to replace url(...) with blob links
  // We re-create the CSS blobs with updated content
  Object.values(files).forEach(file => {
    if (file.type === 'file' && file.path.endsWith('.css') && file.path !== entryPoint) {
      let cssContent = file.content;
      
      // Replace url('...') patterns
      cssContent = cssContent.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, url) => {
        if (url.startsWith('data:') || url.startsWith('http')) return match;
        
        // Strategy 1: Exact/Relative Resolution
        const resolvedPath = resolvePath(file.path, url);
        if (pathBlobMap[resolvedPath]) return `url('${pathBlobMap[resolvedPath]}')`;
        
        // Strategy 2: Fuzzy Filename Match
        const fileName = url.split('/').pop();
        if (fileName && fileNameBlobMap[fileName]) return `url('${fileNameBlobMap[fileName]}')`;

        return match;
      });

      // Overwrite the blob in the maps with the processed CSS
      // Note: The old blob URL is still in createdUrls list and will be revoked later, which is fine.
      const newUrl = createBlobUrl(cssContent, 'text/css');
      pathBlobMap[file.path] = newUrl;
      const fileName = file.path.split('/').pop();
      if (fileName) fileNameBlobMap[fileName] = newUrl;
    }
  });

  // 3. Process the Entry Point HTML
  const originalHtml = files[entryPoint].content;
  
  // ALWAYS use string replacement fallback for now since DOMParser strips content
  // This is a known issue with DOMParser and complex HTML
  console.log('Bundling HTML for preview. Original length:', originalHtml.length);
  let htmlContent = originalHtml;
  Object.entries(pathBlobMap).forEach(([path, blobUrl]) => {
    const fileName = path.split('/').pop();
    if (fileName) {
      // Replace references to this file with blob URL
      // Match both the full path and just the filename
      const pathPattern = new RegExp(`(["'\`])([./]*)?${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
      const filePattern = new RegExp(`(["'\`])([./]*)?${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
      
      htmlContent = htmlContent.replace(pathPattern, `$1${blobUrl}$1`);
      htmlContent = htmlContent.replace(filePattern, `$1${blobUrl}$1`);
    }
  });
  console.log('Bundled HTML length:', htmlContent.length);
  return { html: htmlContent, urls: createdUrls };
};

/**
 * Creates a Zip file from the current project
 */
export const createZipFromProject = async (files: FileMap): Promise<Blob> => {
  const zip = new JSZip();

  Object.values(files).forEach(file => {
    if (file.type === 'file') {
      zip.file(file.path, file.content);
    } else {
      zip.folder(file.path);
    }
  });

  return await zip.generateAsync({ type: 'blob' });
};

/**
 * Parses an uploaded Zip file into a FileMap
 */
export const parseZipToProject = async (file: File): Promise<FileMap> => {
  const zip = await JSZip.loadAsync(file);
  const fileMap: FileMap = {};

  const entries = Object.keys(zip.files);
  
  for (const path of entries) {
    const zipEntry = zip.files[path];
    if (zipEntry.dir) {
      const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
      const parts = cleanPath.split('/');
      fileMap[cleanPath] = {
        name: parts[parts.length - 1],
        path: cleanPath,
        type: 'folder',
        content: ''
      };
    } else {
      if (path.includes('__MACOSX') || path.includes('.DS_Store')) continue;
      
      const content = await zipEntry.async('string');
      const parts = path.split('/');
      fileMap[path] = {
        name: parts[parts.length - 1],
        path: path,
        type: 'file',
        content: content
      };
    }
  }

  if (Object.keys(fileMap).length === 0) {
    throw new Error("Zip file is empty");
  }

  return fileMap;
};