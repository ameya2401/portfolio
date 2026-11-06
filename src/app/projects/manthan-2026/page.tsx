import {Arrow} from '@/components/quiet/Icons';
import HeadingWords from '@/components/quiet/HeadingWords';
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manthan 2026 · Ameya Bhagat",
  description: "Official Tech Fest ticketing, payment processing, and QR pass issuance system.",
  alternates: { canonical: "/projects/manthan-2026" },
};

export default function ManthanProject() {
  return (
    <article className="page-content glyph-project">
      <Link className="text-link" href="/projects">
        All projects
      </Link>
      <header className="page-heading">
        <p className="eyebrow">Production Infrastructure · Events &amp; Ticketing</p>
        <h1>
          <HeadingWords text="Manthan 2026: Tech fest ticketing &amp; verification." />
        </h1>
        <p>
          Official full-stack tech fest website for event registration, payment collection, and digital QR-based pass delivery.
        </p>
        <div className="project-footnote">
          <a className="text-link" href="https://bvimitmanthan.vercel.app/" target="_blank" rel="noreferrer">
            Visit Manthan 2026 <Arrow />
          </a>
          <a className="text-link" href="https://github.com/ameya2401/manthan2k26" target="_blank" rel="noreferrer">
            View on GitHub <Arrow />
          </a>
        </div>
      </header>

      <dl className="revenue-stats">
        <div>
          <dt>Recorded Revenue</dt>
          <dd>₹24,310</dd>
        </div>
        <div>
          <dt>Registrations</dt>
          <dd>110</dd>
        </div>
        <div>
          <dt>QR Check-Ins</dt>
          <dd>86</dd>
        </div>
      </dl>
      <p className="revenue-source">
        Built with Next.js 14, TypeScript, Supabase, PostgreSQL RLS, Razorpay, and Tailwind CSS.
      </p>

      <figure className="project-visual">
        <div className="project-image-frame">
          <Image
            alt="Manthan 2026 tech fest registration and ticketing system preview."
            fill
            priority
            quality={90}
            sizes="(max-width: 684px) calc(100vw - 40px), 680px"
            src="/previews/slate.jpg"
          />
        </div>
        <figcaption>Manthan 2026 ticketing and verification dashboard.</figcaption>
      </figure>

      <div className="story-prose">
        <section>
          <h2>The Requirements</h2>
          <p>
            The annual inter-college tech fest required zero-downtime registration and payment processing capable of securely issuing verifiable passes to attendees across multiple event tracks.
          </p>
        </section>

        <section>
          <h2>Architecture &amp; Metrics</h2>
          <ol className="glyph-flow">
            <li>
              <h3>Event Registration &amp; Razorpay Checkout</h3>
              <p>Supported 110 registered entries and processed ₹24,310 in verified online transactions with cryptographic webhook verification.</p>
            </li>
            <li>
              <h3>Digital QR Passes with Server Validation</h3>
              <p>Generated encrypted QR passes issued directly to attendees with tamper-proof server-side verification at venue check-in desks.</p>
            </li>
            <li>
              <h3>Admin Dashboard &amp; Operations</h3>
              <p>Real-time administrator view tracking admissions, cash collections, attendance bottlenecks, and live check-ins (86 attendees checked in on event day).</p>
            </li>
            <li>
              <h3>PostgreSQL Row Level Security</h3>
              <p>Configured fine-grained RLS policies in Supabase ensuring event organizers and attendees only access authorized records.</p>
            </li>
          </ol>
        </section>
      </div>
    </article>
  );
}

