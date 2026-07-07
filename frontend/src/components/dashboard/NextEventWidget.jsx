import { Clock } from "lucide-react";

export default function NextEventWidget({
  event,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-3">

        <Clock className="text-blue-600" />

        <h2 className="text-lg font-semibold">
          Next Event
        </h2>

      </div>

      {event ? (
        <>
          <h3 className="mt-4 font-semibold">
            {event.title}
          </h3>

          <p className="text-zinc-500">
            {event.start}
          </p>
        </>
      ) : (
        <p className="mt-4 text-zinc-500">
          No upcoming events.
        </p>
      )}
    </div>
  );
}