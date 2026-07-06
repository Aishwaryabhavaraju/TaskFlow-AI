import { Inbox } from "lucide-react";

export default function EmptyState({
  title,
  description,
  button,
}) {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      rounded-2xl
      border-2
      border-dashed
      border-zinc-300
      dark:border-zinc-700
      bg-white
      dark:bg-zinc-900
      px-8
      py-16
      text-center
      "
    >
      <div
        className="
        mb-6
        rounded-full
        bg-yellow-100
        p-5
        dark:bg-yellow-900/20
        "
      >
        <Inbox
          size={42}
          className="text-yellow-500"
        />
      </div>

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-zinc-500">
        {description}
      </p>

      {button && (
        <div className="mt-8">
          {button}
        </div>
      )}
    </div>
  );
}