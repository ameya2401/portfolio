"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import SectionHeading from "./SectionHeading";
import type { Destination } from "@/lib/content/types";
import { gradientClassMap } from "@/lib/content/design-tokens";
type PhotographyProps = {
    destinations: Destination[];
};

export default function Photography({ destinations }: PhotographyProps) {
    // Double the array for seamless infinite scroll
    const publishedDestinations = destinations.filter((dest) => dest.isPublished);
    const doubled = [...publishedDestinations, ...publishedDestinations];

    return (
        <section className="py-20 overflow-hidden">
            <div className="px-6">
                <SectionHeading
                    icon={<Camera size={28} />}
                    title="Core Strengths"
                />
            </div>

            {/* Infinite Scrolling Gallery */}
            <div className="relative mt-8">
                <div className="animate-scroll-gallery flex gap-5 w-max">
                    {doubled.map((dest, i) => (
                        <motion.div
                            key={`${dest.name}-${i}`}
                            whileHover={{ y: -12, rotate: 0, scale: 1.05 }}
                            className="shrink-0 w-48 sm:w-56 group cursor-pointer"
                            style={{
                                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                            }}
                        >
                            <div
                                className={`relative h-52 sm:h-64 bg-linear-to-br ${gradientClassMap[dest.gradientKey] ?? gradientClassMap["amber-orange"]} rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500`}
                            >
                                {dest.imagePath ? (
                                    <Image
                                        src={dest.imagePath}
                                        alt={dest.name}
                                        fill
                                        sizes="(min-width: 640px) 224px, 192px"
                                        className="object-cover"
                                    />
                                ) : null}
                                {/* Decorative content */}
                                {!dest.imagePath ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-6xl opacity-40 group-hover:opacity-60 group-hover:scale-125 transition-all duration-500">
                                            {dest.emoji}
                                        </span>
                                    </div>
                                ) : null}
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <p className="text-center mt-3 font-semibold text-gray-700 italic text-sm sm:text-base group-hover:text-black transition-colors">
                                {dest.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
