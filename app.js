/**
 * Weidlich Malermeister GmbH — Hauptanwendungslogik (v7.0 Bespoke Craft Edition)
 * Tradition seit 1921 • Bäckergasse 12a, Augsburg
 */

'use strict';

// === LENIS SMOOTH SCROLL ENGINE ===
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    smoothTouch: false, // WICHTIG: natives Touch auf Mobilgeräten
    autoResize: true,
  });

  // GSAP ScrollTrigger Kopplung
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Sanftes Ankerscrollen mit Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id && id !== '#') {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -75 });
        }
      }
    });
  });
}

// === MOTION-PRIMITIV 1: HERO KINETIC TYPOGRAPHY ===
function initKineticTypography() {
  if (typeof gsap === 'undefined' || typeof SplitType === 'undefined') return;

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const splitHero = new SplitType(heroTitle, { types: 'words,chars' });
    gsap.from(splitHero.chars, {
      opacity: 0,
      y: 50,
      rotateX: -25,
      stagger: 0.02,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.15,
    });
  }

  document.querySelectorAll('.section-title').forEach((el) => {
    const s = new SplitType(el, { types: 'lines' });
    gsap.from(s.lines, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// === MOTION-PRIMITIV 2: EDITORIAL TEXT-SCRUBBING (DIM-TO-REVEAL) ===
function initTextScrub() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  document.querySelectorAll('[data-text-scrub]').forEach((container) => {
    const text = container.textContent.trim();
    container.innerHTML = text
      .split(' ')
      .map((word) => `<span class="text-scrub-word">${word}</span> `)
      .join('');

    const words = container.querySelectorAll('.text-scrub-word');
    gsap.to(words, {
      opacity: 1.0,
      stagger: 0.04,
      scrollTrigger: {
        trigger: container,
        start: 'top 82%',
        end: 'bottom 45%',
        scrub: 0.6,
      },
    });
  });
}

// === MOTION-PRIMITIV 4: DYNAMIC STAT & RATING COUNTERS ===
function initCounters() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  document.querySelectorAll('.stat-counter').forEach((el) => {
    const target = parseFloat(el.dataset.target || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isDecimal = String(el.dataset.target || '').includes('.');
    const duration = parseFloat(el.dataset.duration || '2.0');

    gsap.fromTo(
      { val: 0 },
      { val: target },
      {
        duration: duration,
        ease: 'power2.out',
        onUpdate: function () {
          const current = this.targets()[0].val;
          const formatted = isDecimal
            ? current.toFixed(1).replace('.', ',')
            : Math.round(current).toLocaleString('de-DE');
          el.textContent = prefix + formatted + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// === MOTION-PRIMITIV 6: NATIVE CSS-3D PERSPECTIVE TILT ===
function init3DTilt() {
  if (typeof gsap === 'undefined') return;
  const isTouch = window.matchMedia('(hover: none)').matches;

  document.querySelectorAll('.card-3d').forEach((card) => {
    if (!isTouch) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / (rect.height / 2)) * 6; // max 6 Grad
        const rotateY = (x / (rect.width / 2)) * 6;

        gsap.to(card, {
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`,
          duration: 0.25,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    } else {
      gsap.fromTo(
        card,
        { transform: 'perspective(1000px) rotateX(4deg) translateY(16px)' },
        {
          transform: 'perspective(1000px) rotateX(0deg) translateY(0px)',
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });
}

// === MOTION-PRIMITIV 12: CONTINUOUS ROTATING SEAL / BADGE ===
function initRotatingBadge() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const seal = document.querySelector('[data-rotating-seal] .seal-svg');
  if (seal) {
    gsap.to(seal, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.0,
      },
    });
  }
}

// === SIGNATURE FEATURE: AUGSBURGER FARB- & TEXTUR-ATELIER MIT LICHTSIMULATOR ===
function initAtelierWorkbench() {
  const stage = document.getElementById('atelierPreview');
  if (!stage) return;

  const colorData = {
    kalk: {
      tag: 'Bio-Sumpfkalk',
      title: 'Altstadt-Kalk & Leinen',
      desc: 'Natürlich reiner Sumpfkalk mit feiner Haptik. Wirkt feuchtigkeitsregulierend, schimmelhemmend und verleiht historischen wie modernen Räumen eine sanfte, mineralische Tiefe.',
      specs: [
        '<strong>Diffusionsfähigkeit:</strong> Höchste Atmungsaktivität (sd-Wert < 0,01)',
        '<strong>Raumwirkung:</strong> Ruhig, lichtreflektierend & warmweiß',
        '<strong>Eignung:</strong> Wohnräume, Schlafgemächer & Denkmalschutz',
      ],
      inquiryText: 'Showroom-Farbberatung: Altstadt-Kalk & Leinen',
    },
    salbei: {
      tag: 'Silikat-Wandlasur',
      title: 'Maximilian-Salbei',
      desc: 'Hochwertige mineralische Silikatlasur mit feinsten Naturpigmenten. Schafft eine entspannende, organische Atmosphäre mit hervorragender Lichtechtheit und Langlebigkeit.',
      specs: [
        '<strong>Bindemittel:</strong> Kaliwasserglas mit natürlicher Verkieselung',
        '<strong>Raumwirkung:</strong> Erdend, frisch, unaufdringlich elegant',
        '<strong>Eignung:</strong> Arbeitszimmer, moderne Wohnlandschaften & Küchen',
      ],
      inquiryText: 'Showroom-Farbberatung: Maximilian-Salbei',
    },
    ocker: {
      tag: 'Mineralischer Edelputz',
      title: 'Fugger-Ocker & Sandstein',
      desc: 'Von historischen Augsburger Fassaden inspirierte Natur-Erdpigmente. Gibt Wänden spürbare Wärme und lebendige Struktur durch handwerklichen Feinputz.',
      specs: [
        '<strong>Körnung:</strong> 0,5 mm Marmorsand & rein mineralischer Ocker',
        '<strong>Raumwirkung:</strong> Kraftvoll, warm und behaglich',
        '<strong>Eignung:</strong> Dielen, Kaminzimmer, Akzentwände & Fassaden',
      ],
      inquiryText: 'Showroom-Farbberatung: Fugger-Ocker & Sandstein',
    },
    graphit: {
      tag: 'Seidenmatt-Lackierung',
      title: 'Modernes Graphit & Seide',
      desc: 'Tiefes Seidengraphit mit samtiger Reflexion. Perfekt für moderne Einbauten, Türen, Paneele oder Akzentflächen im Kontrast zu hellem Naturkalk.',
      specs: [
        '<strong>Oberfläche:</strong> Samtmatte Haptik, hoch abrieb- & scheuerfest',
        '<strong>Raumwirkung:</strong> Architektonisch präzise, edel & kontrastreich',
        '<strong>Eignung:</strong> Türen, Einbaumöbel, Sockel & Akzentzonen',
      ],
      inquiryText: 'Showroom-Farbberatung: Modernes Graphit & Seide',
    },
  };

  const infoTag = document.getElementById('infoMaterialTag');
  const infoTitle = document.getElementById('infoColorTitle');
  const infoDesc = document.getElementById('infoColorDesc');
  const infoSpecs = document.getElementById('infoSpecsList');
  const btnSelect = document.getElementById('btnSelectPalette');
  const customPaletteInput = document.getElementById('farbweltPraeferenz');

  // Palette Umschaltung
  const paletteTabs = document.querySelectorAll('.palette-tab');
  paletteTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const colorKey = tab.dataset.color;
      paletteTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      stage.dataset.activeColor = colorKey;

      const data = colorData[colorKey];
      if (data) {
        if (infoTag) infoTag.textContent = data.tag;
        if (infoTitle) infoTitle.textContent = data.title;
        if (infoDesc) infoDesc.textContent = data.desc;
        if (infoSpecs) {
          infoSpecs.innerHTML = data.specs.map((s) => `<li>${s}</li>`).join('');
        }
        if (customPaletteInput) {
          customPaletteInput.value = data.title;
        }
      }
    });
  });

  // Licht Simulator
  const lightButtons = document.querySelectorAll('.btn-light-sim');
  lightButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lightKey = btn.dataset.light;
      lightButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      stage.dataset.activeLight = lightKey;
    });
  });

  // Klick auf "Diese Farbwelt im Showroom anfragen"
  if (btnSelect) {
    btnSelect.addEventListener('click', () => {
      const activeColor = stage.dataset.activeColor;
      const data = colorData[activeColor];
      if (data && customPaletteInput) {
        customPaletteInput.value = data.title;
      }
    });
  }

  // Urlaubs-Renovierungs-Rechner Logik
  const calcRooms = document.getElementById('calcRooms');
  const calcSeason = document.getElementById('calcSeason');
  const resultText = document.getElementById('plannerResultText');
  const btnTakeover = document.getElementById('btnTakeoverVacation');

  function updateVacationCalculation() {
    if (!calcRooms || !calcSeason || !resultText) return;

    const rooms = calcRooms.value;
    const season = calcSeason.value;

    let leadTime = '3–4 Wochen';
    let duration = 'ca. 5–7 Werktage';

    if (rooms === '1-2') {
      leadTime = '2–3 Wochen';
      duration = 'ca. 3–4 Werktage';
    } else if (rooms === 'haus') {
      leadTime = '4–6 Wochen';
      duration = 'ca. 10–14 Werktage';
    }

    let seasonLabel = 'Ihrem nächsten Urlaub';
    if (season === 'fruehjahr') seasonLabel = 'Ihrem Oster-/Pfingsturlaub';
    else if (season === 'sommer') seasonLabel = 'Ihrem Sommerurlaub';
    else if (season === 'herbst') seasonLabel = 'Ihrem Herbsturlaub';

    resultText.innerHTML = `
      <strong>Empfohlener Planungsvorlauf: ${leadTime} für Farbkonzept &amp; Showroom-Bemusterung.</strong><br>
      Ablauf für ${seasonLabel}: Realisierungsdauer ${duration}. Wir übernehmen Schlüssel, Möbelrücken, dichte Staubschutz-Einhausung und die meisterhafte Endreinigung. Sie öffnen nach Ihrer Rückkehr einfach die Haustür und genießen Ihre neuen Räume.
    `;
  }

  calcRooms?.addEventListener('change', updateVacationCalculation);
  calcSeason?.addEventListener('change', updateVacationCalculation);

  btnTakeover?.addEventListener('click', () => {
    const radioUrlaub = document.querySelector('input[name="projektart"][value="Urlaubsservice-Renovierung"]');
    if (radioUrlaub) radioUrlaub.checked = true;

    const inputUmfang = document.getElementById('groesse');
    if (inputUmfang && calcRooms) {
      inputUmfang.value = calcRooms.options[calcRooms.selectedIndex].text;
    }
  });
}

// === TAGESZEIT-PERSONALISIERUNG ===
function initTimeGreeting() {
  const el = document.querySelector('[data-time-greeting]');
  if (!el) return;

  const h = new Date().getHours();
  let msg;
  if (h >= 5 && h < 12) {
    msg = 'Guten Morgen aus der Bäckergasse';
  } else if (h >= 12 && h < 18) {
    msg = 'Guten Tag aus Augsburg';
  } else {
    msg = 'Guten Abend';
  }

  el.textContent = msg;
}

// === MOBILE NAVIGATION & ROBUSTER ANKER-SCROLL ===
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  if (!hamburger || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    menu.removeAttribute('hidden');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const close = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('hidden', '');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  hamburger.addEventListener('click', () => {
    hamburger.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  closeBtn?.addEventListener('click', close);

  // Klick auf Nav-Link: Menü schließen und zuverlässig scrollen
  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      close();

      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          setTimeout(() => {
            if (lenis) {
              lenis.scrollTo(target, { offset: -70 });
            } else {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 60);
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
  });
}

// === MODAL MANAGEMENT (IMPRESSUM & DATENSCHUTZ) ===
function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modalOpen;
      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';

      const focusable = modal.querySelector('button, [href], input, select, textarea');
      if (focusable) focusable.focus();
    });
  });

  const closeAllModals = () => {
    document.querySelectorAll('.modal:not([hidden])').forEach((m) => {
      m.setAttribute('hidden', '');
      m.setAttribute('aria-hidden', 'true');
    });
    if (lenis) lenis.start();
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeAllModals);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

// === DSGVO CONSENT MANAGER (TWO-CLICK MAPS) ===
function initConsent() {
  const KEY = 'weidlich_consent_v1';
  const banner = document.getElementById('consentBanner');
  const mapsFrame = document.getElementById('googleMapsFrame');
  const mapsPlaceholder = document.getElementById('mapsPlaceholder');
  const stored = localStorage.getItem(KEY);

  function applyConsent(accepted) {
    if (accepted) {
      if (mapsFrame && mapsFrame.dataset.src) {
        mapsFrame.src = mapsFrame.dataset.src;
        delete mapsFrame.dataset.src;
      }
      if (mapsPlaceholder) {
        mapsPlaceholder.classList.add('hidden');
      }
    }
    if (banner) banner.hidden = true;
  }

  if (stored === 'accepted') {
    applyConsent(true);
  } else if (stored === 'rejected') {
    applyConsent(false);
  } else if (banner) {
    banner.hidden = false;
  }

  document.getElementById('consentAccept')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('consentReject')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'rejected');
    applyConsent(false);
  });

  document.getElementById('btnUnlockMap')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(KEY);
    if (banner) banner.hidden = false;
  });
}

// === ERLEBNIS-KONTAKTPUNKT (3-SCHRITTE ENGINE MIT FORMSPREE & FALLBACK) ===
function initExperienceContact() {
  const container = document.querySelector('[data-experience-contact]');
  const form = document.getElementById('contactForm');
  if (!container || !form) return;

  const fallback = document.getElementById('formFallback');
  const status = document.getElementById('formStatus');
  const badges = container.querySelectorAll('.step-badge');
  const panels = container.querySelectorAll('.step-panel');

  function goToStep(stepNum) {
    panels.forEach((p) => {
      const isTarget = p.id === `stepPanel${stepNum}`;
      p.hidden = !isTarget;
      p.classList.toggle('active', isTarget);
    });

    badges.forEach((b) => {
      const isActive = parseInt(b.dataset.step) === stepNum;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const activePanel = container.querySelector(`.step-panel#stepPanel${stepNum}`);
    if (activePanel) {
      const firstInput = activePanel.querySelector(
        'input:not([type="hidden"]), select, textarea, button'
      );
      if (firstInput) firstInput.focus();
    }
  }

  container.querySelectorAll('[data-goto-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.dataset.gotoStep);
      goToStep(targetStep);
    });
  });

  badges.forEach((b) => {
    b.addEventListener('click', () => {
      const step = parseInt(b.dataset.step);
      goToStep(step);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btnSubmitContact');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Meister-Anfrage wird übertragen…';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        if (status) {
          status.textContent =
            'Vielen Dank! Ihre Anfrage ist direkt bei Malermeister Tobias Weidlich eingegangen. Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag.';
          status.style.color = 'var(--sc-accent)';
        }
        form.reset();
        goToStep(1);
      } else if (res.status === 429) {
        if (fallback) fallback.style.display = 'block';
        form.style.display = 'none';
      } else {
        if (status) {
          status.textContent =
            'Übertragung fehlgeschlagen. Bitte rufen Sie uns direkt an: ' + (form.dataset.tel || '0821 517718');
        }
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Meister-Anfrage jetzt absenden →';
        }
      }
    } catch {
      if (fallback) fallback.style.display = 'block';
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Meister-Anfrage jetzt absenden →';
      }
    }
  });
}

// === HEADER SCROLL BEHAVIOR ===
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener(
    'scroll',
    () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    },
    { passive: true }
  );
}

// === LIVE-ALARM DEMO-TRACKER (v6.2 — "Meister schaut Demo an!") ===
function initDemoTracker() {
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.search.includes('preview=true')
  ) {
    return;
  }

  const startTime = Date.now();
  const company = 'Weidlich Malermeister GmbH (Augsburg)';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const deviceType = isMobile ? 'Smartphone (Mobil)' : 'Desktop-Computer';
  const referrer = document.referrer
    ? document.referrer.includes('whatsapp')
      ? 'WhatsApp Direktlink'
      : document.referrer
    : 'Direktaufruf';

  let pingSent = false;
  let exitSent = false;
  const clickedActions = new Set();

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      const type = el.getAttribute('data-track');
      if (type === 'whatsapp') clickedActions.add('WhatsApp-Direktchat');
      else if (type === 'angebot') clickedActions.add('Showroom-/Projektanfrage');
      else if (type === 'telefon') clickedActions.add('Telefonnummer');
      else if (type === 'rechner') clickedActions.add('Farb-Atelier / Rechner');
    });
  });

  async function sendAlert(stage) {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const durationText =
      elapsedSeconds < 60
        ? `${elapsedSeconds}s`
        : `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s`;

    let statusText = '⚡ Reingeschaut';
    let empfehlung = 'Follow-up Call vorbereiten. Auf die Augsburger Altstadt und den Showroom Bäckergasse 12a eingehen.';

    if (elapsedSeconds >= 45 || clickedActions.size > 0) {
      statusText = '🔥 HEISS! Hohes Interesse & Klicks!';
      empfehlung = 'SOFORTIGE AKTION: In 15–20 Minuten via WhatsApp nachhaken („Servus Herr Weidlich, ich habe gesehen, Sie prüfen den Entwurf gerade...“).';
    } else if (elapsedSeconds >= 20) {
      statusText = '👍 WARM! Hat die Seite aufmerksam betrachtet.';
      empfehlung = 'Follow-Up Call vorbereiten (Donnerstag 10:00 Uhr).';
    }

    const clickedList =
      clickedActions.size > 0 ? Array.from(clickedActions).join(', ') : 'Nur gescrollt';
    const message =
      `🔔 [NEXBOT LIVE-ALARM] Malermeister Weidlich schaut Demo an!\n\n` +
      `🏢 Firma: ${company}\n` +
      `📱 Gerät: ${deviceType}\n` +
      `🔗 Quelle: ${referrer}\n` +
      `⏱️ Verweildauer: ${durationText}\n` +
      `🎯 Klicks: ${clickedList}\n` +
      `📊 Status: ${statusText}\n\n` +
      `💡 Empfehlung für Raphael:\n${empfehlung}`;

    // 1. Telegram Push an Raphael (@Radar_Webdesign_Nexbot)
    try {
      /* Legacy Telegram Alert disabled in favor of nexbot-radar.js */
    } catch (_) {}

    // 2. E-Mail Alarm via Formspree
    try {
      fetch('https://formspree.io/f/xbjnqkyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          subject: `🔥 [LIVE-ALARM] ${company} (${durationText})`,
          message: message,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch (_) {}
  }

  setTimeout(() => {
    if (!pingSent) {
      pingSent = true;
      sendAlert('initial');
    }
  }, 5000);

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && !exitSent) {
      exitSent = true;
      sendAlert('exit');
    }
  });
}

// === INIT DOM CONTENT LOADED ===
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  // Immer aktiv (kein Motion-Overhead)
  initDemoTracker();
  initTimeGreeting();
  initConsent();
  initMobileNav();
  initModals();
  initHeader();
  initExperienceContact();
  initAtelierWorkbench();

  // Motion- & Interaktions-System (6 Primitiven aktiv)
  if (!prefersReducedMotion) {
    initKineticTypography(); // Primitiv 1: Perspective 3D Typo
    initTextScrub();         // Primitiv 2: Editorial Dim-to-Reveal
    initCounters();          // Primitiv 4: Dynamic Counters
    init3DTilt();            // Primitiv 6: Native CSS-3D Perspective Tilt
    initRotatingBadge();     // Primitiv 12: Continuous Rotating Seal
  }
});
