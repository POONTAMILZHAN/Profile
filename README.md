<div align="center">

# 🚀 Poonthamizhan K — Portfolio

### Software Engineer · Java & Angular Full-Stack · Microservices · Generative AI Developer

**A modern, animated, dual-theme personal portfolio built with pure HTML / CSS / Vanilla JS.**
*Zero build step · Zero dependencies · ~350 KB total.*

[![Deploy on GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?logo=github&logoColor=white)](https://pages.github.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981.svg)](LICENSE)

[**🌐 Live Demo**](https://poontamilzhan.github.io/Profile/) · [**👨‍💻 GitHub**](https://github.com/POONTAMILZHAN) · [**💼 LinkedIn**](https://www.linkedin.com/in/poontamilzhan/) · [**📄 Resume (PDF)**](assets/resume/Poonthamizhan_K_Resume.pdf)

</div>

---

## ✨ Highlights

- 🎨 **Claymorphism design** — soft 3D puffy cards, inner + outer shadows, no flat glass
- 🌓 **Dark + Light themes** — toggle with persistence (localStorage), smooth palette swap
- 🤖 **Local SLM-style AI chatbot** — 30 intents, streamed replies, no API key needed
- 🧩 **Interactive particle network background** — dots connect by proximity and react to the cursor
- 💻 **Developer-themed hero** — VS-Code-style `profile.ts` card with 3D tilt effect
- ⚡ **Terminal prompt logo** — `~/pk ▊` with blinking caret
- 📦 **Enterprise + Open Source projects** — 5 Botree ownership projects + 10 live GitHub repos
- 🏷️ **36 skill icons** — Simple Icons CDN, clickable chips open a knowledge popup
- 📄 **Multi-format resume download** — PDF, DOCX, Markdown
- 📱 **Fully responsive** — mobile hamburger, full-screen chatbot on mobile
- 🖱️ **Custom cursor** — dot + glow ring that follows with inertia
- ♿ **Honors `prefers-reduced-motion`** — motion animations respect user settings
- 🚀 **No build step** — drop the folder onto any static host

---

## 🖼️ Preview

| Dark | Light |
|---|---|
| Deep teal canvas, emerald glow | Mint cream, soft claymorphism |
| Cyan → Emerald → Amber gradient | Darker emerald/teal accents |
| Floating particles with lines | Same, with punchier dots |

### Live sections

```
Hero          →  3D-tilt code card + giant typography
About         →  Portrait with emerald glow halo + 4 stat counters
Skills        →  11 categories · 36 clickable icon chips
Experience    →  Vertical timeline (Botree · current + Clap Hands)
Work          →  5 enterprise projects (Nivea · Wipro · SAP · HMD · GenAI)
GitHub        →  10 open-source side projects
Recognition   →  Manager appreciation quote
Certs         →  2× Claude + Botree Ignite + Java FS + Angular
Chatbot       →  Floating SLM-style assistant
Contact       →  WhatsApp · Email · Subscribe · Resume (PDF / DOCX / MD)
```

---

## 🛠️ Tech Stack

| Area | Stack |
|---|---|
| **Markup** | Semantic HTML5 |
| **Styles** | CSS3, CSS custom properties, Grid, Flexbox, `color-mix()`, `backdrop-filter` |
| **Logic** | Vanilla JavaScript (ES6+), IIFE modules, IntersectionObserver, Canvas 2D, `requestAnimationFrame` |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts |
| **Icons** | [Simple Icons CDN](https://simpleicons.org/) + Unicode emoji |
| **No frameworks** | No React, no Angular, no Vue, no npm, no node_modules |

---

## 📁 Project Structure

```
Portfolio/
├── index.html                 # Single-page markup
├── assets/
│   ├── favicon.svg
│   ├── profile.jpg            # Avatar for About section
│   └── resume/
│       ├── Poonthamizhan_K_Resume.pdf
│       ├── Poonthamizhan_K_Resume.docx
│       └── Poonthamizhan_K_Resume.md
├── css/
│   ├── themes.css             # Dark + light tokens (emerald/teal/amber + clay shadows)
│   ├── style.css              # Layout, components, responsive
│   └── animations.css         # Keyframes, cursor, loader, reveal
├── js/
│   ├── data.js                # ★ Single source of truth (profile, skills, projects)
│   ├── theme.js               # Dark/light toggle + persistence
│   ├── cursor.js              # Custom cursor + glow ring
│   ├── particles.js           # Interactive canvas particle network
│   ├── modals.js              # Skills + Projects grid renderers + popups
│   ├── chatbot.js             # Local SLM-style intent engine
│   └── main.js                # Nav, reveal, stat counters, hero tilt, forms
└── README.md
```

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/POONTAMILZHAN/Profile.git
cd Profile

# Serve locally (pick any)
python3 -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000

# Open
open http://localhost:8000
```

That's it. No dependencies, no build.

---

## 🚢 Deploy

### GitHub Pages (recommended)

```bash
# Push the repo
git push origin main

# Settings → Pages → Source: main / root → Save
# Live at: https://poontamilzhan.github.io/Profile/
```

### Netlify / Vercel

Drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop) or run `vercel .` from the folder root.

---

## 🤖 About the AI Chatbot

The chatbot runs **entirely in the browser** — no API calls, no backend, no key. It uses an **intent classifier** scored across keyword lists to pick the best response, then **streams** the reply character-by-character so it reads like a real SLM.

### Supported intents

```
greet · who · experience · current · previous · skills · angular · spring ·
microservices · genai · rag · claude · projects · nivea · wipro · sap · hmd ·
genaiproject · education · certifications · recognition · contact · email ·
whatsapp · linkedin · github · resume · location · thanks · bye · fallback
```

### Switching to a real LLM

Replace `respond()` in `js/chatbot.js` with a `fetch()` to the Claude API or any LLM endpoint — the UI, streaming and typing dots will keep working.

---

## 🎨 Customization

Everything content-related lives in **`js/data.js`** — the one file to edit:

```js
const DATA = {
  profile: { name, headline, email, github, linkedin, bio, stats, ... },
  skills: { Languages, Backend, Frontend, Databases, "Generative AI", ... },
  skillMeta: { java, angular, spring_boot, ... },   // click-popup details
  experience: [ { company, role, period, highlights }, ... ],
  companyProjects: [ /* 5 enterprise projects */ ],
  githubProjects:  [ /* 10 open-source repos */ ],
  recognition: { title, quote },
  certifications: [ ... ],
  education: { degree, institute, location, period }
};
```

Edit this file and every section (Skills, Projects, Experience, Chatbot, Modals) re-renders from the new data.

### Change the color theme

Edit `css/themes.css` — swap the three accent colors (`--accent-1/2/3`) and the clay shadow tokens.

### Change the hero code card

The `profile.ts` snippet is in `index.html` inside `.code-body` — edit any line.

---

## ⌨️ Keyboard & Touch

- `← →` arrows — navigate project carousel (if re-enabled)
- `Esc` — close any open modal
- Touch — swipe projects, open chat, pinch-zoom resume
- `prefers-reduced-motion` honored — particle animation and cursor glow disabled

---

## 📸 Browser Support

Tested against:
- ✅ Chrome 100+
- ✅ Firefox 100+
- ✅ Safari 16+
- ✅ Edge 100+
- ✅ Mobile Safari (iOS 15+)
- ✅ Chrome Android (10+)

---

## 📄 License

MIT — feel free to fork and remix for your own portfolio.
Please remove my personal details (`js/data.js`, `assets/profile.jpg`, resume files) before republishing.

---

## 🙏 Credits

Built by **[Poonthamizhan K](https://github.com/POONTAMILZHAN)** · Chennai, India
Crafted with ❤ and a little bit of [Claude Code](https://claude.com/claude-code).

---

<div align="center">

### If this portfolio inspires you, ⭐ star the repo!

[![GitHub stars](https://img.shields.io/github/stars/POONTAMILZHAN/Profile?style=social)](https://github.com/POONTAMILZHAN/Profile)
[![GitHub forks](https://img.shields.io/github/forks/POONTAMILZHAN/Profile?style=social)](https://github.com/POONTAMILZHAN/Profile)

</div>
