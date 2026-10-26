/* ============================================================
   Poonthamizhan K — Portfolio Knowledge Base
   Single source of truth for every section + modals.
   ============================================================ */

/* ---------- Icon URL helper (Simple Icons CDN, color-aware) ---------- */
const ICN = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color || 'ffffff'}`;

/* ---------- Shared skill details for modal popups ----------
   { id, label, icon (slug or emoji), color, years, blurb, where[] }
   `where` lists project IDs. */
const SKILL_META = {
  // Languages
  java:        { id:'java', label:'Java (8 / 21)', icon:ICN('openjdk','F80000'), color:'#f80000', years:'4+', blurb:'Primary backend language. Deep hands-on across Java 8 and Java 21, used daily on FMCG DMS and microservices.', where:['nivea','wipro','sap','hmd'] },
  javascript:  { id:'javascript', label:'JavaScript (ES6+)', icon:ICN('javascript','F7DF1E'), color:'#f7df1e', years:'4+', blurb:'Modern ES6+ JavaScript for Angular/React apps, custom UI components, DOM scripting and portfolio tooling.', where:['nivea','wipro','genai','inv_res','hospital'] },
  typescript:  { id:'typescript', label:'TypeScript', icon:ICN('typescript','3178C6'), color:'#3178c6', years:'2+', blurb:'Type-safe Angular code with interfaces, generics and strict mode.', where:['nivea','wipro'] },
  python:      { id:'python', label:'Python', icon:ICN('python','3776AB'), color:'#3776ab', years:'1+', blurb:'Python for GenAI scripting, RAG pipelines, SLM experimentation and automation glue.', where:['genai'] },
  sql:         { id:'sql', label:'SQL', icon:ICN('mysql','4479A1'), color:'#4479a1', years:'4+', blurb:'Native SQL + HQL across MySQL — joins, CTEs, window functions, query tuning, stored procedures.', where:['nivea','wipro','sap','hmd'] },
  html:        { id:'html', label:'HTML5', icon:ICN('html5','E34F26'), color:'#e34f26', years:'4+', blurb:'Semantic, accessible HTML5 for enterprise JSF/PrimeFaces + Angular front-ends.' },
  css:         { id:'css', label:'CSS3', icon:ICN('css3','1572B6'), color:'#1572b6', years:'4+', blurb:'Flexbox, Grid, animations, CSS variables, glassmorphism — hand-crafted modern UIs.' },

  // Backend
  spring_boot: { id:'spring_boot', label:'Spring Boot', icon:ICN('springboot','6DB33F'), color:'#6db33f', years:'4+', blurb:'Primary backend framework for REST microservices. Builds, starters, actuator, security.', where:['sap','clap'] },
  spring:      { id:'spring', label:'Spring Framework', icon:ICN('spring','6DB33F'), color:'#6db33f', years:'4+', blurb:'Spring MVC, Security, Batch, Context (XML + annotation wiring).', where:['nivea','wipro','sap','hmd','clap'] },
  hibernate:   { id:'hibernate', label:'Hibernate / JPA', icon:ICN('hibernate','59666C'), color:'#59666c', years:'4+', blurb:'Native SQL + HQL via Hibernate, mapping files, criteria builders, transaction mgmt.', where:['nivea','wipro','hmd','clap'] },
  microservices:{id:'microservices', label:'Microservices', icon:'🧩', color:'#8b5cf6', years:'3+', blurb:'Designing and shipping independent REST microservices — API contracts, retries, logging.', where:['sap','clap'] },
  rest:        { id:'rest', label:'REST APIs', icon:'🔗', color:'#06b6d4', years:'4+', blurb:'Designing clean, versioned REST endpoints with correct status codes, pagination and auth.', where:['nivea','wipro','sap','clap'] },
  jwt:         { id:'jwt', label:'JWT Auth', icon:ICN('jsonwebtokens','000000'), color:'#000', years:'3+', blurb:'JWT with Spring Security for stateless, role-based authentication across tenants.', where:['sap','clap','spring_sec'] },

  // Frontend
  angular:     { id:'angular', label:'Angular (12+)', icon:ICN('angular','DD0031'), color:'#dd0031', years:'2+', blurb:'My primary growth focus. Components, services, RxJS, routing, forms, state management. Building dashboards and KPI UIs.', where:['nivea','wipro'] },
  react:       { id:'react', label:'React.js', icon:ICN('react','61DAFB'), color:'#61dafb', years:'3+', blurb:'Hooks, Redux, functional components. Used across multiple B2B CRM apps at Clap Hands.', where:['clap','todo_react','stopwatch','products_filter','resume_react','chatgpt_clone'] },
  primefaces:  { id:'primefaces', label:'PrimeFaces + JSF', icon:'🎛️', color:'#2db6a2', years:'1+', blurb:'PrimeFaces (Ultima theme) + Jakarta Faces on the Nivea / Wipro / HMD DMS platforms.', where:['nivea','wipro','hmd'] },
  bootstrap:   { id:'bootstrap', label:'Bootstrap', icon:ICN('bootstrap','7952B3'), color:'#7952b3', years:'3+', blurb:'Rapid responsive layouts using Bootstrap grid + components.', where:['clap'] },
  tailwind:    { id:'tailwind', label:'Tailwind CSS', icon:ICN('tailwindcss','06B6D4'), color:'#06b6d4', years:'2+', blurb:'Utility-first CSS for rapid, consistent UI delivery.', where:['clap'] },

  // Databases
  mysql:       { id:'mysql', label:'MySQL', icon:ICN('mysql','4479A1'), color:'#4479a1', years:'4+', blurb:'Primary RDBMS. Schema design, indexes, query tuning, stored procedures and routines.', where:['nivea','wipro','sap','hmd','clap'] },
  mongodb:     { id:'mongodb', label:'MongoDB', icon:ICN('mongodb','47A248'), color:'#47a248', years:'1+', blurb:'Document store for flexible content & profile data in CRM contexts.', where:['clap','hospital'] },

  // GenAI
  gen_ai:      { id:'gen_ai', label:'Generative AI', icon:'🧠', color:'#8b5cf6', years:'1+', blurb:'Prompt design, LLM orchestration, agentic patterns, chat UX.', where:['genai','chatgpt_clone'] },
  rag:         { id:'rag', label:'RAG Pipelines', icon:'🔎', color:'#ec4899', years:'1+', blurb:'Retrieval-Augmented Generation over company data — chunking, embeddings, retrieval, re-rank.', where:['genai'] },
  slm:         { id:'slm', label:'SLM / Private LLM', icon:'🤖', color:'#10b981', years:'1+', blurb:'Deploying Small Language Models privately for sensitive distributor data.', where:['genai'] },
  vector_db:   { id:'vector_db', label:'Vector DB', icon:'📐', color:'#f59e0b', years:'1+', blurb:'Pinecone / ChromaDB / FAISS / Weaviate — embeddings + semantic search.', where:['genai'] },
  claude:      { id:'claude', label:'Claude Code', icon:'✨', color:'#d97706', years:'1+', blurb:'Daily use of Claude Code (Anthropic CLI) for AI-assisted debugging, review and docs. 2× certified.', where:['nivea','wipro','genai'] },
  mcp:         { id:'mcp', label:'MCP', icon:'🪢', color:'#6366f1', years:'1+', blurb:'Model Context Protocol — connecting LLMs to tools via a typed protocol.', where:['genai'] },

  // Integration & DevOps
  sap:         { id:'sap', label:'SAP Integration', icon:ICN('sap','0FAAFF'), color:'#0faaff', years:'1+', blurb:'Bi-directional CSNG ↔ SAP integration microservice — Billing, Orders, GRN, Stock, Returns.', where:['sap'] },
  s3:          { id:'s3', label:'AmazonS3', icon:ICN('amazons3','569A31'), color:'#569a31', years:'2+', blurb:'S3 for attachments / document storage in enterprise flows.', where:['nivea','wipro'] },
  docker:      { id:'docker', label:'Docker', icon:ICN('docker','2496ED'), color:'#2496ed', years:'3+', blurb:'Containerising services for consistent local + CI builds.', where:['clap'] },
  jenkins:     { id:'jenkins', label:'Jenkins', icon:ICN('jenkins','D24939'), color:'#d24939', years:'3+', blurb:'CI/CD pipelines for Spring Boot services, automated builds and deploys.', where:['clap'] },
  git:         { id:'git', label:'Git / GitLab', icon:ICN('git','F05032'), color:'#f05032', years:'4+', blurb:'Branching, PRs, rebase, release flow, GitLab CI integration.' },
  maven:       { id:'maven', label:'Maven', icon:ICN('apachemaven','C71A36'), color:'#c71a36', years:'4+', blurb:'Multi-module Java builds, BOM management, deploy to artifactory.' },
  intellij:    { id:'intellij', label:'IntelliJ IDEA', icon:ICN('intellijidea','000000'), color:'#000', years:'4+', blurb:'Daily driver IDE for Spring + Hibernate work.' },
  postman:     { id:'postman', label:'Postman', icon:ICN('postman','FF6C37'), color:'#ff6c37', years:'4+', blurb:'API design, testing and collection sharing.' },

  // Testing
  junit:       { id:'junit', label:'JUnit 5', icon:ICN('junit5','25A162'), color:'#25a162', years:'3+', blurb:'Test-first for service and dialog logic — parameterised, @Mock, @Spy.', where:['nivea','wipro','clap'] },
  mockito:     { id:'mockito', label:'Mockito', icon:'🧪', color:'#78a641', years:'3+', blurb:'Mocking collaborators for isolated unit tests.' }
};

/* ---------- Portfolio data ---------- */
const DATA = {
  profile: {
    name: "POONTAMIZHAN K",
    initials: "PK",
    headline: "Software Engineer · Java & Angular Full-Stack · Microservices · Generative AI Developer",
    shortTag: "Building enterprise FMCG platforms + Generative AI products.",
    location: "Chennai, Tamil Nadu, India",
    phone: "+91 90808 73605",
    whatsapp: "919080873605",
    email: "srisaitamil2020@gmail.com",
    github: "https://github.com/POONTAMILZHAN",
    linkedin: "https://www.linkedin.com/in/poontamilzhan/",
    bio: "I'm Poonthamizhan K, a Software Engineer with 4+ years of hands-on experience building large-scale enterprise distributor-billing, promo & claim-settlement and web applications for global FMCG and consumer-brand clients. I own multiple business-critical modules across Nivea, Wipro and HMD DMS products and I actively build Generative AI tooling — chatbots, RAG pipelines and sales-analytics models using Small Language Models and private LLM deployments.",
    stats: [
      { label: "Years of Experience", value: 4, suffix: "+" },
      { label: "Live Projects Owned", value: 5, suffix: "" },
      { label: "GitHub Repos", value: 18, suffix: "" },
      { label: "Claude Certifications", value: 2, suffix: "" }
    ]
  },

  /* ---- SKILL CATEGORIES — each entry references SKILL_META by id ---- */
  skills: {
    Languages: ['java','javascript','typescript','python','sql','html','css'],
    Backend: ['spring_boot','spring','hibernate','microservices','rest','jwt'],
    Frontend: ['angular','react','primefaces','bootstrap','tailwind'],
    Databases: ['mysql','mongodb'],
    'Generative AI': ['gen_ai','rag','slm','vector_db','claude','mcp'],
    'Integration & Cloud': ['sap','s3'],
    'DevOps & Tools': ['docker','jenkins','git','maven','intellij','postman'],
    Testing: ['junit','mockito']
  },

  skillMeta: SKILL_META,

  experience: [
    {
      company: "Botree Software International Pvt Ltd",
      role: "Software Engineer 1",
      period: "Jan 2026 — Present",
      location: "Chennai, India",
      current: true,
      summary: "Owns multiple business-critical modules across Nivea, Wipro and HMD DMS products + an in-house GenAI assistant.",
      highlights: [
        "Owner of Offer Rollout in Nivea Promo & Claim Settlement.",
        "Owner of Scheme + Contract Pricing in Wipro DMS.",
        "Designed and built CSNG ↔ SAP integration microservice.",
        "DAO modernization + Stock Management on HMD DMS.",
        "Built in-house GenAI chatbot + sales-analytics (private SLM + RAG)."
      ]
    },
    {
      company: "Clap Hands",
      role: "Software Engineer",
      period: "Oct 2022 — Dec 2025",
      location: "Chennai, India",
      current: false,
      summary: "Enterprise CRM & Web Application Platform (B2B SaaS).",
      highlights: [
        "CRM apps using Spring Boot + React.js for multiple B2B clients.",
        "RESTful microservices with Eureka Server + JWT.",
        "Spring Security + JWT role-based auth.",
        "MySQL tuning + Spring Batch for throughput.",
        "CI/CD with Jenkins + Docker + GitLab."
      ]
    }
  ],

  /* ---- COMPANY PROJECTS ---- */
  companyProjects: [
    {
      id: "nivea",
      title: "Nivea Promo & Claim Settlement",
      client: "Nivea · FMCG",
      role: "Owner · Offer Rollout Module",
      icon: "🎯",
      color: "#ec4899",
      stack: ["Java","Spring","Hibernate","MySQL","PrimeFaces","Angular"],
      summary: "FMCG promo + claim-settlement platform across all major e-commerce accounts under Nivea (FLIPKART, Amazon, Quick-commerce).",
      bullets: [
        "Owner of Offer Rollout — monthly base offers, growth / base budget validation, event calendars, allocations and claim settlement.",
        "Delivered end-to-end rollout for every major e-com platform under Nivea, across multiple categories and sub-accounts.",
        "Dialog-based budget capture + submit-time warning / re-prompt approval gates.",
        "Multiple high-impact CRs across Reports and Master-Data screens."
      ],
      details: {
        duration: "Jan 2026 — ongoing",
        team: "~8 engineers",
        impact: "Automated monthly offer rollout across 10+ e-com accounts; reduced manual budget reconciliation effort significantly.",
        myRole: "Full ownership of the Offer Rollout module — requirements, build, unit tests, releases.",
        tech: "Java 21 · Spring (XML-wired) · Hibernate · MySQL 8.4 · PrimeFaces Ultima · Angular dashboards"
      }
    },
    {
      id: "wipro",
      title: "Wipro DMS (CSNG)",
      client: "Wipro · Full Distributor Billing",
      role: "Owner · Scheme & Contract Pricing",
      icon: "📦",
      color: "#6366f1",
      stack: ["Java","Spring","Hibernate","MySQL","Angular"],
      summary: "Full distributor billing application used by Wipro's distributor network for sales, billing, inventory and settlement.",
      bullets: [
        "Owner of Scheme Module — customized Scheme engine for quantity / value / slab / free-goods / combination schemes applied at the billing level.",
        "Owner of Contract Pricing Module — contract-based pricing configuration applied across sales + billing.",
        "Reports, dashboards and master-data CRs with high defect-free delivery."
      ],
      details: {
        duration: "2026 — ongoing",
        team: "Wipro CSNG squad",
        impact: "Multiple scheme types applied correctly at billing — removes manual billing re-work by trade-marketing team.",
        myRole: "End-to-end ownership of two core billing modules.",
        tech: "Java 21 · Spring · Hibernate · MySQL · Angular · JSF/PrimeFaces"
      }
    },
    {
      id: "sap",
      title: "CSNG ↔ SAP Integration",
      client: "Botree · Project: Drools",
      role: "Microservice Owner",
      icon: "🔄",
      color: "#8b5cf6",
      stack: ["Spring Boot","Microservices","REST","SAP","Java"],
      summary: "Independent Spring Boot + REST microservice built from scratch for bi-directional data integration between CSNG and SAP.",
      bullets: [
        "CSNG → SAP (outbound): Billing, Sales Orders, GRN, Stock, Retailer / Customer master, Sales Returns.",
        "SAP → CSNG (inbound): Purchase Imports and related master data.",
        "Change-tracking + re-sync — updates in CSNG re-publish to SAP automatically.",
        "Owned API contract design, auth, retries, error-handling and logging."
      ],
      details: {
        duration: "2026",
        team: "Solo-build by me",
        impact: "Replaces manual data entry between CSNG and SAP for a daily transaction volume.",
        myRole: "Designer + builder of the entire microservice from scratch.",
        tech: "Spring Boot · REST · JWT · MySQL · SAP APIs"
      }
    },
    {
      id: "hmd",
      title: "HMD DMS Application",
      client: "HMD · Distributor Billing",
      role: "DAO Modernization + Stock",
      icon: "📱",
      color: "#06b6d4",
      stack: ["Java","Spring","Hibernate","MySQL"],
      summary: "DMS billing and operations app delivered to HMD for their distributor network.",
      bullets: [
        "Driving DAO-layer replacement / modernization for performance + testability.",
        "Owning Stock Management — inflow/outflow, snapshots, reconciliation.",
        "Flows feed billing and reporting pipelines."
      ],
      details: {
        duration: "2026",
        team: "HMD squad",
        impact: "Modernized DAO layer unblocks new feature velocity + reduces defect density.",
        myRole: "DAO refactor + Stock module build.",
        tech: "Java · Spring · Hibernate · MySQL"
      }
    },
    {
      id: "genai",
      title: "In-house GenAI (Chatbot + Sales Analytics)",
      client: "Botree · Internal",
      role: "AI Developer",
      icon: "🤖",
      color: "#10b981",
      stack: ["Python","SLM","RAG","Vector DB","Embeddings","MCP"],
      summary: "Internal Generative-AI project combining a private Small Language Model (SLM) with company data to power a chatbot + analytics assistant.",
      bullets: [
        "Distributor Q&A Chatbot inside the DMS — natural-language answers on orders, stock, schemes, settlements, reports.",
        "Sales Analytics Assistant — insights, summaries and anomaly surfacing.",
        "RAG pipeline using vector DBs, embeddings and semantic search.",
        "Private / on-prem deployment to protect sensitive data."
      ],
      details: {
        duration: "2026",
        team: "Internal R&D",
        impact: "Field distributors self-serve answers that previously needed support tickets.",
        myRole: "Designer + builder of the full pipeline (data ingestion → RAG → model → chat UI).",
        tech: "Python · SLM · RAG · Vector DB · MCP"
      }
    }
  ],

  /* ---- GITHUB (PERSONAL) PROJECTS — top 10 from github.com/POONTAMILZHAN ---- */
  githubProjects: [
    {
      id:'inv_res', title:'Inventory Reservation', repo:'Inventory_Reservation', language:'Java',
      icon:'📊', color:'#f80000', stack:['Java','Spring Boot','Microservices','MySQL'],
      summary:'Enterprise-style inventory reservation microservice — stock allocation, release and expiry workflow.',
      details:{ purpose:'A clean-slate microservice demo showing stock reservation / release across orders.', features:['Reservation lifecycle','Expiry + release','REST API','Unit tests'] }
    },
    {
      id:'hospital', title:'Hospital Management App', repo:'Hospital-App', language:'JavaScript',
      icon:'🏥', color:'#06b6d4', stack:['JavaScript','Node.js','MongoDB'],
      summary:'Hospital operations app — patient records, appointments, billing.',
      details:{ purpose:'Full-stack sample app for hospital staff workflows.', features:['Patient CRUD','Appointment scheduling','Billing','Role-based auth'] }
    },
    {
      id:'dryfish', title:'Dryfish E-commerce', repo:'Dryfish_Ecommerce', language:'PHP',
      icon:'🛒', color:'#f59e0b', stack:['PHP','MySQL','Bootstrap'],
      summary:'End-to-end e-commerce platform for a dry-fish retailer — catalog, cart, orders.',
      details:{ purpose:'Niche e-commerce storefront with admin backend.', features:['Catalog','Cart & checkout','Admin dashboard','Order management'] }
    },
    {
      id:'restaurant_pos', title:'Restaurant POS', repo:'Restaurant_pos', language:'PHP',
      icon:'🍽️', color:'#ef4444', stack:['PHP','MySQL','jQuery'],
      summary:'Point-of-sale system for restaurants — orders, bills, tables.',
      details:{ purpose:'Fast POS screen + kitchen printing + daily reports.', features:['Table layout','KOT','Bill split','Daily sales report'] }
    },
    {
      id:'linqcorp', title:'LinqCorp Website', repo:'linqcorp_website', language:'CSS',
      icon:'🌐', color:'#8b5cf6', stack:['HTML','CSS','JavaScript'],
      summary:'Corporate marketing website — responsive, animated, mobile-friendly.',
      details:{ purpose:'Marketing site build showing clean responsive design.', features:['Responsive hero','Services grid','Contact form','Smooth scroll'] }
    },
    {
      id:'chatgpt_clone', title:'ChatGPT Clone', repo:'ChatGPT_Clone', language:'JavaScript',
      icon:'💬', color:'#10b981', stack:['JavaScript','Vite','React'],
      summary:'ChatGPT-like chat UI built with JavaScript + Vite — streamed replies and conversation history.',
      details:{ purpose:'UI clone exploring streaming responses + chat UX.', features:['Streaming chat','Conversation history','Light/dark','Prompt suggestions'] }
    },
    {
      id:'resume_react', title:'Resume Showcase (React)', repo:'Resume-ShowCase-Using_React', language:'JavaScript',
      icon:'📄', color:'#61dafb', stack:['React','JavaScript','CSS'],
      summary:'Interactive resume site built with React — route-driven sections and smooth transitions.',
      details:{ purpose:'React fundamentals showcase for a personal resume.', features:['SPA routing','Reusable components','Responsive layout'] }
    },
    {
      id:'github_search', title:'GitHub Profile Search', repo:'Github_profile_search', language:'JavaScript',
      icon:'🔍', color:'#171515', stack:['JavaScript','Fetch API','GitHub API'],
      summary:'Search any GitHub user and view their profile stats + repos via the GitHub REST API.',
      details:{ purpose:'Mini project to practise REST API consumption + UI state.', features:['Live search','Pagination','Repo listing'] }
    },
    {
      id:'quiz_app', title:'Quiz App', repo:'Quiz-app', language:'JavaScript',
      icon:'🧩', color:'#6366f1', stack:['JavaScript','HTML','CSS'],
      summary:'Interactive quiz web app with scoring, timer and category selection.',
      details:{ purpose:'Vanilla-JS skill demo with state management and timer.', features:['Timed questions','Score tracking','Category filter'] }
    },
    {
      id:'spring_sec', title:'Spring Security Registration', repo:'spring-security-registration', language:'Java',
      icon:'🔐', color:'#6db33f', stack:['Java','Spring','Spring Security','JWT'],
      summary:'Deep-dive into Spring Security — registration, email verification, password reset, JWT.',
      details:{ purpose:'Hardening Spring Security practice across registration flow.', features:['Registration + verification','Password reset','JWT auth'] }
    }
  ],

  recognition: {
    title: "Botree Ignite — Manager Appreciation",
    quote: "Demonstrated exceptional adaptability and played a significant role in the successful development and migration of key CSNG projects (HMD & Wipro) — delivered with high quality and within committed timelines."
  },

  certifications: [
    { title: "Claude Code — Developer Essentials", issuer: "Anthropic Learning (via Skilljar)", icon: "✨" },
    { title: "Claude for Developers — Advanced API & Prompt Engineering", issuer: "Anthropic Learning (via Skilljar)", icon: "🧠" },
    { title: "Botree Ignite Programme — Manager Appreciation", issuer: "Botree Software", icon: "🏆" },
    { title: "Java Full Stack Development", issuer: "Hands-on Training", icon: "☕" },
    { title: "Angular Front-End Development", issuer: "Hands-on Training", icon: "🅰️" }
  ],

  education: {
    degree: "B.E. — Electronics and Communication Engineering",
    institute: "Park College of Engineering and Technology (Anna University)",
    location: "Coimbatore, Tamil Nadu, India",
    period: "Mar 2018 — Apr 2022"
  }
};

if (typeof window !== "undefined") window.DATA = DATA;
if (typeof module !== "undefined") module.exports = DATA;
