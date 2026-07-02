/* ============================
   DaoDe Sound Healing — Script
   Particle Storm + Waveform Visualizer
   ============================ */

// ─── PARTICLE STORM (Singing Bowl) ───
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: null, y: null };
  const PARTICLE_COUNT = 1200;
  const BOWL_RADIUS_RATIO = 0.22;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.3 + 0.7;
      const bowlR = Math.min(W, H) * BOWL_RADIUS_RATIO * r;
      const centerX = W / 2;
      const centerY = H / 2 - 30;

      this.bowlX = centerX + Math.cos(angle) * bowlR;
      this.bowlY = centerY + Math.sin(angle) * bowlR * 0.55;
      this.x = this.bowlX;
      this.y = this.bowlY;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.hue = Math.random() > 0.5 ? 185 : 240;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.isShattered = false;
      this.shatterVx = 0;
      this.shatterVy = 0;
    }

    update(t) {
      if (this.isShattered) {
        this.x += this.shatterVx;
        this.y += this.shatterVy;
        this.shatterVx *= 0.995;
        this.shatterVy *= 0.995;
        this.alpha -= 0.003;
        if (this.alpha <= 0) this.reset();
        return;
      }

      const pulse = Math.sin(t * this.pulseSpeed + this.pulsePhase) * 2;
      const centerX = W / 2;
      const centerY = H / 2 - 30;
      const dx = this.bowlX - centerX;
      const dy = (this.bowlY - centerY) * 1.8;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      this.x = centerX + Math.cos(angle) * (dist + pulse);
      this.y = centerY + Math.sin(angle) * (dist + pulse) * 0.55;
      this.x += this.vx;
      this.y += this.vy;

      if (mouse.x !== null) {
        const mdx = this.x - mouse.x;
        const mdy = this.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 150) {
          const force = (150 - mDist) / 150;
          this.shatterVx += (mdx / mDist) * force * 8;
          this.shatterVy += (mdy / mDist) * force * 8;
          this.isShattered = true;
        }
      }
    }

    draw() {
      const c = this.hue === 185 ? `rgba(0, 240, 255, ${this.alpha})` : `rgba(80, 100, 255, ${this.alpha * 0.7})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  let time = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    time++;
    for (const p of particles) {
      p.update(time);
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  init();
  animate();
})();


// ─── MOBILE NAV ───
(function initNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
})();


// ─── SCROLL REVEAL ───
(function initReveal() {
  const sections = document.querySelectorAll(
    '.origin, .sacred-art__header, .art-card, .pillar, .visualizer__inner, .testimonial, .step, .contact__inner'
  );
  sections.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(el => observer.observe(el));
})();


// ─── WAVEFORM VISUALIZER (Web Audio API) ───
(function initVisualizer() {
  const btn = document.getElementById('micBtn');
  const idleOverlay = document.getElementById('visualizerIdle');
  const path1 = document.getElementById('waveformPath1');
  const path2 = document.getElementById('waveformPath2');
  const path3 = document.getElementById('waveformPath3');
  if (!btn || !path1) return;

  let audioCtx, analyser, dataArray, animFrame;
  let isRunning = false;

  btn.addEventListener('click', async () => {
    if (isRunning) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.82;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      idleOverlay.classList.add('hidden');
      isRunning = true;
      drawWaveform();
    } catch (err) {
      console.warn('Microphone access denied:', err);
      btn.querySelector('span').textContent = 'Mic Access Denied';
    }
  });

  function drawWaveform() {
    if (!isRunning) return;
    analyser.getByteTimeDomainData(dataArray);

    const svgWidth = 1024;
    const svgHeight = 300;
    const sliceWidth = svgWidth / dataArray.length;
    const centerY = svgHeight / 2;

    let d1 = '', d2 = '', d3 = '';

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y1 = centerY + (v - 1) * centerY * 0.9;
      const y2 = centerY + (v - 1) * centerY * 0.5;
      const y3 = centerY + (v - 1) * centerY * 0.3;
      const x = i * sliceWidth;

      if (i === 0) {
        d1 = `M${x},${y1}`;
        d2 = `M${x},${y2}`;
        d3 = `M${x},${y3}`;
      } else {
        const prevX = (i - 1) * sliceWidth;
        const cpX = (prevX + x) / 2;
        const prevV1 = dataArray[i - 1] / 128.0;
        const prevY1 = centerY + (prevV1 - 1) * centerY * 0.9;
        const prevY2 = centerY + (prevV1 - 1) * centerY * 0.5;
        const prevY3 = centerY + (prevV1 - 1) * centerY * 0.3;
        d1 += ` C${cpX},${prevY1} ${cpX},${y1} ${x},${y1}`;
        d2 += ` C${cpX},${prevY2} ${cpX},${y2} ${x},${y2}`;
        d3 += ` C${cpX},${prevY3} ${cpX},${y3} ${x},${y3}`;
      }
    }

    path1.setAttribute('d', d1);
    path2.setAttribute('d', d2);
    path3.setAttribute('d', d3);

    animFrame = requestAnimationFrame(drawWaveform);
  }
})();


// ─── NAV SCROLL EFFECT ───
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      nav.style.background = 'rgba(3, 7, 18, 0.85)';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.mixBlendMode = 'normal';
    } else {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.mixBlendMode = 'difference';
    }
    lastScroll = currentScroll;
  });
})();


// ─── FORM HANDLING ───
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Received ✓';
    btn.style.background = 'var(--signal)';
    btn.style.color = 'var(--ink)';
    btn.style.borderColor = 'var(--signal)';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3000);
  });
})();


// ─── SMOOTH ANCHOR SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
