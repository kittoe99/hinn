# Ask Me Anything (AMA) Feature

AI-powered chat widget that answers questions about your website using Firecrawl + DeepSeek.

## Overview

The AMA feature provides a floating chat widget that:
- Crawls your website using Firecrawl
- Answers user questions using DeepSeek AI
- Caches site content for 1 hour to improve performance
- Provides a beautiful, modern chat interface

## Components

### 1. `components/AskAnything.vue`
Floating chat widget with:
- Collapsible chat window
- Message history
- Typing indicators
- Suggested questions
- Smooth animations

### 2. `server/api/ama/ask.post.ts`
API endpoint that:
- Receives user questions
- Crawls site with Firecrawl (cached for 1 hour)
- Generates answers with DeepSeek
- Returns AI-generated responses

## Features

### Chat Interface
- **Floating Button**: Bottom-right corner, always accessible
- **Chat Window**: 400x600px, modern design
- **Message Bubbles**: User (blue) and AI (gray)
- **Typing Indicator**: Animated dots while thinking
- **Suggested Questions**: Quick-start prompts
- **Smooth Animations**: Slide-in/out transitions

### AI Intelligence
- **Site Crawling**: Automatically crawls up to 10 pages
- **Content Caching**: 1-hour cache to avoid re-crawling
- **Smart Answers**: DeepSeek generates contextual responses
- **Fallback Handling**: Graceful error messages

## Setup

### 1. Environment Variables
Already configured in `.env`:
```env
FIRECRAWL_API_KEY=fc-b57fb764d0f24f4ab0a961b51582cdf2
DEEPSEEK_API_KEY=sk-739f40cb4da84e788d966f776b11ac0d
```

### 2. Installation
The component is already added to `app.vue` and will appear on all pages.

### 3. Customization

**Suggested Questions** (`components/AskAnything.vue`):
```javascript
const suggestions = [
  'What services do you offer?',
  'How can I get started?',
  'What are your pricing plans?',
  'How do I contact support?'
]
```

**Cache Duration** (`server/api/ama/ask.post.ts`):
```javascript
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour (in milliseconds)
```

**Crawl Limit** (`server/api/ama/ask.post.ts`):
```javascript
const pages = await crawlWebsite(siteUrl, 10) // Max 10 pages
```

## How It Works

### 1. User Asks Question
```
User: "What services do you offer?"
```

### 2. System Crawls Site (if not cached)
```javascript
// Firecrawl crawls up to 10 pages
const pages = await crawlWebsite(siteUrl, 10)

// Combines all page content
siteContent = pages.map(page => page.markdown).join('\n\n')
```

### 3. DeepSeek Generates Answer
```javascript
const messages = [
  {
    role: 'system',
    content: 'You are a helpful assistant...'
  },
  {
    role: 'user',
    content: `Website Content: ${siteContent}\n\nQuestion: ${question}`
  }
]

const response = await dsComplete(messages)
```

### 4. User Receives Answer
```
AI: "Based on the website, we offer the following services:
• Web Development
• Mobile Apps
• UI/UX Design
• SEO Optimization"
```

## Performance

### Caching Strategy
- First request: Crawls site (~5-10 seconds)
- Subsequent requests: Uses cache (~1-2 seconds)
- Cache expires after 1 hour
- Per-domain caching (different sites have separate caches)

### Token Limits
- Site content limited to 15,000 characters
- Answer limited to 500 tokens
- Prevents API overuse and costs

## Styling

### Colors
- Primary: `accent-primary` (your brand color)
- Background: White with subtle shadows
- User messages: Blue gradient
- AI messages: Light gray

### Responsive
- Fixed size: 400x600px
- Mobile-friendly (can be adjusted)
- Z-index: 50 (always on top)

## API Response Format

```json
{
  "answer": "Here's the answer to your question...",
  "cached": true
}
```

## Error Handling

### Missing API Keys
```
Error: FIRECRAWL_API_KEY not configured
Error: DEEPSEEK_API_KEY not configured
```

### Crawl Failures
```
AI: "Sorry, I encountered an error. Please try again."
```

### No Content Found
```
AI: "I couldn't find information about that on the website. 
Please contact our team for more details."
```

## Usage Examples

### Example 1: Service Inquiry
```
Q: "What services do you provide?"
A: "We offer web development, mobile apps, and design services..."
```

### Example 2: Pricing
```
Q: "How much does it cost?"
A: "Based on our pricing page, we offer three plans..."
```

### Example 3: Contact
```
Q: "How do I get in touch?"
A: "You can reach us at: email@example.com or call (555) 123-4567"
```

## Customization Tips

### Change Position
```vue
<!-- Bottom-left instead of bottom-right -->
<button class="fixed bottom-6 left-6 z-50 ...">
```

### Change Size
```vue
<!-- Larger chat window -->
<div class="... h-[700px] w-[500px] ...">
```

### Change Colors
```vue
<!-- Different gradient -->
<div class="bg-gradient-to-r from-blue-500 to-purple-600 ...">
```

### Add More Suggestions
```javascript
const suggestions = [
  'What services do you offer?',
  'How can I get started?',
  'What are your pricing plans?',
  'How do I contact support?',
  'Do you offer refunds?',        // New
  'What is your response time?'   // New
]
```

## Monitoring

Check server logs for:
- `[ama] Received question: ...`
- `[ama] Using cached site content`
- `[ama] Crawling site...`
- `[ama] Crawled X pages`
- `[ama] Answer generated`

## Future Enhancements

Potential improvements:
- [ ] Conversation history persistence
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] File attachment support
- [ ] Admin dashboard for analytics
- [ ] Custom training on specific content
- [ ] Integration with CRM systems

## Troubleshooting

### Chat button not appearing
- Check `app.vue` includes `<AskAnything />`
- Verify component is in `components/` directory
- Check browser console for errors

### No answers generated
- Verify API keys in `.env`
- Check server logs for errors
- Ensure Firecrawl can access your site
- Verify DeepSeek API is working

### Slow responses
- First request is slower (crawling)
- Subsequent requests use cache
- Consider reducing crawl limit
- Check network connection

## Credits

- **Firecrawl**: Website crawling and content extraction
- **DeepSeek**: AI-powered answer generation
- **Nuxt 3**: Framework and server API
- **Tailwind CSS**: Styling and animations
