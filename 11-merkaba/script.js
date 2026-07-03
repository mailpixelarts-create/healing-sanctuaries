/* ═══════════════════════════════════════════════════
   HERBALISM — Botanical Dark Process
   GSAP-Powered Scroll-Driven Hero + Section Reveals
   ═══════════════════════════════════════════════════ */

import { gsap, ScrollTrigger } from '../src/utils/motion.js';

gsap.registerPlugin(ScrollTrigger);

/* ── Hero: 600vh Scroll-Driven Image Sequence ─── */
function initHeroSequence() {
  const hero = document.getElementById('hero');
  const frames = document.querySelectorAll('.hero-frame');
  const progressBar = document.getElementById('heroProgress');
  const totalFrames = frames.length;

  if (!hero || !frames.length) return;

  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const frameIndex = Math.min(
        Math.floor(progress * totalFrames),
        totalFrames - 1
      );

      frames.forEach((frame, i) => {
        frame.classList.toggle('active', i === frameIndex);
      });

      if (progressBar) {
        progressBar.style.width = (progress * 100) + '%';
      }
    },
  });
}

/* ── Scroll Reveal (IntersectionObserver) ──────── */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(
    '.section-label, .section-title, .section-body, ' +
    '.detail, .service-card, .process-card, .testimonial, ' +
    '.faq-item, .event-card, .gift-card, .contact-address, ' +
    '.contact-hours, .contact-cta, .vow-block'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ── Bottom Nav Active State (IntersectionObserver) ── */
function initBottomNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach((item) => {
            item.classList.toggle(
              'active',
              item.getAttribute('data-section') === id
            );
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* ── Smooth Scroll for Nav ─────────────────────── */
function initSmoothScroll() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ── Section Stagger Reveals (GSAP) ────────────── */
function initSectionStagger() {
  // Stagger process cards
  gsap.from('.process-card', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.process-steps',
      start: 'top 80%',
      once: true,
    },
  });

  // Stagger service cards
  gsap.from('.service-card', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%',
      once: true,
    },
  });

  // Stagger testimonials
  gsap.from('.testimonial', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.testimonials-grid',
      start: 'top 80%',
      once: true,
    },
  });

  // Stagger event cards
  gsap.from('.event-card', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.events-grid',
      start: 'top 80%',
      once: true,
    },
  });

  // Stagger FAQ items
  gsap.from('.faq-item', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.faq-list',
      start: 'top 80%',
      once: true,
    },
  });

  // Stagger about details
  gsap.from('.detail', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.about-details',
      start: 'top 85%',
      once: true,
    },
  });
}

/* ── Vow Parallax ──────────────────────────────── */
function initVowParallax() {
  const vowText = document.querySelector('.vow-text');
  if (!vowText) return;

  gsap.from(vowText, {
    x: -30,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '#vow',
      start: 'top 75%',
      once: true,
    },
  });
}

/* ── Mechanism Step Reveal ─────────────────────── */
function initMechanismReveal() {
  gsap.from('.mechanism-step', {
    y: 40,
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.mechanism-diagram',
      start: 'top 80%',
      once: true,
    },
  });
}

/* ── Footer Reveal ─────────────────────────────── */
function initFooterReveal() {
  gsap.from('.footer__inner > *', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%',
      once: true,
    },
  });
}

/* ── Initialize Everything ─────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeroSequence();
  initScrollReveals();
  initBottomNav();
  initSmoothScroll();
  initSectionStagger();
  initVowParallax();
  initMechanismReveal();
  initFooterReveal();
});
