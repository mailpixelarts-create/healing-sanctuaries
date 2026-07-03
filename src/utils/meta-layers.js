// ============================================
// HEALING SANCTUARIES — SHARED META-LAYERS
// Behavioral layers per Section II of heal.md
// ============================================

// --- Outcome Tracker ---
export function initOutcomeTracker() {
  const tracker = document.createElement('div');
  tracker.className = 'hs-tracker';
  tracker.innerHTML = `
    <button class="hs-tracker__toggle" aria-label="Open outcome tracker">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
        <path d="M10 5v5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="hs-tracker__panel">
      <p class="hs-tracker__label">How are you feeling?</p>
      <input type="range" class="hs-tracker__slider" min="1" max="10" value="5" />
      <p class="hs-tracker__value">5</p>
      <textarea class="hs-tracker__note" placeholder="I noticed that..." rows="2"></textarea>
      <button class="hs-tracker__save">Save</button>
    </div>
  `;
  document.body.appendChild(tracker);

  const slider = tracker.querySelector('.hs-tracker__slider');
  const value = tracker.querySelector('.hs-tracker__value');
  const toggle = tracker.querySelector('.hs-tracker__toggle');
  const panel = tracker.querySelector('.hs-tracker__panel');
  const save = tracker.querySelector('.hs-tracker__save');
  const note = tracker.querySelector('.hs-tracker__note');

  slider.addEventListener('input', () => {
    value.textContent = slider.value;
  });

  toggle.addEventListener('click', () => {
    panel.classList.toggle('is-open');
  });

  save.addEventListener('click', () => {
    const entries = JSON.parse(localStorage.getItem('hs-tracker') || '[]');
    entries.push({
      date: new Date().toISOString(),
      value: parseInt(slider.value),
      note: note.value,
    });
    if (entries.length > 5) entries.shift();
    localStorage.setItem('hs-tracker', JSON.stringify(entries));
    panel.classList.remove('is-open');
    note.value = '';
  });
}

// --- Skeptic's Corner ---
export function initSkepticsCorner(data) {
  if (!data || !data.length) return;

  const corner = document.createElement('div');
  corner.className = 'hs-skeptics';
  corner.innerHTML = `
    <details class="hs-skeptics__details">
      <summary class="hs-skeptics__trigger">For Skeptics</summary>
      <div class="hs-skeptics__content">
        ${data.map((q) => `
          <div class="hs-skeptics__item">
            <p class="hs-skeptics__q">${q.question}</p>
            <p class="hs-skeptics__a">${q.answer}</p>
          </div>
        `).join('')}
      </div>
    </details>
  `;
  document.body.appendChild(corner);
}

// --- Translation Layer ---
export function initTranslation(translations) {
  if (!translations) return;

  const btn = document.createElement('button');
  btn.className = 'hs-translation';
  btn.textContent = 'EN';
  document.body.appendChild(btn);

  const langs = ['EN', 'ES', 'HI'];
  let current = 0;

  btn.addEventListener('click', () => {
    current = (current + 1) % langs.length;
    const lang = langs[current];
    btn.textContent = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  });
}

// --- JSON-LD Structured Data ---
export function addStructuredData(data) {
  if (!data) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
