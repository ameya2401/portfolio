"use client";

import SectionHeading from "./SectionHeading";
import type { FramerBuild } from "@/lib/content/types";

type FramerBuildsProps = {
    builds: FramerBuild[];
};

export default function FramerBuilds({ builds }: FramerBuildsProps) {
    return (
        <section className="border-b border-white/15 px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <SectionHeading title="Technical Highlights" />

                <div className="mt-8 grid gap-4">
                    {builds
                        .filter((build) => build.isPublished)
                        .map((build) => (
                            <article
                                key={build.id}
                                className="rounded-xl border border-white/15 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-neutral-900"
                            >
                                <h3 className="text-lg font-semibold">{build.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-300">{build.description}</p>
                            </article>
                        ))}
                </div>
            </div>
        </section>
    );
}
