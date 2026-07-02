/**
 * First-Time Visitor Modal
 * Shows on first visit, guides user to the right sanctuary
 */
export function initFirstTimeVisitor() {
  if (sessionStorage.getItem('sanctuary-visited')) return;
  
  const modal = document.createElement('div');
  modal.className = 'sv-modal';
  modal.innerHTML = `
    <div class="sv-modal-content">
      <h2>What are you feeling right now?</h2>
      <p class="sv-modal-sub">We'll guide you to the right sanctuary.</p>
      <div class="sv-modal-options">
        <button class="sv-modal-btn" data-feeling="anxious">Anxious</button>
        <button class="sv-modal-btn" data-feeling="aching">Physically Aching</button>
        <button class="sv-modal-btn" data-feeling="disconnected">Disconnected</button>
        <button class="sv-modal-btn" data-feeling="curious">Just Curious</button>
      </div>
      <button class="sv-modal-close">Skip</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 500);
  sessionStorage.setItem('sanctuary-visited', 'true');
  
  modal.querySelector('.sv-modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  modal.querySelectorAll('.sv-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });
}
