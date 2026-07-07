export default function RecentActivityCard({ analytics }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-5 text-lg font-semibold">
        Recent Activity
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-zinc-500">
            <tr>
              <th className="pb-3">Task</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Priority</th>
              <th className="pb-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {analytics.recentActivity.map((activity) => (
              <tr
                key={activity.taskId}
                className="border-t border-zinc-100 dark:border-zinc-800"
              >
                <td className="py-3">{activity.title}</td>
                <td className="py-3">{activity.status}</td>
                <td className="py-3">{activity.priority}</td>
                <td className="py-3">
                  {new Date(
                    activity.updatedAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
