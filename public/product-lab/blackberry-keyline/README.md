# BlackBerry Keyline

Redesign concept. The five WebP files here are the finished product renders used by the website.

## Where to drop your images

Put original PNG exports in **`local-originals/product-lab/blackberry-keyline/`** at the repository root. That folder already exists, is ignored by Git, and is outside the published site. Use `cover.png`, `1.png`, `2.png`, `3.png`, and `4.png`.

Convert those originals to the WebP filenames below, replacing the existing renders in this public folder. The homepage, collection, detail page, and image viewer already use these paths. No content edits are required. Do not put PNG originals in `public`.

Prefer 1600 × 900 (16:9), sRGB, and under 400 KB per WebP where practical. Convert the format rather than only renaming the extension. Only the optimized WebP files belong in the published image folder.

| Original | Website file | Frame and art direction |
| --- | --- | --- |
| `cover.png` | `cover.webp` | Matte black candy-bar phone on dark slate. Hard side light reveals the sculpted, slightly concave keys. Dim display and one red LED. Small embossed back logo if visible. Tagline: “Be reachable. On your terms.” |
| `1.png` | `01.webp` | Fixed physical QWERTY under a shorter display. Show the touch-sensitive key surface and hold-key shortcuts, including B for briefing and C for compose. |
| `2.png` | `02.webp` | Detail of the priority LED and hardware isolation slider. Distinguish reachable mode from radios-off mode; do not imply messages can arrive with radios powered off. |
| `3.png` | `03.webp` | Hub priority inbox with email, SMS, and supported messaging. Show sender priority and a short local reply draft. Keep the interface restrained. |
| `4.png` | `04.webp` | Plain packaging and Work Mode / Life Mode setup. Optional workplace enrolment. Any Android/QNX isolation diagram or iPhone companion illustration should be labelled as proposed architecture. |

Security, isolation, messaging integrations, and companion mode are concept directions rather than validated capabilities.

Content: `src/data/productLabCases.ts`, id `blackberry-keyline`.
Thinking note: `src/data/productLabNotes.ts`.
Local route: `/studio/lab/blackberry-keyline`.
