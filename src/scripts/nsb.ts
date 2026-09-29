// Samtykke, lasting av GTM/GA4 og dataLayer-hendelser.
// Hendelser pushes alltid til dataLayer (lokalt i nettleseren). De sendes videre til Google
// bare hvis GTM/GA4 er lastet, og det skjer først etter samtykke.

type Konfig = { gtm: string; ga4: string; demo: boolean };
type Samtykke = { analyse: boolean; markedsforing: boolean; tid: string; versjon: number };

declare global {
  interface Window {
    NSB: Konfig;
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const NOKKEL = 'nsb_samtykke';
const VERSJON = 1;
const konfig: Konfig = window.NSB ?? { gtm: '', ga4: '', demo: false };
const harSporing = Boolean(konfig.gtm || konfig.ga4);
let lastet = false;

function lesSamtykke(): Samtykke | null {
  try {
    const s = JSON.parse(localStorage.getItem(NOKKEL) || 'null');
    return s && s.versjon === VERSJON ? s : null;
  } catch {
    return null;
  }
}

function lagreSamtykke(analyse: boolean, markedsforing: boolean) {
  const s: Samtykke = { analyse, markedsforing, tid: new Date().toISOString(), versjon: VERSJON };
  try {
    localStorage.setItem(NOKKEL, JSON.stringify(s));
  } catch {
    /* privat modus o.l. – samtykket gjelder da bare denne sidevisningen */
  }
  brukSamtykke(s);
  window.dataLayer.push({ event: 'consent_update', consent_analytics: analyse, consent_marketing: markedsforing });
}

function brukSamtykke(s: Samtykke) {
  window.gtag('consent', 'update', {
    analytics_storage: s.analyse ? 'granted' : 'denied',
    ad_storage: s.markedsforing ? 'granted' : 'denied',
    ad_user_data: s.markedsforing ? 'granted' : 'denied',
    ad_personalization: s.markedsforing ? 'granted' : 'denied',
  });
  if (s.analyse || s.markedsforing) lastSporing();
}

function lastSkript(src: string) {
  const el = document.createElement('script');
  el.async = true;
  el.src = src;
  document.head.appendChild(el);
}

// Basic Consent Mode: Google-skript lastes først etter samtykke.
function lastSporing() {
  if (lastet || !harSporing) return;
  lastet = true;
  if (konfig.gtm) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    lastSkript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(konfig.gtm)}`);
  } else if (konfig.ga4) {
    window.gtag('js', new Date());
    window.gtag('config', konfig.ga4);
    lastSkript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(konfig.ga4)}`);
  }
}

/** Push en hendelse til dataLayer (og til gtag når GA4 brukes direkte uten GTM). */
export function spor(hendelse: string, data: Record<string, unknown> = {}) {
  const parametre = { page_path: location.pathname, ...data };
  window.dataLayer.push({ event: hendelse, ...parametre });
  if (!konfig.gtm && konfig.ga4 && lastet) window.gtag('event', hendelse, parametre);
}

// ---------- Samtykkebanner ----------
function settOppBanner() {
  const banner = document.querySelector<HTMLElement>('[data-samtykke]');
  const apneKnapper = document.querySelectorAll<HTMLElement>('[data-apne-samtykke]');
  if (!banner || !harSporing) return;
  const detaljer = banner.querySelector<HTMLFormElement>('[data-samtykke-detaljer]')!;
  const lagre = banner.querySelector<HTMLElement>('[data-samtykke-lagre]')!;
  const tilpass = banner.querySelector<HTMLElement>('[data-samtykke-tilpass]')!;

  const vis = () => {
    const s = lesSamtykke();
    (detaljer.elements.namedItem('analyse') as HTMLInputElement).checked = !!s?.analyse;
    (detaljer.elements.namedItem('markedsforing') as HTMLInputElement).checked = !!s?.markedsforing;
    banner.hidden = false;
    banner.querySelector<HTMLElement>('[data-samtykke-godta]')?.focus();
  };
  const skjul = () => (banner.hidden = true);

  banner.querySelector('[data-samtykke-godta]')?.addEventListener('click', () => {
    lagreSamtykke(true, true);
    skjul();
  });
  banner.querySelector('[data-samtykke-avvis]')?.addEventListener('click', () => {
    lagreSamtykke(false, false);
    skjul();
  });
  tilpass.addEventListener('click', () => {
    detaljer.hidden = false;
    lagre.hidden = false;
    tilpass.hidden = true;
  });
  lagre.addEventListener('click', () => {
    const a = (detaljer.elements.namedItem('analyse') as HTMLInputElement).checked;
    const m = (detaljer.elements.namedItem('markedsforing') as HTMLInputElement).checked;
    lagreSamtykke(a, m);
    skjul();
  });
  apneKnapper.forEach((k) => {
    k.hidden = false;
    k.addEventListener('click', vis);
  });

  const s = lesSamtykke();
  if (s) brukSamtykke(s);
  else vis();
}

// ---------- Klikksporing ----------
function settOppKlikk() {
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a, button');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const cta = a.getAttribute('data-cta');
      const tekst = (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
      const plassering = cta || 'lenke';

      if (href.startsWith('tel:')) spor('click_phone', { link_url: href, placement: plassering, link_text: tekst });
      else if (href.startsWith('mailto:')) spor('click_email', { link_url: href, placement: plassering, link_text: tekst });
      else if (/facebook\.com/i.test(href)) spor('click_facebook', { link_url: href, placement: plassering });

      if (cta) spor('cta_click', { cta_name: cta, cta_text: tekst, link_url: href || undefined });
    },
    { capture: true },
  );
}

// ---------- Kontaktskjema ----------
function settOppSkjema() {
  const skjema = document.querySelector<HTMLFormElement>('[data-kontaktskjema]');
  if (!skjema) return;
  const tid = skjema.querySelector<HTMLInputElement>('[data-skjema-tid]');
  if (tid) tid.value = String(Date.now());
  const params = new URLSearchParams(location.search);
  const valgt = params.get('tjeneste');
  if (valgt) {
    const opt = skjema.querySelector<HTMLOptionElement>(`option[data-slug="${CSS.escape(valgt)}"]`);
    if (opt) opt.selected = true;
  }
  if (params.has('feil')) {
    const feil = skjema.querySelector<HTMLElement>('[data-skjema-feil]');
    if (feil) feil.hidden = false;
    spor('form_error', { form_name: 'kontakt', error: params.get('feil') || 'ukjent' });
  }
  let startet = false;
  skjema.addEventListener('input', () => {
    if (startet) return;
    startet = true;
    spor('form_start', { form_name: 'kontakt' });
  });
  skjema.addEventListener('submit', () => {
    const knapp = skjema.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (knapp) {
      // Utsett deaktivering så nettleseren rekker å sende skjemaet.
      setTimeout(() => {
        knapp.disabled = true;
        knapp.textContent = 'Sender …';
      }, 0);
    }
  });
}

// ---------- Takkeside: konvertering ----------
function settOppTakk() {
  if (location.pathname !== '/takk/') return;
  const params = new URLSearchParams(location.search);
  if (params.get('ok') !== '1') return;
  spor('form_submit', { form_name: 'kontakt', service: params.get('tjeneste') || '(ikke valgt)' });
  // Fjern parameteret så en oppdatering av siden ikke teller dobbelt.
  history.replaceState(null, '', location.pathname);
}

settOppKlikk();
settOppSkjema();
settOppTakk();
settOppBanner();
