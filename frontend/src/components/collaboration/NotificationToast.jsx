import { toast } from "react-hot-toast";
import { useEffect } from "react";
import socket from "../../socket/socket";

export default function NotificationToast() {

  useEffect(() => {

    socket.on(
      "notification",
      message => {

        toast(message);

      }
    );

    return () => {

      socket.off("notification");

    };

  }, []);

  return null;

}