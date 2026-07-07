import { Search } from "lucide-react";

export default function TaskSearch({
  value,
  onChange,
}) {
  return (
    <div className="relative">

      <Search
        className="absolute left-3 top-3 text-zinc-400"
        size={18}
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search tasks..."
        className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-3 pl-10 pr-4"
      />

    </div>
  );
}