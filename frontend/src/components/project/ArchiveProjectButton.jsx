import Button from "../common/Button";
import { Archive } from "lucide-react";

export default function ArchiveProjectButton({
  onClick,
}) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
    >
      <Archive
        size={18}
        className="mr-2"
      />

      Archive Project
    </Button>
  );
}