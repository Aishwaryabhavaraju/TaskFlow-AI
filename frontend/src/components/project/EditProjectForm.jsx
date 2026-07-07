import { useState } from "react";

import Button from "../common/Button";

import ProjectStatusSelect from "./ProjectStatusSelect";
import ProjectPrioritySelect from "./ProjectPrioritySelect";
import ProjectColorPicker from "./ProjectColorPicker";

export default function EditProjectForm({
  project,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: project.name || "",
    description:
      project.description || "",
    status:
      project.status || "Planning",
    priority:
      project.priority || "Medium",
    dueDate:
      project.dueDate
        ? project.dueDate.substring(0, 10)
        : "",
    color:
      project.color || "#6366F1",
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
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      <input
        required
        value={form.name}
        onChange={(e) =>
          update("name", e.target.value)
        }
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

      <textarea
        rows={4}
        value={form.description}
        onChange={(e) =>
          update(
            "description",
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

      <ProjectStatusSelect
        value={form.status}
        onChange={(value) =>
          update("status", value)
        }
      />

      <ProjectPrioritySelect
        value={form.priority}
        onChange={(value) =>
          update("priority", value)
        }
      />

      <input
        type="date"
        value={form.dueDate}
        onChange={(e) =>
          update(
            "dueDate",
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

      <ProjectColorPicker
        value={form.color}
        onChange={(value) =>
          update("color", value)
        }
      />

      <Button className="w-full">
        Save Changes
      </Button>
    </form>
  );
}