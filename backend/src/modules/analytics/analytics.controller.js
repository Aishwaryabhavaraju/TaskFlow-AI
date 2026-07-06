const analyticsService =
require("./analytics.service");

exports.getTaskStatus =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getTaskStatusAnalytics(
        req.user._id
      ),

  });

};

exports.getPriority =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getPriorityAnalytics(
        req.user._id
      ),

  });

};

exports.getProjects =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getProjectAnalytics(),

  });

};

exports.getMonthlyActivity =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getMonthlyActivity(
        req.user._id
      ),

  });

};

exports.getTopContributors =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getTopContributors(),

  });

};

exports.getDashboardAnalytics =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getDashboardAnalytics(
        req.user._id
      ),

  });

};