-- Create v2_projects table
CREATE TABLE IF NOT EXISTS public.v2_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    link TEXT,
    github TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create v2_certifications table
CREATE TABLE IF NOT EXISTS public.v2_certifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date TEXT NOT NULL,
    link TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.v2_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.v2_projects FOR SELECT USING (true);

CREATE POLICY "Public certifications are viewable by everyone." 
ON public.v2_certifications FOR SELECT USING (true);

-- Since we are doing custom authentication in the Next.js app via an admin dashboard,
-- the Next.js API routes will use the service_role key to bypass RLS for inserts/updates/deletes.
-- Alternatively, we can allow anon to modify if they have a specific secret, but service_role is safer.
-- Let's create an API route for admin actions or use Server Actions with service_role.
