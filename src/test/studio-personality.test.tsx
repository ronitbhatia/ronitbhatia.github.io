import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import StudioBrand from "@/components/studio/StudioBrand";
import { useRonitContext } from "@/components/studio/useRonitContext";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
function ContextProbe({ path = "/" }: { path?: string }) {
  const context = useRonitContext(path);
  return <output>{context ? `${context.pose}: ${context.note}` : "No section"}</output>;
}
it("follows the visible section during scrolling, independently of the URL hash", async () => {
  let active = "experience";
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function(this: HTMLElement) {
    if (this.classList.contains("studio")) return { top: 0, bottom: 800, height: 800 } as DOMRect;
    return { top: this.id === active ? 0 : 1000, bottom: this.id === active ? 800 : 1800, height: 800 } as DOMRect;
  });
  const { container } = render(<div className="studio"><section id="experience" /><section id="work" /><section id="lab" /><ContextProbe /></div>);
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("build: The work between a customer problem and production."));
  active = "work"; fireEvent.scroll(container.firstChild!);
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("think: Look for the decisions behind each build."));
  active = "lab"; fireEvent.scroll(container.firstChild!);
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("explore: A sketch, a customer need, and a tradeoff."));
  active = "hero"; fireEvent.scroll(container.firstChild!);
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("No section"));
});
it("uses route context on detail pages and clears it elsewhere", async () => {
  const { rerender } = render(<ContextProbe path="/studio/lab/glyph-home" />);
  expect(screen.getByRole("status")).toHaveTextContent("explore:");
  rerender(<ContextProbe path="/studio/work/12" />);
  expect(screen.getByRole("status")).toHaveTextContent("think:");
  rerender(<ContextProbe path="/studio/resume" />);
  expect(screen.getByRole("status")).toHaveTextContent("No section");
});
it("opens the personal note, closes on Escape, and restores monogram focus", async () => {
  render(<StudioBrand home />);
  const trigger = screen.getByRole("button", { name: "Behind the portfolio" });
  fireEvent.click(trigger);
  const dialog = screen.getByRole("dialog", { name: "Behind the portfolio" });
  expect(dialog).toHaveAccessibleDescription(/choices behind the work/);
  fireEvent.keyDown(dialog, { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
  expect(screen.getByRole("link", { name: /back to top/ })).toHaveAttribute("href", "#studio-top");
});
