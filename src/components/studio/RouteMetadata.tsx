import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getStudioMetadata } from "@/data/studioMetadata";

export default function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const metadata = getStudioMetadata(pathname);
    function set(selector: string, value: string) { document.querySelector(selector)?.setAttribute("content", value); }
    set('meta[name="description"]', metadata.description);
    set('meta[name="robots"]', metadata.noindex ? "noindex,follow" : "index,follow");
    for (const prefix of ["og", "twitter"]) {
      const key = prefix === "og" ? "property" : "name";
      for (const field of ["title", "description", "image"] as const) set(`meta[${key}="${prefix}:${field}"]`, metadata[field]);
    }
    set('meta[property="og:url"]', metadata.canonical);
    set('meta[property="og:image:alt"]', metadata.imageAlt);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", metadata.canonical);
  }, [pathname]);
  return null;
}
