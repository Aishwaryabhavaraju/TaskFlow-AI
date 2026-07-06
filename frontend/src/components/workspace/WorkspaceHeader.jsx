import PageHeader from "../layout/PageHeader";
import Button from "../common/Button";

export default function WorkspaceHeader({
  onCreate,
}) {
  return (
    <PageHeader
      title="Workspaces"
      description="Manage all your workspaces."
    >
      <Button onClick={onCreate}>
        New Workspace
      </Button>
    </PageHeader>
  );
}