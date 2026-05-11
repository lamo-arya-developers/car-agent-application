# car-agent-application

Frontend för **Bilköpshjälpen** - en hjälpreda för dig som inte är så insatt i bilar och vill kunna analysera en specifik bil innan/under köpet.

Detta är en första exempel-prototyp utan integrerat API. All data är mock-data (se `src/mock-data/mockData.json`).

## Kom igång

I projektmappen kan du köra:

### `npm start`

Startar appen i utvecklingsläge.\
Öppna [http://localhost:3000](http://localhost:3000) i webbläsaren.

### `npm run build`

Bygger appen för produktion till `build`-mappen.

## Mock-inloggning

- E-post: `test@test.com`
- Lösenord: `1234`

## Mock-analys

Slå in registreringsnummer `ABC123` på analyssidan för att se en exempelanalys.

## Projektstruktur

- `src/components/` - React-komponenter (sidor + återanvändbara UI-komponenter under `ui/`)
- `src/styles/` - CSS för respektive sida/komponent
- `src/mock-data/mockData.json` - all mock-data
- `src/images/` - bilder och illustrationer
- `public/` - statiska filer (favicon, manifest, meta-taggar för länkförhandsvisning)

## Status

Detta är endast frontend. Backend och AI-analys är **inte** integrerade än - allt drivs av lokal mock-data och `localStorage` för sparade analyser.
