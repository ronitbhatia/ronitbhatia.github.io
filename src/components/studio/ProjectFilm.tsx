import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { projectFilms } from "@/data/projectFilms";

export default function ProjectFilm({ id, title }: { id: number; title: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const film = projectFilms[id];
  if (!film) return null;
  const base = `${import.meta.env.BASE_URL}project-films/${film.file}`;
  const play = async () => {
    if (!video.current) return;
    try {
      await video.current.play();
      video.current?.focus();
    } catch {
      setFailed(true);
    }
  };
  return <section className="studio-project-film" aria-label="Project film">
    <div className="studio-film-heading"><h2>Watch the idea</h2><span className="studio-film-meta">Narrated film · {film.seconds}s</span></div>
    <div className="studio-film-frame">
      <video ref={video} controls={started} playsInline preload="none" tabIndex={started ? 0 : -1}
        width={960} height={540} aria-label={`Watch the idea: ${title}`}
        src={`${base}.mp4`} poster={`${base}.webp`} onPlay={() => { setStarted(true); setFailed(false); }}
        onError={() => setFailed(true)} onEnded={e => {
          e.currentTarget.load();
          setStarted(false);
          requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
        }}>
        <a href={`${base}.mp4`}>Open the project film</a>
      </video>
      {!started && <button ref={trigger} className="studio-film-cover" onClick={play}
        aria-label={`Play ${title} film`}><span><Play size={16} aria-hidden="true" fill="currentColor" />Play film</span></button>}
    </div>
    {failed && <p role="status">Playback unavailable. <a href={`${base}.mp4`}>Open the MP4 directly</a>.</p>}
    <div className="studio-film-footer"><details><summary>Read the transcript</summary><p>{film.transcript.join(" ")}</p></details>
      <span>Illustrated explainer</span></div>
  </section>;
}
