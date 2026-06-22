/* ============================================
   JOHREI — Meditative Scroll Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.about, .sacred, .quote, .arrival');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });
});
