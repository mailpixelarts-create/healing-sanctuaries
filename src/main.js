// ============================================
// HEALING SANCTUARIES — MAIN ENTRY POINT
// Initializes shared systems per site
// ============================================

import { initLenis } from './utils/scroll.js';
import { initScrollReveals, initParallax, initSectionReveals, initMagneticButtons, initTextSplits, refreshScrollTrigger } from './utils/motion.js';
import {
  initVisitorModal,
  initOutcomeTracker,
  initEmergencyReset,
  initDetoxMode,
  initTranslation,
  addStructuredData,
} from './utils/meta-layers.js';

// --- Initialize Core Systems ---
function init() {
  // Lenis smooth scroll
  initLenis();

  // GSAP motion systems
  initScrollReveals();
  initParallax();
  initSectionReveals();
  initMagneticButtons();
  initTextSplits();

  // Meta-layers
  initVisitorModal();
  initOutcomeTracker();
  initEmergencyReset();
  initDetoxMode();

  // Refresh ScrollTrigger after images load
  window.addEventListener('load', () => {
    refreshScrollTrigger();
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for site-specific scripts
export { initLenis, initScrollReveals, initParallax, initSectionReveals, initMagneticButtons, initTextSplits, refreshScrollTrigger, addStructuredData };
