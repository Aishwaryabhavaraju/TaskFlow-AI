import {
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

import useTheme from "../../hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const nextTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const Icon =
    theme === "light"
      ? Sun
      : theme === "dark"
      ? Moon
      : Monitor;

  return (
    <button
      onClick={nextTheme}
      title={`Current theme: ${theme}`}
      type="button"
      aria-label={`Switch theme. Current theme is ${theme}`}
      className="
      rounded-xl
      p-3
      transition
      hover:bg-zinc-100
      dark:hover:bg-zinc-800
      "
    >
      <Icon size={20} />
    </button>
  );
}
