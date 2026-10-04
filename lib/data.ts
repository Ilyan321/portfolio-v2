export const site = {
  name: "Ilyan Khan",
  initials: "IK",
  role: "Software Developer & AI Engineer / GenAI Specialist · QUEST Nawabshah · Open to Global & Remote Opportunities",
  headline: "Software Developer & AI Engineer. Real-time NLP pipelines & high-speed full-stack applications.",
  subline: "GenAI Specialist — LoRA Fine-Tuning · RAG Architectures · Next.js 15 & React · Python & C++ · Open to work: Remote / Global",
  about:
    "I'm a Computer Systems Engineering student at Quaid-e-Awam University of Engineering, Science & Technology (QUEST), Nawabshah, specializing in Generative AI integration, real-time NLP pipelines, and clean full-stack web applications. I turn complex deep learning architectures (LoRA fine-tuning, vector RAG retrieval with FAISS, multi-label transformer classification) into fast, production-ready software solutions with sub-millisecond response times and robust security firewalls.",
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
  { value: "99.05%", label: "Benchmark Accuracy" },
  { value: "< 50ms", label: "Inference Latency" },
  { value: "4+", label: "Software Internships" },
  { value: "18+", label: "Curated Projects & Models" },
];

export const techStack = [
  {
    group: "AI & Machine Learning",
    items: [
      "PyTorch",
      "LLaMA 3 / 3.3",
      "LoRA / PEFT",
      "Unsloth",
      "Hugging Face Transformers",
      "FAISS (Vector RAG)",
      "DistilBERT",
      "LangChain",
      "Groq API",
    ],
  },
  {
    group: "Programming Languages",
    items: ["Python", "C++ (OOP/DSA)", "TypeScript", "JavaScript (ES6+)", "SQL"],
  },
  {
    group: "Frontend & UI",
    items: ["Next.js 15", "React 19 / 18", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js / Canvas"],
  },
  {
    group: "Backend, Cloud & DB",
    items: ["FastAPI", "Flask", "Supabase (PostgreSQL + RLS)", "Streamlit", "Vercel", "Netlify Edge Functions", "Docker"],
  },
  {
    group: "Tooling & Environments",
    items: ["Git & GitHub", "Linux / Bash", "Google Colab", "Kaggle Dual-GPU", "VS Code"],
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
    slug: "schema-aware-sql-agent",
    name: "Schema-Aware SQL Agent",
    tagline: "Autonomous NLP-to-SQL with AST Security Firewall",
    description:
      "Production-grade natural language query compiler powered by a LoRA fine-tuned LLaMA-3-8B model on the Yale Spider benchmark. Features a deterministic Python Abstract Syntax Tree (AST) validator that mathematically prevents destructive mutations and schema exposure.",
    stack: ["PyTorch", "LLaMA-3-8B", "Unsloth", "LoRA", "Hugging Face Hub", "SQLite"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/Schema-Aware-SQL-Agent" },
      { label: "Hugging Face", href: "https://huggingface.co/Ilyankhan69/schema-aware-sql-agent" },
    ],
    flagship: true,
  },
  {
    slug: "hogwarts-archivist",
    name: "The Hogwarts Archivist",
    tagline: "Source-Attributed RAG Chatbot with Sub-Second FAISS Retrieval",
    description:
      "Enterprise-grade Retrieval-Augmented Generation (RAG) conversational intelligence system. Combines LangChain vector search, FAISS similarity indexing, and Groq LLaMA-3 high-speed inference to deliver verifiable, paragraph-exact literary citations with zero hallucination.",
    stack: ["LangChain", "FAISS", "Groq LLaMA-3", "Sentence Transformers", "Streamlit", "PyPDF"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/Hogwarts_Archivist" },
      { label: "Live Space", href: "https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist" },
    ],
    flagship: true,
  },
  {
    slug: "vibeguard",
    name: "VibeGuard",
    tagline: "Real-Time Multi-Label Content Moderation Engine",
    description:
      "Automated Trust & Safety NLP pipeline using a fine-tuned DistilBERT transformer to classify toxic content across 6 risk vectors with 86.67% accuracy and sub-50ms CPU/GPU inference latency.",
    stack: ["DistilBERT", "PyTorch", "Transformers", "Streamlit", "Scikit-Learn"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/VibeGuard" },
      { label: "Live Space", href: "https://huggingface.co/spaces/Ilyan321/vibeguard" },
    ],
    flagship: true,
  },
  {
    slug: "edufocus-attendance",
    name: "EduFocus Attendance Portal",
    tagline: "React 18 & Supabase Real-Time Attendance SPA",
    description:
      "Modern full-stack academic attendance tracking Single Page Application with bi-directional cloud syncing via Supabase PostgreSQL, Row-Level Security (RLS), quick-click batch status recording, and interactive classroom analytics.",
    stack: ["React 18", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "TypeScript"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/attendance-app" },
      { label: "Live Demo", href: "https://Ilyan321.github.io/attendance-app/" },
    ],
    flagship: true,
  },
  {
    slug: "email-spam-filter",
    name: "Email Spam Classifier",
    tagline: "DistilBERT Transformer Pipeline (99.05% Accuracy)",
    description:
      "End-to-end NLP classification pipeline fine-tuning a DistilBERT transformer on the Enron email dataset, trained with fp16 mixed-precision on dual T4 GPUs with a public inference widget on Hugging Face.",
    stack: ["Python", "PyTorch", "DistilBERT", "Hugging Face Hub", "Kaggle GPU"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/email-spam-filter-model" },
      { label: "Hugging Face", href: "https://huggingface.co/Ilyankhan69/email-spam-filter" },
    ],
  },
  {
    slug: "spatial-classroom",
    name: "Spatial Classroom",
    tagline: "Gamified Reverse-Tutor AI Platform",
    description:
      "Innovative reverse-classroom application implementing the Feynman Technique where users teach a curious AI student with real-time emotional state machines powered by Groq LLaMA-3 and Netlify Edge Functions.",
    stack: ["JavaScript", "Netlify Edge", "Groq LLaMA 3", "HTML5 Canvas"],
    links: [{ label: "GitHub", href: "https://github.com/Ilyan321/spatial-classroom" }],
  },
  {
    slug: "slasher-vision-35mm",
    name: "Slasher-Vision-35mm",
    tagline: "Custom SDXL Diffusion LoRA for 35mm Retro Cinema",
    description:
      "Specialized Low-Rank Adaptation (LoRA) for Stable Diffusion XL designed to synthesize authentic 1980s 35mm film grain, anamorphic flare, and vintage cinematography aesthetics.",
    stack: ["PyTorch", "SDXL", "Diffusers", "LoRA / PEFT", "Hugging Face"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/Slasher-Vision-35mm" },
      { label: "Hugging Face", href: "https://huggingface.co/Ilyankhan69/slasher-vision-35mm" },
    ],
  },
  {
    slug: "school-attendance-system",
    name: "School Attendance Management System",
    tagline: "Next.js 15 & TypeScript Enterprise Portal",
    description:
      "Multi-role school administration platform engineered with Next.js 15 App Router, React Server Components, Tailwind CSS, and structured PRD-driven modular architecture.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Supabase"],
    links: [{ label: "GitHub", href: "https://github.com/Ilyan321/school-attendance-system" }],
  },
  {
    slug: "ai-content-summarizer",
    name: "AI Content Summarizer & Polyglot Translator",
    tagline: "Automated Article Ingestion & 7-Language Synthesis",
    description:
      "Article scraping and synthesis platform extracting clean text from web URLs, generating multi-perspective summaries via Groq LLaMA-3, and translating into 7 global languages.",
    stack: ["Python", "Streamlit", "Groq LLaMA 3", "BeautifulSoup4"],
    links: [{ label: "GitHub", href: "https://github.com/Ilyan321/AI_Content_Summarizer" }],
  },
  {
    slug: "weather-ai",
    name: "Weather AI & Style Advisor",
    tagline: "Sensory Weather Data + LLaMA 3.3 Reasoning",
    description:
      "Real-time meteorological utility combining OpenWeatherMap sensory feeds with Groq LLaMA 3.3 reasoning for climate-adaptive outfit and outdoor recommendations.",
    stack: ["Python", "Streamlit", "Groq LLaMA 3.3", "OpenWeatherMap API"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/Weather_App" },
      { label: "Live Space", href: "https://huggingface.co/spaces/Ilyankhan69/WeatherApp" },
    ],
  },
  {
    slug: "whatsapp-web-clone",
    name: "WhatsApp Web Clone & Webhook Backend",
    tagline: "FastAPI Asynchronous Webhook Receiver",
    description:
      "High-performance FastAPI async backend on Vercel Serverless paired with a pixel-accurate WhatsApp Web client interface for real-time webhook routing.",
    stack: ["Python", "FastAPI", "Vercel Serverless", "JavaScript"],
    links: [
      { label: "GitHub", href: "https://github.com/Ilyan321/whatsapp-clone" },
      { label: "Live Demo", href: "https://whatsapp-clone-sigma-wheat.vercel.app" },
    ],
  },
  {
    slug: "student-expense-tracker",
    name: "Student Expense & Budget Tracker",
    tagline: "Real-Time Personal Finance Dashboard",
    description:
      "Interactive personal budgeting dashboard built with Python, Streamlit, and Altair charts for expenditure analytics, category breakdowns, and limit triggers.",
    stack: ["Python", "Streamlit", "Altair Charts", "Pandas"],
    links: [{ label: "GitHub", href: "https://github.com/Ilyan321/Student_Expense_Tracker" }],
  },
];

export const experience = [
  {
    role: "Python Developer Intern",
    company: "IntelliVerse",
    period: "Mar 2026 – May 2026",
    location: "Remote",
    description:
      "Engineered Python-based Generative AI workflows, LLM agent orchestration, and asynchronous backend endpoints for real-time model inference pipelines.",
  },
  {
    role: "Software Engineer Intern (C++)",
    company: "Arch Technologies",
    period: "Jan 2026 – Feb 2026",
    location: "Remote / Nawabshah",
    description:
      "Applied Object-Oriented Programming (OOP) and algorithmic optimization in C++ focusing on memory management, array manipulation, and high-performance system logic.",
  },
  {
    role: "Software Engineer Intern",
    company: "Coretech Innovations",
    period: "Dec 2025 – Jan 2026",
    location: "Nawabshah, Pakistan",
    description:
      "Developed responsive frontend interfaces, performed modular code refactoring, and implemented core web application features in an agile team.",
  },
  {
    role: "Software Engineer Intern",
    company: "CodeAlpha",
    period: "Dec 2025 – Dec 2025",
    location: "Remote",
    description:
      "Executed full-stack engineering tasks, adhered to strict code quality standards, and delivered sprint deliverables with rapid turnaround.",
  },
];

export const education = [
  {
    institution: "Quaid-e-Awam University of Engineering, Science & Technology (QUEST)",
    degree: "Bachelor of Engineering (BE) in Computer System Engineering",
    period: "Oct 2024 – Oct 2028 (Expected)",
    location: "Nawabshah, Sindh, Pakistan",
    details: "2nd Year Engineering Student · Aggregate CGPA: 3.10 / 4.00 (77.50%)",
  },
  {
    institution: "IBA Public School Larkana",
    degree: "Intermediate (HSSC) — Pre-Engineering",
    period: "Aug 2022 – Aug 2024",
    location: "Larkana, Sindh, Pakistan",
    details: "Higher Secondary School Certificate with distinction in Pre-Engineering",
  },
];

export const certificates = [
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    date: "2025 – 2026",
    credentialId: "GCC-SEC-892401",
    tag: "Security & Systems",
    skills: ["Linux OS", "Python Automation", "SIEM / Splunk", "Network Security", "Wireshark", "NIST Framework"],
    image: "/certificates/cybersecurity.png",
  },
  {
    title: "Google AI Essentials",
    issuer: "Google",
    date: "2025",
    credentialId: "GCC-AI-104928",
    tag: "Artificial Intelligence",
    skills: ["Generative AI", "LLM Workflow Design", "Ethical AI", "Model Evaluation", "Productivity AI"],
    image: "/certificates/ai-essentials.png",
  },
  {
    title: "Google Prompting Essentials",
    issuer: "Google",
    date: "2025",
    credentialId: "GCC-PR-902381",
    tag: "Prompt Engineering",
    skills: ["Prompt Engineering", "Few-Shot Reasoning", "Context Optimization", "Prompt Chaining"],
    image: "/certificates/prompting-essentials.png",
  },
  {
    title: "Google Agile Essentials",
    issuer: "Google / Coursera",
    date: "2025",
    credentialId: "GCC-AG-2025",
    tag: "Engineering Methodology",
    skills: ["Agile Project Management", "Scrum Framework", "Sprint Planning", "Continuous Delivery"],
    image: "/certificates/agile-essentials.png",
  },
];
