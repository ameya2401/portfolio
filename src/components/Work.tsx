"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import type { WorkProject } from "@/lib/content/types";

type WorkProps = {
    projects: WorkProject[];
};

export default function Work({ projects }: WorkProps) {
    const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

    useEffect(() => {
        if (!selectedProject) {
            document.body.style.overflow = "";
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedProject(null);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [selectedProject]);

    return (
        <>
            <section id="work" className="border-b border-white/15 px-6 py-16">
                <div className="mx-auto max-w-6xl">
                    <SectionHeading title="Projects" />

                    <div className="mt-8 grid gap-4">
                        {projects
                            .filter((project) => project.isPublished)
                            .map((project) => (
                                <article
                                    key={project.id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedProject(project)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" || event.key === " ") {
                                            event.preventDefault();
                                            setSelectedProject(project);
                                        }
                                    }}
                                    className="cursor-pointer rounded-xl border border-white/15 bg-card p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-neutral-900"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-xl font-semibold text-white">
                                            {project.title}
                                        </h3>
                                        {project.isOngoing ? (
                                            <span className="rounded-md border border-white/30 px-2 py-0.5 text-xs uppercase tracking-wide text-gray-300">
                                                In progress
                                            </span>
                                        ) : null}
                                    </div>

                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-300">
                                        {project.description}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag.label}
                                                className="rounded-md border border-white/10 px-2 py-1 text-xs text-gray-400 transition-colors duration-200 hover:border-white/20 hover:text-gray-200"
                                            >
                                                {tag.label}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                                        <span className="text-gray-400">Click to view details</span>

                                        <div className="flex gap-3">
                                            {project.repoUrl && (
                                                <a
                                                    href={project.repoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border-b border-transparent text-gray-200 hover:border-white"
                                                    onClick={(event) => event.stopPropagation()}
                                                >
                                                    Repository
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border-b border-transparent text-gray-200 hover:border-white"
                                                    onClick={(event) => event.stopPropagation()}
                                                >
                                                    Live
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                    </div>
                </div>
            </section>

            {selectedProject ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="w-full max-w-2xl border border-white/25 bg-black p-6"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-2xl font-semibold">{selectedProject.title}</h3>
                            <button
                                type="button"
                                onClick={() => setSelectedProject(null)}
                                className="border border-white/30 px-3 py-1 text-sm hover:border-white"
                            >
                                Close
                            </button>
                        </div>

                        <p className="mt-4 leading-7 text-gray-300">{selectedProject.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {selectedProject.tags.map((tag) => (
                                <span
                                    key={tag.label}
                                    className="border border-white/20 px-2 py-1 text-xs text-gray-300"
                                >
                                    {tag.label}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3 text-sm">
                            {selectedProject.repoUrl ? (
                                <a
                                    href={selectedProject.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-white/30 px-3 py-1.5 hover:border-white"
                                >
                                    Open Repository
                                </a>
                            ) : null}
                            {selectedProject.liveUrl ? (
                                <a
                                    href={selectedProject.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-white/30 px-3 py-1.5 hover:border-white"
                                >
                                    Open Live Project
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
