export default function CalendarLegend() {

  return (

    <div className="mb-5 flex flex-wrap gap-4">

      <div className="flex items-center gap-2">

        <span className="h-3 w-3 rounded-full bg-blue-500"></span>

        Todo

      </div>

      <div className="flex items-center gap-2">

        <span className="h-3 w-3 rounded-full bg-yellow-500"></span>

        In Progress

      </div>

      <div className="flex items-center gap-2">

        <span className="h-3 w-3 rounded-full bg-green-500"></span>

        Done

      </div>

    </div>

  );

}