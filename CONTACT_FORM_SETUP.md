# Contact Form - Database Integration

## Overview
The contact form is now fully integrated with the Supabase database, capturing all form fields and providing success/error feedback.

## Database Schema

### Updated `contact_submissions` Table

**New Fields Added:**
- `first_name` (TEXT) - User's first name
- `last_name` (TEXT) - User's last name  
- `company` (TEXT) - Company name (optional)
- `phone` (TEXT) - Phone number (optional)
- `interests` (JSONB) - Array of selected interests
- `timeline` (TEXT) - Project timeline
- `budget` (TEXT) - Budget range
- `notes` (TEXT) - Additional notes

**Existing Fields:**
- `id` (UUID) - Primary key
- `created_at` (TIMESTAMP) - Submission timestamp
- `name` (TEXT) - Full name (auto-generated from first + last)
- `email` (TEXT) - Email address
- `subject` (TEXT) - Auto-generated subject
- `message` (TEXT) - Main message
- `metadata` (JSONB) - Additional metadata (IP, user agent, etc.)
- `status` (TEXT) - Status (new/read/replied)

## Form Fields

### Step 1: Contact Details
- **First Name*** - Required
- **Last Name*** - Required
- **Work Email*** - Required
- **Company** - Optional
- **Phone** - Optional

### Step 2: Project Context
- **Interests*** - Multi-select (Website, AI agents, Marketing, etc.)
- **Timeline*** - Single select (ASAP, 2-4 weeks, 1-2 months, Flexible)
- **Budget Range*** - Dropdown (Under $5k, $5k-$15k, $15k-$30k, $30k+)
- **Notes** - Optional textarea

### Step 3: Final Message
- **Message*** - Required textarea

## API Endpoint

### POST `/api/contact/submit`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@company.com",
  "company": "Acme Inc",
  "phone": "+1 (555) 000-0000",
  "interests": ["website", "marketing"],
  "timeline": "2-4 weeks",
  "budget": "15-30k",
  "notes": "Looking for a complete rebrand",
  "message": "We need help with our website and marketing strategy..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you within one business day.",
  "submissionId": "uuid-here"
}
```

**Error Response (400/500):**
```json
{
  "statusCode": 400,
  "statusMessage": "Missing required fields: firstName, lastName, email, and message are required"
}
```

## Features

### Frontend Features
- ✅ Multi-step form (3 steps)
- ✅ Form validation
- ✅ Loading states
- ✅ Success message
- ✅ Error handling
- ✅ Form reset after submission
- ✅ Smooth scrolling between steps
- ✅ Responsive design

### Backend Features
- ✅ Input validation
- ✅ Email format validation
- ✅ Database insertion
- ✅ Metadata capture (IP, user agent, referrer)
- ✅ Auto-generated subject line
- ✅ Status tracking
- ✅ Error handling
- ✅ Logging

### Metadata Captured
```json
{
  "submitted_at": "2025-01-14T17:30:00.000Z",
  "user_agent": "Mozilla/5.0...",
  "ip": "192.168.1.1",
  "referrer": "https://example.com/page"
}
```

## Testing

### Test Submission
1. Go to `/contact`
2. Fill in Step 1 (contact details)
3. Click "Continue"
4. Fill in Step 2 (project context)
5. Click "Continue"
6. Fill in Step 3 (message)
7. Click "Send message"
8. See success message

### Check Database
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 1;
```

### Expected Data
```sql
{
  "id": "uuid",
  "first_name": "John",
  "last_name": "Doe",
  "name": "John Doe",
  "email": "john@company.com",
  "company": "Acme Inc",
  "phone": "+1 (555) 000-0000",
  "interests": ["website", "marketing"],
  "timeline": "2-4 weeks",
  "budget": "15-30k",
  "notes": "Looking for a complete rebrand",
  "message": "We need help with...",
  "subject": "Contact from John Doe",
  "status": "new",
  "metadata": {...},
  "created_at": "2025-01-14T17:30:00.000Z"
}
```

## Files Modified

### 1. Database Migration
- **File**: Applied via Supabase MCP
- **Changes**: Added new columns to `contact_submissions` table

### 2. API Endpoint
- **File**: `server/api/contact/submit.post.ts`
- **Purpose**: Handle form submissions and save to database
- **Features**: Validation, Supabase integration, error handling

### 3. Contact Page
- **File**: `pages/contact.vue`
- **Changes**:
  - Added API integration
  - Added success/error states
  - Added loading states
  - Added form reset logic

## Environment Variables Required

```env
NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
NUXT_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Future Enhancements

### Email Notifications
Add email notifications when form is submitted:
```typescript
// In server/api/contact/submit.post.ts
await sendContactNotification({
  to: 'hello@hinn.studio',
  subject: `New Contact: ${firstName} ${lastName}`,
  data: contactData
})
```

### Admin Dashboard
Create admin page to view submissions:
- `/admin/contacts` - List all submissions
- Filter by status (new/read/replied)
- Mark as read/replied
- Quick reply functionality

### Auto-Response Email
Send confirmation email to user:
```typescript
await sendConfirmationEmail({
  to: email,
  name: firstName,
  message: 'Thank you for contacting us...'
})
```

### Analytics
Track form submissions:
- Conversion rate
- Drop-off by step
- Most common interests
- Average response time

## Troubleshooting

### Issue: Form not submitting
**Check:**
1. Browser console for errors
2. Network tab for API response
3. Server logs for backend errors

### Issue: Database error
**Check:**
1. Supabase connection
2. Environment variables
3. Table permissions (RLS)
4. Column names match

### Issue: Missing data
**Check:**
1. Form validation
2. Required fields
3. API request body
4. Database constraints

## Security

### RLS (Row Level Security)
The `contact_submissions` table has RLS enabled. Ensure policies allow:
- ✅ INSERT for anonymous users (form submissions)
- ✅ SELECT for authenticated admins only
- ✅ UPDATE for authenticated admins only

### Data Protection
- Email addresses are lowercased and trimmed
- Phone numbers stored as-is
- Metadata includes IP for spam prevention
- No sensitive data in logs

## Success! 🎉

The contact form is now fully functional and integrated with your database. All submissions are captured with detailed information for follow-up.
