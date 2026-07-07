import { useState } from "react";

import Button from "../common/Button";
import ColorPicker from "./ColorPicker";

export default function EditWorkspaceForm({
  workspace,
  onSubmit,
}) {
  const [name, setName] = useState(workspace.name);
  const [description, setDescription] = useState(
    workspace.description
  );

  const [color, setColor] = useState(
    workspace.color || "#F59E0B"
  );

  const [logo, setLogo] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("color", color);

    if (logo) {
      formData.append("logo", logo);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      <input
        className="w-full rounded-lg border p-3 dark:bg-zinc-900"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <textarea
        rows={4}
        className="w-full rounded-lg border p-3 dark:bg-zinc-900"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <ColorPicker
        value={color}
        onChange={setColor}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setLogo(e.target.files[0])
        }
      />

      <Button className="w-full">
        Save Changes
      </Button>
    </form>
  );
}