import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getStudioMetadata, siteOrigin, studioStaticRoutes } from "./src/data/studioMetadata";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), {
    name: "studio-static-routes",
    apply: "build",
    closeBundle() {
      const output = path.resolve(__dirname, "dist");
      const html = readFileSync(path.join(output, "index.html"), "utf8");
      const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      function pageHtml(route: string) {
        const meta = getStudioMetadata(route);
        let result = html.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`);
        const fields = { description: meta.description, robots: meta.noindex ? "noindex,follow" : "index,follow", "og:title": meta.title, "og:description": meta.description, "og:url": meta.canonical, "og:image": meta.image, "og:image:alt": meta.imageAlt, "twitter:title": meta.title, "twitter:description": meta.description, "twitter:image": meta.image };
        for (const [key, value] of Object.entries(fields)) result = result.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*("[^>]*>)`), `$1${escape(value)}$2`);
        return result.replace(/(<link rel="canonical" href=")[^"]*("[^>]*>)/, `$1${escape(meta.canonical)}$2`);
      }
      for (const route of studioStaticRoutes) {
        const directory = path.join(output, route.slice(1));
        mkdirSync(directory, { recursive: true });
        writeFileSync(path.join(directory, "index.html"), pageHtml(route));
      }
      writeFileSync(path.join(output, "404.html"), pageHtml("/not-found"));
      const indexed = studioStaticRoutes.filter(route => route !== "/studio" && !getStudioMetadata(route).noindex);
      writeFileSync(path.join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexed.map(route => `<url><loc>${siteOrigin}${route}</loc></url>`).join("")}</urlset>`);
      writeFileSync(path.join(output, ".nojekyll"), "");
    },
  }],
  build: {
    rollupOptions: { output: { manualChunks(id) {
      if (id.includes("/node_modules/framer-motion/") || id.includes("/node_modules/motion-")) return "motion";
      if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react-runtime";
    } } },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
