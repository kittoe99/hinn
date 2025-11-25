import React, { useState } from 'react';
import { Icons } from './Icons';
import { FileMap, ProjectFile } from '../types';

interface FileExplorerProps {
  files: FileMap;
  activeFile: string | null;
  onFileSelect: (path: string) => void;
}

const FileIcon = ({ name }: { name: string }) => {
  if (name.endsWith('.html')) return <Icons.FileCode size={14} className="text-orange-400" />;
  if (name.endsWith('.css')) return <Icons.FileCode size={14} className="text-blue-400" />;
  if (name.endsWith('.js')) return <Icons.FileCode size={14} className="text-yellow-400" />;
  if (name.endsWith('.json')) return <Icons.FileJson size={14} className="text-green-400" />;
  if (name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) return <Icons.FileImage size={14} className="text-purple-400" />;
  return <Icons.FileText size={14} className="text-zinc-400" />;
};

interface FileNodeProps {
  name: string;
  path: string;
  type: 'file' | 'folder';
  level: number;
  files: FileMap;
  activeFile: string | null;
  onFileSelect: (path: string) => void;
}

const FileNode: React.FC<FileNodeProps> = ({ name, path, type, level, files, activeFile, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Find children
  const children = (Object.values(files) as ProjectFile[]).filter(f => {
    const parentPath = f.path.substring(0, f.path.lastIndexOf('/'));
    return parentPath === path && f.path !== path;
  });

  const handleClick = () => {
    if (type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(path);
    }
  };

  const isActive = activeFile === path;

  return (
    <div>
      <div 
        onClick={handleClick}
        className={`flex items-center gap-1.5 py-1 px-2 cursor-pointer transition-colors text-sm select-none
          ${isActive ? 'bg-blue-600/20 text-blue-200' : 'hover:bg-zinc-800 text-zinc-300'}
        `}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        <span className="opacity-70">
          {type === 'folder' ? (
             isOpen ? <Icons.ChevronDown size={12} /> : <Icons.ChevronRight size={12} />
          ) : <span className="w-3" />}
        </span>
        
        {type === 'folder' ? (
          <Icons.Folder size={14} className="text-blue-300" />
        ) : (
          <FileIcon name={name} />
        )}
        
        <span className="truncate">{name}</span>
      </div>

      {type === 'folder' && isOpen && (
        <div>
          {children.map(child => (
            <FileNode
              key={child.path}
              name={child.name}
              path={child.path}
              type={child.type}
              level={level + 1}
              files={files}
              activeFile={activeFile}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({ files, activeFile, onFileSelect }) => {
  // Get root items (no slashes in path or just top level folders)
  // Actually, we need to reconstruct the tree properly or filter root items.
  // Root items are those where path matches name (no '/')
  const rootItems = (Object.values(files) as ProjectFile[]).filter(f => !f.path.includes('/'));

  if (rootItems.length === 0 && Object.keys(files).length > 0) {
      // Fallback for flat structure or if root is implicit
      // Just list everything if something went wrong with hierarchy
      return (
          <div className="p-2 text-xs text-zinc-500">
              {(Object.values(files) as ProjectFile[]).map(f => (
                  <div key={f.path} onClick={() => onFileSelect(f.path)} className="cursor-pointer hover:bg-zinc-800 p-1">
                      {f.path}
                  </div>
              ))}
          </div>
      );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 py-3 text-xs font-semibold text-zinc-500 tracking-wider uppercase flex items-center gap-2">
        <Icons.Package size={12} />
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto">
        {rootItems.map(item => (
          <FileNode
            key={item.path}
            name={item.name}
            path={item.path}
            type={item.type}
            level={0}
            files={files}
            activeFile={activeFile}
            onFileSelect={onFileSelect}
          />
        ))}
        {rootItems.length === 0 && (
            <div className="p-4 text-zinc-600 text-xs text-center italic">
                No files generated yet.
            </div>
        )}
      </div>
    </div>
  );
};