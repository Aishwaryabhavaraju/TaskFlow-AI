import PageHeader from "../layout/PageHeader";
import Button from "../common/Button";

export default function MembersHeader({
  onInvite,
}) {
  return (
    <PageHeader
      title="Workspace Members"
      description="Manage members and permissions."
    >
      <Button onClick={onInvite}>
        Invite Member
      </Button>
    </PageHeader>
  );
}