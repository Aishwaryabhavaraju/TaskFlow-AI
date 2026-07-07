export default function FilterChip({
  active,
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-zinc-200 dark:bg-zinc-700"
      }`}
    >
      {children}
    </button>
  );
}