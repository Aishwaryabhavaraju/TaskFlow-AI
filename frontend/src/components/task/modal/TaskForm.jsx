import { useState } from "react";

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

export default function TaskForm({
  projectId,
  onSuccess,
}) {

  const { createNewTask } =
    useTask();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    dueDate: "",
    estimatedHours: 0,
    labels: "",
  });

  const handleChange = (
    key,
    value
  ) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    await createNewTask({
      ...form,
      project: projectId,
      labels: form.labels
        .split(",")
        .map(label => label.trim())
        .filter(Boolean),
    });

    onSuccess();

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <TaskTitleField
        value={form.title}
        onChange={(v) =>
          handleChange("title", v)
        }
      />

      <TaskDescriptionField
        value={form.description}
        onChange={(v) =>
          handleChange(
            "description",
            v
          )
        }
      />

      <TaskPrioritySelect
        value={form.priority}
        onChange={(v) =>
          handleChange(
            "priority",
            v
          )
        }
      />

      <TaskStatusSelect
        value={form.status}
        onChange={(v) =>
          handleChange("status", v)
        }
      />

      <TaskDueDate
        value={form.dueDate}
        onChange={(v) =>
          handleChange(
            "dueDate",
            v
          )
        }
      />

      <TaskEstimate
        value={
          form.estimatedHours
        }
        onChange={(v) =>
          handleChange(
            "estimatedHours",
            v
          )
        }
      />

      <TaskLabels
        value={form.labels}
        onChange={(v) =>
          handleChange(
            "labels",
            v
          )
        }
      />

      <TaskAssignees />

      <AIGenerateButton />

      <Button type="submit">
        Create Task
      </Button>

    </form>
  );
}