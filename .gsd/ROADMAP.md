# Roadmap

## Phase 1: Vercel CLI & Domain Setup
- **Objective:** Fix the domain pointing for `ilyankhan.tech`.
- **Tasks:**
  - Login to Vercel CLI.
  - Link the current directory to the Vercel project.
  - Configure the domain `ilyankhan.tech` to point to the new project via Vercel CLI.

## Phase 2: Supabase Setup & Authentication
- **Objective:** Set up Supabase project and simple authentication.
- **Tasks:**
  - Initialize Supabase project (via CLI or ask user for URL/Anon Key).
  - Create tables for `projects` and `certifications` with `position` columns for sorting.
  - Set up a simple Next.js API route or server action for login (using a secure cookie with a hardcoded password/hash in `.env`, or using Supabase Auth with a single user).

## Phase 3: Admin Dashboard & CRUD
- **Objective:** Build the private admin dashboard.
- **Tasks:**
  - Create a `/admin` route protected by middleware.
  - Build UI for listing, adding, editing, and deleting projects and certifications.
  - Implement form submission to Supabase.

## Phase 4: Drag and Drop Reordering
- **Objective:** Add drag-and-drop to sort items.
- **Tasks:**
  - Integrate a drag-and-drop library (e.g., `@dnd-kit/core` or `framer-motion` reorder).
  - Update `position` field in Supabase on drop.
  - Ensure public portfolio fetches data ordered by `position`.

## Phase 5: Hero Section UI Update
- **Objective:** Replace the terminal with a photo.
- **Tasks:**
  - Remove `HeroAnimation.tsx` usage.
  - Add an `Image` component with a neat frame/animation in `Hero.tsx`.
