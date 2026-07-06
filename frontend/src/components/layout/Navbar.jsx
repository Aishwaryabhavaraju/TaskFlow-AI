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

  // 👇 Add it here
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
        bg-white
        dark:bg-zinc-900
        px-6
        "
      >
        {/* Left */}
        <div className="flex items-center gap-5">
          <button
            onClick={toggleSidebar}
            className="
            rounded-lg
            p-2

            hover:bg-zinc-100
            dark:hover:bg-zinc-800

            md:hidden
            "
        >
            <Menu size={20}/>
        </button>

          <Breadcrumb />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Click to open search modal */}
          <div onClick={() => setOpen(true)}>
            <SearchBar />
          </div>

          <ThemeSwitcher />

          <NotificationButton />

          <UserMenu />
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}