// ============================================
// 05-LABYRINTH — BREATHWORK: CLINICAL PRECISION
// GSAP-powered animations, 4-7-8 breathing pacer
// ============================================

import { gsap, ScrollTrigger, initScrollReveals, initSectionReveals, initMagneticButtons, refreshScrollTrigger } from '../src/utils/motion.js';

// --- DOM Elements ---
const nav = document.getElementById('nav');
const breathCounter = document.getElementById('breathCounter');
const pacerShape = document.getElementById('pacerShape');
const pacerTimer = document.getElementById('pacerTimer');
const pacerToggle = document.getElementById('pacerToggle');
const pacerInstruction = document.getElementById('pacerInstruction');
const glowBar = document.getElementById('glowBar');
const glowOverlay = document.getElementById('glowOverlay');
const countInhale = document.getElementById('countInhale');
const countHold = document.getElementById('countHold');
const countExhale = document.getElementById('countExhale');
const mobileToggle = document.getElementById('mobileToggle');

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});

// --- Navigation Scroll ---
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 80) {
    nav.classList.add('is-scrolled');
  } else {
    nav.classList.remove('is-scrolled');
  }
  lastScroll = currentScroll;
});

// --- Mobile Navigation ---
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    const links = document.querySelector('.nav__links');
    if (links) {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.position = 'absolute';
      links.style.top = '100%';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = 'rgba(10,10,10,0.95)';
      links.style.flexDirection = 'column';
      links.style.padding = '1rem 2rem';
      links.style.gap = '1rem';
      links.style.borderBottom = '1px solid rgba(255,0,85,0.12)';
    }
  });
}

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Contact Form ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (name && email && message) {
      alert('Your message has been received. We will respond within 24 hours.');
      contactForm.reset();
    }
  });
}

// --- Breaths Counter Animation ---
let counterValue = 0;
const targetValue = 21000;

function animateCounter() {
  const duration = 4000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counterValue = Math.floor(eased * targetValue);
    breathCounter.textContent = counterValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counterValue = targetValue;
      breathCounter.textContent = targetValue.toLocaleString();
      gsap.to(breathCounter, {
        color: '#FF0055',
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }

  requestAnimationFrame(update);
}

// --- 4-7-8 Breathing Pacer ---
let isPacerRunning = false;
let glowLevel = 0;
let pacerTimeouts = [];
let pacerIntervals = [];

function clearPacerTimers() {
  pacerTimeouts.forEach(t => clearTimeout(t));
  pacerIntervals.forEach(i => clearInterval(i));
  pacerTimeouts = [];
  pacerIntervals = [];
}

function resetPacerClasses() {
  pacerShape.classList.remove('inhale', 'hold', 'exhale');
  countInhale.classList.remove('active');
  countHold.classList.remove('active');
  countExhale.classList.remove('active');
}

function increaseGlow() {
  glowLevel = Math.min(glowLevel + 8, 100);
  glowBar.style.width = glowLevel + '%';
  glowOverlay.style.opacity = glowLevel / 500;

  if (glowLevel >= 100) {
    glowOverlay.style.opacity = 0.25;
  }
}

function runPacerCycle() {
  if (!isPacerRunning) return;

  // INHALE - 4 seconds
  resetPacerClasses();
  pacerShape.classList.add('inhale');
  countInhale.classList.add('active');
  pacerInstruction.textContent = 'INHALE';

  let inhaleTime = 0;
  const inhaleTimer = setInterval(() => {
    inhaleTime += 0.1;
    pacerTimer.textContent = inhaleTime.toFixed(1);
  }, 100);
  pacerIntervals.push(inhaleTimer);

  pacerTimeouts.push(setTimeout(() => {
    clearInterval(inhaleTimer);
    if (!isPacerRunning) return;

    // HOLD - 7 seconds
    resetPacerClasses();
    pacerShape.classList.add('hold');
    countHold.classList.add('active');
    pacerInstruction.textContent = 'HOLD';

    let holdTime = 0;
    const holdTimer = setInterval(() => {
      holdTime += 0.1;
      pacerTimer.textContent = holdTime.toFixed(1);
    }, 100);
    pacerIntervals.push(holdTimer);

    pacerTimeouts.push(setTimeout(() => {
      clearInterval(holdTimer);
      if (!isPacerRunning) return;

      // EXHALE - 8 seconds
      resetPacerClasses();
      pacerShape.classList.add('exhale');
      countExhale.classList.add('active');
      pacerInstruction.textContent = 'EXHALE';

      let exhaleTime = 0;
      const exhaleTimer = setInterval(() => {
        exhaleTime += 0.1;
        pacerTimer.textContent = exhaleTime.toFixed(1);
      }, 100);
      pacerIntervals.push(exhaleTimer);

      pacerTimeouts.push(setTimeout(() => {
        clearInterval(exhaleTimer);
        if (!isPacerRunning) return;

        increaseGlow();

        // Brief pause before next cycle
        pacerTimeouts.push(setTimeout(() => {
          if (isPacerRunning) {
            runPacerCycle();
          }
        }, 400));
      }, 8000));
    }, 7000));
  }, 4000));
}

function startPacer() {
  if (isPacerRunning) return;
  isPacerRunning = true;
  pacerToggle.textContent = 'STOP';
  pacerInstruction.textContent = 'FOLLOW THE SHAPE';
  runPacerCycle();
}

function stopPacer() {
  isPacerRunning = false;
  clearPacerTimers();
  pacerToggle.textContent = 'START';
  pacerInstruction.textContent = 'TAP TO BEGIN';
  pacerShape.classList.remove('inhale', 'hold', 'exhale');
  countInhale.classList.remove('active');
  countHold.classList.remove('active');
  countExhale.classList.remove('active');
  pacerTimer.textContent = '0.0';
}

pacerToggle.addEventListener('click', () => {
  if (isPacerRunning) {
    stopPacer();
  } else {
    startPacer();
  }
});

// --- GSAP Animations ---
function initAnimations() {
  // Hero entrance
  gsap.from('.hero-label', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.2,
    ease: 'expo.out',
  });

  gsap.from('.hero-title .title-line', {
    opacity: 0,
    y: 40,
    duration: 1.2,
    stagger: 0.15,
    delay: 0.4,
    ease: 'expo.out',
  });

  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.8,
    ease: 'expo.out',
  });

  gsap.from('.counter-container', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1,
    ease: 'expo.out',
  });

  gsap.from('.hero-tagline', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 1.2,
    ease: 'expo.out',
  });

  gsap.from('.hero-scroll', {
    opacity: 0,
    duration: 1,
    delay: 1.5,
    ease: 'expo.out',
  });

  // Counter animation on scroll into view
  ScrollTrigger.create({
    trigger: breathCounter,
    start: 'top 80%',
    once: true,
    onEnter: () => animateCounter(),
  });

  // Section reveals
  initScrollReveals();
  initSectionReveals();
  initMagneticButtons();

  // Custom section animations
  document.querySelectorAll('.section').forEach((section) => {
    const header = section.querySelector('.section-header');
    const content = section.querySelector('.section-inner');

    if (header) {
      gsap.from(header, {
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
      const children = content.querySelectorAll(
        '.about-grid, .mechanism-content, .services-grid, .process-steps, .vow-quote, .pacer-container, .testimonials-grid, .faq-list, .events-grid, .gift-desc, .contact-grid'
      );
      gsap.from(children, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          once: true,
        },
      });
    }
  });

  // Service cards stagger
  ScrollTrigger.create({
    trigger: '.services-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from('.service-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
      });
    },
  });

  // Process steps stagger
  ScrollTrigger.create({
    trigger: '.process-steps',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from('.process-step', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
      });
    },
  });

  // Testimonial items stagger
  ScrollTrigger.create({
    trigger: '.testimonials-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from('.testimonial-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
      });
    },
  });

  // FAQ items stagger
  ScrollTrigger.create({
    trigger: '.faq-list',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from('.faq-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
      });
    },
  });

  // Event cards stagger
  ScrollTrigger.create({
    trigger: '.events-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from('.event-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
      });
    },
  });

  // Vow quote animation
  ScrollTrigger.create({
    trigger: '.vow',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.from('.vow-quote', {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
      });
    },
  });

  // Pacer shape entrance
  ScrollTrigger.create({
    trigger: '.pacer',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.from('.pacer-shape', {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.from('.pacer-toggle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'expo.out',
      });
    },
  });

  // Footer animation
  ScrollTrigger.create({
    trigger: '.footer',
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.from('.footer-quote', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
      });
      gsap.from('.footer-content', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'expo.out',
      });
    },
  });

  // Refresh ScrollTrigger after all animations
  refreshScrollTrigger();
}
