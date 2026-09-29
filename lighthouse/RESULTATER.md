# Lighthouse-resultater (mobil)

Målt 29.09.2026 med Lighthouse (siste versjon fra npm), mobilprofil (emulert Moto G Power, simulert treg 4G) og
headless Chromium. Målingen er gjort mot et lokalt produksjonsbygg (`DEMO_MODUS=0 npm run build`) servert med
`serve`, som komprimerer med gzip slik Vercel gjør. **Alle bedriftens bilder er med.**

Målingen er gjort **uten demomodus**. Med demomodus på gir `noindex` SEO-poeng 66, og det er meningen.

| Side | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 99 | 100 | 100 | 100 | 2,2 s | 0 | 0 ms |
| `/betongarbeid/` | 100 | 100 | 100 | 100 | 1,8 s | 0 | 0 ms |
| `/gulvstop-og-flytavretting/` | 100 | 100 | 100 | 100 | 1,7 s | 0 | 0 ms |
| `/vei-og-kantstop/` | 100 | 100 | 100 | 100 | 1,9 s | 0 | 0 ms |
| `/nybygg/` | 100 | 100 | 100 | 100 | 1,7 s | 0 | 0 ms |
| `/flis-og-murarbeid/` | 100 | 100 | 100 | 100 | 1,7 s | 0 | 0 ms |
| `/referanser/` | 99 | 100 | 100 | 100 | 2,2 s | 0 | 0 ms |
| `/prosjekt/saedalen-kirke/` | 100 | 100 | 100 | 100 | 1,6 s | 0 | 0 ms |
| `/prosjekt/bergen-verksted/` | 99 | 100 | 100 | 100 | 2,0 s | 0 | 0 ms |
| `/om-oss/` | 100 | 100 | 100 | 100 | 1,8 s | 0 | 0 ms |
| `/kontakt-oss/` | 100 | 100 | 100 | 100 | 1,6 s | 0 | 0 ms |
| `/ledige-stillinger/` | 100 | 100 | 100 | 100 | 1,6 s | 0 | 0 ms |

Målt på den nye designen (fullbredde toppbilder, bildefremvisning, animasjoner og kontaktpersoner).

Fullstendige rapporter i denne mappen: `mobil_.report.html` (forsiden), `mobil_betongarbeid_.report.html` og
`mobil_prosjekt_saedalen-kirke_.report.html`.

## Tiltak som ga resultatet

- Alle bilder serveres som AVIF/WebP i flere størrelser (`srcset`), med `width`/`height` og lazy loading under første skjerm.
- Toppbildene lastes med `fetchpriority="high"`, egne mobilstørrelser (480/768 px) og kvalitet 45, siden de ligger under et mørkt overlegg.
- Bildefremvisningen på forsiden laster de tre neste bildene først etter at siden er ferdig lastet (`<template>` + JS).
- Animasjoner bruker bare `transform`/`opacity` (ingen repaint på hovedtråden). Pulsringen og den løpende byggherre-raden ga tidligere 250 ms TBT.
- Bare toppbildet lastes ivrig. Alle kort- og gallerbilder lastes lazy, slik at de ikke tar båndbredde fra LCP-bildet.
- `font-display: optional` med forhåndslasting av tre fontfiler: Oswald som variabel font (alle vekter i én fil på 28 KB) og Work Sans 400/600. Det gir CLS 0 og riktig font ved første besøk.
- CSS ligger inline, og det er ingen skript som blokkerer visningen.

## Forbehold

- Uten komprimering (for eksempel med `python -m http.server`) blir LCP på forsiden ca. 2,5 s, fordi HTML-en da er 61 KB i stedet for 13 KB.
  Vercel komprimerer alltid.
- Kjør gjerne PageSpeed Insights mot den ferdige Vercel-adressen etter lansering. Da får du også feltdata (CrUX) når det er nok trafikk.

## Slik kjører du selv

```bash
DEMO_MODUS=0 npm run build
npx serve dist/client -l 4321 &
npx lighthouse http://localhost:4321/ --form-factor=mobile --view
```
