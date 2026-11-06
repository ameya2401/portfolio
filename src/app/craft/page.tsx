import HeadingWords from '@/components/quiet/HeadingWords';
import type {Metadata} from 'next';
import Tool from '@/components/quiet/Tool';
import {stack,moreTools} from '@/data/profile';
import s from '@/components/quiet/Quiet.module.css';

export const metadata:Metadata={title:'Craft · Ameya Bhagat',alternates:{canonical:'/craft'}};

export default function Craft(){
  return <>
    <header className={s.pageIntro}>
      <p className={s.kicker}>Craft</p>
      <h1><HeadingWords text="Tools, systems, and practice"/></h1>
      <p>A small working shelf. The technologies I build with, and the engineering principles that guide my work.</p>
    </header>

    <section className={s.section}>
      <h2>From architecture to production</h2>
      <div className={s.prose}>
        <p>I build backend architectures and applications with <Tool name="Python" logo="python"/>, <Tool name="TypeScript" logo="typescript"/>, and <Tool name="Next.js" logo="nextjs"/>. <Tool name="PostgreSQL" logo="postgres"/> and <Tool name="Supabase" logo="supabase"/> provide relational schema rigor, row-level security (RLS), and high-concurrency consistency.</p>
        <p>I design structured REST APIs in <Tool name="FastAPI" logo="python"/>, maintain reproducible environments with <Tool name="Docker" logo="docker"/>, and automate complex workflows with headless <Tool name="Puppeteer" logo="node"/>.</p>
        <p>Applied AI workflows, including syntax-aware AST parsing with Tree-sitter, semantic vector embeddings, and LLM tool calling, are woven directly into my engineering pipeline.</p>
      </div>

      <div className={s.toolShelf}>
        <h2>The wider toolkit</h2>
        <div>
          {[...stack, {title: 'Also in the mix', tools: moreTools}].map(group => (
            <div className={s.toolGroup} key={group.title}>
              <h3>{group.title}</h3>
              <p>
                {group.tools.map(([name, logo]) => (
                  <Tool name={name} logo={logo} key={name}/>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={s.section}>
      <h2>Open source &amp; research</h2>
      <p>
        <a className={s.editorialLink} href="https://github.com/ameya2401/ASTRA" target="_blank" rel="noreferrer">
          ASTRA
        </a>{" "}
        <span className={s.projectStatus}>Research &amp; Open source</span>
      </p>
      <p className={s.muted}>
        Automated risk stratification microservice for AI-authored pull requests, parsing syntax-aware AST deltas with Tree-sitter and predicting defect probability before human review.
      </p>
    </section>

    <section className={s.section}>
      <h2>Engineering discipline</h2>
      <div className={s.reference}>
        <a href="https://github.com/ameya2401" target="_blank" rel="noreferrer">
          Relational Schema Integrity <span>github.com/ameya2401 ↗</span>
        </a>
        <p>Strict schema design, atomic transactions, row-level security (RLS), and PostgreSQL RPC functions for concurrency-safe state transitions.</p>
      </div>
      <div className={s.reference}>
        <a href="https://github.com/ameya2401" target="_blank" rel="noreferrer">
          Syntax-Aware Code Analysis <span>github.com/ameya2401 ↗</span>
        </a>
        <p>Moving past naive line diffs by parsing abstract syntax trees (ASTs) to measure actual structural churn and complexity shifts.</p>
      </div>
      <p className={s.small}>A foundation to keep expanding.</p>
    </section>
  </>;
}
