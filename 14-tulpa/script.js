// ============================================
// 14-TULPA — ART THERAPY: MAXIMALIST OUTSIDER
// GSAP-powered. Signature: Finger-paint canvas.
// Grid collapse hero. Glitch effects.
// ============================================

import { gsap, ScrollTrigger, initSectionReveals, refreshScrollTrigger } from '../src/utils/motion.js';

const SIGNALS = ['#FF3366', '#33FF66', '#3366FF'];

// --- Grid Collapse Hero (4x4 tiles with 3D rotation) ---
function initGridCollapse() {
  const grid = document.getElementById('heroGrid');
  const heroCanvas = document.getElementById('heroCanvas');
  const heroContent = document.getElementById('heroContent');
  if (!grid) return;

  const ctx = heroCanvas.getContext('2d');
  heroCanvas.width = window.innerWidth;
  heroCanvas.height = window.innerHeight;

  // Paint colorful squares on hero canvas
  for (let i = 0; i < 16; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const w = heroCanvas.width / 4;
    const h = heroCanvas.height / 4;
    const x = col * w;
    const y = row * h;

    ctx.fillStyle = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
    ctx.globalAlpha = 0.85;
    ctx.fillRect(x, y, w, h);

    // Brush stroke texture
    ctx.globalAlpha = 0.4;
    for (let s = 0; s < 6; s++) {
      ctx.fillStyle = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
      const sx = x + Math.random() * w * 0.6;
      const sy = y + Math.random() * h * 0.6;
      const sw = w * 0.3 + Math.random() * w * 0.5;
      const sh = h * 0.08 + Math.random() * h * 0.12;
      ctx.save();
      ctx.translate(sx + sw / 2, sy + sh / 2);
      ctx.rotate((Math.random() - 0.5) * 0.6);
      ctx.fillRect(-sw / 2, -sh / 2, sw, sh);
      ctx.restore();
    }
  }
  ctx.globalAlpha = 1;

  // Create grid tiles
  const tiles = [];
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement('div');
    tile.className = 'grid-tile';
    tile.style.background = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];

    // Random rotation parameters for collapse
    const rx = (Math.random() - 0.5) * 60;
    const ry = (Math.random() - 0.5) * 60;
    tile.style.setProperty('--rx', rx + 'deg');
    tile.style.setProperty('--ry', ry + 'deg');
    tile.style.setProperty('--rx-end', (rx > 0 ? 90 : -90) + 'deg');
    tile.style.setProperty('--ry-end', (ry > 0 ? 60 : -60) + 'deg');

    grid.appendChild(tile);
    tiles.push({ el: tile, delay: i * 80 + Math.random() * 200 });
  }

  // Staggered collapse using GSAP
  const tl = gsap.timeline({
    onComplete: () => {
      heroContent.classList.add('visible');
      triggerGlitch();
    }
  });

  tiles.forEach(({ el, delay }) => {
    tl.to(el, {
      duration: 0.8,
      delay: delay / 1000,
    }, 0);

    tl.add(() => el.classList.add('collapse'), delay / 1000);
  });

  // Hero content fade in
  tl.to(heroContent, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, tl.duration() + 0.3);
}

// --- Finger-Paint Canvas (Full-Page Mouse/Touch Drawing) ---
function initFingerPaint() {
  const canvas = document.getElementById('fingerPaint');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let currentColor = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
  let brushSize = 25;

  function resize() {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.putImageData(data, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw(x, y) {
    if (!isDrawing) return;

    // Main stroke
    ctx.globalAlpha = 0.12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.stroke();

    // Secondary blurred stroke
    ctx.globalAlpha = 0.06;
    ctx.beginPath();
    ctx.moveTo(
      lastX + (Math.random() - 0.5) * 20,
      lastY + (Math.random() - 0.5) * 20
    );
    ctx.lineTo(
      x + (Math.random() - 0.5) * 20,
      y + (Math.random() - 0.5) * 20
    );
    ctx.strokeStyle = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
    ctx.lineWidth = brushSize * 1.8;
    ctx.stroke();

    // Tertiary feathered stroke
    ctx.globalAlpha = 0.03;
    ctx.beginPath();
    ctx.arc(
      x + (Math.random() - 0.5) * 30,
      y + (Math.random() - 0.5) * 30,
      brushSize * 0.8,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
    ctx.fill();

    ctx.globalAlpha = 1;

    lastX = x;
    lastY = y;

    // Random color shift between the 3 neon signals
    if (Math.random() < 0.015) {
      currentColor = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
    }
    if (Math.random() < 0.008) {
      brushSize = 15 + Math.random() * 40;
    }
  }

  // Mouse events
  document.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.clientX;
    lastY = e.clientY;
    currentColor = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
    brushSize = 20 + Math.random() * 30;
  });

  document.addEventListener('mousemove', (e) => draw(e.clientX, e.clientY));
  document.addEventListener('mouseup', () => { isDrawing = false; });

  // Touch events
  document.addEventListener('touchstart', (e) => {
    isDrawing = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    currentColor = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
    brushSize = 20 + Math.random() * 30;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    const touch = e.touches[0];
    draw(touch.clientX, touch.clientY);
  }, { passive: true });

  document.addEventListener('touchend', () => { isDrawing = false; });
}

// --- Glitch Effect ---
function triggerGlitch() {
  document.body.classList.add('glitch-active');
  setTimeout(() => document.body.classList.remove('glitch-active'), 800);
}

function scheduleGlitches() {
  setInterval(() => {
    if (Math.random() < 0.25) triggerGlitch();
  }, 6000);
}

// --- Section Label Glitch ---
function initLabelGlitch() {
  const labels = document.querySelectorAll('.section-label');
  labels.forEach(label => {
    // Random color shifts on scroll
    ScrollTrigger.create({
      trigger: label,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(label, {
          duration: 0.1,
          x: () => (Math.random() - 0.5) * 10,
          y: () => (Math.random() - 0.5) * 5,
          repeat: 5,
          yoyo: true,
          onComplete: () => {
            gsap.set(label, { x: 0, y: 0 });
          }
        });
      },
      once: true
    });
  });
}

// --- GSAP Scroll Animations ---
function initScrollAnimations() {
  // Hero parallax on scroll
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      y: 60,
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

  // Section reveals with stagger
  initSectionReveals();

  // Service card hover tilt
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        rotationY: 3,
        rotationX: -2,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });

  // Testimonial slight rotation on scroll
  document.querySelectorAll('.testimonial').forEach((t, i) => {
    gsap.from(t, {
      rotation: (i % 2 === 0 ? -3 : 3),
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: t,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Vow quote entrance
  const vowQuote = document.querySelector('.vow-quote');
  if (vowQuote) {
    gsap.from(vowQuote, {
      scale: 0.9,
      opacity: 0,
      rotation: -3,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: vowQuote,
        start: 'top 80%',
        once: true,
      },
    });
  }

  // FAQ items stagger
  document.querySelectorAll('.faq-item').forEach((item, i) => {
    gsap.from(item, {
      x: i % 2 === 0 ? -30 : 30,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Event cards entrance
  document.querySelectorAll('.event-card').forEach((card, i) => {
    gsap.from(card, {
      y: 50,
      opacity: 0,
      rotation: i % 2 === 0 ? -2 : 2,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Refresh after everything loads
  window.addEventListener('load', () => {
    setTimeout(refreshScrollTrigger, 100);
  });
}

// --- Initialize Everything ---
function init() {
  initFingerPaint();
  scheduleGlitches();
  initLabelGlitch();
  initScrollAnimations();
  setTimeout(initGridCollapse, 300);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
