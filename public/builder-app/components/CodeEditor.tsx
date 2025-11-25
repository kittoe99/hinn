import React from 'react';

interface CodeEditorProps {
  code: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code }) => {
  return (
    <div className="h-full w-full bg-[#1e1e1e] text-sm overflow-auto font-mono relative group">
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => navigator.clipboard.writeText(code)}
          className="bg-zinc-700 hover:bg-zinc-600 text-white text-xs px-3 py-1 rounded shadow-lg"
        >
          Copy
        </button>
      </div>
      <pre className="p-6 text-zinc-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};
