import TaskStatCard from "./TaskStatCard";

export default function TaskStats({
  tasks,
}) {

  const todo =
    tasks.filter(t => t.status === "Todo").length;

  const progress =
    tasks.filter(
      t => t.status === "In Progress"
    ).length;

  const done =
    tasks.filter(t => t.status === "Done").length;

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-4">

      <TaskStatCard
        title="Total"
        value={tasks.length}
      />

      <TaskStatCard
        title="Todo"
        value={todo}
      />

      <TaskStatCard
        title="In Progress"
        value={progress}
      />

      <TaskStatCard
        title="Done"
        value={done}
      />

    </div>
  );
}