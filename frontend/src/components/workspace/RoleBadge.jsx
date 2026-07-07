export default function RoleBadge({
  role,
}) {
  const styles = {
    owner:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",

    admin:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

    manager:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

    member:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

    viewer:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[role]}`}
    >
      {role}
    </span>
  );
}