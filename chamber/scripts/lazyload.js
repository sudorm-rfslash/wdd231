document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img.lazy');

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const imageObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  }, observerOptions);

  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
});
