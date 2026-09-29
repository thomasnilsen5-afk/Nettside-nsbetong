// Genererer favicon.ico, apple-touch-icon.png og Open Graph-bilde fra SVG.
// Kjør: node scripts/lag-ikoner.mjs  (erstatt gjerne OG-bildet med et ekte prosjektbilde senere)
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const fav = await readFile('public/favicon.svg');
await sharp(fav).resize(180, 180).png().toFile('public/apple-touch-icon.png');
const png32 = await sharp(fav).resize(32, 32).png().toBuffer();
// Enkel ICO-container med én PNG (støttes av alle moderne nettlesere).
const hode = Buffer.alloc(22);
hode.writeUInt16LE(0, 0); hode.writeUInt16LE(1, 2); hode.writeUInt16LE(1, 4);
hode.writeUInt8(32, 6); hode.writeUInt8(32, 7); hode.writeUInt8(0, 8); hode.writeUInt8(0, 9);
hode.writeUInt16LE(1, 10); hode.writeUInt16LE(32, 12);
hode.writeUInt32LE(png32.length, 14); hode.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([hode, png32]));

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(25)"><rect width="3" height="28" fill="#ffffff" opacity="0.05"/></pattern></defs>
  <rect width="1200" height="630" fill="#232F36"/><rect width="1200" height="630" fill="url(#p)"/>
  <rect x="0" y="0" width="24" height="630" fill="#ED2224"/>
  <text x="90" y="200" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="84" fill="#fff">NILSEN &amp; STURE</text>
  <text x="90" y="290" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="84" fill="#fff">BETONG AS</text>
  <text x="90" y="380" font-family="Arial, sans-serif" font-size="46" fill="#C8D2D7">Din betongentreprenør i Bergen og omegn</text>
  <text x="90" y="470" font-family="Arial, sans-serif" font-weight="700" font-size="44" fill="#fff">Tlf 56 15 96 70 · nsbetong.no</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 82, mozjpeg: true }).toFile('public/img/og-nsbetong.jpg');
console.log('Ikoner og OG-bilde generert.');
