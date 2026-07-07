import Button from "../common/Button";
import { Trash2 } from "lucide-react";

export default function DeleteProjectButton({
  onClick,
}) {
  return (
    <Button
      onClick={onClick}
      variant="danger"
    >
      <Trash2
        size={18}
        className="mr-2"
      />

      Delete Project
    </Button>
  );
}