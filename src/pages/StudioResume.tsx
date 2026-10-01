import { useEffect, useState } from "react";
import { ArrowLeft, Download, ZoomIn, ZoomOut } from "lucide-react";
import preview from "@/data/resumePreview.json";
import "@/styles/studio.css";

export default function StudioResume() {
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    const previous = document.title;
    document.title = "Resume | Ronit Amar Bhatia";
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="studio studio-resume" data-scroll-page={window.location.pathname}>
      <main className="studio-resume-main">
        <a className="studio-text-link" href="/studio#about"><ArrowLeft size={16} aria-hidden="true" /> Back to Studio</a>
        <div className="studio-resume-heading">
          <div><p className="studio-eyebrow">Ronit Amar Bhatia</p><h1>Resume</h1></div>
          <a className="studio-button" href="/resume.pdf" download="Ronit-Amar-Bhatia-Resume.pdf">Download PDF <Download size={17} aria-hidden="true" /></a>
        </div>
        <div className="studio-resume-toolbar">
          <span>{preview.pages.length} {preview.pages.length === 1 ? "page" : "pages"}</span>
          <button type="button" onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed}>
            {zoomed ? <ZoomOut size={17} aria-hidden="true" /> : <ZoomIn size={17} aria-hidden="true" />}
            {zoomed ? "Fit to width" : "Zoom in"}
          </button>
        </div>
        <div className="studio-resume-pages" role="region" aria-label="Resume pages, scroll horizontally when zoomed" tabIndex={0}>
          {preview.pages.map((page, index) => <img className={zoomed ? "is-zoomed" : ""} key={page.image} src={page.image} alt={`Resume page ${index + 1}. A selectable text version follows below.`} />)}
        </div>
        <details className="studio-details studio-resume-text">
          <summary>Read as selectable text</summary>
          {preview.pages.map((page) => <pre key={page.image}>{page.text}</pre>)}
        </details>
      </main>
    </div>
  );
}
