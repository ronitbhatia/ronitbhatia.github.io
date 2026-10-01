import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import Studio from "@/pages/Studio";
import { projects } from "@/data/projects";
import { productLabCases } from "@/data/productLabCases";

afterEach(cleanup);

describe("Studio phase-one homepage", () => {
  it("gives every local navigation link an actual destination", () => {
    const { container } = render(<Studio />);
    const anchors = container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    expect(anchors.length).toBeGreaterThan(5);
    anchors.forEach((anchor) => {
      expect(container.querySelector(anchor.getAttribute("href")!)).not.toBeNull();
    });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const nav = screen.getByRole("navigation", { name: "Studio navigation" });
    expect(within(nav).getAllByRole("link").map(a => [a.textContent, a.getAttribute("href")])).toEqual([
      ["Work", "#experience"], ["Projects", "#work"], ["Product Lab", "#lab"], ["Extracurricular", "#initiatives"], ["Skills", "#skills"], ["Contact", "#contact"],
    ]);
    expect(Array.from(container.querySelectorAll("main > section[id]")).map(el => el.id)).toEqual(["experience", "work", "lab", "initiatives", "education", "skills", "about", "contact"]);
    expect(screen.getByRole("link", { name: "View my resume" })).toHaveAttribute("href", "/studio/resume");
    const hero = container.querySelector(".studio-hero")!;
    expect(hero.querySelector('a[href="mailto:roncy.bhatia@gmail.com"]')).not.toBeNull();
    expect(hero.querySelector('a[href="https://github.com/ronitbhatia"]')).not.toBeNull();
    expect(hero.querySelector('a[href="https://www.linkedin.com/in/ronit-bhatia/"]')).not.toBeNull();
  });

  it("reuses original project descriptions and preserves their external destinations", () => {
    render(<Studio />);
    for (const id of [12, 11, 1]) {
      const project = projects.find((item) => item.id === id)!;
      const article = screen.getByRole("heading", { name: project.name.split(": ")[0] }).closest("article")!;
      expect(within(article).getByText(project.description)).toBeInTheDocument();
      if (project.github) expect(article.querySelector(`a[href="${project.github}"]`)).not.toBeNull();
      if (project.demo) expect(article.querySelector(`a[href="${project.demo}"]`)).not.toBeNull();
      expect(article.querySelector("details")).not.toHaveAttribute("open");
    }
  });

  it("identifies speculative concepts and includes the existing tradeoffs", () => {
    render(<Studio />);
    for (const concept of productLabCases.slice(0, 3)) {
      const article = screen.getByRole("heading", { name: concept.title }).closest("article")!;
      expect(within(article).getByText(concept.tradeoffs)).toBeInTheDocument();
      expect(within(article).getByText(concept.type === "redesign" ? "Redesign" : "Speculative concept", { exact: true })).toBeInTheDocument();
    }
  });

  it("uses existing local assets and direct email contact", () => {
    const { container } = render(<Studio />);
    container.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      expect(img.alt.length).toBeGreaterThan(0);
      expect(existsSync(resolve("public", img.getAttribute("src")!.slice(1)))).toBe(true);
    });
    expect(screen.getByRole("link", { name: /Get in touch/ })).toHaveAttribute("href", "mailto:roncy.bhatia@gmail.com");
    expect(screen.getByRole("link", { name: /Read my resume/ })).toHaveAttribute("href", "/studio/resume");
    expect(existsSync(resolve("public/resume.pdf"))).toBe(true);
  });

  it("opens both complete collections independently and returns to selections", () => {
    render(<Studio />);
    const work = screen.getByRole("region", { name: "Ideas, in practice." });
    const lab = screen.getByRole("region", { name: "A little “what if?”" });
    fireEvent.click(screen.getByRole("button", { name: "View all 12 projects" }));
    expect(within(work).getAllByRole("article")).toHaveLength(projects.length);
    expect(within(lab).getAllByRole("article")).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: "View all 12 ideas" }));
    expect(within(lab).getAllByRole("article")).toHaveLength(productLabCases.length);
    for (const concept of productLabCases) {
      expect(within(lab).getByRole("heading", { name: concept.title })).toBeInTheDocument();
      expect(existsSync(resolve("public", concept.cover.src.slice(1)))).toBe(true);
    }
    fireEvent.click(screen.getByRole("button", { name: "Show selected projects" }));
    expect(screen.getByRole("heading", { name: "Ideas, in practice." })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Show selected ideas" }));
    expect(screen.getByRole("heading", { name: "A little “what if?”" })).toHaveFocus();
    expect(within(work).getAllByRole("article")).toHaveLength(3);
    expect(within(lab).getAllByRole("article")).toHaveLength(3);
  });

  it("restores the page title when leaving the preview", () => {
    document.title = "Original portfolio";
    const { unmount } = render(<Studio />);
    expect(document.title).toBe("Ronit Amar Bhatia | Engineering × Product");
    unmount();
    expect(document.title).toBe("Original portfolio");
  });
});
