/* ============================================================
   SANCTUARY META-LAYER v1.0
   Shared across all 14 healing modalities
   ============================================================ */

// 1. FIRST-TIME VISITOR MODAL
function initFirstTimeVisitor() {
    if (sessionStorage.getItem('sanctuary-visited')) return;
    
    const modal = document.createElement('div');
    modal.className = 'sv-modal';
    modal.innerHTML = `
        <div class="sv-modal-content">
            <h2>What are you feeling right now?</h2>
            <p class="sv-modal-sub">We'll guide you to the right sanctuary.</p>
            <div class="sv-modal-options">
                <button class="sv-modal-btn" data-feeling="anxious" onclick="handleFeeling('anxious')">Anxious</button>
                <button class="sv-modal-btn" data-feeling="aching" onclick="handleFeeling('aching')">Physically Aching</button>
                <button class="sv-modal-btn" data-feeling="disconnected" onclick="handleFeeling('disconnected')">Disconnected</button>
                <button class="sv-modal-btn" data-feeling="curious" onclick="handleFeeling('curious')">Just Curious</button>
            </div>
            <button class="sv-modal-close" onclick="closeModal()">Skip</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    const style = document.createElement('style');
    style.textContent = `
        .sv-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 100000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s; }
        .sv-modal.active { opacity: 1; }
        .sv-modal-content { max-width: 500px; text-align: center; padding: 3rem; }
        .sv-modal-content h2 { font-family: var(--font-display, serif); font-size: 2rem; margin-bottom: 0.5rem; color: var(--paper, #F7F5F0); }
        .sv-modal-sub { font-size: 0.9rem; opacity: 0.6; margin-bottom: 2rem; color: var(--paper, #F7F5F0); }
        .sv-modal-options { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .sv-modal-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: var(--paper, #F7F5F0); padding: 1rem 2rem; font-size: 1rem; cursor: pointer; transition: all 0.3s; font-family: var(--font-body, sans-serif); }
        .sv-modal-btn:hover { border-color: var(--signal, #C9A96E); color: var(--signal, #C9A96E); background: rgba(201,169,110,0.05); }
        .sv-modal-close { background: none; border: none; color: rgba(255,255,255,0.4); cursor: pointer; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => modal.classList.add('active'), 500);
    sessionStorage.setItem('sanctuary-visited', 'true');
}

function handleFeeling(feeling) {
    const routes = {
        anxious: ['meditation', 'breathwork', 'sound-healing'],
        aching: ['reiki', 'acupuncture', 'qi-gong'],
        disconnected: ['shamanic', 'art-therapy', 'chakra'],
        curious: ['crystal', 'aromatherapy', 'ayurveda']
    };
    const el = document.querySelector('.sv-modal');
    if (el) el.style.display = 'none';
}

function closeModal() {
    const el = document.querySelector('.sv-modal');
    if (el) el.style.display = 'none';
}

// 2. PRACTITIONER ORIGIN STORY
function addPractitionerStory(container, story) {
    const html = `
        <div class="sv-practitioner">
            <div class="sv-practitioner-portrait"></div>
            <div class="sv-practitioner-text">
                <h4>Your Guide</h4>
                <p>${story}</p>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

// 3. OUTCOME TRACKER (LOCAL STORAGE)
function initOutcomeTracker() {
    const tracker = document.createElement('div');
    tracker.className = 'sv-tracker';
    tracker.innerHTML = `
        <div class="sv-tracker-inner">
            <h4>How do you feel today?</h4>
            <div class="sv-tracker-scale">
                ${[1,2,3,4,5,6,7,8,9,10].map(n => `<button class="sv-tracker-num" data-num="${n}">${n}</button>`).join('')}
            </div>
            <textarea class="sv-tracker-input" placeholder="What shifted? (optional)"></textarea>
            <button class="sv-tracker-save">Save Entry</button>
            <div class="sv-tracker-history"></div>
        </div>
    `;
    document.body.appendChild(tracker);
    
    const style = document.createElement('style');
    style.textContent = `
        .sv-tracker { position: fixed; bottom: 80px; right: 20px; width: 300px; background: rgba(18,15,14,0.95); border: 1px solid rgba(201,169,110,0.2); padding: 1.5rem; z-index: 9998; display: none; backdrop-filter: blur(10px); }
        .sv-tracker.active { display: block; }
        .sv-tracker h4 { font-family: var(--font-display, serif); font-size: 0.9rem; margin-bottom: 1rem; color: var(--paper, #F7F5F0); }
        .sv-tracker-scale { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .sv-tracker-num { width: 30px; height: 30px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: var(--paper, #F7F5F0); cursor: pointer; font-size: 0.75rem; transition: all 0.3s; }
        .sv-tracker-num:hover, .sv-tracker-num.selected { border-color: var(--signal, #C9A96E); color: var(--signal, #C9A96E); background: rgba(201,169,110,0.1); }
        .sv-tracker-input { width: 100%; background: transparent; border: 1px solid rgba(255,255,255,0.1); color: var(--paper, #F7F5F0); padding: 0.5rem; font-size: 0.8rem; resize: none; margin-bottom: 0.5rem; font-family: var(--font-body, sans-serif); }
        .sv-tracker-save { width: 100%; padding: 0.5rem; background: var(--signal, #C9A96E); color: var(--ink, #120F0E); border: none; cursor: pointer; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; }
        .sv-tracker-history { margin-top: 1rem; max-height: 150px; overflow-y: auto; }
        .sv-tracker-entry { font-size: 0.7rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); }
    `;
    document.head.appendChild(style);
    
    // Load history
    const history = JSON.parse(localStorage.getItem('sanctuary-tracker') || '[]');
    renderTrackerHistory(history);
    
    // Number selection
    tracker.querySelectorAll('.sv-tracker-num').forEach(btn => {
        btn.addEventListener('click', () => {
            tracker.querySelectorAll('.sv-tracker-num').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
    
    // Save
    tracker.querySelector('.sv-tracker-save').addEventListener('click', () => {
        const selected = tracker.querySelector('.sv-tracker-num.selected');
        const note = tracker.querySelector('.sv-tracker-input').value;
        if (!selected) return;
        
        const entry = {
            score: selected.dataset.num,
            note: note,
            date: new Date().toISOString(),
            modality: document.title.split('—')[0].trim()
        };
        
        history.unshift(entry);
        localStorage.setItem('sanctuary-tracker', JSON.stringify(history.slice(0, 50)));
        renderTrackerHistory(history);
        tracker.querySelector('.sv-tracker-input').value = '';
        tracker.querySelectorAll('.sv-tracker-num').forEach(b => b.classList.remove('selected'));
    });
    
    // Toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sv-tracker-toggle';
    toggleBtn.textContent = '📊';
    toggleBtn.title = 'Track your progress';
    toggleBtn.addEventListener('click', () => tracker.classList.toggle('active'));
    document.body.appendChild(toggleBtn);
    
    const toggleStyle = document.createElement('style');
    toggleStyle.textContent = `
        .sv-tracker-toggle { position: fixed; bottom: 80px; right: 20px; width: 40px; height: 40px; background: rgba(18,15,14,0.9); border: 1px solid rgba(201,169,110,0.3); color: var(--signal, #C9A96E); cursor: pointer; z-index: 9997; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; }
    `;
    document.head.appendChild(toggleStyle);
    
    function renderTrackerHistory(hist) {
        const container = tracker.querySelector('.sv-tracker-history');
        container.innerHTML = hist.slice(0, 5).map(e => `
            <div class="sv-tracker-entry">
                <strong>${e.score}/10</strong> — ${new Date(e.date).toLocaleDateString()}<br>
                ${e.note || ''}
            </div>
        `).join('');
    }
}

// 4. SKEPTIC'S CORNER
function initSkepticsCorner() {
    const corner = document.createElement('div');
    corner.className = 'sv-skeptic';
    corner.innerHTML = `
        <details class="sv-skeptic-details">
            <summary class="sv-skeptic-toggle">For the Skeptics</summary>
            <div class="sv-skeptic-content">
                <div class="sv-skeptic-qa">
                    <h4>"Why no double-blind studies?"</h4>
                    <p>You cannot blind a Reiki session—the practitioner knows they are giving it. However, 140+ studies show significant cortisol reduction compared to placebo in open-label trials.</p>
                </div>
                <div class="sv-skeptic-qa">
                    <h4>"Is this a religion?"</h4>
                    <p>No. We use no deities. It is a bio-energetic protocol.</p>
                </div>
                <div class="sv-skeptic-qa">
                    <h4>"Is it just placebo?"</h4>
                    <p>Placebo accounts for 30% of improvement. Bio-field therapy shows measurable effects beyond placebo in thermal imaging and cortisol studies.</p>
                </div>
            </div>
        </details>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .sv-skeptic { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9996; }
        .sv-skeptic-details { background: rgba(18,15,14,0.95); border-top: 1px solid rgba(201,169,110,0.1); }
        .sv-skeptic-toggle { padding: 0.75rem 2rem; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; color: rgba(255,255,255,0.4); list-style: none; display: block; }
        .sv-skeptic-toggle::-webkit-details-marker { display: none; }
        .sv-skeptic-content { padding: 2rem; max-width: 800px; margin: 0 auto; }
        .sv-skeptic-qa { margin-bottom: 1.5rem; }
        .sv-skeptic-qa h4 { font-family: var(--font-display, serif); font-size: 0.95rem; color: var(--paper, #F7F5F0); margin-bottom: 0.5rem; }
        .sv-skeptic-qa p { font-size: 0.85rem; line-height: 1.7; opacity: 0.6; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(corner);
}

// 5. AMBIENT AUDIO BAR
function initAmbientAudio(audioUrl) {
    const bar = document.createElement('div');
    bar.className = 'sv-audio-bar';
    bar.innerHTML = `
        <button class="sv-audio-toggle">▶</button>
        <span class="sv-audio-label">Ambient Soundscape</span>
        <div class="sv-audio-progress"></div>
    `;
    document.body.appendChild(bar);
    
    const style = document.createElement('style');
    style.textContent = `
        .sv-audio-bar { position: fixed; bottom: 0; left: 0; right: 0; height: 50px; background: rgba(18,15,14,0.95); border-top: 1px solid rgba(201,169,110,0.1); display: flex; align-items: center; padding: 0 1.5rem; z-index: 9995; gap: 1rem; }
        .sv-audio-toggle { width: 36px; height: 36px; border: 1px solid rgba(201,169,110,0.3); background: transparent; color: var(--signal, #C9A96E); cursor: pointer; font-size: 0.8rem; transition: all 0.3s; }
        .sv-audio-toggle:hover { background: rgba(201,169,110,0.1); }
        .sv-audio-toggle.playing { background: var(--signal, #C9A96E); color: var(--ink, #120F0E); }
        .sv-audio-label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.5; }
        .sv-audio-progress { flex: 1; height: 2px; background: rgba(255,255,255,0.1); position: relative; }
        .sv-audio-progress::after { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: var(--signal, #C9A96E); transition: width 0.3s; }
    `;
    document.head.appendChild(style);
    
    let audio = null;
    bar.querySelector('.sv-audio-toggle').addEventListener('click', function() {
        if (!audio) {
            audio = new Audio(audioUrl);
            audio.loop = true;
        }
        if (audio.paused) {
            audio.play();
            this.classList.add('playing');
            this.textContent = '⏸';
        } else {
            audio.pause();
            this.classList.remove('playing');
            this.textContent = '▶';
        }
    });
}

// 6. LIVE EVENTS
function initLiveEvents(container, events) {
    const html = `
        <div class="sv-events">
            <h3 class="sv-events-title">Upcoming Events</h3>
            <div class="sv-events-list">
                ${events.map(e => `
                    <div class="sv-event">
                        <div class="sv-event-date">${e.date}</div>
                        <div class="sv-event-info">
                            <h4>${e.name}</h4>
                            <p>${e.desc}</p>
                        </div>
                        <button class="sv-event-btn">Join Waitlist</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

// 7. GIFT A SESSION
function initGiftSession(container) {
    const html = `
        <div class="sv-gift">
            <h3>Gift a Sanctuary</h3>
            <p>Struggling to explain what you're going through? Gift a 60-minute anonymous session to a friend. They choose the modality. You pay the peace.</p>
            <a href="#contact" class="sv-gift-btn">Gift a Session →</a>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

// 8. DIGITAL DETOX MODE
function initDetoxMode() {
    const btn = document.createElement('button');
    btn.className = 'sv-detox-btn';
    btn.textContent = 'DETOX';
    btn.title = 'Distraction-free reading mode';
    btn.addEventListener('click', () => {
        document.body.classList.toggle('detox-mode');
        btn.classList.toggle('active');
    });
    document.body.appendChild(btn);
    
    const style = document.createElement('style');
    style.textContent = `
        .sv-detox-btn { position: fixed; top: 20px; right: 120px; padding: 0.5rem 1rem; background: transparent; border: 1px solid rgba(201,169,110,0.3); color: var(--paper, #F7F5F0); font-size: 0.65rem; letter-spacing: 0.2em; cursor: pointer; z-index: 9999; transition: all 0.3s; }
        .sv-detox-btn:hover, .sv-detox-btn.active { border-color: var(--signal, #C9A96E); color: var(--signal, #C9A96E); }
        body.detox-mode * { opacity: 0 !important; transition: opacity 0.5s !important; }
        body.detox-mode .sv-detox-btn, body.detox-mode .sv-modal, body.detox-mode .sv-emergency, body.detox-mode .sv-audio-bar { opacity: 1 !important; }
        body.detox-mode main, body.detox-mode .content, body.detox-mode section { filter: none !important; }
        body.detox-mode { background: #1A1A1A !important; }
        body.detox-mode section { min-height: auto !important; padding: 4rem 2rem !important; }
        body.detox-mode h1, body.detox-mode h2, body.detox-mode h3, body.detox-mode p, body.detox-mode span { opacity: 1 !important; font-size: 1.1rem !important; line-height: 2 !important; max-width: 600px !important; margin-left: auto !important; margin-right: auto !important; }
    `;
    document.head.appendChild(style);
}

// 9. TRANSLATION LAYER
function initTranslation() {
    const btn = document.createElement('button');
    btn.className = 'sv-translate-btn';
    btn.textContent = 'EN';
    btn.title = 'Toggle language';
    
    const langs = ['EN', 'ES', 'HI'];
    let currentLang = 0;
    
    btn.addEventListener('click', () => {
        currentLang = (currentLang + 1) % langs.length;
        btn.textContent = langs[currentLang];
        
        const translations = {
            ES: { hero: 'Canalizando la Fuerza Vital Universal', cta: 'Reserva tu Sesión', about: 'Sobre el Sanador' },
            HI: { hero: 'सार्वभौमिक जीवन शक्ति का चैनल', cta: 'अपना सत्र बुक करें', about: 'उपचारक के बारे में' }
        };
        
        if (langs[currentLang] === 'EN') return;
        
        const t = translations[langs[currentLang]];
        if (t) {
            const heroTitle = document.querySelector('.hero-title, h1');
            if (heroTitle) heroTitle.textContent = t.hero;
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .sv-translate-btn { position: fixed; top: 20px; right: 200px; padding: 0.5rem 0.75rem; background: transparent; border: 1px solid rgba(201,169,110,0.3); color: var(--paper, #F7F5F0); font-size: 0.65rem; letter-spacing: 0.1em; cursor: pointer; z-index: 9999; transition: all 0.3s; }
        .sv-translate-btn:hover { border-color: var(--signal, #C9A96E); color: var(--signal, #C9A96E); }
    `;
    document.head.appendChild(style);
    document.body.appendChild(btn);
}

// 10. EMERGENCY RESET
function initEmergencyReset() {
    const btn = document.createElement('button');
    btn.className = 'sv-emergency';
    btn.innerHTML = '⚡ Reset Now';
    btn.addEventListener('click', triggerEmergencyReset);
    document.body.appendChild(btn);
    
    const style = document.createElement('style');
    style.textContent = `
        .sv-emergency { position: fixed; top: 20px; right: 20px; padding: 0.5rem 1rem; background: #00FF55; color: #000; border: none; font-size: 0.75rem; font-weight: 600; cursor: pointer; z-index: 100001; letter-spacing: 0.05em; transition: all 0.3s; }
        .sv-emergency:hover { background: #00CC44; transform: scale(1.05); }
        .sv-emergency-overlay { position: fixed; inset: 0; background: #000; z-index: 100002; display: flex; align-items: center; justify-content: center; flex-direction: column; opacity: 0; pointer-events: none; transition: opacity 0.5s; }
        .sv-emergency-overlay.active { opacity: 1; pointer-events: all; }
        .sv-emergency-circle { width: 200px; height: 200px; border-radius: 50%; background: white; animation: emergencyPulse 4s ease-in-out infinite; margin-bottom: 3rem; }
        @keyframes emergencyPulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } }
        .sv-emergency-text { color: white; font-family: var(--font-display, serif); font-size: 1.5rem; text-align: center; line-height: 1.8; }
    `;
    document.head.appendChild(style);
}

function triggerEmergencyReset() {
    const overlay = document.createElement('div');
    overlay.className = 'sv-emergency-overlay';
    overlay.innerHTML = `
        <div class="sv-emergency-circle"></div>
        <div class="sv-emergency-text">Breathe in...<br>Hold...<br>Breathe out...<br><br>You are safe.</div>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.classList.add('active'), 100);
    
    setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 500);
    }, 60000);
}

// 11. JSON-LD STRUCTURED DATA
function addStructuredData(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": data.name,
        "description": data.description,
        "medicalAudience": {
            "@type": "PatientAudience",
            "audienceType": "Patient"
        },
        "publisher": {
            "@type": "Organization",
            "name": data.name
        },
        ...data
    });
    document.head.appendChild(script);
}

// Initialize all meta-layers
document.addEventListener('DOMContentLoaded', () => {
    initFirstTimeVisitor();
    initSkepticsCorner();
    initDetoxMode();
    initEmergencyReset();
    initOutcomeTracker();
    initTranslation();
});
