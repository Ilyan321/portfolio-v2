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

-- Insert default projects
INSERT INTO public.v2_projects (title, description, tags, link, github, position) VALUES
('Schema-Aware SQL Agent', 'Production-grade natural language query compiler powered by a LoRA fine-tuned LLaMA-3-8B model on the Yale Spider benchmark. Features a deterministic Python Abstract Syntax Tree (AST) validator that mathematically prevents destructive mutations and schema exposure.', ARRAY['PyTorch', 'LLaMA-3-8B', 'Unsloth', 'LoRA', 'Hugging Face Hub', 'SQLite'], 'https://huggingface.co/Ilyankhan69/schema-aware-sql-agent', 'https://github.com/Ilyan321/Schema-Aware-SQL-Agent', 0),
('The Hogwarts Archivist', 'Enterprise-grade Retrieval-Augmented Generation (RAG) conversational intelligence system. Combines LangChain vector search, FAISS similarity indexing, and Groq LLaMA-3 high-speed inference to deliver verifiable, paragraph-exact literary citations with zero hallucination.', ARRAY['LangChain', 'FAISS', 'Groq LLaMA-3', 'Sentence Transformers', 'Streamlit', 'PyPDF'], 'https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist', 'https://github.com/Ilyan321/Hogwarts_Archivist', 1),
('VibeGuard', 'Automated Trust & Safety NLP pipeline using a fine-tuned DistilBERT transformer to classify toxic content across 6 risk vectors with 86.67% accuracy and sub-50ms CPU/GPU inference latency.', ARRAY['DistilBERT', 'PyTorch', 'Transformers', 'Streamlit', 'Scikit-Learn'], 'https://huggingface.co/spaces/Ilyan321/vibeguard', 'https://github.com/Ilyan321/VibeGuard', 2),
('EduFocus Attendance Portal', 'Modern full-stack academic attendance tracking Single Page Application with bi-directional cloud syncing via Supabase PostgreSQL, Row-Level Security (RLS), quick-click batch status recording, and interactive classroom analytics.', ARRAY['React 18', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'TypeScript'], 'https://Ilyan321.github.io/attendance-app/', 'https://github.com/Ilyan321/attendance-app', 3),
('Email Spam Classifier', 'End-to-end NLP classification pipeline fine-tuning a DistilBERT transformer on the Enron email dataset, trained with fp16 mixed-precision on dual T4 GPUs with a public inference widget on Hugging Face.', ARRAY['Python', 'PyTorch', 'DistilBERT', 'Hugging Face Hub', 'Kaggle GPU'], 'https://huggingface.co/Ilyankhan69/email-spam-filter', 'https://github.com/Ilyan321/email-spam-filter-model', 4),
('Spatial Classroom', 'Innovative reverse-classroom application implementing the Feynman Technique where users teach a curious AI student with real-time emotional state machines powered by Groq LLaMA-3 and Netlify Edge Functions.', ARRAY['JavaScript', 'Netlify Edge', 'Groq LLaMA 3', 'HTML5 Canvas'], null, 'https://github.com/Ilyan321/spatial-classroom', 5),
('Slasher-Vision-35mm', 'Specialized Low-Rank Adaptation (LoRA) for Stable Diffusion XL designed to synthesize authentic 1980s 35mm film grain, anamorphic flare, and vintage cinematography aesthetics.', ARRAY['PyTorch', 'SDXL', 'Diffusers', 'LoRA / PEFT', 'Hugging Face'], 'https://huggingface.co/Ilyankhan69/slasher-vision-35mm', 'https://github.com/Ilyan321/Slasher-Vision-35mm', 6),
('School Attendance Management System', 'Multi-role school administration platform engineered with Next.js 15 App Router, React Server Components, Tailwind CSS, and structured PRD-driven modular architecture.', ARRAY['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'], null, 'https://github.com/Ilyan321/school-attendance-system', 7),
('AI Content Summarizer & Polyglot Translator', 'Article scraping and synthesis platform extracting clean text from web URLs, generating multi-perspective summaries via Groq LLaMA-3, and translating into 7 global languages.', ARRAY['Python', 'Streamlit', 'Groq LLaMA 3', 'BeautifulSoup4'], null, 'https://github.com/Ilyan321/AI_Content_Summarizer', 8),
('Weather AI & Style Advisor', 'Real-time meteorological utility combining OpenWeatherMap sensory feeds with Groq LLaMA 3.3 reasoning for climate-adaptive outfit and outdoor recommendations.', ARRAY['Python', 'Streamlit', 'Groq LLaMA 3.3', 'OpenWeatherMap API'], 'https://huggingface.co/spaces/Ilyankhan69/WeatherApp', 'https://github.com/Ilyan321/Weather_App', 9),
('WhatsApp Web Clone & Webhook Backend', 'High-performance FastAPI async backend on Vercel Serverless paired with a pixel-accurate WhatsApp Web client interface for real-time webhook routing.', ARRAY['Python', 'FastAPI', 'Vercel Serverless', 'JavaScript'], 'https://whatsapp-clone-sigma-wheat.vercel.app', 'https://github.com/Ilyan321/whatsapp-clone', 10),
('Student Expense & Budget Tracker', 'Interactive personal budgeting dashboard built with Python, Streamlit, and Altair charts for expenditure analytics, category breakdowns, and limit triggers.', ARRAY['Python', 'Streamlit', 'Altair Charts', 'Pandas'], null, 'https://github.com/Ilyan321/Student_Expense_Tracker', 11);

-- Insert default certifications
INSERT INTO public.v2_certifications (title, issuer, date, link, position) VALUES
('FlyRank AI Fluency Certificate', 'FlyRank AI', '2026', '/certificates/ai-fluency.pdf', 0),
('Anthropic Claude Code in Action', 'Anthropic', '2025', '/certificates/claude-code-in-action.pdf', 1),
('Anthropic Claude 101', 'Anthropic', '2025', '/certificates/claude-code-101.pdf', 2),
('Google AI Essentials', 'Google', '2025', '/certificates/ai-essentials.png', 3),
('Google Prompting Essentials', 'Google', '2025', '/certificates/prompting-essentials.png', 4),
('Google Cybersecurity Professional Certificate', 'Google / Coursera', '2025 – 2026', '/certificates/cybersecurity.png', 5),
('Google Agile Essentials', 'Google / Coursera', '2025', '/certificates/agile-essentials.png', 6);
