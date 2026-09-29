// Bedriftsfakta. ALT som vises om firmaet hentes herfra – endre ett sted.
// NAP (navn, adresse, telefon) må være identisk med Google-bedriftsprofilen.

export const firma = {
  navn: 'Nilsen & Sture Betong AS',
  kortnavn: 'Nilsen & Sture Betong',
  slagord: 'Din betongentreprenør i Bergen og omegn',
  erfaring: 'over 20 års erfaring',
  url: 'https://nsbetong.no',
  telefon: '56 15 96 70',
  telefonE164: '+4756159670',
  epost: 'post@nsbetong.no',
  adresse: {
    gate: 'Storebotn 40',
    postnr: '5309',
    sted: 'Kleppestø',
    region: 'Vestland',
    land: 'NO',
  },
  orgnr: '[MANGLER: organisasjonsnummer]',
  facebook: 'https://www.facebook.com/Nilsen-Sture-Betong-AS-200900669937884',
  // Sett til true når /public/img/NS.svg (logoen fra dagens side) er lagt inn.
  logoTilgjengelig: false,
  logo: '/img/NS.svg',
  kundegrupper: ['private', 'næringsdrivende', 'kommunale og offentlige oppdragsgivere'],
  omraade: 'Bergen og omegn',
};

// Tillitsmerker slik de står på dagens side. Ikke legg til flere uten dokumentasjon.
export const tillitsmerker = [
  { navn: 'Godkjent lærebedrift', tekst: 'Vi tar inn og lærer opp lærlinger.' },
  { navn: 'Godkjent våtromsbedrift', tekst: 'Våtromsarbeid etter gjeldende krav.' },
  { navn: 'Ansvarsrett', tekst: 'Vi kan erklære ansvarsrett i byggesaker.' },
  { navn: 'Tariffavtale 2026', tekst: 'Ordnede lønns- og arbeidsvilkår.' },
  { navn: 'StartBANK', tekst: 'Registrert leverandør i StartBANK.' },
];

export type NavLenke = { tekst: string; href: string };

export const tjenesteLenker: NavLenke[] = [
  { tekst: 'Betongarbeid', href: '/betongarbeid/' },
  { tekst: 'Gulvstøp og flytavretting', href: '/gulvstop-og-flytavretting/' },
  { tekst: 'Vei og kantstøp', href: '/vei-og-kantstop/' },
  { tekst: 'Nybygg', href: '/nybygg/' },
  { tekst: 'Flis- og murarbeid', href: '/flis-og-murarbeid/' },
];

export const hovedmeny: NavLenke[] = [
  { tekst: 'Tjenester', href: '/#tjenester' },
  { tekst: 'Referanser', href: '/referanser/' },
  { tekst: 'Om oss', href: '/om-oss/' },
  { tekst: 'Ledige stillinger', href: '/ledige-stillinger/' },
  { tekst: 'Kontakt', href: '/kontakt-oss/' },
];

export const telLenke = `tel:${firma.telefonE164}`;
export const epostLenke = `mailto:${firma.epost}`;
export const kartLenke =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(`${firma.navn}, ${firma.adresse.gate}, ${firma.adresse.postnr} ${firma.adresse.sted}`);
