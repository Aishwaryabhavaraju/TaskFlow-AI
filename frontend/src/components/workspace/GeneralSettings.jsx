import { useEffect, useState } from "react";
import SettingsCard from "./SettingsCard";
import useWorkspace from "../../hooks/useWorkspace";
import toast from "react-hot-toast";

export default function GeneralSettings() {
  const { currentWorkspace, saveSettings } = useWorkspace();
  const [name, setName] = useState(currentWorkspace?.name || "");
  const [description, setDescription] = useState(
    currentWorkspace?.description || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentWorkspace) {
      setName(currentWorkspace.name || "");
      setDescription(currentWorkspace.description || "");
    }
  }, [currentWorkspace]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Workspace name is required");
      return;
    }

    try {
      setLoading(true);
      await saveSettings(currentWorkspace?._id, {
        name,
        description,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      });
      toast.success("Workspace general settings saved successfully");
    } catch {
      toast.error("Failed to save workspace settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsCard title="General">
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Workspace Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workspace Name"
            className="w-full rounded-lg border p-3 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Workspace Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Workspace Description"
            className="w-full rounded-lg border p-3 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 outline-none focus:border-yellow-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-yellow-400 px-5 py-2.5 font-semibold text-black hover:bg-yellow-300 disabled:opacity-60 transition"
          >
            {loading ? "Saving..." : "Save Workspace Settings"}
          </button>
        </div>
      </form>
    </SettingsCard>
  );
}