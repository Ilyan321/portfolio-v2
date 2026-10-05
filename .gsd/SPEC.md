# Specifications: Portfolio v2 Improvements

## Status: FINALIZED

## Requirements

### 1. Supabase Backend & Admin Dashboard
- **Backend:** Migrate hardcoded `projects` and `certifications` data to a Supabase PostgreSQL database.
- **Admin Dashboard:** Create a private admin dashboard accessible only by the owner (Ilyan).
- **Authentication:** Simple username/password login. No public sign-ups allowed.
- **CRUD Operations:** Ability to Create, Read, Update, and Delete projects and certifications.
- **Reordering:** Implement drag-and-drop functionality in the dashboard to change the order/position of projects and certifications. This order must be reflected on the public portfolio.

### 2. UI Updates
- **Hero Section:** Replace the current `HeroAnimation` terminal component with a profile picture or photo.

### 3. Domain Configuration
- **Domain:** Update Vercel/DNS settings so `ilyankhan.tech` points to this new Next.js App Router portfolio (v2) instead of the old one.

## Out of Scope
- Migrating other static data (e.g., site config, tech stack) unless explicitly requested later.
