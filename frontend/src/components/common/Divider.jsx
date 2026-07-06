export default function Divider({
  text = "OR",
}) {
  return (
    <div
      className="
      my-6

      flex

      items-center

      gap-4
      "
    >
      <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />

      <span
        className="
        text-xs

        uppercase

        tracking-widest

        text-zinc-500
        "
      >
        {text}
      </span>

      <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
    </div>
  );
}