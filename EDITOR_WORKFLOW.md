# Canvas Image Editor Workflow

## Overview
The editor has been redesigned to work with a single image that gets edited iteratively, rather than generating multiple variations. Users can keep editing until satisfied, then save to the database.

## New Workflow

### 1. **Select Image for Editing**
- User generates initial images
- Selects one or more images
- Clicks "Continue" to enter editor mode
- First selected image becomes the editing target

### 2. **Iterative Editing**
- User enters modification prompt in floating chatbot
- Clicks "Apply Edit" (or presses Enter)
- AI generates **1 edited image** based on current image + prompt
- Edited image replaces the current view
- Process repeats for continuous refinement

### 3. **Edit History & Undo/Redo**
- **Edit History**: Tracks all edits with prompts
- **Undo Button**: Go back to previous edit
- **Redo Button**: Move forward in history
- **Timeline**: Click any edit in history to jump to it
- **Counter**: Shows current position (e.g., "3 / 5")

### 4. **Save to Database**
- **Save Image Button**: Saves current edited image
- Stores in Supabase Storage + Database
- Tracks all modification prompts as chain (e.g., "vibrant → sunset tones → high contrast")
- Marks as variation if edited

## UI Components

### **Large Preview Section**
- Main image display
- Undo/Redo controls (top-left)
- Edit counter
- Download button (top-right)
- **Save Image button** (top-right, accent color)
- Edit history timeline (below image)

### **Floating Chatbot** (Bottom Center)
- Compact input field
- "Apply Edit" button
- Quick suggestion chips
- Always accessible while editing

### **Edit History Timeline**
- Shows all edits chronologically
- Click to jump to any edit
- Highlights current edit
- Shows prompt for each edit

## Key Features

✅ **Single Image Editing** - No more 6 variations
✅ **Iterative Refinement** - Keep editing until perfect
✅ **Full Edit History** - Never lose previous versions
✅ **Undo/Redo** - Navigate edit history easily
✅ **Save When Ready** - Only save final result
✅ **Modification Tracking** - Database stores edit chain

## Technical Changes

### **State Management**
```javascript
const editHistory = ref<Array<{ src: string; prompt: string }>>([])
const currentEditIndex = ref(-1)
```

### **Functions**
- `applyEdit()` - Apply single edit to current image
- `undoEdit()` - Go back one edit
- `redoEdit()` - Go forward one edit
- `saveCurrentImage()` - Save current image to database

### **API Call**
```javascript
{
  prompt: refinementPrompt.value,
  numberOfImages: 1, // Changed from 6
  sourceImage: selectedRefinementImage.value.src
}
```

## Database Storage

When saving, the system stores:
- Current image (final edited version)
- Original prompt
- Modification chain (all edit prompts joined with →)
- `is_variation` flag (true if edited)

Example modification_prompt:
```
"Make it more vibrant → Add warm sunset tones → Increase contrast"
```

## User Benefits

1. **Focused Editing** - Work on one image at a time
2. **Iterative Process** - Refine gradually without losing progress
3. **Full Control** - Undo mistakes, try different paths
4. **Efficient** - No need to generate 6 images each time
5. **Save When Perfect** - Only commit final result
