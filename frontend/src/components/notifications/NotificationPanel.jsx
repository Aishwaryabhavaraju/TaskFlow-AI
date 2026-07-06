import NotificationList from "./NotificationList";

export default function NotificationPanel({
  notifications,
  unreadCount,
  onRead,
  onReadAll,
}) {
  return (
    <div
      className="
      absolute
      right-0
      mt-3
      w-96
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
      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-zinc-200
        dark:border-zinc-700
        p-5
        "
      >
        <div>

          <h2 className="font-semibold">
            Notifications
          </h2>

          <p className="text-sm text-zinc-500">
            {unreadCount} unread
          </p>

        </div>

        <button
          onClick={onReadAll}
          className="
          text-sm
          text-yellow-500
          hover:underline
          "
        >
          Mark all read
        </button>
      </div>

      <div className="max-h-[450px] overflow-y-auto p-4">
        <NotificationList
          notifications={notifications}
          onRead={onRead}
        />
      </div>
    </div>
  );
}