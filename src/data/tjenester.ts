// Innhold for tjenestesidene. Hver side har unik tekst – ikke kopier avsnitt mellom tjenester.
// Bilder: legg filer i src/assets/bilder/<slug>/ og før dem opp i `bilder` (se README.md).
import type { ImageMetadata } from 'astro';

export type Faq = { sporsmal: string; svar: string };
export type TjenesteBilde = { src: ImageMetadata; alt: string };

export type Tjeneste = {
  slug: string;
  navn: string;
  kortnavn: string;
  tittel: string; // <title>, maks ca. 60 tegn
  beskrivelse: string; // meta description, maks ca. 155 tegn
  h1: string;
  ingress: string;
  kort: string; // brukes på tjenestekort
  intro: string[];
  inngaar: string[];
  oppdrag: string[];
  passerFor: string[];
  faq: Faq[];
  relaterte: string[];
  serviceType: string;
  bilder: TjenesteBilde[];
};

export const tjenester: Tjeneste[] = [
  {
    slug: 'betongarbeid',
    navn: 'Betongarbeid',
    kortnavn: 'Betongarbeid',
    tittel: 'Betongarbeid i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Betongarbeid i Bergen og omegn: forskaling, armering og støp for private, bedrifter og det offentlige. Over 20 års erfaring. Ring 56 15 96 70.',
    h1: 'Betongarbeid i Bergen og omegn',
    ingress:
      'Forskaling, armering og støp – planlagt og utført av fagfolk som har jobbet med betong i over 20 år.',
    kort: 'Forskaling, armering og støp av fundamenter, murer, plater og konstruksjoner.',
    intro: [
      'Betong er et materiale som tilgir lite. Blir forskalingen skjev, armeringen feil plassert eller støpen dårlig ettervannet, får du resultatet med deg i mange år. Derfor legger vi vekt på grundig forarbeid: riktig underlag, stødig forskaling, armering etter tegning og en støp som blir fulgt opp til betongen har herdet.',
      'Nilsen & Sture Betong er en betongentreprenør med base på Kleppestø og oppdrag i Bergen og omegn. Vi tar både enkeltstående betongjobber og større leveranser der betongen er en del av et byggeprosjekt. Når arbeidet krever det, kan vi erklære ansvarsrett for utførelsen.',
    ],
    inngaar: [
      'Befaring og gjennomgang av tegninger og behov',
      'Utgraving og klargjøring av underlag i samråd med deg eller grunnentreprenør',
      'Forskaling og armering',
      'Bestilling og mottak av betong, støp og vibrering',
      'Etterbehandling og herdetiltak',
      'Riving av forskaling og opprydding',
    ],
    oppdrag: [
      'Fundamenter og såler',
      'Grunnmurer og støttemurer',
      'Plate på mark og dekker',
      'Trapper, repoer og ramper i betong',
      'Utbedring og rehabilitering av eksisterende betong',
    ],
    passerFor: [
      'Private som skal bygge garasje, tilbygg, mur eller trapp og trenger en fagmann som tar ansvar for betongen.',
      'Næringsdrivende og byggherrer som trenger en fast underentreprenør på betong.',
      'Kommuner og offentlige oppdragsgivere med behov for betongarbeid i anlegg og bygg.',
    ],
    faq: [
      {
        sporsmal: 'Tar dere oppdrag for private?',
        svar: 'Ja. Vi jobber for private, næringsdrivende og offentlige oppdragsgivere. Beskriv kort hva du skal ha gjort, så tar vi kontakt for å avklare omfang og eventuell befaring.',
      },
      {
        sporsmal: 'Hva koster betongarbeid?',
        svar: 'Prisen avhenger av mengde, tilkomst, grunnforhold og hvor mye forskaling og armering som trengs. Vi gir et tilbud når vi vet nok om oppdraget – ofte etter en befaring.',
      },
      {
        sporsmal: 'Kan dere erklære ansvarsrett?',
        svar: 'Ja, vi har ansvarsrett og kan påta oss ansvar for utførelsen av betongarbeidet i søknadspliktige tiltak. Ta det opp tidlig, så blir det riktig i byggesøknaden.',
      },
      {
        sporsmal: 'Kan det støpes om vinteren?',
        svar: 'Det går an, men kulde krever ekstra tiltak for at betongen skal herde riktig, for eksempel tildekking og oppvarming. Vi vurderer dette for hvert oppdrag.',
      },
    ],
    relaterte: ['nybygg', 'gulvstop-og-flytavretting', 'vei-og-kantstop'],
    serviceType: 'Betongarbeid',
    bilder: [],
  },
  {
    slug: 'gulvstop-og-flytavretting',
    navn: 'Gulvstøp og flytavretting',
    kortnavn: 'Gulvstøp',
    tittel: 'Gulvstøp og flytavretting i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Gulvstøp, påstøp og flytavretting i Bergen og omegn. Plane gulv klare for flis, parkett eller belegg – også med gulvvarme. Be om tilbud.',
    h1: 'Gulvstøp og flytavretting i Bergen',
    ingress:
      'Et godt gulv starter under overflaten. Vi støper og avretter gulv som er plane, solide og klare for det du skal legge oppå.',
    kort: 'Gulv på grunn, påstøp og flytavretting – også med innstøpt gulvvarme.',
    intro: [
      'Enten du skal legge flis, parkett eller belegg, er et plant og stabilt undergulv avgjørende for sluttresultatet. Ujevnheter som ikke rettes opp, viser seg senere som sprekker i fliser, knirk i gulvet eller belegg som slipper.',
      'Vi utfører gulvstøp i nybygg og ved rehabilitering, og flytavretting når et eksisterende gulv må rettes opp. Flytavretting er en selvutjevnende masse som pumpes eller helles ut og gir en jevn overflate. Den egner seg godt når høydeforskjellene er moderate, og når du vil ha et gulv som raskt er klart for neste fag.',
      'Skal det være gulvvarme, støper vi inn varmekabler eller rør i samme operasjon. Vi avklarer på forhånd hvem som legger varmen, slik at alt er på plass og kontrollert før støpen.',
    ],
    inngaar: [
      'Vurdering av eksisterende underlag, høyder og fall',
      'Priming og forberedelse av underlaget',
      'Gulvstøp eller påstøp med riktig tykkelse',
      'Flytavretting til ferdig høyde',
      'Innstøping av varmekabler eller vannbåren varme i samarbeid med elektriker/rørlegger',
      'Råd om tørketid før gulvbelegg legges',
    ],
    oppdrag: [
      'Gulv på grunn i garasje, kjeller og bolig',
      'Påstøp på eksisterende betong- eller trebjelkelag',
      'Flytavretting før parkett, fliser eller vinyl',
      'Fall mot sluk i våtrom',
      'Gulv i nærings- og lagerlokaler',
    ],
    passerFor: [
      'Boligeiere som pusser opp og vil ha et plant gulv før nytt gulvbelegg.',
      'Byggmestere og entreprenører som trenger en underentreprenør på gulv.',
      'Bedrifter som skal oppgradere gulv i lokaler, lager eller verksted.',
    ],
    faq: [
      {
        sporsmal: 'Hva er forskjellen på gulvstøp og flytavretting?',
        svar: 'Gulvstøp er et bærende lag med betong, gjerne med armering. Flytavretting er en selvutjevnende masse som legges i tynnere sjikt for å gi en helt plan overflate. Ofte brukes begge: først støp, deretter avretting.',
      },
      {
        sporsmal: 'Hvor lenge må gulvet tørke før jeg kan legge parkett?',
        svar: 'Det varierer med type masse, tykkelse, temperatur og ventilasjon. Vi gir deg anbefalt tørketid for ditt gulv, og fuktmåling før legging er lurt.',
      },
      {
        sporsmal: 'Kan dere støpe inn gulvvarme?',
        svar: 'Ja. Vi støper inn varmekabler eller rør for vannbåren varme. Selve varmeanlegget legges og kobles av autorisert elektriker eller rørlegger.',
      },
      {
        sporsmal: 'Kan flytavretting legges på tregulv?',
        svar: 'Det kan være mulig, men krever at bjelkelaget er stivt nok og at underlaget forberedes riktig. Vi vurderer det på befaring.',
      },
    ],
    relaterte: ['flis-og-murarbeid', 'betongarbeid', 'nybygg'],
    serviceType: 'Gulvstøp og flytavretting',
    bilder: [],
  },
  {
    slug: 'vei-og-kantstop',
    navn: 'Vei og kantstøp',
    kortnavn: 'Kantstøp',
    tittel: 'Kantstøp for vei og fortau i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Kantstøp og profilstøp for vei, fortau og parkeringsplasser i Bergen og Vestland. For kommuner, entreprenører og private utbyggere.',
    h1: 'Vei og kantstøp – profilstøp for vei og fortau',
    ingress:
      'Støpte kanter og profiler for vei, fortau, gang- og sykkelveier og parkeringsarealer.',
    kort: 'Kantstøp og profilstøp for vei, fortau og uteområder.',
    intro: [
      'En støpt kant skiller kjørebane fra fortau, leder vann mot sluk og tåler slitasje fra trafikk og brøyting. Med profilstøp formes kanten på stedet i én sammenhengende lengde, uten skjøter mellom enkeltelementer. Det gir en jevn linje som følger veiens kurver.',
      'Vi utfører kantstøp for kommunale og offentlige oppdragsgivere, for entreprenører som bygger vei og infrastruktur, og for private utbyggere av boligfelt og næringsområder i Bergen og Vestland.',
      'Gode kanter krever godt samspill med resten av anlegget. Vi koordinerer med grunnentreprenør og asfaltentreprenør om høyder, rekkefølge og fremdrift, slik at kanten ligger riktig når veien skal ferdigstilles.',
    ],
    inngaar: [
      'Gjennomgang av tegninger, profiler og høyder',
      'Klargjøring av underlag og utsetting',
      'Kantstøp/profilstøp på stedet',
      'Nedsenk ved overganger og innkjørsler',
      'Etterbehandling og herdetiltak',
      'Koordinering med øvrige entreprenører',
    ],
    oppdrag: [
      'Kant mellom kjørebane og fortau',
      'Gang- og sykkelveier',
      'Trafikkøyer og rundkjøringer',
      'Parkeringsplasser og innkjøringer',
      'Kanter i boligfelt og næringsområder',
    ],
    passerFor: [
      'Kommuner og offentlige byggherrer som skal bygge eller rehabilitere vei og fortau.',
      'Anleggs- og veientreprenører som trenger en underentreprenør på kant.',
      'Utbyggere av boligfelt, næringstomter og parkeringsanlegg.',
    ],
    faq: [
      {
        sporsmal: 'Hva er profilstøp?',
        svar: 'Profilstøp betyr at kanten formes og støpes på stedet i en sammenhengende lengde, i stedet for å settes sammen av ferdige elementer. Resultatet er en kant uten skjøter mellom hver stein.',
      },
      {
        sporsmal: 'Tar dere offentlige oppdrag?',
        svar: 'Ja. Kommunale og offentlige oppdragsgivere er en av kundegruppene våre. Vi er registrert i StartBANK og har tariffavtale.',
      },
      {
        sporsmal: 'Når i byggefasen bør kanten støpes?',
        svar: 'Som regel etter at bærelaget er på plass og før toppdekket asfalteres, men rekkefølgen avhenger av prosjektet. Vi avklarer dette med deg og de andre entreprenørene.',
      },
    ],
    relaterte: ['betongarbeid', 'nybygg'],
    serviceType: 'Kantstøp og profilstøp',
    bilder: [],
  },
  {
    slug: 'nybygg',
    navn: 'Nybygg',
    kortnavn: 'Nybygg',
    tittel: 'Nybygg – betongarbeid i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Betongentreprenør for nybygg i Bergen og omegn: fundamenter, grunnmur, dekker og gulv. Ansvarsrett og tariffavtale. Be om tilbud i dag.',
    h1: 'Betongentreprenør for nybygg i Bergen',
    ingress:
      'Fra fundament til ferdig dekke: vi leverer betongarbeidet i nybygg for private, næringsdrivende og offentlige byggherrer.',
    kort: 'Betongarbeid i nybygg – fundamenter, grunnmur, dekker og gulv.',
    intro: [
      'I et nybygg er betongen fundamentet for alt som kommer etter. Feil i høyder, mål eller utsparinger tidlig i prosjektet blir dyre å rette opp senere. Vi jobber etter tegning og avtalt fremdrift, og følger opp underveis slik at neste fag kan starte når det skal.',
      'Vi kan ta betongarbeidet som egen entreprise, eller som underentreprenør for en hovedentreprenør eller byggmester. Vi har ansvarsrett, er godkjent lærebedrift og har tariffavtale – ting som ofte etterspørres av profesjonelle byggherrer og offentlige oppdragsgivere.',
      'For private som bygger bolig, garasje eller fritidsbolig, er vi en samarbeidspartner som tar ansvar for betongdelen og sier tydelig fra om hva som må avklares før vi starter.',
    ],
    inngaar: [
      'Gjennomgang av tegninger, fremdrift og grensesnitt mot andre fag',
      'Fundamenter, såler og grunnmur',
      'Plate på mark og dekker',
      'Utsparinger og innstøpingsgods etter tegning',
      'Gulvstøp og avretting',
      'Dokumentasjon og ansvarsrett ved behov',
    ],
    oppdrag: [
      'Eneboliger og tomannsboliger',
      'Garasjer og tilbygg',
      'Nærings- og lagerbygg',
      'Offentlige bygg',
    ],
    passerFor: [
      'Private byggherrer som vil ha en fast betongentreprenør gjennom prosjektet.',
      'Byggmestere og hovedentreprenører som trenger en underentreprenør på betong.',
      'Offentlige og kommunale byggherrer.',
    ],
    faq: [
      {
        sporsmal: 'Kan dere være underentreprenør?',
        svar: 'Ja. Vi leverer betongarbeid både direkte til byggherre og som underentreprenør for hovedentreprenører og byggmestere.',
      },
      {
        sporsmal: 'Hvor tidlig bør vi kontakte dere?',
        svar: 'Helst når tegningene er klare og før fremdriftsplanen låses. Da kan vi planlegge bemanning og gi innspill som sparer tid på byggeplassen.',
      },
      {
        sporsmal: 'Leverer dere dokumentasjon?',
        svar: 'Ja, vi leverer den dokumentasjonen som kreves for betongarbeidet vårt, og kan erklære ansvarsrett for utførelsen.',
      },
    ],
    relaterte: ['betongarbeid', 'gulvstop-og-flytavretting', 'flis-og-murarbeid'],
    serviceType: 'Betongarbeid for nybygg',
    bilder: [],
  },
  {
    slug: 'flis-og-murarbeid',
    navn: 'Flis- og murarbeid',
    kortnavn: 'Flis og mur',
    tittel: 'Flis, mur og våtrom i Bergen | Nilsen & Sture Betong',
    beskrivelse:
      'Flislegging, murarbeid og våtrom i Bergen og omegn. Godkjent våtromsbedrift. Bad, vaskerom, pussing og muring – ring 56 15 96 70.',
    h1: 'Flis- og murarbeid og våtrom i Bergen',
    ingress:
      'Som godkjent våtromsbedrift bygger vi bad og vaskerom som tåler vann – og legger flis og murer der det trengs.',
    kort: 'Flislegging, murarbeid og våtrom som godkjent våtromsbedrift.',
    intro: [
      'Vannskader på bad er blant de dyreste skadene i en bolig, og de skyldes ofte feil i underlaget eller membranen som ingen ser når flisene er lagt. Som godkjent våtromsbedrift følger vi kravene til våtromsarbeid og dokumenterer det vi gjør.',
      'Vi tar hele jobben fra underlag til ferdig flis: fall mot sluk, membran, flislegging og fuging. Siden vi også er betongfolk, har vi god kontroll på gulvet under flisene – påstøp, avretting og fall gjør vi selv.',
      'I tillegg utfører vi murarbeid som pussing av grunnmur, muring av vegger og mindre reparasjoner i mur og puss.',
    ],
    inngaar: [
      'Riving og klargjøring av eksisterende rom',
      'Påstøp, fall og avretting av gulv',
      'Membran og tetting etter kravene til våtrom',
      'Flislegging på gulv og vegg',
      'Muring og pussing',
      'Samordning med rørlegger og elektriker',
    ],
    oppdrag: [
      'Nytt bad eller totalrenovering av bad',
      'Vaskerom og kjellerrom',
      'Flislegging av gang, kjøkken og inngangsparti',
      'Pussing av grunnmur',
      'Mindre mur- og pussreparasjoner',
    ],
    passerFor: [
      'Boligeiere som skal pusse opp bad eller vaskerom og vil ha dokumentert våtromsarbeid.',
      'Utleiere og borettslag med behov for oppgradering av våtrom.',
      'Byggmestere og entreprenører som trenger våtroms- og flisarbeid i prosjekter.',
    ],
    faq: [
      {
        sporsmal: 'Hva betyr det at dere er godkjent våtromsbedrift?',
        svar: 'Det betyr at bedriften er godkjent for å utføre våtromsarbeid etter bransjens krav, med opplærte fagfolk og dokumentasjon av arbeidet. Det gir deg trygghet om at badet er bygget riktig.',
      },
      {
        sporsmal: 'Tar dere hele badet, også rør og elektrisk?',
        svar: 'Vi gjør bygg-, betong-, membran- og flisarbeidet. Rørlegger- og elektrikerarbeid utføres av autoriserte fagfolk, og vi samordner arbeidet slik at du slipper å koordinere alt selv.',
      },
      {
        sporsmal: 'Får jeg dokumentasjon på badet?',
        svar: 'Ja, du får dokumentasjon på våtromsarbeidet vi har utført. Den er nyttig ved salg av boligen og i forsikringssaker.',
      },
    ],
    relaterte: ['gulvstop-og-flytavretting', 'betongarbeid'],
    serviceType: 'Flislegging, murarbeid og våtrom',
    bilder: [],
  },
];

export const tjenesteEtterSlug = (slug: string) => {
  const t = tjenester.find((x) => x.slug === slug);
  if (!t) throw new Error(`Ukjent tjeneste: ${slug}`);
  return t;
};
