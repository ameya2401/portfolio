"use client";
import { useEffect, useState } from "react";
import f from "./Frame.module.css";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    let seen = false;
    try {
      // Check if user was already counted in this browser session
      seen = sessionStorage.getItem("counted-visit") === "1";
    } catch {}

    // Check if on localhost / local development
    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.endsWith(".local"));

    // Real live visitors increment on first session visit; local dev reads without inflating
    const forceHit =
      typeof window !== "undefined" && window.location.search.includes("hit=1");
    const url = (!seen && !isLocal) || forceHit ? "/api/visitors?hit=1" : "/api/visitors";

    fetch(url, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!live || typeof d?.count !== "number") return;
        setCount(d.count);
        if (!seen && !isLocal) {
          try {
            sessionStorage.setItem("counted-visit", "1");
            localStorage.setItem("portfolio-visited-at", String(Date.now()));
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      live = false;
    };
  }, []);

  if (count === null) return null;

  return (
    <p className={f.visitors}>
      <i aria-hidden="true" />
      {count.toLocaleString("en-US")} {count === 1 ? "visitor" : "visitors"}
    </p>
  );
}
