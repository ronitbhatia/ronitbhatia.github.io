import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { RonitDiscovery, RonitHello } from "@/components/studio/PixelRonit";
import { projects } from "@/data/projects";
import { productLabCases } from "@/data/productLabCases";
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
it("cycles greetings automatically and can pause and resume", () => {
  vi.useFakeTimers();
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 0, bottom: 120 } as DOMRect);
  render(<RonitHello />);
  expect(screen.getByText("Hi, I’m Ronit. The smaller one.")).toBeInTheDocument();
  act(() => vi.advanceTimersByTime(3000));
  expect(screen.getByText("Same curiosity. Fewer pixels.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Pause host dialogue" }));
  act(() => vi.advanceTimersByTime(6000));
  expect(screen.getByText("Same curiosity. Fewer pixels.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Resume host dialogue" }));
  act(() => vi.advanceTimersByTime(3000));
  expect(screen.getByText("I built the projects. He gets the attention.")).toBeInTheDocument();
  vi.useRealTimers();
});

it("offers valid destinations, excluding the current page and previous suggestion", () => {
  vi.spyOn(Math, "random").mockReturnValue(0);
  const current = `/studio/work/${projects[0].id}`;
  render(<RonitDiscovery exclude={current} />);
  fireEvent.click(screen.getByRole("button", { name: /Pick something for me/ }));
  const first = screen.getByRole("link").getAttribute("href");
  expect(first).not.toBe(current);
  const valid = [...projects.map(p => `/studio/work/${p.id}`), ...productLabCases.map(p => `/studio/lab/${p.id}`)];
  expect(valid).toContain(first);
  fireEvent.click(screen.getByRole("button", { name: /Pick another/ }));
  const next = screen.getByRole("link").getAttribute("href");
  expect(next).not.toBe(first);
  expect(next).not.toBe(current);
  expect(valid).toContain(next);
});
