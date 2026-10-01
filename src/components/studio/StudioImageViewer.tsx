import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";

type Image = { src: string; caption: string };
export default function StudioImageViewer({ images, title, children }: { images: Image[]; title: string; children: (open: (index: number, trigger: HTMLButtonElement) => void) => React.ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const image = index === null ? null : images[index];
  function move(direction: number) { setIndex(current => current === null ? null : (current + direction + images.length) % images.length); }
  return <Dialog.Root open={index !== null} onOpenChange={open => { if (!open) setIndex(null); }}>
    {children((next, button) => { trigger.current = button; setIndex(next); })}
    <Dialog.Portal><Dialog.Overlay className="studio-viewer-overlay" /><Dialog.Content className="studio-image-viewer" onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus(); }} onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); event.stopPropagation(); }
    }}>
      <div className="studio-viewer-top"><Dialog.Title>{title}</Dialog.Title><Dialog.Close aria-label="Close image viewer"><X aria-hidden="true" /></Dialog.Close></div>
      {image && <img className="studio-viewer-image" src={image.src} alt={image.caption} />}
      <div className="studio-viewer-bottom"><div aria-live="polite" aria-atomic="true"><span className="studio-viewer-count">{(index ?? 0) + 1} / {images.length}</span><Dialog.Description>{image?.caption}</Dialog.Description></div><div className="studio-viewer-controls"><button onClick={() => move(-1)} aria-label="Previous image" disabled={images.length < 2}><ArrowLeft aria-hidden="true" /></button><button onClick={() => move(1)} aria-label="Next image" disabled={images.length < 2}><ArrowRight aria-hidden="true" /></button></div></div>
    </Dialog.Content></Dialog.Portal>
  </Dialog.Root>;
}

export function ImageButton({ image, onClick, lazy = false }: { image: Image; onClick: (button: HTMLButtonElement) => void; lazy?: boolean }) {
  return <button type="button" className="studio-image-button" onClick={event => onClick(event.currentTarget)} aria-label={`Open full-size image: ${image.caption}`}><img src={image.src} alt={image.caption} loading={lazy ? "lazy" : undefined} /><span className="studio-image-expand" aria-hidden="true"><Expand size={18} /></span></button>;
}
