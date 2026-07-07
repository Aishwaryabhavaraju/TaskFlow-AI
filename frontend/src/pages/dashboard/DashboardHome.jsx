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

import CalendarSummary from "../../components/dashboard/CalendarSummary";
import MiniCalendar from "../../components/dashboard/MiniCalendar";
import TodayTasksWidget from "../../components/dashboard/TodayTasksWidget";
import UpcomingTasksWidget from "../../components/dashboard/UpcomingTasksWidget";
import OverdueTasksWidget from "../../components/dashboard/OverdueTasksWidget";
import NextEventWidget from "../../components/dashboard/NextEventWidget";

import {
  getTodayTasks,
  getUpcomingTasks,
  getOverdueTasks,
} from "../../utils/dashboardCalendarUtils";

export default function DashboardHome() {
  const todayTasks = getTodayTasks(tasks);
const upcomingTasks = getUpcomingTasks(tasks);
const overdueTasks = getOverdueTasks(tasks);

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

      <CalendarSummary
    today={todayTasks.length}
    upcoming={upcomingTasks.length}
    overdue={overdueTasks.length}
  />

  <div className="mt-8 grid gap-6 lg:grid-cols-2">
    <MiniCalendar events={events} />

    <NextEventWidget
      event={events[0]}
    />
  </div>

  <div className="mt-8 grid gap-6 lg:grid-cols-3">
    <TodayTasksWidget
      tasks={todayTasks}
    />

    <UpcomingTasksWidget
      tasks={upcomingTasks.slice(0, 5)}
    />

    <OverdueTasksWidget
      tasks={overdueTasks}
    />
  </div>
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