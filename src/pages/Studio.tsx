import { ronitContexts } from "@/components/studio/useRonitContext";
import StudioBrand from "@/components/studio/StudioBrand";
import PersonalTrail from "@/components/studio/PersonalTrail";
import ProjectMarginNote, { ProductLabMarginNote } from "@/components/studio/ProjectMarginNote";
import { scrollToStudioTop } from "@/components/studio/scrollMemory";
import { RonitHello, RonitNote, RonitDiscovery } from "@/components/studio/PixelRonit";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { StudioExperience, StudioInitiatives, StudioEducation } from "@/components/studio/StudioBackground";
import StudioSkills from "@/components/studio/StudioSkills";
import StudioNav from "@/components/studio/StudioNav";
import { projects } from "@/data/projects";
import { productLabCases } from "@/data/productLabCases";
import "@/styles/studio.css";

const selectedProjects = projects.filter((project) => [12, 11, 1].includes(project.id));
const selectedConcepts = productLabCases.slice(0, 3);

export default function Studio() {
  const [showAllProjects, setShowAllProjects] = useState(() => { try { return sessionStorage.getItem("studio-all-projects") === "true"; } catch { return false; } });
  const [showAllIdeas, setShowAllIdeas] = useState(() => { try { return sessionStorage.getItem("studio-all-ideas") === "true"; } catch { return false; } });
  const returnHeading = useRef<string | null>(null);
  useLayoutEffect(() => {
    if (!returnHeading.current) return;
    const heading = document.getElementById(returnHeading.current);
    returnHeading.current = null;
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [showAllProjects, showAllIdeas]);
  useEffect(() => { try { sessionStorage.setItem("studio-all-projects", String(showAllProjects)); sessionStorage.setItem("studio-all-ideas", String(showAllIdeas)); } catch { /* Storage may be disabled. */ } }, [showAllProjects, showAllIdeas]);
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Ronit Amar Bhatia | Engineering × Product";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="studio" id="studio-top" data-scroll-page={window.location.pathname}>
      <a className="studio-skip" href="#studio-main">Skip to content</a>
      <header className="studio-header">
        <StudioBrand home />
        <StudioNav home />
      </header>

      <main id="studio-main" tabIndex={-1}>
        <PersonalTrail />
        <section className="studio-hero" aria-labelledby="studio-heading">
          <div className="studio-eyebrow"><span className="studio-dot" /> Software engineering · AI · Product thinking</div>
          <h1 id="studio-heading">Engineering.<br /><span className="studio-hero-second">With a product <em>mind.</em></span></h1>
          <div className="studio-hero-bottom">
            <div className="studio-hero-intro">
              <p>I’m Ronit, a Forward Deployed Engineer. I help customers get systems into production and build products of my own, from on-device AI to an iOS learning app.</p>
              <div className="studio-hero-actions">
                <a className="studio-button" href="#work">Explore projects <ArrowDown size={17} aria-hidden="true" /></a>
                <a className="studio-button studio-button-outline" href="/studio/resume">View my resume <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
              <div className="studio-hero-links" aria-label="Profiles and contact">
                <a href="https://www.linkedin.com/in/ronit-bhatia/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a href="https://github.com/ronitbhatia" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a className="studio-hero-email" href="mailto:roncy.bhatia@gmail.com">roncy.bhatia@gmail.com ↗</a>
              </div>
            </div>
            <div className="studio-hero-host"><RonitHello /></div>
          </div>
          <aside className="studio-current-role" aria-labelledby="current-role-heading">
            <div><p className="studio-eyebrow"><span className="studio-dot" /> Currently at Y Meadows</p><h2 id="current-role-heading">Forward Deployed Engineer</h2><span className="studio-role-date">Jan 2026 to present</span></div>
            <p>I work with customers to get their systems into production, from onboarding and integrations to the details that make a deployment reliable.</p>
          </aside>
          <div className="studio-hero-footnote"><span>From working systems to what could be.</span><span>Engineering × Product Studio</span></div>
        </section>

        <StudioExperience />

        <section className="studio-section" id="work" aria-labelledby="work-heading">
          <div className="studio-section-heading">
            <div><p className="studio-eyebrow">02 / Projects</p><h2 id="work-heading" tabIndex={-1}>Ideas, in practice.</h2></div>
            <RonitNote pose={ronitContexts.work.pose}>{ronitContexts.work.note}</RonitNote>
          </div>
          <div className="studio-collection-controls"><a className="studio-text-link" href="/studio/work">Browse & filter projects ↗</a><span aria-live="polite">{showAllProjects ? projects.length : selectedProjects.length} of {projects.length} projects</span></div>
          <div className="studio-projects" id="studio-project-collection">
            {(showAllProjects ? projects : selectedProjects).map((project, index) => {
              const [name, subtitle] = project.name.split(": ");
              return (
                <article className="studio-project" key={project.id}>
                  <div className="studio-project-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.status}</span></div>
                  <h3><a href={`/studio/work/${project.id}`}>{name} <span aria-hidden="true">↗</span></a></h3>
                  <p className="studio-project-subtitle">{subtitle}</p>
                  <ProjectMarginNote projectId={project.id} />
                  <div className="studio-tags">{project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <details className="studio-details">
                    <summary>Read project overview <Plus size={17} aria-hidden="true" /></summary>
                    <div className="studio-details-body"><p>{project.description}</p></div>
                  </details>
                  <div className="studio-project-links">
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${name} on GitHub (opens in a new tab)`}>GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>}
                    {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${name}: ${project.demoLabel ?? "Visit project"} (opens in a new tab)`}>{project.demoLabel ?? "Visit project"} <ArrowUpRight size={15} aria-hidden="true" /></a>}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="studio-collection-footer"><button type="button" aria-expanded={showAllProjects} aria-controls="studio-project-collection" onClick={() => { if (showAllProjects) returnHeading.current = "work-heading"; setShowAllProjects(!showAllProjects); }}>{showAllProjects ? "Show selected projects" : `View all ${projects.length} projects`} <ArrowDown size={15} aria-hidden="true" /></button></div>
        </section>

        <section className="studio-section studio-lab" id="lab" aria-labelledby="lab-heading">
          <div className="studio-section-heading">
            <div><p className="studio-eyebrow">03 / Product Lab</p><h2 id="lab-heading" tabIndex={-1}>A little “what if?”</h2></div>
            <RonitNote pose={ronitContexts.lab.pose}>{ronitContexts.lab.note}</RonitNote>
          </div>
          <div className="studio-collection-controls"><a className="studio-text-link" href="/studio/lab">Browse & filter ideas ↗</a><span aria-live="polite">{showAllIdeas ? productLabCases.length : selectedConcepts.length} of {productLabCases.length} ideas</span></div>
          <div className={`studio-lab-grid${showAllIdeas ? " studio-lab-grid-all" : ""}`} id="studio-idea-collection">
            {(showAllIdeas ? productLabCases : selectedConcepts).map(concept => (
              <article className="studio-concept" key={concept.id}>
                <div className="studio-concept-image"><img src={concept.cover.src} alt={concept.cover.caption} loading="lazy" decoding="async" width="960" height="540" /></div>
                <div className="studio-concept-meta"><span>{concept.type === "redesign" ? "Redesign" : "Speculative concept"}</span><span>{concept.period}</span></div>
                <h3><a href={`/studio/lab/${concept.id}`}>{concept.title} <span aria-hidden="true">↗</span></a></h3>
                <p className="studio-concept-subject">{concept.subject}</p>
                <ProductLabMarginNote conceptId={concept.id} />
                <details className="studio-details">
                  <summary>Explore the idea <Plus size={17} aria-hidden="true" /></summary>
                  <div className="studio-details-body"><p>{concept.oneLiner}</p><h4>Tradeoffs</h4><p>{concept.tradeoffs}</p></div>
                </details>
              </article>
            ))}
          </div>
          <div className="studio-collection-footer"><button type="button" aria-expanded={showAllIdeas} aria-controls="studio-idea-collection" onClick={() => { if (showAllIdeas) returnHeading.current = "lab-heading"; setShowAllIdeas(!showAllIdeas); }}>{showAllIdeas ? "Show selected ideas" : `View all ${productLabCases.length} ideas`} <ArrowDown size={15} aria-hidden="true" /></button></div>
        </section>

        <RonitDiscovery />
        <StudioInitiatives />
        <StudioEducation />
        <StudioSkills />

        <section className="studio-about studio-section" id="about" aria-labelledby="about-heading">
          <div className="studio-about-image"><img src="/new-pic.png" alt="Ronit Amar Bhatia" loading="lazy" decoding="async" width="640" height="800" /></div>
          <div className="studio-about-copy">
            <p className="studio-eyebrow">07 / The person behind the work</p>
            <h2 id="about-heading">The bigger picture.<br /><span>The finer details.</span></h2>
            <p>I tend to get interested in the decisions around the code. When should a navigation tool speak up? What makes a flashcard worth keeping? Those questions have shaped my projects as much as the models and frameworks behind them.</p>
            <p>Product Lab is where I give that curiosity a bit more room. Sometimes it leads to a phone redesign. Sometimes I end up wondering what a Bluetooth tracker would look like if Casio made it.</p>
            <a className="studio-text-link" href="/studio/resume">Read my resume <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="studio-contact" id="contact" aria-labelledby="contact-heading">
          <div><RonitNote pose="hello">You’ve met the pixel version. Say hi to the real one.</RonitNote><p className="studio-eyebrow">Have something in mind?</p><h2 id="contact-heading">Let’s make<br /><em>something matter.</em></h2></div>
          <a className="studio-contact-link" href="mailto:roncy.bhatia@gmail.com"><span>Get in touch<span className="studio-email">roncy.bhatia@gmail.com</span></span><ArrowUpRight size={28} aria-hidden="true" /></a>
        </section>
      </main>

      <footer className="studio-footer">
        <span>© {new Date().getFullYear()} Ronit Amar Bhatia</span>
        <div><a href="https://github.com/ronitbhatia" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/ronit-bhatia/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="#studio-top" onClick={scrollToStudioTop}>Back to top ↑</a></div>
      </footer>
    </div>
  );
}
