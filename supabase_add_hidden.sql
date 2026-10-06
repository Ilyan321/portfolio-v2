-- Migration to add hidden column to projects and certificates
ALTER TABLE public.v2_projects ADD COLUMN IF NOT EXISTS hidden BOOLEAN DEFAULT false;
ALTER TABLE public.v2_certifications ADD COLUMN IF NOT EXISTS hidden BOOLEAN DEFAULT false;
ALTER TABLE public.v2_experience ADD COLUMN IF NOT EXISTS hidden BOOLEAN DEFAULT false;
ALTER TABLE public.v2_education ADD COLUMN IF NOT EXISTS hidden BOOLEAN DEFAULT false;
