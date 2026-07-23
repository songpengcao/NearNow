# NearNow

Discover what is happening around you, starting with live music in Barcelona.

NearNow brings free and paid live performances into one map-first experience.
People can browse by time, distance, price, and music category, then open the
original event source before deciding where to go.

## Current features

- Browser geolocation with a Barcelona fallback
- Tonight, tomorrow, and weekend discovery
- Distance, price, and category filters
- Interactive map and list views
- Event search and locally saved favorites
- Official Barcelona Cultural Agenda data
- Honest fallback listings when the city feed is unavailable
- Responsive desktop and mobile layouts

## Tech stack

- React 19
- Next.js 16
- Vinext and Vite
- Leaflet
- Papa Parse
- TypeScript

## Local development

Requirements:

- Node.js `>=22.13.0`
- Linux with `flock`, `curl`, and GNU `timeout`

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Run validation:

```bash
npm run lint
npm run build
```

## Data source

The first version reads from the Barcelona Open Data Cultural Agenda and keeps
source links on each event. Some listings do not expose a structured start time
or price; those fields are shown as “Time TBC” or “Check price” instead of being
guessed.

## Product direction

NearNow is designed to grow beyond a city event map:

1. Personalized recommendations from favorite artists and playlists
2. Natural-language event search and music embeddings
3. Click, skip, save, and ticket feedback
4. Friend-group recommendations and festival route planning
5. Audience insight tools for venues and promoters

## Live preview

[Open NearNow](https://barcelona-live-music.albertcsp.chatgpt.site)
