'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

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
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-800 md:flex-row md:items-end">
      <div className="flex flex-1 flex-col gap-1">
        <Label
          htmlFor="search"
          className="text-xs text-neutral-700"
        >
          Search by title
        </Label>
        <Input
          id="search"
          type="text"
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
          placeholder="Type to search..."
          className="h-9 rounded-md px-3"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 md:max-w-[180px]">
        <Label
          htmlFor="date-from"
          className="text-xs text-neutral-700"
        >
          From
        </Label>
        <Input
          id="date-from"
          type="date"
          value={dateFrom}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDateFrom(event.target.value)}
          className="h-9 rounded-md px-3"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 md:max-w-[180px]">
        <Label
          htmlFor="date-to"
          className="text-xs text-neutral-700"
        >
          To
        </Label>
        <Input
          id="date-to"
          type="date"
          value={dateTo}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDateTo(event.target.value)}
          className="h-9 rounded-md px-3"
        />
      </div>
      <div className="flex flex-row gap-2 md:w-auto md:flex-none md:justify-end">
        <Button
          type="button"
          onClick={applyFilters}
          className="h-9 px-4 text-xs md:flex-none"
        >
          Apply
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={clearFilters}
          className="h-9 px-4 text-xs md:flex-none"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

