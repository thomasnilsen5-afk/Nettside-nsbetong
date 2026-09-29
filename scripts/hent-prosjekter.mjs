// Henter prosjektsidene (/prosjekt/<slug>/) fra dagens nsbetong.no til innhold-gammel/prosjekter.json.
// Kjør: NODE_USE_ENV_PROXY=1 node scripts/hent-prosjekter.mjs
import { writeFile, mkdir } from 'node:fs/promises';
import { basename } from 'node:path';

const BASE = 'https://nsbetong.no';
const sm = await (await fetch(`${BASE}/prosjekt-sitemap.xml`)).text();
const urler = [...sm.matchAll(/<loc>([^<]+\/prosjekt\/[^<]+\/)<\/loc>/g)].map((m) => m[1]);
const dekod = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8211;/g, '–').replace(/&#8217;/g, '’').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const tekst = (h) => dekod(h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '\n')).split('\n').map((l) => l.trim()).filter((l) => l.length > 1);

await mkdir('innhold-gammel/prosjekter', { recursive: true });
const ut = [];
for (const url of urler) {
  const html = await (await fetch(url)).text();
  const start = html.search(/<main|elementor-location-single|<article/);
  const linjer = tekst(html.slice(start));
  const slutt = linjer.findIndex((l) => /^Facebook-f$|^Kontakt oss$/.test(l));
  const innhold = linjer.slice(0, slutt > 0 ? slutt : undefined);
  const bilder = [...new Set([...html.slice(start).matchAll(/(?:src|data-src|url\()["']?(https:\/\/nsbetong\.no\/wp-content\/uploads\/[^"')\s]+\.(?:jpe?g|png|webp))/gi)].map((m) => m[1].replace(/-\d+x\d+(?=\.\w+$)/, '')))];
  for (const b of bilder) {
    const r = await fetch(b);
    if (r.ok) await writeFile(`innhold-gammel/prosjekter/${basename(new URL(b).pathname)}`, Buffer.from(await r.arrayBuffer()));
  }
  ut.push({ url, slug: url.split('/').filter(Boolean).pop(), innhold, bilder: bilder.map((b) => basename(new URL(b).pathname)) });
  console.log('✓', url, innhold.length, 'linjer,', bilder.length, 'bilder');
}
await writeFile('innhold-gammel/prosjekter.json', JSON.stringify(ut, null, 2));
