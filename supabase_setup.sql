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

-- Insert default projects
INSERT INTO public.v2_projects (title, description, tags, link, github, position) VALUES
('AI Content Summarizer & Polyglot Translator', 'Article scraping and synthesis platform extracting clean text from web URLs, generating multi-perspective summaries via Groq LLaMA-3, and translating into 7 global languages.', ARRAY['Python', 'Streamlit', 'Groq LLaMA 3', 'BeautifulSoup4'], null, 'https://github.com/Ilyan321/AI_Content_Summarizer', 0),
('Spatial Classroom', 'Gamified Reverse-Tutor AI Platform. Innovative reverse-classroom application implementing the Feynman Technique where users teach a curious AI student.', ARRAY['JavaScript', 'Netlify Edge', 'Groq LLaMA 3', 'HTML5 Canvas'], null, 'https://github.com/Ilyan321/spatial-classroom', 1),
('Slasher-Vision-35mm', 'Custom SDXL Diffusion LoRA for 35mm Retro Cinema. Specialized Low-Rank Adaptation (LoRA) for Stable Diffusion XL designed to synthesize authentic 1980s 35mm film grain, anamorphic flare, and vintage cinematography aesthetics.', ARRAY['PyTorch', 'SDXL', 'Diffusers', 'LoRA / PEFT', 'Hugging Face'], 'https://huggingface.co/Ilyankhan69/slasher-vision-35mm', 'https://github.com/Ilyan321/Slasher-Vision-35mm', 2),
('School Attendance Management System', 'Multi-role school administration platform engineered with Next.js 15 App Router, React Server Components, Tailwind CSS, and structured PRD-driven modular architecture.', ARRAY['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'], null, 'https://github.com/Ilyan321/school-attendance-system', 3),
('Weather AI & Style Advisor', 'Real-time meteorological utility combining OpenWeatherMap sensory feeds with Groq LLaMA 3.3 reasoning for climate-adaptive outfit and outdoor recommendations.', ARRAY['Python', 'Streamlit', 'Groq LLaMA 3.3', 'OpenWeatherMap API'], 'https://huggingface.co/spaces/Ilyankhan69/WeatherApp', 'https://github.com/Ilyan321/Weather_App', 4),
('WhatsApp Web Clone & Webhook Backend', 'High-performance FastAPI async backend on Vercel Serverless paired with a pixel-accurate WhatsApp Web client interface for real-time webhook routing.', ARRAY['Python', 'FastAPI', 'Vercel Serverless', 'JavaScript'], 'https://whatsapp-clone-sigma-wheat.vercel.app', 'https://github.com/Ilyan321/whatsapp-clone', 5),
('Student Expense & Budget Tracker', 'Interactive personal budgeting dashboard built with Python, Streamlit, and Altair charts for expenditure analytics, category breakdowns, and limit triggers.', ARRAY['Python', 'Streamlit', 'Altair Charts', 'Pandas'], null, 'https://github.com/Ilyan321/Student_Expense_Tracker', 6);

-- Insert default certifications
INSERT INTO public.v2_certifications (title, issuer, date, link, position) VALUES
('FlyRank AI Fluency Certificate', 'FlyRank AI', '2026', '/certificates/ai-fluency.pdf', 0),
('Anthropic Claude Code in Action', 'Anthropic', '2025', '/certificates/claude-code-in-action.pdf', 1),
('Anthropic Claude 101', 'Anthropic', '2025', '/certificates/claude-code-101.pdf', 2),
('Google AI Essentials', 'Google', '2025', '/certificates/ai-essentials.png', 3),
('Google Prompting Essentials', 'Google', '2025', '/certificates/prompting-essentials.png', 4),
('Google Cybersecurity Professional Certificate', 'Google / Coursera', '2025 – 2026', '/certificates/cybersecurity.png', 5),
('Google Agile Essentials', 'Google / Coursera', '2025', '/certificates/agile-essentials.png', 6);
