# Ilyan Khan — Portfolio v2 (Editorial Sage & Deep Forest)

> Production-grade Next.js 14/15 portfolio featuring Space Grotesk typography, interactive Three.js 3D layered slice visualization, GSAP scroll-triggered scanlines, and Lenis smooth scrolling.

---

## 🎨 Tech Stack & Design System

- **Framework:** Next.js 15 / React 18 / Tailwind CSS v4
- **Styling:** Tailwind CSS with custom CSS variables
- **Color Palette:**
  - **Light Theme:** Mint Sage (`#DAF1DE`), Muted Sage Border (`#8EB69B`), Deep Forest Pine Accent (`#163832`), Night Ink (`#051F20`)
  - **Dark Theme:** Deep Night Forest (`#051F20`), Dark Pine Panel (`#0B2B26`), Luminous Mint Accent (`#8EB69B`), Mint Ink (`#DAF1DE`)
- **Typography:**
  - `Space Grotesk` (Display & Headings)
  - `Inter` (Body & Prose)
  - `JetBrains Mono` (Technical labels, metrics, timestamps)
- **Interactive Features:**
  - **3D Hero Stack:** `@react-three/fiber` + `@react-three/drei` floating translucent layers
  - **ScanLine Animation:** GSAP + ScrollTrigger ambient sweep
  - **Staggered Reveals:** Framer Motion word & container transitions
  - **Smooth Inertial Scroll:** Lenis

---

### Favicon 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="112" fill="#000000"/>
  <rect x="2" y="2" width="508" height="508" rx="110" fill="none" stroke="#27272A" stroke-width="4"/>
  <defs>
    <clipPath id="sphere-clip">
      <circle cx="256" cy="256" r="136"/>
    </clipPath>
  </defs>
  <g clip-path="url(#sphere-clip)" fill="#FFFFFF">
    <!-- Top-Right Primary Mass -->
    <polygon points="196,100 412,100 412,316"/>
    <!-- Middle Vector Slice -->
    <polygon points="110,164 164,110 402,348 348,402"/>
    <!-- Lower-Left Vector Slice -->
    <polygon points="100,236 276,412 224,412 100,288"/>
  </g>
</svg>

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server on port 3001
npm run dev

# Build for production
npm run build
```

---

## 👤 Author

**Ilyan Khan**  
- GitHub: [@Ilyan321](https://github.com/Ilyan321)  
- Hugging Face: [@Ilyankhan69](https://huggingface.co/Ilyankhan69)  
- LinkedIn: [Ilyan Khan](https://linkedin.com/in/ilyan-khan-480341359)  
- Email: `ilyaankhan342@gmail.com`
