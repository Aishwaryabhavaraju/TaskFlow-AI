import { useState } from "react";

import ColorPicker from "./ColorPicker";
import Button from "../common/Button";

export default function WorkspaceForm({
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [color, setColor] =
    useState("#F59E0B");

  const [logo, setLogo] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append(
      "description",
      description
    );
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
      <div>
        <label>Name</label>

        <input
          required
          className="mt-2 w-full rounded-lg border p-3 dark:bg-zinc-900"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </div>

      <div>
        <label>Description</label>

        <textarea
          rows={4}
          className="mt-2 w-full rounded-lg border p-3 dark:bg-zinc-900"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <div>
        <label>Workspace Color</label>

        <div className="mt-3">
          <ColorPicker
            value={color}
            onChange={setColor}
          />
        </div>
      </div>

      <div>
        <label>Workspace Logo</label>

        <input
          type="file"
          className="mt-2"
          accept="image/*"
          onChange={(e) =>
            setLogo(e.target.files[0])
          }
        />
      </div>

      <Button className="w-full">
        Create Workspace
      </Button>
    </form>
  );
}