import { Repeat } from "lucide-react";

export default function RecurrenceBadge({
  recurrence,
}) {

  if (
    !recurrence ||
    recurrence === "None"
  ) {
    return null;
  }

  return (

    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">

      <Repeat size={14} />

      {recurrence}

    </span>

  );

}