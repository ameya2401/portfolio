"use client";

import { motion } from "framer-motion";
import { MOTION_DURATION, MOTION_EASE_OUT } from "@/lib/motion";

export default function SectionHeading({
    icon,
    title,
    id,
}: {
    icon: React.ReactNode;
    title: string;
    id?: string;
}) {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: MOTION_DURATION.medium, ease: MOTION_EASE_OUT }}
            className="flex flex-col items-center gap-4 mb-12"
        >
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600">
                {icon}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-center">
                {title}
            </h2>
        </motion.div>
    );
}
