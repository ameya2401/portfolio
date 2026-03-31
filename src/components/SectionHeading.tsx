"use client";

export default function SectionHeading({
    title,
    id,
}: {
    title: string;
    id?: string;
    icon?: React.ReactNode;
}) {
    return (
        <div id={id} className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {title}
            </h2>
            <div className="mt-3 h-px w-full bg-white/20" />
        </div>
    );
}
