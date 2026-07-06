const Task = require("../../models/Task");
const Project = require("../../models/Project");
const Team = require("../../models/Team");

const getTaskStatusAnalytics = async (userId) => {

  return {
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
  };

};

const getPriorityAnalytics = async (userId) => {

  return {

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
      priority: "Urgent",
      isDeleted: false,
    }),

  };

};

const getProjectAnalytics = async () => {

  const projects = await Project.find({
    isDeleted: false,
  });

  const analytics = [];

  for (const project of projects) {

    const total = await Task.countDocuments({
      project: project._id,
      isDeleted: false,
    });

    const completed = await Task.countDocuments({
      project: project._id,
      status: "Done",
      isDeleted: false,
    });

    analytics.push({
      project: project.name,
      total,
      completed,
      progress:
        total === 0
          ? 0
          : Math.round((completed / total) * 100),
    });

  }

  return analytics;

};

const getMonthlyActivity = async (userId) => {

  return await Task.aggregate([
    {
      $match: {
        assignedTo: userId,
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

};

const getTopContributors = async () => {

  return await Task.aggregate([
    {
      $unwind: "$assignedTo",
    },
    {
      $group: {
        _id: "$assignedTo",
        totalTasks: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalTasks: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

};

const getDashboardAnalytics = async (userId) => {

  return {

    taskStatus:
      await getTaskStatusAnalytics(userId),

    priorities:
      await getPriorityAnalytics(userId),

    monthlyActivity:
      await getMonthlyActivity(userId),

  };

};