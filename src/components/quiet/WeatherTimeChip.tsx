"use client";

import { useEffect, useMemo, useState } from "react";

type WeatherData = { temperature: number; code: number; isDay: boolean; location: string };
type WeatherKind = "clear" | "partly" | "cloudy" | "fog" | "drizzle" | "rain" | "snow" | "storm";

function describe(code: number): { label: string; kind: WeatherKind } {
  if (code === 0) return { label: "Clear sky", kind: "clear" };
  if (code === 1 || code === 2) return { label: "Partly cloudy", kind: "partly" };
  if (code === 3) return { label: "Overcast", kind: "cloudy" };
  if (code === 45 || code === 48) return { label: "Foggy", kind: "fog" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", kind: "drizzle" };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { label: "Rain", kind: "rain" };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { label: "Snow", kind: "snow" };
  if (code >= 95) return { label: "Thunderstorm", kind: "storm" };
  return { label: "Cloudy", kind: "cloudy" };
}

const CLOUD = "M7.5 15.5h9.25a4.25 4.25 0 0 0 .6-8.46A5.75 5.75 0 0 0 6.2 8.2a3.65 3.65 0 0 0 1.3 7.3Z";

function WeatherIcon({ kind, isDay }: { kind: WeatherKind; isDay: boolean }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    width: 14,
    height: 14,
    "aria-hidden": true,
  };

  if (kind === "clear") {
    return isDay ? (
      <svg {...props} className="size-[15px] text-amber-400">
        <circle cx="12" cy="12" r="4.5" fill="#f59e0b" stroke="#f59e0b" />
        <path
          d="M12 2v2.5M12 19.5V22M3.5 12H6M18 12h2.5M5.2 5.2l1.8 1.8M17 17l1.8 1.8M5.2 18.8 7 17M17 7l1.8-1.8"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg {...props} className="size-[15px] text-amber-300">
        <path
          d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
          fill="#fde047"
          fillOpacity="0.25"
          stroke="#facc15"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (kind === "partly") {
    return (
      <svg {...props} className="size-[15px]">
        <path d="M9 2.5v1.2M3.7 4.7l.9.9M2.5 10h1.2" stroke={isDay ? "#f59e0b" : "#facc15"} />
        <path d="M5.6 11A3.8 3.8 0 0 1 12.4 7" stroke={isDay ? "#f59e0b" : "#facc15"} />
        <path
          d="M8.5 20h8.25a3.75 3.75 0 0 0 .55-7.46 5 5 0 0 0-9.6 1.4A3.1 3.1 0 0 0 8.5 20Z"
          stroke="#38bdf8"
          fill="#38bdf8"
          fillOpacity="0.2"
        />
      </svg>
    );
  }

  return (
    <svg {...props} className="size-[15px]">
      <path d={CLOUD} stroke="#38bdf8" fill="#38bdf8" fillOpacity="0.2" />
      {kind === "fog" && <path d="M5 19h14M8 22h8" stroke="#94a3b8" strokeWidth="1.5" />}
      {(kind === "rain" || kind === "drizzle") && (
        <path d="M9 18.5 8 21M13 18.5 12 21M17 18.5 16 21" stroke="#38bdf8" strokeWidth="2" />
      )}
      {kind === "snow" && (
        <path d="M8.5 19.5h.01M12 21h.01M15.5 19.5h.01" stroke="#bae6fd" strokeWidth="2.5" />
      )}
      {kind === "storm" && (
        <path d="m12.5 16.5-2 3.5h3l-2 3" stroke="#facc15" fill="#facc15" strokeWidth="1.5" />
      )}
    </svg>
  );
}

export function WeatherChip({ className }: { className?: string }) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/weather");
        const json = await res.json();
        if (cancelled) return;
        if (json.ok && typeof json.temperature === "number") {
          setData({
            temperature: json.temperature,
            code: json.code ?? 0,
            isDay: json.isDay ?? true,
            location: json.location ?? "",
          });
        } else if (!data) {
          setFailed(true);
        }
      } catch {
        if (!cancelled && !data) setFailed(true);
      }
    };

    void load();
    const id = window.setInterval(load, 5 * 60 * 1000); // 5 min refresh
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  if (failed && !data) return null;
  const info = data ? describe(data.code) : null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[12px] tabular-nums ${className ?? ""}`}
      title={data && info ? `${info.label} in ${data.location}` : "Loading weather"}
    >
      {data && info ? (
        <>
          <WeatherIcon kind={info.kind} isDay={data.isDay} />
          <span aria-hidden="true" className="font-bold text-amber-600 dark:text-amber-200/90">
            {data.temperature}°
          </span>
          <span className="sr-only">
            Weather in {data.location}: {data.temperature}°, {info.label}
          </span>
        </>
      ) : (
        <span aria-hidden="true" className="h-3 w-8 animate-pulse rounded-full bg-current/15" />
      )}
    </span>
  );
}

export function LiveClock({
  timeZone = "Asia/Kolkata",
  label = "IST",
  city = "Thane",
  className,
}: {
  timeZone?: string;
  label?: string;
  city?: string;
  className?: string;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    let interval: number | undefined;
    // Align ticks to the start of each second
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 1000);
    }, 1000 - (Date.now() % 1000));
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }),
    [timeZone],
  );

  let hours = "--";
  let minutes = "--";
  let seconds = 0;

  if (now) {
    for (const part of formatter.formatToParts(now)) {
      if (part.type === "hour") hours = part.value;
      else if (part.type === "minute") minutes = part.value;
      else if (part.type === "second") seconds = Number(part.value);
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[12px] tabular-nums ${className ?? ""}`}
      title={`Local time in ${city}`}
    >
      <span className="sr-only">
        Local time in {city}: {hours}:{minutes} {label}
      </span>
      {/* Pulsing online indicator */}
      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
      <time
        aria-hidden="true"
        dateTime={now ? now.toISOString() : undefined}
        suppressHydrationWarning
        className="font-bold tracking-tight text-zinc-900 dark:text-white"
      >
        {hours}
        {/* Blinking colon every second */}
        <span
          className={`transition-opacity duration-300 text-emerald-400 font-bold ${
            seconds % 2 === 1 ? "opacity-20" : ""
          }`}
        >
          :
        </span>
        {minutes}
      </time>
      <span
        aria-hidden="true"
        className="font-mono text-[10.5px] font-semibold tracking-wide text-orange-400"
      >
        {label}
      </span>
    </span>
  );
}

export function WeatherTimeChip({ className }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-2.5 sm:px-3 py-1 font-mono text-[11.5px] sm:text-xs text-zinc-700 shadow-sm transition-all duration-200 hover:border-emerald-500/25 hover:bg-black/[0.07] dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-emerald-500/25 dark:hover:bg-white/[0.07] ${
        className ?? ""
      }`}
      title="Local time & weather in Thane"
    >
      <LiveClock />
      <span className="h-3 w-px bg-black/15 dark:bg-white/15" aria-hidden="true" />
      <WeatherChip />
    </div>
  );
}

export default WeatherTimeChip;

