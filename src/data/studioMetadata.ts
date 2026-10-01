import { projects } from "./projects";
import { productLabCases } from "./productLabCases";

export const siteOrigin = "https://ronitbhatia.github.io";
const siteTitle = "Ronit Amar Bhatia | Engineering × Product";
const siteDescription = "Forward Deployed Engineer at Y Meadows. Explore Ronit’s software projects, product ideas, experience, and the thinking behind his work.";
export function getStudioMetadata(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const project = projects.find(p => path === `/studio/work/${p.id}`);
  const concept = productLabCases.find(p => path === `/studio/lab/${p.id}`);
  const pages: Record<string, [string, string]> = {
    "/": [siteTitle, siteDescription],
    "/studio": [siteTitle, siteDescription],
    "/studio/work": ["Projects | Ronit Amar Bhatia", "Software, systems, and experiments. Explore all of Ronit’s engineering projects, technologies, and source code."],
    "/studio/lab": ["Product Lab | Ronit Amar Bhatia", "Product redesigns and speculative concepts by Ronit Amar Bhatia, with sketches, design decisions, and tradeoffs."],
    "/studio/resume": ["Resume | Ronit Amar Bhatia", "Read or download Ronit Amar Bhatia’s resume, including engineering experience, education, and skills."],
    "/studio/search": ["Search | Ronit Amar Bhatia", "Find projects, experience, education, and skills across Ronit’s portfolio."],
  };
  const entry = project ? [project.name + " | Ronit Amar Bhatia", project.description] : concept ? [concept.title + " | Ronit Amar Bhatia", concept.oneLiner] : pages[path];
  return {
    title: entry?.[0] ?? "Page not found | Ronit Amar Bhatia",
    description: entry?.[1] ?? "This page is not in the Studio. Explore Ronit’s projects, product ideas, and experience.",
    canonical: siteOrigin + (path === "/studio" ? "/" : path),
    image: siteOrigin + (concept?.cover.src ?? "/new-pic.png"),
    imageAlt: concept?.cover.caption ?? "Ronit Amar Bhatia",
    noindex: !entry || path === "/studio/search",
  };
}
export const studioStaticRoutes = ["/", "/studio", "/studio/resume", "/studio/search", "/studio/work", "/studio/lab", ...projects.map(p => `/studio/work/${p.id}`), ...productLabCases.map(p => `/studio/lab/${p.id}`)];
