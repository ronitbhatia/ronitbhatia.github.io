import { RonitNote } from "@/components/studio/PixelRonit";
import StudioShell from "@/components/studio/StudioShell";

export default function NotFound() {
  return <StudioShell title="Page not found"><div className="studio-collection-intro">
    <p className="studio-eyebrow">404 / A wrong turn</p>
    <h1>This room isn’t here.</h1>
    <RonitNote>I don’t think I built this room. Back to the Studio?</RonitNote>
    <a className="studio-button" href="/">Return to Studio ↗</a>
  </div></StudioShell>;
}
