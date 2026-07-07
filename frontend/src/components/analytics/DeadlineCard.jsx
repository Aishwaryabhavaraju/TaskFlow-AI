export default function DeadlineCard({ analytics }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold">
        Deadline Risk
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-zinc-500">
            Upcoming
          </p>
          <p className="text-3xl font-bold">
            {analytics.overview.upcomingDeadlines}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-500">
            Overdue
          </p>
          <p className="text-3xl font-bold text-red-500">
            {analytics.overview.overdueTasks}
          </p>
        </div>
      </div>
    </div>
  );
}
