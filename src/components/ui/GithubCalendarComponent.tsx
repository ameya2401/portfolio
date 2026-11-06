"use client";

import { useState, useEffect, useRef } from "react";
import ContributionSnake, { type Contribution } from "./ContributionSnake";
import snapshot from "@/data/github-contributions.json";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

export default function GithubCalendarComponent() {
  const [attempt, setAttempt] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(snapshot.capturedAt);
  const [data, setData] = useState<Contribution[]>(snapshot.contributions);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const pending = useRef(true);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    pending.current = true;
    setState("loading");
    const timer = setTimeout(() => controller.abort(), 12000);
    async function load() {
      try {
        const response = await fetch("/api/github-activity", { signal: controller.signal });
        if (!response.ok) throw new Error("Activity unavailable");
        const payload = await response.json();
        const entries: unknown = payload.contributions;
        if (!Array.isArray(entries) || !entries.length || !entries.every((entry, index) =>
          entry && typeof entry.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(entry.date) &&
          Number.isInteger(entry.count) && entry.count >= 0 &&
          Number.isInteger(entry.level) && entry.level >= 0 && entry.level <= 4 &&
          Number.isFinite(Date.parse(entry.date)) && new Date(entry.date).toISOString().slice(0,10) === entry.date &&
          (index === 0 || Date.parse(entry.date) - Date.parse(entries[index - 1].date) === 86400000)
        )) throw new Error("Invalid activity data");
        if (active) { setData(entries as Contribution[]); setUpdatedAt(new Date().toISOString()); setState("ready"); }
      } catch { if (active) setState("error"); }
      finally { clearTimeout(timer); if (active) pending.current = false; }
    }
    void load();
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [attempt]);
  function refresh() {
    if (pending.current) return;
    pending.current = true;
    setState("loading");
    setAttempt(value => value + 1);
  }
  return (
    <section className="section github-section">
      <div className="section-heading">
        <h2>A little, every day</h2>
        <a href={profile.github} className="text-link" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <p className="activity-status" role="status" aria-atomic="true">{state === "loading" ? "Updating GitHub activity…" : state === "error" ? `Showing available contributions, last updated ${new Date(updatedAt).toLocaleDateString("en-GB", {day:"numeric",month:"short",year:"numeric",timeZone:"UTC"})}. Live update unavailable.` : "GitHub activity loaded."}</p>
      <ContributionSnake data={data} />
      <button type="button" className="text-link github-retry" aria-disabled={state === "loading"} onClick={refresh}>{state === "loading" ? "Loading activity…" : state === "error" ? "Retry activity" : "Refresh activity"}</button>
    </section>
  );
}
