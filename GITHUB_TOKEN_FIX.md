# 🔧 Fix GitHub Token Error on Mobile (500 Error)

## Problem
- ✅ Works on desktop
- ❌ Fails on mobile with 500 error
- Error message: "GitHub token not configured"

## Root Cause
The `GITHUB_TOKEN` environment variable is set in your local `.env` file but **NOT set on Vercel** (your hosting platform).

## Solution: Add GitHub Token to Vercel

### Step 1: Get Your GitHub Token
Get your token from your local `.env` file:
```
GITHUB_TOKEN=your_github_token_here
```

### Step 2: Add to Vercel
1. Go to: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Fill in:
   - **Name**: `GITHUB_TOKEN`
   - **Value**: [Paste your GitHub token from .env file]
   - **Environments**: ✓ Production ✓ Preview ✓ Development (check ALL 3)
6. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **⋯** (three dots) menu
4. Click **Redeploy**
5. Wait 2-3 minutes for deployment to complete

### Step 4: Test
- Open your site on mobile
- Try loading a GitHub file in the builder
- Should work now! ✅

## Why This Happens
- Desktop: Uses your local `.env` file ✅
- Mobile (production): Uses Vercel environment variables ❌ (was missing)

## Verification
After redeploying, check if the token is set:
```
https://your-site.vercel.app/api/debug/config
```

Should show:
```json
{
  "githubToken": "SET"
}
```

## Need a New Token?
If you need to generate a new GitHub token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "Hinn Website Builder"
4. Select scope: ✓ **repo** (full control)
5. Click "Generate token"
6. Copy immediately (you won't see it again!)
7. Add to Vercel as shown above

---

**After completing these steps, the GitHub file loading should work on mobile!** 📱✨
