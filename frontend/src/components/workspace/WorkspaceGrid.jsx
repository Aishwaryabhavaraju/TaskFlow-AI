import WorkspaceCard from "./WorkspaceCard";

export default function WorkspaceGrid({
  workspaces,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace._id}
          workspace={workspace}
        />
      ))}
    </div>
  );
}