# Builder Integration Guide

## Overview
The Nebula WebGen AI Website Builder has been successfully integrated into the WPS Canvas Nuxt project.

## Architecture

### Structure
```
pages/
  builder.vue                          # Nuxt page wrapper (iframe container)

public/
  builder-app/                         # React builder application
    index.html                         # Entry point
    index.tsx                          # React root
    index.css                          # Styles
    App.tsx                            # Main React component
    types.ts                           # TypeScript types
    components/                        # React components
      Button.tsx
      CodeEditor.tsx
      FileExplorer.tsx
      Icons.tsx
      PreviewFrame.tsx
    services/                          # Service layer
      geminiService.ts                 # Modified to use API endpoint
      projectService.ts
      storageService.ts

server/
  api/
    builder/
      generate.post.ts                 # Server-side Gemini API proxy
```

## Key Changes

### 1. Security Enhancement
- **Original**: React app called Gemini API directly with exposed API key
- **Updated**: Server-side API endpoint (`/api/builder/generate`) proxies all Gemini requests
- API key stays secure on the server

### 2. Integration Method
- Builder runs as a standalone React app in `/public/builder-app/`
- Accessed via `/builder` route which loads an iframe
- No layout interference - full-screen builder experience

### 3. Dependencies Installed
```bash
npm install react react-dom @google/genai lucide-react jszip
```

### 4. Configuration Updates

**nuxt.config.ts**:
```typescript
runtimeConfig: {
  geminiApiKey: process.env.GEMINI_API_KEY || process.env.NUXT_GEMINI_API_KEY || '',
  // ... other keys
}
```

**Environment Variables Required**:
```env
GEMINI_API_KEY=your_gemini_api_key_here
# or
NUXT_GEMINI_API_KEY=your_gemini_api_key_here
```

## How It Works

1. User navigates to `/builder`
2. Nuxt serves `builder.vue` which contains an iframe
3. Iframe loads `/builder-app/index.html` (static React app)
4. React app uses CDN imports for React, Lucide icons, and JSZip
5. When generating websites, React app calls `/api/builder/generate`
6. Server endpoint uses Gemini API with secure API key
7. Response streams back to React app via Server-Sent Events (SSE)

## Features

- **AI Website Generation**: Create multi-file websites from text prompts
- **Image-to-Code**: Upload designs and convert to HTML/CSS/JS
- **Live Preview**: Real-time preview with hot reload
- **Code Editor**: Edit generated files directly
- **File Explorer**: Navigate project structure
- **Export**: Download projects as ZIP files
- **History**: Save and load previous generations
- **Element Selection**: Click elements in preview to modify them

## API Endpoint

**POST** `/api/builder/generate`

**Request Body**:
```json
{
  "prompt": "Create a landing page...",
  "currentFiles": {},
  "imageBase64": "data:image/png;base64,...",
  "focusedElementHtml": "<div>...</div>",
  "useSearch": false
}
```

**Response**: Server-Sent Events (SSE) stream
```
data: {"text": "chunk of generated code", "sources": []}
data: {"text": "more code...", "sources": []}
data: [DONE]
```

## Development Setup

### Running in Development

You need to run **TWO** dev servers:

**Terminal 1 - Nuxt Server:**
```bash
npm run dev
```
This runs on `http://localhost:3000`

**Terminal 2 - Builder Vite Server:**
```bash
npm run dev:builder
```
This runs on `http://localhost:3001`

### Testing

1. Make sure both servers are running
2. Navigate to: `http://localhost:3000/builder`
3. The page will load the builder from `http://localhost:3001` in an iframe
4. Enter a prompt and click "Generate"
5. Watch the AI build your website in real-time

## Notes

- The builder uses localStorage for saving project history
- All AI generation happens server-side for security
- React app is completely self-contained in `/public/builder-app/`
- No Vue/Nuxt dependencies in the React app
- Tailwind CSS loaded via CDN for the builder

## Future Enhancements

- [ ] Convert to Vue/Nuxt components (optional)
- [ ] Add authentication/user projects
- [ ] Integrate with dashboard
- [ ] Deploy generated sites directly
- [ ] Add more AI models (Claude, GPT-4, etc.)
