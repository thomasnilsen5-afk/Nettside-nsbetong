// Kartlegger dagens nsbetong.no: henter tekst, metadata, lenker og bilder fra alle sidene,
// og laster ned logoen (NS.svg) og bildene fra wp-content/uploads.
// Kjør: npm run hent-gammel-side   →  resultat i innhold-gammel/ (ikke i Git) + public/img/NS.svg
// Krever nettverkstilgang til nsbetong.no. Ingen avhengigheter.
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const BASE = 'https://nsbetong.no';
const SIDER = ['/', '/referanser/', '/betongarbeid/', '/gulvstop-og-flytavretting/', '/vei-og-kantstop/', '/nybygg/',
  '/flis-og-murarbeid/', '/ledige-stillinger/', '/om-oss/', '/apenhetsloven/', '/kontakt-oss/'];
const UT = 'innhold-gammel';
const LOGO = `${BASE}/wp-content/uploads/2022/06/NS.svg`;

const dekod = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8211;/g, '–').replace(/&#8217;/g, '’')
  .replace(/&laquo;/g, '«').replace(/&raquo;/g, '»').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const ren = (s) => dekod(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

function tilMarkdown(html) {
  const kropp = html.replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/i, '').replace(/<footer[\s\S]*?<\/footer>/i, '');
  const ut = [];
  const re = /<(h[1-6]|p|li|figcaption|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(kropp))) {
    const t = ren(m[2]);
    if (!t) continue;
    const tag = m[1].toLowerCase();
    if (tag.startsWith('h')) ut.push(`${'#'.repeat(+tag[1])} ${t}`);
    else if (tag === 'li') ut.push(`- ${t}`);
    else ut.push(t);
  }
  return [...new Set(ut)].join('\n\n');
}

async function hent(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'nsbetong-kartlegging/1.0' }, redirect: 'manual' });
  return r;
}

await mkdir(join(UT, 'bilder'), { recursive: true });
await mkdir('public/img', { recursive: true });
const alleBilder = new Map();
const oversikt = [];

for (const sti of SIDER) {
  const r = await hent(BASE + sti);
  const status = r.status;
  if (status >= 300 && status < 400) { oversikt.push({ sti, status, redirect: r.headers.get('location') }); continue; }
  const html = await r.text();
  const tittel = ren(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const beskr = dekod(html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? '');
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((x) => ren(x[1]));
  const bilder = [...html.matchAll(/<img[^>]+>/gi)].map((x) => {
    const tag = x[0];
    const src = tag.match(/\s(?:data-)?src="([^"]+)"/)?.[1];
    const srcset = tag.match(/srcset="([^"]+)"/)?.[1];
    const storst = srcset ? srcset.split(',').map((s) => s.trim().split(/\s+/)).sort((a, b) => parseInt(b[1]) - parseInt(a[1]))[0][0] : src;
    return { src: storst || src, alt: dekod(tag.match(/alt="([^"]*)"/)?.[1] ?? '') };
  }).filter((b) => b.src && b.src.includes('/wp-content/uploads/'));
  // Bakgrunnsbilder fra Elementor
  for (const x of html.matchAll(/url\(["']?(https?:\/\/[^"')]+\/wp-content\/uploads\/[^"')]+)["']?\)/gi)) bilder.push({ src: x[1], alt: '(bakgrunnsbilde)' });
  bilder.forEach((b) => alleBilder.set(b.src.replace(/-\d+x\d+(?=\.\w+$)/, ''), b.alt));
  const lenker = [...new Set([...html.matchAll(/href="(https?:\/\/(?:www\.)?nsbetong\.no[^"#]*)"/gi)].map((x) => x[1]))];
  const tekst = tilMarkdown(html);
  const slug = sti === '/' ? 'forside' : sti.replace(/\//g, '');
  await writeFile(join(UT, `${slug}.md`),
    `# ${sti}\n\n- Title: ${tittel}\n- Description: ${beskr}\n- H1: ${h1.join(' | ')}\n\n## Tekst\n\n${tekst}\n\n## Bilder\n\n${bilder.map((b) => `- ${b.src} — alt: «${b.alt}»`).join('\n')}\n\n## Interne lenker\n\n${lenker.map((l) => `- ${l}`).join('\n')}\n`);
  oversikt.push({ sti, status, tittel, beskr, h1, ord: tekst.split(/\s+/).length, bilder: bilder.length });
  console.log(`✓ ${sti} (${status}) ${bilder.length} bilder`);
}

// Logo
const logo = await fetch(LOGO);
if (logo.ok) { await writeFile('public/img/NS.svg', Buffer.from(await logo.arrayBuffer())); console.log('✓ Logo lagret i public/img/NS.svg – sett logoTilgjengelig: true i src/data/site.ts'); }

// Bilder (originalstørrelse)
for (const [src] of alleBilder) {
  try {
    const r = await fetch(src);
    if (!r.ok) continue;
    await writeFile(join(UT, 'bilder', basename(new URL(src).pathname)), Buffer.from(await r.arrayBuffer()));
  } catch (e) { console.warn('Kunne ikke hente', src, e.message); }
}
await writeFile(join(UT, 'bilder.tsv'), 'url\talt\n' + [...alleBilder].map(([s, a]) => `${s}\t${a}`).join('\n'));

// Sitemap fra WordPress (for å finne URL-er som ikke står i listen over)
for (const sm of ['/wp-sitemap.xml', '/sitemap_index.xml', '/sitemap.xml']) {
  const r = await fetch(BASE + sm);
  if (r.ok) { await writeFile(join(UT, basename(sm)), await r.text()); console.log('✓ Hentet', sm); }
}
await writeFile(join(UT, 'oversikt.json'), JSON.stringify(oversikt, null, 2));
console.log(`\nFerdig. ${alleBilder.size} bilder. Se ${UT}/ og oppdater INNHOLDSKART.md.`);
