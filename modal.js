/* ─── Kalkema Modal — shared across all pages ─────────────────── */
(function () {

  /* ── CSS ──────────────────────────────────────────────────────── */
  const css = `
    .km-overlay {
      position: fixed; inset: 0;
      z-index: 2000;
      display: flex; align-items: center; justify-content: center;
      padding: 1.5rem;
      background: rgba(7,7,7,0.82);
      backdrop-filter: blur(8px);
      opacity: 0; pointer-events: none;
      transition: opacity 0.35s ease;
    }
    .km-overlay.open {
      opacity: 1; pointer-events: all;
    }
    .km-modal {
      display: flex;
      width: 100%; max-width: 760px;
      max-height: 92vh;
      overflow: hidden;
      position: relative;
      clip-path: polygon(0 0, 100% 0, 100% 94%, 96% 100%, 0 100%);
      transform: translateY(30px) scale(0.98);
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
      box-shadow: 0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px #2A2A26;
    }
    .km-overlay.open .km-modal {
      transform: translateY(0) scale(1);
    }

    /* ── Left panel ── */
    .km-left {
      width: 220px;
      flex-shrink: 0;
      background: #E00A25;
      padding: 2.5rem 1.75rem;
      display: flex; flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    .km-left::before {
      content: 'K';
      position: absolute;
      right: -20px; bottom: -30px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 14rem;
      line-height: 1;
      color: rgba(0,0,0,0.12);
      pointer-events: none;
      user-select: none;
    }
    .km-left-logo {
      margin-bottom: 2rem;
    }
    .km-left-logo img {
      height: 70px;
      width: auto;
      filter: brightness(10);
    }
    .km-left-heading {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.2rem;
      line-height: 0.95;
      color: #070707;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .km-left-sub {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(7,7,7,0.55);
      margin-bottom: 2rem;
    }
    .km-trust {
      display: flex; flex-direction: column; gap: 0.85rem;
      margin-top: auto;
    }
    .km-trust-item {
      display: flex; align-items: center; gap: 10px;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: rgba(7,7,7,0.75);
    }
    .km-trust-dot {
      width: 6px; height: 6px;
      background: rgba(7,7,7,0.4);
      clip-path: polygon(50% 0%,100% 50%,50% 100%,0% 50%);
      flex-shrink: 0;
    }

    /* ── Right panel ── */
    .km-right {
      flex: 1;
      background: #161616;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      min-width: 0;
    }
    .km-right-header {
      padding: 1.75rem 2rem 1.25rem;
      border-bottom: 1px solid #2A2A26;
      display: flex; align-items: flex-start; justify-content: space-between;
      gap: 1rem;
      flex-shrink: 0;
    }
    .km-right-label {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.65rem; font-weight: 700;
      letter-spacing: 0.3em; text-transform: uppercase;
      color: #5A5750;
      margin-bottom: 0.3rem;
    }
    .km-right-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.9rem; line-height: 1;
      color: #EDE8DF;
      text-transform: uppercase;
    }
    .km-close {
      background: #1E1E1C;
      border: 1px solid #2A2A26;
      cursor: pointer;
      width: 34px; height: 34px;
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      color: #5A5750;
      clip-path: polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%);
      transition: color 0.2s, background 0.2s;
    }
    .km-close:hover { background: #2A2A26; color: #EDE8DF; }
    .km-form-body {
      padding: 1.75rem 2rem 2rem;
      flex: 1;
    }
    .km-form {
      display: flex; flex-direction: column; gap: 1rem;
    }
    .km-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;
    }
    .km-group {
      display: flex; flex-direction: column; gap: 5px;
    }
    .km-label {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.62rem; font-weight: 700;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: #5A5750;
    }
    .km-input, .km-select, .km-textarea {
      background: #1E1E1C;
      border: 1px solid #2A2A26;
      border-bottom: 2px solid #2A2A26;
      color: #EDE8DF;
      font-family: 'Barlow', sans-serif;
      font-size: 0.88rem;
      padding: 10px 13px;
      outline: none;
      transition: border-color 0.2s, background 0.2s;
      width: 100%;
    }
    .km-input::placeholder, .km-textarea::placeholder { color: #3A3A36; }
    .km-input:focus, .km-select:focus, .km-textarea:focus {
      border-color: #2A2A26;
      border-bottom-color: #E00A25;
      background: #222220;
    }
    .km-textarea { resize: vertical; min-height: 90px; }
    .km-select option { background: #1E1E1C; }
    .km-form-footer {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem;
      margin-top: 0.5rem;
    }
    .km-note {
      font-size: 0.75rem; color: #5A5750; line-height: 1.55;
    }
    .km-submit {
      background: #E00A25;
      color: #070707;
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 12px 28px;
      clip-path: polygon(0 0, 100% 0, 100% 65%, 88% 100%, 0 100%);
      border: none; cursor: pointer;
      transition: background 0.2s, transform 0.15s;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .km-submit:hover { background: #EDE8DF; transform: translateY(-1px); }

    /* ── Success state ── */
    .km-success {
      display: none;
      flex-direction: column; align-items: center;
      justify-content: center;
      text-align: center;
      gap: 1.25rem;
      padding: 3.5rem 2rem;
      flex: 1;
    }
    .km-success.show { display: flex; }
    .km-success-icon {
      width: 60px; height: 60px;
      background: #E00A25;
      clip-path: polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%);
      display: flex; align-items: center; justify-content: center;
      color: #070707;
    }
    .km-success-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.4rem; line-height: 0.95;
      color: #EDE8DF; text-transform: uppercase;
    }
    .km-success-text {
      font-size: 0.88rem; color: #5A5750;
      max-width: 300px; line-height: 1.7;
    }
    .km-success-close {
      background: #E00A25; color: #070707;
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700; font-size: 0.8rem;
      letter-spacing: 0.2em; text-transform: uppercase;
      padding: 12px 28px;
      clip-path: polygon(0 0, 100% 0, 100% 65%, 88% 100%, 0 100%);
      border: none; cursor: pointer;
      transition: background 0.2s;
    }
    .km-success-close:hover { background: #EDE8DF; }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .km-left { display: none; }
      .km-modal { clip-path: polygon(0 0, 100% 0, 100% 97%, 94% 100%, 0 100%); }
      .km-row { grid-template-columns: 1fr; }
      .km-right-header { padding: 1.25rem 1.25rem 1rem; }
      .km-form-body { padding: 1.25rem; }
      .km-form-footer { flex-direction: column; align-items: flex-start; }
      .km-submit { width: 100%; text-align: center; }
    }
  `;

  /* ── HTML ─────────────────────────────────────────────────────── */
  const html = `
    <div class="km-overlay" id="kmOverlay" onclick="kmCloseOutside(event)">
      <div class="km-modal" role="dialog" aria-modal="true" aria-label="Offerte aanvragen">

        <!-- Left brand panel -->
        <div class="km-left">
          <div class="km-left-logo">
            <img src="${_modalLogoSrc()}" alt="Kalkema Dienstverlening" />
          </div>
          <div class="km-left-heading">Gratis<br/>Offerte</div>
          <div class="km-left-sub">Vrijblijvend advies</div>
          <div class="km-trust">
            <div class="km-trust-item"><div class="km-trust-dot"></div>Reactie binnen 24 uur</div>
            <div class="km-trust-item"><div class="km-trust-dot"></div>Geen verborgen kosten</div>
            <div class="km-trust-item"><div class="km-trust-dot"></div>Voor particulier &amp; bedrijf</div>
            <div class="km-trust-item"><div class="km-trust-dot"></div>Lelystad &amp; omgeving</div>
            <div class="km-trust-item"><div class="km-trust-dot"></div>5.0 ★ Google Reviews</div>
          </div>
        </div>

        <!-- Right form panel -->
        <div class="km-right">
          <div class="km-right-header">
            <div>
              <div class="km-right-label">Gratis &amp; vrijblijvend</div>
              <div class="km-right-title">Offerte Aanvragen</div>
            </div>
            <button class="km-close" onclick="kmClose()" aria-label="Sluiten">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="km-form-body">

            <!-- Form -->
            <form class="km-form" id="kmForm" onsubmit="kmSubmit(event)">
              <div class="km-row">
                <div class="km-group">
                  <label class="km-label">Voornaam *</label>
                  <input type="text" class="km-input" name="voornaam" placeholder="Jan" required />
                </div>
                <div class="km-group">
                  <label class="km-label">Achternaam *</label>
                  <input type="text" class="km-input" name="achternaam" placeholder="de Vries" required />
                </div>
              </div>
              <div class="km-row">
                <div class="km-group">
                  <label class="km-label">Telefoonnummer *</label>
                  <input type="tel" class="km-input" name="telefoon" placeholder="06 12 34 56 78" required />
                </div>
                <div class="km-group">
                  <label class="km-label">E-mailadres *</label>
                  <input type="email" class="km-input" name="email" placeholder="jan@example.nl" required />
                </div>
              </div>
              <div class="km-row">
                <div class="km-group">
                  <label class="km-label">Dienst</label>
                  <select class="km-select" name="dienst" id="kmDienst">
                    <option value="">Kies een dienst...</option>
                    <option value="grondwerk">Grondwerk</option>
                    <option value="machineverhuur">Machineverhuur</option>
                    <option value="straatwerk">Straatwerk</option>
                    <option value="tuinaanleg">Tuinaanleg</option>
                    <option value="rijbodems">Rijbodems &amp; Longeer</option>
                    <option value="anders">Anders / combinatie</option>
                  </select>
                </div>
                <div class="km-group">
                  <label class="km-label">Ik ben een</label>
                  <select class="km-select" name="klanttype">
                    <option value="">Selecteer...</option>
                    <option value="particulier">Particulier</option>
                    <option value="ondernemer">Ondernemer / ZZP</option>
                    <option value="aannemer">Aannemer / bouwbedrijf</option>
                    <option value="overig">Overig bedrijf</option>
                  </select>
                </div>
              </div>
              <div class="km-group">
                <label class="km-label">Omschrijving van het werk</label>
                <textarea class="km-textarea" name="omschrijving" placeholder="Beschrijf uw project: wat wilt u laten doen, op welke locatie en wat is de gewenste planning?"></textarea>
              </div>
              <div class="km-form-footer">
                <p class="km-note">Wij nemen binnen 24 uur contact op.<br/>Geen verplichtingen.</p>
                <button type="submit" class="km-submit">Verstuur Aanvraag</button>
              </div>
            </form>

            <!-- Success -->
            <div class="km-success" id="kmSuccess">
              <div class="km-success-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <div class="km-success-title">Aanvraag<br/>Verstuurd!</div>
              <p class="km-success-text">Bedankt! Wij nemen zo snel mogelijk — uiterlijk binnen 24 uur — contact met u op.</p>
              <button class="km-success-close" onclick="kmClose()">Sluiten</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  `;

  /* ── Helpers ──────────────────────────────────────────────────── */
  function _modalLogoSrc() {
    // Works whether page is at root or in a subdir
    const scripts = document.querySelectorAll('script[src*="modal.js"]');
    if (scripts.length) {
      const base = scripts[scripts.length - 1].src.replace('modal.js', '');
      return base + 'logo.png';
    }
    return 'logo.png';
  }

  /* ── EmailJS config ───────────────────────────────────────────── */
  const EMAILJS_PUBLIC_KEY = 'AkxqSSqEoUhyJYmHc';
  const EMAILJS_SERVICE_ID = 'service_9qqqrnv';
  const EMAILJS_TEMPLATE_ID = 'template_jxrth5z';

  (function loadEmailJS(){
    if (window.emailjs) { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = function(){ if (window.emailjs) window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); };
    document.head.appendChild(s);
  })();

  /* ── Shared sender ────────────────────────────────────────────── */
  window.kmSendEmail = function (params) {
    if (!window.emailjs) return Promise.reject(new Error('EmailJS niet geladen'));
    return window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
  };

  /* ── Inject ───────────────────────────────────────────────────── */
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', html);

    // Pre-select dienst based on current page
    const page = location.pathname.split('/').pop().replace('.html', '');
    const map = { grondwerk:'grondwerk', machineverhuur:'machineverhuur', straatwerk:'straatwerk', tuinaanleg:'tuinaanleg', rijbodems:'rijbodems' };
    if (map[page]) {
      const sel = document.getElementById('kmDienst');
      if (sel) sel.value = map[page];
    }
  });

  /* ── API ──────────────────────────────────────────────────────── */
  window.openModal = function () {
    const overlay = document.getElementById('kmOverlay');
    if (!overlay) return;
    // Reset form state
    const form = document.getElementById('kmForm');
    const success = document.getElementById('kmSuccess');
    if (form) { form.style.display = ''; form.reset(); }
    if (success) success.classList.remove('show');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.kmClose = function () {
    const overlay = document.getElementById('kmOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.kmCloseOutside = function (e) {
    if (e.target === document.getElementById('kmOverlay')) window.kmClose();
  };

  window.kmSubmit = function (e) {
    e.preventDefault();
    const form = document.getElementById('kmForm');
    const success = document.getElementById('kmSuccess');
    const submitBtn = form ? form.querySelector('.km-submit') : null;
    if (!form) return;

    const data = new FormData(form);
    const params = {
      voornaam: (data.get('voornaam') || '').trim(),
      achternaam: (data.get('achternaam') || '').trim(),
      telefoon: (data.get('telefoon') || '').trim(),
      email: (data.get('email') || '').trim(),
      dienst: data.get('dienst') || 'Niet opgegeven',
      klanttype: data.get('klanttype') || 'Niet opgegeven',
      bericht: (data.get('omschrijving') || '').trim() || '(geen omschrijving meegegeven)',
      pagina: location.pathname.split('/').pop() || 'index.html',
      datum: new Date().toLocaleString('nl-NL')
    };

    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Versturen...'; }

    window.kmSendEmail(params)
      .then(function(){
        form.style.display = 'none';
        if (success) success.classList.add('show');
      })
      .catch(function(err){
        console.error('EmailJS error:', err);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
        alert('Er ging iets mis bij het versturen. Bel ons op 06-36106356 of mail Kalkemadienstverlening@hotmail.com.');
      });
  };

  // ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.kmClose();
  });

  // Legacy compatibility: keep old function names working
  window.closeModalDirect = window.kmClose;
  window.submitModal = function () { window.kmSubmit({ preventDefault: function(){} }); };

})();
