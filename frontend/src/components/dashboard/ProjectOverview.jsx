import WidgetCard from "./WidgetCard";

const projects = [
  {
    name: "TaskFlow AI",
    progress: 80,
  },
  {
    name: "School ERP",
    progress: 55,
  },
  {
    name: "Portfolio",
    progress: 100,
  },
];

export default function ProjectOverview() {
  return (
    <WidgetCard title="Project Progress">
      <div className="space-y-6">

        {projects.map((project) => (
          <div key={project.name}>

            <div className="flex justify-between">

              <p>{project.name}</p>

              <span>{project.progress}%</span>

            </div>

            <div className="mt-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700">

              <div
                className="h-full rounded-full bg-yellow-500"
                style={{
                  width: `${project.progress}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>
    </WidgetCard>
  );
}