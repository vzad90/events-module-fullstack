"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export function EventsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = useMemo(
    () => ({
      search: searchParams.get("search") ?? "",
      dateFrom: searchParams.get("dateFrom") ?? "",
      dateTo: searchParams.get("dateTo") ?? "",
    }),
    [searchParams],
  );

  const [search, setSearch] = useState(initial.search);
  const [dateFrom, setDateFrom] = useState(initial.dateFrom);
  const [dateTo, setDateTo] = useState(initial.dateTo);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (search.trim().length > 0) {
      params.set("search", search.trim());
    }

    if (dateFrom) {
      params.set("dateFrom", dateFrom);
    }

    if (dateTo) {
      params.set("dateTo", dateTo);
    }
    params.set("page", "1");

    const query = params.toString();
    const target = query ? `/events?${query}` : "/events";

    router.push(target);
  }, [router, search, dateFrom, dateTo]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setDateFrom("");
    setDateTo("");
    router.push("/events");
  }, [router]);

  return (
    <form
      className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-800 md:flex-row md:items-end"
      onSubmit={(event) => {
        event.preventDefault();
        applyFilters();
      }}
    >
      <div className="flex flex-1 flex-col gap-1">
        <label
          htmlFor="search"
          className="text-xs font-medium text-neutral-700"
        >
          Search by title
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Type to search..."
          className="h-9 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-500"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 md:max-w-[180px]">
        <label
          htmlFor="date-from"
          className="text-xs font-medium text-neutral-700"
        >
          From
        </label>
        <input
          id="date-from"
          type="date"
          value={dateFrom}
          onChange={(event) => setDateFrom(event.target.value)}
          className="h-9 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-500"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 md:max-w-[180px]">
        <label
          htmlFor="date-to"
          className="text-xs font-medium text-neutral-700"
        >
          To
        </label>
        <input
          id="date-to"
          type="date"
          value={dateTo}
          onChange={(event) => setDateTo(event.target.value)}
          className="h-9 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-500"
        />
      </div>
      <div className="flex flex-row gap-2 md:w-auto md:flex-none md:justify-end">
        <button
          type="submit"
          className="inline-flex h-9 flex-1 items-center justify-center rounded-full bg-neutral-900 px-4 text-xs font-medium text-neutral-50 transition-colors hover:bg-neutral-800 md:flex-none"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex h-9 flex-1 items-center justify-center rounded-full border border-neutral-300 bg-transparent px-4 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-100 md:flex-none"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

