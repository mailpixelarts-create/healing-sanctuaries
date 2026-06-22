/* ============================================
   CRANIOSACRAL THERAPY — Meditative Scripts
   Slow, deliberate, breathing
   ============================================ */

(function () {
  'use strict';

  // ---------- INTERSECTION REVEAL ----------
  // Elements reveal themselves as they enter the viewport
  const revealTargets = [
    '.about-label',
    '.about-name',
    '.about-divider',
    '.about-body',
    '.sacred-label',
    '.sacred-column',
    '.arrival-inner'
  ];

  function setupReveal() {
    const elements = document.querySelectorAll(revealTargets.join(', '));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ---------- QUOTE ROTATOR ----------
  // Slowly cycles through quotes — imperceptible transition
  function setupQuoteRotator() {
    const lines = document.querySelectorAll('.quote-line');
    if (lines.length < 2) return;

    let current = 0;
    const total = lines.length;
    const interval = 8000; // 8 seconds per quote

    setInterval(() => {
      const next = (current + 1) % total;

      lines[current].classList.remove('quote-line--active');
      lines[next].classList.add('quote-line--active');

      current = next;
    }, interval);
  }

  // ---------- HERO PARALLAX FADE ----------
  // Hero content fades and shifts as user scrolls
  function setupHeroFade() {
    const hero = document.querySelector('.hero');
    const word = document.querySelector('.hero-word');
    const tagline = document.querySelector('.hero-tagline');
    const scroll = document.querySelector('.scroll-whisper');

    if (!hero || !word) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;
      const progress = Math.min(scrolled / heroHeight, 1);

      word.style.opacity = 1 - progress * 1.5;
      word.style.transform = `translateY(${progress * -60}px)`;

      if (tagline) {
        tagline.style.opacity = 1 - progress * 2;
      }
      if (scroll) {
        scroll.style.opacity = 1 - progress * 3;
      }
    }, { passive: true });
  }

  // ---------- SACRED COLUMN STAGGER ----------
  // Staggered vertical reveal on sacred columns
  function setupSacredStagger() {
    const columns = document.querySelectorAll('.sacred-column');
    columns.forEach((col, i) => {
      col.style.transitionDelay = `${i * 0.35}s`;
    });
  }

  // ---------- SMOOTH SCROLL BEHAVIOR ----------
  // No hard jumps — everything glides
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---------- GRAIN TEXTURE MOVEMENT ----------
  // Subtle grain parallax on scroll
  function setupGrainShift() {
    const grain = document.querySelector('.hero-grain');
    if (!grain) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          grain.style.transform = `translateY(${scrolled * 0.1}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---------- BREATHING FOOTER ----------
  // Footer text already breathes via CSS
  // This adds a subtle opacity shift on scroll proximity
  function setupFooterBreath() {
    const footer = document.querySelector('.footer-breath');
    const line = document.querySelector('.footer-line');
    if (!footer || !line) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.style.animationPlayState = 'running';
          } else {
            line.style.animationPlayState = 'paused';
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
  }

  // ---------- INIT ----------
  document.addEventListener('DOMContentLoaded', () => {
    setupReveal();
    setupQuoteRotator();
    setupHeroFade();
    setupSacredStagger();
    setupSmoothScroll();
    setupGrainShift();
    setupFooterBreath();
  });
})();
