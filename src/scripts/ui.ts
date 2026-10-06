// Grensesnitt: meny ved scrolling, innglidning, bildefremvisning, lysboks, demomerke og referansefilter.
// Alt er progressiv forbedring – innholdet virker uten JavaScript.

const redusertBevegelse = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Meny: mørk bakgrunn når man har scrollet ----------
function settOppTopp() {
  const topp = document.querySelector<HTMLElement>('[data-topp]');
  if (!topp) return;
  let sist = false;
  const oppdater = () => {
    const fast = window.scrollY > 40;
    if (fast !== sist) {
      topp.classList.toggle('fast', fast);
      sist = fast;
    }
  };
  oppdater();
  window.addEventListener('scroll', oppdater, { passive: true });

  // Lukk mobilmenyen ved klikk på en lenke (også ankere på samme side).
  const meny = document.querySelector<HTMLDetailsElement>('[data-mobilmeny]');
  meny?.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) meny.open = false;
  });
  meny?.addEventListener('toggle', () => {
    document.documentElement.style.overflow = meny.open ? 'hidden' : '';
  });
}

// ---------- Innglidning (bare elementer under første skjerm) ----------
function settOppInnglidning() {
  const elementer = [...document.querySelectorAll<HTMLElement>('[data-vis]')];
  if (!('IntersectionObserver' in window) || redusertBevegelse) {
    elementer.forEach((el) => el.classList.add('synlig'));
    return;
  }
  const hoyde = window.innerHeight;
  const obs = new IntersectionObserver(
    (oppf) => {
      for (const o of oppf) {
        if (o.isIntersecting) {
          o.target.classList.add('synlig');
          obs.unobserve(o.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  for (const el of elementer) {
    if (el.getBoundingClientRect().top < hoyde) el.classList.add('synlig');
    else obs.observe(el);
  }
}

// ---------- Bildefremvisning i forsidens toppbilde ----------
function settOppHero() {
  const beholder = document.querySelector<HTMLElement>('[data-hero-bilder]');
  const mal = document.querySelector<HTMLTemplateElement>('[data-hero-flere]');
  const sted = document.querySelector<HTMLElement>('[data-hero-sted]');
  if (!beholder || !mal || redusertBevegelse) return;

  const start = () => {
    beholder.append(mal.content.cloneNode(true));
    const bilder = [...beholder.querySelectorAll<HTMLImageElement>('img')];
    let aktiv = 0;
    setInterval(() => {
      if (document.hidden) return;
      const neste = (aktiv + 1) % bilder.length;
      if (!bilder[neste].complete) return; // vent til bildet er lastet
      bilder[aktiv].classList.remove('aktiv');
      bilder[neste].classList.add('aktiv');
      if (sted) sted.textContent = bilder[neste].dataset.sted ?? '';
      aktiv = neste;
    }, 6500);
  };
  // Ekstra bilder lastes først etter at siden er ferdig, så de ikke konkurrerer med LCP.
  if (document.readyState === 'complete') setTimeout(start, 1500);
  else window.addEventListener('load', () => setTimeout(start, 1500), { once: true });
}

// ---------- Lysboks for gallerier ----------
function settOppLysboks() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lysboks-dialog]');
  const lenker = [...document.querySelectorAll<HTMLAnchorElement>('a[data-lysboks]')];
  if (!dialog || !lenker.length || typeof dialog.showModal !== 'function') return;
  const bilde = dialog.querySelector<HTMLImageElement>('[data-lysboks-bilde]')!;
  const tekst = dialog.querySelector<HTMLElement>('[data-lysboks-tekst]')!;
  let gruppe: HTMLAnchorElement[] = [];
  let indeks = 0;

  const vis = (i: number) => {
    indeks = (i + gruppe.length) % gruppe.length;
    const a = gruppe[indeks];
    const alt = a.querySelector('img')?.alt ?? '';
    bilde.src = a.href;
    bilde.alt = alt;
    tekst.textContent = `${alt} (${indeks + 1} av ${gruppe.length})`;
  };

  for (const a of lenker) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const galleri = a.closest('[data-galleri]');
      gruppe = galleri ? [...galleri.querySelectorAll<HTMLAnchorElement>('a[data-lysboks]')] : [a];
      vis(gruppe.indexOf(a));
      dialog.showModal();
    });
  }
  dialog.querySelector('[data-lysboks-lukk]')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lysboks-forrige]')?.addEventListener('click', () => vis(indeks - 1));
  dialog.querySelector('[data-lysboks-neste]')?.addEventListener('click', () => vis(indeks + 1));
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target === dialog.querySelector('figure')) dialog.close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') vis(indeks - 1);
    if (e.key === 'ArrowRight') vis(indeks + 1);
  });
}

// ---------- Demomerke (kan skjules) ----------
function settOppDemo() {
  const demo = document.querySelector<HTMLElement>('[data-demo]');
  if (!demo) return;
  try {
    if (sessionStorage.getItem('nsb_demo_skjult') === '1') demo.hidden = true;
  } catch {
    /* ignorer */
  }
  demo.querySelector('[data-demo-lukk]')?.addEventListener('click', () => {
    demo.hidden = true;
    try {
      sessionStorage.setItem('nsb_demo_skjult', '1');
    } catch {
      /* ignorer */
    }
  });
}

// ---------- Filter på referansesiden ----------
function settOppFilter() {
  const filter = document.querySelector<HTMLElement>('[data-filter]');
  if (!filter) return;
  filter.hidden = false;
  const kort = [...document.querySelectorAll<HTMLElement>('[data-filter-mal] > li')];
  const antall = document.querySelector<HTMLElement>('[data-filter-antall]');
  filter.addEventListener('click', (e) => {
    const knapp = (e.target as Element).closest<HTMLButtonElement>('button[data-verdi]');
    if (!knapp) return;
    const verdi = knapp.dataset.verdi!;
    filter.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === knapp)));
    let synlige = 0;
    for (const li of kort) {
      const tjenester = li.querySelector<HTMLElement>('[data-tjenester]')?.dataset.tjenester?.split(' ') ?? [];
      const vis = verdi === 'alle' || tjenester.includes(verdi);
      li.hidden = !vis;
      if (vis) synlige++;
    }
    if (antall) antall.textContent = `Viser ${synlige} av ${kort.length} prosjekter`;
  });
}

settOppTopp();
settOppInnglidning();
settOppHero();
settOppLysboks();
settOppDemo();
settOppFilter();
