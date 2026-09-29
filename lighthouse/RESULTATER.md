# Lighthouse-resultater (mobil)

Målt 29.09.2026 med Lighthouse (siste versjon fra npm), mobilprofil (Moto G Power-emulering, simulert treg 4G),
headless Chromium mot et lokalt produksjonsbygg (`DEMO_MODUS=0 npm run build`, statisk server).

Målingen er gjort **uten demomodus**. Med demomodus på gir `noindex` SEO-poeng 66, og det er meningen.

| Side | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |
| `/betongarbeid/` | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |
| `/gulvstop-og-flytavretting/` | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |
| `/vei-og-kantstop/` | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |
| `/nybygg/` | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |
| `/flis-og-murarbeid/` | 100 | 100 | 100 | 100 | 1,4 s | 0 | 0 ms |
| `/kontakt-oss/` | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |
| `/referanser/` | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |
| `/om-oss/` | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |

Fullstendige rapporter: `mobil_.report.html` (forsiden) og `mobil_betongarbeid_.report.html`.

## Forbehold

- Sidene har **ennå ikke bilder**. Når prosjektbildene legges inn, bør Lighthouse kjøres på nytt.
  Bildene serveres som AVIF/WebP med `srcset`, `width`/`height` og lazy loading. Hvis et bilde havner i første
  skjerm (hero), bør det få `loading="eager"` og `fetchpriority="high"`.
- Første måling ga CLS på ca. 0,19 fordi fontbyttet flyttet innholdet. Det ble løst med `font-display: optional` og
  preload av de fire fontfilene (til sammen ca. 66 KB).
- Kjør gjerne på nytt mot den ferdige Vercel-adressen (PageSpeed Insights) etter lansering.

## Slik kjører du selv

```bash
DEMO_MODUS=0 npm run build
npx serve dist/client -l 4321 &
npx lighthouse http://localhost:4321/ --form-factor=mobile --view
```
