export default function SearchItem({ item, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect && onSelect(item)}
      className="flex w-full items-center justify-between rounded-xl p-3.5 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
    >
      <div>
        <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
          {item.title}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {item.description}
        </div>
      </div>
      <span className="rounded-full bg-yellow-400/20 px-2.5 py-0.5 text-xs font-semibold text-yellow-700 dark:text-yellow-300 shrink-0">
        {item.type}
      </span>
    </button>
  );
}