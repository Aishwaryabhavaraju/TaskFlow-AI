export default function LabelFilter({
  labels = [],
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-xl border p-3 dark:bg-zinc-900"
    >
      <option value="">All Labels</option>

      {labels.map((label) => (
        <option
          key={label}
          value={label}
        >
          {label}
        </option>
      ))}

    </select>
  );
}