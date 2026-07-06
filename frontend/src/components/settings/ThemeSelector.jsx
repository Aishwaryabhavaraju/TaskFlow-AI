import {
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

import useTheme from "../../hooks/useTheme";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      icon: Monitor,
    },
  ];

  return (
    <div className="space-y-3">

      {options.map((option) => {
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`
            flex
            w-full
            items-center
            gap-4

            rounded-xl

            border

            px-4

            py-3

            transition

            ${
              theme === option.value
                ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }
            `}
          >
            <Icon size={20} />

            {option.label}
          </button>
        );
      })}
    </div>
  );
}