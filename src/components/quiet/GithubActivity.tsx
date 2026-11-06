"use client";
import {useEffect,useRef} from 'react';
import snapshot from '@/data/github-contributions.json';
import {createQuietSnake} from '@/lib/quiet-snake';
import s from './Quiet.module.css';

export default function GithubActivity({className=s.section,head}:{className?:string;head?:React.ReactNode}){
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    if(!ref.current)return;
    const engine=createQuietSnake(ref.current);
    return()=>engine.destroy();
  },[]);
  const total=snapshot.contributions.reduce((sum,entry)=>sum+entry.count,0);
  const first=new Date(snapshot.contributions[0].date+'T00:00:00Z').getUTCDay();
  const columns=Math.ceil((first+snapshot.contributions.length)/7);

  return (
    <section ref={ref} className={className} data-github-activity>
      {head??(
        <div className={s.activityHeading}>
          <h2>On GitHub</h2>
          <a href="https://github.com/ameya2401" target="_blank" rel="noreferrer">@ameya2401</a>
        </div>
      )}
      <div className={s.activityBoard} tabIndex={0} role="group" aria-label="GitHub contributions and snake game" data-snake-board>
        <svg viewBox={`-2 0 ${columns*11+4} 110`} data-columns={columns} className={s.activityGrid} role="img" aria-label="Actual GitHub contributions over the past year">
          <g>
            {snapshot.contributions.map((entry,i)=>{
              const col=Math.floor((i+first)/7),row=(i+first)%7;
              return (
                <rect
                  key={entry.date}
                  data-contribution
                  data-col={col}
                  data-row={row}
                  data-level={entry.level}
                  x={col*11}
                  y={row*11+16}
                  width={8}
                  height={8}
                  rx={2}
                  fill={`var(--green-${entry.level})`}
                >
                  <title>{`${entry.count} contributions · ${entry.date}`}</title>
                </rect>
              );
            })}
          </g>
          <g aria-hidden="true" data-snake-body opacity="0">
            {Array.from({length:40},(_,i)=><line key={i} data-snake-segment opacity="0"/>)}
            <g data-snake-head>
              <path data-snake-tongue d="M4.5 0h3.6M8.1 0l1.7-1.5M8.1 0l1.7 1.5"/>
              <ellipse rx="5" ry="4.3"/>
              <circle data-snake-eye cx="1.6" cy="-2" r="1.05"/>
              <circle data-snake-eye cx="1.6" cy="2" r="1.05"/>
            </g>
          </g>
          <circle data-snake-food r="3" opacity="0"/>
        </svg>
      </div>
      <div className={s.activityControls}>
        <span className={s.activityDate}>
          <strong className={s.contributionTotal}>{total.toLocaleString('en-US')} contributions</strong>
          <span> in the past year · Updated {new Date(snapshot.capturedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}</span>
        </span>
        <div>
          <button type="button" data-snake-pause>Pause snake</button>
          <button type="button" data-snake-play>Play a round</button>
        </div>
      </div>
      <div className={s.snakeGameControls} data-snake-controls hidden>
        <span data-snake-status role="status">Use arrow keys or the controls.</span>
        <div>
          {[['up','↑'],['left','←'],['down','↓'],['right','→']].map(([dir,label])=>(
            <button type="button" data-snake-direction={dir} aria-label={`Move snake ${dir}`} key={dir}>{label}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
