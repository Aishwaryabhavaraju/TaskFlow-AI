export default function ProductivityCard({
  analytics,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-lg font-semibold">
        Team Productivity
      </h2>

      <p className="text-4xl font-bold">
        {analytics.productivity}%
      </p>

    </div>
  );
}