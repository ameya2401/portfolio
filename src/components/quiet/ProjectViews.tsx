"use client";
import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useState,type CSSProperties,type ReactNode} from 'react';
import type {QuietProject} from '@/data/quiet';
import {Arrow,GithubIcon,GlobeIcon,GridIcon,ListIcon} from './Icons';
import v from './ProjectViews.module.css';
type View='list'|'grid';
function Primary({p,className,children,label}:{p:QuietProject;className?:string;children:ReactNode;label?:string}){
 return p.detail?<Link className={className} href={p.detail} aria-label={label}>{children}</Link>:<a className={className} href={p.href} target="_blank" rel="noreferrer" aria-label={label}>{children}</a>;
}
/* Projects as a dense list or a screenshot grid; the choice is remembered per visitor. */
export default function ProjectViews({projects,head,storageKey,defaultView='list'}:{projects:QuietProject[];head?:ReactNode;storageKey:string;defaultView?:View}){
 const [view,setView]=useState<View>(defaultView);const [animate,setAnimate]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem(storageKey);if(saved==='list'||saved==='grid')setView(saved)}catch{}},[storageKey]);
 const choose=(next:View)=>{if(next===view)return;setAnimate(true);setView(next);try{localStorage.setItem(storageKey,next)}catch{}};
 const host=(p:QuietProject)=>new URL(p.href).hostname.replace(/^www\./,'');
 return <div className={v.root}>
  <div className={v.bar}>
   <div className={v.head}>{head}</div>
   <div className={v.toggle} role="radiogroup" aria-label="Project layout" data-view={view}>
    <span className={v.thumb} aria-hidden="true"/>
    <button type="button" role="radio" aria-checked={view==='list'} aria-label="List view" onClick={()=>choose('list')}><ListIcon/></button>
    <button type="button" role="radio" aria-checked={view==='grid'} aria-label="Grid view" onClick={()=>choose('grid')}><GridIcon/></button>
   </div>
  </div>
  {view==='list'?<ul key="list" className={v.list} data-animate={animate?'':undefined}>{projects.map((p,i)=><li key={p.slug} style={{'--i':i} as CSSProperties}>
   <div className={v.rowMain}>
    <Primary p={p} className={v.name}>{p.logo?<Image src={p.logo} alt="" width={18} height={18} unoptimized/>:<span className={v.noLogo}/>}<span>{p.name}</span></Primary>
    {p.status&&<span className={v.status}>{p.live&&<i/>}{p.status}</span>}
   </div>
   <p>{p.description}</p>
   {p.proof&&<a className={v.proof} href={p.proof.href} target="_blank" rel="noreferrer" title={p.proof.title}>{p.proof.label} <Arrow size={12}/></a>}
   <div className={v.rowLinks}><a href={p.href} target="_blank" rel="noreferrer">Website <Arrow size={12}/></a>{p.repo&&<a data-brand="github" href={p.repo} target="_blank" rel="noreferrer">GitHub <Arrow size={12}/></a>}</div>
  </li>)}</ul>
  :<ul key="grid" className={v.grid} data-animate={animate?'':undefined}>{projects.map((p,i)=><li key={p.slug} className={v.card} style={{'--i':i} as CSSProperties}>
   <Primary p={p} className={v.shot} label={`${p.name}${p.detail?' project notes':' website'}`}>{p.image?<Image src={p.image} alt="" fill sizes="(max-width:640px) 100vw, 340px"/>:<span className={v.shotEmpty}>{p.name}</span>}</Primary>
   <div className={v.cardHead}>
    <Primary p={p} className={v.name}>{p.logo&&<Image src={p.logo} alt="" width={18} height={18} unoptimized/>}<span>{p.name}</span></Primary>
    <span className={v.icons}><a href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.name} website (${host(p)})`} title={host(p)}><GlobeIcon/></a>{p.repo&&<a data-brand="github" href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.name} on GitHub`} title="GitHub"><GithubIcon/></a>}</span>
   </div>
   {p.status&&<span className={v.status}>{p.live&&<i/>}{p.status}</span>}
   <p>{p.description}</p>
   {p.proof&&<a className={v.proof} href={p.proof.href} target="_blank" rel="noreferrer" title={p.proof.title}>{p.proof.label} <Arrow size={12}/></a>}
  </li>)}</ul>}
 </div>;
}
