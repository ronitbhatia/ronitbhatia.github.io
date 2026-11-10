# Ronit Amar Bhatia | Engineering × Product Studio

A personal portfolio for engineering experience, software projects, product ideas, education, and skills. Pixel Ronit hosts the Studio, with Spotlight search, project discovery, a full-screen image viewer, and a browser-safe resume.

## Development

Use Node.js 20 or newer and npm.

```sh
npm ci
npm run dev
```

The local server uses port 8080. Studio is the homepage at `/`; `/studio` remains a compatible alias. The former desktop interface has been removed entirely.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run verify:build
```

To inspect the production build without a development fallback:

```sh
python3 -m http.server 8081 --bind 127.0.0.1 --directory dist
```

## Stack

React, TypeScript, Vite, React Router, Framer Motion, Radix Dialog, Lucide icons, and Tailwind's CSS foundation. Studio styling lives in `src/styles`. Content and search live in `src/data`.

## Project films

The 13 project pages play self-hosted H.264 MP4s with AAC narration and an original instrumental backing track, burned-in captions, WebP posters, and a text transcript. Assets live in `public/project-films/`; titles, durations, and transcripts are maintained in `src/data/projectFilms.ts`. The browser fetches the video on play. No video hosting account, backend, or model download is required for visitors.

The Syro and VoyageLog openings were generated with Wan 2.1. The project explanations use locally animated illustrations; FFmpeg encodes the final media. The narration uses the [Piper LJSpeech voice](https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US/ljspeech/medium).

## Deployment

The GitHub Pages workflow validates the code and production artifacts before publishing `dist/`. It targets a root-domain site at `https://ronitbhatia.github.io/`. GitHub Pages must use **GitHub Actions** as its source. Pushing to main triggers deployment.

See [launch acceptance](docs/LAUNCH-CHECKLIST.md) for review steps. Resume regeneration instructions are in `scripts/render-resume.py`; character provenance is in `public/pixel-ronit/README.md`.

© Ronit Amar Bhatia. All rights reserved.
