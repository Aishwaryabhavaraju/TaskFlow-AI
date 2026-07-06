import { Loader2 } from "lucide-react";

export default function Button({
  children,
  loading,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading}
      className="
      w-full

      rounded-xl

      bg-yellow-400

      py-3

      font-semibold

      text-black

      transition

      hover:bg-yellow-300

      disabled:opacity-70

      flex

      justify-center

      items-center

      gap-2
      "
    >
      {loading && (
        <Loader2
          className="animate-spin"
          size={18}
        />
      )}

      {children}
    </button>
  );
}