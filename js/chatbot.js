/* ============================================================
   Local SLM-style chatbot
   Intent-matched responses, streamed character-by-character for
   a convincing LLM feel. Knowledge base lives in js/data.js.
   ============================================================ */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const fab = document.getElementById('chatFab');
    const win = document.getElementById('chatWindow');
    const close = document.getElementById('chatClose');
    const body = document.getElementById('chatBody');
    const chips = document.getElementById('chatChips');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const heroBtn = document.getElementById('heroChatBtn');
    if (!fab || !win || typeof DATA === 'undefined') return;

    const QUICK = [
      { label: 'Who are you?', q: 'who are you' },
      { label: 'What projects?', q: 'projects' },
      { label: 'Angular work', q: 'angular experience' },
      { label: 'GenAI / RAG', q: 'genai rag work' },
      { label: 'Skills', q: 'skills' },
      { label: 'Contact', q: 'how to contact' },
      { label: 'Resume', q: 'resume' },
      { label: 'Education', q: 'education' }
    ];
    chips.innerHTML = QUICK.map(q => `<button type="button" class="chat-chip" data-q="${q.q}">${q.label}</button>`).join('');

    const open = () => {
      win.classList.add('open');
      win.setAttribute('aria-hidden', 'false');
      if (!body.children.length) {
        botSay(`Hi 👋 I'm **${DATA.profile.name}'s AI assistant**. I was trained on his resume and projects — ask me anything about his skills, experience or how to reach him.`);
      }
      setTimeout(() => input.focus(), 300);
    };
    const closeFn = () => {
      win.classList.remove('open');
      win.setAttribute('aria-hidden', 'true');
    };

    fab.addEventListener('click', open);
    if (heroBtn) heroBtn.addEventListener('click', open);
    close.addEventListener('click', closeFn);

    chips.addEventListener('click', (e) => {
      const b = e.target.closest('.chat-chip');
      if (!b) return;
      handleUser(b.dataset.q, b.textContent);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      handleUser(text);
      input.value = '';
    });

    function handleUser(rawQ, displayText) {
      userSay(displayText || rawQ);
      const intent = classify(rawQ);
      const reply = respond(intent, rawQ);
      typing(reply);
    }

    /* ========= UI helpers ========= */
    function userSay(text) {
      const d = document.createElement('div');
      d.className = 'msg user';
      d.textContent = text;
      body.appendChild(d);
      body.scrollTop = body.scrollHeight;
    }
    function botSay(text) {
      const d = document.createElement('div');
      d.className = 'msg bot';
      d.innerHTML = formatMd(text);
      body.appendChild(d);
      body.scrollTop = body.scrollHeight;
    }
    function typing(text) {
      const dots = document.createElement('div');
      dots.className = 'msg bot typing';
      dots.innerHTML = '<span></span><span></span><span></span>';
      body.appendChild(dots);
      body.scrollTop = body.scrollHeight;

      const delay = 450 + Math.min(text.length * 2, 650);
      setTimeout(() => {
        dots.remove();
        streamBot(text);
      }, delay);
    }
    function streamBot(text) {
      const d = document.createElement('div');
      d.className = 'msg bot';
      body.appendChild(d);
      let i = 0;
      const step = Math.max(1, Math.floor(text.length / 180));
      const timer = setInterval(() => {
        i = Math.min(text.length, i + step);
        d.innerHTML = formatMd(text.slice(0, i)) + (i < text.length ? '<span class="type-caret">▍</span>' : '');
        body.scrollTop = body.scrollHeight;
        if (i >= text.length) clearInterval(timer);
      }, 14);
    }
    function formatMd(t) {
      return escapeHtml(t)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/\n/g, '<br/>');
    }
    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
    }

    /* ========= Intent classifier ========= */
    const INTENTS = {
      greet:        ['hi','hello','hey','yo','namaste','vanakkam','good morning','good evening'],
      who:          ['who are you','who r u','about you','who is poonthamizhan','tell me about yourself','who is this','intro','introduce'],
      experience:   ['years of experience','how many years','how long','seniority','total experience','year experience'],
      current:      ['current company','where do you work','present company','current job','botree','where are you working'],
      previous:     ['previous company','clap hands','prior job','before botree','past job'],
      skills:       ['skills','tech stack','stack','technology','technologies','what do you know','what can you do','what tools'],
      angular:      ['angular','frontend','front end','ui framework'],
      spring:       ['spring','spring boot','spring framework','backend','java'],
      microservices:['microservice','microservices','micro service'],
      genai:        ['genai','gen ai','generative','llm','small language model','slm','ai developer','chatbot'],
      rag:          ['rag','retrieval','vector','embedding','pinecone','chromadb','faiss','weaviate'],
      claude:       ['claude','claude code','anthropic','mcp','agentic'],
      projects:     ['project','projects','portfolio','what have you built','what have you worked on','work'],
      nivea:        ['nivea','promo','claim','offer rollout','fmcg'],
      wipro:        ['wipro','scheme','contract pricing','distributor billing','csng'],
      sap:          ['sap','integration','drools','grn','purchase'],
      hmd:          ['hmd','dao','stock','inventory'],
      genaiproject: ['chatbot project','sales analytics','distributor chatbot','slm project','in-house ai'],
      education:    ['education','college','university','degree','study','studies','where did you study'],
      certifications: ['certifications','certs','certificates','certified','training','courses'],
      recognition:  ['recognition','award','appreciation','manager','botree ignite'],
      contact:      ['contact','how to reach','reach you','hire','hiring','get in touch'],
      email:        ['email','mail','e-mail','gmail'],
      whatsapp:     ['whatsapp','wa','phone','mobile','number','call'],
      linkedin:     ['linkedin','linked in'],
      github:       ['github','git hub','repo','repository','source code','code'],
      resume:       ['resume','cv','download resume','curriculum vitae','pdf'],
      location:     ['location','where are you based','city','chennai','where do you live'],
      thanks:       ['thanks','thank you','thx','ty','appreciate'],
      bye:          ['bye','goodbye','see you','cya','later']
    };

    function classify(text) {
      const q = ' ' + text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ') + ' ';
      let best = { name: 'fallback', score: 0 };
      Object.entries(INTENTS).forEach(([name, keywords]) => {
        let score = 0;
        keywords.forEach(k => {
          const needle = ' ' + k.toLowerCase() + ' ';
          if (q.includes(needle)) score += k.split(' ').length * 2;
          else if (q.includes(k.toLowerCase())) score += 1;
        });
        if (score > best.score) best = { name, score };
      });
      return best.name;
    }

    /* ========= Responses ========= */
    const P = DATA.profile;
    function respond(intent) {
      switch (intent) {
        case 'greet':
          return `Hey! 👋 I'm Poonthamizhan's AI. Ask me about his projects, skills, experience or how to reach him.`;
        case 'who':
          return `I'm an AI trained on **Poonthamizhan K's** profile. He's a **Software Engineer with 4+ years** at **Botree Software**, working on enterprise FMCG distribution, promo & claim-settlement, SAP integration and in-house GenAI products.`;
        case 'experience':
          return `Poonthamizhan has **4+ years of hands-on experience** — currently a Software Engineer 1 at **Botree Software** (Jan 2026 – Present), after 3+ years at Clap Hands as a Software Engineer (Oct 2022 – Dec 2025).`;
        case 'current':
          return `He's currently at **Botree Software International Pvt Ltd** in Chennai (since Jan 2026), owning multiple business-critical modules across Nivea, Wipro and HMD DMS products, plus an in-house GenAI project.`;
        case 'previous':
          return `Before Botree, he was at **Clap Hands** (Oct 2022 – Dec 2025) as a Software Engineer, building enterprise CRM and web applications with Spring Boot, React.js and RESTful microservices.`;
        case 'skills':
          return `His core stack: **Angular 12+, Spring Boot, Java 21, Microservices, Hibernate, MySQL** on the engineering side, and **Generative AI, RAG, SLM, Agentic AI, Claude Code, Vector DBs (Pinecone / ChromaDB / FAISS / Weaviate)** on the AI side. Also strong on PrimeFaces, JSF, REST APIs, SAP integration, JUnit / Mockito, Jenkins / Docker / GitLab.`;
        case 'angular':
          return `**Angular (12+)** is one of his primary focus areas — he's building and highlighting it heavily in his next career move. He's used it to deliver distribution dashboards, offer-configuration screens and KPI cards (Chart.js), and he lists it alongside React.js, Redux, PrimeFaces and JSF in his frontend arsenal.`;
        case 'spring':
          return `**Spring Boot** is a core strength. He uses it to build RESTful microservices (Eureka Server, JWT), including a self-built **CSNG ↔ SAP integration microservice**. Also deep on Spring MVC, Security, Batch, Hibernate and JPA.`;
        case 'microservices':
          return `He designs and ships microservices in Spring Boot — most notably the **CSNG ↔ SAP integration microservice** that handles bi-directional sync of Billing, Orders, GRN, Stock, Retailer master and Sales Returns outbound, plus Purchase Imports inbound, with change-tracking and re-sync logic.`;
        case 'genai':
          return `He's an active **Generative AI developer** — built an **in-house GenAI project** at Botree combining a private **Small Language Model (SLM)** with company data to deliver a **Distributor Q&A Chatbot** and a **Sales Analytics Assistant** with insights and anomaly surfacing.`;
        case 'rag':
          return `He implemented a full **RAG (Retrieval-Augmented Generation) pipeline** over company data using **vector databases, embeddings and semantic search** — deployed privately / on-prem to keep distributor and sales data secure. He's hands-on with Pinecone, ChromaDB, FAISS and Weaviate.`;
        case 'claude':
          return `He uses **Claude Code (Anthropic CLI)** extensively for AI-assisted debugging, change-impact analysis and release-note documentation. He holds **two Claude certifications** (via Skilljar): *Claude Code — Developer Essentials* and *Claude for Developers — Advanced API & Prompt Engineering*. He also works with **MCP (Model Context Protocol)** for agentic workflows.`;
        case 'projects':
          return `He owns and ships 5 live projects at Botree:\n1. **Nivea Promo & Claim Settlement** — Offer Rollout module owner.\n2. **Wipro DMS (CSNG)** — Scheme & Contract Pricing module owner.\n3. **CSNG ↔ SAP Integration Microservice** — he built it from scratch.\n4. **HMD DMS** — DAO modernization + Stock Management.\n5. **In-house GenAI Chatbot + Sales Analytics** — private SLM + RAG.\n\nPlus 10+ open-source side projects on his GitHub. Click any project card for full details.`;
        case 'nivea':
          return `**Nivea Promo & Claim Settlement** is a Nivea FMCG platform where he owns the **Offer Rollout module** — the main core module covering monthly base offers, growth / base budget validation, event calendars, allocations and claim settlement across all major e-commerce platforms (FLIPKART, Amazon, Quick-commerce etc.).`;
        case 'wipro':
          return `**Wipro DMS (CSNG)** is the full distributor-billing application used by Wipro's distributor network. He owns the **Scheme Module** (quantity / value / slab / free-goods / combination schemes applied at the billing level) and the **Contract Pricing Module**.`;
        case 'sap':
          return `The **CSNG ↔ SAP Integration microservice** (project codename *Drools*) is a Spring Boot + REST service he designed and built. **Outbound (CSNG → SAP):** Billing, Sales Orders, GRN, Stock, Retailer/Customer master, Sales Returns. **Inbound (SAP → CSNG):** Purchase Imports. Includes change-tracking + re-sync so any update in CSNG re-publishes to SAP.`;
        case 'hmd':
          return `On the **HMD DMS Application**, he's driving the **DAO-layer modernization** to improve performance and testability, and he owns the **Stock Management module** — stock inflow/outflow, inventory snapshots and reconciliation flows that feed billing and reporting.`;
        case 'genaiproject':
          return `The **In-house GenAI Project** is a private SLM-backed assistant he built with two surfaces: (1) **Distributor Q&A Chatbot** inside the DMS answering natural-language questions on orders, stock, schemes, settlements and reports; (2) **Sales Analytics Assistant** that reads sales data, generates insights and surfaces anomalies — all over a RAG pipeline with vector DBs, deployed on-prem.`;
        case 'education':
          return `**B.E. Electronics and Communication Engineering** from **Park College of Engineering and Technology (Anna University)**, Coimbatore — Mar 2018 to Apr 2022.`;
        case 'certifications':
          return `He holds 5 relevant credentials:\n• **Claude Code — Developer Essentials** (Anthropic Learning via Skilljar)\n• **Claude for Developers — Advanced API & Prompt Engineering** (via Skilljar)\n• **Botree Ignite Programme — Manager Appreciation** 🏆\n• **Java Full Stack Development**\n• **Angular Front-End Development**`;
        case 'recognition':
          return `From his manager at **Botree Ignite**: *"Demonstrated exceptional adaptability and played a significant role in the successful development and migration of key CSNG projects (HMD & Wipro) — delivered with high quality and within committed timelines."*`;
        case 'contact':
          return `Pick a channel 👇\n• **WhatsApp:** [${P.phone}](https://wa.me/${P.whatsapp})\n• **Email:** [${P.email}](mailto:${P.email})\n• **LinkedIn:** [poontamilzhan](${P.linkedin})\n• **GitHub:** [POONTAMILZHAN](${P.github})`;
        case 'email':
          return `His email is **[${P.email}](mailto:${P.email})** — just click to open your mail client.`;
        case 'whatsapp':
          return `WhatsApp him on **[${P.phone}](https://wa.me/${P.whatsapp})** — it's the fastest way to reach him.`;
        case 'linkedin':
          return `LinkedIn: **[${P.linkedin}](${P.linkedin})** — feel free to connect.`;
        case 'github':
          return `GitHub: **[${P.github}](${P.github})** — his code lives here.`;
        case 'resume':
          return `You can download his resume right here on the page — **PDF, DOCX or Markdown** formats, all in the Contact section 👇`;
        case 'location':
          return `He's based in **Chennai, Tamil Nadu, India** 🇮🇳 — open to remote and hybrid roles.`;
        case 'thanks':
          return `Anytime! If you'd like to reach Poonthamizhan directly, scroll to the Contact section or hit the WhatsApp button. 🚀`;
        case 'bye':
          return `Take care! Catch you later 👋`;
        default:
          return `Great question! I can tell you about Poonthamizhan's **skills**, **projects** (Nivea / Wipro / HMD / SAP microservice / GenAI chatbot), **experience**, **education**, **certifications** or **how to contact him**. Try one of the quick chips below ⬇`;
      }
    }
  });
})();
