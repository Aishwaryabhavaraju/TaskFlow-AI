import { useState } from "react";
import Button from "../../common/Button";
import AIAssistant from "../ai/AIAssistant";
import useTask from "../../../hooks/useTask";

export default function TaskDetailsForm({
  task,
}) {

  const { editTask } =
    useTask();

  const [form, setForm] =
    useState(task);

  const handleChange = (
    key,
    value
  ) => {

    setForm({
      ...form,
      [key]: value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      await editTask(
        task._id,
        form
      );

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <input
        value={form.title}
        onChange={(e)=>
          handleChange(
            "title",
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

        <AIAssistant
        title={form.title}
        onInsert={(description) =>
            setForm({
            ...form,
            description,
            })
        }
        />
        
      <textarea
        rows={5}
        value={
          form.description
        }
        onChange={(e)=>
          handleChange(
            "description",
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

      <Button type="submit">

        Save Changes

      </Button>

    </form>
  );
}
