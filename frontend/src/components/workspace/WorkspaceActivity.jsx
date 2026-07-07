const activities = [
  "John created Project Alpha",
  "Emma completed Task #24",
  "Alex invited Sarah",
  "AI generated sprint summary",
];

export default function WorkspaceActivity() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="border-l-2 border-yellow-500 pl-4"
          >
            <p>{activity}</p>

            <span className="text-sm text-zinc-500">
              Just now
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}