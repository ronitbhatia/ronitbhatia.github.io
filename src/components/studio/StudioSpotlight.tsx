import { PixelRonit, RonitDiscovery, RonitNote } from "./PixelRonit";
import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, FlaskConical, Search, UserRound, Mail, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchStudio } from "@/data/studioSearch";
import { productLabCases } from "@/data/productLabCases";
import { projects } from "@/data/projects";
import "@/styles/spotlight.css";

const shortcuts = [
  { title: "Work", description: "Experience & roles", url: "/studio#experience", icon: BriefcaseBusiness },
  { title: "Projects", description: "Software & systems", url: "/studio#work", icon: BriefcaseBusiness },
  { title: "Product Lab", description: "Ideas & experiments", url: "/studio/lab", icon: FlaskConical },
  { title: "Extracurricular", description: "Beyond the day job", url: "/studio#initiatives", icon: UserRound },
  { title: "Contact", description: "Start a conversation", url: "/studio#contact", icon: Mail },
];

export default function StudioSpotlight() {
  const location = useLocation();
  return location.pathname === "/" || location.pathname === "/studio" || location.pathname.startsWith("/studio/") ? <Spotlight /> : null;
}

function Spotlight() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [viewport, setViewport] = useState({ bottom: 20, height: window.innerHeight });
  const input = useRef<HTMLInputElement>(null);
  const resultsArea = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();
  const results = useMemo(() => searchStudio(query).slice(0, 12), [query]);
  const choices = query.trim() ? results : shortcuts;
  const selectedIndex = Math.min(active, Math.max(0, choices.length - 1));

  function changeOpen(value: boolean) {
    setOpen(value);
    if (!value) { setQuery(""); setActive(0); }
  }
  function visit(url: string) {
    changeOpen(false);
    if (url.startsWith("/studio")) navigate(url);
    else window.location.assign(url);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(value => !value);
        setQuery(""); setActive(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    changeOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      const vv = window.visualViewport;
      setViewport({ bottom: Math.max(16, vv ? window.innerHeight - vv.height - vv.offsetTop + 16 : 20), height: vv?.height ?? window.innerHeight });
    };
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  useEffect(() => {
    resultsArea.current?.querySelector(`[data-choice="${selectedIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return <Dialog.Root open={open} onOpenChange={changeOpen}>
    <Dialog.Trigger asChild>
      <motion.button ref={trigger} className="spotlight-launcher" layoutId={open ? undefined : "studio-spotlight"} style={{ visibility: open ? "hidden" : "visible" }} aria-label="Open Studio Spotlight" transition={{ duration: reduced ? 0 : .25 }}>
        <PixelRonit pose={location.pathname.includes("/lab") || location.hash === "#lab" ? "explore" : location.pathname.includes("/work") || location.hash === "#work" ? "build" : "hello"} /><span className="spotlight-launcher-label"><Search size={15} aria-hidden="true" /> Find anything</span><kbd>⌘K</kbd>
      </motion.button>
    </Dialog.Trigger>
    <AnimatePresence>
      {open && <Dialog.Portal forceMount>
        <Dialog.Overlay asChild><motion.div className="spotlight-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }} /></Dialog.Overlay>
        <Dialog.Content asChild onOpenAutoFocus={e => { e.preventDefault(); input.current?.focus(); }} onCloseAutoFocus={e => { e.preventDefault(); trigger.current?.focus(); }}>
          <motion.div className="spotlight-panel" layoutId="studio-spotlight" style={{ bottom: viewport.bottom, maxHeight: Math.max(180, viewport.height - 32) }} transition={{ type: "spring", stiffness: 370, damping: 34, duration: reduced ? 0 : undefined }}>
            <div className="spotlight-top"><PixelRonit pose="think" /><div><Dialog.Title>Studio Spotlight</Dialog.Title><Dialog.Description>A shortcut to anything in the Studio.</Dialog.Description></div><Dialog.Close className="spotlight-close" aria-label="Close Studio Spotlight"><X size={18} /></Dialog.Close></div>
            <div className="spotlight-input-wrap"><Search size={20} aria-hidden="true" /><input ref={input} type="text" role="combobox" aria-label="Search the Studio" aria-autocomplete="list" aria-expanded="true" aria-controls="spotlight-choices" aria-activedescendant={choices.length ? `spotlight-choice-${selectedIndex}` : undefined} value={query} onChange={e => { setQuery(e.target.value); setActive(0); }} placeholder="A project, a skill, a question…" onKeyDown={e => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); setActive(current => choices.length ? (current + (e.key === "ArrowDown" ? 1 : -1) + choices.length) % choices.length : 0); }
              if (e.key === "Enter" && choices[selectedIndex]) { e.preventDefault(); visit(choices[selectedIndex].url); }
            }} /></div>
            <div className="spotlight-body" ref={resultsArea}>
              <div className="spotlight-section-label" role="status">{query.trim() ? `${results.length} results` : "Where would you like to go?"}</div>
              <div id="spotlight-choices" role="listbox" aria-label={query.trim() ? "Search results" : "Studio destinations"} className={query.trim() ? "spotlight-results" : "spotlight-shortcuts"}>
                {query.trim() ? results.map((entry, index) => {
                  const concept = productLabCases.find(c => entry.url === `/studio/lab/${c.id}`);
                  const project = projects.find(p => entry.url === `/studio/work/${p.id}`);
                  return <div key={entry.id} id={`spotlight-choice-${index}`} data-choice={index} role="option" aria-selected={selectedIndex === index} className="spotlight-result" onMouseMove={() => setActive(index)} onClick={() => visit(entry.url)}>
                    {concept ? <img src={concept.cover.src} alt="" /> : <span className="spotlight-result-icon" aria-hidden="true">{project ? <BriefcaseBusiness size={19} /> : <Search size={19} />}</span>}
                    <div><span className="spotlight-result-group">{entry.group}</span><strong>{entry.title}</strong><p>{project ? project.stack.slice(0, 4).join(" · ") : entry.description}</p></div><ArrowUpRight size={16} aria-hidden="true" />
                  </div>;
                }) : shortcuts.map((item, index) => <div key={item.title} id={`spotlight-choice-${index}`} data-choice={index} role="option" aria-selected={selectedIndex === index} onMouseMove={() => setActive(index)} onClick={() => visit(item.url)}><item.icon size={20} aria-hidden="true" /><strong>{item.title}</strong><span>{item.description}</span></div>)}
              </div>
              {query.trim() && !results.length && <div className="spotlight-empty"><RonitNote>Nothing found. Try a project name, company, or skill.</RonitNote></div>}
              {!query.trim() && <div className="spotlight-quick-links"><button onClick={() => visit("/studio#education")}>Education ↗</button><button onClick={() => visit("/studio#skills")}>Toolkit ↗</button><button onClick={() => visit("/studio/resume")}>Resume ↗</button></div>}
              {!query.trim() && <RonitDiscovery compact exclude={location.pathname} />}
            </div>
            <div className="spotlight-footer"><span><kbd>↑↓</kbd> navigate <kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>}
    </AnimatePresence>
  </Dialog.Root>;
}
