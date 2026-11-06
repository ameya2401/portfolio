import { ImageResponse } from "next/og";

/** Share card for a project page, in the site's paper palette. */
export function projectOg({ name, line, status }: { name: string; line: string; status: string }) {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 80px", background: "#faf8f3", color: "#39352f", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 26, color: "#736d64" }}>Ameya Bhagat · Backend &amp; Systems Engineer</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 112, fontWeight: 700, letterSpacing: "-6px", lineHeight: 1 }}>{name}</span>
        <span style={{ marginTop: 24, fontSize: 40, color: "#736d64", letterSpacing: "-1px", lineHeight: 1.25, maxWidth: 980 }}>{line}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e7e2d9", paddingTop: 24, fontSize: 24, color: "#736d64" }}>
        <span>{status}</span>
        <span>ameya2401</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
