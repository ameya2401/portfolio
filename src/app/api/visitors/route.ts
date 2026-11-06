import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

let lastKnownCount = 2; // Initial seed from verified hits

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shouldHit = searchParams.get("hit") === "1";

  const userAgent = req.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|lighthouse|googlebot/i.test(userAgent);

  // If request is from a known crawler bot, do not count hit
  const doIncrement = shouldHit && !isBot;

  try {
    if (doIncrement) {
      // Primary: hits.sh backed by Cloudflare edge
      const res = await fetch("https://hits.sh/ameyabhagat.dev/visitors.svg", {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" },
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });

      if (res.ok) {
        const text = await res.text();
        const match = text.match(/aria-label=["']hits:\s*([\d,]+)["']/i) || text.match(/<title>hits:\s*([\d,]+)<\/title>/i);
        if (match) {
          const parsed = parseInt(match[1].replace(/,/g, ""), 10);
          if (!isNaN(parsed) && parsed > 0) {
            lastKnownCount = parsed;
          }
        }
      }
    } else {
      // Read-only: if we already have a cached count, return it immediately
      // If lastKnownCount is still baseline, perform a read fetch to sync
      if (lastKnownCount <= 2) {
        try {
          const res = await fetch("https://hits.sh/ameyabhagat.dev/visitors.svg", {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" },
            cache: "no-store",
            signal: AbortSignal.timeout(3000),
          });
          if (res.ok) {
            const text = await res.text();
            const match = text.match(/aria-label=["']hits:\s*([\d,]+)["']/i) || text.match(/<title>hits:\s*([\d,]+)<\/title>/i);
            if (match) {
              const parsed = parseInt(match[1].replace(/,/g, ""), 10);
              if (!isNaN(parsed) && parsed > 0) {
                lastKnownCount = parsed;
              }
            }
          }
        } catch {
          // Keep lastKnownCount
        }
      }
    }

    return NextResponse.json(
      { ok: true, count: lastKnownCount },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      },
    );
  } catch {
    // Graceful fallback to last known count
    return NextResponse.json(
      { ok: true, count: lastKnownCount },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}

