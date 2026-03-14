"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Home, Briefcase, User, FileText } from "lucide-react";
import { Linkedin, Twitter, Send, Github, Mail } from "lucide-react";
import type {
    NavItem,
    NavIconKey,
    SocialIconKey,
    SocialLink,
} from "@/lib/content/types";
import DarkModeToggle from "./DarkModeToggle";

const navIconMap: Record<NavIconKey, typeof Home> = {
    home: Home,
    work: Briefcase,
    about: User,
    resume: FileText,
};

const socialIconMap: Record<SocialIconKey, typeof Linkedin> = {
    linkedin: Linkedin,
    twitter: Twitter,
    behance: Send,
    github: Github,
    email: Mail,
};

type NavbarProps = {
    navItems: NavItem[];
    socialLinks: SocialLink[];
};

export default function Navbar({ navItems, socialLinks }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

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
        <>
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-6 left-6 z-50"
            >
                <motion.div
                    whileHover={{ scale: 1.14, y: -2 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="w-14 h-14 rounded-xl overflow-hidden cursor-pointer shadow-md"
                >
                    <Image
                        src="/logo.png"
                        alt="Ameya Bhagat logo"
                        width={56}
                        height={56}
                        priority
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </motion.div>

            {/* Center Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-white shadow-md"
                    } rounded-full px-2 py-2`}
            >
                <div className="flex items-center gap-1">
                    {navItems
                        .filter((item) => item.isActive)
                        .map((item) => {
                            const Icon = navIconMap[item.iconKey] ?? Home;
                            const isActive =
                                activeSection === item.href.replace("#", "");
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`relative p-3 rounded-full transition-all duration-200 group ${isActive
                                        ? "bg-black text-white"
                                        : "text-gray-500 hover:text-black hover:bg-gray-100"
                                        }`}
                                    aria-label={item.label}
                                >
                                    <Icon size={20} strokeWidth={1.8} />
                                    <AnimatePresence>
                                        {!isActive && (
                                            <motion.span
                                                initial={{ opacity: 0, y: 5 }}
                                                whileHover={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium bg-black text-white px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </a>
                            );
                        })}
                </div>
            </motion.nav>

            {/* Social Links */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="fixed top-6 right-24 z-50 hidden md:flex items-center gap-1 bg-white shadow-md rounded-full px-2 py-2"
            >
                {socialLinks
                    .filter(
                        (item) =>
                            item.isActive &&
                            (item.placement === "navbar" || item.placement === "both"),
                    )
                    .map((item) => {
                        const Icon = socialIconMap[item.iconKey] ?? Linkedin;
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-all duration-200"
                                aria-label={item.label}
                            >
                                <Icon size={20} strokeWidth={1.8} />
                            </a>
                        );
                    })}
            </motion.div>

            <div className="fixed top-6 right-6 z-50">
                <DarkModeToggle />
            </div>
        </>
    );
}
