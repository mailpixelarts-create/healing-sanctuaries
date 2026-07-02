/**
 * Skeptic's Corner
 * Science Q&A for skeptics
 */
export function initSkepticsCorner() {
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
  document.body.appendChild(corner);
}
