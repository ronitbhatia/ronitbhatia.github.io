const destinations = [
  ["Work", "experience"],
  ["Projects", "work"],
  ["Product Lab", "lab"],
  ["Extracurricular", "initiatives"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

export default function StudioNav({ home = false }: { home?: boolean }) {
  return <nav className="studio-nav" aria-label="Studio navigation">{destinations.map(([label, id]) => <a key={id} href={`${home ? "" : "/studio"}#${id}`}>{label}</a>)}</nav>;
}
