import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <span className="flex items-center gap-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-1.5 w-64 lg:w-80 shadow-xs transition hover:border-yellow-400 dark:hover:border-yellow-400">
      <Search size={16} className="text-zinc-400 shrink-0" />
      <span className="flex-1 text-xs text-left text-zinc-500 dark:text-zinc-400 truncate">
        Search workspace...
      </span>
      <span className="inline-flex items-center gap-1 rounded-lg bg-yellow-400 px-2 py-1 text-xs font-bold text-black shadow-xs shrink-0 hover:bg-yellow-300">
        <Search size={12} />
        Search
      </span>
    </span>
  );
}
