export default function AISettings() {
  return (
    <div className="rounded-2xl border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 p-6">

      <h2 className="text-xl font-semibold">
        AI Settings
      </h2>

      <div className="mt-5 space-y-4">

        <label className="flex justify-between">

          AI Task Suggestions

          <input
            type="checkbox"
            defaultChecked
          />

        </label>

        <label className="flex justify-between">

          AI Risk Detection

          <input
            type="checkbox"
            defaultChecked
          />

        </label>

        <label className="flex justify-between">

          AI Project Summary

          <input
            type="checkbox"
            defaultChecked
          />

        </label>

      </div>

    </div>
  );
}