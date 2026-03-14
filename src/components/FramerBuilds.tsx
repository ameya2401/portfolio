"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Monitor, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import type { FramerBuild } from "@/lib/content/types";
import { gradientClassMap } from "@/lib/content/design-tokens";
import { MOTION_DURATION, MOTION_EASE_OUT, MOTION_STAGGER } from "@/lib/motion";

type FramerBuildsProps = {
    builds: FramerBuild[];
};

export default function FramerBuilds({ builds }: FramerBuildsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 420;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
            setTimeout(checkScroll, 400);
        }
    };

    return (
        <section className="py-20 px-6 bg-gray-50/50">
            <div className="max-w-6xl mx-auto">
                <SectionHeading
                    icon={<Monitor size={28} />}
                    title="Technical Highlights"
                />
            </div>

            {/* Carousel */}
            <div className="relative max-w-7xl mx-auto">
                {/* Scroll Buttons */}
                {canScrollLeft && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}
                {canScrollRight && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-blue-500 text-white shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-6 overflow-x-auto hide-scrollbar px-6 pb-4 snap-x snap-mandatory"
                >
                    {builds
                        .filter((build) => build.isPublished)
                        .map((build, i) => (
                            <motion.div
                                key={build.id}
                                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * MOTION_STAGGER.tight, duration: 0.65, ease: MOTION_EASE_OUT }}
                                whileHover={{ y: -8 }}
                                className="shrink-0 w-95 snap-start"
                            >
                                <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100">
                                    {/* Preview Area */}
                                    <div
                                        className={`relative h-56 bg-linear-to-br ${gradientClassMap[build.gradientKey] ?? gradientClassMap["gray-light"]} p-6 overflow-hidden`}
                                    >
                                        {build.imagePath ? (
                                            <Image
                                                src={build.imagePath}
                                                alt={build.title}
                                                fill
                                                sizes="380px"
                                                className="object-cover"
                                            />
                                        ) : null}
                                        {build.imagePath ? (
                                            <div className="absolute inset-0 bg-black/20" />
                                        ) : null}
                                        {/* Mock Browser */}
                                        <div className="w-full h-full bg-white/90 rounded-xl shadow-inner overflow-hidden transform group-hover:scale-105 transition-transform duration-500 relative z-10">
                                            <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                                <div className="flex-1 mx-3">
                                                    <div className="h-4 bg-gray-200 rounded-full w-2/3 mx-auto" />
                                                </div>
                                            </div>
                                            <div className="p-4 space-y-2">
                                                <div className={`h-3 ${build.accentClass} rounded-full w-1/3 opacity-70`} />
                                                <div className="h-2 bg-gray-200 rounded-full w-3/4" />
                                                <div className="h-2 bg-gray-200 rounded-full w-1/2" />
                                                <div className="grid grid-cols-2 gap-2 mt-3">
                                                    <div className="h-12 bg-gray-100 rounded-lg" />
                                                    <div className="h-12 bg-gray-100 rounded-lg" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {build.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                            {build.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </div>
        </section>
    );
}
