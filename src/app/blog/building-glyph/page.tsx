import HeadingWords from '@/components/quiet/HeadingWords';
import type { Metadata } from "next";
import Link from "next/link";
import {Arrow} from "@/components/quiet/Icons";
import revenue from "@/data/glyph-revenue.json";
const checked=new Date(revenue.checkedAt+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});

export const metadata: Metadata = {
  title: "Building Glyph: from an idea to a paid product · Ameya Bhagat",
  description: "A short note on building Glyph solo, launching it, and learning from paying customers.",
  alternates: { canonical: "/blog/building-glyph" },
};

export default function GlyphStory() {
  return (
    <article className="page-content glyph-story">
      <Link href="/blog" className="text-link">All writing</Link>
      <header className="page-heading">
        <p className="eyebrow">Building in public · 2 min read</p>
        <h1><HeadingWords text="Building Glyph: from an idea to a paid product"/></h1>
        <p>A few decisions, a public launch, and an ongoing learning process.</p>
      </header>
      <div className="story-prose">
        <h2>An identity, beyond a logo</h2>
        <p>The idea behind Glyph was simple: a logo alone doesn’t give a founder a brand. They also need colours, typography, guidelines, and assets they can actually use in their product.</p>
        <p>I built Glyph solo over a few months. The early approach included grid-based SVG logos and developer exports for React and Tailwind. I wanted the output to connect design decisions with implementation.</p>
        <h2>Putting it in front of people</h2>
        <p>I launched in February 2026, shared it on X, posted on Reddit, and listed it on Peerlist. That got the product out of my own workflow and into other people’s hands.</p>
        <p>I initially pictured indie hackers and solo developers using it. As people started paying, I began questioning that assumption: some seemed to be non-technical founders who wanted a professional identity quickly. I’m still figuring out how much they value code exports compared with the identity itself.</p>
        <h2>The work after payment</h2>
        <p>One monthly subscriber ran into an access issue after paying. I had to upgrade their account manually and provide an extra month. It was a concrete reminder that the payment flow and account access need the same care as the generator.</p>
        <p>Glyph is still evolving. I’m working on output quality and consistency, and deciding which improvements matter before making bigger changes. It’s a paid product, but there are still plenty of questions to answer.</p>
        <p>As of {checked}, Glyph has made ${revenue.allTime} in all-time revenue, verified on <a className="inline-link" href={revenue.source} target="_blank" rel="noreferrer">TrustMRR</a>.</p>
      </div>
      <a className="text-link story-visit" href="https://glyph.software" target="_blank" rel="noreferrer">Try Glyph <Arrow/></a>
    </article>
  );
}
