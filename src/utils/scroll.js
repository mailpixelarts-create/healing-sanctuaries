// ============================================
// HEALING SANCTUARIES — SHARED LENIS SCROLL
// Section XX: Scroll Choreography
// "Scroll is choreography. Not transportation."
//
// Spec: SMOOTH-SCROLL.md
// lerp: 0.08, duration: 1.4
// GSAP ticker sync + ScrollTrigger proxy
// ============================================

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis = null;

export function initLenis() {
  lenis = new Lenis({
    lerp: 0.08,
    duration: 1.4,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Sync Lenis with GSAP ticker (per SMOOTH-SCROLL.md spec)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Sync Lenis scroll with ScrollTrigger (per SMOOTH-SCROLL.md spec)
  lenis.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      return arguments.length
        ? lenis.scrollTo(value)
        : lenis.scroll.progress * (document.body.scrollHeight - window.innerHeight);
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function stopScroll() {
  if (lenis) lenis.stop();
}

export function startScroll() {
  if (lenis) lenis.start();
}

export function reinitLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  return initLenis();
}
