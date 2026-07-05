const express = require("express");

const router = express.Router();

const { protect } =
require("../auth/auth.middleware");

const {
  createComment,
  getTaskComments,
  updateComment,
  deleteComment,
} = require("./comment.controller");

const {
  createCommentValidation,
} = require("./comment.validation");

router.post(
  "/",
  protect,
  createCommentValidation,
  createComment
);

router.get(
  "/task/:taskId",
  protect,
  getTaskComments
);

router.put(
  "/:id",
  protect,
  updateComment
);

router.delete(
  "/:id",
  protect,
  deleteComment
);

module.exports = router;