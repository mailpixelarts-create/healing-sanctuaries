/**
 * Outcome Tracker
 * LocalStorage-based progress journal
 */
export function initOutcomeTracker() {
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
  
  const history = JSON.parse(localStorage.getItem('sanctuary-tracker') || '[]');
  renderTrackerHistory(tracker, history);
  
  tracker.querySelectorAll('.sv-tracker-num').forEach(btn => {
    btn.addEventListener('click', () => {
      tracker.querySelectorAll('.sv-tracker-num').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
  
  tracker.querySelector('.sv-tracker-save').addEventListener('click', () => {
    const selected = tracker.querySelector('.sv-tracker-num.selected');
    const note = tracker.querySelector('.sv-tracker-input').value;
    if (!selected) return;
    
    const entry = {
      score: selected.dataset.num,
      note,
      date: new Date().toISOString(),
      modality: document.title.split('—')[0].trim()
    };
    
    history.unshift(entry);
    localStorage.setItem('sanctuary-tracker', JSON.stringify(history.slice(0, 50)));
    renderTrackerHistory(tracker, history);
    tracker.querySelector('.sv-tracker-input').value = '';
    tracker.querySelectorAll('.sv-tracker-num').forEach(b => b.classList.remove('selected'));
  });
  
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'sv-tracker-toggle';
  toggleBtn.textContent = '📊';
  toggleBtn.title = 'Track your progress';
  toggleBtn.addEventListener('click', () => tracker.classList.toggle('active'));
  document.body.appendChild(toggleBtn);
}

function renderTrackerHistory(tracker, history) {
  const container = tracker.querySelector('.sv-tracker-history');
  container.innerHTML = history.slice(0, 5).map(e => `
    <div class="sv-tracker-entry">
      <strong>${e.score}/10</strong> — ${new Date(e.date).toLocaleDateString()}<br>
      ${e.note || ''}
    </div>
  `).join('');
}
