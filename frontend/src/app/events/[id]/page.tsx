import { fetchEventById } from "@/lib/api/events";
import type { EventDetail } from "@/types/events";
import { ApiError } from "@/types/events";
import { notFound } from "next/navigation";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
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

function EventDetails({ event }: { event: EventDetail }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <a
          href="/events"
          className="inline-flex items-center justify-center rounded-full border border-neutral-700/80 px-3 py-1 text-[11px] font-medium text-neutral-100 transition-colors hover:border-neutral-400 hover:bg-neutral-900/60"
        >
          Back
        </a>
        <span className="text-[11px] text-neutral-400">
          {formatDate(event.date)}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-base font-semibold text-neutral-50">
            {event.title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
          <span>{event.location}</span>
        </div>
      </div>
      <div className="rounded-xl border border-neutral-800/30 bg-neutral-900/40 px-4 py-3 text-xs text-neutral-200">
        <p className="font-medium text-neutral-100">{event.shortDescription}</p>
        <p className="mt-2 whitespace-pre-line text-neutral-200">
          {event.description}
        </p>
      </div>
      <div className="mt-2 flex gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    notFound();
  }

  let event: EventDetail;

  try {
    event = await fetchEventById(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return <EventDetails event={event} />;
}

