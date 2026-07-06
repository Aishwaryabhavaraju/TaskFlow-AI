import { useState } from "react";

export default function Tabs({
  tabs,
}) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="mb-6 flex gap-3 border-b border-zinc-200 dark:border-zinc-700">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActive(index)}
            className={`border-b-2 px-4 py-3 ${
              active === index
                ? "border-yellow-500 text-yellow-500"
                : "border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs[active].content}
    </>
  );
}