import assert from "node:assert/strict";
import test from "node:test";
import {
  decodeBarcelonaAgendaCsv,
  parseBarcelonaAgendaCsv,
} from "../lib/events/barcelona-agenda";

const header = [
  "register_id",
  "name",
  "institution_name",
  "addresses_road_name",
  "addresses_start_street_number",
  "addresses_end_street_number",
  "addresses_neighborhood_name",
  "addresses_district_name",
  "geo_epgs_4326_lat",
  "geo_epgs_4326_lon",
  "start_date",
  "end_date",
].join(",");

test("decodes the UTF-16LE agenda format", () => {
  const encoded = new TextEncoder().encode("ignored");
  const utf16 = new Uint8Array([0xff, 0xfe, 0x61, 0x00]);
  assert.equal(decodeBarcelonaAgendaCsv(utf16), "a");
  assert.notEqual(decodeBarcelonaAgendaCsv(encoded), "");
});

test("normalizes, filters, and deduplicates current music events", () => {
  const rows = [
    [
      "\uFEFF123",
      '"Concert ""Nit de Jazz"""',
      "Centre Musical",
      "Carrer Major",
      "10",
      "",
      "Gràcia",
      "Gràcia",
      "41.4",
      "2.17",
      "2026-07-30T03:00:00+02:00",
      "2026-07-30T03:00:00+02:00",
    ].join(","),
    [
      "\uFEFF123",
      '"Concert ""Nit de Jazz"""',
      "Centre Musical",
      "Carrer Major",
      "10",
      "",
      "Gràcia",
      "Gràcia",
      "41.4",
      "2.17",
      "2026-07-30T03:00:00+02:00",
      "2026-07-30T03:00:00+02:00",
    ].join(","),
    [
      "\uFEFF999",
      "Taller de música",
      "Centre Musical",
      "Carrer Major",
      "10",
      "",
      "Gràcia",
      "Gràcia",
      "41.4",
      "2.17",
      "2026-07-30T03:00:00+02:00",
      "2026-07-30T03:00:00+02:00",
    ].join(","),
  ];

  const result = parseBarcelonaAgendaCsv([header, ...rows].join("\n"), {
    now: new Date("2026-07-29T10:00:00Z"),
  });

  assert.equal(result.events.length, 1);
  assert.equal(result.occurrences.length, 1);
  assert.equal(result.venues.length, 1);
  assert.equal(result.events[0].sourceEventId, "123");
  assert.equal(result.events[0].title, "Nit de Jazz");
  assert.equal(result.events[0].category, "Jam");
  assert.equal(result.occurrences[0].startTime, null);
  assert.equal(result.occurrences[0].startsAt, null);
  assert.equal(result.occurrences[0].timeLabel, "Time TBC");
});

test("rejects rows with invalid coordinates without inventing a venue", () => {
  const row = [
    "321",
    "Concert sense coordenades",
    "Barcelona",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "2026-07-30T03:00:00+02:00",
    "2026-07-30T03:00:00+02:00",
  ].join(",");

  const result = parseBarcelonaAgendaCsv([header, row].join("\n"), {
    now: new Date("2026-07-29T10:00:00Z"),
  });

  assert.equal(result.events.length, 0);
  assert.equal(result.occurrences.length, 0);
  assert.equal(result.venues.length, 0);
  assert.equal(result.rejectedRows, 1);
});
