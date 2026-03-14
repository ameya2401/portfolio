"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function normalizeText(value: FormDataEntryValue | null, fallback = "") {
    if (typeof value !== "string") return fallback;
    return value.trim();
}

function normalizeNumber(value: FormDataEntryValue | null, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeBool(value: FormDataEntryValue | null) {
    return value === "on" || value === "true";
}

function safeFileName(fileName: string) {
    return fileName
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, "-")
        .replace(/-+/g, "-");
}

async function uploadImageIfProvided(
    supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
    formData: FormData,
    fieldName: string,
    prefix: string,
) {
    const imageEntry = formData.get(fieldName);

    if (!(imageEntry instanceof File) || imageEntry.size === 0) {
        return null;
    }

    const storagePath = `${prefix}/${Date.now()}-${safeFileName(imageEntry.name)}`;

    const { error: uploadError } = await supabase.storage
        .from("portfolio-public")
        .upload(storagePath, imageEntry, {
            upsert: true,
            contentType: imageEntry.type || undefined,
        });

    if (uploadError) {
        throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from("portfolio-public").getPublicUrl(storagePath);
    return data.publicUrl;
}

async function getAuthedSupabase() {
    const supabase = await createSupabaseServerClient();

    if (!supabase) {
        throw new Error("Supabase is not configured.");
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin/login");
    }

    return supabase;
}

export async function signOutAdmin() {
    const supabase = await createSupabaseServerClient();

    if (!supabase) {
        redirect("/admin/login");
    }

    await supabase.auth.signOut();
    redirect("/admin/login");
}

export async function saveSiteSettings(formData: FormData) {
    const supabase = await getAuthedSupabase();

    const payload = {
        id: 1,
        hero_status_text: String(formData.get("hero_status_text") ?? ""),
        hero_heading_prefix: String(formData.get("hero_heading_prefix") ?? ""),
        hero_name: String(formData.get("hero_name") ?? ""),
        hero_subtitle: String(formData.get("hero_subtitle") ?? ""),
        hero_cta_label: String(formData.get("hero_cta_label") ?? ""),
        hero_cta_href: String(formData.get("hero_cta_href") ?? ""),
        hero_explore_label: String(formData.get("hero_explore_label") ?? ""),
        hero_ticker_text: String(formData.get("hero_ticker_text") ?? ""),
        contact_email: String(formData.get("contact_email") ?? ""),
        footer_heading: String(formData.get("footer_heading") ?? ""),
        copyright_name: String(formData.get("copyright_name") ?? ""),
    };

    const { error } = await supabase.from("site_settings").upsert(payload, {
        onConflict: "id",
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/admin");
}

export async function upsertWorkProject(formData: FormData) {
    const supabase = await getAuthedSupabase();
    const projectId = normalizeText(formData.get("id"), "");
    const currentImagePath = normalizeText(formData.get("current_image_path"), "");

    const uploadedImagePath = await uploadImageIfProvided(
        supabase,
        formData,
        "image",
        `work/${projectId || "new"}`,
    );

    const payload = {
        ...(projectId ? { id: projectId } : {}),
        title: normalizeText(formData.get("title"), "Untitled project"),
        description: normalizeText(formData.get("description"), ""),
        gradient_key: normalizeText(formData.get("gradient_key"), "blue-indigo"),
        image_path: uploadedImagePath ?? (currentImagePath || null),
        sort_order: normalizeNumber(formData.get("sort_order"), 0),
        is_published: normalizeBool(formData.get("is_published")),
    };

    const { error } = await supabase.from("work_projects").upsert(payload);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/admin");
}

export async function deleteWorkProject(formData: FormData) {
    const supabase = await getAuthedSupabase();
    const id = normalizeText(formData.get("id"));

    if (!id) return;

    const { error } = await supabase.from("work_projects").delete().eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/admin");
}

export async function upsertFramerBuild(formData: FormData) {
    const supabase = await getAuthedSupabase();
    const buildId = normalizeText(formData.get("id"), "");
    const currentImagePath = normalizeText(formData.get("current_image_path"), "");

    const uploadedImagePath = await uploadImageIfProvided(
        supabase,
        formData,
        "image",
        `framer-builds/${buildId || "new"}`,
    );

    const payload = {
        ...(buildId ? { id: buildId } : {}),
        title: normalizeText(formData.get("title"), "Untitled build"),
        description: normalizeText(formData.get("description"), ""),
        gradient_key: normalizeText(formData.get("gradient_key"), "gray-light"),
        accent_class: normalizeText(formData.get("accent_class"), "bg-gray-800"),
        image_path: uploadedImagePath ?? (currentImagePath || null),
        sort_order: normalizeNumber(formData.get("sort_order"), 0),
        is_dark: normalizeBool(formData.get("is_dark")),
        is_published: normalizeBool(formData.get("is_published")),
    };

    const { error } = await supabase.from("framer_builds").upsert(payload);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/admin");
}

export async function deleteFramerBuild(formData: FormData) {
    const supabase = await getAuthedSupabase();
    const id = normalizeText(formData.get("id"));

    if (!id) return;

    const { error } = await supabase.from("framer_builds").delete().eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/admin");
}

export async function upsertDestination(formData: FormData) {
    const supabase = await getAuthedSupabase();
    const destinationId = normalizeText(formData.get("id"), "");
    const currentImagePath = normalizeText(formData.get("current_image_path"), "");

    const uploadedImagePath = await uploadImageIfProvided(
        supabase,
        formData,
        "image",
        `photography/${destinationId || "new"}`,
    );

    const payload = {
        ...(destinationId ? { id: destinationId } : {}),
        name: normalizeText(formData.get("name"), "Untitled destination"),
        emoji: normalizeText(formData.get("emoji"), "📍"),
        image_path: uploadedImagePath ?? (currentImagePath || null),
        gradient_key: normalizeText(formData.get("gradient_key"), "amber-orange"),
        sort_order: normalizeNumber(formData.get("sort_order"), 0),
        is_published: normalizeBool(formData.get("is_published")),
    };

    const { error } = await supabase
        .from("photography_destinations")
        .upsert(payload);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/admin");
}

export async function deleteDestination(formData: FormData) {
    const supabase = await getAuthedSupabase();
    const id = normalizeText(formData.get("id"));

    if (!id) return;

    const { error } = await supabase
        .from("photography_destinations")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/admin");
}
