import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Play, X } from "lucide-react";
import { projectFilms } from "@/data/projectFilms";

// Shared across cards so previews and full films never compete for playback.
const stopEvent = "studio-film-stop";
export default function ProjectFilmPreview({ id, title }: { id: number; title: string }) {
  const [open, setOpen] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const preview = useRef<HTMLVideoElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const trigger = useRef<HTMLButtonElement>(null);
  const film = projectFilms[id];
  const base = film ? `${import.meta.env.BASE_URL}project-films/${film.file}` : "";
  const startAt = id === 13 ? 5 : id === 11 ? 4 : 7;

  useEffect(() => {
    const stop = () => {
      clearTimeout(timer.current);
      preview.current?.pause();
      setPreviewing(false);
    };
    const visibility = () => { if (document.hidden) stop(); };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) stop();
    }) : null;
    if (trigger.current) observer?.observe(trigger.current);
    window.addEventListener(stopEvent, stop);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", stop);
    return () => {
      clearTimeout(timer.current);
      observer?.disconnect();
      window.removeEventListener(stopEvent, stop);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", stop);
    };
  }, []);
  if (!film) return null;
  const stop = () => {
    clearTimeout(timer.current);
    preview.current?.pause();
    setPreviewing(false);
  };
  const hover = () => {
    if (open || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    window.dispatchEvent(new Event(stopEvent));
    timer.current = setTimeout(() => setPreviewing(true), 450);
  };
  return <Dialog.Root open={open} onOpenChange={next => {
    window.dispatchEvent(new Event(stopEvent));
    setOpen(next);
  }}>
    <Dialog.Trigger asChild><button ref={trigger} className="studio-film-preview" type="button"
      aria-label={`Watch ${title} film, ${film.seconds} seconds`} onPointerEnter={hover} onPointerLeave={stop} onBlur={stop}>
      <span className="studio-preview-picture">
        <img src={`${base}.webp`} alt="" aria-hidden="true" width={960} height={540} loading="lazy" />
        {previewing && <video ref={preview} src={`${base}.mp4`} muted playsInline autoPlay preload="none" aria-hidden="true"
          onLoadedMetadata={event => { event.currentTarget.currentTime = startAt; }}
          onTimeUpdate={event => { if (event.currentTarget.currentTime >= startAt + 3.5) stop(); }} onError={stop} />}
        <span className="studio-preview-play" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
      </span>
      <span className="studio-preview-caption"><span>Watch the idea</span><span>{film.seconds} sec <span aria-hidden="true">↗</span></span></span>
    </button></Dialog.Trigger>
    <Dialog.Portal><Dialog.Overlay className="studio-viewer-overlay" />
      <Dialog.Content className="studio-film-dialog" onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus({ preventScroll: true }); }}>
        <div className="studio-film-dialog-heading"><div><Dialog.Title>{title}</Dialog.Title><Dialog.Description>Narrated film · {film.seconds} seconds · Illustrated explainer</Dialog.Description></div><Dialog.Close aria-label="Close project film"><X /></Dialog.Close></div>
        <video src={`${base}.mp4`} poster={`${base}.webp`} controls autoPlay playsInline preload="none" aria-label={`${title} film`} />
        <details><summary>Read the transcript</summary><p>{film.transcript.join(" ")}</p></details>
        <a href={`/studio/work/${id}`}>Explore the project <span aria-hidden="true">↗</span></a>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
