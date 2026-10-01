import { useEffect, useRef, useState } from "react";

export default function PersonalTrail() {
  const drawing = useRef<SVGSVGElement>(null);
  const [stops, setStops] = useState<{ x: number; y: number }[]>([]);
  useEffect(() => {
    const main = drawing.current?.parentElement;
    if (!main) return;
    const measure = () => {
      const bounds = main.getBoundingClientRect();
      const next = ["experience", "work", "lab", "initiatives", "education"].flatMap(id => {
        const section = main.querySelector<HTMLElement>(`#${id}`);
        const heading = section?.querySelector("h2");
        if (!section || !heading) return [];
        const rect = heading.getBoundingClientRect();
        return [{ x: Math.max(8, section.getBoundingClientRect().left - bounds.left - 24), y: rect.top - bounds.top + rect.height / 2 }];
      });
      setStops(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(main);
    main.querySelectorAll("section").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const path = stops.map((point, index) => index === 0 ? `M ${point.x} ${point.y}` : `C ${point.x - 6} ${stops[index - 1].y + (point.y - stops[index - 1].y) / 3}, ${point.x + 6} ${point.y - (point.y - stops[index - 1].y) / 3}, ${point.x} ${point.y}`).join(" ");
  return <svg ref={drawing} className="personal-trail" aria-hidden="true" focusable="false"><path d={path} fill="none" stroke="#acb49d" strokeWidth="1" strokeDasharray="3 7" />{stops.map((point, index) => <g key={index}><circle cx={point.x} cy={point.y} r="5" fill="#f5f3ec" stroke="#879475" /><circle cx={point.x} cy={point.y} r="1.7" fill={index === 0 ? "#a43b20" : "#879475"} /></g>)}</svg>;
}
