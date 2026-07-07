export default function OutlookEventsList({
  events,
}) {
  return (
    <div className="mt-6 space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="rounded-lg border p-4 dark:border-zinc-700"
        >
          <h4 className="font-semibold">
            {event.title}
          </h4>

          <p className="text-sm text-zinc-500">
            {event.start}
          </p>
        </div>
      ))}
    </div>
  );
}