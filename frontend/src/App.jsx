import useSocket from "./hooks/useSocket";
import NotificationToast from "./components/collaboration/NotificationToast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useSocket();

  return (
    <>
      <NotificationToast />
      <AppRoutes />
    </>
  );
}

export default App;