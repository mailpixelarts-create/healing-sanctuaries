// ============================================
// 07-ENOCHIAN — AROMATHERAPY: BOTANICAL QUIET
// Signature Interaction: Olfactory Memory Test
// "The Nose Knows the Soul."
// ============================================

import { gsap, ScrollTrigger, initSectionReveals, initParallax, refreshScrollTrigger } from '../src/utils/motion.js';

// --- Amber Particle System ---
class AmberParticle {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.15;
    this.speedY = -Math.random() * 0.3 - 0.05;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.hue = Math.random() * 20 + 28;
    this.life = 0;
    this.maxLife = Math.random() * 400 + 200;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;

    // Gentle sine drift
    this.x += Math.sin(this.life * 0.01) * 0.2;

    // Fade in and out over life
    const lifeRatio = this.life / this.maxLife;
    if (lifeRatio < 0.1) {
      this.opacity = lifeRatio * 4 * (Math.random() * 0.3 + 0.2);
    } else if (lifeRatio > 0.7) {
      this.opacity = (1 - lifeRatio) * 3.33 * (Math.random() * 0.3 + 0.2);
    }

    // Reset when off screen or life expired
    if (this.y < -10 || this.life > this.maxLife) {
      this.reset();
      this.y = this.canvas.height + 10;
    }
    if (this.x < -10) this.x = this.canvas.width + 10;
    if (this.x > this.canvas.width + 10) this.x = -10;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `hsla(${this.hue}, 55%, 65%, ${this.opacity})`;
    this.ctx.fill();
  }
}

// --- Initialize Amber Canvas ---
function initAmberCanvas() {
  const canvas = document.getElementById('amber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
    for (let i = 0; i < count; i++) {
      const p = new AmberParticle(canvas, ctx);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

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

// --- Circular Navigation Toggle ---
function initCircularNav() {
  const toggle = document.getElementById('navToggle');
  const overlay = document.getElementById('navOverlay');
  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('is-active');
    if (isOpen) {
      overlay.classList.remove('is-active');
      toggle.classList.remove('is-open');
      document.body.style.overflow = '';
    } else {
      overlay.classList.add('is-active');
      toggle.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close on link click
  overlay.querySelectorAll('.nav-overlay__link').forEach((link) => {
    link.addEventListener('click', () => {
      overlay.classList.remove('is-active');
      toggle.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      overlay.classList.remove('is-active');
      toggle.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

// --- Olfactory Memory Test ---
function initOlfactoryMemoryTest() {
  const scentBtns = document.querySelectorAll('.scent-btn');
  const memoryText = document.getElementById('memoryText');
  const memoryOutput = document.getElementById('memoryOutput');
  if (!scentBtns.length || !memoryText || !memoryOutput) return;

  const scentMemories = {
    lavender: 'A field stretches before you, violet and endless. You were safe here, once. Your body remembers what your mind has filed away — the warmth of afternoon sun on your skin, the hum of bees, the exact weight of a summer afternoon pressing gently on your eyelids.',
    cedar: 'Wood and earth and shelter. A cabin, perhaps. Or a childhood closet where forbidden things were kept. The scent of protection, of walls that have stood for centuries. You are inside something ancient and you are small and that is exactly right.',
    jasmine: 'Night-blooming. A garden gate left ajar. The air is thick with a sweetness that borders on forbidden. Someone is waiting for you on the other side. You have been here before — in a dream, perhaps, or in a life you have not yet lived.',
    mint: 'Clarity. A sudden awakeness. The moment you understood something important, or the breath just before understanding arrives. Cold air on wet grass. The mind, suddenly, is very quiet.',
    rose: 'Time folds. You are simultaneously five years old and a thousand. The oldest scent in the world. Grandmothers and goddesses. The colour of love before it had a name. Your chest opens. You did not know it was closed.',
    sage: 'Smoke and ceremony. Something is being released. A room is being cleared, a chapter closed. You stand in the doorway between what was and what will be. The air tastes of permission.',
  };

  scentBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const scent = btn.dataset.scent;

      // Remove active from all
      scentBtns.forEach((b) => b.classList.remove('is-active'));

      // Activate clicked
      btn.classList.add('is-active');

      // Animate memory text
      memoryOutput.classList.remove('is-visible');
      memoryText.textContent = '';

      setTimeout(() => {
        memoryText.textContent = scentMemories[scent] || '';
        memoryOutput.classList.add('is-visible');

        // GSAP text reveal
        gsap.from(memoryText, {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
        });
      }, 300);
    });
  });
}

// --- Breathing Timer ---
function initBreathingTimer() {
  const btn = document.getElementById('timerBtn');
  const text = document.getElementById('timerText');
  const circle = document.getElementById('timerCircle');
  if (!btn || !text || !circle) return;

  let isBreathing = false;
  let timeout;

  btn.addEventListener('click', () => {
    if (!isBreathing) {
      startBreathing();
    } else {
      stopBreathing();
    }
  });

  function startBreathing() {
    isBreathing = true;
    btn.textContent = 'Stop';
    cycle();
  }

  function stopBreathing() {
    isBreathing = false;
    btn.textContent = 'Start Breathing';
    text.textContent = 'Begin';
    circle.classList.remove('is-inhaling', 'is-exhaling');
    clearTimeout(timeout);
  }

  function cycle() {
    if (!isBreathing) return;

    // Inhale
    circle.classList.remove('is-exhaling');
    circle.classList.add('is-inhaling');
    text.textContent = 'Inhale';

    timeout = setTimeout(() => {
      if (!isBreathing) return;

      // Hold
      text.textContent = 'Hold';

      timeout = setTimeout(() => {
        if (!isBreathing) return;

        // Exhale
        circle.classList.remove('is-inhaling');
        circle.classList.add('is-exhaling');
        text.textContent = 'Exhale';

        timeout = setTimeout(() => {
          if (!isBreathing) return;
          cycle();
        }, 5000);
      }, 2000);
    }, 5000);
  }
}

// --- GSAP Scroll Animations ---
function initScrollAnimations() {
  // Hero parallax on scroll
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      y: 100,
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

  // Section reveals
  initSectionReveals();

  // Parallax on about visual
  const aboutVisual = document.querySelector('.about-visual');
  if (aboutVisual) {
    gsap.from(aboutVisual, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top 80%',
        once: true,
      },
    });
  }

  // Service card hover tilt
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

  // Pathway chart stagger
  const pathwayNodes = document.querySelectorAll('.pathway-node');
  if (pathwayNodes.length) {
    gsap.from(pathwayNodes, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.pathway-chart',
        start: 'top 80%',
        once: true,
      },
    });
  }

  // Process steps stagger
  const processSteps = document.querySelectorAll('.process-step');
  if (processSteps.length) {
    gsap.from(processSteps, {
      y: 30,
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
  }

  // Refresh after everything loads
  window.addEventListener('load', () => {
    setTimeout(refreshScrollTrigger, 100);
  });
}

// --- Initialize Everything ---
function init() {
  initAmberCanvas();
  initCircularNav();
  initOlfactoryMemoryTest();
  initBreathingTimer();
  initScrollAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
