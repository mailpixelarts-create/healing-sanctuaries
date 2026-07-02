// ==================== PERLIN NOISE ====================
class PerlinNoise {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    this.time = 0;
    this.particles = [];
    this.mouse = { x: 0, y: 0, active: false };
    this.ripples = [];
    this.grainSync = false;
    this.init();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 8000);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        baseX: Math.random() * this.canvas.width,
        baseY: Math.random() * this.canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.5 + 0.2
      });
    }
  }

  noise2D(x, y) {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  }

  smoothNoise(x, y) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const a = this.noise2D(ix, iy);
    const b = this.noise2D(ix + 1, iy);
    const c = this.noise2D(ix, iy + 1);
    const d = this.noise2D(ix + 1, iy + 1);
    return a + sx * (b - a) + sy * (c - a) + sx * sy * (a - b - c + d);
  }

  fbm(x, y) {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;
    for (let i = 0; i < 5; i++) {
      value += amplitude * this.smoothNoise(x * frequency, y * frequency);
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value;
  }

  addRipple(x, y) {
    this.ripples.push({
      x, y,
      radius: 0,
      maxRadius: 150 + Math.random() * 100,
      opacity: 0.6,
      speed: 2 + Math.random() * 2
    });
  }

  init() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
      if (Math.random() > 0.7) {
        this.addRipple(e.clientX, e.clientY);
      }
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });
    this.canvas.addEventListener('click', (e) => {
      for (let i = 0; i < 3; i++) {
        this.addRipple(e.clientX + (Math.random() - 0.5) * 40, e.clientY + (Math.random() - 0.5) * 40);
      }
    });
    this.animate();
  }

  animate() {
    this.time += 0.003;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const timeScale = this.grainSync ? this.beatPhase || 0 : 1;

    this.particles.forEach(p => {
      const nx = p.baseX * 0.002 + this.time * p.speed;
      const ny = p.baseY * 0.002 + this.time * 0.5;
      const displacement = this.fbm(nx, ny) * 60;

      p.x = p.baseX + Math.cos(displacement + this.time) * displacement;
      p.y = p.baseY + Math.sin(displacement + this.time * 0.7) * displacement;

      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (1 - dist / 200) * 80;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      this.ripples.forEach(r => {
        const dx = p.x - r.x;
        const dy = p.y - r.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ringDist = Math.abs(dist - r.radius);
        if (ringDist < 40) {
          const force = (1 - ringDist / 40) * r.opacity * 50;
          p.x += (dx / (dist || 1)) * force;
          p.y += (dy / (dist || 1)) * force;
        }
      });

      const opacity = p.opacity * (0.5 + timeScale * 0.5);
      const isNearMouse = this.mouse.active && Math.hypot(p.x - this.mouse.x, p.y - this.mouse.y) < 150;

      if (isNearMouse) {
        this.ctx.fillStyle = `rgba(156,56,66,${opacity * 1.5})`;
      } else {
        this.ctx.fillStyle = `rgba(232,221,208,${opacity})`;
      }
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ripples.forEach(r => {
      r.radius += r.speed;
      r.opacity *= 0.97;
      this.ctx.strokeStyle = `rgba(156,56,66,${r.opacity * 0.3})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });
    this.ripples = this.ripples.filter(r => r.opacity > 0.01);

    requestAnimationFrame(() => this.animate());
  }
}

// ==================== DRUM BEAT ====================
class DrumBeat {
  constructor() {
    this.isPlaying = false;
    this.bpm = 120;
    this.audioCtx = null;
    this.beatCallback = null;
  }

  init() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.value = 0.4;
    this.masterGain.connect(this.audioCtx.destination);
  }

  playDrum(time) {
    if (!this.audioCtx) this.init();

    const now = time || this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(60, now + 0.1);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.35);

    const noise = this.audioCtx.createBufferSource();
    const buffer = this.audioCtx.createBuffer(1, this.audioCtx.sampleRate * 0.1, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.audioCtx.sampleRate * 0.02));
    }
    noise.buffer = buffer;

    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 300;
    noiseFilter.Q.value = 1;

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.15);
  }

  scheduleBeats() {
    if (!this.isPlaying) return;

    const beatDuration = 60 / this.bpm;
    const now = this.audioCtx.currentTime;

    for (let i = 0; i < 16; i++) {
      const time = now + i * beatDuration;
      const isAccent = i % 4 === 0;
      setTimeout(() => {
        if (this.isPlaying) {
          this.playDrum();
          if (this.beatCallback) this.beatCallback(isAccent);
        }
      }, (time - now) * 1000);
    }

    setTimeout(() => {
      if (this.isPlaying) this.scheduleBeats();
    }, 16 * beatDuration * 1000 - 100);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  play() {
    if (!this.audioCtx) this.init();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.isPlaying = true;
    this.scheduleBeats();
  }

  stop() {
    this.isPlaying = false;
  }

  changeTempo() {
    const tempos = [80, 100, 120, 140, 160];
    const currentIndex = tempos.indexOf(this.bpm);
    this.bpm = tempos[(currentIndex + 1) % tempos.length];
    return this.bpm;
  }
}

// ==================== SITE CONTROLLER ====================
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('noise-canvas');
  const perlin = new PerlinNoise(canvas);
  const drumBeat = new DrumBeat();
  const drumCenter = document.getElementById('drumCenter');
  const drumBeatEl = document.getElementById('drumBeat');
  const drumBpm = document.getElementById('drumBpm');
  const grainOverlay = document.querySelector('.grain-overlay');

  let beatPhase = 0;

  drumCenter.addEventListener('click', (e) => {
    e.stopPropagation();
    const newBpm = drumBeat.changeTempo();
    drumBpm.textContent = newBpm + ' BPM';
    drumBeat.toggle();
    drumBeatEl.classList.toggle('playing', drumBeat.isPlaying);

    if (drumBeat.isPlaying) {
      drumBeat.beatCallback = (isAccent) => {
        beatPhase = isAccent ? 1 : 0.5;
        perlin.grainSync = true;
        perlin.beatPhase = beatPhase;
        grainOverlay.style.opacity = isAccent ? '0.45' : '0.35';
        setTimeout(() => {
          beatPhase = 0.3;
          perlin.beatPhase = beatPhase;
          grainOverlay.style.opacity = '0.3';
        }, 150);
      };
    } else {
      perlin.grainSync = false;
      grainOverlay.style.opacity = '0.3';
    }
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .art-card, .pillar, .testimonial-card, .journey-step, .about-stats, .section-label, .healer-name, .about-text, .about-divider, .contact-address, .contact-cta, .mechanism-content, .process-step, .vow-content, .faq-item, .lexicon-item, .try-now-content').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Active nav tracking
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.nav-dot').forEach(n => n.classList.remove('active'));
        const dot = document.querySelector(`.nav-dot[data-section="${e.target.id}"]`);
        if (dot) dot.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

  // Smooth scroll nav
  document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Hero scroll
  document.getElementById('heroScroll')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Try This Now Timer
  const timerBtn = document.getElementById('timerBtn');
  const timerDisplay = document.getElementById('timerDisplay');
  let timerInterval = null;
  let timerRunning = false;

  if (timerBtn && timerDisplay) {
    timerBtn.addEventListener('click', () => {
      if (timerRunning) {
        clearInterval(timerInterval);
        timerBtn.textContent = 'Begin 3-Minute Drift';
        timerBtn.classList.remove('active');
        timerDisplay.textContent = '3:00';
        timerRunning = false;
        return;
      }

      timerRunning = true;
      timerBtn.textContent = 'End Session';
      timerBtn.classList.add('active');
      let seconds = 180;

      timerInterval = setInterval(() => {
        seconds--;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

        if (seconds <= 0) {
          clearInterval(timerInterval);
          timerBtn.textContent = 'Session Complete';
          timerBtn.classList.remove('active');
          timerRunning = false;
          setTimeout(() => {
            timerBtn.textContent = 'Begin 3-Minute Drift';
            timerDisplay.textContent = '3:00';
          }, 2000);
        }
      }, 1000);
    });
  }
});
