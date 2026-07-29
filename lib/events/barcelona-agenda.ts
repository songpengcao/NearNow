import Papa from "papaparse";

export const BARCELONA_AGENDA_SOURCE = "barcelona_cultural_agenda";
export const BARCELONA_AGENDA_URL =
  "https://opendata-ajuntament.barcelona.cat/data/dataset/2767159c-1c98-46b8-a686-2b25b40cb053/resource/3abb2414-1ee0-446e-9c25-380e938adb73/download";

export type EventCategory =
  | "Concert"
  | "Bar"
  | "Jam"
  | "Classical"
  | "Electronic";

export type PriceType = "free" | "paid" | "donation" | "unknown";

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
  priceType?: PriceType;
  priceMinCents?: number;
  priceLabel?: string;
  venue?: string;
  description?: string;
  sourceUrl?: string;
  category?: EventCategory;
};

export type NormalizedVenue = {
  id: string;
  venueKey: string;
  name: string;
  address: string | null;
  neighborhood: string | null;
  district: string | null;
  latitude: number;
  longitude: number;
};

export type NormalizedEvent = {
  id: string;
  source: typeof BARCELONA_AGENDA_SOURCE;
  sourceEventId: string;
  title: string;
  description: string;
  category: EventCategory;
  sourceUrl: string;
};

export type NormalizedOccurrence = {
  id: string;
  eventId: string;
  venueId: string;
  occurrenceKey: string;
  startDate: string;
  startTime: string | null;
  startsAt: string | null;
  endDate: string | null;
  endsAt: string | null;
  timeLabel: string;
  priceType: PriceType;
  priceMinCents: number | null;
  priceLabel: string;
};

export type NormalizedAgenda = {
  fetchedRows: number;
  rejectedRows: number;
  venues: NormalizedVenue[];
  events: NormalizedEvent[];
  occurrences: NormalizedOccurrence[];
};

const VERIFIED_METADATA: Record<string, ManualMetadata> = {
  "99400783023": {
    timeLabel: "21:30",
    priceType: "paid",
    priceMinCents: 1400,
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
    priceMinCents: 880,
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

function addCalendarDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
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

function normalizeKeyPart(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function stableHash(value: string) {
  let first = 0x811c9dc5;
  let second = 0x9e3779b9;

  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    first = Math.imul(first ^ code, 0x01000193);
    second = Math.imul(second ^ code, 0x85ebca6b);
  }

  return [first, second]
    .map((part) => (part >>> 0).toString(16).padStart(8, "0"))
    .join("");
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

function categoryFor(name: string): EventCategory {
  const normalized = name.toLowerCase();
  if (
    /clàssic|classic|òpera|opera|orquestra|simf[oò]nic|piano|coral/.test(
      normalized,
    )
  ) {
    return "Classical";
  }
  if (/electr[oò]nic|\bdj\b|live set|sound system/.test(normalized)) {
    return "Electronic";
  }
  if (/jazz|jam|trio|quintet/.test(normalized)) return "Jam";
  return "Concert";
}

function addressFor(row: AgendaRow) {
  const road = row.addresses_road_name?.trim();
  const startNumber = row.addresses_start_street_number?.trim();
  const endNumber = row.addresses_end_street_number?.trim();
  const number =
    startNumber && endNumber && startNumber !== endNumber
      ? `${startNumber}-${endNumber}`
      : startNumber;
  return [road, number].filter(Boolean).join(", ");
}

function preciseStartAt(dateKey: string, timeLabel?: string) {
  if (!timeLabel || !/^\d{2}:\d{2}$/.test(timeLabel)) return null;

  const probe = new Date(`${dateKey}T12:00:00Z`);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    timeZoneName: "longOffset",
  }).formatToParts(probe);
  const offset =
    parts.find((part) => part.type === "timeZoneName")?.value
      .replace("GMT", "") ?? "+00:00";
  return `${dateKey}T${timeLabel}:00${offset}`;
}

function dateKeyFromSource(value?: string) {
  const match = value?.match(/^\d{4}-\d{2}-\d{2}/);
  return match?.[0] ?? null;
}

function venueIdentity(
  name: string,
  address: string,
  latitude: number,
  longitude: number,
) {
  const normalizedName = normalizeKeyPart(name);
  const location = address
    ? `address:${normalizeKeyPart(address)}`
    : `coordinates:${latitude.toFixed(5)},${longitude.toFixed(5)}`;
  return `${normalizedName}|${location}`;
}

export function decodeBarcelonaAgendaCsv(raw: ArrayBuffer | Uint8Array) {
  const bytes =
    raw instanceof Uint8Array
      ? raw
      : new Uint8Array(raw, 0, raw.byteLength);
  return new TextDecoder("utf-16le").decode(bytes).replace(/^\uFEFF/, "");
}

export function parseBarcelonaAgendaCsv(
  csv: string,
  options: { now?: Date; horizonDays?: number } = {},
): NormalizedAgenda {
  const now = options.now ?? new Date();
  const horizonDays = options.horizonDays ?? 14;
  const parsed = Papa.parse<AgendaRow>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  const todayKey = barcelonaDateKey(now);
  const cutoffKey = barcelonaDateKey(addCalendarDays(now, horizonDays));
  const seenSourceIds = new Set<string>();
  const venueMap = new Map<string, NormalizedVenue>();
  const events: NormalizedEvent[] = [];
  const occurrences: NormalizedOccurrence[] = [];
  let rejectedRows = parsed.errors.length;

  for (const row of parsed.data) {
    const sourceEventId = cleanId(row.register_id ?? "");
    const rawTitle = row.name?.trim() ?? "";
    const startDate = dateKeyFromSource(row.start_date);

    if (!sourceEventId || !rawTitle || !startDate) {
      rejectedRows += 1;
      continue;
    }
    if (startDate < todayKey || startDate > cutoffKey) continue;
    if (!isMusicEvent(rawTitle)) continue;
    if (seenSourceIds.has(sourceEventId)) continue;

    const latitudeValue = row.geo_epgs_4326_lat?.trim() ?? "";
    const longitudeValue = row.geo_epgs_4326_lon?.trim() ?? "";
    const latitude = latitudeValue ? Number(latitudeValue) : Number.NaN;
    const longitude = longitudeValue ? Number(longitudeValue) : Number.NaN;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      rejectedRows += 1;
      continue;
    }

    seenSourceIds.add(sourceEventId);
    const metadata = VERIFIED_METADATA[sourceEventId] ?? {};
    const title = cleanTitle(rawTitle);
    const address = addressFor(row);
    const venueName =
      metadata.venue ||
      row.institution_name?.trim() ||
      address ||
      "Barcelona";
    const venueKey = venueIdentity(
      venueName,
      address,
      latitude,
      longitude,
    );
    const venueId = `ven_${stableHash(venueKey)}`;
    const eventId = `evt_bcn_${sourceEventId}`;
    const occurrenceKey = startDate;
    const startTime =
      metadata.timeLabel && /^\d{2}:\d{2}$/.test(metadata.timeLabel)
        ? metadata.timeLabel
        : null;
    const endDate = dateKeyFromSource(row.end_date);

    venueMap.set(venueKey, {
      id: venueId,
      venueKey,
      name: venueName,
      address: address || null,
      neighborhood: row.addresses_neighborhood_name?.trim() || null,
      district: row.addresses_district_name?.trim() || null,
      latitude,
      longitude,
    });

    events.push({
      id: eventId,
      source: BARCELONA_AGENDA_SOURCE,
      sourceEventId,
      title,
      description:
        metadata.description ??
        `Official city listing in ${row.addresses_neighborhood_name?.trim() || "Barcelona"}. Check the source for the latest schedule and entry details.`,
      category: metadata.category ?? categoryFor(title),
      sourceUrl: metadata.sourceUrl ?? detailUrl(rawTitle, sourceEventId),
    });

    occurrences.push({
      id: `occ_bcn_${sourceEventId}_${startDate.replaceAll("-", "")}`,
      eventId,
      venueId,
      occurrenceKey,
      startDate,
      startTime,
      startsAt: preciseStartAt(startDate, startTime ?? undefined),
      endDate,
      endsAt: null,
      timeLabel: metadata.timeLabel ?? "Time TBC",
      priceType: metadata.priceType ?? "unknown",
      priceMinCents: metadata.priceMinCents ?? null,
      priceLabel: metadata.priceLabel ?? "Check price",
    });
  }

  events.sort((left, right) =>
    left.sourceEventId.localeCompare(right.sourceEventId),
  );
  occurrences.sort(
    (left, right) =>
      left.startDate.localeCompare(right.startDate) ||
      left.eventId.localeCompare(right.eventId),
  );

  return {
    fetchedRows: parsed.data.length,
    rejectedRows,
    venues: [...venueMap.values()].sort((left, right) =>
      left.venueKey.localeCompare(right.venueKey),
    ),
    events,
    occurrences,
  };
}
