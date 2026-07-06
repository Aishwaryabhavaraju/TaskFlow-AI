export default function WidgetCard({
  title,
  children,
  action,
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-zinc-200
      dark:border-zinc-800
      bg-white
      dark:bg-zinc-900
      shadow-sm
      "
    >
      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-zinc-200
        dark:border-zinc-800
        px-6
        py-4
        "
      >
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        {action}
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}