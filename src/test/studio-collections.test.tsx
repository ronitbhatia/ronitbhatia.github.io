import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import StudioCollection from "@/pages/StudioCollection";
import StudioDetail from "@/pages/StudioDetail";
import { projects } from "@/data/projects";
import { productLabCases } from "@/data/productLabCases";
afterEach(cleanup);
describe("Studio collections", () => {
  it("combines status and text filters, including empty results and reset", () => {
    render(<MemoryRouter initialEntries={["/studio/work?filter=Live"]}><StudioCollection kind="work" /></MemoryRouter>);
    expect(screen.getAllByRole("article")).toHaveLength(projects.filter(p => p.status === "Live").length);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Quivlo" } });
    expect(screen.getAllByRole("article")).toHaveLength(1);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "no such item" } });
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  });
  it("filters Product Lab and provides a route for every idea", () => {
    render(<MemoryRouter><StudioCollection kind="lab" /></MemoryRouter>);
    for (const c of productLabCases) expect(screen.getByRole("link", { name: c.title })).toHaveAttribute("href", `/studio/lab/${c.id}`);
    fireEvent.click(screen.getByRole("button", { name: "Redesigns" }));
    expect(screen.getAllByRole("article")).toHaveLength(productLabCases.filter(c => c.type === "redesign").length);
  });
  for (const project of projects) it(`preserves all project content: ${project.id}`, () => {
    render(<MemoryRouter initialEntries={[`/studio/work/${project.id}`]}><Routes><Route path="/studio/work/:id" element={<StudioDetail kind="work" />} /></Routes></MemoryRouter>);
    expect(screen.getByText(project.description)).toBeInTheDocument();
    project.readMore?.forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
  });
  for (const c of productLabCases) it(`preserves complete concept and image assets: ${c.id}`, () => {
    render(<MemoryRouter initialEntries={[`/studio/lab/${c.id}`]}><Routes><Route path="/studio/lab/:id" element={<StudioDetail kind="lab" />} /></Routes></MemoryRouter>);
    [c.oneLiner, c.problem, c.insight, c.concept, c.tradeoffs, ...c.principles].forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    [c.cover, ...c.gallery].forEach(image => expect(existsSync(resolve("public", image.src.slice(1)))).toBe(true));
    expect(screen.getAllByRole("img")).toHaveLength(c.gallery.length + 1);
  });
  it("handles unknown detail IDs", () => {
    render(<MemoryRouter initialEntries={["/studio/work/missing"]}><Routes><Route path="/studio/work/:id" element={<StudioDetail kind="work" />} /></Routes></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Not found." })).toBeInTheDocument();
  });
});
