const mongoose = require("mongoose");

const Task = require("../../models/Task");
const Project = require("../../models/Project");

const STATUSES = [
  "To Do",
  "In Progress",
  "Review",
  "Done",
];

const PRIORITIES = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

const toObjectId = (id) =>
  new mongoose.Types.ObjectId(id);

const startOfDay = (date) => {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
};

const endOfDay = (date) => {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
};

const addDays = (date, days) => {
  const value = new Date(date);
  value.setDate(value.getDate() + days);
  return value;
};

const formatDateKey = (date) =>
  new Date(date).toISOString().slice(0, 10);

const percent = (value, total) =>
  total === 0 ? 0 : Math.round((value / total) * 100);

const getProjectAndTasks = async (
  projectId,
  filters = {}
) => {
  const project = await Project.findOne({
    _id: projectId,
    isDeleted: false,
  })
    .populate("owner", "firstName lastName email")
    .populate("members", "firstName lastName email");

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const query = {
    project: project._id,
    isDeleted: false,
  };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  if (filters.memberId) {
    query.assignedTo = filters.memberId;
  }

  if (filters.startDate || filters.endDate) {
    query.createdAt = {};

    if (filters.startDate) {
      query.createdAt.$gte = startOfDay(filters.startDate);
    }

    if (filters.endDate) {
      query.createdAt.$lte = endOfDay(filters.endDate);
    }
  }

  const tasks = await Task.find(query)
    .populate("assignedTo", "firstName lastName email")
    .sort({ createdAt: 1 });

  return {
    project,
    tasks,
  };
};

const buildStatusBreakdown = (tasks) => {
  const breakdown = STATUSES.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  tasks.forEach((task) => {
    breakdown[task.status] =
      (breakdown[task.status] || 0) + 1;
  });

  return breakdown;
};

const buildPriorityBreakdown = (tasks) => {
  const breakdown = PRIORITIES.reduce((acc, priority) => {
    acc[priority] = 0;
    return acc;
  }, {});

  tasks.forEach((task) => {
    breakdown[task.priority] =
      (breakdown[task.priority] || 0) + 1;
  });

  return breakdown;
};

const buildCompletionTrend = (tasks) => {
  const buckets = new Map();

  tasks
    .filter((task) => task.completedAt)
    .forEach((task) => {
      const key = formatDateKey(task.completedAt);
      buckets.set(key, (buckets.get(key) || 0) + 1);
    });

  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, completed]) => ({
      date,
      completed,
    }));
};

const buildBurndown = (project, tasks) => {
  const totalTasks = tasks.length;

  if (totalTasks === 0) {
    return [];
  }

  const createdDates = tasks.map((task) =>
    startOfDay(task.createdAt)
  );

  const completedDates = tasks
    .filter((task) => task.completedAt)
    .map((task) => startOfDay(task.completedAt));

  const start = project.startDate
    ? startOfDay(project.startDate)
    : startOfDay(
        new Date(
          Math.min(...createdDates.map((date) => date.getTime()))
        )
      );

  const end = project.endDate
    ? startOfDay(project.endDate)
    : startOfDay(
        new Date(
          Math.max(
            Date.now(),
            ...createdDates.map((date) => date.getTime()),
            ...completedDates.map((date) => date.getTime())
          )
        )
      );

  const days =
    Math.max(
      1,
      Math.round((end - start) / 86400000)
    ) + 1;

  const completedByDate = new Map();

  tasks
    .filter((task) => task.completedAt)
    .forEach((task) => {
      const key = formatDateKey(task.completedAt);
      completedByDate.set(
        key,
        (completedByDate.get(key) || 0) + 1
      );
    });

  let completed = 0;

  return Array.from({ length: days }).map((_, index) => {
    const date = addDays(start, index);
    const key = formatDateKey(date);
    completed += completedByDate.get(key) || 0;

    return {
      date: key,
      idealRemaining: Math.max(
        0,
        Math.round(
          totalTasks -
            (totalTasks / Math.max(days - 1, 1)) * index
        )
      ),
      actualRemaining: Math.max(
        0,
        totalTasks - completed
      ),
    };
  });
};

const getMemberName = (member) =>
  [member?.firstName, member?.lastName]
    .filter(Boolean)
    .join(" ") ||
  member?.email ||
  "Unassigned";

const buildWorkload = (project, tasks) => {
  const workload = new Map();

  project.members.forEach((member) => {
    workload.set(String(member._id), {
      memberId: member._id,
      name: getMemberName(member),
      assigned: 0,
      completed: 0,
      active: 0,
      estimatedHours: 0,
      actualHours: 0,
    });
  });

  const ensureMember = (member) => {
    const key = String(member?._id || "unassigned");

    if (!workload.has(key)) {
      workload.set(key, {
        memberId: member?._id || null,
        name: getMemberName(member),
        assigned: 0,
        completed: 0,
        active: 0,
        estimatedHours: 0,
        actualHours: 0,
      });
    }

    return workload.get(key);
  };

  tasks.forEach((task) => {
    const assignees =
      task.assignedTo.length > 0
        ? task.assignedTo
        : [null];

    assignees.forEach((member) => {
      const row = ensureMember(member);
      row.assigned += 1;
      row.estimatedHours += task.estimatedHours || 0;
      row.actualHours += task.actualHours || 0;

      if (task.status === "Done") {
        row.completed += 1;
      } else {
        row.active += 1;
      }
    });
  });

  return Array.from(workload.values()).sort(
    (a, b) => b.assigned - a.assigned
  );
};

const buildTimeTracking = (tasks) => {
  const estimatedHours = tasks.reduce(
    (sum, task) => sum + (task.estimatedHours || 0),
    0
  );

  const actualHours = tasks.reduce(
    (sum, task) => sum + (task.actualHours || 0),
    0
  );

  return {
    estimatedHours,
    actualHours,
    varianceHours: actualHours - estimatedHours,
    accuracy:
      estimatedHours === 0
        ? 100
        : Math.max(
            0,
            100 -
              Math.round(
                (Math.abs(actualHours - estimatedHours) /
                  estimatedHours) *
                  100
              )
          ),
  };
};

const buildRecentActivity = (tasks) =>
  tasks
    .slice()
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 8)
    .map((task) => ({
      taskId: task._id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      updatedAt: task.updatedAt,
    }));

const buildRecommendations = ({
  overdueTasks,
  blockedReviewTasks,
  workload,
  timeTracking,
  progress,
  completionRate,
}) => {
  const recommendations = [];

  if (overdueTasks > 0) {
    recommendations.push(
      `${overdueTasks} overdue task${
        overdueTasks === 1 ? "" : "s"
      } need replanning or escalation.`
    );
  }

  if (blockedReviewTasks > 3) {
    recommendations.push(
      "Review is accumulating work. Add a review owner or schedule a focused approval pass."
    );
  }

  const overloaded = workload.find(
    (member) => member.active >= 5
  );

  if (overloaded) {
    recommendations.push(
      `${overloaded.name} has the heaviest active workload. Consider rebalancing open tasks.`
    );
  }

  if (timeTracking.varianceHours > 0) {
    recommendations.push(
      `Actual time is ${timeTracking.varianceHours} hour${
        timeTracking.varianceHours === 1 ? "" : "s"
      } above estimate. Tighten estimates for similar future tasks.`
    );
  }

  if (progress >= 80 && completionRate >= 70) {
    recommendations.push(
      "The project is close to completion. Focus on closing high-priority remaining work."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Project health looks stable. Keep the current delivery rhythm and monitor due dates."
    );
  }

  return recommendations;
};

const getProjectReport = async (
  projectId,
  filters = {}
) => {
  const { project, tasks } =
    await getProjectAndTasks(projectId, filters);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;
  const activeTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      task.status !== "Done" &&
      endOfDay(task.dueDate) < new Date()
  ).length;
  const upcomingDeadlines = tasks.filter(
    (task) =>
      task.dueDate &&
      task.status !== "Done" &&
      endOfDay(task.dueDate) >= new Date() &&
      startOfDay(task.dueDate) <= addDays(new Date(), 14)
  ).length;

  const statusBreakdown = buildStatusBreakdown(tasks);
  const priorityBreakdown = buildPriorityBreakdown(tasks);
  const completionTrend = buildCompletionTrend(tasks);
  const burndown = buildBurndown(project, tasks);
  const workload = buildWorkload(project, tasks);
  const timeTracking = buildTimeTracking(tasks);
  const blockedReviewTasks =
    statusBreakdown.Review || 0;
  const progress = percent(completedTasks, totalTasks);
  const productivity = percent(
    completedTasks,
    Math.max(totalTasks - overdueTasks, completedTasks)
  );
  const completionRate = percent(
    completedTasks,
    totalTasks
  );
  const healthScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        progress * 0.45 +
          productivity * 0.25 +
          timeTracking.accuracy * 0.2 +
          (100 - percent(overdueTasks, totalTasks)) * 0.1
      )
    )
  );

  const aiRecommendations = buildRecommendations({
    overdueTasks,
    blockedReviewTasks,
    workload,
    timeTracking,
    progress,
    completionRate,
  });

  return {
    project: {
      id: project._id,
      name: project.name,
      status: project.status,
      priority: project.priority,
      startDate: project.startDate,
      endDate: project.endDate,
      owner: project.owner,
    },
    filters,
    overview: {
      totalTasks,
      completedTasks,
      activeTasks,
      totalMembers: project.members.length,
      progress,
      productivity,
      overdueTasks,
      upcomingDeadlines,
      healthScore,
    },
    statusBreakdown,
    priorityBreakdown,
    completionTrend,
    burndown,
    workload,
    timeTracking,
    recentActivity: buildRecentActivity(tasks),
    aiRecommendations,
    generatedAt: new Date(),
  };
};

const getTaskStatusAnalytics = async (userId) => ({
  todo: await Task.countDocuments({
    assignedTo: userId,
    status: "To Do",
    isDeleted: false,
  }),
  inProgress: await Task.countDocuments({
    assignedTo: userId,
    status: "In Progress",
    isDeleted: false,
  }),
  review: await Task.countDocuments({
    assignedTo: userId,
    status: "Review",
    isDeleted: false,
  }),
  done: await Task.countDocuments({
    assignedTo: userId,
    status: "Done",
    isDeleted: false,
  }),
});

const getPriorityAnalytics = async (userId) => ({
  low: await Task.countDocuments({
    assignedTo: userId,
    priority: "Low",
    isDeleted: false,
  }),
  medium: await Task.countDocuments({
    assignedTo: userId,
    priority: "Medium",
    isDeleted: false,
  }),
  high: await Task.countDocuments({
    assignedTo: userId,
    priority: "High",
    isDeleted: false,
  }),
  urgent: await Task.countDocuments({
    assignedTo: userId,
    priority: "Critical",
    isDeleted: false,
  }),
});

const getProjectAnalytics = async () => {
  const projects = await Project.find({
    isDeleted: false,
  });

  const analytics = [];

  for (const project of projects) {
    const report = await getProjectReport(project._id);

    analytics.push({
      project: project.name,
      total: report.overview.totalTasks,
      completed: report.overview.completedTasks,
      progress: report.overview.progress,
    });
  }

  return analytics;
};

const getMonthlyActivity = async (userId) =>
  await Task.aggregate([
    {
      $match: {
        assignedTo: toObjectId(userId),
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
        },
        tasks: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

const getTopContributors = async () =>
  await Task.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $unwind: "$assignedTo",
    },
    {
      $group: {
        _id: "$assignedTo",
        totalTasks: {
          $sum: 1,
        },
        completedTasks: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "Done"],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $sort: {
        completedTasks: -1,
        totalTasks: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

const getDashboardAnalytics = async (userId) => ({
  taskStatus: await getTaskStatusAnalytics(userId),
  priorities: await getPriorityAnalytics(userId),
  monthlyActivity: await getMonthlyActivity(userId),
});

module.exports = {
  getProjectReport,
  getTaskStatusAnalytics,
  getPriorityAnalytics,
  getProjectAnalytics,
  getMonthlyActivity,
  getTopContributors,
  getDashboardAnalytics,
};
