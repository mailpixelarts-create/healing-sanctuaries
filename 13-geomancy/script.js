/* ============================================
   GEOMANCY — Listening to the Wisdom of the Land
   Earth Particles + Scroll Animations
   ============================================ */

(() => {
  'use strict';

  // ---- EARTH CANVAS ----
  const canvas = document.getElementById('earthCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class EarthParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.08;
      this.speedY = (Math.random() - 0.5) * 0.06;
      this.opacity = Math.random() * 0.3 + 0.05;
      this.pulseSpeed = Math.random() * 0.008 + 0.003;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.drift = Math.random() * 0.2 + 0.05;
      this.waveAmplitude = Math.random() * 0.4 + 0.1;
      this.waveFrequency = Math.random() * 0.002 + 0.001;
      this.time = Math.random() * 1000;
      this.color = this.getColor();
    }

    getColor() {
      const colors = [
        [141, 110, 99],   // earth
        [164, 155, 140],  // sand
        [107, 107, 107],  // stone
        [196, 183, 166],  // sand-light
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.time += 1;
      this.pulsePhase += this.pulseSpeed;

      this.x += this.speedX + Math.sin(this.time * this.waveFrequency) * this.waveAmplitude * 0.08;
      this.y += this.speedY - this.drift * 0.03;

      const pulse = Math.sin(this.pulsePhase) * 0.12;
      this.currentOpacity = Math.max(0.02, this.opacity + pulse);

      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    }

    draw() {
      const [r, g, b] = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity})`;
      ctx.fill();

      if (this.size > 1.2) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity * 0.1})`;
        ctx.fill();
      }
    }
  }

  function initParticles() {
    resizeCanvas();
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
    for (let i = 0; i < count; i++) {
      particles.push(new EarthParticle());
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

  // ---- SCROLL MARKER ----
  const scrollCoord = document.getElementById('scrollCoord');
  const scrollDepth = document.getElementById('scrollDepth');

  const coordinates = [
    'LAT 51.1485° N',
    'LON 2.5953° W',
    'LEY-072',
    'NODE PRIMARY',
    'DEPTH 3.2m',
    'ALIGNMENT 97.4%',
    'EARTH MEMORY',
    'STONE WITNESS'
  ];

  function updateScrollMarker() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    const coordIndex = Math.floor(progress * (coordinates.length - 1));
    if (scrollCoord) {
      scrollCoord.textContent = coordinates[Math.min(coordIndex, coordinates.length - 1)];
    }

    const depth = Math.floor(progress * 32);
    if (scrollDepth) {
      scrollDepth.textContent = `${depth}m`;
    }
  }

  window.addEventListener('scroll', updateScrollMarker, { passive: true });

  // ---- NAVIGATION ----
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function updateNav() {
    const scrollTop = window.pageYOffset;
    if (scrollTop > window.innerHeight * 0.5) {
      nav.classList.add('is-visible');
    } else {
      nav.classList.remove('is-visible');
    }
    lastScroll = scrollTop;
  }

  window.addEventListener('scroll', updateNav, { passive: true });

  // ---- ACTIVE NAV HIGHLIGHT ----
  const navLabels = document.querySelectorAll('.nav__label');
  const sections = ['about', 'sacred', 'philosophy', 'testimonials', 'journey', 'arrival'];

  function updateActiveNav() {
    const scrollTop = window.pageYOffset + window.innerHeight * 0.4;

    let activeIndex = 0;
    sections.forEach((id, i) => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollTop) {
        activeIndex = i;
      }
    });

    navLabels.forEach((label, i) => {
      if (i === activeIndex) {
        label.style.opacity = '1';
      } else {
        label.style.opacity = '';
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

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

  document.querySelectorAll('.hero__content .fade-from-earth').forEach(el => {
    observer.observe(el);
  });

  document.querySelectorAll('.surface-from-earth').forEach(el => {
    observer.observe(el);
  });

  // ---- HERO ENTRANCE ----
  setTimeout(() => {
    document.querySelectorAll('.hero__content .fade-from-earth').forEach(el => {
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
        btn.textContent = 'Aligned';
        btn.style.background = 'var(--earth)';
        btn.style.color = 'var(--soil)';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Align to Earth';
          btn.style.background = '';
          btn.style.color = '';
        }, 3000);
      }
    });
  }

  // ---- MECHANICAL COUNTER ----
  const counters = document.querySelectorAll('.sacred__diagram-label');
  counters.forEach(counter => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counter.style.opacity = '0.7';
        }
      });
    }, { threshold: 0.5 });
    observer.observe(counter);
  });

})();
