const dashboardService =
require("./dashboard.service");

exports.getOverview =
async (req, res) => {

  const data =
    await dashboardService.getOverview(
      req.user._id
    );

  res.status(200).json({

    success: true,

    data,

  });

};

exports.getRecentTasks =
async (req, res) => {

  const tasks =
    await dashboardService.getRecentTasks(
      req.user._id
    );

  res.status(200).json({

    success: true,

    data: tasks,

  });

};

exports.getUpcomingDeadlines =
async (req, res) => {

  const deadlines =
    await dashboardService.getUpcomingDeadlines(
      req.user._id
    );

  res.status(200).json({

    success: true,

    data: deadlines,

  });

};

exports.getProjectProgress =
async (req, res) => {

  const progress =
    await dashboardService.getProjectProgress(
      req.params.projectId
    );

  res.status(200).json({

    success: true,

    data: progress,

  });

};

exports.getTaskStatusSummary =
async (req, res) => {

  const summary =
    await dashboardService.getTaskStatusSummary(
      req.user._id
    );

  res.status(200).json({

    success: true,

    data: summary,

  });

};