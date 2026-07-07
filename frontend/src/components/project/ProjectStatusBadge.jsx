const colors = {
  Planning:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

  Active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

  Completed:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

  Archived:
    "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300",
};

export default function ProjectStatusBadge({
  status,
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}