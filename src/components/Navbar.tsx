"use client";

import { useState, useEffect } from "react";
import type {
    NavItem,
    SocialLink,
} from "@/lib/content/types";
import SocialIcon from "@/components/SocialIcon";

type NavbarProps = {
    navItems: NavItem[];
    socialLinks: SocialLink[];
};

export default function Navbar({ navItems, socialLinks }: NavbarProps) {
    const [activeSection, setActiveSection] = useState("home");
    const resumeItem = navItems.find((item) => item.iconKey === "resume" && item.isActive);
    const primaryNavItems = navItems.filter(
        (item) => item.isActive && item.iconKey !== "resume",
    );

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "work", "about", "resume"];
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-40 border-b border-white/15 bg-black/95 backdrop-blur">
            <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6 md:px-8 md:py-5">
                <a href="#home" className="text-sm font-semibold tracking-[0.18em]">
                    AMEYA BHAGAT
                </a>

                <div className="order-3 flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar md:order-2 md:justify-center md:pb-0">
                    {primaryNavItems.map((item) => {
                        const isActive =
                            activeSection === item.href.replace("#", "");
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`rounded-md border px-4 py-2 text-sm whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 ${isActive
                                    ? "border-white bg-white text-black"
                                    : "border-white/25 text-white hover:border-white/50 hover:bg-white/10"
                                    }`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </div>

                <div className="order-2 flex items-center gap-2 text-sm text-gray-300 md:order-3 md:justify-end">
                    {resumeItem && (
                        <a
                            href={resumeItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-md border border-white bg-white px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-transparent hover:text-white"
                        >
                            RESUME
                        </a>
                    )}
                    {socialLinks
                        .filter(
                            (item) =>
                                item.isActive &&
                                (item.placement === "navbar" || item.placement === "both"),
                        )
                        .map((item) => {
                            const label = item.label.toUpperCase();
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-2.5 py-1.5 text-xs tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:text-white"
                                >
                                    <SocialIcon iconKey={item.iconKey} className="h-3.5 w-3.5" />
                                    {label}
                                </a>
                            );
                        })}
                </div>
            </nav>
        </header>
    );
}
