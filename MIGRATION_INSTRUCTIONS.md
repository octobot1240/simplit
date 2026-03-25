# Database Migration Instructions

The database schema needs to be applied to Supabase before the app will work.

## Option 1: Supabase Dashboard (Recommended)

1. Go to https://supabase.com/dashboard/project/eeywlnvxbhpzutenukqb
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `scripts/migrate.sql`
5. Paste into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

## Option 2: Supabase CLI

```bash
# Install Supabase CLI if not already installed
brew install supabase/tap/supabase

# Link to project
supabase link --project-ref eeywlnvxbhpzutenukqb

# Run migration
supabase db push --file scripts/migrate.sql
```

## What the Migration Does

- Creates `profiles` table (extends auth.users)
- Creates `documents` table with RLS policies
- Creates `subscriptions` table
- Creates `agency_invitations` table  
- Sets up storage bucket `documents` with policies
- Creates trigger to auto-create profile + subscription on signup

## Verify Migration

After running, check:

1. Tables exist: `profiles`, `documents`, `subscriptions`, `agency_invitations`
2. Storage bucket `documents` exists
3. RLS policies are enabled on all tables
4. Trigger `on_auth_user_created` exists

## Test

1. Sign up a new user at http://localhost:3000/registro
2. Check that profile + subscription records were auto-created
3. Upload a document - should appear in storage and `documents` table
