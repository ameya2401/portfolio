import { ArrowUpRight } from "lucide-react";
import BrandLogo from "./BrandLogo";
import type { Project } from "@/data/projects";
export default function SecondaryProjects({projects}: {projects: Project[]}) {
  return <div className="secondary-projects">{projects.map(project => <article className="secondary-project" key={project.slug}><div><h3><a href={project.liveUrl} target="_blank" rel="noreferrer">{project.name} <ArrowUpRight size={14} aria-hidden="true" /></a></h3><p>{project.description}</p></div>{project.githubUrl && <a className="icon-button" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`}><BrandLogo name="github" size={16} /></a>}</article>)}</div>;
}
