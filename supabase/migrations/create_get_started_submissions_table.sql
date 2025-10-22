-- Create get_started_submissions table
CREATE TABLE IF NOT EXISTS public.get_started_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  selected_plan TEXT NOT NULL CHECK (selected_plan IN ('small', 'ecom_large', 'startup')),
  status TEXT DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'payment_completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_get_started_submissions_user_id ON public.get_started_submissions(user_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_get_started_submissions_status ON public.get_started_submissions(status);

-- Enable Row Level Security
ALTER TABLE public.get_started_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own submissions
CREATE POLICY "Users can view own submissions"
  ON public.get_started_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own submissions
CREATE POLICY "Users can insert own submissions"
  ON public.get_started_submissions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own submissions
CREATE POLICY "Users can update own submissions"
  ON public.get_started_submissions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_get_started_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER set_get_started_submissions_updated_at
  BEFORE UPDATE ON public.get_started_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_get_started_submissions_updated_at();

-- Add comment to table
COMMENT ON TABLE public.get_started_submissions IS 'Stores get-started form submissions with user contact info and plan selection';
