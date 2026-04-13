/* Kalkema portfolio sectie — self-contained, mount op <section id="portfolio-mount"></section> */
(function () {
  const TOTAL = 50;
  const PREVIEW = 7;

  const css = `
    .portfolio{padding:6rem 4rem;background:var(--dark,#0F0F0F);border-top:1px solid var(--border,#2A2A26);position:relative;overflow:hidden;}
    .portfolio::before{content:'PORTFOLIO';position:absolute;right:-2rem;top:-2rem;font-family:var(--font-display,'Bebas Neue',sans-serif);font-size:14vw;color:transparent;-webkit-text-stroke:1px rgba(166,45,31,0.05);pointer-events:none;user-select:none;line-height:0.85;}
    .portfolio-header{max-width:1400px;margin:0 auto 3rem;position:relative;z-index:2;}
    .portfolio-label{font-family:var(--font-cond,'Barlow Condensed',sans-serif);font-size:0.72rem;font-weight:600;letter-spacing:0.35em;text-transform:uppercase;color:var(--orange,#A62D1F);margin-bottom:1rem;display:flex;align-items:center;gap:10px;}
    .portfolio-label::before{content:'';display:block;width:24px;height:1px;background:var(--orange,#A62D1F);}
    .portfolio-title{font-family:var(--font-display,'Bebas Neue',sans-serif);font-size:clamp(2.5rem,6vw,5rem);text-transform:uppercase;color:var(--cream,#EDE8DF);line-height:0.95;}
    .portfolio-title span{color:var(--orange,#A62D1F);}
    .portfolio-desc{font-size:0.95rem;line-height:1.7;color:var(--muted,#5A5750);max-width:520px;margin-top:1rem;}
    .portfolio-grid{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,minmax(0,1fr));gap:10px;position:relative;z-index:2;aspect-ratio:2/1;}
    .portfolio-item{overflow:hidden;cursor:pointer;background:var(--surface,#161616);position:relative;}
    .portfolio-item img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.16,1,0.3,1);display:block;}
    .portfolio-item::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.15);transition:background 0.3s;}
    .portfolio-item:hover img{transform:scale(1.06);}
    .portfolio-item:hover::after{background:rgba(166,45,31,0.25);}
    .portfolio-item.feature{grid-row:span 2;grid-column:span 2;}
    .portfolio-more{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;background:linear-gradient(135deg,var(--orange,#A62D1F) 0%,#7a1f15 100%);color:var(--cream,#EDE8DF);text-align:center;padding:1rem;cursor:pointer;transition:transform 0.3s;}
    .portfolio-more:hover{transform:scale(0.98);}
    .portfolio-more::after{display:none;}
    .portfolio-more-num{font-family:var(--font-display,'Bebas Neue',sans-serif);font-size:clamp(2rem,4vw,3.5rem);line-height:1;}
    .portfolio-more-label{font-family:var(--font-cond,'Barlow Condensed',sans-serif);font-size:0.7rem;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;}
    .portfolio-more-arrow{font-family:var(--font-display,'Bebas Neue',sans-serif);font-size:1.5rem;line-height:1;margin-top:0.25rem;}
    @media(max-width:1024px){.portfolio-grid{grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,minmax(0,1fr));aspect-ratio:1/1;}.portfolio-item.feature{grid-row:span 2;grid-column:span 2;}}
    @media(max-width:640px){.portfolio{padding:4rem 1.25rem;}.portfolio-grid{grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(4,minmax(0,1fr));gap:6px;aspect-ratio:1/2;}.portfolio-item.feature{grid-row:span 2;grid-column:span 2;}}

    .pf-lightbox{position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:10000;display:none;align-items:center;justify-content:center;padding:2rem;}
    .pf-lightbox.active{display:flex;}
    .pf-lightbox img{max-width:95vw;max-height:90vh;object-fit:contain;}
    .pf-lb-close,.pf-lb-prev,.pf-lb-next{position:absolute;background:rgba(166,45,31,0.85);color:var(--cream,#EDE8DF);border:none;width:48px;height:48px;font-size:1.5rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;font-family:var(--font-cond,'Barlow Condensed',sans-serif);}
    .pf-lb-close:hover,.pf-lb-prev:hover,.pf-lb-next:hover{background:var(--orange,#A62D1F);}
    .pf-lb-close{top:1.5rem;right:1.5rem;}
    .pf-lb-prev{left:1.5rem;top:50%;transform:translateY(-50%);}
    .pf-lb-next{right:1.5rem;top:50%;transform:translateY(-50%);}
    .pf-lb-counter{position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);font-family:var(--font-cond,'Barlow Condensed',sans-serif);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted,#5A5750);}
  `;

  function basePath() {
    const scripts = document.querySelectorAll('script[src*="portfolio.js"]');
    if (scripts.length) {
      return scripts[scripts.length - 1].src.replace('portfolio.js', '');
    }
    return '';
  }

  function mount(target) {
    const base = basePath();
    target.classList.add('portfolio');
    target.id = target.id || 'portfolio';
    target.innerHTML = `
      <div class="portfolio-header">
        <div class="portfolio-label">Ons werk in beeld</div>
        <h2 class="portfolio-title">Portfolio &amp; <span>projecten</span></h2>
        <p class="portfolio-desc">Een selectie van uitgevoerde opdrachten — van bestrating en grondwerk tot machine-inzet bij particulieren en bedrijven in Lelystad en omgeving.</p>
      </div>
      <div class="portfolio-grid"></div>
    `;

    const grid = target.querySelector('.portfolio-grid');
    const imgs = [];
    for (let i = 1; i <= TOTAL; i++) {
      const n = String(i).padStart(2, '0');
      imgs.push(`${base}portfolio/portfolio-${n}.jpeg`);
    }
    for (let i = 0; i < PREVIEW; i++) {
      const item = document.createElement('div');
      item.className = 'portfolio-item' + (i === 0 ? ' feature' : '');
      item.innerHTML = `<img src="${imgs[i]}" alt="Project ${i + 1} — Kalkema Dienstverlening" loading="lazy" />`;
      item.addEventListener('click', () => openLB(i));
      grid.appendChild(item);
    }
    const more = document.createElement('div');
    more.className = 'portfolio-item portfolio-more';
    more.innerHTML = `<div class="portfolio-more-num">+${TOTAL - PREVIEW}</div><div class="portfolio-more-label">Bekijk alle projecten</div><div class="portfolio-more-arrow">→</div>`;
    more.addEventListener('click', () => openLB(0));
    grid.appendChild(more);

    const lb = document.createElement('div');
    lb.className = 'pf-lightbox';
    lb.innerHTML = `
      <button class="pf-lb-close" aria-label="Sluiten">×</button>
      <button class="pf-lb-prev" aria-label="Vorige">‹</button>
      <img alt="" />
      <button class="pf-lb-next" aria-label="Volgende">›</button>
      <div class="pf-lb-counter"></div>
    `;
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('img');
    const lbCounter = lb.querySelector('.pf-lb-counter');
    let idx = 0;
    function openLB(i) { idx = i; lbImg.src = imgs[i]; lbCounter.textContent = `${i + 1} / ${TOTAL}`; lb.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeLB() { lb.classList.remove('active'); document.body.style.overflow = ''; }
    function next() { idx = (idx + 1) % TOTAL; lbImg.src = imgs[idx]; lbCounter.textContent = `${idx + 1} / ${TOTAL}`; }
    function prev() { idx = (idx - 1 + TOTAL) % TOTAL; lbImg.src = imgs[idx]; lbCounter.textContent = `${idx + 1} / ${TOTAL}`; }

    lb.querySelector('.pf-lb-close').addEventListener('click', closeLB);
    lb.querySelector('.pf-lb-next').addEventListener('click', next);
    lb.querySelector('.pf-lb-prev').addEventListener('click', prev);
    lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  document.addEventListener('DOMContentLoaded', function () {
    const target = document.getElementById('portfolio-mount');
    if (target) mount(target);
  });
})();
