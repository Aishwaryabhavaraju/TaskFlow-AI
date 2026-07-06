import { useState } from "react";

export default function Dropdown({
  label,
  items,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2"
      >
        {label}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className="block w-full px-4 py-3 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}