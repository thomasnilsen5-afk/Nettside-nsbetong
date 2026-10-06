# SEO- og kravsjekkliste

✅ = gjort og kontrollert · ⏳ = klargjort, men venter på innhold, tilgang eller overtakelse · ❌ = ikke gjort

Kontrollert med `npm run build && npm run check`, Lighthouse (mobil) og manuell test i Chromium (390 px og 1366 px).

## Kartlegging og innhold

- [x] ✅ Hentet alle 11 sidene fra nsbetong.no, i tillegg til 9 prosjektsider og WordPress-sitemapene (`npm run hent-gammel-side`, `scripts/hent-prosjekter.mjs`)
- [x] ✅ Innholdsoversikt (tekst, bilder, tillitsmerker) i INNHOLDSKART.md
- [x] ✅ 88 av bedriftens egne bilder er lastet ned og optimalisert: EXIF/GPS fjernet, maks 2000 px, AVIF/WebP i flere størrelser via Astro `<Picture>`
- [x] ✅ Logoen `NS.svg` er hentet fra dagens side og brukt uendret i topp, bunn, favicon og JSON-LD
- [x] ✅ Bare oppgitte fakta og fakta fra bedriftens egen nettside er brukt. Det som mangler er merket `[MANGLER: …]` (se MANGLER.md).
- [x] ✅ Ingen oppdiktede tall, kundeuttalelser, sertifiseringer eller referanser.

## Design

- [x] ✅ Farger som CSS-variabler (`src/styles/global.css`): #232F36, #B22424, #ED2224, #7B1A1A, #3E3E3E, #333333, #7F7F7F, #C8D2D7, #FFFFFF
- [x] ✅ #ED2224 brukes bare til dekor (streker og kanter), aldri til tekst. Tekst og knapper på lys bakgrunn bruker #B22424 (6,6:1). #7F7F7F brukes ikke til tekst.
- [x] ✅ Kontrast WCAG AA. Lighthouse Accessibility 100 på alle målte sider.
- [x] ✅ Work Sans (brødtekst) og Oswald (overskrifter, variabel font), **selvhostet** i `/public/fonts`, ingen Google Fonts-kall. Lisens (OFL) ligger ved.
- [x] ✅ Mobil først. Fast «Ring oss / Gratis befaring»-felt nederst på mobil, fullskjermsmeny (virker uten JS). Telefonknapp og nedtrekksmeny med bilder i toppmenyen på desktop.
- [x] ✅ Tydelig CTA (ring / be om tilbud) på hver side: hero, sidekolonne og CTA-bånd nederst.

## Teknisk

- [x] ✅ Statisk generert med Astro. Alt innhold ligger i HTML. JS brukes bare til samtykke, måling og forhåndsvalg i skjema.
- [x] ✅ Klar for Vercel (`@astrojs/vercel`, `vercel.json`, funksjonsregion `arn1` Stockholm).
- [x] ✅ Deployet uten domene. **Merk:** Vercel-API-et behandlet grenen som produksjon (den er repoets eneste gren), så deployen ble lagt på *staging*-målet i stedet. Den første, feilaktige produksjonsdeployen ble avbrutt før den ble ferdig. Ingen DNS eller produksjonsdomene er endret.
- [x] ✅ Samme URL-struktur som i dag, med avsluttende skråstrek (`trailingSlash: 'always'` + `"trailingSlash": true`).
- [x] ✅ De 9 prosjektsidene beholder sine URL-er (`/prosjekt/<slug>/`)
- [x] ✅ 301/308-redirects i `vercel.json` for alle URL-er i dagens sitemaps som ikke videreføres: `/personvernerklaering/`, `/prosjekt/`, `/prosjektside-ny/`, `/ansatte/*` og sitemaps. I tillegg www → apex.
- [ ] ⏳ Sjekke Search Console for andre adresser med trafikk eller lenker (f.eks. bilde-URL-er) før lansering
- [x] ✅ Kontaktskjema via serverless-funksjon til post@nsbetong.no (Graph/Resend), honeypot, tidssjekk, rate limiting og validering. Testet lokalt.
- [x] ✅ Hemmeligheter i miljøvariabler, dokumentert i `.env.example` og OVERLEVERING.md.
- [x] ✅ Takkeside `/takk/` med `noindex`, som utløser `form_submit`. Testet.
- [x] ✅ Ingen tredjepartskapsler før samtykke. Testet: 0 eksterne forespørsler før samtykke og etter avslag.
- [x] ✅ Kart som lenke til Google Maps, ingen innbygging.

## SEO

- [x] ✅ `lang="nb"` på alle sider
- [x] ✅ Unik `<title>` (maks 60 tegn) og meta description (maks 157 tegn) på alle 23 sider. Kontrollert av `npm run check`.
- [x] ✅ Én H1 per side, logisk H2/H3
- [x] ✅ Målsøkeord i title/H1/tekst: betongentreprenør Bergen (forside, nybygg), betongarbeid Bergen, gulvstøp/flytavretting Bergen, kantstøp/profilstøp vei og fortau, nybygg entreprenør Bergen, flis- og murarbeid/våtrom Bergen
- [ ] ⏳ Validere søkeordene mot Search Console-data etter 4–8 uker
- [x] ✅ Bare geografi bedriften selv oppgir på dagens side: Bergen og omegn, Askøy, Øygarden, Vestland og adressen på Kleppestø
- [x] ✅ Hver tjenesteside har unik tekst (420–530 ord i hovedinnholdet), hva som inngår, typiske oppdrag, hvem det passer for, «hvorfor oss», FAQ og CTA
- [x] ✅ Bilder på alle tjenestesider (hero + galleri), lenke til referanser, og prosjektsidene lenker tilbake til tjenestene
- [x] ✅ Ingen tynne «by-sider» og ingen duplisert tekst
- [x] ✅ Intern lenking: tjenestekort («Andre tjenester»), referanser ↔ prosjektsider ↔ tjenester, om oss, kontakt, meny og bunntekst
- [x] ✅ Brødsmuler (synlige + BreadcrumbList JSON-LD) på alle undersider
- [x] ✅ JSON-LD `GeneralContractor` (LocalBusiness) på forsiden: navn, adresse, telefon, e-post, logo, bilde, stiftelsesår, org.nr., sameAs Facebook og areaServed (Bergen, Askøy, Øygarden, Vestland). Også `WebSite`.
- [x] ✅ JSON-LD `Service` på alle fem tjenestesider, koblet til firmaet via `@id`
- [ ] ⏳ NAP identisk med Google-bedriftsprofilen. Nettsiden bruker de oppgitte verdiene, men profilen må kontrolleres.
- [x] ✅ `sitemap-index.xml` (uten /takk/ og 404), `robots.txt` med sitemap
- [x] ✅ Canonical til `https://nsbetong.no/...` på alle sider
- [x] ✅ Open Graph og Twitter-kort. OG-bildet (1200×630) lages automatisk fra hver sides eget prosjektbilde.
- [x] ✅ Egen 404-side
- [x] ✅ HTTPS (Vercel) + HSTS-header
- [x] ✅ Bilder: AVIF + WebP for toppbilder (LCP), WebP for resten (raskere bygg), width/height, lazy loading under første skjerm, `fetchpriority="high"` på heltebildet, norske filnavn og beskrivende alt-tekst. Illustrasjoner er merket som illustrasjoner.
- [x] ✅ Ytelse med alle bilder: LCP 1,6–2,2 s, CLS 0, TBT 0 ms (se lighthouse/RESULTATER.md)
- [x] ✅ Lighthouse mobil ≥ 95 på Performance, SEO, Accessibility og Best Practices. Resultatet er **99–100** i alle kategorier på 12 sider, målt på den nye designen med bilder og uten demomodus.
- [ ] ⏳ Måle med PageSpeed Insights på den endelige adressen etter lansering

## Rapportering

- [x] ✅ GTM og GA4 via miljøvariabler (`GTM_ID`, `GA4_ID`). Dagens container GTM-KKRWNT4 er ikke hardkodet.
- [x] ✅ Samtykkebanner på norsk, Consent Mode v2, blokkerer analyse og markedsføring før samtykke
- [x] ✅ Personvernside `/personvern/`
- [x] ✅ dataLayer: `click_phone`, `click_email`, `form_submit`, `cta_click` (med `cta_name` + `page_path`), `click_facebook`. Testet i nettleser.
- [x] ✅ Dokumentert hvordan hendelsene markeres som nøkkelhendelser i GA4 (RAPPORTERING.md)
- [x] ✅ Search Console-klargjøring (domeneeiendom via DNS TXT) og UTM-parametere dokumentert
- [x] ✅ RAPPORTERING.md med månedlig rapportmal og forslag til Looker Studio-dashbord
- [ ] ⏳ Opprette GTM, GA4 og Search Console i bedriftens navn (krever bedriften)

## Leveranser

- [x] ✅ Kode i GitHub + Vercel-deploy (staging, ikke produksjon)
- [x] ✅ INNHOLDSKART.md (gammel side → ny side, bilder, tillitsmerker, redirects)
- [x] ✅ SEO-SJEKKLISTE.md (denne)
- [x] ✅ RAPPORTERING.md
- [x] ✅ OVERLEVERING.md (DNS-plan og rollback. Bare A/CNAME for web endres, og MX/SPF/DKIM/TXT røres ikke.)
- [x] ✅ MANGLER.md (manglende informasjon og antakelser)
