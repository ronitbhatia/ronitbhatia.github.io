import { afterEach, expect, it } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";
import RouteMetadata from "@/components/studio/RouteMetadata";
import { getStudioMetadata, studioStaticRoutes } from "@/data/studioMetadata";
afterEach(cleanup);
it("serves the Studio at the root with Spotlight available", async () => {
  window.history.replaceState({}, "", "/");
  render(<App />);
  expect(await screen.findByRole("heading", { name: "Engineering. With a product mind." })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Open Studio Spotlight" })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /RonitOS/ })).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Pause host dialogue" })).toBeInTheDocument();
});
it("provides unique canonical metadata for every static detail, including trailing slash URLs", () => {
  expect(getStudioMetadata("/studio").canonical).toBe(getStudioMetadata("/").canonical);
  for (const route of studioStaticRoutes) {
    const metadata = getStudioMetadata(route);
    expect(metadata.title).not.toMatch(/not found/);
    expect(getStudioMetadata(route + "/")).toEqual(metadata);
  }
  expect(getStudioMetadata("/studio/lab/iphone-air-monocoque").image).toContain("/product-lab/");
  expect(getStudioMetadata("/studio/search").noindex).toBe(true);
  expect(getStudioMetadata("/missing").noindex).toBe(true);
});
it("updates sharing metadata during client navigation", () => {
  const description = document.createElement("meta"); description.name = "description"; document.head.append(description);
  const canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical);
  const view = render(<MemoryRouter initialEntries={["/studio/lab/iphone-air-monocoque"]}><RouteMetadata /></MemoryRouter>);
  expect(description.content).toContain("iPhone Air");
  expect(canonical.href).toBe("https://ronitbhatia.github.io/studio/lab/iphone-air-monocoque");
  view.unmount(); description.remove(); canonical.remove();
});

it("no longer mounts a desktop at the retired URL", async () => {
  window.history.replaceState({}, "", "/desktop");
  render(<App />);
  expect(await screen.findByRole("heading", { name: "This room isn’t here." })).toBeInTheDocument();
  expect(getStudioMetadata("/desktop").noindex).toBe(true);
});
