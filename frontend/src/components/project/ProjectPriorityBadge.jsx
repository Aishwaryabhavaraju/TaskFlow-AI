const colors = {
  Low:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

  Medium:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

  High:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",

  Critical:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function ProjectPriorityBadge({
  priority,
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${colors[priority]}`}
    >
      {priority}
    </span>
  );
}