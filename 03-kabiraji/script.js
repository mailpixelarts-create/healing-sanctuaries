/* ═══════════════════════════════════════════
   KABIRAJI — Yoga as Sacred Medicine
   GSAP-Powered Script
   ═══════════════════════════════════════════ */

import { gsap, ScrollTrigger, initScrollReveals, initParallax, initSectionReveals, refreshScrollTrigger } from '../src/utils/motion.js';

(function () {
  'use strict';

  // ─── Reduced Motion Check ───
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Chakra Wheel Navigation ───
  const toggle = document.getElementById('chakraToggle');
  const wheel = document.getElementById('chakraWheel');

  if (toggle && wheel) {
    toggle.addEventListener('click', () => {
      wheel.classList.toggle('open');
    });

    wheel.querySelectorAll('.chakra-petal').forEach((petal) => {
      petal.addEventListener('click', () => {
        wheel.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.chakra-nav') && wheel.classList.contains('open')) {
        wheel.classList.remove('open');
      }
    });
  }

  // ─── Hero Canvas — Chakra Wheel Animation ───
  const canvas = document.getElementById('heroCanvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let W, H, time = 0;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Chakra colors
    const chakraColors = [
      { r: 193, g: 39, b: 45 },    // Root — red
      { r: 232, g: 93, b: 4 },     // Sacral — orange
      { r: 212, g: 168, b: 67 },   // Solar — yellow
      { r: 58, g: 125, b: 68 },    // Heart — green
      { r: 46, g: 107, b: 158 },   // Throat — blue
      { r: 75, g: 0, b: 130 },     // Third Eye — indigo
      { r: 139, g: 92, b: 246 },   // Crown — violet
    ];

    const PETAL_COUNT = 7;
    const petals = [];

    for (let i = 0; i < PETAL_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / PETAL_COUNT - Math.PI / 2;
      petals.push({
        baseAngle: angle,
        color: chakraColors[i],
        radius: 0,
        targetRadius: 0,
        pulsePhase: i * 0.9,
        orbitRadius: 0,
      });
    }

    function drawChakraWheel(t) {
      ctx.clearRect(0, 0, W, H);

      const centerX = W * 0.5;
      const centerY = H * 0.5;
      const baseRadius = Math.min(W, H) * 0.15;
      const petalSize = Math.min(W, H) * 0.055;

      // Outer ring — organic morph
      const ringAlpha = 0.06 + Math.sin(t * 0.2) * 0.02;
      ctx.strokeStyle = `rgba(232, 93, 4, ${ringAlpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= 360; i++) {
        const angle = (i * Math.PI) / 180;
        const noise =
          Math.sin(angle * 3 + t * 0.4) * 0.08 +
          Math.cos(angle * 5 + t * 0.25) * 0.05 +
          Math.sin(angle * 7 + t * 0.6) * 0.03;
        const r = baseRadius * (1.6 + noise);
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      for (let i = 0; i <= 360; i++) {
        const angle = (i * Math.PI) / 180;
        const noise =
          Math.sin(angle * 4 + t * 0.3) * 0.06 +
          Math.cos(angle * 6 + t * 0.5) * 0.04;
        const r = baseRadius * (0.8 + noise);
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Center dot
      const centerAlpha = 0.15 + Math.sin(t * 0.5) * 0.05;
      ctx.fillStyle = `rgba(232, 93, 4, ${centerAlpha})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw petals
      for (let i = 0; i < PETAL_COUNT; i++) {
        const petal = petals[i];
        const orbitSpeed = 0.15;
        const currentAngle = petal.baseAngle + t * orbitSpeed;
        const pulseRadius = baseRadius * (1 + Math.sin(t * 0.4 + petal.pulsePhase) * 0.12);
        const orbitR = pulseRadius;

        const px = centerX + Math.cos(currentAngle) * orbitR;
        const py = centerY + Math.sin(currentAngle) * orbitR;

        // Petal glow
        const glowSize = petalSize * (1.3 + Math.sin(t * 0.6 + petal.pulsePhase) * 0.25);
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, glowSize);
        const c = petal.color;
        gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, 0.35)`);
        gradient.addColorStop(0.5, `rgba(${c.r}, ${c.g}, ${c.b}, 0.12)`);
        gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Petal core — organic morph blob
        const coreSize = petalSize * (0.5 + Math.sin(t * 0.5 + petal.pulsePhase) * 0.1);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.6)`;
        ctx.beginPath();
        const segments = 12;
        for (let s = 0; s <= segments; s++) {
          const segAngle = (Math.PI * 2 * s) / segments;
          const noise =
            Math.sin(segAngle * 3 + t * 0.8 + i) * 0.2 +
            Math.cos(segAngle * 5 + t * 0.4 + i * 2) * 0.1;
          const sr = coreSize * (1 + noise);
          const sx = px + Math.cos(segAngle) * sr;
          const sy = py + Math.sin(segAngle) * sr;
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fill();

        // Connecting line to center
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.08)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      // Organic morphing body silhouette (faint)
      const bodyAlpha = 0.04 + Math.sin(t * 0.15) * 0.015;
      ctx.fillStyle = `rgba(232, 93, 4, ${bodyAlpha})`;
      const bodyPts = [];
      const bodyCount = 16;
      for (let i = 0; i < bodyCount; i++) {
        const angle = (Math.PI * 2 * i) / bodyCount;
        const noise =
          Math.sin(angle * 2 + t * 0.2) * 0.2 +
          Math.cos(angle * 3 + t * 0.35) * 0.15 +
          Math.sin(angle * 5 + t * 0.5) * 0.08;
        const r = baseRadius * (2.2 + noise);
        bodyPts.push({
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r,
        });
      }
      ctx.beginPath();
      ctx.moveTo(bodyPts[0].x, bodyPts[0].y);
      for (let i = 0; i < bodyPts.length; i++) {
        const next = bodyPts[(i + 1) % bodyPts.length];
        const cpx = (bodyPts[i].x + next.x) / 2;
        const cpy = (bodyPts[i].y + next.y) / 2;
        ctx.quadraticCurveTo(bodyPts[i].x, bodyPts[i].y, cpx, cpy);
      }
      ctx.closePath();
      ctx.fill();
    }

    function animate() {
      time += 0.016;
      drawChakraWheel(time);
      requestAnimationFrame(animate);
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      // Static fallback
      drawChakraWheel(0);
    }
  }

  // ─── Hero Parallax ───
  if (!prefersReducedMotion) {
    gsap.to('.hero-content', {
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

    gsap.to('#heroCanvas', {
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // ─── Scroll Hint Fade ───
  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      const hero = document.getElementById('hero');
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      scrollHint.style.opacity = 1 - progress * 3;
    });
  }

  // ─── Section Reveals ───
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  // ─── GSAP Stagger Reveals for Cards ───
  if (!prefersReducedMotion) {
    // Art cards stagger
    gsap.from('.art-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.art-cards',
        start: 'top 80%',
        once: true,
      },
    });

    // Process steps stagger
    gsap.from('.process-step', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.process-steps',
        start: 'top 80%',
        once: true,
      },
    });

    // Testimonials stagger
    gsap.from('.testimonial', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.testimonial-grid',
        start: 'top 80%',
        once: true,
      },
    });

    // FAQ items stagger
    gsap.from('.faq-item', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.faq-list',
        start: 'top 85%',
        once: true,
      },
    });

    // Event cards stagger
    gsap.from('.event-card', {
      y: 30,
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

    // Vow parallax float
    gsap.from('.vow-text', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.vow',
        start: 'top 75%',
        once: true,
      },
    });

    // Gift section reveal
    gsap.from('.gift-title, .gift-text, .gift .cta-btn', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.gift',
        start: 'top 80%',
        once: true,
      },
    });

    // Mechanism items stagger
    gsap.from('.mechanism-item', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.mechanism-details',
        start: 'top 80%',
        once: true,
      },
    });
  }

  // ─── Refresh ScrollTrigger after fonts/images load ───
  window.addEventListener('load', () => {
    refreshScrollTrigger();
  });

})();
