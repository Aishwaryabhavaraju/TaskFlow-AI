export default function MemberSearch({
  value,
  onChange,
}) {
  return (
    <input
      placeholder="Search members..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3"
    />
  );
}