import NotificationItem from "./NotificationItem";

export default function NotificationList({
  notifications,
  onRead,
}) {
  return (
    <div className="space-y-2">

      {notifications.map((item) => (
        <NotificationItem
          key={item.id}
          notification={item}
          onRead={onRead}
        />
      ))}

    </div>
  );
}