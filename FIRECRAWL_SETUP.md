# Firecrawl Integration

This project uses [Firecrawl](https://firecrawl.dev) for intelligent website scraping and analysis during the onboarding process.

## What is Firecrawl?

Firecrawl is a powerful web scraping API that:
- Converts any website into clean markdown or structured data
- Handles JavaScript-heavy sites
- Extracts metadata automatically
- Provides crawling capabilities for multi-page sites

## Setup

### 1. Install the Package

Already installed via:
```bash
npm install @mendable/firecrawl-js
```

### 2. Get Your API Key

1. Sign up at [firecrawl.dev](https://firecrawl.dev)
2. Get your API key from the dashboard
3. Your current key: `fc-b57fb764d0f24f4ab0a961b51582cdf2`

### 3. Add to Environment Variables

Add to your `.env` file:
```env
FIRECRAWL_API_KEY=fc-b57fb764d0f24f4ab0a961b51582cdf2
```

### 4. Restart Dev Server

```bash
npm run dev
```

## Usage

### In the Onboarding Flow

The website analysis feature (Step 3) now uses Firecrawl to:
1. Scrape the provided URL
2. Extract markdown content
3. Parse metadata (title, description, etc.)
4. Display a summary to the user

### Programmatic Usage

```typescript
import { scrapeWebsite, crawlWebsite } from '~/lib/firecrawl'

// Scrape a single page
const intel = await scrapeWebsite('https://example.com')
console.log(intel.summary)
console.log(intel.details?.name)

// Crawl multiple pages
const pages = await crawlWebsite('https://example.com', 5)
```

## API Methods

### `scrapeWebsite(url: string)`

Scrapes a single URL and returns structured information:

```typescript
{
  summary: string          // Site description
  details?: {
    name?: string         // Site title
    tagline?: string      // OG description
  }
  about?: string          // First paragraphs
  rawContent?: string     // Full markdown content
}
```

### `crawlWebsite(url: string, maxPages?: number)`

Crawls multiple pages of a website (default: 5 pages):

```typescript
const pages = await crawlWebsite('https://example.com', 10)
// Returns array of scraped pages
```

## Features

- **Clean Markdown Output**: All content converted to markdown
- **Metadata Extraction**: Automatically extracts title, description, OG tags
- **Main Content Only**: Filters out navigation, footers, ads
- **JavaScript Support**: Handles dynamic content
- **Wait Time**: Configurable wait time for page load

## Error Handling

The integration includes comprehensive error handling:
- Missing API key detection
- Scraping failure messages
- Detailed logging for debugging

## Advantages Over Previous Approach

**Before (DeepSeek + Tavily):**
- Required 2 API keys
- Multiple API calls
- Complex error handling
- Slower response times

**Now (Firecrawl):**
- Single API key
- One API call
- Simpler integration
- Faster and more reliable
- Better content extraction

## Cost

Check [Firecrawl pricing](https://firecrawl.dev/pricing) for current rates. Free tier typically includes:
- 500 scrapes/month
- Basic features
- Community support

## Troubleshooting

### "Missing FIRECRAWL_API_KEY"
- Ensure `.env` file exists (not just `.env.example`)
- Verify the API key is correct
- Restart the dev server

### "Scrape failed or no content"
- Check if the URL is accessible
- Verify the website allows scraping
- Try increasing `waitFor` timeout

### Check Logs
Look for `[firecrawl]` prefixed messages in your terminal for detailed debugging info.
