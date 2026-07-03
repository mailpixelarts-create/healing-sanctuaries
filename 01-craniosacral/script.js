// ============================================
// 01-CRANIOSACRAL — REIKI: SACRED LUXURY
// Signature Interaction: Aura particle field
// "One memorable interaction. Not many. One."
// ============================================

import { gsap, ScrollTrigger, initSectionReveals, refreshScrollTrigger } from '../src/utils/motion.js';

// --- Aura Particle System ---
class AuraParticle {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.hue = Math.random() * 20 + 35; // Gold range
  }

  update(mouseX, mouseY) {
    // Gentle drift
    this.x += this.speedX;
    this.y += this.speedY;

    // Subtle attraction to mouse
    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200 * 0.02;
        this.x += dx * force;
        this.y += dy * force;
        this.opacity = Math.min(0.8, this.opacity + 0.01);
      }
    }

    // Wrap around edges
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `hsla(${this.hue}, 50%, 60%, ${this.opacity})`;
    this.ctx.fill();
  }
}

// --- Initialize Aura Canvas ---
function initAuraCanvas() {
  const canvas = document.getElementById('aura-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = null;
  let mouseY = null;
  let animationId;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
    for (let i = 0; i < count; i++) {
      particles.push(new AuraParticle(canvas, ctx));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update(mouseX, mouseY);
      p.draw();
    });

    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(40, 50%, 60%, ${0.05 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  // Mouse tracking
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    // Update CSS custom properties for overlay gradient
    canvas.parentElement.style.setProperty('--mouse-x', `${(mouseX / canvas.width) * 100}%`);
    canvas.parentElement.style.setProperty('--mouse-y', `${(mouseY / canvas.height) * 100}%`);
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
  });

  // Initialize
  resize();
  createParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  // Pause on reduced motion
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    cancelAnimationFrame(animationId);
  }
}

// --- Loading Screen ---
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('is-hidden');
    }, 2000);
  });
}

// --- Active Nav Tracking ---
function initNavTracking() {
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.side-nav__link');

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
  // Hero parallax on scroll
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

  // Sacred geometry rotation on scroll
  const geoCircle = document.querySelector('.sacred-geometry');
  if (geoCircle) {
    gsap.to(geoCircle, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }

  // Section reveals with stagger
  initSectionReveals();

  // Service card hover tilt (subtle)
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        rotationY: 2,
        rotationX: -1,
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

  // Refresh after everything loads
  window.addEventListener('load', () => {
    setTimeout(refreshScrollTrigger, 100);
  });
}

// --- Initialize Everything ---
function init() {
  initLoader();
  initAuraCanvas();
  initNavTracking();
  initScrollAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
