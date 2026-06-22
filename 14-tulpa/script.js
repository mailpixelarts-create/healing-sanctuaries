(() => {
  'use strict';

  // ═══════════════════════════════════════════
  // HERO PARTICLES — floating thought-form words
  // ═══════════════════════════════════════════
  const heroParticles = document.getElementById('hero-particles');
  const thoughtWords = ['THINK', 'FORM', 'SHAPE', 'CREATE', 'MIND', 'TULPA', 'EGEREGO', 'SOUL', 'VOID', 'MANIFEST', 'INTENT', 'WILL'];

  function createHeroParticle() {
    const el = document.createElement('span');
    el.classList.add('hero-particle');
    el.textContent = thoughtWords[Math.floor(Math.random() * thoughtWords.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (Math.random() * 1.5 + 0.6) + 'rem';
    el.style.animationDuration = (Math.random() * 6 + 6) + 's';
    el.style.animationDelay = Math.random() * 4 + 's';
    heroParticles.appendChild(el);
    setTimeout(() => el.remove(), 14000);
  }

  setInterval(createHeroParticle, 800);
  for (let i = 0; i < 8; i++) setTimeout(createHeroParticle, i * 200);

  // ═══════════════════════════════════════════
  // SCROLL REVEAL — Kinetic Words & About Text
  // ═══════════════════════════════════════════
  const kineticWords = document.querySelectorAll('.kinetic-word');
  const aboutTexts = document.querySelectorAll('.about-text .word');
  const practiceCards = document.querySelectorAll('.practice-card');

  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

  const kineticObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  kineticWords.forEach(word => kineticObserver.observe(word));

  // About text word-by-word reveal
  let aboutRevealed = new Set();
  const aboutTextObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const p = entry.target.closest('.about-text');
        const idx = p ? p.dataset.reveal : '0';
        if (aboutRevealed.has(idx)) return;
        aboutRevealed.add(idx);
        const words = p.querySelectorAll('.word');
        words.forEach((w, i) => {
          setTimeout(() => w.classList.add('visible'), i * 40);
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.about-text').forEach(p => aboutTextObserver.observe(p));

  // Practice cards stagger
  const practiceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });

  practiceCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.15}s`;
    practiceObserver.observe(card);
  });

  // ═══════════════════════════════════════════
  // PARALLAX — About Title vertical text
  // ═══════════════════════════════════════════
  const aboutTitle = document.querySelector('.about-title');
  if (aboutTitle) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      aboutTitle.style.transform = `translateY(calc(-50% + ${scrolled * 0.15}px))`;
    }, { passive: true });
  }

  // ═══════════════════════════════════════════
  // QUOTE — Words appear and disappear cyclically
  // ═══════════════════════════════════════════
  const quoteWords = document.querySelectorAll('.quote-word');
  let quoteCycle = 0;

  function cycleQuote() {
    quoteCycle++;
    quoteWords.forEach((word, i) => {
      const phase = (quoteCycle + i) % 4;
      if (phase === 0) {
        word.classList.remove('disappear', 'reappear');
      } else if (phase === 2) {
        word.classList.add('disappear');
        word.classList.remove('reappear');
      } else if (phase === 3) {
        word.classList.remove('disappear');
        word.classList.add('reappear');
      }
    });
  }

  setInterval(cycleQuote, 3000);

  // ═══════════════════════════════════════════
  // FOOTER DISSOLVE — particles on scroll
  // ═══════════════════════════════════════════
  const footerDissolve = document.getElementById('footer-dissolve');
  const footerSection = document.getElementById('footer');
  let footerTriggered = false;

  function spawnDissolveParticles() {
    if (footerTriggered) return;
    footerTriggered = true;
    const words = footerDissolve.querySelectorAll('.dissolve-word');
    words.forEach((word, i) => {
      setTimeout(() => {
        const rect = word.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        for (let p = 0; p < 12; p++) {
          const particle = document.createElement('span');
          particle.classList.add('dissolve-particle');
          particle.style.left = cx + 'px';
          particle.style.top = cy + 'px';
          particle.style.setProperty('--tx', (Math.random() * 120 - 60) + 'px');
          particle.style.setProperty('--ty', (Math.random() * -100 - 30) + 'px');
          document.body.appendChild(particle);
          setTimeout(() => particle.remove(), 2000);
        }
        word.style.opacity = '0';
        word.style.transform = 'scale(0.5)';
        word.style.filter = 'blur(8px)';
      }, i * 200);
    });
  }

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        spawnDissolveParticles();
      }
    });
  }, { threshold: 0.5 });

  if (footerSection) footerObserver.observe(footerSection);

  // ═══════════════════════════════════════════
  // GLITCH BURST — Random hero glitch intensification
  // ═══════════════════════════════════════════
  const heroWord = document.querySelector('.hero-word');
  if (heroWord) {
    setInterval(() => {
      heroWord.style.animationDuration = '0.15s';
      setTimeout(() => {
        heroWord.style.animationDuration = '0.8s';
      }, 200);
    }, 4000);
  }

  // ═══════════════════════════════════════════
  // MOUSE TRAIL — magenta energy on cursor
  // ═══════════════════════════════════════════
  let trailThrottle = 0;
  document.addEventListener('mousemove', (e) => {
    trailThrottle++;
    if (trailThrottle % 3 !== 0) return;
    const dot = document.createElement('span');
    dot.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 4px;
      height: 4px;
      background: #e91e63;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.6;
      transition: all 0.8s ease;
    `;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * -40 - 10}px) scale(0)`;
    });
    setTimeout(() => dot.remove(), 900);
  });

  // ═══════════════════════════════════════════
  // FORM INTERACTION
  // ═══════════════════════════════════════════
  const form = document.getElementById('arrival-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.arrival-input');
      const btn = form.querySelector('.arrival-btn');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span class="btn-text">RECEIVED</span><span class="btn-arrow">✓</span>';
      btn.style.background = '#9c27b0';
      input.value = '';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
      }, 2500);
    });
  }

  // ═══════════════════════════════════════════
  // PULSE DOT — scroll to top
  // ═══════════════════════════════════════════
  const pulseDot = document.querySelector('.pulse-dot');
  if (pulseDot) {
    pulseDot.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
