import { fetchEvents } from "@/lib/api/events";
import type { EventListItem, PaginatedEventsResponse } from "@/types/events";

interface EventsPageProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  }>;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildPageLink(
  targetPage: number,
  current: { search?: string; dateFrom?: string; dateTo?: string },
): string {
  const params = new URLSearchParams();
  params.set("page", String(targetPage));

  if (current.search) {
    params.set("search", current.search);
  }

  if (current.dateFrom) {
    params.set("dateFrom", current.dateFrom);
  }

  if (current.dateTo) {
    params.set("dateTo", current.dateTo);
  }

  const query = params.toString();

  return query ? `/events?${query}` : "/events";
}

function EventsList({ items }: { items: EventListItem[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((event) => (
        <li
          key={event.id}
          className="rounded-xl border border-neutral-800/20 bg-neutral-900/40 px-4 py-3 transition-colors hover:border-neutral-500/60"
        >
          <a href={`/events/${event.id}`} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold text-neutral-50">
                {event.title}
              </h2>
              <span className="text-xs text-neutral-400">
                {formatDate(event.date)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span>{event.location}</span>
            </div>
            <p className="mt-1 text-xs text-neutral-300">
              {event.shortDescription}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Pagination({
  meta,
  currentFilters,
}: {
  meta: PaginatedEventsResponse;
  currentFilters: { search?: string; dateFrom?: string; dateTo?: string };
}) {
  if (meta.totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: meta.totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-6 flex items-center justify-between gap-4 text-xs text-neutral-300">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-neutral-900/60 px-3 py-1 text-[11px] text-neutral-300">
          Total: {meta.total}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {meta.page > 1 && (
          <a
            href={buildPageLink(meta.page - 1, currentFilters)}
            className="rounded-full border border-neutral-700/80 px-3 py-1 text-[11px] text-neutral-200 transition-colors hover:border-neutral-400 hover:bg-neutral-800/60"
          >
            Prev
          </a>
        )}
        <div className="flex items-center gap-1">
          {pages.map((pageNumber) => {
            const isActive = pageNumber === meta.page;

            return (
              <a
                key={pageNumber}
                href={buildPageLink(pageNumber, currentFilters)}
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-full text-[11px]",
                  isActive
                    ? "bg-neutral-100 text-neutral-900"
                    : "border border-neutral-700/60 text-neutral-200 hover:border-neutral-400 hover:bg-neutral-800/60",
                ].join(" ")}
              >
                {pageNumber}
              </a>
            );
          })}
        </div>
        {meta.page < meta.totalPages && (
          <a
            href={buildPageLink(meta.page + 1, currentFilters)}
            className="rounded-full border border-neutral-700/80 px-3 py-1 text-[11px] text-neutral-200 transition-colors hover:border-neutral-400 hover:bg-neutral-800/60"
          >
            Next
          </a>
        )}
      </div>
    </nav>
  );
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const pageParam = resolvedSearchParams.page;
  const page = pageParam ? Number(pageParam) || 1 : 1;

  const search = resolvedSearchParams.search || undefined;
  const dateFrom = resolvedSearchParams.dateFrom || undefined;
  const dateTo = resolvedSearchParams.dateTo || undefined;

  const eventsResponse = await fetchEvents({
    page,
    search,
    dateFrom,
    dateTo,
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-semibold text-neutral-50">Events</h1>
        <p className="text-xs text-neutral-400">
          Browse upcoming events and open any of them to see details and
          register.
        </p>
      </div>
      {eventsResponse.data.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-neutral-700/60 bg-neutral-900/40 px-4 py-6 text-center text-xs text-neutral-300">
          No events found for the current filters.
        </div>
      ) : (
        <>
          <EventsList items={eventsResponse.data} />
          <Pagination
            meta={eventsResponse}
            currentFilters={{ search, dateFrom, dateTo }}
          />
        </>
      )}
    </div>
  );
}

