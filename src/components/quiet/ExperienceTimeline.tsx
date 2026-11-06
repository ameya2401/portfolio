import {experience} from '@/data/profile';
import s from './Quiet.module.css';
export default function ExperienceTimeline(){return <section className={s.section} id="experience"><h2>Experience</h2><ol className={s.timeline}>{experience.map(item=><li key={item.company}><div className={s.timelineTop}><h3>{item.href?<a href={item.href} target="_blank" rel="noreferrer">{item.company}</a>:item.company}</h3><span>{item.date}</span></div><p className={s.timelineRole}>{item.role}</p><p>{item.description}</p></li>)}</ol></section>}
