import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { PixelRonit } from "./PixelRonit";
import { scrollToStudioTop } from "./scrollMemory";

export default function StudioBrand({ home = false }: { home?: boolean }) {
  return <div className="studio-brand">
    <Dialog.Root>
      <Dialog.Trigger asChild><button type="button" className="studio-monogram" aria-label="Behind the portfolio" title="A note from Ronit">rb.</button></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="ronit-story-overlay" />
        <Dialog.Content className="ronit-story" onKeyDown={event => {
          if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); event.stopPropagation(); }
        }}>
          <Dialog.Close className="ronit-story-close" aria-label="Close behind the portfolio"><X size={20} /></Dialog.Close>
          <PixelRonit pose="hello" />
          <span className="ronit-label">You found the little guy’s corner</span>
          <Dialog.Title>Behind the portfolio</Dialog.Title>
          <Dialog.Description>I wanted this space to show the choices behind the work, not just the finished screens. That’s why the projects have notes, the concepts have tradeoffs, and a smaller version of me keeps you company.</Dialog.Description>
          <p className="ronit-story-signature">Same curiosity. Fewer pixels.<br /><span>Ronit</span></p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    <a href={home ? "#studio-top" : "/studio"} onClick={home ? scrollToStudioTop : undefined} aria-label={home ? "Ronit Amar Bhatia, back to top" : "Ronit Amar Bhatia, back to Studio"}>Ronit Amar Bhatia</a>
  </div>;
}
