# Studio launch acceptance

Phase 4 is implemented locally. Nothing has been committed, pushed, or published by this phase.

## Routes
- `/`: Studio homepage.
- `/studio`: preserved homepage alias, canonicalized to `/`.
- `/studio/work`, `/studio/lab`: full collections and existing detail routes.
- `/studio/resume`: browser-safe resume viewer and original PDF download.
- `/desktop`: removed; resolves to the not-found page. No legacy UI or bundle is retained.
- Unknown routes: Studio-themed 404 with noindex metadata.

## Review locally
Use the production preview at http://127.0.0.1:8081/ while its local server is running. To restart it: `python3 -m http.server 8081 --bind 127.0.0.1 --directory dist`.

1. Check the homepage at desktop and phone widths, including Work versus Projects, hero links, and the section order.
2. Use Tab, Enter, Cmd/Ctrl+K, arrow keys, and Escape to navigate Spotlight and the image viewer.
3. Open a Product Lab detail directly, refresh, view images, and copy its link.
4. Check resume legibility and download on your own browser/device. Mobile virtual-keyboard behavior and OS reduced-motion preferences merit a final real-device check.
5. Verify that no RonitOS links remain.

## Reproducible checks
`npm run typecheck && npm run lint && npm test && npm run build && npm run verify:build`

The build emits 31 HTML documents including 404, page-specific title/description/social metadata, canonical URLs, sitemap.xml, and .nojekyll. Known detail routes can be refreshed on a static host. The local Python server does not emulate GitHub Pages' custom 404 handling; that fallback document is checked as an artifact. Content remains client-rendered; social metadata is available in HTML without JavaScript.

Performance: the main application chunk is about 191 kB (65 kB gzip), with separate React and animation runtime chunks. The original desktop interface, its dependencies, and its bundle have been removed. These figures are chunk sizes, not a Lighthouse score or the total page download. All JavaScript chunks are under 500 kB. Original image assets are retained and below-fold content uses existing lazy loading.

## Publication requirements
The configured public URL is `https://ronitbhatia.github.io`, matching the `githubio` remote. This build assumes a root-domain deployment, not a repository subpath. In the deployment repository, GitHub Pages must use **GitHub Actions** as its source. The workflow now runs typecheck, lint, tests, build and production artifact validation before upload/deployment. Live repository settings have not been inspected or changed. A push to main triggers deployment, so publication remains a separate user decision.

Known non-blocking warnings: React Router future-flag notices in tests and an outdated Browserslist dataset. Lint now passes without warnings. The former large-chunk warning is resolved.
