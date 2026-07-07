export default function ColumnHeader({
  title,
  count,
}) {
  return (
    <div className="mb-5 flex items-center justify-between">

      <h2 className="text-lg font-bold">

        {title}

      </h2>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

        {count}

      </span>

    </div>
  );
}