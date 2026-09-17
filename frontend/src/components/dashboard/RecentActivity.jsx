import { useEffect, useState } from "react";
import WidgetCard from "./WidgetCard";
import { getTasks } from "../../services/taskService";
import { Activity, CheckCircle, Clock, FileText, Loader2 } from "lucide-react";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const res = await getTasks();
        const raw = Array.isArray(res) ? res : res?.tasks || res?.data || [];
        // Sort by most recently updated
        const sorted = [...raw].sort(
          (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
        );
        setActivities(sorted.slice(0, 5));
      } catch {
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMin = Math.floor((now - date) / (1000 * 60));
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <WidgetCard title="Recent Activity">
      {loading ? (
        <div className="flex h-36 items-center justify-center">
          <Loader2 className="animate-spin text-yellow-500" size={20} />
        </div>
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Activity className="mb-2 text-zinc-400" size={28} />
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            No recent activity yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((task) => {
            const isDone = task.status === "Done" || task.status === "Completed";
            const Icon = isDone ? CheckCircle : task.status === "In Progress" ? Clock : FileText;
            const actionText = isDone ? "Task completed" : "Task updated";

            return (
              <div
                key={task._id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400/20 text-yellow-600 dark:text-yellow-400">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{actionText}</p>
                    <p className="text-xs text-zinc-500 truncate max-w-[240px] sm:max-w-md">{task.title}</p>
                  </div>
                </div>
                <span className="text-xs text-zinc-400 shrink-0">
                  {formatTime(task.updatedAt || task.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </WidgetCard>
  );
}