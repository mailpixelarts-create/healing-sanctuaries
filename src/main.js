// ============================================
// HEALING SANCTUARIES — MAIN ENTRY POINT
// Preloader → Lenis → GSAP → Meta-layers
// ============================================

import { initPreloader } from './utils/preloader.js';
import { initLenis } from './utils/scroll.js';
import { initScrollReveals, initParallax, initSectionReveals, initMagneticButtons, initTextSplits, refreshScrollTrigger } from './utils/motion.js';
import { SANCTUARIES, detectCurrentSanctuary } from './utils/sanctuary-nav.js';
import {
  initOutcomeTracker,
  initTranslation,
  addStructuredData,
} from './utils/meta-layers.js';

// --- Initialize everything after preloader exits ---
function initSystems() {
  // Lenis smooth scroll
  initLenis();

  // GSAP motion systems
  initScrollReveals();
  initParallax();
  initSectionReveals();
  initMagneticButtons();
  initTextSplits();

  // Meta-layers
  initOutcomeTracker();

  // Refresh ScrollTrigger after images load
  window.addEventListener('load', () => {
    refreshScrollTrigger();
  });
}

// --- Entry point: preloader first, then systems ---
function boot() {
  // Check if there's an existing loader from the old system
  const oldLoader = document.getElementById('loader');
  if (oldLoader) oldLoader.remove();

  // Run preloader, then init all systems
  initPreloader(() => {
    initSystems();
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// Export for site-specific scripts
export { initLenis, initScrollReveals, initParallax, initSectionReveals, initMagneticButtons, initTextSplits, refreshScrollTrigger, SANCTUARIES, detectCurrentSanctuary };
