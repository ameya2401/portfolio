"use client";

import SectionHeading from "./SectionHeading";
import type { AboutContent } from "@/lib/content/types";

type AboutMeProps = {
    about: AboutContent;
};

export default function AboutMe({ about }: AboutMeProps) {
    const tools = about.tools.filter((tool) => tool.isActive);
    const interests = about.interests.filter((interest) => interest.isActive);
    const experience = about.experience.filter((item) => item.isActive);

    return (
        <section id="about" className="border-b border-white/15 px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <SectionHeading title="About" />

                <div className="rounded-2xl border border-white/15 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-neutral-900">
                    <h3 className="text-2xl font-semibold">{about.title}</h3>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300">{about.intro}</p>

                    <a
                        href="/AmeyaBhagat_Resume2026.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block border border-white bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
                    >
                        Resume
                    </a>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-white/15 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-neutral-900">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-300">Tech Stack</h4>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {tools.map((tool) => (
                                <span key={tool.name} className="rounded-md border border-white/10 px-2 py-1 text-xs text-gray-200 transition-colors duration-200 hover:border-white/25 hover:text-white">
                                    {tool.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/15 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-neutral-900">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-300">Focus Areas</h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-200">
                            {interests.map((item) => (
                                <li key={item.title}>{item.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div id="resume" className="mt-8">
                    <h3 className="text-2xl font-semibold">Experience</h3>
                    <div className="mt-4 space-y-4">
                        {experience.map((exp, i) => (
                            <article
                                key={`${exp.role}-${exp.company}-${i}`}
                                className="rounded-xl border border-white/15 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-neutral-900"
                            >
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <h4 className="text-lg font-medium">{exp.role}</h4>
                                    <span className="text-sm text-gray-400">{exp.period}</span>
                                </div>
                                <p className="mt-1 text-sm text-gray-300">{exp.company}</p>
                                <p className="mt-3 text-sm leading-6 text-gray-300">{exp.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
