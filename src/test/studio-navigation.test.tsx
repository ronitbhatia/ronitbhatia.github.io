import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import StudioNavigation from "@/components/studio/StudioNavigation";
import { scrollToStudioTop } from "@/components/studio/scrollMemory";

afterEach(() => { cleanup(); sessionStorage.clear(); });
function Pages() {
  const location = useLocation();
  const navigate = useNavigate();
  return <div className="studio" data-scroll-page={location.pathname} data-testid="scroller"><main><a className="studio-brand" href="#top">Home</a><details><summary>More</summary>Details</details><button onClick={() => navigate("/project")}>Project</button><button onClick={() => navigate(-1)}>Back</button><a href="#top" onClick={scrollToStudioTop}>Back to top</a></main></div>;
}
it("restores the container position and expanded details on Back, but starts new pages at the top", async () => {
  render(<MemoryRouter><StudioNavigation /><Pages /></MemoryRouter>);
  const scroller = screen.getByTestId("scroller");
  fireEvent.pointerDown(scroller);
  scroller.scrollTop = 1234;
  scroller.querySelector("details")!.open = true;
  fireEvent.scroll(scroller);
  fireEvent.click(screen.getByRole("button", { name: "Project" }));
  expect(scroller.scrollTop).toBe(0);
  scroller.querySelector("details")!.open = false;
  fireEvent.click(screen.getByRole("button", { name: "Back" }));
  await waitFor(() => expect(scroller.scrollTop).toBe(1234));
  expect(scroller.querySelector("details")).toHaveAttribute("open");
});
it("back to top scrolls the container even on repeated clicks", () => {
  render(<MemoryRouter><Pages /></MemoryRouter>);
  const scroller = screen.getByTestId("scroller");
  for (let i = 0; i < 2; i++) {
    scroller.scrollTop = 900;
    fireEvent.click(screen.getByRole("link", { name: "Back to top" }));
    expect(scroller.scrollTop).toBe(0);
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
  }
});
