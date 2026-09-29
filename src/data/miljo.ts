// Byggetidsvariabler. Leses fra miljøet (Vercel → Settings → Environment Variables eller .env).
const les = (navn: string): string => (process.env[navn] ?? import.meta.env[navn] ?? '').toString().trim();

const gyldig = (verdi: string, monster: RegExp) => (monster.test(verdi) ? verdi : '');

export const miljo = {
  gtmId: gyldig(les('GTM_ID'), /^GTM-[A-Z0-9]+$/),
  ga4Id: gyldig(les('GA4_ID'), /^G-[A-Z0-9]+$/),
  gscVerifisering: les('GSC_VERIFICATION'),
  // DEMO: på som standard. Må eksplisitt settes til 0 når bedriften har godkjent og overtatt siden.
  demo: les('DEMO_MODUS') !== '0',
  // noindex i demo, eller når NOINDEX=1 (f.eks. preview-miljøer etter overtakelse).
  noindex: les('DEMO_MODUS') !== '0' || les('NOINDEX') === '1',
};
