import {
    Github,
    Globe,
    Linkedin,
    Mail,
    Twitter,
    type LucideIcon,
} from "lucide-react";

import type { SocialIconKey } from "@/lib/content/types";

const socialIconByKey: Record<SocialIconKey, LucideIcon> = {
    linkedin: Linkedin,
    twitter: Twitter,
    behance: Globe,
    github: Github,
    email: Mail,
};

type SocialIconProps = {
    iconKey: SocialIconKey;
    className?: string;
};

export default function SocialIcon({ iconKey, className }: SocialIconProps) {
    const Icon = socialIconByKey[iconKey];
    return <Icon aria-hidden="true" className={className ?? "h-4 w-4"} />;
}