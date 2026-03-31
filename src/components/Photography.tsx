"use client";

import SectionHeading from "./SectionHeading";
import type { Destination } from "@/lib/content/types";

type PhotographyProps = {
    destinations: Destination[];
};

export default function Photography({ destinations }: PhotographyProps) {
    const publishedDestinations = destinations.filter((dest) => dest.isPublished);

    return (
        <section className="border-b border-white/15 px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <SectionHeading title="Core Strengths" />

                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4">
                    {publishedDestinations.map((dest) => (
                        <li
                            key={dest.name}
                            className="rounded-lg border border-white/15 bg-white/2 px-3 py-2 text-sm text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/3"
                        >
                            {dest.name}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
