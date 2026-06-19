-- Create dealerships table for onboarding pipeline
CREATE TABLE IF NOT EXISTS dealerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dealership_name TEXT NOT NULL,
  primary_contact_name TEXT NOT NULL,
  primary_contact_email TEXT NOT NULL,
  it_contact_email TEXT NOT NULL,
  ftp_folder_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS) if you plan to restrict this to admin users
-- ALTER TABLE dealerships ENABLE ROW LEVEL SECURITY;

-- Note: Since this is an admin-only ingestion table, we can set policies accordingly
-- For the sake of local testing, we permit service role bypasses or full access if RLS is off.
