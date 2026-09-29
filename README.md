# Nettside – Nilsen & Sture Betong AS (forslag)

Statisk, rask og søkeoptimalisert nettside bygget med [Astro](https://astro.build) og driftet på Vercel.
Innholdet ligger ferdig i HTML ved bygg. Det brukes lite JavaScript, bare til samtykke og måling.
Det finnes ingen CMS: alt innhold redigeres i noen få filer (se under).

> **Status:** Dette er et *forslag*. **Demomodus er på som standard.** Det betyr `noindex` på alle sider,
> et gult banner om at dette ikke er den offisielle siden, og at skjemaet ikke sender e-post.
> Se [OVERLEVERING.md](OVERLEVERING.md) for hvordan siden settes i drift.

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
| Referanseprosjekter | `src/data/referanser.ts` |
| Forsiden | `src/pages/index.astro` |
| Om oss, ledige stillinger, åpenhetsloven, kontakt, personvern | `src/pages/<side>/index.astro` |
| Farger og typografi (CSS-variabler) | `src/styles/global.css` |

Endre, lagre, commit og push. Vercel bygger og publiserer automatisk.

### Logo

Logoen (`NS.svg` fra dagens side) legges i `public/img/NS.svg`. Deretter settes `logoTilgjengelig: true` i
`src/data/site.ts`. Til da vises firmanavnet som tekst. Logoen skal ikke tegnes på nytt.

### Bilder

1. Legg originalbilder i `bilder-inn/<side>/`, for eksempel `bilder-inn/betongarbeid/stop-av-grunnmur.jpg`.
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
Det krever nettverkstilgang til nsbetong.no.

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
  components/   Header, Footer, skjema, samtykkebanner, CTA, FAQ ...
  data/         site.ts (fakta), tjenester.ts, referanser.ts, jsonld.ts, miljo.ts
  layouts/      Base.astro (head, SEO, JSON-LD), Tjenesteside.astro
  pages/        én mappe per URL – identisk med dagens URL-struktur
  scripts/      nsb.ts – samtykke, GTM/GA4-lasting og dataLayer-hendelser
  styles/       global.css
public/         fonter (selvhostet), favicon, OG-bilde, robots.txt
scripts/        hjelpeskript (bilder, ikoner, SEO-sjekk, henting av gammel side)
vercel.json     redirects (www → apex), sikkerhetshoder, cache
```
