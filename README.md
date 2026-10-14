# Math 285 Study Companion

Concept-first, offline-capable study website based on the supplied Bronski–Manfroi notes and Fall 2026 calendar. Hosted as a static Vercel site; also runs locally.

## Run

From this directory, run `node server.cjs`, then open http://localhost:2850.

`start.ps1` launches the server hidden in the background and opens the site. It reuses a running server on port 2850. `stop.ps1` stops only the process recorded by the launcher.

The server binds to 127.0.0.1, so the site is accessible on this computer. It is not deployed publicly.

## Features

- All 40 lectures in calendar order, including repeated sections and TBD.
- Midterm 1: Chapter 1; Midterm 2: Chapters 2–3; Midterm 3: Chapters 4–6.
- Separate linear algebra and PDE tracks.
- 31 substantial conceptual lessons: intuition, why each method works, an explanatory example, a problem-solving approach, and connections between topics.
- 167 worked problems with at least two reasoning questions and two calculations in every topic group, source-linked original exercises plus clearly labeled supplemental practice.
- Progressive hints, full conceptual explanations, worked calculations, verification, and reasoning/calculation filters.
- Complete original exercise-set index and unchanged local source PDF.
- Mixed reviews, search, confidence tracking, and scratch work in browser local storage.
- All fonts and math rendering assets served locally; no CDN dependency.

`dist/content.json` is the tracked content bank. `enrich-content.cjs` reproducibly adds the conceptual lessons and expanded practice without changing existing problem IDs. `build_content.py` reconstructs the original bank from the supplied local sources; it requires pypdf. Run enrichment after regenerating the original bank. The guide does not solve every textbook exercise subpart.

## Build and deploy

Run `npm ci`, `npm run build`, and `npm test`. `vercel.json` configures static output in `dist/`; deployment builds do not require Python or any files from Downloads. The entire runtime, including the source PDF and KaTeX fonts, is served from this directory.

Run `npx vercel --prod` after signing into the intended Vercel account. Changes pushed to a connected GitHub repository can be automatically deployed by Vercel.

Browser QA is in `browser-check.cjs`; set `PLAYWRIGHT_MODULE` to a local Playwright installation if needed. It covers every lesson, math rendering, hints, filters, saved progress, source organization, and desktop/mobile layouts.

The supplied notes carry an Apache 2.0 notice. See `dist/LICENSE.txt` and the site’s Sources page for attribution.
