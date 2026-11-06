export const profile = {
  name: "Ameya Bhagat",
  email: "ameyabhagatwork@gmail.com",
  location: "Thane, Maharashtra, India",
  city: "Thane",
  timeZone: "Asia/Kolkata",
  tzLabel: "IST",
  github: "https://github.com/ameya2401",
  twitter: "https://x.com/notbakkro",
  twitterHandle: "@notbakkro",
  linkedin: "https://www.linkedin.com/in/ameyabhagat24",
  kaggle: "https://www.kaggle.com/ameyabhagat24",
  spotify: "https://open.spotify.com/user/2aynk7pbsvdsrnc2vg7h9tycl?si=74abfd642d5b4ab0",
  timezone: "India (IST, UTC+5:30)",
  calendar: "/ameya_bhagat_resume.pdf",
  resume: "/ameya_bhagat_resume.pdf",
};

export interface ExperienceItem {
  company: string;
  href?: string;
  role: string;
  date: string;
  current?: boolean;
  description: string;
}

export interface EducationItem {
  institution: string;
  href?: string;
  degree: string;
  date: string;
  grade?: string;
  current?: boolean;
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    company: "MaestroCareer",
    href: "https://maestro-career.vercel.app/",
    role: "Software Development Intern",
    date: "Mar 2026 - Oct 2026",
    current: false,
    description:
      "Contributed to full-stack career platform using Next.js and Supabase. Built responsive UI with React, TypeScript, and Tailwind CSS; integrated backend services for auth and database operations; implemented Razorpay checkout and automated Brevo email workflows; engineered server-side Puppeteer PDF report generation.",
  },
  {
    company: "CHESS",
    href: "https://chessindia.odoo.com/",
    role: "Digital Solution Intern",
    date: "Feb 2024 - Feb 2025",
    current: false,
    description:
      "Built and updated company web applications with Odoo CMS, structured service catalogs for client communication, and automated digital engagement workflows across platforms.",
  },
];

export const education: EducationItem[] = [
  {
    institution: "BVIMIT, Navi Mumbai",
    href: "https://github.com/ameya2401",
    degree: "MCA (Master of Computer Applications)",
    date: "Jul 2025 - Present",
    grade: "CGPA: 8.6/10",
    current: true,
    description:
      "Specializing in Advanced Java, Advanced DBMS, AI & ML, Natural Language Processing, Distributed Systems, Cloud Computing, and DevOps. Leading applied AI and systems research.",
  },
  {
    institution: "SIES College of Arts, Science & Commerce, Nerul",
    href: "https://github.com/ameya2401",
    degree: "B.Sc. in Computer Science",
    date: "Aug 2020 - Jul 2023",
    grade: "CGPA: 9.69/10",
    current: false,
    description:
      "Graduated with 9.69 CGPA (Distinction). Mastered Data Science, DBMS, Web Services, Software Testing & QA. Awarded official Letter of Appreciation for conducting project mentorship sessions for CS undergraduates.",
  },
  {
    institution: "St. John the Baptist High School & Jr College, Thane",
    degree: "Higher Secondary Certificate (HSC)",
    date: "2018 - 2020",
    grade: "First Class",
    current: false,
    description:
      "Maharashtra State Board, First Class. Focus in Science and Information Technology.",
  },
  {
    institution: "St. John the Baptist High School & Jr College, Thane",
    degree: "Secondary School Certificate (SSC)",
    date: "2018",
    grade: "Distinction",
    current: false,
    description:
      "Maharashtra State Board, Distinction. Foundational coursework in Mathematics and Science.",
  },
];

export const stack = [
  {
    title: "Programming Languages",
    tools: [
      ["Python", "python"],
      ["SQL", "postgres"],
      ["TypeScript", "typescript"],
      ["JavaScript", "javascript"],
      ["Java", "node"],
    ],
  },
  {
    title: "Web & Backend Architecture",
    tools: [
      ["Next.js", "nextjs"],
      ["React.js", "react"],
      ["FastAPI", "python"],
      ["REST APIs", "vercel"],
      ["Node.js", "node"],
      ["Tailwind CSS", "tailwind"],
    ],
  },
  {
    title: "Databases & Storage",
    tools: [
      ["PostgreSQL", "postgres"],
      ["Supabase", "supabase"],
      ["MongoDB", "mongodb"],
      ["pgvector", "postgres"],
      ["SQLAlchemy", "python"],
    ],
  },
  {
    title: "AI, Machine Learning & ASTs",
    tools: [
      ["Tree-sitter", "python"],
      ["Sentence-Transformers", "python"],
      ["XGBoost & SHAP", "python"],
      ["Agentic Workflows", "antigravity"],
      ["RAG Pipelines", "antigravity"],
    ],
  },
  {
    title: "DevOps & Engineering Tools",
    tools: [
      ["Docker", "docker"],
      ["Git & GitHub", "github"],
      ["Postman", "vercel"],
      ["Vercel", "vercel"],
      ["Puppeteer", "node"],
      ["Odoo CMS", "python"],
    ],
  },
];

export const moreTools = [
  ["Power BI", "paper"],
  ["Zapier", "n8n"],
  ["TanStack Query", "react"],
  ["Zod", "zod"],
  ["Groq Llama-3", "codex"],
  ["Google Gemini", "antigravity"],
  ["Razorpay", "stripe"],
  ["Redux", "redux"],
  ["Firebase", "firebase"],
  ["Prisma", "prisma"],
  ["Redis", "redis"],
  ["Excel (EDA)", "paper"],
];
