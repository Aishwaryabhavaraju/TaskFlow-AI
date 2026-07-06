import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
      flex items-center gap-2
      rounded-full
      border
      px-4 py-2
      transition-all duration-300
      bg-white text-zinc-900
      dark:bg-zinc-900 dark:text-white
      border-gray-300 dark:border-zinc-700
      shadow-md hover:scale-105
      "
    >
      {theme === "dark" ? (
        <>
          <Sun size={18} className="text-yellow-500" />
          <span className="font-medium">Light</span>
        </>
      ) : (
        <>
          <Moon size={18} className="text-zinc-700" />
          <span className="font-medium">Dark</span>
        </>
      )}
    </button>
  );
}