export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-zinc-200
      dark:border-zinc-800
      bg-white
      dark:bg-zinc-900
      p-6
      shadow-sm
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className={`${color} rounded-xl p-4 text-white`}
        >
          <Icon size={24} />
        </div>

      </div>
    </div>
  );
}