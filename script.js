/* =========================================================
   helpers
   ========================================================= */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(pointer: fine)').matches;

function escapeHTML(str){
  return String(str).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
}
function safeUrl(url){
  if(!url || url === '#') return '#';
  return /^(https?:|mailto:|tel:)/i.test(url) ? url : '#';
}
const clamp = (v,min,max) => Math.min(Math.max(v,min),max);

/* =========================================================
   scroll progress
   ========================================================= */
const progressBar = document.getElementById('progressBar');
function updateProgress(){
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
window.addEventListener('resize', updateProgress);
updateProgress();

/* =========================================================
   scroll reveal
   ========================================================= */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, {threshold:.12, rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* =========================================================
   3D tilt — cards follow the cursor
   ========================================================= */
function bindTilt(el, inner, max){
  if(REDUCED || !FINE) return;
  const target = inner || el;
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5;
    const py = (e.clientY - r.top) / r.height - .5;
    target.style.setProperty('--ty', (px * max).toFixed(2) + 'deg');
    target.style.setProperty('--tx', (-py * max).toFixed(2) + 'deg');
  });
  el.addEventListener('mouseleave', () => {
    target.style.setProperty('--ty','0deg');
    target.style.setProperty('--tx','0deg');
  });
}
document.querySelectorAll('[data-tilt]').forEach(el => {
  bindTilt(el, el.querySelector('.card-3d-inner'), 10);
});

/* =========================================================
   magnetic buttons (uses `translate`, so CSS hover transforms still apply)
   ========================================================= */
if(!REDUCED && FINE){
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * .25;
      const y = (e.clientY - r.top - r.height/2) * .35;
      el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    });
    el.addEventListener('mouseleave', () => { el.style.translate = '0px 0px'; });
  });
}

/* =========================================================
   generated blueprint art (deterministic per project)
   ========================================================= */
function seeded(seed){
  let s = seed % 2147483647; if(s <= 0) s += 2147483646;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}
function generateArt(seed, w = 400, h = 250, dark = false){
  const rand = seeded(seed * 131 + 17);
  const bg     = dark ? '#0d0d0f' : '#f5f5f7';
  const stroke = dark ? '#48484a' : '#c9c9ce';
  const accent = dark ? '#f5f5f7' : '#1d1d1f';
  let out = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  for(let x = 0; x < w; x += 26) out += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${stroke}" stroke-opacity=".3"/>`;
  for(let y = 0; y < h; y += 26) out += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${stroke}" stroke-opacity=".3"/>`;

  const shapes = 3 + Math.floor(rand() * 2);
  for(let i = 0; i < shapes; i++){
    const cx = 50 + rand() * (w - 100);
    const cy = 40 + rand() * (h - 80);
    const size = 38 + rand() * 76;
    if(rand() < .5){
      out += `<rect x="${(cx-size/2).toFixed(0)}" y="${(cy-size/2).toFixed(0)}" width="${size.toFixed(0)}" height="${(size*.72).toFixed(0)}" rx="8" fill="none" stroke="${stroke}"/>`;
    } else {
      out += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(size/2).toFixed(0)}" fill="none" stroke="${stroke}"/>`;
    }
  }
  const ax = 40 + rand() * (w - 120), ay = 40 + rand() * (h - 80);
  out += `<rect x="${ax.toFixed(0)}" y="${ay.toFixed(0)}" width="46" height="10" rx="5" fill="${accent}"/>`;
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${out}</svg>`;
}

/* =========================================================
   projects
   ========================================================= */
const projects = window.PROJECTS;

const FEATURED = 4;      // tiles
const RAIL_LEN = 99;     // the rail holds every remaining project
const featured = projects.slice(0, FEATURED);
const rest     = projects.slice(FEATURED, FEATURED + RAIL_LEN);

const tiles   = document.getElementById('workTiles');
const rail    = document.getElementById('workRail');

/* --- the four hero tiles --- */
tiles.innerHTML = featured.map((p, i) => {
  const dark  = i >= 2;                       // second row goes dark, Apple-style
  const title = escapeHTML(p.title);
  const art   = p.image
    ? `<img src="${escapeHTML(p.image)}" alt="${title} preview" loading="lazy">`
    : generateArt(p.id, 600, 340, dark);
  return `
    <a class="tile${dark ? ' dark' : ''} reveal" style="--d:${i * .07}s" href="project.html?id=${p.id}"
       aria-label="View the ${title} case study">
      <div class="tile-eyebrow">${escapeHTML(p.tag)}</div>
      <h3>${title}</h3>
      <p class="tile-sub">${escapeHTML(p.short)}</p>
      <div class="tile-actions">
        <span class="pill">Learn more</span>
        <span class="pill pill-ghost">Case study</span>
      </div>
      <div class="tile-art">${art}</div>
    </a>`;
}).join('');

/* --- the scrolling rail of everything else --- */
rail.innerHTML = rest.map(p => {
  const title = escapeHTML(p.title);
  const art   = p.image
    ? `<img src="${escapeHTML(p.image)}" alt="${title} preview" loading="lazy">`
    : generateArt(p.id, 400, 530, true);
  return `
    <a class="rail-card" href="project.html?id=${p.id}" aria-label="View the ${title} case study">
      ${art}
      <div class="rail-scrim"></div>
      <div class="rail-info">
        <div>
          <div class="rail-tag">${escapeHTML(p.tag)}</div>
          <div class="rail-name">${title}</div>
        </div>
        <span class="rail-btn">View</span>
      </div>
    </a>`;
}).join('');

/* --- rail dots: only create dots for cards that can actually be snapped to --- */
const railDots = document.getElementById('railDots');
if(railDots && rest.length){
  /* how many cards fit fully in the visible rail width? */
  function countVisible(){
    const cardW = rail.children[0]?.offsetWidth || 300;
    return Math.round(rail.clientWidth / cardW);
  }
  function buildDots(){
    railDots.innerHTML = '';
    const cards = Array.from(rail.children);
    if(!cards.length) return;
    const visible = countVisible();
    const dotCount = Math.max(1, cards.length - visible + 1); // last dot = last card fully visible
    for(let i = 0; i < dotCount; i++){
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'rail-dot';
      d.setAttribute('role','tab');
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      const idx = i;
      d.addEventListener('click', () => {
        const card = rail.children[idx];
        if(card) rail.scrollTo({left: card.offsetLeft - rail.offsetLeft, behavior:'smooth'});
      });
      railDots.appendChild(d);
    }
    syncDots();
  }

  function syncDots(){
    const cards = Array.from(rail.children);
    if(!cards.length || !railDots.children.length) return;
    const edge = rail.scrollLeft;
    let active = 0, best = Infinity;
    cards.forEach((c, i) => {
      const dist = Math.abs((c.offsetLeft - cards[0].offsetLeft) - edge);
      if(dist < best){ best = dist; active = i; }
    });
    /* clamp active to the number of dots we actually drew;
       also snap to the last dot when the rail is fully scrolled */
    const atEnd = Math.abs(rail.scrollLeft + rail.clientWidth - rail.scrollWidth) < 4;
    if(atEnd) active = railDots.children.length - 1;
    else active = Math.min(active, railDots.children.length - 1);
    Array.from(railDots.children).forEach((d, i) => {
      d.classList.toggle('on', i === active);
      d.setAttribute('aria-selected', String(i === active));
    });
  }

  rail.addEventListener('scroll', () => window.requestAnimationFrame(syncDots), {passive:true});
  window.addEventListener('resize', () => { buildDots(); });
  buildDots();
}

document.querySelectorAll('.tile, .rail-card, .faq-item').forEach(el => io.observe(el));

/* =========================================================
   nav — transparent at the top, glass once you scroll
   ========================================================= */
const header = document.querySelector('header');
function updateHeader(){
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateHeader, {passive:true});
updateHeader();

/* =========================================================
   hero video — hold still for reduced-motion visitors
   ========================================================= */
const heroVideo = document.getElementById('heroVideo');
if(heroVideo && REDUCED){
  heroVideo.removeAttribute('autoplay');
  heroVideo.pause();
}

/* =========================================================
   FAQ accordion (one open at a time)
   ========================================================= */
const faqList = document.getElementById('faqList');
if(faqList){
  const items = Array.from(faqList.querySelectorAll('.faq-item'));

  function closeItem(item){
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    item.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    panel.style.maxHeight = '';
  }
  function openItem(item){
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    item.classList.add('open');
    btn.setAttribute('aria-expanded','true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  items.forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(closeItem);
      if(!isOpen) openItem(item);
    });
  });

  // keep an open panel correctly sized if the text rewraps
  window.addEventListener('resize', () => {
    const open = faqList.querySelector('.faq-item.open .faq-a');
    if(open) open.style.maxHeight = open.scrollHeight + 'px';
  });
}

/* =========================================================
   toast + copy email
   ========================================================= */
let toastTimer = null;
function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    t.setAttribute('role','status');
    t.setAttribute('aria-live','polite');
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

const copyBtn = document.getElementById('ctaCopyBtn');
if(copyBtn){
  copyBtn.addEventListener('click', () => {
    const email = copyBtn.dataset.email;
    if(!navigator.clipboard || !email) return;
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied — ' + email);
      copyBtn.classList.add('copied');
      copyBtn.setAttribute('aria-label','Email copied');
      clearTimeout(copyBtn._t);
      copyBtn._t = setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.setAttribute('aria-label','Copy email address');
      }, 1800);
    }).catch(() => {});
  });
}

/* mailto fallback: some browsers have no mail app registered, so also copy */
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', () => {
    const email = decodeURIComponent(link.href.replace(/^mailto:/,'').split('?')[0]);
    if(navigator.clipboard && email){
      navigator.clipboard.writeText(email)
        .then(() => showToast('Email copied — ' + email))
        .catch(() => {});
    }
  });
});

/* =========================================================
   go
   ========================================================= */