# AI Targeted Editing System

## Overview
The AI has been updated to make **surgical, targeted edits** instead of regenerating entire files. This makes editing faster, preserves existing code, and gives users precise control.

## How It Works Now

### Old Behavior (❌ Removed)
- AI regenerated the entire HTML file (300+ lines)
- Lost custom changes and formatting
- Slow and inefficient
- Hard to see what changed

### New Behavior (✅ Active)
- AI reads the existing code
- Identifies the specific section to modify
- Generates ONLY the code snippet needed
- Provides clear instructions on where to place it

## AI Response Format

The AI now responds with structured instructions:

```
I'll help you [describe the change].

**Location:** [Where in the HTML - e.g., "Inside the <header> tag", "After the hero section"]

**Action:** [What to do - e.g., "Add", "Replace", "Insert after"]

**Code to add/change:**
```html
[Only the specific code snippet]
```

**Explanation:** [What this does]
```

## Example Interactions

### Example 1: Adding a Contact Form

**User asks:** "Add a contact form after the hero section"

**AI responds:**
```
I'll add a contact form after your hero section.

**Location:** After the hero section (the section with class="hero"), before the features section

**Action:** Insert this code

**Code to add:**
```html
<section class="contact" style="padding: 4rem 2rem; background: #f9f9f9;">
  <div style="max-width: 600px; margin: 0 auto;">
    <h2 style="text-align: center; margin-bottom: 2rem;">Contact Us</h2>
    <form>
      <input type="text" placeholder="Name" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;">
      <input type="email" placeholder="Email" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;">
      <textarea placeholder="Message" rows="4" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;"></textarea>
      <button type="submit" style="width: 100%; padding: 0.75rem; background: #d97759; color: white; border: none; border-radius: 4px; cursor: pointer;">Send Message</button>
    </form>
  </div>
</section>
```

**Explanation:** This adds a centered contact form with name, email, message fields and a submit button.
```

### Example 2: Changing Colors

**User asks:** "Change the header background to blue"

**AI responds:**
```
I'll change your header background to blue.

**Location:** In the <style> block, find the header styles

**Action:** Modify the background property

**Code to change:**
```css
header {
  background: #2563eb; /* Changed from previous color to blue */
  /* Keep other properties the same */
}
```

**Explanation:** This updates just the header background color to a nice blue (#2563eb).
```

### Example 3: Adding Hover Effects

**User asks:** "Add hover effects to all buttons"

**AI responds:**
```
I'll add smooth hover effects to your buttons.

**Location:** In the <style> block, add this new rule

**Action:** Add these styles

**Code to add:**
```css
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

**Explanation:** This adds a subtle lift effect and shadow when hovering over any button.
```

## User Workflow

### Step 1: Load Existing File
- Use "From Bucket" to load a previously uploaded HTML file
- Or use "From Computer" to upload a local file
- File appears in the HTML Editor

### Step 2: Ask AI for Specific Changes
- Be specific about what and where
- Good: "Add a testimonials section after the features"
- Bad: "Make it better"

### Step 3: Review AI Instructions
- AI provides clear location and action
- Shows only the code snippet needed
- Explains what it does

### Step 4: Apply Changes Manually
- Copy the code snippet from AI response
- Find the location in your HTML Editor
- Paste the code in the right place
- Or modify existing code as instructed

### Step 5: Deploy
- Click "Create generated version"
- New version is saved with your changes

## Benefits

✅ **Faster** - No need to regenerate 500+ lines
✅ **Precise** - Only changes what you asked for
✅ **Preserves** - Keeps your custom code intact
✅ **Clear** - Shows exactly where to place code
✅ **Educational** - Learn by seeing specific changes
✅ **Flexible** - Apply changes manually or modify them

## Tips for Best Results

### Be Specific About Location
- ✅ "Add a footer at the bottom of the page"
- ✅ "Change the hero section background color"
- ✅ "Add a button inside the header navigation"
- ❌ "Add a footer" (where?)
- ❌ "Change colors" (which colors? where?)

### Describe the Change Clearly
- ✅ "Add a 3-column features section with icons"
- ✅ "Make the navigation sticky on scroll"
- ✅ "Add smooth scroll behavior to anchor links"
- ❌ "Make it look better"
- ❌ "Fix the layout"

### Reference Existing Elements
- ✅ "Add a contact form below the hero section"
- ✅ "Change the header logo size to 150px"
- ✅ "Add margin between the features cards"

## When AI Generates Full HTML

The AI will only generate a complete HTML document when:
1. You explicitly ask to "create from scratch"
2. You say "generate a new landing page"
3. The editor is empty and you ask for a complete page

Otherwise, it will always provide targeted edits.

## Chat Features

- **Conversation history** - All chats are saved per website
- **Context awareness** - AI remembers previous changes
- **Follow-ups** - Continue refining with multiple edits
- **Chat selector** - Switch between different editing sessions

## Example Full Workflow

1. **Load file**: Select "Coffee Shop Website" → Browse Bucket → Load `index.html`
2. **First edit**: "Add a menu section after the hero"
   - AI provides menu HTML snippet
   - Copy and paste into editor after hero section
3. **Second edit**: "Make the menu items display in a grid"
   - AI provides CSS grid styles
   - Add to `<style>` block
4. **Third edit**: "Add hover effects to menu items"
   - AI provides hover CSS
   - Add to `<style>` block
5. **Deploy**: Click "Create generated version"
6. **Preview**: Check the live preview link

All changes are incremental and targeted!
