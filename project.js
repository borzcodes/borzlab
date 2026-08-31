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

/* ---------- which project ---------- */
const params   = new URLSearchParams(location.search);
const projects = window.PROJECTS || [];
const wanted   = Number(params.get('id'));
const project  = projects.find(p => p.id === wanted) || projects[0];
const idx      = projects.indexOf(project);
const prev     = projects[(idx - 1 + projects.length) % projects.length];
const next     = projects[(idx + 1) % projects.length];
const others   = projects.filter(p => p.id !== project.id).slice(0, 8);

document.title = `${project.title} — Mahmoud Hamidoun`;

const live = safeUrl(project.url);
const liveLink = live === '#'
  ? ''
  : `<a class="cs-live" href="${live}" target="_blank" rel="noopener">View live site <span aria-hidden="true">↗</span></a>`;

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
          <div class="reveal" style="--d:.15s">${liveLink}</div>
        </div>

        <dl class="cs-spec reveal" style="--d:.2s">
          <div><dt>Client</dt><dd>${esc(project.client)}</dd></div>
          <div><dt>Year</dt><dd>${esc(project.year)}</dd></div>
          <div><dt>Scope</dt><dd>${esc(project.scope)}</dd></div>
          <div><dt>Role</dt><dd>Design &amp; build, end to end</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <figure class="cs-cover reveal">
    ${visual(project.cover, project.title + ' — full view')}
  </figure>

  <section class="cs-chapters">
    <div class="wrap">
      ${project.sections.map((s, i) => `
        <article class="chapter">
          <div class="chapter-aside">
            <span class="chapter-num reveal">${String(i + 1).padStart(2, '0')}</span>
            <h2 class="reveal" style="--d:.05s">${esc(s.title)}</h2>
          </div>
          <div class="chapter-main">
            <p class="reveal">${esc(s.text)}</p>
            <div class="chapter-shot reveal" style="--d:.08s">${visual(s.image, s.title)}</div>
          </div>
        </article>`).join('')}
    </div>
  </section>

  <section class="cs-system">
    <div class="wrap">
      <h2 class="cs-system-title reveal">Design system</h2>
      <div class="sys-row reveal">
        <span class="sys-label">Typeface</span>
        <div class="sys-value">
          <span class="sys-face">${esc(project.typography)}</span>
          <span class="sys-note">Regular · Medium · Semibold</span>
        </div>
      </div>
      <div class="sys-row reveal" style="--d:.06s">
        <span class="sys-label">Palette</span>
        <div class="sys-value sys-palette">
          ${project.palette.map(hex => `
            <span class="sys-chip"><i style="background:${esc(hex)}"></i>${esc(hex)}</span>`).join('')}
        </div>
      </div>
      <div class="sys-row reveal" style="--d:.12s">
        <span class="sys-label">Build</span>
        <div class="sys-value"><span class="sys-note">Responsive across breakpoints · Accessible contrast · Optimised assets</span></div>
      </div>
    </div>
  </section>

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
        <a href="index.html#work" class="index-all">All projects →</a>
      </div>
      <ul class="index-list">
        ${others.map((p, i) => `
          <li class="reveal" style="--d:${(i % 4) * .04}s">
            <a href="project.html?id=${p.id}">
              <span class="index-num">${String(i + 1).padStart(2, '0')}</span>
              <span class="index-name">${esc(p.title)}</span>
              <span class="index-tag">${esc(p.tag)}</span>
              <span class="index-year">${esc(p.year)}</span>
              <span class="index-arrow" aria-hidden="true">→</span>
            </a>
          </li>`).join('')}
      </ul>
    </div>
  </section>
`;

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