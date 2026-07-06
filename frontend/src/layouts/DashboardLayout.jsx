import DashboardContainer from "../components/layout/DashboardContainer";
import Navbar from "../components/layout/Navbar";
import DashboardContent from "../components/layout/DashboardContent";
import Sidebar from "../components/layout/Sidebar";
import MobileSidebar from "../components/layout/MobileSidebar";

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