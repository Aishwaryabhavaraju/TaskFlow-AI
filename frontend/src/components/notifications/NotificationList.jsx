import NotificationItem from "./NotificationItem";

export default function NotificationList({
  notifications,
  onRead,
}) {
  if (!notifications.length) {
    return (
      <p className="p-6 text-center text-sm text-zinc-500">
        No notifications yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">

      {notifications.map((item) => (
        <NotificationItem
          key={item._id}
          notification={item}
          onRead={onRead}
        />
      ))}

    </div>
  );
}
