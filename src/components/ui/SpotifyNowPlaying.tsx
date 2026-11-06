"use client";

import { useEffect, useState } from "react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      if (document.hidden) return;
      try {
        const response = await fetch("/api/now-playing", { signal: controller.signal });
        if (response.ok) setData(await response.json());
      } catch {
        // Keep the last known state if activity is temporarily unavailable.
      }
    }
    void refresh();
    const interval = setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      controller.abort();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return (
    <div className="spotify-status">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#1DB954" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-1.007-.336.075-.67-.14-.744-.478-.075-.338.14-.673.478-.747 3.856-.88 7.15-.502 9.812 1.13.295.18.387.563.207.865zm1.224-2.722c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.678-1.117 8.243-.574 11.35 1.337.368.226.488.708.26 1.075zm.107-2.846C14.793 8.924 9.643 8.75 6.677 9.652c-.482.146-.988-.128-1.134-.61-.147-.483.128-.988.61-1.135 3.447-1.047 9.13-.852 13.064 1.48.435.258.577.817.32 1.25-.258.434-.817.578-1.25.32z" />
      </svg>
      <span>
        {data?.title && data.songUrl ? <>{data.isPlaying ? "Listening to" : "Last played"}{" "}<a href={data.songUrl} target="_blank" rel="noreferrer">{data.title}</a>{data.artist && ` · ${data.artist}`}</> : data ? "Spotify · Not playing" : "Spotify · Checking listening activity…"}
      </span>
    </div>
  );
}
