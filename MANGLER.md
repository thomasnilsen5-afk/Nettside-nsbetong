# Manglende informasjon og antakelser

Oppdatert etter at innholdet fra dagens nsbetong.no ble hentet. Søk etter `MANGLER` i koden for å finne alle
plassholdere: `grep -rn "MANGLER" src`

## A. Manglende informasjon eller avklaringer (før lansering)

| # | Hva | Hvor | Merknad |
| --- | --- | --- | --- |
| 1 | **Lenke til siste redegjørelse etter åpenhetsloven** | `/apenhetsloven/` | Dagens side sier at den publiseres innen 30. juni hvert år, men har ingen lenke. |
| 2 | **Lagringstid for henvendelser** | `/personvern/` | – |
| 3 | **NAP i Google-bedriftsprofilen.** Nøyaktig skrivemåte på navn, adresse og telefon. | JSON-LD, bunntekst | Nettsiden bruker «Nilsen & Sture Betong AS, Storebotn 40, 5309 Kleppestø, 56 15 96 70». |
| 4 | **Åpningstider** (hvis de står i Google-profilen) | JSON-LD `openingHours` | Ikke lagt inn |
| 5 | **Eierskap til GTM-KKRWNT4.** Skal containeren gjenbrukes? | Rapportering | – |
| 6 | **Tilgang til Microsoft 365** (app-registrering for skjemaet) | Kontaktskjema | Se OVERLEVERING.md |
| 7 | **Logoer for godkjent lærebedrift og godkjent våtromsbedrift** | Tillitsmerker | Dagens side har ingen logoer for disse, så de vises som tekstmerker. |
| 8 | **Leverandørens navn** i demobanneret | Demobanner | Valgfritt |

## B. Hentet fra dagens side (tidligere plassholdere som nå er løst)

- Org.nr. **986 481 729** (fra fakturainformasjonen på `/kontakt-oss/`)
- Logo `NS.svg` (brukt i toppen, bunnen, favicon og JSON-LD)
- Stiftet 2004, rundt 50 ansatte, visjonen
- Avdelingsstørrelser: nybygg 35 + 4 lærlinger, gulv 8 (ca. 60 års samlet erfaring), flis/mur 6, kantstøp 4
- Kantstøpemaskin for profilkanter 13–30 cm, og formutvalget
- 9 referanseprosjekter med fakta, beskrivelser og bilder
- 5 stillingsutlysninger
- Tekst om åpenhetsloven med svarfrister
- Fakturainformasjon (EHF og faktura-e-post)
- Tillitsmerker: DiBK «Godkjent for ansvarsrett», StartBANK, tariffmerket (Fellesforbundet 2024–2026)
- 12 kontaktpersoner med portrett, direktenummer og e-post (dagens /kontakt-oss/), brukt etter avklaring med oppdragsgiver
- Kontaktperson for stillingen som bas/formann (Mathis Nils Eira), slik dagens side oppgir
- Facebook-lenken er bekreftet. Den er identisk med lenken på dagens side.
- Alle bilder fra dagens side er bekreftet som lov å bruke (29.09.2026).

## C. Antakelser og redaksjonelle valg (bør bekreftes)

**Geografi**
1. Dagens side nevner selv **Askøy, Bergen, Øygarden, «Bergen og omegn» og «hele Vestland»**. Disse områdene er brukt
   i tekst og i `areaServed`. Andre kommuner er ikke nevnt.

**Tekst**
2. Tjenestetekstene bygger på dagens tekst, men er omskrevet, strukturert og utvidet med forklarende tekst og FAQ. Følgende
   formuleringer er nye og bør godkjennes:
   - forklaringen av profilstøp («formes på stedet i én sammenhengende lengde»)
   - «Typiske oppdrag» og «Hvem passer det for?» på hver tjenesteside
   - FAQ-svarene. De bygger på fakta fra dagens side, blant annet gratis befaring, våtromsnormen og kantstøp 13–30 cm.
3. «Gratis befaring» brukes i knapper og CTA. Dagens side skriver både «gratis befaring» og «uforpliktende befaring».
4. Påstandene «en av Bergens ledende aktører» og «en av de ledende betongentreprenørene» er hentet fra dagens side.
5. Stillingsutlysningene er gjengitt litt forenklet. Kravene til betongarbeider og gulvstøper var ikke tydelig adskilt
   på dagens side (faner), så noen felleskrav (norsk/engelsk, førerkort B) er lagt på begge. Bør kontrolleres.
6. Åpenbare skrivefeil fra prosjektsidene er rettet: «Heidelberg Marterials» → «Heidelberg Materials»,
   «PEAB K. Nordan» → «PEAB K. Nordang», «vert» → «vært» med flere.
7. NBF14 Nygårdstangen har ingen beskrivelse på dagens side. Den nye siden har en kort tekst basert på prosjektfaktaene.
8. På dagens referanseside står avdelingen for Øvre Krohnåsen som «Øvre Krohnåsen Bofellesskap», som ser ut som en feil.
   Avdelingen er derfor utelatt.

**Teknikk og drift**
9. Skjemaet sender via Microsoft Graph fra bedriftens egen M365-postboks. Det krever en app-registrering, men ingen DNS-endring.
10. Rate limiting ligger i minnet per funksjonsinstans. Det er godt nok for et lite nettsted.
11. Consent Mode *basic*: Google-skript lastes bare etter samtykke.
12. Kanonisk domene er `https://nsbetong.no` (uten www).
13. `DEMO_MODUS` er på som standard, fordi siden er et forslag. Den settes til `0` ved lansering.
14. Vercel-prosjektet har Vercel Authentication på. Del forslaget med en delingslenke, eller slå av beskyttelsen.
15. Ansattsidene (`/ansatte/<navn>/`) videreføres ikke, og har 301 til `/kontakt-oss/`.
