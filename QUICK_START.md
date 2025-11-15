# Quick Start: Testing Component Selection

## 🚀 Quick Test (2 minutes)

### Step 1: Restart Dev Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 2: Go to Hosting Page
1. Navigate to `/hosting` in your browser
2. Switch to **"AI Generator"** tab
3. Select a website from dropdown

### Step 3: Paste Test HTML
Copy and paste this into the HTML editor:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .navbar { background: #1a202c; color: white; padding: 20px; }
        .hero { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 80px 20px; text-align: center; }
        .features { padding: 60px 20px; background: #f7fafc; }
        .footer { background: #2d3748; color: white; padding: 40px 20px; text-align: center; }
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
    
    <section class="hero">
        <h1>Welcome to Our Platform</h1>
        <p>Build amazing things</p>
        <button>Get Started</button>
    </section>
    
    <section class="features">
        <h2>Our Features</h2>
        <p>Amazing features here</p>
    </section>
    
    <footer class="footer">
        <p>© 2024 Company</p>
    </footer>
</body>
</html>
```

### Step 4: Check Console (F12)
You should see:
```
[Components] Parsed: 1 root components
[Components] Selectable sections: 5
[Components] Selectable types: ['navbar', 'hero', 'button', 'features', 'footer']
[Preview] Injecting IDs for 5 selectable components
```

### Step 5: Enable Selection
1. Check the **"Select Mode"** checkbox
2. Look for **"Click to Select"** badge (bottom-right)
3. Look for **"5 sections"** badge

### Step 6: Click Elements
1. Click on the purple hero section
2. Component info should appear below
3. Should show: **"Component Selected"** with type **"hero"**

---

## ✅ Expected Results

**Selectable Elements:**
- Navbar (black bar at top)
- Hero section (purple gradient)
- Button (white button)
- Features section (gray area)
- Footer (dark gray at bottom)

**Console Output:**
```
[Component Selection] Selected component: {
  id: "c3",
  type: "hero",
  tagName: "section",
  classes: ["hero"]
}
```

**UI Shows:**
- Component type badge: `hero`
- Tag name: `<section>`
- Component ID: `c3`
- Classes: `.hero`

---

## ❌ If Not Working

### 1. Hard Refresh Browser
`Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

### 2. Check Console for Errors
Look for any red error messages

### 3. Verify Files Exist
- `lib/htmlToComponents.ts`
- `composables/useComponents.ts`

### 4. Check "Select Mode" is Enabled
The checkbox must be checked!

---

## 📝 What Makes Elements Selectable?

### ✅ These Work
```html
<nav class="navbar">...</nav>
<section class="hero">...</section>
<section class="features">...</section>
<footer class="footer">...</footer>
<button>...</button>
```

### ❌ These Don't
```html
<div class="wrapper">...</div>
<p>Some text</p>
<span>Inline text</span>
<div class="container">...</div>
```

**Key:** Use semantic classes like `hero`, `navbar`, `footer`, `features`, `about`, `contact`, etc.

---

## 🎯 Success Criteria

- [ ] Console shows "Selectable sections: 5"
- [ ] Badge shows "5 sections"
- [ ] Clicking hero shows component info
- [ ] Component type shows as "hero"
- [ ] Classes show as ".hero"

If all checked ✅ - **System is working!**

---

## Need Help?

See `TROUBLESHOOTING.md` for detailed debugging steps.
