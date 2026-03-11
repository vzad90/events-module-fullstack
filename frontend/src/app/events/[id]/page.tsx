import { fetchEventById } from "@/lib/api/events";
import type { EventDetail } from "@/types/events";
import { ApiError } from "@/types/events";
import { RegistrationSection } from "./registration-section";
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
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-neutral-500">
        <nav className="flex items-center gap-1 text-sm">
          <a
            href="/events"
            className="rounded-full border border-transparent px-2 py-1 text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-100"
          >
            Events
          </a>
          <span>/</span>
          <span className="line-clamp-1 text-neutral-500">{event.title}</span>
        </nav>
        <span className="font-medium text-neutral-600">
          {formatDate(event.date)}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-neutral-900">
          {event.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
          <span>{event.location}</span>
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm text-neutral-800 shadow-sm">
        <p className="font-medium text-neutral-900">{event.shortDescription}</p>
        <p className="mt-3 whitespace-pre-line text-neutral-700">
          {event.description}
        </p>
      </div>
      <RegistrationSection eventId={event.id} eventTitle={event.title} />
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

