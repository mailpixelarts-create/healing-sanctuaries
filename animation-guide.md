# Animation & Motion Guide

Motion Doctrine Reference — FASHION-SOTD-GRANDMASTER.SKILL.md

---

## Core Principles (§XXI)

Motion exists to communicate. Never animate by habit.

### Six Functions of Motion

| Function | Purpose | Example |
|----------|---------|---------|
| **Reveal** | Content appears as user scrolls | fade-up, scale-in, clip-path |
| **Guide** | Draw attention to next action | magnetic buttons, pulse, arrow bounce |
| **Connect** | Link related elements | parallax linking, shared motion |
| **Transform** | Show state change | hover tilt, accordion open |
| **Reward** | Celebrate completion | success check, particle burst |
| **Conclude** | Signal section end | fade-to-black, breath-out |

---

## Scroll Choreography (§XX)

The seven-beat scroll sequence:

1. **Reveal** — Content enters viewport
2. **Pause** — Brief hold for comprehension
3. **Accelerate** — Speed increases for less critical content
4. **Breathe** — Slows for emotional moments
5. **Seduce** — Visual intrigue, parallax depth
6. **Expand** — Content grows to fill space
7. **Reflect** — Pull back for context

---

## Shared Motion Systems

### GSAP ScrollTrigger (src/utils/motion.js)

```js
import { initScrollReveals, initParallax, initSectionReveals } from './utils/motion.js';
```

- `initScrollReveals()` — Reveals `.reveal` elements on scroll
- `initParallax()` — Parallax effect on `.parallax` elements
- `initSectionReveals()` — Stagger children in `.stagger-children`
- `initMagneticButtons()` — Magnetic hover on `.magnetic`
- `initTextSplits()` — SplitType on `.split-text`

### Lenis Smooth Scroll (src/utils/scroll.js)

```js
import { initLenis } from './utils/scroll.js';
```

- 1.0 sensitivity, 1.0 smoothTouch
- Anchor links use `lenis.scrollTo()`
- `lenis.stop()` / `lenis.start()` for modals

### CSS Animations (src/styles/_animations.scss)

```scss
@use 'animations';

@include fade-up(0.8s, 0.2s);   // duration, delay
@include scale-in(0.6s, 0s);
@include clip-up(0.7s, 0.1s);
@include stagger-children(0.1s); // stagger delay per child
```

---

## Signature Interactions (§XXIV)

ONE per site. Not many. One.

| Site | Signature |
|------|-----------|
| 01-Reiki | Aura particle field (120 particles, mouse attraction) |
| 02-Sound | Waveform visualizer (oscilloscope bars) |
| 03-Yoga | Chakra wheel navigation (spinning color wheel) |
| 04-Meditation | Film grain + word hover (cinematic texture) |
| 05-Breathwork | 4-7-8 breathing pacer (timing guide) |
| 06-Crystals | Facet clip-paths (geometric reveals) |
| 07-Aroma | Olfactory memory test (scent quiz) |
| 08-Ayurveda | Prakriti Compass (dosha quiz) |
| 09-Acupuncture | Pressure point explorer (interactive body map) |
| 10-Chakra | Chakra color cycling (7-color rotation) |
| 11-Herbalism | 600vh scroll sequence (botanical journey) |
| 12-Shamanic | Drum beat interaction (4.5Hz pulse) |
| 13-Qi Gong | Matter.js physics (floating particles) |
| 14-Art Therapy | Finger-paint canvas (draw on page) |

---

## Reduced Motion (§LXVI)

All sites respect `prefers-reduced-motion: reduce`:

- All CSS animations → `animation: none`
- All GSAP ScrollTrigger → `scrollTrigger: { disabled: true }`
- Canvas animations → paused
- Parallax → static
- Loading screen → instant reveal

---

## Timing Functions

```scss
// Design tokens (_tokens.scss)
$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
$ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
$ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

// Durations
$duration-fast: 0.2s;
$duration-normal: 0.4s;
$duration-slow: 0.8s;
$duration-glacial: 1.2s;
```

---

## Performance Targets

- 60fps during all scroll animations
- No layout thrashing (transform/opacity only)
- GPU-composited layers for parallax
- `will-change` applied sparingly, removed after animation
- `prefers-reduced-motion` disables all motion
