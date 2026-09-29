// Klargjør bedriftens bilder for nettsiden.
// Legg originaler i bilder-inn/<side-slug>/ (f.eks. bilder-inn/betongarbeid/IMG_1234.jpg)
// og kjør: npm run bilder
// Resultat: src/assets/bilder/<side-slug>/<beskrivende-navn>.jpg, maks 2000 px bred, uten EXIF/GPS.
// Astro lager AVIF/WebP i flere størrelser automatisk ved bygg (<Picture>), med width/height satt.
// Filnavn: gi originalene beskrivende norske navn (f.eks. "gulvstop-garasje-bergen.jpg") – de gjenbrukes.
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';

const INN = 'bilder-inn';
const UT = 'src/assets/bilder';
const slugify = (s) => s.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let antall = 0;
for (const mappe of await readdir(INN, { withFileTypes: true }).catch(() => [])) {
  if (!mappe.isDirectory()) continue;
  await mkdir(join(UT, mappe.name), { recursive: true });
  for (const fil of await readdir(join(INN, mappe.name))) {
    if (!/\.(jpe?g|png|webp|tiff?|heic)$/i.test(fil)) continue;
    const navn = slugify(parse(fil).name);
    // PNG (tegninger, logoer med gjennomsiktighet) forblir PNG, alt annet blir JPEG.
    const erPng = /\.png$/i.test(fil);
    const ut = join(UT, mappe.name, `${navn}.${erPng ? 'png' : 'jpg'}`);
    const bilde = sharp(join(INN, mappe.name, fil)).rotate().resize({ width: 2000, withoutEnlargement: true });
    // rotate() + ingen withMetadata() = EXIF/GPS fjernes
    const info = await (erPng ? bilde.png({ compressionLevel: 9, palette: true }) : bilde.jpeg({ quality: 82, mozjpeg: true })).toFile(ut);
    console.log(`✓ ${ut} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
    antall++;
  }
}
console.log(antall ? `\n${antall} bilder klare. Legg dem inn i src/data/tjenester.ts eller referanser.ts med alt-tekst.` : `Fant ingen bilder i ${INN}/<side>/.`);
