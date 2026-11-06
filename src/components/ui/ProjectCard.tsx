import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { PortfolioLinkButton } from "./PortfolioControls";
export default function ProjectCard({name, title, description, contribution, tags, image, imageAlt, imageCaption, imageAspect, liveUrl, detailUrl, priority = false, showVisual = false}: Project & {priority?: boolean; showVisual?: boolean}) {
  return <article className="project-card">
    {showVisual && <figure className="project-visual"><div className={`project-image-frame ${imageAspect === "square" ? "project-image-square" : ""}`}><Image src={image} alt={imageAlt || `${name} interface`} fill sizes="(max-width: 684px) calc(100vw - 40px), 620px" quality={90} priority={priority} /></div>{imageCaption && <figcaption>{imageCaption}</figcaption>}</figure>}
    <div className="project-title"><h3>{title || name}</h3></div>
    <p className="project-description">{contribution || description}</p>
    {tags && <ul className="project-tags" aria-label="Project focus">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
    <div className="project-footnote">{detailUrl && <PortfolioLinkButton href={detailUrl} variant="ghost">Read the case study <ArrowUpRight size={12} aria-hidden="true" /></PortfolioLinkButton>}<PortfolioLinkButton href={liveUrl} target="_blank" rel="noreferrer" variant="ghost">Product page <ArrowUpRight size={12} aria-hidden="true" /></PortfolioLinkButton></div>
  </article>;
}
