# AMA Feature - Deployment Guide

## Important: Localhost Limitation

⚠️ **Firecrawl cannot scrape localhost URLs**

The AMA feature requires a **public domain** to work properly because:
- Firecrawl needs to access your website from the internet
- `localhost` and `127.0.0.1` are not accessible externally
- Firecrawl requires a valid top-level domain (.com, .dev, .io, etc.)

## Local Development Behavior

When testing on `localhost:3000`, the AMA will show:
```
I'm currently running in development mode on localhost. 
To use the AI assistant with real website content, please:

1. Deploy your site to a public URL
2. Test the AMA feature on the live site

Firecrawl requires a public domain to scrape content.
```

## Deployment Options

### Option 1: Vercel (Recommended)

**1. Install Vercel CLI:**
```bash
npm install -g vercel
```

**2. Deploy:**
```bash
vercel
```

**3. Add Environment Variables:**
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add:
- `FIRECRAWL_API_KEY` = `fc-b57fb764d0f24f4ab0a961b51582cdf2`
- `DEEPSEEK_API_KEY` = `sk-739f40cb4da84e788d966f776b11ac0d`

**4. Redeploy:**
```bash
vercel --prod
```

### Option 2: Netlify

**1. Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

**2. Build:**
```bash
npm run build
```

**3. Deploy:**
```bash
netlify deploy --prod
```

**4. Add Environment Variables:**
Netlify Dashboard → Site Settings → Environment Variables

### Option 3: Custom Server

**1. Build:**
```bash
npm run build
```

**2. Start:**
```bash
node .output/server/index.mjs
```

**3. Set Environment Variables:**
```bash
export FIRECRAWL_API_KEY=fc-b57fb764d0f24f4ab0a961b51582cdf2
export DEEPSEEK_API_KEY=sk-739f40cb4da84e788d966f776b11ac0d
```

## Testing on Live Site

### Step 1: Deploy Your Site
Choose one of the deployment options above.

### Step 2: Verify Environment Variables
Visit: `https://your-domain.com/api/ama/test`

Should show:
```json
{
  "status": "ok",
  "env": {
    "hasFirecrawl": true,
    "hasDeepseek": true
  }
}
```

### Step 3: Test AMA Feature

**On Homepage:**
1. Scroll to "Ask Me Anything" section
2. Type: "What services do you offer?"
3. Click "Ask"
4. Watch AI generate response

**Hovering Bar:**
1. Scroll down past AMA section
2. Sticky bar appears at bottom
3. Type question and click "Ask"

**Floating Chat (if enabled):**
1. Click floating button (bottom-right)
2. Type question
3. Get AI response

### Step 4: Verify It's Working

**Success indicators:**
- ✅ Modal opens with your question
- ✅ Thinking dots appear
- ✅ AI response types out
- ✅ Response is relevant to your website
- ✅ Not showing localhost error message

**Check browser console:**
```
[AmaBar] Sending question: ...
[AmaBar] Response status: 200
[AmaBar] Got answer, length: 234
```

## Environment Variables Checklist

Make sure these are set in your deployment:

```env
# Required for AMA feature
FIRECRAWL_API_KEY=fc-b57fb764d0f24f4ab0a961b51582cdf2
DEEPSEEK_API_KEY=sk-739f40cb4da84e788d966f776b11ac0d

# Your Supabase credentials
NUXT_PUBLIC_SUPABASE_URL=your_url
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NUXT_SUPABASE_SERVICE_ROLE_KEY=your_key
```

## Performance Notes

### First Request
- Takes 5-10 seconds
- Firecrawl scrapes your homepage
- DeepSeek generates answer
- Result is cached for 1 hour

### Subsequent Requests
- Takes 1-2 seconds
- Uses cached site content
- Only generates new answer
- Much faster!

### Cache Duration
- Site content cached: 1 hour
- Per-domain caching
- Automatic cache refresh

## Troubleshooting on Live Site

### Issue: Still showing localhost message
**Solution:**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check you're on the live URL, not localhost

### Issue: "FIRECRAWL_API_KEY not configured"
**Solution:**
- Check environment variables in deployment platform
- Redeploy after adding variables
- Verify with `/api/ama/test` endpoint

### Issue: Slow responses
**Solution:**
- First request is always slower (scraping)
- Subsequent requests use cache
- Consider reducing content limit in code

### Issue: Generic/wrong answers
**Solution:**
- Check if Firecrawl successfully scraped your site
- Visit `/api/ama/test-scrape` to test scraping
- Ensure your site is publicly accessible
- Check for robots.txt blocking

## Cost Considerations

### Firecrawl
- Free tier: 500 scrapes/month
- Cached for 1 hour = ~720 scrapes/month max
- Should be sufficient for most sites

### DeepSeek
- Very affordable API
- ~$0.001 per request
- 1000 requests = ~$1

### Total Estimated Cost
- Small site: ~$5-10/month
- Medium site: ~$20-30/month
- High traffic: ~$50-100/month

## Monitoring

### Check Logs
Most deployment platforms provide logs:
- Vercel: Dashboard → Deployments → Logs
- Netlify: Dashboard → Deploys → Deploy Log
- Custom: `pm2 logs` or server logs

### Look for:
```
[ama] Received question: ...
[ama] Scraping site homepage...
[ama] Extracted content length: ...
[ama] Generating answer with DeepSeek...
[ama] Answer generated
```

## Next Steps

1. ✅ Deploy your site to a public URL
2. ✅ Add environment variables
3. ✅ Test `/api/ama/test` endpoint
4. ✅ Try asking questions in AMA section
5. ✅ Monitor logs and performance
6. ✅ Adjust cache duration if needed

The AMA feature will work perfectly on your live site! 🚀
