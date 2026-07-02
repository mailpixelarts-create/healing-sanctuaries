/**
 * Translation Layer
 * EN/ES/HI toggle for hero text
 */
export function initTranslation() {
  const btn = document.createElement('button');
  btn.className = 'sv-translate-btn';
  btn.textContent = 'EN';
  btn.title = 'Toggle language';
  
  const langs = ['EN', 'ES', 'HI'];
  let currentLang = 0;
  
  const translations = {
    ES: { hero: 'Canalizando la Fuerza Vital Universal', cta: 'Reserva tu Sesión' },
    HI: { hero: 'सार्वभौमिक जीवन शक्ति का चैनल', cta: 'अपना सत्र बुक करें' }
  };
  
  btn.addEventListener('click', () => {
    currentLang = (currentLang + 1) % langs.length;
    btn.textContent = langs[currentLang];
    
    if (langs[currentLang] === 'EN') return;
    
    const t = translations[langs[currentLang]];
    if (t) {
      const heroTitle = document.querySelector('.hero-title, h1');
      if (heroTitle) heroTitle.textContent = t.hero;
    }
  });
  
  document.body.appendChild(btn);
}
