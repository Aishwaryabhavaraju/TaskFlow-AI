export default function Badge({
  children,
  color = "yellow",
}) {
  const colors = {
    yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
    green: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}