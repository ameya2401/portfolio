import { projectOg } from "@/lib/projectOg";

export const alt = "Slate: Launch films you can make yours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectOg({ name: "Slate", line: "Launch films you can make yours", status: "Early access" });
}
