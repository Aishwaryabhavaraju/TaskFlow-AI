import { NavLink } from "react-router-dom";

import useSidebar from "../../hooks/useSidebar";

export default function MobileSidebarItem({
  title,
  icon: Icon,
  path,
}) {
  const { closeSidebar } = useSidebar();

  return (
    <NavLink
      to={path}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-4

        rounded-xl

        px-5

        py-4

        ${
          isActive
            ? "bg-yellow-400 text-black font-semibold"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }
        `
      }
    >
      <Icon size={22} />

      {title}
    </NavLink>
  );
}