"use client";
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useTheme} from 'next-themes';
import {useCallback,useEffect,useRef,useState} from 'react';
import {profile} from '@/data/profile';
import {revealQuietPage} from '@/lib/quiet-snake';
import {revealOnScroll} from '@/lib/reveal';
import {Arrow,CheckIcon,CopyIcon,GithubIcon,LinkedinIcon,ThemeIcon,XIcon} from './Icons';
import VisitorCount from './VisitorCount';
import WeatherTimeChip from './WeatherTimeChip';
import Button from '@/components/ui/Button';
import s from './Quiet.module.css';
import f from './Frame.module.css';
const built=process.env.NEXT_PUBLIC_BUILD_DATE;
const updated=built?new Date(built).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}):null;
// ['Writing','/blog'] hidden until personal blogs are added
const links=[['Work','/projects'],['About','/about'],['Craft','/craft']];
export default function QuietShell({children}:{children:React.ReactNode}){
 const shell=useRef<HTMLDivElement>(null);const path=usePathname();const {resolvedTheme,setTheme}=useTheme();
 const toggleTheme=useCallback(()=>setTheme(resolvedTheme==='dark'?'light':'dark'),[resolvedTheme,setTheme]);
 useEffect(()=>{if(shell.current)return revealQuietPage(shell.current)},[path]);
 useEffect(()=>revealOnScroll(),[path]);
 const [menu,setMenu]=useState(false);const header=useRef<HTMLElement>(null);
 useEffect(()=>{setMenu(false)},[path]);
 useEffect(()=>{if(!menu)return;const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false)};const outside=(e:PointerEvent)=>{if(!header.current?.contains(e.target as Node))setMenu(false)};addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside)}},[menu]);
 /* In-page links (Back to top, Email me) glide instead of jumping; page navigation stays instant. */
 useEffect(()=>{const click=(e:MouseEvent)=>{const a=(e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey)return;const target=document.getElementById(a.hash.slice(1));if(!target)return;e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});history.replaceState(null,'',a.hash)};document.addEventListener('click',click);return()=>document.removeEventListener('click',click)},[]);
 const [copied,setCopied]=useState<'idle'|'done'|'failed'>('idle');const copyTimer=useRef<ReturnType<typeof setTimeout>>();
 useEffect(()=>()=>clearTimeout(copyTimer.current),[]);
 const copyEmail=useCallback(async()=>{clearTimeout(copyTimer.current);try{await navigator.clipboard.writeText(profile.email);setCopied('done')}catch{setCopied('failed')}copyTimer.current=setTimeout(()=>setCopied('idle'),1600)},[]);
 return <div ref={shell} className={`${s.quiet} ${f.canvas}`} data-quiet><a href="#main" className={s.skip}>Skip to content</a>
 <div className={f.frame} data-frame>
 <header ref={header} className={f.header} data-menu={menu?'':undefined}>
  <Link href="/" className={f.mark} aria-label="Ameya Bhagat, home"><Image src="/avatar.jpg" alt="" width={24} height={24}/><span>Ameya Bhagat</span></Link>
  <WeatherTimeChip />
  <nav className={f.nav} aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href} aria-current={path.startsWith(href)?'page':undefined}>{label}</Link>)}</nav>
  <div className={f.tools}>
   <a className={`${f.iconButton} ${f.social}`} data-brand="github" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon/></a>
   <a className={`${f.iconButton} ${f.social}`} data-brand="linkedin" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon/></a>
   <a className={`${f.iconButton} ${f.social}`} data-brand="x" href={profile.twitter} target="_blank" rel="noreferrer" aria-label="X (formerly Twitter)"><XIcon/></a>
   <span className={f.divider}/>
   <button className={`${s.theme} ${f.iconButton}`} type="button" aria-label="Toggle colour theme" onClick={toggleTheme}><ThemeIcon/></button>
   <button className={f.menuButton} type="button" aria-expanded={menu} aria-controls="phone-menu" aria-label={menu?'Close menu':'Open menu'} onClick={()=>setMenu(v=>!v)}><span/><span/><span/></button>
  </div>
  <div id="phone-menu" className={f.menu} ref={el=>{if(el)el.inert=!menu}}>
   <nav aria-label="Menu">{[['Home','/'],...links].map(([label,href],i)=><Link key={href} href={href} style={{'--i':i} as React.CSSProperties} aria-current={(href==='/'?path==='/':path.startsWith(href))?'page':undefined} onClick={()=>setMenu(false)}>{label}</Link>)}</nav>
   <div className={f.menuSocial} style={{'--i':links.length+1} as React.CSSProperties}><a data-brand="github" href={profile.github} target="_blank" rel="noreferrer"><GithubIcon/>GitHub</a><a data-brand="linkedin" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon/>LinkedIn</a><a data-brand="x" href={profile.twitter} target="_blank" rel="noreferrer"><XIcon/>X</a></div>
  </div>
 </header>
 <div className={f.menuBackdrop} data-open={menu?'':undefined} aria-hidden="true" onClick={()=>setMenu(false)}/>
 <main id="main" tabIndex={-1}>{children}</main>
 <footer className={f.footer} id="contact" aria-label="Contact">
  <p className={f.footerIndex}>Contact</p>
  <h2>Looking for something worth building?</h2>
  <p className={f.footerInvitation}>I&apos;m actively exploring opportunities in software development and technology, where I can contribute to meaningful projects, solve real-world problems, and grow alongside a great team.</p>
  <p className={f.footerInvitation}>Also open to collaborations, interesting ideas, and conversations that lead to something meaningful.</p>
  <p className={f.footerZone}>Based in Thane, Maharashtra, India (IST, UTC+5:30)</p>
  <div className={f.actions}>
   <span className={f.emailGroup}><a href={`mailto:${profile.email}`} title={profile.email}>Email me</a><button type="button" className={`${s.copy} ${f.copyButton}`} data-state={copied} aria-label="Copy email address" title={copied==='done'?'Copied':profile.email} onClick={copyEmail}><span className={f.copyIcon}><CopyIcon/></span><span className={f.checkIcon}><CheckIcon/></span></button><span className={s.srOnly} role="status">{copied==='done'?'Email address copied':copied==='failed'?'Couldn’t copy. Use the Email me link.':''}</span></span>
   <Button href="/ameya_bhagat_resume.pdf" target="_blank" size="sm" rightIcon={<Arrow size={12}/>}>View Resume</Button>
  </div>
  <nav className={f.footerLinks} aria-label="Footer links"><a data-brand="github" href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a data-brand="linkedin" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a data-brand="x" href={profile.twitter} target="_blank" rel="noreferrer">X</a><a data-brand="kaggle" href={profile.kaggle || profile.github} target="_blank" rel="noreferrer">Kaggle</a><a href={profile.resume} target="_blank" rel="noreferrer">Resume</a><a href="#main">Back to top</a></nav>
  <p className={f.colophon}>Designed and built by Ameya.</p>
  <div className={f.meta}><VisitorCount/>{updated&&<span>Last updated · {updated}</span>}</div>
 </footer>
 </div>
 </div>;
}