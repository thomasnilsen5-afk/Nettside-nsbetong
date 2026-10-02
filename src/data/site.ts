// Bedriftsfakta. ALT som vises om firmaet hentes herfra – endre ett sted.
// NAP (navn, adresse, telefon) må være identisk med Google-bedriftsprofilen.

export const firma = {
  navn: 'Nilsen & Sture Betong AS',
  kortnavn: 'Nilsen & Sture Betong',
  slagord: 'Din betongentreprenør i Bergen og omegn',
  erfaring: 'over 20 års erfaring',
  stiftet: 2004,
  ansatte: 'rundt 50 ansatte',
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
  orgnr: '986 481 729',
  fakturaEpost: 'nsbetong@faktura.poweroffice.net',
  facebook: 'https://www.facebook.com/Nilsen-Sture-Betong-AS-200900669937884',
  // Logoen er hentet fra dagens side (wp-content/uploads/2022/06/NS.svg), ikke tegnet på nytt.
  logoTilgjengelig: true,
  logo: '/img/NS.svg',
  kundegrupper: ['private', 'næringsdrivende', 'kommunale og offentlige oppdragsgivere'],
  omraade: 'Bergen og omegn',
  // Områder bedriften selv oppgir på dagens nettside (Askøy, Bergen, Øygarden, Vestland).
  omraader: ['Bergen', 'Askøy', 'Øygarden'],
  visjon:
    'Nilsen & Sture Betong skal være en ledende bedrift i Vestland innenfor bygg og anlegg, med trygge arbeidsplasser og ha en sunn økonomi.',
};

// Tillitsmerker slik de står på dagens side. Ikke legg til flere uten dokumentasjon.
import ansvarsrettLogo from '../assets/bilder/merker/godkjent-for-ansvarsrett.jpg';
import startbankLogo from '../assets/bilder/merker/startbank.png';
import tariffLogo from '../assets/bilder/merker/tariffavtale-fellesforbundet.png';
import type { ImageMetadata } from 'astro';

export type Tillitsmerke = { navn: string; tekst: string; logo?: ImageMetadata; logoAlt?: string };

export const tillitsmerker: Tillitsmerke[] = [
  {
    navn: 'Godkjent for ansvarsrett',
    tekst: 'Godkjent av Direktoratet for byggkvalitet.',
    logo: ansvarsrettLogo,
    logoAlt: 'Godkjent for ansvarsrett – Direktoratet for byggkvalitet',
  },
  { navn: 'StartBANK', tekst: 'Registrert leverandør i StartBANK.', logo: startbankLogo, logoAlt: 'StartBANK' },
  {
    navn: 'Tariffavtale',
    tekst: 'Tariffavtale gjennom Fellesforbundet.',
    logo: tariffLogo,
    logoAlt: 'Her har vi tariffavtale 2024–2026 – Fellesforbundet',
  },
  { navn: 'Godkjent lærebedrift', tekst: 'Vi utdanner morgendagens betongarbeidere.' },
  { navn: 'Godkjent våtromsbedrift', tekst: 'Bad og våtrom etter våtromsnormen.' },
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
