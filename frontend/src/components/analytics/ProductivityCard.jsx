export default function ProductivityCard({ analytics }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-2 text-lg font-semibold">
        Team Productivity
      </h2>
      <p className="text-4xl font-bold">
        {analytics.overview.productivity}%
      </p>
      <p className="mt-3 text-sm text-zinc-500">
        Completed work compared with non-overdue scope.
      </p>
    </div>
  );
}
