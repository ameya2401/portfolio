"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import type { HeroContent } from "@/lib/content/types";
import { MOTION_DURATION, MOTION_EASE_OUT, MOTION_STAGGER } from "@/lib/motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: MOTION_STAGGER.normal,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: MOTION_DURATION.slow,
            ease: MOTION_EASE_OUT,
        },
    },
};

type HeroProps = {
    hero: HeroContent;
};

export default function Hero({ hero }: HeroProps) {
    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
        >
            {/* Background subtle gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-blue-50/30 via-white to-white pointer-events-none" />

            <motion.div
                aria-hidden
                className="absolute -top-32 -left-24 w-72 h-72 rounded-full bg-blue-300/20 blur-3xl pointer-events-none"
                animate={{ x: [0, 26, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="absolute -bottom-28 -right-16 w-80 h-80 rounded-full bg-indigo-300/20 blur-3xl pointer-events-none"
                animate={{ x: [0, -24, 0], y: [0, -14, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
            >
                {/* Status badge */}
                <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm mb-10"
                >
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">
                        {hero.statusText}
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
                >
                    {hero.headingPrefix}{" "}
                    <span className="relative">
                        {hero.name}
                        <motion.div
                            className="absolute -bottom-2 left-0 w-full h-1 bg-black rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            style={{ transformOrigin: "left" }}
                        />
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl text-gray-500 max-w-lg mb-10 leading-relaxed"
                >
                    {hero.subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.a
                    href={hero.ctaHref}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-lg font-semibold shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300"
                >
                    {hero.ctaLabel}
                    <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </motion.a>

                {/* Explore Work */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 flex flex-col items-center gap-3"
                >
                    <span className="text-sm text-gray-400 font-medium">
                        {hero.exploreLabel}
                    </span>
                    <motion.a
                        href="#work"
                        animate={{ y: [0, 8, 0], scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                        <ChevronDown size={20} />
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Marquee Ticker */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="absolute bottom-8 left-0 w-full overflow-hidden"
            >
                <div className="animate-marquee whitespace-nowrap flex items-center">
                    {[...Array(8)].map((_, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-3 mx-8 text-sm font-medium text-gray-400"
                        >
                            <Sparkles size={16} className="text-blue-400" />
                            {hero.tickerText}
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
