import { useEffect, useState } from "react";
import socket from "../../socket/socket";

export default function OnlineUsers() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    socket.on(
      "onlineUsers",
      data => {

        setUsers(data);

      }
    );

    return () => {

      socket.off("onlineUsers");

    };

  }, []);

  return (

    <div className="rounded-xl border p-4">

      <h3 className="mb-4 font-semibold">

        Online Members

      </h3>

      {users.map(user => (

        <div
          key={user.id}
          className="flex items-center gap-2 py-1"
        >

          <span className="h-2 w-2 rounded-full bg-green-500"></span>

          {user.name}

        </div>

      ))}

    </div>

  );

}