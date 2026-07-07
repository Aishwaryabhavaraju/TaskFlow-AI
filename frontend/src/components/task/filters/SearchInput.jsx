import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
}) {
  return (
    <div className="relative flex-1">

      <Search
        size={18}
        className="absolute left-3 top-3 text-zinc-400"
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search tasks..."
        className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-10 pr-4 dark:border-zinc-700 dark:bg-zinc-900"
      />

    </div>
  );
}