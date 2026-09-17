const OpenAI = require("openai");
const Project = require("../../models/Project");
const Task = require("../../models/Task");
const User = require("../../models/User");

const daysUntil = (date) => {
  if (!date) return null;
  const target = new Date(date);
  if (isNaN(target.getTime())) return null;
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const priorityWeight = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
};

const isValidApiKey = (key) => {
  if (!key) return false;
  const k = String(key).trim();
  if (
    k === "" ||
    k.startsWith("your_") ||
    k.includes("your_openai_api_key") ||
    k.includes("YOUR_API_KEY") ||
    k.length < 15
  ) {
    return false;
  }
  return true;
};

const getOpenAIClient = async (userId) => {
  if (userId) {
    const user = await User.findById(userId);
    const userKey = user?.apiKeys?.find(
      (k) => k.provider.toLowerCase() === "openai" && k.key
    );
    if (userKey && isValidApiKey(userKey.key)) {
      return new OpenAI({ apiKey: userKey.key });
    }
  }

  if (process.env.OPENAI_API_KEY && isValidApiKey(process.env.OPENAI_API_KEY)) {
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return null;
};

const generateSmartFallbackResponse = (prompt, context = null) => {
  const p = (prompt || "").toLowerCase();
  const tasks = context?.tasks || [];
  const project = context?.project;
  const members = context?.members || [];

  const openTasks = tasks.filter((t) => t.status !== "Done" && t.status !== "Completed");
  const completedTasks = tasks.filter((t) => t.status === "Done" || t.status === "Completed");
  const overdueTasks = openTasks.filter((t) => t.dueDate && daysUntil(t.dueDate) < 0);
  const criticalTasks = openTasks.filter((t) => t.priority === "Critical" || t.priority === "High");
  const topTask = openTasks[0];

  const scopeStr = project?.name ? `for project "${project.name}"` : "across workspace projects";

  if (p.includes("sprint") || p.includes("plan")) {
    return `TaskFlow AI Sprint Recommendation ${scopeStr}:\n\n` +
      `• Work Breakdown: ${tasks.length} total tasks (${openTasks.length} active open, ${completedTasks.length} completed).\n` +
      `• Focus Target: ${criticalTasks.length} high/critical priority item(s) need immediate attention.\n` +
      `• Sprint Scope Advice: Cap sprint commitment to team capacity (${members.length || 1} member(s)). Allocate 80% bandwidth to core backlog items and reserve 20% for review triage.`;
  }

  if (p.includes("risk") || p.includes("delay") || p.includes("overdue")) {
    return `TaskFlow AI Delivery Risk Assessment ${scopeStr}:\n\n` +
      `• Risk Severity: ${overdueTasks.length > 0 ? "HIGH - Overdue Tasks Detected" : "LOW - On Schedule"}\n` +
      `• Overdue Items: ${overdueTasks.length} task(s) past target deadline.\n` +
      `• Critical Work: ${criticalTasks.length} critical item(s) currently open.\n` +
      `• Recommended SLA: ${overdueTasks.length > 0 ? `Re-assign or update deadlines for: ${overdueTasks.slice(0, 3).map(t => `"${t.title}"`).join(", ")}` : "All open tasks are progressing within expected timelines."}`;
  }

  if (p.includes("workload") || p.includes("team") || p.includes("capacity")) {
    return `TaskFlow AI Team Capacity Analysis ${scopeStr}:\n\n` +
      `• Evaluated Team Size: ${members.length || 1} active teammate(s).\n` +
      `• Assigned Open Workload: ${openTasks.length} open task(s).\n` +
      `• Balance Strategy: Rebalance workload if any single member holds >5 open tasks. Breakdown complex tasks (>8 hours estimated) into smaller sub-deliverables.`;
  }

  if (p.includes("summar") || p.includes("progress")) {
    const velocity = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
    return `TaskFlow AI Executive Summary ${scopeStr}:\n\n` +
      `• Completion Velocity: ${velocity}% completion rate (${completedTasks.length}/${tasks.length} tasks completed).\n` +
      `• Active Work Pipeline: ${openTasks.length} task(s) currently in progress or to-do.\n` +
      `• Recommended Next Priority: ${topTask ? `"${topTask.title}" (${topTask.priority || "Medium"} Priority)` : "Create new tasks to extend workspace roadmap."}`;
  }

  return `TaskFlow AI Co-Pilot Summary ${scopeStr}:\n\n` +
    `• Workspace Snapshot: ${tasks.length} total tasks tracked, ${openTasks.length} active open, ${overdueTasks.length} overdue.\n` +
    `• High Priority Focus: ${topTask ? `"${topTask.title}" (Priority: ${topTask.priority || "Medium"})` : "Add tasks to project board"}.\n` +
    `• Co-Pilot Capabilities: Ask me for sprint planning, risk detection, workload balancing, deadline prediction, or project summaries!`;
};

const generateResponse = async (prompt, userId = null, context = null) => {
  const aiClient = await getOpenAIClient(userId);

  if (!aiClient) {
    return generateSmartFallbackResponse(prompt, context);
  }

  try {
    const response = await aiClient.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are TaskFlow AI, an expert project management co-pilot. Be data-driven, practical, concise, and helpful.",
        },
        {
          role: "user",
          content: `${prompt}${context ? `\n\nContext:\n${JSON.stringify(context, null, 2)}` : ""}`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API call failed, using smart fallback response:", error.message);
    return generateSmartFallbackResponse(prompt, context);
  }
};

const parseJson = (content, fallback) => {
  try {
    return JSON.parse(
      content.replace(/```json|```/g, "").trim()
    );
  } catch (error) {
    return fallback;
  }
};

const enhanceStructured = async (
  instruction,
  context,
  fallback,
  userId = null
) => {
  const aiClient = await getOpenAIClient(userId);
  if (!aiClient) return fallback;

  try {
    const response = await aiClient.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Return only valid JSON. You are TaskFlow AI, a project-management automation engine.",
        },
        {
          role: "user",
          content: `${instruction}\n\nContext:\n${JSON.stringify(
            context,
            null,
            2
          )}`,
        },
      ],
    });

    return parseJson(
      response.choices[0].message.content,
      fallback
    );
  } catch (error) {
    console.error("OpenAI API call failed, returning intelligent fallback:", error.message);
    return fallback;
  }
};

const getProjectContext = async (projectId) => {
  const project = projectId
    ? await Project.findById(projectId)
        .populate(
          "members",
          "firstName lastName username email jobTitle"
        )
        .populate(
          "owner",
          "firstName lastName username email jobTitle"
        )
    : null;

  const tasks = await Task.find({
    ...(projectId ? { project: projectId } : {}),
    isDeleted: false,
  })
    .populate(
      "assignedTo",
      "firstName lastName username email jobTitle"
    )
    .populate(
      "createdBy",
      "firstName lastName username email"
    )
    .sort({ dueDate: 1, createdAt: -1 });

  const members = project
    ? [
        ...(project.members || []),
        ...(project.owner ? [project.owner] : []),
      ]
    : await User.find({
        isDeleted: false,
        status: "active",
      })
        .select(
          "firstName lastName username email jobTitle"
        )
        .limit(20);

  return {
    project,
    tasks,
    members,
  };
};

const compactTask = (task) => ({
  id: task._id,
  title: task.title,
  description: task.description,
  priority: task.priority,
  status: task.status,
  dueDate: task.dueDate,
  estimatedHours: task.estimatedHours,
  actualHours: task.actualHours,
  assignees: (task.assignedTo || []).map((user) => ({
    id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    username: user.username,
  })),
});

const getCompletionRate = (tasks) => {
  if (!tasks.length) return 0;
  return Math.round(
    (tasks.filter((task) => task.status === "Done")
      .length /
      tasks.length) *
      100
  );
};

const getWorkload = (tasks, members) => {
  const workload = new Map();

  for (const member of members) {
    workload.set(member._id.toString(), {
      userId: member._id,
      name: `${member.firstName} ${member.lastName}`,
      username: member.username,
      openTasks: 0,
      estimatedHours: 0,
      criticalTasks: 0,
      overdueTasks: 0,
    });
  }

  for (const task of tasks) {
    if (task.status === "Done") continue;

    for (const assignee of task.assignedTo || []) {
      const id = assignee._id.toString();
      if (!workload.has(id)) continue;

      const row = workload.get(id);
      row.openTasks += 1;
      row.estimatedHours += task.estimatedHours || 0;
      row.criticalTasks +=
        task.priority === "Critical" ? 1 : 0;
      row.overdueTasks +=
        task.dueDate && daysUntil(task.dueDate) < 0
          ? 1
          : 0;
    }
  }

  return [...workload.values()].sort(
    (a, b) => b.estimatedHours - a.estimatedHours
  );
};

const calculatePriorityScore = (task) => {
  const dueIn = daysUntil(task.dueDate);
  const dueScore =
    dueIn === null
      ? 1
      : dueIn < 0
        ? 5
        : dueIn <= 2
          ? 4
          : dueIn <= 7
            ? 3
            : 1;

  const effortScore =
    task.estimatedHours >= 16
      ? 2
      : task.estimatedHours >= 8
        ? 1
        : 0;

  return (
    (priorityWeight[task.priority] || 2) * 2 +
    dueScore +
    effortScore
  );
};

const sprintPlanning = async (payload) => {
  const { project, tasks, members } =
    await getProjectContext(payload.projectId);
  const capacity =
    payload.capacityHours ||
    Math.max(members.length * 24, 24);

  const candidates = tasks
    .filter((task) => task.status !== "Done")
    .sort(
      (a, b) =>
        calculatePriorityScore(b) -
        calculatePriorityScore(a)
    );

  const selected = [];
  let plannedHours = 0;

  for (const task of candidates) {
    const hours = task.estimatedHours || 4;
    if (plannedHours + hours <= capacity) {
      selected.push(compactTask(task));
      plannedHours += hours;
    }
  }

  const fallback = {
    sprintGoal:
      payload.goal ||
      `Move ${selected.length} high-impact tasks forward`,
    capacityHours: capacity,
    plannedHours,
    tasks: selected,
    recommendations: [
      "Start with overdue and critical tasks.",
      "Keep review work visible before adding new scope.",
      "Reserve 15% capacity for interruptions and bug fixes.",
    ],
  };

  return enhanceStructured(
    "Create an AI sprint plan with sprintGoal, capacityHours, plannedHours, tasks, risks, and recommendations.",
    {
      project,
      tasks: tasks.map(compactTask),
      members,
      payload,
    },
    fallback
  );
};

const detectRisks = async (payload) => {
  const { project, tasks, members } =
    await getProjectContext(payload.projectId);

  const risks = [];
  const overdue = tasks.filter(
    (task) =>
      task.status !== "Done" &&
      task.dueDate &&
      daysUntil(task.dueDate) < 0
  );
  const blockedReview = tasks.filter(
    (task) =>
      task.status === "Review" &&
      daysUntil(task.updatedAt) < -3
  );
  const unassignedCritical = tasks.filter(
    (task) =>
      task.priority === "Critical" &&
      (!task.assignedTo || !task.assignedTo.length)
  );

  if (overdue.length) {
    risks.push({
      severity: "High",
      title: "Overdue open work",
      detail: `${overdue.length} open task(s) are past due.`,
      action: "Re-plan dates or reduce scope today.",
    });
  }

  if (blockedReview.length) {
    risks.push({
      severity: "Medium",
      title: "Review queue aging",
      detail: `${blockedReview.length} task(s) have been in review for several days.`,
      action: "Assign reviewers and set a same-day review SLA.",
    });
  }

  if (unassignedCritical.length) {
    risks.push({
      severity: "High",
      title: "Critical tasks without owners",
      detail: `${unassignedCritical.length} critical task(s) are unassigned.`,
      action: "Assign owners before the next standup.",
    });
  }

  const fallback = {
    riskScore: Math.min(100, risks.length * 25),
    risks,
    watchlist: overdue.slice(0, 5).map(compactTask),
    summary:
      risks.length > 0
        ? "Project has delivery risks that need attention."
        : "No major delivery risks detected from current task data.",
  };

  return enhanceStructured(
    "Detect project delivery risks. Return riskScore, summary, risks, and watchlist.",
    {
      project,
      tasks: tasks.map(compactTask),
      members,
    },
    fallback
  );
};

const balanceWorkload = async (payload) => {
  const { project, tasks, members } =
    await getProjectContext(payload.projectId);
  const workload = getWorkload(tasks, members);
  const overloaded = workload.filter(
    (item) => item.estimatedHours >= 32 || item.openTasks >= 6
  );
  const underloaded = workload.filter(
    (item) => item.estimatedHours <= 12
  );

  const fallback = {
    workload,
    overloaded,
    underloaded,
    recommendations: overloaded.map((person) => ({
      from: person.name,
      to: underloaded[0]?.name || "Available teammate",
      action:
        "Move one medium-effort open task to rebalance capacity.",
    })),
  };

  return enhanceStructured(
    "Analyze workload balancing. Return workload, overloaded, underloaded, and recommendations.",
    {
      project,
      tasks: tasks.map(compactTask),
      members,
    },
    fallback
  );
};

const prioritizeTasks = async (payload) => {
  const { tasks } = await getProjectContext(
    payload.projectId
  );

  const prioritized = tasks
    .filter((task) => task.status !== "Done")
    .map((task) => ({
      ...compactTask(task),
      score: calculatePriorityScore(task),
      reason:
        task.dueDate && daysUntil(task.dueDate) < 0
          ? "Overdue and still open"
          : `${task.priority} priority with ${task.status} status`,
    }))
    .sort((a, b) => b.score - a.score);

  return {
    prioritized,
    topFocus: prioritized.slice(0, 5),
  };
};

const predictDeadlines = async (payload) => {
  const { project, tasks } = await getProjectContext(
    payload.projectId
  );
  const openTasks = tasks.filter(
    (task) => task.status !== "Done"
  );
  const remainingHours = openTasks.reduce(
    (total, task) =>
      total +
      Math.max(
        (task.estimatedHours || 4) -
          (task.actualHours || 0),
        1
      ),
    0
  );
  const dailyCapacity =
    payload.dailyCapacityHours ||
    Math.max((project?.members?.length || 1) * 5, 5);
  const daysNeeded = Math.ceil(
    remainingHours / dailyCapacity
  );
  const predictedDate = new Date();
  predictedDate.setDate(
    predictedDate.getDate() + daysNeeded
  );

  return {
    remainingHours,
    dailyCapacityHours: dailyCapacity,
    daysNeeded,
    predictedCompletionDate: predictedDate,
    confidence:
      openTasks.length > 10 ? "Medium" : "High",
    note:
      project?.endDate &&
      predictedDate > new Date(project.endDate)
        ? "Predicted completion is after the project deadline."
        : "Predicted completion is within the known schedule.",
  };
};

const generateMeetingNotes = async (payload) => {
  const transcript = payload.transcript || "";
  const lines = transcript
    .split(/\n|\. /)
    .map((line) => line.trim())
    .filter(Boolean);

  const fallback = {
    summary: lines.slice(0, 3).join(". "),
    decisions: lines.filter((line) =>
      /decid|approved|agreed/i.test(line)
    ),
    actionItems: lines
      .filter((line) =>
        /todo|action|follow up|will|assign/i.test(line)
      )
      .map((line) => ({
        task: line,
        owner: "Unassigned",
      })),
    risks: lines.filter((line) =>
      /risk|block|delay|issue/i.test(line)
    ),
  };

  return enhanceStructured(
    "Turn meeting notes or transcript into summary, decisions, actionItems, and risks.",
    payload,
    fallback
  );
};

const summarizeProject = async (payload) => {
  const { project, tasks, members } =
    await getProjectContext(payload.projectId);
  const completionRate = getCompletionRate(tasks);
  const openTasks = tasks.filter(
    (task) => task.status !== "Done"
  );

  const fallback = {
    project: project?.name || "Project",
    status: project?.status || "Active",
    completionRate,
    summary: `${completionRate}% complete with ${openTasks.length} open task(s).`,
    highlights: [
      `${tasks.length} total task(s) tracked.`,
      `${members.length} member(s) available.`,
    ],
    nextSteps: openTasks
      .slice(0, 5)
      .map((task) => task.title),
  };

  return enhanceStructured(
    "Create an executive project summary with summary, highlights, risks, nextSteps, and completionRate.",
    {
      project,
      tasks: tasks.map(compactTask),
      members,
    },
    fallback
  );
};

const chatAssistant = async (payload) => {
  const context = payload.projectId
    ? await getProjectContext(payload.projectId)
    : null;

  return generateResponse(`
Answer as TaskFlow AI.

Question:
${payload.message || payload.prompt}

Project context:
${JSON.stringify(context, null, 2)}
`);
};

const naturalLanguageTask = async (payload) => {
  const text = payload.text || "";
  const dueMatch = text.match(
    /\b(today|tomorrow|next week|\d{4}-\d{2}-\d{2})\b/i
  );
  const priorityMatch = text.match(
    /\b(low|medium|high|critical)\b/i
  );
  const title = text
    .replace(/^(create|add|make)\s+(a\s+)?task\s*/i, "")
    .replace(/\b(today|tomorrow|next week|\d{4}-\d{2}-\d{2})\b/i, "")
    .replace(/\b(low|medium|high|critical)\b/i, "")
    .trim();

  let dueDate = null;
  if (dueMatch) {
    dueDate = new Date();
    const value = dueMatch[1].toLowerCase();
    if (value === "tomorrow") dueDate.setDate(dueDate.getDate() + 1);
    else if (value === "next week") dueDate.setDate(dueDate.getDate() + 7);
    else if (/^\d{4}-/.test(value)) dueDate = new Date(value);
  }

  const draft = {
    title: title || text || "Untitled task",
    description: payload.description || text,
    priority: priorityMatch
      ? priorityMatch[1][0].toUpperCase() +
        priorityMatch[1].slice(1).toLowerCase()
      : "Medium",
    dueDate,
    labels: payload.labels || [],
    estimatedHours: payload.estimatedHours || 4,
  };

  const shouldCreate =
    payload.project &&
    payload.board &&
    payload.columnId &&
    payload.create !== false;

  if (!shouldCreate) {
    return {
      created: false,
      draft,
    };
  }

  const task = await Task.create({
    ...draft,
    project: payload.project,
    board: payload.board,
    columnId: payload.columnId,
    createdBy: payload.createdBy,
    assignedTo: payload.assignedTo || [],
    watchers: [payload.createdBy],
  });

  return {
    created: true,
    task,
    draft,
  };
};

const productivityInsights = async (payload) => {
  const { tasks } = await getProjectContext(
    payload.projectId
  );
  const completed = tasks.filter(
    (task) => task.status === "Done"
  );
  const overdue = tasks.filter(
    (task) =>
      task.status !== "Done" &&
      task.dueDate &&
      daysUntil(task.dueDate) < 0
  );
  const avgEstimate =
    tasks.reduce(
      (total, task) => total + (task.estimatedHours || 0),
      0
    ) / Math.max(tasks.length, 1);

  return {
    completionRate: getCompletionRate(tasks),
    completedTasks: completed.length,
    overdueTasks: overdue.length,
    averageEstimateHours: Number(avgEstimate.toFixed(1)),
    insights: [
      completed.length
        ? `${completed.length} task(s) have been completed.`
        : "No completed tasks yet.",
      overdue.length
        ? `${overdue.length} overdue task(s) need triage.`
        : "No overdue open tasks detected.",
      avgEstimate > 8
        ? "Tasks are relatively large; split work into smaller deliverables."
        : "Task sizing looks manageable.",
    ],
  };
};

const taskSuggestions = async (task) => ({
  priority:
    task.priority ||
    (task.dueDate && daysUntil(task.dueDate) <= 2
      ? "High"
      : "Medium"),
  estimatedHours: task.estimatedHours || 4,
  dueDate: task.dueDate || null,
  assignee: task.assignee || "Best available teammate",
  subtasks: [
    "Clarify acceptance criteria",
    "Implement core work",
    "Review and test",
  ],
  acceptanceCriteria: [
    "Meets the task description",
    "Reviewed by a teammate",
    "No known blockers remain",
  ],
});

module.exports = {
  generateResponse,
  sprintPlanning,
  detectRisks,
  balanceWorkload,
  prioritizeTasks,
  predictDeadlines,
  generateMeetingNotes,
  summarizeProject,
  chatAssistant,
  naturalLanguageTask,
  productivityInsights,
  taskSuggestions,
};
