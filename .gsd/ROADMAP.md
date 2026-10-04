# Portfolio V2 - Roadmap

This document outlines the phases for building the new portfolio based on the finalized `SPEC.md`.

## Phase 1: Foundation & Theming (Wave 1)
- **Goal:** Set up the global layout, font, and strict color palette (Forest Green/Sage).
- **Tasks:**
  - Clear out any leftover 3D canvas or distracting elements from the initial Next.js build.
  - Define global CSS variables for the color palette (`--bg-forest`, `--text-sage`, etc.).
  - Set up the main structural container for the Single Page Application (SPA).
  - Implement the minimalist Header/Navigation (sticky or floating).

## Phase 2: Hero & About Sections (Wave 2)
- **Goal:** Build the introductory sections with ample whitespace.
- **Tasks:**
  - Create the Hero section (Name + short punchy title).
  - Create the About section with a condensed, punchy version of the bio from `extracted_supabase_data.json`.

## Phase 3: Skills Section (Wave 2)
- **Goal:** Display skills in a clean, minimalist format.
- **Tasks:**
  - Parse skills from the extracted JSON.
  - Implement a simple, aesthetic grid or list layout for the skills.

## Phase 4: Projects Section (Accordion Style) (Wave 3)
- **Goal:** Implement the interactive, expandable project rows.
- **Tasks:**
  - Build the `ProjectRow` component with inline expansion (accordion logic).
  - Select the top 4-5 projects to display by default.
  - Populate the short descriptions and GitHub/Live links.
  - Implement the "View All" functionality to reveal the rest.

## Phase 5: Certifications & Footer (Wave 3)
- **Goal:** Wrap up the bottom of the page.
- **Tasks:**
  - Add the certifications list.
  - Build the minimalist footer with social links.

## Phase 6: Final Polish & Verification (Wave 4)
- **Goal:** Ensure the site looks pixel-perfect and exactly matches the vibe of the inspiration.
- **Tasks:**
  - Check spacing, typography, and contrast.
  - Verify smooth scrolling between sections.
  - Verify responsive design (mobile view).
