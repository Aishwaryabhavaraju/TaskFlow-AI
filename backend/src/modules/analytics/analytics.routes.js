const express = require("express");

const router = express.Router();

const { protect } =
require("../auth/auth.middleware");

const controller =
require("./analytics.controller");

router.get(
  "/projects/:projectId",
  protect,
  controller.getProjectReport
);

router.get(
  "/projects/:projectId/export/:format",
  protect,
  controller.exportProjectReport
);

router.get(
  "/task-status",
  protect,
  controller.getTaskStatus
);

router.get(
  "/priority",
  protect,
  controller.getPriority
);

router.get(
  "/projects",
  protect,
  controller.getProjects
);

router.get(
  "/monthly",
  protect,
  controller.getMonthlyActivity
);

router.get(
  "/contributors",
  protect,
  controller.getTopContributors
);

router.get(
  "/dashboard",
  protect,
  controller.getDashboardAnalytics
);

module.exports = router;
