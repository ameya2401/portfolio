"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlignLeft, Calendar, FileText } from "lucide-react";
import HeadingWords from "./HeadingWords";
import EngineeringPhilosophy from "./EngineeringPhilosophy";
import AwayCards from "./AwayCards";
import SpotifyVinylPlayer from "./SpotifyVinylPlayer";
import s from "./Quiet.module.css";

type TabMode = "story" | "tldr" | "timeline";

export default function AboutContent() {
  const [mode, setMode] = useState<TabMode>("timeline");

  return (
    <>
      {/* Header section with Kicker, Title, and Tab Switcher */}
      <header className="pt-10 pb-8 sm:pt-12 sm:pb-10 border-b border-[var(--line)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono text-[11px] font-semibold tracking-widest text-orange-500 uppercase">
                ABOUT ME
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[40px] font-semibold tracking-tight text-[var(--ink)] leading-[1.15]">
              <HeadingWords text="Crafting digital experiences" />
            </h1>
          </div>

          {/* Tab Switcher Pills */}
          <div className="inline-flex items-center self-start md:self-end p-1 rounded-full border border-black/10 bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.04] backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setMode("story")}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-150 cursor-pointer ${
                mode === "story"
                  ? "bg-white text-zinc-950 dark:bg-white dark:text-zinc-950 shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5" />
              <span>Story</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("tldr")}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-150 cursor-pointer ${
                mode === "tldr"
                  ? "bg-white text-zinc-950 dark:bg-white dark:text-zinc-950 shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>TL;DR</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("timeline")}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-150 cursor-pointer ${
                mode === "timeline"
                  ? "bg-white text-zinc-950 dark:bg-white dark:text-zinc-950 shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area Based on Active Tab */}
      <section className="py-8 sm:py-10">
        {mode === "timeline" && (
          <div className="relative pl-7 sm:pl-9 border-l border-zinc-200 dark:border-zinc-800 space-y-10 sm:space-y-12 ml-2 sm:ml-3 my-4">
            {/* 1. PRESENT */}
            <div className="relative">
              {/* Active target glowing dot */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 flex items-center justify-center">
                <span className="relative flex size-4 items-center justify-center">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-30" />
                  <span className="relative inline-flex size-3.5 rounded-full border-2 border-orange-500 bg-[#0c0c0b] p-0.5">
                    <span className="size-full rounded-full bg-orange-500" />
                  </span>
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-orange-500 tracking-wider uppercase block mb-1.5">
                PRESENT
              </span>
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[var(--ink)] leading-snug mb-2">
                MCA Candidate @ BVIMIT &amp; Building ASTRA
              </h3>
              <p className="text-[14px] leading-[1.8] text-[var(--muted)] max-w-2xl">
                Pursuing MCA (8.6 CGPA) specializing in advanced DBMS, distributed systems, and applied AI. Engineering ASTRA risk stratification microservice for AI-authored pull requests.
              </p>
            </div>

            {/* 2. 2026 */}
            <div className="relative">
              {/* Dot */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5">
                <span className="block size-2 rounded-full bg-zinc-400 dark:bg-zinc-600 ring-4 ring-[var(--paper)]" />
              </div>
              <span className="font-mono text-[11px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase block mb-1.5">
                Mar 2026 - Oct 2026
              </span>
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[var(--ink)] leading-snug mb-2">
                Software Development Intern @ MaestroCareer
              </h3>
              <p className="text-[14px] leading-[1.8] text-[var(--muted)] max-w-2xl">
                Contributed to the full-stack career guidance platform with Next.js and Supabase. Integrated Razorpay payments, Brevo automated emails, and server-side Puppeteer PDF generation.
              </p>
            </div>

            {/* 3. 2024 - 2025 */}
            <div className="relative">
              {/* Dot */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5">
                <span className="block size-2 rounded-full bg-zinc-400 dark:bg-zinc-600 ring-4 ring-[var(--paper)]" />
              </div>
              <span className="font-mono text-[11px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase block mb-1.5">
                Feb 2024 - Feb 2025
              </span>
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[var(--ink)] leading-snug mb-2">
                Digital Solution Intern @ CHESS
              </h3>
              <p className="text-[14px] leading-[1.8] text-[var(--muted)] max-w-2xl">
                Built and maintained production client CMS instances on Odoo, structured digital service catalogs, and automated social and operational pipelines in Thane, Maharashtra.
              </p>
            </div>

            {/* 4. 2020 - 2023 */}
            <div className="relative">
              {/* Dot */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5">
                <span className="block size-2 rounded-full bg-zinc-400 dark:bg-zinc-600 ring-4 ring-[var(--paper)]" />
              </div>
              <span className="font-mono text-[11px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase block mb-1.5">
                Aug 2020 - Jul 2023
              </span>
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[var(--ink)] leading-snug mb-2">
                B.Sc. in Computer Science @ SIES Nerul (9.69 CGPA)
              </h3>
              <p className="text-[14px] leading-[1.8] text-[var(--muted)] max-w-2xl">
                Graduated with 9.69 CGPA (Distinction). Mastered software architecture, database management, distributed computing, and data structures. Awarded official Letter of Appreciation for project mentorship.
              </p>
            </div>

            {/* 5. 2018 - 2020 */}
            <div className="relative">
              {/* Dot */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5">
                <span className="block size-2 rounded-full bg-zinc-400 dark:bg-zinc-600 ring-4 ring-[var(--paper)]" />
              </div>
              <span className="font-mono text-[11px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase block mb-1.5">
                2018 - 2020
              </span>
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[var(--ink)] leading-snug mb-2">
                HSC &amp; SSC @ St. John the Baptist High School &amp; Jr College
              </h3>
              <p className="text-[14px] leading-[1.8] text-[var(--muted)] max-w-2xl">
                Higher Secondary Certificate (First Class) and Secondary School Certificate (Distinction) under Maharashtra State Board.
              </p>
            </div>
          </div>
        )}

        {mode === "story" && (
          <div className="space-y-8">
            <div className="prose max-w-none text-[15px] sm:text-[16px] leading-[1.85] text-[var(--muted)] mb-8">
              <p>
                I build scalable backend architecture and applied AI systems, turning complex engineering problems into dependable software. My background spans relational schema design, resilient REST APIs, and automated production pipelines.
              </p>
              <p className={s.affiliation}>
                MCA at BVIMIT · Computer Science (9.69 CGPA) at SIES Nerul · Former Digital Solution Intern at CHESS.
              </p>
            </div>

            <div className="border-t border-[var(--line)] pt-6 space-y-6">
              <div className="py-2">
                <div className="flex items-baseline gap-2.5 mb-1.5">
                  <span className="font-mono text-xs font-semibold text-orange-500">01</span>
                  <h3 className="text-[15px] font-medium text-[var(--ink)] m-0 leading-normal">
                    THE FOUNDATION
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.85] text-[var(--muted)] m-0">
                  Started in computer science at SIES Nerul (9.69 CGPA) before progressing into my MCA at BVIMIT. What began with core algorithms quickly turned into a passion for backend architecture, focused on designing relational schemas, writing structured REST APIs, and building resilient systems that perform cleanly under load.
                </p>
              </div>

              <div className="py-2 border-t border-[var(--line)]">
                <div className="flex items-baseline gap-2.5 mb-1.5">
                  <span className="font-mono text-xs font-semibold text-orange-500">02</span>
                  <h3 className="text-[15px] font-medium text-[var(--ink)] m-0 leading-normal">
                    PRODUCTION RIGOR
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.85] text-[var(--muted)] m-0">
                  Gained hands-on industry discipline as a Digital Solution Intern at CHESS, where theory met real-world constraints. I automated internal workflows, maintained client CMS platforms, and optimized live web systems. It taught me to write maintainable code and treat uptime and edge cases as first-class priorities.
                </p>
              </div>

              <div className="py-2 border-t border-[var(--line)]">
                <div className="flex items-baseline gap-2.5 mb-1.5">
                  <span className="font-mono text-xs font-semibold text-orange-500">03</span>
                  <h3 className="text-[15px] font-medium text-[var(--ink)] m-0 leading-normal">
                    SYSTEMS &amp; APPLIED AI
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.85] text-[var(--muted)] m-0">
                  Today, my work centers on scalable backend engineering and applied AI systems. From parsing abstract syntax trees with Tree-sitter in ASTRA to detect semantic risk in pull requests, to building automated payments and PDF engines in Maestro Career, I turn complex engineering problems into dependable software.
                </p>
              </div>
            </div>
          </div>
        )}

        {mode === "tldr" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
              <span className="font-mono text-[11px] font-semibold text-orange-500 uppercase tracking-wider block mb-1">
                ACADEMIC EXCELLENCE
              </span>
              <h4 className="text-[15px] font-semibold text-[var(--ink)] mb-1.5">SIES Nerul &amp; BVIMIT</h4>
              <p className="text-[13.5px] leading-relaxed text-[var(--muted)]">
                Graduated with 9.69 CGPA in Computer Science; currently pursuing Master of Computer Applications with focus on distributed systems and databases.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
              <span className="font-mono text-[11px] font-semibold text-orange-500 uppercase tracking-wider block mb-1">
                PRODUCTION DISCIPLINE
              </span>
              <h4 className="text-[15px] font-semibold text-[var(--ink)] mb-1.5">Intern @ CHESS</h4>
              <p className="text-[13.5px] leading-relaxed text-[var(--muted)]">
                Automated operations, optimized live CMS platforms, and gained real-world production experience prioritizing uptime and edge cases.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
              <span className="font-mono text-[11px] font-semibold text-orange-500 uppercase tracking-wider block mb-1">
                APPLIED AI &amp; ASTs
              </span>
              <h4 className="text-[15px] font-semibold text-[var(--ink)] mb-1.5">ASTRA System</h4>
              <p className="text-[13.5px] leading-relaxed text-[var(--muted)]">
                Tree-sitter parser extracting semantic structural diffs and NLP risk stratification for AI-authored pull requests.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
              <span className="font-mono text-[11px] font-semibold text-orange-500 uppercase tracking-wider block mb-1">
                COMMERCE &amp; PDF ENGINES
              </span>
              <h4 className="text-[15px] font-semibold text-[var(--ink)] mb-1.5">Maestro Career</h4>
              <p className="text-[13.5px] leading-relaxed text-[var(--muted)]">
                End-to-end payment workflows with Razorpay, headless Puppeteer report generation, and Manthan fest registration portal.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Navigation & Links */}
      <section className="py-6 border-t border-[var(--line)]">
        <p className={s.aboutNavigation}>
          <Link href="/projects">Explore my projects</Link>
          <Link href="/craft">My tools and stack</Link>
          <a href="/ameya_bhagat_resume.pdf" target="_blank" rel="noreferrer">
            View Resume ↗
          </a>
        </p>
      </section>

      {/* Engineering Motto & Philosophy */}
      <section className="pt-8 pb-4 border-t border-[var(--line)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-mono text-[11px] font-semibold tracking-widest text-orange-500 uppercase">
            ENGINEERING PRINCIPLES
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] m-0">
          How I think and build
        </h2>
        <EngineeringPhilosophy />
      </section>

      {/* Outside Work */}
      <section className={s.section}>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="m-0">Outside work</h2>
          <a
            href="https://open.spotify.com/user/2aynk7pbsvdsrnc2vg7h9tycl?si=74abfd642d5b4ab0"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-zinc-500 hover:text-emerald-500 transition-colors inline-flex items-center gap-1.5"
          >
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Spotify Profile ↗
          </a>
        </div>
        <AwayCards />

        {/* Mini Spotify Vinyl Player Deck */}
        <div className="mt-10 pt-8 border-t border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] font-semibold text-emerald-500 uppercase tracking-wider">
                Soundtrack · BreZzZ Rotation
              </span>
            </div>
            <h3 className="text-[17px] font-semibold text-[var(--ink)] leading-snug mb-1.5">
              Deep focus, late nights &amp; favorite tracks
            </h3>
            <p className="text-[13.5px] leading-relaxed text-[var(--muted)] m-0">
              Hover over the vinyl deck to expand the controls and play random music directly from my{" "}
              <a
                href="https://open.spotify.com/playlist/2sYJ6VYlX4bSqaXUHMlDey?si=sP9wsASlQvOHKv5CH1sibg"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-emerald-500 transition-colors"
              >
                BreZzZ playlist
              </a>{" "}
              on Spotify.
            </p>
          </div>
          <SpotifyVinylPlayer />
        </div>
      </section>
    </>
  );
}

