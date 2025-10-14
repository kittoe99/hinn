# AI Integration Library

This directory contains AI integration utilities for the Hinn platform.

## Files

### `deepseek.ts`
DeepSeek API client for AI-powered reasoning and completions.

**Functions:**
- `getDeepseek()` - Returns lazy-initialized OpenAI-compatible client
- `r1Complete(messages, options)` - Uses deepseek-reasoner model for advanced reasoning
- `dsComplete(messages, options)` - Generic completion with model selection

**Usage:**
```typescript
import { dsComplete } from '~/lib/deepseek'

const messages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Hello!' }
]

const response = await dsComplete(messages, {
  temperature: 0.2,
  max_tokens: 1024,
  reasoning: true // Uses deepseek-reasoner
})
```

### `search.ts`
Tavily web search integration for content extraction.

**Functions:**
- `webSearch(query, maxResults?, opts?)` - Performs web search with optional site domain filtering

**Usage:**
```typescript
import { webSearch } from '~/lib/search'

// General search
const results = await webSearch('AI news', 10)

// Site-specific search
const siteResults = await webSearch('about company', 8, {
  siteDomain: 'example.com'
})
```

### `deepseekSearch.ts`
Combined DeepSeek + Tavily integration for intelligent site analysis.

**Functions:**
- `deepseekSiteIntel(targetUrl)` - Extracts structured information from a website

**Usage:**
```typescript
import { deepseekSiteIntel } from '~/lib/deepseekSearch'

const intel = await deepseekSiteIntel('https://example.com')
console.log(intel.summary)
console.log(intel.details?.name)
console.log(intel.services)
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and add your API keys:
```env
DEEPSEEK_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
SEARCH_PROVIDER=tavily
```

3. Get API keys:
   - DeepSeek: https://platform.deepseek.com
   - Tavily: https://tavily.com

## Environment Variables

- `DEEPSEEK_API_KEY` - Required for AI completions
- `DEEPSEEK_MODEL` - Optional, defaults to "deepseek-chat"
- `TAVILY_API_KEY` - Required for web search
- `SEARCH_PROVIDER` - "deepseek" or "tavily" (default: tavily)

## Notes

- All functions throw errors if required API keys are missing
- DeepSeek client is lazy-initialized to avoid build-time env requirements
- Tavily search includes retry logic for timeouts and rate limits
- Site intelligence extraction uses structured JSON responses
