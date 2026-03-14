import type { GradientKey, TagStyleKey } from "./types";

export const gradientClassMap: Record<GradientKey, string> = {
    "blue-indigo": "from-blue-50 to-indigo-50",
    "orange-red": "from-orange-50 to-red-50",
    "green-teal": "from-green-50 to-teal-50",
    "purple-pink": "from-purple-50 to-pink-50",
    "gray-light": "from-gray-100 to-gray-50",
    "purple-dark": "from-purple-900 to-indigo-900",
    "gray-dark": "from-gray-900 to-black",
    "blue-cyan": "from-blue-50 to-cyan-50",
    "rose-pink": "from-rose-50 to-pink-50",
    "amber-orange": "from-amber-200 to-orange-200",
    "blue-slate": "from-blue-200 to-slate-300",
    "orange-yellow": "from-orange-300 to-yellow-200",
    "green-light": "from-green-200 to-teal-200",
    "purple-light": "from-purple-200 to-pink-200",
    "emerald-green": "from-emerald-200 to-green-300",
    "pink-rose": "from-pink-200 to-rose-300",
    "cyan-blue": "from-cyan-200 to-blue-200",
};

export const tagStyleClassMap: Record<TagStyleKey, string> = {
    neutral: "bg-gray-100 text-gray-700",
    success: "bg-green-50 text-green-700",
    info: "bg-blue-50 text-blue-700",
};

export const gradientKeyOptions: GradientKey[] = [
    "blue-indigo",
    "orange-red",
    "green-teal",
    "purple-pink",
    "gray-light",
    "purple-dark",
    "gray-dark",
    "blue-cyan",
    "rose-pink",
    "amber-orange",
    "blue-slate",
    "orange-yellow",
    "green-light",
    "purple-light",
    "emerald-green",
    "pink-rose",
    "cyan-blue",
];

export const accentClassOptions = [
    "bg-gray-800",
    "bg-purple-600",
    "bg-emerald-500",
    "bg-blue-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-cyan-500",
    "bg-orange-500",
];
