import StudioBrand from "./StudioBrand";
import StudioNav from "./StudioNav";
import { RonitNote } from "./PixelRonit";
import { useEffect, type ReactNode } from "react";
import "@/styles/studio.css";

export default function StudioShell({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | Ronit Amar Bhatia`;
    return () => { document.title = previous; };
  }, [title]);
  return <div className="studio" data-scroll-page={window.location.pathname}>
    <a className="studio-skip" href="#collection-main">Skip to content</a>
    <header className="studio-header">
      <StudioBrand />
      <StudioNav />
    </header>
    <main className="studio-collection-main" id="collection-main" tabIndex={-1}>{children}</main>
    <footer className="studio-footer"><RonitNote pose="hello">Made by Ronit. Hosted by the little guy.</RonitNote><a href="/studio">Back to Studio ↑</a></footer>
  </div>;
}
