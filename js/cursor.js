/* Custom cursor dot + lagging glow ring (desktop only) */
(function () {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    function tick() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    tick();

    const hoverSel = 'a, button, input, textarea, .chip, .skill-pill, .cert-card, .pcard, .cdot, .contact-card, .chat-chip, .btn, .theme-toggle, .nav-logo';
    document.body.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSel)) ring.classList.add('hover');
    });
    document.body.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSel)) ring.classList.remove('hover');
    });
  });
})();
