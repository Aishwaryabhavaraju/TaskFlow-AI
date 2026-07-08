import { useMemo } from "react";
import { useSelector } from "react-redux";
import WidgetCard from "./WidgetCard";

const formatDate = (dateString) => {
  if (!dateString) {
    return "No date";
  }

  const date = new Date(dateString);
  const now = new Date();
  const dayDiff = Math.ceil(
    (date.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
  );

  if (dayDiff === 0) {
    return "Today";
  }

  if (dayDiff === 1) {
    return "Tomorrow";
  }

  if (dayDiff <= 7 && dayDiff > 1) {
    return date.toLocaleDateString(undefined, {
      weekday: "short",
    });
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

export default function UpcomingDeadlines() {
  const tasks = useSelector((state) => state.tasks.tasks || []);

  const upcomingDeadlines = useMemo(() => {
    return tasks
      .filter((task) => task?.dueDate)
      .map((task) => ({
        title: task.title || task.name || "Untitled task",
        date: formatDate(task.dueDate),
        dueDate: task.dueDate,
      }))
      .filter((item) => new Date(item.dueDate) >= new Date())
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 3);
  }, [tasks]);

  return (
    <WidgetCard title="Upcoming Deadlines">
      <div className="space-y-4">
        {upcomingDeadlines.length > 0 ? (
          upcomingDeadlines.map((item) => (
            <div
              key={`${item.title}-${item.dueDate}`}
              className="flex justify-between rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3"
            >
              <span>{item.title}</span>
              <span className="text-yellow-500">{item.date}</span>
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3 text-sm text-zinc-600 dark:text-zinc-400">
            No upcoming deadlines found. Create a task with a due date to populate this list.
          </div>
        )}
      </div>
    </WidgetCard>
  );
}