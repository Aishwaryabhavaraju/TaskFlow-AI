import { Loader2 } from "lucide-react";

export default function Button({
  children,
  loading = false,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading}
      className="
      flex

      w-full

      items-center

      justify-center

      gap-2

      rounded-xl

      bg-yellow-400

      py-3

      font-semibold

      text-black

      transition-all

      hover:bg-yellow-300

      disabled:opacity-70
      "
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
}