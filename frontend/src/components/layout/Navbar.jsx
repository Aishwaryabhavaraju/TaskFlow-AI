import { Menu } from "lucide-react";

import Breadcrumb from "./Breadcrumb";
import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import ThemeSwitcher from "./ThemeSwitcher";
import UserMenu from "./UserMenu";

import SearchModal from "../search/SearchModal";
import useCommandPalette from "../../hooks/useCommandPalette";

import useSidebar from "../../hooks/useSidebar";

export default function Navbar() {
  const { open, setOpen } = useCommandPalette();
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <header
        className="
        sticky
        top-0
        z-40
        flex
        h-16
        items-center
        justify-between
        border-b
        border-zinc-200
        dark:border-zinc-800
        bg-white/95
        dark:bg-zinc-900/95
        px-3
        backdrop-blur
        sm:px-4
        lg:px-6
        "
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-4 lg:gap-5">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open navigation"
            className="
            rounded-lg
            p-2
            hover:bg-zinc-100
            dark:hover:bg-zinc-800
            md:hidden
            "
          >
            <Menu size={20} />
          </button>

          <Breadcrumb />
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hidden md:block"
            aria-label="Open search"
          >
            <SearchBar />
          </button>

          <ThemeSwitcher />

          <NotificationButton />

          <UserMenu />
        </div>
      </header>

      <SearchModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
