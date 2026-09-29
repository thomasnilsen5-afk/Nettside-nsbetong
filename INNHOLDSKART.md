# Innholdskart – gammel side → ny side

## Status for kartleggingen

Da siden ble bygget, stoppet nettverksreglene i byggemiljøet all tilgang til **nsbetong.no**. Derfor ble
teksten, bildene og logoen fra dagens side **ikke** hentet. Innholdet på den nye siden bygger bare på
bedriftsfaktaene i oppdraget. Alt som mangler er merket med `[MANGLER: …]` på siden og listet i [MANGLER.md](MANGLER.md).

**Neste steg:** Kjør `npm run hent-gammel-side` fra en maskin med nettilgang. Skriptet lagrer tekst,
metadata, bildeliste, bilder, logo og WordPress-sitemap i `innhold-gammel/`. Fyll så ut kolonnene
«Innhold på dagens side» under, og flytt tekst og bilder inn i `src/data/`.

## Sider

Alle URL-er beholdes nøyaktig som i dag, med avsluttende skråstrek. Ingen sider får ny adresse, så det
trengs ingen 301 for innholdssidene.

| Dagens URL | Ny URL | Endring | Innhold på dagens side (fylles ut etter henting) | Ny side – innhold |
| --- | --- | --- | --- | --- |
| `/` | `/` | Beholdt | [MANGLER] | Hero med H1 «Betongentreprenør i Bergen og omegn», tillitsmerker, tjenestekort, «hvorfor oss», kundegrupper, kontakt, CTA. JSON-LD GeneralContractor + WebSite |
| `/referanser/` | `/referanser/` | Beholdt | [MANGLER] | Rutenett for referanser (`src/data/referanser.ts`), tom til innholdet er hentet |
| `/betongarbeid/` | `/betongarbeid/` | Beholdt | [MANGLER] | Ny tekst (ca. 475 ord), inngår, typiske oppdrag, målgruppe, FAQ, CTA, Service-JSON-LD |
| `/gulvstop-og-flytavretting/` | `/gulvstop-og-flytavretting/` | Beholdt | [MANGLER] | Ny tekst (ca. 505 ord), som over |
| `/vei-og-kantstop/` | `/vei-og-kantstop/` | Beholdt | [MANGLER] | Ny tekst (ca. 400 ord), som over |
| `/nybygg/` | `/nybygg/` | Beholdt | [MANGLER] | Ny tekst (ca. 400 ord), som over |
| `/flis-og-murarbeid/` | `/flis-og-murarbeid/` | Beholdt | [MANGLER] | Ny tekst (ca. 430 ord), som over, med vekt på våtrom |
| `/ledige-stillinger/` | `/ledige-stillinger/` | Beholdt | [MANGLER] | Plass til utlysninger og tekst om åpen søknad og læreplass |
| `/om-oss/` | `/om-oss/` | Beholdt | [MANGLER] | Tekst om firmaet, godkjenninger, firmaopplysninger |
| `/apenhetsloven/` | `/apenhetsloven/` | Beholdt | [MANGLER] | Forklaring og innsynsrett, plass til redegjørelse |
| `/kontakt-oss/` | `/kontakt-oss/` | Beholdt | [MANGLER] | Skjema, telefon, e-post, adresse, kartlenke (ikke innebygd kart) |
| – | `/personvern/` | **Ny** | – | Personvernerklæring og informasjonskapsler |
| – | `/takk/` | **Ny** (noindex) | – | Takkeside etter skjema, utløser `form_submit` |
| – | `/404` | **Ny** | – | Egen 404-side med tjenestelenker |

## Tillitsmerker

| På dagens side | Ny side |
| --- | --- |
| Godkjent lærebedrift | Tekstmerke på forside, tjenestesider og om oss |
| Godkjent våtromsbedrift | Tekstmerke, og omtalt på flis- og murarbeid |
| Ansvarsrett | Tekstmerke, og omtalt på betongarbeid og nybygg |
| Tariffavtale 2026 | Tekstmerke |
| Startbank | Tekstmerke («StartBANK») |

Merkene vises som tekst fordi de offisielle merkelogoene ikke kunne hentes. Bruker dagens side offisielle
logoer, kan de legges inn når bedriften har bekreftet at de kan brukes.

## Redirects (vercel.json)

| Fra | Til | Type | Hvorfor |
| --- | --- | --- | --- |
| `https://www.nsbetong.no/*` | `https://nsbetong.no/*` | 301/308 | Kanonisk domene er apex |
| `/sitemap.xml`, `/sitemap_index.xml`, `/wp-sitemap.xml` | `/sitemap-index.xml` | 308 | Gamle sitemap-adresser fra WordPress/SEO-tillegg |
| `/feed`, `/wp-admin`, `/wp-login.php` | `/` | 308 | Vanlige WordPress-adresser som ellers gir 404 |
| `/kontakt`, `/personvernerklaering` | `/kontakt-oss/`, `/personvern/` | 308 | Vanlige feilskrivinger |
| URL-er uten avsluttende skråstrek | Samme URL med `/` | 308 | `trailingSlash: true` |

**Må gjøres etter henting:** Gå gjennom WordPress-sitemapen og Search Console («Sider» og «Lenker») for
andre URL-er som er indeksert eller har innkommende lenker, som enkeltinnlegg, `/category/…`,
vedlegg og `wp-content/uploads/…`-bilder. Legg til 301 i `vercel.json` for dem som har trafikk eller lenker.
