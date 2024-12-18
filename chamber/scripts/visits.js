document.addEventListener('DOMContentLoaded', () => {
  const visitMessage = document.getElementById('visitMessage');
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diff = now - lastVisit;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);
});
