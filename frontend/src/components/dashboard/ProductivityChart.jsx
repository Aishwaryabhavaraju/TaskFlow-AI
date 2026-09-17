import { useEffect, useState } from "react";
import WidgetCard from "./WidgetCard";
import { getTasks } from "../../services/taskService";
import { TrendingUp, CheckCircle2, BarChart3, Loader2 } from "lucide-react";

export default function ProductivityChart() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        setLoading(true);
        const res = await getTasks();
        const raw = Array.isArray(res) ? res : res?.tasks || res?.data || [];
        setTasks(raw);
      } catch {
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "Done" || t.status === "Completed"
  ).length;

  const hasData = totalTasks > 0 && completedTasks > 0;
  const efficiencyPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Group task completions by day of week
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayCounts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

  tasks.forEach((t) => {
    if (t.status === "Done" || t.status === "Completed") {
      const date = t.updatedAt ? new Date(t.updatedAt) : new Date();
      const dayIndex = (date.getDay() + 6) % 7; // Map Sun(0)-Sat(6) to Mon(0)-Sun(6)
      const dayName = dayLabels[dayIndex];
      dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
    }
  });

  const maxCompleted = Math.max(...Object.values(dayCounts), 1);

  return (
    <WidgetCard title="Weekly Productivity Velocity">
      {loading ? (
        <div className="flex h-44 items-center justify-center">
          <Loader2 className="animate-spin text-yellow-500" size={24} />
        </div>
      ) : !hasData ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <BarChart3 className="mb-2 text-zinc-400" size={32} />
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            No productivity data yet
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Complete tasks to see weekly velocity trends.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-yellow-500" size={18} />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Weekly Output</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={14} />
              <span>{completedTasks} tasks completed ({efficiencyPercent}% efficiency)</span>
            </div>
          </div>

          <div className="flex h-48 items-end justify-between gap-2 pt-4">
            {dayLabels.map((day) => {
              const count = dayCounts[day] || 0;
              const barHeight = count > 0 ? Math.max(Math.round((count / maxCompleted) * 100), 15) : 0;

              return (
                <div key={day} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-medium text-zinc-500">{count}</span>
                  <div className="relative w-full max-w-[36px] rounded-t-lg bg-zinc-200 dark:bg-zinc-800 h-32 flex items-end">
                    {barHeight > 0 && (
                      <div
                        className="w-full rounded-t-lg bg-yellow-400 transition-all duration-500 hover:bg-yellow-300"
                        style={{ height: `${barHeight}%` }}
                        title={`${count} tasks completed on ${day}`}
                      />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </WidgetCard>
  );
}