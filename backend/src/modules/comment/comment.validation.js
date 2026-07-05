const { body } = require("express-validator");

exports.createCommentValidation = [
  body("task")
    .notEmpty()
    .withMessage("Task ID is required"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment content is required"),
];