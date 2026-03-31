"use client";

import type { HeroContent } from "@/lib/content/types";

type HeroProps = {
    hero: HeroContent;
};

export default function Hero({ hero }: HeroProps) {
    return (
        <section id="home" className="border-b border-white/15 px-6 pb-16 pt-32">
            <div className="mx-auto max-w-4xl">
                <p className="mb-5 inline-block border border-white/20 px-3 py-1 text-xs tracking-wide text-gray-300">
                    {hero.statusText}
                </p>

                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                    {hero.headingPrefix} {hero.name}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
                    {hero.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <a
                        href={hero.ctaHref}
                        className="border border-white bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
                    >
                        {hero.ctaLabel}
                    </a>
                    <a
                        href="/AmeyaBhagat_Resume2026.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white"
                    >
                        Resume
                    </a>
                </div>

                <p className="mt-8 text-sm text-gray-400">{hero.tickerText}</p>
            </div>
        </section>
    );
}
