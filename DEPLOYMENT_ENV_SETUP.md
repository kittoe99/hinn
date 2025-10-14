# Fix: Contact Form Error on Live Site

## The Problem
The contact form works locally but fails on the live site with "Supabase configuration missing" because environment variables aren't set in your deployment platform.

## Solution: Add Environment Variables to Deployment

### Where is Your Site Deployed?

**Check your deployment platform:**
- Vercel
- Netlify
- Custom server
- Other?

---

## Option 1: Vercel Deployment

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Find your project (hinn.nuxt or similar)
3. Click on the project

### Step 2: Add Environment Variables
1. Go to: **Settings** → **Environment Variables**
2. Add these 3 variables:

**Variable 1:**
- **Name**: `NUXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://mjgwoukwyqwoectxfwqv.supabase.co`
- **Environment**: Production, Preview, Development (check all)

**Variable 2:**
- **Name**: `NUXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3dvdWt3eXF3b2VjdHhmd3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjAzNjcsImV4cCI6MjA3MDMzNjM2N30.3ee-rHN_BYQKaZmLOTiyoVxU4fYLDnNnfToI8veH5F8`
- **Environment**: Production, Preview, Development (check all)

**Variable 3:**
- **Name**: `NUXT_SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Get from https://supabase.com/dashboard/project/mjgwoukwyqwoectxfwqv/settings/api
- **Environment**: Production, Preview, Development (check all)

### Step 3: Redeploy
1. Go to: **Deployments** tab
2. Click the **3 dots** on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 4: Test
Visit your live site's contact page and submit a form!

---

## Option 2: Netlify Deployment

### Step 1: Go to Netlify Dashboard
1. Visit: https://app.netlify.com
2. Find your site
3. Click on it

### Step 2: Add Environment Variables
1. Go to: **Site settings** → **Environment variables**
2. Click **Add a variable** → **Add a single variable**
3. Add these 3 variables:

**Variable 1:**
- **Key**: `NUXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://mjgwoukwyqwoectxfwqv.supabase.co`

**Variable 2:**
- **Key**: `NUXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3dvdWt3eXF3b2VjdHhmd3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjAzNjcsImV4cCI6MjA3MDMzNjM2N30.3ee-rHN_BYQKaZmLOTiyoVxU4fYLDnNnfToI8veH5F8`

**Variable 3:**
- **Key**: `NUXT_SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Get from https://supabase.com/dashboard/project/mjgwoukwyqwoectxfwqv/settings/api

### Step 3: Trigger Deploy
1. Go to: **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete

### Step 4: Test
Visit your live site's contact page and submit a form!

---

## Option 3: Custom Server / VPS

### Step 1: SSH into Your Server
```bash
ssh user@your-server.com
```

### Step 2: Navigate to Your Project
```bash
cd /path/to/your/project
```

### Step 3: Edit .env File
```bash
nano .env
```

Add these lines:
```env
NUXT_PUBLIC_SUPABASE_URL=https://mjgwoukwyqwoectxfwqv.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3dvdWt3eXF3b2VjdHhmd3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjAzNjcsImV4cCI6MjA3MDMzNjM2N30.3ee-rHN_BYQKaZmLOTiyoVxU4fYLDnNnfToI8veH5F8
NUXT_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Save and exit (Ctrl+X, then Y, then Enter)

### Step 4: Restart Your App
```bash
pm2 restart all
# or
systemctl restart your-app
# or rebuild and restart however you normally do it
```

---

## Getting the Service Role Key

You need to get this from Supabase:

1. Go to: https://supabase.com/dashboard/project/mjgwoukwyqwoectxfwqv/settings/api
2. Scroll to **Project API keys**
3. Find **service_role** (NOT anon)
4. Click **Reveal** or **Copy**
5. Copy the long key that starts with `eyJ...`

⚠️ **IMPORTANT**: This is a secret key! Never commit it to Git or share it publicly.

---

## Quick Reference: All 3 Environment Variables

```env
# Supabase Configuration (REQUIRED for contact form)
NUXT_PUBLIC_SUPABASE_URL=https://mjgwoukwyqwoectxfwqv.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3dvdWt3eXF3b2VjdHhmd3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjAzNjcsImV4cCI6MjA3MDMzNjM2N30.3ee-rHN_BYQKaZmLOTiyoVxU4fYLDnNnfToI8veH5F8
NUXT_SUPABASE_SERVICE_ROLE_KEY=get_from_supabase_dashboard

# Optional (for AMA feature)
FIRECRAWL_API_KEY=fc-b57fb764d0f24f4ab0a961b51582cdf2
DEEPSEEK_API_KEY=sk-739f40cb4da84e788d966f776b11ac0d
```

---

## Verification Steps

### After Adding Variables and Redeploying:

1. **Visit your live site's contact page**
2. **Fill out the form**
3. **Submit**
4. **Should see success message!** ✅

### If Still Not Working:

1. **Check deployment logs** for errors
2. **Verify all 3 variables are set** in your platform
3. **Make sure you redeployed** after adding variables
4. **Check variable names match exactly** (case-sensitive!)

---

## Common Issues

### Issue 1: "Still getting error after adding variables"
**Solution:** You must redeploy/restart after adding environment variables. They don't apply automatically.

### Issue 2: "Can't find where to add variables"
**Solution:** Tell me which platform you're using (Vercel/Netlify/other) and I'll give specific instructions.

### Issue 3: "Don't know my deployment platform"
**Solution:** Check your Git repository settings or look at your domain's DNS records to see where it points.

---

## Need Help?

Tell me:
1. Which platform is your site deployed on?
2. What's your live site URL?
3. Any error messages in deployment logs?

I'll help you get it working! 🚀
