import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SettingsCard from "./SettingsCard";
import notificationService from "../../services/notificationService";

const options = [
  ["inApp", "In-app notifications"],
  ["email", "Email notifications"],
  ["mentions", "Mentions"],
  ["taskUpdates", "Task updates"],
  ["dailyDigest", "Daily email digest"],
  ["slack", "Slack integration"],
  ["discord", "Discord integration"],
  ["push", "Push notifications"],
];

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    notificationService
      .getNotificationPreferences()
      .then(setPreferences)
      .catch(() =>
        toast.error("Unable to load notification preferences")
      );
  }, []);

  const toggle = async (key) => {
    const next = {
      ...preferences,
      [key]: !preferences[key],
    };

    setPreferences(next);
    setSaving(true);

    try {
      const saved =
        await notificationService.updateNotificationPreferences(
          next
        );
      setPreferences(saved);
      toast.success("Notification preferences saved");
    } catch {
      setPreferences(preferences);
      toast.error("Unable to save preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard title="Notifications">
      <div className="space-y-4">
        {options.map(([key, label]) => (
          <label
            key={key}
            className="flex items-center justify-between gap-4"
          >
            <span>{label}</span>

            <input
              type="checkbox"
              checked={Boolean(preferences[key])}
              disabled={saving}
              onChange={() => toggle(key)}
            />
          </label>
        ))}
      </div>
    </SettingsCard>
  );
}
