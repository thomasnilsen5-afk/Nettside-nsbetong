# Overlevering – fra forslag til ny nsbetong.no

Dette dokumentet beskriver hvordan siden settes i drift **hvis bedriften takker ja**. Frem til da er siden i
demomodus på en `vercel.app`-adresse. Ingen DNS er endret, og dagens nsbetong.no er ikke påvirket.

## 0. Forutsetninger før bytte

- [ ] Bedriften har godkjent tekst, bilder og design skriftlig.
- [ ] Alle `[MANGLER: …]` i [MANGLER.md](MANGLER.md) er løst, og `grep -r "MANGLER" src` gir ingen treff.
- [ ] Innhold og bilder fra dagens side er hentet (`npm run hent-gammel-side`), og [INNHOLDSKART.md](INNHOLDSKART.md) er fullført.
- [ ] Logoen ligger i `public/img/NS.svg`, og `logoTilgjengelig: true` er satt i `src/data/site.ts`.
- [ ] Eierskap er avklart. Bedriften bør eie GitHub-repoet (eller få en kopi), Vercel-prosjektet (eller være eier i teamet), GTM, GA4 og Search Console.
- [ ] Det er avklart hvem som har tilgang til DNS hos domeneleverandøren, og hvem som kan logge inn på WordPress-serveren til rollback-perioden er over.

## 1. Miljøvariabler i Vercel

*Project → Settings → Environment Variables.* Byggetidsvariabler krever en ny deploy etter endring.

| Variabel | Miljø | Verdi | Formål |
| --- | --- | --- | --- |
| `DEMO_MODUS` | Production | `0` | **Slår av demo**: fjerner banner og noindex, og skjemaet sender e-post. Uten denne er siden i demo. |
| `DEMO_MODUS` | Preview | (tom) | Preview-adresser forblir demo/noindex. |
| `GTM_ID` | Production | `GTM-…` | Bedriftens egen GTM-container |
| `GA4_ID` | Production | `G-…` | Bare hvis GTM ikke brukes |
| `GSC_VERIFICATION` | Production | (valgfri) | HTML-tag-verifisering for Search Console |
| `KONTAKT_TIL` | Alle | `post@nsbetong.no` | Mottaker av skjemaet |
| `EPOST_LEVERANDOR` | Alle | `graph` eller `resend` | Hvilken tjeneste som sender |
| `MS_TENANT_ID` | Production | (hemmelig) | Microsoft 365 / Entra ID tenant-ID |
| `MS_CLIENT_ID` | Production | (hemmelig) | App-registreringens klient-ID |
| `MS_CLIENT_SECRET` | Production | (hemmelig, *Sensitive*) | Klienthemmelighet. Noter utløpsdato. |
| `MS_AVSENDER` | Production | `post@nsbetong.no` | Postboksen som sender (kan også være en egen `skjema@`) |
| `RESEND_API_KEY` | Production | (hemmelig) | Bare ved `EPOST_LEVERANDOR=resend` |
| `RESEND_FRA` | Production | `Nettside <skjema@nsbetong.no>` | Avsender hos Resend |
| `SKJEMA_TESTMODUS` | Preview | `1` | Skjemaet sender ikke, men går til takkesiden |

Hemmeligheter skal **bare** ligge i Vercel. De skal aldri ligge i koden eller i Git.

### 1.1 E-post via Microsoft 365 (anbefalt – ingen DNS-endring)

Skjemaet sendes via Microsoft Graph fra en postboks i bedriftens egen M365. Det krever **ingen** endringer i
MX, SPF eller DKIM, fordi e-posten sendes fra Microsoft sine egne servere.

1. entra.microsoft.com → **App-registreringer → Ny registrering**. Navn: «nsbetong.no kontaktskjema», enkelt tenant.
2. **API-tillatelser → Microsoft Graph → Programtillatelser → `Mail.Send`**, og gi administratorsamtykke.
3. **Sertifikater og hemmeligheter → Ny klienthemmelighet** (f.eks. 24 måneder). Legg den i `MS_CLIENT_SECRET`,
   og sett en påminnelse før den utløper.
4. **Begrens appen til én postboks.** Dette er viktig, for uten begrensning kan appen sende som alle i organisasjonen.
   I Exchange Online bruker du *RBAC for Applications* (anbefalt av Microsoft) eller en
   *Application Access Policy* som begrenser appen til avsenderpostboksen (`MS_AVSENDER`).
5. Sett `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`, `MS_AVSENDER` og `EPOST_LEVERANDOR=graph`.
6. Test fra preview med `SKJEMA_TESTMODUS` tom og `DEMO_MODUS=0` bare for testen, og sjekk at e-posten kommer frem.
   «Svar» på e-posten går til kunden (Reply-To).

**Alternativ: Resend.** Resend krever at avsenderdomenet verifiseres med **nye** DNS-oppføringer, som regel på et
underdomene som `send.nsbetong.no`. Dette endrer ikke eksisterende oppføringer, men det er en DNS-endring og må
avtales med den som drifter e-posten. Derfor anbefales Graph.

## 2. DNS-plan for bytte

### 2.1 Hva som endres – og hva som IKKE røres

| Oppføring | Handling |
| --- | --- |
| `nsbetong.no` **A** (apex) | **Endres** til Vercel |
| `www.nsbetong.no` **CNAME** (eller A) | **Endres** til Vercel |
| **MX** | Røres ikke. E-post ligger hos Microsoft 365. |
| **TXT** på apex (SPF `v=spf1 include:spf.protection.outlook.com …`, `MS=…`-verifisering, øvrige) | Røres ikke |
| `_dmarc` **TXT** | Røres ikke |
| `selector1._domainkey`, `selector2._domainkey` **CNAME** (DKIM for M365) | Røres ikke. Merk at dette er CNAME-oppføringer som ikke skal endres selv om www-CNAME endres. |
| `autodiscover` **CNAME**, `enterpriseenrollment`/`enterpriseregistration` **CNAME**, `_sip`/`_sipfederationtls` **SRV**, `lyncdiscover`/`sip` **CNAME** | Røres ikke |
| **AAAA** på apex/www (hvis de finnes og peker til gammel server) | Fjernes. Vercel bruker IPv4 på apex, og en gammel AAAA vil sende IPv6-brukere til den gamle serveren. Noter verdien for rollback. |
| **CAA** (hvis finnes) | Sjekk at `letsencrypt.org` er tillatt, ellers kan ikke Vercel utstede sertifikat. Legg til en ny CAA ved behov, og ikke fjern eksisterende. |

Den eneste mulige **nye** oppføringen er Search Console-verifiseringen (TXT `google-site-verification=…`, se
RAPPORTERING.md). Den legges til separat og endrer ingen eksisterende TXT.

### 2.2 Tidslinje

**T–7 dager**
1. Ta en **fullstendig eksport/skjermbilde av alle DNS-oppføringer** for nsbetong.no og lagre dem, for eksempel
   som `dns-for-bytte-<dato>.txt`. Dette er rollback-grunnlaget.
2. Ta backup av WordPress (filer og database), og la den gamle serveren stå urørt i minst 30 dager.
3. Hent alt innhold og alle bilder (`npm run hent-gammel-side`), og sjekk Search Console for URL-er som trenger 301.
4. Legg domenet til i Vercel: *Project → Settings → Domains* → legg til `nsbetong.no` og `www.nsbetong.no`
   (www settes til å videresende til `nsbetong.no` med 308). Vercel viser **nøyaktig hvilke verdier** som skal brukes.
   Bruk de verdiene, ikke eksempelverdiene under.

**T–2 dager**
5. Senk TTL på apex **A** og **www** til 300 sekunder, så bytte og eventuell rollback slår raskt igjennom. Endre bare TTL på disse to.
6. Sett `DEMO_MODUS=0` og øvrige produksjonsvariabler i Vercel for *Production*. Deploy produksjon og test den på `*.vercel.app`-adressen:
   skjema (ekte e-post kommer frem), samtykkebanner, GTM Preview, alle sider, 404, redirects.

**Byttedag** (helst tirsdag–torsdag formiddag, ikke fredag)
7. Endre **bare** disse to oppføringene:
   - `nsbetong.no` **A** → verdien Vercel viser (typisk `76.76.21.21`)
   - `www` **CNAME** → verdien Vercel viser (typisk `cname.vercel-dns.com` eller en prosjektspesifikk `…vercel-dns-0xx.com`)
   - Fjern eventuell gammel **AAAA** på apex/www.
8. Vent til Vercel viser «Valid Configuration» og har utstedt SSL (vanligvis noen minutter).
9. Kontroller:
   - `https://nsbetong.no/` svarer fra Vercel (sjekk responsheader `server: Vercel`).
   - `https://www.nsbetong.no/betongarbeid/` → 308 → `https://nsbetong.no/betongarbeid/`.
   - `http://` → `https://`.
   - Alle 11 gamle URL-er gir 200, og `/sitemap.xml` videresendes.
   - Skjemaet sender til `post@nsbetong.no`.
   - **E-post virker som før**: send en e-post til og fra `post@nsbetong.no` fra en ekstern adresse, og sjekk at MX/SPF/DKIM er uendret
     (f.eks. `nslookup -type=mx nsbetong.no`, `nslookup -type=txt nsbetong.no`).
10. Search Console: send inn sitemap, bruk «Inspeksjon av nettadresse» på forsiden og tjenestesidene, og be om indeksering.
11. Oppdater lenken i Google-bedriftsprofilen med UTM (se RAPPORTERING.md).

**T+2 dager:** Sett TTL tilbake til vanlig verdi (f.eks. 3600).
**T+30 dager:** Hvis alt er stabilt, kan den gamle WordPress-installasjonen avvikles etter avtale med bedriften.

### 2.3 Rollback

Hvis noe går galt (feil som ikke kan rettes raskt, skjema som ikke virker, e-postproblemer):

1. Sett apex **A**, **www** og eventuelle **AAAA** tilbake til verdiene fra DNS-eksporten i steg 1.
   Med TTL 300 slår dette igjennom på noen minutter.
2. Rør ikke andre oppføringer. Hvis e-posten har problemer, er årsaken nesten aldri web-oppføringene.
   Sammenlign alle oppføringer med eksporten.
3. Den gamle WordPress-serveren svarer igjen. Sertifikatet der er uendret, fordi det ikke er fjernet.
4. Feil i selve nettsiden (ikke DNS) kan også rulles tilbake i Vercel: *Deployments → forrige deployment → Promote / Instant Rollback*.

## 3. Drift etter overtakelse

- **Innhold**: se README.md. Endringer publiseres automatisk ved push til produksjonsgrenen.
- **Oppdateringer**: Kjør `npm outdated` og `npm update` et par ganger i året. Bygg og sjekk (`npm run build && npm run check`) før push.
- **Hemmeligheter**: Microsoft-klienthemmeligheten utløper. Legg inn en ny i Entra og Vercel før den utløper.
- **Overvåking**: Sjekk Search Console (indeksering, Core Web Vitals) og at skjemaet virker hver måned. Se malen i RAPPORTERING.md.
- **Rate limiting**: Funksjonen har en enkel grense i minnet. Ved mye spam kan dere legge til en regel i Vercel Firewall for `POST /api/kontakt/`.

## 4. Git og Vercel i dette forslaget

- Repo: `thomasnilsen5-afk/Nettside-nsbetong`, gren `claude/nilsen-sture-betong-site-sqnpw8`.
- Vercel-prosjekt: `nsbetong-forslag` (ikke koblet til noe domene).
- Ved overtakelse: Overfør repoet og Vercel-prosjektet til bedriften (GitHub: *Settings → Transfer*, Vercel: *Settings → Transfer project*),
  eller la bedriften opprette egne og koble til repoet. Sett en `main`-gren som produksjonsgren.
