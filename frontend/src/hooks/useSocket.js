import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../socket/socket";
import useActivity from "./useActivity";

export default function useSocket() {

  const { user } = useSelector(
    state => state.auth
  );

  useEffect(() => {

    if (!user) return;

    socket.connect();

    socket.emit("join", {
      userId: user.id,
    });

    return () => {

      socket.disconnect();

    };

  }, [user]);

  const { addNewActivity } =
useActivity();

useEffect(() => {

  socket.on(
    "activityAdded",
    activity => {

      addNewActivity(activity);

    }
  );

  return () => {

    socket.off("activityAdded");

  };

}, []);

  return socket;

}