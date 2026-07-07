import ProjectListItem from "./ProjectListItem";

export default function ProjectList({
  projects,
}) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectListItem
          key={project._id}
          project={project}
        />
      ))}
    </div>
  );
}