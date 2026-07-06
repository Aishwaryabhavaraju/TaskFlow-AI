import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";

import ProjectOverview from "../../components/dashboard/ProjectOverview";
import TaskOverview from "../../components/dashboard/TaskOverview";
import UpcomingDeadlines from "../../components/dashboard/UpcomingDeadlines";
import TeamActivity from "../../components/dashboard/TeamActivity";
import ProductivityChart from "../../components/dashboard/ProductivityChart";
import RecentActivity from "../../components/dashboard/RecentActivity";

import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Monitor projects, tasks, productivity, and AI insights."
      >
        <Button>New Project</Button>
      </PageHeader>

      {/* Welcome Banner */}
      <WelcomeCard />

      {/* Statistics */}
      <StatsGrid />

      {/* Quick Actions */}
      <QuickActions />

      {/* Project & Task Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProjectOverview />
        <TaskOverview />
      </div>

      {/* Deadlines & Team Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingDeadlines />
        <TeamActivity />
      </div>

      {/* Productivity Chart */}
      <ProductivityChart />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}