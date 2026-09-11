/* =========================================================
   Case study page — builds itself from ?id=
   ========================================================= */
function esc(str){
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function safeUrl(u){
  if(!u || u === '#') return '#';
  return /^(https?:|mailto:|tel:)/i.test(u) ? u : '#';
}

/* neutral placeholder: a plain browser frame, shown when an image path is empty */
function placeholder(w = 1600, h = 900){
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#f5f5f7"/>
    <rect x="${w*0.06}" y="${h*0.1}" width="${w*0.88}" height="${h*0.8}" rx="6" fill="#fff" stroke="#e3e3e6"/>
    <rect x="${w*0.06}" y="${h*0.1}" width="${w*0.88}" height="34" rx="6" fill="#fafafa"/>
    <circle cx="${w*0.08}"  cy="${h*0.1+17}" r="4.5" fill="#e3e3e6"/>
    <circle cx="${w*0.095}" cy="${h*0.1+17}" r="4.5" fill="#e3e3e6"/>
    <circle cx="${w*0.11}"  cy="${h*0.1+17}" r="4.5" fill="#e3e3e6"/>
    <rect x="${w*0.12}" y="${h*0.28}" width="${w*0.34}" height="14" rx="7" fill="#ececee"/>
    <rect x="${w*0.12}" y="${h*0.36}" width="${w*0.24}" height="14" rx="7" fill="#f0f0f2"/>
    <rect x="${w*0.12}" y="${h*0.5}"  width="${w*0.3}"  height="${h*0.28}" rx="6" fill="#f2f2f4"/>
    <rect x="${w*0.46}" y="${h*0.5}"  width="${w*0.3}"  height="${h*0.28}" rx="6" fill="#f6f6f8"/>
    <text x="${w/2}" y="${h*0.94}" text-anchor="middle" font-family="Outfit, sans-serif"
          font-size="20" fill="#b9b9bf">Image placeholder</text>
  </svg>`;
}
const visual = (src, alt) => src
  ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`
  : placeholder();

/* a recording of the live site: plays while it is on screen, still frame otherwise */
const clip = (v, poster, alt) => `
  <video class="clip" playsinline muted loop preload="none" aria-label="${esc(alt)}"
         ${poster ? `poster="${esc(poster)}"` : ''}>
    ${v.webm ? `<source src="${esc(v.webm)}" type="video/webm">` : ''}
    ${v.mp4 ? `<source src="${esc(v.mp4)}" type="video/mp4">` : ''}
  </video>`;

const shot = (s, alt) => s.video ? clip(s.video, s.image, alt) : visual(s.image, alt);

/* A long, neutral stand-in page — used for the opener until a project has
   real full-page captures in /assets. Deterministic, so it never reshuffles. */
function longPage(seed, withHero){
  let s = seed * 9301 + 49297;
  const rand = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const W = 1100, H = 2100, pad = 64;
  let out = `<rect width="${W}" height="${H}" fill="#ffffff"/>`;
  let y = 40;

  if(withHero){
    out += `<rect x="${pad}" y="26" width="86" height="13" rx="3" fill="#d6d6db"/>`;
    for(let i = 0; i < 4; i++)
      out += `<rect x="${740 + i * 60}" y="29" width="42" height="8" rx="4" fill="#e4e4e8"/>`;
    out += `<rect x="0" y="64" width="${W}" height="1" fill="#ececee"/>`;
    y = 65;

    const heroH = 400 + Math.round(rand() * 120);
    out += `<rect x="0" y="${y}" width="${W}" height="${heroH}" fill="#17171a"/>`;
    out += `<rect x="${W/2 - 210}" y="${y + heroH/2 - 46}" width="420" height="30" rx="4" fill="#ffffff" opacity=".92"/>`;
    out += `<rect x="${W/2 - 140}" y="${y + heroH/2 + 2}" width="280" height="30" rx="4" fill="#ffffff" opacity=".55"/>`;
    out += `<rect x="${W/2 - 118}" y="${y + heroH/2 + 62}" width="106" height="34" rx="17" fill="#ffffff" opacity=".9"/>`;
    out += `<rect x="${W/2 + 6}" y="${y + heroH/2 + 62}" width="106" height="34" rx="17" fill="none" stroke="#ffffff" stroke-opacity=".55"/>`;
    y += heroH + 96;
  }

  const heading = () => {
    out += `<rect x="${pad}" y="${y}" width="${200 + Math.round(rand()*160)}" height="26" rx="4" fill="#1d1d1f"/>`;
    y += 46;
    out += `<rect x="${pad}" y="${y}" width="${380 + Math.round(rand()*140)}" height="10" rx="5" fill="#e2e2e6"/>`;
    y += 44;
  };
  const cards = n => {
    const gap = 22, w = (W - pad*2 - gap*(n-1)) / n, h = 160 + Math.round(rand()*90);
    for(let i = 0; i < n; i++)
      out += `<rect x="${pad + i*(w+gap)}" y="${y}" width="${w}" height="${h}" rx="4" fill="${i % 2 ? '#ededf0' : '#e6e6ea'}"/>`;
    y += h + 88;
  };
  const band = () => {
    const h = 190 + Math.round(rand()*70);
    out += `<rect x="0" y="${y}" width="${W}" height="${h}" fill="#f4f4f6"/>`;
    out += `<rect x="${pad}" y="${y + h/2 - 24}" width="260" height="22" rx="4" fill="#c9c9d0"/>`;
    out += `<rect x="${pad}" y="${y + h/2 + 10}" width="400" height="9" rx="4" fill="#dededf"/>`;
    y += h + 88;
  };
  const columns = () => {
    const h = 150 + Math.round(rand()*70);
    out += `<rect x="${pad}" y="${y}" width="${W/2 - pad - 20}" height="${h}" rx="4" fill="#e9e9ed"/>`;
    for(let i = 0; i < 4; i++)
      out += `<rect x="${W/2 + 20}" y="${y + i*26}" width="${360 - i*40}" height="9" rx="4" fill="#e4e4e8"/>`;
    y += h + 88;
  };

  const blocks = withHero
    ? [heading, cards.bind(null, 3), band, columns, heading, cards.bind(null, 2)]
    : [columns, heading, cards.bind(null, 3), band, columns, heading, cards.bind(null, 2), band];
  let i = 0;
  const floor = withHero ? H : H - 200;
  while(y < floor - 220 && i < 40){ blocks[i % blocks.length](); i++; }

  /* the lower half is the one that ends on a footer */
  if(!withHero){
    out += `<rect x="0" y="${H - 200}" width="${W}" height="200" fill="#f7f7f8"/>`;
    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 4; r++)
        out += `<rect x="${pad + c*230}" y="${H - 150 + r*22}" width="${r ? 92 : 62}" height="8" rx="4" fill="${r ? '#e2e2e6' : '#c9c9d0'}"/>`;
  }

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img"
    aria-label="Placeholder page layout">${out}</svg>`;
}

const posterPanel = (src, alt, seed, withHero) => src
  ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`
  : longPage(seed, withHero);

/* ---------- which project ---------- */
const params   = new URLSearchParams(location.search);
const projects = window.PROJECTS || [];
/* Some hosts and in-app browsers drop the query string on a link click, which
   would silently land every card on the first project. The id the visitor
   actually clicked is stashed on the way out, so fall back to that. */
let wanted = Number(params.get('id'));
if(!wanted){
  try { wanted = Number(sessionStorage.getItem('lastProjectId')); } catch(e){}
}
const project  = projects.find(p => p.id === wanted) || projects[0];
try { sessionStorage.setItem('lastProjectId', String(project.id)); } catch(e){}
const idx      = projects.indexOf(project);
const prev     = projects[(idx - 1 + projects.length) % projects.length];
const next     = projects[(idx + 1) % projects.length];
const others   = projects.filter(p => p.id !== project.id).slice(0, 2);

document.title = `${project.title} — ishowdevz`;

/* ---------- the case study borrows the project's own colours ---------- */
const isHex = v => /^#[0-9a-f]{3,8}$/i.test(String(v || ''));
if(project.theme){
  const t = project.theme;
  document.body.classList.add('themed');
  [['--accent', t.accent], ['--accent-deep', t.accentDeep],
   ['--accent-ink', t.ink], ['--accent-tint', t.tint]]
    .forEach(([k, v]) => { if(isHex(v)) document.body.style.setProperty(k, v); });
}

const live = safeUrl(project.url);
const liveHost = live === '#' ? '' : live.replace(/^https?:\/\//, '').replace(/\/$/, '');
const liveLink = live === '#'
  ? ''
  : `<a class="cs-live" href="${live}" target="_blank" rel="noopener">
       <span>Visit the live site</span>
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
         <path d="M7 17 17 7M9 7h8v8"/>
       </svg>
     </a>
     <span class="cs-live-host">${esc(liveHost)}</span>`;

/* ---------- build ---------- */
document.getElementById('caseRoot').innerHTML = `

  <section class="cs-intro">
    <div class="wrap">
      <nav class="cs-crumb reveal" aria-label="Breadcrumb">
        <a href="index.html#work">Work</a><span aria-hidden="true">/</span><span>${esc(project.title)}</span>
      </nav>

      <div class="cs-intro-grid">
        <div class="cs-intro-main">
          <span class="cs-tag reveal">${esc(project.tag)}</span>
          <h1 class="reveal" style="--d:.05s">${esc(project.title)}</h1>
          <p class="cs-lede reveal" style="--d:.1s">${esc(project.summary)}</p>
          <div class="cs-live-wrap reveal" style="--d:.15s">${liveLink}</div>
        </div>

        <dl class="cs-spec reveal" style="--d:.2s">
          <div><dt>Client</dt><dd>${esc(project.client)}</dd></div>
          <div><dt>Year</dt><dd>${esc(project.year)}</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="cs-poster" aria-label="${esc(project.title)} — the site end to end">
    <div class="poster-inner">
      <figure class="poster-panel panel-back">
        ${posterPanel(project.poster && project.poster.bottom,
                      project.title + ' — lower half of the page', project.id * 7 + 3, false)}
      </figure>
      <figure class="poster-panel panel-front">
        ${posterPanel(project.poster && project.poster.top,
                      project.title + ' — upper half of the page', project.id * 7, true)}
      </figure>
    </div>
  </section>

  <section class="cs-chapters">
    <div class="wrap">
      ${project.sections.map(s => `
        <article class="chapter">
          <h2 class="reveal">${esc(s.title)}</h2>
          <p class="reveal" style="--d:.05s">${esc(s.text)}</p>
          <div class="chapter-shot reveal" style="--d:.08s">${shot(s, s.title)}</div>
        </article>`).join('')}
    </div>
  </section>

  ${project.screens && project.screens.length ? `
  <section class="cs-screens">
    <div class="wrap">
      <h2 class="cs-band-title reveal">On a phone</h2>
      <div class="screens-row">
        ${project.screens.map((s, i) => `
          <figure class="screen reveal" style="--d:${i * .08}s">
            <div class="phone">${s.video
              ? clip(s.video, s.src, s.caption || project.title)
              : `<img src="${esc(s.src)}" alt="${esc(s.caption || project.title)}" loading="lazy">`}</div>
            <figcaption>${esc(s.caption || '')}</figcaption>
          </figure>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${live === '#' ? '' : `
  <section class="cs-visit">
    <div class="wrap cs-visit-inner reveal">
      <div>
        <h2>See it for yourself</h2>
        <p>${esc(project.title)} is live and open to everyone — click through and use it the way your visitors would.</p>
      </div>
      <a class="cs-live cs-live-lg" href="${live}" target="_blank" rel="noopener">
        <span>Visit the live site</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8"/>
        </svg>
      </a>
    </div>
  </section>`}

  <nav class="cs-pager" aria-label="Project navigation">
    <div class="wrap cs-pager-grid">
      <a class="pager-link prev" href="project.html?id=${prev.id}">
        <span class="pager-label">← Previous</span>
        <span class="pager-name">${esc(prev.title)}</span>
      </a>
      <a class="pager-link next" href="project.html?id=${next.id}">
        <span class="pager-label">Next →</span>
        <span class="pager-name">${esc(next.title)}</span>
      </a>
    </div>
  </nav>

  <section class="cs-band">
    <div class="wrap cs-band-grid">
      <div>
        <h2 class="reveal">Want something like this built?</h2>
        <p class="reveal" style="--d:.06s">Strategy, design, build and launch — handled end to end by one person.</p>
      </div>
      <a class="btn btn-invert btn-lg reveal" style="--d:.12s"
         href="mailto:mahmoudcodes@gmail.com?subject=30-min%20intro%20call%20request&body=Hi%20Mahmoud%2C%0A%0AI%E2%80%99d%20like%20to%20book%20a%2030-minute%20intro%20call%20on%20Google%20Meet.%0A%0A---%20About%20my%20project%20---%0A%0A%F0%9F%92%A1%20What%20I%E2%80%99m%20building%3A%0A(describe%20your%20idea%20here)%0A%0A%F0%9F%8E%AF%20Main%20goals%20and%20features%3A%0A(what%20should%20the%20finished%20product%20do%3F)%0A%0A%F0%9F%93%85%20My%20availability%20(2%E2%80%933%20time%20slots%2C%20GMT%2B1)%3A%0A-%20Option%201%3A%20%0A-%20Option%202%3A%20%0A-%20Option%203%3A%20%0A%0ALooking%20forward%20to%20speaking%20with%20you.%0A%0ABest%2C%0A(your%20name)">Book a call</a>
    </div>
  </section>

  <section class="cs-index">
    <div class="wrap">
      <div class="index-head reveal">
        <h2>More work</h2>
      </div>
      <div class="index-grid">
        ${others.map((p, i) => `
          <a class="index-card reveal" style="--d:${i * .06}s" href="project.html?id=${p.id}">
            <div class="index-thumb">${p.poster
              ? `<img src="${esc(p.poster.top)}" alt="${esc(p.title)}" loading="lazy">`
              : longPage(p.id * 7, true)}</div>
            <div class="index-body">
              <span class="index-tag">${esc(p.tag)}</span>
              <h3>${esc(p.title)}</h3>
              <span class="index-meta">${esc(p.client)} · ${esc(p.year)}</span>
            </div>
          </a>`).join('')}
      </div>
      <a class="index-more reveal" href="index.html#work">
        See all projects <span aria-hidden="true">→</span>
      </a>
    </div>
  </section>
`;

/* ---------- clips run only while they are on screen ---------- */
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!still){
  const clipIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target;
      if(e.isIntersecting){ v.play().catch(() => {}); }
      else v.pause();
    });
  }, {threshold:.25});
  document.querySelectorAll('video.clip').forEach(v => clipIO.observe(v));
}

/* ---------- reveal + chrome ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:.12, rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

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
/* same guard for the pager and the "more work" index on this page */
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[href*="project.html?id="]');
  if(!a) return;
  const id = new URL(a.getAttribute('href'), location.href).searchParams.get('id');
  if(id){ try { sessionStorage.setItem('lastProjectId', id); } catch(err){} }
}, true);

