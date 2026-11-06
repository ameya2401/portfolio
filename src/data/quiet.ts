export type QuietProject = {
  slug: string;
  name: string;
  href: string;
  logo?: string;
  image?: string;
  description: string;
  tagline?: string;
  status?: string;
  live?: boolean;
  detail?: string;
  repo?: string;
  proof?: { label: string; href: string; title?: string };
};

/* Projects sourced from Ameya Bhagat's production systems, hackathons, and research. */
/* Home shows these three (ASTRA, Manthan 2026, QueueCure); Work/Projects shows every project. */
export const featuredProjects: QuietProject[] = [
  {
    slug: "astra",
    name: "ASTRA",
    href: "https://github.com/ameya2401/ASTRA",
    repo: "https://github.com/ameya2401/ASTRA",
    logo: "/logos/python.svg",
    image: "/previews/glyph-2026-11.jpg",
    tagline: "Automated risk stratification for AI-authored pull requests",
    description:
      "End-to-end triage microservice intercepting AI agent PRs via FastAPI webhooks to predict defect risk before human review using 28-dimensional Tree-sitter AST and MiniLM semantic metrics.",
    status: "Active research · Python",
    live: true,
    detail: "/projects/astra",
    proof: {
      label: "Tree-sitter & XGBoost Pipeline",
      href: "https://github.com/ameya2401/ASTRA",
      title: "Syntax-aware AST delta metrics with Platt-calibrated XGBoost & TreeSHAP",
    },
  },
  {
    slug: "manthan-2026",
    name: "Manthan 2026",
    href: "https://bvimitmanthan.vercel.app/",
    repo: "https://github.com/ameya2401/manthan2k26",
    logo: "/brands/manthan.png",
    image: "/previews/manthan.jpg",
    tagline: "Official full-stack tech fest ticketing & verification",
    description:
      "Built and deployed the official tech fest website for event registration, online payments, and digital pass delivery, supporting 110 registrations and Rs. 24,310 in recorded revenue.",
    status: "Live · ₹24,310 revenue",
    live: true,
    detail: "/projects/manthan-2026",
    proof: {
      label: "Live Site · 110 registrations · 86 check-ins",
      href: "https://bvimitmanthan.vercel.app/",
      title: "₹24,310 in recorded revenue and server-validated QR passes",
    },
  },
  {
    slug: "queue-cure",
    name: "QueueCure",
    href: "https://qcure.vercel.app/reception",
    repo: "https://github.com/ameya2401/qcure",
    logo: "/brands/queue-cure.png",
    image: "/previews/queue-cure.jpg",
    tagline: "Real-time clinic queue management & digital triage",
    description:
      "Multi-surface clinic triage system across Reception, Kiosk, Waiting Room TV, and Doctor Cockpit. Uses PostgreSQL RPC functions for concurrency-safe emergency handling and Supabase Realtime synchronization.",
    status: "Realtime · Hackathon '26",
    live: true,
    proof: {
      label: "Live Kiosk · Wooble Hackathon '26",
      href: "https://qcure.vercel.app/reception",
      title: "Priority-based emergency triage with wait-time estimation",
    },
  },
];

export const moreProjects: QuietProject[] = [
  {
    slug: "maestro-career",
    name: "Maestro Career",
    href: "https://maestro-career.vercel.app/",
    repo: "https://github.com/ameya2401/Maestro-Career/tree/main",
    logo: "/brands/maestro.png",
    image: "/previews/maestro-career.jpg",
    tagline: "Psychometric career assessment & automated PDF generation",
    description:
      "Full-stack career assessment platform with psychometric scoring, personalized learning paths, Razorpay checkout, automated Puppeteer PDF report generation, and Supabase admin console.",
    status: "Live · Production",
    live: true,
    detail: "/projects/maestro-career",
    proof: {
      label: "Live Platform · Razorpay & Puppeteer",
      href: "https://maestro-career.vercel.app/",
      title: "Automated career PDF reports and verified payment orders",
    },
  },
  {
    slug: "keepsake",
    name: "Keepsake",
    href: "https://keepsakke.vercel.app/",
    repo: "https://github.com/ameya2401/keepsake",
    logo: "/brands/keepsake.svg",
    image: "/previews/keepsake.jpg",
    tagline: "AI-powered career document intelligence & knowledge graph",
    description:
      "Document processing pipeline using pdfjs, Mammoth, and Groq Llama-3 to extract text and entities, with semantic vector search across career records using Google Gemini embeddings and PostgreSQL pgvector.",
    status: "pgvector · Gemini",
    live: true,
    proof: {
      label: "MemoryVerse AI '26 Submission",
      href: "https://keepsakke.vercel.app/",
      title: "Searchable career timelines and pgvector knowledge graph",
    },
  },
  {
    slug: "chess-digital",
    name: "CHESS Digital Platform",
    href: "https://chessindia.odoo.com/",
    repo: "https://github.com/ameya2401",
    logo: "/brands/chess.png",
    image: "/previews/chess.jpg",
    tagline: "Client CMS platforms & operational workflow automations",
    description:
      "Engineered service pages and client-facing digital profiles using Odoo CMS; built automated digital workflows simplifying content distribution and operational pipelines.",
    status: "Live · Odoo CMS",
    live: true,
    proof: {
      label: "Live Site · Odoo CMS & Automations",
      href: "https://chessindia.odoo.com/",
      title: "Automated engagement and enterprise service deployment",
    },
  },
];

export const allProjects: QuietProject[] = [...featuredProjects, ...moreProjects];

export const personalProfiles = [
  {
    name: "Spotify",
    handle: "Ameya",
    href: "https://open.spotify.com/playlist/2sYJ6VYlX4bSqaXUHMlDey?si=sP9wsASlQvOHKv5CH1sibg",
    logo: "/logos/spotify.svg",
    image: "/previews/spotify-brezzz-card.jpg",
    note: "BreZzZ playlist, focus tracks, and sounds I code to.",
  },
  {
    name: "GitHub",
    handle: "ameya2401",
    href: "https://github.com/ameya2401",
    logo: "/logos/github.svg",
    image: "/previews/profile-letterboxd.jpg",
    note: "Open-source repositories, systems code, and AST parsers.",
  },
  {
    name: "LinkedIn",
    handle: "ameyabhagat24",
    href: "https://www.linkedin.com/in/ameyabhagat24",
    logo: "/logos/linkedin.svg",
    image: "/brands/duo.png",
    note: "Professional journey, industry connections, and milestones.",
  },
];
