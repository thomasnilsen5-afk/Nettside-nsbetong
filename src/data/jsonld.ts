import { firma } from './site';

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
  image: `${firma.url}/img/og-nsbetong.jpg`,
  ...(firma.logoTilgjengelig ? { logo: `${firma.url}${firma.logo}` } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: firma.adresse.gate,
    postalCode: firma.adresse.postnr,
    addressLocality: firma.adresse.sted,
    addressRegion: firma.adresse.region,
    addressCountry: firma.adresse.land,
  },
  areaServed: [
    { '@type': 'City', name: 'Bergen' },
    { '@type': 'AdministrativeArea', name: 'Vestland' },
  ],
  sameAs: [firma.facebook],
  knowsAbout: ['Betongarbeid', 'Gulvstøp', 'Flytavretting', 'Kantstøp', 'Profilstøp', 'Nybygg', 'Flislegging', 'Murarbeid', 'Våtrom'],
};
