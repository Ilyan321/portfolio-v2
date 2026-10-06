export const site = {
  name: "Ilyan Khan",
  initials: "IK",
  role: "COMPUTER SYSTEMS ENGINEERING @ QUEST NAWABSHAH",
  headline: "Software Developer & AI Engineer. Real-time NLP pipelines & high-speed full-stack applications.",
  subline: "GenAI Specialist — LoRA Fine-Tuning · RAG Architectures · Next.js 15 & React · Python & C++ · Open to work: Remote / Global",
  about:
    "Computer Systems Engineering student at QUEST Nawabshah architecting real-time Generative AI pipelines and high-performance full-stack software.\n\nFocused on turning deep learning research (LoRA fine-tuning, vector RAG retrieval, and AST security firewalls) into fast, production-grade software.",
  github: "https://github.com/Ilyan321",
  linkedin: "https://linkedin.com/in/ilyan-khan-480341359",
  huggingface: "https://huggingface.co/Ilyankhan69",
  email: "ilyaankhan342@gmail.com",
  whatsapp: "https://wa.me/923213379342",
  phone: "+92 321 3379342",
  location: "Nawabshah, Sindh, Pakistan",
  cvUrl: "/cv.pdf",
};

export const stats = [
  { value: "12+", label: "Projects" },
  { value: "4", label: "Internships" },
  { value: "7", label: "Certificates" },
  { value: "25+", label: "Skills" },
];

export const techStack = [
  {
    group: "Core Languages",
    items: ["Python", "C++", "TypeScript", "JavaScript", "SQL", "C", "HTML/CSS"],
  },
  {
    group: "Web & Frameworks",
    items: ["React", "Next.js 15", "Streamlit", "Tailwind CSS", "REST APIs", "Node.js"],
  },
  {
    group: "AI & Machine Learning",
    items: ["LoRA / QLoRA", "FAISS RAG", "LangChain", "PyTorch", "Hugging Face", "Unsloth", "Pandas", "Altair"],
  },
  {
    group: "Backend & Systems",
    items: ["FastAPI", "Flask", "C++ Systems / OOP", "Python AST Safety", "Docker", "Linux / Bash"],
  },
  {
    group: "Databases & Cloud",
    items: ["PostgreSQL", "Supabase", "Git & GitHub", "Vercel", "Hugging Face Spaces"],
  },
];

export const researchSpotlight = {
  eyebrow: "FEATURED AI ARCHITECTURE — SPIDER BENCHMARK & AST SECURITY FIREWALL",
  title: "Schema-Aware SQL Agent: Autonomous NLP-to-SQL Pipeline",
  description:
    "A production-grade Natural Language to SQL autonomous pipeline powered by a LoRA fine-tuned LLaMA-3-8B model trained on the Yale Spider benchmark, shielded by a deterministic Python AST security firewall that guarantees 100% safe, read-only query execution and eliminates schema leakage.",
  stats: [
    { label: "100%", sub: "AST mutation safety" },
    { label: "4-bit", sub: "QLoRA quantization" },
    { label: "0ms", sub: "destructive query leakage" },
  ],
  stackTags: ["PyTorch", "LLaMA-3-8B", "Unsloth", "LoRA/PEFT", "SQLite", "Hugging Face Hub", "Python AST"],
  link: "https://github.com/Ilyan321/Schema-Aware-SQL-Agent",
  huggingFaceLink: "https://huggingface.co/Ilyankhan69/schema-aware-sql-agent",
  diagnostics: [
    { term: "Model Core", value: "LLaMA-3-8B-Instruct fine-tuned via QLoRA / Unsloth" },
    { term: "Security Firewall", value: "Custom Python AST parser blocking DROP / DELETE / ALTER" },
    { term: "Dataset Benchmark", value: "Yale Spider Multi-Table Complex Join Benchmark" },
    { term: "Deployment Hub", value: "Hugging Face Model Hub with automated verification pipeline" },
  ],
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
  flagship?: boolean;
};

export const projects: Project[] = [
  {
    slug: "haqdar",
    name: "HaqDar (حقدار)",
    tagline: "AI-Powered Women's Inheritance Rights Platform",
    description: "Multi-agent swarm architecture (8 autonomous agents) featuring a deterministic Sharia Faraizi legal engine to calculate and recover inheritance rights.",
    stack: ["Python", "CrewAI", "FastAPI", "Next.js", "PostgreSQL"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/haqdar" }
    ],
  },
  {
    slug: "schema-aware-sql-agent",
    name: "Schema-Aware SQL Agent",
    tagline: "Generative-SQL Pipeline with Validation Firewall",
    description: "A production-grade NLP-to-SQL pipeline featuring a LoRA fine-tuned Llama-3-8B model trained on the Spider dataset, protected by a deterministic Python security validation layer.",
    stack: ["Python", "PyTorch", "LoRA / Unsloth", "Streamlit", "SQL"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/Schema-Aware-SQL-Agent" },
      { label: "Hugging Face", href: "https://huggingface.co/Ilyankhan69/schema-aware-sql-agent" },
    ],
  },
  {
    slug: "aethel",
    name: "ÆTHEL",
    tagline: "Ultra-Luxury 3D Watchmaker Experience",
    description: "An ultra-luxury, cinematic 3D web experience for the conceptual watchmaker ÆTHEL. Built with Next.js, GSAP scroll kinematics, and high-fidelity canvas rendering.",
    stack: ["Next.js 15", "TypeScript", "Three.js", "GSAP", "Tailwind CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/AETHEL" }
    ],
  },
  {
    slug: "aegis-cli",
    name: "Aegis CLI",
    tagline: "Zero-Dependency Go DevSecOps Scanner",
    description: "Ultra-fast DevSecOps CLI scanner written in Go that inspects git diffs and CI pipelines in under 10ms to prevent secret and credential leaks.",
    stack: ["Go", "DevSecOps", "Regex", "CLI"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/aegis-cli" }
    ],
  },
  {
    slug: "qwen-prompt-perfector",
    name: "Qwen2.5-7B-Prompt-Perfector",
    tagline: "Fine-Tuned LLM Foundation Model",
    description: "A heavily fine-tuned Qwen 2.5 7B model optimized specifically to enhance and perfect unstructured prompt inputs into high-quality engineering prompts.",
    stack: ["PyTorch", "Hugging Face", "Unsloth", "LLaMA-Factory"],
    links: [
      { label: "Hugging Face", href: "https://huggingface.co/Ilyankhan69/Qwen2.5-7B-Prompt-Perfector" }
    ],
  },
  {
    slug: "campusvault",
    name: "CampusVault",
    tagline: "Hyper-Local University RAG Platform",
    description: "Syllabus-aligned campus knowledge and RAG platform that indexes university notes and lab scripts to provide contextual, natural-language academic answers.",
    stack: ["Python", "FAISS", "LangChain", "Groq API", "Streamlit"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/campusvault" }
    ],
  },
  {
    slug: "vibeguard",
    name: "VibeGuard",
    tagline: "Real-Time AI Content Moderation Engine",
    description: "An AI-powered content moderation engine using a fine-tuned DistilBERT model to detect multi-label toxicity and harmful behavior in real time.",
    stack: ["Python", "Transformers", "PyTorch", "Streamlit", "Scikit-Learn"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/VibeGuard" },
      { label: "Live Demo", href: "https://huggingface.co/spaces/Ilyankhan69/VibeGuard" },
    ],
  },
  {
    slug: "luna",
    name: "Luna Chat",
    tagline: "Offline-First Flutter Messaging Protocol",
    description: "Beautiful, offline-first chatting app built with Flutter, Riverpod, Isar, and Supabase. Adheres to the strict Apple HIG 'Zero Slop' design philosophy.",
    stack: ["Flutter", "Dart", "Riverpod", "Supabase", "Isar DB"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/luna" }
    ],
  },
  {
    slug: "silica",
    name: "Silica",
    tagline: "Glassmorphic WebGL Landing Page",
    description: "Interactive 3D product showcase and landing page featuring Three.js WebGL models, GSAP scroll-driven canvas scrubbing, and glassmorphic UI overlays.",
    stack: ["TypeScript", "Vite", "Three.js", "GSAP"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/Silica" }
    ],
  },
  {
    slug: "slasher-vision-35mm",
    name: "Slasher-Vision-35mm",
    tagline: "Custom SDXL Diffusion LoRA",
    description: "Specialized Low-Rank Adaptation (LoRA) for Stable Diffusion XL designed to synthesize authentic 1980s 35mm film grain, anamorphic flare, and vintage cinematography aesthetics.",
    stack: ["PyTorch", "SDXL", "Diffusers", "LoRA / PEFT", "Hugging Face"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/Slasher-Vision-35mm" },
      { label: "Hugging Face", href: "https://huggingface.co/Ilyankhan69/slasher-vision-35mm" },
    ],
  },
  {
    slug: "hogwarts-archivist",
    name: "Hogwarts Archivist RAG",
    tagline: "Source-Attributed Knowledge Chatbot",
    description: "A source-attributed RAG chatbot for the Harry Potter universe, powered by LangChain, FAISS, Groq API, and Streamlit.",
    stack: ["Python", "LangChain", "FAISS", "Groq LLaMA 3", "Streamlit"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/Hogwarts_Archivist" },
      { label: "Live Demo", href: "https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist" },
    ],
  },
  {
    slug: "ai-researcher",
    name: "AI Academic Researcher",
    tagline: "5-Agent Autonomous Research Swarm",
    description: "Multi-agent research team powered by CrewAI and Groq. Features autonomous web search, arXiv literature review, evidence auditing, and publication-grade report generation.",
    stack: ["Python", "CrewAI", "Groq API", "Streamlit", "arXiv API"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/researcher" }
    ],
  },
  {
    slug: "apexconsult-ai",
    name: "ApexConsult AI",
    tagline: "Multi-Agent Business Advisory System",
    description: "4-agent strategic business advisory system coordinating competitive intelligence, stress-testing, and strategy synthesis using tier-1 management consulting methodologies.",
    stack: ["Python", "CrewAI", "Groq LPU", "Streamlit"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/business-consulting-crew" }
    ],
  },
  {
    slug: "mdview",
    name: "MDView Studio",
    tagline: "High-Performance Markdown PWA",
    description: "High-performance GitHub Markdown Studio with real-time Mermaid diagrams, KaTeX formulas, offline PWA capabilities, and local data sovereignty.",
    stack: ["React", "TypeScript", "PWA", "Mermaid.js", "KaTeX"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/mdview" }
    ],
  },
  {
    slug: "musicbot",
    name: "MusicBot",
    tagline: "Minecraft-Styled Audio Downloader",
    description: "Minecraft-styled music search and audio downloader web application built with FastAPI, featuring YouTube Music integration and synced LRCLIB lyrics.",
    stack: ["Python", "FastAPI", "yt-dlp", "HTML/CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/MusicBot" }
    ],
  }
];

export const experience = [
  {
    role: "AI Intern",
    company: "FlyRank AI",
    period: "Jun 2026 – Present",
    location: "Remote",
    current: true,
    description:
      "Working on General AI fluency, knowledge engineering, and software construction pipelines for organic growth automation.",
    skills: ["GenAI", "Knowledge Engineering", "Data Science", "Python", "Software Construction"],
  },
  {
    role: "Python Developer Intern",
    company: "IntelliVerse",
    period: "Mar 2026 – May 2026",
    location: "Remote",
    current: false,
    description:
      "Engineered Python-based Generative AI workflows, LLM agent orchestration, and asynchronous backend endpoints for real-time model inference pipelines.",
    skills: ["Python", "LLM Orchestration", "FastAPI", "Real-Time Inference"],
  },
];

export const education = [
  {
    institution: "Quaid-e-Awam University of Engineering, Science & Technology (QUEST)",
    degree: "BE Computer System Engineering",
    period: "2024 – 2028",
    location: "Nawabshah, PK",
    details: "4th Sem GPA: 3.50",
  },
  {
    institution: "IBA Public School Larkana",
    degree: "Intermediate (HSSC) — Pre-Engineering",
    period: "2022 – 2024",
    location: "Larkana, PK",
    details: "Distinction",
  },
];

export const certificates = [
  {
    title: "FlyRank AI Fluency Certificate",
    issuer: "FlyRank AI",
    date: "2026",
    credentialId: "FR-AIF-2026",
    tag: "Artificial Intelligence",
    skills: ["General AI Fluency", "Knowledge Engineering", "LLM Workflows", "Data Science"],
    file: "/certificates/ai-fluency.pdf",
  },
  {
    title: "Anthropic Claude Code in Action",
    issuer: "Anthropic",
    date: "2025",
    tag: "AI Engineering",
    skills: ["Claude Code", "Agentic Workflows", "Tool Use", "Automated Coding"],
    file: "/certificates/claude-code-in-action.pdf",
  },
  {
    title: "Anthropic Claude 101",
    issuer: "Anthropic",
    date: "2025",
    tag: "AI Architecture",
    skills: ["Claude Architecture", "Context Windows", "System Prompts", "API Integration"],
    file: "/certificates/claude-code-101.pdf",
  },
  {
    title: "Google AI Essentials",
    issuer: "Google",
    date: "2025",
    credentialId: "GCC-AI-104928",
    tag: "Artificial Intelligence",
    skills: ["Generative AI", "LLM Workflow Design", "Ethical AI", "Model Evaluation", "Productivity AI"],
    file: "/certificates/ai-essentials.png",
  },
  {
    title: "Google Prompting Essentials",
    issuer: "Google",
    date: "2025",
    credentialId: "GCC-PR-902381",
    tag: "Prompt Engineering",
    skills: ["Prompt Engineering", "Few-Shot Reasoning", "Context Optimization", "Prompt Chaining"],
    file: "/certificates/prompting-essentials.png",
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    date: "2025 – 2026",
    credentialId: "GCC-SEC-892401",
    tag: "Security & Systems",
    skills: ["Linux OS", "Python Automation", "SIEM / Splunk", "Network Security", "Wireshark", "NIST Framework"],
    file: "/certificates/cybersecurity.png",
  },
  {
    title: "Google Agile Essentials",
    issuer: "Google / Coursera",
    date: "2025",
    credentialId: "GCC-AG-2025",
    tag: "Engineering Methodology",
    skills: ["Agile Project Management", "Scrum Framework", "Sprint Planning", "Continuous Delivery"],
    file: "/certificates/agile-essentials.png",
  },
];
