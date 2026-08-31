/* =========================================================
   Case study page — reads ?id= and builds the page
   ========================================================= */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function esc(str){
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function safeUrl(u){
  if(!u || u === '#') return '#';
  return /^(https?:|mailto:|tel:)/i.test(u) ? u : '#';
}

/* deterministic placeholder artwork, used whenever an image path is empty */
function seeded(seed){
  let s = seed % 2147483647; if(s <= 0) s += 2147483646;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}
function placeholder(seed, w = 1200, h = 700){
  const rand = seeded(seed * 131 + 17);
  const stops = [
    ['#4a6b2a', '#1d3f52'], ['#2b2b2f', '#6e6e73'], ['#233d5c', '#8DC050'],
    ['#3a1f1f', '#7a7a80'], ['#1d1d1f', '#454549']
  ][seed % 5];
  let art = '';
  for(let i = 0; i < 4; i++){
    const cx = 120 + rand() * (w - 240), cy = 80 + rand() * (h - 160), r = 40 + rand() * 130;
    art += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="none" stroke="rgba(255,255,255,.16)"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${stops[0]}"/><stop offset="100%" stop-color="${stops[1]}"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g${seed})"/>${art}
    <rect x="${w*0.08}" y="${h*0.16}" width="${w*0.84}" height="${h*0.72}" rx="10" fill="rgba(255,255,255,.9)"/>
    <rect x="${w*0.08}" y="${h*0.16}" width="${w*0.84}" height="46" rx="10" fill="rgba(0,0,0,.06)"/>
    <text x="${w/2}" y="${h*0.55}" text-anchor="middle" font-family="Outfit, sans-serif"
          font-size="26" fill="rgba(0,0,0,.28)">Screenshot placeholder</text>
  </svg>`;
}
const visual = (src, seed, alt) => src
  ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`
  : placeholder(seed);

/* ---------- resolve which project to show ---------- */
const params = new URLSearchParams(location.search);
const wanted = Number(params.get('id'));
const projects = window.PROJECTS || [];
const project  = projects.find(p => p.id === wanted) || projects[0];
const others   = projects.filter(p => p.id !== project.id).slice(0, 6);

document.title = `${project.title} — Mahmoud Hamidoun`;

/* ---------- build the page ---------- */
document.getElementById('caseRoot').innerHTML = `
  <section class="case-hero">
    <div class="wrap">
      <a href="index.html#work" class="case-back reveal">← Back to work</a>
      <h1 class="reveal" style="--d:.05s">${esc(project.title)}</h1>
      <p class="case-summary reveal" style="--d:.1s">${esc(project.summary)}</p>

      <div class="case-meta reveal" style="--d:.16s">
        <div><span class="meta-label">Client</span><span class="meta-value">${esc(project.client)}</span></div>
        <div><span class="meta-label">Year</span><span class="meta-value">${esc(project.year)}</span></div>
        <div><span class="meta-label">Scope of work</span><span class="meta-value">${esc(project.scope)}</span></div>
      </div>
    </div>

    <div class="wrap case-cover-wrap reveal" style="--d:.2s">
      <div class="case-cover">${visual(project.cover, project.id, project.title + ' cover')}</div>
      <a href="${safeUrl(project.url)}" target="_blank" rel="noopener" class="live-badge" aria-label="Visit the live site">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs><path id="circlePath${project.id}" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"/></defs>
          <text font-size="11.5" letter-spacing="2.2" fill="currentColor" font-family="Outfit, sans-serif">
            <textPath href="#circlePath${project.id}">VISIT LIVE LINK • VISIT LIVE LINK • </textPath>
          </text>
        </svg>
        <span class="live-badge-play">▶</span>
      </a>
    </div>
  </section>

  ${project.sections.map((s, i) => `
    <section class="case-block">
      <div class="wrap case-block-head">
        <h2 class="reveal">${esc(s.title)}</h2>
        <p class="reveal" style="--d:.08s">${esc(s.text)}</p>
      </div>
      <div class="wrap reveal" style="--d:.12s">
        <div class="case-shot">${visual(s.image, project.id + i + 3, s.title)}</div>
      </div>
    </section>`).join('')}

  <section class="case-brand">
    <div class="wrap">
      <div class="brand-panel reveal">
        <div class="brand-type">
          <span class="brand-label">Typography</span>
          <div class="brand-font">${esc(project.typography)}</div>
          <span class="brand-sub">Regular</span>
        </div>
        <div class="brand-colors">
          <span class="brand-label">Color palette</span>
          <div class="swatches">
            ${project.palette.map(hex => `
              <div class="swatch"><span style="background:${esc(hex)}"></span>${esc(hex)}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="case-cta">
    <div class="wrap">
      <div class="tag reveal" style="justify-content:center">Contact</div>
      <h2 class="reveal" style="--d:.06s">Need a website like this?</h2>
      <p class="reveal" style="--d:.12s">From strategy and UI/UX design to development and launch — I build sites that pair a premium look with real business results.</p>
      <a class="btn btn-solid btn-lg reveal" style="--d:.18s"
         href="mailto:mahmoudcodes@gmail.com?subject=30-min%20intro%20call%20request&body=Hi%20Mahmoud%2C%0A%0AI%E2%80%99d%20like%20to%20book%20a%2030-minute%20intro%20call%20on%20Google%20Meet.%0A%0A---%20About%20my%20project%20---%0A%0A%F0%9F%92%A1%20What%20I%E2%80%99m%20building%3A%0A(describe%20your%20idea%20here)%0A%0A%F0%9F%8E%AF%20Main%20goals%20and%20features%3A%0A(what%20should%20the%20finished%20product%20do%3F)%0A%0A%F0%9F%93%85%20My%20availability%20(2%E2%80%933%20time%20slots%2C%20GMT%2B1)%3A%0A-%20Option%201%3A%20%0A-%20Option%202%3A%20%0A-%20Option%203%3A%20%0A%0ALooking%20forward%20to%20speaking%20with%20you.%0A%0ABest%2C%0A(your%20name)">Book a call</a>
    </div>
  </section>

  <section class="case-others">
    <div class="wrap">
      <h2 class="reveal">Other projects</h2>
      <p class="others-sub reveal" style="--d:.08s">A curated collection of refined, modern digital experiences built for forward-thinking brands.</p>
      <div class="others-grid">
        ${others.map((p, i) => `
          <a class="other-card reveal" style="--d:${(i % 2) * .08}s" href="project.html?id=${p.id}">
            <div class="other-art">${visual(p.cover, p.id, p.title)}</div>
            <div class="other-foot">
              <span class="other-name">${esc(p.title)}</span>
              <span class="other-year">${esc(p.year)}</span>
            </div>
          </a>`).join('')}
      </div>
    </div>
  </section>
`;

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:.12, rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- nav + progress ---------- */
const header = document.querySelector('header');
const progressBar = document.getElementById('progressBar');
function onScroll(){
  header.classList.toggle('scrolled', window.scrollY > 40);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, {passive:true});
window.addEventListener('resize', onScroll);
onScroll();