import { fetchEvents } from "@/lib/api/events";
import type { EventListItem, PaginatedEventsResponse } from "@/types/events";
import { Suspense } from "react";
import { EventsFilters } from "./filters";
import type { Metadata } from "next";

interface EventsPageProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Events",
  description: "Browse upcoming events and register for them.",
};

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
          className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm transition hover:border-neutral-300 hover:shadow-md"
        >
          <a
            href={`/events/${event.id}`}
            className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
          >
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-base font-semibold text-neutral-900">
                  {event.title}
                </h2>
                <span className="text-sm font-medium text-neutral-600">
                  {formatDate(event.date)}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                <span>{event.location}</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-neutral-700 sm:mt-0 sm:max-w-xs sm:text-right">
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
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
      {meta.page > 1 ? (
        <a
          href={buildPageLink(meta.page - 1, currentFilters)}
          className="inline-flex items-center gap-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
        >
          &lt; Previous
        </a>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 font-medium text-neutral-400">
          &lt; Previous
        </span>
      )}
      <div className="flex items-center gap-1">
        {pages.map((pageNumber) => {
          const isActive = pageNumber === meta.page;

          return (
            <a
              key={pageNumber}
              href={buildPageLink(pageNumber, currentFilters)}
              className={[
                "flex h-9 min-w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-neutral-900 text-white"
                  : "border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50",
              ].join(" ")}
            >
              {pageNumber}
            </a>
          );
        })}
      </div>
      {meta.page < meta.totalPages ? (
        <a
          href={buildPageLink(meta.page + 1, currentFilters)}
          className="inline-flex items-center gap-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
        >
          Next &gt;
        </a>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 font-medium text-neutral-400">
          Next &gt;
        </span>
      )}
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
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-neutral-900">Events</h1>
        <p className="text-sm text-neutral-600">
          Browse upcoming events and open any of them to see details and
          register.
        </p>
      </div>
      <Suspense fallback={null}>
        <EventsFilters />
      </Suspense>
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

