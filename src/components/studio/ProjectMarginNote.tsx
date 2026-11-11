import { projectCardNotes, projectNotes } from "@/data/projectNotes";
import { productLabNotes } from "@/data/productLabNotes";
import { PixelRonit } from "./PixelRonit";

export default function ProjectMarginNote({ projectId, compact = false }: { projectId: number; compact?: boolean }) {
  return <ThinkingNote note={compact ? projectCardNotes[projectId] : projectNotes[projectId]} />;
}

export function ProductLabMarginNote({ conceptId }: { conceptId: string }) {
  return <ThinkingNote note={productLabNotes[conceptId]} />;
}

function ThinkingNote({ note }: { note: string | undefined }) {
  if (!note) return null;
  return <aside className="project-margin-note" aria-label="Ronit’s thinking"><PixelRonit pose="think" /><div><span>My thinking</span><p>{note}</p></div></aside>;
}
