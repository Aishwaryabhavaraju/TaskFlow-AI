import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div
      className="
      hidden
      md:flex

      items-center

      gap-3

      rounded-xl

      border

      border-zinc-300
      dark:border-zinc-700

      bg-zinc-100
      dark:bg-zinc-800

      px-4

      py-2

      w-96
      "
    >
      <Search
        size={18}
        className="text-zinc-500"
      />

      <input
        type="text"
        placeholder="Search projects, tasks..."
        className="
        flex-1
        bg-transparent
        outline-none
        text-sm
        "
      />

      <kbd
        className="
        rounded
        bg-zinc-200
        dark:bg-zinc-700

        px-2

        py-1

        text-xs
        "
      >
        Ctrl K
      </kbd>
    </div>
  );
}