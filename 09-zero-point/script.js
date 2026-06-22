/* ============================================
   ZERO-POINT FIELD HEALING
   Particle System + Scroll Animations
   ============================================ */

(() => {
  'use strict';

  // ---- PARTICLE CANVAS ----
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.speedY = (Math.random() - 0.5) * 0.12;
      this.opacity = Math.random() * 0.4 + 0.05;
      this.pulseSpeed = Math.random() * 0.01 + 0.005;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.drift = Math.random() * 0.3 + 0.1;
      this.waveAmplitude = Math.random() * 0.5 + 0.2;
      this.waveFrequency = Math.random() * 0.003 + 0.001;
      this.time = Math.random() * 1000;
    }

    update() {
      this.time += 1;
      this.pulsePhase += this.pulseSpeed;

      // Gentle wave motion
      this.x += this.speedX + Math.sin(this.time * this.waveFrequency) * this.waveAmplitude * 0.1;
      this.y += this.speedY - this.drift * 0.05;

      // Pulse opacity
      const pulse = Math.sin(this.pulsePhase) * 0.15;
      this.currentOpacity = Math.max(0.02, this.opacity + pulse);

      // Wrap around
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.currentOpacity})`;
      ctx.fill();

      // Glow effect
      if (this.size > 1) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.currentOpacity * 0.15})`;
        ctx.fill();
      }
    }
  }

  function initParticles() {
    resizeCanvas();
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animFrame = requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrame);
    initParticles();
    animateParticles();
  });

  initParticles();
  animateParticles();

  // ---- SCROLL DOT ----
  const scrollDot = document.getElementById('scrollDot');
  const dotCore = scrollDot.querySelector('.scroll-dot__core');

  function updateScrollDot() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    // Move dot vertically
    const maxTravel = window.innerHeight * 0.6;
    const dotY = -maxTravel / 2 + progress * maxTravel;
    scrollDot.style.transform = `translateY(calc(-50% + ${dotY}px))`;

    // Pulse intensity based on progress
    const intensity = 0.4 + progress * 0.6;
    dotCore.style.opacity = intensity;
  }

  window.addEventListener('scroll', updateScrollDot, { passive: true });

  // ---- INTERSECTION OBSERVER ----
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // Observe hero items immediately
  document.querySelectorAll('.hero__content .fade-from-void').forEach(el => {
    observer.observe(el);
  });

  // Observe surface items
  document.querySelectorAll('.surface-from-void').forEach(el => {
    observer.observe(el);
  });

  // ---- HERO ENTRANCE ----
  setTimeout(() => {
    document.querySelectorAll('.hero__content .fade-from-void').forEach(el => {
      el.classList.add('is-visible');
    });
  }, 300);

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- FORM ----
  const form = document.querySelector('.arrival__form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('.arrival__input');
      if (input.value) {
        const btn = form.querySelector('.arrival__btn');
        btn.textContent = 'Connected';
        btn.style.background = 'var(--cyan)';
        btn.style.color = 'var(--ocean)';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Enter the Field';
          btn.style.background = '';
          btn.style.color = '';
        }, 3000);
      }
    });
  }

})();
