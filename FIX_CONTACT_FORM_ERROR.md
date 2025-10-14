# Fix: "Supabase Configuration Missing" Error

## The Problem
The contact form is showing "error submitting form, supabase configuration missing" because the Supabase environment variables are not configured in your `.env` file.

## Quick Fix

### Step 1: Check Current Configuration
Visit: `http://localhost:3000/api/debug/check-env`

You should see:
```json
{
  "supabase": {
    "url": true,
    "anonKey": true,
    "serviceRoleKey": true
  },
  "other": {
    "firecrawl": true,
    "deepseek": true
  }
}
```

If any are `false`, they need to be added to your `.env` file.

### Step 2: Get Your Supabase Credentials

**Option A: From Supabase Dashboard**
1. Go to: https://supabase.com/dashboard
2. Select your project: **hinn.io**
3. Go to: Settings → API
4. Copy these values:
   - **Project URL** → `NUXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `NUXT_SUPABASE_SERVICE_ROLE_KEY`

**Option B: I can get them for you**
I have access to your Supabase project. Would you like me to retrieve the values?

### Step 3: Update Your .env File

Open `c:\Users\User\Desktop\hinn.nuxt\.env` and ensure it has:

```env
# Supabase Configuration (REQUIRED for contact form)
NUXT_PUBLIC_SUPABASE_URL=https://mjgwoukwyqwoectxfwqv.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NUXT_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional (for AMA feature)
FIRECRAWL_API_KEY=fc-b57fb764d0f24f4ab0a961b51582cdf2
DEEPSEEK_API_KEY=sk-739f40cb4da84e788d966f776b11ac0d
```

### Step 4: Restart Dev Server

**Stop the server:**
- Press `Ctrl+C` in your terminal

**Start it again:**
```bash
npm run dev
```

### Step 5: Test the Contact Form

1. Visit: `http://localhost:3000/contact`
2. Fill in all 3 steps
3. Click "Send message"
4. Should see success message! ✅

## Common Issues

### Issue 1: Variables still not found after adding to .env
**Solution:**
- Make sure there are no spaces around the `=` sign
- Make sure the file is named `.env` (not `.env.txt`)
- Restart the dev server

### Issue 2: "Invalid API key" error
**Solution:**
- Double-check you copied the correct keys from Supabase
- Make sure you're using the **service_role** key, not the **anon** key for `NUXT_SUPABASE_SERVICE_ROLE_KEY`

### Issue 3: Still getting errors
**Solution:**
- Check the browser console for detailed error messages
- Check the server terminal for backend errors
- Visit `/api/debug/check-env` to verify which variables are missing

## Example .env File

Here's what your `.env` file should look like:

```env
# Supabase
NUXT_PUBLIC_SUPABASE_URL=https://mjgwoukwyqwoectxfwqv.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NUXT_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI Services (optional)
FIRECRAWL_API_KEY=fc-b57fb764d0f24f4ab0a961b51582cdf2
DEEPSEEK_API_KEY=sk-739f40cb4da84e788d966f776b11ac0d
```

## Verification Steps

1. **Check environment variables:**
   ```
   Visit: http://localhost:3000/api/debug/check-env
   All should be true ✅
   ```

2. **Test contact form:**
   ```
   Visit: http://localhost:3000/contact
   Submit form → Success! ✅
   ```

3. **Check database:**
   ```sql
   SELECT * FROM contact_submissions 
   ORDER BY created_at DESC 
   LIMIT 1;
   ```
   Should see your submission ✅

## Need Help?

If you're still getting errors:
1. Share the output from `/api/debug/check-env`
2. Share any error messages from browser console
3. Share any error messages from server terminal

I can help you get the correct Supabase credentials if needed!
