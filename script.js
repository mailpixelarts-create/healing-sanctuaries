/* ============================================
   HEALING SANCTUARIES — CINEMATIC SCRIPTS
   ============================================ */

// ---------- PRELOADER ----------
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  const counter = document.querySelector('.preloader-count');
  
  if (counter) {
    let count = 0;
    const target = 100;
    const duration = 2000;
    const stepTime = duration / target;
    
    const interval = setInterval(() => {
      count++;
      counter.textContent = count;
      
      if (count >= target) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('hidden');
          document.body.style.overflow = 'auto';
          initHeroAnimation();
        }, 300);
      }
    }, stepTime);
  }
  
  document.body.style.overflow = 'hidden';
});

// ---------- HERO ANIMATION ----------
function initHeroAnimation() {
  const heroTagline = document.querySelector('.hero-tagline');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');
  
  const elements = [heroTagline, heroTitle, heroSubtitle, heroCta];
  
  elements.forEach((el, index) => {
    if (el) {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }, index * 200);
    }
  });
}

// ---------- NAVIGATION SCROLL ----------
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ---------- MOBILE NAV TOGGLE ----------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ---------- SCROLL REVEAL ----------
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ---------- PARALLAX ----------
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(window.pageYOffset * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ---------- HERO PARALLAX ----------
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      heroBg.style.transform = `scale(1.1) translateY(${rate}px)`;
    });
  }
}

// ---------- CUSTOM CURSOR ----------
function initCustomCursor() {
  const cursor = document.querySelector('.cursor-dot');
  const follower = document.querySelector('.cursor-follower');
  
  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    });
    
    // Hover effect on links and buttons
    const hoverElements = document.querySelectorAll('a, button, .service-card');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('hover');
      });
    });
  }
}

// ---------- TILT EFFECT ----------
function initTiltEffect() {
  const cards = document.querySelectorAll('.service-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ---------- TEXT REVEAL ANIMATION ----------
function initTextReveal() {
  const textElements = document.querySelectorAll('.text-reveal');
  
  textElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.transition = `opacity 0.5s ease ${index * 0.03}s`;
      element.appendChild(span);
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.querySelectorAll('span').forEach(span => {
            span.style.opacity = '1';
          });
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  });
}

// ---------- INITIALIZE ----------
document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initHeroParallax();
  initCustomCursor();
  initTiltEffect();
  initTextReveal();
});

// ---------- PERFORMANCE: THROTTLE SCROLL ----------
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});
