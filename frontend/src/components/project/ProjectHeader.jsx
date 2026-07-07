import Button from "../common/Button";
import PageHeader from "../layout/PageHeader";

export default function ProjectHeader({
  onCreate,
}) {
  return (
    <PageHeader
      title="Projects"
      description="Manage all projects in your workspace."
    >
      <Button onClick={onCreate}>
        + New Project
      </Button>
    </PageHeader>
  );
}