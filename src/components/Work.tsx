"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, ShoppingCart, Package, TrendingUp, ShieldMinus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import type { TagIconKey, WorkProject } from "@/lib/content/types";
import { gradientClassMap, tagStyleClassMap } from "@/lib/content/design-tokens";
import { MOTION_DURATION, MOTION_EASE_OUT, MOTION_STAGGER } from "@/lib/motion";

const tagIconMap: Record<TagIconKey, typeof ShoppingCart> = {
    shopping: ShoppingCart,
    package: Package,
    trending: TrendingUp,
    shield: ShieldMinus,
};

const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * MOTION_STAGGER.loose,
            duration: MOTION_DURATION.slow,
            ease: MOTION_EASE_OUT,
        },
    }),
};

type WorkProps = {
    projects: WorkProject[];
};

export default function Work({ projects }: WorkProps) {
    return (
        <section id="work" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionHeading
                    icon={<Briefcase size={28} />}
                    title="My Work"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {projects
                        .filter((project) => project.isPublished)
                        .map((project, i) => (
                            <motion.div
                                key={project.id}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{ y: -10, scale: 1.01, transition: { duration: MOTION_DURATION.fast } }}
                                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                            >
                                {/* Card Content */}
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed mb-5 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => {
                                            const Icon = tagIconMap[tag.iconKey] ?? ShoppingCart;
                                            const tagStyle =
                                                tagStyleClassMap[tag.styleKey] ??
                                                tagStyleClassMap.neutral;
                                            return (
                                                <span
                                                    key={tag.label}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${tagStyle}`}
                                                >
                                                    <Icon size={14} />
                                                    {tag.label}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Card Image Area */}
                                <div
                                    className={`relative h-64 bg-linear-to-br ${gradientClassMap[project.gradientKey] ?? gradientClassMap["blue-indigo"]} flex items-center justify-center overflow-hidden`}
                                >
                                    {project.imagePath ? (
                                        <Image
                                            src={project.imagePath}
                                            alt={project.title}
                                            fill
                                            sizes="(min-width: 768px) 50vw, 100vw"
                                            className="object-cover"
                                        />
                                    ) : null}
                                    {project.imagePath ? (
                                        <div className="absolute inset-0 bg-black/10" />
                                    ) : null}
                                    <motion.div
                                        className="flex gap-4 items-end relative z-10"
                                        initial={{ y: 20, opacity: 0.8 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: MOTION_DURATION.medium, ease: MOTION_EASE_OUT }}
                                    >
                                        {/* Mock Phone Screens */}
                                        <div className="w-36 h-52 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                            <div className="w-full h-6 bg-gray-100 flex items-center justify-center">
                                                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <div className="h-2 bg-gray-200 rounded-full w-3/4" />
                                                <div className="h-2 bg-gray-200 rounded-full w-1/2" />
                                                <div className="h-16 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg mt-2" />
                                                <div className="h-2 bg-gray-200 rounded-full w-full" />
                                                <div className="h-2 bg-gray-200 rounded-full w-2/3" />
                                            </div>
                                        </div>
                                        <div className="w-40 h-56 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                            <div className="w-full h-6 bg-gray-100 flex items-center justify-center">
                                                <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <div className="h-2 bg-gray-200 rounded-full w-full" />
                                                <div className="h-2 bg-gray-200 rounded-full w-3/4" />
                                                <div className="grid grid-cols-3 gap-1.5 mt-2">
                                                    <div className="h-10 bg-linear-to-br from-indigo-100 to-purple-50 rounded-lg" />
                                                    <div className="h-10 bg-linear-to-br from-green-100 to-emerald-50 rounded-lg" />
                                                    <div className="h-10 bg-linear-to-br from-orange-100 to-yellow-50 rounded-lg" />
                                                </div>
                                                <div className="h-16 bg-linear-to-br from-gray-100 to-gray-50 rounded-lg mt-1" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </div>
        </section>
    );
}
