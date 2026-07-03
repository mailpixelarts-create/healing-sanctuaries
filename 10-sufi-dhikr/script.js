/* ============================================
   10-SUFI-DHIKR — CHAKRA BALANCING
   Afrofuturist × Sacred Geometry
   GSAP-Powered Interactions
   ============================================ */

import { gsap, ScrollTrigger, initScrollReveals, initParallax } from '../src/utils/motion.js';

// --- Chakra Data ---
const CHAKRAS = [
  {
    name: 'Root',
    sanskrit: 'Muladhara',
    color: '#FF0000',
    frequency: '396 Hz',
    solfeggio: 396,
    angle: 0,
    affirmation: 'I am grounded, safe, and deeply rooted in the present moment.',
    description: 'Foundation, survival, security'
  },
  {
    name: 'Sacral',
    sanskrit: 'Svadhisthana',
    color: '#FF7700',
    frequency: '417 Hz',
    solfeggio: 417,
    angle: 51.4,
    affirmation: 'I embrace pleasure, creativity, and the flow of life with open arms.',
    description: 'Creativity, emotion, pleasure'
  },
  {
    name: 'Solar Plexus',
    sanskrit: 'Manipura',
    color: '#FFDD00',
    frequency: '528 Hz',
    solfeggio: 528,
    angle: 102.8,
    affirmation: 'I am powerful, confident, and worthy of all my desires.',
    description: 'Power, confidence, will'
  },
  {
    name: 'Heart',
    sanskrit: 'Anahata',
    color: '#00CC44',
    frequency: '639 Hz',
    solfeggio: 639,
    angle: 154.3,
    affirmation: 'I give and receive love freely. My heart is open and healing.',
    description: 'Love, compassion, healing'
  },
  {
    name: 'Throat',
    sanskrit: 'Vishuddha',
    color: '#0088FF',
    frequency: '741 Hz',
    solfeggio: 741,
    angle: 205.7,
    affirmation: 'I speak my truth with clarity, confidence, and compassion.',
    description: 'Communication, truth, expression'
  },
  {
    name: 'Third Eye',
    sanskrit: 'Ajna',
    color: '#4400CC',
    frequency: '852 Hz',
    solfeggio: 852,
    angle: 257.1,
    affirmation: 'I trust my intuition. My inner vision sees beyond the veil.',
    description: 'Intuition, wisdom, insight'
  },
  {
    name: 'Crown',
    sanskrit: 'Sahasrara',
    color: '#8800FF',
    frequency: '963 Hz',
    solfeggio: 963,
    angle: 308.6,
    affirmation: 'I am connected to the infinite. Divine wisdom flows through me.',
    description: 'Spirituality, consciousness, unity'
  }
];

// --- Audio Context for Solfeggio Tones ---
let audioCtx = null;
let currentOscillator = null;
let currentGainNode = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSolfeggioTone(frequency, duration = 4) {
  initAudio();
  stopCurrentTone();

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, audioCtx.currentTime);
  filter.Q.setValueAtTime(1, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.5);
  gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + duration - 1);
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + duration);

  currentOscillator = oscillator;
  currentGainNode = gainNode;
}

function stopCurrentTone() {
  if (currentOscillator) {
    try {
      currentGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
      setTimeout(() => {
        try { currentOscillator.stop(); } catch (e) { /* ignore */ }
      }, 150);
    } catch (e) { /* ignore */ }
  }
}

// --- Initialize All Animations ---
function initAllAnimations() {
  initScrollReveals();
  initParallax();
  initNavigation();
  initHeroSplit();
  initChakraWheel();
  initChakraList();
  initChakraColorCycling();
  initSacredGeometryCanvas();
  initSmoothScroll();
  initParallaxGeometry();
}

// --- Navigation ---
function initNavigation() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Active link tracking
  const sections = document.querySelectorAll('.section[id]');
  const links = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('is-active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('is-active');
      }
    });
  }, { passive: true });
}

// --- Hero Split Screen Effect ---
function initHeroSplit() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  function updateHero() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(scrollY / heroHeight, 1);

    if (progress > 0.1) {
      hero.classList.add('scrolled');
    } else {
      hero.classList.remove('scrolled');
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHero);
      ticking = true;
    }
  }, { passive: true });
}

// --- Parallax Geometry ---
function initParallaxGeometry() {
  const geometry = document.getElementById('heroGeometry');
  if (!geometry) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

    if (scrollY < heroHeight) {
      const progress = scrollY / heroHeight;
      gsap.set(geometry, {
        rotation: scrollY * 0.05,
        scale: 1 + scrollY * 0.0002,
        opacity: Math.max(0, 0.06 - progress * 0.06)
      });
    }
  }, { passive: true });
}

// --- Interactive Chakra Wheel ---
let currentChakraIndex = -1;
let wheelRotation = 0;
let wheelSpinSpeed = 0.3;
let wheelAnimFrame = null;

function initChakraWheel() {
  const wheelSvg = document.getElementById('chakraWheelSvg');
  const segmentsGroup = document.getElementById('chakraSegments');

  if (!wheelSvg || !segmentsGroup) return;

  const segments = CHAKRAS.map((chakra, i) => {
    const startAngle = (i * 360 / 7) - 90;
    const endAngle = startAngle + 360 / 7;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 250 + 180 * Math.cos(startRad);
    const y1 = 250 + 180 * Math.sin(startRad);
    const x2 = 250 + 180 * Math.cos(endRad);
    const y2 = 250 + 180 * Math.sin(endRad);

    const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
    const labelX = 250 + 155 * Math.cos(midAngle);
    const labelY = 250 + 155 * Math.sin(midAngle);
    const iconX = 250 + 130 * Math.cos(midAngle);
    const iconY = 250 + 130 * Math.sin(midAngle);

    return `
      <path d="M250,250 L${x1},${y1} A180,180 0 0,1 ${x2},${y2} Z"
            fill="${chakra.color}" fill-opacity="0.08"
            stroke="${chakra.color}" stroke-width="0.5"
            class="wheel-segment" data-chakra="${i}"
            style="cursor: pointer; transition: all 0.3s ease;"/>
      <circle cx="${iconX}" cy="${iconY}" r="12" fill="${chakra.color}" opacity="0.3"/>
      <text x="${labelX}" y="${labelY - 5}" text-anchor="middle" fill="${chakra.color}" font-size="8" font-family="'Space Grotesk', sans-serif" font-weight="500">${chakra.name}</text>
      <text x="${labelX}" y="${labelY + 8}" text-anchor="middle" fill="var(--paper)" font-size="5" font-family="'DM Sans', sans-serif" opacity="0.5">${chakra.frequency}</text>
    `;
  }).join('');

  segmentsGroup.innerHTML = segments;

  // Segment interactions
  segmentsGroup.querySelectorAll('.wheel-segment').forEach(seg => {
    seg.addEventListener('mouseenter', () => {
      seg.setAttribute('fill-opacity', '0.2');
    });
    seg.addEventListener('mouseleave', () => {
      seg.setAttribute('fill-opacity', '0.08');
    });
    seg.addEventListener('click', () => {
      const idx = parseInt(seg.dataset.chakra);
      selectChakra(idx);
      wheelSpinSpeed = 2;
      setTimeout(() => { wheelSpinSpeed = 0.3; }, 2000);
    });
  });

  // Animate wheel rotation
  function animateWheel() {
    wheelRotation += wheelSpinSpeed;
    segmentsGroup.style.transform = `rotate(${wheelRotation}deg)`;
    segmentsGroup.style.transformOrigin = '250px 250px';
    wheelAnimFrame = requestAnimationFrame(animateWheel);
  }
  animateWheel();
}

// --- Select Chakra ---
function selectChakra(index) {
  if (index < 0 || index >= CHAKRAS.length) return;

  currentChakraIndex = index;
  const chakra = CHAKRAS[index];

  const affirmationText = document.getElementById('affirmationText');
  const affirmationFrequency = document.getElementById('affirmationFrequency');
  const affirmationDisplay = document.getElementById('affirmationDisplay');

  if (affirmationText) {
    gsap.to(affirmationText, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        affirmationText.textContent = chakra.affirmation;
        gsap.to(affirmationText, { opacity: 1, duration: 0.5 });
      }
    });
  }

  if (affirmationFrequency) {
    affirmationFrequency.textContent = `${chakra.sanskrit} · ${chakra.frequency}`;
  }

  if (affirmationDisplay) {
    affirmationDisplay.classList.add('active');
    gsap.to(affirmationDisplay, {
      borderColor: chakra.color,
      boxShadow: `0 0 40px ${chakra.color}33`,
      duration: 0.5
    });
  }

  // Update chakra list
  document.querySelectorAll('.chakra-item').forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  // Play solfeggio tone
  playSolfeggioTone(chakra.solfeggio, 4);
}

// --- Chakra List ---
function initChakraList() {
  const listContainer = document.getElementById('chakraList');
  if (!listContainer) return;

  listContainer.innerHTML = CHAKRAS.map((chakra, i) => `
    <div class="chakra-item" data-chakra="${i}">
      <div class="chakra-item-dot" style="background: ${chakra.color}; color: ${chakra.color}"></div>
      <div class="chakra-item-info">
        <span class="chakra-item-name">${chakra.name}</span>
        <span class="chakra-item-sanskrit">${chakra.sanskrit}</span>
      </div>
      <span class="chakra-item-freq">${chakra.frequency}</span>
    </div>
  `).join('');

  listContainer.querySelectorAll('.chakra-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.chakra);
      selectChakra(idx);
    });
  });
}

// --- CHAKRA COLOR CYCLING (Signature Interaction) ---
function initChakraColorCycling() {
  const sections = document.querySelectorAll('.section');
  const chakraColors = CHAKRAS.map(c => c.color);

  // Create a color overlay element
  const overlay = document.createElement('div');
  overlay.className = 'chakra-cycling';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
  `;
  document.body.appendChild(overlay);

  // Map sections to chakra colors (7 sections → 7 colors)
  const sectionMapping = [];
  const targetSections = document.querySelectorAll(
    '#about, #mechanism, #services, #process, #vow, #wheel, #testimonials'
  );

  targetSections.forEach((section, i) => {
    if (i < chakraColors.length) {
      sectionMapping.push({ el: section, color: chakraColors[i] });
    }
  });

  // ScrollTrigger for chakra color cycling
  sectionMapping.forEach(({ el, color }) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        overlay.style.backgroundColor = color;
        overlay.style.opacity = '0.04';
      },
      onEnterBack: () => {
        overlay.style.backgroundColor = color;
        overlay.style.opacity = '0.04';
      },
    });
  });

  // Fade overlay when not near any mapped section
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const progress = self.progress;
      const isNearSection = sectionMapping.some(({ el }) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight * 1.2 && rect.bottom > -window.innerHeight * 0.2;
      });

      if (!isNearSection) {
        overlay.style.opacity = '0';
      }
    }
  });
}

// --- Sacred Geometry Canvas ---
function initSacredGeometryCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'sacredGeometryCanvas';
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.03;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let time = 0;
  let animFrame;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  // Flower of Life drawing
  function drawFlowerOfLife(cx, cy, radius, opacity) {
    ctx.strokeStyle = `rgba(232, 197, 71, ${opacity})`;
    ctx.lineWidth = 0.5;

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // 6 surrounding circles
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60 * Math.PI) / 180;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Second ring
    for (let i = 0; i < 6; i++) {
      const angle = ((i * 60 + 30) * Math.PI) / 180;
      const x = cx + radius * 1.732 * Math.cos(angle);
      const y = cy + radius * 1.732 * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Sri Yantra triangles
  function drawSriYantra(cx, cy, size, rotation, opacity) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.strokeStyle = `rgba(232, 197, 71, ${opacity})`;
    ctx.lineWidth = 0.3;

    // Upward triangles
    for (let i = 0; i < 4; i++) {
      const s = size * (1 - i * 0.15);
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.closePath();
      ctx.stroke();
    }

    // Downward triangles
    for (let i = 0; i < 5; i++) {
      const s = size * (0.9 - i * 0.12);
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.lineTo(-s * 0.866, -s * 0.5);
      ctx.lineTo(s * 0.866, -s * 0.5);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  }

  function animate() {
    time += 0.002;
    ctx.clearRect(0, 0, width, height);

    const scrollY = window.scrollY;
    const opacity = Math.max(0, 0.03 - scrollY * 0.00002);

    // Draw sacred geometry patterns at various positions
    drawFlowerOfLife(width * 0.2, height * 0.3, 40 + Math.sin(time) * 5, opacity);
    drawFlowerOfLife(width * 0.8, height * 0.6, 35 + Math.cos(time) * 5, opacity * 0.8);
    drawFlowerOfLife(width * 0.5, height * 0.8, 45 + Math.sin(time * 0.7) * 5, opacity * 0.6);

    drawSriYantra(width * 0.15, height * 0.7, 60, time * 0.1, opacity * 0.7);
    drawSriYantra(width * 0.85, height * 0.2, 50, -time * 0.15, opacity * 0.5);

    animFrame = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup on page leave
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animFrame);
  });
}

// --- Smooth Scroll ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80 },
          duration: 1,
          ease: 'expo.out'
        });
      }
    });
  });
}

// --- Initialize ---
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
  initAllAnimations();
}
