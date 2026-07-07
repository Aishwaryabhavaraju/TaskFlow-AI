export default function LabelBadge({
  label,
}) {
  return (
    <span
      className="rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
    >
      {label}
    </span>
  );
}