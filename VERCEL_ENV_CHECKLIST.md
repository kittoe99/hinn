# Vercel Environment Variables Checklist

## CRITICAL: Exact Variable Names Required

In Vercel, go to your project → Settings → Environment Variables

You need EXACTLY these 3 variables with EXACTLY these names:

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
    "supabaseServiceRoleKey": "SET"
  }
}
```

If any show "NOT SET", that variable is missing or incorrectly named.
