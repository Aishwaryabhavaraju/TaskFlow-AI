const express = require("express");

const router = express.Router();

const { protect } =
require("../auth/auth.middleware");

const {
  getOverview,
  getRecentTasks,
  getUpcomingDeadlines,
  getProjectProgress,
  getTaskStatusSummary,
} = require("./dashboard.controller");

router.get(
  "/overview",
  protect,
  getOverview
);

router.get(
  "/recent-tasks",
  protect,
  getRecentTasks
);

router.get(
  "/deadlines",
  protect,
  getUpcomingDeadlines
);

router.get(
  "/project/:projectId/progress",
  protect,
  getProjectProgress
);

router.get(
  "/task-summary",
  protect,
  getTaskStatusSummary
);

module.exports = router;