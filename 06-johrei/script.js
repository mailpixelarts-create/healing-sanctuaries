// ============================================
// 06-JOHREI — CRYSTAL HEALING: MAISON DARK
// GSAP-Powered. Crystal Facet Interactions.
// ============================================
import {
  gsap,
  ScrollTrigger,
  initScrollReveals,
  initParallax,
  initMagneticButtons,
  initTextSplits,
  refreshScrollTrigger,
} from '../src/utils/motion.js';

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initNavigation();
  initCrystalFacets();
  initScrollReveals();
  initMagneticButtons();
  initTextSplits();
  initParallax();
  initContactForm();
});

// ============================================
// HERO CANVAS — Crystal Lattice Mesh
// ============================================
function initHeroCanvas() {
  const canvas = document.getElementById('crystalCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let vertices = [];
  let edges = [];
  let mouseX = 0, mouseY = 0;
  let isHovering = false;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    generateMesh();
  }

  function generateMesh() {
    vertices = [];
    edges = [];
    const cols = 14;
    const rows = 10;
    const spacingX = width / (cols + 1);
    const spacingY = height / (rows + 1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const offsetX = r % 2 === 0 ? 0 : spacingX / 2;
        vertices.push({
          x: spacingX * (c + 1) + offsetX,
          y: spacingY * (r + 1),
          baseX: spacingX * (c + 1) + offsetX,
          baseY: spacingY * (r + 1),
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    }

    for (let i = 0; i < vertices.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      if (col < cols - 1) edges.push([i, i + 1]);
      if (row < rows - 1) {
        const offset = row % 2 === 0 ? 1 : 0;
        if (i + cols < vertices.length) edges.push([i, i + cols]);
        if (col + offset < cols && i + cols + offset < vertices.length) {
          edges.push([i, i + cols + offset]);
        }
      }
    }
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isHovering = true;

    // Update CSS custom properties for overlay gradient
    const root = document.documentElement;
    root.style('--mouse-x', `${(mouseX / width) * 100}%`);
    root.style('--mouse-y', `${(mouseY / height) * 100}%`);
  });

  canvas.addEventListener('mouseleave', () => {
    isHovering = false;
  });

  canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left;
    mouseY = e.touches[0].clientY - rect.top;
  });

  function drawMesh() {
    const time = Date.now() * 0.001;

    vertices.forEach((v, i) => {
      const wave = Math.sin(time * 0.3 + v.baseY * 0.008) * 4;
      const pulse = Math.sin(time * 0.5 + i * 0.2) * 2;

      v.x += (v.baseX + wave - v.x) * 0.04;
      v.y += (v.baseY + pulse - v.y) * 0.04;

      if (isHovering) {
        const dist = Math.hypot(mouseX - v.baseX, mouseY - v.baseY);
        const influence = Math.max(0, 1 - dist / 180);
        const angle = Math.atan2(v.baseY - mouseY, v.baseX - mouseX);
        v.x += Math.cos(angle) * influence * 25;
        v.y += Math.sin(angle) * influence * 25;
      }
    });

    // Draw edges
    edges.forEach(([a, b]) => {
      const va = vertices[a];
      const vb = vertices[b];
      const dist = Math.hypot(va.x - vb.x, va.y - vb.y);
      const opacity = Math.max(0, (1 - dist / 140) * 0.2);

      ctx.beginPath();
      ctx.moveTo(va.x, va.y);
      ctx.lineTo(vb.x, vb.y);
      ctx.strokeStyle = `rgba(123, 63, 74, ${opacity})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    // Draw vertices
    vertices.forEach((v, i) => {
      const glow = Math.sin(time + i * 0.3) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(v.x, v.y, v.radius * glow, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 160, 220, 0.5)`;
      ctx.fill();

      // Glow aura
      ctx.beginPath();
      ctx.arc(v.x, v.y, v.radius * 4 * glow, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(123, 63, 74, 0.06)`;
      ctx.fill();
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const grad = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height) * 0.6
    );
    grad.addColorStop(0, 'rgba(123, 63, 74, 0.06)');
    grad.addColorStop(0.5, 'rgba(13, 11, 10, 0.02)');
    grad.addColorStop(1, 'rgba(13, 11, 10, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    drawMesh();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
}

// ============================================
// VERTICAL NAVIGATION — Active Tracking
// ============================================
function initNavigation() {
  const links = document.querySelectorAll('.side-nav__link');
  const sections = document.querySelectorAll('section[id]');

  function updateActive() {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 200;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    links.forEach((link) => {
      link.classList.remove('is-active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('is-active');
      }
    });
  }

  window.addEventListener('scroll', updateActive);
  updateActive();

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = 80; // nav width
        const top = target.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Mobile nav
  const mobileToggle = document.querySelector('.mobile-nav__toggle');
  const sideNav = document.querySelector('.side-nav');
  if (mobileToggle && sideNav) {
    mobileToggle.addEventListener('click', () => {
      sideNav.classList.toggle('is-open');
    });
  }
}

// ============================================
// CRYSTAL FACET CLIP-PATH TRANSITIONS
// Signature interaction: hexagonal → rectangle on hover
// ============================================
function initCrystalFacets() {
  const cards = document.querySelectorAll('.service-card');

  const facets = [
    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',   // hexagon
    'polygon(50% 0%, 95% 50%, 50% 100%, 5% 50%)',                        // diamond
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // octagon
    'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',    // emerald
    'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',            // pentagon
  ];

  const rectFacet = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

  cards.forEach((card, index) => {
    const image = card.querySelector('.service-card-image');
    const facet = card.querySelector('.service-card-facet');
    const initialFacet = facets[index % facets.length];

    if (image) {
      // Set initial clip-path
      gsap.set(image, { clipPath: initialFacet });

      card.addEventListener('mouseenter', () => {
        gsap.to(image, {
          clipPath: rectFacet,
          duration: 0.8,
          ease: 'expo.out',
        });
        gsap.to(facet, {
          clipPath: rectFacet,
          rotation: 30,
          scale: 1.1,
          opacity: 0.35,
          duration: 0.8,
          ease: 'expo.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          clipPath: initialFacet,
          duration: 0.8,
          ease: 'expo.out',
        });
        gsap.to(facet, {
          clipPath: initialFacet,
          rotation: 0,
          scale: 1,
          opacity: 0.15,
          duration: 0.8,
          ease: 'expo.out',
        });
      });
    }
  });

  // Vow facet rotation
  const vowFacet = document.querySelector('.vow-facet');
  if (vowFacet) {
    const vowFacets = [
      'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      'polygon(50% 0%, 95% 50%, 50% 100%, 5% 50%)',
      'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
      'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
    ];

    ScrollTrigger.create({
      trigger: '.vow',
      start: 'top 80%',
      onEnter: () => {
        let idx = 0;
        const cycleFacets = () => {
          idx = (idx + 1) % vowFacets.length;
          gsap.to(vowFacet, {
            clipPath: vowFacets[idx],
            rotation: idx * 90,
            duration: 1.5,
            ease: 'expo.out',
          });
        };
        setInterval(cycleFacets, 2000);
      },
      once: true,
    });
  }

  // Process step icons — morph clip-path on scroll
  const stepIcons = document.querySelectorAll('.process-step-icon');
  const iconFacets = [
    'polygon(50% 0%, 95% 50%, 50% 100%, 5% 50%)',
    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
  ];

  stepIcons.forEach((icon, i) => {
    gsap.set(icon, { clipPath: iconFacets[i] });
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
    const btn = form.querySelector('button');
    btn.textContent = 'Sent!';
    btn.style.background = 'var(--signal)';
    btn.style.color = 'var(--ink)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 2000);
  });
}
