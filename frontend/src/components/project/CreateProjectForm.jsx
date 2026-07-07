import { useState } from "react";

import Button from "../common/Button";

import ProjectStatusSelect from "./ProjectStatusSelect";
import ProjectPrioritySelect from "./ProjectPrioritySelect";
import ProjectColorPicker from "./ProjectColorPicker";
import ProjectCoverUpload from "./ProjectCoverUpload";

export default function CreateProjectForm({
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    dueDate: "",
    color: "#6366F1",
    coverImage: null,
  });

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-5">

      <input
        required
        placeholder="Project Name"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

      <textarea
        rows={4}
        placeholder="Description"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

      <ProjectStatusSelect
        value={form.status}
        onChange={(value) => update("status", value)}
      />

      <ProjectPrioritySelect
        value={form.priority}
        onChange={(value) => update("priority", value)}
      />

      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => update("dueDate", e.target.value)}
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

      <ProjectColorPicker
        value={form.color}
        onChange={(value) => update("color", value)}
      />

      <ProjectCoverUpload
        onChange={(file) => update("coverImage", file)}
      />

      <Button className="w-full">
        Create Project
      </Button>

    </form>
  );
}