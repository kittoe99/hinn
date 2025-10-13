# Hinn - Nuxt Project Setup Guide

This Nuxt 3 project was created from scratch using the color theme from the original hinn.io project.

## What's Included

### Pages
- **Homepage** (`/`) - Main landing page with hero, products showcase, and project gallery
- **Website** (`/website`) - Custom website services page with features, pricing, and FAQ
- **Agents** (`/agents`) - AI agents page with specialized agent types and use cases
- **Marketing** (`/marketing`) - Branding and marketing services page

### Components
- **Header** - Responsive navigation with mobile menu
- **Footer** - Site footer with links and company info

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Color Theme** - Extracted from original project:
  - Primary Accent: `#d97759` (warm coral)
  - Background: `#fefefe` (near-white)
  - Text colors: Primary (#000000), Secondary (#404040), Tertiary (#6b6b6b)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
hinn - nuxt/
├── assets/
│   └── css/
│       └── main.css          # Global styles with color theme
├── components/
│   ├── Header.vue            # Navigation header
│   └── Footer.vue            # Site footer
├── layouts/
│   └── default.vue           # Default layout
├── pages/
│   ├── index.vue             # Homepage
│   ├── website.vue           # Website services page
│   ├── agents.vue            # AI agents page
│   └── marketing.vue         # Marketing services page
├── app.vue                   # Root component
├── nuxt.config.ts            # Nuxt configuration
├── tailwind.config.js        # Tailwind configuration
└── package.json              # Dependencies
```

## Color Theme Variables

The project uses CSS custom properties for consistent theming:

```css
--accent: #d97759              /* Brand accent color */
--bg-page: #fefefe             /* Page background */
--text-primary: #000000        /* Headings */
--text-secondary: #404040      /* Body text */
--text-tertiary: #6b6b6b       /* Muted text */
```

## Notes

- All pages are built from scratch (not converted from Next.js)
- Uses the same color theme as the original project
- Fully responsive design
- No external dependencies beyond Nuxt and Tailwind CSS
- Clean, semantic HTML structure
