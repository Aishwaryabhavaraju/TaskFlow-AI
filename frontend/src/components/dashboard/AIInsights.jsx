import { Sparkles } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">

      <div className="flex items-center gap-3">

        <Sparkles />

        <h2 className="text-xl font-semibold">
          AI Insight
        </h2>

      </div>

      <p className="mt-4">
        You completed 18% more tasks this week compared to
        last week. Keep up the great work!
      </p>

    </div>
  );
}