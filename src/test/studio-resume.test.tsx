import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import StudioResume from "@/pages/StudioResume";
import Studio from "@/pages/Studio";
import preview from "@/data/resumePreview.json";

afterEach(cleanup);

describe("Resume and current role", () => {
  it("keeps rendered pages and selectable text in sync with the original PDF", () => {
    const hash = createHash("sha256").update(readFileSync("public/resume.pdf")).digest("hex");
    expect(preview.sourceSha256).toBe(hash);
    for (const page of preview.pages) {
      expect(existsSync(resolve("public", page.image.slice(1)))).toBe(true);
      expect(page.text.length).toBeGreaterThan(100);
    }
  });

  it("renders without a PDF plugin, offers download, and toggles zoom", () => {
    const { container } = render(<StudioResume />);
    expect(container.querySelector("iframe, embed, object")).toBeNull();
    expect(screen.getAllByRole("img")).toHaveLength(preview.pages.length);
    expect(screen.getByRole("link", { name: /Download PDF/ })).toHaveAttribute("download", "Ronit-Amar-Bhatia-Resume.pdf");
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByRole("button", { name: "Fit to width" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("img")[0]).toHaveClass("is-zoomed");
    fireEvent.click(screen.getByRole("button", { name: "Fit to width" }));
    expect(screen.getAllByRole("img")[0]).not.toHaveClass("is-zoomed");
  });

  it("highlights the current role before selected projects", () => {
    render(<Studio />);
    const role = screen.getAllByRole("heading", { name: "Forward Deployed Engineer" })[0];
    const work = screen.getByRole("heading", { name: "Ideas, in practice." });
    expect(role.compareDocumentPosition(work) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("Currently at Y Meadows")).toBeInTheDocument();
  });
});
