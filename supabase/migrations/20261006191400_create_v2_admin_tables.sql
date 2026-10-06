-- ====================================================================
-- IlyanOS v2.0 - Complete Dynamic Portfolio Schema & Seed Migration
-- ====================================================================

-- 1. Site Configuration & Singleton Sections (Profile, Socials, Stats, TechStack, Spotlight)
CREATE TABLE IF NOT EXISTS public.v2_site_config (
    key TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Work Experience Timeline Table
CREATE TABLE IF NOT EXISTS public.v2_experience (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    location TEXT DEFAULT 'Remote',
    current BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Education Table
CREATE TABLE IF NOT EXISTS public.v2_education (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    period TEXT NOT NULL,
    location TEXT NOT NULL,
    details TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.v2_site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_education ENABLE ROW LEVEL SECURITY;

-- Create Policies for Public Read
DROP POLICY IF EXISTS "Public site config is viewable by everyone" ON public.v2_site_config;
CREATE POLICY "Public site config is viewable by everyone" ON public.v2_site_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public experience is viewable by everyone" ON public.v2_experience;
CREATE POLICY "Public experience is viewable by everyone" ON public.v2_experience FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public education is viewable by everyone" ON public.v2_education;
CREATE POLICY "Public education is viewable by everyone" ON public.v2_education FOR SELECT USING (true);

-- Seed Initial Data into v2_site_config
INSERT INTO public.v2_site_config (key, data) VALUES
('profile', '{
  "name": "Ilyan Khan",
  "initials": "IK",
  "role": "COMPUTER SYSTEMS ENGINEERING @ QUEST NAWABSHAH",
  "headline": "Software Developer & AI Engineer. Real-time NLP pipelines & high-speed full-stack applications.",
  "subline": "GenAI Specialist — LoRA Fine-Tuning · RAG Architectures · Next.js 15 & React · Python & C++ · Open to work: Remote / Global",
  "about": "Computer Systems Engineering student at QUEST Nawabshah architecting real-time Generative AI pipelines and high-performance full-stack software.\n\nFocused on turning deep learning research (LoRA fine-tuning, vector RAG retrieval, and AST security firewalls) into fast, production-grade software.",
  "location": "Nawabshah, Sindh, Pakistan",
  "cvUrl": "/cv.pdf"
}'::jsonb),
('contacts', '{
  "email": "ilyaankhan342@gmail.com",
  "phone": "+92 321 3379342",
  "whatsapp": "https://wa.me/923213379342",
  "github": "https://github.com/Ilyan321",
  "linkedin": "https://linkedin.com/in/ilyan-khan-480341359",
  "huggingface": "https://huggingface.co/Ilyankhan69"
}'::jsonb),
('stats', '[
  { "value": "12+", "label": "Projects" },
  { "value": "4", "label": "Internships" },
  { "value": "7", "label": "Certificates" },
  { "value": "25+", "label": "Skills" }
]'::jsonb),
('tech_stack', '[
  { "group": "Core Languages", "items": ["Python", "C++", "TypeScript", "JavaScript", "SQL", "C", "HTML/CSS"] },
  { "group": "Web & Frameworks", "items": ["React", "Next.js 15", "Streamlit", "Tailwind CSS", "REST APIs", "Node.js"] },
  { "group": "AI & Machine Learning", "items": ["LoRA / QLoRA", "FAISS RAG", "LangChain", "PyTorch", "Hugging Face", "Unsloth", "Pandas", "Altair"] },
  { "group": "Backend & Systems", "items": ["FastAPI", "Flask", "C++ Systems / OOP", "Python AST Safety", "Docker", "Linux / Bash"] },
  { "group": "Databases & Cloud", "items": ["PostgreSQL", "Supabase", "Git & GitHub", "Vercel", "Hugging Face Spaces"] }
]'::jsonb),
('spotlight', '{
  "eyebrow": "FEATURED AI ARCHITECTURE — SPIDER BENCHMARK & AST SECURITY FIREWALL",
  "title": "Schema-Aware SQL Agent: Autonomous NLP-to-SQL Pipeline",
  "description": "A production-grade Natural Language to SQL autonomous pipeline powered by a LoRA fine-tuned LLaMA-3-8B model trained on the Yale Spider benchmark, shielded by a deterministic Python AST security firewall that guarantees 100% safe, read-only query execution and eliminates schema leakage.",
  "stats": [
    { "label": "100%", "sub": "AST mutation safety" },
    { "label": "4-bit", "sub": "QLoRA quantization" },
    { "label": "0ms", "sub": "destructive query leakage" }
  ],
  "stackTags": ["PyTorch", "LLaMA-3-8B", "Unsloth", "LoRA/PEFT", "SQLite", "Hugging Face Hub", "Python AST"],
  "link": "https://github.com/Ilyan321/Schema-Aware-SQL-Agent",
  "huggingFaceLink": "https://huggingface.co/Ilyankhan69/schema-aware-sql-agent",
  "diagnostics": [
    { "term": "Model Core", "value": "LLaMA-3-8B-Instruct fine-tuned via QLoRA / Unsloth" },
    { "term": "Security Firewall", "value": "Custom Python AST parser blocking DROP / DELETE / ALTER" },
    { "term": "Dataset Benchmark", "value": "Yale Spider Multi-Table Complex Join Benchmark" },
    { "term": "Deployment Hub", "value": "Hugging Face Model Hub with automated verification pipeline" }
  ]
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Seed Initial Experience
INSERT INTO public.v2_experience (role, company, period, location, current, description, skills, position) VALUES
('AI Intern', 'FlyRank AI', 'Jun 2026 – Present', 'Remote', true, 'Working on General AI fluency, knowledge engineering, and software construction pipelines for organic growth automation.', ARRAY['GenAI', 'Knowledge Engineering', 'Data Science', 'Python', 'Software Construction'], 0),
('Python Developer Intern', 'IntelliVerse', 'Mar 2026 – May 2026', 'Remote', false, 'Engineered Python-based Generative AI workflows, LLM agent orchestration, and asynchronous backend endpoints for real-time model inference pipelines.', ARRAY['Python', 'LLM Orchestration', 'FastAPI', 'Real-Time Inference'], 1)
ON CONFLICT DO NOTHING;

-- Seed Initial Education
INSERT INTO public.v2_education (institution, degree, period, location, details, position) VALUES
('Quaid-e-Awam University of Engineering, Science & Technology (QUEST)', 'Bachelor of Engineering (BE) in Computer System Engineering', 'Oct 2024 – Oct 2028 (Expected)', 'Nawabshah, Sindh, Pakistan', '2nd Year Engineering Student · 4th Semester GPA: 3.50', 0),
('IBA Public School Larkana', 'Intermediate (HSSC) — Pre-Engineering', 'Aug 2022 – Aug 2024', 'Larkana, Sindh, Pakistan', 'Higher Secondary School Certificate with distinction in Pre-Engineering', 1)
ON CONFLICT DO NOTHING;
