// Enkel SEO-kontroll av ferdig bygg (kjør etter `npm run build`): node scripts/sjekk-bygg.mjs
// Sjekker title/description-lengde, én H1, canonical, alt-tekster, width/height og ordtall på tjenestesider.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';




const TJENESTER = ['/betongarbeid/', '/gulvstop-og-flytavretting/', '/vei-og-kantstop/', '/nybygg/', '/flis-og-murarbeid/'];

async function* html(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* html(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}
const txt = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const avkod = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

let feil = 0;
const titler = new Map();
const beskr = new Map();
for await (const fil of html('dist/client')) {
  const s = await readFile(fil, 'utf8');
  const sti = '/' + fil.replace(/^dist\/client\/?/, '').replace(/index\.html$/, '').replace(/\.html$/, '/');
  const t = avkod(s.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const d = avkod(s.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const h1 = (s.match(/<h1[\s>]/g) || []).length;
  const kanon = s.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const imgUtenAlt = (s.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
  const imgUtenMal = (s.match(/<img(?![^>]*\bwidth=)[^>]*>/g) || []).length;
  const main = s.match(/<main[\s\S]*<\/main>/)?.[0] ?? '';
  const ord = txt(main).split(' ').filter(Boolean).length;
  const lang = /<html lang="nb"/.test(s);
  const merknader = [];
  if (!t || t.length > 62) merknader.push(`title ${t.length} tegn`);
  if (!d || d.length > 158) merknader.push(`description ${d.length} tegn`);
  if (h1 !== 1) merknader.push(`${h1} H1`);
  if (!kanon) merknader.push('mangler canonical');
  if (!lang) merknader.push('mangler lang="nb"');
  if (imgUtenAlt) merknader.push(`${imgUtenAlt} img uten alt`);
  if (imgUtenMal) merknader.push(`${imgUtenMal} img uten width/height`);
  if (TJENESTER.includes(sti) && ord < 300) merknader.push(`bare ${ord} ord`);
  if (titler.has(t)) merknader.push(`duplisert title med ${titler.get(t)}`);
  if (beskr.has(d)) merknader.push(`duplisert description med ${beskr.get(d)}`);
  titler.set(t, sti); beskr.set(d, sti);
  feil += merknader.length;
  console.log(`${merknader.length ? '✗' : '✓'} ${sti.padEnd(30)} title ${String(t.length).padStart(2)} · desc ${String(d.length).padStart(3)} · ${ord} ord${merknader.length ? '  → ' + merknader.join(', ') : ''}`);
}
console.log(feil ? `\n${feil} avvik funnet.` : '\nIngen avvik.');
process.exit(feil ? 1 : 0);
