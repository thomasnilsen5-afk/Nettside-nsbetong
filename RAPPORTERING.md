# Rapportering – måling av henvendelser fra nettsiden

Målet er å kunne svare på tre spørsmål hver måned:

1. **Hvor mange finner oss?** Organisk trafikk, visninger og plassering i Google, og visninger av Google-bedriftsprofilen.
2. **Hvor mange tar kontakt?** Telefonklikk, e-postklikk og skjemainnsendinger.
3. **Hva virker?** Hvilke sider, søkeord og knapper gir henvendelser.

## 1. Hva som måles

Nettsiden sender hendelsene under til `dataLayer`. De når Google bare hvis brukeren har samtykket til analyse
(se [samtykke](#4-samtykke-consent-mode-v2)).

| Hendelse | Når | Parametre | Nøkkelhendelse i GA4? |
| --- | --- | --- | --- |
| `click_phone` | Klikk på en `tel:`-lenke | `link_url`, `placement` (knappens id, f.eks. `ring_mobilfelt`), `link_text`, `page_path` | **Ja** |
| `click_email` | Klikk på en `mailto:`-lenke | `link_url`, `placement`, `link_text`, `page_path` | **Ja** |
| `form_submit` | Takkesiden `/takk/` vises etter vellykket innsending | `form_name` (`kontakt`), `service` (valgt tjeneste), `page_path` | **Ja** (viktigste) |
| `cta_click` | Klikk på knapp/lenke med `data-cta` | `cta_name`, `cta_text`, `link_url`, `page_path` | Nei (analyse) |
| `click_facebook` | Klikk på Facebook-lenke | `link_url`, `placement`, `page_path` | Nei |
| `form_start` | Første tastetrykk i skjemaet | `form_name` | Nei (for frafallsanalyse) |
| `form_error` | Skjemaet kom tilbake med feil | `form_name`, `error` | Nei |
| `consent_update` | Brukeren gjør et samtykkevalg | `consent_analytics`, `consent_marketing` | Nei |

**`cta_name`** sier hvilken knapp som ble brukt og hvor. Eksempler: `ring_hero_forside`, `tilbud_side_betongarbeid`,
`ring_mobilfelt`, `tilbud_mobilfelt`, `ring_header`, `skjema_send`. Navnene står i `data-cta`-attributtene i koden.

`form_submit` telles bare når serveren har godtatt skjemaet og sendt e-posten (redirect til `/takk/?ok=1`).
Spam som stoppes av honningkrukken eller tidssjekken, havner på `/takk/` uten `ok=1` og telles ikke.
Parameteret fjernes fra adressen etterpå, så en oppdatering av siden ikke gir dobbel telling.

## 2. Oppsett steg for steg

Kontoene bør eies av **bedriften** (en Google-konto knyttet til `post@nsbetong.no` eller en administrator), med
leverandøren som bruker. Dagens container `GTM-KKRWNT4` brukes ikke, fordi det ikke er bekreftet hvem som eier den.
Bekreft eierskapet først, og bruk den gjerne videre hvis bedriften eier den.

### 2.1 Google Analytics 4

1. Gå til analytics.google.com → **Admin** → **Opprett eiendom**. Navn: «nsbetong.no», tidssone Norge, valuta NOK.
2. Opprett en **nettdatastrøm** for `https://nsbetong.no`. Noter måle-ID-en (`G-XXXXXXXXXX`).
3. Under **Datainnsamling** setter du datalagring til **14 måneder**.
4. Under **Egendefinerte definisjoner** oppretter du egendefinerte dimensjoner (omfang: hendelse) for:
   `cta_name`, `placement`, `service`, `form_name`.
5. Legg inn interne IP-adresser under **Datafiltre** hvis kontoret har fast IP.

### 2.2 Google Tag Manager (anbefalt)

1. Gå til tagmanager.google.com → **Opprett konto** → container «nsbetong.no», type **Nett**. Noter `GTM-XXXXXXX`.
2. **Variabler** → Datalagvariabler: `cta_name`, `cta_text`, `placement`, `link_url`, `link_text`, `page_path`, `form_name`, `service`.
3. **Tagger**:
   - **Google-tagg** med måle-ID `G-…`, utløser *Initialization – All Pages*.
   - **GA4-hendelse** per hendelse (`click_phone`, `click_email`, `form_submit`, `cta_click`, `click_facebook`, `form_start`),
     med tilhørende parametre fra variablene over.
4. **Utløsere**: *Egendefinert hendelse* med hendelsesnavn lik hendelsen, f.eks. `click_phone`.
   Du kan også lage én utløser med regex `^(click_phone|click_email|form_submit|cta_click|click_facebook|form_start)$`
   og én GA4-hendelsestagg med hendelsesnavn `{{Event}}`.
5. **Samtykke**: Under *Admin → Container-innstillinger* slår du på *Aktiver oversikt over samtykke*.
   Google-taggen har innebygde samtykkesjekker, og GA4 krever `analytics_storage`.
   Eventuelle Google Ads-tagger krever `ad_storage`.
6. Test med **Forhåndsvisning** (Tag Assistant) mot preview-URL-en, og **publiser**.

### 2.3 Koble nettsiden til GTM/GA4

Sett miljøvariabelen i Vercel (*Project → Settings → Environment Variables*) og deploy på nytt:

| Variabel | Verdi | Kommentar |
| --- | --- | --- |
| `GTM_ID` | `GTM-XXXXXXX` | Anbefalt. GA4 settes da opp i GTM. |
| `GA4_ID` | `G-XXXXXXXXXX` | Brukes bare hvis `GTM_ID` er tom. Da lastes gtag.js direkte, og hendelsene over sendes automatisk. |

Samtykkebanneret vises bare når en av dem er satt.

### 2.4 Nøkkelhendelser i GA4

Hendelsene vises i GA4 innen 24 timer etter første treff. Deretter:

1. **Admin → Datavisning → Hendelser**. Hendelsene står i listen.
2. **Admin → Nøkkelhendelser → Ny nøkkelhendelse**. Skriv inn `form_submit`, `click_phone` og `click_email`.
   Du kan gjøre det før hendelsen har kommet inn.
3. Valgfritt: Sett en verdi per nøkkelhendelse (f.eks. et anslag på verdien av en henvendelse) for å se verdien i rapportene.
4. Brukes Google Ads senere, importeres de samme nøkkelhendelsene som konverteringer.

### 2.5 Google Search Console (domeneeiendom)

1. Gå til search.google.com/search-console → **Legg til eiendom** → **Domene** → `nsbetong.no`.
2. Google gir deg en TXT-oppføring: `google-site-verification=…`.
3. Legg den til som en **ny** TXT-oppføring på apex (`@`) hos DNS-leverandøren.
   **Ikke endre eller slå sammen med eksisterende TXT-oppføringer** (SPF `v=spf1 …`, Microsoft-verifisering `MS=…`, DMARC osv.).
   Å legge til en ny, separat TXT-oppføring påvirker ikke e-posten.
4. Klikk **Bekreft**. Domeneeiendommen dekker http/https og www/apex.
5. **Sitemaps** → send inn `https://nsbetong.no/sitemap-index.xml`.
6. Koble Search Console til GA4: GA4 → **Admin → Produktkoblinger → Search Console-koblinger**.

Alternativ uten DNS: HTML-tag. Sett `GSC_VERIFICATION` i Vercel til koden fra Google, og bruk eiendomstypen «Nettadresseprefiks».

### 2.6 Google-bedriftsprofil

1. Sjekk at navn, adresse og telefon er **identiske** med nettsiden:
   «Nilsen & Sture Betong AS», «Storebotn 40, 5309 Kleppestø», «56 15 96 70».
2. Sett nettstedslenken til en UTM-merket adresse, så trafikken fra profilen skilles fra vanlig organisk søk:
   `https://nsbetong.no/?utm_source=google&utm_medium=organic&utm_campaign=bedriftsprofil`
3. Statistikk (visninger, oppringninger, veibeskrivelser, nettstedsklikk) finner du under **Ytelse** i profilen.

### 2.7 UTM-parametere

Bruk UTM på alle lenker dere kontrollerer utenfor nettsiden, så kildene vises riktig i GA4:

| Hvor | Lenke |
| --- | --- |
| Google-bedriftsprofil | `?utm_source=google&utm_medium=organic&utm_campaign=bedriftsprofil` |
| Facebook-siden (om-feltet og innlegg) | `?utm_source=facebook&utm_medium=social&utm_campaign=profil` |
| E-postsignatur | `?utm_source=epost&utm_medium=signatur&utm_campaign=signatur` |
| Annonser/kataloger (f.eks. gulesider) | `?utm_source=<katalog>&utm_medium=referral&utm_campaign=oppforing` |
| Biler, skilt, trykksaker (via QR-kode) | `?utm_source=<bil/skilt>&utm_medium=offline&utm_campaign=<navn>` |

Bruk små bokstaver og ingen mellomrom. Nettsiden beholder UTM-parametrene, og canonical peker alltid på adressen uten parametre.

## 3. Personvern

- Ingen tredjepartskapsler settes før samtykke. Google-skript lastes ikke i det hele tatt før brukeren sier ja (*basic consent mode*).
- Samtykkevalget lagres i `localStorage` (`nsb_samtykke`) og kan endres via «Endre samtykke» i bunnen av alle sider.
- IP-anonymisering skjer automatisk i GA4. `ads_data_redaction` er slått på.
- Personvernsiden (`/personvern/`) beskriver dette. Oppdater den hvis det tas i bruk flere verktøy.

## 4. Samtykke (Consent Mode v2)

| Signal | Standard | «Godta alle» | «Bare nødvendige» |
| --- | --- | --- | --- |
| `analytics_storage` | denied | granted | denied |
| `ad_storage` | denied | granted | denied |
| `ad_user_data` | denied | granted | denied |
| `ad_personalization` | denied | granted | denied |
| `functionality_storage`, `security_storage` | granted | granted | granted |

Med «Tilpass» kan brukeren velge analyse og markedsføring hver for seg.

Siden GTM ikke lastes uten samtykke, vil GA4 vise færre brukere enn det reelle antallet besøkende.
Det er forventet. Telefonklikk og skjema fra dem som avslår, synes likevel i e-postinnboksen og i bedriftsprofilen.
Tell derfor alltid **faktiske henvendelser** i tillegg (se malen).

## 5. Månedlig rapportmal

Kopier malen inn i et dokument hver måned. Tall hentes fra GA4, Search Console og bedriftsprofilen.
Sammenlign alltid med forrige måned og samme måned i fjor.

```markdown
# Månedsrapport nsbetong.no – <måned år>

## Oppsummering
- <2–3 setninger: hva gikk bra, hva gikk dårlig, hva gjør vi neste måned>

## Henvendelser (viktigst)
| Kilde | Denne måneden | Forrige måned | Endring | Samme måned i fjor |
| --- | --- | --- | --- | --- |
| Skjemainnsendinger (GA4 `form_submit`) | | | | |
| Telefonklikk på nettsiden (GA4 `click_phone`) | | | | |
| E-postklikk (GA4 `click_email`) | | | | |
| Oppringninger fra Google-bedriftsprofilen | | | | |
| Faktiske henvendelser registrert av bedriften* | | | | |
*Tell henvendelser som kom inn på skjema/telefon/e-post og spurte «hvor fant du oss?», hvis mulig.

Henvendelser per tjeneste (GA4 `form_submit` → dimensjon `service`):
| Tjeneste | Antall |
| --- | --- |

Mest brukte knapper (GA4 `cta_click` → `cta_name`, topp 5):
| Knapp | Klikk |
| --- | --- |

## Organisk trafikk (GA4 → Anskaffelse → Trafikkanskaffelse, kanal «Organic Search»)
| Mål | Denne måneden | Forrige måned | Endring |
| --- | --- | --- | --- |
| Økter fra organisk søk | | | |
| Nøkkelhendelser fra organisk søk | | | |
| Konverteringsrate organisk (nøkkelhendelser/økter) | | | |

## Google-søk (Search Console → Ytelse → Søkeresultater)
| Mål | Denne måneden | Forrige måned | Endring |
| --- | --- | --- | --- |
| Klikk | | | |
| Visninger | | | |
| Gj.snittlig klikkfrekvens (CTR) | | | |
| Gj.snittlig plassering | | | |

### Per søkeord (målsøkeord + topp 10 etter klikk)
| Søkeord | Klikk | Visninger | CTR | Plassering | Endring plassering |
| --- | --- | --- | --- | --- | --- |
| betongentreprenør bergen | | | | | |
| betongarbeid bergen | | | | | |
| gulvstøp bergen | | | | | |
| flytavretting bergen | | | | | |
| kantstøp / profilstøp | | | | | |
| nybygg entreprenør bergen | | | | | |
| flis og mur / våtrom bergen | | | | | |

### Per side
| Side | Klikk | Visninger | CTR | Plassering | Nøkkelhendelser (GA4) |
| --- | --- | --- | --- | --- | --- |
| / | | | | | |
| /betongarbeid/ | | | | | |
| /gulvstop-og-flytavretting/ | | | | | |
| /vei-og-kantstop/ | | | | | |
| /nybygg/ | | | | | |
| /flis-og-murarbeid/ | | | | | |
| /referanser/ | | | | | |
| /kontakt-oss/ | | | | | |

## Google-bedriftsprofil (Profil → Ytelse)
| Mål | Denne måneden | Forrige måned | Endring |
| --- | --- | --- | --- |
| Visninger totalt (søk + kart) | | | |
| Oppringninger | | | |
| Veibeskrivelser | | | |
| Nettstedsklikk | | | |
| Nye anmeldelser / snittkarakter | | | |

## Teknisk helse
- Search Console: indekserte sider ___, sider med feil ___, Core Web Vitals (mobil) OK/ikke OK
- Skjema testet og mottatt i innboksen (dato): ___

## Tiltak neste måned
1.
2.
3.
```

## 6. Forslag til Looker Studio-dashbord

Lag én rapport i lookerstudio.google.com med disse datakildene:

- **GA4** (innebygd kobling)
- **Search Console**, to kilder: «Nettstedets visninger» og «URL-visninger» (innebygd kobling)
- **Google-bedriftsprofil**: Det finnes ingen gratis innebygd kobling. Før tallene inn månedlig i et Google Regneark
  (kolonner: `måned, visninger, oppringninger, veibeskrivelser, nettstedsklikk`) og bruk det som datakilde.
  Et alternativ er en betalt kobling (f.eks. Supermetrics eller Windsor.ai).

Sett datointervall-kontroll øverst med standard «Forrige måned» og sammenligning «Forrige periode».

**Side 1 – Oversikt (for daglig leder)**
- Poengkort: Skjemainnsendinger, Telefonklikk, E-postklikk, Oppringninger (bedriftsprofil), Organiske økter, Klikk fra Google-søk. Alle med endring mot forrige periode.
- Tidsserie: nøkkelhendelser per uke, fordelt på `form_submit` / `click_phone` / `click_email`.
- Stolpediagram: nøkkelhendelser per kanal (Organic Search, Direct, Referral, Organic Social).

**Side 2 – Henvendelser**
- Tabell: `cta_name` × antall `cta_click`, sortert synkende.
- Tabell: `service` × antall `form_submit`.
- Tabell: landingsside × økter × nøkkelhendelser × konverteringsrate.
- Enhetsfordeling (mobil/desktop) for `click_phone`.

**Side 3 – Google-søk**
- Tabell: søkeord × klikk × visninger × CTR × plassering. Filter for målsøkeordene (regex `betong|gulvstøp|flytavrett|kantstøp|profilstøp|nybygg|flis|mur|våtrom`).
- Tabell: side × klikk × visninger × plassering.
- Tidsserie: gj.snittlig plassering for målsøkeordene.

**Side 4 – Google-bedriftsprofil**
- Poengkort og tidsserie fra regnearket: visninger, oppringninger, veibeskrivelser, nettstedsklikk.

Del rapporten med bedriften med «Kan se»-tilgang. Planlegg gjerne månedlig PDF-utsendelse på e-post
(*Del → Planlegg levering*).
