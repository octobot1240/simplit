#!/bin/bash
SUPABASE_URL="https://eeywlnvxbhpzutenukqb.supabase.co"
SUPABASE_SERVICE_KEY="$(grep SUPABASE_SERVICE_ROLE_KEY .env.local | cut -d '=' -f2)"

# Run migration via psql if available, otherwise via Supabase REST API
if command -v psql &> /dev/null; then
  echo "Running migration via psql..."
  PGPASSWORD="${SUPABASE_SERVICE_KEY}" psql -h db.eeywlnvxbhpzutenukqb.supabase.co -U postgres -d postgres -f scripts/migrate.sql
else
  echo "psql not found. Use Supabase dashboard SQL editor to run scripts/migrate.sql"
  echo "Or install supabase CLI: brew install supabase/tap/supabase"
fi
