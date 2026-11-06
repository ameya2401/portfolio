export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  metrics?: string;
  title?: string;
  contribution?: string;
  tags?: string[];
  imageAlt?: string;
  imageCaption?: string;
  imageAspect?: "square" | "wide";
  detailUrl?: string;
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "astra",
    name: "ASTRA",
    category: "AI & Systems · Risk Stratification",
    description:
      "Automated risk stratification microservice for AI-authored pull requests combining Tree-sitter AST delta metrics and NLP semantic intent alignment.",
    image: "/previews/glyph-2026-11.jpg",
    title: "ASTRA: Automated AST & NLP PR Risk Stratification",
    contribution:
      "Architected FastAPI triage microservice, engineered 28-dimensional AST and semantic feature extraction pipeline, and trained Platt-calibrated XGBoost classifier with TreeSHAP explanations.",
    tags: ["Python", "FastAPI", "Tree-sitter", "XGBoost", "SHAP", "Sentence-Transformers"],
    metrics: "28-dim AST & NLP Pipeline",
    liveUrl: "https://github.com/ameya2401/ASTRA",
    githubUrl: "https://github.com/ameya2401/ASTRA",
    featured: true,
  },
  {
    slug: "maestro-career",
    name: "Maestro Career",
    category: "Full-Stack & SaaS Platform",
    description:
      "Career assessment platform providing psychometric assessments, personalized learning paths, paid plans, and automated Puppeteer PDF career reports.",
    image: "/previews/maestro-career.jpg",
    title: "Maestro Career: Assessment & Automated Reporting Engine",
    contribution:
      "Integrated Razorpay payments, built headless Chromium PDF report generation with Puppeteer, and engineered Supabase admin dashboard for user access and analytics.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Razorpay", "Puppeteer", "PostgreSQL"],
    metrics: "Live · Paid Assessments",
    liveUrl: "https://maestro-career.vercel.app/",
    githubUrl: "https://github.com/ameya2401/Maestro-Career/tree/main",
    featured: true,
  },
  {
    slug: "manthan-2026",
    name: "Manthan 2026",
    category: "Full-Stack Event Infrastructure",
    description:
      "Official tech fest portal handling 110+ paid registrations, QR-based digital pass delivery with server validation, and admin analytics.",
    image: "/previews/manthan.jpg",
    title: "Manthan 2026: Tech Fest Ticketing & Pass Verification",
    contribution:
      "Engineered online payments via Razorpay, built QR digital pass generation with server validation, and built admin dashboard tracking ₹24,310 in revenue and 86 check-ins.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Razorpay", "Tailwind CSS", "PostgreSQL RLS"],
    metrics: "110 Registrations · ₹24,310",
    liveUrl: "https://bvimitmanthan.vercel.app/",
    githubUrl: "https://github.com/ameya2401/manthan2k26",
    featured: true,
  },
  {
    slug: "queue-cure",
    name: "QueueCure",
    category: "Realtime Health Tech & Triage",
    description:
      "Real-time clinic queue management system for patient registration, priority triage, and wait-time estimation across multiple live dashboards.",
    image: "/previews/queue-cure.jpg",
    title: "QueueCure: Real-Time Clinic Queue & Digital Triage",
    contribution:
      "Implemented concurrency-safe emergency triage using PostgreSQL RPC functions, wait-time estimation algorithms, and Supabase Realtime synchronization.",
    tags: ["React", "TypeScript", "Supabase Realtime", "PostgreSQL RPC", "TanStack Query"],
    metrics: "Wooble Hackathon '26",
    liveUrl: "https://qcure.vercel.app/reception",
    githubUrl: "https://github.com/ameya2401/qcure",
    featured: true,
  },
  {
    slug: "keepsake",
    name: "Keepsake",
    category: "AI Document Intelligence & Vector Search",
    description:
      "AI-powered career platform parsing resumes and career documents into searchable timelines and knowledge graphs with semantic vector search.",
    image: "/previews/keepsake.jpg",
    title: "Keepsake: AI Career Knowledge Graph & Semantic Search",
    contribution:
      "Built document extraction pipeline with pdfjs, Mammoth, and Groq Llama-3; implemented vector similarity search with Google Gemini embeddings and PostgreSQL pgvector.",
    tags: ["React 19", "TypeScript", "Groq Llama-3", "Supabase", "pgvector", "Gemini"],
    metrics: "MemoryVerse AI '26",
    liveUrl: "https://keepsakke.vercel.app/",
    githubUrl: "https://github.com/ameya2401/keepsake",
    featured: true,
  },
  {
    slug: "chess-digital",
    name: "CHESS Digital Suite",
    category: "Enterprise CMS & Automations",
    description:
      "Digital enterprise service pages and structured communication catalogs on Odoo CMS with automated multi-channel engagement pipelines.",
    image: "/previews/chess.jpg",
    title: "CHESS: CMS Architecture & Digital Automations",
    contribution:
      "Structured client service architecture in Odoo CMS and built automated lead and content workflows across social channels.",
    tags: ["Odoo CMS", "Zapier", "Snov.io", "Automation", "Python"],
    metrics: "Enterprise Solution",
    liveUrl: "https://chessindia.odoo.com/",
    githubUrl: "https://github.com/ameya2401",
    featured: false,
  },
];

export default projects;
