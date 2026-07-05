const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../auth/auth.middleware");

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("./project.controller");

const {
  createProjectValidation,
} = require("./project.validation");

router.post(
  "/",
  protect,
  createProjectValidation,
  createProject
);

router.get(
  "/",
  protect,
  getProjects
);

router.get(
  "/:id",
  protect,
  getProject
);

router.put(
  "/:id",
  protect,
  updateProject
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

module.exports = router;