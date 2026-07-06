import { Sparkles } from "lucide-react";

export default function AuthHero() {
  return (
    <div
      className="
      hidden
      lg:flex

      relative

      overflow-hidden

      flex-col

      justify-between

      p-16

      border-r

      border-zinc-800

      bg-black

      dark:bg-black

      text-white
      "
    >
      <div>

        <div className="flex items-center gap-3">

          <div
            className="
            h-12
            w-12

            rounded-xl

            bg-yellow-400

            flex

            items-center

            justify-center

            text-black

            font-bold
            "
          >
            T
          </div>

          <div>

            <h2 className="font-bold text-2xl">
              TaskFlow AI
            </h2>

            <p className="text-sm text-zinc-400">
              AI Powered Project Management
            </p>

          </div>

        </div>

      </div>

      <div>

        <p className="uppercase tracking-[0.4em] text-sm text-zinc-500">
          NEW HERE
        </p>

        <h1
          className="
          text-7xl

          font-black

          leading-none

          mt-6
          "
        >
          Plan Less.
          <br />

          Ship More.

          <br />

          <span className="text-yellow-400">
            Automatically.
          </span>

        </h1>

        <p
          className="
          mt-8

          text-lg

          text-zinc-400

          max-w-lg

          leading-8
          "
        >
          Turn ideas into successful products using
          AI-powered project planning, task automation,
          smart prioritization and collaboration.
        </p>

      </div>

      <div
        className="
        flex

        items-center

        gap-3

        text-zinc-500
        "
      >
        <Sparkles size={18} />

        <span>
          AI Included • Unlimited Projects
        </span>

      </div>

      <div
        className="
        absolute

        -bottom-40

        -left-40

        h-[450px]

        w-[450px]

        rounded-full

        bg-yellow-500/10

        blur-[120px]
        "
      />
    </div>
  );
}