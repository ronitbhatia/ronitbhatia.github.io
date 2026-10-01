import { RonitNote } from "@/components/studio/PixelRonit";
import { useSearchParams } from "react-router-dom";
import StudioShell from "@/components/studio/StudioShell";
import { searchStudio } from "@/data/studioSearch";

export default function StudioSearch() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const results = searchStudio(query);
  return <StudioShell title="Search">
    <div className="studio-collection-intro"><p className="studio-eyebrow">Find your way around</p><h1>Search the Studio.</h1><RonitNote>There’s quite a bit in here. Let’s find your bit.</RonitNote></div>
    <label className="studio-search-label studio-site-search">Search projects, experience, education, and skills<input type="search" autoFocus value={query} onChange={e => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })} placeholder="Try Cornell, Python, or Y Meadows" /></label>
    {!query.trim() && <div className="studio-search-suggestions">{["Y Meadows", "Cornell", "on-device", "product lab"].map(q => <button key={q} onClick={() => setParams({ q })}>{q} ↗</button>)}</div>}
    <p role="status" className="studio-result-count">{query.trim() ? `${results.length} results` : "Search across the whole portfolio."}</p>
    <ul className="studio-search-results">{results.map(entry => <li key={entry.id}><a href={entry.url}><span className="studio-eyebrow">{entry.group}</span><h2>{entry.title} ↗</h2><p>{entry.description}</p></a></li>)}</ul>
    {query.trim() && results.length === 0 && <p>No matches. Try a project name, company, or skill.</p>}
  </StudioShell>;
}
