import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import WorkspaceStats from "../../components/workspace/WorkspaceStats";
import RecentProjects from "../../components/workspace/RecentProjects";
import RecentTasks from "../../components/workspace/RecentTasks";
import WorkspaceMembers from "../../components/workspace/WorkspaceMembers";
import WorkspaceActivity from "../../components/workspace/WorkspaceActivity";
import WorkspaceAIInsights from "../../components/workspace/WorkspaceAIInsights";
import QuickActions from "../../components/workspace/QuickActions";

export default function WorkspaceDashboard() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Development Workspace"
        description="Overview of your workspace activity and productivity."
      />

      <div className="space-y-8">

        <WorkspaceStats />

        <div className="grid gap-6 xl:grid-cols-3">

          <div className="space-y-6 xl:col-span-2">
            <RecentProjects />
            <RecentTasks />
          </div>

          <div className="space-y-6">
            <WorkspaceMembers />
            <WorkspaceAIInsights />
            <QuickActions />
          </div>

        </div>

        <WorkspaceActivity />

      </div>
    </DashboardLayout>
  );
}