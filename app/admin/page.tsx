import Link from "next/link";
import { requireChatGPTUser, chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { isAdminUser } from "@/lib/admin-auth";
import {
  getAdminDashboardData,
  type AdminCategory,
  type AdminView,
  type OccurrenceStatus,
} from "@/lib/admin-data";
import SyncButton from "./sync-button";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const views: Array<{ id: AdminView; label: string; icon: string }> = [
  { id: "overview", label: "Overview", icon: "⌁" },
  { id: "events", label: "Events", icon: "♪" },
  { id: "venues", label: "Venues", icon: "⌂" },
  { id: "syncs", label: "Sync history", icon: "↻" },
];

const categories: AdminCategory[] = [
  "all",
  "Concert",
  "Bar",
  "Jam",
  "Classical",
  "Electronic",
];
const statuses: OccurrenceStatus[] = [
  "all",
  "active",
  "removed",
  "cancelled",
];

function valueOf(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function validView(value: string | undefined): AdminView {
  return views.some((view) => view.id === value)
    ? (value as AdminView)
    : "overview";
}

function validCategory(value: string | undefined): AdminCategory {
  return categories.includes(value as AdminCategory)
    ? (value as AdminCategory)
    : "all";
}

function validStatus(value: string | undefined): OccurrenceStatus {
  return statuses.includes(value as OccurrenceStatus)
    ? (value as OccurrenceStatus)
    : "all";
}

function formatDate(value: string | null, includeTime = false) {
  if (!value) return "—";
  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value,
  );
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(includeTime
      ? { hour: "2-digit", minute: "2-digit", hour12: false }
      : {}),
  }).format(date);
}

function relativeFreshness(value: string | null) {
  if (!value) return "No successful sync";
  const elapsed = Date.now() - new Date(value).getTime();
  const hours = Math.max(0, Math.round(elapsed / 3_600_000));
  if (hours < 1) return "Less than an hour ago";
  if (hours === 1) return "1 hour ago";
  if (hours < 48) return `${hours} hours ago`;
  return formatDate(value, true);
}

function statusLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const view = validView(valueOf(params.view));
  const query = valueOf(params.q)?.trim().slice(0, 100) ?? "";
  const category = validCategory(valueOf(params.category));
  const status = validStatus(valueOf(params.status));
  const user = await requireChatGPTUser("/admin");

  if (!isAdminUser(user)) {
    return (
      <main className="admin-access-page">
        <div className="admin-access-card">
          <span className="admin-access-mark">NN</span>
          <p className="admin-eyebrow">NearNow Control Room</p>
          <h1>Admin access is not configured for this account.</h1>
          <p>
            You are signed in as <strong>{user.email}</strong>, but this email
            is not present in the server-side admin allowlist.
          </p>
          <Link className="admin-secondary-button" href="/">
            Return to NearNow
          </Link>
        </div>
      </main>
    );
  }

  let dashboard;
  try {
    dashboard = await getAdminDashboardData({ query, category, status });
  } catch (error) {
    return (
      <main className="admin-access-page">
        <div className="admin-access-card admin-access-card--error">
          <span className="admin-access-mark">DB</span>
          <p className="admin-eyebrow">Database unavailable</p>
          <h1>The event catalogue could not be opened.</h1>
          <p>
            Apply the D1 migrations before using the control room. Existing
            public-page fallback behavior is unaffected.
          </p>
          <code>
            {error instanceof Error ? error.message : "Unexpected database error"}
          </code>
        </div>
      </main>
    );
  }

  const maxCategoryCount = Math.max(
    1,
    ...dashboard.categoryCounts.map((item) => item.count),
  );

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <Link className="admin-brand" href="/admin">
            <span className="admin-brand-mark">N</span>
            <span>
              <strong>NearNow</strong>
              <small>Control room</small>
            </span>
          </Link>

          <nav className="admin-nav" aria-label="Admin sections">
            {views.map((item) => (
              <Link
                className={view === item.id ? "is-active" : ""}
                href={`/admin?view=${item.id}`}
                key={item.id}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="admin-sidebar-footer">
          <SyncButton />
          <div className="admin-account">
            <span>{user.displayName.charAt(0).toUpperCase()}</span>
            <div>
              <strong>{user.displayName}</strong>
              <small>{user.email}</small>
            </div>
          </div>
          <div className="admin-account-links">
            <Link href="/">View public site</Link>
            <Link href={chatGPTSignOutPath("/admin")}>Sign out</Link>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">Barcelona · Live music operations</p>
            <h1>{views.find((item) => item.id === view)?.label}</h1>
          </div>
          <div className="admin-freshness">
            <span
              className={`admin-status-dot admin-status-dot--${dashboard.latestSync?.status ?? "empty"}`}
            />
            <div>
              <small>Last successful sync</small>
              <strong>
                {relativeFreshness(dashboard.lastSuccessfulSync?.finishedAt ?? null)}
              </strong>
            </div>
          </div>
        </header>

        {view === "overview" && (
          <>
            <section className="admin-stat-grid" aria-label="Catalogue summary">
              <article className="admin-stat-card admin-stat-card--primary">
                <span>Upcoming performances</span>
                <strong>{dashboard.stats.upcoming}</strong>
                <small>Active occurrences in D1</small>
              </article>
              <article className="admin-stat-card">
                <span>Events</span>
                <strong>{dashboard.stats.events}</strong>
                <small>Unique source listings</small>
              </article>
              <article className="admin-stat-card">
                <span>Venues</span>
                <strong>{dashboard.stats.venues}</strong>
                <small>Normalized locations</small>
              </article>
              <article className="admin-stat-card">
                <span>Sync runs</span>
                <strong>{dashboard.stats.syncRuns}</strong>
                <small>Recorded collection attempts</small>
              </article>
            </section>

            <section className="admin-overview-grid">
              <article className="admin-panel">
                <div className="admin-panel-heading">
                  <div>
                    <p className="admin-eyebrow">Distribution</p>
                    <h2>Upcoming by category</h2>
                  </div>
                  <Link href="/admin?view=events">See all events</Link>
                </div>
                <div className="admin-category-chart">
                  {dashboard.categoryCounts.map((item) => (
                    <div className="admin-category-row" key={item.category}>
                      <span>{item.category}</span>
                      <div>
                        <i
                          style={{
                            width: `${Math.max(8, (item.count / maxCategoryCount) * 100)}%`,
                          }}
                        />
                      </div>
                      <strong>{item.count}</strong>
                    </div>
                  ))}
                  {dashboard.categoryCounts.length === 0 && (
                    <p className="admin-empty-copy">No upcoming events.</p>
                  )}
                </div>
              </article>

              <article className="admin-panel admin-sync-panel">
                <div className="admin-panel-heading">
                  <div>
                    <p className="admin-eyebrow">Pipeline health</p>
                    <h2>Latest collection</h2>
                  </div>
                  <Link href="/admin?view=syncs">History</Link>
                </div>
                {dashboard.latestSync ? (
                  <div className="admin-latest-sync">
                    <div className="admin-latest-sync-status">
                      <span
                        className={`admin-status-badge admin-status-badge--${dashboard.latestSync.status}`}
                      >
                        {statusLabel(dashboard.latestSync.status)}
                      </span>
                      <time>
                        {formatDate(dashboard.latestSync.startedAt, true)}
                      </time>
                    </div>
                    <dl>
                      <div>
                        <dt>Fetched rows</dt>
                        <dd>{dashboard.latestSync.fetchedRows}</dd>
                      </div>
                      <div>
                        <dt>Accepted events</dt>
                        <dd>{dashboard.latestSync.acceptedEvents}</dd>
                      </div>
                      <div>
                        <dt>Occurrences</dt>
                        <dd>{dashboard.latestSync.acceptedOccurrences}</dd>
                      </div>
                      <div>
                        <dt>Rejected rows</dt>
                        <dd>{dashboard.latestSync.rejectedRows}</dd>
                      </div>
                    </dl>
                  </div>
                ) : (
                  <p className="admin-empty-copy">
                    No synchronization has been recorded yet.
                  </p>
                )}
              </article>
            </section>

            <section className="admin-panel admin-next-events">
              <div className="admin-panel-heading">
                <div>
                  <p className="admin-eyebrow">Next on the calendar</p>
                  <h2>Upcoming performances</h2>
                </div>
                <Link href="/admin?view=events">Open catalogue</Link>
              </div>
              <EventTable events={dashboard.events.slice(0, 8)} />
            </section>
          </>
        )}

        {view === "events" && (
          <section className="admin-panel admin-catalogue-panel">
            <div className="admin-panel-heading admin-panel-heading--stacked">
              <div>
                <p className="admin-eyebrow">D1 catalogue</p>
                <h2>{dashboard.events.length} matching performances</h2>
              </div>
              <form className="admin-filter-form" method="get">
                <input type="hidden" name="view" value="events" />
                <label>
                  <span>Search</span>
                  <input
                    name="q"
                    type="search"
                    defaultValue={query}
                    placeholder="Artist, venue, neighborhood…"
                  />
                </label>
                <label>
                  <span>Category</span>
                  <select name="category" defaultValue={category}>
                    {categories.map((item) => (
                      <option value={item} key={item}>
                        {item === "all" ? "All categories" : item}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Status</span>
                  <select name="status" defaultValue={status}>
                    {statuses.map((item) => (
                      <option value={item} key={item}>
                        {item === "all" ? "All statuses" : statusLabel(item)}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit">Apply filters</button>
              </form>
            </div>
            <EventTable events={dashboard.events} />
          </section>
        )}

        {view === "venues" && (
          <section className="admin-panel admin-catalogue-panel">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-eyebrow">Location index</p>
                <h2>{dashboard.venues.length} normalized venues</h2>
              </div>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Venue</th>
                    <th>Area</th>
                    <th>Address</th>
                    <th>Occurrences</th>
                    <th>Next date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.venues.map((venue) => (
                    <tr key={venue.id}>
                      <td>
                        <strong>{venue.name}</strong>
                      </td>
                      <td>
                        {venue.neighborhood ?? "—"}
                        {venue.district && <small>{venue.district}</small>}
                      </td>
                      <td>{venue.address ?? "—"}</td>
                      <td>{venue.occurrences}</td>
                      <td>{formatDate(venue.nextDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {view === "syncs" && (
          <section className="admin-panel admin-catalogue-panel">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-eyebrow">Ingestion audit</p>
                <h2>Synchronization history</h2>
              </div>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Trigger</th>
                    <th>Started</th>
                    <th>Rows</th>
                    <th>Events</th>
                    <th>Rejected</th>
                    <th>Diagnostic</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.syncRuns.map((syncRun) => (
                    <tr key={syncRun.id}>
                      <td>
                        <span
                          className={`admin-status-badge admin-status-badge--${syncRun.status}`}
                        >
                          {statusLabel(syncRun.status)}
                        </span>
                      </td>
                      <td>{statusLabel(syncRun.trigger)}</td>
                      <td>{formatDate(syncRun.startedAt, true)}</td>
                      <td>{syncRun.fetchedRows}</td>
                      <td>{syncRun.acceptedEvents}</td>
                      <td>{syncRun.rejectedRows}</td>
                      <td className="admin-diagnostic">
                        {syncRun.errorCode ?? "—"}
                        {syncRun.errorMessage && (
                          <small>{syncRun.errorMessage}</small>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function EventTable({
  events,
}: {
  events: Awaited<ReturnType<typeof getAdminDashboardData>>["events"];
}) {
  if (events.length === 0) {
    return <p className="admin-empty-copy">No performances match this view.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table admin-events-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th aria-label="Source" />
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.occurrenceId}>
              <td>
                <strong>{event.title}</strong>
                <small>{event.occurrenceId}</small>
              </td>
              <td>
                {formatDate(event.startDate)}
                <small>{event.timeLabel}</small>
              </td>
              <td>
                {event.venue ?? "Barcelona"}
                <small>{event.neighborhood ?? "—"}</small>
              </td>
              <td>
                <span className="admin-category-badge">{event.category}</span>
              </td>
              <td>{event.priceLabel}</td>
              <td>
                <span
                  className={`admin-status-badge admin-status-badge--${event.status}`}
                >
                  {statusLabel(event.status)}
                </span>
              </td>
              <td>
                <a
                  className="admin-source-link"
                  href={event.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open source for ${event.title}`}
                >
                  ↗
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
