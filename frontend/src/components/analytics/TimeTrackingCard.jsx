export default function TimeTrackingCard({
  analytics,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-lg font-semibold">
        Time Tracked
      </h2>

      <p className="text-3xl font-bold">
        {analytics.hoursTracked} hrs
      </p>

    </div>
  );
}