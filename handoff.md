# SCG Masterminds — Project Handoff

> Last updated: 2026-07-03 · Live domain: **https://scgmasterminds.co.uk** · Repo: `mailadisin-hub/scg-tuitions-masterminds-website`

---

## 1. What we're building

**SCG Masterminds** is a freemium browser-based learning quiz platform for primary-school children, produced by **SCG Tuitions**. A child (with a parent/guardian) picks their year group and works through read-aloud, multiple-choice and interactive activities covering **phonics, English comprehension, and maths**. Results are stored on the device and optionally posted to a Google Sheet via Apps Script.

Key characteristics:
- **Child-friendly, tap-first UI** with large buttons, emoji, colour-coded year cards.
- **Audio-first** — every activity uses text-to-speech (Web Speech API) to read instructions, words and questions aloud, so pre/early readers can use it.
- **Freemium** — 1 free English comprehension + 5 free maths questions per user. After the free allowance the subscribe modal appears (£5/mo English-only or £8/mo English + Maths). Stripe payment links are placeholder anchors (`#stripe-english`, `#stripe-maths-english`) — not yet wired to real Stripe.
- **Firebase auth** — optional sign-in / sign-up / Google OAuth in the hero nav. After sign-in the account modal shows the user's tier badge and best scores.
- **Self-contained** — the entire quiz is a single HTML file with all CSS and JS inline (Firebase SDK loaded from CDN). No frameworks, no build step.

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Front-end | **Vanilla HTML/CSS/JS**, single file | All styles scoped under `#scgmm`; all JS inline in `<script>` blocks |
| Auth | **Firebase v10 (compat SDK)** | Loaded from `gstatic.com` CDN; email + Google OAuth; `firebase.initializeApp({...})` at top of script |
| Database | **Firebase Firestore** | `db` variable initialised; currently used to scope future per-user data |
| Audio | **Web Speech API** (`speechSynthesis`) | Wrapped in a `Sp.speak()` helper |
| Persistence | **`localStorage`** | Results, best scores, parent details, consent, phonics unlocks, free-usage counters |
| Server | **Plain Node.js `http` server** (`server.js`) | Zero dependencies, no build. Serves the static file(s) and reads `PORT` from env |
| Hosting | **Hostinger** (Node.js web app, GitHub-connected) | Auto-deploys from the `quiz` branch; runs `node server.js` |
| Results sink | **Google Apps Script** web app | `ENDPOINT` is set to a live Apps Script URL — POSTs results to a Google Sheet on quiz completion |

> **History note:** The project was originally scaffolded as a **Next.js 16 / React 19 / TypeScript / Tailwind** app. That stack caused persistent **503 errors** on Hostinger. We replaced Next.js entirely with a ~50-line plain Node server. **Do not reintroduce Next.js** unless the product genuinely needs SSR/routing.

---

## 3. Folder structure

```
.
├── server.js                 # Node http server: serves /public, maps "/" -> the quiz, reads PORT
├── package.json              # scripts: start = "node server.js", build = "echo (noop)"
├── public/
│   ├── scg-masterminds-v3.1.html   # ★ THE ENTIRE APP (~2,548 lines as of 2026-07-03)
│   ├── privacy.html          # Privacy Policy (linked from consent screen)
│   ├── terms.html            # Terms of Service (linked from consent screen)
│   └── scg-logo.svg          # SCG logo asset
├── handoff.md                # This file
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
| **Hero** | Dark navy header with "SCG Masterminds / Built by tutors. Loved by kids." + stats strip. Sign-in/Sign-up button top-right updates to the user's name when logged in. |
| **Consent gate** | One-time parent/guardian agreement to Privacy + Terms. Saved to `localStorage` (`scgMM2_consent`). |
| **Home — "Who is practising today?"** | Year-group card grid (the main hub). Equal-height cards (`height:240px`). |
| **Subjects menu** | Per year: English / Maths (/ 11+ FSCE for Year 3). |
| **Activity / difficulty pickers** | E.g. maths op list; phonics phase list for Reception. |
| **Quiz/game runner (modal)** | Renders questions inside a modal (`#mbody`), with progress dots, live score, audio, feedback. |
| **Results form** | Collects child name + parent name/email, then shows the done screen and stores/emails the result. |
| **Done / celebration screen** | Score, per-question breakdown, best-score tracking. |
| **Subscribe modal** | Appears after the free allowance. Placeholder Stripe links. "Email me my score" option. |
| **Auth modal** | Sign in / Sign up / Google OAuth via Firebase. Toggled by "Sign in" button in hero. |
| **Account modal** | Shown when signed in. Displays tier badge (Free / English / Max), email, and best scores. |
| **Admin panel** | Hidden results viewer (`#scg-admin` hash or Ctrl+Shift+E). Reads localStorage. |

---

## 5. Content & features by year group

### Reception (Ages 4–5) — Phonics
Five phases, each with multiple games. **Phase progression is gated** — score 70%+ on all games to unlock the next phase (`scgMM2_phonics_unlocks`).

| Phase | Focus | Games |
|---|---|---|
| **Phase 1** | Recognise sounds: **s a t p i n** | Game 1 · Recognise Sounds (hear a sound → tap matching letter tile); Game 2 · Hear & Choose (hear a sound → pick from 4 letters) |
| **Phase 2** | First sounds (s a t p i n m d g o c k e u r h b f l) | Sight Words · Hear & Choose · Hear & Spell |
| **Phase 3** | Digraphs: ch, sh, th, ng + vowel digraphs | Sight Words · Hear & Choose · Hear & Spell |
| **Phase 4** | Blending: CCVC / CVCC words | Sight Words · Hear & Choose · Hear & Spell |
| **Phase 5** | New spellings for known sounds | Sight Words · Hear & Choose · Hear & Spell |

### Year 1 (Ages 5–6) — English + Maths *(first comprehension free; rest locked)*
- **English:** 5 read-aloud comprehensions — *The Big Red Balloon, The Sleepy Cat, The Snowman, The Farm Trip, Grandad's Garden*
- **Maths:** topic-based (`Y1MOPS`): Number Bonds to 10, Number Bonds to 20, 10 More, 10 Less. (5 questions free, then paywall.)

### Year 2 (Ages 6–7) — English + Maths
- **English:** 5 comprehensions — *The Magic Garden, The Little Red Train, Bees and Flowers, The Lost Puppy, The Four Seasons.*
- **Maths:** procedurally generated (`MOPS`): Addition, Subtraction, Multiplication, Division.

### Year 3 (Ages 7–8) — English + Maths + 11+ FSCE
- **English:** 5 comprehensions — *Ancient Egypt, Journey Through the Jungle, Rainforests of the World, The Dragon's Secret, Life in the Ocean.*
- **Maths:** same generated engine as Year 2, with larger number ranges.
- **11+ FSCE:** a 66-question bank (Maths Reasoning + Comprehension), 10 randomly drawn per attempt.

### Year 4 & Year 5
- **Intentionally hidden** — not in the `years` array. Awaiting content from the client.

### Year 6 (Ages 10–11)
- **"Coming soon"** — shown as a disabled card.

---

## 6. Key implementation details

- **Single source file:** `public/scg-masterminds-v3.1.html` (~2,548 lines). Everything lives here. Edit carefully; verify JS after edits.
- **JS syntax check:** `node -e "var fs=require('fs'),html=fs.readFileSync('public/scg-masterminds-v3.1.html','utf8'),scripts=[],re=/<script[^>]*>([\s\S]*?)<\/script>/gi,m;while((m=re.exec(html))!==null){if(!m[0].includes('src='))scripts.push(m[1]);}fs.writeFileSync('/tmp/check.js','(function(){\n'+scripts.join('\n')+'})()');require('child_process').execSync('node --check /tmp/check.js',{stdio:'inherit'});"` — run before every commit.
- **Firebase SDK:** loaded from CDN at the top of `#scgmm` (before `<style>`). `firebase`, `auth`, `db`, `googleProvider`, `currentUser` are globals.
- **`scgmasterminds.co.uk` must be in Firebase Console → Authentication → Authorized domains** for Google OAuth to work in production.
- **Quiz engine object** (`Q`/`this`): each activity has a `startX` (sets state, opens modal) and a `renderX` (writes into `mbody`). On completion call **`renderForm()`** → **`renderDone()`** (saves via `Store.add`).
- **`mbody`** is the global modal body element (`id="mbody"`). Do **not** query `#m-body`.
- **`Store`** API: `all()`, `add(r)`, `bests()`, `parent()`, `saveParent(p)`, `clear()`. There is **no** `Store.save`.
- **`FreeUsage`** API: tracks free-tier usage in `scgMM2_free_used` localStorage key. `hasUsedFree('english')` / `mathsQUsed()` / `inc()` / `incMaths()`.
- **TTS:** always use the `Sp.speak([...], ...)` helper, not `speechSynthesis` directly.
- **localStorage keys:** `scgMM2_results` (SK), `scgMM2_parent` (PK), `scgMM2_bests` (BK), `scgMM2_consent` (CK), `scgMM2_phonics_unlocks` (UK), `scgMM2_free_used` (free usage), `scgMM2_tier` (subscription tier: `free` | `english` | `max`).
- **Results endpoint:** `var ENDPOINT = "https://script.google.com/..."` — live Apps Script URL, POSTs JSON results no-cors.

---

## 7. Deployment

- **Branch model:** develop on `claude/scg-comprehension-quiz-email-Tuw5j`; the **`quiz`** branch is what Hostinger deploys.
- **Hostinger:** Node.js web app connected to GitHub. Build = `npm run build` (noop echo); Start = `node server.js`; any Node 18+ works. Reads `PORT` from env automatically.
- **Redeploy:** push to `quiz`, then in Hostinger → *Settings and redeploy*.

---

## 8. Current progress

**✅ Done / working**
- Live on `scgmasterminds.co.uk` (503 resolved by moving off Next.js to plain Node server).
- Full quiz at `/`; privacy & terms pages live; links relative.
- Reception Phases 1–5; Phase 1 SATPIN letter games (empty-modal bug fixed).
- Year 1–3 English + Maths + Year 3 11+ FSCE bank.
- Year cards equal-height grid (`height:240px`); Year 6 "coming soon".
- Firebase auth: sign up, sign in, Google OAuth, auth nav button, account modal.
- Freemium paywall: 1 free English comprehension + 5 free maths questions, then subscribe modal.
- Subscribe modal with tier options (placeholder Stripe anchors).
- Google Apps Script endpoint wired up (`ENDPOINT` = live URL) — results posted on quiz completion.
- Mobile responsive layout.

**🔲 Open / next**
- **Firebase Authorized Domains:** add `scgmasterminds.co.uk` in Firebase Console → Authentication → Settings → Authorized domains (required for Google OAuth in production).
- **Stripe payment links:** replace `#stripe-english` and `#stripe-maths-english` anchor hrefs in the subscribe modal with real Stripe payment links. On success, set `localStorage.setItem('scgMM2_tier', 'english')` or `'max'`.
- **Verify Phase 1 phonics games on production** — confirm both games render and play audio on real devices after latest redeploy.
- **Phase-unlock persistence on iOS** — needs real-device confirmation on iPhone/iPad.
- **Year 4 & Year 5 content** — awaiting material from client.
- **Year 6** content (currently "coming soon").
- **Hero image** — placeholder `<div class="hero-img-placeholder">` is in the markup; provide the actual image asset.

---

## 9. Known gotchas

- **Don't reintroduce a build step** — it was the root cause of the Hostinger 503s.
- **One big file:** merge conflicts and accidental breakage are easy. Always run the JS syntax check before committing.
- **Firebase SDK is external CDN:** the app requires internet to load. If the Firebase scripts fail (e.g. offline or blocked), the entire quiz JS will error because `firebase` is undefined. Consider adding a try/catch guard or a fallback message if needed.
- **Free-usage counters are per-browser** (`localStorage`). A user can reset them by clearing site data or using a private window. For a stricter paywall, tie usage to Firebase auth uid in Firestore.
- **`scgMM2_tier`** is currently set only locally (nowhere sets it via auth/Stripe callback). Implement a post-payment webhook or Stripe success URL that sets the tier key.
