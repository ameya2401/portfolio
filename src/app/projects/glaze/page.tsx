import {Arrow} from '@/components/quiet/Icons';
import HeadingWords from '@/components/quiet/HeadingWords';
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
const site="https://solid-glass.vercel.app";
const install="npx shadcn@latest add sumitttt4/solid-glass/glaze#main";
export const metadata: Metadata = { title: "Glaze · Ameya Bhagat", description: "93 free React components for interfaces, AI and voice, each in four finishes.", alternates: { canonical: "/projects/glaze" } };
export default function GlazeProject() { return (
<article className="page-content glyph-project">
<Link className="text-link" href="/projects">All projects</Link>
<header className="page-heading">
<p className="eyebrow">Open source · MIT · Design &amp; development</p>
<h1><HeadingWords text="Glaze: one component, four finishes."/></h1>
<p>93 free React components for interfaces, AI and voice, each in four finishes. Install any component with one shadcn command.</p>
<div className="project-footnote">
<a className="text-link" href={site} target="_blank" rel="noreferrer">Visit Glaze <Arrow/></a>
<a className="text-link" href={`${site}/docs`} target="_blank" rel="noreferrer">Read the docs <Arrow/></a>
<a className="text-link" href="https://github.com/sumitttt4/solid-glass" target="_blank" rel="noreferrer">Code on GitHub <Arrow/></a>
</div>
</header>
<figure className="glyph-output">
<Image alt="The same Join the beta card shown in the Normal, Glass, Frost and Aurora finishes." width={1600} height={674} priority sizes="(max-width: 684px) calc(100vw - 40px), 680px" src="/previews/glaze-finishes.jpg"/>
<figcaption>The same component in Normal, Glass, Frost and Aurora, captured from the Glaze site on 3 November 2026.</figcaption>
</figure>
<div className="story-prose">
<section>
<h2>What it is</h2>
<p>Glaze is a free, open-source React component library. It covers everyday UI, AI and voice components, and animated icons. It comes with full documentation, theming and a material system, and anyone can install components straight from the public registry.</p>
</section>
<section>
<h2>One attribute changes the material</h2>
<p>Every component ships in four material finishes: Normal, Glass, Frost and Aurora. The finish switcher changes the whole page at once. The same setting works on a single element, so one part of an interface can be glass while the rest stays solid.</p>
<pre className="install-command"><code>{`<html data-material="solid">`}</code></pre>
</section>
<section>
<h2>Install</h2>
<p>Components install with one shadcn command from the public registry:</p>
<pre className="install-command"><code>{install}</code></pre>
<p><a className="inline-link" href={`${site}/docs/installation`} target="_blank" rel="noreferrer">Installation guide</a> covers setup, theming and the full component list.</p>
</section>
</div>
<figure className="project-visual">
<div className="project-image-frame"><Image alt="The Glaze homepage: React components, solid or glass, with live components below a finish switcher." fill sizes="(max-width: 684px) calc(100vw - 40px), 680px" src="/previews/glaze.jpg"/></div>
<figcaption>The Glaze homepage with its finish switcher.</figcaption>
</figure>
</article>
); }
