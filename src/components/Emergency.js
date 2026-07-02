/**
 * Emergency Reset
 * 60-second breathing tool for panic attacks
 */
export function initEmergencyReset() {
  const btn = document.createElement('button');
  btn.className = 'sv-emergency';
  btn.innerHTML = '⚡ Reset Now';
  btn.addEventListener('click', triggerEmergencyReset);
  document.body.appendChild(btn);
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
