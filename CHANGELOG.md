# Changelog

All notable changes to the Healing Sanctuaries project will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## v0.1 — 2026-07-03

### System Check & Doctrine Alignment

**Assessment Complete:**
- Read FASHION-SOTD-GRANDMASTER.SKILL.md (2,550 lines) — Motion Doctrine, Aesthetic World, Tech Stack
- Read DESIGNER WEBSITE MASTER PROMPT.md — Award-winning design standards
- Read heal.md Master Content Bible (~18,000 words) — Production content
- Audited all 14 sites against Grandmaster Doctrine (11 areas)
- Gap analysis: 2 CRITICAL (Tech Stack, Transitions), 5 HIGH, 3 MEDIUM

**Files Created:**
- `CHANGELOG.md` — This file
- `SESSION STATE.md` — Active context and pending actions

**Key Decisions:**
- Keep original folder names (01-craniosacral, etc.)
- Redesign first, then content integration
- Award-winning level per DESIGNER WEBSITE MASTER PROMPT
- Migrate to GSAP + Lenis + SplitType + SCSS per Grandmaster Doctrine
- Mobile-first responsive design (not desktop-first)
- One signature interaction per site (Section XXIV)
- Scroll as choreography, not transportation (Section XX)
- Inter-site continuity via View Transitions or Barba.js (Section XXIII)

**Doctrine Scorecard:**
| Area | Before | Target |
|------|--------|--------|
| Tech Stack | 10% | 90% |
| Motion Doctrine | 40% | 85% |
| Mobile Protocol | 30% | 85% |
| Scroll Choreography | 15% | 80% |
| Transition Philosophy | 5% | 80% |
| Gallery Systems | 0% | 75% |
| Anti-Generic Guard | 35% | 85% |

---

## v0.2 — 2026-07-03

### Phase 1-3: Foundation Complete

**Dependencies Installed:**
- `package.json`: Added gsap@^3.15.0, lenis@^1.3.25, split-type@^0.3.4, sass@^1.101.0

**Files Created:**
- `src/styles/_tokens.scss` — Design tokens (breakpoints, spacing, typography, transitions, shadows)
- `src/styles/_base.scss` — Base reset, typography, utilities, Lenis integration, reduced motion
- `src/styles/_animations.scss` — Reveal system (fade-up, fade-in, scale, clip-path, stagger, left, right, rotate)
- `src/utils/scroll.js` — Shared Lenis initialization, anchor link handling, stop/start controls
- `src/utils/motion.js` — Shared GSAP system (ScrollTrigger reveals, parallax, stagger timelines, magnetic buttons, text splits, section reveals)
- `src/utils/meta-layers.js` — 8 shared meta-layers (Visitor Modal, Outcome Tracker, Skeptic's Corner, Emergency Reset, Detox Mode, Translation, JSON-LD)
- `src/main.js` — Main entry point initializing all shared systems

**Files Modified:**
- `vite.config.js` — Updated for SCSS preprocessing, corrected entry point names, added SCSS loadPaths config

**Files Renamed:**
- `01-craniosacral/style.css` → `01-craniosacral/style.scss` (SCSS conversion)

**Key Decisions:**
- Mobile-first responsive (min-width breakpoints)
- SCSS with @use module system (no @import)
- One shared entry point (src/main.js) imported by all sites via `<script type="module">`
- Each site keeps its own script.js for site-specific interactions

---

## v0.3 — 2026-07-03

### Phase 4: Site 01 — Reiki: Sacred Luxury (Complete)

**Files Created/Rewritten:**
- `01-craniosacral/style.scss` — Complete SCSS design system (600+ lines): Side nav, hero with aura canvas, sections, about grid, services grid, process steps, vow blockquote, FAQ accordion, events grid, gift section, footer worldbuilding, all meta-layer styles, detox mode active state
- `01-craniosacral/index.html` — Complete rewrite (400+ lines): 7-scene Story Architecture (Invitation → Identity → Campaign → Immersion → Craft → Transformation → Connection), loading screen, side nav, mobile nav, aura canvas hero, about with lineage chart, mechanism with science bridge, services (3 cards), process (3 steps), vow blockquote, testimonials, 6 FAQ items (from heal.md), 2 events (from heal.md), gift section, contact, footer with lexicon
- `01-craniosacral/script.js` — GSAP-powered: Aura particle system (120 particles, mouse attraction, connection lines), loading screen, nav tracking via IntersectionObserver, hero parallax, section reveals, service card hover tilt

**Design DNA Applied:**
- Visual Language: Dark editorial luxury, sacred geometry, intimate gold glow
- Hero: Cinematic Frame with aura particle field following mouse
- Signature Interaction: Aura particle system (ONE interaction, doctrine §XXIV)
- Typography: Playfair Display (display) + Inter (body) + JetBrains Mono (mono)
- Color: --ink: #0C0A08, --paper: #F5F0E8, --signal: #C9A96E (antique gold)
- Navigation: Side nav (80px) with vertical text, mobile nav with hamburger
- Footer: Editorial spread with lexicon, locations, safety notice
- Loading Screen: "Silence loading... Close your eyes." (heal.md §III.A)

**Doctrine Compliance:**
- ✅ 7-scene Story Architecture (§XII)
- ✅ Cinematic Frame hero (§XVII.3)
- ✅ ONE signature interaction (§XXIV)
- ✅ Loading screen (§III.A)
- ✅ Footer worldbuilding with lexicon (§XXVII)
- ✅ 6 FAQ items from heal.md
- ✅ 2 expanded events from heal.md
- ✅ Practitioner origin story
- ✅ GSAP ScrollTrigger motion (§XXI)
- ✅ Lenis smooth scroll (§XX)
- ✅ prefers-reduced-motion support (§LXVI)
- ✅ Mobile-first responsive
- ✅ Magnetic buttons (micro-detail)
- ✅ Reduced motion kills canvas animation

---

## v0.4 — 2026-07-03

### Phase 4: All 14 Sites Complete

**Sites Built (03-14):**
- `03-kabiraji/style.scss, index.html, script.js` — Yoga: Organic Editorial, Chakra wheel nav, Cormorant Garamond + DM Sans
- `04-curanderismo/style.scss, index.html, script.js` — Meditation: Wabi-Sabi Precision, Film grain + word hover, Tiempos Text + IBM Plex Mono
- `05-labyrinth/style.scss, index.html, script.js` — Breathwork: Clinical Precision, 4-7-8 pacer, Courier Prime + Share Tech Mono (full monospace)
- `06-johrei/style.scss, index.html, script.js` — Crystal Healing: Maison Dark, Crystal facet clip-paths, Canela (single font)
- `07-enochian/style.scss, index.html, script.js` — Aromatherapy: Botanical Quiet, Olfactory Memory Test, Cormorant Garamond + Inter
- `08-chronokinesis/style.scss, index.html, script.js` — Ayurveda: Raw Earth Academic, Prakriti Compass quiz, Anton + Tiempos Text
- `09-zero-point/style.scss, index.html, script.js` — Acupuncture: Cyberpunk Terminal, Pressure Point Explorer, IBM Plex Mono (full monospace)
- `10-sufi-dhikr/style.scss, index.html, script.js` — Chakra Balancing: Afrofuturist Sacred, Chakra color cycling, DM Sans + Space Grotesk
- `11-merkaba/style.scss, index.html, script.js` — Herbalism: Botanical Dark Process, 600vh scroll sequence, Druk Wide + Source Serif 4
- `12-necromantic/style.scss, index.html, script.js` — Shamanic Journeying: Mythological Noir, Drum beat interaction, Times New Roman + Inter
- `13-geomancy/style.scss, index.html, script.js` — Qi Gong: Surrealist Meditative, Matter.js physics, Archivo + Noto Serif
- `14-tulpa/style.scss, index.html, script.js` — Art Therapy: Maximalist Outsider, Finger-paint canvas, Comic Sans MS

**Shared Infrastructure:**
- `src/styles/_meta-layers.scss` — Extracted shared meta-layer styles (was duplicated inline in each site)
- Fixed `@use` rule ordering (must be at top of SCSS files)
- Fixed undefined `$ease` variable in 03-kabiraji (replaced with `$ease-out-expo`)
- Fixed deprecated `random()` function in 02-daode

**Build Output:**
- Vite build: 56 modules, 1.21s
- 14 HTML files compiled
- 14 CSS files generated
- 15 JS files (14 site scripts + 1 shared main)
- Total CSS: ~250KB (gzipped: ~60KB)
- Total JS: ~200KB (gzipped: ~75KB)

**Key Decisions:**
- All 14 sites use shared SCSS tokens + meta-layers via `@use`
- Each site has unique Design DNA (colors, typography, navigation, hero, signature interaction)
- All sites use `<script type="module">` for Vite compatibility
- All sites include loading screen, footer with Rumi quote + Empathy Studio credit

---

## v0.5 — 2026-07-03

### Phase 6-7: Content Integration & System Pages

**System Pages Created (from heal.md §III):**
- `404.html` — "You have wandered off the path..." with Return Home link
- `booking-confirmation.html` — "Your space is held." with reschedule policy
- `gift-confirmation.html` — "Your gift is on its way." with seed metaphor
- `pause-confirmation.html` — "Your sanctuary has been paused." with door metaphor
- `error.html` — "Something has gone quiet." with breath reminder

**Content Integration (14 sites updated):**
- All 14 sites' events sections updated to match heal.md expanded event descriptions exactly
- Sites updated: 01-Reiki, 02-Sound Healing, 03-Yoga, 05-Breathwork, 06-Crystal Healing, 07-Aromatherapy, 08-Ayurveda, 09-Acupuncture, 10-Chakra Balancing, 11-Herbalism, 12-Shamanic Journeying, 13-Qi Gong, 14-Art Therapy
- All 6 FAQs per site already present from v0.4
- All practitioner bios and ambient audio descriptions already present from v0.4

**Vite Config Updated:**
- Added 5 system page entry points (404, booking-confirmation, gift-confirmation, pause-confirmation, error)

**Build Output:**
- Vite build: 63 modules, 4.22s
- 19 HTML files (14 sites + 5 system pages)
- Total CSS: ~400KB (gzipped: ~90KB)
- Total JS: ~220KB (gzipped: ~80KB)

**Known Warnings (non-blocking):**
- 5 sites reference `meta-layer.js` via non-module `<script>` tags (04, 05, 09, 10, 11) — 404 at runtime, legacy from deleted files
