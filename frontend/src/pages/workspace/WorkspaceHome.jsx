import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import WorkspaceHeader from "../../components/workspace/WorkspaceHeader";
import WorkspaceGrid from "../../components/workspace/WorkspaceGrid";
import CreateWorkspaceModal from "../../components/workspace/CreateWorkspaceModal";

import EmptyState from "../../components/ui/empty/EmptyState";
import CardSkeleton from "../../components/ui/skeleton/CardSkeleton";

import useWorkspace from "../../hooks/useWorkspace";

export default function WorkspaceHome() {
  const {
    loading,
    workspaces,
    fetchWorkspaces,
  } = useWorkspace();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <DashboardLayout>
      <WorkspaceHeader
        onCreate={() => setOpen(true)}
      />

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : workspaces.length === 0 ? (
        <EmptyState
          title="No Workspaces"
          description="Create your first workspace to start collaborating."
          button={
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg bg-yellow-500 px-5 py-2 font-medium text-white hover:bg-yellow-600"
            >
              Create Workspace
            </button>
          }
        />
      ) : (
        <WorkspaceGrid workspaces={workspaces} />
      )}

      <CreateWorkspaceModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </DashboardLayout>
  );
}