/* Theme toggle with localStorage persistence */
(function () {
  const html = document.documentElement;
  const saved = localStorage.getItem('pk-theme');
  if (saved) html.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('pk-theme', next);
    });
  });
})();
