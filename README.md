# Ronit Amar Bhatia — Retro OS Portfolio

Interactive portfolio styled as a desktop OS: windows, dock, menu bar, and in-browser “assistant” search over site content.

## Live site

[ronitbhatia.github.io](https://ronitbhatia.github.io/)

## Local development

Requires [Node.js](https://nodejs.org/) (LTS recommended) and npm.

```sh
git clone https://github.com/ronitbhatia/retro-os-portfolio.git
cd retro-os-portfolio
npm install
npm run dev
```

The dev server defaults to port **8080** (see `vite.config.ts`).

### Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start Vite dev server    |
| `npm run build`| Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint               |
| `npm test`     | Run Vitest               |

## Stack

- **Vite** — build tooling
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Radix primitives)
- **React Router**, **Framer Motion**, **TanStack Query**

## Deploy (GitHub Pages)

This repo includes **Deploy to GitHub Pages** (`.github/workflows/deploy-pages.yml`), which builds with `npm run build` and publishes `dist/`.

In the GitHub repo: **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from branch”), so the live site serves the production bundle instead of the dev `index.html` entry.

## License

© Ronit Amar Bhatia. All rights reserved.
