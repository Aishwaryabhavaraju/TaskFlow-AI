import { Sparkles } from "lucide-react";

export default function AIGenerateButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-700"
    >
      <Sparkles size={18} />

      Generate with AI
    </button>
  );
}