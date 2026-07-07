export default function StatusChart({
  analytics,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-lg font-semibold">
        Task Status
      </h2>

      <div className="space-y-3">

        <p>
          Todo : {analytics.todo}
        </p>

        <p>
          In Progress : {analytics.inProgress}
        </p>

        <p>
          Done : {analytics.done}
        </p>

      </div>

    </div>
  );
}