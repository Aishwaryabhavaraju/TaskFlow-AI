const colors = [
  "#6366F1",
  "#EC4899",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#0EA5E9",
];

export default function ProjectColorPicker({
  value,
  onChange,
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={`h-10 w-10 rounded-full border-4 ${
            value === color
              ? "border-black dark:border-white"
              : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}