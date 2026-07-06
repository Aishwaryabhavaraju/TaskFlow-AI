export default function Checkbox({
  label,
  ...props
}) {
  return (
    <label
      className="
      flex

      cursor-pointer

      items-center

      gap-3
      "
    >
      <input
        type="checkbox"
        {...props}
        className="
        h-4

        w-4

        accent-yellow-400
        "
      />

      <span className="text-sm">
        {label}
      </span>
    </label>
  );
}