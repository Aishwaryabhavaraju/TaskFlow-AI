import { useEffect, useState } from "react";
import WidgetCard from "./WidgetCard";
import { getNotifications } from "../../services/notificationService";
import { Users, Loader2 } from "lucide-react";

export default function TeamActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamActivity = async () => {
      try {
        setLoading(true);
        const data = await getNotifications();
        const list = Array.isArray(data) ? data : [];
        setActivities(list);
      } catch {
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamActivity();
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
    <WidgetCard title="Team Activity">
      {loading ? (
        <div className="flex h-36 items-center justify-center">
          <Loader2 className="animate-spin text-yellow-500" size={20} />
        </div>
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Users className="mb-2 text-zinc-400" size={28} />
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            No team activity yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.slice(0, 5).map((item) => {
            const senderName = item.sender
              ? `${item.sender.firstName || ""} ${item.sender.lastName || ""}`.trim()
              : item.title || "Team Action";
            const initial = senderName.charAt(0).toUpperCase() || "U";

            return (
              <div
                key={item._id || item.id}
                className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/60"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-400 font-bold text-black shadow-sm">
                  {initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">
                    {senderName}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {item.message || item.title}
                  </p>
                </div>
                <span className="text-xs text-zinc-400 shrink-0">
                  {formatTime(item.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </WidgetCard>
  );
}