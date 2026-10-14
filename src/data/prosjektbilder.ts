// Ekstra bilder per prosjektside (/prosjekt/<slug>/), hentet fra dagens prosjektsider på nsbetong.no.
// Legg nye bilder i bilder-inn/prosjekt-<navn>/, kjør `npm run bilder`, og legg dem til her med alt-tekst.
import type { ImageMetadata } from 'astro';
import b0 from '../assets/bilder/prosjekt-hanoytangen/stopte-vegger-i-torrdokken.jpg';
import b1 from '../assets/bilder/prosjekt-hanoytangen/betongvegg-mot-fjell-i-dokken.jpg';
import b2 from '../assets/bilder/prosjekt-hanoytangen/stottevegger-i-betong-dokkport.jpg';
import b3 from '../assets/bilder/prosjekt-hanoytangen/armering-for-stop-av-plate.jpg';
import b4 from '../assets/bilder/prosjekt-hanoytangen/ferdige-stottevegger-hanoytangen.jpg';
import b5 from '../assets/bilder/prosjekt-carlkonow/stillas-og-forskaling-for-bro.jpg';
import b6 from '../assets/bilder/prosjekt-carlkonow/rekkverkskant-langs-bro.jpg';
import b7 from '../assets/bilder/prosjekt-carlkonow/ferdig-sykkelfelt-og-fortau.jpg';
import b8 from '../assets/bilder/prosjekt-carlkonow/sykkelfelt-under-veibro.jpg';
import b9 from '../assets/bilder/prosjekt-skostredet/stop-av-etasjeskiller-med-kran.jpg';
import b10 from '../assets/bilder/prosjekt-skostredet/betongdekke-under-arbeid.jpg';
import b11 from '../assets/bilder/prosjekt-skostredet/armering-av-dekke-i-sentrum.jpg';
import b12 from '../assets/bilder/prosjekt-skostredet/trapperom-i-plasstopt-betong.jpg';
import b13 from '../assets/bilder/prosjekt-skostredet/avrettet-betonggulv-i-etasje.jpg';
import b14 from '../assets/bilder/prosjekt-skostredet/ferdig-hotell-i-skostredet.jpg';
import b15 from '../assets/bilder/prosjekt-krohnasen/betongpumpe-ved-stop-av-dekke.jpg';
import b16 from '../assets/bilder/prosjekt-krohnasen/avretting-av-dekke.jpg';
import b17 from '../assets/bilder/prosjekt-krohnasen/stop-av-dekke-med-betongslange.jpg';
import b18 from '../assets/bilder/prosjekt-contiga/byggeplassen-pa-herdla.jpg';
import b19 from '../assets/bilder/prosjekt-contiga/fundamenter-til-fabrikkhall.jpg';
import b20 from '../assets/bilder/prosjekt-contiga/fabrikkhall-under-bygging.jpg';
import b21 from '../assets/bilder/prosjekt-contiga/armering-i-produksjonshall.jpg';
import b22 from '../assets/bilder/prosjekt-contiga/stop-av-gulv-i-fabrikkhall.jpg';
import b23 from '../assets/bilder/prosjekt-contiga/ferdig-betonggulv-i-fabrikkhall.jpg';
import b24 from '../assets/bilder/prosjekt-nygardstangen/betongbil-og-pumpe-ved-jernbanespor.jpg';
import b25 from '../assets/bilder/prosjekt-nygardstangen/forskaling-pa-nygardstangen.jpg';
import b26 from '../assets/bilder/prosjekt-nygardstangen/armering-langs-jernbanesporet.jpg';
import b27 from '../assets/bilder/prosjekt-nygardstangen/stopt-fundament-langs-spor.jpg';
import b28 from '../assets/bilder/prosjekt-kollsnes/armering-ved-kaianlegget.jpg';
import b29 from '../assets/bilder/prosjekt-kollsnes/forskaling-og-betongpumpe-kollsnes.jpg';
import b30 from '../assets/bilder/prosjekt-kollsnes/armering-av-kaiplate.jpg';
import b31 from '../assets/bilder/prosjekt-kollsnes/kaiplate-under-arbeid.jpg';
import b32 from '../assets/bilder/prosjekt-kollsnes/forskaling-av-betongkonstruksjon.jpg';
import b33 from '../assets/bilder/prosjekt-verksted/togverkstedet-sett-fra-sporet.jpg';
import b34 from '../assets/bilder/prosjekt-verksted/spor-og-tunnel-ved-verkstedet.jpg';
import b35 from '../assets/bilder/prosjekt-verksted/servicegrav-i-verkstedhallen.jpg';
import b36 from '../assets/bilder/prosjekt-saedalen/illustrasjon-kirketorget.jpg';
import b37 from '../assets/bilder/prosjekt-saedalen/illustrasjon-kirkerom-og-kirketorg.jpg';
import b38 from '../assets/bilder/prosjekt-saedalen/illustrasjon-menighetssal.jpg';
import b39 from '../assets/bilder/prosjekt-saedalen/illustrasjon-rom-med-biopeis.jpg';

export const prosjektBilder: Record<string, { src: ImageMetadata; alt: string }[]> = {
  'hanoytangen-opprusting-torrdokk': [
    { src: b0, alt: 'Støpte betongvegger under arbeid i tørrdokken på Hanøytangen' },
    { src: b1, alt: 'Høy betongvegg støpt inntil fjellet i dokken' },
    { src: b2, alt: 'Massive støttevegger i betong ved dokkporten' },
    { src: b3, alt: 'Armering klar for støp av plate i dokken' },
    { src: b4, alt: 'Ferdige støttevegger ved tørrdokken på Hanøytangen' },
  ],
  'ny-sykkelveg-og-fortau-gyldenpriskrysset-carl-konows-gate': [
    { src: b5, alt: 'Stillas og forskaling for plasstøpt bro langs Carl Konows gate' },
    { src: b6, alt: 'Armering til rekkverkskant langs bro' },
    { src: b7, alt: 'Ferdig sykkelfelt og fortau med støpte murer i Gyldenpris' },
    { src: b8, alt: 'Syklist på nytt sykkelfelt under veibro i Carl Konows gate' },
  ],
  'domkirkegaten-6-skostredet-hotel': [
    { src: b9, alt: 'Støp av etasjeskiller med kran i Bergen sentrum' },
    { src: b10, alt: 'Betongdekke under arbeid i Domkirkegaten 6' },
    { src: b11, alt: 'Betongarbeidere armerer dekke i Skostredet' },
    { src: b12, alt: 'Trapperom og søyle i plasstøpt betong' },
    { src: b13, alt: 'Betongavrettet gulv i en av etasjene' },
    { src: b14, alt: 'Det ferdige hotellet i Skostredet i Bergen sentrum' },
  ],
  'ovre-krohnasen-bofellesskap': [
    { src: b15, alt: 'Betongpumpe ved støp av dekke på Øvre Krohnåsen' },
    { src: b16, alt: 'Avretting av nystøpt dekke' },
    { src: b17, alt: 'Betongarbeider støper dekke med betongslange' },
  ],
  'contiga-hulldekkefabrikk': [
    { src: b18, alt: 'Byggeplassen for hulldekkefabrikken på Herdla' },
    { src: b19, alt: 'Støpte fundamenter til fabrikkhallen' },
    { src: b20, alt: 'Fabrikkhall i stål under bygging med betongpumpe' },
    { src: b21, alt: 'Armering av gulv i produksjonshallen' },
    { src: b22, alt: 'Støp av gulv i den lange fabrikkhallen' },
    { src: b23, alt: 'Ferdig blankt betonggulv i fabrikkhallen' },
  ],
  'nbf14-nygardstangen': [
    { src: b24, alt: 'Betongbil og pumpe ved jernbanesporene på Nygårdstangen' },
    { src: b25, alt: 'Forskaling for betongkonstruksjon på Nygårdstangen' },
    { src: b26, alt: 'Armering langs jernbanesporet' },
    { src: b27, alt: 'Støpt fundament langs jernbanespor' },
  ],
  'utvidelse-av-fortoyningsanlegg-co2-anlegg-kollsnes': [
    { src: b28, alt: 'Armering ved kaianlegget på Kollsnes' },
    { src: b29, alt: 'Forskaling og betongpumpe ved fortøyningsanlegget' },
    { src: b30, alt: 'Armering av kaiplate ved sjøen' },
    { src: b31, alt: 'Kaiplate under arbeid på Kollsnes' },
    { src: b32, alt: 'Forskaling av massiv betongkonstruksjon på kaien' },
  ],
  'bergen-verksted': [
    { src: b33, alt: 'Togverkstedet Bergen Verksted sett fra sporet' },
    { src: b34, alt: 'Spor og tunnel ved Bergen Verksted' },
    { src: b35, alt: 'Servicegrav og gulv med epoxy i verkstedhallen' },
  ],
  'saedalen-kirke': [
    { src: b36, alt: 'Illustrasjon av kirketorget i Sædalen kirke' },
    { src: b37, alt: 'Illustrasjon av kirkerommet og kirketorget' },
    { src: b38, alt: 'Illustrasjon av sal med foldevegg' },
    { src: b39, alt: 'Illustrasjon av rom med biopeis' },
  ],
};
