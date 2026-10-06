// Kontaktpersoner slik de står på dagens /kontakt-oss/ på nsbetong.no.
// Bildene er koblet på navn i samme rekkefølge som på dagens side. Brukt etter avklaring med oppdragsgiver.
import type { ImageMetadata } from 'astro';
import bjarte from '../assets/bilder/ansatte/bjarte-nilsen.jpg';
import jorgen from '../assets/bilder/ansatte/jorgen-sture.jpg';
import bard from '../assets/bilder/ansatte/bard-gaustad.jpg';
import mathis from '../assets/bilder/ansatte/mathis-nils-eira.jpg';
import torbjorn from '../assets/bilder/ansatte/torbjorn-nedreaas.jpg';
import birte from '../assets/bilder/ansatte/birte-steen.jpg';
import vitalij from '../assets/bilder/ansatte/vitalij-kovalenko.jpg';
import stian from '../assets/bilder/ansatte/stian-nilsen.jpg';
import martin from '../assets/bilder/ansatte/martin-dregelid.jpg';
import terje from '../assets/bilder/ansatte/terje-kartveit.jpg';
import kenneth from '../assets/bilder/ansatte/kenneth-johansen.jpg';
import daniel from '../assets/bilder/ansatte/daniel-kjerrgard.jpg';

export type Kontaktperson = { navn: string; telefon: string; epost: string; bilde: ImageMetadata };

export const kontaktpersoner: Kontaktperson[] = [
  { navn: 'Bjarte Nilsen', telefon: '930 21 923', epost: 'bjarte@nsbetong.no', bilde: bjarte },
  { navn: 'Jørgen Sture', telefon: '922 90 577', epost: 'jorgen@nsbetong.no', bilde: jorgen },
  { navn: 'Bård Gaustad', telefon: '926 85 295', epost: 'baard@nsbetong.no', bilde: bard },
  { navn: 'Mathis Nils Eira', telefon: '977 73 569', epost: 'mathis@nsbetong.no', bilde: mathis },
  { navn: 'Torbjørn Nedreaas', telefon: '930 34 667', epost: 'torbjorn@nsbetong.no', bilde: torbjorn },
  { navn: 'Birte Steen', telefon: '466 34 418', epost: 'birte@nsbetong.no', bilde: birte },
  { navn: 'Vitalij Kovalenko', telefon: '466 25 019', epost: 'vitalij@nsbetong.no', bilde: vitalij },
  { navn: 'Stian Nilsen', telefon: '926 00 602', epost: 'stian@nsbetong.no', bilde: stian },
  { navn: 'Martin Dregelid', telefon: '476 75 252', epost: 'martin@nsbetong.no', bilde: martin },
  { navn: 'Terje Kartveit', telefon: '902 66 991', epost: 'terje@nsbetong.no', bilde: terje },
  { navn: 'Kenneth Johansen', telefon: '926 58 866', epost: 'kenneth@nsbetong.no', bilde: kenneth },
  { navn: 'Daniel Kjerrgård', telefon: '412 12 687', epost: 'post@nsbetong.no', bilde: daniel },
];

export const telTilLenke = (nr: string) => `tel:+47${nr.replace(/\s/g, '')}`;
