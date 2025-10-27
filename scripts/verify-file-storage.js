/**
 * File Storage Verification Script
 * 
 * This script verifies that uploaded files are actually stored in Supabase Storage
 * and that the database contains valid references to them.
 * 
 * Run with: node scripts/verify-file-storage.js
 */

import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY || process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyFileStorage() {
  console.log('🔍 Verifying File Storage Implementation...\n')

  // 1. Check if storage bucket exists
  console.log('1️⃣  Checking storage bucket...')
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
  
  if (bucketsError) {
    console.error('❌ Error listing buckets:', bucketsError.message)
    return
  }

  const websiteAssetsBucket = buckets.find(b => b.name === 'website-assets')
  if (websiteAssetsBucket) {
    console.log('✅ Storage bucket "website-assets" exists')
    console.log(`   - Public: ${websiteAssetsBucket.public}`)
    console.log(`   - Created: ${websiteAssetsBucket.created_at}`)
  } else {
    console.log('⚠️  Storage bucket "website-assets" not found')
    console.log('   Run the SQL commands in FILE_UPLOAD_SETUP.md to create it')
    return
  }

  // 2. Check database schema
  console.log('\n2️⃣  Checking database schema...')
  const { data: columns, error: schemaError } = await supabase
    .from('websites')
    .select('uploaded_logo, uploaded_assets')
    .limit(1)

  if (schemaError) {
    console.error('❌ Error checking schema:', schemaError.message)
    console.log('   Run: supabase/migrations/20250127_ensure_file_upload_columns.sql')
    return
  }

  console.log('✅ Database columns exist: uploaded_logo, uploaded_assets')

  // 3. Check for websites with uploaded files
  console.log('\n3️⃣  Checking for uploaded files...')
  const { data: websites, error: websitesError } = await supabase
    .from('websites')
    .select('id, name, uploaded_logo, uploaded_assets')
    .or('uploaded_logo.not.is.null,uploaded_assets.neq.[]')

  if (websitesError) {
    console.error('❌ Error fetching websites:', websitesError.message)
    return
  }

  if (!websites || websites.length === 0) {
    console.log('ℹ️  No websites with uploaded files found yet')
    console.log('   Complete the onboarding form to test file uploads')
    return
  }

  console.log(`✅ Found ${websites.length} website(s) with uploaded files:\n`)

  // 4. Verify each file
  for (const website of websites) {
    console.log(`📄 Website: ${website.name} (${website.id})`)

    // Check logo
    if (website.uploaded_logo) {
      console.log(`   Logo: ${website.uploaded_logo}`)
      
      // Try to fetch the file to verify it exists
      try {
        const response = await fetch(website.uploaded_logo, { method: 'HEAD' })
        if (response.ok) {
          const size = response.headers.get('content-length')
          const type = response.headers.get('content-type')
          console.log(`   ✅ Logo file exists (${size} bytes, ${type})`)
        } else {
          console.log(`   ⚠️  Logo URL returns ${response.status}`)
        }
      } catch (error) {
        console.log(`   ❌ Error accessing logo: ${error.message}`)
      }
    }

    // Check assets
    if (website.uploaded_assets && website.uploaded_assets.length > 0) {
      console.log(`   Assets: ${website.uploaded_assets.length} file(s)`)
      
      for (const asset of website.uploaded_assets) {
        console.log(`   - ${asset.name} (${asset.size} bytes)`)
        console.log(`     ${asset.url}`)
        
        try {
          const response = await fetch(asset.url, { method: 'HEAD' })
          if (response.ok) {
            console.log(`     ✅ File exists and is accessible`)
          } else {
            console.log(`     ⚠️  URL returns ${response.status}`)
          }
        } catch (error) {
          console.log(`     ❌ Error accessing file: ${error.message}`)
        }
      }
    }
    console.log('')
  }

  // 5. List files in storage bucket
  console.log('4️⃣  Listing files in storage bucket...')
  const { data: files, error: listError } = await supabase.storage
    .from('website-assets')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' }
    })

  if (listError) {
    console.error('❌ Error listing files:', listError.message)
    return
  }

  if (!files || files.length === 0) {
    console.log('ℹ️  No files in storage bucket yet')
  } else {
    console.log(`✅ Found ${files.length} item(s) in storage:`)
    files.slice(0, 10).forEach(file => {
      console.log(`   - ${file.name} (${file.metadata?.size || 'unknown'} bytes)`)
    })
    if (files.length > 10) {
      console.log(`   ... and ${files.length - 10} more`)
    }
  }

  console.log('\n✅ File storage verification complete!')
  console.log('\n📝 Summary:')
  console.log('   - Storage bucket: ✓')
  console.log('   - Database schema: ✓')
  console.log(`   - Websites with files: ${websites.length}`)
  console.log(`   - Files in storage: ${files?.length || 0}`)
  console.log('\n💡 To test uploads:')
  console.log('   1. Go to /onboarding')
  console.log('   2. Complete the form and upload a logo/assets')
  console.log('   3. Run this script again to verify files were stored')
}

// Run verification
verifyFileStorage().catch(console.error)
