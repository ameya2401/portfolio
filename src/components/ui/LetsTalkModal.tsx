import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowUpRight, 
    Check,
    FileText,
    Twitter
} from 'lucide-react';
import { profile } from '@/data/profile';

interface LetsTalkModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LetsTalkModal: React.FC<LetsTalkModalProps> = ({ isOpen, onClose }) => {
    const [feedback, setFeedback] = useState<string | null>(null);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setFeedback(null);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle ESC key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleCopyEmail = () => {
        const email = profile.email;
        navigator.clipboard.writeText(email);
        setFeedback('Email copied to clipboard!');
        
        setTimeout(() => {
            window.location.href = `mailto:${email}`;
        }, 150);

        setTimeout(() => setFeedback(null), 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-[8px]"
                        onClick={onClose}
                    />

                    {/* Premium Contact Modal Container */}
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0, y: 12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.98, opacity: 0, y: 12 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-[440px] bg-white dark:bg-[#0c0c0e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-xl flex flex-col z-10 font-sans"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="px-6 pt-10 pb-6 text-left">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                Let&apos;s build something.
                            </h2>
                            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed max-w-[340px]">
                                Looking for Founding Engineer, Full-Stack Developer, and Design-minded engineering roles.
                            </p>
                        </div>

                        {/* List of Contact Rows */}
                        <div className="px-2 pb-6 space-y-1">
                            {/* Resume Link */}
                            <button
                                onClick={() => {
                                    window.open('https://drive.google.com/file/d/1rEQ2cCs-dJg18AEAcPp4AU5LHI4iTI9u/view?usp=sharing', '_blank');
                                    setFeedback('Opening Resume...');
                                    setTimeout(() => setFeedback(null), 3000);
                                }}
                                className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all active:scale-[0.97] text-left w-full"
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-4 h-4 fill-current text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                                    </svg>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">Resume</span>
                                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">View PDF resume</span>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>

                            {/* Email Link */}
                            <button
                                onClick={handleCopyEmail}
                                className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all active:scale-[0.97] text-left w-full"
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-4 h-4 fill-current text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                                    </svg>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">Email</span>
                                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{profile.email}</span>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>

                            {/* View Resume Link */}
                            <button
                                onClick={() => {
                                    window.open('/ameya_bhagat_resume.pdf', '_blank');
                                    setFeedback('Opening Resume in a new tab...');
                                    setTimeout(() => setFeedback(null), 3000);
                                }}
                                className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all active:scale-[0.97] text-left w-full"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">View Resume</span>
                                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Ameya Bhagat&apos;s Resume (PDF)</span>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>

                            {/* Twitter Link */}
                            <button
                                onClick={() => {
                                    window.open(profile.twitter, '_blank');
                                    setFeedback('Opening X / Twitter in a new tab...');
                                    setTimeout(() => setFeedback(null), 3000);
                                }}
                                className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all active:scale-[0.97] text-left w-full"
                            >
                                <div className="flex items-center gap-3">
                                    <Twitter className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">X / Twitter</span>
                                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{profile.twitterHandle}</span>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>

                        {/* Status Info */}
                        <div className="px-6 py-4 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between bg-zinc-50/50 dark:bg-black/20 text-[11px] text-zinc-400 dark:text-zinc-500">
                            {feedback ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 2 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1.5"
                                >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>{feedback}</span>
                                </motion.div>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
                                    Based in Bengaluru
                                </span>
                            )}
                            <button
                                onClick={onClose}
                                className="px-2 py-1 rounded bg-zinc-200/40 dark:bg-zinc-800/40 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 transition-all active:scale-[0.95] cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LetsTalkModal;
