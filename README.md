# Germany Station Atlas

Frontend app that visualizes major German train stations on a Leaflet map. It
loads data from a public GitHub Gist, renders markers on the map, and keeps a
filterable station list in sync with the map.

## Features

- Fetches station data with loading/error states
- Leaflet map centered on Germany
- City filter input with autocomplete
- Interactive list that zooms to a station on click
- Basic component test with mocked API response

## Tech Stack

- React + TypeScript + Vite
- Leaflet + React-Leaflet
- Vitest + Testing Library

## Getting Started

```bash
npm install
npm run dev
```

## Tests

```bash
npm run test
```

## Build

```bash
npm run build
```

## Deployment

Deploy with Vercel or Netlify using the default Vite settings:

- Build command: `npm run build`
- Output directory: `dist`

The app fetches live data from:

- https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw
