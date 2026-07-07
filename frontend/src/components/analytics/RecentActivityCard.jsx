export default function RecentActivityCard({
  analytics,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-lg font-semibold">
        Recent Activity
      </h2>

      <ul className="space-y-3">

        {analytics.activities.map(
          (activity, index) => (
            <li key={index}>
              • {activity}
            </li>
          )
        )}

      </ul>

    </div>
  );
}