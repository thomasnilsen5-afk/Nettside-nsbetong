// Genererer favicon.svg/.ico og apple-touch-icon.png fra bedriftens logo (public/img/NS.svg).
// Kjør: node scripts/lag-ikoner.mjs
// Open Graph-bilder lages automatisk ved bygg fra sidens prosjektbilde (se src/layouts/Base.astro).
import sharp from 'sharp';
import { readFile, writeFile, copyFile } from 'node:fs/promises';

const logo = await readFile('public/img/NS.svg');
await copyFile('public/img/NS.svg', 'public/favicon.svg');
await sharp(logo).resize(180, 180).flatten({ background: '#ffffff' }).png().toFile('public/apple-touch-icon.png');
const png32 = await sharp(logo).resize(32, 32).png().toBuffer();
// Enkel ICO-container med én PNG (støttes av alle moderne nettlesere).
const hode = Buffer.alloc(22);
hode.writeUInt16LE(0, 0); hode.writeUInt16LE(1, 2); hode.writeUInt16LE(1, 4);
hode.writeUInt8(32, 6); hode.writeUInt8(32, 7); hode.writeUInt8(0, 8); hode.writeUInt8(0, 9);
hode.writeUInt16LE(1, 10); hode.writeUInt16LE(32, 12);
hode.writeUInt32LE(png32.length, 14); hode.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([hode, png32]));
console.log('Favicons generert fra public/img/NS.svg.');
