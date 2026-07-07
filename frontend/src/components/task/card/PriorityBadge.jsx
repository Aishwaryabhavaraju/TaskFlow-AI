const colors = {
  Low: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",

  Medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",

  High:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",

  Critical:
    "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300",
};

export default function PriorityBadge({
  priority,
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[priority]
      }`}
    >
      {priority}
    </span>
  );
}