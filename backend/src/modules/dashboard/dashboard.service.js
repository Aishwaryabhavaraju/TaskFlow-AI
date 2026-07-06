const Project = require("../../models/Project");
const Team = require("../../models/Team");
const Task = require("../../models/Task");

const getOverview = async (userId) => {

  const totalProjects = await Project.countDocuments({
    members: userId,
    isDeleted: false,
  });

  const totalTeams = await Team.countDocuments({
    members: userId,
    isDeleted: false,
  });

  const totalTasks = await Task.countDocuments({
    assignedTo: userId,
    isDeleted: false,
  });

  const completedTasks = await Task.countDocuments({
    assignedTo: userId,
    status: "Done",
    isDeleted: false,
  });

  const pendingTasks = await Task.countDocuments({
    assignedTo: userId,
    status: {
      $ne: "Done",
    },
    isDeleted: false,
  });

  return {
    totalProjects,
    totalTeams,
    totalTasks,
    completedTasks,
    pendingTasks,
  };

};

const getRecentTasks =
async (userId) => {

  return await Task.find({

    assignedTo: userId,

    isDeleted: false,

  })
    .sort({
      updatedAt: -1,
    })
    .limit(5)
    .populate(
      "project",
      "name"
    );

};

const getUpcomingDeadlines =
async (userId) => {

  const today = new Date();

  return await Task.find({

    assignedTo: userId,

    dueDate: {
      $gte: today,
    },

    status: {
      $ne: "Done",
    },

    isDeleted: false,

  })
    .sort({
      dueDate: 1,
    })
    .limit(10);

};

const getProjectProgress =
async (projectId) => {

  const total =
    await Task.countDocuments({
      project: projectId,
      isDeleted: false,
    });

  const completed =
    await Task.countDocuments({
      project: projectId,
      status: "Done",
      isDeleted: false,
    });

  const progress =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  return {

    total,

    completed,

    progress,

  };

};

const getTaskStatusSummary =
async (userId) => {

  return {

    todo: await Task.countDocuments({
      assignedTo: userId,
      status: "To Do",
      isDeleted: false,
    }),

    inProgress:
      await Task.countDocuments({
        assignedTo: userId,
        status: "In Progress",
        isDeleted: false,
      }),

    review:
      await Task.countDocuments({
        assignedTo: userId,
        status: "Review",
        isDeleted: false,
      }),

    done:
      await Task.countDocuments({
        assignedTo: userId,
        status: "Done",
        isDeleted: false,
      }),

  };

};

module.exports = {
  getOverview,
  getRecentTasks,
  getUpcomingDeadlines,
  getProjectProgress,
  getTaskStatusSummary,
};