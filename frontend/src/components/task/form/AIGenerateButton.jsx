import { Sparkles, Loader2 } from "lucide-react";

export default function AIGenerateButton({ onClick, loading, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-medium text-white transition hover:bg-purple-700 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Sparkles size={18} />
      )}
      {loading ? "Generating Description..." : "Generate with AI"}
    </button>
  );
}