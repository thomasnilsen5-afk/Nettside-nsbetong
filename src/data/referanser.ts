// Referanseprosjekter. Fylles med innholdet fra dagens /referanser/ (se INNHOLDSKART.md).
// Ikke finn på prosjekter – bare det bedriften selv har publisert eller godkjent.
import type { ImageMetadata } from 'astro';

export type Referanse = {
  tittel: string;
  sted: string;
  tjeneste: string; // slug, f.eks. 'betongarbeid'
  tjenesteNavn: string;
  beskrivelse: string;
  bilde?: { src: ImageMetadata; alt: string };
};

export const referanser: Referanse[] = [];
