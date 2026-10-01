import { ArrowUpRight, Braces, BrainCircuit, Layers3, Cloud } from "lucide-react";
import { categories } from "@/data/background";

const treatments = {
  programming: { icon: Braces, note: "From a first script to a working system.", mark: "{ }", label: "Write" },
  ml: { icon: BrainCircuit, note: "Models, inference, and the work around them.", mark: "✳", label: "Learn" },
  tools: { icon: Layers3, note: "The tools between an idea and a release.", mark: "↗", label: "Build" },
  cloud: { icon: Cloud, note: "Some things need a place to run.", mark: "☁", label: "Deploy" },
};

export default function StudioSkills() {
  return <section className="studio-section studio-toolkit" id="skills" aria-labelledby="skills-heading">
    <div className="studio-section-heading"><div><p className="studio-eyebrow">06 / The toolkit</p><h2 id="skills-heading">A few tools.<br /><em>A lot of possibilities.</em></h2></div><p>Pick a tool to explore it across my work.</p></div>
    <div className="studio-toolkit-grid">{categories.map((category, index) => {
      const treatment = treatments[category.id as keyof typeof treatments];
      const Icon = treatment.icon;
      return <article className={`studio-toolbox studio-toolbox-${category.id}`} id={`skills-${category.id}`} key={category.id}>
        <div className="studio-toolbox-top"><span><Icon size={19} aria-hidden="true" />{treatment.label}</span><span>0{index + 1} / 04</span></div>
        <div className="studio-toolbox-title"><div><h3>{category.name}</h3><p>{treatment.note}</p></div><span className="studio-toolbox-mark" aria-hidden="true">{treatment.mark}</span></div>
        <ul className="studio-toolbox-chips">{category.skills.map(skill => <li key={skill}><a href={`/studio/search?q=${encodeURIComponent(skill)}`} aria-label={`Explore ${skill} across my work`}><span>{skill}</span><ArrowUpRight size={13} aria-hidden="true" /></a></li>)}</ul>
        <div className="studio-toolbox-bottom"><span>{category.skills.length} tools in the kit</span><span aria-hidden="true">↗</span></div>
      </article>;
    })}</div>
  </section>;
}
