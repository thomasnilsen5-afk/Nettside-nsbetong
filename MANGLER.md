# Manglende informasjon og antakelser

## A. Manglende informasjon (må skaffes før lansering)

Søk etter `MANGLER` i koden for å finne alle plassholdere: `grep -rn "MANGLER" src`

| # | Hva mangler | Hvor det brukes | Kilde |
| --- | --- | --- | --- |
| 1 | **Tekst, bilder og metadata fra dagens 11 sider** | Alle sider | nsbetong.no. Blokkert i byggemiljøet, bruk `npm run hent-gammel-side`. |
| 2 | **Logo** `NS.svg` | Topp, bunn, JSON-LD `logo` | https://nsbetong.no/wp-content/uploads/2022/06/NS.svg |
| 3 | **Organisasjonsnummer** | Bunntekst, Om oss, Personvern | Brønnøysundregistrene, eller bekreftelse fra bedriften |
| 4 | **Referanseprosjekter** (tittel, sted, tjeneste, beskrivelse, bilde) og samtykke fra kundene til å bli nevnt | `/referanser/` | Dagens /referanser/ + bedriften |
| 5 | **Historikk, antall ansatte, nøkkelpersoner** | `/om-oss/` | Dagens /om-oss/ + bedriften |
| 6 | **Aktuelle stillingsutlysninger** | `/ledige-stillinger/` | Dagens side + bedriften |
| 7 | **Redegjørelse etter åpenhetsloven** (tekst eller PDF) | `/apenhetsloven/` | Dagens side |
| 8 | **Lagringstid for henvendelser** | `/personvern/` | Bedriften |
| 9 | **Prosjektbilder** til tjenestesidene og OG-bildet | Tjenestesider | Dagens side + bedriften |
| 10 | **Offisielle merkelogoer** (lærebedrift, våtrom, StartBANK osv.) og om de kan brukes | Tillitsmerker | Dagens side / merkeeierne |
| 11 | **NAP i Google-bedriftsprofilen**: nøyaktig skrivemåte på navn, adresse og telefon | JSON-LD, bunntekst | Google-bedriftsprofilen |
| 12 | **Åpningstider** (hvis de finnes i Google-profilen) | JSON-LD `openingHours` (ikke lagt inn) | Google-profilen |
| 13 | **Hvem eier GTM-KKRWNT4?** Skal den gjenbrukes? | Rapportering | Bedriften / tidligere leverandør |
| 14 | **Tilgang til Microsoft 365** (app-registrering for skjemaet) | Kontaktskjema | Bedriftens M365-administrator |
| 15 | **Leverandørens navn** (hvem forslaget kommer fra), hvis det skal stå i demobanneret | Demobanner | Deg |

## B. Antakelser (bør bekreftes av bedriften)

**Innhold og tjenester**
1. Tjenestetekstene er skrevet nye ut fra tjenestenavnene og generell fagkunnskap, siden dagens tekst ikke kunne hentes.
   Det gjelder særlig **«Typiske oppdrag»** og **«Dette inngår»**. Bedriften må bekrefte at de faktisk utfører for eksempel:
   - støttemurer, trapper/ramper og rehabilitering av betong (Betongarbeid)
   - innstøping av varmekabler/vannbåren varme og påstøp på trebjelkelag (Gulvstøp)
   - profilstøp på stedet, trafikkøyer, rundkjøringer og gang-/sykkelveier (Vei og kantstøp)
   - rollen som underentreprenør for hovedentreprenører og byggmestere (Nybygg)
   - riving, membran, pussing av grunnmur og samordning med rørlegger/elektriker (Flis og mur)
2. Det står at vi «kan erklære ansvarsrett». Dette bygger på tillitsmerket «Ansvarsrett». Omfang og tiltaksklasser er ikke oppgitt.
3. «Befaring» nevnes som vanlig før tilbud. Det står ingenting om at befaringen er gratis.
4. Det står at bedriften leverer dokumentasjon på våtromsarbeid. Dette bygger på at de er godkjent våtromsbedrift.
5. «StartBANK» er skrevet med store bokstaver slik ordningen selv skriver det. I oppdraget står «Startbank».
6. «Tariffavtale 2026» er gjengitt som på dagens side. Merket bør oppdateres hvert år, eller skrives uten årstall.
7. Ledige stillinger: Teksten om åpen søknad og læreplass er en antakelse (bygger på «godkjent lærebedrift»).

**Geografi**
8. Bare «Bergen», «Bergen og omegn», «Vestland» og adressen på Kleppestø er brukt. `areaServed` i JSON-LD er Bergen (by) og Vestland (fylke).
   **Spørsmål:** Skal andre kommuner nevnes, som Askøy, Øygarden, Bjørnafjorden eller Alver? Det er ikke gjort uten avklaring.

**Teknikk og drift**
9. Skjemaet sender via Microsoft Graph fra bedriftens egen M365-postboks. Det krever en app-registrering, men ingen DNS-endring.
10. Rate limiting er i minnet per funksjonsinstans. Det er godt nok for et lite nettsted, men gir ikke fullstendig vern.
11. Consent Mode *basic*: Google-skript lastes bare etter samtykke. GA4 viser derfor bare brukere som samtykker.
12. Kanonisk domene er `https://nsbetong.no` (uten www), og www videresendes.
13. `DEMO_MODUS` er på som standard, fordi siden er et forslag og ikke bestilt av bedriften. Den må settes til `0` ved lansering.
14. Vercel-prosjektet har Vercel Authentication på. Preview-adressen krever innlogging til den deles med en delingslenke,
    eller til beskyttelsen slås av.
15. Favicon og OG-bilde er enkle, midlertidige grafiske elementer i firmafargene. De er ikke en ny logo, og byttes ut når logoen er på plass.
