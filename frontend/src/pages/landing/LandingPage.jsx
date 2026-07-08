import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  CheckCircle2,
  KanbanSquare,
  LockKeyhole,
  MessageSquareText,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import SEO from "../../components/common/SEO";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import ThemeToggle from "../../components/common/ThemeToggle";

const features = [
  {
    title: "AI planning",
    description: "Turn rough goals into projects, milestones, and suggested tasks.",
    icon: Bot,
  },
  {
    title: "Task boards",
    description: "Move work through focused Kanban flows with priorities and owners.",
    icon: KanbanSquare,
  },
  {
    title: "Team context",
    description: "Keep comments, activity, files, and decisions attached to the work.",
    icon: MessageSquareText,
  },
  {
    title: "Live analytics",
    description: "See workload, deadlines, completion trends, and project health.",
    icon: BarChart3,
  },
];

const workflow = [
  "Create an AI-assisted project plan",
  "Assign owners and target dates",
  "Track work across board, calendar, and analytics",
  "Review risks before they become blockers",
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "For solo builders validating a workflow.",
    points: ["3 projects", "Basic AI suggestions", "Task board"],
  },
  {
    name: "Team",
    price: "$18",
    description: "For teams shipping client or product work.",
    points: ["Unlimited projects", "Team analytics", "AI automation"],
    featured: true,
  },
  {
    name: "Business",
    price: "Custom",
    description: "For organizations with governance needs.",
    points: ["Audit logs", "Advanced roles", "Priority support"],
  },
];

function ProductScene() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-zinc-950"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="absolute left-1/2 top-20 w-[980px] max-w-[92vw] -translate-x-1/2 rounded-lg border border-white/10 bg-zinc-900/90 shadow-2xl shadow-black/40">
        <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500">
            TaskFlow AI workspace
          </span>
        </div>

        <div className="grid gap-4 p-5 lg:grid-cols-[220px_1fr_220px]">
          <div className="space-y-3">
            {["Launch plan", "Marketing", "Design QA", "Backend"].map(
              (item, index) => (
                <div
                  key={item}
                  className={`rounded-lg border p-3 ${
                    index === 0
                      ? "border-yellow-400 bg-yellow-400 text-black"
                      : "border-white/10 bg-white/5 text-zinc-300"
                  }`}
                >
                  <p className="text-sm font-semibold">{item}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {index + 3} active tasks
                  </p>
                </div>
              )
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["To do", "In progress", "Done"].map((column, columnIndex) => (
              <div
                key={column}
                className="min-h-[330px] rounded-lg border border-white/10 bg-black/20 p-3"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    {column}
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-zinc-400">
                    {columnIndex + 2}
                  </span>
                </div>

                {[0, 1, 2].map((task) => (
                  <div
                    key={`${column}-${task}`}
                    className="mb-3 rounded-lg border border-white/10 bg-zinc-900 p-3"
                  >
                    <div className="mb-3 h-2 w-16 rounded-full bg-yellow-400" />
                    <p className="text-sm font-medium text-white">
                      {columnIndex === 0
                        ? "Draft milestone"
                        : columnIndex === 1
                          ? "Review dependencies"
                          : "Publish update"}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="h-6 w-6 rounded-full bg-sky-400" />
                      <span className="text-xs text-zinc-500">
                        {task + 1}d
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-yellow-300">
                <Sparkles size={16} />
                <span className="text-sm font-semibold">AI insight</span>
              </div>
              <p className="text-sm leading-6 text-zinc-300">
                Design QA is trending late. Reassign one review task today.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Team workload</p>
              <div className="mt-4 space-y-3">
                {[72, 48, 64].map((value, index) => (
                  <div key={value}>
                    <div className="mb-1 flex justify-between text-xs text-zinc-500">
                      <span>{["Maya", "Jordan", "Ananda"][index]}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-emerald-400"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();
  const logout = useLogout();
  const appPath = isAuthenticated ? "/dashboard" : "/register";

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <SEO
        title="TaskFlow AI | AI-powered project management"
        description="TaskFlow AI helps teams plan, prioritize, collaborate, and ship projects faster with AI-assisted workflows."
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-zinc-950/80 text-white backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400 font-black text-black">
              T
            </span>
            <span className="font-bold">TaskFlow AI</span>
          </Link>

          <div className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#workflow" className="hover:text-white">
              Workflow
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-sm font-medium text-zinc-300">
                  Hi, {user?.firstName}
                </span>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
                >
                  Dashboard
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={logout}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10 cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10"
                >
                  Sign in
                </Link>
                <Link
                  to={appPath}
                  className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
                >
                  Get started
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main>
        <section className="relative min-h-[92vh] overflow-hidden pt-16 text-white">
          <ProductScene />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 mx-auto flex min-h-[calc(92vh-4rem)] max-w-7xl flex-col justify-center px-4 pb-16 pt-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-zinc-200 backdrop-blur">
                <Zap size={15} className="text-yellow-300" />
                AI planning, task boards, analytics, and admin in one workspace
              </div>

              <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
                TaskFlow AI
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">
                Plan projects faster, keep teams aligned, and turn messy work
                into clear next actions with an AI-powered project workspace.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={appPath}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 font-bold text-black hover:bg-yellow-300"
                >
                  Start building
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur hover:bg-white/15"
                >
                  <Play size={18} />
                  See features
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-b border-zinc-200 bg-white px-4 py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase text-yellow-600">
                Everything moves together
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                From planning to delivery, without the usual handoffs.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-400 text-black">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="bg-zinc-100 px-4 py-20 dark:bg-zinc-900 sm:px-6 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-yellow-600">
                Built for repeatable delivery
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                A calmer operating system for fast teams.
              </h2>
              <p className="mt-5 text-zinc-600 dark:text-zinc-400">
                TaskFlow AI brings planning, collaboration, automation, and
                reporting into one focused workspace so teams can make progress
                without losing context.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="grid gap-4 sm:grid-cols-2">
                {workflow.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-sm font-black text-black">
                        {index + 1}
                      </span>
                      <CheckCircle2 className="text-emerald-500" size={20} />
                    </div>
                    <p className="font-semibold">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="bg-white px-4 py-20 dark:bg-zinc-950 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase text-yellow-600">
                  Plans
                </p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Start small, scale into the full workspace.
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <ShieldCheck size={18} className="text-emerald-500" />
                Secure workspace controls included
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-lg border p-6 ${
                    plan.featured
                      ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                      : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-black">{plan.price}</span>
                    {plan.price.startsWith("$") && (
                      <span className="pb-1 text-zinc-500">/ user</span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {plan.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {plan.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={17} className="text-emerald-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Ready to organize the work?</h2>
              <p className="mt-2 text-zinc-400">
                Create your workspace and bring the next project into focus.
              </p>
            </div>
            <Link
              to={appPath}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 font-bold text-black hover:bg-yellow-300"
            >
              Open TaskFlow AI
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white px-4 py-8 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>TaskFlow AI</p>
          <div className="flex gap-4">
            <span className="inline-flex items-center gap-1">
              <Users size={15} />
              Teams
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={15} />
              Planning
            </span>
            <span className="inline-flex items-center gap-1">
              <LockKeyhole size={15} />
              Secure
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
