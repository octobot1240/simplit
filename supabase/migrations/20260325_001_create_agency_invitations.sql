CREATE TABLE IF NOT EXISTS agency_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  agency_name TEXT NOT NULL,
  agency_email TEXT,
  message TEXT NOT NULL,
  property_type TEXT,
  neighborhood TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE agency_invitations ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users read own invitations' AND tablename = 'agency_invitations') THEN
    CREATE POLICY "Users read own invitations" ON agency_invitations FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users update own invitations' AND tablename = 'agency_invitations') THEN
    CREATE POLICY "Users update own invitations" ON agency_invitations FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_invitations_user_id ON agency_invitations(user_id);
