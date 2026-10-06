# Arkiv – rådata og forhåndsvisning (nsbetong.no-prosjektet)

Denne grenen (`arkiv`) inneholder materiale som ikke hører hjemme i nettsidens kode, men som er verdt å ha:

| Fil | Innhold |
| --- | --- |
| `innhold-gammel-nsbetong.zip` (70 MB) | Rådata hentet fra dagens nsbetong.no 29.09.2026: tekst og metadata per side (`*.md`), 81 originalbilder fra sidene, 54 originalbilder fra de 9 prosjektsidene, prosjektfakta (`prosjekter.json`), WordPress-sitemaps og `bilder.tsv` (bilde-URL → alt-tekst) |
| `forhandsvisning/` | Skjermbilder av den ferdige designen (forside, tjenester, prosjektside, mobil) |

## Bruk

```bash
# Hent grenen
git clone -b arkiv https://github.com/thomasnilsen5-afk/Nettside-nsbetong.git nsbetong-arkiv
cd nsbetong-arkiv && unzip innhold-gammel-nsbetong.zip -d innhold-gammel
```

Eller last ned ZIP-filen direkte fra GitHub: gren `arkiv` → `innhold-gammel-nsbetong.zip` → *Download raw file*.

## Hvorfor ikke i hovedkoden?

Filene er store (originalbilder opptil 13 MB) og kan hentes på nytt med `npm run hent-gammel-side` og
`scripts/hent-prosjekter.mjs` på arbeidsgrenen. De optimaliserte bildene siden bruker ligger allerede i `src/assets/bilder/`.

Selve nettsiden ligger på grenen `claude/nilsen-sture-betong-site-sqnpw8` (se `NY-SAMTALE.md` der).
