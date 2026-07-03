// ============================================
// 13 — GEOMANCY: Qi Gong Sanctuary
// GSAP + Matter.js Physics + Interactive Systems
// ============================================

// --------------------------------------------
// PRELOADER
// --------------------------------------------
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.body.style.overflow = 'hidden';

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initHeroEntrance();
    }, 2200);
  });
}

// --------------------------------------------
// HERO ENTRANCE
// --------------------------------------------
function initHeroEntrance() {
  const title = document.querySelector('.hero-title');
  const tagline = document.querySelector('.hero-tagline');
  const sub = document.querySelector('.hero-sub');

  if (title) {
    gsap.from(title.querySelectorAll('span'), {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'expo.out',
    });
  }
  if (tagline) {
    gsap.from(tagline, { y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: 'expo.out' });
  }
  if (sub) {
    gsap.from(sub, { y: 20, opacity: 0, duration: 0.8, delay: 0.9, ease: 'expo.out' });
  }
}

// --------------------------------------------
// NAVIGATION — Circular Ring
// --------------------------------------------
function initNavRing() {
  const toggle = document.getElementById('navToggle');
  const items = document.getElementById('navItems');
  if (!toggle || !items) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    items.classList.toggle('active');
  });

  items.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      toggle.classList.remove('active');
      items.classList.remove('active');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-ring')) {
      toggle.classList.remove('active');
      items.classList.remove('active');
    }
  });
}

// --------------------------------------------
// MATTER.JS PHYSICS — Falling Q & I
// --------------------------------------------
function initPhysics() {
  const canvas = document.getElementById('physicsCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const { Engine, Render, Runner, Bodies, Body, World, Mouse, MouseConstraint, Events } = Matter;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Engine
  const engine = Engine.create({ gravity: { x: 0, y: 0.6 } });
  const world = engine.world;

  // Renderer
  const render = Render.create({
    canvas,
    engine,
    options: {
      width: canvas.width,
      height: canvas.height,
      wireframes: false,
      background: 'transparent',
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    },
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  // Walls
  const wallOpts = { isStatic: true, render: { visible: false }, friction: 0.8, restitution: 0.4 };
  const walls = [
    Bodies.rectangle(canvas.width / 2, canvas.height + 50, canvas.width + 200, 100, wallOpts),
    Bodies.rectangle(-50, canvas.height / 2, 100, canvas.height, wallOpts),
    Bodies.rectangle(canvas.width + 50, canvas.height / 2, 100, canvas.height, wallOpts),
    Bodies.rectangle(canvas.width / 2, -80, canvas.width + 200, 100, wallOpts),
  ];
  World.add(world, walls);

  // Central sun body
  const sunRadius = Math.min(canvas.width, canvas.height) * 0.06;
  const sun = Bodies.circle(canvas.width / 2, canvas.height / 2, sunRadius, {
    isStatic: true,
    render: {
      fillStyle: 'rgba(74, 124, 89, 0.25)',
      strokeStyle: 'rgba(74, 124, 89, 0.4)',
      lineWidth: 2,
    },
  });
  World.add(world, sun);

  // Letter bodies — Q and I
  const letters = [];
  const chars = ['Q', 'I'];
  const letterCount = Math.min(20, Math.floor(canvas.width / 80));

  for (let i = 0; i < letterCount; i++) {
    const char = chars[i % 2];
    const x = Math.random() * (canvas.width - 200) + 100;
    const y = -50 - Math.random() * 400;
    const size = 18 + Math.random() * 12;

    const body = Bodies.circle(x, y, size, {
      restitution: 0.6,
      friction: 0.2,
      density: 0.002,
      render: {
        fillStyle: 'rgba(38, 34, 28, 0.5)',
        strokeStyle: 'rgba(74, 124, 89, 0.3)',
        lineWidth: 1,
      },
    });

    body.char = char;
    body.letterSize = size;
    letters.push(body);
    World.add(world, body);
  }

  // Mouse constraint for drag
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false },
    },
  });
  World.add(world, mouseConstraint);
  render.mouse = mouse;

  // Attract letters to sun
  Events.on(engine, 'beforeUpdate', () => {
    letters.forEach((letter) => {
      const dx = sun.position.x - letter.position.x;
      const dy = sun.position.y - letter.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > sunRadius + 30) {
        const force = 0.000015;
        Body.applyForce(letter, letter.position, {
          x: (dx / dist) * force,
          y: (dy / dist) * force,
        });
      }

      // Keep in bounds
      if (letter.position.y > canvas.height + 100) {
        Body.setPosition(letter, {
          x: Math.random() * canvas.width,
          y: -50,
        });
        Body.setVelocity(letter, { x: 0, y: 0 });
      }
    });
  });

  // Custom text rendering
  Events.on(render, 'afterRender', () => {
    const dpr = Math.min(window.devicePixelRatio, 2);

    // Sun glow
    const glow = ctx.createRadialGradient(
      sun.position.x, sun.position.y, 0,
      sun.position.x, sun.position.y, sunRadius * 2.5
    );
    glow.addColorStop(0, 'rgba(74, 124, 89, 0.15)');
    glow.addColorStop(1, 'rgba(74, 124, 89, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sun.position.x, sun.position.y, sunRadius * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Sun center pulse
    const time = Date.now() * 0.001;
    const pulse = 1 + Math.sin(time * 1.5) * 0.05;
    ctx.fillStyle = 'rgba(74, 124, 89, 0.12)';
    ctx.beginPath();
    ctx.arc(sun.position.x, sun.position.y, sunRadius * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Letter text
    letters.forEach((letter) => {
      ctx.save();
      ctx.translate(letter.position.x, letter.position.y);
      ctx.rotate(letter.angle);
      ctx.font = `700 ${letter.letterSize}px Archivo, sans-serif`;
      ctx.fillStyle = 'rgba(236, 227, 213, 0.85)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter.char, 0, 0);
      ctx.restore();
    });
  });

  // Resize handler
  window.addEventListener('resize', () => {
    resize();
    render.options.width = canvas.width;
    render.options.height = canvas.height;
    Render.setSize(render, canvas.width, canvas.height);

    // Reposition sun
    Body.setPosition(sun, {
      x: canvas.width / 2,
      y: canvas.height / 2,
    });
  });
}

// --------------------------------------------
// GSAP SCROLL REVEALS
// --------------------------------------------
function initScrollReveals() {
  gsap.registerPlugin(ScrollTrigger);

  // Reveal elements
  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Reveal scale
  document.querySelectorAll('.reveal-scale').forEach((el) => {
    gsap.from(el, {
      scale: 0.92,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });
  });

  // Stagger service cards
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length) {
    gsap.from(serviceCards, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
        once: true,
      },
    });
  }

  // Stagger brocade items
  const brocadeItems = document.querySelectorAll('.brocade-item');
  if (brocadeItems.length) {
    gsap.from(brocadeItems, {
      x: -30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.brocades-timeline',
        start: 'top 80%',
        once: true,
      },
    });
  }

  // Stagger process steps
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

  // Stagger testimonial cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length) {
    gsap.from(testimonialCards, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 80%',
        once: true,
      },
    });
  }

  // Stagger FAQ items
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    gsap.from(faqItems, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.faq-grid',
        start: 'top 80%',
        once: true,
      },
    });
  }

  // Stagger event cards
  const eventCards = document.querySelectorAll('.event-card');
  if (eventCards.length) {
    gsap.from(eventCards, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.events-list',
        start: 'top 80%',
        once: true,
      },
    });
  }

  // Footer quote
  const footerQuote = document.querySelector('.footer-quote');
  if (footerQuote) {
    gsap.from(footerQuote, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: footerQuote,
        start: 'top 90%',
        once: true,
      },
    });
  }
}

// --------------------------------------------
// 8 BROCADES — Interactive
// --------------------------------------------
function initBrocades() {
  const items = document.querySelectorAll('.brocade-item');
  let activeItem = null;

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const silhouette = item.querySelector('.brocade-silhouette');

      // Deactivate previous
      if (activeItem && activeItem !== item) {
        activeItem.classList.remove('active');
        const prevSil = activeItem.querySelector('.brocade-silhouette');
        if (prevSil) prevSil.classList.remove('animate');
      }

      // Toggle current
      item.classList.toggle('active');

      if (item.classList.contains('active')) {
        if (silhouette) silhouette.classList.add('animate');
        activeItem = item;
      } else {
        if (silhouette) silhouette.classList.remove('animate');
        activeItem = null;
      }
    });
  });
}

// --------------------------------------------
// FAQ — Accordion
// --------------------------------------------
function initFAQ() {
  document.querySelectorAll('.faq-item-question').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('active'));

      // Toggle clicked
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// --------------------------------------------
// SMOOTH SCROLL
// --------------------------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// --------------------------------------------
// HERO PARALLAX
// --------------------------------------------
function initHeroParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      heroContent.style.opacity = 1 - scrollY / window.innerHeight;
    }
  });
}

// --------------------------------------------
// MAGNETIC BUTTONS
// --------------------------------------------
function initMagneticButtons() {
  document.querySelectorAll('.cta-button, .gift-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  });
}

// --------------------------------------------
// CURSOR GLOW (desktop only)
// --------------------------------------------
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(74, 124, 89, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// --------------------------------------------
// INIT
// --------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavRing();
  initPhysics();
  initScrollReveals();
  initBrocades();
  initFAQ();
  initSmoothScroll();
  initHeroParallax();
  initMagneticButtons();
  initCursorGlow();
});
