// ============================================
// 02-DAODE — SOUND HEALING: DEEP OCEAN KINETIC
// Signature Interaction: Waveform visualizer
// ============================================

import { gsap, ScrollTrigger, initSectionReveals, refreshScrollTrigger } from '../src/utils/motion.js';

// --- Waveform Canvas ---
function initWaveformCanvas() {
  const canvas = document.getElementById('waveform-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  let time = 0;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = canvas.height / 2;
    const amplitude = 60;
    const frequency = 0.008;
    const speed = 0.02;

    // Draw multiple waveform layers
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      const layerOffset = layer * 0.5;
      const layerOpacity = 0.15 - layer * 0.04;

      for (let x = 0; x < canvas.width; x++) {
        const y = centerY +
          Math.sin((x * frequency) + time + layerOffset) * amplitude * (1 - layer * 0.3) +
          Math.sin((x * frequency * 2.3) + time * 1.5 + layerOffset) * (amplitude * 0.3);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = `rgba(0, 240, 255, ${layerOpacity})`;
      ctx.lineWidth = 1.5 - layer * 0.3;
      ctx.stroke();
    }

    // Draw floating particles
    for (let i = 0; i < 30; i++) {
      const x = (Math.sin(time * 0.3 + i * 0.7) * 0.5 + 0.5) * canvas.width;
      const y = (Math.cos(time * 0.2 + i * 1.1) * 0.5 + 0.5) * canvas.height;
      const size = Math.sin(time + i) * 1.5 + 1.5;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${0.1 + Math.sin(time + i) * 0.05})`;
      ctx.fill();
    }

    time += speed;
    animationId = requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener('resize', resize);

  // Pause on reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cancelAnimationFrame(animationId);
  }
}

// --- Loading Screen ---
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 2000);
  });
}

// --- Nav Scroll Effect ---
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 80);
  });
}

// --- Active Nav Tracking ---
function initNavTracking() {
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// --- GSAP Scroll Animations ---
function initScrollAnimations() {
  // Hero parallax
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      y: 80,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  initSectionReveals();

  window.addEventListener('load', () => {
    setTimeout(refreshScrollTrigger, 100);
  });
}

// --- Initialize ---
function init() {
  initLoader();
  initWaveformCanvas();
  initNavScroll();
  initNavTracking();
  initScrollAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
