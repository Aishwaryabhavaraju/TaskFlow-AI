import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-700 px-5 py-4">

      <Search
        size={20}
        className="text-zinc-500"
      />

      <input
        autoFocus
        value={value}
        onChange={onChange}
        placeholder="Search projects, tasks..."
        className="
        w-full
        bg-transparent
        outline-none
        text-lg
        "
      />

    </div>
  );
}