# Portfolio V2 - Structural Specification (SPEC)

## Status: FINALIZED

## 1. Objective
Build a new version of the portfolio (`portfolio-v2`) using Next.js 15, Tailwind CSS, and the extracted Supabase data. The design must be heavily inspired by the minimalist, elegant aesthetic of [Buraq's Portfolio](https://buraques-portfolio.vercel.app/#about), utilizing its specific "Sage/Forest" color palette, typography, and clean layout.

## 2. Core Structural Plan

### A. Layout Strategy: Single-Page Application (SPA)
- A single-page scrolling layout divided into clear, spacious sections.
- Navigation at the top will smoothly scroll to these sections.

### B. Section Breakdown

#### 1. Hero Section (Landing)
- **Content:** Minimalist introduction. Name, punchy one-liner (e.g., "Software Engineer specializing in AI & Full-Stack").
- **Design:** Clean typography, deep forest green background with sage green text. No distracting 3D backgrounds.

#### 2. About / Profile Section
- **Content:** A **short, punchy version** of the bio. (We will condense the extracted database bio to 2-3 sentences).
- **Design:** Clean, highly readable text with ample whitespace.

#### 3. Skills Section
- **Content:** Extracted skills from the database.
- **Design:** Neat grid of tags or minimalist text-based layout, blending with the theme.

#### 4. Projects Section (Expandable Rows)
- **Curation:** Show the **top 4-5 projects** (biggest/most active ones).
- **Design & Interaction (Accordion):** Following the inspiration, projects will be displayed as clean rows. Clicking a row **expands it inline** to reveal:
  - A short, concise description (no 10-line essays).
  - Relevant links (e.g., `GITHUB`, `LIVE SITE`).
- **"View All":** A button at the bottom of the top 5 projects that expands the list inline to show the remaining projects.

#### 5. Certifications Section
- **Content:** Important certificates.
- **Design:** Simple list, potentially using the same expandable row pattern as projects if description is needed, or just clean links.

#### 6. Footer / Contact
- **Content:** Social links (GitHub, LinkedIn) and contact info.
- **Design:** Minimalist, anchored at the bottom.

## 3. Key Design Principles (The "Aesthetic")
- **Color Palette:** Strictly adhere to the Forest/Sage green theme.
- **Typography:** Refined fonts matching the elegant feel of the inspiration.
- **Spacing:** Massive use of whitespace (or "green-space"). 
- **Animations:** Subtle interactions, such as the smooth inline expansion of project rows. No massive elements or clashing visuals.

---
*Note: This SPEC is finalized based on user feedback. The next step is to create the ROADMAP.md for execution.*
