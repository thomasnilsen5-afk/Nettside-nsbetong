import { firma } from './site';

// Områder bedriften selv oppgir på dagens nettside.
export const omraaderLd = [
  ...firma.omraader.map((name) => ({ '@type': name === 'Bergen' ? 'City' : 'AdministrativeArea', name })),
  { '@type': 'AdministrativeArea', name: 'Vestland' },
];

// GeneralContractor (undertype av LocalBusiness). NAP må være identisk med Google-bedriftsprofilen.
export const organisasjonLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${firma.url}/#firma`,
  name: firma.navn,
  alternateName: firma.kortnavn,
  slogan: firma.slagord,
  url: `${firma.url}/`,
  telephone: firma.telefonE164,
  email: firma.epost,
  foundingDate: String(firma.stiftet),
  taxID: firma.orgnr.replace(/\s/g, ''),
  ...(firma.logoTilgjengelig ? { logo: `${firma.url}${firma.logo}` } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: firma.adresse.gate,
    postalCode: firma.adresse.postnr,
    addressLocality: firma.adresse.sted,
    addressRegion: firma.adresse.region,
    addressCountry: firma.adresse.land,
  },
  areaServed: omraaderLd,
  sameAs: [firma.facebook],
  knowsAbout: ['Betongarbeid', 'Gulvstøp', 'Flytavretting', 'Kantstøp', 'Profilstøp', 'Nybygg', 'Flislegging', 'Murarbeid', 'Baderom'],
};
