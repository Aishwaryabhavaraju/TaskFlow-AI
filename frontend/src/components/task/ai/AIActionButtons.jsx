import { Sparkles } from "lucide-react";

export default function AIActionButtons({
  onGenerate,
}) {

  return (

    <button
      type="button"
      onClick={onGenerate}
      className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
    >

      <Sparkles size={18} />

      Generate with AI

    </button>

  );

}