-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source TEXT DEFAULT 'website'
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated and anonymous users
CREATE POLICY "Allow insert for all users" ON public.waitlist
    FOR INSERT WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Allow read for authenticated users" ON public.waitlist
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow updates for authenticated users only
CREATE POLICY "Allow update for authenticated users" ON public.waitlist
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow deletes for authenticated users only
CREATE POLICY "Allow delete for authenticated users" ON public.waitlist
    FOR DELETE USING (auth.role() = 'authenticated'); 