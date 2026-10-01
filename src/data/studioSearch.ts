import { scoreEntry, type SearchTarget } from "./searchCatalog";
import { performUnifiedSearch } from "./siteSearchEngine";
import { experiences, education, initiatives, categories } from "./background";
import { projects } from "./projects";
import { productLabCases } from "./productLabCases";

export function studioTargetUrl(target: SearchTarget): string {
  if (target.type === "project") return `/studio/work/${target.projectId}`;
  if (target.type === "skills-section") return `/studio#skills-${target.sectionId}`;
  if (target.type === "external") return target.url;
  if (target.type === "action") return target.action === "downloadResume" ? "/studio/resume" : "/studio#contact";
  if (target.type === "timeline") {
    if (target.sectionId === "product-lab") return `/studio/lab/${target.entryId}`;
    const prefix = target.sectionId === "initiative-impact" ? "initiative" : target.sectionId;
    return `/studio#${prefix}-${target.entryId}`;
  }
  const pages: Record<string, string> = { home: "/studio#about", projects: "/studio/work", "product-lab": "/studio/lab", experience: "/studio#experience", education: "/studio#education", "initiative-impact": "/studio#initiatives", skills: "/studio#skills", contact: "/studio#contact", resume: "/studio/resume" };
  return pages[target.id] ?? "/studio";
}

export function searchStudio(query: string) {
  return performUnifiedSearch(query).filter(entry => scoreEntry(query, entry) >= 6).map(entry => {
    const target = entry.target;
    let title = entry.title;
    let description = entry.description;
    if (target.type === "project") {
      const project = projects.find(p => p.id === target.projectId);
      if (project) { title = project.name; description = project.description; }
    } else if (target.type === "skills-section") {
      const category = categories.find(c => c.id === target.sectionId);
      if (category) { title = category.name; description = category.skills.join(", "); }
    } else if (target.type === "timeline") {
      if (target.sectionId === "education") {
        const item = education.find(e => e.id === target.entryId);
        if (item) { title = item.school; description = `${item.degree} · ${item.period}`; }
      } else if (target.sectionId === "experience") {
        const item = experiences.find(e => e.id === target.entryId);
        if (item) { title = `${item.company}: ${item.role}`; description = item.description; }
      } else if (target.sectionId === "initiative-impact") {
        const item = initiatives.find(e => e.id === target.entryId);
        if (item) { title = item.title; description = item.description; }
      } else {
        const item = productLabCases.find(e => e.id === target.entryId);
        if (item) { title = item.title; description = item.subject; }
      }
    }
    return { ...entry, title: title.replace(/—/g, ":").replace("Deplpyed", "Deployed"), description: description.replace(/—/g, ","), url: studioTargetUrl(target) };
  }).sort((a, b) => Number(b.title.toLowerCase().includes(query.trim().toLowerCase())) - Number(a.title.toLowerCase().includes(query.trim().toLowerCase())));
}
