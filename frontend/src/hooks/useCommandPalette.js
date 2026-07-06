import { useEffect, useState } from "react";

export default function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, []);

  return {
    open,
    setOpen,
  };
}