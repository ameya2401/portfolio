"use client";

import type { FooterContent, SocialLink } from "@/lib/content/types";
import SocialIcon from "@/components/SocialIcon";

type FooterProps = {
    socialLinks: SocialLink[];
    footer: FooterContent;
};

export default function Footer({ socialLinks, footer }: FooterProps) {
    return (
        <footer className="px-6 py-12">
            <div className="mx-auto max-w-6xl border border-white/20 bg-[#0a0a0a] p-6">
                <h2 className="text-2xl font-semibold">{footer.heading}</h2>
                <a
                    href={`mailto:${footer.email}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                >
                    <SocialIcon iconKey="email" className="h-4 w-4" />
                    {footer.email}
                </a>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
                    {socialLinks
                        .filter(
                            (item) =>
                                item.isActive &&
                                (item.placement === "footer" || item.placement === "both"),
                        )
                        .map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border-b border-transparent hover:border-white"
                            >
                                <SocialIcon iconKey={item.iconKey} className="h-4 w-4" />
                                {item.label}
                            </a>
                        ))}
                </div>

                <div className="mt-8 border-t border-white/20 pt-5 text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} {footer.copyrightName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
