// ============================================
// SHARED PRELOADER — Unique per sanctuary
// Counts 0–100, exits with clip-path, then
// initializes Lenis + ScrollTrigger
// ============================================

import gsap from 'gsap';

const SANCTUARY_PRELOADERS = {
  '01-craniosacral': {
    name: 'Reiki',
    text: 'Silence loading...',
    subtext: 'Close your eyes. We\'ll tell you when to open them.',
    design: 'sacred-glow',
    color: '#C9A96E',
  },
  '02-daode': {
    name: 'Sound Healing',
    text: 'Tuning frequencies...',
    subtext: 'The bowls are warming. The gong is listening.',
    design: 'waveform',
    color: '#4A90D9',
  },
  '03-kabiraji': {
    name: 'Yoga',
    text: 'Aligning breath...',
    subtext: 'The mat is ready. Your body is waiting.',
    design: 'chakra-wheel',
    color: '#D4A574',
  },
  '04-curanderismo': {
    name: 'Meditation',
    text: 'SIT',
    subtext: 'The present moment is loading.',
    design: 'film-grain',
    color: '#C9A96E',
  },
  '05-labyrinth': {
    name: 'Breathwork',
    text: 'Inhale 4... Hold 7...',
    subtext: 'The breath is gathering. Almost ready.',
    design: 'breathing-ring',
    color: '#5B9BD5',
  },
  '06-johrei': {
    name: 'Crystal Healing',
    text: 'Charging crystals...',
    subtext: 'The lattice is aligning. The frequency is rising.',
    design: 'facet-spin',
    color: '#C9A96E',
  },
  '07-enochian': {
    name: 'Aromatherapy',
    text: 'Distilling...',
    subtext: 'The terpenes are settling. The scent is forming.',
    design: 'droplet',
    color: '#8B7355',
  },
  '08-chronokinesis': {
    name: 'Ayurveda',
    text: 'Balancing doshas...',
    subtext: 'The fire is warming. The earth is grounding.',
    design: 'dosha-dots',
    color: '#C4956A',
  },
  '09-zero-point': {
    name: 'Acupuncture',
    text: 'Locating meridians...',
    subtext: 'The needles are ready. The points are waiting.',
    design: 'grid-scan',
    color: '#00FF88',
  },
  '10-sufi-dhikr': {
    name: 'Chakra Balancing',
    text: 'Aligning frequencies...',
    subtext: 'Seven colors are converging. One by one.',
    design: 'color-stack',
    color: '#9B59B6',
  },
  '11-merkaba': {
    name: 'Herbalism',
    text: 'Harvesting...',
    subtext: 'The roots are stirring. The leaves are unfolding.',
    design: 'botanical-growth',
    color: '#6B8E23',
  },
  '12-necromantic': {
    name: 'Shamanic Journeying',
    text: 'Beating the drum...',
    subtext: '4.5Hz is rising. The path is opening.',
    design: 'drum-pulse',
    color: '#8B4513',
  },
  '13-geomancy': {
    name: 'Qi Gong',
    text: 'Gathering qi...',
    subtext: 'The breath is slow. The energy is rising.',
    design: 'float-particles',
    color: '#8B7355',
  },
  '14-tulpa': {
    name: 'Art Therapy',
    text: 'Loading colors...',
    subtext: 'The charcoal is ready. Your hand knows the way.',
    design: 'paint-splash',
    color: '#E74C3C',
  },
};

function detectSanctuary() {
  const path = window.location.pathname;
  for (const [slug, config] of Object.entries(SANCTUARY_PRELOADERS)) {
    if (path.includes(slug)) return { slug, ...config };
  }
  return null;
}

function createPreloaderHTML(config) {
  const visual = getVisualHTML(config.design, config.color);
  return `
    <div class="preloader" id="preloader">
      <div class="preloader__visual">${visual}</div>
      <div class="preloader__counter" id="preloaderCounter">0</div>
      <div class="preloader__text">${config.text}</div>
      <div class="preloader__subtext">${config.subtext}</div>
      <div class="preloader__bar">
        <div class="preloader__bar-fill" id="preloaderBar"></div>
      </div>
    </div>
  `;
}

function getVisualHTML(design, color) {
  switch (design) {
    case 'sacred-glow':
      return `
        <div class="preloader-orb" style="--glow-color: ${color}">
          <div class="preloader-orb__ring preloader-orb__ring--1"></div>
          <div class="preloader-orb__ring preloader-orb__ring--2"></div>
          <div class="preloader-orb__ring preloader-orb__ring--3"></div>
          <div class="preloader-orb__core"></div>
        </div>`;

    case 'waveform':
      return `
        <div class="preloader-wave" style="--wave-color: ${color}">
          ${Array.from({ length: 20 }, (_, i) =>
            `<div class="preloader-wave__bar" style="--i: ${i}"></div>`
          ).join('')}
        </div>`;

    case 'chakra-wheel':
      return `
        <div class="preloader-chakra">
          ${['#FF0000','#FF6B00','#FFD700','#00CC66','#0066FF','#4B0082','#8B00FF'].map((c, i) =>
            `<div class="preloader-chakra__dot" style="--color: ${c}; --i: ${i}"></div>`
          ).join('')}
        </div>`;

    case 'film-grain':
      return `
        <div class="preloader-film">
          <div class="preloader-film__circle"></div>
          <div class="preloader-film__grain"></div>
        </div>`;

    case 'breathing-ring':
      return `
        <div class="preloader-breath" style="--breath-color: ${color}">
          <div class="preloader-breath__ring"></div>
          <div class="preloader-breath__label">4-7-8</div>
        </div>`;

    case 'facet-spin':
      return `
        <div class="preloader-facet" style="--facet-color: ${color}">
          <div class="preloader-facet__shape"></div>
        </div>`;

    case 'droplet':
      return `
        <div class="preloader-droplet" style="--drop-color: ${color}">
          <div class="preloader-droplet__drop"></div>
          <div class="preloader-droplet__ripple"></div>
        </div>`;

    case 'dosha-dots':
      return `
        <div class="preloader-dosha">
          <div class="preloader-dosha__dot preloader-dosha__dot--vata" style="--dosha-color: #5B9BD5"></div>
          <div class="preloader-dosha__dot preloader-dosha__dot--pitta" style="--dosha-color: #C4956A"></div>
          <div class="preloader-dosha__dot preloader-dosha__dot--kapha" style="--dosha-color: #6B8E23"></div>
        </div>`;

    case 'grid-scan':
      return `
        <div class="preloader-grid" style="--grid-color: ${color}">
          <div class="preloader-grid__line preloader-grid__line--h"></div>
          <div class="preloader-grid__line preloader-grid__line--v"></div>
          <div class="preloader-grid__dots">
            ${Array.from({ length: 9 }, (_, i) =>
              `<div class="preloader-grid__dot" style="--i: ${i}"></div>`
            ).join('')}
          </div>
        </div>`;

    case 'color-stack':
      return `
        <div class="preloader-stack">
          ${['#FF0000','#FF6B00','#FFD700','#00CC66','#0066FF','#4B0082','#8B00FF'].map((c, i) =>
            `<div class="preloader-stack__bar" style="--color: ${c}; --i: ${i}"></div>`
          ).join('')}
        </div>`;

    case 'botanical-growth':
      return `
        <div class="preloader-botanical" style="--stem-color: ${color}">
          <div class="preloader-botanical__stem"></div>
          <div class="preloader-botanical__leaf preloader-botanical__leaf--1"></div>
          <div class="preloader-botanical__leaf preloader-botanical__leaf--2"></div>
        </div>`;

    case 'drum-pulse':
      return `
        <div class="preloader-drum" style="--drum-color: ${color}">
          <div class="preloader-drum__circle"></div>
          <div class="preloader-drum__pulse preloader-drum__pulse--1"></div>
          <div class="preloader-drum__pulse preloader-drum__pulse--2"></div>
          <div class="preloader-drum__pulse preloader-drum__pulse--3"></div>
        </div>`;

    case 'float-particles':
      return `
        <div class="preloader-float">
          ${Array.from({ length: 12 }, (_, i) =>
            `<div class="preloader-float__particle" style="--i: ${i}"></div>`
          ).join('')}
        </div>`;

    case 'paint-splash':
      return `
        <div class="preloader-paint">
          <div class="preloader-paint__splash preloader-paint__splash--1"></div>
          <div class="preloader-paint__splash preloader-paint__splash--2"></div>
          <div class="preloader-paint__splash preloader-paint__splash--3"></div>
        </div>`;

    default:
      return `<div class="preloader-orb"><div class="preloader-orb__core"></div></div>`;
  }
}

function initPreloader(onComplete) {
  const config = detectSanctuary();
  if (!config) {
    if (onComplete) onComplete();
    return;
  }

  // Inject preloader HTML at start of body
  const html = createPreloaderHTML(config);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.prepend(wrapper.firstElementChild);

  const preloader = document.getElementById('preloader');
  const counter = document.getElementById('preloaderCounter');
  const bar = document.getElementById('preloaderBar');

  if (!preloader || !counter) {
    if (onComplete) onComplete();
    return;
  }

  // Hide page content until preloader finishes
  document.body.style.overflow = 'hidden';

  let count = 0;
  const duration = 2000; // 2 seconds
  const interval = 20; // update every 20ms
  const steps = duration / interval;
  const increment = 100 / steps;

  const counterInterval = setInterval(() => {
    count += increment;
    if (count >= 100) {
      count = 100;
      clearInterval(counterInterval);
      exitPreloader();
    }
    counter.textContent = Math.floor(count);
    if (bar) {
      bar.style.width = count + '%';
    }
  }, interval);

  function exitPreloader() {
    // Animate preloader out with clip-path
    gsap.to(preloader, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        preloader.remove();
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      },
    });
  }
}

export { initPreloader, detectSanctuary, SANCTUARY_PRELOADERS };
