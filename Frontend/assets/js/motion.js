/*
 * Small, reusable entrance animations.
 * Add .reveal in this file's selector list when a new page section should fade in.
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealSelector = [
    '.shop-intro > *', '.collection-heading > *', '.category',
    '.section-head > *', '.product-card', '.promo-image', '.promo-copy',
    '.newsletter > *', '.plp-head > *', '.shop-tools', '.filter-status',
    '.detail-image-wrap', '.product-info'
  ].join(', ');

  const elements = document.querySelectorAll(revealSelector);
  elements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min((index % 3) * 90, 180)}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}
