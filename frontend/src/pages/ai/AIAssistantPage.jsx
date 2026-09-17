import { useMemo, useState } from "react";
import {
  Bot,
  Brain,
  CalendarClock,
  ClipboardList,
  Gauge,
  Info,
  MessageSquare,
  Milestone,
  Route,
  Scale,
  Sparkles,
  Wand2,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";
import aiService from "../../services/aiService";
import useProject from "../../hooks/useProject";
import { useEffect } from "react";
import toast from "react-hot-toast";

const features = [
  {
    id: "sprint-planning",
    label: "Sprint Planning",
    icon: Milestone,
    action: "Build Sprint Plan",
    placeholder: "Sprint goal, team capacity, constraints...",
    description: "Generates optimal sprint scope, milestone breakdown, and story point allocation based on capacity and sprint goals.",
    signals: "Analyzes open tasks, team capacity, and priority levels.",
  },
  {
    id: "risk-detection",
    label: "Risk Detection",
    icon: Gauge,
    action: "Detect Risks",
    placeholder: "Known risks, blockers, scope concerns...",
    description: "Identifies scope creep, dependency bottlenecks, unassigned high-priority work, and impending deadline risks.",
    signals: "Scans project due dates, unassigned tasks, and blocker notes.",
  },
  {
    id: "workload-balancing",
    label: "Workload Balancing",
    icon: Scale,
    action: "Balance Workload",
    placeholder: "Capacity notes, unavailable team members...",
    description: "Evaluates team member task assignments to detect overload and suggest smart reassignments.",
    signals: "Evaluates assigned task counts and available capacity hours.",
  },
  {
    id: "task-prioritization",
    label: "Task Prioritization",
    icon: Route,
    action: "Prioritize Tasks",
    placeholder: "Focus areas, deadlines, customer impact...",
    description: "Ranks open tasks by business impact, urgency, dependency order, and upcoming target dates.",
    signals: "Sorts task priorities, status stages, and deadline urgency.",
  },
  {
    id: "deadline-prediction",
    label: "Deadline Prediction",
    icon: CalendarClock,
    action: "Predict Deadline",
    placeholder: "Daily capacity, target date, delivery assumptions...",
    description: "Predicts realistic completion dates based on historical velocity and daily available capacity hours.",
    signals: "Calculates total remaining task estimates against daily capacity.",
  },
  {
    id: "meeting-notes",
    label: "Meeting Notes",
    icon: ClipboardList,
    action: "Generate Notes",
    placeholder: "Paste meeting transcript or raw notes...",
    description: "Transforms raw meeting notes or transcripts into structured action items, owners, and follow-ups.",
    signals: "Parses text transcripts for action items and mentions.",
  },
  {
    id: "project-summary",
    label: "Project Summary",
    icon: Brain,
    action: "Summarize Project",
    placeholder: "Audience, tone, areas to emphasize...",
    description: "Generates an executive progress summary highlighting recent completions, blockers, and next milestones.",
    signals: "Summarizes active board columns and task completion rates.",
  },
  {
    id: "chat",
    label: "Chat Assistant",
    icon: MessageSquare,
    action: "Ask Assistant",
    placeholder: "Ask a project question...",
    description: "Interactive AI co-pilot that answers natural language questions about your workspace and project tasks.",
    signals: "Answers using overall workspace and project context.",
  },
  {
    id: "natural-language-task",
    label: "Natural Language Task",
    icon: Wand2,
    action: "Create Draft",
    placeholder: "Create a high priority task to review onboarding copy tomorrow...",
    description: "Converts plain text descriptions into structured tasks with titles, priorities, and assigned boards.",
    signals: "Extracts title, priority, due date, and descriptions automatically.",
  },
  {
    id: "productivity-insights",
    label: "Productivity Insights",
    icon: Sparkles,
    action: "Generate Insights",
    placeholder: "What should the insight focus on?",
    description: "Analyzes throughput trends and highlights bottlenecks to help optimize overall team velocity.",
    signals: "Analyzes completed vs pending task velocity across boards.",
  },
];

const RenderValue = ({ value }) => {
  if (value === null || value === undefined) {
    return (
      <span className="text-zinc-400">None</span>
    );
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return (
        <span className="text-zinc-400">No items</span>
      );
    }

    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700"
          >
            <RenderValue value={item} />
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    return (
      <div className="space-y-3">
        {Object.entries(value).map(([key, item]) => (
          <div key={key}>
            <div className="mb-1 text-xs font-semibold uppercase text-zinc-500">
              {key.replace(/([A-Z])/g, " $1")}
            </div>
            <RenderValue value={item} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-700 dark:text-zinc-200">
      {String(value)}
    </p>
  );
};

export default function AIAssistantPage() {
  const { projects = [], fetchProjects } = useProject();
  const [activeFeature, setActiveFeature] =
    useState(features[0].id);
  const [projectId, setProjectId] = useState("");
  const [boardId, setBoardId] = useState("");
  const [columnId, setColumnId] = useState("");
  const [input, setInput] = useState("");
  const [capacityHours, setCapacityHours] =
    useState("");
  const [dailyCapacityHours, setDailyCapacityHours] =
    useState("");
  const [createTask, setCreateTask] =
    useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const feature = useMemo(
    () =>
      features.find(
        (item) => item.id === activeFeature
      ),
    [activeFeature]
  );

  const runFeature = async () => {
    setLoading(true);
    setError("");

    const payload = {
      projectId: projectId || undefined,
      notes: input,
      goal: input,
      message: input,
      prompt: input,
      transcript: input,
      text: input,
      capacityHours: capacityHours
        ? Number(capacityHours)
        : undefined,
      dailyCapacityHours: dailyCapacityHours
        ? Number(dailyCapacityHours)
        : undefined,
      project: projectId || undefined,
      board: boardId || undefined,
      columnId: columnId || undefined,
      create:
        activeFeature === "natural-language-task"
          ? createTask
          : undefined,
    };

    try {
      const data = await aiService.runAIFeature(
        activeFeature,
        payload
      );
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "AI request failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="AI Assistant"
        description="Plan sprints, detect risk, balance workload, summarize projects, and turn natural language into work."
      />

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="space-y-2">
          {features.map((item) => {
            const Icon = item.icon;
            const active = item.id === activeFeature;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveFeature(item.id);
                  setResult(null);
                  setError("");
                }}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                  active
                    ? "border-yellow-400 bg-yellow-50 text-zinc-950 dark:bg-yellow-400/10 dark:text-yellow-100"
                    : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </aside>

        <section className="min-w-0 space-y-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-yellow-400 p-3 text-black">
                <Bot size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {feature.label}
                </h2>
                <p className="text-sm text-zinc-500">
                  Powered by project context and task signals.
                </p>
              </div>
            </div>

            <div className="mb-5 rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm text-zinc-800 dark:text-zinc-200">
              <div className="flex items-start gap-2.5">
                <Info size={18} className="mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{feature.description}</p>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="font-medium">Context Signals:</span> {feature.signals}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium">
                  Project
                </span>
                <select
                  value={projectId}
                  onChange={(event) =>
                    setProjectId(event.target.value)
                  }
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                >
                  <option value="">All Projects (Global Analysis)</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">
                  Sprint Capacity
                </span>
                <input
                  type="number"
                  value={capacityHours}
                  onChange={(event) =>
                    setCapacityHours(event.target.value)
                  }
                  placeholder="Hours"
                  className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">
                  Daily Capacity
                </span>
                <input
                  type="number"
                  value={dailyCapacityHours}
                  onChange={(event) =>
                    setDailyCapacityHours(
                      event.target.value
                    )
                  }
                  placeholder="Hours per day"
                  className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
                />
              </label>

              {activeFeature ===
                "natural-language-task" && (
                <label className="flex items-end gap-3 rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-700">
                  <input
                    type="checkbox"
                    checked={createTask}
                    onChange={(event) =>
                      setCreateTask(
                        event.target.checked
                      )
                    }
                  />
                  <span className="text-sm font-medium">
                    Create task when board data is supplied
                  </span>
                </label>
              )}
            </div>

            {activeFeature ===
              "natural-language-task" && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input
                  value={boardId}
                  onChange={(event) =>
                    setBoardId(event.target.value)
                  }
                  placeholder="Board ID"
                  className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
                />
                <input
                  value={columnId}
                  onChange={(event) =>
                    setColumnId(event.target.value)
                  }
                  placeholder="Column ID"
                  className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
                />
              </div>
            )}

            <textarea
              rows={7}
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder={feature.placeholder}
              className="mt-4 w-full rounded-lg border border-zinc-200 bg-transparent p-3 text-sm leading-6 dark:border-zinc-700"
            />

            <button
              onClick={runFeature}
              disabled={loading}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-60"
            >
              <Sparkles size={17} />
              {loading ? "Thinking..." : feature.action}
            </button>

            {error && (
              <p className="mt-3 text-sm text-red-500">
                {error}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold">
              Result
            </h3>

            {result ? (
              <RenderValue value={result} />
            ) : (
              <p className="text-sm text-zinc-500">
                Run an AI action to see recommendations here.
              </p>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
