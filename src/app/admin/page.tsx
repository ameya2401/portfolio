import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
    deleteDestination,
    deleteFramerBuild,
    deleteWorkProject,
    saveSiteSettings,
    signOutAdmin,
    upsertDestination,
    upsertFramerBuild,
    upsertWorkProject,
} from "./actions";
import { defaultPortfolioContent } from "@/lib/content/default-content";
import { accentClassOptions, gradientKeyOptions } from "@/lib/content/design-tokens";

export default async function AdminPage() {
    if (!isSupabaseConfigured()) {
        return (
            <main className="min-h-screen bg-gray-50 px-6 py-16">
                <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-8">
                    <h1 className="text-2xl font-bold mb-3">Supabase not configured</h1>
                    <p className="text-gray-600 mb-4">
                        Add these environment variables to continue:
                    </p>
                    <ul className="text-sm bg-gray-100 rounded-xl p-4 space-y-1">
                        <li>NEXT_PUBLIC_SUPABASE_URL</li>
                        <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                    </ul>
                </div>
            </main>
        );
    }

    const supabase = await createSupabaseServerClient();

    if (!supabase) {
        redirect("/admin/login");
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin/login");
    }

    const { data: siteSettings } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

    const { data: workProjects } = await supabase
        .from("work_projects")
        .select("*")
        .order("sort_order", { ascending: true });

    const { data: framerBuilds } = await supabase
        .from("framer_builds")
        .select("*")
        .order("sort_order", { ascending: true });

    const { data: destinations } = await supabase
        .from("photography_destinations")
        .select("*")
        .order("sort_order", { ascending: true });

    const defaults = defaultPortfolioContent;

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Portfolio Admin</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Logged in as {user.email}
                        </p>
                    </div>
                    <form action={signOutAdmin}>
                        <button
                            type="submit"
                            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
                        >
                            Sign out
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-1">Site Settings</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Phase 1 editor: hero + footer/contact content.
                    </p>

                    <form action={saveSiteSettings} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Hero Status Text</label>
                            <input
                                name="hero_status_text"
                                defaultValue={siteSettings?.hero_status_text ?? defaults.hero.statusText}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Hero Prefix</label>
                            <input
                                name="hero_heading_prefix"
                                defaultValue={siteSettings?.hero_heading_prefix ?? defaults.hero.headingPrefix}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Hero Name</label>
                            <input
                                name="hero_name"
                                defaultValue={siteSettings?.hero_name ?? defaults.hero.name}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">CTA Label</label>
                            <input
                                name="hero_cta_label"
                                defaultValue={siteSettings?.hero_cta_label ?? defaults.hero.ctaLabel}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">CTA Href</label>
                            <input
                                name="hero_cta_href"
                                defaultValue={siteSettings?.hero_cta_href ?? defaults.hero.ctaHref}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Explore Label</label>
                            <input
                                name="hero_explore_label"
                                defaultValue={siteSettings?.hero_explore_label ?? defaults.hero.exploreLabel}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
                            <textarea
                                name="hero_subtitle"
                                defaultValue={siteSettings?.hero_subtitle ?? defaults.hero.subtitle}
                                rows={3}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Ticker Text</label>
                            <input
                                name="hero_ticker_text"
                                defaultValue={siteSettings?.hero_ticker_text ?? defaults.hero.tickerText}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Contact Email</label>
                            <input
                                name="contact_email"
                                defaultValue={siteSettings?.contact_email ?? defaults.footer.email}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Footer Heading</label>
                            <input
                                name="footer_heading"
                                defaultValue={siteSettings?.footer_heading ?? defaults.footer.heading}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Copyright Name</label>
                            <input
                                name="copyright_name"
                                defaultValue={siteSettings?.copyright_name ?? defaults.footer.copyrightName}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                            />
                        </div>

                        <div className="md:col-span-2 pt-2">
                            <button
                                type="submit"
                                className="rounded-xl bg-black text-white px-5 py-2.5 text-sm font-semibold hover:opacity-90"
                            >
                                Save Settings
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-8">
                    <h2 className="text-xl font-bold mb-1">Work Projects</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Add, update, publish, and reorder your main portfolio projects.
                    </p>

                    <div className="space-y-6">
                        {(workProjects && workProjects.length > 0 ? workProjects : defaults.workProjects).map((project, index) => (
                            <div key={project.id ?? `default-project-${index}`} className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-gray-800">Project {index + 1}</h3>
                                    {project.id ? (
                                        <form action={deleteWorkProject}>
                                            <input type="hidden" name="id" value={project.id} />
                                            <button type="submit" className="text-sm text-red-600 hover:text-red-700 font-medium">
                                                Delete
                                            </button>
                                        </form>
                                    ) : null}
                                </div>

                                <form action={upsertWorkProject} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {project.id ? <input type="hidden" name="id" value={project.id} /> : null}
                                    <input type="hidden" name="current_image_path" value={project.image_path ?? project.imagePath ?? ""} />

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title</label>
                                        <input
                                            name="title"
                                            defaultValue={project.title}
                                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Sort Order</label>
                                        <input
                                            name="sort_order"
                                            type="number"
                                            defaultValue={project.sort_order ?? project.sortOrder ?? index + 1}
                                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            rows={3}
                                            defaultValue={project.description}
                                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Gradient</label>
                                        <select
                                            name="gradient_key"
                                            defaultValue={project.gradient_key ?? project.gradientKey ?? "blue-indigo"}
                                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white"
                                        >
                                            {gradientKeyOptions.map((gradient) => (
                                                <option key={gradient} value={gradient}>{gradient}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Upload Image</label>
                                        <input
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white"
                                        />
                                    </div>

                                    <label className="inline-flex items-center gap-2 text-sm font-medium md:col-span-2">
                                        <input
                                            type="checkbox"
                                            name="is_published"
                                            defaultChecked={project.is_published ?? project.isPublished ?? true}
                                            className="rounded"
                                        />
                                        Published
                                    </label>

                                    <div className="md:col-span-2">
                                        <button type="submit" className="rounded-xl bg-black text-white px-4 py-2.5 text-sm font-semibold hover:opacity-90">
                                            Save Project
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ))}

                        <div className="border border-dashed border-gray-300 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-800 mb-3">Add New Project</h3>
                            <form action={upsertWorkProject} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input type="hidden" name="current_image_path" value="" />
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input name="title" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                                    <input name="sort_order" type="number" defaultValue={99} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea name="description" rows={3} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gradient</label>
                                    <select name="gradient_key" defaultValue="blue-indigo" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white">
                                        {gradientKeyOptions.map((gradient) => (
                                            <option key={gradient} value={gradient}>{gradient}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Image</label>
                                    <input name="image" type="file" accept="image/*" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white" />
                                </div>
                                <label className="inline-flex items-center gap-2 text-sm font-medium md:col-span-2">
                                    <input type="checkbox" name="is_published" defaultChecked className="rounded" />
                                    Published
                                </label>
                                <div className="md:col-span-2">
                                    <button type="submit" className="rounded-xl bg-black text-white px-4 py-2.5 text-sm font-semibold hover:opacity-90">
                                        Add Project
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-8">
                    <h2 className="text-xl font-bold mb-1">Framer Builds</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Manage your Framer build cards and publishing state.
                    </p>

                    <div className="space-y-6">
                        {(framerBuilds && framerBuilds.length > 0 ? framerBuilds : defaults.framerBuilds).map((build, index) => (
                            <div key={build.id ?? `default-build-${index}`} className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-gray-800">Build {index + 1}</h3>
                                    {build.id ? (
                                        <form action={deleteFramerBuild}>
                                            <input type="hidden" name="id" value={build.id} />
                                            <button type="submit" className="text-sm text-red-600 hover:text-red-700 font-medium">
                                                Delete
                                            </button>
                                        </form>
                                    ) : null}
                                </div>

                                <form action={upsertFramerBuild} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {build.id ? <input type="hidden" name="id" value={build.id} /> : null}
                                    <input type="hidden" name="current_image_path" value={build.image_path ?? build.imagePath ?? ""} />

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title</label>
                                        <input name="title" defaultValue={build.title} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Sort Order</label>
                                        <input name="sort_order" type="number" defaultValue={build.sort_order ?? build.sortOrder ?? index + 1} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Description</label>
                                        <textarea name="description" rows={3} defaultValue={build.description} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Gradient</label>
                                        <select name="gradient_key" defaultValue={build.gradient_key ?? build.gradientKey ?? "gray-light"} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white">
                                            {gradientKeyOptions.map((gradient) => (
                                                <option key={gradient} value={gradient}>{gradient}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Accent</label>
                                        <select name="accent_class" defaultValue={build.accent_class ?? build.accentClass ?? "bg-gray-800"} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white">
                                            {accentClassOptions.map((accent) => (
                                                <option key={accent} value={accent}>{accent}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Upload Image</label>
                                        <input name="image" type="file" accept="image/*" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white" />
                                    </div>
                                    <label className="inline-flex items-center gap-2 text-sm font-medium">
                                        <input type="checkbox" name="is_dark" defaultChecked={build.is_dark ?? build.isDark ?? false} className="rounded" />
                                        Dark Theme Card
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm font-medium md:col-span-2">
                                        <input type="checkbox" name="is_published" defaultChecked={build.is_published ?? build.isPublished ?? true} className="rounded" />
                                        Published
                                    </label>
                                    <div className="md:col-span-2">
                                        <button type="submit" className="rounded-xl bg-black text-white px-4 py-2.5 text-sm font-semibold hover:opacity-90">
                                            Save Build
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ))}

                        <div className="border border-dashed border-gray-300 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-800 mb-3">Add New Build</h3>
                            <form action={upsertFramerBuild} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input type="hidden" name="current_image_path" value="" />
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input name="title" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                                    <input name="sort_order" type="number" defaultValue={99} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea name="description" rows={3} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gradient</label>
                                    <select name="gradient_key" defaultValue="gray-light" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white">
                                        {gradientKeyOptions.map((gradient) => (
                                            <option key={gradient} value={gradient}>{gradient}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Accent</label>
                                    <select name="accent_class" defaultValue="bg-gray-800" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white">
                                        {accentClassOptions.map((accent) => (
                                            <option key={accent} value={accent}>{accent}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Image</label>
                                    <input name="image" type="file" accept="image/*" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white" />
                                </div>
                                <label className="inline-flex items-center gap-2 text-sm font-medium">
                                    <input type="checkbox" name="is_dark" className="rounded" />
                                    Dark Theme Card
                                </label>
                                <label className="inline-flex items-center gap-2 text-sm font-medium md:col-span-2">
                                    <input type="checkbox" name="is_published" defaultChecked className="rounded" />
                                    Published
                                </label>
                                <div className="md:col-span-2">
                                    <button type="submit" className="rounded-xl bg-black text-white px-4 py-2.5 text-sm font-semibold hover:opacity-90">
                                        Add Build
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-8">
                    <h2 className="text-xl font-bold mb-1">Photography Destinations</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Edit your destination cards and optional uploaded photos.
                    </p>

                    <div className="space-y-6">
                        {(destinations && destinations.length > 0 ? destinations : defaults.photography).map((destination, index) => (
                            <div key={destination.id ?? `default-destination-${index}`} className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-gray-800">Destination {index + 1}</h3>
                                    {destination.id ? (
                                        <form action={deleteDestination}>
                                            <input type="hidden" name="id" value={destination.id} />
                                            <button type="submit" className="text-sm text-red-600 hover:text-red-700 font-medium">
                                                Delete
                                            </button>
                                        </form>
                                    ) : null}
                                </div>

                                <form action={upsertDestination} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {destination.id ? <input type="hidden" name="id" value={destination.id} /> : null}
                                    <input type="hidden" name="current_image_path" value={destination.image_path ?? destination.imagePath ?? ""} />

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name</label>
                                        <input name="name" defaultValue={destination.name} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Emoji</label>
                                        <input name="emoji" defaultValue={destination.emoji} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Sort Order</label>
                                        <input name="sort_order" type="number" defaultValue={destination.sort_order ?? destination.sortOrder ?? index + 1} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Gradient</label>
                                        <select name="gradient_key" defaultValue={destination.gradient_key ?? destination.gradientKey ?? "amber-orange"} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white">
                                            {gradientKeyOptions.map((gradient) => (
                                                <option key={gradient} value={gradient}>{gradient}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Upload Image</label>
                                        <input name="image" type="file" accept="image/*" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white" />
                                    </div>
                                    <label className="inline-flex items-center gap-2 text-sm font-medium md:col-span-2">
                                        <input type="checkbox" name="is_published" defaultChecked={destination.is_published ?? destination.isPublished ?? true} className="rounded" />
                                        Published
                                    </label>
                                    <div className="md:col-span-2">
                                        <button type="submit" className="rounded-xl bg-black text-white px-4 py-2.5 text-sm font-semibold hover:opacity-90">
                                            Save Destination
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ))}

                        <div className="border border-dashed border-gray-300 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-800 mb-3">Add New Destination</h3>
                            <form action={upsertDestination} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input type="hidden" name="current_image_path" value="" />
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input name="name" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Emoji</label>
                                    <input name="emoji" defaultValue="📍" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                                    <input name="sort_order" type="number" defaultValue={99} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gradient</label>
                                    <select name="gradient_key" defaultValue="amber-orange" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white">
                                        {gradientKeyOptions.map((gradient) => (
                                            <option key={gradient} value={gradient}>{gradient}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Image</label>
                                    <input name="image" type="file" accept="image/*" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white" />
                                </div>
                                <label className="inline-flex items-center gap-2 text-sm font-medium md:col-span-2">
                                    <input type="checkbox" name="is_published" defaultChecked className="rounded" />
                                    Published
                                </label>
                                <div className="md:col-span-2">
                                    <button type="submit" className="rounded-xl bg-black text-white px-4 py-2.5 text-sm font-semibold hover:opacity-90">
                                        Add Destination
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
