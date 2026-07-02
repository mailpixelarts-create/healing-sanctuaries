/**
 * Digital Detox Mode
 * Distraction-free reading mode
 */
export function initDetoxMode() {
  const btn = document.createElement('button');
  btn.className = 'sv-detox-btn';
  btn.textContent = 'DETOX';
  btn.title = 'Distraction-free reading mode';
  btn.addEventListener('click', () => {
    document.body.classList.toggle('detox-mode');
    btn.classList.toggle('active');
  });
  document.body.appendChild(btn);
}
