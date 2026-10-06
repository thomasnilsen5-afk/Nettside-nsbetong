// Innhold for tjenestesidene. Bygger på teksten fra dagens nsbetong.no, forbedret og strukturert.
// Hver side har unik tekst – ikke kopier avsnitt mellom tjenester.
// Bilder: legg filer i bilder-inn/<mappe>/, kjør `npm run bilder`, og importer dem her (se README.md).
import type { ImageMetadata } from 'astro';

import betongHero from '../assets/bilder/betongarbeid/betongpumpe-og-forskaling-byggeplass.jpg';
import betong1 from '../assets/bilder/betongarbeid/utlegging-av-fersk-betong.jpg';
import betong2 from '../assets/bilder/betongarbeid/stop-av-trappeparti-i-betong.jpg';
import betong3 from '../assets/bilder/betongarbeid/stottemur-langs-vei.jpg';
import betong4 from '../assets/bilder/betongarbeid/betongtrapp-og-stottemurer.jpg';

import gulvHero from '../assets/bilder/gulvstop/gulvstop-med-betongslange.jpg';
import gulv1 from '../assets/bilder/gulvstop/gulvstop-pa-armering.jpg';
import gulv2 from '../assets/bilder/gulvstop/avretting-av-betonggulv-innendors.jpg';
import gulv3 from '../assets/bilder/gulvstop/slipt-betonggulv-i-stue.jpg';
import gulv4 from '../assets/bilder/gulvstop/betonggulv-detalj.jpg';

import kantHero from '../assets/bilder/kantstop/kantstopemaskin-i-arbeid.jpg';
import kant1 from '../assets/bilder/kantstop/profilstop-av-kant.jpg';
import kant2 from '../assets/bilder/kantstop/etterarbeid-pa-stopt-kant.jpg';
import kant3 from '../assets/bilder/kantstop/stopt-kantstein-langs-asfalt.jpg';
import formAvvisende from '../assets/bilder/kantstop/former-avvisende-kantstein.png';
import formIkkeAvvisende from '../assets/bilder/kantstop/former-ikke-avvisende-kantstein.png';
import formFender from '../assets/bilder/kantstop/former-fender.png';

import nyHero from '../assets/bilder/nybygg/betongarbeidere-pa-byggeplass.jpg';
import ny1 from '../assets/bilder/nybygg/stopt-fundament-og-grunnmur.jpg';
import ny2 from '../assets/bilder/nybygg/gjennomgang-av-byggetegninger.jpg';
import ny3 from '../assets/bilder/nybygg/3d-modell-av-byggeprosjekt.jpg';

import flisHero from '../assets/bilder/flis/flislagt-bad-med-speil.jpg';
import flis1 from '../assets/bilder/flis/bad-med-flis-pa-gulv-og-vegg.jpg';
import flis2 from '../assets/bilder/flis/flislagt-dusjvegg.jpg';
import flis3 from '../assets/bilder/flis/flislagt-terrasse-med-utsikt.jpg';
import flis4 from '../assets/bilder/flis/flisfuge-detalj.jpg';

export type Faq = { sporsmal: string; svar: string };
export type Bilde = { src: ImageMetadata; alt: string };

export type Tjeneste = {
  slug: string;
  navn: string;
  kortnavn: string;
  tittel: string; // <title>, maks ca. 60 tegn
  beskrivelse: string; // meta description, maks ca. 155 tegn
  h1: string;
  ingress: string;
  kort: string; // brukes på tjenestekort
  fakta?: string; // kort faktalinje under ingressen (fra bedriftens egen side)
  intro: string[];
  inngaarTittel: string;
  inngaar: string[];
  oppdrag: string[];
  passerFor: string[];
  hvorfor: string[];
  faq: Faq[];
  relaterte: string[];
  serviceType: string;
  hero: Bilde;
  bilder: Bilde[];
  former?: { tittel: string; tekst: string; bilder: Bilde[] };
};

// Felles argumenter fra dagens side («Hvorfor velge Nilsen & Sture Betong»).
const felles = [
  'Konkurransedyktige priser',
  'Liten organisasjon med korte beslutningsveier',
  'Formenn som snakker norsk, og arbeidere med lang erfaring i Norge',
  'Tett samarbeid med leverandører og kunder',
  'Fokus på HMS, kvalitet og kvalitetskontroll',
];

export const tjenester: Tjeneste[] = [
  {
    slug: 'betongarbeid',
    navn: 'Betongarbeid',
    kortnavn: 'Betongarbeid',
    tittel: 'Betongarbeid i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Betongarbeid i Bergen, på Askøy og i Vestland: fundamenter, grunnmurer, støttemurer, trapper og gulv. Over 20 års erfaring. Gratis befaring.',
    h1: 'Betongarbeid i Bergen og omegn',
    ingress:
      'Fra små støpekanter til store og kompliserte betongkonstruksjoner – for privatpersoner, bedrifter og det offentlige.',
    kort: 'Fundamenter, ringmurer, grunnmurer, støttemurer, trapper og gulv.',
    intro: [
      'Som en av de ledende betongentreprenørene i Bergen og omegn utfører Nilsen & Sture Betong alt innen betongarbeid. Ingen prosjekter er for store eller for små: vi støper alt fra en enkel kant eller trapp hjemme hos deg til store betongkonstruksjoner i nærings- og offentlige bygg.',
      'Betong er et allsidig materiale med lang levetid og stor styrke, og det er et av de mest brukte byggematerialene i vår tid. Avhengig av konstruksjonen kan betongen støpes i faste former eller i glidende forskaling. Det krever fagfolk som kan forskaling, armering og støp – og som vet hva som skal til for at resultatet holder i mange tiår.',
      'Etter mer enn 20 år i bransjen har vi bred kunnskap om betong og betongarbeider. Vi liker utfordringer, og finner gode løsninger sammen med kundene våre. Vi har også lang erfaring med forstøtningsmurer, vei- og kaiarbeid og større utbygginger.',
    ],
    inngaarTittel: 'Vi utfører alt innen betongarbeid, blant annet',
    inngaar: ['Fundamenter', 'Ringmurer', 'Grunnmurer', 'Gulvstøp', 'Støttemurer og forstøtningsmurer', 'Trapper'],
    oppdrag: [
      'Grunnmur og fundament til bolig, garasje eller tilbygg',
      'Støttemurer og trapper i hager og uteområder',
      'Betongarbeid i vei-, kai- og anleggsprosjekter',
      'Store betongkonstruksjoner i nærings- og offentlige bygg',
    ],
    passerFor: [
      'Privatpersoner som skal bygge eller utbedre mur, trapp, fundament eller grunnmur.',
      'Byggherrer og entreprenører som trenger en erfaren betongentreprenør.',
      'Kommuner og offentlige oppdragsgivere – vi er registrert i StartBANK og godkjent for ansvarsrett.',
    ],
    hvorfor: ['Leveringsdyktighet', ...felles],
    faq: [
      {
        sporsmal: 'Tar dere små jobber for privatpersoner?',
        svar: 'Ja. Ingen jobb er for liten eller for stor. Vi jobber for privatpersoner, næringsdrivende og kommunale aktører.',
      },
      {
        sporsmal: 'Koster befaringen noe?',
        svar: 'Nei, vi tilbyr gratis befaring. Ring 56 15 96 70 eller send en forespørsel, så avtaler vi et tidspunkt.',
      },
      {
        sporsmal: 'Hva koster betongarbeid?',
        svar: 'Prisen avhenger av omfang, tilkomst, grunnforhold og hvor mye forskaling og armering som trengs. Etter befaringen får du et tilbud med konkurransedyktig pris.',
      },
      {
        sporsmal: 'Kan dere ta ansvarsrett?',
        svar: 'Ja. Nilsen & Sture Betong er godkjent for ansvarsrett av Direktoratet for byggkvalitet.',
      },
      {
        sporsmal: 'Hvor holder dere til?',
        svar: 'Vi holder til i Storebotn på Askøy, og tar oppdrag i Bergen og omegn og ellers i Vestland.',
      },
    ],
    relaterte: ['nybygg', 'gulvstop-og-flytavretting', 'vei-og-kantstop'],
    serviceType: 'Betongarbeid',
    hero: { src: betongHero, alt: 'Betongpumpe og forskaling på en byggeplass med armering klar for støp' },
    bilder: [
      { src: betong1, alt: 'Betongarbeider legger ut fersk betong i forskaling' },
      { src: betong2, alt: 'Støp av trappeparti i betong' },
      { src: betong3, alt: 'Støpt støttemur i betong langs vei' },
      { src: betong4, alt: 'Betongtrapp og støttemurer i et uteområde' },
    ],
  },
  {
    slug: 'gulvstop-og-flytavretting',
    navn: 'Gulvstøp og flytavretting',
    kortnavn: 'Gulvstøp',
    tittel: 'Gulvstøp og flytavretting i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Gulvstøp og flytavretting på Askøy og i Bergen: betonggulv med glattet, kostet eller skuret overflate, epoxy og belegg. Fra garasje til industribygg.',
    h1: 'Gulvstøp og flytavretting i Bergen',
    ingress:
      'Betonggulv i alle overflater – fra private garasjer og eneboliger til store industribygg.',
    kort: 'Betonggulv i alle overflater, flytavretting, epoxy og belegg.',
    fakta: 'Egen gulvavdeling med 8 gulvarbeidere og til sammen ca. 60 års erfaring.',
    intro: [
      'Gulvavdelingen til Nilsen & Sture Betong består av 8 dyktige gulvarbeidere med til sammen ca. 60 års erfaring. De har bred kompetanse innen gulvarbeid, og vi støper gulv i alt fra private garasjer og eneboliger til store industribygg. Med andre ord er ingen jobb for liten eller for stor.',
      'Et godt gulv starter med riktig underlag. Vi tar hele jobben: rigg av isopor, armering og radonmembran, selve gulvstøpen og overflaten gulvet skal ha. Betonggulvet kan leveres stålglattet, kostet eller skuret, avhengig av hva det skal brukes til.',
      'Skal gulvet tåle mye slitasje, søl eller trafikk, kan vi legge epoxy, slurrybelegg eller sklisikre gulv, og merke opp med ledelinjer. Er det behov for et helt plant underlag før parkett, flis eller belegg, utfører vi flytavretting.',
      'Vårt nedslagsfelt er Askøy, Bergen og omegn.',
    ],
    inngaarTittel: 'Våre arbeidsområder innen gulvarbeid',
    inngaar: [
      'Rigg av isopor og armering, samt radonmembran',
      'Betonggulv med stålglattede, kostede og skurede overflater',
      'Epoxy',
      'Slurrybelegg og sklisikre gulv',
      'SL – slett, glatt epoxybelegg',
      'Tokomponent betongmaling',
      'Asfaltmaling',
      'Ledelinjer',
      'Flytavretting',
    ],
    oppdrag: [
      'Gulv i private garasjer og eneboliger',
      'Gulv i nærings-, lager- og industribygg',
      'Slitesterke og sklisikre gulv med epoxy eller belegg',
      'Flytavretting før nytt gulvbelegg',
    ],
    passerFor: [
      'Privatpersoner som skal støpe gulv i garasje, kjeller eller ny bolig.',
      'Bedrifter som trenger slitesterke gulv i lager, verksted eller industri.',
      'Byggherrer og entreprenører som trenger en egen gulvavdeling i prosjektet.',
    ],
    hvorfor: ['Egen gulvavdeling med 8 gulvarbeidere', 'Leveringsdyktighet', ...felles],
    faq: [
      {
        sporsmal: 'Hvilke overflater kan betonggulvet få?',
        svar: 'Vi leverer betonggulv med stålglattet, kostet eller skuret overflate. I tillegg kan vi legge epoxy, slurrybelegg, SL-belegg og betongmaling.',
      },
      {
        sporsmal: 'Hva er forskjellen på gulvstøp og flytavretting?',
        svar: 'Gulvstøp er selve betonggulvet, gjerne med isolasjon og armering. Flytavretting er en selvutjevnende masse som gir en helt plan overflate, for eksempel før parkett eller flis.',
      },
      {
        sporsmal: 'Legger dere radonmembran?',
        svar: 'Ja. Vi rigger isopor, armering og radonmembran før gulvet støpes.',
      },
      {
        sporsmal: 'Hvordan får jeg pris på gulvstøp?',
        svar: 'Ring oss på 56 15 96 70 eller send en forespørsel. Vi tilbyr gratis befaring og gir deg et tilbud.',
      },
    ],
    relaterte: ['flis-og-murarbeid', 'betongarbeid', 'nybygg'],
    serviceType: 'Gulvstøp og flytavretting',
    hero: { src: gulvHero, alt: 'Gulvstøp der betong legges ut med betongslange' },
    bilder: [
      { src: gulv1, alt: 'Fersk betong støpes på armering til nytt gulv' },
      { src: gulv2, alt: 'Avretting av betonggulv innendørs i et nybygg' },
      { src: gulv3, alt: 'Ferdig slipt betonggulv i en stue' },
      { src: gulv4, alt: 'Nærbilde av betonggulv med ferdig overflate' },
    ],
  },
  {
    slug: 'vei-og-kantstop',
    navn: 'Vei og kantstøp',
    kortnavn: 'Kantstøp',
    tittel: 'Kantstøp for vei og fortau i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Kantstøp og profilstøp med egen kantstøpemaskin: profilkanter fra 13 til 30 cm for vei, fortau og parkeringsplasser i Bergen og omegn.',
    h1: 'Vei og kantstøp – profilstøp for vei og fortau',
    ingress:
      'Med egen kantstøpemaskin støper vi profilkanter fra 13 til 30 cm ved vei, fortau, parkeringsplasser og mer.',
    kort: 'Profilstøp med egen kantstøpemaskin – kanter fra 13 til 30 cm.',
    fakta: 'Egen kantstøpavdeling med 4 arbeidere og egen kantstøpemaskin.',
    intro: [
      'Kantstøpavdelingen til Nilsen & Sture Betong består av 4 dyktige arbeidere. Med vår egen kantstøpemaskin støper vi profilkanter fra 13 cm og opp til 30 cm. Trenger du høyere kant enn dette, har vi faste samarbeidspartnere som leverer ønsket høyde.',
      'Ved profilstøp formes kanten på stedet i én sammenhengende lengde. Det gir en solid kant uten skjøter mellom enkeltelementer, som følger linjene i veien og tåler trafikk og brøyting.',
      'Vi utfører kantstøp ved vei, fortau, gang- og sykkelveier, parkeringsplasser og mer. Oppdragsgiverne er kommuner og offentlige byggherrer, entreprenører og private utbyggere – og privatpersoner som trenger en god kant rundt innkjørsel eller parkering.',
    ],
    inngaarTittel: 'Dette gjør vi',
    inngaar: [
      'Profilstøp av kant med egen kantstøpemaskin',
      'Profilkanter fra 13 til 30 cm',
      'Avvisende og ikke-avvisende kantstein',
      'Fenderkant',
      'Andre kantformer etter ønske',
      'Høyere kanter i samarbeid med faste partnere',
    ],
    oppdrag: [
      'Kant mellom kjørebane og fortau',
      'Gang- og sykkelveier',
      'Parkeringsplasser og innkjørsler',
      'Kanter i boligfelt og næringsområder',
    ],
    passerFor: [
      'Kommuner og offentlige byggherrer som bygger eller rehabiliterer vei og fortau.',
      'Vei- og anleggsentreprenører som trenger en underleverandør på kant.',
      'Private og profesjonelle aktører med parkeringsplasser og uteområder.',
    ],
    hvorfor: [
      'Egen kantstøpemaskin med profilkanter fra 13 til 30 cm',
      'Leveringsdyktighet og fleksibilitet',
      'Konkurransedyktige priser',
      'Formenn som snakker norsk',
      'Fokus på HMS og kvalitetskontroll',
    ],
    faq: [
      {
        sporsmal: 'Hvor høye kanter kan dere støpe?',
        svar: 'Med vår kantstøpemaskin støper vi profilkanter fra 13 til 30 cm. Trenger du høyere kant, leverer vi det i samarbeid med faste samarbeidspartnere.',
      },
      {
        sporsmal: 'Hvilke former har dere?',
        svar: 'Vi har former for avvisende og ikke-avvisende kantstein og fenderkant. Trenger du en annen form, kan den lages etter ønske.',
      },
      {
        sporsmal: 'Hva er profilstøp?',
        svar: 'Profilstøp betyr at kanten formes og støpes på stedet med maskin, i én sammenhengende lengde, i stedet for å settes sammen av ferdige elementer.',
      },
      {
        sporsmal: 'Tar dere kantstøp for privatpersoner?',
        svar: 'Ja. Vi hjelper både privatpersoner og profesjonelle aktører med kantstøp i Bergen og omegn.',
      },
    ],
    relaterte: ['betongarbeid', 'nybygg'],
    serviceType: 'Kantstøp og profilstøp',
    hero: { src: kantHero, alt: 'Kantstøpemaskin i arbeid på en parkeringsplass' },
    bilder: [
      { src: kant1, alt: 'Profilstøp av kant med kantstøpemaskin' },
      { src: kant2, alt: 'Etterarbeid på nystøpt kant langs asfalt' },
      { src: kant3, alt: 'Ferdig støpt kantstein langs asfaltert vei' },
    ],
    former: {
      tittel: 'Vårt utvalg av former',
      tekst: 'Her er formene vi har i dag. Trenger du en annen form, kan den lages etter ønske. Mål i millimeter.',
      bilder: [
        { src: formAvvisende, alt: 'Tegning av avvisende kantstein i høydene 13, 16, 19 og 22 cm' },
        { src: formIkkeAvvisende, alt: 'Tegning av ikke-avvisende kantstein i tre profiler' },
        { src: formFender, alt: 'Tegning av to fenderprofiler' },
      ],
    },
  },
  {
    slug: 'nybygg',
    navn: 'Nybygg',
    kortnavn: 'Nybygg',
    tittel: 'Nybygg – betongentreprenør i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Nybygg av boliger, garasjer, næringsbygg, skoler og offentlige bygg. 35 håndverkere og 4 lærlinger. Askøy, Bergen, Øygarden og omegn.',
    h1: 'Nybygg – boliger, næringsbygg og offentlige bygg',
    ingress:
      'Vi utfører alle typer byggeoppdrag – for privatpersoner, næringslivet og det offentlige.',
    kort: 'Boliger, garasjer, næringsbygg, skoler og andre offentlige bygg.',
    fakta: 'Nybyggavdeling med 35 håndverkere og 4 lærlinger.',
    intro: [
      'Nybyggavdelingen til Nilsen & Sture Betong består av 35 dyktige håndverkere. I tillegg har vi 4 lærlinger. Vi har lang erfaring og utfører alle typer byggeoppdrag: nybygg av boliger, garasjer, næringsbygg, skoler og andre offentlige bygg.',
      'Vi påtar oss arbeid for privatpersoner, næringslivskunder og det offentlige. Nedslagsfeltet vårt er hovedsakelig Askøy, Bergen, Øygarden og nærliggende kommuner.',
      'I et nybygg er betongen grunnlaget for alt som kommer etter. Derfor jobber vi etter tegning og avtalt fremdrift, og vi prioriterer å være punktlige ved både oppstart og ferdigstillelse. Ved behov kan betongavdelingen vår trå til, og gulvavdelingen kan støpe gulvene i samme prosjekt.',
    ],
    inngaarTittel: 'Typiske nybygg vi utfører',
    inngaar: ['Boliger', 'Garasjer', 'Næringsbygg', 'Skoler', 'Andre offentlige bygg'],
    oppdrag: [
      'Nybygg for private byggherrer',
      'Nærings- og industribygg',
      'Skoler og andre offentlige bygg',
      'Større utbygginger',
    ],
    passerFor: [
      'Privatpersoner som skal bygge bolig eller garasje.',
      'Næringslivskunder og utbyggere.',
      'Kommuner og offentlige byggherrer – vi har tariffavtale, er godkjent for ansvarsrett og registrert i StartBANK.',
    ],
    hvorfor: [
      'Lang og bred erfaring i bransjen',
      'Fokus på HMS og kvalitetskontroll',
      'Vi investerer i de ansatte og har lærlinger',
      'Egen betongavdeling som kan trå til ved behov',
      'Tett samarbeid med leverandører og kunder',
    ],
    faq: [
      {
        sporsmal: 'Hvor stor er nybyggavdelingen?',
        svar: 'Avdelingen består av 35 håndverkere og 4 lærlinger. Totalt er vi rundt 50 ansatte.',
      },
      {
        sporsmal: 'Hvilke områder dekker dere?',
        svar: 'Hovedsakelig Askøy, Bergen, Øygarden og nærliggende kommuner.',
      },
      {
        sporsmal: 'Tar dere offentlige oppdrag?',
        svar: 'Ja. Vi bygger blant annet skoler og andre offentlige bygg, og har referanser som Sædalen kirke og Øvre Krohnåsen bofellesskap.',
      },
      {
        sporsmal: 'Hvordan kommer vi i gang?',
        svar: 'Ta kontakt med en beskrivelse av prosjektet, gjerne med tegninger. Vi tilbyr gratis befaring.',
      },
    ],
    relaterte: ['betongarbeid', 'gulvstop-og-flytavretting', 'flis-og-murarbeid'],
    serviceType: 'Nybygg og betongarbeid',
    hero: { src: nyHero, alt: 'Betongarbeidere fra Nilsen & Sture Betong på en byggeplass' },
    bilder: [
      { src: ny1, alt: 'Støpt fundament og grunnmur til nytt bygg' },
      { src: ny2, alt: 'Gjennomgang av byggetegninger før oppstart' },
      { src: ny3, alt: '3D-modell av et byggeprosjekt på skjerm' },
    ],
  },
  {
    slug: 'flis-og-murarbeid',
    navn: 'Flis- og murarbeid',
    kortnavn: 'Flis og mur',
    tittel: 'Flis, mur og bad i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Flislegging, murerarbeid, pipemuring, puss og baderom på Askøy og i Bergen. Godkjent våtromsbedrift. Uforpliktende befaring og tilbud.',
    h1: 'Flis- og murarbeid og baderom i Bergen',
    ingress:
      'Fra rehabilitering av bad til murarbeid i store industribygg – levert etter våtromsnormen, til avtalt tid og pris.',
    kort: 'Flislegging, mur, puss, pipe og ildsted – og bad som godkjent våtromsbedrift.',
    fakta: 'Egen flis- og mureravdeling med 6 håndverkere. Godkjent våtromsbedrift.',
    intro: [
      'Flis- og mureravdelingen til Nilsen & Sture Betong består av 6 dyktige håndverkere. Vi utfører arbeid i alt fra private boliger til store industribygg på Askøy og i Bergen og omegn. Avdelingen har lang erfaring fra flis- og murerarbeid, og vi legger vår stolthet i arbeidet.',
      'Skal du ha bad i ny bolig, rehabilitere et våtrom eller pusse opp et eksisterende baderom? Som godkjent våtromsbedrift kan du være trygg på at baderommet blir levert i henhold til våtromsnormen, til avtalt tid og pris.',
      'Vi tar også murerarbeid som pipemuring og pussing, montering av ildsteder og puss både utvendig og innvendig. Ingen oppdrag er for små eller for store, og vi hjelper både privatkunder og bedrifter.',
    ],
    inngaarTittel: 'Vi utfører det meste innen flis- og murarbeid',
    inngaar: [
      'Flislegging',
      'Murerarbeid',
      'Pipemuring og pussing',
      'Montering av ildsteder',
      'Puss utvendig og innvendig',
      'Nye og rehabiliterte baderom',
    ],
    oppdrag: [
      'Bad i ny bolig',
      'Rehabilitering av bad og våtrom',
      'Flislagte terrasser og uteområder',
      'Pipe, ildsted og puss',
      'Flis- og murarbeid i nærings- og industribygg',
    ],
    passerFor: [
      'Boligeiere som skal pusse opp eller bygge nytt bad.',
      'Bedrifter og byggherrer som trenger flis- og murarbeid i større prosjekter.',
      'Alle som vil ha arbeidet levert av en godkjent våtromsbedrift.',
    ],
    hvorfor: [
      'Godkjent våtromsbedrift',
      'Konkurransedyktige priser',
      'Leveringsdyktighet',
      'Uforpliktende befaring',
    ],
    faq: [
      {
        sporsmal: 'Hva betyr det at dere er godkjent våtromsbedrift?',
        svar: 'Det betyr at du kan være trygg på at baderommet blir levert i henhold til våtromsnormen, til avtalt tid og pris.',
      },
      {
        sporsmal: 'Kan dere ta hele badet?',
        svar: 'Vi tar flis- og murerarbeidet. Beskriv hva du trenger, også om det gjelder plater, maling, rivning, elektro eller rør, så finner vi ut av løsningen sammen.',
      },
      {
        sporsmal: 'Monterer dere ildsteder?',
        svar: 'Ja, vi utfører pipemuring og pussing og monterer ildsteder.',
      },
      {
        sporsmal: 'Hvordan får jeg tilbud?',
        svar: 'Fyll ut skjemaet eller ring 56 15 96 70. Vi tilbyr uforpliktende befaring og tilbud.',
      },
    ],
    relaterte: ['gulvstop-og-flytavretting', 'betongarbeid'],
    serviceType: 'Flislegging, murarbeid og baderom',
    hero: { src: flisHero, alt: 'Flislagt bad med rundt, opplyst speil og mørke fliser' },
    bilder: [
      { src: flis1, alt: 'Bad med store fliser på gulv og vegg og vegghengt toalett' },
      { src: flis2, alt: 'Flislagt dusjvegg med takdusj' },
      { src: flis3, alt: 'Flislagt terrasse med utsikt over sjøen' },
      { src: flis4, alt: 'Nærbilde av flis og fuge' },
    ],
  },
];

export const tjenesteEtterSlug = (slug: string) => {
  const t = tjenester.find((x) => x.slug === slug);
  if (!t) throw new Error(`Ukjent tjeneste: ${slug}`);
  return t;
};
