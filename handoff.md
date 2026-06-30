# SCG Masterminds — Project Handoff

> Last updated: 2026-06-30 · Live domain: **https://scgmasterminds.co.uk** · Repo: `mailadisin-hub/scg-tuitions-masterminds-website`

---

## 1. What we're building

**SCG Masterminds** is a free, browser-based learning quiz platform for primary-school children, produced by **SCG Tuitions**. A child (with a parent/guardian) picks their year group and works through read-aloud, multiple-choice and interactive activities covering **phonics, English comprehension, and maths**. Results are stored on the device and can optionally be emailed/logged to the tutor.

Key characteristics:
- **Child-friendly, tap-first UI** with large buttons, emoji, colour-coded year cards.
- **Audio-first** — every activity uses text-to-speech (Web Speech API) to read instructions, words and questions aloud, so pre/early readers can use it.
- **No login, no accounts.** A one-time parent consent screen (Privacy + Terms) gates entry; progress is saved in the browser via `localStorage`.
- **Self-contained** — the entire quiz is a single HTML file with all CSS and JS inline. No frameworks, no build step.

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Front-end | **Vanilla HTML/CSS/JS**, single file | All styles scoped under `#scgmm`; all JS inline in `<script>` blocks |
| Audio | **Web Speech API** (`speechSynthesis`) | Wrapped in a `Sp.speak()` helper |
| Persistence | **`localStorage`** | Results, best scores, parent details, consent, phonics unlocks |
| Server | **Plain Node.js `http` server** (`server.js`) | Zero dependencies, no build. Serves the static file(s) and reads `PORT` from env |
| Hosting | **Hostinger** (Node.js web app, GitHub-connected) | Auto-deploys from the `quiz` branch; runs `node server.js` |
| Results sink (optional) | **Google Apps Script** web app | Set `ENDPOINT` in the quiz to a Apps Script URL to POST results to a Google Sheet; empty = device-only |

> **History note:** The project was originally scaffolded as a **Next.js 16 / React 19 / TypeScript / Tailwind** app. That stack caused persistent **503 errors** on Hostinger (Next needs a build + correct standalone/port handling). Since the deliverable is one self-contained HTML file, we replaced Next.js entirely with a ~50-line plain Node server. **Do not reintroduce Next.js** unless the product genuinely needs SSR/routing.

---

## 3. Folder structure

```
.
├── server.js                 # Node http server: serves /public, maps "/" -> the quiz, reads PORT
├── package.json              # scripts: start = "node server.js", build = "echo (noop)"
├── public/
│   ├── scg-masterminds-v3.1.html   # ★ THE ENTIRE APP (single self-contained file, ~2,230 lines)
│   ├── privacy.html          # Privacy Policy (linked from consent screen)
│   ├── terms.html            # Terms of Service (linked from consent screen)
│   └── scg-logo.svg          # SCG logo asset
├── README.md
├── AGENTS.md / CLAUDE.md     # Repo agent instructions
└── .gitignore
```

`server.js` routing:
- `/` → serves `public/scg-masterminds-v3.1.html`
- `/privacy.html`, `/terms.html`, `/*.svg`, etc. → served from `public/` with correct MIME types
- unknown paths → 404; path traversal blocked

---

## 4. Pages & screens

The app is a **single-page experience** (one HTML file) that swaps views in-place. There are no separate URL routes — navigation is JS-driven via a `navStack`.

| Screen | Description |
|---|---|
| **Consent gate** | One-time parent/guardian agreement to Privacy + Terms. Saved to `localStorage` (`scgMM2_consent`). |
| **Home — "Who is practising today?"** | Year-group grid (the main hub). |
| **Subjects menu** | Per year: English / Maths (/ 11+ FSCE for Year 3). |
| **Activity / difficulty pickers** | E.g. Easy / Medium / Hard for maths; phonics phase list for Reception. |
| **Quiz/game runner (modal)** | Renders questions inside a modal (`#mbody`), with progress dots, live score, audio, feedback. |
| **Results form** | Collects child name + parent name/email, then shows the done screen and stores/emails the result. |
| **Done / celebration screen** | Score, per-question breakdown, best-score tracking. |
| **Admin panel** | Hidden results viewer (reads stored results from `localStorage`). |

---

## 5. Content & features by year group

### Reception (Ages 4–5) — Phonics
Five phases, each with multiple games. **Phase progression is gated** — you unlock the next phase by completing the current one (`scgMM2_phonics_unlocks`).

| Phase | Focus | Games |
|---|---|---|
| **Phase 1** | Recognise sounds: **s a t p i n** | Game 1 · Recognise Sounds (hear a sound → tap matching letter tile); Game 2 · Hear & Choose (hear a sound → pick from 4 letters) |
| **Phase 2** | First sounds (s a t p i n m d g o c k e u r h b f l) | Sight Words · Hear & Choose · Hear & Spell |
| **Phase 3** | Digraphs: ch, sh, th, ng + vowel digraphs | Sight Words · Hear & Choose · Hear & Spell |
| **Phase 4** | Blending: CCVC / CVCC words | Sight Words · Hear & Choose · Hear & Spell |
| **Phase 5** | New spellings for known sounds | Sight Words · Hear & Choose · Hear & Spell |

*(Phases 2–5 share the structure: Sight Words read aloud, Hear & Choose the spelling, Hear & Spell with letter tiles.)*

### Year 1 (Ages 5–6) — English + Maths
- **English:** 5 read-aloud comprehensions — *The Big Red Balloon, The Sleepy Cat, The Snowman, The Farm Trip, Grandad's Garden* (each with multiple-choice questions, explanations, and supporting quotes).
- **Maths:** topic-based (`Y1MOPS`): Number Bonds to 10, Number Bonds to 20, 10 More, 10 Less.

### Year 2 (Ages 6–7) — English + Maths
- **English:** 5 comprehensions — *The Magic Garden, The Little Red Train, Bees and Flowers, The Lost Puppy, The Four Seasons.*
- **Maths:** procedurally generated (`MOPS`): Addition, Subtraction, Multiplication, Division × Easy/Medium/Hard difficulty.

### Year 3 (Ages 7–8) — English + Maths + 11+ FSCE
- **English:** 5 comprehensions — *Ancient Egypt, Journey Through the Jungle, Rainforests of the World, The Dragon's Secret, Life in the Ocean.*
- **Maths:** same generated engine as Year 2, with larger number ranges.
- **11+ FSCE:** a 66-question bank (Maths Reasoning + Comprehension), 10 randomly drawn per attempt.

### Year 4 & Year 5
- **Intentionally hidden** — not shown in the grid yet. Awaiting content from the client. To enable: add entries to the `years` array and provide `CY4`/`CY5` comprehension banks + maths ranges.

### Year 6 (Ages 10–11)
- **"Coming soon"** — shown as a disabled card (11+ SATs Prep / Reading).

---

## 6. Key implementation details (for the next developer)

- **Single source file:** `public/scg-masterminds-v3.1.html` (~2,230 lines). Everything lives here. Edit carefully; verify JS after edits.
- **JS syntax check:** extract `<script>` blocks, wrap in `(function(){ ... })()`, run `node --check`.
- **Quiz engine object** (commonly `Q`/`this`): each activity has a `startX` (sets up `this.st` state, opens the modal) and a `renderX` (writes into the global `mbody` element). On completion call **`renderForm()`** (collects parent details) → **`renderDone()`** (saves via `Store.add`).
- **`mbody`** is the global modal body element (`id="mbody"`). Do **not** query `#m-body`.
- **`Store`** API: `all()`, `add(r)`, `bests()`, `parent()`, `saveParent(p)`, `clear()`. There is **no** `Store.save`.
- **TTS:** always use the `Sp.speak([...], ...)` helper, not `speechSynthesis` directly.
- **localStorage keys:** `scgMM2_results` (SK), `scgMM2_parent` (PK), `scgMM2_bests` (BK), `scgMM2_consent` (CK), `scgMM2_phonics_unlocks` (UK).
- **Results endpoint:** `var ENDPOINT = ""` near the top of the script. Set to a Google Apps Script web-app URL to log results to a sheet (posted `no-cors`).

---

## 7. Deployment

- **Branch model:** develop on `claude/scg-comprehension-quiz-email-Tuw5j`; the **`quiz`** branch is what Hostinger deploys (kept in sync via force-push).
- **Hostinger:** Node.js web app connected to GitHub. Build = `npm run build` (noop echo); Start = `node server.js` (or `npm run start`); any Node 18+ works. Reads `PORT` from env automatically.
- **Redeploy:** push to `quiz`, then in Hostinger → *Settings and redeploy*.

---

## 8. Current progress

**✅ Done / working**
- Live on `scgmasterminds.co.uk` (503 resolved by moving off Next.js to plain Node server).
- Full quiz served at `/`; privacy & terms pages live; links relative.
- Reception Phases 1–5; Phase 1 redesigned to SATPIN letter games (empty-modal bug fixed).
- Year 1 (English + topic maths), Year 2 & 3 (English + generated maths), Year 3 11+ FSCE bank.
- Year cards equal-sized grid; "Free" branding removed; Year 6 "coming soon".
- Hero updated: heading "SCG Masterminds" + subheading "Practice makes perfect." + hero-img-placeholder div. **[Task 1 complete — 2026-06-30]**
- Phonics game labels restructured (Sight Word List / Hear & Choose / Hear & Spell); new sequential sight word reader added. **[Task 2 complete — 2026-06-30]**
- Repo cleaned of legacy Next.js/TypeScript code.

**🔲 Open / next**
- **Verify on production** after latest redeploy that both Phase 1 games render and play audio on real devices.
- **Phase-unlock persistence** historically failed inside the old cross-origin iframe (iOS Safari blocks 3rd-party storage). Now that the site is first-party on `scgmasterminds.co.uk`, this should work — **needs confirmation on an iPhone**.
- **Year 4 & Year 5 content** — awaiting material from client; wiring is straightforward once provided.
- **Year 6** content (currently "coming soon").
- **Hero image** the client wanted on the landing area — still pending the actual image asset.
- **Results endpoint** — `ENDPOINT` is empty; wire up the Google Apps Script + Sheet if tutor wants emailed/centralised results.

---

## 9. Known gotchas

- **Don't reintroduce a build step** unless required — it was the root cause of the Hostinger 503s.
- **Standalone/static assets:** with the plain Node server this is a non-issue, but if anyone switches back to Next.js `output: standalone`, remember Hostinger must copy `public/` and `.next/static` next to the server.
- **One big file:** merge conflicts and accidental breakage are easy. Always run the `node --check` syntax pass before committing.
