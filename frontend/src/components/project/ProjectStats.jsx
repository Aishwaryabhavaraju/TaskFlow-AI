export default function ProjectStats({ projects }) {
  const total = projects.length;

  const active = projects.filter(
    (p) => p.status === "Active"
  ).length;

  const completed = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const planning = projects.filter(
    (p) => p.status === "Planning"
  ).length;

  const cards = [
    {
      title: "Total",
      value: total,
    },
    {
      title: "Active",
      value: active,
    },
    {
      title: "Planning",
      value: planning,
    },
    {
      title: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="grid gap-5 mb-8 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6"
        >
          <p className="text-sm text-zinc-500">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}