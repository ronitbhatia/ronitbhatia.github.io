import { RonitNote } from "./PixelRonit";
import StudioSkills from "./StudioSkills";
import { experiences, education, initiatives } from "@/data/background";

export function StudioExperience() {
  return (
    <section className="studio-section" id="experience" aria-labelledby="experience-heading">
      <div className="studio-section-heading"><div><p className="studio-eyebrow">01 / Experience</p><h2 id="experience-heading">Where I’ve worked.</h2></div><RonitNote pose="build">From customer onboarding to production.</RonitNote></div>
      <div className="studio-timeline">{experiences.map((entry, index) => <article id={`experience-${entry.id}`} key={entry.id} className="studio-timeline-entry">
        <div className="studio-timeline-date">{index === 0 && <span className="studio-current-label">Current role</span>}<p>{entry.period}</p><p>{entry.location} · {entry.type}</p></div>
        <div><h3>{entry.role}</h3><p className="studio-entry-company">{entry.company}</p><p>{entry.description}</p><div className="studio-tags">{entry.tech.map(tag => <span key={tag}>{tag}</span>)}</div><details className="studio-details"><summary>Responsibilities and achievements</summary><div className="studio-details-body">{entry.readMore.map(text => <p key={text}>{text}</p>)}</div></details></div>
      </article>)}</div>
    </section>
  );
}

export function StudioEducation() {
  return (

    <section className="studio-section" id="education" aria-labelledby="education-heading">
      <div className="studio-section-heading"><div><p className="studio-eyebrow">05 / Education</p><h2 id="education-heading">Where I’ve learned.</h2></div><RonitNote pose="think">Computer science, then engineering management.</RonitNote></div>
      <div className="studio-education-grid">{education.map(entry => <article id={`education-${entry.id}`} className="studio-background-card" key={entry.id}><p className="studio-eyebrow">{entry.period}</p><h3>{entry.school}</h3><p>{entry.degree}</p>{entry.subtitle && <p>{entry.subtitle}</p>}<details className="studio-details"><summary>Coursework</summary><ul>{entry.coursework.map(course => <li key={course}>{course}</li>)}</ul></details></article>)}</div>
    </section>
  );
}

export function StudioInitiatives() {
  return (

    <section className="studio-section" id="initiatives" aria-labelledby="initiatives-heading">
      <div className="studio-section-heading"><div><p className="studio-eyebrow">04 / Extracurricular</p><h2 id="initiatives-heading">Beyond the day job.</h2></div></div>
      <div className="studio-education-grid">{initiatives.map(entry => <article id={`initiative-${entry.id}`} className="studio-background-card" key={entry.id}><p className="studio-eyebrow">{entry.period}</p><h3>{entry.title}</h3>{entry.role && <p>{entry.role}</p>}<p>{entry.description}</p><div className="studio-tags">{entry.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{entry.more && <details className="studio-details"><summary>More about this work</summary><div className="studio-details-body">{entry.more.map(text => <p key={text}>{text}</p>)}</div></details>}{entry.github && <a className="studio-text-link" href={entry.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}</article>)}</div>
    </section>
  );
}

export default function StudioBackground() {
  return <><StudioExperience /><StudioInitiatives /><StudioEducation /><StudioSkills /></>;
}
