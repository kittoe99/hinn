# Vercel Environment Variables Checklist

## CRITICAL: Exact Variable Names Required

In Vercel, go to your project → Settings → Environment Variables

You need EXACTLY these 5 variables with EXACTLY these names:

### Variable 1: Supabase URL
```
Name: NUXT_PUBLIC_SUPABASE_URL
Value: https://mjgwoukwyqwoectxfwqv.supabase.co
Environments: ✓ Production ✓ Preview ✓ Development
```

### Variable 2: Supabase Anon Key
```
Name: NUXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3dvdWt3eXF3b2VjdHhmd3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjAzNjcsImV4cCI6MjA3MDMzNjM2N30.3ee-rHN_BYQKaZmLOTiyoVxU4fYLDnNnfToI8veH5F8
Environments: ✓ Production ✓ Preview ✓ Development
```

### Variable 3: Supabase Service Role Key
```
Name: NUXT_SUPABASE_SERVICE_ROLE_KEY
Value: [Get from Supabase Dashboard - see below]
Environments: ✓ Production ✓ Preview ✓ Development
```

### Variable 4: OpenAI API Key
```
Name: OPENAI_API_KEY
Value: [Your OpenAI API key - starts with sk-]
Environments: ✓ Production ✓ Preview ✓ Development
```

### Variable 5: GitHub Token (for Website Builder)
```
Name: GITHUB_TOKEN
Value: [Your GitHub Personal Access Token - starts with github_pat_ or ghp_]
Environments: ✓ Production ✓ Preview ✓ Development
```

**How to get GitHub Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Hinn Website Builder"
4. Select scopes: ✓ repo (Full control of private repositories)
5. Click "Generate token"
6. Copy the token immediately (you won't see it again!)
7. Paste into Vercel

## Common Mistakes

❌ **WRONG**: `SUPABASE_URL` (missing NUXT_PUBLIC_ prefix)
✅ **CORRECT**: `NUXT_PUBLIC_SUPABASE_URL`

❌ **WRONG**: `NUXT-PUBLIC-SUPABASE-URL` (using hyphens)
✅ **CORRECT**: `NUXT_PUBLIC_SUPABASE_URL` (using underscores)

❌ **WRONG**: Only checking "Production" environment
✅ **CORRECT**: Check all 3 environments

## Get Service Role Key

1. Go to: https://supabase.com/dashboard/project/mjgwoukwyqwoectxfwqv/settings/api
2. Scroll to "Project API keys"
3. Find the row labeled "service_role"
4. Click "Reveal" or copy icon
5. Copy the ENTIRE key (starts with `eyJ...`)
6. Paste into Vercel

## After Adding Variables

1. Click "Save" for each variable
2. Go to Deployments tab
3. Click ⋯ on latest deployment
4. Click "Redeploy"
5. Wait for deployment to complete (watch the logs)

## Verification

After redeployment, visit:
```
https://your-domain.com/api/debug/config
```

Expected output:
```json
{
  "values": {
    "supabaseUrl": "SET",
    "supabaseAnonKey": "SET",
    "supabaseServiceRoleKey": "SET",
    "openaiApiKey": "SET",
    "githubToken": "SET"
  }
}
```

If any show "NOT SET", that variable is missing or incorrectly named.

## Quick Fix for Mobile GitHub Error

If you're getting "GitHub token not configured" error on mobile:

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add new variable:
   - **Name**: `GITHUB_TOKEN`
   - **Value**: Your GitHub token (from .env file or generate new one)
   - **Environments**: Check all 3 boxes (Production, Preview, Development)
5. Click "Save"
6. Go to Deployments tab
7. Click "Redeploy" on the latest deployment
8. Wait 2-3 minutes for deployment to complete
9. Test on mobile again
