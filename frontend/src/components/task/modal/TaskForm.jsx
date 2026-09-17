import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Paperclip, FileText, X } from "lucide-react";

import TaskTitleField from "../form/TaskTitleField";
import TaskDescriptionField from "../form/TaskDescriptionField";
import TaskPrioritySelect from "../form/TaskPrioritySelect";
import TaskStatusSelect from "../form/TaskStatusSelect";
import TaskDueDate from "../form/TaskDueDate";
import TaskEstimate from "../form/TaskEstimate";
import TaskLabels from "../form/TaskLabels";
import TaskAssignees from "../form/TaskAssignees";
import AIGenerateButton from "../form/AIGenerateButton";

import Button from "../../common/Button";
import useTask from "../../../hooks/useTask";
import useAI from "../../../hooks/useAI";
import useProjectMembers from "../../../hooks/useProjectMembers";
import useAttachment from "../../../hooks/useAttachment";

export default function TaskForm({
  projectId,
  initialStatus = "To Do",
  onSuccess,
  onCancel,
}) {
  const { createNewTask } = useTask();
  const { generateTaskDescription } = useAI();
  const { members = [], fetchMembers } = useProjectMembers();
  const { uploadFile } = useAttachment();

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: initialStatus,
    dueDate: "",
    estimatedHours: 0,
    labels: "",
    assignedTo: "",
  });

  useEffect(() => {
    if (initialStatus) {
      setForm((prev) => ({ ...prev, status: initialStatus }));
    }
  }, [initialStatus]);

  useEffect(() => {
    if (projectId) {
      fetchMembers(projectId);
    }
  }, [projectId]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenerateAI = async () => {
    if (!form.title.trim()) {
      toast.error("Please enter a task title first.");
      return;
    }

    try {
      setIsAiGenerating(true);
      const desc = await generateTaskDescription(form.title);
      if (desc) {
        handleChange("description", desc);
        toast.success("AI generated task description!");
      }
    } catch {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      project: projectId,
      assignedTo: form.assignedTo ? [form.assignedTo] : [],
      labels: typeof form.labels === "string"
        ? form.labels.split(",").map((l) => l.trim()).filter(Boolean)
        : form.labels,
    };

    const createdTask = await createNewTask(payload);

    if (createdTask && createdTask._id && selectedFile) {
      try {
        await uploadFile(createdTask._id, selectedFile);
        toast.success("File attached successfully!");
      } catch (err) {
        toast.error("Task created, but file attachment upload failed.");
      }
    } else if (createdTask) {
      toast.success("Task created successfully!");
    }

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TaskTitleField
        value={form.title}
        onChange={(v) => handleChange("title", v)}
      />

      <AIGenerateButton
        onClick={handleGenerateAI}
        loading={isAiGenerating}
        disabled={!form.title.trim()}
      />

      <TaskDescriptionField
        value={form.description}
        onChange={(v) => handleChange("description", v)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TaskPrioritySelect
          value={form.priority}
          onChange={(v) => handleChange("priority", v)}
        />

        <TaskStatusSelect
          value={form.status}
          onChange={(v) => handleChange("status", v)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TaskDueDate
          value={form.dueDate}
          onChange={(v) => handleChange("dueDate", v)}
        />

        <TaskEstimate
          value={form.estimatedHours}
          onChange={(v) => handleChange("estimatedHours", v)}
        />
      </div>

      <TaskAssignees
        value={form.assignedTo}
        onChange={(v) => handleChange("assignedTo", v)}
        members={members}
      />

      <TaskLabels
        value={form.labels}
        onChange={(v) => handleChange("labels", v)}
      />

      {/* Choose File Attachment Field */}
      <div className="space-y-2 pt-1">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Attachments (Choose File)
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
            <Paperclip size={18} className="text-yellow-500" />
            <span>{selectedFile ? "Change File" : "Choose File 📎"}</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedFile(file);
                }
              }}
            />
          </label>

          {selectedFile ? (
            <div className="flex items-center gap-2 rounded-xl bg-zinc-100 px-3 py-2 text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
              <FileText size={15} className="text-blue-500 shrink-0" />
              <span className="max-w-[200px] truncate font-medium">{selectedFile.name}</span>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="ml-1 rounded p-0.5 text-zinc-400 hover:bg-zinc-200 hover:text-red-500 dark:hover:bg-zinc-700"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              No file chosen (Attach documents, images, PDFs)
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t dark:border-zinc-800">
        <Button
          type="button"
          variant="outline"
          className="w-auto px-5"
          onClick={onCancel || onSuccess}
        >
          Back
        </Button>

        <Button type="submit" variant="primary" className="w-auto px-6">
          Create Task
        </Button>
      </div>
    </form>
  );
}