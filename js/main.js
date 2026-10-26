/* ============================================================
   Main entry — renders sections from DATA, wires nav, scroll
   reveal, stat counters, type-text, contact forms and loader.
   ============================================================ */
(function () {
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    hideLoader();
    renderAbout();
    // Skills + Projects grids are rendered by modals.js (shared with modal logic).
    renderTimeline();
    renderRecognition();
    renderCerts();
    wireNav();
    wireReveal();
    wireStatCounters();
    wireHeroType();
    wireHeroTilt();
    maybeScroll();
  }

  /* ========= Hero 3D tilt ========= */
  function wireHeroTilt() {
    const wrap = document.getElementById('tiltWrap');
    if (!wrap) return;
    const card = wrap.querySelector('.tilt-card');
    if (!card || window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const MAX = 14;  // max tilt in degrees
    let bounds;
    const update = (e) => {
      bounds = bounds || card.getBoundingClientRect();
      const px = (e.clientX - bounds.left) / bounds.width;
      const py = (e.clientY - bounds.top) / bounds.height;
      const rx = (0.5 - py) * MAX * 2;   // tilt up when mouse near top
      const ry = (px - 0.5) * MAX * 2;   // tilt right when mouse near right
      card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    };
    wrap.addEventListener('mouseenter', () => { bounds = card.getBoundingClientRect(); card.classList.add('is-hover'); });
    wrap.addEventListener('mousemove', update);
    wrap.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
      card.classList.remove('is-hover');
      bounds = null;
    });
    window.addEventListener('scroll', () => { bounds = null; }, { passive: true });
  }

  function maybeScroll() {
    const sp = new URLSearchParams(location.search);
    const y = sp.get('scroll');
    if (!y) return;
    const n = +y;
    // Disable smooth scroll just for the preview jump so headless captures the right frame.
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, n);
    document.documentElement.scrollTop = n;
    document.body.scrollTop = n;
    requestAnimationFrame(() => { window.scrollTo(0, n); html.style.scrollBehavior = prev; });
  }

  /* ========= Loader ========= */
  function hideLoader() {
    const sp = new URLSearchParams(location.search);
    const quick = sp.has('preview');
    if (sp.has('flat')) {
      // flatten hero to its natural height so a tall viewport shows the entire page
      const style = document.createElement('style');
      style.textContent = '.hero{min-height:auto !important;padding-top:140px !important} .scroll-hint{display:none}';
      document.head.appendChild(style);
    }
    setTimeout(() => {
      const l = document.getElementById('loader');
      if (l) {
        l.classList.add('hide');
        if (quick) l.style.display = 'none';
      }
    }, quick ? 0 : 1300);
  }

  /* ========= About ========= */
  function renderAbout() {
    const bio = document.getElementById('aboutBio');
    if (bio) bio.textContent = DATA.profile.bio;
    const stats = document.getElementById('stats');
    if (!stats) return;
    stats.innerHTML = DATA.profile.stats.map(s => `
      <div class="stat">
        <div class="stat-num" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>
    `).join('');
  }

  /* ========= Timeline ========= */
  function renderTimeline() {
    const t = document.getElementById('timeline');
    if (!t) return;
    t.innerHTML = DATA.experience.map(exp => `
      <article class="tl-item glass reveal ${exp.current ? 'current' : ''}">
        <div class="tl-head">
          <div>
            <div class="tl-role">${esc(exp.role)}</div>
            <div class="tl-company">${esc(exp.company)}</div>
          </div>
          <div class="tl-meta">${esc(exp.period)} · ${esc(exp.location)}</div>
        </div>
        <p class="tl-summary">${esc(exp.summary)}</p>
        <ul class="tl-list">${exp.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
      </article>
    `).join('');
  }

  /* ========= Recognition ========= */
  function renderRecognition() {
    const el = document.getElementById('recognitionCard');
    if (!el) return;
    el.innerHTML = `
      <div class="recognition-icon">🏆</div>
      <div>
        <div class="recognition-title">${esc(DATA.recognition.title)}</div>
        <p class="recognition-quote">"${esc(DATA.recognition.quote)}"</p>
      </div>
    `;
  }

  /* ========= Certifications ========= */
  function renderCerts() {
    const g = document.getElementById('certsGrid');
    if (!g) return;
    g.innerHTML = DATA.certifications.map(c => `
      <article class="cert-card reveal">
        <div class="cert-icon">${c.icon}</div>
        <div class="cert-title">${esc(c.title)}</div>
        <div class="cert-issuer">${esc(c.issuer)}</div>
      </article>
    `).join('');
  }

  /* ========= Nav ========= */
  function wireNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('open'));
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
    }
  }

  /* ========= Scroll reveal ========= */
  function wireReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Fallback — reveal anything already in the viewport right away so above-the-fold
    // content never stays hidden if the IO callback is delayed.
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
      });
    });
  }

  /* ========= Stat counters ========= */
  function wireStatCounters() {
    const nums = document.querySelectorAll('.stat-num');
    if (!nums.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        const suf = el.dataset.suffix || '';
        let v = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const t = setInterval(() => {
          v = Math.min(target, v + step);
          el.textContent = v + suf;
          if (v >= target) clearInterval(t);
        }, 30);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    nums.forEach(n => io.observe(n));
  }

  /* ========= Hero typing effect ========= */
  function wireHeroType() {
    const el = document.getElementById('typeText');
    if (!el) return;
    const roles = [
      'Java & Angular Full-Stack Developer',
      'Spring Boot · Microservices',
      'Generative AI Developer',
      'FMCG DMS Specialist'
    ];
    let r = 0, i = 0, forward = true;
    (function tick() {
      const cur = roles[r];
      el.textContent = cur.slice(0, i);
      if (forward) {
        if (i < cur.length) { i++; setTimeout(tick, 55); }
        else { forward = false; setTimeout(tick, 1600); }
      } else {
        if (i > 0) { i--; setTimeout(tick, 25); }
        else { forward = true; r = (r + 1) % roles.length; setTimeout(tick, 300); }
      }
    })();
  }

  /* ========= Contact forms ========= */
  window.sendMail = function (e) {
    e.preventDefault();
    const n = document.getElementById('mName').value.trim();
    const m = document.getElementById('mMsg').value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${n || 'a visitor'}`);
    const body = encodeURIComponent(`${m}\n\n— ${n}`);
    window.location.href = `mailto:${DATA.profile.email}?subject=${subject}&body=${body}`;
    return false;
  };

  window.subscribe = function (e) {
    e.preventDefault();
    const email = document.getElementById('sEmail').value.trim();
    const note = document.getElementById('subNote');
    if (!email) return false;
    // Store subscribers in localStorage as a demo. Replace with Formspree/Netlify form later.
    const subs = JSON.parse(localStorage.getItem('pk-subs') || '[]');
    if (!subs.includes(email)) subs.push(email);
    localStorage.setItem('pk-subs', JSON.stringify(subs));
    note.textContent = '✅ Subscribed! You will hear from me on new GenAI builds.';
    note.classList.add('ok');
    e.target.reset();
    setTimeout(() => { note.textContent = ''; note.classList.remove('ok'); }, 4500);
    return false;
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  }
})();
