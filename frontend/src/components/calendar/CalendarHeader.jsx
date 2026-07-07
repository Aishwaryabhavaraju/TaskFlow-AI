import { CalendarDays } from "lucide-react";

export default function CalendarHeader() {
  return (
    <div className="mb-6 flex items-center gap-3">

      <CalendarDays
        className="text-blue-600"
      />

      <h1 className="text-3xl font-bold">

        Calendar

      </h1>

    </div>
  );
}