// Serverless-funksjon for kontaktskjemaet (Vercel Function).
// Tar imot vanlig skjema-POST, validerer, stopper spam og sender e-post til KONTAKT_TIL.
// Svarer med 303-redirect: /takk/?ok=1 ved suksess, /kontakt-oss/?feil=<kode>#skjema ved feil.
import type { APIRoute } from 'astro';

export const prerender = false;

const env = (n: string) => (process.env[n] ?? '').trim();

// ---------- Enkel rate limiting ----------
// Minnebasert per funksjonsinstans: stopper enkle gjentatte innsendinger fra samme IP.
// Ikke delt mellom instanser – se README for Upstash/Vercel Firewall hvis det trengs mer.
const VINDU_MS = 10 * 60 * 1000;
const MAKS_PER_VINDU = 5;
const treff = new Map<string, number[]>();

function forMange(ip: string): boolean {
  const naa = Date.now();
  const liste = (treff.get(ip) ?? []).filter((t) => naa - t < VINDU_MS);
  liste.push(naa);
  treff.set(ip, liste);
  if (treff.size > 5000) treff.clear();
  return liste.length > MAKS_PER_VINDU;
}

const tilbake = (url: URL, sti: string) =>
  new Response(null, { status: 303, headers: { Location: new URL(sti, url).href, 'Cache-Control': 'no-store' } });

const renTekst = (v: FormDataEntryValue | null, maks: number) =>
  (typeof v === 'string' ? v : '').replace(/\r\n/g, '\n').trim().slice(0, maks);

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

type Henvendelse = {
  navn: string;
  telefon: string;
  epost: string;
  tjeneste: string;
  sted: string;
  melding: string;
  side: string;
};

function lagEpost(h: Henvendelse) {
  const emne = `Ny forespørsel fra nettsiden: ${h.tjeneste || 'Generell henvendelse'} – ${h.navn}`;
  const rader: [string, string][] = [
    ['Navn', h.navn],
    ['Telefon', h.telefon],
    ['E-post', h.epost || '(ikke oppgitt)'],
    ['Gjelder', h.tjeneste || '(ikke valgt)'],
    ['Sted', h.sted || '(ikke oppgitt)'],
    ['Sendt fra side', h.side],
  ];
  const tekst = rader.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMelding:\n${h.melding}\n`;
  const html =
    `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif">` +
    rader.map(([k, v]) => `<tr><th align="left">${escape(k)}</th><td>${escape(v)}</td></tr>`).join('') +
    `</table><p style="font-family:Arial,sans-serif;white-space:pre-wrap">${escape(h.melding)}</p>`;
  return { emne, tekst, html };
}

async function sendViaGraph(h: Henvendelse) {
  const tenant = env('MS_TENANT_ID');
  const klient = env('MS_CLIENT_ID');
  const hemmelig = env('MS_CLIENT_SECRET');
  const avsender = env('MS_AVSENDER') || 'post@nsbetong.no';
  const til = env('KONTAKT_TIL') || 'post@nsbetong.no';
  if (!tenant || !klient || !hemmelig) throw new Error('Graph ikke konfigurert');

  const tokenSvar = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenant)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: klient,
      client_secret: hemmelig,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });
  if (!tokenSvar.ok) throw new Error(`Graph token ${tokenSvar.status}`);
  const { access_token } = (await tokenSvar.json()) as { access_token: string };

  const { emne, html } = lagEpost(h);
  const svar = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(avsender)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: {
        subject: emne,
        body: { contentType: 'HTML', content: html },
        toRecipients: [{ emailAddress: { address: til } }],
        replyTo: h.epost ? [{ emailAddress: { address: h.epost, name: h.navn } }] : [],
      },
      saveToSentItems: false,
    }),
  });
  if (!svar.ok) throw new Error(`Graph sendMail ${svar.status}`);
}

async function sendViaResend(h: Henvendelse) {
  const nokkel = env('RESEND_API_KEY');
  if (!nokkel) throw new Error('Resend ikke konfigurert');
  const { emne, tekst, html } = lagEpost(h);
  const svar = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${nokkel}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env('RESEND_FRA') || 'Nettside <skjema@nsbetong.no>',
      to: [env('KONTAKT_TIL') || 'post@nsbetong.no'],
      reply_to: h.epost || undefined,
      subject: emne,
      text: tekst,
      html,
    }),
  });
  if (!svar.ok) throw new Error(`Resend ${svar.status}`);
}

export const POST: APIRoute = async ({ request, url, clientAddress }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return tilbake(url, '/kontakt-oss/?feil=format#skjema');
  }

  // 1) Honningkrukke: late som alt gikk bra, men ikke send noe.
  if (renTekst(data.get('nettside'), 200)) return tilbake(url, '/takk/');

  // 2) For rask innsending (under 3 sek etter sidelasting) tyder på robot. Mangler tid (uten JS) = godtas.
  const t = Number(renTekst(data.get('t'), 20));
  if (t && Date.now() - t < 3000) return tilbake(url, '/takk/');

  // 3) Rate limiting per IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'ukjent';
  if (forMange(ip)) return tilbake(url, '/kontakt-oss/?feil=grense#skjema');

  const h: Henvendelse = {
    navn: renTekst(data.get('navn'), 100),
    telefon: renTekst(data.get('telefon'), 30),
    epost: renTekst(data.get('epost'), 150),
    tjeneste: renTekst(data.get('tjeneste'), 60),
    sted: renTekst(data.get('sted'), 120),
    melding: renTekst(data.get('melding'), 4000),
    side: renTekst(data.get('side'), 200) || '(ukjent)',
  };

  // 4) Validering
  const gyldigTelefon = /^[+\d][\d\s-]{6,}$/.test(h.telefon);
  const gyldigEpost = !h.epost || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(h.epost);
  if (!h.navn || !gyldigTelefon || !gyldigEpost || h.melding.length < 5) {
    return tilbake(url, '/kontakt-oss/?feil=validering#skjema');
  }
  // Enkle spam-signaler: mange lenker i meldingen
  if ((h.melding.match(/https?:\/\//g) || []).length > 3) return tilbake(url, '/takk/');

  const takk = `/takk/?ok=1${h.tjeneste ? `&tjeneste=${encodeURIComponent(h.tjeneste)}` : ''}`;

  // Demo/testmodus: ingen e-post sendes.
  if (env('DEMO_MODUS') !== '0' || env('SKJEMA_TESTMODUS') === '1') {
    console.log('[kontakt] demo/testmodus – ingen e-post sendt', { tjeneste: h.tjeneste, side: h.side });
    return tilbake(url, takk);
  }

  try {
    if (env('EPOST_LEVERANDOR') === 'resend') await sendViaResend(h);
    else await sendViaGraph(h);
  } catch (feil) {
    console.error('[kontakt] sending feilet:', (feil as Error).message);
    return tilbake(url, '/kontakt-oss/?feil=sending#skjema');
  }
  return tilbake(url, takk);
};

export const GET: APIRoute = ({ url }) => tilbake(url, '/kontakt-oss/');
