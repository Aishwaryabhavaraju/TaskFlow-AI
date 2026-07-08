import { useState } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import Avatar from "../common/Avatar";

import useLogout from "../../hooks/useLogout";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  const logout = useLogout();

  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-2
        hover:bg-zinc-100
        dark:hover:bg-zinc-800
        transition
        "
      >
        <Avatar user={user} />

        <div className="hidden md:block text-left">

          <h4 className="font-semibold">
            {user?.firstName} {user?.lastName}
          </h4>

          <p className="text-sm text-zinc-500">
            {user?.email}
          </p>

        </div>

        <ChevronDown size={18} />

      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          mt-3
          w-64
          rounded-2xl
          border
          border-zinc-200
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-900
          shadow-xl
          overflow-hidden
          z-50
          "
        >
          <Link
            to="/settings#profile"
            onClick={() => setOpen(false)}
            className="
            flex
            w-full
            items-center
            gap-3
            px-5
            py-4
            hover:bg-zinc-100
            dark:hover:bg-zinc-800
            "
          >
            <User size={18} />

            Profile
          </Link>

          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className="
            flex
            w-full
            items-center
            gap-3
            px-5
            py-4
            hover:bg-zinc-100
            dark:hover:bg-zinc-800
            "
          >
            <Settings size={18} />

            Settings
          </Link>

          <button
            onClick={logout}
            className="
            flex
            w-full
            items-center
            gap-3
            px-5
            py-4
            text-red-500
            hover:bg-red-50
            dark:hover:bg-red-950
            "
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>
      )}

    </div>
  );
}
