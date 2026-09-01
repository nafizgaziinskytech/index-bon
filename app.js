document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   DATA — seven service categories, written in plain client-facing terms
   ============================================================ */
const SERVICES = [
  {
    id:'strategy', accent:'lime', title:'Brand Strategy',
    items:[
      'Brand Messaging & Positioning',
      'Brand Naming & Architecture',
      'Brand Audit & Assessment',
      'Brand Voice & Guidelines',
      'Growth Strategy Planning'
    ]
  },
  {
    id:'design', accent:'lime', title:'Design',
    items:[
      'Logo Design',
      'Brand Identity Design',
      'Brand Guideline Development',
      'Business Card & Collateral Design',
      'UI & UX Design',
      'Illustration Design',
      'Infographic & Presentation Design',
      'Social Media Design',
      'Video & Motion Design'
    ]
  },
  {
    id:'content', accent:'lime', title:'Content Creation',
    items:[
      'Blog Content Writing',
      'Website Copywriting',
      'Ecommerce Product & Ad Copywriting',
      'Case Study Writing',
      'Video Script Writing',
      'Ebook & Manual Writing'
    ]
  },
  {
    id:'ads', accent:'lime', title:'Paid Ads',
    items:[
      'Facebook Ads Management',
      'Google Ads Management',
      'LinkedIn Ads Management',
      'Display & Retargeting Ads'
    ]
  },
  {
    id:'social', accent:'lime', title:'Social Media Marketing',
    items:[
      'Social Media Management',
      'Social Media Strategy & Planning',
      'Social Media Content Development',
      'Community & Customer Support'
    ]
  },
  {
    id:'seo', accent:'lime', title:'Search Engine Optimization',
    items:[
      'Complete SEO Services',
      'Keyword Research',
      'SEO Audit',
      'Technical SEO',
      'On-Page SEO Fixing',
      'Ecommerce SEO'
    ]
  },
  {
    id:'email', accent:'lime', title:'Email Marketing',
    items:[
      'Email Marketing Campaigns',
      'Newsletter Management',
      'Email Marketing Consulting',
      'Klaviyo Management'
    ]
  },
  {
    id:'web', accent:'lime', title:'Web Development',
    items:[
      'Business Website Development',
      'Ecommerce Website Development',
      'WordPress Development',
      'Custom Web Applications',
      'Website Maintenance Services'
    ]
  },
  {
    id:'products', accent:'lime', title:'Digital Products & Applications',
    items:[
      'SaaS Product Development',
      'Admin & Analytics Dashboards',
      'API Development & Integrations',
      'Database & Backend Systems',
      'Product Maintenance & Scaling'
    ]
  },
  {
    id:'gbp', accent:'coral', title:'Google Business Profile',
    items:[
      'GBP Setup & Creation',
      'GBP Verification Support',
      'Suspension Recovery',
      'Local SEO & Map Ranking',
      'Review & Reputation Management',
      'GBP Content & Post Management'
    ]
  },
  {
    id:'research', accent:'lime', title:'Research & Analysis',
    items:[
      'Market & Competitor Research',
      'Audience & Customer Research',
      'Keyword & Niche Research',
      'Opportunity & Gap Analysis'
    ]
  }
];

const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;');
const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>`;

/* ============================================================
   RENDER — services showcase grid + marquee
   ============================================================ */
const servicesGrid = document.getElementById('servicesGrid');
servicesGrid.innerHTML = SERVICES.map(s => `
  <div class="service-card ${s.accent === 'coral' ? 'coral-card' : ''}" id="${s.id}">
    <h3>${esc(s.title)}</h3>
    <ul>
      ${s.items.map(i => `<li>${checkIcon}<span>${esc(i)}</span></li>`).join('')}
    </ul>
  </div>
`).join('');

const marqueeWords = ['Brand Strategy','Design','Content Creation','Paid Ads','Social Media Marketing','SEO','Email Marketing','Web Development','Digital Products','Google Business Profile','Research & Analysis'];
const marqueeHTML = marqueeWords.map(w => `<span>${esc(w)}</span>`).join('');
document.getElementById('marqueeTrack').innerHTML = marqueeHTML + marqueeHTML;

/* ============================================================
   MEGA MENU — header service dropdown
   ============================================================ */
const megaMenu = document.getElementById('megaMenu');
const serviceTrigger = document.getElementById('serviceTrigger');
let megaOpen = false;
let megaCloseTimer;

function openMega(){
  clearTimeout(megaCloseTimer);
  megaMenu.classList.add('open');
  megaMenu.setAttribute('aria-hidden', 'false');
  serviceTrigger.classList.add('open');
  serviceTrigger.setAttribute('aria-expanded', 'true');
  megaOpen = true;
}
function closeMega(){
  megaMenu.classList.remove('open');
  megaMenu.setAttribute('aria-hidden', 'true');
  serviceTrigger.classList.remove('open');
  serviceTrigger.setAttribute('aria-expanded', 'false');
  megaOpen = false;
}
function scheduleMegaClose(){
  megaCloseTimer = setTimeout(closeMega, 220);
}

serviceTrigger.addEventListener('click', (e) => {
  e.preventDefault();
  megaOpen ? closeMega() : openMega();
});
serviceTrigger.addEventListener('mouseenter', openMega);
serviceTrigger.addEventListener('mouseleave', scheduleMegaClose);
megaMenu.addEventListener('mouseenter', () => clearTimeout(megaCloseTimer));
megaMenu.addEventListener('mouseleave', scheduleMegaClose);

document.addEventListener('click', (e) => {
  if(megaOpen && !megaMenu.contains(e.target) && !serviceTrigger.contains(e.target)){
    closeMega();
  }
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeMega();
});

megaMenu.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if(!a) return;
  closeMega();
  if(a.dataset.target){
    e.preventDefault();
    const target = document.getElementById(a.dataset.target);
    if(target){
      setTimeout(() => {
        target.scrollIntoView({behavior:'smooth', block:'start'});
        target.classList.add('card-pulse');
        setTimeout(() => target.classList.remove('card-pulse'), 1100);
      }, 50);
    }
  }
});
/* ============================================================
   GBP SPOTLIGHT WIDGET — behaviour
   Plays only while the widget is on screen, replays on request,
   and shows a static end state if the visitor prefers reduced motion.
   ============================================================ */

(function () {
  function init() {
    var root = document.getElementById("gbpWidget");
    if (!root) return;

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var SEARCH_QUERY = "best business near me";

    var el = {
      searchbar: root.querySelector("#gbpSearchbar"),
      searchText: root.querySelector("#gbpSearchText"),
      mapTile: root.querySelector("#gbpMapTile"),
      comp1: root.querySelector("#gbpComp1"),
      comp2: root.querySelector("#gbpComp2"),
      you: root.querySelector("#gbpYou"),
      card: root.querySelector("#gbpCard"),
      results: root.querySelector("#gbpResults")
    };

    var TOP = "0px", MID = "71px", BOTTOM = "142px";
    var running = false, timers = [];

    function wait(ms) { return new Promise(function (r) { timers.push(setTimeout(r, ms)); }); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function resetState() {
      el.searchText.textContent = "";
      el.searchbar.classList.remove("active");
      el.mapTile.classList.remove("pinned");
      el.you.classList.remove("ranked", "lifted");
      el.comp1.style.top = TOP; el.comp2.style.top = MID; el.you.style.top = BOTTOM;
      el.results.classList.remove("show");
      el.card.classList.remove("show");
      root.classList.remove("card-open");
    }

    function typeText(str) {
      return new Promise(function (resolve) {
        var i = 0;
        el.searchbar.classList.add("active");
        (function step() {
          if (i <= str.length) { el.searchText.textContent = str.slice(0, i); i++; timers.push(setTimeout(step, 42)); }
          else resolve();
        })();
      });
    }

    async function runSequence() {
      if (reduceMotion) {
        el.searchText.textContent = SEARCH_QUERY;
        el.searchbar.classList.add("active");
        el.mapTile.classList.add("pinned");
        el.results.classList.add("show");
        el.you.style.top = TOP; el.comp1.style.top = MID; el.comp2.style.top = BOTTOM;
        el.you.classList.add("ranked");
        el.card.classList.add("show");
        root.classList.add("card-open");
        return;
      }

      resetState();
      await wait(500);
      await typeText(SEARCH_QUERY);
      await wait(250);
      el.mapTile.classList.add("pinned");
      await wait(550);

      // results only appear once the "search" has completed
      el.results.classList.add("show");
      await wait(650);

      // Your Business rises to #1
      el.you.classList.add("lifted");
      el.you.style.top = TOP; el.comp1.style.top = MID; el.comp2.style.top = BOTTOM;
      await wait(800);
      el.you.classList.remove("lifted");
      el.you.classList.add("ranked");
      await wait(650);

      // profile card pops out, directly over the phone
      el.card.classList.add("show");
      root.classList.add("card-open");
      await wait(4200);

      root.classList.remove("card-open");
      await wait(600);
      if (running) runSequence();
    }

    function start() { if (!running) { running = true; runSequence(); } }
    function stop() { running = false; clearTimers(); }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) start(); else stop(); });
      }, { threshold: 0.35 });
      io.observe(root);
    } else {
      start();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ============================================================
   PRICING — three tiers, monthly vs. project pricing
   ============================================================ */
const PRICING = [
  {
    id:'foundation', name:'Foundation',
    desc:'For businesses establishing their first real brand and web presence.',
    monthly:1800, project:3500,
    features:[
      'Brand discovery & positioning',
      'Logo & core identity system',
      'Up to 5-page website',
      'GBP creation & setup',
      'Foundational on-page SEO',
      'Monthly check-in call'
    ]
  },
  {
    id:'growth', name:'Growth', popular:true,
    desc:'For businesses ready to scale brand, web, and local presence together.',
    monthly:4200, project:9800,
    features:[
      'Everything in Foundation',
      'Full brand guidelines & collateral',
      'Content & social creative system',
      'Custom web application',
      'GBP optimization & local SEO',
      'Performance marketing campaigns',
      'Monthly reporting & strategy call'
    ]
  },
  {
    id:'scale', name:'Scale',
    desc:'For businesses running digital products alongside brand and growth.',
    monthly:8500, project:22000,
    features:[
      'Everything in Growth',
      'SaaS / digital product development',
      'Dashboards & admin systems',
      'Advanced local SEO & reputation management',
      'Dedicated account team',
      'Priority support',
      'Quarterly business reviews'
    ]
  }
];

const formatPrice = n => n.toLocaleString('en-US');

const pricingGrid = document.getElementById('pricingGrid');
pricingGrid.innerHTML = PRICING.map(tier => `
  <div class="price-card ${tier.popular ? 'popular' : ''}" data-id="${tier.id}">
    ${tier.popular ? '<span class="popular-badge">MOST POPULAR</span>' : ''}
    <div class="price-name">${esc(tier.name)}</div>
    <p class="price-desc">${esc(tier.desc)}</p>
    <div class="price-value-row">
      <span class="price-currency">$</span>
      <span class="price-value">${formatPrice(tier.monthly)}</span>
      <span class="price-suffix">/mo</span>
    </div>
    <ul class="feature-list">
      ${tier.features.map(f => `<li>${checkIcon}<span>${esc(f)}</span></li>`).join('')}
    </ul>
    <a href="#contact" class="price-cta" data-cursor="big">Start with ${esc(tier.name)} ↗</a>
  </div>
`).join('');

function paintPricing(mode){
  document.querySelectorAll('.price-card').forEach(card => {
    const tier = PRICING.find(t => t.id === card.dataset.id);
    if(!tier) return;
    const value = mode === 'monthly' ? tier.monthly : tier.project;
    const suffix = mode === 'monthly' ? '/mo' : 'one-time';
    const valueEl = card.querySelector('.price-value');
    const suffixEl = card.querySelector('.price-suffix');
    valueEl.textContent = formatPrice(value);
    suffixEl.textContent = suffix;
    valueEl.classList.remove('price-pop');
    void valueEl.offsetWidth;
    valueEl.classList.add('price-pop');
  });
}

const pricingToggle = document.getElementById('pricingToggle');
pricingToggle.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if(btn.classList.contains('active')) return;
    pricingToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.mode;
    pricingToggle.dataset.mode = mode;
    paintPricing(mode);
  });
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.1, rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach(el=>io.observe(el));

/* ============================================================
   HERO LOAD-IN
   ============================================================ */
requestAnimationFrame(()=>{
  setTimeout(()=>document.getElementById('hero').classList.add('loaded'), 120);
});

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
if(window.matchMedia('(pointer:fine)').matches){
  const cur = document.getElementById('cursor');
  let cx=0, cy=0, sx=0, sy=0;
  window.addEventListener('mousemove', e=>{
    cx=e.clientX; cy=e.clientY;
    cur.classList.add('show');
  });
  (function loop(){
    sx += (cx-sx)*0.22; sy += (cy-sy)*0.22;
    cur.style.left = sx+'px'; cur.style.top = sy+'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e=>{
    cur.classList.toggle('big', !!e.target.closest('[data-cursor="big"]'));
  });
  document.addEventListener('mouseleave', ()=>cur.classList.remove('show'));
}

/* ============================================================
   NAV: active link on scroll + mobile drawer
   ============================================================ */
const navLinks = document.querySelectorAll('nav.links a[data-nav]');
const navSections = Array.from(navLinks).map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const navIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = '#' + entry.target.id;
    const link = document.querySelector(`nav.links a[href="${id}"]`);
    if(!link) return;
    if(entry.isIntersecting){
      navLinks.forEach(l=>l.classList.remove('active'));
      link.classList.add('active');
    }
  });
},{rootMargin:'-45% 0px -50% 0px'});
navSections.forEach(s=>navIO.observe(s));

const toggle = document.getElementById('navToggle');
const drawer = document.getElementById('drawer');
toggle.addEventListener('click', ()=>{
  drawer.classList.toggle('open');
  toggle.textContent = drawer.classList.contains('open') ? 'CLOSE' : 'MENU';
});
drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
  drawer.classList.remove('open');
  toggle.textContent = 'MENU';
}));

/* ============================================================
   HEADER: hide on scroll down, reveal on scroll up
   ============================================================ */
const siteHeader = document.querySelector('header');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', ()=>{
  const currentScrollY = window.scrollY;
  if(megaOpen || drawer.classList.contains('open')){
    lastScrollY = currentScrollY;
    return;
  }
  if(currentScrollY > lastScrollY && currentScrollY > 120){
    siteHeader.classList.add('is-hidden');
  } else {
    siteHeader.classList.remove('is-hidden');
  }
  lastScrollY = currentScrollY;
}, {passive:true});

/* ============================================================
   LOGO SLIDER — CONFIG, RENDER, MOTION, BOOT
   ============================================================ */
const SLIDERS = [
  {
    trackId: "sliderTrack1",
    logos: [
      { src: "skylightgbl.png", url: "https://skylightgbl.com/", alt: "skylight-global" },
      { src: "rcm.png",         url: "https://skylightrcm.com/", alt: "skyligh-RCM" },
      { src: "codezzi.png",     url: "https://www.codezzi.com/", alt: "Codezzi" },
      { src: "sky-reva.png",    url: "https://skyreva.com/",     alt: "SkyReva" },
      { src: "markettor.png",   url: "https://marketorr.com", alt: "Marketor" },
      { src: "freight.png",     url: "https://www.skyfreightsquad.com/", alt: "SwiftFlow" },
    ],
  },
  {
    trackId: "sliderTrack2",
    logos: [
      { src: "jlp.png",         url: "https://janitorialleadspro.com/", alt: "janitorial-leads-pro" },
      { src: "acdc.png",        url: "https://allcityductcleaning.com/", alt: "All-City-Duct-Cleaning" },
    ],
  },
];

const escAttr = s => (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const MAX_REPEATS = 8;

function buildLogoHTML(logos){
  return logos.map(l => `
    <a class="logo-slide"
       href="${escAttr(l.url)}"
       target="${escAttr(l.target || "_blank")}"
       rel="${escAttr(l.rel || "noopener noreferrer")}"
       aria-label="${escAttr(l.alt || "")}">
      <img src="${escAttr(l.src)}" alt="${escAttr(l.alt || "")}" loading="lazy" draggable="false">
    </a>
  `).join("");
}

function renderSlider(track, logos, repeats = 1){
  const oneSetHTML = buildLogoHTML(logos).repeat(repeats);
  track.innerHTML = oneSetHTML + oneSetHTML;
}

function ensureFillsViewport(track, viewport, logos, done){
  let repeats = 1;
  renderSlider(track, logos, repeats);
  function check(){
    const setWidth = track.scrollWidth / 2;
    const viewportWidth = viewport.clientWidth;
    if (setWidth < viewportWidth && repeats < MAX_REPEATS) {
      repeats++;
      renderSlider(track, logos, repeats);
      requestAnimationFrame(check);
    } else {
      done();
    }
  }
  requestAnimationFrame(check);
}

function initMotion(track){
  const viewport = track.closest(".slider-viewport");
  const speedSeconds = parseFloat(track.dataset.speed) || 28;
  const reverse = track.dataset.direction === "reverse";
  const dirSign = reverse ? 1 : -1;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let halfWidth = 0;
  let pos = 0;
  let targetPos = 0;
  let isHovering = false;
  let isDragging = false;
  let dragMoved = false;
  let dragStartX = 0;
  let dragStartPos = 0;
  let lastTimestamp = null;

  let velocity = 0;
  let isCoasting = false;
  let lastMoveX = 0;
  let lastMoveTime = 0;
  const FRICTION = 0.94;
  const DRAG_SMOOTHING = 0.35;
  const MIN_COAST_VELOCITY = 12;

  function measure(){ halfWidth = track.scrollWidth / 2; }

  function wrap(p){
    if (!halfWidth) return 0;
    let m = p % halfWidth;
    if (m > 0) m -= halfWidth;
    return m;
  }

  function applyTransform(){ track.style.transform = `translateX(${pos}px)`; }

  function tick(timestamp){
    if (lastTimestamp === null) lastTimestamp = timestamp;
    const dt = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (isDragging) {
      pos = wrap(pos + (targetPos - pos) * DRAG_SMOOTHING);
      applyTransform();
    } else if (isCoasting) {
      const frameDecay = Math.pow(FRICTION, dt * 60);
      velocity *= frameDecay;
      if (Math.abs(velocity) < MIN_COAST_VELOCITY || reducedMotionQuery.matches) {
        isCoasting = false;
      } else {
        pos = wrap(pos + velocity * dt);
        applyTransform();
      }
    } else {
      const shouldAutoScroll = !isHovering && !reducedMotionQuery.matches;
      if (shouldAutoScroll && halfWidth) {
        const pxPerSecond = halfWidth / speedSeconds;
        pos = wrap(pos + dirSign * pxPerSecond * dt);
        applyTransform();
      }
    }
    requestAnimationFrame(tick);
  }

  function startDrag(clientX, timestamp){
    isDragging = true;
    isCoasting = false;
    dragMoved = false;
    dragStartX = clientX;
    dragStartPos = pos;
    targetPos = pos;
    velocity = 0;
    lastMoveX = clientX;
    lastMoveTime = timestamp;
    viewport.classList.add("is-dragging");
  }

  function moveDrag(clientX, timestamp){
    if (!isDragging) return;
    const delta = clientX - dragStartX;
    if (Math.abs(delta) > 4) dragMoved = true;
    targetPos = wrap(dragStartPos + delta);
    const dt = (timestamp - lastMoveTime) / 1000;
    if (dt > 0) {
      const instVelocity = (clientX - lastMoveX) / dt;
      velocity = velocity * 0.7 + instVelocity * 0.3;
    }
    lastMoveX = clientX;
    lastMoveTime = timestamp;
  }

  function endDrag(){
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove("is-dragging");
    pos = targetPos;
    applyTransform();
    if (Math.abs(velocity) >= MIN_COAST_VELOCITY) {
      isCoasting = true;
    }
  }

  viewport.addEventListener("pointerdown", (e) => {
    viewport.setPointerCapture(e.pointerId);
    startDrag(e.clientX, e.timeStamp);
  });
  viewport.addEventListener("pointermove", (e) => {
    if (isDragging) moveDrag(e.clientX, e.timeStamp);
  });
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);

  viewport.addEventListener("click", (e) => {
    if (dragMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  viewport.addEventListener("mouseenter", () => { isHovering = true; });
  viewport.addEventListener("mouseleave", () => { isHovering = false; });

  if (typeof ResizeObserver !== "undefined") {
    let rafId = null;
    const ro = new ResizeObserver(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const wasEmpty = !halfWidth;
        measure();
        if (!wasEmpty) pos = wrap(pos);
        if (isDragging) targetPos = wrap(targetPos);
      });
    });
    ro.observe(track);
  } else {
    window.addEventListener("resize", () => {
      const wasEmpty = !halfWidth;
      measure();
      if (!wasEmpty) pos = wrap(pos);
    });
  }

  const imgs = track.querySelectorAll("img");
  Promise.all(Array.from(imgs).map(img => img.complete
    ? Promise.resolve()
    : new Promise(resolve => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); })
  )).then(() => {
    const wasEmpty = !halfWidth;
    measure();
    if (!wasEmpty) pos = wrap(pos);
  });

  measure();
  applyTransform();
  requestAnimationFrame(tick);
}

SLIDERS.forEach(({ trackId, logos }) => {
  const track = document.getElementById(trackId);
  if (!track) return;
  const viewport = track.closest(".slider-viewport");
  ensureFillsViewport(track, viewport, logos, () => initMotion(track));
});
