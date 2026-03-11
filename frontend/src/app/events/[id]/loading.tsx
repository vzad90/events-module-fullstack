export default function EventDetailsLoading() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="h-3 w-32 rounded bg-neutral-800/60" />
        <div className="h-3 w-24 rounded bg-neutral-800/60" />
      </div>
      <div className="h-4 w-48 rounded bg-neutral-800/60" />
      <div className="h-20 rounded-xl border border-neutral-800/40 bg-neutral-900/40" />
      <div className="h-8 w-28 rounded-full bg-neutral-800/60" />
    </div>
  );
}

