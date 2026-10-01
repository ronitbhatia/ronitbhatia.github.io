import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import StudioBackground from "@/components/studio/StudioBackground";
import { experiences, education, initiatives, categories } from "@/data/background";
import { searchStudio, studioTargetUrl } from "@/data/studioSearch";
import { searchEntries } from "@/data/searchCatalog";
import { projects } from "@/data/projects";
import { productLabCases } from "@/data/productLabCases";
afterEach(cleanup);
describe("Studio background and discovery", () => {
  it("preserves every role, degree, initiative, and skill", () => {
    render(<StudioBackground />);
    experiences.forEach(e => {
      expect(screen.getByText(e.company)).toBeInTheDocument();
      expect(screen.getByText(e.description)).toBeInTheDocument();
      e.readMore.forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    });
    education.forEach(e => {
      expect(screen.getByText(e.degree)).toBeInTheDocument();
      e.coursework.forEach(text => expect(screen.getAllByText(text).length).toBeGreaterThan(0));
    });
    initiatives.forEach(e => expect(screen.getByText(e.description)).toBeInTheDocument());
    categories.forEach(c => c.skills.forEach(skill => expect(screen.getAllByText(skill).length).toBeGreaterThan(0)));
  });
  it("maps catalog targets to real Studio pages and section IDs", () => {
    const { container } = render(<StudioBackground />);
    const topLevel = new Set(["about", "contact", "experience", "education", "initiatives", "skills"]);
    for (const entry of searchEntries) {
      const url = studioTargetUrl(entry.target);
      if (url.startsWith("/studio#")) {
        const id = url.split("#")[1];
        expect(topLevel.has(id) || container.querySelector(`[id="${id}"]`) !== null, url).toBe(true);
      }
      if (url.startsWith("/studio/work/")) expect(projects.some(p => String(p.id) === url.split("/").pop()), url).toBe(true);
      if (url.startsWith("/studio/lab/")) expect(productLabCases.some(p => p.id === url.split("/").pop()), url).toBe(true);
    }
  });
  it("finds current work and education using existing search logic", () => {
    expect(searchStudio("Y Meadows").some(r => r.url === "/studio#experience-y-meadows")).toBe(true);
    expect(searchStudio("Cornell").find(r => r.url === "/studio#education-cornell")?.description).toContain("Master of Engineering in Engineering Management");
    expect(searchStudio("Quivlo").some(r => r.url === "/studio/work/11")).toBe(true);
  });
  it("links every toolkit skill to its own search", () => {
    render(<StudioBackground />);
    for (const category of categories) for (const skill of category.skills) {
      expect(screen.getByRole("link", { name: `Explore ${skill} across my work` })).toHaveAttribute("href", `/studio/search?q=${encodeURIComponent(skill)}`);
    }
  });
});
