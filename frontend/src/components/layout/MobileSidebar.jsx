import { X } from "lucide-react";

import useSidebar from "../../hooks/useSidebar";

import MobileSidebarItem from "./MobileSidebarItem";

import { sidebarItems } from "./sidebarData";

export default function MobileSidebar() {
  const {
    mobileOpen,
    closeSidebar,
  } = useSidebar();

  return (
    <>
      {mobileOpen && (
        <>
          {/* Overlay */}

          <div
            onClick={closeSidebar}
            className="
            fixed
            inset-0
            z-40
            bg-black/50
            md:hidden
            "
          />

          {/* Sidebar */}

          <aside
            className="
            fixed

            left-0
            top-0

            z-50

            h-full

            w-72

            bg-white
            dark:bg-zinc-900

            shadow-xl

            md:hidden
            "
          >
            <div
              className="
              flex
              items-center
              justify-between

              border-b

              border-zinc-200
              dark:border-zinc-800

              p-5
              "
            >
              <h1
                className="
                text-2xl
                font-bold
                text-yellow-500
                "
              >
                TaskFlow AI
              </h1>

              <button
                onClick={closeSidebar}
              >
                <X />
              </button>
            </div>

            <nav className="space-y-2 p-4">

              {sidebarItems.map((item) => (
                <MobileSidebarItem
                  key={item.title}
                  {...item}
                />
              ))}

            </nav>

          </aside>
        </>
      )}
    </>
  );
}