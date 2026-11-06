"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { createContributionSnake } from "@/lib/contribution-snake";
export type Contribution = { date: string; count: number; level: number };
export default function ContributionSnake({data}: {data: Contribution[]}) {
  const svg = useRef<SVGSVGElement>(null);
  const engine = useRef<ReturnType<typeof createContributionSnake>>();
  const [paused, setPaused] = useState(false), [reduced, setReduced] = useState(false);
  const grid = useMemo(() => {
    const firstDay = new Date(`${data[0].date}T00:00:00Z`).getUTCDay();
    const columns = Math.ceil((firstDay + data.length) / 7);
    const cells = data.map((entry,index) => ({...entry, col: Math.floor((index+firstDay)/7), row: (index+firstDay)%7}));
    const months = cells.filter((cell,index) => index === 0 || cell.date.slice(8) === "01").map(cell => ({x:cell.col*11, label:new Date(`${cell.date}T00:00:00Z`).toLocaleDateString("en-US", {month:"short",timeZone:"UTC"})}));
    return {cells, columns, months, total:data.reduce((sum,entry)=>sum+entry.count,0)};
  },[data]);
  useEffect(() => {
    if (!svg.current) return;
    const instance = createContributionSnake(svg.current);
    engine.current = instance;
    instance.setPaused(paused);
    return () => { instance.destroy(); engine.current = undefined; };
    // Pausing updates the existing engine; only new contribution data resets it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data]);
  useEffect(() => { engine.current?.setPaused(paused); },[paused]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();media.addEventListener("change",sync);
    return () => media.removeEventListener("change",sync);
  },[]);
  return <div className="contribution-snake">
    <div className="github-scroll" tabIndex={0} role="region" aria-label="GitHub contribution graph. Scroll horizontally to see all months.">
      <svg ref={svg} className="snake-grid" viewBox={`-2 0 ${grid.columns*11+4} 120`} width={grid.columns*11+4} height={120} data-columns={grid.columns} role="img" aria-label={`${grid.total} contributions from ${data[0].date} to ${data[data.length-1].date}. The snake is a decorative animation.`}>
        {grid.months.map((month,index)=><text key={index} x={month.x} y={10} className="snake-month">{month.label}</text>)}
        {grid.cells.map(cell=><rect key={cell.date} data-contribution data-col={cell.col} data-row={cell.row} data-count={cell.count} data-level={cell.level} x={cell.col*11} y={cell.row*11+20} width={8} height={8} rx={2} fill={`var(--calendar-${cell.level})`}><title>{`${cell.count} ${cell.count === 1 ? "contribution" : "contributions"} on ${cell.date}`}</title></rect>)}
        <g aria-hidden="true" className="snake-body">{Array.from({length:6},(_,index)=><rect key={index} data-snake-segment width={8} height={8} rx={index===0?3:2} opacity={0}  />)}</g>
      </svg>
    </div>
    <div className="snake-footnote"><p>{grid.total.toLocaleString("en-US")} contributions in this period</p><button type="button" className="text-link snake-toggle" disabled={reduced} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused||reduced?<Play size={12} aria-hidden="true" />:<Pause size={12} aria-hidden="true" />}{reduced?"Motion reduced":paused?"Play snake":"Pause snake"}</button></div>
  </div>;
}
