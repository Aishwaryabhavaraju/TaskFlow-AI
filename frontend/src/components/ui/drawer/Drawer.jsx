import { X } from "lucide-react";

export default function Drawer({
  open,
  onClose,
  title,
  children,
}) {
  return (
    <>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          <aside
            className="
            fixed
            right-0
            top-0
            z-50
            h-full
            w-full
            max-w-md
            bg-white
            dark:bg-zinc-900
            shadow-xl
            "
          >
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 p-5">
              <h2 className="text-xl font-semibold">
                {title}
              </h2>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            <div className="p-6">
              {children}
            </div>
          </aside>
        </>
      )}
    </>
  );
}