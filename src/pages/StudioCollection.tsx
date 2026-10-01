import { RonitNote } from "@/components/studio/PixelRonit";
import ProjectMarginNote, { ProductLabMarginNote } from "@/components/studio/ProjectMarginNote";
import { useSearchParams } from "react-router-dom";
import StudioShell from "@/components/studio/StudioShell";
import { projects } from "@/data/projects";
import { productLabCases } from "@/data/productLabCases";

export default function StudioCollection({ kind }: { kind: "work" | "lab" }) {
  const [params, setParams] = useSearchParams();
  const isWork = kind === "work";
  const filters = isWork ? ["All", "Live", "Open Source", "WIP"] : ["All", "redesign", "speculative"];
  const filter = filters.includes(params.get("filter") ?? "") ? params.get("filter")! : "All";
  const query = params.get("q") ?? "";
  function update(key: string, value: string, replace = false) {
    const next = new URLSearchParams(params);
    if (!value || value === "All") next.delete(key); else next.set(key, value);
    setParams(next, { replace });
  }
  const entries = isWork ? projects.map(p => ({ id: String(p.id), title: p.name, description: p.description, tags: p.stack, category: p.status, image: null })) : productLabCases.map(p => ({ id: p.id, title: p.title, description: p.subject, tags: p.tags, category: p.type, image: p.cover }));
  const visible = entries.filter(p => (filter === "All" || p.category === filter) && `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <StudioShell title={isWork ? "Projects" : "Product Lab"}>
    <div className="studio-collection-intro"><p className="studio-eyebrow">{isWork ? "01 / Built" : "02 / Explored"}</p><h1>{isWork ? "The work." : "Product Lab."}</h1><p>{isWork ? "Software, systems, and experiments. All in one place." : "Redesigns, speculative products, and a few questions about how things could work."}</p></div>
    <RonitNote pose={isWork ? "build" : "explore"}>{isWork ? "Pull up a chair. Here’s what I’ve been building." : "Some ideas start with a problem. Others start with a very odd question."}</RonitNote>
    <div className="studio-filter-bar">
      <div className="studio-filter-options" role="group" aria-label="Filter collection">{filters.map(f => <button key={f} type="button" aria-pressed={filter === f} onClick={() => update("filter", f)}>{f === "redesign" ? "Redesigns" : f === "speculative" ? "Speculative" : f}</button>)}</div>
      <label className="studio-search-label">Search {isWork ? "projects" : "ideas"}<input type="search" value={query} onChange={e => update("q", e.target.value, true)} placeholder={isWork ? "Name, technology, or topic" : "Name, brand, or topic"} /></label>
    </div>
    <p className="studio-result-count" role="status">{visible.length} of {entries.length} {isWork ? "projects" : "ideas"}</p>
    <div className="studio-archive-grid">{visible.map(entry => <article key={entry.id} className="studio-archive-card">
      {entry.image && <a href={`/studio/${kind}/${entry.id}`} tabIndex={-1} aria-hidden="true"><div className="studio-concept-image"><img src={entry.image.src} alt="" loading="lazy" width="960" height="540" /></div></a>}
      <div className="studio-archive-card-body"><p className="studio-eyebrow">{entry.category === "speculative" ? "Speculative concept" : entry.category}</p><h2><a href={`/studio/${kind}/${entry.id}`}>{entry.title} <span aria-hidden="true">↗</span></a></h2><p className="studio-archive-description">{entry.description}</p>{isWork ? <ProjectMarginNote projectId={Number(entry.id)} /> : <ProductLabMarginNote conceptId={entry.id} />}<div className="studio-tags">{entry.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div></div>
    </article>)}</div>
    {visible.length === 0 && <div className="studio-empty"><RonitNote>No matches yet. Let’s try another direction.</RonitNote><h2>No matches yet.</h2><p>Try a different topic or clear the filters.</p><button className="studio-button" onClick={() => setParams({})}>Clear filters</button></div>}
  </StudioShell>;
}
