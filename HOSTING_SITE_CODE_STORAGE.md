# Hosting Page – Site Code Storage & Frontend Interaction

This document explains how the **Hosting** page works with your **Supabase Storage buckets** to save and load website code.

---

## 1. Buckets Involved

The Hosting flow touches three conceptual storage layers:

1. **`website` bucket**  
   Stores the **generated site code** (HTML/CSS/JS and related files) per website.

2. **`website-assets` bucket**  
   Stores **user-uploaded onboarding assets** (logos, PDFs, brand files) that the generated site can reference.

3. **`screenshots` bucket**  
   Stores **cached screenshots** of websites for fast preview in the dashboard.

The Hosting page mainly interacts **indirectly** with these through Nuxt server APIs.

---

## 2. `website` Bucket – Site Code Storage

**Bucket:** `website`  
**Purpose:** Store the canonical source of truth for each website’s generated code.

### 2.1 Structure

```text
website/
├── {website-id-1}/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/
│       ├── logo.png
│       └── hero.jpg
├── {website-id-2}/
│   ├── index.html
│   └── ...
```

Where:
- `{website-id}` = `websites.id` (or `websites.storage_path` if defined explicitly).
- Each folder contains the full code for that site.

### 2.2 Database Link: `websites.storage_path`

The `websites` table includes:
- `storage_path` (text): path prefix under the `website` bucket.
- Typically equals the website ID as text.

This allows the app to compute paths like:

```ts
const basePath = website.storage_path || website.id
const htmlPath = `${basePath}/index.html`
```

---

## 3. Security – Who Can Access Site Code

The `website` bucket is **private**. Access is controlled by Row-Level Security (RLS) policies in Supabase.

Example policy pattern from `WEBSITE_STORAGE_SETUP.md`:

```sql
bucket_id = 'website' 
AND (storage.foldername(name))[1] IN (
  SELECT id::text 
  FROM websites 
  WHERE user_id = auth.uid()
)
```

This is applied for:
- INSERT (upload)
- SELECT (read)
- UPDATE (overwrite)
- DELETE (remove)

**Effect:**
- A user can only read/write files in `website/{website-id}/...` where they own the website (`websites.user_id = auth.uid()`).
- No cross-tenant access to other users’ site code.

The Hosting page never talks to the bucket directly from the browser; it always goes through **Nuxt server APIs**, which obey these policies.

---

## 4. How the Hosting Page Saves Site Code

### 4.1 Frontend (Hosting Page)

When the user builds a site in the Hosting page (AI generator + editor):

1. User generates or edits HTML/CSS/JS.
2. When they click **Save / Publish**, the Hosting page sends a request to a Nuxt API endpoint (under `server/api/hosting/...`) with:
   - `websiteId`
   - Generated HTML (and optional CSS/JS)
   - Any additional metadata.

Pseudo-flow:

```ts
await $fetch('/api/hosting/save-site-code', {
  method: 'POST',
  body: {
    websiteId,
    html: aiHtml.value,
    css: cssCode,
    js: jsCode
  }
})
```

### 4.2 Backend (Nuxt Server API)

The server endpoint then:

1. Resolves the **storage path**:

   ```ts
   const basePath = website.storage_path || websiteId
   ```

2. Writes files into the `website` bucket:

   ```ts
   await supabase.storage
     .from('website')
     .upload(`${basePath}/index.html`, htmlBufferOrString, {
       contentType: 'text/html',
       upsert: true
     })

   // Optionally also styles.css, script.js, etc.
   ```

3. Optionally updates `websites` row (e.g., set `storage_path` if empty, set status flags).

**Key Point:**  
The Hosting page **never stores large HTML/JS in the database directly**. Instead, it uploads code to `website` storage and only stores references/metadata in `websites`.

---

## 5. How the Hosting Page Loads Site Code

When the Hosting page needs to **preview** or **edit** an existing site:

### 5.1 Frontend Request

1. Hosting page loads with a selected `websiteId`.
2. It calls a Nuxt API endpoint (e.g. `/api/websites/[id]` or a hosting-specific endpoint) to fetch:
   - Website metadata (from the `websites` table)
   - The current site HTML from the `website` bucket.

### 5.2 Backend Fetch

The server handler:

1. Queries `websites` by ID to get `storage_path` and other fields.
2. Reads the HTML file from the `website` bucket:

   ```ts
   const basePath = website.storage_path || websiteId

   const { data, error } = await supabase.storage
     .from('website')
     .download(`${basePath}/index.html`)
   ```

3. Converts the binary/Blob to string and returns it in the JSON response.

### 5.3 Frontend Usage

The Hosting page then:

- Sets `aiHtml.value` = loaded HTML
- Feeds this HTML into:
  - The preview iframe
  - The component/section detection system
  - The AI editing flow

This allows the user to **continue editing** previously saved code rather than starting from scratch.

---

## 6. Relationship to `website-assets` Bucket

The Hosting page may also use assets uploaded during onboarding.

**`website-assets` bucket:**
- Stores **logos and files** uploaded via `pages/onboarding.vue` and `/api/upload/website-assets`.
- Paths: `website-assets/{user_id}/{website_id}/...`.
- URLs are stored directly in the `websites` table:
  - `uploaded_logo` (TEXT)
  - `uploaded_assets` (JSONB array)

The Hosting page can:
- Read these URLs from `websites` via `/api/websites/[id]`.
- Inject them into the generated HTML as `<img src="...">`, `<a href="...">`, etc.

**Difference vs `website` bucket:**
- `website-assets` → raw user-uploaded assets (logo, PDFs, etc.).
- `website` → final generated site code and any derived static assets.

---

## 7. Relationship to `screenshots` Bucket

The Hosting page and dashboard use **screenshots** to show visual previews.

**Flow (from `SCREENSHOT_STORAGE_SETUP.md`):**

1. First time a website is opened:
   - API checks `websites.screenshot_url`.
   - If empty, it uses Firecrawl to capture a screenshot.
   - Uploads screenshot to `screenshots` bucket.
   - Saves public URL to `websites.screenshot_url`.

2. Next time:
   - API returns `screenshot_url` directly.
   - Frontend displays cached screenshot.

The code in `website` bucket is what Firecrawl ultimately renders to generate that screenshot.

---

## 8. Typical End-to-End Flow from Hosting Page

```text
1. User opens Hosting page
   ↓
2. Hosting page fetches website metadata + HTML via API
   ↓
3. API reads HTML from `website/{website-id}/index.html`
   ↓
4. Frontend loads HTML into AI editor + preview iframe
   ↓
5. User edits with AI (section selection, element editing, etc.)
   ↓
6. User clicks "Save / Publish"
   ↓
7. Hosting page sends HTML/CSS/JS to save API
   ↓
8. API uploads files into `website/{website-id}/...` in Supabase Storage
   ↓
9. Dashboard and public renderer use these files as the canonical site code
```

---

## 9. Why This Design

- **Scalable:** Large HTML/CSS/JS stored in object storage, not in DB rows.
- **Secure:** Private `website` bucket + RLS ensures only owners access their site code.
- **Flexible:** Frontend can re-open and edit the same source HTML any time.
- **Integrated:** Works together with `website-assets` and `screenshots` buckets via the `websites` table.

This is the architecture the **Hosting page** relies on to persist and load generated site code.
