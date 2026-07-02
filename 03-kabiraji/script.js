/* ═══════════════════════════════════════════
   YOGA — Devi Sunflowerr
   script.js
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Hero Canvas — Morphing Silhouette ───
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, time = 0, scrollProgress = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Blob points for organic morph
  function getBlobPoints(cx, cy, radius, count, t, seed) {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const noise =
        Math.sin(angle * 3 + t * 0.5 + seed) * 0.25 +
        Math.cos(angle * 5 + t * 0.3 + seed * 2) * 0.15 +
        Math.sin(angle * 7 + t * 0.7 + seed * 0.5) * 0.1;
      const r = radius * (1 + noise);
      pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
    }
    return pts;
  }

  function drawOrganicSilhouette(t) {
    ctx.clearRect(0, 0, W, H);

    const scroll = scrollProgress;
    const baseY = H * 0.5;
    const headR = 30 + scroll * 5;

    // Morphing terracotta color
    const alpha = 0.12 + Math.sin(t * 0.3) * 0.04;
    ctx.fillStyle = `rgba(232, 93, 4, ${alpha})`;

    // Body — transitions from standing (mountain) to bent (downward dog)
    const bendAmount = Math.min(scroll * 1.5, 1);
    const bodyOffsetX = bendAmount * W * 0.08;
    const bodyOffsetY = bendAmount * H * 0.15;

    // Torso blob
    const torso = getBlobPoints(
      W * 0.5 + bodyOffsetX,
      baseY + bodyOffsetY,
      50 + bendAmount * 30,
      12,
      t,
      1
    );
    ctx.beginPath();
    ctx.moveTo(torso[0].x, torso[0].y);
    for (let i = 0; i < torso.length; i++) {
      const next = torso[(i + 1) % torso.length];
      const cpx = (torso[i].x + next.x) / 2;
      const cpy = (torso[i].y + next.y) / 2;
      ctx.quadraticCurveTo(torso[i].x, torso[i].y, cpx, cpy);
    }
    ctx.closePath();
    ctx.fill();

    // Head
    const headCx = W * 0.5 + bodyOffsetX - bendAmount * 20;
    const headCy = baseY - 80 + bodyOffsetY * 0.3;
    const headPts = getBlobPoints(headCx, headCy, headR, 10, t, 2);
    ctx.beginPath();
    ctx.moveTo(headPts[0].x, headPts[0].y);
    for (let i = 0; i < headPts.length; i++) {
      const next = headPts[(i + 1) % headPts.length];
      const cpx = (headPts[i].x + next.x) / 2;
      const cpy = (headPts[i].y + next.y) / 2;
      ctx.quadraticCurveTo(headPts[i].x, headPts[i].y, cpx, cpy);
    }
    ctx.closePath();
    ctx.fill();

    // Arms — spread in downward dog
    const armSpread = bendAmount * 120;
    const armY = baseY + bodyOffsetY + (1 - bendAmount) * (-10);
    const leftArmPts = getBlobPoints(
      W * 0.5 - 40 - armSpread,
      armY,
      18 + bendAmount * 10,
      8,
      t,
      3
    );
    ctx.beginPath();
    ctx.moveTo(leftArmPts[0].x, leftArmPts[0].y);
    for (let i = 0; i < leftArmPts.length; i++) {
      const next = leftArmPts[(i + 1) % leftArmPts.length];
      const cpx = (leftArmPts[i].x + next.x) / 2;
      const cpy = (leftArmPts[i].y + next.y) / 2;
      ctx.quadraticCurveTo(leftArmPts[i].x, leftArmPts[i].y, cpx, cpy);
    }
    ctx.closePath();
    ctx.fill();

    const rightArmPts = getBlobPoints(
      W * 0.5 + 40 + armSpread,
      armY,
      18 + bendAmount * 10,
      8,
      t,
      4
    );
    ctx.beginPath();
    ctx.moveTo(rightArmPts[0].x, rightArmPts[0].y);
    for (let i = 0; i < rightArmPts.length; i++) {
      const next = rightArmPts[(i + 1) % rightArmPts.length];
      const cpx = (rightArmPts[i].x + next.x) / 2;
      const cpy = (rightArmPts[i].y + next.y) / 2;
      ctx.quadraticCurveTo(rightArmPts[i].x, rightArmPts[i].y, cpx, cpy);
    }
    ctx.closePath();
    ctx.fill();

    // Legs — wider stance in downward dog
    const legSpread = 30 + bendAmount * 40;
    const legExtend = bendAmount * 60;
    const legPtsL = getBlobPoints(
      W * 0.5 - legSpread,
      baseY + 60 + legExtend,
      16 + bendAmount * 8,
      8,
      t,
      5
    );
    ctx.beginPath();
    ctx.moveTo(legPtsL[0].x, legPtsL[0].y);
    for (let i = 0; i < legPtsL.length; i++) {
      const next = legPtsL[(i + 1) % legPtsL.length];
      ctx.quadraticCurveTo(legPtsL[i].x, legPtsL[i].y, (legPtsL[i].x + next.x) / 2, (legPtsL[i].y + next.y) / 2);
    }
    ctx.closePath();
    ctx.fill();

    const legPtsR = getBlobPoints(
      W * 0.5 + legSpread,
      baseY + 60 + legExtend,
      16 + bendAmount * 8,
      8,
      t,
      6
    );
    ctx.beginPath();
    ctx.moveTo(legPtsR[0].x, legPtsR[0].y);
    for (let i = 0; i < legPtsR.length; i++) {
      const next = legPtsR[(i + 1) % legPtsR.length];
      ctx.quadraticCurveTo(legPtsR[i].x, legPtsR[i].y, (legPtsR[i].x + next.x) / 2, (legPtsR[i].y + next.y) / 2);
    }
    ctx.closePath();
    ctx.fill();

    // Second silhouette layer (offset, lighter)
    ctx.fillStyle = `rgba(232, 93, 4, ${alpha * 0.4})`;
    const off = 20 + Math.sin(t * 0.2) * 5;
    const torso2 = getBlobPoints(W * 0.5 + off, baseY - 10, 45, 10, t + 1, 7);
    ctx.beginPath();
    ctx.moveTo(torso2[0].x, torso2[0].y);
    for (let i = 0; i < torso2.length; i++) {
      const next = torso2[(i + 1) % torso2.length];
      ctx.quadraticCurveTo(torso2[i].x, torso2[i].y, (torso2[i].x + next.x) / 2, (torso2[i].y + next.y) / 2);
    }
    ctx.closePath();
    ctx.fill();
  }

  function animateHero() {
    time += 0.016;
    drawOrganicSilhouette(time);
    requestAnimationFrame(animateHero);
  }
  animateHero();

  // Scroll progress for hero morph
  window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const rect = hero.getBoundingClientRect();
    scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
    document.getElementById('scrollHint').style.opacity = 1 - scrollProgress * 3;
  });

  // ─── Section Reveal on Scroll ───
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  // ─── Chakra Nav Toggle ───
  const toggle = document.getElementById('chakraToggle');
  const wheel = document.getElementById('chakraWheel');
  toggle.addEventListener('click', () => {
    wheel.classList.toggle('open');
  });
  wheel.querySelectorAll('.chakra-petal').forEach((p) => {
    p.addEventListener('click', () => wheel.classList.remove('open'));
  });

  // ─── Asana Flow Builder (Drag & Drop + localStorage) ───
  const STORAGE_KEY = 'devi-yoga-flow';
  const timelineSlots = document.querySelectorAll('.timeline-slot');
  const flowData = [null, null, null];

  // Restore saved flow
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved)) {
      saved.forEach((pose, i) => {
        if (pose && i < 3) flowData[i] = pose;
      });
    }
  } catch (_) {}

  function updateSlotUI() {
    timelineSlots.forEach((slot, i) => {
      const existing = slot.querySelector('.slot-pose-name');
      if (existing) existing.remove();
      const existingRemove = slot.querySelector('.slot-remove');
      if (existingRemove) existingRemove.remove();
      const hint = slot.querySelector('.slot-hint');
      const label = slot.querySelector('.slot-label');

      if (flowData[i]) {
        slot.classList.add('filled');
        const name = document.createElement('span');
        name.className = 'slot-pose-name';
        name.textContent = flowData[i].name;
        slot.appendChild(name);

        const remove = document.createElement('button');
        remove.className = 'slot-remove';
        remove.textContent = '\u00D7';
        remove.addEventListener('click', () => {
          flowData[i] = null;
          updateSlotUI();
          saveFlow();
        });
        slot.appendChild(remove);

        label.style.display = 'none';
      } else {
        slot.classList.remove('filled');
        label.style.display = '';
      }
    });

    // Update timer
    const total = flowData.reduce((sum, p) => sum + (p ? p.duration : 0), 0);
    const m = Math.floor(total / 60);
    const s = total % 60;
    document.getElementById('timerDisplay').textContent = `${m}:${s.toString().padStart(2, '0')}`;

    // Enable/disable start
    const allFilled = flowData.every(Boolean);
    document.getElementById('startFlow').disabled = !allFilled;
  }

  function saveFlow() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flowData));
  }

  // Drag events on pose cards
  document.querySelectorAll('.pose-card').forEach((card) => {
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', JSON.stringify({
        pose: card.dataset.pose,
        name: card.querySelector('.pose-name').textContent,
        duration: parseInt(card.dataset.duration, 10),
      }));
      e.dataTransfer.effectAllowed = 'copy';
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
  });

  // Drop targets
  timelineSlots.forEach((slot, i) => {
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      slot.classList.add('drag-over');
    });
    slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (data && data.pose) {
          flowData[i] = data;
          updateSlotUI();
          saveFlow();
        }
      } catch (_) {}
    });
  });

  // Reset button
  document.getElementById('resetFlow').addEventListener('click', () => {
    flowData[0] = flowData[1] = flowData[2] = null;
    updateSlotUI();
    saveFlow();
    stopTimer();
  });

  // ─── Flow Timer ───
  let timerInterval = null;
  let timerRunning = false;

  function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('startFlow').textContent = 'Start Flow';
  }

  document.getElementById('startFlow').addEventListener('click', function () {
    if (timerRunning) {
      stopTimer();
      return;
    }

    const total = flowData.reduce((sum, p) => sum + (p ? p.duration : 0), 0);
    let remaining = total;
    const display = document.getElementById('timerDisplay');
    timerRunning = true;
    this.textContent = 'Pause';

    timerInterval = setInterval(() => {
      if (remaining <= 0) {
        stopTimer();
        display.textContent = 'Namaste';
        setTimeout(() => {
          const t = flowData.reduce((s, p) => s + (p ? p.duration : 0), 0);
          const m = Math.floor(t / 60);
          const s = t % 60;
          display.textContent = `${m}:${s.toString().padStart(2, '0')}`;
        }, 2000);
        return;
      }
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      display.textContent = `${m}:${s.toString().padStart(2, '0')}`;
      remaining--;
    }, 1000);
  });

  // Init
  updateSlotUI();
})();
