"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    User,
    Send,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import type { AboutContent } from "@/lib/content/types";
import { MOTION_DURATION, MOTION_EASE_OUT, MOTION_STAGGER } from "@/lib/motion";

type AboutMeProps = {
    about: AboutContent;
};

export default function AboutMe({ about }: AboutMeProps) {
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [message, setMessage] = useState("");
    const photos = about.photos.filter((photo) => photo.isActive);
    const tools = about.tools.filter((tool) => tool.isActive);
    const interests = about.interests.filter((interest) => interest.isActive);
    const experience = about.experience.filter((item) => item.isActive);
    const totalPhotos = Math.max(photos.length, 1);

    const nextPhoto = () => setCurrentPhoto((p) => (p + 1) % totalPhotos);
    const prevPhoto = () => setCurrentPhoto((p) => (p - 1 + totalPhotos) % totalPhotos);
    const activePhoto = photos[currentPhoto];

    return (
        <section id="about" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionHeading icon={<User size={28} />} title="About Me" />

                {/* Main About Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE_OUT }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Photo Carousel */}
                        <div className="relative h-80 lg:h-auto bg-linear-to-br from-blue-100 to-sky-50 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPhoto}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.45, ease: MOTION_EASE_OUT }}
                                    className="absolute inset-0 flex items-center justify-center p-8"
                                >
                                    <div className="w-64 h-72 lg:w-72 lg:h-80 bg-linear-to-br from-sky-300 to-blue-400 rounded-2xl shadow-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300">
                                        <div className="w-full h-full bg-linear-to-br from-blue-200 via-sky-200 to-cyan-100 flex items-center justify-center relative">
                                            {activePhoto?.imagePath ? (
                                                <Image
                                                    src={activePhoto.imagePath}
                                                    alt={activePhoto.alt}
                                                    fill
                                                    sizes="(min-width: 1024px) 288px, 256px"
                                                    className="object-cover"
                                                />
                                            ) : null}
                                            {!activePhoto?.imagePath ? (
                                                <div className="text-center">
                                                    <div className="w-20 h-20 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
                                                        <User size={32} className="text-white/80" />
                                                    </div>
                                                    <p className="text-white/70 font-medium text-sm">
                                                        {activePhoto?.alt ?? `Photo ${currentPhoto + 1}`}
                                                    </p>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Photo Navigation */}
                            <button
                                onClick={prevPhoto}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextPhoto}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Text Content */}
                        <div className="p-8 lg:p-10 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-3">{about.title}</h3>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                {about.intro}
                            </p>

                            {/* Message Input */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={about.messagePlaceholder}
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-11 h-11 bg-blue-500 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md"
                                >
                                    <Send size={18} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tools & Interests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: MOTION_DURATION.medium, ease: MOTION_EASE_OUT }}
                        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 lg:col-span-2"
                    >
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-2 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                            Toolkit
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {tools.map((tool) => (
                                <motion.div
                                    key={tool.name}
                                    whileHover={{ x: 4, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-2 p-2 bg-gray-50/50 rounded-xl border border-gray-100/80 hover:border-blue-200 hover:bg-white hover:shadow-sm transition-all duration-300 group/tool"
                                >
                                    <div className={`w-8 h-8 shadow-inner shrink-0 ${tool.gradientClass} rounded-lg flex items-center justify-center group-hover/tool:rotate-6 transition-transform`}>
                                        <span className="text-white font-bold text-base">
                                            {tool.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[13px] font-bold text-gray-800 truncate leading-tight">
                                            {tool.name}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Interests */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: MOTION_DURATION.medium, delay: MOTION_STAGGER.tight, ease: MOTION_EASE_OUT }}
                        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 lg:col-span-1"
                    >
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Focus Areas
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {interests.map((item) => (
                                <motion.div
                                    key={item.title}
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    className={`bg-linear-to-br ${item.gradientClass} rounded-2xl p-4 text-white cursor-pointer group`}
                                >
                                    <span className="text-2xl mb-2 block">{item.icon}</span>
                                    <span className="text-sm font-medium opacity-90">
                                        {item.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Experience Section */}
                <div id="resume">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold mb-6"
                    >
                        Experience
                    </motion.h3>
                    <div className="space-y-4">
                        {experience.map((exp, i) => (
                            <motion.div
                                key={`${exp.role}-${exp.company}-${i}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * MOTION_STAGGER.tight, duration: MOTION_DURATION.medium, ease: MOTION_EASE_OUT }}
                                whileHover={{ x: 8, y: -2, transition: { duration: 0.2 } }}
                                className="group flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                                    <ExternalLink size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                        <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                                            {exp.role}
                                        </h4>
                                        <span className="text-sm text-gray-400 font-medium">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium mt-0.5">
                                        {exp.company}
                                    </p>
                                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
