export const accents = [
  { id: "green", hue: 140, label: "Green", light: "#477452", dark: "#94b99c", shift: 0 },
  { id: "orange", hue: 25, label: "Orange", light: "#f6821f", dark: "#efa772", shift: -100 },
  { id: "blue", hue: 215, label: "Blue", light: "#2863b5", dark: "#8eb7ee", shift: 100 },
  { id: "purple", hue: 270, label: "Purple", light: "#7853ad", dark: "#c4a2ed", shift: 150 },
  { id: "red", hue: 5, label: "Red", light: "#b94242", dark: "#ee9999", shift: -130 },
] as const;

export type Accent = (typeof accents)[number]["id"];
export type AccentChoice = Accent | "default";
