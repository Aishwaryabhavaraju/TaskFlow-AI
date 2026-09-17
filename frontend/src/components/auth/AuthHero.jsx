import { Sparkles } from "lucide-react";

export default function AuthHero() {
  return (
    <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-16 border-r border-zinc-800 bg-black dark:bg-black text-white">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-bold">
            T
          </div>
          <div>
            <h2 className="font-bold text-2xl">TaskFlow AI</h2>
            <p className="text-sm text-zinc-400">
              AI Powered Project Management
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="uppercase tracking-[0.4em] text-sm text-zinc-500 font-semibold">
          NEW HERE?
        </p>

        <h1 className="text-6xl font-black leading-tight mt-6">
          Plan Smarter.
          <br />
          Build Faster.
          <br />
          <span className="text-yellow-400">Achieve More.</span>
        </h1>

        <p className="mt-6 text-lg text-zinc-300 max-w-lg leading-8">
          Turn your ideas into reality with AI-powered project planning, intelligent task automation, smart prioritization, and effortless team collaboration.
        </p>

        <p className="mt-4 text-sm font-semibold text-yellow-400/90 tracking-wide">
          Your vision. Your workflow. Your success.
        </p>
      </div>

      <div className="flex items-center gap-3 text-zinc-500">
        <Sparkles size={18} />
        <span>AI Included • Unlimited Projects</span>
      </div>

      <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-yellow-500/10 blur-[120px]" />
    </div>
  );
}