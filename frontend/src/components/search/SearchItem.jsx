export default function SearchItem({
  item,
}) {
  return (
    <button
      className="
      w-full
      rounded-xl
      p-4
      text-left
      transition
      hover:bg-zinc-100
      dark:hover:bg-zinc-800
      "
    >
      <div className="font-semibold">

        {item.title}

      </div>

      <div className="text-sm text-zinc-500">

        {item.description}

      </div>

      <span
        className="
        mt-2
        inline-block
        rounded-full
        bg-yellow-100
        px-2
        py-1
        text-xs
        text-yellow-700
        dark:bg-yellow-900
        dark:text-yellow-300
        "
      >
        {item.type}
      </span>
    </button>
  );
}