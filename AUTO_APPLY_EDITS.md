# Auto-Apply Edits System

## Overview
The AI now automatically applies edits to your code so you can immediately deploy changes to storage.

---

## How It Works

### 1. **AI Returns Complete Updated File**

When you ask for changes, the AI:
- Reads your existing HTML file
- Makes the requested changes
- Returns the COMPLETE updated file with changes applied
- Wraps it in a code block

### 2. **Frontend Auto-Extracts & Applies**

The system:
- Detects HTML code blocks in AI response
- Extracts the complete HTML
- Auto-applies to the editor
- Updates file indicator
- Ready to deploy immediately

### 3. **Deploy to Storage**

You:
- Review the updated code in editor
- Click "Create generated version"
- New version saved to storage bucket
- Live preview URL generated

---

## Example Workflow

### Adding External Images

**Step 1: Load File**
- Select website: "Coffee Shop"
- Browse bucket → Load `index.html`
- See: ✅ AI can read your file (12,543 characters)

**Step 2: Ask AI**
```
User: "Add external images to the hero section"
```

**Step 3: AI Responds**
```
I'll help you add external images to your hero section. 
I've added an image tag with proper styling.

Here's the updated HTML with your changes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Coffee Shop</title>
  <style>
    [... all existing styles preserved ...]
  </style>
</head>
<body>
  <nav>
    [... existing nav preserved ...]
  </nav>
  
  <section class="hero">
    <h1>Welcome to Our Coffee Shop</h1>
    <p>The best coffee in town</p>
    
    <!-- NEW: Image added here -->
    <img src="https://images.unsplash.com/photo-coffee-shop" 
         alt="Coffee shop interior" 
         style="width: 100%; max-width: 800px; height: auto; border-radius: 12px; margin: 2rem auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    
    <button>Order Now</button>
  </section>
  
  [... rest of HTML preserved ...]
</body>
</html>
```

**Changes made:**
- Added image to hero section
- Used Unsplash placeholder URL
- Responsive sizing with max-width
- Rounded corners and shadow
- Centered with auto margins
```

**Step 4: Auto-Applied**
- System extracts the HTML code block
- Replaces editor content with updated HTML
- File indicator shows: "AI Generated (HTML)"
- Character count updates

**Step 5: Deploy**
- Click "Create generated version"
- New version saved to storage
- Preview link: `/site/coffee-shop/v2/index.html`

---

## What Gets Preserved

When AI edits your file, it preserves:
- ✅ All existing HTML structure
- ✅ All existing CSS styles
- ✅ All existing JavaScript
- ✅ Formatting and indentation
- ✅ Comments
- ✅ Meta tags and head content

Only the requested section is modified.

---

## Example Edits

### 1. Add Contact Form

**User:** "Add a contact form after the features section"

**AI:** Returns complete HTML with contact form inserted after features

**Result:** Auto-applied to editor, ready to deploy

### 2. Change Colors

**User:** "Change the header background to blue"

**AI:** Returns complete HTML with header background updated in CSS

**Result:** Auto-applied to editor, ready to deploy

### 3. Add Image Gallery

**User:** "Add an image gallery with 6 images"

**AI:** Returns complete HTML with gallery section and images

**Result:** Auto-applied to editor, ready to deploy

### 4. Make Responsive

**User:** "Make the navigation responsive for mobile"

**AI:** Returns complete HTML with responsive CSS added

**Result:** Auto-applied to editor, ready to deploy

---

## Benefits

✅ **Instant application** - No manual copy/paste needed
✅ **Complete file** - Everything preserved and updated
✅ **Ready to deploy** - Immediately push to storage
✅ **Version tracking** - All changes tracked in versions
✅ **Live preview** - See changes instantly
✅ **Chat history** - All edits saved in conversation
✅ **Rollback** - Can load previous versions

---

## Technical Flow

```
1. User loads file → HTML in editor
2. User asks for change → Sent to AI with full HTML
3. AI reads HTML → Understands structure
4. AI makes change → Returns complete updated HTML
5. Frontend extracts → Auto-applies to editor
6. User reviews → Sees updated code
7. User deploys → Saved to storage bucket
8. System generates → Live preview URL
```

---

## Code Extraction Logic

```typescript
const extractCodeFromResponse = (message: string) => {
  // Match code blocks
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  const matches = [...message.matchAll(codeBlockRegex)]
  
  if (matches.length > 0) {
    const [, language, code] = matches[0]
    
    // Check if HTML
    if (language === 'html' || code.startsWith('<!DOCTYPE')) {
      // Auto-apply to editor
      aiHtml.value = code.trim()
      
      // Update indicator
      aiLoadedFile.value = 'AI Generated (HTML)'
      aiLoadedFrom.value = 'AI Assistant'
    }
  }
}
```

---

## Deployment Flow

```typescript
const handleGenerate = async () => {
  // 1. Take HTML from editor
  const html = aiHtml.value
  
  // 2. Upload to storage bucket
  const res = await $fetch('/api/hosting/generate', {
    body: {
      websiteId: aiWebsiteId.value,
      html: html
    }
  })
  
  // 3. Create version record
  // 4. Generate preview URL
  // 5. Show in versions list
}
```

---

## Complete Workflow Summary

1. **Load** → File from bucket or local
2. **Edit** → Ask AI for changes
3. **Auto-apply** → AI returns updated file, system applies it
4. **Review** → Check code in editor
5. **Deploy** → Click "Create generated version"
6. **Preview** → Live URL generated
7. **Iterate** → Continue editing in same chat

All edits are automatically applied and ready to push to storage!
