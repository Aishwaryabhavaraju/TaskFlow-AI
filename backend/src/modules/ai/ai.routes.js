const express = require("express");

const router = express.Router();

const { protect } =
require("../auth/auth.middleware");

const {
  askAI,
  generateTaskDescription,
  summarizeProject,
  suggestPriority,
  estimateTime,
  improveComment,
  generateWeeklyReport,
} = require("./ai.controller");

router.post(
  "/ask",
  protect,
  askAI
);

router.post(
  "/task-description",
  protect,
  generateTaskDescription
);

router.post(
  "/project-summary",
  protect,
  summarizeProject
);

router.post(
  "/priority",
  protect,
  suggestPriority
);

router.post(
  "/estimate-time",
  protect,
  estimateTime
);

router.post(
  "/improve-comment",
  protect,
  improveComment
);

router.post(
  "/weekly-report",
  protect,
  generateWeeklyReport
);

module.exports = router;