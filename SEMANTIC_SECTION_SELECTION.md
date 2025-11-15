# Semantic Section Selection System

## Problem Solved
The previous system was **too granular** - selecting individual `<p>`, `<span>`, `<div>` elements wasn't useful. Users need to select **meaningful sections** like heroes, headers, footers, and feature areas.

---

## Solution: Section-Based Selection

### What's Selectable Now

**✅ Semantic Sections:**
- **Hero** - Banner, jumbotron, masthead sections
- **Header** - Site header, page header, top bar
- **Footer** - Site footer, page footer, bottom bar
- **Navbar** - Navigation menus
- **CTA** - Call-to-action sections
- **Features** - Feature sections, services, benefits
- **About** - About us sections
- **Contact** - Contact sections, contact forms
- **Testimonials** - Reviews, testimonial sections
- **Pricing** - Pricing tables, plans
- **Team** - Team sections
- **Gallery** - Portfolio, showcase sections
- **FAQ** - Frequently asked questions
- **Blog** - Articles, posts, news sections
- **Stats** - Statistics, numbers, metrics
- **Form** - Signup forms, newsletter forms

**✅ Interactive Elements:**
- **Buttons** - All `<button>` elements
- **Links** - All `<a>` elements
- **Images** - All `<img>` elements
- **Videos** - All `<video>` elements
- **Forms** - All `<form>` elements

**❌ NOT Selectable (Filtered Out):**
- Generic `<div>` without semantic class
- `<p>` paragraphs
- `<span>` elements
- `<h1-h6>` headings (unless part of a section)
- Other generic containers

---

## How Detection Works

### 1. Class Name Detection
```html
<!-- SELECTABLE: Has "hero" class -->
<div class="hero-section bg-blue">
  <h1>Welcome</h1>
  <button>Get Started</button>
</div>

<!-- SELECTABLE: Has "features" class -->
<section class="features-area">
  <div class="feature-card">...</div>
</section>

<!-- NOT SELECTABLE: Generic div -->
<div class="wrapper">
  <p>Some text</p>
</div>
```

### 2. ID Detection
```html
<!-- SELECTABLE: Has "navbar" ID -->
<div id="navbar-main">
  <a href="/">Home</a>
</div>

<!-- SELECTABLE: Has "contact" ID -->
<section id="contact-us">
  <form>...</form>
</section>
```

### 3. Semantic HTML5 Tags
```html
<!-- SELECTABLE: <nav> tag -->
<nav>
  <a href="/">Home</a>
</nav>

<!-- SELECTABLE: <header> tag -->
<header>
  <h1>Site Title</h1>
</header>

<!-- SELECTABLE: <footer> tag -->
<footer>
  <p>© 2024</p>
</footer>

<!-- SELECTABLE: <section> tag -->
<section>
  <h2>Our Services</h2>
</section>
```

---

## Detection Keywords

### Hero Section
Keywords: `hero`, `banner`, `jumbotron`, `masthead`

```html
<div class="hero">...</div>
<section class="banner">...</section>
<div id="jumbotron">...</div>
```

### Navigation
Keywords: `nav`, `navbar`, `navigation`, `menu`, `header-menu`

```html
<nav class="navbar">...</nav>
<div class="navigation">...</div>
<ul class="menu">...</ul>
```

### Header
Keywords: `header`, `site-header`, `page-header`, `top-bar`

```html
<header>...</header>
<div class="site-header">...</div>
```

### Footer
Keywords: `footer`, `site-footer`, `page-footer`, `bottom-bar`

```html
<footer>...</footer>
<div class="site-footer">...</div>
```

### Call-to-Action
Keywords: `cta`, `call-to-action`, `action-section`

```html
<section class="cta">...</section>
<div class="call-to-action">...</div>
```

### Features
Keywords: `features`, `feature-section`, `services`, `benefits`

```html
<section class="features">...</section>
<div class="services">...</div>
```

### About
Keywords: `about`, `about-us`, `about-section`

```html
<section class="about">...</section>
<div id="about-us">...</div>
```

### Contact
Keywords: `contact`, `contact-us`, `contact-section`, `contact-form`

```html
<section class="contact">...</section>
<div id="contact-us">...</div>
```

### Testimonials
Keywords: `testimonials`, `reviews`, `testimonial-section`

```html
<section class="testimonials">...</section>
<div class="reviews">...</div>
```

### Pricing
Keywords: `pricing`, `plans`, `pricing-section`, `pricing-table`

```html
<section class="pricing">...</section>
<div class="pricing-table">...</div>
```

### Team
Keywords: `team`, `our-team`, `team-section`

```html
<section class="team">...</section>
<div id="our-team">...</div>
```

### Gallery
Keywords: `gallery`, `portfolio`, `showcase`

```html
<section class="gallery">...</section>
<div class="portfolio">...</div>
```

### FAQ
Keywords: `faq`, `faqs`, `questions`

```html
<section class="faq">...</section>
<div id="faqs">...</div>
```

### Blog
Keywords: `blog`, `articles`, `posts`, `news`

```html
<section class="blog">...</section>
<div class="articles">...</div>
```

### Stats
Keywords: `stats`, `statistics`, `numbers`, `metrics`

```html
<section class="stats">...</section>
<div class="metrics">...</div>
```

### Forms
Keywords: `form`, `signup`, `subscribe`, `newsletter`

```html
<form class="signup">...</form>
<div class="newsletter">...</div>
```

---

## Examples

### Example 1: Landing Page
```html
<!-- SELECTABLE: Hero section -->
<section class="hero bg-gradient">
  <h1>Welcome to Our Site</h1>
  <p>Build amazing things</p>
  <!-- SELECTABLE: Button -->
  <button class="cta-btn">Get Started</button>
</section>

<!-- SELECTABLE: Features section -->
<section class="features py-20">
  <div class="container">
    <!-- NOT SELECTABLE: Generic div -->
    <div class="feature-card">
      <h3>Fast</h3>
      <p>Lightning quick</p>
    </div>
  </div>
</section>

<!-- SELECTABLE: Footer -->
<footer class="site-footer">
  <p>© 2024 Company</p>
</footer>
```

**Selectable Components:**
1. Hero section (type: `hero`)
2. Button (type: `button`)
3. Features section (type: `features`)
4. Footer (type: `footer`)

**Total:** 4 selectable components

---

### Example 2: Business Site
```html
<!-- SELECTABLE: Header -->
<header class="site-header">
  <!-- SELECTABLE: Navbar -->
  <nav class="navbar">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<!-- SELECTABLE: About section -->
<section id="about-us">
  <h2>About Our Company</h2>
  <p>We are awesome</p>
</section>

<!-- SELECTABLE: Contact section -->
<section class="contact-section">
  <h2>Get in Touch</h2>
  <!-- SELECTABLE: Form -->
  <form class="contact-form">
    <input type="email" />
    <button>Submit</button>
  </form>
</section>
```

**Selectable Components:**
1. Header (type: `header`)
2. Navbar (type: `navbar`)
3. About section (type: `about`)
4. Contact section (type: `contact`)
5. Form (type: `form`)
6. Button (type: `button`)

**Total:** 6 selectable components

---

## Console Output

### When HTML is Parsed
```
[Components] Parsed: 1 root components
[Components] Total components: 23
[Components] Selectable sections: 6
[Components] Selectable types: ['hero', 'navbar', 'features', 'about', 'contact', 'footer']
[Components] Stats: { total: 23, types: {...} }
```

### When Injecting IDs
```
[Preview] Injecting IDs for 6 selectable components
[Preview] Injected ID for hero : c1
[Preview] Injected ID for navbar : c2
[Preview] Injected ID for features : c5
[Preview] Injected ID for about : c8
[Preview] Injected ID for contact : c12
[Preview] Injected ID for footer : c18
```

---

## Benefits

### ✅ Better UX
- Click on meaningful sections, not random divs
- Select entire hero section, not just a heading
- Select whole feature area, not individual cards

### ✅ Cleaner Selection
- No more selecting `<p>` or `<span>` elements
- Focus on sections that matter
- Easier to understand what's selected

### ✅ Better AI Context
- AI gets context about entire sections
- "Edit the hero section" is clearer than "Edit this div"
- Section type provides semantic meaning

### ✅ Fewer Selections
- Before: 50+ selectable elements (too many!)
- After: 5-10 meaningful sections (perfect!)

---

## Fallback Behavior

If an element doesn't match any semantic patterns, it's marked as `type: 'default'` and **filtered out** from selection.

**Example:**
```html
<!-- NOT SELECTABLE: Generic div -->
<div class="wrapper">
  <p>Some text</p>
</div>

<!-- SELECTABLE: Has semantic class -->
<div class="hero-section">
  <p>Hero text</p>
</div>
```

---

## Adding New Section Types

To add a new selectable section type, update the `sectionMarkers` in `lib/htmlToComponents.ts`:

```typescript
const sectionMarkers = {
  // ... existing markers ...
  'partners': ['partners', 'clients', 'sponsors'],  // Add new type
}
```

Then add it to the selectable types list:

```typescript
const selectableTypes = [
  // ... existing types ...
  'partners'  // Add new type
]
```

---

## Summary

**Before:**
- ❌ Selecting individual `<p>`, `<span>`, `<div>` elements
- ❌ 50+ selectable elements (overwhelming)
- ❌ No semantic meaning
- ❌ Confusing for users

**After:**
- ✅ Selecting semantic sections (hero, features, footer)
- ✅ 5-10 meaningful sections (manageable)
- ✅ Clear semantic types
- ✅ Intuitive for users

**Result:** Users can now click on **meaningful page sections** instead of random elements! 🎯
