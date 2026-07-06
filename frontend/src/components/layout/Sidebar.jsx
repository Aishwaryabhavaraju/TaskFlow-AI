import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import { sidebarItems } from "./sidebarData";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        ${
          collapsed ? "w-24" : "w-72"
        }

        hidden
        md:flex

        flex-col

        border-r
        border-zinc-200
        dark:border-zinc-800

        bg-white
        dark:bg-zinc-900

        transition-all
        duration-300
      `}
    >
      {/* Logo */}

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
        {!collapsed && (
          <h1
            className="
            text-2xl
            font-bold
            text-yellow-500
            "
          >
            TaskFlow AI
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
          rounded-lg
          p-2
          hover:bg-zinc-100
          dark:hover:bg-zinc-800
          "
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Workspace */}

      {!collapsed && (
        <div className="p-5">

          <div
            className="
            rounded-xl
            bg-yellow-400
            p-4
            text-black
            "
          >
            <p className="text-xs font-semibold">
              WORKSPACE
            </p>

            <h2 className="mt-1 font-bold">
              My Workspace
            </h2>
          </div>

        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-4">

        <SidebarSection
          title="Navigation"
          collapsed={collapsed}
        >
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.title}
              {...item}
              collapsed={collapsed}
            />
          ))}
        </SidebarSection>

      </nav>
    </aside>
  );
}