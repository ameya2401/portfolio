import {Arrow} from '@/components/quiet/Icons';
import HeadingWords from '@/components/quiet/HeadingWords';
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ASTRA · Ameya Bhagat",
  description: "Automated Risk Stratification for AI-Authored Pull Requests using Tree-sitter and XGBoost.",
  alternates: { canonical: "/projects/astra" },
};

export default function AstraProject() {
  return (
    <article className="page-content glyph-project">
      <Link className="text-link" href="/projects">
        All projects
      </Link>
      <header className="page-heading">
        <p className="eyebrow">Applied AI &amp; Systems · Microservice Architecture</p>
        <h1>
          <HeadingWords text="ASTRA: Automated risk stratification for AI PRs." />
        </h1>
        <p>
          An end-to-end triage microservice that intercepts AI agent PRs via FastAPI webhooks to predict defect risk before human review.
        </p>
        <div className="project-footnote">
          <a className="text-link" href="https://github.com/ameya2401/ASTRA" target="_blank" rel="noreferrer">
            View on GitHub <Arrow />
          </a>
          <a className="text-link" href="https://github.com/ameya2401/ASTRA" target="_blank" rel="noreferrer">
            Repository &amp; Architecture <Arrow />
          </a>
        </div>
      </header>

      <dl className="revenue-stats">
        <div>
          <dt>Feature Pipeline</dt>
          <dd>28-dim</dd>
        </div>
        <div>
          <dt>Classifier</dt>
          <dd>XGBoost</dd>
        </div>
        <div>
          <dt>Attribution</dt>
          <dd>TreeSHAP</dd>
        </div>
      </dl>
      <p className="revenue-source">
        Powered by Python, FastAPI, Tree-sitter AST parser, Sentence-Transformers, and SQLAlchemy.
      </p>

      <figure className="project-visual">
        <div className="project-image-frame">
          <Image
            alt="ASTRA triage pipeline preview showing syntax-aware AST parsing and SHAP feature breakdowns."
            fill
            priority
            quality={90}
            sizes="(max-width: 684px) calc(100vw - 40px), 680px"
            src="/previews/glyph-2026-11.jpg"
          />
        </div>
        <figcaption>ASTRA automated risk stratification pipeline.</figcaption>
      </figure>

      <div className="story-prose">
        <section>
          <h2>The Problem</h2>
          <p>
            Autonomous coding agents (Codex, Copilot) generate high-velocity pull requests. Line-based diffs create blind spots where subtle semantic errors, structural complexity spikes, and intent divergences slip past superficial human reviews.
          </p>
        </section>

        <section>
          <h2>Architecture &amp; Implementation</h2>
          <p>
            ASTRA intercepts GitHub PR webhooks with HMAC validation, parses the code through an error-tolerant Tree-sitter parser, and extracts a 28-dimensional feature vector before executing calibrated risk prediction.
          </p>
          <ol className="glyph-flow">
            <li>
              <h3>Tree-sitter Structural Deltas (F01-F12)</h3>
              <p>Extracts syntax-aware structural churn and McCabe cyclomatic complexity shifts directly from ASTs, avoiding line diff illusions.</p>
            </li>
            <li>
              <h3>Semantic Intent-Diff Alignment (F13-F18)</h3>
              <p>Uses MiniLM Sentence-Transformers to compute semantic divergence between commit descriptions and actual code alterations.</p>
            </li>
            <li>
              <h3>PR Process Provenance (F19-F28)</h3>
              <p>Captures author entropy, file topology, and temporal distribution patterns across the repository graph.</p>
            </li>
            <li>
              <h3>Stratified Inference &amp; TreeSHAP Justification</h3>
              <p>A Platt-calibrated XGBoost classifier produces calibrated risk tiers (Low, Medium, High) accompanied by TreeSHAP local feature attribution posted straight to PR threads.</p>
            </li>
          </ol>
        </section>
      </div>
    </article>
  );
}

