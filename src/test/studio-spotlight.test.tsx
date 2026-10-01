import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import StudioSpotlight from "@/components/studio/StudioSpotlight";

// Test dialog behavior without waiting for browser-only exit animations.
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return { ...actual, AnimatePresence: ({ children }: { children: import("react").ReactNode }) => children };
});

beforeAll(() => { Element.prototype.scrollIntoView = () => {}; });
afterEach(cleanup);
function Location() { const l = useLocation(); return <output data-testid="location">{l.pathname}{l.hash}</output>; }
function setup(path = "/studio") { return render(<MemoryRouter initialEntries={[path]}><StudioSpotlight /><Location /></MemoryRouter>); }

describe("Studio Spotlight", () => {
  for (const path of ["/", "/studio", "/studio/work", "/studio/lab", "/studio/work/12", "/studio/lab/commons-map", "/studio/resume", "/studio/search"]) {
    it(`is available on ${path}`, () => { setup(path); expect(screen.getByRole("button", { name: "Open Studio Spotlight" })).toBeInTheDocument(); });
  }
  it("does not mount on a removed route", () => { setup("/desktop"); expect(screen.queryByRole("button", { name: "Open Studio Spotlight" })).toBeNull(); });
  it("opens with keyboard focus and navigates shortcuts using arrows and Enter", async () => {
    setup();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const input = await screen.findByRole("combobox");
    expect(input).toHaveFocus();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-activedescendant", "spotlight-choice-1");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByTestId("location")).toHaveTextContent("/studio#work");
  });
  it("searches current data and handles empty results", async () => {
    setup(); fireEvent.click(screen.getByRole("button", { name: "Open Studio Spotlight" }));
    const input = await screen.findByRole("combobox");
    fireEvent.change(input, { target: { value: "Quivlo" } });
    expect(screen.getAllByRole("option").some(o => o.textContent?.includes("Quivlo"))).toBe(true);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "zzzzzznonexistent123" } });
    expect(screen.queryAllByRole("option")).toHaveLength(0);
    expect(screen.getByRole("combobox")).not.toHaveAttribute("aria-activedescendant");
  });
  it("dismisses and restores launcher focus without changing the route", async () => {
    setup("/studio#education");
    fireEvent.click(screen.getByRole("button", { name: "Open Studio Spotlight" }));
    fireEvent.click(await screen.findByRole("button", { name: "Close Studio Spotlight" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(screen.getByTestId("location")).toHaveTextContent("/studio#education");
    expect(screen.getByRole("button", { name: "Open Studio Spotlight" })).toHaveFocus();
  });
});
