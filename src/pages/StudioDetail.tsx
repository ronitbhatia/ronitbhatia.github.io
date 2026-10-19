import ProjectMarginNote, { ProductLabMarginNote } from "@/components/studio/ProjectMarginNote";
import { RonitDiscovery } from "@/components/studio/PixelRonit";
import { useParams } from "react-router-dom";
import { ReadingProgress, CopyLink } from "@/components/studio/StudioDetailTools";
import StudioImageViewer, { ImageButton } from "@/components/studio/StudioImageViewer";
import StudioShell from "@/components/studio/StudioShell";
import { projects } from "@/data/projects";
import { productLabCases } from "@/data/productLabCases";

export default function StudioDetail({ kind }: { kind: "work" | "lab" }) {
  const { id } = useParams();
  const project = kind === "work" ? projects.find(p => String(p.id) === id) : undefined;
  const concept = kind === "lab" ? productLabCases.find(p => p.id === id) : undefined;
  const title = project?.name ?? concept?.title;
  if (!title) return <StudioShell title="Not found"><div className="studio-collection-intro"><h1>Not found.</h1><p>This item isn’t in the collection.</p><a className="studio-text-link" href={`/studio/${kind}`}>← Back to {kind === "work" ? "work" : "Product Lab"}</a></div></StudioShell>;
  return <StudioShell title={title}>
    <ReadingProgress key={`${kind}-${id}`} />
    <div className="studio-detail-toolbar"><a className="studio-text-link studio-detail-back" href={`/studio/${kind}`}>← All {kind === "work" ? "projects" : "case studies"}</a><CopyLink key={`${kind}-${id}`} /></div>
    <header className="studio-detail-heading"><p className="studio-eyebrow">{project?.status ?? (concept?.type === "redesign" ? "Redesign case study" : "New product assessment")} {concept && ` / ${concept.period}`}</p><h1>{title}</h1>{concept && <p>{concept.subject}</p>}<div className="studio-tags">{(project?.stack ?? concept?.tags ?? []).map(tag => <span key={tag}>{tag}</span>)}</div></header>
    {project && <div className="studio-project-detail">
      <ProjectMarginNote projectId={project.id} />
      <section><h2>Overview</h2><p>{project.description}</p></section>
      {project.readMore && <section><h2>Inside the project</h2>{project.readMore.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>}
      {(project.github || project.demo) && <section><h2>Links</h2><div className="studio-project-links">{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">{project.demoLabel ?? "Visit project"} ↗</a>}</div></section>}
    </div>}
    {concept && <StudioImageViewer key={concept.id} images={[concept.cover, ...concept.gallery]} title={concept.title}>{open => <>
      <div className="studio-project-detail"><p className="studio-case-scope">Independent product assessment. The designs explore a proposal; assumptions and validation plans are not company plans or completed research.</p><ProductLabMarginNote conceptId={concept.id} /></div>
      <figure className="studio-detail-cover"><ImageButton image={concept.cover} onClick={button => open(0, button)} /><figcaption>{concept.cover.caption}</figcaption></figure>
      <div className="studio-concept-story">{[["Decision summary", concept.oneLiner], ["Customer problem & target segment", concept.problem], ["Strategic fit & alternatives", concept.insight]].map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}</div>
      <div className="studio-detail-gallery">{concept.gallery.map((image, index) => <figure key={image.src}><ImageButton image={image} onClick={button => open(index + 1, button)} lazy /><figcaption>{image.caption}</figcaption></figure>)}</div>
      <div className="studio-concept-story"><section><h2>Product priorities</h2><ul>{concept.principles.map(p => <li key={p}>{p}</li>)}</ul></section><section><h2>Proposed MVP & scope</h2><p>{concept.concept}</p></section><section><h2>Tradeoffs & business risks</h2><p>{concept.tradeoffs}</p></section><section><h2>Validation plan & success measures</h2><p>{concept.validation}</p></section><section className="studio-case-verdict"><h2>My verdict</h2><p>{concept.verdict}</p></section></div>
    </>}</StudioImageViewer>}
    <RonitDiscovery exclude={`/studio/${kind}/${id}`} />
    <div className="studio-detail-end"><a className="studio-button" href={`/studio/${kind}`}>Explore more {kind === "work" ? "projects" : "case studies"} ↗</a></div>
  </StudioShell>;
}
