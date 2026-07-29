-- Generated from the Barcelona Cultural Agenda CSV.
-- Snapshot time: 2026-07-29T12:20:00.000Z
-- Regenerate deliberately; do not hand-edit data rows.
INSERT INTO sync_runs (
  id, source, trigger, status, started_at, finished_at, source_fetched_at,
  source_http_status, fetched_rows, accepted_events, accepted_occurrences,
  rejected_rows
) VALUES (
  'seed_20260729122000', 'barcelona_cultural_agenda', 'deployment',
  'success', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z',
  '2026-07-29T12:20:00.000Z', 200, 3381, 33,
  33, 16
) ON CONFLICT(id) DO NOTHING;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_3700c68bc7bc895f', 'avinguda de francesc ferrer i guardia 13|address:avinguda de francesc ferrer i guardia 13', 'Avinguda de Francesc Ferrer i Guàrdia, 13',
  'Avinguda de Francesc Ferrer i Guàrdia, 13', 'el Poble-sec',
  'Sants-Montjuïc', 41.36914809976752, 2.1467430809493484,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_ba3d340742278d7b', 'c almogavers 122|address:c almogavers 122', 'C Almogàvers, 122',
  'C Almogàvers, 122', 'el Parc i la Llacuna del Poblenou',
  'Sant Martí', 41.3977561996673, 2.1910974309944122,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_fe668a511454cbfd', 'c comtessa de sobradiel 8|address:c comtessa de sobradiel 8', 'C Comtessa de Sobradiel, 8',
  'C Comtessa de Sobradiel, 8', 'el Barri Gòtic',
  'Ciutat Vella', 41.38117429208919, 2.1784255951980773,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_1f3db29beb161faf', 'c muntaner 246|address:c muntaner 246', 'C Muntaner, 246',
  'C Muntaner, 246', 'Sant Gervasi - Galvany',
  'Sarrià-Sant Gervasi', 41.39462416093732, 2.1490629497204705,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_caf09f8f3f225e13', 'c nou de la rambla 111|address:c nou de la rambla 111', 'C Nou de la Rambla, 111',
  'C Nou de la Rambla, 111', 'el Poble-sec',
  'Sants-Montjuïc', 41.37437345529078, 2.1695075348590223,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_d37dc159851c3e55', 'carrer de jaume piquet 23|address:carrer de jaume piquet 23', 'Carrer de Jaume Piquet, 23',
  'Carrer de Jaume Piquet, 23', 'Sarrià',
  'Sarrià-Sant Gervasi', 41.3983599977031, 2.1246720318706647,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_1b4aa09558e5f891', 'carrer de piferrer 94|address:carrer de piferrer 94', 'Carrer de Piferrer, 94',
  'Carrer de Piferrer, 94', 'Porta',
  'Nou Barris', 41.43410459884157, 2.1792048887112854,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_3f24dc0db6178789', 'carrer nou de la rambla 111 115|address:carrer nou de la rambla 111 115', 'Carrer Nou de la Rambla, 111-115',
  'Carrer Nou de la Rambla, 111-115', 'el Poble-sec',
  'Sants-Montjuïc', 41.37437331043133, 2.1695059889638286,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_d95dd7956d166181', 'placa reial 17|address:placa reial 17', 'Plaça Reial, 17',
  'Plaça Reial, 17', 'el Barri Gòtic',
  'Ciutat Vella', 41.37973531200141, 2.1752857129194934,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_2c1ba67fd3539423', 'placa reial 18|address:placa reial 18', 'Plaça Reial, 18',
  'Plaça Reial, 18', 'el Barri Gòtic',
  'Ciutat Vella', 41.379790742572375, 2.1751625816640954,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  'ven_40a5473d72cb06d9', 'viaducte de vallcarca 4|address:viaducte de vallcarca 4', 'Viaducte de Vallcarca, 4',
  'Viaducte de Vallcarca, 4', 'Vallcarca i els Penitents',
  'Gràcia', 41.41277639924962, 2.144192188013562,
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400757975', 'barcelona_cultural_agenda',
  '99400757975', 'Adelyne',
  'Official city listing in Porta. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-adelyne_99400757975.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400757980', 'barcelona_cultural_agenda',
  '99400757980', 'Judeet',
  'Official city listing in Porta. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-judeet_99400757980.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400757986', 'barcelona_cultural_agenda',
  '99400757986', 'Maduxa',
  'Official city listing in Porta. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-maduxa_99400757986.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400759645', 'barcelona_cultural_agenda',
  '99400759645', 'Gigi McFarlane',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-gigi-mcfarlane_99400759645.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400759698', 'barcelona_cultural_agenda',
  '99400759698', 'Cicle de concerts ''Nits en Viu''',
  'Official city listing in el Poble-sec. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/cicle-de-concerts-nits-en-viu_99400759698.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400764721', 'barcelona_cultural_agenda',
  '99400764721', 'Aniversari del cafè',
  'Official city listing in Sarrià. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-aniversari-del-cafe_99400764721.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400777488', 'barcelona_cultural_agenda',
  '99400777488', 's Agost 2026 al Harlem Jazz Club',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Jam',
  'https://guia.barcelona.cat/en/agenda/detall/concerts-agost-2026-al-harlem-jazz-club_99400777488.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400781327', 'barcelona_cultural_agenda',
  '99400781327', 'El Mato a Un Policia Motorizado',
  'Official city listing in el Poble-sec. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-el-mato-a-un-policia-motorizado_99400781327.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400782723', 'barcelona_cultural_agenda',
  '99400782723', 'Oliver',
  'Official city listing in Sant Gervasi - Galvany. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-oliver_99400782723.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400782782', 'barcelona_cultural_agenda',
  '99400782782', 'John Butler',
  'Official city listing in el Poble-sec. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-john-butler_99400782782.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400782873', 'barcelona_cultural_agenda',
  '99400782873', 'Pablo Martín Trio – Presentació nou disc “The Standard Us',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Jam',
  'https://guia.barcelona.cat/en/agenda/detall/concert-pablo-martin-trio-presentacio-nou-disc-the-standard-us_99400782873.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400782874', 'barcelona_cultural_agenda',
  '99400782874', 'Camel On Flute',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-camel-on-flute_99400782874.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400782875', 'barcelona_cultural_agenda',
  '99400782875', 'Hernan Jacinto Trio',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Jam',
  'https://guia.barcelona.cat/en/agenda/detall/concert-hernan-jacinto-trio_99400782875.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400782876', 'barcelona_cultural_agenda',
  '99400782876', 'Gonçalo Feijão',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-goncalo-feijao_99400782876.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400782878', 'barcelona_cultural_agenda',
  '99400782878', 'Pablo Murgier Pazdera',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-pablo-murgier-pazdera_99400782878.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783661', 'barcelona_cultural_agenda',
  '99400783661', 'La Delio Valdez',
  'Official city listing in el Parc i la Llacuna del Poblenou. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-la-delio-valdez_99400783661.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783662', 'barcelona_cultural_agenda',
  '99400783662', 'Black Label Society UK',
  'Official city listing in el Parc i la Llacuna del Poblenou. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-black-label-society-uk_99400783662.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783666', 'barcelona_cultural_agenda',
  '99400783666', 'High On Fire',
  'Official city listing in el Parc i la Llacuna del Poblenou. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-high-on-fire_99400783666.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783674', 'barcelona_cultural_agenda',
  '99400783674', 'Godsmack',
  'Official city listing in el Parc i la Llacuna del Poblenou. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-godsmack_99400783674.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783675', 'barcelona_cultural_agenda',
  '99400783675', 'Blackbraid',
  'Official city listing in el Parc i la Llacuna del Poblenou. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-blackbraid_99400783675.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783705', 'barcelona_cultural_agenda',
  '99400783705', 'Stereo Cupid + Drama De Enero',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-stereo-cupid-drama-de-enero_99400783705.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783706', 'barcelona_cultural_agenda',
  '99400783706', 'Revolución Guapachosa',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-revolucion-guapachosa_99400783706.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783707', 'barcelona_cultural_agenda',
  '99400783707', 'Toni Solà Quartet',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-toni-sola-quartet_99400783707.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783708', 'barcelona_cultural_agenda',
  '99400783708', 'Summer Standards: The Sheiman · Pastor · Barceló Sessions',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-summer-standards-the-sheiman-pastor-barcelo-sessions_99400783708.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783709', 'barcelona_cultural_agenda',
  '99400783709', 'Sant Andreu Little Band',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-sant-andreu-little-band_99400783709.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783712', 'barcelona_cultural_agenda',
  '99400783712', 'La Garfield',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-la-garfield_99400783712.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783713', 'barcelona_cultural_agenda',
  '99400783713', 'Olivier Le Goas Trio',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Jam',
  'https://guia.barcelona.cat/en/agenda/detall/concert-olivier-le-goas-trio_99400783713.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783714', 'barcelona_cultural_agenda',
  '99400783714', 'Jazz Pretenders feat Marian Barahona',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Jam',
  'https://guia.barcelona.cat/en/agenda/detall/concert-jazz-pretenders-feat-marian-barahona_99400783714.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783715', 'barcelona_cultural_agenda',
  '99400783715', 'Gregory Groover Jr Quartet',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-gregory-groover-jr-quartet_99400783715.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400783716', 'barcelona_cultural_agenda',
  '99400783716', 'Simon Osuna 4et',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-simon-osuna-4et_99400783716.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400784232', 'barcelona_cultural_agenda',
  '99400784232', 'Emilio Solla – Antonio Lizana Quartetet',
  'Official city listing in el Barri Gòtic. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-emilio-solla-antonio-lizana-quartetet_99400784232.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400784900', 'barcelona_cultural_agenda',
  '99400784900', 'acústic de Collbalades',
  'Official city listing in Vallcarca i els Penitents. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-acustic-de-collbalades_99400784900.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'evt_bcn_99400785683', 'barcelona_cultural_agenda',
  '99400785683', 'Route Resurrection 2026: Mushroomhead',
  'Official city listing in el Poble-sec. Check the source for the latest schedule and entry details.', 'Concert',
  'https://guia.barcelona.cat/en/agenda/detall/concert-route-resurrection-2026-mushroomhead_99400785683.html', 'seed_20260729122000', 'seed_20260729122000',
  '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400759698_20260729', 'evt_bcn_99400759698',
  'ven_3700c68bc7bc895f', '2026-07-29',
  '2026-07-29', NULL,
  NULL, '2026-08-30',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400782782_20260729', 'evt_bcn_99400782782',
  'ven_caf09f8f3f225e13', '2026-07-29',
  '2026-07-29', NULL,
  NULL, '2026-07-29',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400782873_20260729', 'evt_bcn_99400782873',
  'ven_d95dd7956d166181', '2026-07-29',
  '2026-07-29', NULL,
  NULL, '2026-07-29',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783661_20260729', 'evt_bcn_99400783661',
  'ven_ba3d340742278d7b', '2026-07-29',
  '2026-07-29', NULL,
  NULL, '2026-07-29',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400764721_20260730', 'evt_bcn_99400764721',
  'ven_d37dc159851c3e55', '2026-07-30',
  '2026-07-30', NULL,
  NULL, '2026-07-30',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400781327_20260730', 'evt_bcn_99400781327',
  'ven_3700c68bc7bc895f', '2026-07-30',
  '2026-07-30', NULL,
  NULL, '2026-07-30',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400782874_20260730', 'evt_bcn_99400782874',
  'ven_d95dd7956d166181', '2026-07-30',
  '2026-07-30', NULL,
  NULL, '2026-07-30',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400784900_20260730', 'evt_bcn_99400784900',
  'ven_40a5473d72cb06d9', '2026-07-30',
  '2026-07-30', NULL,
  NULL, '2026-07-30',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400782875_20260731', 'evt_bcn_99400782875',
  'ven_d95dd7956d166181', '2026-07-31',
  '2026-07-31', NULL,
  NULL, '2026-07-31',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783705_20260731', 'evt_bcn_99400783705',
  'ven_2c1ba67fd3539423', '2026-07-31',
  '2026-07-31', NULL,
  NULL, '2026-07-31',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400777488_20260801', 'evt_bcn_99400777488',
  'ven_fe668a511454cbfd', '2026-08-01',
  '2026-08-01', NULL,
  NULL, '2026-08-31',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400782876_20260801', 'evt_bcn_99400782876',
  'ven_d95dd7956d166181', '2026-08-01',
  '2026-08-01', NULL,
  NULL, '2026-08-01',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400782878_20260801', 'evt_bcn_99400782878',
  'ven_2c1ba67fd3539423', '2026-08-01',
  '2026-08-01', NULL,
  NULL, '2026-08-01',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783706_20260801', 'evt_bcn_99400783706',
  'ven_d95dd7956d166181', '2026-08-01',
  '2026-08-01', NULL,
  NULL, '2026-08-01',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400782723_20260802', 'evt_bcn_99400782723',
  'ven_1f3db29beb161faf', '2026-08-02',
  '2026-08-02', NULL,
  NULL, '2026-08-02',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783707_20260802', 'evt_bcn_99400783707',
  'ven_d95dd7956d166181', '2026-08-02',
  '2026-08-02', NULL,
  NULL, '2026-08-02',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400757975_20260804', 'evt_bcn_99400757975',
  'ven_1b4aa09558e5f891', '2026-08-04',
  '2026-08-04', NULL,
  NULL, '2026-08-04',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783662_20260804', 'evt_bcn_99400783662',
  'ven_ba3d340742278d7b', '2026-08-04',
  '2026-08-04', NULL,
  NULL, '2026-08-04',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783708_20260804', 'evt_bcn_99400783708',
  'ven_d95dd7956d166181', '2026-08-04',
  '2026-08-04', NULL,
  NULL, '2026-08-04',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783666_20260805', 'evt_bcn_99400783666',
  'ven_ba3d340742278d7b', '2026-08-05',
  '2026-08-05', NULL,
  NULL, '2026-08-05',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783709_20260805', 'evt_bcn_99400783709',
  'ven_d95dd7956d166181', '2026-08-05',
  '2026-08-05', NULL,
  NULL, '2026-08-05',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783712_20260805', 'evt_bcn_99400783712',
  'ven_2c1ba67fd3539423', '2026-08-05',
  '2026-08-05', NULL,
  NULL, '2026-08-05',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400785683_20260805', 'evt_bcn_99400785683',
  'ven_3f24dc0db6178789', '2026-08-05',
  '2026-08-05', NULL,
  NULL, '2026-08-05',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400757980_20260806', 'evt_bcn_99400757980',
  'ven_1b4aa09558e5f891', '2026-08-06',
  '2026-08-06', NULL,
  NULL, '2026-08-06',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783713_20260806', 'evt_bcn_99400783713',
  'ven_2c1ba67fd3539423', '2026-08-06',
  '2026-08-06', NULL,
  NULL, '2026-08-06',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783714_20260807', 'evt_bcn_99400783714',
  'ven_d95dd7956d166181', '2026-08-07',
  '2026-08-07', NULL,
  NULL, '2026-08-07',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783715_20260808', 'evt_bcn_99400783715',
  'ven_d95dd7956d166181', '2026-08-08',
  '2026-08-08', NULL,
  NULL, '2026-08-08',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400759645_20260809', 'evt_bcn_99400759645',
  'ven_d95dd7956d166181', '2026-08-09',
  '2026-08-09', NULL,
  NULL, '2026-08-09',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400757986_20260811', 'evt_bcn_99400757986',
  'ven_1b4aa09558e5f891', '2026-08-11',
  '2026-08-11', NULL,
  NULL, '2026-08-11',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783674_20260811', 'evt_bcn_99400783674',
  'ven_ba3d340742278d7b', '2026-08-11',
  '2026-08-11', NULL,
  NULL, '2026-08-11',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783675_20260811', 'evt_bcn_99400783675',
  'ven_ba3d340742278d7b', '2026-08-11',
  '2026-08-11', NULL,
  NULL, '2026-08-11',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400783716_20260811', 'evt_bcn_99400783716',
  'ven_d95dd7956d166181', '2026-08-11',
  '2026-08-11', NULL,
  NULL, '2026-08-11',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  'occ_bcn_99400784232_20260812', 'evt_bcn_99400784232',
  'ven_d95dd7956d166181', '2026-08-12',
  '2026-08-12', NULL,
  NULL, '2026-08-12',
  NULL, 'Time TBC',
  'unknown', NULL,
  'Check price', 'active', 'seed_20260729122000',
  'seed_20260729122000', '2026-07-29T12:20:00.000Z', '2026-07-29T12:20:00.000Z'
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
  venue_id = excluded.venue_id,
  start_date = excluded.start_date,
  start_time = excluded.start_time,
  starts_at = excluded.starts_at,
  end_date = excluded.end_date,
  ends_at = excluded.ends_at,
  time_label = excluded.time_label,
  price_type = excluded.price_type,
  price_min_cents = excluded.price_min_cents,
  price_label = excluded.price_label,
  status = 'active',
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at;
--> statement-breakpoint
