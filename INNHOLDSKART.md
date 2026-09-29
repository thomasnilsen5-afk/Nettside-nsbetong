# Innholdskart – gammel side → ny side

Kartleggingen ble gjort 29.09.2026 med `npm run hent-gammel-side` og `scripts/hent-prosjekter.mjs`.
De hentet tekst, metadata, bilder, logo og WordPress-sitemaps fra nsbetong.no. Rådataene ligger i `innhold-gammel/`,
som ikke er i Git.

Dagens side er WordPress/Elementor med Yoast SEO og WP Rocket. Den har tre sitemaps: `page-sitemap.xml`
(13 sider), `prosjekt-sitemap.xml` (9 prosjekter + arkiv) og `ansatte-sitemap.xml` (12 ansattsider).

## Sider

Alle innholdssider beholder nøyaktig samme URL, med avsluttende skråstrek.

| Dagens URL | Ny URL | Dagens innhold (kort) | Ny side |
| --- | --- | --- | --- |
| `/` | `/` | H1 «Nilsen & Sture Betong AS». «Din totalleverandør av betongarbeid i Vestland», 5 tjenestekort, karriere, tillitsmerker | H1 «Betongentreprenør i Bergen og omegn» (målsøkeord), heltebilde, merker med logoer, tjenestekort med bilder, om oss med nøkkeltall, 3 utvalgte referanser, karriere, kontakt. JSON-LD GeneralContractor + WebSite |
| `/betongarbeid/` | `/betongarbeid/` | Liste (fundamenter, ringmurer, grunnmurer, gulvstøp, støttemurer, trapper), «Betongentreprenør», argumenter, «gratis befaring» | Samme innhold omskrevet og utvidet (ca. 530 ord), galleri med 4 bilder, FAQ, Service-JSON-LD |
| `/gulvstop-og-flytavretting/` | `/gulvstop-og-flytavretting/` | 8 gulvarbeidere / ca. 60 års erfaring, 9 arbeidsområder (isopor, radonmembran, overflater, epoxy, slurry, SL, maling, ledelinjer, flytavretting) | Alt beholdt, strukturert og utvidet (ca. 530 ord), galleri, FAQ |
| `/vei-og-kantstop/` | `/vei-og-kantstop/` | 4 arbeidere, egen kantstøpemaskin, profilkanter 13–30 cm, «Vårt utvalg av former» (3 tegninger) | Alt beholdt, formtegningene vises, galleri, FAQ (ca. 480 ord) |
| `/nybygg/` | `/nybygg/` | 35 håndverkere + 4 lærlinger, boliger/garasjer/næringsbygg/skoler/offentlige bygg, Askøy/Bergen/Øygarden | Alt beholdt og utvidet (ca. 420 ord), galleri, FAQ |
| `/flis-og-murarbeid/` | `/flis-og-murarbeid/` | 6 håndverkere, godkjent våtromsbedrift, flis/mur/pipe/ildsted/puss, «Renovere baderom», eget tilbudsskjema | Alt beholdt (ca. 460 ord), galleri, FAQ. Eget skjema er erstattet av det felles skjemaet med forhåndsvalgt tjeneste. |
| `/referanser/` | `/referanser/` | Ingress + 9 prosjekter (sted, avdeling, levert betong) | Samme 9 prosjekter som kort med bilde, fakta og lenke til egen prosjektside |
| `/prosjekt/<slug>/` (9 stk.) | `/prosjekt/<slug>/` (samme 9) | Prosjektfakta (levert betong, areal, byggeperiode, kontraktsstørrelse, byggherre, oppdragsgiver), beskrivelse, bildegalleri | Egne sider på samme adresse med fakta, beskrivelse, galleri (3–6 bilder), lenker til tjenestene |
| `/om-oss/` | `/om-oss/` | Stiftet 2004, rundt 50 ansatte, arbeidsområder, visjon | Samme tekst, avdelingsoversikt, godkjenninger, firmaopplysninger med org.nr. |
| `/ledige-stillinger/` | `/ledige-stillinger/` | 5 utlysninger (bas/formann, bas kantstøp, betongarbeider, gulvstøper, 2 flisleggere), felles «vi tilbyr», søknadsskjema | 5 utlysninger som utvidbare blokker, «vi tilbyr», søknad på e-post/telefon |
| `/apenhetsloven/` | `/apenhetsloven/` | Formål, aktsomhetsvurdering, redegjørelse innen 30. juni, svarfrister 3 uker / 2 måneder | Samme innhold, strukturert. Lenke til redegjørelsen mangler. |
| `/kontakt-oss/` | `/kontakt-oss/` | Adresse, telefon, e-post, skjema, fakturainfo (EHF, org.nr.), 12 ansatte med bilde, direktenummer og e-post | Skjema, telefon, e-post, adresse, kartlenke, fakturainfo. **Ansattlisten er ikke tatt med** (se MANGLER.md). |
| `/personvernerklaering/` | `/personvern/` | Personvernerklæring | Ny personvernside med informasjonskapsler og samtykke. **301** |
| – | `/takk/` | – | Takkeside etter skjema (noindex), utløser `form_submit` |
| – | 404 | – | Egen 404-side |

## Bilder

81 filer ble hentet fra sidene og 54 fra prosjektsidene. Etter at duplikater, fonter, en stockillustrasjon
(`car-restorations-pic.jpg`) og byråets logo (`vektor-logo@4x.png`) ble fjernet, ble **88 bilder** lagt inn.
De har fått beskrivende norske filnavn og alt-tekster, og ligger i `src/assets/bilder/`:

| Mappe | Brukes på | Antall |
| --- | --- | --- |
| `forside/`, `felles/`, `omoss/` | Forside, om oss, ledige stillinger | 6 |
| `betongarbeid/`, `gulvstop/`, `kantstop/`, `nybygg/`, `flis/` | Tjenestesidene (hero + galleri, formtegninger) | 30 |
| `referanser/` | Hovedbilde per prosjekt | 9 |
| `prosjekt-*/` | Galleri på prosjektsidene | 40 |
| `merker/` | Ansvarsrett (DiBK), StartBANK, tariffmerket (Fellesforbundet) | 3 |

Bildene fra Sædalen kirke ser ut som arkitektillustrasjoner og har alt-tekst som begynner med «Illustrasjon av».
Portrettene av de ansatte er ikke brukt.

## Tillitsmerker

| På dagens side | Ny side |
| --- | --- |
| Godkjent for ansvarsrett (DiBK-logo) | Logo + tekst |
| StartBANK (logo) | Logo + tekst |
| Tariffavtale 2026 (merket viser «Tariffavtale 2024–2026», Fellesforbundet) | Logo + teksten «Tariffavtale». Årstallet står i alt-teksten. |
| Godkjent lærebedrift (nevnt i tekst) | Tekstmerke |
| Godkjent våtromsbedrift (nevnt i tekst) | Tekstmerke |

## Redirects (vercel.json)

| Fra | Til | Hvorfor |
| --- | --- | --- |
| `https://www.nsbetong.no/*` | `https://nsbetong.no/*` | Kanonisk domene er apex |
| `/personvernerklaering/` | `/personvern/` | Ny adresse for personvern |
| `/prosjekt/` (arkiv) | `/referanser/` | Arkivsiden erstattes av referansesiden |
| `/prosjektside-ny/` | `/referanser/` | Uferdig side i dagens sitemap |
| `/ansatte/*` (12 sider) | `/kontakt-oss/` | Ansattsidene videreføres ikke |
| `/sitemap.xml`, `/sitemap_index.xml`, `/wp-sitemap.xml`, `/page-sitemap.xml`, `/prosjekt-sitemap.xml`, `/ansatte-sitemap.xml` | `/sitemap-index.xml` | Gamle sitemap-adresser fra WordPress/Yoast |
| `/feed`, `/wp-admin`, `/wp-login.php` | `/` | Vanlige WordPress-adresser |
| `/kontakt` | `/kontakt-oss/` | Vanlig feilskriving |
| URL uten avsluttende `/` | Samme URL med `/` | `trailingSlash: true` |

**Før lansering:** Sjekk Search Console («Sider» → indekserte, og «Lenker» → mest lenkede sider) for
`wp-content/uploads/…`-bilder eller andre adresser med trafikk eller lenker, og legg dem eventuelt til.
