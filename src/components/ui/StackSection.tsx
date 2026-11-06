import { ChevronDown } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { moreTools, stack } from "@/data/profile";

function Tool({ name, logo }: { name: string; logo: string }) {
  return (
    <span className="tool">
      <BrandLogo name={logo} />
      <span>{name}</span>
    </span>
  );
}

export default function StackSection() {
  return (
    <section className="section">
      <div className="section-heading">
        <h2>Tools I use</h2>
      </div>
      <div className="stack-rows">
        {stack.map((group) => (
          <div className="stack-row" key={group.title}>
            <h3>{group.title}</h3>
            <div className="tools">
              {group.tools.map(([name, logo]) => (
                <Tool key={name} name={name} logo={logo} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <details className="more-tools">
        <summary>
          A few more tools <ChevronDown size={14} aria-hidden="true" />
        </summary>
        <div className="tools">
          {moreTools.map(([name, logo]) => (
            <Tool key={name} name={name} logo={logo} />
          ))}
        </div>
      </details>
    </section>
  );
}
