import { createClient } from "@supabase/supabase-js";
import { defaultPortfolioContent } from "./default-content";
import type {
    AboutContent,
    Destination,
    FramerBuild,
    NavItem,
    PortfolioContent,
    SocialLink,
    WorkProject,
    WorkTag,
} from "./types";
import { isSupabaseConfigured } from "../supabase/config";

function bySortOrder<T extends { sortOrder: number }>(items: T[]) {
    return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

function mapNavItems(rows: any[] | null | undefined): NavItem[] {
    if (!rows?.length) return defaultPortfolioContent.navItems;

    return bySortOrder(
        rows
            .filter((row) => row.is_active !== false)
            .map((row) => ({
                label: row.label,
                href: row.href,
                iconKey: row.icon_key,
                sortOrder: row.sort_order ?? 0,
                isActive: row.is_active ?? true,
            })),
    );
}

function mapSocialLinks(rows: any[] | null | undefined): SocialLink[] {
    if (!rows?.length) return defaultPortfolioContent.socialLinks;

    return bySortOrder(
        rows
            .filter((row) => row.is_active !== false)
            .map((row) => ({
                label: row.label,
                href: row.href,
                iconKey: row.icon_key,
                placement: row.placement ?? "both",
                sortOrder: row.sort_order ?? 0,
                isActive: row.is_active ?? true,
            })),
    );
}

function mapWorkProjects(rows: any[] | null | undefined): WorkProject[] {
    if (!rows?.length) return defaultPortfolioContent.workProjects;

    return bySortOrder(
        rows
            .filter((row) => row.is_published !== false)
            .map((row) => ({
                id: String(row.id),
                title: row.title,
                description: row.description,
                imagePath: row.image_path ?? undefined,
                gradientKey: row.gradient_key,
                sortOrder: row.sort_order ?? 0,
                isPublished: row.is_published ?? true,
                tags: bySortOrder<WorkTag>(
                    (row.work_project_tags ?? []).map((tag: any) => ({
                        label: tag.label,
                        iconKey: tag.icon_key,
                        styleKey: tag.style_key,
                        sortOrder: tag.sort_order ?? 0,
                    })),
                ),
            })),
    );
}

function mapFramerBuilds(rows: any[] | null | undefined): FramerBuild[] {
    if (!rows?.length) return defaultPortfolioContent.framerBuilds;

    return bySortOrder(
        rows
            .filter((row) => row.is_published !== false)
            .map((row) => ({
                id: String(row.id),
                title: row.title,
                description: row.description,
                imagePath: row.image_path ?? undefined,
                gradientKey: row.gradient_key,
                accentClass: row.accent_class,
                isDark: row.is_dark ?? false,
                sortOrder: row.sort_order ?? 0,
                isPublished: row.is_published ?? true,
            })),
    );
}

function mapAboutContent(
    profileRow: any | null,
    toolsRows: any[] | null | undefined,
    interestsRows: any[] | null | undefined,
    experienceRows: any[] | null | undefined,
    photosRows: any[] | null | undefined,
): AboutContent {
    return {
        title: profileRow?.title ?? defaultPortfolioContent.about.title,
        intro: profileRow?.intro ?? defaultPortfolioContent.about.intro,
        messagePlaceholder:
            profileRow?.message_placeholder ??
            defaultPortfolioContent.about.messagePlaceholder,
        photos:
            photosRows?.length
                ? bySortOrder(
                    photosRows
                        .filter((row) => row.is_active !== false)
                        .map((row) => ({
                            imagePath: row.image_path ?? undefined,
                            alt: row.alt ?? "About photo",
                            sortOrder: row.sort_order ?? 0,
                            isActive: row.is_active ?? true,
                        })),
                )
                : defaultPortfolioContent.about.photos,
        tools:
            toolsRows?.length
                ? bySortOrder(
                    toolsRows
                        .filter((row) => row.is_active !== false)
                        .map((row) => ({
                            name: row.name,
                            gradientClass: row.gradient_class,
                            sortOrder: row.sort_order ?? 0,
                            isActive: row.is_active ?? true,
                        })),
                )
                : defaultPortfolioContent.about.tools,
        interests:
            interestsRows?.length
                ? bySortOrder(
                    interestsRows
                        .filter((row) => row.is_active !== false)
                        .map((row) => ({
                            title: row.title,
                            gradientClass: row.gradient_class,
                            icon: row.icon,
                            sortOrder: row.sort_order ?? 0,
                            isActive: row.is_active ?? true,
                        })),
                )
                : defaultPortfolioContent.about.interests,
        experience:
            experienceRows?.length
                ? bySortOrder(
                    experienceRows
                        .filter((row) => row.is_active !== false)
                        .map((row) => ({
                            role: row.role,
                            company: row.company,
                            period: row.period,
                            description: row.description,
                            sortOrder: row.sort_order ?? 0,
                            isActive: row.is_active ?? true,
                        })),
                )
                : defaultPortfolioContent.about.experience,
    };
}

function mapPhotography(rows: any[] | null | undefined): Destination[] {
    if (!rows?.length) return defaultPortfolioContent.photography;

    return bySortOrder(
        rows
            .filter((row) => row.is_published !== false)
            .map((row) => ({
                name: row.name,
                gradientKey: row.gradient_key,
                emoji: row.emoji,
                imagePath: row.image_path ?? undefined,
                sortOrder: row.sort_order ?? 0,
                isPublished: row.is_published ?? true,
            })),
    );
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
    if (!isSupabaseConfigured()) {
        return defaultPortfolioContent;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
    });

    try {
        const [
            siteSettingsRes,
            navItemsRes,
            socialLinksRes,
            workProjectsRes,
            framerBuildsRes,
            aboutProfileRes,
            aboutToolsRes,
            aboutInterestsRes,
            aboutExperienceRes,
            aboutPhotosRes,
            photographyRes,
        ] = await Promise.all([
            supabase.from("site_settings").select("*").limit(1).maybeSingle(),
            supabase.from("nav_items").select("*").order("sort_order", { ascending: true }),
            supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
            supabase
                .from("work_projects")
                .select("*, work_project_tags(*)")
                .order("sort_order", { ascending: true }),
            supabase.from("framer_builds").select("*").order("sort_order", { ascending: true }),
            supabase.from("about_profile").select("*").limit(1).maybeSingle(),
            supabase.from("about_tools").select("*").order("sort_order", { ascending: true }),
            supabase.from("about_interests").select("*").order("sort_order", { ascending: true }),
            supabase.from("about_experience").select("*").order("sort_order", { ascending: true }),
            supabase.from("about_photos").select("*").order("sort_order", { ascending: true }),
            supabase
                .from("photography_destinations")
                .select("*")
                .order("sort_order", { ascending: true }),
        ]);

        if (
            siteSettingsRes.error ||
            navItemsRes.error ||
            socialLinksRes.error ||
            workProjectsRes.error ||
            framerBuildsRes.error ||
            aboutProfileRes.error ||
            aboutToolsRes.error ||
            aboutInterestsRes.error ||
            aboutExperienceRes.error ||
            aboutPhotosRes.error ||
            photographyRes.error
        ) {
            return defaultPortfolioContent;
        }

        const settings = siteSettingsRes.data;

        return {
            navItems: mapNavItems(navItemsRes.data),
            socialLinks: mapSocialLinks(socialLinksRes.data),
            hero: {
                statusText: settings?.hero_status_text ?? defaultPortfolioContent.hero.statusText,
                headingPrefix:
                    settings?.hero_heading_prefix ?? defaultPortfolioContent.hero.headingPrefix,
                name: settings?.hero_name ?? defaultPortfolioContent.hero.name,
                subtitle: settings?.hero_subtitle ?? defaultPortfolioContent.hero.subtitle,
                ctaLabel: settings?.hero_cta_label ?? defaultPortfolioContent.hero.ctaLabel,
                ctaHref: settings?.hero_cta_href ?? defaultPortfolioContent.hero.ctaHref,
                exploreLabel:
                    settings?.hero_explore_label ?? defaultPortfolioContent.hero.exploreLabel,
                tickerText: settings?.hero_ticker_text ?? defaultPortfolioContent.hero.tickerText,
            },
            workProjects: mapWorkProjects(workProjectsRes.data),
            framerBuilds: mapFramerBuilds(framerBuildsRes.data),
            about: mapAboutContent(
                aboutProfileRes.data,
                aboutToolsRes.data,
                aboutInterestsRes.data,
                aboutExperienceRes.data,
                aboutPhotosRes.data,
            ),
            photography: mapPhotography(photographyRes.data),
            footer: {
                heading: settings?.footer_heading ?? defaultPortfolioContent.footer.heading,
                email: settings?.contact_email ?? defaultPortfolioContent.footer.email,
                copyrightName:
                    settings?.copyright_name ?? defaultPortfolioContent.footer.copyrightName,
            },
        };
    } catch {
        return defaultPortfolioContent;
    }
}
