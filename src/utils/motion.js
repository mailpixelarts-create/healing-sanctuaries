// ============================================
// HEALING SANCTUARIES — SHARED GSAP MOTION
// Section XXI: Motion Doctrine
// "Motion exists to communicate."
// Section XX: Scroll Choreography
// Reveal → Pause → Accelerate → Breathe → Seduce → Expand → Reflect
// ============================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Scroll Reveal System ---
export function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-clip, .reveal-left, .reveal-right, .reveal-rotate, .stagger-children');

  reveals.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => el.classList.add('is-visible'),
      once: true,
    });
  });
}

// --- Parallax System ---
export function initParallax() {
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.3;
    const direction = el.dataset.parallaxDirection || 'y';

    gsap.to(el, {
      y: direction === 'y' ? () => ScrollTrigger.maxScroll(window) * speed * -0.1 : 0,
      x: direction === 'x' ? () => ScrollTrigger.maxScroll(window) * speed * -0.1 : 0,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
}

// --- Stagger Timeline ---
export function createStaggerTimeline(parent, children, options = {}) {
  const defaults = {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: parent,
      start: 'top 80%',
      once: true,
    },
  };

  const config = { ...defaults, ...options };
  const stConfig = config.scrollTrigger;
  delete config.scrollTrigger;

  return gsap.from(children, {
    ...config,
    scrollTrigger: stConfig,
  });
}

// --- Section Reveal (Cinematic) ---
export function initSectionReveals() {
  document.querySelectorAll('.section').forEach((section) => {
    const heading = section.querySelector('.section-heading');
    const content = section.querySelector('.section-content');

    if (heading) {
      gsap.from(heading, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });
    }

    if (content) {
      gsap.from(content, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });
    }
  });
}

// --- Magnetic Button ---
export function initMagneticButtons() {
  document.querySelectorAll('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  });
}

// --- Text Split Animation ---
export function initTextSplits() {
  document.querySelectorAll('.split-text').forEach((el) => {
    const text = el.textContent;
    el.innerHTML = '';
    el.setAttribute('aria-label', text);

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      el.appendChild(span);
    });

    gsap.to(el.querySelectorAll('span'), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

// --- Refresh ScrollTrigger ---
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

// --- Kill all ScrollTriggers ---
export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

export { gsap, ScrollTrigger };
