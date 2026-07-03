# Asset Specifications

Design DNA, typography, color, and signature interaction per sanctuary.

---

## Design Tokens (src/styles/_tokens.scss)

All sites share these tokens:

```scss
// Breakpoints
$bp-mobile: 480px;
$bp-tablet: 768px;
$bp-desktop: 1024px;
$bp-wide: 1280px;

// Spacing
$space-xs: 0.25rem;
$space-sm: 0.5rem;
$space-md: 1rem;
$space-lg: 2rem;
$space-xl: 4rem;
$space-2xl: 8rem;

// Typography
$font-display: 'Playfair Display', serif;
$font-body: 'Inter', sans-serif;
$font-mono: 'JetBrains Mono', monospace;

// Transitions
$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
$duration-fast: 0.2s;
$duration-normal: 0.4s;
$duration-slow: 0.8s;
```

---

## Per-Site Design DNA

### 01 — Reiki: Sacred Luxury

| Property | Value |
|----------|-------|
| **Aesthetic** | Dark editorial luxury, sacred geometry, intimate gold glow |
| **Typography** | Playfair Display (display) + Inter (body) + JetBrains Mono (mono) |
| **Colors** | `--ink: #0C0A08`, `--paper: #F5F0E8`, `--signal: #C9A96E` |
| **Hero** | Aura particle field (120 particles, mouse-following) |
| **Nav** | Side nav (80px) with vertical text |
| **Signature** | Aura particle system |
| **Footer** | Editorial spread with lexicon |

### 02 — Sound Healing: Deep Ocean Kinetic

| Property | Value |
|----------|-------|
| **Aesthetic** | Deep ocean kinetic, waveform-driven |
| **Typography** | Inter (all weights) |
| **Colors** | `--ink: #060A10`, `--paper: #E8EDF5`, `--signal: #4A90D9` |
| **Hero** | Waveform visualizer (oscilloscope bars) |
| **Nav** | Floating glass nav |
| **Signature** | Waveform visualizer |
| **Footer** | Frequency spec sheet |

### 03 — Yoga: Organic Editorial

| Property | Value |
|----------|-------|
| **Aesthetic** | Organic editorial, chakra-coded |
| **Typography** | Cormorant Garamond (display) + DM Sans (body) |
| **Colors** | `--ink: #1A1612`, `--paper: #F5EDE3`, `--signal: #D4A574` |
| **Hero** | Chakra wheel navigation |
| **Nav** | Spinning chakra color wheel |
| **Signature** | Chakra wheel nav |
| **Footer** | Sanskrit sutra block |

### 04 — Meditation: Wabi-Sabi Precision

| Property | Value |
|----------|-------|
| **Aesthetic** | Wabi-sabi precision, cinematic texture |
| **Typography** | Tiempos Text (display) + IBM Plex Mono (mono) |
| **Colors** | `--ink: #0E0C0A`, `--paper: #E8E0D4`, `--signal: #C9A96E` |
| **Hero** | Film grain overlay + word hover |
| **Nav** | Top nav with film-strip |
| **Signature** | Film grain + word hover |
| **Footer** | Minimal haiku-style |

### 05 — Breathwork: Clinical Precision

| Property | Value |
|----------|-------|
| **Aesthetic** | Clinical precision, breathing guide |
| **Typography** | Courier Prime (display) + Share Tech Mono (mono) |
| **Colors** | `--ink: #0A0C0E`, `--paper: #E0E4E8`, `--signal: #5B9BD5` |
| **Hero** | 4-7-8 breathing pacer |
| **Nav** | Minimal top bar |
| **Signature** | 4-7-8 breathing pacer |
| **Footer** | Clinical data block |

### 06 — Crystal Healing: Maison Dark

| Property | Value |
|----------|-------|
| **Aesthetic** | Maison dark, faceted geometry |
| **Typography** | Canela (single font) |
| **Colors** | `--ink: #0C0A08`, `--paper: #F5F0E8`, `--signal: #C9A96E` |
| **Hero** | Facet clip-path reveals |
| **Nav** | Minimal top bar |
| **Signature** | Facet clip-paths |
| **Footer** | Mineral spec sheet |

### 07 — Aromatherapy: Botanical Quiet

| Property | Value |
|----------|-------|
| **Aesthetic** | Botanical quiet, olfactory-focused |
| **Typography** | Cormorant Garamond (display) + Inter (body) |
| **Colors** | `--ink: #0E0C08`, `--paper: #F5EDE3`, `--signal: #8B7355` |
| **Hero** | Olfactory memory test |
| **Nav** | Floating glass nav |
| **Signature** | Olfactory memory test |
| **Footer** | Botanical glossary |

### 08 — Ayurveda: Raw Earth Academic

| Property | Value |
|----------|-------|
| **Aesthetic** | Raw earth academic, dosha-focused |
| **Typography** | Anton (display) + Tiempos Text (body) |
| **Colors** | `--ink: #1A1612`, `--paper: #E8DDD0`, `--signal: #C4956A` |
| **Hero** | Prakriti Compass quiz |
| **Nav** | Minimal top bar |
| **Signature** | Prakriti Compass quiz |
| **Footer** | Dosha reference chart |

### 09 — Acupuncture: Cyberpunk Terminal

| Property | Value |
|----------|-------|
| **Aesthetic** | Cyberpunk terminal, data-driven |
| **Typography** | IBM Plex Mono (all weights) |
| **Colors** | `--ink: #0A0E0C`, `--paper: #C8D8D0`, `--signal: #00FF88` |
| **Hero** | Pressure point explorer |
| **Nav** | Terminal-style nav |
| **Signature** | Pressure point explorer |
| **Footer** | Meridian data block |

### 10 — Chakra Balancing: Afrofuturist Sacred

| Property | Value |
|----------|-------|
| **Aesthetic** | Afrofuturist sacred, color-coded |
| **Typography** | DM Sans (body) + Space Grotesk (display) |
| **Colors** | `--ink: #0E0A14`, `--paper: #E8E0F0`, `--signal: #9B59B6` |
| **Hero** | Chakra color cycling |
| **Nav** | Color-coded nav dots |
| **Signature** | Chakra color cycling |
| **Footer** | Chakra reference wheel |

### 11 — Herbalism: Botanical Dark Process

| Property | Value |
|----------|-------|
| **Aesthetic** | Botanical dark process, scroll-heavy |
| **Typography** | Druk Wide (display) + Source Serif 4 (body) |
| **Colors** | `--ink: #0C0A08`, `--paper: #E8DDD0`, `--signal: #6B8E23` |
| **Hero** | 600vh scroll sequence |
| **Nav** | Minimal top bar |
| **Signature** | 600vh scroll sequence |
| **Footer** | Apothecary glossary |

### 12 — Shamanic Journeying: Mythological Noir

| Property | Value |
|----------|-------|
| **Aesthetic** | Mythological noir, drum-driven |
| **Typography** | Times New Roman (display) + Inter (body) |
| **Colors** | `--ink: #0E0A08`, `--paper: #E8E0D4`, `--signal: #8B4513` |
| **Hero** | Drum beat interaction |
| **Nav** | Edge nav (vertical dots) |
| **Signature** | Drum beat interaction |
| **Footer** | Mythological glossary |

### 13 — Qi Gong: Surrealist Meditative

| Property | Value |
|----------|-------|
| **Aesthetic** | Surrealist meditative, physics-based |
| **Typography** | Archivo (display) + Noto Serif (body) |
| **Colors** | `--ink: #0E0C0A`, `--paper: #E8E0D4`, `--signal: #8B7355` |
| **Hero** | Matter.js floating particles |
| **Nav** | Minimal top bar |
| **Signature** | Matter.js physics |
| **Footer** | Meridian reference |

### 14 — Art Therapy: Maximalist Outsider

| Property | Value |
|----------|-------|
| **Aesthetic** | Maximalist outsider, hand-made |
| **Typography** | Comic Sans MS (all) |
| **Colors** | `--ink: #1A1612`, `--paper: #F5EDE3`, `--signal: #E74C3C` |
| **Hero** | Finger-paint canvas |
| **Nav** | Hand-drawn nav |
| **Signature** | Finger-paint canvas |
| **Footer** | Scribble manifesto |

---

## Build Output

| Metric | Value |
|--------|-------|
| Total CSS | ~400KB (gzipped: ~90KB) |
| Total JS | ~220KB (gzipped: ~80KB) |
| Modules | 64 |
| Build Time | ~1.6s |
| HTML Files | 19 (14 sites + 5 system pages) |
