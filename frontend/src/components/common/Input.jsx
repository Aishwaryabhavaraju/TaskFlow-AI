export default function Input({
  label,
  error,
  ...props
}) {
  return (
    <div className="mb-5">

      <label
        className="
        mb-2
        block
        text-sm
        font-medium
        "
      >
        {label}
      </label>

      <input
        {...props}
        className="
        w-full

        rounded-xl

        border

        border-zinc-300

        dark:border-zinc-700

        bg-white

        dark:bg-zinc-900

        px-4

        py-3

        outline-none

        transition

        focus:border-yellow-500

        focus:ring-2

        focus:ring-yellow-500/30
        "
      />

      {error && (
        <p
          className="
          mt-2
          text-sm
          text-red-500
          "
        >
          {error}
        </p>
      )}

    </div>
  );
}