// Referanseprosjekter fra dagens nsbetong.no (/referanser/ og /prosjekt/<slug>/).
// Tekst og fakta er bedriftens egne. Åpenbare skrivefeil er rettet. Ikke finn på prosjekter.
// Hvert prosjekt får egen side på samme adresse som i dag: /prosjekt/<slug>/
import type { ImageMetadata } from 'astro';
import { prosjektBilder } from './prosjektbilder';

import hanoytangen from '../assets/bilder/referanser/hanoytangen-torrdokk.jpg';
import carlKonow from '../assets/bilder/referanser/sykkelveg-carl-konows-gate.jpg';
import krohnasen from '../assets/bilder/referanser/ovre-krohnasen-bofellesskap.jpg';
import skostredet from '../assets/bilder/referanser/skostredet-hotel-domkirkegaten.jpg';
import contiga from '../assets/bilder/referanser/contiga-hulldekkefabrikk-herdla.jpg';
import nygardstangen from '../assets/bilder/referanser/nbf14-nygardstangen.jpg';
import kollsnes from '../assets/bilder/referanser/fortoyningsanlegg-kollsnes.jpg';
import bergenVerksted from '../assets/bilder/referanser/bergen-verksted-stromgaten.jpg';
import saedalen from '../assets/bilder/referanser/saedalen-kirke.jpg';

export type Bilde = { src: ImageMetadata; alt: string };

export type Referanse = {
  slug: string;
  tittel: string;
  undertittel?: string;
  sted: string;
  avdeling?: string;
  betongM3?: number; // levert betong i m³
  arealM2?: number; // totalt areal for prosjektet i m²
  byggeperiode: string;
  kontrakt: string; // kontraktsstørrelse
  byggherre?: string;
  oppdragsgiver?: string;
  beskrivelse: string[];
  tjenester: string[]; // slugs til relevante tjenestesider
  bilde: Bilde;
  bilder: Bilde[];
};

export const referanseIngress =
  'Som leverandør til både offentlige og private aktører har vi gjennomført en rekke oppdrag innen betongarbeid, flisarbeid og kantstøp i Bergen og omegn og ellers på Vestlandet. Prosjektene under viser gjennomføringsevnen vår og evnen til å levere i tråd med krav til kvalitet og fremdrift.';

export const referanser: Referanse[] = [
  {
    slug: 'hanoytangen-opprusting-torrdokk',
    tittel: 'Hanøytangen – opprusting av tørrdokk',
    sted: 'Hanøytangen, Askøy',
    avdeling: 'Næring',
    betongM3: 610,
    arealM2: 500,
    byggeperiode: 'Q2 2023 – Q4 2024',
    kontrakt: '11 mill. kr',
    byggherre: 'Semco Maritime',
    oppdragsgiver: 'Norscrap West AS',
    beskrivelse: [
      'Et kjent sted for oss i Nilsen & Sture Betong er Hanøytangen og dokken, som er unik i sitt slag på Vestlandet. Her ligger en tørrdokk som er 17 meter dyp og 125 × 125 meter i lengde og bredde, med tilstøtende kaier og annen landbasert infrastruktur.',
      'Arbeidene med tettevegg ved dokkporten er en i rekken av flere opprustinger vi har vært med på i nyere tid. Arbeidene dreier seg om massive støttevegger, store innstøpingsgods og fundamentering i selve dokken. Det har krevd mye tid og innsats i planlegging og utførelse av store installasjoner i krevende omgivelser.',
      'Hanøytangen verft er en hjørnestein på Askøy og en viktig del av næringslivet på øya, og vi er stolte av å være en liten del av det.',
    ],
    tjenester: ['betongarbeid'],
    bilde: { src: hanoytangen, alt: 'Betongarbeid ved tørrdokken på Hanøytangen på Askøy' },
    bilder: [],
  },
  {
    slug: 'ny-sykkelveg-og-fortau-gyldenpriskrysset-carl-konows-gate',
    tittel: 'Ny sykkelveg, Carl Konows gate',
    undertittel: 'Ny sykkelveg og fortau Gyldenpriskrysset – Carl Konows gate',
    sted: 'Gyldenpris, Bergen',
    avdeling: 'Næring',
    betongM3: 2550,
    byggeperiode: 'Q3 2019 – Q3 2022',
    kontrakt: '31 mill. kr',
    byggherre: 'Statens vegvesen og Vestland fylkeskommune',
    oppdragsgiver: 'HGT AS / PEAB AS',
    beskrivelse: [
      'Prosjektet omfatter tosidig sykkelfelt og fortau langs fv. 558 Carl Konows gate – Gyldenpriskrysset, som en del av sykkelstrategien for Bergen. Anlegget kobler også sammen trolleybusstraseen fra Lyngbø til Birkelundstoppen ved opprusting av endeholdeplassene.',
      'Underveis har Nilsen & Sture Betong støpt en rekke brokonstruksjoner, mastfundamenter, én plasstøpt bro, rekkverkskanter og støttemurer langs hele anlegget. Arbeidene har pågått over en lang periode i tett bebyggelse.',
    ],
    tjenester: ['vei-og-kantstop', 'betongarbeid'],
    bilde: { src: carlKonow, alt: 'Støp av betongdekke med betongpumpe i Carl Konows gate i Bergen' },
    bilder: [],
  },
  {
    slug: 'ovre-krohnasen-bofellesskap',
    tittel: 'Øvre Krohnåsen bofellesskap',
    sted: 'Lagunen, Fana bydel i Bergen',
    betongM3: 370,
    arealM2: 2600,
    byggeperiode: 'Q4 2021 – Q4 2022',
    kontrakt: '8 mill. kr',
    byggherre: 'Bergen kommune',
    oppdragsgiver: 'Gravdal Bygg AS',
    beskrivelse: [
      'På dette prosjektet har Nilsen & Sture Betong levert plasstøpt garasje og to bygg med støpt dekke, prefabrikkerte vegger og prefabrikkerte balkonger, samt utvendige murer ved tilkomstveien til tomten.',
      'Byggene ble oppført i samme byggetrinn, med tilhørende ekstraarbeider på tilkomstveien. De to byggene har 8 leiligheter hver, med personalbase, aktivitetsrom og felles møte- og oppholdsrom. Arbeidene ble utført som underentreprenør for Gravdal Bygg AS.',
    ],
    tjenester: ['nybygg', 'betongarbeid'],
    bilde: { src: krohnasen, alt: 'Øvre Krohnåsen bofellesskap ved Lagunen i Fana' },
    bilder: [],
  },
  {
    slug: 'domkirkegaten-6-skostredet-hotel',
    tittel: 'Domkirkegaten 6, Skostredet Hotel',
    sted: 'Skostredet, Bergen sentrum',
    avdeling: 'Næring',
    betongM3: 1785,
    arealM2: 3900,
    byggeperiode: 'Q3 2020 – Q4 2021',
    kontrakt: '14 mill. kr',
    byggherre: 'Pallas Eiendom AS',
    beskrivelse: [
      'Domkirkegaten 6 er i dag et luksushotell midt i Bergen sentrum. Som totalleverandør av betongarbeidene har vi i fundamentplanet plasstøpt vegger ensidig mot spunt, støpt opp garasjebygget og deretter etasjeskillerne i plasstøpt betong. Det er brukt elementvegger og trapper fra Con-Form AS, og hver etasje er betongavrettet.',
      'Prosjektet har pågått i et svært trangt område, der planlegging og løsning av utfordringer har gått hånd i hånd. Bygget er oppført som et femstjerners hotell som del av De Bergenske, med Michelin-restaurant, og har et helt særegent preg i bybildet. Sammen med Pallas Eiendom AS er vi stolte av å ha tatt del i prosjektet.',
    ],
    tjenester: ['nybygg', 'betongarbeid', 'gulvstop-og-flytavretting'],
    bilde: { src: skostredet, alt: 'Skostredet Hotel i Domkirkegaten 6 i Bergen sentrum' },
    bilder: [],
  },
  {
    slug: 'contiga-hulldekkefabrikk',
    tittel: 'Contiga hulldekkefabrikk',
    sted: 'Herdla, Askøy',
    avdeling: 'Næring',
    betongM3: 1800,
    arealM2: 3000,
    byggeperiode: 'Q2 2020 – Q2 2021',
    kontrakt: '12 mill. kr',
    byggherre: 'Heidelberg Materials AS',
    oppdragsgiver: 'Betonmast Bergen / Backe Bergen',
    beskrivelse: [
      'Her har vi vært med på å bygge en av Europas mest moderne hulldekkefabrikker, som underentreprenør for Backe Bergen. Arbeidene har omfattet fundamentering, tekniske installasjoner i produksjonshallen, gulv i fabrikkhallen, kontorbygg og andre tilstøtende konstruksjoner.',
      'Det er store laster og innspenningskrefter i lokalet, og betongarbeidene har hatt høye krav til utførelse og toleranser. Fabrikken har fire støpebaner som hver er 135 meter lange. Produksjonslokalet er 180 meter langt, med et utelager på ca. 4 700 m². Fabrikken ligger flott til helt nord på Askøy.',
    ],
    tjenester: ['nybygg', 'gulvstop-og-flytavretting', 'betongarbeid'],
    bilde: { src: contiga, alt: 'Contiga hulldekkefabrikk på Herdla sett fra lufta' },
    bilder: [],
  },
  {
    slug: 'nbf14-nygardstangen',
    tittel: 'NBF14: Nygårdstangen',
    sted: 'Nygårdstangen, Bergen jernbanestasjon',
    avdeling: 'Næring',
    betongM3: 1785,
    arealM2: 35000,
    byggeperiode: 'Q2 2022 – Q3 2023',
    kontrakt: '17 mill. kr',
    byggherre: 'Bane NOR Eiendom AS',
    oppdragsgiver: 'Baneservice AS',
    beskrivelse: [
      'Betongarbeider for Baneservice AS på Nygårdstangen ved Bergen jernbanestasjon, med Bane NOR Eiendom AS som byggherre. Prosjektet har et totalt areal på 35 000 m².',
    ],
    tjenester: ['betongarbeid'],
    bilde: { src: nygardstangen, alt: 'Jernbaneområdet på Nygårdstangen i Bergen sett fra lufta' },
    bilder: [],
  },
  {
    slug: 'utvidelse-av-fortoyningsanlegg-co2-anlegg-kollsnes',
    tittel: 'Fortøyningsanlegg Kollsnes',
    undertittel: 'Utvidelse av fortøyningsanlegg, CO₂-anlegg Kollsnes',
    sted: 'Kollsnes, Øygarden',
    avdeling: 'Næring',
    betongM3: 429,
    arealM2: 2000,
    byggeperiode: 'Q2 2024 – Q4 2024',
    kontrakt: '7 mill. kr',
    byggherre: 'Equinor',
    oppdragsgiver: 'Skanska AS',
    beskrivelse: [
      'I forbindelse med Equinors prosjekt for karbonfangst og -lagring på Kollsnes har vi, sammen med Skanska, utvidet fortøyningsanlegget. Utvidelsen skal gjøre det mulig å ta imot spesialbygde skip i fremtiden.',
      'Det er støpt to massive betongkonstruksjoner i hver ende av kaianlegget, med tilhørende plate og dragere i bakkant som tar opp de enorme kreftene hver pullert blir utsatt for. Arbeidene har omfattet både eksisterende og ny betong.',
      'Prosjektet er utført tegningsfritt, der armeringen er modellert og bygget etter 3D-modeller. Det har vært høyt fokus på kvalitet og utførelse underveis. Anlegget ble overlevert byggherre høsten 2024, til stor internasjonal interesse.',
    ],
    tjenester: ['betongarbeid'],
    bilde: { src: kollsnes, alt: 'Betongarbeid på fortøyningsanlegget på Kollsnes i Øygarden' },
    bilder: [],
  },
  {
    slug: 'bergen-verksted',
    tittel: 'Bergen Verksted',
    sted: 'Strømgaten 4, Bergen',
    avdeling: 'Næring',
    betongM3: 1975,
    arealM2: 3500,
    byggeperiode: 'Q3 2020 – Q1 2021',
    kontrakt: '15 mill. kr',
    byggherre: 'Bane NOR Eiendom',
    oppdragsgiver: 'Betonmast Bergen / Backe Bergen',
    beskrivelse: [
      'Som underentreprenør for Backe Bergen har vi utført alle plasstøpte konstruksjoner på det nye og moderne togverkstedet i Bergen. Verkstedet har to spor med plass til 110 meter lange tog, med kapasitet for dagens og fremtidige tog på Bergensbanen.',
      'Vi har støpt massive konstruksjoner, blant annet to servicegraver på 124 meter hver, innstøpt løfteanlegg for tog, tilstøtende dekker og gulv samt ramper for tilkomst. Vi har også levert epoxy med signalmerking på alle gulv i verkstedhallen, lageret og de tekniske rommene.',
      'Arbeidene omfatter all plasstøpt betong i verkstedet, i den utvendige vaskemaskinen og i og rundt eksisterende tunnel.',
    ],
    tjenester: ['nybygg', 'gulvstop-og-flytavretting', 'betongarbeid'],
    bilde: { src: bergenVerksted, alt: 'Bergen Verksted i Strømgaten 4 med grønt tak' },
    bilder: [],
  },
  {
    slug: 'saedalen-kirke',
    tittel: 'Sædalen kirke',
    undertittel: 'Ny kirke i Sædalen',
    sted: 'Fana bydel, Bergen',
    avdeling: 'Næring',
    betongM3: 650,
    arealM2: 1200,
    byggeperiode: 'Q2 2022 – Q4 2023',
    kontrakt: '7 mill. kr',
    byggherre: 'Bergen kirkelige fellesråd',
    oppdragsgiver: 'PEAB K. Nordang',
    beskrivelse: [
      'For den nye kirken i Sædalen har vi stått for betongarbeidene for PEAB K. Nordang som totalentreprenør. Råbygget med parkeringskjeller er oppført i betong og stål, med teglsteinsfasade utvendig. Utomhusarbeidene omfatter utvendige murer, trapper og kantstøp.',
      'Innvendig har vi levert slipt betonggulv, der kirketorget utgjør hjertet i den nye kirken. Fordelt på to saler er det plass til 400 sitteplasser.',
    ],
    tjenester: ['betongarbeid', 'gulvstop-og-flytavretting', 'vei-og-kantstop'],
    bilde: { src: saedalen, alt: 'Illustrasjon av kirkerommet i Sædalen kirke' },
    bilder: [],
  },
].map((r) => ({ ...r, bilder: prosjektBilder[r.slug] ?? [] }));

export const referanseEtterSlug = (slug: string) => {
  const r = referanser.find((x) => x.slug === slug);
  if (!r) throw new Error(`Ukjent prosjekt: ${slug}`);
  return r;
};

export const formatM3 = (n: number) => `${n.toLocaleString('nb-NO')} m³`;
export const formatM2 = (n: number) => `${n.toLocaleString('nb-NO')} m²`;
