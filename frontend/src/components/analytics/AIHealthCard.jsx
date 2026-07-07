export default function AIHealthCard({
  analytics,
}) {
  return (
    <div className="rounded-2xl border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 p-6">

      <h2 className="mb-5 text-lg font-semibold">
        AI Health Score
      </h2>

      <p className="text-5xl font-bold">
        {analytics.healthScore}/100
      </p>

      <p className="mt-4 text-zinc-600 dark:text-zinc-300">
        {analytics.aiSuggestion}
      </p>

    </div>
  );
}