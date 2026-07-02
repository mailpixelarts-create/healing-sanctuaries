/* ========================================
   ART THERAPY — LUNA CHROMATIC
   ======================================== */

(function () {
  'use strict';

  const COLORS = ['#FF3366', '#33FF66', '#3366FF', '#FFCC00', '#FF6633', '#66FF33', '#33CCFF', '#FF33CC'];

  /* ----------------------------------------
     GRID COLLAPSE HERO
     ---------------------------------------- */
  function initGridCollapse() {
    const overlay = document.getElementById('gridOverlay');
    const heroCanvas = document.getElementById('heroCanvas');
    const heroContent = document.getElementById('heroContent');
    if (!overlay) return;

    const ctx = heroCanvas.getContext('2d');
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;

    // Draw painted squares on hero canvas
    for (let i = 0; i < 16; i++) {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const w = heroCanvas.width / 4;
      const h = heroCanvas.height / 4;
      const x = col * w;
      const y = row * h;

      // Layer multiple colors for painterly effect
      ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x, y, w, h);

      // Brush stroke texture
      ctx.globalAlpha = 0.4;
      for (let s = 0; s < 5; s++) {
        ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
        const sx = x + Math.random() * w * 0.6;
        const sy = y + Math.random() * h * 0.6;
        const sw = w * 0.3 + Math.random() * w * 0.5;
        const sh = h * 0.1 + Math.random() * h * 0.15;
        ctx.save();
        ctx.translate(sx + sw / 2, sy + sh / 2);
        ctx.rotate((Math.random() - 0.5) * 0.5);
        ctx.fillRect(-sw / 2, -sh / 2, sw, sh);
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;

    // Create grid tiles
    const tiles = [];
    for (let i = 0; i < 16; i++) {
      const tile = document.createElement('div');
      tile.className = 'grid-tile';
      const col = i % 4;
      const row = Math.floor(i / 4);
      tile.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];

      // Random rotation parameters for collapse
      const rx = (Math.random() - 0.5) * 60;
      const ry = (Math.random() - 0.5) * 60;
      tile.style.setProperty('--rx', rx + 'deg');
      tile.style.setProperty('--ry', ry + 'deg');
      tile.style.setProperty('--rx-end', (rx > 0 ? 90 : -90) + 'deg');
      tile.style.setProperty('--ry-end', (ry > 0 ? 60 : -60) + 'deg');

      overlay.appendChild(tile);
      tiles.push({ el: tile, delay: i * 80 + Math.random() * 200 });
    }

    // Staggered collapse on load
    setTimeout(() => {
      tiles.forEach(({ el, delay }) => {
        setTimeout(() => el.classList.add('collapse'), delay);
      });

      // Show content after grid collapses
      const maxDelay = Math.max(...tiles.map(t => t.delay)) + 900;
      setTimeout(() => {
        heroContent.classList.add('visible');
        triggerGlitch();
      }, maxDelay);
    }, 600);
  }

  /* ----------------------------------------
     FINGER-PAINT CANVAS
     ---------------------------------------- */
  function initFingerPaint() {
    const canvas = document.getElementById('fingerPaint');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.putImageData(data, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    let brushSize = 30;
    let currentColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    document.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;

      const x = e.clientX;
      const y = e.clientY;

      // Smudged trail with multiple overlapping strokes
      ctx.globalAlpha = 0.15;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Main stroke
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.stroke();

      // Secondary blurred stroke
      ctx.globalAlpha = 0.08;
      ctx.beginPath();
      ctx.moveTo(lastX + (Math.random() - 0.5) * 20, lastY + (Math.random() - 0.5) * 20);
      ctx.lineTo(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20);
      ctx.strokeStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
      ctx.lineWidth = brushSize * 1.8;
      ctx.stroke();

      // Tertiary feathered stroke
      ctx.globalAlpha = 0.04;
      ctx.beginPath();
      ctx.arc(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, brushSize * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
      ctx.fill();

      ctx.globalAlpha = 1;

      lastX = x;
      lastY = y;

      // Shift color occasionally
      hue += 0.5;
      if (Math.random() < 0.01) {
        currentColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      if (Math.random() < 0.005) {
        brushSize = 15 + Math.random() * 40;
      }
    });

    document.addEventListener('mousedown', (e) => {
      isDrawing = true;
      lastX = e.clientX;
      lastY = e.clientY;
      currentColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      brushSize = 20 + Math.random() * 30;
    });

    document.addEventListener('mouseup', () => { isDrawing = false; });

    // Touch support
    document.addEventListener('touchstart', (e) => {
      isDrawing = true;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      currentColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!isDrawing) return;
      const touch = e.touches[0];
      const fakeEvent = { clientX: touch.clientX, clientY: touch.clientY };
      document.dispatchEvent(new MouseEvent('mousemove', fakeEvent));
    }, { passive: true });

    document.addEventListener('touchend', () => { isDrawing = false; });
  }

  /* ----------------------------------------
     GLITCH EFFECT
     ---------------------------------------- */
  function triggerGlitch() {
    document.body.classList.add('glitch-active');
    setTimeout(() => document.body.classList.remove('glitch-active'), 800);
  }

  // Random periodic glitches
  function scheduleGlitches() {
    setInterval(() => {
      if (Math.random() < 0.3) triggerGlitch();
    }, 5000);
  }

  /* ----------------------------------------
     SIGNAL COLOR FLASHING
     ---------------------------------------- */
  function initSignalFlash() {
    const labels = document.querySelectorAll('.section-label');
    setInterval(() => {
      labels.forEach(label => {
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        label.style.color = c;
        label.style.borderColor = c;
      });
    }, 3000);
  }

  /* ----------------------------------------
     INIT
     ---------------------------------------- */
  window.addEventListener('DOMContentLoaded', () => {
    initGridCollapse();
    initFingerPaint();
    scheduleGlitches();
    initSignalFlash();
  });

})();
