// Sanctuary Navigation — Inter-site continuity with View Transitions
// Shared across all 14 sanctuaries

const SANCTUARIES = [
  { id: '01', slug: '01-craniosacral', name: 'Reiki' },
  { id: '02', slug: '02-daode', name: 'Sound' },
  { id: '03', slug: '03-kabiraji', name: 'Yoga' },
  { id: '04', slug: '04-curanderismo', name: 'Meditation' },
  { id: '05', slug: '05-labyrinth', name: 'Breathwork' },
  { id: '06', slug: '06-johrei', name: 'Crystals' },
  { id: '07', slug: '07-enochian', name: 'Aroma' },
  { id: '08', slug: '08-chronokinesis', name: 'Ayurveda' },
  { id: '09', slug: '09-zero-point', name: 'Acupuncture' },
  { id: '10', slug: '10-sufi-dhikr', name: 'Chakra' },
  { id: '11', slug: '11-merkaba', name: 'Herbalism' },
  { id: '12', slug: '12-necromantic', name: 'Shamanic' },
  { id: '13', slug: '13-geomancy', name: 'Qi Gong' },
  { id: '14', slug: '14-tulpa', name: 'Art Therapy' },
];

function detectCurrentSanctuary() {
  const path = window.location.pathname;
  for (const s of SANCTUARIES) {
    if (path.includes(s.slug)) return s;
  }
  return null;
}

function getBasePath() {
  const current = detectCurrentSanctuary();
  if (current) return '../';
  return '';
}

function navigateTo(url) {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      window.location.href = url;
    });
  } else {
    window.location.href = url;
  }
}

function createSanctuaryNav() {
  const current = detectCurrentSanctuary();
  const base = getBasePath();

  // Don't show on landing page or system pages
  if (!current) return;

  // Create toggle button
  const toggle = document.createElement('button');
  toggle.className = 'sanctuary-nav__toggle';
  toggle.setAttribute('aria-label', 'Navigate sanctuaries');
  toggle.innerHTML = '✦';
  document.body.appendChild(toggle);

  // Create nav bar
  const nav = document.createElement('nav');
  nav.className = 'sanctuary-nav';
  nav.setAttribute('aria-label', 'Sanctuary navigation');

  const scroll = document.createElement('div');
  scroll.className = 'sanctuary-nav__scroll';

  // Home link
  const homeLink = document.createElement('a');
  homeLink.href = base + 'index.html';
  homeLink.className = 'sanctuary-nav__item sanctuary-nav__item--home';
  homeLink.innerHTML = `<span>✦</span><span>Home</span>`;
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(homeLink.href);
  });
  scroll.appendChild(homeLink);

  // Sanctuary links
  SANCTUARIES.forEach((s) => {
    const link = document.createElement('a');
    link.href = base + s.slug + '/index.html';
    link.className = 'sanctuary-nav__item';
    if (s.id === current.id) {
      link.classList.add('sanctuary-nav__item--active');
    }
    link.innerHTML = `<span class="sanctuary-nav__num">${s.id}</span><span>${s.name}</span>`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.href);
    });
    scroll.appendChild(link);
  });

  nav.appendChild(scroll);
  document.body.appendChild(nav);

  // Toggle logic
  let isOpen = false;
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    nav.classList.toggle('is-visible', isOpen);
    toggle.classList.toggle('is-active', isOpen);
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (isOpen && !nav.contains(e.target) && !toggle.contains(e.target)) {
      isOpen = false;
      nav.classList.remove('is-visible');
      toggle.classList.remove('is-active');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      isOpen = false;
      nav.classList.remove('is-visible');
      toggle.classList.remove('is-active');
    }
  });

  // Scroll to active item on load
  requestAnimationFrame(() => {
    const active = scroll.querySelector('.sanctuary-nav__item--active');
    if (active) {
      active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  });

  // Show nav after scrolling past hero
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 300 && scrollY > lastScroll) {
      // Scrolling down past hero
      if (!isOpen) {
        toggle.style.opacity = '1';
        toggle.style.pointerEvents = 'auto';
      }
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Initially hide toggle
  toggle.style.opacity = '0';
  toggle.style.pointerEvents = 'none';
  toggle.style.transition = 'opacity 0.3s ease';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createSanctuaryNav);
} else {
  createSanctuaryNav();
}

export { SANCTUARIES, detectCurrentSanctuary };
