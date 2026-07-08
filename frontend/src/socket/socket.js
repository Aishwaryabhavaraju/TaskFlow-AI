import { io } from "socket.io-client";

const socket = io(
  import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_API_BASE_URL?.replace(
      "/api/v1",
      ""
    ) ||
    "http://localhost:5000",
  {
    autoConnect: false,
    transports: ["websocket"],
  }
);

export default socket;
