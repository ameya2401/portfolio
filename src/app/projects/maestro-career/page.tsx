import {Arrow} from '@/components/quiet/Icons';
import HeadingWords from '@/components/quiet/HeadingWords';
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maestro Career · Ameya Bhagat",
  description: "Career assessment platform with psychometric scoring and automated Puppeteer PDF generation.",
  alternates: { canonical: "/projects/maestro-career" },
};

export default function MaestroCareerProject() {
  return (
    <article className="page-content glyph-project">
      <Link className="text-link" href="/projects">
        All projects
      </Link>
      <header className="page-heading">
        <p className="eyebrow">Production Platform · Next.js 14 &amp; Supabase</p>
        <h1>
          <HeadingWords text="Maestro Career: Psychometrics &amp; PDF engine." />
        </h1>
        <p>
          A production career platform providing personalized assessments, paid checkout, automated PDF reports, and an administrator analytics cockpit.
        </p>
        <div className="project-footnote">
          <a className="text-link" href="https://maestro-career.vercel.app/" target="_blank" rel="noreferrer">
            Visit Maestro Career <Arrow />
          </a>
          <a className="text-link" href="https://github.com/ameya2401/Maestro-Career/tree/main" target="_blank" rel="noreferrer">
            View on GitHub <Arrow />
          </a>
        </div>
      </header>

      <dl className="revenue-stats">
        <div>
          <dt>Stack</dt>
          <dd>Next.js 14</dd>
        </div>
        <div>
          <dt>Payments</dt>
          <dd>Razorpay</dd>
        </div>
        <div>
          <dt>PDF Engine</dt>
          <dd>Puppeteer</dd>
        </div>
      </dl>
      <p className="revenue-source">
        Built with Next.js 14, TypeScript, Supabase PostgreSQL, Razorpay, and Headless Chromium.
      </p>

      <figure className="project-visual">
        <div className="project-image-frame">
          <Image
            alt="Maestro Career platform preview showing assessment dashboard and career report generation."
            fill
            priority
            quality={90}
            sizes="(max-width: 684px) calc(100vw - 40px), 680px"
            src="/previews/glaze.jpg"
          />
        </div>
        <figcaption>Maestro Career platform interface and assessment flow.</figcaption>
      </figure>

      <div className="story-prose">
        <section>
          <h2>The Goal</h2>
          <p>
            Users require fast, actionable psychometric insights with verified payment processing and instant, professionally typeset PDF career roadmaps they can download and share.
          </p>
        </section>

        <section>
          <h2>System Engineering</h2>
          <ol className="glyph-flow">
            <li>
              <h3>Psychometric Evaluation &amp; Roadmaps</h3>
              <p>Dynamic assessment evaluation engine generating personalized career insights, skill gap analyses, and curated learning paths.</p>
            </li>
            <li>
              <h3>Verified Server-Side Checkout</h3>
              <p>End-to-end Razorpay order orchestration verifying payment cryptographic signatures and updating user privileges in Supabase with PostgreSQL Row Level Security (RLS).</p>
            </li>
            <li>
              <h3>Headless Chromium PDF Generation</h3>
              <p>Automated report rendering pipeline using Puppeteer and headless Chromium, producing pixel-perfect PDF career dossiers for candidates and admin teams.</p>
            </li>
            <li>
              <h3>Admin Console &amp; Analytics</h3>
              <p>Centralized administrative console for managing user assessment tokens, tracking check-ins, monitoring metrics, and exporting system data.</p>
            </li>
          </ol>
        </section>
      </div>
    </article>
  );
}

