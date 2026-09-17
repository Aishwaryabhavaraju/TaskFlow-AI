import { Link } from "react-router-dom";
import { Menu, Sparkles, Search } from "lucide-react";

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
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/95 px-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95 sm:px-4 lg:px-6 shadow-sm">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-6">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open navigation"
            className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hidden"
          >
            <Menu size={20} />
          </button>

          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-black shadow-sm font-black">
              <Sparkles size={20} />
            </div>
            <span className="hidden sm:inline">TaskFlow AI</span>
          </Link>

          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

          <Breadcrumb />
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center cursor-pointer"
            aria-label="Open search"
          >
            <span className="hidden md:inline-block">
              <SearchBar />
            </span>
            <span className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-black shadow-xs font-bold">
              <Search size={18} />
            </span>
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
