import { X, Trash2 } from "lucide-react";

export default function TaskHeader({
  title,
  onClose,
}) {
  return (
    <div className="flex items-center justify-between border-b pb-4">

      <h2 className="text-2xl font-bold">

        {title}

      </h2>

    <button className="text-red-500 hover:text-red-700">

        <Trash2 />

    </button>
      <button onClick={onClose}>

        <X />

      </button>

    </div>
  );
}