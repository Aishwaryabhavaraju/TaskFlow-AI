import { useEffect, useMemo, useState } from "react";
import socket from "../socket/socket";
import notificationService from "../services/notificationService";

export default function useNotifications() {
  const [notifications, setNotifications] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (item) => !item.isRead
      ).length,
    [notifications]
  );

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const data =
        await notificationService.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    notificationService
      .getNotifications()
      .then((data) => {
        if (!ignore) {
          setNotifications(data);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(
            err.response?.data?.message ||
              "Unable to load notifications"
          );
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const handleNotification = (notification) => {
      setNotifications((prev) => [
        notification,
        ...prev.filter(
          (item) => item._id !== notification._id
        ),
      ]);
    };

    socket.on(
      "notification:new",
      handleNotification
    );

    return () => {
      socket.off(
        "notification:new",
        handleNotification
      );
    };
  }, []);

  const markAsRead = async (id) => {
    await notificationService.markNotificationRead(
      id
    );

    setNotifications((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              isRead: true,
              readAt: new Date().toISOString(),
            }
          : item
      )
    );
  };

  const markAllAsRead = async () => {
    await notificationService.markAllNotificationsRead();

    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        isRead: true,
        readAt:
          item.readAt ||
          new Date().toISOString(),
      }))
    );
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
}
