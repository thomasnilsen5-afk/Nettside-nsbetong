# SEO- og kravsjekkliste

✅ = gjort og kontrollert · ⏳ = klargjort, men venter på innhold, tilgang eller overtakelse · ❌ = ikke gjort

Kontrollert med `npm run build && npm run check`, Lighthouse (mobil) og manuell test i Chromium (390 px og 1366 px).

## Kartlegging og innhold

- [ ] ⏳ Hente alle 11 sider fra nsbetong.no. Blokkert av nettverket i byggemiljøet. Skriptet `npm run hent-gammel-side` er klart.
- [ ] ⏳ Innholdsoversikt (tekst, bilder, tillitsmerker) over dagens side. Mal i INNHOLDSKART.md, fylles ut etter henting.
- [ ] ⏳ Last ned og optimaliser bedriftens egne bilder. Pipeline klar (`npm run bilder` + Astro `<Picture>` AVIF/WebP).
- [ ] ⏳ Bruk logoen `NS.svg`. Plass og bryter klar (`logoTilgjengelig`). Firmanavnet vises som tekst til logoen er lagt inn, og logoen er ikke tegnet på nytt.
- [x] ✅ Bare oppgitte bedriftsfakta brukt. Det som mangler er merket `[MANGLER: …]` (se MANGLER.md).
- [x] ✅ Ingen oppdiktede tall, kundeuttalelser, sertifiseringer eller referanser.

## Design

- [x] ✅ Farger som CSS-variabler (`src/styles/global.css`): #232F36, #B22424, #ED2224, #7B1A1A, #3E3E3E, #333333, #7F7F7F, #C8D2D7, #FFFFFF
- [x] ✅ #ED2224 brukes bare til dekor (streker og kanter), aldri til tekst. Tekst og knapper på lys bakgrunn bruker #B22424 (6,6:1). #7F7F7F brukes ikke til tekst.
- [x] ✅ Kontrast WCAG AA. Lighthouse Accessibility 100 på alle målte sider.
- [x] ✅ Work Sans (brødtekst) og Oswald (overskrifter), **selvhostet** i `/public/fonts`, ingen Google Fonts-kall. Lisens (OFL) ligger ved.
- [x] ✅ Mobil først. Fast «Ring oss / Be om tilbud»-felt nederst på mobil. Telefonknapp i toppmenyen på desktop.
- [x] ✅ Tydelig CTA (ring / be om tilbud) på hver side: hero, sidekolonne og CTA-bånd nederst.

## Teknisk

- [x] ✅ Statisk generert med Astro. Alt innhold ligger i HTML. JS brukes bare til samtykke, måling og forhåndsvalg i skjema.
- [x] ✅ Klar for Vercel (`@astrojs/vercel`, `vercel.json`, funksjonsregion `arn1` Stockholm).
- [x] ✅ Deployet uten domene. **Merk:** Vercel-API-et behandlet grenen som produksjon (den er repoets eneste gren), så deployen ble lagt på *staging*-målet i stedet. Den første, feilaktige produksjonsdeployen ble avbrutt før den ble ferdig. Ingen DNS eller produksjonsdomene er endret.
- [x] ✅ Samme URL-struktur som i dag, med avsluttende skråstrek (`trailingSlash: 'always'` + `"trailingSlash": true`).
- [x] ✅ 301/308-redirects i `vercel.json`: www → apex, gamle sitemap-adresser og vanlige WordPress-adresser.
- [ ] ⏳ Redirects for eventuelle andre gamle URL-er (innlegg, vedlegg, bilder). Krever WordPress-sitemap og Search Console.
- [x] ✅ Kontaktskjema via serverless-funksjon til post@nsbetong.no (Graph/Resend), honeypot, tidssjekk, rate limiting og validering. Testet lokalt.
- [x] ✅ Hemmeligheter i miljøvariabler, dokumentert i `.env.example` og OVERLEVERING.md.
- [x] ✅ Takkeside `/takk/` med `noindex`, som utløser `form_submit`. Testet.
- [x] ✅ Ingen tredjepartskapsler før samtykke. Testet: 0 eksterne forespørsler før samtykke og etter avslag.
- [x] ✅ Kart som lenke til Google Maps, ingen innbygging.

## SEO

- [x] ✅ `lang="nb"` på alle sider
- [x] ✅ Unik `<title>` (maks 59 tegn) og meta description (maks 147 tegn) per side. Kontrollert av `npm run check`.
- [x] ✅ Én H1 per side, logisk H2/H3
- [x] ✅ Målsøkeord i title/H1/tekst: betongentreprenør Bergen (forside, nybygg), betongarbeid Bergen, gulvstøp/flytavretting Bergen, kantstøp/profilstøp vei og fortau, nybygg entreprenør Bergen, flis- og murarbeid/våtrom Bergen
- [ ] ⏳ Validere søkeordene mot Search Console-data etter 4–8 uker
- [x] ✅ Bare geografi bedriften selv oppgir (Bergen, omegn, Vestland, Kleppestø). Ingen andre kommuner er nevnt.
- [x] ✅ Hver tjenesteside har unik tekst (400–505 ord i hovedinnholdet), hva som inngår, typiske oppdrag, hvem det passer for, FAQ og CTA
- [ ] ⏳ Bilder og referanser på tjenestesidene. Plassen er klar, men venter på bedriftens bilder og referanser.
- [x] ✅ Ingen tynne «by-sider» og ingen duplisert tekst
- [x] ✅ Intern lenking: tjenestekort («Andre tjenester»), lenker til referanser, om oss og kontakt, meny og bunntekst
- [x] ✅ Brødsmuler (synlige + BreadcrumbList JSON-LD) på alle undersider
- [x] ✅ JSON-LD `GeneralContractor` (LocalBusiness) på forsiden: navn, adresse, telefon, e-post, sameAs Facebook, areaServed. Også `WebSite`.
- [x] ✅ JSON-LD `Service` på alle fem tjenestesider, koblet til firmaet via `@id`
- [ ] ⏳ NAP identisk med Google-bedriftsprofilen. Nettsiden bruker de oppgitte verdiene, men profilen må kontrolleres.
- [x] ✅ `sitemap-index.xml` (uten /takk/ og 404), `robots.txt` med sitemap
- [x] ✅ Canonical til `https://nsbetong.no/...` på alle sider
- [x] ✅ Open Graph og Twitter-kort med eget OG-bilde (1200×630)
- [ ] ⏳ Bytte OG-bildet til et ekte prosjektbilde når bildene er hentet
- [x] ✅ Egen 404-side
- [x] ✅ HTTPS (Vercel) + HSTS-header
- [x] ✅ Bilder: AVIF/WebP, width/height, lazy loading under første skjerm, norske filnavn og alt-tekst. Pipeline og komponent er klare, men det er ingen bilder ennå.
- [x] ✅ Ytelse: LCP 1,4–1,5 s, CLS 0 (se lighthouse/RESULTATER.md)
- [x] ✅ Lighthouse mobil ≥ 95 på Performance, SEO, Accessibility og Best Practices. Resultatet er **100/100/100/100** på 9 sider, målt uten demomodus.
- [ ] ⏳ Måle Lighthouse på nytt når bildene er lagt inn, og på den endelige Vercel-URL-en

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
- [x] ✅ INNHOLDSKART.md (mal, fylles ut når den gamle siden kan hentes)
- [x] ✅ SEO-SJEKKLISTE.md (denne)
- [x] ✅ RAPPORTERING.md
- [x] ✅ OVERLEVERING.md (DNS-plan og rollback. Bare A/CNAME for web endres, og MX/SPF/DKIM/TXT røres ikke.)
- [x] ✅ MANGLER.md (manglende informasjon og antakelser)
