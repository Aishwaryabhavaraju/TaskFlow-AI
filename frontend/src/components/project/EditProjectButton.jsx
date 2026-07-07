import Button from "../common/Button";
import { Pencil } from "lucide-react";

export default function EditProjectButton({
  onClick,
}) {
  return (
    <Button onClick={onClick}>
      <Pencil
        size={18}
        className="mr-2"
      />

      Edit Project
    </Button>
  );
}