/* ============================================================
   Interactive particle network background.
   Dots drift, connect by proximity, react to the cursor.
   Theme-aware via computed CSS variables.
   ============================================================ */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const COUNT  = Math.max(32, Math.round(window.innerWidth / 22));
    const LINK   = 140;      // link distance in CSS px
    const CURSOR_INFLUENCE = 220;
    const SPEED  = 0.22;

    let W, H, particles = [], mouse = { x: -1e4, y: -1e4, active: false }, t;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function spawn() {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * SPEED * 2,
          vy: (Math.random() - 0.5) * SPEED * 2,
          r: 1.1 + Math.random() * 1.6
        });
      }
    }

    function accent() {
      // Pull the two accent colors from CSS variables so the dots re-colour on theme toggle.
      const s = getComputedStyle(document.documentElement);
      return {
        a: s.getPropertyValue('--accent-2').trim() || '#10b981',
        b: s.getPropertyValue('--accent-1').trim() || '#06b6d4',
        c: s.getPropertyValue('--accent-3').trim() || '#f59e0b'
      };
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      const col = accent();
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // Light mode: punchier dots + lines so they read against mint background.
      const dotOpacity   = isLight ? 0.85 : 0.55;
      const dotRadius    = isLight ? 1.5  : 1.0;
      const linkOpacity  = isLight ? 0.55 : 0.32;
      const linkWidth    = isLight ? 1.3  : 1.0;

      // Move + draw particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = col.a;
        ctx.globalAlpha = dotOpacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Pair-wise links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const op = 1 - Math.sqrt(d2) / LINK;
            ctx.strokeStyle = col.a;
            ctx.globalAlpha = op * linkOpacity;
            ctx.lineWidth = linkWidth;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Cursor interaction — amber lines + grow nearest dots
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_INFLUENCE * CURSOR_INFLUENCE) {
            const d = Math.sqrt(d2);
            const op = 1 - d / CURSOR_INFLUENCE;
            ctx.strokeStyle = col.c;
            ctx.globalAlpha = op * 0.75;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Grow dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r + op * 2, 0, Math.PI * 2);
            ctx.fillStyle = col.c;
            ctx.globalAlpha = op;
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      t = requestAnimationFrame(tick);
    }

    window.addEventListener('resize', () => { resize(); spawn(); });
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
    window.addEventListener('mouseout', () => { mouse.active = false; });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(t);
      else t = requestAnimationFrame(tick);
    });

    resize();
    spawn();
    tick();
  });
})();
