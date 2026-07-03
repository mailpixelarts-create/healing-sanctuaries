// ============================================
// ZERO POINT — GSAP-Powered Interactive Engine
// Import: motion.js (shared GSAP utilities)
// Signature: Pressure Point Explorer — 5 acupoints
// Features: Matrix rain, cursor trail, loading, reveals
// ============================================

import {
  gsap,
  ScrollTrigger,
  initScrollReveals,
  initSectionReveals,
  initMagneticButtons,
  initTextSplits,
  refreshScrollTrigger,
} from '../src/utils/motion.js';

// ============================================
// PRESSURE POINT DATA — 5 Acupoints
// ============================================
const pressurePoints = {
  LI4: {
    nameCn: '合谷',
    nameEn: 'Hegu — Large Intestine 4',
    anatomy: 'First dorsal interosseous muscle',
    description:
      'The "Command Point of the Face." Master point for all conditions affecting the head, face, and jaw. Strongly analgesic, regulates immune response, and clears external pathogens. Often used for headaches, toothaches, and sinus issues.',
  },
  PC6: {
    nameCn: '内关',
    nameEn: 'Neiguan — Pericardium 6',
    anatomy: 'Between palmaris longus and flexor carpi radialis tendons',
    description:
      'The "Inner Pass." Key point for calming the mind and regulating the heart. Treats anxiety, insomnia, chest tightness, and nausea. Used extensively for motion sickness and morning sickness during pregnancy.',
  },
  ST36: {
    nameCn: '足三里',
    nameEn: 'Zusanli — Stomach 36',
    anatomy: 'Tibialis anterior, 3 cun below the knee',
    description:
      'The "Leg Three Miles." Supreme point for strengthening the body. Boosts immunity, improves digestion, and increases vitality. The most studied acupuncture point in clinical research. Used for fatigue, digestive disorders, and general weakness.',
  },
  LV3: {
    nameCn: '太冲',
    nameEn: 'Taichong — Liver 3',
    anatomy: 'Between first and second metatarsal bones',
    description:
      'The "Great Surge." Primary point for moving stuck Liver qi. Treats emotional stagnation, irritability, and anger. Regulates menstrual cycle and alleviates headaches caused by Liver yang rising.',
  },
  KI3: {
    nameCn: '太溪',
    nameEn: 'Taixi — Kidney 3',
    anatomy: 'Between medial malleolus and Achilles tendon',
    description:
      'The "Great Ravine." Source point of the Kidney channel. Nourishes Kidney yin and yang, strengthens bones and hearing. Used for chronic fatigue, low back pain, and reproductive issues.',
  },
};

// ============================================
// MATRIX RAIN — Canvas Effect
// ============================================
class MatrixRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.characters =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|';
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(1);
  }

  draw() {
    this.ctx.fillStyle = 'rgba(0, 26, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = `${this.fontSize}px "IBM Plex Mono", monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const char =
        this.characters[Math.floor(Math.random() * this.characters.length)];
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      const brightness = Math.random();
      if (brightness > 0.95) {
        this.ctx.fillStyle = '#FFFFFF';
      } else if (brightness > 0.8) {
        this.ctx.fillStyle = '#00FF41';
      } else {
        this.ctx.fillStyle = 'rgba(0, 255, 65, 0.7)';
      }

      this.ctx.fillText(char, x, y);

      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }

  resize() {
    this.init();
  }
}

// ============================================
// PRESSURE POINT EXPLORER — Signature Interaction
// ============================================
class PressurePointExplorer {
  constructor() {
    this.points = document.querySelectorAll('.pressure-point');
    this.infoContent = document.querySelector('.info-content');
    this.infoHeader = document.querySelector('.info-header');
    this.init();
  }

  init() {
    this.points.forEach((point) => {
      point.addEventListener('mouseenter', (e) => this.showInfo(e));
      point.addEventListener('mouseleave', () => this.hideInfo());
    });
  }

  showInfo(e) {
    const pointId = e.currentTarget.dataset.point;
    const data = pressurePoints[pointId];
    if (!data) return;

    this.infoHeader.textContent = '[POINT.ACTIVE]';
    document.querySelector('.info-name-cn').textContent = data.nameCn;
    document.querySelector('.info-name-en').textContent = data.nameEn;
    document.querySelector('.info-anatomy').textContent = data.anatomy;
    document.querySelector('.info-description').textContent = data.description;

    gsap.fromTo(
      this.infoContent,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' }
    );
    this.infoContent.classList.add('active');
  }

  hideInfo() {
    gsap.to(this.infoContent, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'expo.out',
      onComplete: () => {
        this.infoContent.classList.remove('active');
        this.infoHeader.textContent = 'SELECT A PRESSURE POINT';
        document.querySelector('.info-name-cn').textContent = '—';
        document.querySelector('.info-name-en').textContent = '—';
        document.querySelector('.info-anatomy').textContent = '—';
        document.querySelector('.info-description').textContent =
          'Hover over a point on the wireframe to explore its properties.';
        gsap.set(this.infoContent, { opacity: 1, y: 0 });
      },
    });
  }
}

// ============================================
// HERO SEQUENCE — Runway Opening
// ============================================
function initHeroSequence() {
  const heroElements = [
    '.hero-pre',
    '.title-line',
    '.hero-sub',
    '.hero-healer',
    '.hero-location',
    '.hero-scroll',
  ];

  heroElements.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    });
  });

  const tl = gsap.timeline({ delay: 0.2 });

  tl.to('.hero-pre', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'expo.out',
  })
    .to(
      '.title-line',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
      },
      '-=0.4'
    )
    .to(
      '.hero-sub',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      },
      '-=0.3'
    )
    .to(
      '.hero-healer',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      },
      '-=0.5'
    )
    .to(
      '.hero-location',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      },
      '-=0.5'
    )
    .to(
      '.hero-scroll',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      },
      '-=0.3'
    );
}

// ============================================
// CURSOR TRAIL
// ============================================
function initCursorTrail() {
  let lastX = 0;
  let lastY = 0;
  let throttle = false;

  document.addEventListener('mousemove', (e) => {
    if (throttle) return;
    throttle = true;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 5) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      document.body.appendChild(dot);

      gsap.to(dot, {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'expo.out',
        onComplete: () => dot.remove(),
      });

      lastX = e.clientX;
      lastY = e.clientY;
    }

    setTimeout(() => {
      throttle = false;
    }, 16);
  });
}

// ============================================
// NAVIGATION — Active State on Scroll
// ============================================
function initNavHighlight() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav__link');

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) {
          const id = section.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      },
    });
  });
}

// ============================================
// ASCII ART — Animate on Scroll
// ============================================
function initAsciiReveal() {
  const asciiLines = document.querySelectorAll('.ascii-line');
  if (!asciiLines.length) return;

  gsap.from(asciiLines, {
    opacity: 0,
    y: 10,
    stagger: 0.08,
    duration: 0.5,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.footer-ascii',
      start: 'top 85%',
      once: true,
    },
  });
}

// ============================================
// MERIDIAN MAP — Draw Lines on Hero
// ============================================
function initMeridianDraw() {
  const lines = document.querySelectorAll('.meridian-line');
  lines.forEach((line) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;

    gsap.to(line, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 80%',
        once: true,
      },
    });
  });
}

// ============================================
// SMOOTH SCROLL — Internal Links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 60 },
          duration: 1,
          ease: 'expo.inOut',
        });
      }
    });
  });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Matrix Rain
  const canvas = document.getElementById('matrix-rain');
  if (canvas) {
    const matrix = new MatrixRain(canvas);
    matrix.animate();
    window.addEventListener('resize', () => matrix.resize());
  }

  // Hero Sequence (was triggered by loader onComplete)
  initHeroSequence();

  // Pressure Point Explorer
  new PressurePointExplorer();

  // GSAP Motion System
  initScrollReveals();
  initSectionReveals();
  initMagneticButtons();
  initTextSplits();

  // Custom Features
  initCursorTrail();
  initNavHighlight();
  initAsciiReveal();
  initSmoothScroll();

  // Refresh ScrollTrigger after all content loads
  window.addEventListener('load', () => {
    refreshScrollTrigger();
  });
});
