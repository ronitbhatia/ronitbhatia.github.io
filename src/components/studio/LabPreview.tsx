import { useEffect, useLayoutEffect, useId, useRef, useState } from "react";
import { ArrowRight, Bike, BusFront, RotateCcw, X } from "lucide-react";
import type { ProductLabCase } from "@/data/productLabCases";
import "./labPreview.css";

interface Step {
  caption: string;
  image?: number;
  actions?: [string, number][];
}
interface Scene {
  title: string;
  steps: Step[];
  slider?: string;
}
const scenes: Record<string, Scene> = {
  "blackberry-keyline": {
    title: "See which messages light up Keyline",
    steps: [
      { caption: "Whose message should get through?", actions: [["Team chat", 1], ["Priority contact", 2]] },
      { caption: "Team chat delivered silently. The display stays asleep.", actions: [["Team chat", 1], ["Priority contact", 2]] },
      { caption: "Priority contact. Two red pulses, screen still asleep.", actions: [["Team chat", 1], ["Priority contact", 2]] },
    ],
  },
  "ipod-transport": {
    title: "Play music without a connection",
    steps: [
      { caption: "The player is offline. Your downloaded albums are still available.", image: 1, actions: [["Open downloads", 1]] },
      { caption: "Choose an album from the local library.", image: 3, actions: [["Play album", 2]] },
      { caption: "Playback continues with the screen locked.", image: 4, actions: [["Back to library", 1]] },
    ],
  },
  "iphone-air-monocoque": {
    title: "See where the battery fits", slider: "Cutaway",
    steps: [
      { caption: "Exterior · flush camera window", image: 4 },
      { caption: "Perimeter · the proposed battery follows the frame", image: 1 },
      { caption: "Interior · the camera occupies the freed space", image: 2 },
    ],
  },
  "casio-dist-finder": {
    title: "Try the tracker’s three displays",
    steps: [
      { caption: "Distance mode. The LCD gives an estimated range.", image: 2, actions: [["Switch to proximity", 1]] },
      { caption: "Proximity mode. The chevrons give a quick warmer-or-colder cue.", image: 2, actions: [["Switch to clock", 2]] },
      { caption: "Clock mode. The same display tells the time between searches.", image: 2, actions: [["Switch to distance", 0]] },
    ],
  },
  "hermes-ecoute": {
    title: "Fold the headset for travel",
    steps: [
      { caption: "The ear cups rotate flat for travel.", actions: [["Fold flat", 1]] },
      { caption: "With both cups flat, the headset fits into its pouch.", image: 1, actions: [["Slip into pouch", 2]] },
      { caption: "Packed for travel with the headband within reach.", image: 3, actions: [["Unpack", 1]] },
    ],
  },
  "charge-for-life": {
    title: "Find the cable inside the bezel",
    steps: [
      { caption: "Cable stowed beneath the fluted bezel.", actions: [["Open bezel", 1]] },
      { caption: "Cable bay open. The coiled lead is within reach.", image: 1, actions: [["Wind it back", 0]] },
    ],
  },
  "rhode-frame": {
    title: "Compare three looks on one portrait", slider: "Look",
    steps: ["Neutral", "Soft warmth", "Cool daylight"].map(caption => ({ caption, image: 1 })),
  },
  "fitbit-focus-monitor": {
    title: "Try a focus session and a break",
    steps: [
      { caption: "Start a 25-minute session at your desk.", actions: [["Start focus", 1]] },
      { caption: "Notifications are paused while you work.", actions: [["Skip to break", 2]] },
      { caption: "The session is over. Take a break or keep working.", actions: [["Take break", 3], ["Snooze 5 min", 4]] },
      { caption: "Step away for a short break.", actions: [["Back to desk", 0]] },
      { caption: "Your next break reminder is five minutes away.", actions: [["End session", 0]] },
    ],
  },
  "trend-mill": {
    title: "Choose a route and start running",
    steps: [
      { caption: "Choose a sample route.", actions: [["Cherry blossoms", 1], ["Riverside", 2]] },
      { caption: "Cherry blossom route ready.", image: 1, actions: [["Start run", 3]] },
      { caption: "Riverside route ready.", image: 1, actions: [["Start run", 4]] },
      { caption: "Running the cherry blossom route.", image: 2, actions: [["Choose route", 0]] },
      { caption: "Running the riverside route.", image: 2, actions: [["Choose route", 0]] },
    ],
  },
  "glyph-home": {
    title: "Watch how Glyph answers",
    steps: [
      { caption: "Watch the face as you ask for a five-minute timer.", image: 2, actions: [["Set five-minute timer", 1]] },
      { caption: "Listening to your request.", image: 2 },
      { caption: "Processing the timer request.", image: 2 },
      { caption: "The check mark confirms your timer is set.", image: 2, actions: [["Try again", 1]] },
    ],
  },
  "commons-map": {
    title: "Find a step-free entrance on the map",
    steps: [
      { caption: "Explore a sample neighbourhood.", actions: [["Show step-free access", 1]] },
      { caption: "Step-free layer on. Inspect the entrance pin.", image: 3, actions: [["Inspect pin", 2]] },
      { caption: "Sample record · East entrance · Community survey · Checked 12 Oct 2026.", image: 2, actions: [["Back to map", 1]] },
    ],
  },
  "still-waiting": {
    title: "See when to return to the clinic",
    steps: [
      { caption: "Sample queue · waiting for a room.", image: 2, actions: [["Step outside", 1]] },
      { caption: "Estimated wait 12 to 20 min. Stay within a 3-minute walk.", image: 2, actions: [["Advance scenario", 2]] },
      { caption: "Time to head back. Your room is being prepared.", image: 3, actions: [["Return to clinic", 0]] },
    ],
  },
  "the-last-phone": {
    title: "Bring the phone back with a fresh battery",
    steps: [
      { caption: "A worn battery. A phone worth keeping.", actions: [["Release back", 1]] },
      { caption: "Back open. Remove the worn cell.", image: 1, actions: [["Slide battery out", 2]] },
      { caption: "Battery removed. Fit a replacement.", image: 1, actions: [["Fit fresh battery", 3]] },
      { caption: "Power restored to the same phone.", image: 3, actions: [["Start again", 0]] },
    ],
  },
  "select-all-buses": {
    title: "Compare a puzzle with a passkey",
    steps: [
      { caption: "Choose a sample verification path.", actions: [["Picture puzzle", 1], ["Passkey", 2], ["Accessible option", 3]] },
      { caption: "Select the bus, then confirm.", image: 1, actions: [["Bus", 4], ["Bicycle", 5]] },
      { caption: "Sample passkey prompt ready.", image: 2, actions: [["Confirm passkey", 6]] },
      { caption: "Text alternative · type the displayed word.", image: 3 },
      { caption: "Bus selected.", image: 1, actions: [["Confirm selection", 6]] },
      { caption: "That is a bicycle. Choose the bus.", image: 1, actions: [["Bus", 4], ["Bicycle", 5]] },
      { caption: "Check-in complete.", image: 2, actions: [["Try another path", 0]] },
    ],
  },
};

function Indicator({ id, step }: { id: string; step: number }) {
  if (id === "trend-mill" && step) {
    const path = step % 2 ? "M8 46 Q22 6 47 22 T92 9" : "M8 46 Q34 40 42 17 T92 35";
    return <svg className="lp-route" viewBox="0 0 100 56" aria-hidden="true"><path d={path} pathLength="1" />
      {step > 2 && <circle r="3"><animateMotion path={path} dur="3s" fill="freeze" /></circle>}</svg>;
  }
  if (id === "commons-map" && step === 1) return <span className="lp-pin" aria-hidden="true" />;
  if (id === "blackberry-keyline" && step === 2) return <span className="lp-led" aria-hidden="true" />;
  return null;
}

export default function LabPreview({ concept }: { concept: ProductLabCase }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [revision, setRevision] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const launcher = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  const panel = useId();
  const scene = scenes[concept.id];
  const wasOpen = useRef(false);
  useLayoutEffect(() => {
    if (open) close.current?.focus({ preventScroll: true });
    else if (wasOpen.current) launcher.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open || concept.id !== "glyph-home" || (step !== 1 && step !== 2)) return;
    const timer = window.setTimeout(() => setStep(step + 1), 1400);
    return () => window.clearTimeout(timer);
  }, [concept.id, open, step]);

  if (!scene) return <div className="studio-concept-image"><img src={concept.cover.src} alt={concept.cover.caption} loading="lazy" /></div>;
  const current = scene.steps[step];
  const image = open && current.image ? concept.gallery[current.image - 1] : concept.cover;
  function move(next: number) {
    setStep(next);
    setRevision(value => value + 1);
    setFeedback("");
    setAnswer("");
  }
  function dismiss() {
    setOpen(false);
    move(0);
  }
  return <div className="lab-preview" data-case={concept.id} data-step={step} data-active={open}
    onKeyDown={event => { if (open && event.key === "Escape") { event.stopPropagation(); dismiss(); } }}>
    <div className="lp-stage">
      <img className="lp-art" key={image.src} src={image.src} alt={open && (concept.id === "glyph-home" || concept.id === "casio-dist-finder") ? current.caption : image.caption} loading="lazy" decoding="async" />
      {open && concept.id === "fitbit-focus-monitor" && step > 0 &&
        <div className="lp-focus-screen" aria-hidden="true">
          <span>{["", "Focus session", "Session complete", "Break time", "Reminder snoozed"][step]}</span>
          <strong>{["", "25:00", "Time to stretch", "05:00", "+5 min"][step]}</strong>
        </div>}
      {open && current.actions?.length === 1 && <button type="button" className="lp-object" tabIndex={-1} aria-label={current.actions[0][0] + " on product"} onClick={() => move(current.actions![0][1])} />}
      {open && concept.id !== "trend-mill" && <Indicator key={revision} id={concept.id} step={step} />}
      {open && scene.slider && <input className="lp-scrub" tabIndex={-1} type="range" aria-label={scene.slider + ' on product'} min={0} max={scene.steps.length - 1} value={step} aria-valuetext={current.caption} onChange={e => move(Number(e.target.value))} />}
      {open && concept.id === "commons-map" && step === 1 && <button className="lp-map-target" aria-label="Inspect entrance pin" onClick={() => move(2)} />}
    </div>
    <div className="lp-toolbar">
      {open && <span className="lp-title">{scene.title}</span>}
      {!open && <button className="lp-launch" ref={launcher} aria-label={scene.title + ' · ' + concept.title} aria-expanded={false} aria-controls={panel} onClick={() => setOpen(true)}>
        <span>{scene.title}</span><ArrowRight size={16} /></button>}
      {open && <button ref={close} className="lp-close" aria-label={'Close ' + concept.title + ' preview'} onClick={dismiss}><X size={15} /></button>}
    </div>
    {open && <div className="lp-panel" id={panel}>
      <div className="lp-status">{concept.id === "trend-mill" && <Indicator id={concept.id} step={step} />}<p role="status">{feedback || current.caption}</p><button aria-label={'Restart ' + concept.title + ' preview'} onClick={() => move(0)}><RotateCcw size={15} /></button></div>
      {scene.slider && <label className="lp-range">{scene.slider}<input type="range" min={0} max={scene.steps.length - 1} value={step} aria-valuetext={current.caption} onChange={e => move(Number(e.target.value))} /></label>}
      {current.actions && <div className="lp-actions">{current.actions.map(([label, next], i) => <button key={i} onClick={() => move(next)}>{concept.id === "select-all-buses" && label === "Bus" && <BusFront size={23} aria-hidden="true" />}
        {concept.id === "select-all-buses" && label === "Bicycle" && <Bike size={23} aria-hidden="true" />}{label}</button>)}</div>}
      {concept.id === "select-all-buses" && step === 3 && <form className="lp-answer" onSubmit={e => { e.preventDefault(); if (answer.trim().toLowerCase() === "bus") move(6); else setFeedback("Try again. Enter the word bus."); }}>
        <label>Enter “bus” <input value={answer} onChange={e => setAnswer(e.target.value)} /></label><button>Confirm</button></form>}
    </div>}
  </div>;
}
