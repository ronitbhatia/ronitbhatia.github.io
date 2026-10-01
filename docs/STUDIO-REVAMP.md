# Engineering × Product Studio

## Agreement

Reuse existing content, photography, Product Lab images, resume, and links. No new demos, recordings, diagrams, or writing assignments for the owner. Work in phases. After each phase, run appropriate checks, provide a local preview and test checklist, and wait for the owner's feedback before beginning the next phase. Nothing is published automatically.

Writing preference: do not use em dashes in Studio copy.

## Phase 1: Visual foundation and homepage

- Add a reviewable `/studio` route; retain the current `/` desktop during review.
- Establish warm paper, ink, orange accents, editorial typography, and responsive navigation.
- Show three existing software projects and three existing Product Lab concepts with expandable original descriptions.
- Include an About introduction, existing portrait, resume, and direct contact links.
- Extract software project data so the desktop and Studio share the same source.
- Fix pre-existing type/lint errors needed for useful validation gates.
- Check production build, TypeScript, lint, meaningful component tests, desktop/mobile browser layouts, and existing desktop availability.
- Owner review: visual direction, readability, navigation, mobile experience. Stop here until feedback.

## Phase 2: Complete Work and Lab collections

- Migrate all software projects and all Product Lab concepts using existing data.
- Add collection filtering and shareable detail pages with original text, images, and links.
- Resolve static-host routing and direct-link behavior before publishing.
- Verify content parity, filtering, links, images, keyboard navigation, and mobile detail layouts.
- Pause for owner testing.

## Phase 3: Background and discovery

- Give work experience a dedicated homepage section between Product Lab and About, with a direct Experience navigation link. Show roles, companies, dates, and existing achievement details in reverse chronological order.
- Migrate education, initiatives, and skills into shared data and readable background layouts.
- Adapt existing search to Studio destinations.
- Verify search results, content parity, navigation, and contact/resume behavior.
- Pause for owner testing.

## Phase 4: Launch readiness

- Review accessibility, reduced motion, responsive layouts, metadata, performance, and all local assets/links.
- Make Studio the main route after the previous phases have been accepted; determine whether to retain the legacy desktop.
- Check production navigation/refresh and the GitHub Pages deployment setup.
- Provide a final local acceptance preview before any publication.

## Phase 1 boundary

The homepage is a direction preview, not the completed migration. Full collections, background sections, Studio search, and launch metadata are deferred to their phases. The preview uses a light-only palette pending visual feedback.

## Phase 1 validation

- Production build passed. Existing bundle-size and Browserslist freshness warnings remain.
- TypeScript passed (`tsc --noEmit -p tsconfig.app.json`).
- ESLint: zero errors, nine existing warnings.
- Vitest: six tests passed (five new Studio checks plus the existing placeholder).
- Browser: project expansion, keyboard concept expansion, images, internal destinations, and no console errors checked. Width checks at 1440, 390, and 320 pixels showed no horizontal overflow.
- Original desktop loads and its Projects window still displays all 12 projects from the shared data.
- Local preview: http://127.0.0.1:8080/studio
- Status: awaiting owner review; phase 2 has not started.

## Phase 1 review revisions

- Highlighted the current Forward Deployed Engineer role at Y Meadows immediately below the introduction. Full experience remains scheduled for phase 3.
- Replaced the direct PDF viewer link with `/studio/resume`: rendered pages, zoom, selectable text, and a PDF download. The in-app browser showed a blank native PDF viewer despite HTTP 200.
- The original PDF is unchanged. After updating it, run `python3 scripts/render-resume.py` (requires Poppler) to refresh images and extracted text. A test checks the PDF fingerprint to prevent stale previews.
- Removed em dashes from Studio copy and rewrote the About introduction during owner review.

- Owner requested complete collection access during phase-one review. Added independent View all / Show selected controls for all 12 projects and 12 Product Lab ideas, with counts and responsive grids. Shareable detail pages and filtering remain deferred.

## Phases 2 and 3 delivered for review

The owner requested phase 3 while phase 2 was in progress, authorizing continuation through both phases. Phase 4 remains paused.

Phase 2: complete `/studio/work` and `/studio/lab` collections with URL-based filters and text search; shareable pages for all 12 projects and 12 concepts; original project details, concept narratives, tradeoffs, and all gallery assets. Homepage cards link to detail pages.

Static hosting: Vite emits index documents for all 29 Studio routes and a 404 fallback. Direct navigation and refresh were checked with a plain local static server, without Vite fallback. Existing root deployment paths are retained. Nothing has been published.

Phase 3: shared background data powers both interfaces; Studio includes six experience entries, two degrees with coursework, six initiatives, and four skill categories. Added navigation links and direct anchors. Search reuses existing matching but resolves to Studio pages and takes entry descriptions from current data, correcting the stale Cornell degree in the legacy index.

Validation: 40 tests pass, TypeScript passes, production build passes, lint has zero errors and nine existing warnings. Browser checks covered filtering, detail reloads, education deep links, keyboard coursework expansion, search, and 390px layouts without horizontal overflow. All 29 static route files and every concept gallery asset were checked. Existing bundle-size and Browserslist warnings remain for launch-readiness review.

Review links:
- http://127.0.0.1:8080/studio/work
- http://127.0.0.1:8080/studio/lab
- http://127.0.0.1:8080/studio#experience
- http://127.0.0.1:8080/studio#education
- http://127.0.0.1:8080/studio/search

## Spotlight review addition

Added a persistent Studio Spotlight across all Studio routes, including resume and detail pages. Navbar is reduced to Work, Product Lab, About, and Contact. Spotlight has shared-layout expansion, layered glass styling, a modal focus trap, Cmd/Ctrl+K, arrow/Enter navigation, Escape/backdrop dismissal, concept thumbnails, project technologies, destination shortcuts, and mobile visual-viewport handling. Reduced-motion and reduced-transparency preferences are supported. Exact-title results rank first; weak matches are filtered.

Validation: 52 tests, TypeScript, production build; browser verified focused input, Escape focus restoration, exact-title navigation, and panel bounds at 390px. Physical mobile keyboard behavior remains part of user device testing. Phase 4 remains paused.

### Detail polish before phase 4
- Added a thin reading progress line to project and Product Lab detail pages, tracking the Studio scroll container and hiding when no scrolling is needed.
- Added copy-link controls with temporary confirmation and an honest clipboard failure message.
- Product Lab cover and gallery images now open in a full-screen accessible viewer with captions, image count, previous/next buttons, arrow keys, Escape, focus trapping and focus restoration. Spotlight keyboard shortcut is suppressed inside the viewer.
- Changed the ML & AI toolkit card to pastel sage with dark text.
- Validation: 55 tests passed, TypeScript passed, production build passed, lint has zero errors and 9 existing warnings. Browser checked copy confirmation, gallery arrow navigation and Escape/focus restoration, mobile viewer layout, live reading progress, and pastel palette. Existing bundle-size warning remains for phase 4.
- Awaiting user review. Recurring character is still a design proposal, not implemented. Phase 4 remains paused.

### Pixel Ronit studio host
- User approved the pixel character and requested creative use across the portfolio.
- Generated and saved a transparent four-pose atlas in `public/pixel-ronit/poses.png`; prompt and provenance in the adjacent README.
- Added an interactive hello in the hero, work/lab margin notes, contact farewell, contextual Spotlight avatar and thinking search host, collection introductions, shared footer cameo, and 404 guide.
- Added on-demand discoveries in Spotlight, homepage and detail pages. Suggestions link to real project/concept routes and exclude the current page and previous suggestion.
- Original desktop includes a character link to the Studio. Character motion is brief and hover/focus triggered, respecting reduced motion.
- Validated desktop hero and greeting, mobile Spotlight and discovery results, transparency and sprite clipping. Phase 4 remains paused for user review.

### Navigation and content sequence
- Shared Studio navigation now reads Work (experience), Projects, Product Lab, Extracurricular, Skills, Contact. Education remains available on the page and through Spotlight, without a navbar link.
- Homepage order: Experience, Projects, Product Lab, Extracurricular, Education, Skills, existing About, Contact. Section numbering updated.
- Hero includes View my resume, LinkedIn, GitHub, and the email address. Mobile navigation uses two rows of three links.
- Updated Spotlight destinations and navigation tests. 57 tests, TypeScript, and build pass; mobile browser confirmed correct experience anchor and no horizontal overflow.

## Phase 4 delivered for acceptance

Owner requested implementation of phase 4. Studio is now the main `/` experience; `/studio` remains compatible, and RonitOS is retained at `/desktop` with a footer link. No publication was performed.

- Added static per-route SEO/social metadata, canonical URLs, sitemap, noindex for search/404, and client-navigation metadata updates. Existing portrait and Product Lab covers provide sharing images.
- Lazy-loaded the legacy desktop and moved its toast/tooltip UI out of Studio startup. Removed unused global query/Sonner providers. Split stable React and animation runtimes; all chunks are below 500 kB.
- Reviewed semantic navigation, keyboard dialogs, focus restoration, reduced-motion styles, 320px layout, local assets, and static refresh. Malformed hash handling now fails safely. The 404 uses Studio styling.
- Added build verification and CI gates. See LAUNCH-CHECKLIST.md for deployment assumptions, remaining real-device checks, and acceptance steps.

## Legacy desktop removed

The owner explicitly requested complete removal, superseding earlier decisions to retain RonitOS. Removed the `/desktop` route, footer link, boot screen, desktop/window/dock/menu/assistant components, theme context, drag and desktop hooks, unused UI scaffolding, desktop styles/assets, old favicon, and unused dependencies. npm is the single lockfile source. Search is retained for Studio, with section-based targets and no window-specific labels. Content shared with the former interface is now Studio-owned.

Validation: 62 tests pass; TypeScript, lint (zero warnings), build, and production verification pass. Build emits 31 route documents and no desktop directory or legacy bundle. Nothing was published.

### Host animation and navigation fixes
- Host dialogue advances every 3 seconds while visible, with changing poses and brief transitions. Pause/resume is available; visual motion respects reduced-motion settings.
- Footer and brand top links explicitly scroll the Studio container, including repeated clicks.
- Navigation stores the container position and open details in session storage, restoring them on browser Back. Expanded homepage collections persist so returning to a project lower in the list does not collapse the layout. Hash navigation and scroll restoration are handled centrally.
- Added automated pause/resume, Back restoration, open-detail restoration, and repeat top-control tests. Browser checked automatic dialogue, expanded collection restoration, and top reset.
