import { useEffect } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import useProject from "../../hooks/useProject";

import ProjectOverview from "../../components/project/ProjectOverview";
import ProjectProgress from "../../components/project/ProjectProgress";
import ProjectMembersCard from "../../components/project/ProjectMembersCard";
import ProjectQuickActions from "../../components/project/ProjectQuickActions";
import ProjectActivity from "../../components/project/ProjectActivity";
import ProjectAIInsights from "../../components/project/ProjectAIInsights";
import DangerZone from "../../components/project/DangerZone";
import MembersManagement from "../../components/project/MembersManagement";

export default function ProjectDetails() {
  const { projectId } = useParams();

  const {
    currentProject,
    fetchProject,
  } = useProject();

  useEffect(() => {
    fetchProject(projectId);
  }, [projectId]);

  if (!currentProject) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          <ProjectOverview
            project={currentProject}
          />

          <ProjectProgress
            progress={
              currentProject.progress || 0
            }
          />

          <ProjectActivity />

          <DangerZone
                project={currentProject}
            />

        </div>

        <div className="space-y-6">

          <MembersManagement
                projectId={projectId}
            />

          <ProjectQuickActions />

          <ProjectAIInsights />

        </div>

      </div>

    </DashboardLayout>
  );
}