# Overlevering til ny samtale

Les denne filen først når du fortsetter arbeidet i en ny samtale med Claude.
Lim gjerne inn: *«Les NY-SAMTALE.md og fortsett der vi slapp.»*

## Finn tilbake til alt (kart over lagringsstedene)

| Hva | Hvor |
| --- | --- |
| **Nettsidens kode, tekster og optimaliserte bilder** | GitHub-repoet [`thomasnilsen5-afk/Nettside-nsbetong`](https://github.com/thomasnilsen5-afk/Nettside-nsbetong), gren `claude/nilsen-sture-betong-site-sqnpw8` |
| **Merkelapp på ferdig designforslag** | Git-tag `v1-designforslag` (viser alltid tilbake til denne ferdige versjonen) |
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

## Hva prosjektet er

Et **designforslag** til ny nettside for **Nilsen & Sture Betong AS** (betongentreprenør, Storebotn 40, 5309 Kleppestø).
Dagens side er https://nsbetong.no (WordPress/Elementor). Forslaget skal vise bedriften en raskere, mer
profesjonell og søkeoptimalisert side, i håp om at de bytter leverandør.

- Bedriften eier alt innhold og alle bilder, og alt kan brukes, også portrettene av de ansatte.
- Språk: bokmål, saklig og jordnær tone. Ikke finn på tall, referanser eller sertifiseringer. Bruk bare fakta fra dagens side eller oppdraget.
- Geografi: bare det bedriften selv oppgir (Bergen og omegn, Askøy, Øygarden, Vestland, Kleppestø).
- Ønsket nivå: «kul, men oversiktlig og profesjonell – som en bedrift med over 100 mill. i omsetning».

## Status nå

| Hva | Status |
| --- | --- |
| Nettside (Astro, statisk + én Vercel-funksjon) | Ferdig, ny design med alle bilder |
| Lighthouse mobil | 99–100 i alle kategorier (se `lighthouse/RESULTATER.md`) |
| Demomodus | **På** (noindex, demomerke, skjemaet sender ikke). Slås av med `DEMO_MODUS=0` |
| GitHub | Repo `thomasnilsen5-afk/Nettside-nsbetong` |
| Grener | `main` = første grunnversjon. `claude/nilsen-sture-betong-site-sqnpw8` = alt arbeid |
| PR | [#1](https://github.com/thomasnilsen5-afk/Nettside-nsbetong/pull/1), åpen, ikke flettet |
| Vercel | Prosjekt `nsbetong-forslag` (id `prj_osc0KUFvj4AEzuRjpTjWW5hXMafm`), team `team_J6ccoH784I4Rxpoyo3sYmGlY`. **Ikke** koblet til Git. Deployes manuelt til målet `staging`. |
| Lenke | https://nsbetong-forslag-git-claude-nilsen-sture-b-52a744-thomas11-3d40.vercel.app (krever Vercel-innlogging, se under) |
| DNS / domene | **Ikke rørt.** Ingen custom domain er koblet til. |

### Gjenstår (gjøres av eieren av kontoene)

1. **GitHub:** Settings → General → Default branch → `main`.
2. **Vercel:** Koble prosjektet til repoet (Settings → Git → Connect) og sett produksjonsgren til `main`.
   Gjør dette *etter* punkt 1. Ellers blir arbeidsgrenen produksjon.
3. **Deling:** Lag en delingslenke (Share i Vercel-verktøylinjen), eller slå av Vercel Authentication
   (Settings → Deployment Protection), så bedriften kan se forslaget.
4. Avklaringer med bedriften står i `MANGLER.md` (8 punkter: åpenhetsloven-redegjørelse, lagringstid,
   Google-profil, GTM-eierskap, M365-tilgang, logoer, osv.).
5. Ved ja fra bedriften følger du `OVERLEVERING.md` (miljøvariabler, e-post via Microsoft Graph, DNS-plan og rollback).

## Viktige filer

| Fil | Innhold |
| --- | --- |
| `README.md` | Teknisk oversikt, kommandoer, hvor innhold redigeres |
| `src/data/site.ts` | Firmafakta, tillitsmerker, meny |
| `src/data/tjenester.ts` | De fem tjenestesidene (tekst, FAQ, bilder) |
| `src/data/referanser.ts` + `prosjektbilder.ts` | 9 referanseprosjekter og prosjektsidene `/prosjekt/<slug>/` |
| `src/data/kontaktpersoner.ts` | 12 kontaktpersoner med portrett |
| `src/layouts/Base.astro` | `<head>`, SEO, JSON-LD, samtykke, fonter |
| `src/styles/global.css` | Designsystem (farger, typografi, knapper) |
| `src/scripts/nsb.ts` / `ui.ts` | Sporing/samtykke og UI (meny, lysboks, bildefremvisning, filter) |
| `src/pages/api/kontakt.ts` | Kontaktskjema (Vercel-funksjon) |
| `vercel.json` | Redirects, sikkerhetshoder, region arn1 |
| `INNHOLDSKART.md`, `SEO-SJEKKLISTE.md`, `RAPPORTERING.md`, `OVERLEVERING.md`, `MANGLER.md` | Leveransedokumenter |

## Arbeidsflyt (for Claude)

```bash
npm install
npm run build          # ca. 1,5 min fra kald cache (mange bilder)
npm run check          # SEO-kontroll av alle sider – skal gi «Ingen avvik»
```

- Commit og push til `claude/nilsen-sture-betong-site-sqnpw8`. PR #1 oppdateres automatisk.
- **Deploy til Vercel:** Vercel-MCP `create_deployment` med `project: prj_osc0KUFvj4AEzuRjpTjWW5hXMafm`,
  `target: "staging"`, `gitSource: { type: "github", org: "thomasnilsen5-afk", repo: "Nettside-nsbetong", ref: <gren>, sha: <commit> }`,
  `skipAutoDetectionConfirmation: "1"`. Bygget tar ca. 3 min. **Ikke** bruk `target: production`, og ikke koble til domener.
- Vercel-MCP kan ikke lese logger eller sider i dette teamet (403). Byggestatus sjekkes med `get_deployment`.

## Kjente fallgruver i sky-miljøet

- **nsbetong.no** må være tillatt i miljøets nettverksinnstillinger. `curl` virker direkte.
  Node trenger `NODE_USE_ENV_PROXY=1` (allerede satt i `npm run hent-gammel-side`).
- **Chromium/Playwright mot nsbetong.no** feiler på sertifikatet til proxyen. Ikke slå av TLS-sjekk.
  Bruk i stedet `context.route()` og hent ressursene med Node `fetch` (se samtalehistorikken).
- Playwright: bruk `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'` og `playwright-core` (ikke `playwright install`).
- Lighthouse: mål mot en server **med gzip** (`npx serve dist/client`), ellers blir LCP kunstig høy.
- Helsideskjermbilder blir misvisende på grunn av fast meny og innglidningsanimasjoner. Scroll og ta skjermbilder skjerm for skjerm.
- `pkill -f` og `pgrep -f` med mønstre som står i egen kommando dreper ditt eget skall. Stopp servere via port eller PID.

## Designprinsipper som er etablert

- Farger: mørk `#232F36`/`#1A2328`, rød `#B22424` (tekst/knapper), logo-rød `#ED2224` (bare dekor). Kontrast WCAG AA.
- Fonter: Oswald (variabel, overskrifter, store bokstaver) og Work Sans 400/600. Selvhostet, `font-display: optional`, forhåndslastet.
- Bildedrevet: fullbredde toppbilder med mørk toning, røde faktabånd, bildefliser, galleri med lysboks.
- Ytelse: AVIF bare for toppbilder, WebP for resten, alt annet lazy. Animasjoner kun med `transform`/`opacity`.
