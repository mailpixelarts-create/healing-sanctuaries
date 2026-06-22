/* ================================
   KABIRAJI HEALING — SCRIPT
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- NAVIGATION ---
  const navOrb = document.getElementById('navOrb');
  const hiddenNav = document.getElementById('hiddenNav');

  navOrb.addEventListener('click', () => {
    navOrb.classList.toggle('active');
    hiddenNav.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navOrb.classList.remove('active');
      hiddenNav.classList.remove('open');
    });
  });

  // --- SCROLL REVEAL ---
  const revealElements = document.querySelectorAll(
    '.about-inner, .sacred-heading, .section-label, .practice, ' +
    '.quote-translation, .arrival-details, .footer-inner'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- ENERGY PATH ANIMATION ---
  const practices = document.querySelectorAll('.practice');

  const practiceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        practiceObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  practices.forEach(p => practiceObserver.observe(p));

  // --- VERTICAL TEXT STAGGER ---
  const vtChars = document.querySelectorAll('.vt-char');

  const vtObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        vtChars.forEach((char, i) => {
          setTimeout(() => {
            char.classList.add('visible');
          }, i * 200);
        });
        vtObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  const vtSection = document.querySelector('.vertical-text');
  if (vtSection) vtObserver.observe(vtSection);

  // --- PARALLAX BLOBS ---
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const blobs = document.querySelectorAll('.blob');

        blobs.forEach((blob, i) => {
          const speed = 0.03 + i * 0.015;
          blob.style.transform = `translateY(${scrollY * speed}px)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  });

  // --- SMOOTH PARALLAX ON HERO TAGLINE ---
  const heroTagline = document.getElementById('heroTagline');

  window.addEventListener('scroll', () => {
    if (heroTagline) {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 500);
      const translateY = scrollY * 0.15;
      heroTagline.style.opacity = opacity;
      heroTagline.style.transform = `translateY(${translateY}px)`;
    }
  });

});
