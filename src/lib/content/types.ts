export type NavIconKey = "home" | "work" | "about" | "resume";

export type SocialIconKey = "linkedin" | "twitter" | "behance" | "github" | "email";

export type TagIconKey = "shopping" | "package" | "trending" | "shield";

export type GradientKey =
    | "blue-indigo"
    | "orange-red"
    | "green-teal"
    | "purple-pink"
    | "gray-light"
    | "purple-dark"
    | "gray-dark"
    | "blue-cyan"
    | "rose-pink"
    | "amber-orange"
    | "blue-slate"
    | "orange-yellow"
    | "green-light"
    | "purple-light"
    | "emerald-green"
    | "pink-rose"
    | "cyan-blue";

export type TagStyleKey = "neutral" | "success" | "info";

export interface NavItem {
    label: string;
    href: string;
    iconKey: NavIconKey;
    sortOrder: number;
    isActive: boolean;
}

export interface SocialLink {
    label: string;
    href: string;
    iconKey: SocialIconKey;
    placement: "navbar" | "footer" | "both";
    sortOrder: number;
    isActive: boolean;
}

export interface HeroContent {
    statusText: string;
    headingPrefix: string;
    name: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    exploreLabel: string;
    tickerText: string;
}

export interface WorkTag {
    label: string;
    iconKey: TagIconKey;
    styleKey: TagStyleKey;
    sortOrder: number;
}

export interface WorkProject {
    id: string;
    title: string;
    description: string;
    imagePath?: string;
    gradientKey: GradientKey;
    sortOrder: number;
    isPublished: boolean;
    tags: WorkTag[];
}

export interface FramerBuild {
    id: string;
    title: string;
    description: string;
    imagePath?: string;
    gradientKey: GradientKey;
    accentClass: string;
    isDark: boolean;
    sortOrder: number;
    isPublished: boolean;
}

export interface AboutPhoto {
    imagePath?: string;
    alt: string;
    sortOrder: number;
    isActive: boolean;
}

export interface AboutTool {
    name: string;
    gradientClass: string;
    sortOrder: number;
    isActive: boolean;
}

export interface AboutInterest {
    title: string;
    gradientClass: string;
    icon: string;
    sortOrder: number;
    isActive: boolean;
}

export interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    description: string;
    sortOrder: number;
    isActive: boolean;
}

export interface AboutContent {
    title: string;
    intro: string;
    messagePlaceholder: string;
    photos: AboutPhoto[];
    tools: AboutTool[];
    interests: AboutInterest[];
    experience: ExperienceItem[];
}

export interface Destination {
    name: string;
    gradientKey: GradientKey;
    emoji: string;
    imagePath?: string;
    sortOrder: number;
    isPublished: boolean;
}

export interface FooterContent {
    heading: string;
    email: string;
    copyrightName: string;
}

export interface PortfolioContent {
    navItems: NavItem[];
    socialLinks: SocialLink[];
    hero: HeroContent;
    workProjects: WorkProject[];
    framerBuilds: FramerBuild[];
    about: AboutContent;
    photography: Destination[];
    footer: FooterContent;
}
