import DashboardContainer from "../components/layout/DashboardContainer";
import Navbar from "../components/layout/Navbar";
import DashboardContent from "../components/layout/DashboardContent";
import Sidebar from "../components/layout/Sidebar";
import MobileSidebar from "../components/layout/MobileSidebar";
import { CalendarDays } from "lucide-react";
import { GanttChart } from "lucide-react";

export default function DashboardLayout({
  children,
}) {
  return (
    <>
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Desktop Layout */}
      <DashboardContainer>

        <Sidebar />
        <NavLink
          to="/calendar"
          className={navLinkClass}
        >
          <CalendarDays size={20} />
          <span>Calendar</span>
        </NavLink>

        <div className="flex flex-1 flex-col">

          <Navbar />

          <DashboardContent>
            {children}
          </DashboardContent>

        </div>

      </DashboardContainer>
    </>
  );
}