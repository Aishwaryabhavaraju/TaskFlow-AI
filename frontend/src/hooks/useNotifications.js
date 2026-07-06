import { useState } from "react";
import { notificationData } from "../components/notifications/notificationData";

export default function useNotifications() {
  const [notifications, setNotifications] =
    useState(notificationData);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}