import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const response = await fetch("https://github-contributions-api.jogruber.de/v4/ameya2401?y=last", {
      cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Activity unavailable");
    const payload = await response.json();
    return NextResponse.json(payload, { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=3600" } });
  } catch {
    return NextResponse.json({ error: "Activity unavailable" }, { status: 503 });
  }
}
