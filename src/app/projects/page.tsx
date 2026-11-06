import HeadingWords from '@/components/quiet/HeadingWords';
import ProjectViews from '@/components/quiet/ProjectViews';
import {allProjects} from '@/data/quiet';
import s from '@/components/quiet/Quiet.module.css';
export default function Projects(){return <>
 <header className={s.pageIntro}><p className={s.kicker}>Work</p><h1><HeadingWords text="Things I’ve put into the world"/></h1><p>Products, small tools, and experiments. Pick one and try it.</p></header>
 <section className={s.section}><ProjectViews storageKey="view-work" projects={allProjects} head={<h2>All projects</h2>}/></section>
</>}
