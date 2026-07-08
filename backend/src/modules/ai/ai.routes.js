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
  generateTaskSuggestions,
  sprintPlanning,
  riskDetection,
  workloadBalancing,
  taskPrioritization,
  deadlinePrediction,
  meetingNotes,
  projectSummary,
  chatAssistant,
  naturalLanguageTask,
  productivityInsights,
} = require("./ai.controller");

router.post("/ask", protect, askAI);
router.post("/chat", protect, chatAssistant);

router.post(
  "/task-description",
  protect,
  generateTaskDescription
);

router.post(
  "/generate-description",
  protect,
  generateTaskDescription
);

router.post(
  "/task-suggestions",
  protect,
  generateTaskSuggestions
);

router.post(
  "/project-summary",
  protect,
  projectSummary
);

router.post(
  "/summarize-project",
  protect,
  summarizeProject
);

router.post("/priority", protect, suggestPriority);
router.post("/estimate-time", protect, estimateTime);
router.post("/improve-comment", protect, improveComment);
router.post("/weekly-report", protect, generateWeeklyReport);

router.post("/sprint-planning", protect, sprintPlanning);
router.post("/risk-detection", protect, riskDetection);
router.post(
  "/workload-balancing",
  protect,
  workloadBalancing
);
router.post(
  "/task-prioritization",
  protect,
  taskPrioritization
);
router.post(
  "/deadline-prediction",
  protect,
  deadlinePrediction
);
router.post("/meeting-notes", protect, meetingNotes);
router.post(
  "/natural-language-task",
  protect,
  naturalLanguageTask
);
router.post(
  "/productivity-insights",
  protect,
  productivityInsights
);

module.exports = router;
