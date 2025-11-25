import React, { useState, useEffect, useRef } from 'react';
import { GenerationStatus, ViewMode } from './types.js';
import type { GeneratedSite, SearchSource, FileMap } from './types.js';
import { generateProjectStream } from './services/geminiService.js';
import { saveSite, getAllSites, deleteSite } from './services/storageService.js';
import { bundleProjectForPreview, createZipFromProject, parseZipToProject, findEntryPoint, resolvePath } from './services/projectService.js';
import { Button } from './components/Button.js';
import { PreviewFrame } from './components/PreviewFrame.js';
import { CodeEditor } from './components/CodeEditor.js';
import { Icons } from './components/Icons.js';
import { FileExplorer } from './components/FileExplorer.js';

const INITIAL_PROMPT = "A modern landing page for an AI startup called 'Nebula'. Dark theme, glowing gradients, hero section, features grid, and a newsletter signup.";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState(INITIAL_PROMPT);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  
  // Workspace State
  const [files, setFiles] = useState<FileMap>({});
  const [activeFile, setActiveFile] = useState<string | null>(null);
  
  // Preview State
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const [sources, setSources] = useState<SearchSource[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PREVIEW);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Image Attachment
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  
  // Element Selection
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<{tagName: string, html: string, text: string} | null>(null);

  // Search
  const [useSearch, setUseSearch] = useState(false);

  // Sidebar
  const [activeTab, setActiveTab] = useState<'create' | 'explorer' | 'history'>('create');
  const [history, setHistory] = useState<GeneratedSite[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Chat History
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string, timestamp: number}>>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Sync activeFile with previewFile if activeFile is HTML
  // This ensures that when the user edits HTML code, the preview updates to match THAT file.
  useEffect(() => {
    if (activeFile && activeFile.endsWith('.html')) {
      setPreviewFile(activeFile);
    } else if (!previewFile && Object.keys(files).length > 0) {
      // Initialize preview file if none selected
      const entry = findEntryPoint(files);
      if (entry) setPreviewFile(entry);
    }
  }, [activeFile, files]);

  // Update preview bundle when files change or previewFile changes
  // BUT only if we're not currently streaming (to avoid partial updates)
  useEffect(() => {
    if (Object.keys(files).length > 0 && status !== GenerationStatus.STREAMING) {
      const target = previewFile || findEntryPoint(files);
      
      if (target && files[target]) {
        // Cleanup previous blobs
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        
        const { html, urls } = bundleProjectForPreview(files, target);
        setPreviewHtml(html);
        setPreviewUrls(urls);
      }
    } else if (Object.keys(files).length === 0) {
      setPreviewHtml('');
    }
  }, [files, previewFile, status]);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    refreshHistory();
    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return;

      if (event.data.type === 'NEBULA_ELEMENT_SELECTED') {
        const { tagName, html, text } = event.data.payload;
        setSelectedElement({ tagName, html, text });
        setIsSelectionMode(false);
        if (window.innerWidth < 768) setIsMobileMenuOpen(true);
      }
      
      if (event.data.type === 'NEBULA_NAVIGATE') {
        const { path } = event.data.payload;
        // Resolve path relative to current preview file
        if (previewFile) {
          const resolved = resolvePath(previewFile, path);
          // Try exact match, or fallback to file name matching logic that matches bundle logic?
          // For app navigation, we want the file Key in the map.
          
          if (files[resolved]) {
            setPreviewFile(resolved);
            setActiveFile(resolved);
          } else {
            // Fuzzy lookup for navigation
            const targetName = path.split('/').pop();
            const foundKey = Object.keys(files).find(k => k.endsWith(targetName));
            if (foundKey) {
               setPreviewFile(foundKey);
               setActiveFile(foundKey);
            }
          }
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      // Cleanup final blobs on unmount
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewFile, files, previewUrls]);

  const refreshHistory = async () => {
    try {
      const sites = await getAllSites();
      setHistory(sites);
    } catch (e) {
      console.error("Failed to load history", e);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !attachedImage) return;

    // Add user message to chat history
    const userMessage = prompt || (attachedImage ? '[Image attached]' : '');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage, timestamp: Date.now() }]);

    setIsMobileMenuOpen(false);
    setStatus(GenerationStatus.THINKING);
    setErrorMsg(null);
    setSources([]);
    
    // Switch to Code View to show progress
    setViewMode(ViewMode.CODE); 

    try {
      const stream = generateProjectStream(
        prompt, 
        files,
        attachedImage || undefined,
        selectedElement?.html || undefined,
        useSearch
      );
      
      let finalFiles: FileMap = {};
      let finalSources: SearchSource[] = [];

      for await (const chunk of stream) {
        setStatus(GenerationStatus.STREAMING);
        
        finalFiles = chunk.files;
        finalSources = chunk.sources;
        
        setFiles(finalFiles);
        setSources(finalSources);
        
        // Auto-select index.html if we just started
        if (!activeFile && finalFiles['index.html']) {
          setActiveFile('index.html');
          setPreviewFile('index.html');
        }
      }
      
      setStatus(GenerationStatus.COMPLETE);
      
      // Add assistant response to chat history with specific details
      const isUpdate = Object.keys(files).length > 0;
      const fileNames = Object.keys(finalFiles).filter(f => finalFiles[f].type === 'file');
      const fileCount = fileNames.length;
      
      let assistantMessage = '';
      if (isUpdate) {
        // This is an update to existing project
        assistantMessage = `Updated your website! Modified ${fileCount} file${fileCount !== 1 ? 's' : ''}: ${fileNames.slice(0, 3).join(', ')}${fileCount > 3 ? ` and ${fileCount - 3} more` : ''}.`;
      } else {
        // This is a new project
        assistantMessage = `Created your website with ${fileCount} file${fileCount !== 1 ? 's' : ''}: ${fileNames.slice(0, 3).join(', ')}${fileCount > 3 ? ` and ${fileCount - 3} more` : ''}. Your site is ready!`;
      }
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: assistantMessage, timestamp: Date.now() }]);
      
      // AUTO PREVIEW: Switch to Preview Mode upon completion
      setViewMode(ViewMode.PREVIEW);
      
      const newSite: Omit<GeneratedSite, 'id'> = {
        files: finalFiles,
        prompt: prompt || (attachedImage ? 'Generated from image' : 'Untitled'),
        timestamp: Date.now(),
        sources: finalSources
      };
      await saveSite(newSite);
      await refreshHistory();
      
      if (Object.keys(finalFiles).length > 0 || attachedImage) {
        setPrompt(''); 
        setAttachedImage(null);
        setSelectedElement(null);
      }

    } catch (error) {
      setStatus(GenerationStatus.ERROR);
      const errMsg = error instanceof Error ? error.message : "An unexpected error occurred.";
      setErrorMsg(errMsg);
      
      // Add error to chat history
      setChatHistory(prev => [...prev, { role: 'assistant', content: `Error: ${errMsg}`, timestamp: Date.now() }]);
    }
  };

  const handleNewProject = () => {
    setFiles({});
    setActiveFile(null);
    setPreviewFile(null);
    setSources([]);
    setPrompt('');
    setAttachedImage(null);
    setSelectedElement(null);
    setStatus(GenerationStatus.IDLE);
    setErrorMsg(null);
    setViewMode(ViewMode.PREVIEW);
    setActiveTab('create');
    setChatHistory([]); // Clear chat history
    if (window.innerWidth < 768) setIsMobileMenuOpen(false);
  };

  // --- File Handling ---

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleAttachImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setStatus(GenerationStatus.THINKING);
      const importedFiles = await parseZipToProject(file);
      setFiles(importedFiles);
      
      const entry = findEntryPoint(importedFiles);
      if (entry) {
        setActiveFile(entry);
        setPreviewFile(entry);
      }
      
      setSources([]);
      setPrompt('');
      setStatus(GenerationStatus.COMPLETE);
      setViewMode(ViewMode.PREVIEW);
      setActiveTab('explorer');
      setIsMobileMenuOpen(false);
    } catch (e) {
      setErrorMsg("Failed to load project: " + (e as Error).message);
      setStatus(GenerationStatus.ERROR);
    }
    
    event.target.value = '';
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') setAttachedImage(content);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  // --- History / Site Management ---

  const handleLoadSite = (site: GeneratedSite) => {
    setFiles(site.files);
    setSources(site.sources || []);
    setPrompt(''); 
    setAttachedImage(null);
    setSelectedElement(null);
    setStatus(GenerationStatus.COMPLETE);
    setViewMode(ViewMode.PREVIEW);
    
    const entry = findEntryPoint(site.files);
    if (entry) {
      setActiveFile(entry);
      setPreviewFile(entry);
    }
    
    setActiveTab('explorer');
    setIsMobileMenuOpen(false);
  };

  const handleDeleteSite = async (e: React.MouseEvent, id?: number) => {
    e.stopPropagation();
    if (!id) return;
    if (window.confirm("Delete this saved project?")) {
      await deleteSite(id);
      await refreshHistory();
    }
  };

  const handleDownload = async () => {
    if (Object.keys(files).length === 0) return;
    const zipBlob = await createZipFromProject(files);
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nebula-project.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (ts: number) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    }).format(new Date(ts));
  };

  const isEditing = Object.keys(files).length > 0;
  const isBusy = status === GenerationStatus.THINKING || status === GenerationStatus.STREAMING;

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden selection:bg-blue-500/30 relative">
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept=".zip"
      />
      <input 
        type="file" 
        ref={imageInputRef} 
        onChange={handleImageUpload} 
        className="hidden" 
        accept="image/png, image/jpeg, image/webp"
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-80 sm:w-96 flex flex-col border-r border-zinc-800 
          bg-zinc-900 shadow-2xl transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:bg-zinc-900/50 md:backdrop-blur-sm md:shadow-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Icons.Sparkles size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Chat</h1>
          </div>
          <button 
            className="md:hidden text-zinc-400 hover:text-white p-1"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Icons.X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {/* CHAT INTERFACE - Always visible */}
          {
            <div className="flex flex-col h-full">
              {/* Chat History - Increased height */}
              {chatHistory.length > 0 && (
                <div ref={chatContainerRef} className="flex-1 min-h-0 overflow-y-auto space-y-3 mb-3 pr-2 custom-scrollbar">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-lg px-3 py-2 ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                      }`}>
                        <p className="text-xs leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                        <span className="text-[9px] opacity-50 mt-0.5 block">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Input Area - Compact design */}
              <div className="space-y-2 flex-shrink-0">
                {chatHistory.length > 0 && (
                  <button
                    onClick={() => setChatHistory([])}
                    className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                  >
                    <Icons.X size={12} /> Clear conversation
                  </button>
                )}
                {selectedElement && (
                  <div className="flex items-center gap-1 text-[10px] text-blue-400 bg-blue-900/20 px-2 py-1 rounded-md border border-blue-900/50">
                    <Icons.Target size={10} />
                    <span>Target: &lt;{selectedElement.tagName}&gt;</span>
                    <button onClick={() => setSelectedElement(null)} className="hover:text-white ml-1"><Icons.X size={10} /></button>
                  </div>
                )}
                
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={isEditing 
                      ? "Ask a follow-up..." 
                      : "Describe your website..."
                    }
                    disabled={isBusy}
                    className={`w-full h-24 bg-zinc-900 border rounded-lg p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:ring-1 focus:border-transparent resize-none transition-all ${selectedElement ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-zinc-700 focus:ring-blue-500'} ${isBusy ? 'opacity-50' : ''}`}
                    rows={3}
                  />
                  <div className="absolute bottom-2 left-2 flex gap-1.5">
                     <button 
                        onClick={handleAttachImageClick}
                        disabled={isBusy}
                        className="flex items-center gap-1 text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white px-2 py-1 rounded-md border border-zinc-700 transition-colors disabled:opacity-50"
                        title="Attach image"
                      >
                        <Icons.Image size={11} />
                      </button>
                     <label className="flex items-center gap-1 text-[10px] text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors select-none bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md border border-zinc-700" title="Web search">
                       <Icons.Globe size={11} />
                       <input type="checkbox" className="hidden" checked={useSearch} onChange={(e) => setUseSearch(e.target.checked)} disabled={isBusy} />
                     </label>
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={isBusy || (!prompt.trim() && !attachedImage)}
                    className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBusy ? (
                      <Icons.RefreshCw size={12} className="animate-spin" />
                    ) : (
                      <Icons.Send size={12} />
                    )}
                  </button>
                </div>

                {attachedImage && (
                  <div className="relative w-full p-1.5 bg-zinc-900/50 border border-zinc-800 rounded-md flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-700">
                      <img src={attachedImage} alt="Reference" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-zinc-400 truncate">Image attached</p>
                    </div>
                    <button onClick={() => setAttachedImage(null)} className="p-0.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-red-400">
                      <Icons.X size={12} />
                    </button>
                  </div>
                )}
              </div>

              {status === GenerationStatus.ERROR && (
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-800 text-red-200 text-sm">
                  {errorMsg}
                </div>
              )}

              {sources.length > 0 && (
                <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 text-sm space-y-2">
                  <p className="font-medium text-zinc-300 flex items-center gap-2">
                    <Icons.Globe size={14} className="text-blue-400" /> Sources:
                  </p>
                  <ul className="space-y-1.5 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                    {sources.map((source, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs">
                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate">
                          {source.title || source.uri}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          }
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950 relative">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 bg-zinc-900/30 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800">
              <Icons.Menu size={20} />
            </button>
            
            {/* View Mode Toggle */}
            <div className="flex bg-zinc-800 p-1 rounded-lg">
              <button
                onClick={() => { setViewMode(ViewMode.PREVIEW); setIsSelectionMode(false); }}
                className={`flex items-center px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${viewMode === ViewMode.PREVIEW ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                <Icons.Eye size={14} className="mr-2" /> Preview
              </button>
              <button
                onClick={() => { setViewMode(ViewMode.CODE); setIsSelectionMode(false); }}
                className={`flex items-center px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${viewMode === ViewMode.CODE ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                <Icons.Code size={14} className="mr-2" /> Code
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="hidden md:flex bg-zinc-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('explorer')}
                className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'explorer' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                <Icons.FileText size={14} className="mr-1.5" /> Files
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'history' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                <Icons.Clock size={14} className="mr-1.5" /> History
              </button>
            </div>
            {/* Active File Label */}
            {viewMode === ViewMode.CODE && activeFile && (
               <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800">
                 <Icons.FileText size={12} />
                 {activeFile}
               </div>
            )}
            {/* Status Indicators */}
            {status === GenerationStatus.THINKING && (
              <div className="hidden sm:flex items-center gap-2 text-yellow-500 text-xs animate-pulse">
                <Icons.Zap size={14} /> Thinking...
              </div>
            )}
            {status === GenerationStatus.STREAMING && (
              <div className="hidden sm:flex items-center gap-2 text-green-400 text-xs">
                <Icons.RefreshCw size={14} className="animate-spin" /> Coding...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
             {/* Project Actions */}
             <button 
               onClick={handleNewProject}
               disabled={isBusy}
               className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white hover:border-zinc-600 disabled:opacity-50"
             >
               <Icons.FilePlus size={14} /> New
             </button>
             <button 
               onClick={handleImportClick}
               disabled={isBusy}
               className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white hover:border-zinc-600 disabled:opacity-50"
             >
               <Icons.Upload size={14} /> Import
             </button>
             
             {viewMode === ViewMode.PREVIEW && !isBusy && previewHtml && (
               <button
                 onClick={() => setIsSelectionMode(!isSelectionMode)}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all border ${isSelectionMode ? 'bg-blue-600 text-white border-blue-500' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'}`}
               >
                 <Icons.MousePointer2 size={14} /> <span className="hidden sm:inline">Select</span>
               </button>
             )}
             {Object.keys(files).length > 0 && (
               <Button variant="secondary" onClick={handleDownload} disabled={isBusy} icon={<Icons.Download size={16} />} className="text-xs md:text-sm py-1.5 px-3">
                 <span className="hidden sm:inline">Export Zip</span>
               </Button>
             )}
          </div>
        </header>

        {/* Files/History Modal Overlay */}
        {(activeTab === 'explorer' || activeTab === 'history') && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setActiveTab('create')}
          />
        )}

        {/* Files Modal */}
        {activeTab === 'explorer' && (
          <div className="fixed top-20 right-6 bottom-6 w-96 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 flex flex-col">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Icons.FileText size={16} /> Files
              </h2>
              <button onClick={() => setActiveTab('create')} className="text-zinc-400 hover:text-white">
                <Icons.X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FileExplorer 
                files={files} 
                activeFile={activeFile} 
                onFileSelect={(path) => {
                  setActiveFile(path);
                  if (path.endsWith('.html')) setPreviewFile(path);
                  setActiveTab('create');
                }} 
              />
            </div>
          </div>
        )}

        {/* History Modal */}
        {activeTab === 'history' && (
          <div className="fixed top-20 right-6 bottom-6 w-96 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 flex flex-col">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Icons.Clock size={16} /> History
              </h2>
              <button onClick={() => setActiveTab('create')} className="text-zinc-400 hover:text-white">
                <Icons.X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {history.map((site) => (
                <div 
                  key={site.id}
                  onClick={() => { handleLoadSite(site); setActiveTab('create'); }}
                  className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-800 rounded-lg p-3 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
                       <Icons.Clock size={10} />
                       {formatDate(site.timestamp)}
                     </span>
                     <button
                      onClick={(e) => handleDeleteSite(e, site.id)}
                      className="text-zinc-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <Icons.Trash2 size={14} />
                     </button>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-1">
                    {site.prompt}
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    {Object.keys(site.files).length} file(s)
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 relative overflow-hidden">
          {isSelectionMode && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 bg-blue-600 text-white text-xs px-4 py-2 rounded-full shadow-lg font-medium animate-bounce">
              Click element to edit
            </div>
          )}

          <div className={`h-full w-full p-2 md:p-6 transition-all duration-300`}>
            {viewMode === ViewMode.PREVIEW ? (
               <div className={`h-full w-full rounded-lg md:rounded-xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900 ${isSelectionMode ? 'ring-2 ring-blue-500' : ''}`}>
                 <PreviewFrame htmlContent={previewHtml} isSelectionMode={isSelectionMode} />
               </div>
            ) : (
              <div className="h-full w-full rounded-lg md:rounded-xl overflow-hidden shadow-2xl border border-zinc-800 bg-[#1e1e1e] flex flex-col">
                {activeFile ? (
                  <CodeEditor code={files[activeFile]?.content || ''} />
                ) : (
                   <div className="flex items-center justify-center h-full text-zinc-500">
                     Select a file to view code
                   </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;