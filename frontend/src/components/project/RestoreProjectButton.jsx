import Button from "../common/Button";
import { RotateCcw } from "lucide-react";

export default function RestoreProjectButton({
  onClick,
}) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
    >
      <RotateCcw
        size={18}
        className="mr-2"
      />

      Restore Project
    </Button>
  );
}