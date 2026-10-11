# iPod Transport, Burgundy

This folder contains only the WebP renders used by the website. To update a render, replace its WebP file. Keep the filenames below exactly as written. The homepage, Product Lab collection, case study, and full-screen gallery already use these paths, so no code edits are needed when replacing them.

Use real **WebP** files, preferably **1600 × 900 (16:9)**, in sRGB. Aim for under 400 KB per image where practical. Convert PNG/JPEG exports to WebP; renaming the extension alone does not convert an image. Refresh the local preview after replacement.

| Filename | Frame | Art direction |
| --- | --- | --- |
| `cover.webp` | Cover | Device floating center-frame on deep, near-black wine red. Satin Burgundy back and edge dial, full-bleed album art. If the back is visible, use a tone-on-tone “Do One Thing” engraving. |
| `01.webp` | Home state | Vertical menu: Apple Music, Spotify, Podcasts, Downloaded, Settings. Warm off-white text, faint Burgundy selection highlight. |
| `02.webp` | Edge dial | Close-up of satin Burgundy touch-sensitive ring and darker recessed groove. Make the tactile landmark clear. |
| `03.webp` | Offline Library | Downloaded library view in the same quiet dark palette, suitable for bedside, travel, or gym use. |
| `04.webp` | Idle screen | Only album art and a clock, with a thin, restrained Burgundy bezel glow representing a track change. |

The website uses the WebP files. Original PNG sources are kept locally in `local-originals/product-lab/ipod-transport/`, outside the public directory and ignored by Git. The concept is explicitly speculative; the copy does not assert that Burgundy is an official iPhone finish or that streaming integrations are available.

Content: `src/data/productLabCases.ts` (id `ipod-transport`).
Thinking note: `src/data/productLabNotes.ts`.
Local page: `/studio/lab/ipod-transport`.
