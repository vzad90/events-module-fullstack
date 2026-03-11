export default function EventsLoading() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="h-4 w-20 rounded bg-neutral-800/70" />
        <div className="h-3 w-40 rounded bg-neutral-900/70" />
      </div>
      <div className="h-20 rounded-xl border border-neutral-800/40 bg-neutral-900/40" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-16 rounded-xl border border-neutral-800/40 bg-neutral-900/40"
          />
        ))}
      </div>
    </div>
  );
}

