export enum GenerationStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  STREAMING = 'STREAMING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export enum ViewMode {
  PREVIEW = 'PREVIEW',
  CODE = 'CODE'
}

export interface SearchSource {
  uri: string;
  title: string;
}

export interface ProjectFile {
  name: string;
  path: string; // full path e.g. "css/style.css"
  content: string;
  type: 'file' | 'folder';
}

export type FileMap = Record<string, ProjectFile>;

export interface GeneratedSite {
  id?: number;
  files: FileMap;
  timestamp: number;
  prompt: string;
  sources?: SearchSource[];
}
