# Nettside – Nilsen & Sture Betong AS (forslag)

Statisk, rask og søkeoptimalisert nettside bygget med [Astro](https://astro.build) og driftet på Vercel.
Innholdet ligger ferdig i HTML ved bygg. Det brukes lite JavaScript, bare til samtykke og måling.
Det finnes ingen CMS: alt innhold redigeres i noen få filer (se under).

> **Status:** Dette er et *forslag*. **Demomodus er på som standard.** Det betyr `noindex` på alle sider,
> et gult banner om at dette ikke er den offisielle siden, og at skjemaet ikke sender e-post.
> Se [OVERLEVERING.md](OVERLEVERING.md) for hvordan siden settes i drift.

## Finn tilbake til alt (kart over lagringsstedene)

| Hva | Hvor |
| --- | --- |
| **Nettsidens kode, tekster og optimaliserte bilder** | GitHub-repoet [`thomasnilsen5-afk/Nettside-nsbetong`](https://github.com/thomasnilsen5-afk/Nettside-nsbetong), gren `claude/nilsen-sture-betong-site-sqnpw8` |
| **Siste ferdige versjon av designen** | Commit `2da6615` (`git checkout 2da6615` for å se akkurat den) |
| **Rådata fra gamle nsbetong.no** (tekst, originalbilder, prosjektfakta, sitemaps), 70 MB | Gren [`arkiv`](https://github.com/thomasnilsen5-afk/Nettside-nsbetong/tree/arkiv) → `innhold-gammel-nsbetong.zip`. Se `ARKIV.md` der |
| **Skjermbilder av designen** | Gren `arkiv` → `forhandsvisning/` |
| **Pull request** | [#1](https://github.com/thomasnilsen5-afk/Nettside-nsbetong/pull/1) |
| **Forslaget på nett** | Vercel-prosjekt `nsbetong-forslag` (team `thomas11-3d40`) |
| **Overlevering til ny samtale** | `NY-SAMTALE.md` i roten av repoet |

**Lokal kopi på maskinen din:**
```bash
git clone -b claude/nilsen-sture-betong-site-sqnpw8 https://github.com/thomasnilsen5-afk/Nettside-nsbetong.git
cd Nettside-nsbetong && npm install && npm run dev
```

---

## Dokumenter

| Fil | Innhold |
| --- | --- |
| [INNHOLDSKART.md](INNHOLDSKART.md) | Gammel side → ny side, redirects |
| [SEO-SJEKKLISTE.md](SEO-SJEKKLISTE.md) | Avkrysning av alle krav |
| [RAPPORTERING.md](RAPPORTERING.md) | GTM/GA4, hendelser, Search Console, månedsrapport, Looker Studio |
| [OVERLEVERING.md](OVERLEVERING.md) | Miljøvariabler, DNS-plan, bytte og rollback |
| [MANGLER.md](MANGLER.md) | Manglende informasjon og antakelser |
| [lighthouse/RESULTATER.md](lighthouse/RESULTATER.md) | Lighthouse-resultater |

## Kom i gang

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # bygger til .vercel/output (Vercel) og dist/
npm run check      # SEO-kontroll av bygget: title, description, H1, canonical, alt, ordtall
```

Krever Node 20 eller nyere.

## Hvor redigerer jeg innhold?

| Hva | Fil |
| --- | --- |
| Firmanavn, adresse, telefon, e-post, org.nr., Facebook, tillitsmerker, meny | `src/data/site.ts` |
| Tekst, FAQ og bilder for de fem tjenestesidene | `src/data/tjenester.ts` |
| Kontaktpersoner på `/kontakt-oss/` | `src/data/kontaktpersoner.ts` (bilder i `src/assets/bilder/ansatte/`) |
| Referanseprosjekter og prosjektsidene `/prosjekt/<slug>/` | `src/data/referanser.ts` (tekst og fakta), `src/data/prosjektbilder.ts` (bilder) |
| Forsiden | `src/pages/index.astro` |
| Om oss, ledige stillinger, åpenhetsloven, kontakt, personvern | `src/pages/<side>/index.astro` |
| Farger og typografi (CSS-variabler) | `src/styles/global.css` |

Endre, lagre, commit og push. Vercel bygger og publiserer automatisk.

### Logo

Logoen er bedriftens egen `NS.svg`, hentet uendret fra dagens side. Den ligger i `public/img/NS.svg`.
Favicons lages fra den med `node scripts/lag-ikoner.mjs`.

### Bilder

1. Legg originalbilder i `bilder-inn/<mappe>/`, for eksempel `bilder-inn/betongarbeid/stop-av-grunnmur.jpg`.
   Mappen `bilder-inn/` er ikke i Git, bare de optimaliserte bildene i `src/assets/bilder/` er det.
   Gi filene beskrivende norske navn, for de blir brukt videre.
2. Kjør `npm run bilder`. Bildene skaleres til maks 2000 px, EXIF/GPS fjernes, og de legges i `src/assets/bilder/<side>/`.
3. Importer bildet i `src/data/tjenester.ts` (eller `referanser.ts`) med en beskrivende norsk alt-tekst:

   ```ts
   import grunnmur from '../assets/bilder/betongarbeid/stop-av-grunnmur.jpg';
   // ...
   bilder: [{ src: grunnmur, alt: 'Forskaling og armering før støp av grunnmur' }],
   ```

Astro lager AVIF og WebP i flere størrelser, setter `width`/`height` og lazy-loader bilder under første skjerm.

### Hente innhold og bilder fra dagens side

```bash
npm run hent-gammel-side
```

Skriptet henter tekst, metadata, bilder og logoen fra nsbetong.no til `innhold-gammel/` (ikke i Git) og `public/img/NS.svg`.
`NODE_USE_ENV_PROXY=1 node scripts/hent-prosjekter.mjs` henter prosjektsidene. Begge krever nettverkstilgang til nsbetong.no.

## Kontaktskjema

`src/pages/api/kontakt.ts` er en Vercel-funksjon og virker uten JavaScript i nettleseren. Den har:

- honningkrukkefelt (`nettside`) og tidssjekk (under 3 sekunder regnes som robot)
- enkel rate limiting: 5 innsendinger per IP per 10 minutter, i minnet per funksjonsinstans
- validering av navn, telefon og melding
- sending via **Microsoft Graph** (M365, anbefalt) eller **Resend**
- 303-redirect til `/takk/?ok=1`, som utløser `form_submit`

Trenger dere strengere spamvern, kan dere legge på en Vercel Firewall-regel (rate limit på `/api/kontakt/`).

Alle miljøvariabler er beskrevet i [`.env.example`](.env.example) og [OVERLEVERING.md](OVERLEVERING.md).

## Struktur

```
src/
  components/   Header (meny/nedtrekksmeny), Footer, Sidehero, Faktaband, Tjenestekort, Prosjektkort,
                Galleri + Lysboks, Kontaktseksjon/-skjema, Byggherrer, Samtykke, FAQ ...
  data/         site.ts (fakta), tjenester.ts, referanser.ts, jsonld.ts, miljo.ts
  layouts/      Base.astro (head, SEO, JSON-LD), Tjenesteside.astro
  pages/        én mappe per URL – identisk med dagens URL-struktur
  scripts/      nsb.ts – samtykke, GTM/GA4 og dataLayer-hendelser
                ui.ts  – meny ved scrolling, innglidning, bildefremvisning, lysboks, filter
  styles/       global.css
public/         fonter (selvhostet), favicon, OG-bilde, robots.txt
scripts/        hjelpeskript (bilder, ikoner, SEO-sjekk, henting av gammel side)
vercel.json     redirects (www → apex), sikkerhetshoder, cache
```
