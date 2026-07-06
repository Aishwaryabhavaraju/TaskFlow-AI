const colors = [
  "#F59E0B",
  "#3B82F6",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

export default function ColorPicker({
  value,
  onChange,
}) {
  return (
    <div className="flex gap-3">
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
          style={{
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}