/**
 * Ambient Audio Bar
 * Persistent soundscape player
 */
export function initAmbientAudio(audioUrl) {
  const bar = document.createElement('div');
  bar.className = 'sv-audio-bar';
  bar.innerHTML = `
    <button class="sv-audio-toggle">▶</button>
    <span class="sv-audio-label">Ambient Soundscape</span>
    <div class="sv-audio-progress"></div>
  `;
  document.body.appendChild(bar);
  
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
