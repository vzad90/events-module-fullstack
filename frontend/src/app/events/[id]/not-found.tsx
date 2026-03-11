import Link from "next/link";

export default function EventNotFound() {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <h1 className="text-base font-semibold text-neutral-50">
        Event not found
      </h1>
      <p className="text-xs text-neutral-400">
        Not find an event with the requested identifier
      </p>
      <Link
        href="/events"
        className="mt-1 inline-flex items-center justify-center rounded-full border border-neutral-700/80 px-4 py-2 text-xs font-medium text-neutral-100 transition-colors hover:border-neutral-400 hover:bg-neutral-900/60"
      >
        Back to events
      </Link>
    </div>
  );
}

