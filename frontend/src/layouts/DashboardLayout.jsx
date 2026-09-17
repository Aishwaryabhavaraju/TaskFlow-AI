import Navbar from "../components/layout/Navbar";
import DashboardContent from "../components/layout/DashboardContent";
import Sidebar from "../components/layout/Sidebar";
import MobileSidebar from "../components/layout/MobileSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Top Navbar */}
      <Navbar />

      {/* Desktop Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </div>
  );
}
