import TaskStatCard from "./TaskStatCard";

export default function TaskStats({ tasks = [] }) {
  const todo = tasks.filter(
    (t) => t.status === "Todo" || t.status === "To Do"
  ).length;

  const progress = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  const review = tasks.filter(
    (t) => t.status === "Review"
  ).length;

  const done = tasks.filter(
    (t) => t.status === "Done" || t.status === "Completed"
  ).length;

  return (
    <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-5">
      <TaskStatCard title="Total Tasks" value={tasks.length} />
      <TaskStatCard title="To Do" value={todo} />
      <TaskStatCard title="In Progress" value={progress} />
      <TaskStatCard title="Review" value={review} />
      <TaskStatCard title="Done" value={done} />
    </div>
  );
}