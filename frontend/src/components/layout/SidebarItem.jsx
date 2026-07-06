import { NavLink } from "react-router-dom";

export default function SidebarItem({
  title,
  icon: Icon,
  path,
  collapsed,
}) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        transition-all
        duration-200

        ${
          isActive
            ? "bg-yellow-400 text-black font-semibold"
            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }
        `
      }
    >
      <Icon size={20} />

      {!collapsed && <span>{title}</span>}
    </NavLink>
  );
}