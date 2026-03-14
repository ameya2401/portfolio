"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Send, Github, Mail } from "lucide-react";
import type { FooterContent, SocialIconKey, SocialLink } from "@/lib/content/types";
import { MOTION_DURATION, MOTION_EASE_OUT, MOTION_STAGGER } from "@/lib/motion";

const socialIconMap: Record<SocialIconKey, typeof Linkedin> = {
    linkedin: Linkedin,
    twitter: Twitter,
    behance: Send,
    github: Github,
    email: Mail,
};

type FooterProps = {
    socialLinks: SocialLink[];
    footer: FooterContent;
};

export default function Footer({ socialLinks, footer }: FooterProps) {
    return (
        <footer className="relative bg-blue-600 text-white overflow-hidden">
            {/* Wavy top edge */}
            <div className="absolute -top-1 left-0 w-full">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-20 sm:h-28"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V0H0V120Z"
                        fill="white"
                    />
                </svg>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE_OUT }}
                    >
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
                            {footer.heading.split(" ")[0] ?? "Let&apos;s"}
                            <br />
                            {footer.heading.split(" ").slice(1).join(" ") || "Connect"}
                        </h2>
                        <a
                            href={`mailto:${footer.email}`}
                            className="text-lg sm:text-xl text-white/70 hover:text-white transition-colors font-medium"
                        >
                            {footer.email}
                        </a>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-8">
                            {socialLinks
                                .filter(
                                    (item) =>
                                        item.isActive &&
                                        (item.placement === "footer" || item.placement === "both"),
                                )
                                .map((item, i) => {
                                    const Icon = socialIconMap[item.iconKey] ?? Linkedin;
                                    return (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * MOTION_STAGGER.tight, duration: MOTION_DURATION.fast, ease: MOTION_EASE_OUT }}
                                            whileHover={{ scale: 1.15, y: -3 }}
                                            className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300"
                                        >
                                            <Icon size={20} />
                                        </motion.a>
                                    );
                                })}
                        </div>
                    </motion.div>

                    {/* Right - Logo Watermark */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 0.1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: MOTION_EASE_OUT }}
                        className="hidden lg:flex items-center justify-center"
                    >
                        <div className="text-[200px] font-black leading-none select-none text-white/10">
                            {(footer.copyrightName?.charAt(0) || "A").toUpperCase()}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-white/50">
                        © {new Date().getFullYear()} {footer.copyrightName}. All rights reserved.
                    </p>
                    <p className="text-sm text-white/50 flex items-center gap-1">
                        Built with ❤️ using Next.js & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}
