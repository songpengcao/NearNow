"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";

type PriceType = "free" | "paid" | "donation" | "unknown";
type Category = "Concert" | "Bar" | "Jam" | "Classical" | "Electronic";
type TimeFilter = "Tonight" | "Tomorrow" | "Weekend";

type LiveEvent = {
  id: string;
  title: string;
  venue: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  startAt: string;
  timeLabel: string;
  priceType: PriceType;
  priceMin?: number;
  priceLabel: string;
  category: Category;
  description: string;
  source: string;
  sourceUrl: string;
  accent: "jazz" | "sunset" | "club" | "classical" | "flamenco";
};

const BARCELONA_CENTER: [number, number] = [41.3874, 2.1686];

function futureDate(days: number, hour: number, minute = 0) {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

const PREVIEW_EVENTS: LiveEvent[] = [
  {
    id: "lolabum-p62",
    title: "Lolabúm",
    venue: "Paral·lel 62 · Club P62",
    neighborhood: "Poble-sec",
    latitude: 41.37519,
    longitude: 2.1696,
    startAt: futureDate(0, 21, 30),
    timeLabel: "21:30",
    priceType: "paid",
    priceMin: 14,
    priceLabel: "From €14",
    category: "Concert",
    description:
      "Ecuadorian indie rock, experimental pop and cumbia on their first Barcelona date.",
    source: "Paral·lel 62",
    sourceUrl:
      "https://paral-lel62.cat/programacio/lolabum-parallel62-barcelona-cat/",
    accent: "club",
  },
  {
    id: "encant-sagrada",
    title: "L’Encant · Renaldo & Clara",
    venue: "Plaça de la Sagrada Família",
    neighborhood: "Sagrada Família",
    latitude: 41.40194,
    longitude: 2.17281,
    startAt: futureDate(0, 20, 30),
    timeLabel: "20:30",
    priceType: "free",
    priceLabel: "Free",
    category: "Concert",
    description:
      "An open-air city concert with warm Catalan indie-pop and a relaxed neighborhood atmosphere.",
    source: "Barcelona Cultural Agenda",
    sourceUrl: "https://guia.barcelona.cat/en/agenda/",
    accent: "sunset",
  },
  {
    id: "fortune-roberts",
    title: "Fortune: Roberts Quintet",
    venue: "Centre Cívic Can Deu",
    neighborhood: "Les Corts",
    latitude: 41.38679,
    longitude: 2.13252,
    startAt: futureDate(0, 19, 0),
    timeLabel: "20:30",
    priceType: "paid",
    priceMin: 8.8,
    priceLabel: "€8.80",
    category: "Jam",
    description:
      "A close-up jazz performance in the courtyard of one of Les Corts’ landmark civic spaces.",
    source: "Barcelona Cultural Agenda",
    sourceUrl:
      "https://guia.barcelona.cat/en/agenda/detall/concert-fortune-roberts-quintet_99400780566.html",
    accent: "jazz",
  },
  {
    id: "caramelo-cuba",
    title: "Caramelo de Cuba Trio",
    venue: "Jamboree Jazz Club",
    neighborhood: "Barri Gòtic",
    latitude: 41.37974,
    longitude: 2.17529,
    startAt: futureDate(1, 20, 0),
    timeLabel: "20:00",
    priceType: "unknown",
    priceLabel: "Check price",
    category: "Bar",
    description:
      "Cuban jazz and piano-led improvisation in an intimate club beneath Plaça Reial.",
    source: "Barcelona Cultural Agenda",
    sourceUrl: "https://guia.barcelona.cat/en/agenda/",
    accent: "jazz",
  },
  {
    id: "juku-ares",
    title: "Juku Ares",
    venue: "Paral·lel 62",
    neighborhood: "Poble-sec",
    latitude: 41.37519,
    longitude: 2.1696,
    startAt: futureDate(2, 21, 0),
    timeLabel: "21:00",
    priceType: "paid",
    priceMin: 18,
    priceLabel: "From €18",
    category: "Electronic",
    description:
      "A compact late-night live set crossing electronic textures and contemporary club production.",
    source: "Barcelona Cultural Agenda",
    sourceUrl: "https://guia.barcelona.cat/en/agenda/",
    accent: "club",
  },
  {
    id: "flamenc-contemporani",
    title: "Flamenc contemporani",
    venue: "Centre Cívic Torre Llobeta",
    neighborhood: "Vilapicina",
    latitude: 41.42693,
    longitude: 2.17397,
    startAt: futureDate(1, 19, 30),
    timeLabel: "19:30",
    priceType: "donation",
    priceLabel: "Reservation",
    category: "Concert",
    description:
      "A neighborhood-scale flamenco performance pairing traditional voice and rhythm with a modern staging.",
    source: "Barcelona Cultural Agenda",
    sourceUrl: "https://guia.barcelona.cat/en/agenda/",
    accent: "flamenco",
  },
  {
    id: "gigashvili",
    title: "Giorgi Gigashvili",
    venue: "Palau de la Música Catalana",
    neighborhood: "Sant Pere",
    latitude: 41.38736,
    longitude: 2.17518,
    startAt: futureDate(4, 20, 0),
    timeLabel: "20:00",
    priceType: "paid",
    priceMin: 24,
    priceLabel: "From €24",
    category: "Classical",
    description:
      "Expressive contemporary piano in Barcelona’s landmark modernist concert hall.",
    source: "Barcelona Cultural Agenda",
    sourceUrl: "https://guia.barcelona.cat/en/agenda/",
    accent: "classical",
  },
];

function haversineKm(
  from: [number, number],
  to: [number, number],
) {
  const earthRadius = 6371;
  const radians = (value: number) => (value * Math.PI) / 180;
  const dLat = radians(to[0] - from[0]);
  const dLon = radians(to[1] - from[1]);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(from[0])) *
      Math.cos(radians(to[0])) *
      Math.sin(dLon / 2) ** 2;
  return 2 * earthRadius * Math.asin(Math.sqrt(a));
}

function isSameCalendarDay(date: Date, target: Date) {
  return (
    date.getFullYear() === target.getFullYear() &&
    date.getMonth() === target.getMonth() &&
    date.getDate() === target.getDate()
  );
}

function matchesTime(event: LiveEvent, filter: TimeFilter) {
  const eventDate = new Date(event.startAt);
  const today = new Date();

  if (filter === "Tonight") return isSameCalendarDay(eventDate, today);

  if (filter === "Tomorrow") {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return isSameCalendarDay(eventDate, tomorrow);
  }

  const day = eventDate.getDay();
  const daysUntilSaturday = (6 - today.getDay() + 7) % 7;
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + daysUntilSaturday);
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  return isSameCalendarDay(eventDate, saturday) || isSameCalendarDay(eventDate, sunday) || day === 6;
}

export default function Home() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [events, setEvents] = useState(PREVIEW_EVENTS);
  const [feedStatus, setFeedStatus] = useState<
    "loading" | "live" | "preview"
  >("loading");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Tonight");
  const [radius, setRadius] = useState(10);
  const [priceFilter, setPriceFilter] = useState<"Free" | "Under €20" | "All">("All");
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedId, setSelectedId] = useState(PREVIEW_EVENTS[0].id);
  const [userLocation, setUserLocation] =
    useState<[number, number]>(BARCELONA_CENTER);
  const [locationLabel, setLocationLabel] = useState("Barcelona");
  const [locationBusy, setLocationBusy] = useState(false);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/events")
      .then(async (response) => {
        if (!response.ok) throw new Error("City feed unavailable");
        return response.json() as Promise<{ events?: LiveEvent[] }>;
      })
      .then((payload) => {
        if (cancelled) return;
        if (payload.events && payload.events.length > 0) {
          setEvents(payload.events);
          setFeedStatus("live");
        } else {
          setFeedStatus("preview");
        }
      })
      .catch(() => {
        if (!cancelled) setFeedStatus("preview");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("barcelona-live-favorites");
    if (stored) {
      queueMicrotask(() => setFavorites(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "barcelona-live-favorites",
      JSON.stringify(favorites),
    );
  }, [favorites]);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return events
      .map((event) => ({
        ...event,
        distanceKm: haversineKm(userLocation, [
          event.latitude,
          event.longitude,
        ]),
      }))
      .filter((event) => matchesTime(event, timeFilter))
      .filter((event) => event.distanceKm <= radius)
      .filter((event) => {
        if (priceFilter === "Free") return event.priceType === "free";
        if (priceFilter === "Under €20") {
          return (
            event.priceType === "free" ||
            event.priceType === "donation" ||
            (event.priceMin !== undefined && event.priceMin <= 20)
          );
        }
        return true;
      })
      .filter((event) => !category || event.category === category)
      .filter((event) => !savedOnly || favorites.includes(event.id))
      .filter(
        (event) =>
          !normalizedQuery ||
          `${event.title} ${event.venue} ${event.neighborhood} ${event.category}`
            .toLowerCase()
            .includes(normalizedQuery),
      )
      .sort(
        (a, b) =>
          new Date(a.startAt).getTime() - new Date(b.startAt).getTime() ||
          a.distanceKm - b.distanceKm,
      );
  }, [
    category,
    events,
    favorites,
    priceFilter,
    query,
    radius,
    savedOnly,
    timeFilter,
    userLocation,
  ]);

  const effectiveSelectedId = filteredEvents.some(
    (event) => event.id === selectedId,
  )
    ? selectedId
    : (filteredEvents[0]?.id ?? "");

  useEffect(() => {
    if (!mapContainer.current || viewMode !== "map") return;

    let cancelled = false;
    let map: LeafletMap | null = null;

    async function createMap() {
      const leaflet = await import("leaflet");
      if (cancelled || !mapContainer.current) return;

      map = leaflet
        .map(mapContainer.current, {
          attributionControl: false,
          zoomControl: false,
        })
        .setView([41.3874, 2.1686], 12);
      mapRef.current = map;
      leaflet
        .tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO',
            subdomains: "abcd",
            maxZoom: 20,
          },
        )
        .addTo(map);
      leaflet.control.zoom({ position: "bottomright" }).addTo(map);
      leaflet.control.attribution({ position: "bottomleft", prefix: false }).addTo(map);

      filteredEvents.forEach((event) => {
        const markerClass =
          event.id === effectiveSelectedId
            ? "music-marker music-marker--active"
            : "music-marker";
        leaflet
          .marker([event.latitude, event.longitude], {
            alt: `Select ${event.title}`,
            icon: leaflet.divIcon({
              className: "music-marker-wrapper",
              html: `<span class="${markerClass}"><i>♪</i></span>`,
              iconAnchor: [
                event.id === effectiveSelectedId ? 29 : 22,
                event.id === effectiveSelectedId ? 58 : 43,
              ],
              iconSize: [
                event.id === effectiveSelectedId ? 58 : 43,
                event.id === effectiveSelectedId ? 58 : 43,
              ],
            }),
          })
          .on("click", () => setSelectedId(event.id))
          .addTo(map!);
      });
    }

    createMap();
    return () => {
      cancelled = true;
      map?.remove();
      if (mapRef.current === map) mapRef.current = null;
    };
  }, [effectiveSelectedId, filteredEvents, viewMode]);

  useEffect(() => {
    const selected = filteredEvents.find(
      (event) => event.id === effectiveSelectedId,
    );
    if (!selected || !mapRef.current) return;
    mapRef.current.flyTo([selected.latitude, selected.longitude], 13, {
      duration: 0.7,
    });
  }, [effectiveSelectedId, filteredEvents]);

  function useMyLocation() {
    if (!navigator.geolocation) return;
    setLocationBusy(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const next: [number, number] = [coords.latitude, coords.longitude];
        setUserLocation(next);
        setLocationLabel("Current location");
        setLocationBusy(false);
        mapRef.current?.flyTo([coords.latitude, coords.longitude], 13, {
          duration: 0.7,
        });
      },
      () => {
        setLocationLabel("Barcelona");
        setLocationBusy(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button
          className="brand"
          type="button"
          onClick={() => {
            setSavedOnly(false);
            setQuery("");
          }}
          aria-label="Barcelona Live home"
        >
          Barcelona Live
        </button>

        <button
          className="location-button"
          type="button"
          onClick={useMyLocation}
          disabled={locationBusy}
        >
          <span className="location-pin">●</span>
          {locationBusy ? "Locating…" : locationLabel}
          <span className="chevron">⌄</span>
        </button>

        <div className="topbar-actions">
          <button
            className={searchOpen ? "icon-button is-active" : "icon-button"}
            type="button"
            onClick={() => setSearchOpen((value) => !value)}
            aria-label="Search events"
          >
            ⌕
          </button>
          <button
            className={savedOnly ? "icon-button is-active" : "icon-button"}
            type="button"
            onClick={() => setSavedOnly((value) => !value)}
            aria-label="Show saved events"
          >
            {savedOnly ? "♥" : "♡"}
            {favorites.length > 0 && (
              <span className="favorite-count">{favorites.length}</span>
            )}
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={() => setAboutOpen((value) => !value)}
            aria-label="About this guide"
          >
            ☰
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-bar">
          <label htmlFor="event-search">Search the city</label>
          <input
            id="event-search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Artist, venue, neighborhood…"
          />
          <button type="button" onClick={() => setSearchOpen(false)}>
            Done
          </button>
        </div>
      )}

      {aboutOpen && (
        <aside className="about-panel">
          <button
            className="about-close"
            type="button"
            onClick={() => setAboutOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <p className="eyebrow">About the guide</p>
          <h2>More music, less searching.</h2>
          <p>
            Barcelona Live brings concerts, civic events, club shows and
            neighborhood sessions into one place. Listings are refreshed from
            Barcelona&apos;s official cultural agenda, with source links kept
            visible so details can be checked before you go.
          </p>
        </aside>
      )}

      <section className={viewMode === "map" ? "workspace" : "workspace list-view"}>
        <div className="discovery-panel">
          <div className="discovery-heading">
            <p className="eyebrow">Live in Barcelona</p>
            <h1>
              Live music near
              <br /> you tonight
            </h1>
            <p className="result-summary">
              {filteredEvents.length} {filteredEvents.length === 1 ? "place" : "places"}{" "}
              match your plan
            </p>
          </div>

          <div className="filters" aria-label="Event filters">
            <div className="filter-row">
              <span className="filter-label">Time</span>
              <div className="chip-group">
                {(["Tonight", "Tomorrow", "Weekend"] as TimeFilter[]).map(
                  (option) => (
                    <button
                      key={option}
                      className={timeFilter === option ? "chip selected" : "chip"}
                      type="button"
                      onClick={() => setTimeFilter(option)}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="filter-row">
              <span className="filter-label">Radius</span>
              <div className="chip-group">
                {[2, 5, 10, 25].map((option) => (
                  <button
                    key={option}
                    className={radius === option ? "chip selected" : "chip"}
                    type="button"
                    onClick={() => setRadius(option)}
                  >
                    {option} km
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-row">
              <span className="filter-label">Price</span>
              <div className="chip-group">
                {(["Free", "Under €20", "All"] as const).map((option) => (
                  <button
                    key={option}
                    className={priceFilter === option ? "chip selected" : "chip"}
                    type="button"
                    onClick={() => setPriceFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-row filter-row--category">
              <span className="filter-label">Category</span>
              <div className="chip-group">
                {(
                  [
                    "Concert",
                    "Bar",
                    "Jam",
                    "Classical",
                    "Electronic",
                  ] as Category[]
                ).map((option) => (
                  <button
                    key={option}
                    className={category === option ? "chip selected" : "chip"}
                    type="button"
                    onClick={() =>
                      setCategory((current) =>
                        current === option ? null : option,
                      )
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="event-list" aria-live="polite">
            {filteredEvents.length === 0 ? (
              <div className="empty-state">
                <span>♪</span>
                <h2>No matching music yet</h2>
                <p>Try a wider radius or remove one of the filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setRadius(25);
                    setPriceFilter("All");
                    setCategory(null);
                    setSavedOnly(false);
                  }}
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredEvents.map((event) => {
                const active = event.id === effectiveSelectedId;
                const favorite = favorites.includes(event.id);
                return (
                  <article
                    className={active ? "event-card active" : "event-card"}
                    key={event.id}
                  >
                    <button
                      className={`event-art event-art--${event.accent}`}
                      type="button"
                      onClick={() => setSelectedId(event.id)}
                      aria-label={`Select ${event.title}`}
                    >
                      <span>{event.category === "Classical" ? "♩" : "♪"}</span>
                    </button>
                    <div className="event-content">
                      <div className="event-title-row">
                        <button
                          type="button"
                          onClick={() => setSelectedId(event.id)}
                        >
                          <h2>{event.title}</h2>
                          <p>{event.venue}</p>
                        </button>
                        <button
                          className="card-favorite"
                          type="button"
                          onClick={() => toggleFavorite(event.id)}
                          aria-label={
                            favorite
                              ? `Remove ${event.title} from saved`
                              : `Save ${event.title}`
                          }
                        >
                          {favorite ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="event-meta">
                        <span>◷ {event.timeLabel}</span>
                        <span
                          className={
                            event.priceType === "free" ? "price price--free" : "price"
                          }
                        >
                          {event.priceLabel}
                        </span>
                        <span>{event.distanceKm.toFixed(1)} km</span>
                      </div>
                      {active && (
                        <div className="event-details">
                          <p>{event.description}</p>
                          <div>
                            <span>{event.neighborhood}</span>
                            <a
                              href={event.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View source ↗
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        <div className="map-panel">
          <div className="view-toggle" aria-label="View mode">
            <button
              className={viewMode === "map" ? "selected" : ""}
              type="button"
              onClick={() => setViewMode("map")}
            >
              Map
            </button>
            <button
              className={viewMode === "list" ? "selected" : ""}
              type="button"
              onClick={() => setViewMode("list")}
            >
              List
            </button>
          </div>
          {viewMode === "map" && <div ref={mapContainer} className="map" />}
          {viewMode === "list" && (
            <div className="list-intro">
              <p className="eyebrow">Across the city</p>
              <strong>{filteredEvents.length}</strong>
              <span>live music options in your current search</span>
              <button type="button" onClick={() => setViewMode("map")}>
                Return to map
              </button>
            </div>
          )}
          <div className="data-note">
            <span className="live-dot" />
            {feedStatus === "loading"
              ? "Refreshing city listings…"
              : feedStatus === "live"
                ? "Live city data · refreshed daily"
                : "Live feed unavailable · preview listings"}
          </div>
        </div>
      </section>
    </main>
  );
}
