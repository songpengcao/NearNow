import Papa from "papaparse";

const CITY_AGENDA_URL =
  "https://opendata-ajuntament.barcelona.cat/data/dataset/2767159c-1c98-46b8-a686-2b25b40cb053/resource/3abb2414-1ee0-446e-9c25-380e938adb73/download";

type AgendaRow = {
  register_id?: string;
  name?: string;
  institution_name?: string;
  addresses_road_name?: string;
  addresses_start_street_number?: string;
  addresses_end_street_number?: string;
  addresses_neighborhood_name?: string;
  addresses_district_name?: string;
  geo_epgs_4326_lat?: string;
  geo_epgs_4326_lon?: string;
  start_date?: string;
  end_date?: string;
  values_description?: string;
};

type ManualMetadata = {
  timeLabel?: string;
  priceType?: "free" | "paid" | "donation" | "unknown";
  priceMin?: number;
  priceLabel?: string;
  venue?: string;
  description?: string;
  sourceUrl?: string;
  category?: "Concert" | "Bar" | "Jam" | "Classical" | "Electronic";
};

const VERIFIED_METADATA: Record<string, ManualMetadata> = {
  "99400783023": {
    timeLabel: "21:30",
    priceType: "paid",
    priceMin: 14,
    priceLabel: "From €14",
    venue: "Paral·lel 62 · Club P62",
    description:
      "Ecuadorian indie rock moving between garage rock, experimental pop and cumbia.",
    sourceUrl:
      "https://paral-lel62.cat/programacio/lolabum-parallel62-barcelona-cat/",
    category: "Concert",
  },
  "99400780566": {
    timeLabel: "20:30",
    priceType: "paid",
    priceMin: 8.8,
    priceLabel: "€8.80",
    venue: "Centre Cívic Can Deu",
    description:
      "Claire Victoria Roberts brings Welsh-rooted contemporary jazz to the Dijous Jazz series.",
    sourceUrl:
      "https://guia.barcelona.cat/en/agenda/detall/concert-fortune-roberts-quintet_99400780566.html",
    category: "Jam",
  },
};

function barcelonaDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['"“”‘’·]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function cleanId(value: string) {
  return value.replace(/\uFEFF/g, "").trim();
}

function cleanTitle(value: string) {
  return value
    .replace(/^Concert\s*["“]?/i, "")
    .replace(/["”](?=,|$)/g, "")
    .trim();
}

function detailUrl(name: string, id: string) {
  return `https://guia.barcelona.cat/en/agenda/detall/${slugify(name)}_${id}.html`;
}

function isMusicEvent(name: string) {
  const normalized = name.toLowerCase();
  const include =
    /concert|música|music|recital|jazz|flamenc|cantada|cant coral|orquestra|simf[oò]nic|òpera|opera|live set|sound system|\bdj\b/.test(
      normalized,
    );
  const exclude =
    /taller|workshop|conferència|xerrada|exposició|curs|classe|cinema|contacontes/.test(
      normalized,
    );
  return include && !exclude;
}

function categoryFor(name: string) {
  const normalized = name.toLowerCase();
  if (
    /clàssic|classic|òpera|opera|orquestra|simf[oò]nic|piano|coral/.test(
      normalized,
    )
  ) {
    return "Classical" as const;
  }
  if (/electr[oò]nic|\bdj\b|live set|sound system/.test(normalized)) {
    return "Electronic" as const;
  }
  if (/jazz|jam|trio|quintet/.test(normalized)) return "Jam" as const;
  return "Concert" as const;
}

function accentFor(name: string, category: ReturnType<typeof categoryFor>) {
  const normalized = name.toLowerCase();
  if (category === "Classical") return "classical" as const;
  if (category === "Electronic") return "club" as const;
  if (/flamenc/.test(normalized)) return "flamenco" as const;
  if (category === "Jam") return "jazz" as const;
  return "sunset" as const;
}

function addressFor(row: AgendaRow) {
  const road = row.addresses_road_name?.trim();
  const number = row.addresses_start_street_number?.trim();
  return [road, number].filter(Boolean).join(", ");
}

function startAtFor(dateKey: string, timeLabel: string) {
  const time = /^\d{2}:\d{2}$/.test(timeLabel) ? timeLabel : "20:00";
  return `${dateKey}T${time}:00+02:00`;
}

export async function GET() {
  try {
    const response = await fetch(CITY_AGENDA_URL, {
      headers: { Accept: "text/csv" },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`City agenda returned ${response.status}`);
    }

    const raw = await response.arrayBuffer();
    const csv = new TextDecoder("utf-16le")
      .decode(raw)
      .replace(/^\uFEFF/, "");
    const parsed = Papa.parse<AgendaRow>(csv, {
      header: true,
      skipEmptyLines: true,
    });

    const today = new Date();
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() + 14);
    const todayKey = barcelonaDateKey(today);
    const cutoffKey = barcelonaDateKey(cutoff);
    const seen = new Set<string>();

    const events = parsed.data
      .filter((row) => row.register_id && row.name && row.start_date)
      .filter((row) => {
        const dateKey = row.start_date!.slice(0, 10);
        return dateKey >= todayKey && dateKey <= cutoffKey;
      })
      .filter((row) => isMusicEvent(row.name!))
      .filter((row) => {
        const id = cleanId(row.register_id!);
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map((row) => {
        const id = cleanId(row.register_id!);
        const title = cleanTitle(row.name!);
        const latitude = Number(row.geo_epgs_4326_lat);
        const longitude = Number(row.geo_epgs_4326_lon);
        const metadata = VERIFIED_METADATA[id] ?? {};
        const category = metadata.category ?? categoryFor(title);
        const dateKey = row.start_date!.slice(0, 10);
        const timeLabel = metadata.timeLabel ?? "Time TBC";
        const address = addressFor(row);

        return {
          id,
          title,
          venue:
            metadata.venue ||
            row.institution_name?.trim() ||
            address ||
            "Barcelona",
          neighborhood:
            row.addresses_neighborhood_name?.trim() ??
            row.addresses_district_name?.trim() ??
            "Barcelona",
          latitude,
          longitude,
          startAt: startAtFor(dateKey, timeLabel),
          timeLabel,
          priceType: metadata.priceType ?? ("unknown" as const),
          priceMin: metadata.priceMin,
          priceLabel: metadata.priceLabel ?? "Check price",
          category,
          description:
            metadata.description ??
            `Official city listing in ${row.addresses_neighborhood_name?.trim() ?? "Barcelona"}. Check the source for the latest schedule and entry details.`,
          source: "Barcelona Cultural Agenda",
          sourceUrl: metadata.sourceUrl ?? detailUrl(row.name!, id),
          accent: accentFor(title, category),
        };
      })
      .filter(
        (event) =>
          Number.isFinite(event.latitude) && Number.isFinite(event.longitude),
      )
      .sort(
        (a, b) =>
          new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
      )
      .slice(0, 80);

    return Response.json(
      {
        events,
        source: "Barcelona Cultural Agenda",
        sourceUrl: CITY_AGENDA_URL,
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, max-age=900, s-maxage=21600",
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        events: [],
        error: error instanceof Error ? error.message : "Unknown feed error",
        fetchedAt: new Date().toISOString(),
      },
      { status: 502 },
    );
  }
}
