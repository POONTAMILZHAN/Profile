/* ============================================================
   Modals — reusable popup for skill details + project details.
   Also renders the Company + GitHub project grids and the Skills
   section with clickable icon pills.
   ============================================================ */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof DATA === 'undefined') return;

    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');

    /* ========= Open / close ========= */
    const open = (html) => {
      body.innerHTML = html;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

    /* ========= Render Skills grid ========= */
    renderSkillsGrid();

    /* ========= Render Project grids ========= */
    renderCompanyProjects();
    renderGithubProjects();

    /* ========= Delegated clicks ========= */
    document.addEventListener('click', (e) => {
      const skill = e.target.closest('.skill-chip[data-skill]');
      if (skill) { showSkillModal(skill.dataset.skill); return; }

      const pcard = e.target.closest('.pcard[data-project]');
      if (pcard) {
        const type = pcard.dataset.type;
        if (type === 'company') showCompanyProjectModal(pcard.dataset.project);
        else showGithubProjectModal(pcard.dataset.project);
      }
    });

    /* ========= Renderers ========= */
    function renderSkillsGrid() {
      const w = document.getElementById('skillsWrap');
      if (!w) return;
      w.innerHTML = Object.entries(DATA.skills).map(([label, ids]) => `
        <section class="skill-category">
          <header class="skill-category-head">
            <h3>${esc(label)}</h3>
            <span class="skill-count">${ids.length} skills</span>
          </header>
          <div class="skill-chip-row">
            ${ids.map(id => {
              const s = DATA.skillMeta[id]; if (!s) return '';
              return skillChip(s);
            }).join('')}
          </div>
        </section>
      `).join('');
    }

    function skillChip(s) {
      const icon = s.icon.startsWith('http')
        ? `<img src="${s.icon}" alt="" onerror="this.style.display='none'" />`
        : `<span class="skill-emoji">${esc(s.icon)}</span>`;
      return `
        <button type="button" class="skill-chip" data-skill="${esc(s.id)}" title="${esc(s.label)} — click for details" style="--sk-color:${s.color}">
          ${icon}
          <span class="skill-chip-label">${esc(s.label)}</span>
        </button>
      `;
    }

    function renderCompanyProjects() {
      const g = document.getElementById('companyProjects');
      if (!g) return;
      g.innerHTML = DATA.companyProjects.map(p => companyCard(p)).join('');
    }
    function companyCard(p) {
      return `
        <article class="pcard reveal" data-project="${p.id}" data-type="company" style="--art-color:${p.color}">
          <div class="pcard-art"><span>${p.icon}</span></div>
          <div class="pcard-info">
            <div class="pcard-client">${esc(p.client)}</div>
            <h3>${esc(p.title)}</h3>
            <span class="pcard-role">${esc(p.role)}</span>
            <p class="pcard-summary">${esc(p.summary)}</p>
            <div class="pcard-stack">${p.stack.slice(0,4).map(s => `<span class="chip">${esc(s)}</span>`).join('')}${p.stack.length>4?`<span class="chip more">+${p.stack.length-4}</span>`:''}</div>
            <div class="pcard-cta">View details <span>→</span></div>
          </div>
        </article>
      `;
    }

    function renderGithubProjects() {
      const g = document.getElementById('githubProjects');
      if (!g) return;
      g.innerHTML = DATA.githubProjects.map(p => githubCard(p)).join('');
    }
    function githubCard(p) {
      return `
        <article class="pcard pcard-compact reveal" data-project="${p.id}" data-type="github" style="--art-color:${p.color}">
          <div class="pcard-art small"><span>${p.icon}</span></div>
          <div class="pcard-info">
            <div class="pcard-client">${esc(p.language || 'Project')}</div>
            <h3>${esc(p.title)}</h3>
            <p class="pcard-summary">${esc(p.summary)}</p>
            <div class="pcard-stack">${p.stack.slice(0,3).map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>
            <div class="pcard-foot">
              <span class="pcard-cta">Details →</span>
              <a href="https://github.com/POONTAMILZHAN/${esc(p.repo)}" target="_blank" rel="noopener" class="pcard-repo" onclick="event.stopPropagation()">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.4 23c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.2-1.2-5.2-5.6 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0C17.6 4.7 18.6 5 18.6 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.3-5.2 5.6.4.3.8 1 .8 2.1v3c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>
                Repo
              </a>
            </div>
          </div>
        </article>
      `;
    }

    /* ========= Skill modal ========= */
    function showSkillModal(id) {
      const s = DATA.skillMeta[id]; if (!s) return;
      const whereLinks = (s.where || []).map(wid => {
        const comp = DATA.companyProjects.find(x => x.id === wid);
        const gh   = DATA.githubProjects.find(x => x.id === wid);
        const label = comp ? comp.title : gh ? gh.title : null;
        return label ? `<span class="chip">${esc(label)}</span>` : '';
      }).join('');
      const icon = s.icon.startsWith('http')
        ? `<img src="${s.icon}" alt="" width="48" height="48" />`
        : `<span style="font-size:46px">${esc(s.icon)}</span>`;
      open(`
        <div class="modal-head" style="--sk-color:${s.color}">
          <div class="modal-icon">${icon}</div>
          <div>
            <span class="modal-eyebrow">Skill</span>
            <h2 class="modal-title">${esc(s.label)}</h2>
            <div class="modal-meta">
              <span class="chip key">${esc(s.years)} years</span>
            </div>
          </div>
        </div>
        <p class="modal-blurb">${esc(s.blurb)}</p>
        ${whereLinks ? `<h4 class="modal-h4">Used in</h4><div class="modal-chips">${whereLinks}</div>` : ''}
      `);
    }

    /* ========= Company project modal ========= */
    function showCompanyProjectModal(id) {
      const p = DATA.companyProjects.find(x => x.id === id); if (!p) return;
      const d = p.details || {};
      open(`
        <div class="modal-head" style="--sk-color:${p.color}">
          <div class="modal-icon" style="font-size:46px">${p.icon}</div>
          <div>
            <span class="modal-eyebrow">${esc(p.client)}</span>
            <h2 class="modal-title">${esc(p.title)}</h2>
            <div class="modal-meta"><span class="chip key">${esc(p.role)}</span></div>
          </div>
        </div>
        <p class="modal-blurb">${esc(p.summary)}</p>

        <div class="modal-grid">
          ${d.duration ? kv('Duration', d.duration) : ''}
          ${d.team ? kv('Team', d.team) : ''}
          ${d.myRole ? kv('My role', d.myRole) : ''}
          ${d.tech ? kv('Tech stack', d.tech) : ''}
          ${d.impact ? kv('Impact', d.impact) : ''}
        </div>

        <h4 class="modal-h4">Key work</h4>
        <ul class="modal-list">${p.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>

        <h4 class="modal-h4">Stack</h4>
        <div class="modal-chips">${p.stack.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>
      `);
    }

    /* ========= GitHub project modal ========= */
    function showGithubProjectModal(id) {
      const p = DATA.githubProjects.find(x => x.id === id); if (!p) return;
      const d = p.details || {};
      open(`
        <div class="modal-head" style="--sk-color:${p.color}">
          <div class="modal-icon" style="font-size:46px">${p.icon}</div>
          <div>
            <span class="modal-eyebrow">GitHub · ${esc(p.language || 'Project')}</span>
            <h2 class="modal-title">${esc(p.title)}</h2>
            <div class="modal-meta"><span class="chip">${esc(p.repo)}</span></div>
          </div>
        </div>
        <p class="modal-blurb">${esc(p.summary)}</p>
        ${d.purpose ? `<h4 class="modal-h4">Purpose</h4><p>${esc(d.purpose)}</p>` : ''}
        ${d.features ? `<h4 class="modal-h4">Features</h4><ul class="modal-list">${d.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
        <h4 class="modal-h4">Stack</h4>
        <div class="modal-chips">${p.stack.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>
        <div class="modal-actions">
          <a href="https://github.com/POONTAMILZHAN/${esc(p.repo)}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Open on GitHub ↗</a>
        </div>
      `);
    }

    function kv(k, v) {
      return `<div class="kv"><span class="kv-k">${esc(k)}</span><span class="kv-v">${esc(v)}</span></div>`;
    }

    function esc(s) {
      return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
    }
  });
})();
