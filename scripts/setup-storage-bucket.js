/**
 * Setup Supabase Storage Bucket for File Uploads
 * Run this script to create the website-assets bucket and policies
 */

import { createClient } from '@supabase/supabase-js'

// Get credentials from environment
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!')
  console.error('Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupStorageBucket() {
  console.log('🚀 Setting up Supabase Storage...\n')

  try {
    // Step 1: Create the bucket
    console.log('1️⃣ Creating website-assets bucket...')
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('website-assets', {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/svg+xml',
        'image/webp',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
    })

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('✅ Bucket already exists, skipping creation')
      } else {
        throw bucketError
      }
    } else {
      console.log('✅ Bucket created successfully')
    }

    // Step 2: Set up storage policies using SQL
    console.log('\n2️⃣ Setting up storage policies...')
    
    const policies = [
      {
        name: 'Allow authenticated users to upload',
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow authenticated users to upload"
          ON storage.objects FOR INSERT
          TO authenticated
          WITH CHECK (bucket_id = 'website-assets');
        `
      },
      {
        name: 'Allow public read access',
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow public read access"
          ON storage.objects FOR SELECT
          TO public
          USING (bucket_id = 'website-assets');
        `
      },
      {
        name: 'Allow users to delete their own files',
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow users to delete their own files"
          ON storage.objects FOR DELETE
          TO authenticated
          USING (bucket_id = 'website-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
        `
      }
    ]

    for (const policy of policies) {
      console.log(`   Setting up: ${policy.name}...`)
      const { error: policyError } = await supabase.rpc('exec_sql', { 
        sql: policy.sql 
      })

      // If exec_sql doesn't exist, try direct SQL execution
      if (policyError && policyError.message.includes('function')) {
        const { error: directError } = await supabase
          .from('_sql')
          .select('*')
          .limit(0) // Just to execute
        
        if (directError) {
          console.log(`   ⚠️  Could not auto-create policy: ${policy.name}`)
          console.log(`   Please run this SQL manually in Supabase SQL Editor:`)
          console.log(`   ${policy.sql}\n`)
        }
      } else if (policyError) {
        console.log(`   ⚠️  Policy may already exist or needs manual setup: ${policy.name}`)
      } else {
        console.log(`   ✅ ${policy.name}`)
      }
    }

    console.log('\n✅ Storage setup complete!')
    console.log('\n📝 Manual SQL (if policies failed):')
    console.log('Run this in Supabase SQL Editor if policies were not created:\n')
    console.log(policies.map(p => p.sql).join('\n'))
    
  } catch (error) {
    console.error('\n❌ Error setting up storage:', error.message)
    console.error('\n📝 Please run these SQL commands manually in Supabase SQL Editor:')
    console.log(`
-- Create bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'website-assets', 
  'website-assets', 
  true,
  52428800,
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Add policies
CREATE POLICY IF NOT EXISTS "Allow authenticated users to upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'website-assets');

CREATE POLICY IF NOT EXISTS "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'website-assets');

CREATE POLICY IF NOT EXISTS "Allow users to delete their own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'website-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
    `)
    process.exit(1)
  }
}

setupStorageBucket()
