import { useState } from "react";
import { Bell } from "lucide-react";

import NotificationPanel from "../notifications/NotificationPanel";
import useNotifications from "../../hooks/useNotifications";

export default function NotificationButton() {
  const [open, setOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        type="button"
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        className="
        relative
        rounded-xl
        p-3
        hover:bg-zinc-100
        dark:hover:bg-zinc-800
        "
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span
            className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-xs
            text-white
            "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationPanel
          notifications={notifications}
          unreadCount={unreadCount}
          onRead={markAsRead}
          onReadAll={markAllAsRead}
          loading={loading}
        />
      )}

    </div>
  );
}
