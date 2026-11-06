import {Arrow} from '@/components/quiet/Icons';
import HeadingWords from '@/components/quiet/HeadingWords';
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
const site="https://motion-videos-nine.vercel.app";
export const metadata: Metadata = { title: "Slate · Ameya Bhagat", description: "A library of crafted launch films you can make yours.", alternates: { canonical: "/projects/slate" } };
export default function SlateProject() { return (
<article className="page-content glyph-project">
<Link className="text-link" href="/projects">All projects</Link>
<header className="page-heading">
<p className="eyebrow">Early access · Design &amp; development</p>
<h1><HeadingWords text="Slate: launch films you can make yours."/></h1>
<p>A library of crafted launch films you can make yours. Swap in your brand and the film preview updates live.</p>
<div className="project-footnote">
<a className="text-link" href={site} target="_blank" rel="noreferrer">Visit Slate <Arrow/></a>
<a className="text-link" href={`${site}/library`} target="_blank" rel="noreferrer">Browse the library <Arrow/></a>
</div>
</header>
<figure className="glyph-output">
<Image alt="Slate's live preview of The Benchmark beside the brand name, headline, website and colour fields." width={1600} height={641} priority sizes="(max-width: 684px) calc(100vw - 40px), 680px" src="/previews/slate-customize.jpg"/>
<figcaption>Brand fields beside the live preview of The Benchmark, using Slate’s made-up sample brand. Captured 3 November 2026.</figcaption>
</figure>
<div className="story-prose">
<section>
<h2>What it is</h2>
<p>Slate is a motion library for product launches. Pick a film, change the brand name, copy lines and colours, and the Remotion preview updates in the browser as you type.</p>
</section>
<section>
<h2>Where it stands</h2>
<p>Slate is in early access. The library and the live preview are open to try on the site.</p>
</section>
</div>
<figure className="project-visual">
<div className="project-image-frame"><Image alt="The Slate homepage: Launch films, made one by one. Then made yours." fill sizes="(max-width: 684px) calc(100vw - 40px), 680px" src="/previews/slate.jpg"/></div>
<figcaption>The Slate homepage.</figcaption>
</figure>
</article>
); }
