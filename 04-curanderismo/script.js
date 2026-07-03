// ============================================
// 04-CURANDERISMO — MEDITATION: WABI-SABI PRECISION
// Signature Interaction: SVG noise grain overlay + hero words expand/glow on hover
// "One memorable interaction. Not many. One."
// ============================================

import { gsap, ScrollTrigger, initSectionReveals, refreshScrollTrigger } from '../src/utils/motion.js';

// ============================================
// FILM GRAIN OVERLAY — SVG noise at 3% opacity
// ============================================
function initGrainOverlay() {
  const overlay = document.getElementById('grainOverlay');
  if (!overlay) return;

  let frame = 0;

  function animateGrain() {
    frame++;
    // Shift the SVG turbulence seed every 4 frames for subtle grain movement
    if (frame % 4 === 0) {
      const turbulence = overlay.querySelector('feTurbulence');
      if (turbulence) {
        turbulence.setAttribute('seed', Math.floor(Math.random() * 100));
      }
    }
    requestAnimationFrame(animateGrain);
  }

  animateGrain();

  // Respect reduced motion
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    const turbulence = overlay.querySelector('feTurbulence');
    if (turbulence) turbulence.setAttribute('seed', '0');
  }
}

// ============================================
// NAVIGATION — Tracking + Mobile
// ============================================
function initNavTracking() {
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.top-nav__link');
  const topNav = document.getElementById('topNav');
  let lastScroll = 0;

  // Active section tracking
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

  // Hide/show nav on scroll
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 200) {
      topNav.classList.toggle('is-hidden', currentScroll > lastScroll && currentScroll > 400);
    } else {
      topNav.classList.remove('is-hidden');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile menu toggle
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        toggle.classList.remove('is-active');
      });
    });
  }

  // Smooth scroll for all nav links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// HERO — Parallax + Word Interactions
// ============================================
function initHero() {
  const heroContent = document.querySelector('.hero__content');
  const heroWords = document.querySelectorAll('.hero-word');

  if (heroContent) {
    // Parallax on scroll
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

  // Hero word hover — expand + glow + reveal word
  heroWords.forEach((word) => {
    word.addEventListener('mouseenter', () => {
      gsap.to(word, {
        scale: 1.15,
        color: '#D62828',
        textShadow: '0 0 60px rgba(214, 40, 40, 0.5)',
        duration: 0.5,
        ease: 'expo.out',
      });
    });

    word.addEventListener('mouseleave', () => {
      gsap.to(word, {
        scale: 1,
        color: '#FCF9F2',
        textShadow: '0 0 0px rgba(214, 40, 40, 0)',
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });

  // Mouse parallax on hero words
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateHeroMouse() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    heroWords.forEach((word, index) => {
      const deltaX = (currentX - window.innerWidth / 2) * 0.08 * (index + 1);
      const deltaY = (currentY - window.innerHeight / 2) * 0.08 * (index + 1);
      word.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    requestAnimationFrame(animateHeroMouse);
  }

  // Only run mouse parallax on desktop
  if (window.innerWidth > 768) {
    animateHeroMouse();
  }
}

// ============================================
// SECTION REVEALS — GSAP powered
// ============================================
function initScrollAnimations() {
  initSectionReveals();

  // Refresh after fonts load
  if (document.fonts) {
    document.fonts.ready.then(() => {
      setTimeout(refreshScrollTrigger, 100);
    });
  }

  window.addEventListener('load', () => {
    setTimeout(refreshScrollTrigger, 200);
  });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      // Show success feedback
      const btn = form.querySelector('.contact__submit');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent';
      btn.style.background = '#D62828';
      btn.style.borderColor = '#D62828';
      btn.style.color = '#FCF9F2';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    }
  });
}

// ============================================
// INITIALIZE
// ============================================
function init() {
  initGrainOverlay();
  initNavTracking();
  initHero();
  initScrollAnimations();
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
