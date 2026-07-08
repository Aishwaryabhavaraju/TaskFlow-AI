import { toast } from "react-hot-toast";
import { useEffect } from "react";
import socket from "../../socket/socket";

export default function NotificationToast() {

  useEffect(() => {

    const showNotification = notification => {
      toast(
        notification?.message ||
          notification?.title ||
          "New notification"
      );
    };

    socket.on(
      "notification:new",
      showNotification
    );

    return () => {

      socket.off(
        "notification:new",
        showNotification
      );

    };

  }, []);

  return null;

}
