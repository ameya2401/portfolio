import { projectOg } from "@/lib/projectOg";

export const alt = "Glyph: AI brand identity for your next idea";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectOg({ name: "Glyph", line: "AI brand identity for your next idea", status: "Live · paid" });
}
