import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import WorkspaceProfile from "../../components/workspace/WorkspaceProfile";
import EditWorkspaceModal from "../../components/workspace/EditWorkspaceModal";

import useWorkspace from "../../hooks/useWorkspace";
import DangerZone from "../../components/workspace/DangerZone";
import DeleteWorkspaceDialog from "../../components/workspace/DeleteWorkspaceDialog";

export default function WorkspaceDetails() {
  const { workspaceId } = useParams();

  const {
    currentWorkspace,
    fetchWorkspace,
  } = useWorkspace();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, [workspaceId]);

  if (!currentWorkspace) {
    return null;
  }

  return (
    <DashboardLayout>

      <WorkspaceProfile
        workspace={currentWorkspace}
        onEdit={() => setOpen(true)}
      />

      <DangerZone
            onDelete={() => setDeleteOpen(true)}
        />
      <EditWorkspaceModal
        open={open}
        onClose={() => setOpen(false)}
        workspace={currentWorkspace}
      />

      <DeleteWorkspaceDialog
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            workspace={currentWorkspace}
        />
    </DashboardLayout>
  );
}