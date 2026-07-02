/* ═══════════════════════════════════════════════════
   HERBALISM — Script
   Outsider Art Digital × Botanical Dark
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Hero Image Sequence Scrub ─────────────────── */
  const hero = document.getElementById('hero');
  const frames = document.querySelectorAll('.hero-frame');
  const progressBar = document.getElementById('heroProgress');
  const totalFrames = frames.length;

  function updateHeroSequence() {
    const rect = hero.getBoundingClientRect();
    const scrolled = -rect.top;
    const maxScroll = rect.height - window.innerHeight;
    const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

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
  }

  /* ── Scroll Reveal (IntersectionObserver) ──────── */
  const revealElements = document.querySelectorAll(
    '.section-label, .section-title, .section-body, ' +
    '.detail, .practice-card, .pillar, .testimonial, ' +
    '.journey-step, .contact-address, .contact-hours, .contact-cta'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ── Digital Herbarium — Specimen Slide-In ─────── */
  const specimens = document.querySelectorAll('.specimen');

  const specimenObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
  );

  specimens.forEach(s => specimenObserver.observe(s));

  /* ── Bottom Nav Active State ───────────────────── */
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(item => {
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

  sections.forEach(sec => navObserver.observe(sec));

  /* ── Scroll Listeners (passive) ────────────────── */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateHeroSequence();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => updateHeroSequence(), { passive: true });

  /* ── Initial State ─────────────────────────────── */
  updateHeroSequence();

  /* ── Smooth Scroll for Nav ─────────────────────── */
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
