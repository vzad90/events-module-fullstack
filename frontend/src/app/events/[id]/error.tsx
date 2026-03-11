"use client";

interface EventDetailsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function EventDetailsError({ reset }: EventDetailsErrorProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-4 text-xs text-red-100">
      <span className="font-semibold">Cannot load event details</span>
      <p className="text-[11px] text-red-200/90">
        Something went wrong while loading this event. You can try again or go
        back to the events list.
      </p>
      <div className="mt-1 flex gap-2">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-red-100 px-3 py-1 text-[11px] font-medium text-red-900 transition-colors hover:bg-red-200"
        >
          Try again
        </button>
        <a
          href="/events"
          className="inline-flex items-center justify-center rounded-full border border-red-300/60 px-3 py-1 text-[11px] font-medium text-red-100 transition-colors hover:border-red-100 hover:bg-red-900/40"
        >
          Back to events
        </a>
      </div>
    </div>
  );
}

