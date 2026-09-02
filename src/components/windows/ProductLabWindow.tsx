import React, { useEffect, useRef, useState } from "react";
import {
  productLabCases,
  type ProductLabCase,
  type ProductLabType,
} from "@/data/productLabCases";

const TYPE_BADGE: Record<ProductLabType, { color: string }> = {
  redesign: { color: "hsl(207 89% 42%)" },
  speculative: { color: "hsl(32 95% 44%)" },
};

function CaseImage({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`product-lab-figure ${className ?? ""}`}>
      <div className="product-lab-image-frame">
        {failed ? (
          <div className="product-lab-image-placeholder" aria-hidden>
            <span>Add image</span>
            <code>{src.split("/").slice(-2).join("/")}</code>
          </div>
        ) : (
          <img src={src} alt={alt} onError={() => setFailed(true)} loading="lazy" />
        )}
      </div>
      {caption && <figcaption className="product-lab-caption">{caption}</figcaption>}
    </figure>
  );
}

const ProductLabWindow: React.FC<ProductLabWindowProps> = ({
  focusEntryId,
  focusToken,
}) => {
  const [filter, setFilter] = useState<"all" | ProductLabType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const visible = productLabCases.filter(
    (c) => filter === "all" || c.type === filter
  );

  useEffect(() => {
    if (!focusEntryId) return;
    const entry = productLabCases.find((c) => c.id === focusEntryId);
    if (!entry) return;

    setFilter("all");
    setExpandedId(entry.id);
    setHighlightedId(entry.id);

    const raf = requestAnimationFrame(() => {
      itemRefs.current[entry.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
    const timeout = window.setTimeout(() => {
      setHighlightedId((current) => (current === entry.id ? null : current));
    }, 1700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [focusEntryId, focusToken]);

  const renderCaseBody = (entry: ProductLabCase) => (
    <div className="product-lab-case-body">
      <section className="product-lab-section product-lab-summary-section">
        <h4>Summary</h4>
        <p>{entry.oneLiner}</p>
      </section>

      <section className="product-lab-section">
        <h4>Problem</h4>
        <p>{entry.problem}</p>
      </section>

      <section className="product-lab-section">
        <h4>Insight</h4>
        <p>{entry.insight}</p>
      </section>

      <div className="product-lab-gallery">
        {entry.gallery.map((img) => (
          <CaseImage
            key={img.src}
            src={img.src}
            alt={img.caption}
            caption={img.caption}
          />
        ))}
      </div>

      <section className="product-lab-section">
        <h4>Principles</h4>
        <ul>
          {entry.principles.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="product-lab-section">
        <h4>Concept</h4>
        <p>{entry.concept}</p>
      </section>

      <section className="product-lab-section">
        <h4>Tradeoffs</h4>
        <p>{entry.tradeoffs}</p>
      </section>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {entry.tags.map((t) => (
          <span key={t} className="mac-tag" style={{ fontSize: "10px" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full product-lab-window">
      <div className="liquid-glass-toolbar flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 liquid-glass-icon"
            aria-hidden
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <span
              className="text-sm font-semibold block truncate"
              style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
            >
              Product Lab
            </span>
            <span
              className="text-[10px] block truncate"
              style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))" }}
            >
              Archive of product thinking: redesigns and speculative concepts
            </span>
          </div>
        </div>

        <div className="mac-segmented-control flex-shrink-0" role="tablist" aria-label="Filter cases">
          {(
            [
              ["all", "All"],
              ["redesign", "Redesign"],
              ["speculative", "Speculative"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={filter === id}
              className={`mac-segmented-control-item ${filter === id ? "mac-segmented-control-item-active" : ""}`}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mac-scroll p-6 mac-stripe-bg">
        <h2
          className="window-section-label text-xs font-bold uppercase tracking-widest mb-2"
          style={{ fontFamily: "var(--font-mono)", opacity: 1 }}
        >
          Case Studies
        </h2>
        <p
          className="text-xs mb-5"
          style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))", opacity: 0.7 }}
        >
          Eight case studies: two redesigns and six speculative concepts. Each follows the same
          structure: summary, problem, insight, principles, concept, and tradeoffs.
        </p>

        <div className="product-lab-grid">
          {visible.map((entry) => {
            const isExpanded = expandedId === entry.id;
            return (
              <div
                key={entry.id}
                ref={(node) => {
                  itemRefs.current[entry.id] = node;
                }}
                className="product-lab-card window-card-bg"
                style={{
                  borderColor:
                    highlightedId === entry.id
                      ? "hsl(var(--mac-blue))"
                      : "hsl(var(--mac-border))",
                  boxShadow:
                    highlightedId === entry.id
                      ? "0 0 0 2px hsl(var(--mac-blue) / 0.35), 0 8px 24px rgba(0,0,0,0.12)"
                      : undefined,
                }}
              >
                <button
                  type="button"
                  className="product-lab-card-preview"
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                  aria-expanded={isExpanded}
                >
                  <CaseImage
                    src={entry.cover.src}
                    alt=""
                    className="product-lab-card-thumb"
                  />
                  <div className="product-lab-card-meta">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span
                        className="product-lab-type-badge"
                        style={{
                          background: `color-mix(in hsl, ${TYPE_BADGE[entry.type].color} 16%, transparent)`,
                          borderColor: `color-mix(in hsl, ${TYPE_BADGE[entry.type].color} 40%, transparent)`,
                          color: TYPE_BADGE[entry.type].color,
                        }}
                      >
                        {entry.type === "redesign" ? "Redesign" : "Speculative"}
                      </span>
                      <span className="product-lab-period">{entry.period}</span>
                    </div>
                    <h3 className="product-lab-card-title">{entry.title}</h3>
                    <p className="product-lab-card-subject">{entry.subject}</p>
                    <p className="product-lab-card-blurb">{entry.oneLiner}</p>
                    <span className="product-lab-open-hint">
                      {isExpanded ? "Close case ↑" : "Open case →"}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="product-lab-expanded border-t" style={{ borderColor: "hsl(var(--mac-border))" }}>
                    {renderCaseBody(entry)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductLabWindow;
