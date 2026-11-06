import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/profile";

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="section-heading"><h2>Experience</h2></div>
      <div className="experience-rows">
        {experience.map((item) => (
          <article key={item.company} className="experience-row">
            <p className="experience-date">{item.date}</p>
            <div>
              <div className="experience-title">
                <h3>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.company}<ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  ) : item.company}
                  {item.current && <span className="current-dot" aria-label="Current role" />}
                </h3>
                <span>{item.role}</span>
              </div>
              <p className="experience-description">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
