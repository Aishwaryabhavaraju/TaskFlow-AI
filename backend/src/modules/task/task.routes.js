const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../auth/auth.middleware");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  assignMembers,
  updateLabels,
  updatePriority,
  updateDueDate,
  moveTask,
  completeTask,
  addChecklistItem,
  updateChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem,
} = require("./task.controller");

const {
  createTaskValidation,
} = require("./task.validation");

router.post(
  "/",
  protect,
  createTaskValidation,
  createTask
);

router.get(
  "/",
  protect,
  getTasks
);

router.get(
  "/:id",
  protect,
  getTask
);

router.put(
  "/:id",
  protect,
  updateTask
);

router.delete(
  "/:id",
  protect,
  deleteTask
);

router.put(
  "/:id/assign",
  protect,
  assignMembers
);

router.put(
  "/:id/labels",
  protect,
  updateLabels
);

router.put(
  "/:id/priority",
  protect,
  updatePriority
);

router.put(
  "/:id/due-date",
  protect,
  updateDueDate
);

router.put(
  "/:id/move",
  protect,
  moveTask
);

router.put(
  "/:id/complete",
  protect,
  completeTask
);

router.post(
  "/:id/checklist",
  protect,
  addChecklistItem
);

router.put(
  "/:id/checklist/:itemId",
  protect,
  updateChecklistItem
);

router.put(
  "/:id/checklist/:itemId/toggle",
  protect,
  toggleChecklistItem
);

router.delete(
  "/:id/checklist/:itemId",
  protect,
  deleteChecklistItem
);

module.exports = router;