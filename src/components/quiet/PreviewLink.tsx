"use client";
import Link from 'next/link';
import {createPortal} from 'react-dom';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import {Arrow} from './Icons';
import s from './Quiet.module.css';
type Props={href:string;name:string;logo?:string;image?:string;note?:string;handle?:string};
export default function PreviewLink({href,name,logo,image,note,handle}:Props){
 const [open,setOpen]=useState(false),[touch,setTouch]=useState(false),[position,setPosition]=useState({left:0,top:0,width:320});const source=useRef<HTMLSpanElement>(null);const popup=useRef<HTMLSpanElement>(null);const [failed,setFailed]=useState(false);
 function reveal(isTouch=false){if(!source.current)return;const a=source.current.getBoundingClientRect(),column=source.current.closest('main')!.getBoundingClientRect(),viewport=document.documentElement.clientWidth,pad=16,gap=22,side=viewport-column.right-gap-pad>=280,width=Math.min(320,side?viewport-column.right-gap-pad:viewport-32),height=image?width/1.6+82:245;
 const left=side?column.right+gap:Math.max(pad,Math.min(a.left,viewport-width-pad));const preferred=side?a.top-height/3:a.top-height-12;const top=Math.max(pad,Math.min(preferred>=pad?preferred:a.bottom+12,innerHeight-height-pad));setPosition({left,top,width});setTouch(isTouch);setOpen(true);}
 useEffect(()=>{if(!open)return;const dismiss=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);source.current?.querySelector<HTMLButtonElement>('button')?.focus()}};const close=()=>setOpen(false);const outside=(e:PointerEvent)=>{if(!source.current?.contains(e.target as Node)&&!popup.current?.contains(e.target as Node))close()};window.addEventListener('keydown',dismiss);window.addEventListener('resize',close);window.addEventListener('scroll',close,{passive:true});document.addEventListener('pointerdown',outside);return()=>{window.removeEventListener('keydown',dismiss);window.removeEventListener('resize',close);window.removeEventListener('scroll',close);document.removeEventListener('pointerdown',outside)}},[open]);
 const mark=logo&&<Image src={logo} alt="" width={15} height={15} unoptimized className={`${s.inlineLogo} ${logo.includes('spotify')?s.spotify:logo.includes('duolingo')?s.duolingo:''}`}/>;
 const label=<span>{name}</span>;
 const external=/^https?:/.test(href);
 return <span ref={source} className={s.inlineLink} data-preview-name={name} data-preview-href={href} data-preview-logo={logo} data-preview-image={image} data-preview-note={note} data-preview-handle={handle} onPointerEnter={e=>{if(e.pointerType==='mouse')reveal()}} onPointerLeave={()=>{if(!touch&&!source.current?.contains(document.activeElement))setOpen(false)}} onFocus={e=>{if(e.target.tagName==='A'&&e.target.matches(':focus-visible')&&matchMedia('(hover:hover) and (pointer:fine)').matches)reveal()}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget)&&!popup.current?.contains(e.relatedTarget))setOpen(false)}}>
 {logo&&<button type="button" className={s.brandPreviewTrigger} aria-label={`Preview ${name}`} aria-expanded={open&&touch} onClick={()=>open&&touch?setOpen(false):reveal(true)}>{mark}</button>}
 {external?<a href={href} target="_blank" rel="noreferrer">{label}</a>:<Link href={href}>{label}</Link>}
 {open&&source.current&&createPortal(<span ref={popup} role={touch?'group':undefined} aria-label={touch?`${name} preview`:undefined} aria-hidden={!touch} className={`${s.hoverPreview} ${touch?s.touchPreview:''}`} style={position} data-preview-popup>{touch&&<button type="button" aria-label="Close preview" className={s.closePreview} onClick={()=>setOpen(false)}>×</button>}{image&&!failed?<span className={s.previewImage}><Image src={image} alt={`${name} ${handle?'profile':'website'} preview`} fill sizes="320px" onError={()=>setFailed(true)}/></span>:<span className={s.namePreview}>{logo&&<Image src={logo} width={28} height={28} alt="" unoptimized/>}<strong>{name}</strong><small>{note||(external?new URL(href).hostname:'Project preview')}</small></span>}{(image||handle||touch)&&<span className={s.previewLabel}><span><strong>{name}</strong><small>{handle?'@'+handle:external?new URL(href).hostname:note||'Project notes'}</small></span>{touch?<a href={href} target={external?'_blank':undefined} rel={external?'noreferrer':undefined} aria-label={`Open ${name}`}><Arrow/></a>:null}</span>}</span>,source.current.closest('[data-quiet]')!)}
 </span>;
}
