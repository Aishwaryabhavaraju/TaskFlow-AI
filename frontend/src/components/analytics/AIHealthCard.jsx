export default function AIHealthCard({ analytics }) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/30">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          AI Insights
        </h2>
        <span className="text-3xl font-bold">
          {analytics.overview.healthScore}/100
        </span>
      </div>

      <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
        {analytics.aiRecommendations.map((item) => (
          <li key={item} className="leading-6">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
