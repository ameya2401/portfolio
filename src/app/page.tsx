import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Greeting from '@/components/quiet/Greeting';
import PreviewLink from '@/components/quiet/PreviewLink';
import ProjectViews from '@/components/quiet/ProjectViews';
import Tool from '@/components/quiet/Tool';
import EngineeringPhilosophy from '@/components/quiet/EngineeringPhilosophy';
import GithubActivity from '@/components/quiet/GithubActivity';
import {Arrow} from '@/components/quiet/Icons';
import Button from '@/components/ui/Button';
import {education, experience, profile} from '@/data/profile';
import {featuredProjects, allProjects} from '@/data/quiet';
import h from '@/components/quiet/Home.module.css';

export const metadata:Metadata={
  title:'Ameya Bhagat · Backend & Systems Engineer',
  description:'Backend and Systems Engineer. Applied AI, relational schemas, AST pipelines, and production systems.',
  alternates:{canonical:'/'}
};

const project=(slug:string)=>allProjects.find(p=>p.slug===slug)!;

function Head({index,title,more}:{index:string;title:string;more?:React.ReactNode}){
  return <div className={h.head}><span className={h.index}>{index}</span><h2>{title}</h2>{more}</div>;
}

export default function Home(){
  return <>
  <section className={h.hero}>
    <div className={h.identity}>
      <span className={h.avatar} style={{ position: 'relative', width: 64, height: 64, minWidth: 64, minHeight: 64, display: 'inline-block', flexShrink: 0, overflow: 'hidden', borderRadius: 16 }}>
        <Image src="/avatar.jpg" alt="Ameya Bhagat" width={64} height={64} priority style={{ width: 64, height: 64, objectFit: 'cover' }} />
      </span>
      <div>
        <Greeting className={h.greeting}/>
        <h1 className={h.name}>Ameya Bhagat</h1>
        <p className={h.role}>Backend &amp; Systems Engineer · MCA Candidate at <a href="https://github.com/ameya2401" target="_blank" rel="noreferrer">BVIMIT</a></p>
      </div>
    </div>
    <p className={h.lead}>I build scalable backend architecture and applied AI systems, from database schemas to production APIs. I engineered <PreviewLink {...project('astra')}/>, an AST-driven triage microservice for AI pull requests, deployed <PreviewLink {...project('maestro-career')}/> with automated PDF report generation, and built <PreviewLink {...project('manthan-2026')}/> and <PreviewLink {...project('queue-cure')}/>.</p>
    <p className={h.heroLinks}><Button href="/ameya_bhagat_resume.pdf" target="_blank" size="sm" rightIcon={<Arrow size={12}/>}>View Resume</Button><a href={`mailto:${profile.email}`}>Email me</a></p>
  </section>
  <section className={h.section}><ProjectViews storageKey="view-featured" projects={featuredProjects} head={<Head index="01" title="Things I’ve built"/>}/><p className={h.showMore}><Link href="/projects">All projects <Arrow size={13}/></Link></p></section>
  <section className={h.section}><Head index="02" title="Experience"/><ol className={h.jobs}>{experience.map(job=><li key={job.company}><h3>{job.href?<a href={job.href} target="_blank" rel="noreferrer">{job.company}</a>:job.company}{job.current&&<span className={h.now}>Now</span>}</h3><span className={h.jobDate}>{job.date}</span><p className={h.jobRole}>{job.role}</p><p>{job.description}</p></li>)}</ol></section>
  <section className={h.section}><Head index="03" title="Education"/><ol className={h.jobs}>{education.map(edu=><li key={`${edu.institution}-${edu.degree}`}><h3>{edu.href?<a href={edu.href} target="_blank" rel="noreferrer">{edu.institution}</a>:edu.institution}{edu.current&&<span className={h.now}>Now</span>}</h3><span className={h.jobDate}>{edu.date}</span><p className={h.jobRole}>{edu.degree}{edu.grade?` · ${edu.grade}`:''}</p><p>{edu.description}</p></li>)}</ol></section>
  <section className={h.section}>
    <Head index="04" title="How I work" more={<Link className={h.more} href="/craft">Full kit <Arrow size={13}/></Link>}/>
    <EngineeringPhilosophy />
    <p className={h.stackLine}>Mostly <Tool name="Python" logo="python"/>, <Tool name="TypeScript" logo="typescript"/>, <Tool name="Next.js" logo="nextjs"/> and <Tool name="PostgreSQL" logo="postgres"/>, backed by <Tool name="Supabase" logo="supabase"/> and <Tool name="Docker" logo="docker"/>, with applied AI in the loop.</p>
  </section>
  {/* Writing section hidden until personal blogs are ready:
  <section className={h.section}><Head index="05" title="Writing" more={<Link className={h.more} href="/blog">All writing <Arrow size={13}/></Link>}/><div className={h.posts}>{writing.map(post=>{const body=<><h3>{post.title}</h3><time>{post.date}</time></>;return post.link?<a key={post.slug} className={h.post} href={post.link} target="_blank" rel="noreferrer">{body}</a>:<Link key={post.slug} className={h.post} href={`/blog/${post.slug}`}>{body}</Link>})}</div></section>
  */}
  <GithubActivity className={h.section} head={<Head index="05" title="On GitHub" more={<a className={h.more} href={profile.github} target="_blank" rel="noreferrer">@ameya2401 <Arrow size={13}/></a>}/>}/>
  </>;
}
